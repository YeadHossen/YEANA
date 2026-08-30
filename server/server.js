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
// 9. OVERVIEW STATS (Admin Dashboard)
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

    res.json({
      districts: districtsCount,
      places: placesCount,
      hotels: hotelsCount,
      restaurants: restaurantsCount,
      transportRoutes: routesCount,
      tripsCreated: tripsCount,
      reviewsPosted: reviewsCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 YEANA Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 Health Endpoint: http://localhost:${PORT}/api/health`);
  console.log(`📍 Places Endpoint: http://localhost:${PORT}/api/places`);
});
