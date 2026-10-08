-- ========================================================================
-- YEANA — Bangladesh Tour & Travel Platform
-- Migration: 20261007000003_storage_buckets.sql
-- Description: Provision Supabase Storage Buckets and Storage RLS Policies
--              for Travel Media, User Avatars, and App Assets.
-- ========================================================================

-- Insert Storage Buckets into storage.buckets if they do not already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('destination-images', 'destination-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
    ('hotel-images', 'hotel-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
    ('restaurant-images', 'restaurant-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
    ('shopping-images', 'shopping-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
    ('rental-images', 'rental-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
    ('profile-images', 'profile-images', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp']),
    ('app-assets', 'app-assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ========================================================================
-- STORAGE RLS POLICIES (storage.objects)
-- ========================================================================

-- 1. Public Read Access on all YEANA image buckets
CREATE POLICY "Public Read Access for YEANA Images"
    ON storage.objects FOR SELECT
    USING (bucket_id IN (
        'destination-images', 
        'hotel-images', 
        'restaurant-images', 
        'shopping-images', 
        'rental-images', 
        'profile-images', 
        'app-assets'
    ));

-- 2. Authenticated Users can upload their own profile pictures
CREATE POLICY "Users can upload own profile picture"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'profile-images' 
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can update own profile picture"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'profile-images' 
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can delete own profile picture"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'profile-images' 
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- 3. Admins have full management over all media buckets
CREATE POLICY "Admins can upload to any YEANA bucket"
    ON storage.objects FOR INSERT
    WITH CHECK (
        public.is_admin() 
        OR (
            public.is_admin_or_partner() 
            AND bucket_id IN ('hotel-images', 'restaurant-images', 'rental-images')
        )
    );

CREATE POLICY "Admins can update in any YEANA bucket"
    ON storage.objects FOR UPDATE
    USING (
        public.is_admin() 
        OR (
            public.is_admin_or_partner() 
            AND bucket_id IN ('hotel-images', 'restaurant-images', 'rental-images')
        )
    );

CREATE POLICY "Admins can delete in any YEANA bucket"
    ON storage.objects FOR DELETE
    USING (public.is_admin());
