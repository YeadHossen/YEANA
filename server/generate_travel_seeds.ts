import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  INITIAL_DISTRICTS, 
  INITIAL_PLACES, 
  INITIAL_HOTELS, 
  INITIAL_RESTAURANTS, 
  INITIAL_TRANSPORTS, 
  INITIAL_SHOPPING, 
  INITIAL_RIDES 
} from '../src/data/seedData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');

function escapeSql(str: string | null | undefined): string {
  if (str === null || str === undefined) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

function escapeArray(arr: any[] | undefined): string {
  if (!arr || arr.length === 0) return "'{}'::text[]";
  const items = arr.map(item => {
    const val = typeof item === 'string' ? item : (item?.name || String(item));
    return `"${val.replace(/"/g, '\\"')}"`;
  }).join(',');
  return `'${items}'::text[]`;
}

const districtSlugToId = new Map(INITIAL_DISTRICTS.map((d, index) => [d.id, index + 1]));

let sql = `-- ========================================================================
-- YEANA — Bangladesh Tour & Travel Platform
-- Migration: 20261007000005_seed_travel_data.sql
-- Description: Seed normalized Travel Data: Transport Types, Destinations,
--              Destination Images, Hotels, Hotel Images, Restaurants,
--              Restaurant Images, Transport Routes, Shopping Places,
--              Rental Services, and Rental Vehicles.
-- ========================================================================

-- 1. SEED TRANSPORT TYPES
INSERT INTO public.transport_types (id, name, name_bn, icon, description, is_active) VALUES
  (1, 'Bus', 'বাস', 'Bus', 'Intercity luxury AC and Non-AC coach network', true),
  (2, 'Train', 'ট্রেন', 'Train', 'Bangladesh Railway intercity express train network', true),
  (3, 'Flight', 'বিমান', 'Plane', 'Domestic flight services connecting major airports', true),
  (4, 'Launch', 'লঞ্চ', 'Ship', 'Inland water luxury river cruisers and passenger launches', true),
  (5, 'Car', 'প্রাইভেট কার / মাইক্রোবাস', 'Car', 'Chauffeur-driven tourist sedans, SUVs, and rental vans', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

SELECT setval('public.transport_types_id_seq', (SELECT MAX(id) FROM public.transport_types));

-- 2. SEED DESTINATIONS & DESTINATION IMAGES
`;

// Destinations
INITIAL_PLACES.forEach((p, idx) => {
  const distId = districtSlugToId.get(p.district_id) || 1;
  const destId = `00000000-0000-4000-8000-${String(idx + 1).padStart(12, '0')}`;
  
  sql += `
INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '${destId}', ${distId}, ${escapeSql(p.name)}, ${escapeSql(p.name_bn)}, ${escapeSql(p.category || 'Nature')},
  ${escapeSql(p.short_description)}, ${escapeSql(p.full_description)}, ${escapeSql(p.location)},
  ${p.lat || 'NULL'}, ${p.lng || 'NULL'}, 50.00, ${escapeSql(p.entry_fee || 'Free / Nominal')},
  ${escapeSql(p.opening_time || '8:00 AM - 6:00 PM')}, ${escapeSql(p.best_time || 'October to March')},
  ${escapeSql(p.how_to_reach)}, ${escapeSql(p.image_url)}, ${p.rating || 4.5}, ${p.reviews_count || 120},
  ${p.is_featured ? 'true' : 'false'}, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('${destId}', ${escapeSql(p.image_url)}, ${escapeSql(p.name)}, true, 1)
ON CONFLICT DO NOTHING;
`;

  if (p.gallery && p.gallery.length > 0) {
    p.gallery.forEach((imgUrl, imgIdx) => {
      sql += `INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('${destId}', ${escapeSql(imgUrl)}, ${escapeSql(p.name + ' - Photo ' + (imgIdx + 2))}, false, ${imgIdx + 2})
ON CONFLICT DO NOTHING;
`;
    });
  }
});

// Hotels
sql += `\n-- 3. SEED HOTELS & HOTEL IMAGES\n`;
INITIAL_HOTELS.forEach((h, idx) => {
  const distId = districtSlugToId.get(h.district_id) || 1;
  const hotelId = `00000000-0000-4000-8100-${String(idx + 1).padStart(12, '0')}`;

  sql += `
INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '${hotelId}', ${distId}, ${escapeSql(h.name)}, ${escapeSql(h.name_bn)}, ${escapeSql('Luxury accommodation in ' + h.location)},
  ${h.rating || 4.5}, ${h.reviews_count || 85}, ${h.price_per_night || 4500}, ${escapeSql(h.location)},
  ${h.lat || 'NULL'}, ${h.lng || 'NULL'}, ${escapeSql(h.contact_phone || '+880 1700-112233')}, ${escapeSql(h.contact_email || 'info@hotel.com.bd')},
  ${h.has_ac ? 'true' : 'false'}, ${h.has_wifi ? 'true' : 'false'}, ${h.has_parking ? 'true' : 'false'},
  ${h.has_restaurant ? 'true' : 'false'}, ${h.has_room_service ? 'true' : 'false'}, ${h.has_security ? 'true' : 'false'},
  ${escapeSql(h.image_url)}, ${escapeSql(h.check_in || '12:00 PM')}, ${escapeSql(h.check_out || '11:00 AM')},
  ${escapeArray(h.room_types)}, ${h.is_featured ? 'true' : 'false'}, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('${hotelId}', ${escapeSql(h.image_url)}, 'Main Property', ${escapeSql(h.name)}, true, 1)
ON CONFLICT DO NOTHING;
`;

  if (h.gallery && h.gallery.length > 0) {
    h.gallery.forEach((imgUrl, imgIdx) => {
      sql += `INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('${hotelId}', ${escapeSql(imgUrl)}, 'Deluxe Room', ${escapeSql(h.name + ' - View ' + (imgIdx + 2))}, false, ${imgIdx + 2})
ON CONFLICT DO NOTHING;
`;
    });
  }
});

// Restaurants
sql += `\n-- 4. SEED RESTAURANTS & RESTAURANT IMAGES\n`;
INITIAL_RESTAURANTS.forEach((r, idx) => {
  const distId = districtSlugToId.get(r.district_id) || 1;
  const restId = `00000000-0000-4000-8200-${String(idx + 1).padStart(12, '0')}`;

  sql += `
INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '${restId}', ${distId}, ${escapeSql(r.name)}, ${escapeSql(r.name_bn)}, ${r.rating || 4.5},
  ${r.reviews_count || 150}, ${escapeSql(r.cuisine)}, ${escapeSql(r.price_tier || '৳৳')},
  ${escapeSql(r.location)}, ${r.lat || 'NULL'}, ${r.lng || 'NULL'}, ${escapeSql(r.phone || '+880 1800-445566')},
  ${escapeSql(r.opening_hours || '10:00 AM - 11:00 PM')}, ${escapeArray(r.menu_highlights)},
  ${escapeSql(r.image_url)}, ${r.is_featured ? 'true' : 'false'}, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('${restId}', ${escapeSql(r.image_url)}, 'Signature Dish', ${escapeSql(r.name)}, true, 1)
ON CONFLICT DO NOTHING;
`;
});

// Transport Routes
sql += `\n-- 5. SEED TRANSPORT ROUTES\n`;
INITIAL_TRANSPORTS.forEach((t, idx) => {
  const typeMap: Record<string, number> = { 'Bus': 1, 'Train': 2, 'Flight': 3, 'Launch': 4, 'Car': 5 };
  const typeId = typeMap[t.transport_type] || 1;
  
  // Find from and to district IDs
  const fromDistSlug = t.from_district.toLowerCase().replace(/['\s]/g, '-');
  const toDistSlug = t.to_district.toLowerCase().replace(/['\s]/g, '-');
  const fromDistId = districtSlugToId.get(fromDistSlug) || districtSlugToId.get('dhaka') || 1;
  const toDistId = districtSlugToId.get(toDistSlug) || districtSlugToId.get('coxs-bazar') || 2;
  const routeId = `00000000-0000-4000-8300-${String(idx + 1).padStart(12, '0')}`;

  sql += `
INSERT INTO public.transport_routes (
  id, transport_type_id, company, from_district_id, to_district_id, departure_time, 
  arrival_time, duration, price_min, price_max, boarding_points, schedule_days, 
  contact_phone, is_active
) VALUES (
  '${routeId}', ${typeId}, ${escapeSql(t.company)}, ${fromDistId}, ${toDistId},
  ${escapeSql(t.departure_time)}, ${escapeSql(t.arrival_time)}, ${escapeSql(t.duration)},
  ${t.price_min}, ${t.price_max}, ${escapeArray(t.boarding_points)}, ${escapeSql(t.schedule_days || 'Daily')},
  ${escapeSql(t.contact_phone || '+880 1900-334455')}, true
) ON CONFLICT (id) DO UPDATE SET
  company = EXCLUDED.company,
  departure_time = EXCLUDED.departure_time,
  arrival_time = EXCLUDED.arrival_time;
`;
});

// Shopping Places
sql += `\n-- 6. SEED SHOPPING PLACES\n`;
INITIAL_SHOPPING.forEach((s, idx) => {
  const distId = districtSlugToId.get(s.district_id) || 1;
  const shopId = `00000000-0000-4000-8400-${String(idx + 1).padStart(12, '0')}`;

  sql += `
INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '${shopId}', ${distId}, ${escapeSql(s.name)}, ${escapeSql(s.name_bn)}, ${escapeSql(s.category)},
  ${escapeSql(s.location)}, ${escapeSql(s.famous_for)}, ${escapeSql(s.opening_hours || '10:00 AM - 8:00 PM')},
  ${escapeSql(s.image_url)}, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;
`;
});

// Rental Services & Vehicles
sql += `\n-- 7. SEED RENTAL SERVICES & VEHICLES\n`;
INITIAL_RIDES.forEach((r, idx) => {
  const distId = districtSlugToId.get(r.district_id) || 1;
  const serviceId = `00000000-0000-4000-8500-${String(idx + 1).padStart(12, '0')}`;
  const vehicleId = `00000000-0000-4000-8600-${String(idx + 1).padStart(12, '0')}`;

  sql += `
INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '${serviceId}', ${distId}, ${escapeSql(r.owner_name + ' Travels & Car Rental')},
  ${escapeSql(r.contact_phone)}, ${escapeSql('rental@yeana.bd')}, ${escapeSql(r.location)}, 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '${vehicleId}', '${serviceId}', ${escapeSql(r.vehicle_type)}, ${escapeSql(r.model)},
  ${escapeSql(r.rental_type || 'With Driver')}, ${r.price_per_hour || 'NULL'}, ${r.price_per_day},
  ${escapeSql(r.availability_status || 'Available')}, ${escapeSql(r.image_url)}, true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;
`;
});

fs.writeFileSync(path.join(migrationsDir, '20261007000005_seed_travel_data.sql'), sql, 'utf-8');
console.log('Generated 20261007000005_seed_travel_data.sql');
