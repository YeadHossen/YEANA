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
    let trQuery = 'SELECT COUNT(*) as total_bookings, SUM(seat_count) as total_seats_sold, SUM(total_fare) as total_revenue FROM transport_bookings WHERE status != "cancelled"';
    const trParams = [];
    if (company && company !== 'All') {
      trQuery += ' AND company LIKE ?';
      trParams.push(`%${company}%`);
    }
    const transportStats = db.prepare(trQuery).get(...trParams);

    // Hotel Stats
    let htlQuery = 'SELECT COUNT(*) as total_reservations, SUM(room_count) as total_rooms_booked, SUM(total_cost) as total_revenue FROM hotel_bookings WHERE status != "cancelled"';
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

app.listen(PORT, () => {
  console.log(`🚀 YEANA Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 Health Endpoint: http://localhost:${PORT}/api/health`);
  console.log(`📍 Places Endpoint: http://localhost:${PORT}/api/places`);
  console.log(`🎫 Transport Bookings: http://localhost:${PORT}/api/bookings/transport`);
  console.log(`🏨 Hotel Bookings: http://localhost:${PORT}/api/bookings/hotel`);
  console.log(`🏢 Company E-Portal Stats: http://localhost:${PORT}/api/portal/stats`);
});

