# 🇧🇩 YEANA — Bangladesh Tour & Travel Platform

**YEANA** is a production-grade Tour, Travel & Lifestyle ecosystem focused on **Bangladesh**. It brings together all **8 administrative divisions**, **64 districts (zilas)**, and **495+ upazilas**, offering verified resort bookings, authentic district food guides, multi-operator transport schedules, and curated tourist landmarks.

The platform is architected with a **normalized relational PostgreSQL database** powered by **Supabase**, a dedicated **React Native mobile frontend** (`/mobile`), and an existing **React + TypeScript + Capacitor** web and Android app.

---

## 🏗️ System Architecture

```
                  ┌────────────────────────────────────────────────────────┐
                  │                      YEANA CLIENTS                     │
                  ├────────────────────────────┬───────────────────────────┤
                  │     React Native (Expo)    │   React + Vite + Capacitor│
                  │       (iOS & Android)      │     (Web & Google Play)   │
                  └─────────────┬──────────────┴─────────────┬─────────────┘
                                │                            │
                                │ (Anon Publishable Key)     │
                                ▼                            ▼
                  ┌────────────────────────────────────────────────────────┐
                  │                   SUPABASE PLATFORM                    │
                  ├────────────────────────────────────────────────────────┤
                  │  🔒 Supabase Auth (Email/Pass, OAuth, JWT Sessions)    │
                  │  🛡️ Row Level Security (RLS) + Database Role Functions │
                  │  📦 Supabase Storage (7 Media Buckets)                 │
                  │  🐘 Normalized PostgreSQL Relational Database          │
                  └────────────────────────────────────────────────────────┘
```

---

## 🗄️ Normalized Relational Database Structure

YEANA enforces database normalization across dedicated domain tables with foreign keys, constraints, and performance indexes:

### 1. Authentication & Users
- **`auth.users`**: Supabase managed authentication.
- **`public.profiles`**: Extended user profiles (`id` UUID FK to `auth.users`, `full_name`, `email`, `role`, `avatar_url`, `phone`).
- **`public.user_preferences`**: User preferences (`preferred_language` `en`/`bn`, `theme`, `currency`, notifications).
  - *Trigger*: `handle_new_user()` automatically creates a profile and default preferences row on signup.

### 2. Administrative Geography (Bangladesh)
```
divisions (8 Administrative Divisions)
   ↓ (1 : N)
districts (64 Districts with coordinates, descriptions, seasons)
   ↓ (1 : N)
upazilas (495+ Upazilas with transit hubs, railway & launch flags)
```

### 3. Tourism & Attractions
```
destinations (attractions linked to districts & upazilas)
   ↓ (1 : N)
destination_images (normalized high-res image table with primary photo & display orders)
```

### 4. Hotels & Accommodations
```
hotels (resorts, boutique cottages, 5-star hotels)
   ↓ (1 : N)
hotel_images (bedroom, suite, dining, view photo galleries)
```

### 5. Food & Dining
```
restaurants (authentic regional dining, Kacchi, Satkora beef, Bogura doi)
   ↓ (1 : N)
restaurant_images (dish highlights and restaurant interiors)
```

### 6. Transport Network
```
transport_types (Bus, Train, Flight, Launch, Car)
   ↓ (1 : N)
transport_routes (schedules, companies, departure/arrival times, fare ranges)
```

### 7. Shopping & Crafts
- **`shopping_places`**: Traditional handicraft markets, Jamdani palli, Nakshi Kantha, Shataranji, GI-tagged crafts.

### 8. Vehicle Rentals
```
rental_services (fleet providers, agencies, boat owners)
   ↓ (1 : N)
rental_vehicles (Chander Gari, 4x4 Mountain Jeeps, Microbuses, Bikes)
```

### 9. User Features & Engagement
- **`favorites`**: Saved destinations, hotels, foods with unique constraint `(user_id, item_type, item_id)`.
- **`reviews`**: Ratings and user comments with approval flags and target references.
- **`notifications`**: User alerts for booking confirmations, cancellations, and announcements.

### 10. Bookings & Reservations
```
bookings (booking number, user_id, total amount, status, payment status)
   ↓ (1 : N)
booking_items (hotel room, bus seat, vehicle rental, activity voucher details)
```

---

## 📁 Repository Structure

```
YEANA/
├── mobile/                        # 📱 React Native (Expo) Mobile Application
│   ├── src/
│   │   ├── context/AuthContext.tsx# Supabase Auth with AsyncStorage session persistence
│   │   ├── lib/supabase.ts        # Configured Supabase client
│   │   ├── navigation/            # Bottom tabs & stack navigators
│   │   ├── screens/               # Home, Explore, Hotels, Food, Transport, Bookings, etc.
│   │   ├── services/api.ts        # Typed API service
│   │   └── types/database.ts      # TypeScript interfaces
│   ├── app.json
│   ├── package.json
│   └── README.md
│
├── supabase/                      # 🐘 Supabase Database Migrations & Schemas
│   ├── migrations/
│   │   ├── 20261007000001_core_schema.sql             # Tables, foreign keys, triggers, indexes
│   │   ├── 20261007000002_row_level_security.sql      # RLS policies & is_admin() function
│   │   ├── 20261007000003_storage_buckets.sql         # 7 Storage buckets and media policies
│   │   ├── 20261007000004_seed_location_hierarchy.sql # 8 Divisions, 64 Districts, 495+ Upazilas
│   │   └── 20261007000005_seed_travel_data.sql        # Verified travel seed dataset
│   └── schema.sql                                     # Master unified SQL schema
│
├── src/                           # 🌐 React + Vite + Capacitor Web & Android App
│   ├── services/supabaseService.ts# High-performance Supabase query & CRUD service
│   ├── types/database.ts          # Database TypeScript interfaces
│   ├── lib/supabase.ts            # Supabase client
│   └── views/                     # Existing views (Admin, Explore, Hotels, Food, etc.)
│
├── .env.example                   # Environment variables template
└── README.md
```

---

## 🚀 Getting Started

### 1. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Add your Supabase project credentials (found in **Supabase Dashboard → Project Settings → API**):
```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-publishable-key

# Vite Frontend (Web / Capacitor Android)
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-publishable-key

# React Native (Expo)
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-publishable-key
```

> ⚠️ **CRITICAL SECURITY RULE:** Never expose or commit `SUPABASE_SERVICE_ROLE_KEY` to client-side code. All client operations use the publishable `anon` key, governed strictly by PostgreSQL Row Level Security (RLS).

---

### 2. Apply Database Migrations to Supabase

You can apply the migrations using either the **Supabase CLI** or the **Supabase Web SQL Editor**:

#### Option A: Supabase CLI (Recommended)
```bash
# Link project
npx supabase link --project-ref your-project-ref

# Apply all migrations
npx supabase db push
```

#### Option B: Supabase Web SQL Editor
Navigate to **Supabase Dashboard → SQL Editor**, and run the files in `supabase/migrations/` in numerical order:
1. `20261007000001_core_schema.sql`
2. `20261007000002_row_level_security.sql`
3. `20261007000003_storage_buckets.sql`
4. `20261007000004_seed_location_hierarchy.sql`
5. `20261007000005_seed_travel_data.sql`

*(Or execute the consolidated master file `supabase/schema.sql`)*

---

### 3. Run the Mobile App (React Native)

```bash
cd mobile
npm install
npm start
```
- Press `a` for Android Emulator or scan the QR code with **Expo Go** on your Android or iPhone device.

---

### 4. Run the Web & Capacitor App

```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛡️ Security & Row Level Security (RLS)

All 22 database tables and 7 storage buckets have Row Level Security enabled:

| Scope | Read Access | Write Access | Delete Access |
|---|---|---|---|
| **Public** | Active destinations, hotels, restaurants, transports, shopping, rental services, approved reviews, divisions, districts, upazilas | None | None |
| **User (Authenticated)** | Own profile, preferences, favorites, bookings, notifications | Own favorites, own reviews, own bookings, own notifications | Own favorites, own reviews |
| **Admin (`role = 'admin'`)** | All data (including inactive and unapproved) | All tables | All tables |

### Secure Database Admin Role Verification
Admin status is never determined from frontend claims. A PostgreSQL `SECURITY DEFINER` function verifies the user's role directly in the database:
```sql
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
```

---

## 📦 Supabase Storage Buckets

The platform provisions 7 public storage buckets with image size and MIME-type restrictions:

1. `destination-images` (Max 5MB: JPG, PNG, WEBP, AVIF)
2. `hotel-images` (Max 5MB: JPG, PNG, WEBP, AVIF)
3. `restaurant-images` (Max 5MB: JPG, PNG, WEBP, AVIF)
4. `shopping-images` (Max 5MB: JPG, PNG, WEBP, AVIF)
5. `rental-images` (Max 5MB: JPG, PNG, WEBP, AVIF)
6. `profile-images` (Max 2MB: JPG, PNG, WEBP — authenticated users can upload only to `profile-images/<user_id>/*`)
7. `app-assets` (Max 10MB: SVG, PNG, WEBP)

---

## 🔄 Database Backup & Recovery

1. **Automated Backups**: Enabled by default on Supabase Pro/Team tiers (Daily Point-in-time recovery).
2. **Manual Dump via CLI**:
   ```bash
   npx supabase db dump -f supabase/backup_$(date +%Y%m%d).sql
   ```
3. **Restoring a Backup**:
   ```bash
   npx supabase db reset
   psql -h <db-host> -U postgres -d postgres -f supabase/backup_YYYYMMDD.sql
   ```

---

## ✅ Production Readiness & Security Checklist

- [x] Normalized 3NF PostgreSQL schema without giant tables.
- [x] RLS enabled on all 22 tables.
- [x] Admin permission verified server-side via `is_admin()` function.
- [x] Automated user profile creation via `on_auth_user_created` trigger.
- [x] Automatic `updated_at` timestamps on all tables.
- [x] Performance B-tree indexes on foreign keys, categories, prices, ratings, and statuses.
- [x] Dedicated React Native app in `/mobile` with navigation and session persistence.
- [x] Image binary data stored in Supabase Storage with bucket-level RLS.
- [x] Zero exposure of `service_role` key in frontend code.
- [x] Full reproducible SQL migration files in `supabase/migrations/`.
