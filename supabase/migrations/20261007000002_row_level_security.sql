-- ========================================================================
-- YEANA — Bangladesh Tour & Travel Platform
-- Migration: 20261007000002_row_level_security.sql
-- Description: Supabase Row Level Security (RLS) policies for Public,
--              Authenticated Users, and Secure Database-controlled Admins.
-- ========================================================================

-- Enable Row Level Security on all application tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upazilas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destination_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_places ENABLE ROW LEVEL SECURITY;

-- ========================================================================
-- HELPER FUNCTIONS FOR SECURITY (SECURITY DEFINER to prevent recursion)
-- ========================================================================

-- Check if currently authenticated user has admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Check if currently authenticated user has admin or partner role
CREATE OR REPLACE FUNCTION public.is_admin_or_partner()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'partner')
  );
$$;

-- ========================================================================
-- 1. PROFILES & USER PREFERENCES POLICIES
-- ========================================================================

-- Profiles: Public can view profiles (for author names, review authors)
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id OR public.is_admin())
    WITH CHECK (auth.uid() = id OR public.is_admin());

CREATE POLICY "Admins can delete profiles"
    ON public.profiles FOR DELETE
    USING (public.is_admin());

-- User Preferences
CREATE POLICY "Users can view own preferences"
    ON public.user_preferences FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert own preferences"
    ON public.user_preferences FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
    ON public.user_preferences FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ========================================================================
-- 2. GEOGRAPHIC HIERARCHY POLICIES (Divisions, Districts, Upazilas)
-- ========================================================================

CREATE POLICY "Public read access on divisions"
    ON public.divisions FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage divisions"
    ON public.divisions FOR ALL
    USING (public.is_admin());

CREATE POLICY "Public read access on districts"
    ON public.districts FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage districts"
    ON public.districts FOR ALL
    USING (public.is_admin());

CREATE POLICY "Public read access on upazilas"
    ON public.upazilas FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage upazilas"
    ON public.upazilas FOR ALL
    USING (public.is_admin());

-- ========================================================================
-- 3. TOURISM & DESTINATIONS POLICIES
-- ========================================================================

CREATE POLICY "Public can view active destinations"
    ON public.destinations FOR SELECT
    USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins can manage destinations"
    ON public.destinations FOR ALL
    USING (public.is_admin());

CREATE POLICY "Public can view destination images"
    ON public.destination_images FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage destination images"
    ON public.destination_images FOR ALL
    USING (public.is_admin());

-- ========================================================================
-- 4. HOTELS & ACCOMMODATIONS POLICIES
-- ========================================================================

CREATE POLICY "Public can view active hotels"
    ON public.hotels FOR SELECT
    USING (is_active = true OR public.is_admin_or_partner());

CREATE POLICY "Admins and partners can manage hotels"
    ON public.hotels FOR ALL
    USING (public.is_admin_or_partner());

CREATE POLICY "Public can view hotel images"
    ON public.hotel_images FOR SELECT
    USING (true);

CREATE POLICY "Admins and partners can manage hotel images"
    ON public.hotel_images FOR ALL
    USING (public.is_admin_or_partner());

-- ========================================================================
-- 5. FOOD & RESTAURANTS POLICIES
-- ========================================================================

CREATE POLICY "Public can view active restaurants"
    ON public.restaurants FOR SELECT
    USING (is_active = true OR public.is_admin_or_partner());

CREATE POLICY "Admins and partners can manage restaurants"
    ON public.restaurants FOR ALL
    USING (public.is_admin_or_partner());

CREATE POLICY "Public can view restaurant images"
    ON public.restaurant_images FOR SELECT
    USING (true);

CREATE POLICY "Admins and partners can manage restaurant images"
    ON public.restaurant_images FOR ALL
    USING (public.is_admin_or_partner());

-- ========================================================================
-- 6. TRANSPORT POLICIES
-- ========================================================================

CREATE POLICY "Public can view active transport types"
    ON public.transport_types FOR SELECT
    USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins can manage transport types"
    ON public.transport_types FOR ALL
    USING (public.is_admin());

CREATE POLICY "Public can view active transport routes"
    ON public.transport_routes FOR SELECT
    USING (is_active = true OR public.is_admin_or_partner());

CREATE POLICY "Admins and partners can manage transport routes"
    ON public.transport_routes FOR ALL
    USING (public.is_admin_or_partner());

-- ========================================================================
-- 7. SHOPPING POLICIES
-- ========================================================================

CREATE POLICY "Public can view active shopping places"
    ON public.shopping_places FOR SELECT
    USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins can manage shopping places"
    ON public.shopping_places FOR ALL
    USING (public.is_admin());

-- ========================================================================
-- 8. RENTAL SERVICES POLICIES
-- ========================================================================

CREATE POLICY "Public can view active rental services"
    ON public.rental_services FOR SELECT
    USING (is_active = true OR public.is_admin_or_partner());

CREATE POLICY "Admins and partners can manage rental services"
    ON public.rental_services FOR ALL
    USING (public.is_admin_or_partner());

CREATE POLICY "Public can view active rental vehicles"
    ON public.rental_vehicles FOR SELECT
    USING (is_active = true OR public.is_admin_or_partner());

CREATE POLICY "Admins and partners can manage rental vehicles"
    ON public.rental_vehicles FOR ALL
    USING (public.is_admin_or_partner());

-- ========================================================================
-- 9. FAVORITES POLICIES
-- ========================================================================

CREATE POLICY "Users can manage own favorites"
    ON public.favorites FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ========================================================================
-- 10. REVIEWS POLICIES
-- ========================================================================

CREATE POLICY "Public can view approved reviews"
    ON public.reviews FOR SELECT
    USING (is_approved = true OR auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can create own reviews"
    ON public.reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
    ON public.reviews FOR UPDATE
    USING (auth.uid() = user_id OR public.is_admin())
    WITH CHECK (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can delete own reviews or admins can delete"
    ON public.reviews FOR DELETE
    USING (auth.uid() = user_id OR public.is_admin());

-- ========================================================================
-- 11. NOTIFICATIONS POLICIES
-- ========================================================================

CREATE POLICY "Users can view own notifications"
    ON public.notifications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
    ON public.notifications FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins or system can insert notifications"
    ON public.notifications FOR INSERT
    WITH CHECK (public.is_admin() OR auth.uid() = user_id);

-- ========================================================================
-- 12. BOOKINGS & BOOKING ITEMS POLICIES
-- ========================================================================

CREATE POLICY "Users can view own bookings"
    ON public.bookings FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin_or_partner());

CREATE POLICY "Users can create own bookings"
    ON public.bookings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings or admins can manage"
    ON public.bookings FOR UPDATE
    USING (auth.uid() = user_id OR public.is_admin_or_partner())
    WITH CHECK (auth.uid() = user_id OR public.is_admin_or_partner());

CREATE POLICY "Admins can delete bookings"
    ON public.bookings FOR DELETE
    USING (public.is_admin());

-- Booking Items
CREATE POLICY "Users can view own booking items"
    ON public.booking_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.bookings
            WHERE bookings.id = booking_items.booking_id
              AND (bookings.user_id = auth.uid() OR public.is_admin_or_partner())
        )
    );

CREATE POLICY "Users can create booking items for own bookings"
    ON public.booking_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.bookings
            WHERE bookings.id = booking_items.booking_id
              AND bookings.user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage booking items"
    ON public.booking_items FOR ALL
    USING (public.is_admin());

-- ========================================================================
-- 13. TRIPS & TRIP PLACES (Trip Planner)
-- ========================================================================

CREATE POLICY "Users can view own or public trips"
    ON public.trips FOR SELECT
    USING (auth.uid() = user_id OR is_public = true OR public.is_admin());

CREATE POLICY "Users can manage own trips"
    ON public.trips FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own trip places"
    ON public.trip_places FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.trips
            WHERE trips.id = trip_places.trip_id
              AND (trips.user_id = auth.uid() OR public.is_admin())
        )
    );
