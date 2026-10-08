-- ========================================================================
-- YEANA — Bangladesh Tour & Travel Platform
-- Migration: 20261007000001_core_schema.sql
-- Description: Core Relational Database Schema with Normalized Tables,
--              Foreign Keys, Constraints, Identity/UUID keys, Indexes,
--              and Automatic Timestamp & User Profile Triggers.
-- ========================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================================================
-- HELPER FUNCTION: Automatic updated_at trigger
-- ========================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ========================================================================
-- 1. AUTH & USER TABLES
-- ========================================================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'partner')),
    bio TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- User Preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    preferred_language TEXT NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en', 'bn')),
    theme TEXT NOT NULL DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    email_notifications BOOLEAN NOT NULL DEFAULT true,
    push_notifications BOOLEAN NOT NULL DEFAULT true,
    currency TEXT NOT NULL DEFAULT 'BDT' CHECK (currency IN ('BDT', 'USD', 'EUR', 'GBP')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Triggers for profiles & user_preferences updated_at
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_user_preferences_updated_at ON public.user_preferences;
CREATE TRIGGER trg_user_preferences_updated_at
    BEFORE UPDATE ON public.user_preferences
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ========================================================================
-- 2. LOCATION HIERARCHY TABLES (Bangladesh Administrative Geography)
-- ========================================================================

-- Divisions of Bangladesh (8 Administrative Divisions)
CREATE TABLE IF NOT EXISTS public.divisions (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    name_bn TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE, -- e.g. 'DHK', 'CTG', 'SYL', 'RAJ', 'KHU', 'BAR', 'RAN', 'MYM'
    lat NUMERIC(10, 7),
    lng NUMERIC(10, 7),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Districts of Bangladesh (64 Districts)
CREATE TABLE IF NOT EXISTS public.districts (
    id BIGSERIAL PRIMARY KEY,
    division_id BIGINT NOT NULL REFERENCES public.divisions(id) ON DELETE RESTRICT,
    slug TEXT NOT NULL UNIQUE, -- e.g. 'dhaka', 'coxs-bazar', 'sylhet'
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    lat NUMERIC(10, 7),
    lng NUMERIC(10, 7),
    popular_season TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Upazilas of Bangladesh (495+ Upazilas)
CREATE TABLE IF NOT EXISTS public.upazilas (
    id BIGSERIAL PRIMARY KEY,
    district_id BIGINT NOT NULL REFERENCES public.districts(id) ON DELETE RESTRICT,
    slug TEXT NOT NULL UNIQUE, -- e.g. 'teknaf', 'savar', 'sreemangal'
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    lat NUMERIC(10, 7),
    lng NUMERIC(10, 7),
    popular_tag TEXT,
    has_railway BOOLEAN NOT NULL DEFAULT false,
    has_launch_ghat BOOLEAN NOT NULL DEFAULT false,
    transit_hub_type TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 3. TOURISM & DESTINATIONS
-- ========================================================================

-- Destinations / Tourist Attractions
CREATE TABLE IF NOT EXISTS public.destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id BIGINT NOT NULL REFERENCES public.districts(id) ON DELETE RESTRICT,
    upazila_id BIGINT REFERENCES public.upazilas(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Nature', -- Nature, Hill, Beach, Heritage, Island, Waterfall, Tea Garden, Forest
    short_description TEXT,
    full_description TEXT,
    location_address TEXT NOT NULL,
    lat NUMERIC(10, 7),
    lng NUMERIC(10, 7),
    entry_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    entry_fee_info TEXT,
    opening_time TEXT,
    best_time_to_visit TEXT,
    how_to_reach TEXT,
    cover_image_url TEXT NOT NULL,
    rating NUMERIC(2, 1) NOT NULL DEFAULT 4.5,
    reviews_count INT NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Destination Images (Normalized Image Table)
CREATE TABLE IF NOT EXISTS public.destination_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 4. HOTELS & ACCOMMODATIONS
-- ========================================================================

-- Hotels
CREATE TABLE IF NOT EXISTS public.hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id BIGINT NOT NULL REFERENCES public.districts(id) ON DELETE RESTRICT,
    upazila_id BIGINT REFERENCES public.upazilas(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    description TEXT,
    rating NUMERIC(2, 1) NOT NULL DEFAULT 4.3,
    reviews_count INT NOT NULL DEFAULT 0,
    price_per_night NUMERIC(10, 2) NOT NULL,
    location_address TEXT NOT NULL,
    lat NUMERIC(10, 7),
    lng NUMERIC(10, 7),
    contact_phone TEXT,
    contact_email TEXT,
    has_ac BOOLEAN NOT NULL DEFAULT true,
    has_wifi BOOLEAN NOT NULL DEFAULT true,
    has_parking BOOLEAN NOT NULL DEFAULT true,
    has_restaurant BOOLEAN NOT NULL DEFAULT true,
    has_room_service BOOLEAN NOT NULL DEFAULT true,
    has_security BOOLEAN NOT NULL DEFAULT true,
    cover_image_url TEXT NOT NULL,
    check_in_time TEXT NOT NULL DEFAULT '12:00 PM',
    check_out_time TEXT NOT NULL DEFAULT '11:00 AM',
    room_types TEXT[] NOT NULL DEFAULT '{"Deluxe Couple", "Family Suite"}',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Hotel Images (Normalized Image Table)
CREATE TABLE IF NOT EXISTS public.hotel_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID NOT NULL REFERENCES public.hotels(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    room_type TEXT,
    caption TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 5. FOOD & RESTAURANTS
-- ========================================================================

-- Restaurants
CREATE TABLE IF NOT EXISTS public.restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id BIGINT NOT NULL REFERENCES public.districts(id) ON DELETE RESTRICT,
    upazila_id BIGINT REFERENCES public.upazilas(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    rating NUMERIC(2, 1) NOT NULL DEFAULT 4.5,
    reviews_count INT NOT NULL DEFAULT 0,
    cuisine TEXT NOT NULL, -- Traditional Bengali, Seafood, Biryani, Cafe, Street Food, Fast Food
    price_tier TEXT NOT NULL DEFAULT '৳৳' CHECK (price_tier IN ('৳', '৳৳', '৳৳৳')),
    location_address TEXT NOT NULL,
    lat NUMERIC(10, 7),
    lng NUMERIC(10, 7),
    contact_phone TEXT,
    opening_hours TEXT,
    menu_highlights TEXT[] NOT NULL DEFAULT '{}',
    cover_image_url TEXT NOT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Restaurant Images (Normalized Image Table)
CREATE TABLE IF NOT EXISTS public.restaurant_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    dish_name TEXT,
    caption TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 6. TRANSPORT
-- ========================================================================

-- Transport Types (Bus, Train, Flight, Launch, Car)
CREATE TABLE IF NOT EXISTS public.transport_types (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'Bus', 'Train', 'Flight', 'Launch', 'Car'
    name_bn TEXT NOT NULL,
    icon TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Transport Routes
CREATE TABLE IF NOT EXISTS public.transport_routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transport_type_id BIGINT NOT NULL REFERENCES public.transport_types(id) ON DELETE RESTRICT,
    company TEXT NOT NULL,
    from_district_id BIGINT NOT NULL REFERENCES public.districts(id) ON DELETE RESTRICT,
    to_district_id BIGINT NOT NULL REFERENCES public.districts(id) ON DELETE RESTRICT,
    departure_time TEXT NOT NULL,
    arrival_time TEXT NOT NULL,
    duration TEXT NOT NULL,
    price_min NUMERIC(10, 2) NOT NULL,
    price_max NUMERIC(10, 2) NOT NULL,
    boarding_points TEXT[] NOT NULL DEFAULT '{}',
    dropping_points TEXT[] NOT NULL DEFAULT '{}',
    schedule_days TEXT NOT NULL DEFAULT 'Daily',
    contact_phone TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 7. SHOPPING
-- ========================================================================

-- Shopping Places (Traditional Bazaars, Handicraft Centres, Malls)
CREATE TABLE IF NOT EXISTS public.shopping_places (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id BIGINT NOT NULL REFERENCES public.districts(id) ON DELETE RESTRICT,
    upazila_id BIGINT REFERENCES public.upazilas(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    category TEXT NOT NULL, -- Handicrafts, Traditional Market, Modern Mall, Clothing, Souvenirs
    location_address TEXT NOT NULL,
    lat NUMERIC(10, 7),
    lng NUMERIC(10, 7),
    famous_for TEXT,
    opening_hours TEXT,
    image_url TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 8. RENTAL SERVICES & VEHICLES
-- ========================================================================

-- Rental Providers / Agencies
CREATE TABLE IF NOT EXISTS public.rental_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id BIGINT NOT NULL REFERENCES public.districts(id) ON DELETE RESTRICT,
    provider_name TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    contact_email TEXT,
    location_address TEXT NOT NULL,
    rating NUMERIC(2, 1) NOT NULL DEFAULT 4.5,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Rental Vehicles
CREATE TABLE IF NOT EXISTS public.rental_vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rental_service_id UUID NOT NULL REFERENCES public.rental_services(id) ON DELETE CASCADE,
    vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('Bike', 'Car', 'Microbus', 'Chander Gari')),
    model TEXT NOT NULL,
    rental_type TEXT NOT NULL DEFAULT 'With Driver' CHECK (rental_type IN ('Self Drive', 'With Driver', 'Both')),
    price_per_hour NUMERIC(10, 2),
    price_per_day NUMERIC(10, 2) NOT NULL,
    availability_status TEXT NOT NULL DEFAULT 'Available' CHECK (availability_status IN ('Available', 'Booked', 'Under Maintenance')),
    image_url TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 9. USER FEATURES: FAVORITES, REVIEWS, NOTIFICATIONS
-- ========================================================================

-- Favorites / Saved Items
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('destination', 'hotel', 'restaurant', 'shopping', 'rental', 'route')),
    item_id TEXT NOT NULL,
    item_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, item_type, item_id)
);

-- Reviews & Ratings
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL CHECK (target_type IN ('destination', 'hotel', 'restaurant', 'rental')),
    target_id TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_approved BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'system' CHECK (type IN ('booking_confirmation', 'booking_cancellation', 'system', 'promotional')),
    is_read BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 10. BOOKINGS & BOOKING ITEMS
-- ========================================================================

-- Bookings Table (Parent Booking Record)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_number TEXT NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'failed')),
    payment_method TEXT,
    contact_name TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    contact_email TEXT,
    special_requests TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Booking Items Table (Normalized Child Items: Hotel Room, Transport Seat, Vehicle, etc.)
CREATE TABLE IF NOT EXISTS public.booking_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('hotel', 'transport', 'rental', 'activity')),
    item_id TEXT NOT NULL,
    title TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(12, 2) NOT NULL,
    total_price NUMERIC(12, 2) NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 11. TRIPS & ITINERARY ITEMS (Trip Planner Support)
-- ========================================================================

CREATE TABLE IF NOT EXISTS public.trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    destination TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    duration_days INT NOT NULL DEFAULT 3,
    budget_transport NUMERIC(10, 2) NOT NULL DEFAULT 0,
    budget_hotel NUMERIC(10, 2) NOT NULL DEFAULT 0,
    budget_food NUMERIC(10, 2) NOT NULL DEFAULT 0,
    budget_activities NUMERIC(10, 2) NOT NULL DEFAULT 0,
    budget_shopping NUMERIC(10, 2) NOT NULL DEFAULT 0,
    budget_ride NUMERIC(10, 2) NOT NULL DEFAULT 0,
    budget_other NUMERIC(10, 2) NOT NULL DEFAULT 0,
    total_budget NUMERIC(10, 2) NOT NULL DEFAULT 0,
    notes TEXT,
    is_public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.trip_places (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
    destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
    custom_title TEXT,
    day_number INT NOT NULL DEFAULT 1,
    order_index INT NOT NULL DEFAULT 0,
    time_slot TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 12. TRIGGERS: AUTOMATIC USER REGISTRATION
-- ========================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- 1. Create Profile
    INSERT INTO public.profiles (id, full_name, email, avatar_url, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
        COALESCE(NEW.raw_user_meta_data->>'role', 'user')
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        avatar_url = EXCLUDED.avatar_url;

    -- 2. Create User Preferences
    INSERT INTO public.user_preferences (user_id, preferred_language, theme)
    VALUES (NEW.id, 'en', 'system')
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Automatic updated_at triggers for other tables
DROP TRIGGER IF EXISTS trg_divisions_updated_at ON public.divisions;
CREATE TRIGGER trg_divisions_updated_at BEFORE UPDATE ON public.divisions FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_districts_updated_at ON public.districts;
CREATE TRIGGER trg_districts_updated_at BEFORE UPDATE ON public.districts FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_upazilas_updated_at ON public.upazilas;
CREATE TRIGGER trg_upazilas_updated_at BEFORE UPDATE ON public.upazilas FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_destinations_updated_at ON public.destinations;
CREATE TRIGGER trg_destinations_updated_at BEFORE UPDATE ON public.destinations FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_hotels_updated_at ON public.hotels;
CREATE TRIGGER trg_hotels_updated_at BEFORE UPDATE ON public.hotels FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_restaurants_updated_at ON public.restaurants;
CREATE TRIGGER trg_restaurants_updated_at BEFORE UPDATE ON public.restaurants FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_transport_types_updated_at ON public.transport_types;
CREATE TRIGGER trg_transport_types_updated_at BEFORE UPDATE ON public.transport_types FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_transport_routes_updated_at ON public.transport_routes;
CREATE TRIGGER trg_transport_routes_updated_at BEFORE UPDATE ON public.transport_routes FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_shopping_places_updated_at ON public.shopping_places;
CREATE TRIGGER trg_shopping_places_updated_at BEFORE UPDATE ON public.shopping_places FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_rental_services_updated_at ON public.rental_services;
CREATE TRIGGER trg_rental_services_updated_at BEFORE UPDATE ON public.rental_services FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_rental_vehicles_updated_at ON public.rental_vehicles;
CREATE TRIGGER trg_rental_vehicles_updated_at BEFORE UPDATE ON public.rental_vehicles FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_reviews_updated_at ON public.reviews;
CREATE TRIGGER trg_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_bookings_updated_at ON public.bookings;
CREATE TRIGGER trg_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_trips_updated_at ON public.trips;
CREATE TRIGGER trg_trips_updated_at BEFORE UPDATE ON public.trips FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ========================================================================
-- 13. INDEXES FOR HIGH-EFFICIENCY SEARCHING, FILTERING & PAGINATION
-- ========================================================================

-- Geographic Indexes
CREATE INDEX IF NOT EXISTS idx_districts_division_id ON public.districts(division_id);
CREATE INDEX IF NOT EXISTS idx_upazilas_district_id ON public.upazilas(district_id);

-- Destinations Indexes
CREATE INDEX IF NOT EXISTS idx_destinations_district_id ON public.destinations(district_id);
CREATE INDEX IF NOT EXISTS idx_destinations_upazila_id ON public.destinations(upazila_id);
CREATE INDEX IF NOT EXISTS idx_destinations_category ON public.destinations(category);
CREATE INDEX IF NOT EXISTS idx_destinations_rating ON public.destinations(rating DESC);
CREATE INDEX IF NOT EXISTS idx_destinations_is_active ON public.destinations(is_active);
CREATE INDEX IF NOT EXISTS idx_destinations_is_featured ON public.destinations(is_featured);
CREATE INDEX IF NOT EXISTS idx_destinations_created_at ON public.destinations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_destination_images_destination ON public.destination_images(destination_id);

-- Hotels Indexes
CREATE INDEX IF NOT EXISTS idx_hotels_district_id ON public.hotels(district_id);
CREATE INDEX IF NOT EXISTS idx_hotels_upazila_id ON public.hotels(upazila_id);
CREATE INDEX IF NOT EXISTS idx_hotels_price_per_night ON public.hotels(price_per_night);
CREATE INDEX IF NOT EXISTS idx_hotels_rating ON public.hotels(rating DESC);
CREATE INDEX IF NOT EXISTS idx_hotels_is_active ON public.hotels(is_active);
CREATE INDEX IF NOT EXISTS idx_hotels_is_featured ON public.hotels(is_featured);
CREATE INDEX IF NOT EXISTS idx_hotels_created_at ON public.hotels(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hotel_images_hotel ON public.hotel_images(hotel_id);

-- Restaurants Indexes
CREATE INDEX IF NOT EXISTS idx_restaurants_district_id ON public.restaurants(district_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_upazila_id ON public.restaurants(upazila_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_cuisine ON public.restaurants(cuisine);
CREATE INDEX IF NOT EXISTS idx_restaurants_price_tier ON public.restaurants(price_tier);
CREATE INDEX IF NOT EXISTS idx_restaurants_rating ON public.restaurants(rating DESC);
CREATE INDEX IF NOT EXISTS idx_restaurants_is_active ON public.restaurants(is_active);
CREATE INDEX IF NOT EXISTS idx_restaurant_images_restaurant ON public.restaurant_images(restaurant_id);

-- Transport Indexes
CREATE INDEX IF NOT EXISTS idx_transport_routes_type_id ON public.transport_routes(transport_type_id);
CREATE INDEX IF NOT EXISTS idx_transport_routes_from_district ON public.transport_routes(from_district_id);
CREATE INDEX IF NOT EXISTS idx_transport_routes_to_district ON public.transport_routes(to_district_id);
CREATE INDEX IF NOT EXISTS idx_transport_routes_price_min ON public.transport_routes(price_min);
CREATE INDEX IF NOT EXISTS idx_transport_routes_is_active ON public.transport_routes(is_active);

-- Shopping & Rental Indexes
CREATE INDEX IF NOT EXISTS idx_shopping_places_district_id ON public.shopping_places(district_id);
CREATE INDEX IF NOT EXISTS idx_shopping_places_category ON public.shopping_places(category);
CREATE INDEX IF NOT EXISTS idx_rental_services_district_id ON public.rental_services(district_id);
CREATE INDEX IF NOT EXISTS idx_rental_vehicles_service_id ON public.rental_vehicles(rental_service_id);
CREATE INDEX IF NOT EXISTS idx_rental_vehicles_availability ON public.rental_vehicles(availability_status);
CREATE INDEX IF NOT EXISTS idx_rental_vehicles_price_per_day ON public.rental_vehicles(price_per_day);

-- User Features Indexes
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_target ON public.reviews(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_is_approved ON public.reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_notifications_user_is_read ON public.notifications(user_id, is_read);

-- Bookings Indexes
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON public.bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_items_booking_id ON public.booking_items(booking_id);
