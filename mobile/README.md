# 📱 YEANA Mobile — React Native Frontend

Production-quality mobile application for **YEANA** (Bangladesh Tour, Travel & Lifestyle ecosystem) built with **React Native**, **Expo**, and **Supabase**.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- Expo CLI or Expo Go app on your Android / iOS smartphone

### 2. Installation
```bash
cd mobile
npm install
```

### 3. Environment Setup
Configure your Supabase URL and Anon key in `.env` (or `mobile/.env`):
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-publishable-key
```

### 4. Running the App
```bash
# Start Expo development server (scan QR code in Expo Go app)
npm start

# Run on Android emulator / connected device
npm run android

# Run on iOS simulator
npm run ios
```

---

## 🌟 Key Architecture & Features

- **Supabase Integration**: Normalized PostgreSQL database with Supabase Auth & Row Level Security (RLS).
- **Session Persistence**: React Native AsyncStorage adapter for seamless session recovery.
- **64 Districts & 495+ Upazilas**: Complete administrative and tourist data hierarchy of Bangladesh.
- **Verified Accommodations**: Resort listings with room types and electronic booking generation.
- **All-in-One Transports**: Intercity coaches (Green Line, Hanif, Shohagh), Bangladesh Railway, domestic flights, and river launches.
- **Database-Controlled Admin Console**: Strict role-based protection ensuring only verified `role = 'admin'` users can publish and moderate.
