# 🚀 YEANA — Google Play Store Launch Guide & Store Listing

This document contains everything you need to submit and publish **YEANA** to the **Google Play Store**.

---

## 📱 1. Google Play Store Listing Metadata

### **App Title** *(Max 30 characters)*
> `YEANA: Bangladesh Travel Guide`

### **Short Description** *(Max 80 characters)*
> `Explore Bangladesh: 64 districts, verified hotel bookings, transports & food.`

### **Full Description**
```markdown
Welcome to YEANA — the ultimate all-in-one travel, hotel booking, and lifestyle ecosystem for Bangladesh!

Whether you are planning a trip to the serene hills of Sajek Valley, the longest sea beach in Cox's Bazar, the lush tea gardens of Sreemangal, or the mangrove forests of Sundarbans, YEANA is your trusted travel partner.

🌟 KEY FEATURES:

🏛️ 64 DISTRICTS & 495+ UPAZILAS EXPLORER
• Comprehensive travel guides for all 64 districts of Bangladesh.
• Historical landmarks, waterfalls, eco-parks, beaches, and cultural heritage spots.
• Interactive maps, entry fees, visiting hours, and local tips.

🏨 VERIFIED HOTELS & REAL RESORT PHOTOS
• Discover 5-star luxury hotels, boutique eco-resorts, budget stays, and traditional guest cottages.
• 100% Real, High-Resolution Photo Galleries (Bedrooms, Suites, Swimming Pools, Buffets & Views).
• Instant room reservation & verified electronic booking vouchers.

🚌 ALL-IN-ONE TRANSPORT & ROUTE SCHEDULES
• Real-time schedules for Intercity Express Trains (Bangladesh Railway).
• AC & Non-AC Bus operators (Green Line, Hanif, Shohagh, Shyamoli, Desh Travels).
• Domestic Flights (Biman, US-Bangla, Air Astra, Novoair).
• Inland Launch & River Cruise schedules (Dhaka - Barishal - Bhola - Kuakata).
• Local CNG auto-rickshaws, Chander Gadi, and boat rental rates.

🍽️ AUTHENTIC BANGLADESH FOOD & RESTAURANTS
• Famous district-wise traditional delicacies (Kachchi Biryani, Sylhet Satkora Beef, Bogura Doi, Cox's Bazar Seafood, Mejbani Mangsho).
• In-house restaurant menus, buffet prices, and certified food hygiene badges.

🗺️ SMART MULTI-DAY TRIP & BUDGET PLANNER
• Create custom multi-day travel itineraries.
• Automatic budget estimation for accommodation, travel, food, and activities.
• Offline-Ready: Access your saved itineraries without active internet!

🔒 PRIVACY & SECURITY FIRST
• Safe and encrypted data handling.
• 24/7 Tourist Police and Emergency Helplines (999, 131, 1320-222222).

Languages Supported: English & বাংলা (Bengali).

Download YEANA today and start exploring the beauty of Bangladesh!
```

---

## 🎨 2. Google Play Store Graphic Assets Checklist

| Asset | Dimensions | Format | Notes |
| :--- | :--- | :--- | :--- |
| **App Icon** | 512 × 512 px | PNG (32-bit) | Clean logo with high contrast |
| **Feature Graphic** | 1024 × 500 px | PNG or JPEG | Eye-catching banner showcasing Bangladesh travel |
| **Phone Screenshots** | Min 2, Max 8 | PNG/JPEG (1080×1920 or 1080×2400) | Include: Home View, Hotel Real Photos, District Map, Trip Planner |
| **Tablet Screenshots** *(Optional)* | 7-inch & 10-inch | PNG/JPEG | Optional for broader distribution |

---

## 🛠️ 3. How to Build & Generate Your Release `.aab` Bundle

### Step 1: Rebuild Web & Sync Android
Run in terminal:
```bash
npm run android:sync
```

### Step 2: Open in Android Studio
```bash
npm run android:open
```

### Step 3: Generate Signed Bundle in Android Studio
1. In Android Studio top menu, click **Build** > **Generate Signed Bundle / APK...**
2. Select **Android App Bundle** (`.aab`) and click **Next**.
3. Create your keystore (or choose existing key) and enter passwords.
4. Select **release** build variant and click **Finish**.
5. Your signed `.aab` file will be generated in `android/app/release/app-release.aab`.

---

## 🌐 4. Privacy Policy URL for Google Play Console

Google Play Developer Console requires a valid Privacy Policy link. You can use the built-in policy rendered inside the app or host this on your domain/GitHub Pages:

> **Privacy Policy Link**: `https://yeanatravel.com/privacy` (or your GitHub Pages URL)

*The complete text is already pre-configured in your app in `src/components/common/PrivacyPolicyModal.tsx`!*
