-- ========================================================================
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

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000001', 1, 'Lalbagh Fort & Ahsan Manzil', 'লালবাগ কেল্লা ও আহসান মঞ্জিল', 'Heritage',
  '17th-century Mughal fort complex with Pari Bibi tomb and the Pink Palace on the Buriganga river.', 'Lalbagh Fort & Ahsan Manzil is one of the premier tourist landmarks of Dhaka in Dhaka division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Dhaka Sadar, Bangladesh',
  23.8103, 90.4125, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to March',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Dhaka.', 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800', 4.7, 210,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000001', 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800', 'Lalbagh Fort & Ahsan Manzil', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000001', 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800', 'Lalbagh Fort & Ahsan Manzil - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000001', 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800&auto=format&fit=crop&q=80', 'Lalbagh Fort & Ahsan Manzil - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000002', 2, 'Bangabandhu Safari Park & Bhawal Sal Forest', 'বঙ্গবন্ধু সাফারি পার্ক ও ভাওয়াল উদ্যান', 'Nature',
  'South Asia’s largest open wildlife safari park with tiger, lion and elephant zones in Sal forests.', 'Bangabandhu Safari Park & Bhawal Sal Forest is one of the premier tourist landmarks of Gazipur in Dhaka division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Gazipur Sadar, Bangladesh',
  24.0023, 90.4267, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Year round, especially Winter & Weekends',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Gazipur.', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 4.9, 246,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000002', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Bangabandhu Safari Park & Bhawal Sal Forest', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000002', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Bangabandhu Safari Park & Bhawal Sal Forest - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000002', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', 'Bangabandhu Safari Park & Bhawal Sal Forest - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000003', 3, 'Panam City (Sonargaon) & Folk Art Museum', 'পানাম নগর (সোনারগাঁও) ও লোকশিল্প জাদুঘর', 'Heritage',
  'Historic ghost town with colonial architecture and Zainul Abedin folk art heritage foundation.', 'Panam City (Sonargaon) & Folk Art Museum is one of the premier tourist landmarks of Narayanganj in Dhaka division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Narayanganj Sadar, Bangladesh',
  23.6238, 90.5, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'November to February',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Narayanganj.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 4.9, 318,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000003', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 'Panam City (Sonargaon) & Folk Art Museum', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000003', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 'Panam City (Sonargaon) & Folk Art Museum - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000003', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Panam City (Sonargaon) & Folk Art Museum - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000004', 4, 'Mohera Zamindar Bari & 201 Dome Mosque', 'মহেরা জমিদার বাড়ি ও ২০১ গম্বুজ মসজিদ', 'Heritage',
  'Magnificent 18th-century palace architecture and the world record 201-dome modern brick mosque.', 'Mohera Zamindar Bari & 201 Dome Mosque is one of the premier tourist landmarks of Tangail in Dhaka division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Tangail Sadar, Bangladesh',
  24.2513, 89.9167, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to March',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Tangail.', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', 4.9, 246,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000004', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', 'Mohera Zamindar Bari & 201 Dome Mosque', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000004', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', 'Mohera Zamindar Bari & 201 Dome Mosque - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000004', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', 'Mohera Zamindar Bari & 201 Dome Mosque - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000005', 5, 'Nikli Haor & Submerged Highway', 'নিকলী হাওর ও অল-ওয়েদার সড়ক', 'Nature',
  'Expansive water kingdom, scenic boat rides over submerged roads, and fresh freshwater river fish.', 'Nikli Haor & Submerged Highway is one of the premier tourist landmarks of Kishoreganj in Dhaka division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Kishoreganj Sadar, Bangladesh',
  24.4449, 90.7766, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'July to October (Haor season) & Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Kishoreganj.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 4.9, 318,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000005', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Nikli Haor & Submerged Highway', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000005', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Nikli Haor & Submerged Highway - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000005', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 'Nikli Haor & Submerged Highway - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000006', 6, 'Manikganj Historic Landmark & Eco Park', 'মানিকগঞ্জ ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Manikganj.', 'Manikganj Historic Landmark & Eco Park is one of the premier tourist landmarks of Manikganj in Dhaka division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Manikganj Sadar, Bangladesh',
  23.8644, 90.0047, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Autumn and Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Manikganj.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 4.7, 282,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000006', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 'Manikganj Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000006', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 'Manikganj Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000006', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 'Manikganj Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000007', 7, 'Munshiganj Historic Landmark & Eco Park', 'মুন্সিগঞ্জ ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Munshiganj.', 'Munshiganj Historic Landmark & Eco Park is one of the premier tourist landmarks of Munshiganj in Dhaka division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Munshiganj Sadar, Bangladesh',
  23.5422, 90.5305, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to March',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Munshiganj.', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 4.8, 300,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000007', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Munshiganj Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000007', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Munshiganj Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000007', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Munshiganj Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000008', 8, 'Narsingdi Historic Landmark & Eco Park', 'নরসিংদী ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Narsingdi.', 'Narsingdi Historic Landmark & Eco Park is one of the premier tourist landmarks of Narsingdi in Dhaka division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Narsingdi Sadar, Bangladesh',
  23.9322, 90.7154, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Winter & Spring',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Narsingdi.', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 4.7, 282,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000008', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Narsingdi Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000008', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Narsingdi Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000008', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Narsingdi Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000009', 9, 'Faridpur Historic Landmark & Eco Park', 'ফরিদপুর ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Faridpur.', 'Faridpur Historic Landmark & Eco Park is one of the premier tourist landmarks of Faridpur in Dhaka division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Faridpur Sadar, Bangladesh',
  23.6071, 89.8429, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'November to February',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Faridpur.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 4.6, 264,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000009', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 'Faridpur Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000009', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 'Faridpur Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000009', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 'Faridpur Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000010', 10, 'Gopalganj Historic Landmark & Eco Park', 'গোপালগঞ্জ ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Gopalganj.', 'Gopalganj Historic Landmark & Eco Park is one of the premier tourist landmarks of Gopalganj in Dhaka division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Gopalganj Sadar, Bangladesh',
  23.0051, 89.8266, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Year round',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Gopalganj.', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 4.7, 282,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000010', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Gopalganj Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000010', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Gopalganj Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000010', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Gopalganj Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000011', 11, 'Madaripur Historic Landmark & Eco Park', 'মাদারীপুর ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Madaripur.', 'Madaripur Historic Landmark & Eco Park is one of the premier tourist landmarks of Madaripur in Dhaka division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Madaripur Sadar, Bangladesh',
  23.1641, 90.1897, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Madaripur.', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 4.7, 282,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000011', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Madaripur Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000011', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Madaripur Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000011', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Madaripur Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000012', 12, 'Rajbari Historic Landmark & Eco Park', 'রাজবাড়ী ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Rajbari.', 'Rajbari Historic Landmark & Eco Park is one of the premier tourist landmarks of Rajbari in Dhaka division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Rajbari Sadar, Bangladesh',
  23.7574, 89.6445, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to February',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Rajbari.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 4.9, 246,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000012', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Rajbari Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000012', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Rajbari Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000012', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Rajbari Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000013', 13, 'Shariatpur Historic Landmark & Eco Park', 'শরীয়তপুর ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Shariatpur.', 'Shariatpur Historic Landmark & Eco Park is one of the premier tourist landmarks of Shariatpur in Dhaka division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Shariatpur Sadar, Bangladesh',
  23.2423, 90.4348, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Winter & Autumn',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Shariatpur.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 4.8, 300,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000013', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 'Shariatpur Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000013', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 'Shariatpur Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000013', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 'Shariatpur Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000014', 14, 'Patenga Beach & Guliakhali Green Beach', 'পতেঙ্গা ও গুলিয়াখালী সমুদ্র সৈকত', 'Beach',
  'Naval beach viewpoints, green grass carpeted Guliakhali, and historic Chittagong port.', 'Patenga Beach & Guliakhali Green Beach is one of the premier tourist landmarks of Chattogram in Chattogram division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Chattogram Sadar, Bangladesh',
  22.3569, 91.7832, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to March',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Chattogram.', 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800', 4.8, 300,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000014', 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800', 'Patenga Beach & Guliakhali Green Beach', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000014', 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800', 'Patenga Beach & Guliakhali Green Beach - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000014', 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800&auto=format&fit=crop&q=80', 'Patenga Beach & Guliakhali Green Beach - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000015', 15, 'Inani Beach, Marine Drive & Saint Martin', 'ইনানী বিচ, মেরিন ড্রাইভ ও সেন্ট মার্টিন', 'Beach',
  'World’s longest sandy beach, coral reefs, and scenic hillside coastal highway.', 'Inani Beach, Marine Drive & Saint Martin is one of the premier tourist landmarks of Cox''s Bazar in Chattogram division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Cox''s Bazar Sadar, Bangladesh',
  21.4272, 92.0058, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'November to March',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Cox''s Bazar.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 4.9, 318,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000015', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Inani Beach, Marine Drive & Saint Martin', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000015', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Inani Beach, Marine Drive & Saint Martin - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000015', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 'Inani Beach, Marine Drive & Saint Martin - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000016', 16, 'Sajek Valley & Kaptai Lake', 'সাজেক ভ্যালি ও কাপ্তাই লেক', 'Hill',
  'Kingdom of clouds atop lush ridges and boat cruising across turquoise Kaptai lake.', 'Sajek Valley & Kaptai Lake is one of the premier tourist landmarks of Rangamati (Sajek) in Chattogram division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Rangamati (Sajek) Sadar, Bangladesh',
  22.6533, 92.1753, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'September to February',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Rangamati (Sajek).', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 4.7, 426,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000016', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 'Sajek Valley & Kaptai Lake', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000016', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 'Sajek Valley & Kaptai Lake - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000016', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Sajek Valley & Kaptai Lake - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000017', 17, 'Nilgiri Hilltop & Nafakhum Waterfall', 'নীলগিরি ও নাফাখুম জলপ্রপাত', 'Waterfall',
  'Touch clouds at Nilgiri resort and trek through mountain streams to roaring waterfalls.', 'Nilgiri Hilltop & Nafakhum Waterfall is one of the premier tourist landmarks of Bandarban in Chattogram division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Bandarban Sadar, Bangladesh',
  22.1953, 92.2184, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to March',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Bandarban.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 4.7, 282,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000017', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 'Nilgiri Hilltop & Nafakhum Waterfall', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000017', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 'Nilgiri Hilltop & Nafakhum Waterfall - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000017', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 'Nilgiri Hilltop & Nafakhum Waterfall - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000018', 18, 'Alutila Mysterious Cave & Richhang Falls', 'আলুটিলা গুহা ও রিছাং ঝর্ণা', 'Nature',
  'Walk through torch-lit prehistoric underground stone cave and swim in cascading falls.', 'Alutila Mysterious Cave & Richhang Falls is one of the premier tourist landmarks of Khagrachhari in Chattogram division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Khagrachhari Sadar, Bangladesh',
  23.1192, 91.9846, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to March',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Khagrachhari.', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', 4.6, 336,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000018', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', 'Alutila Mysterious Cave & Richhang Falls', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000018', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', 'Alutila Mysterious Cave & Richhang Falls - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000018', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Alutila Mysterious Cave & Richhang Falls - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000019', 19, 'Shalban Vihara & Mainamati Archaeological Site', 'শালবন বিহার ও ময়নামতি', 'Heritage',
  '8th-century ancient Buddhist university and monastic complex in Lalmai hills.', 'Shalban Vihara & Mainamati Archaeological Site is one of the premier tourist landmarks of Cumilla in Chattogram division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Cumilla Sadar, Bangladesh',
  23.4682, 91.1788, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'November to February',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Cumilla.', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 4.9, 246,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000019', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Shalban Vihara & Mainamati Archaeological Site', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000019', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Shalban Vihara & Mainamati Archaeological Site - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000019', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', 'Shalban Vihara & Mainamati Archaeological Site - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000020', 20, 'Feni Historic Landmark & Eco Park', 'ফেনী ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Feni.', 'Feni Historic Landmark & Eco Park is one of the premier tourist landmarks of Feni in Chattogram division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Feni Sadar, Bangladesh',
  23.0186, 91.3966, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Winter & Autumn',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Feni.', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 4.6, 192,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000020', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Feni Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000020', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Feni Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000020', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Feni Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000021', 21, 'Brahmanbaria Historic Landmark & Eco Park', 'ব্রাহ্মণবাড়িয়া ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Brahmanbaria.', 'Brahmanbaria Historic Landmark & Eco Park is one of the premier tourist landmarks of Brahmanbaria in Chattogram division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Brahmanbaria Sadar, Bangladesh',
  23.9571, 91.1119, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Brahmanbaria.', 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80', 4.6, 336,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000021', 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80', 'Brahmanbaria Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000021', 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80', 'Brahmanbaria Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000021', 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80', 'Brahmanbaria Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000022', 22, 'Noakhali Historic Landmark & Eco Park', 'নোয়াখালী ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Noakhali.', 'Noakhali Historic Landmark & Eco Park is one of the premier tourist landmarks of Noakhali in Chattogram division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Noakhali Sadar, Bangladesh',
  22.8696, 91.0993, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'November to February',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Noakhali.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 4.6, 264,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000022', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 'Noakhali Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000022', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 'Noakhali Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000022', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 'Noakhali Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000023', 23, 'Chandpur Historic Landmark & Eco Park', 'চাঁদপুর ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Chandpur.', 'Chandpur Historic Landmark & Eco Park is one of the premier tourist landmarks of Chandpur in Chattogram division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Chandpur Sadar, Bangladesh',
  23.2333, 90.6667, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Monsoon for Hilsa & Winter for cruising',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Chandpur.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 4.6, 264,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000023', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 'Chandpur Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000023', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 'Chandpur Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000023', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 'Chandpur Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000024', 24, 'Lakshmipur Historic Landmark & Eco Park', 'লক্ষ্মীপুর ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Lakshmipur.', 'Lakshmipur Historic Landmark & Eco Park is one of the premier tourist landmarks of Lakshmipur in Chattogram division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Lakshmipur Sadar, Bangladesh',
  22.9425, 90.8412, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Lakshmipur.', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 4.8, 300,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000024', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Lakshmipur Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000024', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Lakshmipur Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000024', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Lakshmipur Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000025', 25, 'Jaflong & Ratargul Swamp Forest', 'জাফলং ও রাতারগুল সোয়াম্প ফরেস্ট', 'Nature',
  'Crystal clear river beds under Meghalaya mountains and freshwater mangrove swamp forest.', 'Jaflong & Ratargul Swamp Forest is one of the premier tourist landmarks of Sylhet in Sylhet division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Sylhet Sadar, Bangladesh',
  24.8949, 91.8687, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to March (Monsoon for waterfalls)',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Sylhet.', 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800', 4.8, 228,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000025', 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800', 'Jaflong & Ratargul Swamp Forest', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000025', 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800', 'Jaflong & Ratargul Swamp Forest - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000025', 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&auto=format&fit=crop&q=80', 'Jaflong & Ratargul Swamp Forest - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000026', 26, 'Sreemangal Tea Estates & Lawachara', 'শ্রীমঙ্গল চা বাগান ও লাউয়াছড়া', 'Tea Garden',
  'Lush green tea gardens, tropical rainforest, and seven-layer tea.', 'Sreemangal Tea Estates & Lawachara is one of the premier tourist landmarks of Moulvibazar (Sreemangal) in Sylhet division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Moulvibazar (Sreemangal) Sadar, Bangladesh',
  24.3065, 91.7296, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Year round, especially Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Moulvibazar (Sreemangal).', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 4.6, 552,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000026', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Sreemangal Tea Estates & Lawachara', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000026', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Sreemangal Tea Estates & Lawachara - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000026', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', 'Sreemangal Tea Estates & Lawachara - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000027', 27, 'Tanguar Haor, Shimul Bagan & Niladri', 'টাঙ্গুয়ার হাওর, শিমুল বাগান ও নীলাদ্রি', 'Nature',
  'UNESCO Ramsar wetland site with luxury houseboats and turquoise river lakes.', 'Tanguar Haor, Shimul Bagan & Niladri is one of the premier tourist landmarks of Sunamganj (Tanguar Haor) in Sylhet division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Sunamganj (Tanguar Haor) Sadar, Bangladesh',
  25.0658, 91.4073, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'July to October (Houseboat season) & Winter for birds',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Sunamganj (Tanguar Haor).', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 4.6, 552,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000027', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 'Tanguar Haor, Shimul Bagan & Niladri', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000027', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 'Tanguar Haor, Shimul Bagan & Niladri - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000027', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Tanguar Haor, Shimul Bagan & Niladri - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000028', 28, 'Habiganj Historic Landmark & Eco Park', 'হবিগঞ্জ ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Habiganj.', 'Habiganj Historic Landmark & Eco Park is one of the premier tourist landmarks of Habiganj in Sylhet division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Habiganj Sadar, Bangladesh',
  24.3749, 91.4155, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to February',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Habiganj.', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 4.6, 264,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000028', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Habiganj Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000028', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Habiganj Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000028', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Habiganj Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000029', 29, 'Varendra Research Museum & Padma River Park', 'বরেন্দ্র গবেষণা জাদুঘর ও পদ্মাপাড়', 'Heritage',
  'Oldest museum in Bangladesh with ancient Pala sculptures and scenic sunset promenade over Padma.', 'Varendra Research Museum & Padma River Park is one of the premier tourist landmarks of Rajshahi in Rajshahi division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Rajshahi Sadar, Bangladesh',
  24.3745, 88.6042, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'May-July for Mangoes / Nov-Feb for Travel',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Rajshahi.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800', 4.6, 264,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000029', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800', 'Varendra Research Museum & Padma River Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000029', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800', 'Varendra Research Museum & Padma River Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000029', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 'Varendra Research Museum & Padma River Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000030', 30, 'Mahasthangarh Ancient Citadel & Museum', 'মহাস্থানগড় প্রত্নস্থল ও জাদুঘর', 'Heritage',
  '3rd-century BC fortified archaeological city of Pundranagara on Karatoya River.', 'Mahasthangarh Ancient Citadel & Museum is one of the premier tourist landmarks of Bogura in Rajshahi division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Bogura Sadar, Bangladesh',
  24.8465, 89.3777, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to March',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Bogura.', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', 4.8, 228,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000030', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', 'Mahasthangarh Ancient Citadel & Museum', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000030', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', 'Mahasthangarh Ancient Citadel & Museum - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000030', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', 'Mahasthangarh Ancient Citadel & Museum - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000031', 31, 'Somapura Mahavihara (Paharpur UNESCO Site)', 'সোমপুর মহাবিহার (পাহাড়পুর)', 'Heritage',
  '8th-century Buddhist monastery with colossal central cruciform temple.', 'Somapura Mahavihara (Paharpur UNESCO Site) is one of the premier tourist landmarks of Naogaon in Rajshahi division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Naogaon Sadar, Bangladesh',
  24.8103, 88.9419, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'November to February',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Naogaon.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 4.9, 246,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000031', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 'Somapura Mahavihara (Paharpur UNESCO Site)', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000031', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 'Somapura Mahavihara (Paharpur UNESCO Site) - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000031', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 'Somapura Mahavihara (Paharpur UNESCO Site) - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000032', 32, 'Natore Rajbari (Rani Bhabani Palace) & Uttara Ganabhaban', 'নাটোর রাজবাড়ি ও উত্তরা গণভবন', 'Heritage',
  'Historic royal palace complex of Queen Bhabani with grand gardens and Italian marble statues.', 'Natore Rajbari (Rani Bhabani Palace) & Uttara Ganabhaban is one of the premier tourist landmarks of Natore in Rajshahi division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Natore Sadar, Bangladesh',
  24.4206, 88.9324, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to March',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Natore.', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 4.8, 228,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000032', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Natore Rajbari (Rani Bhabani Palace) & Uttara Ganabhaban', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000032', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Natore Rajbari (Rani Bhabani Palace) & Uttara Ganabhaban - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000032', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', 'Natore Rajbari (Rani Bhabani Palace) & Uttara Ganabhaban - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000033', 33, 'Chapainawabganj Historic Landmark & Eco Park', 'চাঁপাইনবাবগঞ্জ ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Chapainawabganj.', 'Chapainawabganj Historic Landmark & Eco Park is one of the premier tourist landmarks of Chapainawabganj in Rajshahi division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Chapainawabganj Sadar, Bangladesh',
  24.5965, 88.2775, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Summer for Mangoes / Winter for Heritage',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Chapainawabganj.', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 4.9, 390,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000033', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Chapainawabganj Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000033', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Chapainawabganj Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000033', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Chapainawabganj Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000034', 34, 'Pabna Historic Landmark & Eco Park', 'পাবনা ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Pabna.', 'Pabna Historic Landmark & Eco Park is one of the premier tourist landmarks of Pabna in Rajshahi division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Pabna Sadar, Bangladesh',
  24.0064, 89.2372, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to February',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Pabna.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 4.7, 210,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000034', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Pabna Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000034', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Pabna Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000034', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Pabna Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000035', 35, 'Sirajganj Historic Landmark & Eco Park', 'সিরাজগঞ্জ ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Sirajganj.', 'Sirajganj Historic Landmark & Eco Park is one of the premier tourist landmarks of Sirajganj in Rajshahi division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Sirajganj Sadar, Bangladesh',
  24.4534, 89.7008, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Autumn and Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Sirajganj.', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 4.7, 282,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000035', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Sirajganj Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000035', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Sirajganj Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000035', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Sirajganj Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000036', 36, 'Joypurhat Historic Landmark & Eco Park', 'জয়পুরহাট ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Joypurhat.', 'Joypurhat Historic Landmark & Eco Park is one of the premier tourist landmarks of Joypurhat in Rajshahi division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Joypurhat Sadar, Bangladesh',
  25.1015, 89.0277, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Joypurhat.', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 4.7, 282,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000036', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Joypurhat Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000036', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Joypurhat Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000036', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Joypurhat Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000037', 37, 'Sundarbans Mangrove (Karamjal / Kotka)', 'সুন্দরবন করমজল ও কটকা অভয়ারণ্য', 'Forest',
  'UNESCO World Heritage mangrove habitat of Royal Bengal Tigers and saltwater crocodiles.', 'Sundarbans Mangrove (Karamjal / Kotka) is one of the premier tourist landmarks of Khulna (Sundarbans) in Khulna division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Khulna (Sundarbans) Sadar, Bangladesh',
  22.8456, 89.5403, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'November to March (Cruising Season)',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Khulna (Sundarbans).', 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800', 4.9, 462,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000037', 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800', 'Sundarbans Mangrove (Karamjal / Kotka)', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000037', 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800', 'Sundarbans Mangrove (Karamjal / Kotka) - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000037', 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80', 'Sundarbans Mangrove (Karamjal / Kotka) - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000038', 38, 'Sixty Dome Mosque (Shat Gombuj Masjid)', 'ষাট গম্বুজ মসজিদ ও খান জাহান মাজার', 'Heritage',
  '15th-century UNESCO World Heritage Sultanate brick architecture with 77 domes.', 'Sixty Dome Mosque (Shat Gombuj Masjid) is one of the premier tourist landmarks of Bagerhat in Khulna division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Bagerhat Sadar, Bangladesh',
  22.6516, 89.7859, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to February',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Bagerhat.', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 4.6, 264,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000038', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Sixty Dome Mosque (Shat Gombuj Masjid)', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000038', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Sixty Dome Mosque (Shat Gombuj Masjid) - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000038', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', 'Sixty Dome Mosque (Shat Gombuj Masjid) - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000039', 39, 'Gadkhali Flower Capital & Michael Madhusudan House', 'গদখালী ফুলের রাজ্য ও মাইকেল মধুসূদন বাড়ি', 'Nature',
  'Vast colorful fields of blooming roses and gladiolus supplying flowers across Bangladesh.', 'Gadkhali Flower Capital & Michael Madhusudan House is one of the premier tourist landmarks of Jashore in Khulna division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Jashore Sadar, Bangladesh',
  23.1664, 89.2182, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'December to February (Flower season & Winter)',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Jashore.', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', 4.9, 246,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000039', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', 'Gadkhali Flower Capital & Michael Madhusudan House', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000039', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', 'Gadkhali Flower Capital & Michael Madhusudan House - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000039', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', 'Gadkhali Flower Capital & Michael Madhusudan House - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000040', 40, 'Satkhira Historic Landmark & Eco Park', 'সাতক্ষীরা ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Satkhira.', 'Satkhira Historic Landmark & Eco Park is one of the premier tourist landmarks of Satkhira in Khulna division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Satkhira Sadar, Bangladesh',
  22.7185, 89.0705, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'November to March',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Satkhira.', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 4.6, 264,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000040', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Satkhira Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000040', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Satkhira Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000040', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Satkhira Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000041', 41, 'Lalon Shah Mazar & Tagore Kuthibari', 'লালন শাহ মাজার ও শিলাইদহ কুঠিবাড়ি', 'Heritage',
  'Spiritual shrine of mystic Baul philosopher Fakir Lalon Shah and Rabindranath Tagore’s bungalow.', 'Lalon Shah Mazar & Tagore Kuthibari is one of the premier tourist landmarks of Kushtia in Khulna division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Kushtia Sadar, Bangladesh',
  23.9013, 89.1204, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Dol Purnima (March) & Autumn/Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Kushtia.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 4.9, 246,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000041', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 'Lalon Shah Mazar & Tagore Kuthibari', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000041', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 'Lalon Shah Mazar & Tagore Kuthibari - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000041', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Lalon Shah Mazar & Tagore Kuthibari - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000042', 42, 'Meherpur Historic Landmark & Eco Park', 'মেহেরপুর ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Meherpur.', 'Meherpur Historic Landmark & Eco Park is one of the premier tourist landmarks of Meherpur in Khulna division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Meherpur Sadar, Bangladesh',
  23.7719, 88.6318, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Year round',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Meherpur.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 4.6, 264,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000042', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 'Meherpur Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000042', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 'Meherpur Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000042', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 'Meherpur Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000043', 43, 'Chuadanga Historic Landmark & Eco Park', 'চুয়াডাঙ্গা ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Chuadanga.', 'Chuadanga Historic Landmark & Eco Park is one of the premier tourist landmarks of Chuadanga in Khulna division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Chuadanga Sadar, Bangladesh',
  23.6402, 88.8418, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Chuadanga.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 4.7, 282,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000043', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 'Chuadanga Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000043', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 'Chuadanga Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000043', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 'Chuadanga Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000044', 44, 'Jhenaidah Historic Landmark & Eco Park', 'ঝিনাইদহ ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Jhenaidah.', 'Jhenaidah Historic Landmark & Eco Park is one of the premier tourist landmarks of Jhenaidah in Khulna division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Jhenaidah Sadar, Bangladesh',
  23.545, 89.1726, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Winter & Spring',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Jhenaidah.', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 4.7, 282,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000044', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Jhenaidah Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000044', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Jhenaidah Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000044', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Jhenaidah Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000045', 45, 'Magura Historic Landmark & Eco Park', 'মাগুরা ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Magura.', 'Magura Historic Landmark & Eco Park is one of the premier tourist landmarks of Magura in Khulna division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Magura Sadar, Bangladesh',
  23.4873, 89.4198, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Autumn and Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Magura.', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 4.8, 228,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000045', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Magura Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000045', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Magura Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000045', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Magura Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000046', 46, 'Narail Historic Landmark & Eco Park', 'নড়াইল ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Narail.', 'Narail Historic Landmark & Eco Park is one of the premier tourist landmarks of Narail in Khulna division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Narail Sadar, Bangladesh',
  23.1725, 89.5127, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Autumn and Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Narail.', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 4.8, 228,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000046', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Narail Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000046', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Narail Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000046', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Narail Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000047', 47, 'Guthia Mosque & Floating Guava Market', 'গুঠিয়া মসজিদ ও ভাসমান পেয়ারা বাজার', 'Heritage',
  'Majestic Guthia Islamic architecture and hundreds of wooden boats trading fresh guavas in canals.', 'Guthia Mosque & Floating Guava Market is one of the premier tourist landmarks of Barishal in Barishal division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Barishal Sadar, Bangladesh',
  22.701, 90.3535, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'July to October for Guava Markets / Nov-Feb for Cruising',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Barishal.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 4.6, 264,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000047', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Guthia Mosque & Floating Guava Market', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000047', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Guthia Mosque & Floating Guava Market - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000047', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 'Guthia Mosque & Floating Guava Market - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000048', 48, 'Kuakata Beach (Sunrise & Sunset Point)', 'কুয়াকাটা সৈকত (সূর্যাস্ত ও সূর্যোদয়)', 'Beach',
  '18km scenic sandy beach where both sunrise and sunset can be viewed over the ocean horizon.', 'Kuakata Beach (Sunrise & Sunset Point) is one of the premier tourist landmarks of Patuakhali (Kuakata) in Barishal division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Patuakhali (Kuakata) Sadar, Bangladesh',
  21.8167, 90.1167, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to March',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Patuakhali (Kuakata).', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 4.6, 480,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000048', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Kuakata Beach (Sunrise & Sunset Point)', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000048', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Kuakata Beach (Sunrise & Sunset Point) - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000048', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 'Kuakata Beach (Sunrise & Sunset Point) - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000049', 49, 'Bhola Historic Landmark & Eco Park', 'ভোলা ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Bhola.', 'Bhola Historic Landmark & Eco Park is one of the premier tourist landmarks of Bhola in Barishal division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Bhola Sadar, Bangladesh',
  22.6859, 90.6481, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'November to February',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Bhola.', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 4.7, 210,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000049', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Bhola Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000049', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Bhola Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000049', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Bhola Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000050', 50, 'Jhalokathi Historic Landmark & Eco Park', 'ঝালকাঠি ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Jhalokathi.', 'Jhalokathi Historic Landmark & Eco Park is one of the premier tourist landmarks of Jhalokathi in Barishal division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Jhalokathi Sadar, Bangladesh',
  22.6406, 90.1987, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'July to September (Guava canal boats)',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Jhalokathi.', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 4.8, 300,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000050', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Jhalokathi Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000050', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Jhalokathi Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000050', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Jhalokathi Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000051', 51, 'Pirojpur Historic Landmark & Eco Park', 'পিরোজপুর ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Pirojpur.', 'Pirojpur Historic Landmark & Eco Park is one of the premier tourist landmarks of Pirojpur in Barishal division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Pirojpur Sadar, Bangladesh',
  22.5841, 89.972, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Monsoon and Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Pirojpur.', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 4.6, 264,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000051', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Pirojpur Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000051', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Pirojpur Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000051', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Pirojpur Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000052', 52, 'Barguna Historic Landmark & Eco Park', 'বরগুনা ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Barguna.', 'Barguna Historic Landmark & Eco Park is one of the premier tourist landmarks of Barguna in Barishal division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Barguna Sadar, Bangladesh',
  22.0953, 90.1121, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'November to March',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Barguna.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 4.9, 246,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000052', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Barguna Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000052', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Barguna Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000052', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Barguna Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000053', 53, 'Tajhat Palace Archaeological Museum & Chikli Water Park', 'তাজহাট জমিদার বাড়ি ও চিকলি পার্ক', 'Heritage',
  'Magnificent neoclassical palace built by Maharaja Govinda Lal with 31 white marble staircases.', 'Tajhat Palace Archaeological Museum & Chikli Water Park is one of the premier tourist landmarks of Rangpur in Rangpur division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Rangpur Sadar, Bangladesh',
  25.7439, 89.2752, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to February / June for Haribhanga',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Rangpur.', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 4.9, 246,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000053', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Tajhat Palace Archaeological Museum & Chikli Water Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000053', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Tajhat Palace Archaeological Museum & Chikli Water Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000053', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', 'Tajhat Palace Archaeological Museum & Chikli Water Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000054', 54, 'Kantajew Temple (Kantaji Mandir) & Ramsagar', 'কান্তজীউ মন্দির ও রামসাগর', 'Heritage',
  'South Asia’s most intricate 18th-century terracotta art temple and the largest man-made lake Ramsagar.', 'Kantajew Temple (Kantaji Mandir) & Ramsagar is one of the premier tourist landmarks of Dinajpur in Rangpur division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Dinajpur Sadar, Bangladesh',
  25.6217, 88.6355, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to March',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Dinajpur.', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', 4.6, 264,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000054', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', 'Kantajew Temple (Kantaji Mandir) & Ramsagar', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000054', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', 'Kantajew Temple (Kantaji Mandir) & Ramsagar - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000054', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', 'Kantajew Temple (Kantaji Mandir) & Ramsagar - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000055', 55, 'Tetulia Plainland Tea Gardens & Kanchenjunga View', 'তেঁতুলিয়া চা বাগান ও কাঞ্চনজঙ্ঘা ভিউ', 'Tea Garden',
  'Northernmost plainland tea gardens with clear views of snow-capped Mt. Kanchenjunga in autumn.', 'Tetulia Plainland Tea Gardens & Kanchenjunga View is one of the premier tourist landmarks of Panchagarh (Tetulia) in Rangpur division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Panchagarh (Tetulia) Sadar, Bangladesh',
  26.3354, 88.5517, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to December (Kanchenjunga clear views)',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Panchagarh (Tetulia).', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 4.6, 480,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000055', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 'Tetulia Plainland Tea Gardens & Kanchenjunga View', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000055', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 'Tetulia Plainland Tea Gardens & Kanchenjunga View - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000055', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 'Tetulia Plainland Tea Gardens & Kanchenjunga View - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000056', 56, 'Nilphamari Historic Landmark & Eco Park', 'নীলফামারী ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Nilphamari.', 'Nilphamari Historic Landmark & Eco Park is one of the premier tourist landmarks of Nilphamari in Rangpur division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Nilphamari Sadar, Bangladesh',
  25.9318, 88.856, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'November to February',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Nilphamari.', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 4.8, 300,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000056', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Nilphamari Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000056', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Nilphamari Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000056', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 'Nilphamari Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000057', 57, 'Lalmonirhat Historic Landmark & Eco Park', 'লালমনিরহাট ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Lalmonirhat.', 'Lalmonirhat Historic Landmark & Eco Park is one of the premier tourist landmarks of Lalmonirhat in Rangpur division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Lalmonirhat Sadar, Bangladesh',
  25.9923, 89.2847, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Lalmonirhat.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 4.9, 318,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000057', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 'Lalmonirhat Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000057', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 'Lalmonirhat Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000057', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', 'Lalmonirhat Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000058', 58, 'Kurigram Historic Landmark & Eco Park', 'কুড়িগ্রাম ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Kurigram.', 'Kurigram Historic Landmark & Eco Park is one of the premier tourist landmarks of Kurigram in Rangpur division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Kurigram Sadar, Bangladesh',
  25.8054, 89.6362, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Autumn and Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Kurigram.', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 4.6, 264,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000058', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Kurigram Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000058', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Kurigram Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000058', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', 'Kurigram Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000059', 59, 'Gaibandha Historic Landmark & Eco Park', 'গাইবান্ধা ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Gaibandha.', 'Gaibandha Historic Landmark & Eco Park is one of the premier tourist landmarks of Gaibandha in Rangpur division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Gaibandha Sadar, Bangladesh',
  25.3288, 89.5406, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Gaibandha.', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 4.7, 282,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000059', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Gaibandha Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000059', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Gaibandha Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000059', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', 'Gaibandha Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000060', 60, 'Thakurgaon Historic Landmark & Eco Park', 'ঠাকুরগাঁও ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Thakurgaon.', 'Thakurgaon Historic Landmark & Eco Park is one of the premier tourist landmarks of Thakurgaon in Rangpur division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Thakurgaon Sadar, Bangladesh',
  26.0337, 88.4617, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Autumn and Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Thakurgaon.', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 4.8, 300,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000060', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Thakurgaon Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000060', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Thakurgaon Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000060', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 'Thakurgaon Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000061', 61, 'Shashi Lodge (Rajbari) & Botanical Garden', 'শশী লজ ও বোটানিক্যাল গার্ডেন', 'Heritage',
  'Victorian-era palace with Roman Venus statue and Brahmaputra riverside gardens.', 'Shashi Lodge (Rajbari) & Botanical Garden is one of the premier tourist landmarks of Mymensingh in Mymensingh division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Mymensingh Sadar, Bangladesh',
  24.7471, 90.4203, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Autumn and Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Mymensingh.', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 4.8, 300,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000061', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Shashi Lodge (Rajbari) & Botanical Garden', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000061', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Shashi Lodge (Rajbari) & Botanical Garden - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000061', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', 'Shashi Lodge (Rajbari) & Botanical Garden - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000062', 62, 'Birishiri White Ceramic Hills & Someshwari Lake', 'বিরিশিরি চিনামাটির পাহাড় ও নীল লেক', 'Nature',
  'Turquoise blue lakes amidst white clay hills and cultural academy of Garo and Hajong tribes.', 'Birishiri White Ceramic Hills & Someshwari Lake is one of the premier tourist landmarks of Netrokona (Birishiri) in Mymensingh division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Netrokona (Birishiri) Sadar, Bangladesh',
  24.8833, 90.7333, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to March (Clear water season)',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Netrokona (Birishiri).', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', 4.7, 498,
  true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000062', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', 'Birishiri White Ceramic Hills & Someshwari Lake', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000062', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', 'Birishiri White Ceramic Hills & Someshwari Lake - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000062', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'Birishiri White Ceramic Hills & Someshwari Lake - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000063', 63, 'Jamalpur Historic Landmark & Eco Park', 'জামালপুর ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Jamalpur.', 'Jamalpur Historic Landmark & Eco Park is one of the premier tourist landmarks of Jamalpur in Mymensingh division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Jamalpur Sadar, Bangladesh',
  24.9375, 89.9378, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'Winter',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Jamalpur.', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', 4.6, 264,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000063', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', 'Jamalpur Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000063', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', 'Jamalpur Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000063', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', 'Jamalpur Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.destinations (
  id, district_id, name, name_bn, category, short_description, full_description, 
  location_address, lat, lng, entry_fee, entry_fee_info, opening_time, best_time_to_visit, 
  how_to_reach, cover_image_url, rating, reviews_count, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8000-000000000064', 64, 'Sherpur (Garo Hills) Historic Landmark & Eco Park', 'শেরপুর (গারো পাহাড়) ঐতিহাসিক দর্শনীয় স্থান', 'Nature',
  'Scenic natural attractions, heritage monuments, and peaceful spots in Sherpur (Garo Hills).', 'Sherpur (Garo Hills) Historic Landmark & Eco Park is one of the premier tourist landmarks of Sherpur (Garo Hills) in Mymensingh division. Explore the scenic surroundings, regional heritage, and local hospitality.', 'Sherpur (Garo Hills) Sadar, Bangladesh',
  25.0205, 90.0153, 50.00, 'Free / ৳20-৳50 entry',
  '08:00 AM - 06:00 PM', 'October to February',
  'Easily accessible via direct bus or train routes from Dhaka and regional division hubs to Sherpur (Garo Hills).', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 4.6, 480,
  false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Destination Images
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000064', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 'Sherpur (Garo Hills) Historic Landmark & Eco Park', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000064', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 'Sherpur (Garo Hills) Historic Landmark & Eco Park - Photo 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.destination_images (destination_id, image_url, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8000-000000000064', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 'Sherpur (Garo Hills) Historic Landmark & Eco Park - Photo 3', false, 3)
ON CONFLICT DO NOTHING;

-- 3. SEED HOTELS & HOTEL IMAGES

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000001', 1, 'InterContinental Dhaka', 'ইন্টারকন্টিনেন্টাল ঢাকা', 'Luxury accommodation in Dhaka City Center',
  4.6, 140, 15500, 'Dhaka City Center',
  NULL, NULL, '+880 1711-155555', 'info@hoteldhaka.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000001', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 'Main Property', 'InterContinental Dhaka', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000001', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 'Deluxe Room', 'InterContinental Dhaka - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000001', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'InterContinental Dhaka - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000001', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'InterContinental Dhaka - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000001', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'InterContinental Dhaka - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000001', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'InterContinental Dhaka - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000002', 2, 'Sarah Resort & Spa Gazipur', 'সারাহ রিসোর্ট গাজীপুর', 'Luxury accommodation in Gazipur City Center',
  4.8, 164, 7500, 'Gazipur City Center',
  NULL, NULL, '+880 1711-177777', 'info@hotelgazipur.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000002', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Main Property', 'Sarah Resort & Spa Gazipur', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000002', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Deluxe Room', 'Sarah Resort & Spa Gazipur - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000002', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Sarah Resort & Spa Gazipur - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000002', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Sarah Resort & Spa Gazipur - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000002', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Sarah Resort & Spa Gazipur - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000002', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Sarah Resort & Spa Gazipur - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000003', 3, 'Hotel Royal Resort Sonargaon', 'রয়্যাল রিসোর্ট সোনারগাঁও', 'Luxury accommodation in Narayanganj City Center',
  4.8, 212, 3800, 'Narayanganj City Center',
  NULL, NULL, '+880 1711-222221', 'info@hotelnarayanganj.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000003', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Main Property', 'Hotel Royal Resort Sonargaon', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000003', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Deluxe Room', 'Hotel Royal Resort Sonargaon - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000003', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Royal Resort Sonargaon - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000003', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Royal Resort Sonargaon - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000003', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Royal Resort Sonargaon - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000003', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Royal Resort Sonargaon - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000004', 4, 'Hotel Al Faisal Tangail', 'হোটেল আল ফয়সাল', 'Luxury accommodation in Tangail City Center',
  4.8, 164, 2200, 'Tangail City Center',
  NULL, NULL, '+880 1711-177777', 'info@hoteltangail.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000004', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Main Property', 'Hotel Al Faisal Tangail', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000004', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Deluxe Room', 'Hotel Al Faisal Tangail - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000004', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Al Faisal Tangail - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000004', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Al Faisal Tangail - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000004', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Al Faisal Tangail - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000004', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Al Faisal Tangail - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000005', 5, 'Nikli Riverfront Guest House', 'নিকলী রিভারফ্রন্ট গেস্ট হাউস', 'Luxury accommodation in Kishoreganj City Center',
  4.8, 212, 2500, 'Kishoreganj City Center',
  NULL, NULL, '+880 1711-222221', 'info@hotelkishoreganj.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000005', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'Main Property', 'Nikli Riverfront Guest House', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000005', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'Deluxe Room', 'Nikli Riverfront Guest House - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000005', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Nikli Riverfront Guest House - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000005', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Nikli Riverfront Guest House - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000005', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Nikli Riverfront Guest House - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000005', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Nikli Riverfront Guest House - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000006', 6, 'Hotel Manikganj Regency & Resort', 'হোটেল মানিকগঞ্জ রিজেন্সি', 'Luxury accommodation in Manikganj City Center',
  4.6, 188, 3800, 'Manikganj City Center',
  NULL, NULL, '+880 1711-199999', 'info@hotelmanikganj.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000006', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Manikganj Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000006', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Manikganj Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000006', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Manikganj Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000006', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Manikganj Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000006', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Manikganj Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000006', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Manikganj Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000007', 7, 'Hotel Munshiganj Regency & Resort', 'হোটেল মুন্সিগঞ্জ রিজেন্সি', 'Luxury accommodation in Munshiganj City Center',
  4.7, 200, 2200, 'Munshiganj City Center',
  NULL, NULL, '+880 1711-211110', 'info@hotelmunshiganj.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000007', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Munshiganj Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000007', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Munshiganj Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000007', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Munshiganj Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000007', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Munshiganj Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000007', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Munshiganj Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000007', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Munshiganj Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000008', 8, 'Hotel Narsingdi Regency & Resort', 'হোটেল নরসিংদী রিজেন্সি', 'Luxury accommodation in Narsingdi City Center',
  4.6, 188, 3800, 'Narsingdi City Center',
  NULL, NULL, '+880 1711-199999', 'info@hotelnarsingdi.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000008', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Narsingdi Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000008', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Narsingdi Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000008', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Narsingdi Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000008', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Narsingdi Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000008', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Narsingdi Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000008', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Narsingdi Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000009', 9, 'Hotel Faridpur Regency & Resort', 'হোটেল ফরিদপুর রিজেন্সি', 'Luxury accommodation in Faridpur City Center',
  4.5, 176, 3400, 'Faridpur City Center',
  NULL, NULL, '+880 1711-188888', 'info@hotelfaridpur.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000009', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Faridpur Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000009', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Faridpur Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000009', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Faridpur Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000009', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Faridpur Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000009', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Faridpur Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000009', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Faridpur Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000010', 10, 'Hotel Gopalganj Regency & Resort', 'হোটেল গোপালগঞ্জ রিজেন্সি', 'Luxury accommodation in Gopalganj City Center',
  4.6, 188, 3800, 'Gopalganj City Center',
  NULL, NULL, '+880 1711-199999', 'info@hotelgopalganj.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000010', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Gopalganj Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000010', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Gopalganj Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000010', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Gopalganj Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000010', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Gopalganj Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000010', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Gopalganj Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000010', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Gopalganj Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000011', 11, 'Hotel Madaripur Regency & Resort', 'হোটেল মাদারীপুর রিজেন্সি', 'Luxury accommodation in Madaripur City Center',
  4.6, 188, 3800, 'Madaripur City Center',
  NULL, NULL, '+880 1711-199999', 'info@hotelmadaripur.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000011', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Madaripur Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000011', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Madaripur Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000011', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Madaripur Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000011', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Madaripur Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000011', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Madaripur Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000011', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Madaripur Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000012', 12, 'Hotel Rajbari Regency & Resort', 'হোটেল রাজবাড়ী রিজেন্সি', 'Luxury accommodation in Rajbari City Center',
  4.8, 164, 3000, 'Rajbari City Center',
  NULL, NULL, '+880 1711-177777', 'info@hotelrajbari.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000012', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Rajbari Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000012', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Rajbari Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000012', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Rajbari Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000012', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Rajbari Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000012', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Rajbari Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000012', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Rajbari Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000013', 13, 'Hotel Shariatpur Regency & Resort', 'হোটেল শরীয়তপুর রিজেন্সি', 'Luxury accommodation in Shariatpur City Center',
  4.7, 200, 2200, 'Shariatpur City Center',
  NULL, NULL, '+880 1711-211110', 'info@hotelshariatpur.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000013', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Shariatpur Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000013', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Shariatpur Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000013', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Shariatpur Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000013', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Shariatpur Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000013', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Shariatpur Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000013', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Shariatpur Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000014', 14, 'Radisson Blu Chattogram Bay View', 'র‍্যাডিসন ব্লু চট্টগ্রাম', 'Luxury accommodation in Chattogram City Center',
  4.7, 200, 11000, 'Chattogram City Center',
  NULL, NULL, '+880 1711-211110', 'info@hotelchattogram.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000014', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 'Main Property', 'Radisson Blu Chattogram Bay View', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000014', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 'Deluxe Room', 'Radisson Blu Chattogram Bay View - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000014', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Radisson Blu Chattogram Bay View - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000014', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Radisson Blu Chattogram Bay View - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000014', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Radisson Blu Chattogram Bay View - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000014', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Radisson Blu Chattogram Bay View - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000015', 15, 'Sayeman Beach Resort', 'সায়মন বিচ রিসোর্ট', 'Luxury accommodation in Cox''s Bazar City Center',
  4.8, 212, 8500, 'Cox''s Bazar City Center',
  NULL, NULL, '+880 1711-222221', 'info@hotelcoxs-bazar.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000015', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Main Property', 'Sayeman Beach Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000015', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Deluxe Room', 'Sayeman Beach Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000015', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Sayeman Beach Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000015', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Sayeman Beach Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000015', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Sayeman Beach Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000015', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Sayeman Beach Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000016', 16, 'Meghpunji Eco Resort Sajek', 'মেঘপুঞ্জি ইকো রিসোর্ট', 'Luxury accommodation in Rangamati (Sajek) City Center',
  4.6, 284, 4500, 'Rangamati (Sajek) City Center',
  NULL, NULL, '+880 1711-288887', 'info@hotelrangamati.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000016', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'Main Property', 'Meghpunji Eco Resort Sajek', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000016', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'Deluxe Room', 'Meghpunji Eco Resort Sajek - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000016', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Meghpunji Eco Resort Sajek - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000016', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Meghpunji Eco Resort Sajek - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000016', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Meghpunji Eco Resort Sajek - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000016', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Meghpunji Eco Resort Sajek - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000017', 17, 'Hill Crown Resort Bandarban', 'হিল ক্রাউন রিসোর্ট', 'Luxury accommodation in Bandarban City Center',
  4.6, 188, 4200, 'Bandarban City Center',
  NULL, NULL, '+880 1711-199999', 'info@hotelbandarban.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000017', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 'Main Property', 'Hill Crown Resort Bandarban', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000017', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 'Deluxe Room', 'Hill Crown Resort Bandarban - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000017', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hill Crown Resort Bandarban - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000017', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hill Crown Resort Bandarban - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000017', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hill Crown Resort Bandarban - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000017', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hill Crown Resort Bandarban - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000018', 18, 'Hotel Gairing Khagrachhari', 'হোটেল গাইরিং', 'Luxury accommodation in Khagrachhari City Center',
  4.5, 224, 2800, 'Khagrachhari City Center',
  NULL, NULL, '+880 1711-233332', 'info@hotelkhagrachhari.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000018', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Main Property', 'Hotel Gairing Khagrachhari', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000018', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Deluxe Room', 'Hotel Gairing Khagrachhari - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000018', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Gairing Khagrachhari - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000018', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Gairing Khagrachhari - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000018', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Gairing Khagrachhari - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000018', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Gairing Khagrachhari - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000019', 19, 'Hotel Red Roof Inn Cumilla', 'রেড রুফ ইন কুমিল্লা', 'Luxury accommodation in Cumilla City Center',
  4.8, 164, 3200, 'Cumilla City Center',
  NULL, NULL, '+880 1711-177777', 'info@hotelcumilla.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000019', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Main Property', 'Hotel Red Roof Inn Cumilla', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000019', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Deluxe Room', 'Hotel Red Roof Inn Cumilla - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000019', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Red Roof Inn Cumilla - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000019', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Red Roof Inn Cumilla - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000019', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Red Roof Inn Cumilla - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000019', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Red Roof Inn Cumilla - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000020', 20, 'Hotel Feni Regency & Resort', 'হোটেল ফেনী রিজেন্সি', 'Luxury accommodation in Feni City Center',
  4.5, 128, 3800, 'Feni City Center',
  NULL, NULL, '+880 1711-144444', 'info@hotelfeni.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000020', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Feni Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000020', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Feni Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000020', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Feni Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000020', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Feni Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000020', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Feni Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000020', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Feni Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000021', 21, 'Hotel Brahmanbaria Regency & Resort', 'হোটেল ব্রাহ্মণবাড়িয়া রিজেন্সি', 'Luxury accommodation in Brahmanbaria City Center',
  4.5, 224, 3000, 'Brahmanbaria City Center',
  NULL, NULL, '+880 1711-233332', 'info@hotelbrahmanbaria.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000021', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Brahmanbaria Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000021', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Brahmanbaria Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000021', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Brahmanbaria Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000021', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Brahmanbaria Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000021', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Brahmanbaria Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000021', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Brahmanbaria Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000022', 22, 'Hotel Noakhali Regency & Resort', 'হোটেল নোয়াখালী রিজেন্সি', 'Luxury accommodation in Noakhali City Center',
  4.5, 176, 3400, 'Noakhali City Center',
  NULL, NULL, '+880 1711-188888', 'info@hotelnoakhali.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000022', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Noakhali Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000022', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Noakhali Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000022', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Noakhali Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000022', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Noakhali Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000022', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Noakhali Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000022', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Noakhali Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000023', 23, 'Hotel Chandpur Regency & Resort', 'হোটেল চাঁদপুর রিজেন্সি', 'Luxury accommodation in Chandpur City Center',
  4.5, 176, 3400, 'Chandpur City Center',
  NULL, NULL, '+880 1711-188888', 'info@hotelchandpur.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000023', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Chandpur Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000023', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Chandpur Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000023', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Chandpur Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000023', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Chandpur Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000023', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Chandpur Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000023', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Chandpur Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000024', 24, 'Hotel Lakshmipur Regency & Resort', 'হোটেল লক্ষ্মীপুর রিজেন্সি', 'Luxury accommodation in Lakshmipur City Center',
  4.7, 200, 2200, 'Lakshmipur City Center',
  NULL, NULL, '+880 1711-211110', 'info@hotellakshmipur.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000024', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Lakshmipur Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000024', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Lakshmipur Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000024', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Lakshmipur Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000024', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Lakshmipur Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000024', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Lakshmipur Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000024', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Lakshmipur Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000025', 25, 'Hotel Noorjahan Grand Sylhet', 'হোটেল নূরজাহান গ্র্যান্ড', 'Luxury accommodation in Sylhet City Center',
  4.7, 152, 3500, 'Sylhet City Center',
  NULL, NULL, '+880 1711-166666', 'info@hotelsylhet.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000025', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Main Property', 'Hotel Noorjahan Grand Sylhet', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000025', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Deluxe Room', 'Hotel Noorjahan Grand Sylhet - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000025', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Noorjahan Grand Sylhet - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000025', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Noorjahan Grand Sylhet - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000025', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Noorjahan Grand Sylhet - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000025', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Noorjahan Grand Sylhet - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000026', 26, 'Grand Sultan Tea Resort & Golf', 'গ্র্যান্ড সুলতান টি রিসোর্ট', 'Luxury accommodation in Moulvibazar (Sreemangal) City Center',
  4.5, 368, 12500, 'Moulvibazar (Sreemangal) City Center',
  NULL, NULL, '+880 1711-366664', 'info@hotelmoulvibazar.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000026', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Main Property', 'Grand Sultan Tea Resort & Golf', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000026', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Deluxe Room', 'Grand Sultan Tea Resort & Golf - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000026', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Grand Sultan Tea Resort & Golf - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000026', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Grand Sultan Tea Resort & Golf - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000026', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Grand Sultan Tea Resort & Golf - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000026', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Grand Sultan Tea Resort & Golf - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000027', 27, 'Tanguar Haor Luxury Houseboats', 'টাঙ্গুয়ার হাওর হাউসবোট', 'Luxury accommodation in Sunamganj (Tanguar Haor) City Center',
  4.5, 368, 6500, 'Sunamganj (Tanguar Haor) City Center',
  NULL, NULL, '+880 1711-366664', 'info@hotelsunamganj.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000027', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 'Main Property', 'Tanguar Haor Luxury Houseboats', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000027', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 'Deluxe Room', 'Tanguar Haor Luxury Houseboats - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000027', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Tanguar Haor Luxury Houseboats - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000027', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Tanguar Haor Luxury Houseboats - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000027', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Tanguar Haor Luxury Houseboats - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000027', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Tanguar Haor Luxury Houseboats - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000028', 28, 'Hotel Habiganj Regency & Resort', 'হোটেল হবিগঞ্জ রিজেন্সি', 'Luxury accommodation in Habiganj City Center',
  4.5, 176, 3400, 'Habiganj City Center',
  NULL, NULL, '+880 1711-188888', 'info@hotelhabiganj.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000028', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Habiganj Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000028', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Habiganj Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000028', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Habiganj Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000028', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Habiganj Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000028', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Habiganj Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000028', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Habiganj Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000029', 29, 'Hotel Grand Riverview Rajshahi', 'গ্র্যান্ড রিভারভিউ রাজশাহী', 'Luxury accommodation in Rajshahi City Center',
  4.5, 176, 4500, 'Rajshahi City Center',
  NULL, NULL, '+880 1711-188888', 'info@hotelrajshahi.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000029', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 'Main Property', 'Hotel Grand Riverview Rajshahi', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000029', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 'Deluxe Room', 'Hotel Grand Riverview Rajshahi - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000029', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Grand Riverview Rajshahi - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000029', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Grand Riverview Rajshahi - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000029', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Grand Riverview Rajshahi - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000029', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Grand Riverview Rajshahi - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000030', 30, 'Hotel Naz Garden Bogura', 'হোটেল নাজ গার্ডেন বগুড়া', 'Luxury accommodation in Bogura City Center',
  4.7, 152, 4800, 'Bogura City Center',
  NULL, NULL, '+880 1711-166666', 'info@hotelbogura.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000030', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Main Property', 'Hotel Naz Garden Bogura', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000030', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Deluxe Room', 'Hotel Naz Garden Bogura - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000030', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Naz Garden Bogura - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000030', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Naz Garden Bogura - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000030', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Naz Garden Bogura - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000030', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Naz Garden Bogura - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000031', 31, 'Hotel Avanti Naogaon', 'হোটেল অবন্তি নওগাঁ', 'Luxury accommodation in Naogaon City Center',
  4.8, 164, 2200, 'Naogaon City Center',
  NULL, NULL, '+880 1711-177777', 'info@hotelnaogaon.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000031', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Main Property', 'Hotel Avanti Naogaon', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000031', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Deluxe Room', 'Hotel Avanti Naogaon - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000031', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Avanti Naogaon - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000031', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Avanti Naogaon - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000031', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Avanti Naogaon - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000031', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Avanti Naogaon - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000032', 32, 'Hotel VIP Natore', 'হোটেল ভিআইপি নাটোর', 'Luxury accommodation in Natore City Center',
  4.7, 152, 2400, 'Natore City Center',
  NULL, NULL, '+880 1711-166666', 'info@hotelnatore.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000032', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Main Property', 'Hotel VIP Natore', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000032', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Deluxe Room', 'Hotel VIP Natore - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000032', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel VIP Natore - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000032', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel VIP Natore - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000032', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel VIP Natore - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000032', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel VIP Natore - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000033', 33, 'Hotel Chapainawabganj Regency & Resort', 'হোটেল চাঁপাইনবাবগঞ্জ রিজেন্সি', 'Luxury accommodation in Chapainawabganj City Center',
  4.8, 260, 2200, 'Chapainawabganj City Center',
  NULL, NULL, '+880 1711-266665', 'info@hotelchapainawabganj.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000033', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Chapainawabganj Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000033', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Chapainawabganj Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000033', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Chapainawabganj Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000033', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Chapainawabganj Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000033', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Chapainawabganj Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000033', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Chapainawabganj Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000034', 34, 'Hotel Pabna Regency & Resort', 'হোটেল পাবনা রিজেন্সি', 'Luxury accommodation in Pabna City Center',
  4.6, 140, 2200, 'Pabna City Center',
  NULL, NULL, '+880 1711-155555', 'info@hotelpabna.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000034', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Pabna Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000034', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Pabna Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000034', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Pabna Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000034', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Pabna Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000034', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Pabna Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000034', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Pabna Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000035', 35, 'Hotel Sirajganj Regency & Resort', 'হোটেল সিরাজগঞ্জ রিজেন্সি', 'Luxury accommodation in Sirajganj City Center',
  4.6, 188, 3800, 'Sirajganj City Center',
  NULL, NULL, '+880 1711-199999', 'info@hotelsirajganj.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000035', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Sirajganj Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000035', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Sirajganj Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000035', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Sirajganj Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000035', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Sirajganj Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000035', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Sirajganj Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000035', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Sirajganj Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000036', 36, 'Hotel Joypurhat Regency & Resort', 'হোটেল জয়পুরহাট রিজেন্সি', 'Luxury accommodation in Joypurhat City Center',
  4.6, 188, 3800, 'Joypurhat City Center',
  NULL, NULL, '+880 1711-199999', 'info@hoteljoypurhat.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000036', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Joypurhat Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000036', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Joypurhat Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000036', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Joypurhat Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000036', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Joypurhat Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000036', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Joypurhat Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000036', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Joypurhat Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000037', 37, 'City Inn Khulna', 'সিটি ইন খুলনা', 'Luxury accommodation in Khulna (Sundarbans) City Center',
  4.8, 308, 4800, 'Khulna (Sundarbans) City Center',
  NULL, NULL, '+880 1711-311109', 'info@hotelkhulna.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000037', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Main Property', 'City Inn Khulna', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000037', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Deluxe Room', 'City Inn Khulna - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000037', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'City Inn Khulna - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000037', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'City Inn Khulna - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000037', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'City Inn Khulna - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000037', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'City Inn Khulna - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000038', 38, 'Hotel Momotaz Bagerhat', 'হোটেল মমতাজ', 'Luxury accommodation in Bagerhat City Center',
  4.5, 176, 2000, 'Bagerhat City Center',
  NULL, NULL, '+880 1711-188888', 'info@hotelbagerhat.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000038', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Main Property', 'Hotel Momotaz Bagerhat', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000038', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Deluxe Room', 'Hotel Momotaz Bagerhat - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000038', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Momotaz Bagerhat - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000038', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Momotaz Bagerhat - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000038', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Momotaz Bagerhat - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000038', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Momotaz Bagerhat - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000039', 39, 'Hotel Zabeer International Jashore', 'হোটেল জাবীর ইন্টারন্যাশনাল', 'Luxury accommodation in Jashore City Center',
  4.8, 164, 6200, 'Jashore City Center',
  NULL, NULL, '+880 1711-177777', 'info@hoteljashore.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000039', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 'Main Property', 'Hotel Zabeer International Jashore', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000039', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 'Deluxe Room', 'Hotel Zabeer International Jashore - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000039', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Zabeer International Jashore - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000039', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Zabeer International Jashore - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000039', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Zabeer International Jashore - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000039', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Zabeer International Jashore - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000040', 40, 'Hotel Satkhira Regency & Resort', 'হোটেল সাতক্ষীরা রিজেন্সি', 'Luxury accommodation in Satkhira City Center',
  4.5, 176, 3400, 'Satkhira City Center',
  NULL, NULL, '+880 1711-188888', 'info@hotelsatkhira.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000040', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Satkhira Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000040', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Satkhira Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000040', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Satkhira Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000040', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Satkhira Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000040', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Satkhira Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000040', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Satkhira Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000041', 41, 'Hotel River View Kushtia', 'হোটেল রিভার ভিউ কুষ্টিয়া', 'Luxury accommodation in Kushtia City Center',
  4.8, 164, 2600, 'Kushtia City Center',
  NULL, NULL, '+880 1711-177777', 'info@hotelkushtia.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000041', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Main Property', 'Hotel River View Kushtia', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000041', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Deluxe Room', 'Hotel River View Kushtia - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000041', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel River View Kushtia - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000041', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel River View Kushtia - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000041', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel River View Kushtia - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000041', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel River View Kushtia - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000042', 42, 'Hotel Meherpur Regency & Resort', 'হোটেল মেহেরপুর রিজেন্সি', 'Luxury accommodation in Meherpur City Center',
  4.5, 176, 3400, 'Meherpur City Center',
  NULL, NULL, '+880 1711-188888', 'info@hotelmeherpur.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000042', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Meherpur Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000042', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Meherpur Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000042', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Meherpur Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000042', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Meherpur Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000042', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Meherpur Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000042', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Meherpur Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000043', 43, 'Hotel Chuadanga Regency & Resort', 'হোটেল চুয়াডাঙ্গা রিজেন্সি', 'Luxury accommodation in Chuadanga City Center',
  4.6, 188, 3800, 'Chuadanga City Center',
  NULL, NULL, '+880 1711-199999', 'info@hotelchuadanga.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000043', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Chuadanga Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000043', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Chuadanga Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000043', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Chuadanga Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000043', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Chuadanga Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000043', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Chuadanga Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000043', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Chuadanga Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000044', 44, 'Hotel Jhenaidah Regency & Resort', 'হোটেল ঝিনাইদহ রিজেন্সি', 'Luxury accommodation in Jhenaidah City Center',
  4.6, 188, 3800, 'Jhenaidah City Center',
  NULL, NULL, '+880 1711-199999', 'info@hoteljhenaidah.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000044', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Jhenaidah Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000044', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Jhenaidah Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000044', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Jhenaidah Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000044', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Jhenaidah Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000044', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Jhenaidah Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000044', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Jhenaidah Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000045', 45, 'Hotel Magura Regency & Resort', 'হোটেল মাগুরা রিজেন্সি', 'Luxury accommodation in Magura City Center',
  4.7, 152, 2600, 'Magura City Center',
  NULL, NULL, '+880 1711-166666', 'info@hotelmagura.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000045', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Magura Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000045', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Magura Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000045', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Magura Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000045', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Magura Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000045', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Magura Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000045', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Magura Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000046', 46, 'Hotel Narail Regency & Resort', 'হোটেল নড়াইল রিজেন্সি', 'Luxury accommodation in Narail City Center',
  4.7, 152, 2600, 'Narail City Center',
  NULL, NULL, '+880 1711-166666', 'info@hotelnarail.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000046', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Narail Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000046', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Narail Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000046', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Narail Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000046', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Narail Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000046', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Narail Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000046', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Narail Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000047', 47, 'Grand Park Hotel Barishal', 'গ্র্যান্ড পার্ক হোটেল', 'Luxury accommodation in Barishal City Center',
  4.5, 176, 5200, 'Barishal City Center',
  NULL, NULL, '+880 1711-188888', 'info@hotelbarishal.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000047', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Main Property', 'Grand Park Hotel Barishal', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000047', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Deluxe Room', 'Grand Park Hotel Barishal - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000047', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Grand Park Hotel Barishal - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000047', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Grand Park Hotel Barishal - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000047', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Grand Park Hotel Barishal - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000047', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Grand Park Hotel Barishal - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000048', 48, 'Sikder Resort & Villas Kuakata', 'শিকদার রিসোর্ট কুয়াকাটা', 'Luxury accommodation in Patuakhali (Kuakata) City Center',
  4.5, 320, 4200, 'Patuakhali (Kuakata) City Center',
  NULL, NULL, '+880 1711-322220', 'info@hotelpatuakhali.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000048', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Main Property', 'Sikder Resort & Villas Kuakata', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000048', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Deluxe Room', 'Sikder Resort & Villas Kuakata - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000048', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Sikder Resort & Villas Kuakata - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000048', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Sikder Resort & Villas Kuakata - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000048', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Sikder Resort & Villas Kuakata - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000048', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Sikder Resort & Villas Kuakata - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000049', 49, 'Hotel Bhola Regency & Resort', 'হোটেল ভোলা রিজেন্সি', 'Luxury accommodation in Bhola City Center',
  4.6, 140, 2200, 'Bhola City Center',
  NULL, NULL, '+880 1711-155555', 'info@hotelbhola.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000049', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Bhola Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000049', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Bhola Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000049', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Bhola Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000049', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Bhola Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000049', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Bhola Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000049', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Bhola Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000050', 50, 'Hotel Jhalokathi Regency & Resort', 'হোটেল ঝালকাঠি রিজেন্সি', 'Luxury accommodation in Jhalokathi City Center',
  4.7, 200, 2200, 'Jhalokathi City Center',
  NULL, NULL, '+880 1711-211110', 'info@hoteljhalokathi.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000050', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Jhalokathi Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000050', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Jhalokathi Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000050', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Jhalokathi Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000050', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Jhalokathi Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000050', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Jhalokathi Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000050', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Jhalokathi Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000051', 51, 'Hotel Pirojpur Regency & Resort', 'হোটেল পিরোজপুর রিজেন্সি', 'Luxury accommodation in Pirojpur City Center',
  4.5, 176, 3400, 'Pirojpur City Center',
  NULL, NULL, '+880 1711-188888', 'info@hotelpirojpur.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000051', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Pirojpur Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000051', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Pirojpur Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000051', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Pirojpur Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000051', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Pirojpur Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000051', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Pirojpur Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000051', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Pirojpur Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000052', 52, 'Hotel Barguna Regency & Resort', 'হোটেল বরগুনা রিজেন্সি', 'Luxury accommodation in Barguna City Center',
  4.8, 164, 3000, 'Barguna City Center',
  NULL, NULL, '+880 1711-177777', 'info@hotelbarguna.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000052', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Barguna Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000052', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Barguna Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000052', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Barguna Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000052', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Barguna Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000052', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Barguna Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000052', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Barguna Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000053', 53, 'Hotel Grand Palace Rangpur', 'হোটেল গ্র্যান্ড প্যালেস রংপুর', 'Luxury accommodation in Rangpur City Center',
  4.8, 164, 4200, 'Rangpur City Center',
  NULL, NULL, '+880 1711-177777', 'info@hotelrangpur.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000053', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Main Property', 'Hotel Grand Palace Rangpur', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000053', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Deluxe Room', 'Hotel Grand Palace Rangpur - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000053', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Grand Palace Rangpur - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000053', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Grand Palace Rangpur - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000053', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Grand Palace Rangpur - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000053', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Grand Palace Rangpur - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000054', 54, 'Hotel Diamond Dinajpur', 'হোটেল ডায়মন্ড', 'Luxury accommodation in Dinajpur City Center',
  4.5, 176, 2500, 'Dinajpur City Center',
  NULL, NULL, '+880 1711-188888', 'info@hoteldinajpur.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000054', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Main Property', 'Hotel Diamond Dinajpur', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000054', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Deluxe Room', 'Hotel Diamond Dinajpur - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000054', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Diamond Dinajpur - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000054', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Diamond Dinajpur - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000054', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Diamond Dinajpur - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000054', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Diamond Dinajpur - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000055', 55, 'Kanchenjunga Eco Resort Tetulia', 'কাঞ্চনজঙ্ঘা ইকো রিসোর্ট', 'Luxury accommodation in Panchagarh (Tetulia) City Center',
  4.5, 320, 3500, 'Panchagarh (Tetulia) City Center',
  NULL, NULL, '+880 1711-322220', 'info@hotelpanchagarh.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000055', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'Main Property', 'Kanchenjunga Eco Resort Tetulia', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000055', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'Deluxe Room', 'Kanchenjunga Eco Resort Tetulia - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000055', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Kanchenjunga Eco Resort Tetulia - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000055', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Kanchenjunga Eco Resort Tetulia - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000055', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Kanchenjunga Eco Resort Tetulia - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000055', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Kanchenjunga Eco Resort Tetulia - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000056', 56, 'Hotel Nilphamari Regency & Resort', 'হোটেল নীলফামারী রিজেন্সি', 'Luxury accommodation in Nilphamari City Center',
  4.7, 200, 2200, 'Nilphamari City Center',
  NULL, NULL, '+880 1711-211110', 'info@hotelnilphamari.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000056', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Nilphamari Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000056', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Nilphamari Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000056', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Nilphamari Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000056', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Nilphamari Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000056', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Nilphamari Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000056', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Nilphamari Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000057', 57, 'Hotel Lalmonirhat Regency & Resort', 'হোটেল লালমনিরহাট রিজেন্সি', 'Luxury accommodation in Lalmonirhat City Center',
  4.8, 212, 2600, 'Lalmonirhat City Center',
  NULL, NULL, '+880 1711-222221', 'info@hotellalmonirhat.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000057', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Lalmonirhat Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000057', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Lalmonirhat Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000057', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Lalmonirhat Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000057', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Lalmonirhat Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000057', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Lalmonirhat Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000057', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Lalmonirhat Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000058', 58, 'Hotel Kurigram Regency & Resort', 'হোটেল কুড়িগ্রাম রিজেন্সি', 'Luxury accommodation in Kurigram City Center',
  4.5, 176, 3400, 'Kurigram City Center',
  NULL, NULL, '+880 1711-188888', 'info@hotelkurigram.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000058', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Kurigram Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000058', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Kurigram Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000058', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Kurigram Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000058', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Kurigram Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000058', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Kurigram Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000058', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Kurigram Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000059', 59, 'Hotel Gaibandha Regency & Resort', 'হোটেল গাইবান্ধা রিজেন্সি', 'Luxury accommodation in Gaibandha City Center',
  4.6, 188, 3800, 'Gaibandha City Center',
  NULL, NULL, '+880 1711-199999', 'info@hotelgaibandha.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000059', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Gaibandha Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000059', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Gaibandha Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000059', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Gaibandha Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000059', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Gaibandha Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000059', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Gaibandha Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000059', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Gaibandha Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000060', 60, 'Hotel Thakurgaon Regency & Resort', 'হোটেল ঠাকুরগাঁও রিজেন্সি', 'Luxury accommodation in Thakurgaon City Center',
  4.7, 200, 2200, 'Thakurgaon City Center',
  NULL, NULL, '+880 1711-211110', 'info@hotelthakurgaon.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000060', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Thakurgaon Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000060', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Thakurgaon Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000060', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Thakurgaon Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000060', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Thakurgaon Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000060', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Thakurgaon Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000060', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Thakurgaon Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000061', 61, 'Hotel Silver Castle Mymensingh', 'হোটেল সিলভার ক্যাসেল', 'Luxury accommodation in Mymensingh City Center',
  4.7, 200, 3800, 'Mymensingh City Center',
  NULL, NULL, '+880 1711-211110', 'info@hotelmymensingh.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000061', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Main Property', 'Hotel Silver Castle Mymensingh', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000061', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Deluxe Room', 'Hotel Silver Castle Mymensingh - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000061', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Silver Castle Mymensingh - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000061', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Silver Castle Mymensingh - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000061', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Silver Castle Mymensingh - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000061', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Silver Castle Mymensingh - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000062', 62, 'Birishiri Eco Cottages Durgapur', 'বিরিশিরি ইকো কটেজ', 'Luxury accommodation in Netrokona (Birishiri) City Center',
  4.6, 332, 2800, 'Netrokona (Birishiri) City Center',
  NULL, NULL, '+880 1711-333331', 'info@hotelnetrokona.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000062', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'Main Property', 'Birishiri Eco Cottages Durgapur', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000062', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'Deluxe Room', 'Birishiri Eco Cottages Durgapur - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000062', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Birishiri Eco Cottages Durgapur - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000062', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Birishiri Eco Cottages Durgapur - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000062', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Birishiri Eco Cottages Durgapur - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000062', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Birishiri Eco Cottages Durgapur - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000063', 63, 'Hotel Jamalpur Regency & Resort', 'হোটেল জামালপুর রিজেন্সি', 'Luxury accommodation in Jamalpur City Center',
  4.5, 176, 3400, 'Jamalpur City Center',
  NULL, NULL, '+880 1711-188888', 'info@hoteljamalpur.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000063', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Jamalpur Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000063', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Jamalpur Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000063', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Jamalpur Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000063', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Jamalpur Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000063', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Jamalpur Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000063', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Jamalpur Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.hotels (
  id, district_id, name, name_bn, description, rating, reviews_count, price_per_night, 
  location_address, lat, lng, contact_phone, contact_email, has_ac, has_wifi, 
  has_parking, has_restaurant, has_room_service, has_security, cover_image_url, 
  check_in_time, check_out_time, room_types, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8100-000000000064', 64, 'Hotel Sherpur (Garo Hills) Regency & Resort', 'হোটেল শেরপুর (গারো পাহাড়) রিজেন্সি', 'Luxury accommodation in Sherpur (Garo Hills) City Center',
  4.5, 320, 2200, 'Sherpur (Garo Hills) City Center',
  NULL, NULL, '+880 1711-322220', 'info@hotelsherpur.com.bd',
  true, true, true,
  true, true, true,
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', '12:00 PM', '11:30 AM',
  '"Deluxe AC Room","Executive Suite"'::text[], false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Hotel Images
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000064', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Main Property', 'Hotel Sherpur (Garo Hills) Regency & Resort', true, 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000064', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85', 'Deluxe Room', 'Hotel Sherpur (Garo Hills) Regency & Resort - View 2', false, 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000064', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Sherpur (Garo Hills) Regency & Resort - View 3', false, 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000064', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Sherpur (Garo Hills) Regency & Resort - View 4', false, 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000064', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Sherpur (Garo Hills) Regency & Resort - View 5', false, 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.hotel_images (hotel_id, image_url, room_type, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8100-000000000064', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', 'Deluxe Room', 'Hotel Sherpur (Garo Hills) Regency & Resort - View 6', false, 6)
ON CONFLICT DO NOTHING;

-- 4. SEED RESTAURANTS & RESTAURANT IMAGES

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000001', 1, 'Star Kabab & Restaurant', 'স্টার কাবাব', 4.7,
  240, 'Authentic Kacchi Biryani & Kebabs', '৳৳',
  'Dhaka Sadar', NULL, NULL, '+880 1812-255555',
  '07:00 AM - 11:00 PM', '"Mutton Kacchi Biryani & Boti Kabab","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000001', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Star Kabab & Restaurant', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000002', 2, 'Bhawal Forest Kitchen', 'ভাওয়াল ফরেস্ট কিচেন', 4.9,
  280, 'Local Duck Bhuna & Forest Delicacies', '৳৳',
  'Gazipur Sadar', NULL, NULL, '+880 1812-277777',
  '07:00 AM - 11:00 PM', '"Deshi Duck Bhuna with Steamed Rice","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000002', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Bhawal Forest Kitchen', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000003', 3, 'Sonargaon Heritage Cafe', 'সোনারগাঁও হেরিটেজ ক্যাফে', 4.9,
  360, 'Traditional Bengali & Fresh River Fish', '৳৳',
  'Narayanganj Sadar', NULL, NULL, '+880 1812-322221',
  '07:00 AM - 11:00 PM', '"Shorshe Ilish & Traditional Pitha","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000003', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Sonargaon Heritage Cafe', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000004', 4, 'Porabari Original Chomchom House', 'পোড়াবাড়ী চমচম ঘর', 4.9,
  280, 'Legendary Bengali Sweets & Snacks', '৳৳',
  'Tangail Sadar', NULL, NULL, '+880 1812-277777',
  '07:00 AM - 11:00 PM', '"Porabari Chomchom (World famous sweet)","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000004', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Porabari Original Chomchom House', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000005', 5, 'Haor Fresh Fish Kitchen', 'হাওর ফ্রেশ ফিশ কিচেন', 4.9,
  360, 'Fresh Haor Fish & Bengali Curries', '৳৳',
  'Kishoreganj Sadar', NULL, NULL, '+880 1812-322221',
  '07:00 AM - 11:00 PM', '"Boal & Pabda Fish Curry with Steamed Rice","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000005', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Haor Fresh Fish Kitchen', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000006', 6, 'Manikganj Heritage Dining & Sweets', 'মানিকগঞ্জ ঐতিহ্যবাহী খাবার', 4.7,
  320, 'Traditional Manikganj Cuisine & River Fish', '৳৳',
  'Manikganj Sadar', NULL, NULL, '+880 1812-299999',
  '07:00 AM - 11:00 PM', '"Manikganj Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000006', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Manikganj Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000007', 7, 'Munshiganj Heritage Dining & Sweets', 'মুন্সিগঞ্জ ঐতিহ্যবাহী খাবার', 4.8,
  340, 'Traditional Munshiganj Cuisine & River Fish', '৳৳',
  'Munshiganj Sadar', NULL, NULL, '+880 1812-311110',
  '07:00 AM - 11:00 PM', '"Munshiganj Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000007', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Munshiganj Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000008', 8, 'Narsingdi Heritage Dining & Sweets', 'নরসিংদী ঐতিহ্যবাহী খাবার', 4.7,
  320, 'Traditional Narsingdi Cuisine & River Fish', '৳৳',
  'Narsingdi Sadar', NULL, NULL, '+880 1812-299999',
  '07:00 AM - 11:00 PM', '"Narsingdi Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000008', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Narsingdi Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000009', 9, 'Faridpur Heritage Dining & Sweets', 'ফরিদপুর ঐতিহ্যবাহী খাবার', 4.6,
  300, 'Traditional Faridpur Cuisine & River Fish', '৳৳',
  'Faridpur Sadar', NULL, NULL, '+880 1812-288888',
  '07:00 AM - 11:00 PM', '"Faridpur Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000009', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Faridpur Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000010', 10, 'Gopalganj Heritage Dining & Sweets', 'গোপালগঞ্জ ঐতিহ্যবাহী খাবার', 4.7,
  320, 'Traditional Gopalganj Cuisine & River Fish', '৳৳',
  'Gopalganj Sadar', NULL, NULL, '+880 1812-299999',
  '07:00 AM - 11:00 PM', '"Gopalganj Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000010', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Gopalganj Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000011', 11, 'Madaripur Heritage Dining & Sweets', 'মাদারীপুর ঐতিহ্যবাহী খাবার', 4.7,
  320, 'Traditional Madaripur Cuisine & River Fish', '৳৳',
  'Madaripur Sadar', NULL, NULL, '+880 1812-299999',
  '07:00 AM - 11:00 PM', '"Madaripur Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000011', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Madaripur Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000012', 12, 'Rajbari Heritage Dining & Sweets', 'রাজবাড়ী ঐতিহ্যবাহী খাবার', 4.9,
  280, 'Traditional Rajbari Cuisine & River Fish', '৳৳',
  'Rajbari Sadar', NULL, NULL, '+880 1812-277777',
  '07:00 AM - 11:00 PM', '"Rajbari Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000012', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Rajbari Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000013', 13, 'Shariatpur Heritage Dining & Sweets', 'শরীয়তপুর ঐতিহ্যবাহী খাবার', 4.8,
  340, 'Traditional Shariatpur Cuisine & River Fish', '৳৳',
  'Shariatpur Sadar', NULL, NULL, '+880 1812-311110',
  '07:00 AM - 11:00 PM', '"Shariatpur Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000013', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Shariatpur Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000014', 14, 'Mezzan Haile Aaiun', 'মেজবান হাইলে আইয়ুন', 4.8,
  340, 'Authentic Mezbani Beef & Kala Bhuna', '৳৳',
  'Chattogram Sadar', NULL, NULL, '+880 1812-311110',
  '07:00 AM - 11:00 PM', '"Mezbani Beef with Chonar Dal","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000014', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Mezzan Haile Aaiun', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000015', 15, 'Jhaubon Seafood Restaurant', 'ঝাউবন রেস্তোরাঁ', 4.9,
  360, 'Fresh Grilled Ocean Fish & Crab', '৳৳',
  'Cox''s Bazar Sadar', NULL, NULL, '+880 1812-322221',
  '07:00 AM - 11:00 PM', '"Grilled Red Snapper & Coral Fish BBQ","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000015', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Jhaubon Seafood Restaurant', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000016', 16, 'Sajek Hilltop Bamboo Cuisine', 'সাজেক হিলটপ ক্যাফে', 4.7,
  480, 'Tribal Bamboo Chicken & Hill Herbs', '৳৳',
  'Rangamati (Sajek) Sadar', NULL, NULL, '+880 1812-388887',
  '07:00 AM - 11:00 PM', '"Bamboo Chicken & Mountain Ginger Tea","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000016', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Sajek Hilltop Bamboo Cuisine', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000017', 17, 'Marma Kitchen Bandarban', 'মারমা কিচেন', 4.7,
  320, 'Tribal Delicacies & Wild Bamboo Curry', '৳৳',
  'Bandarban Sadar', NULL, NULL, '+880 1812-299999',
  '07:00 AM - 11:00 PM', '"Smoked Mountain Fish & Sticky Rice","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000017', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Marma Kitchen Bandarban', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000018', 18, 'Paharia Kitchen Khagrachhari', 'পাহাড়িয়া কিচেন', 4.6,
  380, 'Indigenous Hill Cuisine', '৳৳',
  'Khagrachhari Sadar', NULL, NULL, '+880 1812-333332',
  '07:00 AM - 11:00 PM', '"Herbal Papaya Curry & Hill Chicken","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000018', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Paharia Kitchen Khagrachhari', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000019', 19, 'Matri Bhander (Original)', 'মাতৃভাণ্ডার রসমালাই', 4.9,
  280, 'Authentic World-Renowned Rasmalai', '৳৳',
  'Cumilla Sadar', NULL, NULL, '+880 1812-277777',
  '07:00 AM - 11:00 PM', '"Authentic Cumilla Rasmalai (৳300/kg)","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000019', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Matri Bhander (Original)', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000020', 20, 'Feni Heritage Dining & Sweets', 'ফেনী ঐতিহ্যবাহী খাবার', 4.6,
  220, 'Traditional Feni Cuisine & River Fish', '৳৳',
  'Feni Sadar', NULL, NULL, '+880 1812-244444',
  '07:00 AM - 11:00 PM', '"Feni Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000020', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Feni Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000021', 21, 'Brahmanbaria Heritage Dining & Sweets', 'ব্রাহ্মণবাড়িয়া ঐতিহ্যবাহী খাবার', 4.6,
  380, 'Traditional Brahmanbaria Cuisine & River Fish', '৳৳',
  'Brahmanbaria Sadar', NULL, NULL, '+880 1812-333332',
  '07:00 AM - 11:00 PM', '"Brahmanbaria Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000021', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Brahmanbaria Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000022', 22, 'Noakhali Heritage Dining & Sweets', 'নোয়াখালী ঐতিহ্যবাহী খাবার', 4.6,
  300, 'Traditional Noakhali Cuisine & River Fish', '৳৳',
  'Noakhali Sadar', NULL, NULL, '+880 1812-288888',
  '07:00 AM - 11:00 PM', '"Noakhali Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000022', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Noakhali Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000023', 23, 'Chandpur Heritage Dining & Sweets', 'চাঁদপুর ঐতিহ্যবাহী খাবার', 4.6,
  300, 'Traditional Chandpur Cuisine & River Fish', '৳৳',
  'Chandpur Sadar', NULL, NULL, '+880 1812-288888',
  '07:00 AM - 11:00 PM', '"Chandpur Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000023', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Chandpur Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000024', 24, 'Lakshmipur Heritage Dining & Sweets', 'লক্ষ্মীপুর ঐতিহ্যবাহী খাবার', 4.8,
  340, 'Traditional Lakshmipur Cuisine & River Fish', '৳৳',
  'Lakshmipur Sadar', NULL, NULL, '+880 1812-311110',
  '07:00 AM - 11:00 PM', '"Lakshmipur Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000024', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Lakshmipur Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000025', 25, 'Panshi Restaurant', 'পানসী রেস্তোরাঁ', 4.8,
  260, 'Traditional Bengali & 30+ Bhartas', '৳৳',
  'Sylhet Sadar', NULL, NULL, '+880 1812-266666',
  '07:00 AM - 11:00 PM', '"Shatkora Beef & Duck Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000025', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Panshi Restaurant', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000026', 26, 'Nilkantha Tea Cabin', 'নীলকণ্ঠ টি কেবিন', 4.6,
  620, 'Iconic Multi-layer Tea & Local Snacks', '৳৳',
  'Moulvibazar (Sreemangal) Sadar', NULL, NULL, '+880 1812-466664',
  '07:00 AM - 11:00 PM', '"Seven-Layer Colored Tea & Pitha","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000026', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Nilkantha Tea Cabin', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000027', 27, 'Haor Boat Floating Kitchen', 'হাওর বোট কিচেন', 4.6,
  620, 'Fresh Haor Baim & Duck Roast', '৳৳',
  'Sunamganj (Tanguar Haor) Sadar', NULL, NULL, '+880 1812-466664',
  '07:00 AM - 11:00 PM', '"Duck Bhuna with Haor Fish Fry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000027', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Haor Boat Floating Kitchen', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000028', 28, 'Habiganj Heritage Dining & Sweets', 'হবিগঞ্জ ঐতিহ্যবাহী খাবার', 4.6,
  300, 'Traditional Habiganj Cuisine & River Fish', '৳৳',
  'Habiganj Sadar', NULL, NULL, '+880 1812-288888',
  '07:00 AM - 11:00 PM', '"Habiganj Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000028', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Habiganj Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000029', 29, 'Rajshahi Kalai Ruti & Duck House', 'রাজশাহী কালাই রুটি ঘর', 4.6,
  300, 'Famous Mashkalai Flatbread with Chili Bharta', '৳৳',
  'Rajshahi Sadar', NULL, NULL, '+880 1812-288888',
  '07:00 AM - 11:00 PM', '"Kalai Ruti with Duck Bhuna & Begun Bharta","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000029', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Rajshahi Kalai Ruti & Duck House', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000030', 30, 'Akboria Grand (Original Bogurar Doi)', 'আকবরিয়া স্পেশাল দই', 4.8,
  260, 'GI-Certified Traditional Bogurar Doi', '৳৳',
  'Bogura Sadar', NULL, NULL, '+880 1812-266666',
  '07:00 AM - 11:00 PM', '"Bogurar Shahi Misti Doi in Clay Pot","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000030', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Akboria Grand (Original Bogurar Doi)', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000031', 31, 'Paharpur Heritage Dining', 'পাহাড়পুর হেরিটেজ ডাইনিং', 4.9,
  280, 'Northern Bengali Cuisine & Sandesh', '৳৳',
  'Naogaon Sadar', NULL, NULL, '+880 1812-277777',
  '07:00 AM - 11:00 PM', '"Naogaon Peda Sandesh & Deshi Fish","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000031', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Paharpur Heritage Dining', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000032', 32, 'Kundu Mistanna Bhandar', 'কুন্ডু মিষ্টান্ন ভান্ডার (কাঁচাগোল্লা)', 4.8,
  260, 'World Famous Authentic Kachagolla', '৳৳',
  'Natore Sadar', NULL, NULL, '+880 1812-266666',
  '07:00 AM - 11:00 PM', '"Natorer Authentic Kachagolla (৳420/kg)","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000032', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Kundu Mistanna Bhandar', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000033', 33, 'Chapainawabganj Heritage Dining & Sweets', 'চাঁপাইনবাবগঞ্জ ঐতিহ্যবাহী খাবার', 4.9,
  440, 'Traditional Chapainawabganj Cuisine & River Fish', '৳৳',
  'Chapainawabganj Sadar', NULL, NULL, '+880 1812-366665',
  '07:00 AM - 11:00 PM', '"Chapainawabganj Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000033', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Chapainawabganj Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000034', 34, 'Pabna Heritage Dining & Sweets', 'পাবনা ঐতিহ্যবাহী খাবার', 4.7,
  240, 'Traditional Pabna Cuisine & River Fish', '৳৳',
  'Pabna Sadar', NULL, NULL, '+880 1812-255555',
  '07:00 AM - 11:00 PM', '"Pabna Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000034', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Pabna Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000035', 35, 'Sirajganj Heritage Dining & Sweets', 'সিরাজগঞ্জ ঐতিহ্যবাহী খাবার', 4.7,
  320, 'Traditional Sirajganj Cuisine & River Fish', '৳৳',
  'Sirajganj Sadar', NULL, NULL, '+880 1812-299999',
  '07:00 AM - 11:00 PM', '"Sirajganj Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000035', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Sirajganj Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000036', 36, 'Joypurhat Heritage Dining & Sweets', 'জয়পুরহাট ঐতিহ্যবাহী খাবার', 4.7,
  320, 'Traditional Joypurhat Cuisine & River Fish', '৳৳',
  'Joypurhat Sadar', NULL, NULL, '+880 1812-299999',
  '07:00 AM - 11:00 PM', '"Joypurhat Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000036', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Joypurhat Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000037', 37, 'Abbas Hotel (Chuknagar)', 'আব্বাস হোটেল (চুই ঝাল)', 4.9,
  520, 'Spicy Chui Jhal Mutton & Beef', '৳৳',
  'Khulna (Sundarbans) Sadar', NULL, NULL, '+880 1812-411109',
  '07:00 AM - 11:00 PM', '"Chui Jhal Khasi with Steamed Rice","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000037', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Abbas Hotel (Chuknagar)', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000038', 38, 'Khan Jahan Heritage Restaurant', 'খান জাহান হেরিটেজ রেস্তোরাঁ', 4.6,
  300, 'Fresh River Prawn & Coastal Curries', '৳৳',
  'Bagerhat Sadar', NULL, NULL, '+880 1812-288888',
  '07:00 AM - 11:00 PM', '"Golda Chingri Malaikari","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000038', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Khan Jahan Heritage Restaurant', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000039', 39, 'Jashore Nolen Gur Kitchen', 'যশোর নলেন গুড় কিচেন', 4.9,
  280, 'Date Palm Sweets & Traditional Bengali', '৳৳',
  'Jashore Sadar', NULL, NULL, '+880 1812-277777',
  '07:00 AM - 11:00 PM', '"Nolen Gurer Payesh & Patali Gur","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000039', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Jashore Nolen Gur Kitchen', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000040', 40, 'Satkhira Heritage Dining & Sweets', 'সাতক্ষীরা ঐতিহ্যবাহী খাবার', 4.6,
  300, 'Traditional Satkhira Cuisine & River Fish', '৳৳',
  'Satkhira Sadar', NULL, NULL, '+880 1812-288888',
  '07:00 AM - 11:00 PM', '"Satkhira Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000040', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Satkhira Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000041', 41, 'Lalon Folk Sweet & Dining', 'লালন লোকসংগীত ক্যাফে', 4.9,
  280, 'Traditional Sweets & Bengali Dishes', '৳৳',
  'Kushtia Sadar', NULL, NULL, '+880 1812-277777',
  '07:00 AM - 11:00 PM', '"Kushtia Tilor Khaja & Special Kulfi","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000041', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Lalon Folk Sweet & Dining', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000042', 42, 'Meherpur Heritage Dining & Sweets', 'মেহেরপুর ঐতিহ্যবাহী খাবার', 4.6,
  300, 'Traditional Meherpur Cuisine & River Fish', '৳৳',
  'Meherpur Sadar', NULL, NULL, '+880 1812-288888',
  '07:00 AM - 11:00 PM', '"Meherpur Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000042', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Meherpur Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000043', 43, 'Chuadanga Heritage Dining & Sweets', 'চুয়াডাঙ্গা ঐতিহ্যবাহী খাবার', 4.7,
  320, 'Traditional Chuadanga Cuisine & River Fish', '৳৳',
  'Chuadanga Sadar', NULL, NULL, '+880 1812-299999',
  '07:00 AM - 11:00 PM', '"Chuadanga Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000043', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Chuadanga Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000044', 44, 'Jhenaidah Heritage Dining & Sweets', 'ঝিনাইদহ ঐতিহ্যবাহী খাবার', 4.7,
  320, 'Traditional Jhenaidah Cuisine & River Fish', '৳৳',
  'Jhenaidah Sadar', NULL, NULL, '+880 1812-299999',
  '07:00 AM - 11:00 PM', '"Jhenaidah Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000044', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Jhenaidah Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000045', 45, 'Magura Heritage Dining & Sweets', 'মাগুরা ঐতিহ্যবাহী খাবার', 4.8,
  260, 'Traditional Magura Cuisine & River Fish', '৳৳',
  'Magura Sadar', NULL, NULL, '+880 1812-266666',
  '07:00 AM - 11:00 PM', '"Magura Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000045', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Magura Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000046', 46, 'Narail Heritage Dining & Sweets', 'নড়াইল ঐতিহ্যবাহী খাবার', 4.8,
  260, 'Traditional Narail Cuisine & River Fish', '৳৳',
  'Narail Sadar', NULL, NULL, '+880 1812-266666',
  '07:00 AM - 11:00 PM', '"Narail Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000046', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Narail Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000047', 47, 'Hotel Kasturi Barishal', 'হোটেল কস্তুরী', 4.6,
  300, 'Fresh River Hilsa & Duck Bhuna', '৳৳',
  'Barishal Sadar', NULL, NULL, '+880 1812-288888',
  '07:00 AM - 11:00 PM', '"Padma/Meghna Ilish Bhaji with Kacha Morich","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', true, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000047', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Hotel Kasturi Barishal', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000048', 48, 'Kuakata Beachside BBQ Cafe', 'কুয়াকাটা বিচ ক্যাফে', 4.6,
  540, 'Fresh Seafood BBQ & Crab Fry', '৳৳',
  'Patuakhali (Kuakata) Sadar', NULL, NULL, '+880 1812-422220',
  '07:00 AM - 11:00 PM', '"Spicy Fried Red Crab & Grilled Rupchanda","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000048', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Kuakata Beachside BBQ Cafe', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000049', 49, 'Bhola Heritage Dining & Sweets', 'ভোলা ঐতিহ্যবাহী খাবার', 4.7,
  240, 'Traditional Bhola Cuisine & River Fish', '৳৳',
  'Bhola Sadar', NULL, NULL, '+880 1812-255555',
  '07:00 AM - 11:00 PM', '"Bhola Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000049', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Bhola Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000050', 50, 'Jhalokathi Heritage Dining & Sweets', 'ঝালকাঠি ঐতিহ্যবাহী খাবার', 4.8,
  340, 'Traditional Jhalokathi Cuisine & River Fish', '৳৳',
  'Jhalokathi Sadar', NULL, NULL, '+880 1812-311110',
  '07:00 AM - 11:00 PM', '"Jhalokathi Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000050', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Jhalokathi Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000051', 51, 'Pirojpur Heritage Dining & Sweets', 'পিরোজপুর ঐতিহ্যবাহী খাবার', 4.6,
  300, 'Traditional Pirojpur Cuisine & River Fish', '৳৳',
  'Pirojpur Sadar', NULL, NULL, '+880 1812-288888',
  '07:00 AM - 11:00 PM', '"Pirojpur Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000051', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Pirojpur Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000052', 52, 'Barguna Heritage Dining & Sweets', 'বরগুনা ঐতিহ্যবাহী খাবার', 4.9,
  280, 'Traditional Barguna Cuisine & River Fish', '৳৳',
  'Barguna Sadar', NULL, NULL, '+880 1812-277777',
  '07:00 AM - 11:00 PM', '"Barguna Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000052', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Barguna Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000053', 53, 'Haribhanga Royal Feast', 'হাঁড়িভাঙা রয়্যাল কিচেন', 4.9,
  280, 'Northern Bangladeshi Cuisine & Mango Desserts', '৳৳',
  'Rangpur Sadar', NULL, NULL, '+880 1812-277777',
  '07:00 AM - 11:00 PM', '"Morog Polao with Haribhanga Mango Chutney","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000053', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Haribhanga Royal Feast', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000054', 54, 'Kataribhog Polao House', 'কাটারিভোগ পোলাও ঘর', 4.6,
  300, 'Aromatic Kataribhog Rice & Roast', '৳৳',
  'Dinajpur Sadar', NULL, NULL, '+880 1812-288888',
  '07:00 AM - 11:00 PM', '"Dinajpur Special Polao with Deshi Chicken","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000054', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Kataribhog Polao House', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000055', 55, 'Mahananda River View Dining', 'মহানন্দা ভিউ ক্যাফে', 4.6,
  540, 'Northern Freshwater Trout & Organic Tea', '৳৳',
  'Panchagarh (Tetulia) Sadar', NULL, NULL, '+880 1812-422220',
  '07:00 AM - 11:00 PM', '"River Fish Fry & Green Tea Infusions","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000055', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Mahananda River View Dining', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000056', 56, 'Nilphamari Heritage Dining & Sweets', 'নীলফামারী ঐতিহ্যবাহী খাবার', 4.8,
  340, 'Traditional Nilphamari Cuisine & River Fish', '৳৳',
  'Nilphamari Sadar', NULL, NULL, '+880 1812-311110',
  '07:00 AM - 11:00 PM', '"Nilphamari Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000056', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Nilphamari Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000057', 57, 'Lalmonirhat Heritage Dining & Sweets', 'লালমনিরহাট ঐতিহ্যবাহী খাবার', 4.9,
  360, 'Traditional Lalmonirhat Cuisine & River Fish', '৳৳',
  'Lalmonirhat Sadar', NULL, NULL, '+880 1812-322221',
  '07:00 AM - 11:00 PM', '"Lalmonirhat Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000057', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Lalmonirhat Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000058', 58, 'Kurigram Heritage Dining & Sweets', 'কুড়িগ্রাম ঐতিহ্যবাহী খাবার', 4.6,
  300, 'Traditional Kurigram Cuisine & River Fish', '৳৳',
  'Kurigram Sadar', NULL, NULL, '+880 1812-288888',
  '07:00 AM - 11:00 PM', '"Kurigram Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000058', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Kurigram Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000059', 59, 'Gaibandha Heritage Dining & Sweets', 'গাইবান্ধা ঐতিহ্যবাহী খাবার', 4.7,
  320, 'Traditional Gaibandha Cuisine & River Fish', '৳৳',
  'Gaibandha Sadar', NULL, NULL, '+880 1812-299999',
  '07:00 AM - 11:00 PM', '"Gaibandha Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000059', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Gaibandha Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000060', 60, 'Thakurgaon Heritage Dining & Sweets', 'ঠাকুরগাঁও ঐতিহ্যবাহী খাবার', 4.8,
  340, 'Traditional Thakurgaon Cuisine & River Fish', '৳৳',
  'Thakurgaon Sadar', NULL, NULL, '+880 1812-311110',
  '07:00 AM - 11:00 PM', '"Thakurgaon Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000060', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Thakurgaon Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000061', 61, 'Gopal Pal Original Monda (Muktagacha)', 'গোপাল পালের আসল মণ্ডা (মুক্তাগাছা)', 4.8,
  340, 'Centuries-Old Royal Heritage Sweet (since 1824)', '৳৳',
  'Mymensingh Sadar', NULL, NULL, '+880 1812-311110',
  '07:00 AM - 11:00 PM', '"Muktagachar Authentic Monda (৳500/kg)","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000061', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Gopal Pal Original Monda (Muktagacha)', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000062', 62, 'Goyanath Authentic Balish Misti', 'গয়ানাথের বালিশ মিষ্টি', 4.7,
  560, 'Famous Giant Pillow-shaped Sweet', '৳৳',
  'Netrokona (Birishiri) Sadar', NULL, NULL, '+880 1812-433331',
  '07:00 AM - 11:00 PM', '"Netrokonar Balish Misti (Pillow Sweet)","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000062', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Goyanath Authentic Balish Misti', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000063', 63, 'Jamalpur Heritage Dining & Sweets', 'জামালপুর ঐতিহ্যবাহী খাবার', 4.6,
  300, 'Traditional Jamalpur Cuisine & River Fish', '৳৳',
  'Jamalpur Sadar', NULL, NULL, '+880 1812-288888',
  '07:00 AM - 11:00 PM', '"Jamalpur Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000063', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Jamalpur Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.restaurants (
  id, district_id, name, name_bn, rating, reviews_count, cuisine, price_tier, 
  location_address, lat, lng, contact_phone, opening_hours, menu_highlights, 
  cover_image_url, is_featured, is_active
) VALUES (
  '00000000-0000-4000-8200-000000000064', 64, 'Sherpur (Garo Hills) Heritage Dining & Sweets', 'শেরপুর (গারো পাহাড়) ঐতিহ্যবাহী খাবার', 4.6,
  540, 'Traditional Sherpur (Garo Hills) Cuisine & River Fish', '৳৳',
  'Sherpur (Garo Hills) Sadar', NULL, NULL, '+880 1812-422220',
  '07:00 AM - 11:00 PM', '"Sherpur (Garo Hills) Special Curd & Fresh Fish Curry","Deshi Chicken Bhuna","Special Bharta Platter"'::text[],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', false, true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  cover_image_url = EXCLUDED.cover_image_url;

-- Restaurant Image
INSERT INTO public.restaurant_images (restaurant_id, image_url, dish_name, caption, is_primary, display_order)
VALUES ('00000000-0000-4000-8200-000000000064', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Signature Dish', 'Sherpur (Garo Hills) Heritage Dining & Sweets', true, 1)
ON CONFLICT DO NOTHING;

-- 5. SEED TRANSPORT ROUTES

INSERT INTO public.transport_routes (
  id, transport_type_id, company, from_district_id, to_district_id, departure_time, 
  arrival_time, duration, price_min, price_max, boarding_points, schedule_days, 
  contact_phone, is_active
) VALUES (
  '00000000-0000-4000-8300-000000000001', 2, 'Bangladesh Railway (Parabat / Upaban Express)', 1, 25,
  '06:20 AM (Parabat) / 08:30 PM (Upaban)', '01:00 PM / 05:00 AM', '6h 40m',
  380, 950, '"Kamalapur Railway Station","Dhaka Airport Station"'::text[], 'Daily except Tuesday (Parabat) / Wednesday (Upaban)',
  '131 (Railway Helpline)', true
) ON CONFLICT (id) DO UPDATE SET
  company = EXCLUDED.company,
  departure_time = EXCLUDED.departure_time,
  arrival_time = EXCLUDED.arrival_time;

INSERT INTO public.transport_routes (
  id, transport_type_id, company, from_district_id, to_district_id, departure_time, 
  arrival_time, duration, price_min, price_max, boarding_points, schedule_days, 
  contact_phone, is_active
) VALUES (
  '00000000-0000-4000-8300-000000000002', 2, 'Cox’s Bazar Express (Non-stop Luxury Train)', 1, 15,
  '10:30 PM', '07:20 AM', '8h 50m',
  695, 2050, '"Kamalapur Railway Station","Dhaka Airport Station"'::text[], 'Daily except Monday',
  '131', true
) ON CONFLICT (id) DO UPDATE SET
  company = EXCLUDED.company,
  departure_time = EXCLUDED.departure_time,
  arrival_time = EXCLUDED.arrival_time;

INSERT INTO public.transport_routes (
  id, transport_type_id, company, from_district_id, to_district_id, departure_time, 
  arrival_time, duration, price_min, price_max, boarding_points, schedule_days, 
  contact_phone, is_active
) VALUES (
  '00000000-0000-4000-8300-000000000003', 1, 'Green Line Paribahan (Scania Multi-Axle)', 1, 25,
  '07:30 AM / 02:00 PM / 11:30 PM', '01:00 PM / 07:30 PM / 05:00 AM', '5h 30m',
  800, 1200, '"Sayedabad","Arambagh","Abdullahpur"'::text[], 'Daily every hour',
  '+880 1711-830000', true
) ON CONFLICT (id) DO UPDATE SET
  company = EXCLUDED.company,
  departure_time = EXCLUDED.departure_time,
  arrival_time = EXCLUDED.arrival_time;

INSERT INTO public.transport_routes (
  id, transport_type_id, company, from_district_id, to_district_id, departure_time, 
  arrival_time, duration, price_min, price_max, boarding_points, schedule_days, 
  contact_phone, is_active
) VALUES (
  '00000000-0000-4000-8300-000000000004', 4, 'MV Sundarban-12 / Kuakata-9 (Triple Deck Luxury Launch)', 1, 47,
  '08:30 PM / 09:00 PM', '05:00 AM', '8h 00m (Overnight river cruise)',
  400, 5500, '"Sadarghat Launch Terminal, Dhaka"'::text[], 'Daily overnight',
  '+880 1712-334455', true
) ON CONFLICT (id) DO UPDATE SET
  company = EXCLUDED.company,
  departure_time = EXCLUDED.departure_time,
  arrival_time = EXCLUDED.arrival_time;

INSERT INTO public.transport_routes (
  id, transport_type_id, company, from_district_id, to_district_id, departure_time, 
  arrival_time, duration, price_min, price_max, boarding_points, schedule_days, 
  contact_phone, is_active
) VALUES (
  '00000000-0000-4000-8300-000000000005', 2, 'Silk City / Padma Express', 1, 29,
  '02:45 PM', '08:35 PM', '5h 50m',
  360, 850, '"Kamalapur Railway Station","Dhaka Airport"'::text[], 'Daily except Sunday',
  '131', true
) ON CONFLICT (id) DO UPDATE SET
  company = EXCLUDED.company,
  departure_time = EXCLUDED.departure_time,
  arrival_time = EXCLUDED.arrival_time;

INSERT INTO public.transport_routes (
  id, transport_type_id, company, from_district_id, to_district_id, departure_time, 
  arrival_time, duration, price_min, price_max, boarding_points, schedule_days, 
  contact_phone, is_active
) VALUES (
  '00000000-0000-4000-8300-000000000006', 5, 'YEANA Verified Microbus & Chander Gari Package', 1, 15,
  '11:00 PM overnight', '08:00 AM at Dighinala / 11:30 AM at Sajek', '11h 00m (Including Escort)',
  12000, 18000, '"Doorstep Pick-up (Dhaka)"'::text[], 'On Booking Demand',
  '+880 1900-112233', true
) ON CONFLICT (id) DO UPDATE SET
  company = EXCLUDED.company,
  departure_time = EXCLUDED.departure_time,
  arrival_time = EXCLUDED.arrival_time;

-- 6. SEED SHOPPING PLACES

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000001', 1, 'Aarong Dhanmondi Crafts', 'আড়ং হস্তশিল্প', 'Handicrafts & Souvenirs',
  'Dhaka Town Center', 'Jamdani Sarees, Nakshi Kantha, Jute crafts', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000002', 2, 'Gazipur Pottery & Bamboo Crafts', 'গাজীপুর বাঁশ ও মৃৎশিল্প', 'Handicrafts & Souvenirs',
  'Gazipur Town Center', 'Bhawal Cane products & Clay pottery', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000003', 3, 'Jamdani Palli Weaving Center', 'জামদানি পল্লী', 'Handicrafts & Souvenirs',
  'Narayanganj Town Center', 'Authentic GI Certified Handloom Jamdani', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000004', 4, 'Tangail Tat Saree Market (Bajitpur)', 'টাঙ্গাইল তাঁত শাড়ির হাট', 'Handicrafts & Souvenirs',
  'Tangail Town Center', 'World famous Tangail Silk & Cotton Tat Sarees', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000005', 5, 'Kishoreganj Cane & Jute Market', 'কিশোরগঞ্জ বেত ও পাটশিল্প', 'Handicrafts & Souvenirs',
  'Kishoreganj Town Center', 'Handmade Fishing Traps & Cane Baskets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000006', 6, 'Manikganj Traditional Handicrafts & Bazaar', 'মানিকগঞ্জ ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Manikganj Town Center', 'Authentic Manikganj Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000007', 7, 'Munshiganj Traditional Handicrafts & Bazaar', 'মুন্সিগঞ্জ ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Munshiganj Town Center', 'Authentic Munshiganj Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000008', 8, 'Narsingdi Traditional Handicrafts & Bazaar', 'নরসিংদী ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Narsingdi Town Center', 'Authentic Narsingdi Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000009', 9, 'Faridpur Traditional Handicrafts & Bazaar', 'ফরিদপুর ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Faridpur Town Center', 'Authentic Faridpur Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000010', 10, 'Gopalganj Traditional Handicrafts & Bazaar', 'গোপালগঞ্জ ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Gopalganj Town Center', 'Authentic Gopalganj Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000011', 11, 'Madaripur Traditional Handicrafts & Bazaar', 'মাদারীপুর ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Madaripur Town Center', 'Authentic Madaripur Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000012', 12, 'Rajbari Traditional Handicrafts & Bazaar', 'রাজবাড়ী ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Rajbari Town Center', 'Authentic Rajbari Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000013', 13, 'Shariatpur Traditional Handicrafts & Bazaar', 'শরীয়তপুর ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Shariatpur Town Center', 'Authentic Shariatpur Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000014', 14, 'Teri Bazar Handicrafts', 'টেরি বাজার', 'Handicrafts & Souvenirs',
  'Chattogram Town Center', 'Chittagong Dry Fish & Traditional fabrics', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000015', 15, 'Burmese Market (বর্মী মার্কেট)', 'বর্মী মার্কেট', 'Handicrafts & Souvenirs',
  'Cox''s Bazar Town Center', 'Burmese pickles, sea shell jewelry, Rakhine textiles', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000016', 16, 'Chakma Tribal Handloom Emporium', 'চাকমা হস্তশিল্প', 'Handicrafts & Souvenirs',
  'Rangamati (Sajek) Town Center', 'Ethnic Pinon-Hadi dresses & Bamboo crafts', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000017', 17, 'Bandarban Tribal Weaving Market', 'বান্দরবান উপজাতীয় তাঁত বাজার', 'Handicrafts & Souvenirs',
  'Bandarban Town Center', 'Bawm blankets & handmade hill shawls', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000018', 18, 'Khagrachhari Hill Souvenirs', 'খাগড়াছড়ি স্যুভনির', 'Handicrafts & Souvenirs',
  'Khagrachhari Town Center', 'Pure Hill Mustard Honey & Wood Carvings', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000019', 19, 'Cumilla Khadi Cloth Center', 'কুমিল্লা খাদি বস্ত্রালয়', 'Handicrafts & Souvenirs',
  'Cumilla Town Center', 'Pure Handwoven Traditional Khadi Fabrics', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000020', 20, 'Feni Traditional Handicrafts & Bazaar', 'ফেনী ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Feni Town Center', 'Authentic Feni Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000021', 21, 'Brahmanbaria Traditional Handicrafts & Bazaar', 'ব্রাহ্মণবাড়িয়া ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Brahmanbaria Town Center', 'Authentic Brahmanbaria Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000022', 22, 'Noakhali Traditional Handicrafts & Bazaar', 'নোয়াখালী ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Noakhali Town Center', 'Authentic Noakhali Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000023', 23, 'Chandpur Traditional Handicrafts & Bazaar', 'চাঁদপুর ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Chandpur Town Center', 'Authentic Chandpur Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000024', 24, 'Lakshmipur Traditional Handicrafts & Bazaar', 'লক্ষ্মীপুর ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Lakshmipur Town Center', 'Authentic Lakshmipur Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000025', 25, 'Zindabazar Handloom & Tea Hub', 'জিন্দাবাজার তাঁত ও চা বিপণী', 'Handicrafts & Souvenirs',
  'Sylhet Town Center', 'Manipuri Shawls & First-flush Sreemangal Tea', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000026', 26, 'Monipuri Handloom Complex', 'মণিপুরী হ্যান্ডলুম কমপ্লেক্স', 'Handicrafts & Souvenirs',
  'Moulvibazar (Sreemangal) Town Center', 'Handwoven Monipuri sarees & scarves', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000027', 27, 'Tahirpur Shital Pati Market', 'তাহিরপুর শীতল পাটি', 'Handicrafts & Souvenirs',
  'Sunamganj (Tanguar Haor) Town Center', 'Cooling Shital Pati mats & cane crafts', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000028', 28, 'Habiganj Traditional Handicrafts & Bazaar', 'হবিগঞ্জ ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Habiganj Town Center', 'Authentic Habiganj Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000029', 29, 'Rajshahi Silk Factory Showroom', 'রাজশাহী সিল্ক শো-রুম', 'Handicrafts & Souvenirs',
  'Rajshahi Town Center', 'Pure Mulberry Silk Sarees & Kurtas', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000030', 30, 'Bogura Terracotta & Clay Craft', 'বগুড়া মৃৎশিল্প', 'Handicrafts & Souvenirs',
  'Bogura Town Center', 'Clay pots, terracotta souvenirs, traditional sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000031', 31, 'Paharpur Archaeological Souvenir Shop', 'পাহাড়পুর স্যুভনির', 'Handicrafts & Souvenirs',
  'Naogaon Town Center', 'Terracotta plaques, terracotta showpieces', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000032', 32, 'Natore Cane & Jaggery Market', 'নাটোর বেত ও গুড় বিপণী', 'Handicrafts & Souvenirs',
  'Natore Town Center', 'Cane furniture, pure date palm molasses', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000033', 33, 'Chapainawabganj Traditional Handicrafts & Bazaar', 'চাঁপাইনবাবগঞ্জ ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Chapainawabganj Town Center', 'Authentic Chapainawabganj Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000034', 34, 'Pabna Traditional Handicrafts & Bazaar', 'পাবনা ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Pabna Town Center', 'Authentic Pabna Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000035', 35, 'Sirajganj Traditional Handicrafts & Bazaar', 'সিরাজগঞ্জ ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Sirajganj Town Center', 'Authentic Sirajganj Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000036', 36, 'Joypurhat Traditional Handicrafts & Bazaar', 'জয়পুরহাট ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Joypurhat Town Center', 'Authentic Joypurhat Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000037', 37, 'Sundarbans Pure Honey Mart', 'সুন্দরবন খাঁটি মধু ও মোম', 'Handicrafts & Souvenirs',
  'Khulna (Sundarbans) Town Center', 'Raw Khalisha Flower Honey & Sundarban Wax', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000038', 38, 'Bagerhat Coconut Shell Crafts', 'বাগেরহাট নারিকেল পণ্য', 'Handicrafts & Souvenirs',
  'Bagerhat Town Center', 'Carved Coconut Shell Art & Coir Mats', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000039', 39, 'Gadkhali Fresh Flower Hub', 'গদখালী ফুল বাজার', 'Handicrafts & Souvenirs',
  'Jashore Town Center', 'Fresh Roses, Gerbera & Date Palm Jaggery', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000040', 40, 'Satkhira Traditional Handicrafts & Bazaar', 'সাতক্ষীরা ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Satkhira Town Center', 'Authentic Satkhira Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000041', 41, 'Kushtia Baul Instrument Shop', 'কুষ্টিয়া বাউল একতারা ও দোতারা', 'Handicrafts & Souvenirs',
  'Kushtia Town Center', 'Handcrafted Ektara, Dotara & Folk Instruments', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000042', 42, 'Meherpur Traditional Handicrafts & Bazaar', 'মেহেরপুর ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Meherpur Town Center', 'Authentic Meherpur Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000043', 43, 'Chuadanga Traditional Handicrafts & Bazaar', 'চুয়াডাঙ্গা ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Chuadanga Town Center', 'Authentic Chuadanga Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000044', 44, 'Jhenaidah Traditional Handicrafts & Bazaar', 'ঝিনাইদহ ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Jhenaidah Town Center', 'Authentic Jhenaidah Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000045', 45, 'Magura Traditional Handicrafts & Bazaar', 'মাগুরা ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Magura Town Center', 'Authentic Magura Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000046', 46, 'Narail Traditional Handicrafts & Bazaar', 'নড়াইল ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Narail Town Center', 'Authentic Narail Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000047', 47, 'Barishal Shital Pati & Craft Center', 'বরিশাল শীতল পাটি বিপণী', 'Handicrafts & Souvenirs',
  'Barishal Town Center', 'Handwoven Shital Pati & Hog Plum (Amra) Jams', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000048', 48, 'Rakhine Handloom Market Kuakata', 'রাখাইন হস্তশিল্প মার্কেট', 'Handicrafts & Souvenirs',
  'Patuakhali (Kuakata) Town Center', 'Rakhine lungi, handmade shawls, conch shells', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000049', 49, 'Bhola Traditional Handicrafts & Bazaar', 'ভোলা ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Bhola Town Center', 'Authentic Bhola Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000050', 50, 'Jhalokathi Traditional Handicrafts & Bazaar', 'ঝালকাঠি ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Jhalokathi Town Center', 'Authentic Jhalokathi Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000051', 51, 'Pirojpur Traditional Handicrafts & Bazaar', 'পিরোজপুর ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Pirojpur Town Center', 'Authentic Pirojpur Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000052', 52, 'Barguna Traditional Handicrafts & Bazaar', 'বরগুনা ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Barguna Town Center', 'Authentic Barguna Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000053', 53, 'Shataranji Handloom Center (Nisbetganj)', 'শতরঞ্জি পল্লী (রংপুর)', 'Handicrafts & Souvenirs',
  'Rangpur Town Center', 'GI-Certified Historic Shataranji floor rugs & tapestry', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000054', 54, 'Dinajpur Rice & Terracotta Market', 'দিনাজপুর কাটারিভোগ চাল ও হস্তশিল্প', 'Handicrafts & Souvenirs',
  'Dinajpur Town Center', 'Premium Kataribhog Rice & Terracotta art replicas', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000055', 55, 'Panchagarh Tea & Stone Crafts', 'পঞ্চগড় অর্গানিক চা ও পাথর শিল্প', 'Handicrafts & Souvenirs',
  'Panchagarh (Tetulia) Town Center', 'Organic Plainland Tea & Carved Mahananda Rocks', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000056', 56, 'Nilphamari Traditional Handicrafts & Bazaar', 'নীলফামারী ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Nilphamari Town Center', 'Authentic Nilphamari Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000057', 57, 'Lalmonirhat Traditional Handicrafts & Bazaar', 'লালমনিরহাট ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Lalmonirhat Town Center', 'Authentic Lalmonirhat Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000058', 58, 'Kurigram Traditional Handicrafts & Bazaar', 'কুড়িগ্রাম ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Kurigram Town Center', 'Authentic Kurigram Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000059', 59, 'Gaibandha Traditional Handicrafts & Bazaar', 'গাইবান্ধা ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Gaibandha Town Center', 'Authentic Gaibandha Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000060', 60, 'Thakurgaon Traditional Handicrafts & Bazaar', 'ঠাকুরগাঁও ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Thakurgaon Town Center', 'Authentic Thakurgaon Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000061', 61, 'Mymensingh Nakshi Kantha Bazaar', 'ময়মনসিংহ নকশিকাঁথা বাজার', 'Handicrafts & Souvenirs',
  'Mymensingh Town Center', 'Exquisite hand-embroidered Nakshi Kantha quilts', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000062', 62, 'Garo Tribal Weaving Center', 'গারো উপজাতীয় হস্তশিল্প', 'Handicrafts & Souvenirs',
  'Netrokona (Birishiri) Town Center', 'Handwoven Dokmanda dresses & bamboo mugs', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000063', 63, 'Jamalpur Traditional Handicrafts & Bazaar', 'জামালপুর ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Jamalpur Town Center', 'Authentic Jamalpur Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

INSERT INTO public.shopping_places (
  id, district_id, name, name_bn, category, location_address, famous_for, 
  opening_hours, image_url, is_active
) VALUES (
  '00000000-0000-4000-8400-000000000064', 64, 'Sherpur (Garo Hills) Traditional Handicrafts & Bazaar', 'শেরপুর (গারো পাহাড়) ঐতিহ্যবাহী শপিং', 'Handicrafts & Souvenirs',
  'Sherpur (Garo Hills) Town Center', 'Authentic Sherpur (Garo Hills) Handloom, Jute, Cane & Local Sweets', '09:00 AM - 09:30 PM',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  image_url = EXCLUDED.image_url;

-- 7. SEED RENTAL SERVICES & VEHICLES

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000001', 1, 'Dhaka Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-355555', 'rental@yeana.bd', 'Dhaka Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000001', '00000000-0000-4000-8500-000000000001', 'Microbus', 'Toyota Noah Super GL (8 Seater AC)',
  'With Driver', NULL, 5500,
  'Available', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000002', 2, 'Gazipur Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-377777', 'rental@yeana.bd', 'Gazipur Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000002', '00000000-0000-4000-8500-000000000002', 'Chander Gari', 'Mahindra Bolero 4x4',
  'With Driver', NULL, 3500,
  'Available', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000003', 3, 'Narayanganj Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-422221', 'rental@yeana.bd', 'Narayanganj Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000003', '00000000-0000-4000-8500-000000000003', 'Bike', 'Honda CB Shine 125',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000004', 4, 'Tangail Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-377777', 'rental@yeana.bd', 'Tangail Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000004', '00000000-0000-4000-8500-000000000004', 'Bike', 'TVS Metro Plus 110',
  'Self Drive', 120, 700,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000005', 5, 'Kishoreganj Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-422221', 'rental@yeana.bd', 'Kishoreganj Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000005', '00000000-0000-4000-8500-000000000005', 'Boat', 'Engine Boat / Speedboat Rental',
  'With Driver', NULL, 1500,
  'Available', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000006', 6, 'Manikganj Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-399999', 'rental@yeana.bd', 'Manikganj Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000006', '00000000-0000-4000-8500-000000000006', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000007', 7, 'Munshiganj Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-411110', 'rental@yeana.bd', 'Munshiganj Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000007', '00000000-0000-4000-8500-000000000007', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000008', 8, 'Narsingdi Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-399999', 'rental@yeana.bd', 'Narsingdi Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000008', '00000000-0000-4000-8500-000000000008', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000009', 9, 'Faridpur Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-388888', 'rental@yeana.bd', 'Faridpur Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000009', '00000000-0000-4000-8500-000000000009', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000010', 10, 'Gopalganj Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-399999', 'rental@yeana.bd', 'Gopalganj Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000010', '00000000-0000-4000-8500-000000000010', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000011', 11, 'Madaripur Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-399999', 'rental@yeana.bd', 'Madaripur Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000011', '00000000-0000-4000-8500-000000000011', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000012', 12, 'Rajbari Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-377777', 'rental@yeana.bd', 'Rajbari Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000012', '00000000-0000-4000-8500-000000000012', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000013', 13, 'Shariatpur Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-411110', 'rental@yeana.bd', 'Shariatpur Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000013', '00000000-0000-4000-8500-000000000013', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000014', 14, 'Chattogram Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-411110', 'rental@yeana.bd', 'Chattogram Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000014', '00000000-0000-4000-8500-000000000014', 'Sedan', 'Toyota Corolla Sedan AC',
  'With Driver', NULL, 4000,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000015', 15, 'Cox''s Bazar Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-422221', 'rental@yeana.bd', 'Cox''s Bazar Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000015', '00000000-0000-4000-8500-000000000015', 'Bike', 'Honda CB Shine 125',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000016', 16, 'Rangamati (Sajek) Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-488887', 'rental@yeana.bd', 'Rangamati (Sajek) Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000016', '00000000-0000-4000-8500-000000000016', 'Chander Gari', 'Mahindra 4x4 Mountain Chander Gari',
  'With Driver', NULL, 4500,
  'Available', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000017', 17, 'Bandarban Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-399999', 'rental@yeana.bd', 'Bandarban Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000017', '00000000-0000-4000-8500-000000000017', 'Chander Gari', 'Land Cruiser 4x4 Mountain Jeep',
  'With Driver', NULL, 5000,
  'Available', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000018', 18, 'Khagrachhari Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-433332', 'rental@yeana.bd', 'Khagrachhari Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000018', '00000000-0000-4000-8500-000000000018', 'Chander Gari', 'Chander Gari 4x4',
  'With Driver', NULL, 3800,
  'Available', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000019', 19, 'Cumilla Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-377777', 'rental@yeana.bd', 'Cumilla Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000019', '00000000-0000-4000-8500-000000000019', 'Bike', 'Bajaj Pulsar 150',
  'Self Drive', 120, 900,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000020', 20, 'Feni Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-344444', 'rental@yeana.bd', 'Feni Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000020', '00000000-0000-4000-8500-000000000020', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000021', 21, 'Brahmanbaria Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-433332', 'rental@yeana.bd', 'Brahmanbaria Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000021', '00000000-0000-4000-8500-000000000021', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000022', 22, 'Noakhali Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-388888', 'rental@yeana.bd', 'Noakhali Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000022', '00000000-0000-4000-8500-000000000022', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000023', 23, 'Chandpur Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-388888', 'rental@yeana.bd', 'Chandpur Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000023', '00000000-0000-4000-8500-000000000023', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000024', 24, 'Lakshmipur Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-411110', 'rental@yeana.bd', 'Lakshmipur Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000024', '00000000-0000-4000-8500-000000000024', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000025', 25, 'Sylhet Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-366666', 'rental@yeana.bd', 'Sylhet Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000025', '00000000-0000-4000-8500-000000000025', 'Bike', 'Yamaha FZ-S FI V3 (150cc)',
  'Self Drive', 120, 1000,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000026', 26, 'Moulvibazar (Sreemangal) Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-566664', 'rental@yeana.bd', 'Moulvibazar (Sreemangal) Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000026', '00000000-0000-4000-8500-000000000026', 'Chander Gari', '4x4 Open Safari Jeep',
  'With Driver', NULL, 3500,
  'Available', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000027', 27, 'Sunamganj (Tanguar Haor) Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-566664', 'rental@yeana.bd', 'Sunamganj (Tanguar Haor) Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000027', '00000000-0000-4000-8500-000000000027', 'Boat', 'Haor Speedboat & Houseboat',
  'With Driver', NULL, 2500,
  'Available', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000028', 28, 'Habiganj Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-388888', 'rental@yeana.bd', 'Habiganj Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000028', '00000000-0000-4000-8500-000000000028', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000029', 29, 'Rajshahi Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-388888', 'rental@yeana.bd', 'Rajshahi Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000029', '00000000-0000-4000-8500-000000000029', 'Bike', 'Yamaha FZ 150',
  'Self Drive', 120, 950,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000030', 30, 'Bogura Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-366666', 'rental@yeana.bd', 'Bogura Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000030', '00000000-0000-4000-8500-000000000030', 'Bike', 'Honda Shine 125',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000031', 31, 'Naogaon Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-377777', 'rental@yeana.bd', 'Naogaon Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000031', '00000000-0000-4000-8500-000000000031', 'Microbus', 'Toyota Hiace AC Microbus',
  'With Driver', NULL, 4500,
  'Available', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000032', 32, 'Natore Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-366666', 'rental@yeana.bd', 'Natore Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000032', '00000000-0000-4000-8500-000000000032', 'Bike', 'Bajaj Discover 125',
  'Self Drive', 120, 750,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000033', 33, 'Chapainawabganj Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-466665', 'rental@yeana.bd', 'Chapainawabganj Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000033', '00000000-0000-4000-8500-000000000033', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000034', 34, 'Pabna Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-355555', 'rental@yeana.bd', 'Pabna Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000034', '00000000-0000-4000-8500-000000000034', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000035', 35, 'Sirajganj Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-399999', 'rental@yeana.bd', 'Sirajganj Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000035', '00000000-0000-4000-8500-000000000035', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000036', 36, 'Joypurhat Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-399999', 'rental@yeana.bd', 'Joypurhat Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000036', '00000000-0000-4000-8500-000000000036', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000037', 37, 'Khulna (Sundarbans) Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-511109', 'rental@yeana.bd', 'Khulna (Sundarbans) Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000037', '00000000-0000-4000-8500-000000000037', 'Boat', 'Sundarbans Eco Cruise Boat',
  'With Driver', NULL, 8500,
  'Available', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000038', 38, 'Bagerhat Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-388888', 'rental@yeana.bd', 'Bagerhat Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000038', '00000000-0000-4000-8500-000000000038', 'Bike', 'Tourist CNG Auto-rickshaw',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000039', 39, 'Jashore Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-377777', 'rental@yeana.bd', 'Jashore Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000039', '00000000-0000-4000-8500-000000000039', 'Sedan', 'Toyota Allion Sedan',
  'With Driver', NULL, 3800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000040', 40, 'Satkhira Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-388888', 'rental@yeana.bd', 'Satkhira Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000040', '00000000-0000-4000-8500-000000000040', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000041', 41, 'Kushtia Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-377777', 'rental@yeana.bd', 'Kushtia Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000041', '00000000-0000-4000-8500-000000000041', 'Bike', 'Hero Glamour 125',
  'Self Drive', 120, 750,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000042', 42, 'Meherpur Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-388888', 'rental@yeana.bd', 'Meherpur Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000042', '00000000-0000-4000-8500-000000000042', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000043', 43, 'Chuadanga Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-399999', 'rental@yeana.bd', 'Chuadanga Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000043', '00000000-0000-4000-8500-000000000043', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000044', 44, 'Jhenaidah Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-399999', 'rental@yeana.bd', 'Jhenaidah Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000044', '00000000-0000-4000-8500-000000000044', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000045', 45, 'Magura Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-366666', 'rental@yeana.bd', 'Magura Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000045', '00000000-0000-4000-8500-000000000045', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000046', 46, 'Narail Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-366666', 'rental@yeana.bd', 'Narail Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000046', '00000000-0000-4000-8500-000000000046', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000047', 47, 'Barishal Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-388888', 'rental@yeana.bd', 'Barishal Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000047', '00000000-0000-4000-8500-000000000047', 'Boat', 'River Speedboat & Engine Trawler',
  'With Driver', NULL, 2000,
  'Available', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000048', 48, 'Patuakhali (Kuakata) Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-522220', 'rental@yeana.bd', 'Patuakhali (Kuakata) Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000048', '00000000-0000-4000-8500-000000000048', 'Bike', 'Beach 4-Wheel Quad Bike',
  'Self Drive', 120, 1200,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000049', 49, 'Bhola Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-355555', 'rental@yeana.bd', 'Bhola Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000049', '00000000-0000-4000-8500-000000000049', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000050', 50, 'Jhalokathi Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-411110', 'rental@yeana.bd', 'Jhalokathi Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000050', '00000000-0000-4000-8500-000000000050', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000051', 51, 'Pirojpur Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-388888', 'rental@yeana.bd', 'Pirojpur Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000051', '00000000-0000-4000-8500-000000000051', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000052', 52, 'Barguna Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-377777', 'rental@yeana.bd', 'Barguna Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000052', '00000000-0000-4000-8500-000000000052', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000053', 53, 'Rangpur Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-377777', 'rental@yeana.bd', 'Rangpur Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000053', '00000000-0000-4000-8500-000000000053', 'Sedan', 'Toyota Corolla Axio',
  'With Driver', NULL, 3500,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000054', 54, 'Dinajpur Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-388888', 'rental@yeana.bd', 'Dinajpur Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000054', '00000000-0000-4000-8500-000000000054', 'Bike', 'TVS Apache RTR 160',
  'Self Drive', 120, 850,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000055', 55, 'Panchagarh (Tetulia) Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-522220', 'rental@yeana.bd', 'Panchagarh (Tetulia) Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000055', '00000000-0000-4000-8500-000000000055', 'Chander Gari', 'Mahindra 4x4 Mountain Jeep',
  'With Driver', NULL, 3500,
  'Available', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000056', 56, 'Nilphamari Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-411110', 'rental@yeana.bd', 'Nilphamari Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000056', '00000000-0000-4000-8500-000000000056', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000057', 57, 'Lalmonirhat Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-422221', 'rental@yeana.bd', 'Lalmonirhat Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000057', '00000000-0000-4000-8500-000000000057', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000058', 58, 'Kurigram Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-388888', 'rental@yeana.bd', 'Kurigram Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000058', '00000000-0000-4000-8500-000000000058', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000059', 59, 'Gaibandha Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-399999', 'rental@yeana.bd', 'Gaibandha Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000059', '00000000-0000-4000-8500-000000000059', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000060', 60, 'Thakurgaon Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-411110', 'rental@yeana.bd', 'Thakurgaon Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000060', '00000000-0000-4000-8500-000000000060', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000061', 61, 'Mymensingh Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-411110', 'rental@yeana.bd', 'Mymensingh Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000061', '00000000-0000-4000-8500-000000000061', 'Bike', 'Honda Livo 110',
  'Self Drive', 120, 700,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000062', 62, 'Netrokona (Birishiri) Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-533331', 'rental@yeana.bd', 'Netrokona (Birishiri) Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000062', '00000000-0000-4000-8500-000000000062', 'Bike', 'Durgapur Mountain Bike & Chander Gari',
  'Self Drive', 120, 600,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000063', 63, 'Jamalpur Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-388888', 'rental@yeana.bd', 'Jamalpur Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000063', '00000000-0000-4000-8500-000000000063', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;

INSERT INTO public.rental_services (
  id, district_id, provider_name, contact_phone, contact_email, location_address, rating, is_active
) VALUES (
  '00000000-0000-4000-8500-000000000064', 64, 'Sherpur (Garo Hills) Travel & Ride Rentals Travels & Car Rental',
  '+880 1913-522220', 'rental@yeana.bd', 'Sherpur (Garo Hills) Sadar', 4.7, true
) ON CONFLICT (id) DO UPDATE SET
  provider_name = EXCLUDED.provider_name;

INSERT INTO public.rental_vehicles (
  id, rental_service_id, vehicle_type, model, rental_type, price_per_hour, price_per_day, 
  availability_status, image_url, is_active
) VALUES (
  '00000000-0000-4000-8600-000000000064', '00000000-0000-4000-8500-000000000064', 'Bike', 'Bajaj Pulsar 150 / Tourist CNG',
  'Self Drive', 120, 800,
  'Available', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', true
) ON CONFLICT (id) DO UPDATE SET
  model = EXCLUDED.model,
  price_per_day = EXCLUDED.price_per_day;
