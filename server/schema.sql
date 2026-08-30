-- ========================================================================
-- YEANA — Bangladesh Travel & Tourism Platform
-- SQLite Database Schema (Aligned with Application Types & MCP Server)
-- ========================================================================

-- 1. PROFILES / USERS
CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'partner')),
    bio TEXT,
    preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'bn')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. DISTRICTS
CREATE TABLE IF NOT EXISTS districts (
    id TEXT PRIMARY KEY,
    division TEXT NOT NULL,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    lat REAL,
    lng REAL,
    popular_season TEXT,
    place_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. PLACES (Tourist Destinations & Attractions)
CREATE TABLE IF NOT EXISTS places (
    id TEXT PRIMARY KEY,
    district_id TEXT REFERENCES districts(id) ON DELETE SET NULL,
    district_name TEXT,
    division TEXT,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    rating REAL DEFAULT 4.5,
    reviews_count INTEGER DEFAULT 0,
    short_description TEXT,
    full_description TEXT,
    location TEXT NOT NULL,
    lat REAL,
    lng REAL,
    entry_fee TEXT,
    opening_time TEXT,
    best_time TEXT,
    how_to_reach TEXT,
    image_url TEXT NOT NULL,
    gallery TEXT DEFAULT '[]',
    category TEXT DEFAULT 'Nature',
    is_featured BOOLEAN DEFAULT 0,
    nearby_hotels TEXT DEFAULT '[]',
    nearby_restaurants TEXT DEFAULT '[]',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. HOTELS & RESORTS
CREATE TABLE IF NOT EXISTS hotels (
    id TEXT PRIMARY KEY,
    district_id TEXT REFERENCES districts(id) ON DELETE SET NULL,
    district_name TEXT,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    rating REAL DEFAULT 4.5,
    reviews_count INTEGER DEFAULT 0,
    price_per_night REAL NOT NULL,
    price_formatted TEXT,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    contact_email TEXT,
    has_ac BOOLEAN DEFAULT 1,
    has_wifi BOOLEAN DEFAULT 1,
    has_parking BOOLEAN DEFAULT 1,
    has_restaurant BOOLEAN DEFAULT 1,
    has_room_service BOOLEAN DEFAULT 1,
    has_security BOOLEAN DEFAULT 1,
    image_url TEXT NOT NULL,
    gallery TEXT DEFAULT '[]',
    room_types TEXT DEFAULT '[]',
    check_in TEXT DEFAULT '12:00 PM',
    check_out TEXT DEFAULT '11:00 AM',
    is_featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. RESTAURANTS & CUISINE
CREATE TABLE IF NOT EXISTS restaurants (
    id TEXT PRIMARY KEY,
    district_id TEXT REFERENCES districts(id) ON DELETE SET NULL,
    district_name TEXT,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    rating REAL DEFAULT 4.5,
    reviews_count INTEGER DEFAULT 0,
    cuisine TEXT NOT NULL,
    cuisine_bn TEXT,
    price_tier TEXT DEFAULT '৳৳',
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT,
    opening_hours TEXT,
    menu_highlights TEXT DEFAULT '[]',
    image_url TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. TRANSPORT ROUTES
CREATE TABLE IF NOT EXISTS transport_routes (
    id TEXT PRIMARY KEY,
    transport_type TEXT NOT NULL,
    company TEXT NOT NULL,
    from_district TEXT NOT NULL,
    to_district TEXT NOT NULL,
    departure_time TEXT NOT NULL,
    arrival_time TEXT NOT NULL,
    duration TEXT NOT NULL,
    price_min REAL NOT NULL,
    price_max REAL NOT NULL,
    boarding_points TEXT DEFAULT '[]',
    schedule_days TEXT,
    contact_phone TEXT,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. SHOPPING & HANDICRAFTS
CREATE TABLE IF NOT EXISTS shopping_places (
    id TEXT PRIMARY KEY,
    district_id TEXT REFERENCES districts(id) ON DELETE SET NULL,
    district_name TEXT,
    name TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    famous_for TEXT NOT NULL,
    opening_hours TEXT,
    image_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. LOCAL RIDES & RENTALS
CREATE TABLE IF NOT EXISTS rides (
    id TEXT PRIMARY KEY,
    district_id TEXT REFERENCES districts(id) ON DELETE SET NULL,
    district_name TEXT,
    vehicle_type TEXT NOT NULL,
    model TEXT NOT NULL,
    rental_type TEXT NOT NULL,
    price_per_hour REAL,
    price_per_day REAL NOT NULL,
    location TEXT NOT NULL,
    owner_name TEXT,
    contact_phone TEXT NOT NULL,
    availability_status TEXT DEFAULT 'Available',
    image_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 9. TRIPS / ITINERARIES
CREATE TABLE IF NOT EXISTS trips (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    title TEXT NOT NULL,
    destination TEXT,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    duration_days INTEGER DEFAULT 1,
    budget TEXT DEFAULT '{}',
    total_budget REAL DEFAULT 0,
    places TEXT DEFAULT '[]',
    hotels TEXT DEFAULT '[]',
    notes TEXT,
    is_public BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 10. REVIEWS & RATINGS
CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    target_id TEXT NOT NULL,
    target_type TEXT NOT NULL,
    user_id TEXT,
    user_name TEXT NOT NULL,
    user_avatar TEXT,
    rating REAL NOT NULL,
    comment TEXT NOT NULL,
    images TEXT DEFAULT '[]',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 11. FAVORITES & BOOKMARKS
CREATE TABLE IF NOT EXISTS favorites (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    item_id TEXT NOT NULL,
    item_type TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, item_id, item_type)
);
