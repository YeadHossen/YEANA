-- ========================================================================
-- YEANA — Travel, Tourism & Lifestyle Platform for Bangladesh
-- Supabase PostgreSQL Schema & Security Policies
-- ========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'partner')),
    bio TEXT,
    preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'bn')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. DISTRICTS
CREATE TABLE IF NOT EXISTS public.districts (
    id TEXT PRIMARY KEY, -- e.g. 'sylhet', 'coxs-bazar'
    division TEXT NOT NULL, -- 'Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh'
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    lat NUMERIC,
    lng NUMERIC,
    popular_season TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PLACES (Tourist Destinations & Attractions)
CREATE TABLE IF NOT EXISTS public.places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id TEXT REFERENCES public.districts(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    rating NUMERIC(2, 1) DEFAULT 4.5,
    reviews_count INT DEFAULT 0,
    short_description TEXT,
    full_description TEXT,
    location TEXT NOT NULL,
    lat NUMERIC,
    lng NUMERIC,
    entry_fee TEXT,
    opening_time TEXT,
    best_time TEXT,
    how_to_reach TEXT,
    image_url TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    category TEXT DEFAULT 'Nature', -- Nature, Hill, Beach, Heritage, Island, Waterfall, Tea Garden
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. HOTELS
CREATE TABLE IF NOT EXISTS public.hotels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id TEXT REFERENCES public.districts(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    rating NUMERIC(2, 1) DEFAULT 4.3,
    reviews_count INT DEFAULT 0,
    price_per_night NUMERIC NOT NULL,
    location TEXT NOT NULL,
    address TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    has_ac BOOLEAN DEFAULT true,
    has_wifi BOOLEAN DEFAULT true,
    has_parking BOOLEAN DEFAULT true,
    has_restaurant BOOLEAN DEFAULT true,
    has_room_service BOOLEAN DEFAULT true,
    has_security BOOLEAN DEFAULT true,
    image_url TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    room_types TEXT[] DEFAULT '{"Deluxe Couple", "Family Suite"}',
    check_in TEXT DEFAULT '12:00 PM',
    check_out TEXT DEFAULT '11:00 AM',
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. RESTAURANTS & FOOD
CREATE TABLE IF NOT EXISTS public.restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id TEXT REFERENCES public.districts(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    rating NUMERIC(2, 1) DEFAULT 4.5,
    reviews_count INT DEFAULT 0,
    cuisine TEXT NOT NULL, -- Traditional Bengali, Seafood, Biryani, Cafe, Street Food, Fast Food
    price_tier TEXT DEFAULT '৳৳' CHECK (price_tier IN ('৳', '৳৳', '৳৳৳')),
    location TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    opening_hours TEXT,
    menu_highlights TEXT[] DEFAULT '{}',
    image_url TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TRANSPORT ROUTES
CREATE TABLE IF NOT EXISTS public.transport_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transport_type TEXT NOT NULL CHECK (transport_type IN ('Bus', 'Train', 'Flight', 'Car', 'Launch')),
    company TEXT NOT NULL,
    from_district TEXT NOT NULL,
    to_district TEXT NOT NULL,
    departure_time TEXT NOT NULL,
    arrival_time TEXT NOT NULL,
    duration TEXT NOT NULL,
    price_min NUMERIC NOT NULL,
    price_max NUMERIC NOT NULL,
    boarding_points TEXT[] DEFAULT '{}',
    schedule_days TEXT DEFAULT 'Daily',
    contact_phone TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. SHOPPING PLACES
CREATE TABLE IF NOT EXISTS public.shopping_places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id TEXT REFERENCES public.districts(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    category TEXT NOT NULL, -- Handicrafts, Traditional Market, Modern Mall, Clothing, Souvenirs
    location TEXT NOT NULL,
    address TEXT,
    famous_for TEXT,
    opening_hours TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. RIDES (Vehicle Rentals)
CREATE TABLE IF NOT EXISTS public.rides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id TEXT REFERENCES public.districts(id) ON DELETE SET NULL,
    vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('Bike', 'Car', 'Microbus', 'Chander Gari')),
    model TEXT NOT NULL,
    rental_type TEXT DEFAULT 'With Driver', -- Self Drive, With Driver, Both
    price_per_hour NUMERIC,
    price_per_day NUMERIC NOT NULL,
    location TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    availability_status TEXT DEFAULT 'Available' CHECK (availability_status IN ('Available', 'Booked', 'Under Maintenance')),
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. TRIPS & ITINERARIES
CREATE TABLE IF NOT EXISTS public.trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    destination TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    duration_days INT DEFAULT 3,
    budget_transport NUMERIC DEFAULT 0,
    budget_hotel NUMERIC DEFAULT 0,
    budget_food NUMERIC DEFAULT 0,
    budget_activities NUMERIC DEFAULT 0,
    budget_shopping NUMERIC DEFAULT 0,
    budget_ride NUMERIC DEFAULT 0,
    budget_other NUMERIC DEFAULT 0,
    total_budget NUMERIC DEFAULT 0,
    notes TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. TRIP PLACES (Days & Itinerary items)
CREATE TABLE IF NOT EXISTS public.trip_places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
    place_id UUID REFERENCES public.places(id) ON DELETE SET NULL,
    custom_title TEXT,
    day_number INT NOT NULL DEFAULT 1,
    order_index INT NOT NULL DEFAULT 0,
    time_slot TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. FAVORITES (Bookmarks for Offline/Sync)
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('place', 'hotel', 'restaurant', 'shopping', 'ride')),
    item_id TEXT NOT NULL,
    item_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, item_type, item_id)
);

-- 12. REVIEWS & RATINGS
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    user_avatar TEXT,
    target_type TEXT NOT NULL CHECK (target_type IN ('place', 'hotel', 'restaurant', 'ride')),
    target_id TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Read policies for public browsing
CREATE POLICY "Allow public read on districts" ON public.districts FOR SELECT USING (true);
CREATE POLICY "Allow public read on places" ON public.places FOR SELECT USING (true);
CREATE POLICY "Allow public read on hotels" ON public.hotels FOR SELECT USING (true);
CREATE POLICY "Allow public read on restaurants" ON public.restaurants FOR SELECT USING (true);
CREATE POLICY "Allow public read on transport_routes" ON public.transport_routes FOR SELECT USING (true);
CREATE POLICY "Allow public read on shopping_places" ON public.shopping_places FOR SELECT USING (true);
CREATE POLICY "Allow public read on rides" ON public.rides FOR SELECT USING (true);
CREATE POLICY "Allow public read on reviews" ON public.reviews FOR SELECT USING (true);

-- User-specific data policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own trips" ON public.trips FOR SELECT USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "Users can insert own trips" ON public.trips FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own trips" ON public.trips FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own trips" ON public.trips FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own trip places" ON public.trip_places FOR ALL USING (
    EXISTS (SELECT 1 FROM public.trips WHERE trips.id = trip_places.trip_id AND trips.user_id = auth.uid())
);

CREATE POLICY "Users can manage own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own reviews" ON public.reviews FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- Admin full access (checks profile role = 'admin')
CREATE POLICY "Admins have full access to places" ON public.places FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Admins have full access to hotels" ON public.hotels FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Admins have full access to restaurants" ON public.restaurants FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Admins have full access to transport" ON public.transport_routes FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- ========================================================================
-- PROFILE AUTO-CREATION TRIGGER
-- ========================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    COALESCE(new.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
    COALESCE(new.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
