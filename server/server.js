import express from 'express';
import cors from 'cors';
import { db, initDatabase } from './db.js';

// Ensure tables exist
initDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Helper for parsing JSON columns
function parseJsonColumns(row, columns = []) {
  if (!row) return null;
  const parsed = { ...row };
  for (const col of columns) {
    if (parsed[col] && typeof parsed[col] === 'string') {
      try {
        parsed[col] = JSON.parse(parsed[col]);
      } catch (e) {
        parsed[col] = [];
      }
    }
  }
  return parsed;
}

// -------------------------------------------------------------
// VISUAL BACKEND DASHBOARD & API EXPLORER
// -------------------------------------------------------------
app.get('/', (req, res) => {
  const stats = {
    districts: db.prepare('SELECT COUNT(*) as c FROM districts').get()?.c || 0,
    places: db.prepare('SELECT COUNT(*) as c FROM places').get()?.c || 0,
    hotels: db.prepare('SELECT COUNT(*) as c FROM hotels').get()?.c || 0,
    restaurants: db.prepare('SELECT COUNT(*) as c FROM restaurants').get()?.c || 0,
    transportRoutes: db.prepare('SELECT COUNT(*) as c FROM transport_routes').get()?.c || 0,
    trips: db.prepare('SELECT COUNT(*) as c FROM trips').get()?.c || 0,
    transportBookings: db.prepare('SELECT COUNT(*) as c FROM transport_bookings').get()?.c || 0,
    hotelBookings: db.prepare('SELECT COUNT(*) as c FROM hotel_bookings').get()?.c || 0,
  };

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YEANA — Backend Control Center & API Explorer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #0B0F19;
      color: #E2E8F0;
      min-height: 100vh;
      padding: 32px 24px;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 1px solid #1E293B;
      flex-wrap: wrap;
      gap: 16px;
    }
    .brand { display: flex; align-items: center; gap: 14px; }
    .logo-badge {
      background: linear-gradient(135deg, #059669, #10B981);
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 22px;
      color: white;
      box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.4);
    }
    h1 { font-size: 24px; font-weight: 800; color: #F8FAFC; letter-spacing: -0.5px; }
    .subtitle { font-size: 13px; color: #94A3B8; margin-top: 2px; }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      color: #34D399;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 12px #10B981;
      animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }
    .stat-card {
      background: #131B2E;
      border: 1px solid #1E293B;
      border-radius: 16px;
      padding: 20px;
      transition: transform 0.2s, border-color 0.2s;
    }
    .stat-card:hover { transform: translateY(-3px); border-color: #059669; }
    .stat-label { font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; }
    .stat-val { font-size: 32px; font-weight: 800; color: #F1F5F9; margin-top: 8px; font-family: 'JetBrains Mono', monospace; }
    .stat-sub { font-size: 12px; color: #10B981; margin-top: 4px; font-weight: 500; }
    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #F8FAFC;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    @media (max-width: 900px) { .grid-2 { grid-template-columns: 1fr; } }
    .card {
      background: #131B2E;
      border: 1px solid #1E293B;
      border-radius: 18px;
      padding: 24px;
    }
    .endpoint-list { display: flex; flex-direction: column; gap: 10px; }
    .endpoint-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0B0F19;
      border: 1px solid #1E293B;
      padding: 12px 16px;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s;
    }
    .endpoint-item:hover { border-color: #10B981; background: #13222B; }
    .ep-left { display: flex; align-items: center; gap: 12px; }
    .ep-method {
      background: #064E3B;
      color: #34D399;
      font-weight: 700;
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
    }
    .ep-path { font-size: 14px; font-weight: 600; color: #E2E8F0; font-family: 'JetBrains Mono', monospace; }
    .ep-desc { font-size: 12px; color: #94A3B8; }
    .btn-test {
      background: #1E293B;
      color: #94A3B8;
      border: none;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 12px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
    }
    .btn-test:hover { background: #10B981; color: white; }
    #response-box {
      background: #0B0F19;
      border: 1px solid #1E293B;
      border-radius: 12px;
      padding: 16px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: #38BDF8;
      max-height: 480px;
      overflow: auto;
      white-space: pre-wrap;
      word-break: break-all;
    }
    .quick-links {
      display: flex;
      gap: 12px;
      margin-top: 24px;
      flex-wrap: wrap;
    }
    .ql-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #1E293B;
      color: #F1F5F9;
      text-decoration: none;
      padding: 10px 18px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 13px;
      transition: all 0.2s;
    }
    .ql-btn:hover { background: #059669; }
    .ql-primary { background: #059669; }
    .ql-primary:hover { background: #047857; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="brand">
        <div class="logo-badge">YN</div>
        <div>
          <h1>YEANA Backend Control Center</h1>
          <div class="subtitle">Bangladesh Tour & Travel Platform • SQLite Relational Engine</div>
        </div>
      </div>
      <div style="display: flex; gap: 12px; align-items: center;">
        <div class="status-pill">
          <div class="status-dot"></div>
          Backend Online (:5000)
        </div>
        <a href="http://localhost:5173" target="_blank" class="ql-btn ql-primary">Open Web App ➔</a>
      </div>
    </header>

    <!-- Metrics Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Administrative Districts</div>
        <div class="stat-val">\${stats.districts}</div>
        <div class="stat-sub">All 64 Zilas across 8 Divisions</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Verified Attractions</div>
        <div class="stat-val">\${stats.places}</div>
        <div class="stat-sub">Curated landmarks & nature spots</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Verified Hotels</div>
        <div class="stat-val">\${stats.hotels}</div>
        <div class="stat-sub">Resorts, boutique stays & rooms</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Restaurants & Food</div>
        <div class="stat-val">\${stats.restaurants}</div>
        <div class="stat-sub">Regional cuisine & specialties</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Transport Routes</div>
        <div class="stat-val">\${stats.transportRoutes}</div>
        <div class="stat-sub">Buses, trains, launches & flights</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Confirmed Bookings</div>
        <div class="stat-val">\${stats.transportBookings + stats.hotelBookings}</div>
        <div class="stat-sub">Transport & hotel reservations</div>
      </div>
    </div>

    <!-- 2 Column Explorer -->
    <div class="grid-2">
      <!-- Left: API Directory -->
      <div class="card">
        <div class="section-title">⚡ Live REST Endpoints</div>
        <div class="endpoint-list">
          <div class="endpoint-item">
            <div class="ep-left">
              <span class="ep-method">GET</span>
              <div>
                <div class="ep-path">/api/health</div>
                <div class="ep-desc">Service health and engine status</div>
              </div>
            </div>
            <button class="btn-test" onclick="fetchEndpoint('/api/health')">Test</button>
          </div>

          <div class="endpoint-item">
            <div class="ep-left">
              <span class="ep-method">GET</span>
              <div>
                <div class="ep-path">/api/districts</div>
                <div class="ep-desc">64 districts with coordinates & division</div>
              </div>
            </div>
            <button class="btn-test" onclick="fetchEndpoint('/api/districts')">Test</button>
          </div>

          <div class="endpoint-item">
            <div class="ep-left">
              <span class="ep-method">GET</span>
              <div>
                <div class="ep-path">/api/places</div>
                <div class="ep-desc">Attractions filtered by district or category</div>
              </div>
            </div>
            <button class="btn-test" onclick="fetchEndpoint('/api/places')">Test</button>
          </div>

          <div class="endpoint-item">
            <div class="ep-left">
              <span class="ep-method">GET</span>
              <div>
                <div class="ep-path">/api/hotels</div>
                <div class="ep-desc">Resorts, pricing, amenities, room types</div>
              </div>
            </div>
            <button class="btn-test" onclick="fetchEndpoint('/api/hotels')">Test</button>
          </div>

          <div class="endpoint-item">
            <div class="ep-left">
              <span class="ep-method">GET</span>
              <div>
                <div class="ep-path">/api/restaurants</div>
                <div class="ep-desc">District culinary specialties and highlights</div>
              </div>
            </div>
            <button class="btn-test" onclick="fetchEndpoint('/api/restaurants')">Test</button>
          </div>

          <div class="endpoint-item">
            <div class="ep-left">
              <span class="ep-method">GET</span>
              <div>
                <div class="ep-path">/api/transports</div>
                <div class="ep-desc">Intercity schedules & fare ranges</div>
              </div>
            </div>
            <button class="btn-test" onclick="fetchEndpoint('/api/transports')">Test</button>
          </div>

          <div class="endpoint-item">
            <div class="ep-left">
              <span class="ep-method">GET</span>
              <div>
                <div class="ep-path">/api/portal/stats</div>
                <div class="ep-desc">Company portal aggregated metrics</div>
              </div>
            </div>
            <button class="btn-test" onclick="fetchEndpoint('/api/portal/stats')">Test</button>
          </div>

          <div class="endpoint-item">
            <div class="ep-left">
              <span class="ep-method">GET</span>
              <div>
                <div class="ep-path">/api/stats</div>
                <div class="ep-desc">Full platform row counts</div>
              </div>
            </div>
            <button class="btn-test" onclick="fetchEndpoint('/api/stats')">Test</button>
          </div>
        </div>
      </div>

      <!-- Right: Live Response Viewer -->
      <div class="card">
        <div class="section-title">
          <span>🔍 Live Response Inspector</span>
          <span id="active-url" style="font-size: 11px; font-weight: normal; color: #10B981; font-family: 'JetBrains Mono', monospace;">/api/health</span>
        </div>
        <div id="response-box">Loading initial health check...</div>
      </div>
    </div>
  </div>

  <script>
    async function fetchEndpoint(endpoint) {
      document.getElementById('active-url').textContent = endpoint;
      document.getElementById('response-box').textContent = 'Fetching ' + endpoint + '...';
      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        document.getElementById('response-box').textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        document.getElementById('response-box').textContent = 'Error: ' + err.message;
      }
    }
    // Load health on start
    fetchEndpoint('/api/health');
  </script>
</body>
</html>`);
});

// -------------------------------------------------------------
// HEALTH CHECK
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'YEANA Bangladesh Travel API',
    database: 'SQLite (better-sqlite3)',
    timestamp: new Date().toISOString()
  });
});

// -------------------------------------------------------------
// 1. DISTRICTS
// -------------------------------------------------------------
app.get('/api/districts', (req, res) => {
  try {
    const { division } = req.query;
    let query = 'SELECT * FROM districts';
    let params = [];
    if (division) {
      query += ' WHERE division = ?';
      params.push(division);
    }
    query += ' ORDER BY name ASC';
    const districts = db.prepare(query).all(...params);
    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/districts/:id', (req, res) => {
  try {
    const district = db.prepare('SELECT * FROM districts WHERE id = ?').get(req.params.id);
    if (!district) return res.status(404).json({ error: 'District not found' });
    res.json(district);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 2. PLACES / ATTRACTIONS
// -------------------------------------------------------------
app.get('/api/places', (req, res) => {
  try {
    const { district_id, category, featured, search } = req.query;
    let query = 'SELECT * FROM places WHERE 1=1';
    const params = [];

    if (district_id) {
      query += ' AND district_id = ?';
      params.push(district_id);
    }
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    if (featured === 'true' || featured === '1') {
      query += ' AND is_featured = 1';
    }
    if (search) {
      query += ' AND (name LIKE ? OR name_bn LIKE ? OR short_description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY rating DESC';
    const places = db.prepare(query).all(...params).map(p => ({
      ...parseJsonColumns(p, ['gallery', 'nearby_hotels', 'nearby_restaurants']),
      is_featured: Boolean(p.is_featured)
    }));

    res.json(places);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/places/:id', (req, res) => {
  try {
    const place = db.prepare('SELECT * FROM places WHERE id = ?').get(req.params.id);
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json({
      ...parseJsonColumns(place, ['gallery', 'nearby_hotels', 'nearby_restaurants']),
      is_featured: Boolean(place.is_featured)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/places', (req, res) => {
  try {
    const p = req.body;
    const id = p.id || `place-${Date.now()}`;
    const insert = db.prepare(`
      INSERT INTO places (
        id, district_id, district_name, division, name, name_bn, rating, reviews_count,
        short_description, full_description, location, lat, lng, entry_fee, opening_time,
        best_time, how_to_reach, image_url, gallery, category, is_featured, nearby_hotels, nearby_restaurants
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      id, p.district_id, p.district_name || '', p.division || 'Sylhet',
      p.name, p.name_bn, p.rating || 5.0, p.reviews_count || 0,
      p.short_description || '', p.full_description || '', p.location,
      p.lat || null, p.lng || null, p.entry_fee || 'Free', p.opening_time || 'Open 24h',
      p.best_time || 'Anytime', p.how_to_reach || '', p.image_url,
      JSON.stringify(p.gallery || [p.image_url]), p.category || 'Nature',
      p.is_featured ? 1 : 0,
      JSON.stringify(p.nearby_hotels || []),
      JSON.stringify(p.nearby_restaurants || [])
    );

    const created = db.prepare('SELECT * FROM places WHERE id = ?').get(id);
    res.status(201).json(parseJsonColumns(created, ['gallery', 'nearby_hotels', 'nearby_restaurants']));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 3. HOTELS
// -------------------------------------------------------------
app.get('/api/hotels', (req, res) => {
  try {
    const { district_id, search, min_price, max_price } = req.query;
    let query = 'SELECT * FROM hotels WHERE 1=1';
    const params = [];

    if (district_id) {
      query += ' AND district_id = ?';
      params.push(district_id);
    }
    if (min_price) {
      query += ' AND price_per_night >= ?';
      params.push(Number(min_price));
    }
    if (max_price) {
      query += ' AND price_per_night <= ?';
      params.push(Number(max_price));
    }
    if (search) {
      query += ' AND (name LIKE ? OR location LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY rating DESC';
    const hotels = db.prepare(query).all(...params).map(h => ({
      ...parseJsonColumns(h, ['gallery', 'room_types']),
      has_ac: Boolean(h.has_ac),
      has_wifi: Boolean(h.has_wifi),
      has_parking: Boolean(h.has_parking),
      has_restaurant: Boolean(h.has_restaurant),
      has_room_service: Boolean(h.has_room_service),
      has_security: Boolean(h.has_security),
      is_featured: Boolean(h.is_featured)
    }));

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/hotels/:id', (req, res) => {
  try {
    const hotel = db.prepare('SELECT * FROM hotels WHERE id = ?').get(req.params.id);
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
    res.json({
      ...parseJsonColumns(hotel, ['gallery', 'room_types']),
      has_ac: Boolean(hotel.has_ac),
      has_wifi: Boolean(hotel.has_wifi),
      has_parking: Boolean(hotel.has_parking),
      has_restaurant: Boolean(hotel.has_restaurant),
      has_room_service: Boolean(hotel.has_room_service),
      has_security: Boolean(hotel.has_security),
      is_featured: Boolean(hotel.is_featured)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 4. RESTAURANTS
// -------------------------------------------------------------
app.get('/api/restaurants', (req, res) => {
  try {
    const { district_id, cuisine } = req.query;
    let query = 'SELECT * FROM restaurants WHERE 1=1';
    const params = [];

    if (district_id) {
      query += ' AND district_id = ?';
      params.push(district_id);
    }
    if (cuisine) {
      query += ' AND cuisine LIKE ?';
      params.push(`%${cuisine}%`);
    }

    query += ' ORDER BY rating DESC';
    const restaurants = db.prepare(query).all(...params).map(r => ({
      ...parseJsonColumns(r, ['menu_highlights']),
      is_featured: Boolean(r.is_featured)
    }));

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 5. TRANSPORTS, SHOPPING & RIDES
// -------------------------------------------------------------
app.get('/api/transports', (req, res) => {
  try {
    const { from, to, type } = req.query;
    let query = 'SELECT * FROM transport_routes WHERE 1=1';
    const params = [];

    if (from) {
      query += ' AND from_district LIKE ?';
      params.push(`%${from}%`);
    }
    if (to) {
      query += ' AND to_district LIKE ?';
      params.push(`%${to}%`);
    }
    if (type) {
      query += ' AND transport_type = ?';
      params.push(type);
    }

    query += ' ORDER BY price_min ASC';
    const routes = db.prepare(query).all(...params).map(t => ({
      ...parseJsonColumns(t, ['boarding_points']),
      is_active: Boolean(t.is_active)
    }));
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/shopping', (req, res) => {
  try {
    const { district_id } = req.query;
    let query = 'SELECT * FROM shopping_places WHERE 1=1';
    const params = [];

    if (district_id) {
      query += ' AND district_id = ?';
      params.push(district_id);
    }

    query += ' ORDER BY name ASC';
    const shopping = db.prepare(query).all(...params);
    res.json(shopping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/rides', (req, res) => {
  try {
    const { district_id, type } = req.query;
    let query = 'SELECT * FROM rides WHERE 1=1';
    const params = [];

    if (district_id) {
      query += ' AND district_id = ?';
      params.push(district_id);
    }
    if (type) {
      query += ' AND vehicle_type = ?';
      params.push(type);
    }

    query += ' ORDER BY price_per_day ASC';
    const rides = db.prepare(query).all(...params);
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 6. TRIPS / ITINERARIES
// -------------------------------------------------------------
app.get('/api/trips', (req, res) => {
  try {
    const { user_id } = req.query;
    let query = 'SELECT * FROM trips WHERE 1=1';
    const params = [];

    if (user_id) {
      query += ' AND (user_id = ? OR is_public = 1)';
      params.push(user_id);
    }

    query += ' ORDER BY created_at DESC';
    const trips = db.prepare(query).all(...params).map(t => ({
      ...parseJsonColumns(t, ['budget', 'places', 'hotels']),
      is_public: Boolean(t.is_public)
    }));

    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/trips', (req, res) => {
  try {
    const t = req.body;
    const id = t.id || `trip-${Date.now()}`;
    const insert = db.prepare(`
      INSERT INTO trips (
        id, user_id, title, destination, start_date, end_date, duration_days,
        budget, total_budget, places, hotels, notes, is_public
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      id, t.user_id || 'usr-traveler-01', t.title, t.destination || 'Sylhet',
      t.start_date, t.end_date, t.duration_days || 3,
      JSON.stringify(t.budget || {}),
      t.total_budget || 0,
      JSON.stringify(t.places || []),
      JSON.stringify(t.hotels || []),
      t.notes || '',
      t.is_public ? 1 : 0
    );

    const created = db.prepare('SELECT * FROM trips WHERE id = ?').get(id);
    res.status(201).json(parseJsonColumns(created, ['budget', 'places', 'hotels']));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/trips/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM trips WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Trip deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 7. REVIEWS
// -------------------------------------------------------------
app.get('/api/reviews', (req, res) => {
  try {
    const { target_id } = req.query;
    let query = 'SELECT * FROM reviews WHERE 1=1';
    const params = [];

    if (target_id) {
      query += ' AND target_id = ?';
      params.push(target_id);
    }

    query += ' ORDER BY created_at DESC';
    const reviews = db.prepare(query).all(...params).map(r => parseJsonColumns(r, ['images']));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/reviews', (req, res) => {
  try {
    const r = req.body;
    const id = r.id || `rev-${Date.now()}`;
    const insert = db.prepare(`
      INSERT INTO reviews (
        id, target_id, target_type, user_id, user_name, user_avatar, rating, comment, images
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      id, r.target_id, r.target_type, r.user_id || 'usr-traveler-01',
      r.user_name || 'Traveler', r.user_avatar || '',
      r.rating, r.comment,
      JSON.stringify(r.images || [])
    );

    const created = db.prepare('SELECT * FROM reviews WHERE id = ?').get(id);
    res.status(201).json(parseJsonColumns(created, ['images']));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 8. AUTH & PROFILES
// -------------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  try {
    const { email } = req.body;
    let user = db.prepare('SELECT * FROM profiles WHERE email = ?').get(email);
    if (!user) {
      user = {
        id: `usr-${Date.now()}`,
        full_name: email.split('@')[0],
        email: email,
        role: 'user',
        preferred_language: 'en'
      };
      db.prepare(`
        INSERT OR IGNORE INTO profiles (id, full_name, email, role, preferred_language)
        VALUES (?, ?, ?, ?, ?)
      `).run(user.id, user.full_name, user.email, user.role, user.preferred_language);
    }
    res.json({ user, token: `fake-jwt-${user.id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/signup', (req, res) => {
  try {
    const { email, fullName } = req.body;
    const id = `usr-${Date.now()}`;
    db.prepare(`
      INSERT INTO profiles (id, full_name, email, role, preferred_language)
      VALUES (?, ?, ?, 'user', 'en')
    `).run(id, fullName, email);

    const user = db.prepare('SELECT * FROM profiles WHERE id = ?').get(id);
    res.status(201).json({ user, token: `fake-jwt-${user.id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 9. TRANSPORT BOOKINGS & LIVE SEAT INVENTORY
// -------------------------------------------------------------
app.get('/api/bookings/transport', (req, res) => {
  try {
    const { company, route_id, date, status, search } = req.query;
    let query = 'SELECT * FROM transport_bookings WHERE 1=1';
    const params = [];

    if (company && company !== 'All') {
      query += ' AND company LIKE ?';
      params.push(`%${company}%`);
    }
    if (route_id) {
      query += ' AND route_id = ?';
      params.push(route_id);
    }
    if (date) {
      query += ' AND travel_date = ?';
      params.push(date);
    }
    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }
    if (search) {
      query += ' AND (id LIKE ? OR passenger_name LIKE ? OR passenger_phone LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY booked_at DESC';
    const bookings = db.prepare(query).all(...params).map(b => ({
      ...parseJsonColumns(b, ['selected_seats']),
      is_full_reserve: Boolean(b.is_full_reserve)
    }));

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bookings/transport', (req, res) => {
  try {
    const b = req.body;
    const id = b.id || `YN-TR-${Math.floor(100000 + Math.random() * 900000)}`;
    const selectedSeats = Array.isArray(b.selected_seats) ? b.selected_seats : [];

    const insert = db.prepare(`
      INSERT INTO transport_bookings (
        id, route_id, company, transport_type, from_district, to_district,
        departure_time, travel_date, selected_seats, seat_count, is_full_reserve,
        passenger_name, passenger_phone, passenger_email, passenger_gender,
        boarding_point, dropping_point, total_fare, status, booked_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      id,
      b.route_id || 'route-dhaka-sylhet',
      b.company || 'Green Line Paribahan',
      b.transport_type || 'Bus',
      b.from_district || 'Dhaka',
      b.to_district || 'Sylhet',
      b.departure_time || '08:00 AM',
      b.travel_date || new Date().toISOString().split('T')[0],
      JSON.stringify(selectedSeats),
      selectedSeats.length || b.seat_count || 1,
      b.is_full_reserve ? 1 : 0,
      b.passenger_name || 'Traveler',
      b.passenger_phone || '01700000000',
      b.passenger_email || 'traveler@yeana.com',
      b.passenger_gender || 'Male',
      b.boarding_point || 'Main Station',
      b.dropping_point || 'Central Stand',
      b.total_fare || 1000,
      b.status || 'confirmed',
      new Date().toISOString()
    );

    // Record booked seats in inventory
    const seatInsert = db.prepare(`
      INSERT OR REPLACE INTO transport_seat_inventory (
        id, route_id, travel_date, seat_id, status, booking_id, passenger_name, passenger_phone, updated_at
      ) VALUES (?, ?, ?, ?, 'booked', ?, ?, ?, CURRENT_TIMESTAMP)
    `);

    for (const seat of selectedSeats) {
      const seatInvId = `${b.route_id || 'route'}_${b.travel_date}_${seat}`;
      seatInsert.run(seatInvId, b.route_id, b.travel_date, seat, id, b.passenger_name, b.passenger_phone);
    }

    const created = db.prepare('SELECT * FROM transport_bookings WHERE id = ?').get(id);
    res.status(201).json({
      ...parseJsonColumns(created, ['selected_seats']),
      is_full_reserve: Boolean(created.is_full_reserve)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/bookings/transport/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    db.prepare('UPDATE transport_bookings SET status = ? WHERE id = ?').run(status, req.params.id);
    
    // If cancelled, free up seats
    if (status === 'cancelled') {
      db.prepare('DELETE FROM transport_seat_inventory WHERE booking_id = ?').run(req.params.id);
    }
    
    const updated = db.prepare('SELECT * FROM transport_bookings WHERE id = ?').get(req.params.id);
    res.json(parseJsonColumns(updated, ['selected_seats']));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Live seat availability & blocked seats for a route on a specific date
app.get('/api/inventory/transport/:route_id', (req, res) => {
  try {
    const { date } = req.query;
    const travelDate = date || new Date().toISOString().split('T')[0];
    const seats = db.prepare(`
      SELECT * FROM transport_seat_inventory 
      WHERE route_id = ? AND travel_date = ?
    `).all(req.params.route_id, travelDate);

    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Company operator blocking/unblocking seats (e.g. VIP/Maintenance)
app.post('/api/inventory/transport/block-seat', (req, res) => {
  try {
    const { route_id, travel_date, seat_id, action, notes } = req.body;
    const seatInvId = `${route_id}_${travel_date}_${seat_id}`;

    if (action === 'release' || action === 'unblock') {
      db.prepare('DELETE FROM transport_seat_inventory WHERE id = ?').run(seatInvId);
      res.json({ success: true, seat_id, status: 'available' });
    } else {
      db.prepare(`
        INSERT OR REPLACE INTO transport_seat_inventory (
          id, route_id, travel_date, seat_id, status, passenger_name, updated_at
        ) VALUES (?, ?, ?, ?, 'blocked', ?, CURRENT_TIMESTAMP)
      `).run(seatInvId, route_id, travel_date, seat_id, notes || 'Operator Blocked');
      res.json({ success: true, seat_id, status: 'blocked' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 10. HOTEL BOOKINGS & LIVE ROOM INVENTORY
// -------------------------------------------------------------
app.get('/api/bookings/hotel', (req, res) => {
  try {
    const { hotel_id, company, date, status, search } = req.query;
    let query = 'SELECT * FROM hotel_bookings WHERE 1=1';
    const params = [];

    if (hotel_id) {
      query += ' AND hotel_id = ?';
      params.push(hotel_id);
    }
    if (company && company !== 'All') {
      query += ' AND hotel_name LIKE ?';
      params.push(`%${company}%`);
    }
    if (date) {
      query += ' AND (check_in_date <= ? AND check_out_date >= ?)';
      params.push(date, date);
    }
    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }
    if (search) {
      query += ' AND (id LIKE ? OR guest_name LIKE ? OR guest_phone LIKE ? OR hotel_name LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY booked_at DESC';
    const bookings = db.prepare(query).all(...params);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bookings/hotel', (req, res) => {
  try {
    const b = req.body;
    const id = b.id || `HTL-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const insert = db.prepare(`
      INSERT INTO hotel_bookings (
        id, hotel_id, hotel_name, hotel_image, district_name, room_type,
        room_count, guest_count, check_in_date, check_out_date, nights,
        guest_name, guest_phone, guest_email, total_cost, status, special_requests, booked_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      id,
      b.hotel_id || 'htl-01',
      b.hotel_name || 'Luxury Hotel & Resort',
      b.hotel_image || '',
      b.district_name || 'Sylhet',
      b.room_type || 'Deluxe AC Room',
      b.room_count || 1,
      b.guest_count || 2,
      b.check_in_date || new Date().toISOString().split('T')[0],
      b.check_out_date || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      b.nights || 2,
      b.guest_name || 'Guest Traveler',
      b.guest_phone || '01700000000',
      b.guest_email || 'guest@yeana.com',
      b.total_cost || 6000,
      b.status || 'confirmed',
      b.special_requests || '',
      new Date().toISOString()
    );

    // Update room inventory available count
    db.prepare(`
      UPDATE hotel_room_inventory 
      SET available_rooms = MAX(0, available_rooms - ?),
          booked_rooms = booked_rooms + ?
      WHERE hotel_id = ? AND room_type = ?
    `).run(b.room_count || 1, b.room_count || 1, b.hotel_id, b.room_type);

    const created = db.prepare('SELECT * FROM hotel_bookings WHERE id = ?').get(id);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/bookings/hotel/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const booking = db.prepare('SELECT * FROM hotel_bookings WHERE id = ?').get(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    db.prepare('UPDATE hotel_bookings SET status = ? WHERE id = ?').run(status, req.params.id);

    // If cancelled, restore available rooms
    if (status === 'cancelled' && booking.status !== 'cancelled') {
      db.prepare(`
        UPDATE hotel_room_inventory 
        SET available_rooms = available_rooms + ?,
            booked_rooms = MAX(0, booked_rooms - ?)
        WHERE hotel_id = ? AND room_type = ?
      `).run(booking.room_count, booking.room_count, booking.hotel_id, booking.room_type);
    }

    const updated = db.prepare('SELECT * FROM hotel_bookings WHERE id = ?').get(req.params.id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Live Room inventory by hotel
app.get('/api/inventory/hotel/:hotel_id', (req, res) => {
  try {
    let inventory = db.prepare('SELECT * FROM hotel_room_inventory WHERE hotel_id = ?').all(req.params.hotel_id);
    
    // Auto initialize room inventory if empty
    if (inventory.length === 0) {
      const hotel = db.prepare('SELECT * FROM hotels WHERE id = ?').get(req.params.hotel_id);
      if (hotel) {
        const parsed = parseJsonColumns(hotel, ['room_types']);
        const roomTypes = Array.isArray(parsed.room_types) ? parsed.room_types : ['Deluxe AC Room', 'Executive Suite'];
        
        for (const rt of roomTypes) {
          const name = typeof rt === 'object' ? rt.name : rt;
          const price = typeof rt === 'object' ? rt.price : hotel.price_per_night;
          const invId = `${hotel.id}_${name.replace(/\s+/g, '_')}`;
          
          db.prepare(`
            INSERT OR IGNORE INTO hotel_room_inventory (id, hotel_id, room_type, total_rooms, available_rooms, booked_rooms, price_per_night)
            VALUES (?, ?, ?, 10, 8, 2, ?)
          `).run(invId, hotel.id, name, price);
        }
        inventory = db.prepare('SELECT * FROM hotel_room_inventory WHERE hotel_id = ?').all(req.params.hotel_id);
      }
    }

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Company operator update room capacity or pricing
app.patch('/api/inventory/hotel/rooms', (req, res) => {
  try {
    const { hotel_id, room_type, total_rooms, available_rooms, price_per_night, blocked_rooms } = req.body;
    const invId = `${hotel_id}_${room_type.replace(/\s+/g, '_')}`;

    db.prepare(`
      INSERT INTO hotel_room_inventory (id, hotel_id, room_type, total_rooms, available_rooms, booked_rooms, blocked_rooms, price_per_night)
      VALUES (?, ?, ?, ?, ?, 0, ?, ?)
      ON CONFLICT(hotel_id, room_type) DO UPDATE SET
        total_rooms = excluded.total_rooms,
        available_rooms = excluded.available_rooms,
        blocked_rooms = excluded.blocked_rooms,
        price_per_night = excluded.price_per_night,
        updated_at = CURRENT_TIMESTAMP
    `).run(invId, hotel_id, room_type, total_rooms || 10, available_rooms || 8, blocked_rooms || 0, price_per_night || 3500);

    const updated = db.prepare('SELECT * FROM hotel_room_inventory WHERE hotel_id = ? AND room_type = ?').get(hotel_id, room_type);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 11. COMPANY E-PORTAL AGGREGATED METRICS
// -------------------------------------------------------------
app.get('/api/portal/stats', (req, res) => {
  try {
    const { company } = req.query;

    // Transport Stats
    let trQuery = "SELECT COUNT(*) as total_bookings, SUM(seat_count) as total_seats_sold, SUM(total_fare) as total_revenue FROM transport_bookings WHERE status != 'cancelled'";
    const trParams = [];
    if (company && company !== 'All') {
      trQuery += ' AND company LIKE ?';
      trParams.push(`%${company}%`);
    }
    const transportStats = db.prepare(trQuery).get(...trParams);

    // Hotel Stats
    let htlQuery = "SELECT COUNT(*) as total_reservations, SUM(room_count) as total_rooms_booked, SUM(total_cost) as total_revenue FROM hotel_bookings WHERE status != 'cancelled'";
    const htlParams = [];
    if (company && company !== 'All') {
      htlQuery += ' AND hotel_name LIKE ?';
      htlParams.push(`%${company}%`);
    }
    const hotelStats = db.prepare(htlQuery).get(...htlParams);

    // Total counts
    const totalCompanies = db.prepare('SELECT COUNT(DISTINCT company) as count FROM transport_routes').get().count;
    const totalHotelsCount = db.prepare('SELECT COUNT(*) as count FROM hotels').get().count;

    res.json({
      transport: {
        totalBookings: transportStats.total_bookings || 0,
        seatsSold: transportStats.total_seats_sold || 0,
        revenue: transportStats.total_revenue || 0,
        totalRoutes: db.prepare('SELECT COUNT(*) as count FROM transport_routes').get().count
      },
      hotel: {
        totalBookings: hotelStats.total_reservations || 0,
        roomsBooked: hotelStats.total_rooms_booked || 0,
        revenue: hotelStats.total_revenue || 0,
        totalProperties: totalHotelsCount
      },
      summary: {
        totalRevenue: (transportStats.total_revenue || 0) + (hotelStats.total_revenue || 0),
        totalCompanies: totalCompanies + totalHotelsCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 12. OVERVIEW STATS (Admin Dashboard)
// -------------------------------------------------------------
app.get('/api/stats', (req, res) => {
  try {
    const districtsCount = db.prepare('SELECT COUNT(*) as count FROM districts').get().count;
    const placesCount = db.prepare('SELECT COUNT(*) as count FROM places').get().count;
    const hotelsCount = db.prepare('SELECT COUNT(*) as count FROM hotels').get().count;
    const restaurantsCount = db.prepare('SELECT COUNT(*) as count FROM restaurants').get().count;
    const routesCount = db.prepare('SELECT COUNT(*) as count FROM transport_routes').get().count;
    const tripsCount = db.prepare('SELECT COUNT(*) as count FROM trips').get().count;
    const reviewsCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get().count;
    const transportBookingsCount = db.prepare('SELECT COUNT(*) as count FROM transport_bookings').get().count;
    const hotelBookingsCount = db.prepare('SELECT COUNT(*) as count FROM hotel_bookings').get().count;

    res.json({
      districts: districtsCount,
      places: placesCount,
      hotels: hotelsCount,
      restaurants: restaurantsCount,
      transportRoutes: routesCount,
      tripsCreated: tripsCount,
      reviewsPosted: reviewsCount,
      transportBookings: transportBookingsCount,
      hotelBookings: hotelBookingsCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 13. YEANA AI TRAVEL ASSISTANT ENDPOINTS (Local & Offline Support)
// -------------------------------------------------------------

// Helper for local AI intent detection
function detectLocalIntent(msg) {
  const lower = (msg || '').toLowerCase();
  let intent = 'general_travel_question';
  let district = null;

  const districtKeywords = {
    'sajek': 'Khagrachhari', 'sylhet': 'Sylhet', 'sreemangal': 'Moulvibazar',
    'cox': "Cox's Bazar", 'bandarban': 'Bandarban', 'rangamati': 'Rangamati',
    'dhaka': 'Dhaka', 'chittagong': 'Chattogram', 'khulna': 'Khulna',
    'sundarban': 'Bagerhat', 'barishal': 'Barishal', 'kuakata': 'Patuakhali',
    'rajshahi': 'Rajshahi', 'rangpur': 'Rangpur', 'bogura': 'Bogura'
  };

  for (const [kw, dist] of Object.entries(districtKeywords)) {
    if (lower.includes(kw)) {
      district = dist;
      break;
    }
  }

  const daysMatch = lower.match(/(\d+)\s*(?:day|days|din)/i);
  const days = daysMatch ? parseInt(daysMatch[1], 10) : null;

  const budgetMatch = lower.match(/(?:budget|under|cost|taka|৳|tk|bdt)\s*(?:of|is|:)?\s*(\d[\d,]*)/i) ||
                      lower.match(/(\d[\d,]*)\s*(?:taka|৳|tk|bdt)/i);
  const budget = budgetMatch ? parseInt(budgetMatch[1].replace(/,/g, ''), 10) : null;

  if (lower.includes('plan') || lower.includes('itinerary') || (days && days > 0)) {
    intent = 'trip_planning';
  } else if (lower.includes('hotel') || lower.includes('resort') || lower.includes('stay') || lower.includes('room')) {
    intent = 'hotel_search';
  } else if (lower.includes('food') || lower.includes('restaurant') || lower.includes('eat') || lower.includes('biryani') || lower.includes('cafe')) {
    intent = 'restaurant_search';
  } else if (lower.includes('transport') || lower.includes('bus') || lower.includes('train') || lower.includes('ticket') || lower.includes('launch')) {
    intent = 'transport_search';
  } else if (lower.includes('place') || lower.includes('destination') || lower.includes('visit') || lower.includes('sight')) {
    intent = 'destination_search';
  }

  return { intent, district, days, budget };
}

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, conversation_id, user_id } = req.body;
    const cleanMsg = (message || '').trim();
    if (!cleanMsg) {
      return res.status(400).json({ success: false, error: 'Message cannot be empty.' });
    }

    const userId = user_id || 'usr-local-demo';
    let convId = conversation_id;

    // Ensure conversation exists
    if (!convId) {
      convId = `conv-${Date.now()}`;
      const titleSnippet = cleanMsg.slice(0, 35).replace(/[\r\n]+/g, ' ');
      db.prepare(`
        INSERT INTO ai_conversations (id, user_id, title)
        VALUES (?, ?, ?)
      `).run(convId, userId, `${titleSnippet}...`);
    }

    const { intent, district, days, budget } = detectLocalIntent(cleanMsg);
    const recommendations = [];

    // 1. Places recommendations
    if (intent === 'destination_search' || intent === 'trip_planning' || intent === 'general_travel_question') {
      let q = 'SELECT * FROM places';
      let params = [];
      if (district) {
        q += ' WHERE district_name LIKE ? OR location LIKE ?';
        params.push(`%${district}%`, `%${district}%`);
      }
      q += ' ORDER BY rating DESC LIMIT 4';
      const places = db.prepare(q).all(...params);
      places.forEach(p => {
        recommendations.push({
          type: 'destination',
          id: p.id,
          name: p.name,
          name_bn: p.name_bn,
          location: p.location || p.district_name,
          price: p.entry_fee || 'Free entry',
          rating: p.rating,
          image: p.image_url
        });
      });
    }

    // 2. Hotel recommendations
    if (intent === 'hotel_search' || intent === 'trip_planning') {
      let q = 'SELECT * FROM hotels';
      let params = [];
      if (district) {
        q += ' WHERE location LIKE ? OR name LIKE ?';
        params.push(`%${district}%`, `%${district}%`);
      }
      q += ' ORDER BY rating DESC LIMIT 4';
      const hotels = db.prepare(q).all(...params);
      hotels.forEach(h => {
        recommendations.push({
          type: 'hotel',
          id: h.id,
          name: h.name,
          name_bn: h.name_bn,
          location: h.location,
          price: `৳${h.price_per_night}/night`,
          rating: h.rating,
          image: h.image_url
        });
      });
    }

    // 3. Restaurant recommendations
    if (intent === 'restaurant_search' || intent === 'trip_planning') {
      let q = 'SELECT * FROM restaurants';
      let params = [];
      if (district) {
        q += ' WHERE location LIKE ?';
        params.push(`%${district}%`);
      }
      q += ' ORDER BY rating DESC LIMIT 3';
      const rests = db.prepare(q).all(...params);
      rests.forEach(r => {
        recommendations.push({
          type: 'restaurant',
          id: r.id,
          name: r.name,
          name_bn: r.name_bn,
          location: r.location,
          price: r.price_tier || '৳৳',
          rating: r.rating,
          image: r.image_url
        });
      });
    }

    // 4. Transport recommendations
    if (intent === 'transport_search' || intent === 'trip_planning') {
      let q = 'SELECT * FROM transport_routes LIMIT 3';
      const routes = db.prepare(q).all();
      routes.forEach(rt => {
        recommendations.push({
          type: 'transport',
          id: rt.id,
          name: `${rt.company} (${rt.transport_type})`,
          location: `${rt.from_district} ➔ ${rt.to_district}`,
          price: `৳${rt.price_min} - ৳${rt.price_max}`,
          details: { duration: rt.duration, departure: rt.departure_time }
        });
      });
    }

    // Formulate AI answer
    let responseText = '';
    const durDays = days || 2;
    const estBudget = budget || (durDays * 2500);

    let tripPlan = null;
    if (intent === 'trip_planning' || days) {
      tripPlan = {
        destination: district || 'Bangladesh Destination',
        duration_days: durDays,
        travellers: 2,
        estimated_budget: estBudget,
        currency: 'BDT',
        days: Array.from({ length: durDays }).map((_, i) => ({
          day: i + 1,
          title: `Day ${i + 1}: ${i === 0 ? 'Journey & Arrival' : i === durDays - 1 ? 'Memorable Sights & Return' : 'Adventure & Local Delicacies'}`,
          estimated_cost: Math.round(estBudget / durDays)
        }))
      };

      responseText = `✈️ **YEANA AI Tour Plan: ${durDays}-Day Trip to ${district || 'Bangladesh'}**\n\n` +
        `**Estimated Total Budget:** ৳${estBudget.toLocaleString()} BDT (for 2 travelers)\n` +
        `**Recommended Stays & Transport:** Verified in the recommendation cards below.\n\n` +
        `### Itinerary Outline:\n` +
        tripPlan.days.map(d => `- **Day ${d.day}:** ${d.title} (Est: ৳${d.estimated_cost.toLocaleString()})`).join('\n') + '\n\n' +
        `💡 *Enjoy your trip with YEANA verified bookings and 24/7 travel concierge!*`;
    } else if (intent === 'hotel_search') {
      responseText = `🏨 **Verified Stays in ${district || 'Bangladesh'}**\n\n` +
        `Here are the highest-rated accommodations verified by YEANA. Tap on any card below to view amenities and room details.`;
    } else if (intent === 'restaurant_search') {
      responseText = `🍽️ **Authentic Local Food & Restaurants**\n\n` +
        `Discover top dining spots and regional culinary delicacies verified by travelers. Check out the cards below!`;
    } else {
      responseText = `👋 **Hello! I'm YEANA AI, your personal travel assistant.**\n\n` +
        `I found relevant verified travel options in Bangladesh based on your question. Take a look at the verified cards below or ask me to plan a full day-by-day itinerary with budget estimation!`;
    }

    // Save User & Assistant Messages
    const userMsgId = `msg-usr-${Date.now()}`;
    const asstMsgId = `msg-ast-${Date.now() + 1}`;

    db.prepare(`
      INSERT INTO ai_messages (id, conversation_id, user_id, role, content, metadata)
      VALUES (?, ?, ?, 'user', ?, ?)
    `).run(userMsgId, convId, userId, cleanMsg, JSON.stringify({ intent, district }));

    db.prepare(`
      INSERT INTO ai_messages (id, conversation_id, user_id, role, content, metadata)
      VALUES (?, ?, ?, 'assistant', ?, ?)
    `).run(asstMsgId, convId, userId, responseText, JSON.stringify({
      intent,
      recommendations_count: recommendations.length,
      has_trip_plan: !!tripPlan,
      estimated_cost: estBudget
    }));

    // Save Usage
    db.prepare(`
      INSERT INTO ai_usage (id, user_id, conversation_id, model, input_tokens, output_tokens, total_tokens)
      VALUES (?, ?, ?, 'yeana-engine-v1', 45, 180, 225)
    `).run(`use-${Date.now()}`, userId, convId);

    // Update conversation timestamp
    db.prepare(`
      UPDATE ai_conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).run(convId);

    res.json({
      success: true,
      conversation_id: convId,
      message: {
        id: asstMsgId,
        role: 'assistant',
        content: responseText,
        created_at: new Date().toISOString()
      },
      recommendations,
      trip_plan: tripPlan,
      estimated_cost: estBudget
    });

  } catch (error) {
    console.error('Local AI Chat Error:', error);
    res.status(500).json({
      success: false,
      error: "Sorry, YEANA AI couldn't respond right now. Please try again."
    });
  }
});

app.get('/api/ai/conversations', (req, res) => {
  try {
    const userId = req.query.user_id || 'usr-local-demo';
    const convs = db.prepare(`
      SELECT * FROM ai_conversations 
      WHERE user_id = ? 
      ORDER BY updated_at DESC
    `).all(userId);
    res.json(convs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/ai/conversations/:id/messages', (req, res) => {
  try {
    const msgs = db.prepare(`
      SELECT * FROM ai_messages 
      WHERE conversation_id = ? 
      ORDER BY created_at ASC
    `).all(req.params.id);
    res.json(msgs.map(m => parseJsonColumns(m, ['metadata'])));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/ai/conversations/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM ai_conversations WHERE id = ?').run(req.params.id);
    db.prepare('DELETE FROM ai_messages WHERE conversation_id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/ai/preferences', (req, res) => {
  try {
    const userId = req.query.user_id || 'usr-local-demo';
    const prefs = db.prepare('SELECT * FROM ai_user_preferences WHERE user_id = ?').get(userId);
    res.json(prefs ? parseJsonColumns(prefs, ['preferred_destinations', 'preferred_activities', 'preferred_food', 'preferred_transport']) : null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/ai/preferences', (req, res) => {
  try {
    const { user_id, preferred_trip_type, preferred_hotel_type, budget_preference, travel_companions } = req.body;
    const userId = user_id || 'usr-local-demo';
    const existing = db.prepare('SELECT id FROM ai_user_preferences WHERE user_id = ?').get(userId);
    if (existing) {
      db.prepare(`
        UPDATE ai_user_preferences 
        SET preferred_trip_type = ?, preferred_hotel_type = ?, budget_preference = ?, travel_companions = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `).run(preferred_trip_type, preferred_hotel_type, budget_preference, travel_companions, userId);
    } else {
      db.prepare(`
        INSERT INTO ai_user_preferences (id, user_id, preferred_trip_type, preferred_hotel_type, budget_preference, travel_companions)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(`pref-${Date.now()}`, userId, preferred_trip_type, preferred_hotel_type, budget_preference, travel_companions);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/ai/preferences', (req, res) => {
  try {
    const userId = req.query.user_id || 'usr-local-demo';
    db.prepare('DELETE FROM ai_user_preferences WHERE user_id = ?').run(userId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 YEANA Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 Health Endpoint: http://localhost:${PORT}/api/health`);
  console.log(`📍 Places Endpoint: http://localhost:${PORT}/api/places`);
  console.log(`🎫 Transport Bookings: http://localhost:${PORT}/api/bookings/transport`);
  console.log(`🏨 Hotel Bookings: http://localhost:${PORT}/api/bookings/hotel`);
  console.log(`🏢 Company E-Portal Stats: http://localhost:${PORT}/api/portal/stats`);
});

