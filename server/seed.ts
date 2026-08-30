import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  INITIAL_DISTRICTS,
  INITIAL_PLACES,
  INITIAL_HOTELS,
  INITIAL_RESTAURANTS,
  INITIAL_TRANSPORTS,
  INITIAL_SHOPPING,
  INITIAL_RIDES,
  SAMPLE_TRIP
} from '../src/data/seedData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'yeana.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = OFF'); // Temporarily off for clean bulk reset

// 1. Initialize schema
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);

// 2. Clean out old data
db.exec(`
  DELETE FROM favorites;
  DELETE FROM reviews;
  DELETE FROM trips;
  DELETE FROM rides;
  DELETE FROM shopping_places;
  DELETE FROM transport_routes;
  DELETE FROM restaurants;
  DELETE FROM hotels;
  DELETE FROM places;
  DELETE FROM districts;
  DELETE FROM profiles;
`);
console.log('✅ SQLite Schema initialized & cleared.');

// Re-enable foreign keys
db.pragma('foreign_keys = ON');

// 3. Seed Profiles / Users
const insertProfile = db.prepare(`
  INSERT OR REPLACE INTO profiles (id, full_name, email, phone, avatar_url, role, bio, preferred_language)
  VALUES (@id, @full_name, @email, @phone, @avatar_url, @role, @bio, @preferred_language)
`);

const profiles = [
  {
    id: 'usr-admin-01',
    full_name: 'YEANA Admin',
    email: 'admin@yeana.com.bd',
    phone: '+880 1800-999000',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'admin',
    bio: 'Platform Lead & Verified Destination Curator at YEANA Bangladesh.',
    preferred_language: 'en'
  },
  {
    id: 'usr-traveler-01',
    full_name: 'Anika Rahman',
    email: 'anika.travel@yeana.bd',
    phone: '+880 1712-345678',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role: 'user',
    bio: 'Passionate backpacker exploring every corner of beautiful Bangladesh.',
    preferred_language: 'en'
  }
];

profiles.forEach(p => insertProfile.run(p));
console.log(`✅ Seeded ${profiles.length} user profiles.`);

// 4. Seed Districts (All 64 Zilas)
const insertDistrict = db.prepare(`
  INSERT OR REPLACE INTO districts (id, division, name, name_bn, description, image_url, lat, lng, popular_season, place_count)
  VALUES (@id, @division, @name, @name_bn, @description, @image_url, @lat, @lng, @popular_season, @place_count)
`);

INITIAL_DISTRICTS.forEach(d => {
  insertDistrict.run({
    id: d.id,
    division: d.division,
    name: d.name,
    name_bn: d.name_bn,
    description: d.description || '',
    image_url: d.image_url || '',
    lat: d.lat || null,
    lng: d.lng || null,
    popular_season: d.popular_season || '',
    place_count: d.place_count || 0
  });
});
console.log(`✅ Seeded all ${INITIAL_DISTRICTS.length} districts of Bangladesh.`);

// 5. Seed Places
const insertPlace = db.prepare(`
  INSERT OR REPLACE INTO places (
    id, district_id, district_name, division, name, name_bn, rating, reviews_count,
    short_description, full_description, location, lat, lng, entry_fee, opening_time,
    best_time, how_to_reach, image_url, gallery, category, is_featured, nearby_hotels, nearby_restaurants
  ) VALUES (
    @id, @district_id, @district_name, @division, @name, @name_bn, @rating, @reviews_count,
    @short_description, @full_description, @location, @lat, @lng, @entry_fee, @opening_time,
    @best_time, @how_to_reach, @image_url, @gallery, @category, @is_featured, @nearby_hotels, @nearby_restaurants
  )
`);

INITIAL_PLACES.forEach(p => {
  insertPlace.run({
    id: p.id,
    district_id: p.district_id,
    district_name: p.district_name || '',
    division: p.division || 'Sylhet',
    name: p.name,
    name_bn: p.name_bn,
    rating: p.rating || 4.5,
    reviews_count: p.reviews_count || 0,
    short_description: p.short_description || '',
    full_description: p.full_description || '',
    location: p.location || '',
    lat: p.lat || null,
    lng: p.lng || null,
    entry_fee: p.entry_fee || '',
    opening_time: p.opening_time || '',
    best_time: p.best_time || '',
    how_to_reach: p.how_to_reach || '',
    image_url: p.image_url,
    gallery: JSON.stringify(p.gallery || []),
    category: p.category || 'Nature',
    is_featured: p.is_featured ? 1 : 0,
    nearby_hotels: JSON.stringify(p.nearby_hotels || []),
    nearby_restaurants: JSON.stringify(p.nearby_restaurants || [])
  });
});
console.log(`✅ Seeded ${INITIAL_PLACES.length} tourist places.`);

// 6. Seed Hotels
const insertHotel = db.prepare(`
  INSERT OR REPLACE INTO hotels (
    id, district_id, district_name, name, name_bn, rating, reviews_count,
    price_per_night, price_formatted, location, address, contact_phone, contact_email,
    has_ac, has_wifi, has_parking, has_restaurant, has_room_service, has_security,
    image_url, gallery, room_types, check_in, check_out, is_featured
  ) VALUES (
    @id, @district_id, @district_name, @name, @name_bn, @rating, @reviews_count,
    @price_per_night, @price_formatted, @location, @address, @contact_phone, @contact_email,
    @has_ac, @has_wifi, @has_parking, @has_restaurant, @has_room_service, @has_security,
    @image_url, @gallery, @room_types, @check_in, @check_out, @is_featured
  )
`);

INITIAL_HOTELS.forEach(h => {
  insertHotel.run({
    id: h.id,
    district_id: h.district_id,
    district_name: h.district_name || '',
    name: h.name,
    name_bn: h.name_bn,
    rating: h.rating || 4.5,
    reviews_count: h.reviews_count || 0,
    price_per_night: h.price_per_night,
    price_formatted: h.price_formatted || `৳${h.price_per_night.toLocaleString()}/night`,
    location: h.location || '',
    address: h.address || '',
    contact_phone: h.contact_phone || '',
    contact_email: h.contact_email || '',
    has_ac: h.has_ac ? 1 : 0,
    has_wifi: h.has_wifi ? 1 : 0,
    has_parking: h.has_parking ? 1 : 0,
    has_restaurant: h.has_restaurant ? 1 : 0,
    has_room_service: h.has_room_service ? 1 : 0,
    has_security: h.has_security ? 1 : 0,
    image_url: h.image_url,
    gallery: JSON.stringify(h.gallery || []),
    room_types: JSON.stringify(h.room_types || []),
    check_in: h.check_in || '12:00 PM',
    check_out: h.check_out || '11:00 AM',
    is_featured: h.is_featured ? 1 : 0
  });
});
console.log(`✅ Seeded ${INITIAL_HOTELS.length} hotels & resorts.`);

// 7. Seed Restaurants
const insertRestaurant = db.prepare(`
  INSERT OR REPLACE INTO restaurants (
    id, district_id, district_name, name, name_bn, rating, reviews_count,
    cuisine, cuisine_bn, price_tier, location, address, phone, opening_hours,
    menu_highlights, image_url, is_featured
  ) VALUES (
    @id, @district_id, @district_name, @name, @name_bn, @rating, @reviews_count,
    @cuisine, @cuisine_bn, @price_tier, @location, @address, @phone, @opening_hours,
    @menu_highlights, @image_url, @is_featured
  )
`);

INITIAL_RESTAURANTS.forEach(r => {
  insertRestaurant.run({
    id: r.id,
    district_id: r.district_id,
    district_name: r.district_name || '',
    name: r.name,
    name_bn: r.name_bn,
    rating: r.rating || 4.5,
    reviews_count: r.reviews_count || 0,
    cuisine: r.cuisine,
    cuisine_bn: r.cuisine_bn || '',
    price_tier: r.price_tier || '৳৳',
    location: r.location || '',
    address: r.address || '',
    phone: r.phone || '',
    opening_hours: r.opening_hours || '',
    menu_highlights: JSON.stringify(r.menu_highlights || []),
    image_url: r.image_url,
    is_featured: r.is_featured ? 1 : 0
  });
});
console.log(`✅ Seeded ${INITIAL_RESTAURANTS.length} restaurants.`);

// 8. Seed Transport Routes
const insertTransport = db.prepare(`
  INSERT OR REPLACE INTO transport_routes (
    id, transport_type, company, from_district, to_district, departure_time, arrival_time,
    duration, price_min, price_max, boarding_points, schedule_days, contact_phone, is_active
  ) VALUES (
    @id, @transport_type, @company, @from_district, @to_district, @departure_time, @arrival_time,
    @duration, @price_min, @price_max, @boarding_points, @schedule_days, @contact_phone, @is_active
  )
`);

INITIAL_TRANSPORTS.forEach(t => {
  insertTransport.run({
    id: t.id,
    transport_type: t.transport_type,
    company: t.company,
    from_district: t.from_district,
    to_district: t.to_district,
    departure_time: t.departure_time,
    arrival_time: t.arrival_time,
    duration: t.duration,
    price_min: t.price_min,
    price_max: t.price_max,
    boarding_points: JSON.stringify(t.boarding_points || []),
    schedule_days: t.schedule_days || '',
    contact_phone: t.contact_phone || '',
    is_active: t.is_active ? 1 : 0
  });
});
console.log(`✅ Seeded ${INITIAL_TRANSPORTS.length} transport routes.`);

// 9. Seed Shopping Places
const insertShopping = db.prepare(`
  INSERT OR REPLACE INTO shopping_places (
    id, district_id, district_name, name, name_bn, category, location, address,
    famous_for, opening_hours, image_url
  ) VALUES (
    @id, @district_id, @district_name, @name, @name_bn, @category, @location, @address,
    @famous_for, @opening_hours, @image_url
  )
`);

INITIAL_SHOPPING.forEach(s => {
  insertShopping.run({
    id: s.id,
    district_id: s.district_id,
    district_name: s.district_name || '',
    name: s.name,
    name_bn: s.name_bn,
    category: s.category,
    location: s.location || '',
    address: s.address || '',
    famous_for: s.famous_for || '',
    opening_hours: s.opening_hours || '',
    image_url: s.image_url
  });
});
console.log(`✅ Seeded ${INITIAL_SHOPPING.length} shopping spots.`);

// 10. Seed Rides
const insertRide = db.prepare(`
  INSERT OR REPLACE INTO rides (
    id, district_id, district_name, vehicle_type, model, rental_type, price_per_hour, price_per_day,
    location, owner_name, contact_phone, availability_status, image_url
  ) VALUES (
    @id, @district_id, @district_name, @vehicle_type, @model, @rental_type, @price_per_hour, @price_per_day,
    @location, @owner_name, @contact_phone, @availability_status, @image_url
  )
`);

INITIAL_RIDES.forEach(r => {
  insertRide.run({
    id: r.id,
    district_id: r.district_id,
    district_name: r.district_name || '',
    vehicle_type: r.vehicle_type,
    model: r.model,
    rental_type: r.rental_type,
    price_per_hour: r.price_per_hour || null,
    price_per_day: r.price_per_day,
    location: r.location || '',
    owner_name: r.owner_name || '',
    contact_phone: r.contact_phone,
    availability_status: r.availability_status || 'Available',
    image_url: r.image_url
  });
});
console.log(`✅ Seeded ${INITIAL_RIDES.length} local rides.`);

// 11. Seed Sample Trip
if (SAMPLE_TRIP) {
  const insertTrip = db.prepare(`
    INSERT OR REPLACE INTO trips (
      id, user_id, title, destination, start_date, end_date, duration_days,
      budget, total_budget, places, hotels, notes, is_public
    ) VALUES (
      @id, @user_id, @title, @destination, @start_date, @end_date, @duration_days,
      @budget, @total_budget, @places, @hotels, @notes, @is_public
    )
  `);

  insertTrip.run({
    id: SAMPLE_TRIP.id,
    user_id: 'usr-traveler-01',
    title: SAMPLE_TRIP.title,
    destination: SAMPLE_TRIP.destination || 'Sylhet',
    start_date: SAMPLE_TRIP.start_date,
    end_date: SAMPLE_TRIP.end_date,
    duration_days: SAMPLE_TRIP.duration_days || 3,
    budget: JSON.stringify(SAMPLE_TRIP.budget || {}),
    total_budget: SAMPLE_TRIP.total_budget || 10000,
    places: JSON.stringify(SAMPLE_TRIP.places || []),
    hotels: JSON.stringify(SAMPLE_TRIP.hotels || []),
    notes: SAMPLE_TRIP.notes || '',
    is_public: SAMPLE_TRIP.is_public ? 1 : 0
  });
  console.log(`✅ Seeded sample trip: "${SAMPLE_TRIP.title}".`);
}

console.log(`\n🎉 YEANA SQLite database successfully populated at: ${dbPath}`);
db.close();
