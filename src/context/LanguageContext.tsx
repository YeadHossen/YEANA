import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, { en: string; bn: string }> = {
  // Navigation
  'nav.home': { en: 'Home', bn: 'হোম' },
  'nav.explore': { en: 'Explore', bn: 'এক্সপ্লোর' },
  'nav.places': { en: 'Places', bn: 'দর্শনীয় স্থান' },
  'nav.hotels': { en: 'Hotels', bn: 'হোটেল ও রিসোর্ট' },
  'nav.food': { en: 'Food', bn: 'খাবার ও রেস্তোরাঁ' },
  'nav.transport': { en: 'Transport', bn: 'যাতায়াত' },
  'nav.shopping': { en: 'Shopping', bn: 'কেনাকাটা' },
  'nav.ride': { en: 'Ride', bn: 'গাড়ি/বাইক ভাড়া' },
  'nav.trips': { en: 'Trip Planner', bn: 'ভ্রমণ পরিকল্পনা' },
  'nav.notes': { en: 'KEEP NOTES', bn: 'নোট ও খরচ' },
  'nav.emergency': { en: 'Emergency Service', bn: 'জরুরি সেবা' },
  'nav.favorites': { en: 'Favorites', bn: 'প্রিয় তালিকা' },
  'nav.profile': { en: 'Profile', bn: 'প্রোফাইল' },
  'nav.admin': { en: 'Admin Portal', bn: 'অ্যাডমিন প্যানেল' },
  'nav.search_placeholder': { en: 'Search places, hotels, food...', bn: 'স্থান, হোটেল, খাবার খুঁজুন...' },
  'nav.login': { en: 'Sign In', bn: 'সাইন ইন' },
  'nav.logout': { en: 'Sign Out', bn: 'লগআউট' },

  // Hero Section
  'hero.tagline': { en: 'Explore More. Enjoy Life.', bn: 'জীবন উপভোগ করুন, ঘুরে দেখুন বাংলাদেশ।' },
  'hero.title': { en: 'Your Ultimate Travel & Lifestyle Companion for Bangladesh', bn: 'বাংলাদেশের সর্বশ্রেষ্ঠ অল-ইন-ওয়ান ট্রাভেল ও লাইফস্টাইল প্ল্যাটফর্ম' },
  'hero.subtitle': { en: 'Discover breathtaking places, top hotels, authentic cuisine, realistic transport schedules, and create unforgettable trip itineraries.', bn: 'দর্শনীয় স্থান, সেরা হোটেল, ঐতিহ্যবাহী খাবার, সঠিক যাতায়াত তথ্য এবং সুন্দর ভ্রমণ পরিকল্পনা এক জায়গায়।' },
  'hero.search_label': { en: 'Where do you want to go?', bn: 'আপনি কোথায় যেতে চান?' },
  'hero.search_btn': { en: 'Search Destinations', bn: 'অনুসন্ধান করুন' },
  'hero.popular': { en: 'Popular:', bn: 'জনপ্রিয়:' },

  // Categories
  'cat.all': { en: 'All Categories', bn: 'সকল ক্যাটাগরি' },
  'cat.nature': { en: 'Nature & Rivers', bn: 'প্রকৃতি ও নদী' },
  'cat.hills': { en: 'Hills & Valleys', bn: 'পাহাড় ও মেঘ' },
  'cat.beaches': { en: 'Sea Beaches', bn: 'সমুদ্র সৈকত' },
  'cat.heritage': { en: 'Historic Heritage', bn: 'ঐতিহাসিক নিদর্শন' },
  'cat.tea': { en: 'Tea Gardens', bn: 'চা বাগান' },
  'cat.forest': { en: 'Mangroves & Forests', bn: 'সুন্দরবন ও অরণ্য' },

  // Divisions
  'div.all': { en: 'All Bangladesh', bn: 'সমগ্র বাংলাদেশ' },
  'div.sylhet': { en: 'Sylhet', bn: 'সিলেট' },
  'div.chattogram': { en: 'Chattogram', bn: 'চট্টগ্রাম' },
  'div.dhaka': { en: 'Dhaka', bn: 'ঢাকা' },
  'div.khulna': { en: 'Khulna', bn: 'খুলনা' },
  'div.barishal': { en: 'Barishal', bn: 'বরিশাল' },
  'div.rajshahi': { en: 'Rajshahi', bn: 'রাজশাহী' },
  'div.rangpur': { en: 'Rangpur', bn: 'রংপুর' },
  'div.mymensingh': { en: 'Mymensingh', bn: 'ময়মনসিংহ' },

  // Common Card & Action Labels
  'common.rating': { en: 'Rating', bn: 'রেটিং' },
  'common.reviews': { en: 'reviews', bn: 'মতামত' },
  'common.view_details': { en: 'View Details', bn: 'বিস্তারিত দেখুন' },
  'common.save': { en: 'Save', bn: 'সংরক্ষণ' },
  'common.saved': { en: 'Saved', bn: 'সংরক্ষিত' },
  'common.directions': { en: 'Directions', bn: 'দিকনির্দেশনা' },
  'common.add_to_trip': { en: 'Add to Trip', bn: 'ট্রিপে যোগ করুন' },
  'common.contact_owner': { en: 'Contact Provider', bn: 'যোগাযোগ করুন' },
  'common.call': { en: 'Call', bn: 'কল করুন' },
  'common.per_night': { en: '/ night', bn: '/ রাত' },
  'common.per_day': { en: '/ day', bn: '/ দিন' },
  'common.per_hour': { en: '/ hour', bn: '/ ঘণ্টা' },
  'common.entry_fee': { en: 'Entry Fee', bn: 'প্রবেশ মূল্য' },
  'common.opening_time': { en: 'Timing', bn: 'সময়সূচী' },
  'common.best_time': { en: 'Best Season', bn: 'সেরা সময়' },
  'common.how_to_reach': { en: 'How to Reach', bn: 'যেভাবে যাবেন' },
  'common.nearby_hotels': { en: 'Nearby Hotels', bn: 'কাছের হোটেলসমূহ' },
  'common.nearby_food': { en: 'Nearby Restaurants', bn: 'কাছের রেস্তোরাঁসমূহ' },
  'common.facilities': { en: 'Facilities & Amenities', bn: 'সুযোগ-সুবিধা' },
  'common.offline_saved': { en: 'Available Offline', bn: 'অফলাইনে প্রস্তুত' },

  // Trip Planner & Budget
  'trip.create_new': { en: 'Create New Trip Itinerary', bn: 'নতুন ভ্রমণ পরিকল্পনা তৈরি করুন' },
  'trip.title_label': { en: 'Trip Title', bn: 'ভ্রমণের নাম' },
  'trip.destination_label': { en: 'Destination District', bn: 'গন্তব্য জেলা' },
  'trip.duration_label': { en: 'Duration (Days)', bn: 'সময়কাল (দিন)' },
  'trip.budget_breakdown': { en: 'Estimated Trip Budget Breakdown', bn: 'আনুমানিক ভ্রমণ খরচের হিসাব' },
  'trip.total_budget': { en: 'Total Estimated Budget', bn: 'সর্বমোট আনুমানিক খরচ' },
  'trip.day': { en: 'Day', bn: 'দিন' },
  'trip.add_custom_stop': { en: 'Add Itinerary Stop', bn: 'নতুন স্থান যোগ করুন' },
  'trip.save_offline': { en: 'Download for Offline Travel', bn: 'অফলাইন ব্যবহারের জন্য সংরক্ষণ' },

  // Transport
  'transport.from': { en: 'From', bn: 'কোথা থেকে' },
  'transport.to': { en: 'To', bn: 'কোথায়' },
  'transport.search_routes': { en: 'Search Transport Options', bn: 'যানবাহন খুঁজুন' },
  'transport.estimated_fare': { en: 'Estimated Fare', bn: 'আনুমানিক ভাড়া' },
  'transport.duration': { en: 'Duration', bn: 'সময় লাগবে' },
  'transport.notice': { en: 'Fares and schedules are updated regularly based on operator tables.', bn: 'ভাড়া ও সময়সূচী নিয়মিত আপডেট করা হয়।' },

  // Admin
  'admin.dashboard': { en: 'Platform Management Dashboard', bn: 'প্ল্যাটফর্ম অ্যাডমিন ড্যাশবোর্ড' },
  'admin.add_place': { en: 'Add New Place', bn: 'নতুন স্থান যুক্ত করুন' },
  'admin.add_hotel': { en: 'Add Hotel', bn: 'হোটেল যুক্ত করুন' },
  'admin.add_restaurant': { en: 'Add Restaurant', bn: 'রেস্তোরাঁ যুক্ত করুন' },
  'admin.add_transport': { en: 'Add Transport Route', bn: 'যাতায়াত রুট যুক্ত করুন' },
  'admin.total_users': { en: 'Registered Travelers', bn: 'নিবন্ধিত পর্যটক' },
  'admin.total_places': { en: 'Tourist Places', bn: 'দর্শনীয় স্থান' },
  'admin.total_hotels': { en: 'Hotels & Resorts', bn: 'হোটেল ও রিসোর্ট' },
  'admin.total_food': { en: 'Food Spots', bn: 'খাবারের দোকান' },
  'admin.total_trips': { en: 'Trips Planned', bn: 'পরিকল্পিত ট্রিপ' },

  // Shopping & Place Exclusives
  'shop.tagline': { en: 'Only Found Here & Local Crafts', bn: 'স্থানভিত্তিক বিশেষ পণ্য ও হস্তশিল্প' },
  'shop.title': { en: 'Authentic Regional Delicacies, Handlooms & Crafts', bn: 'স্থানভিত্তিক অনন্য পোশাক, ঐতিহ্যবাহী খাবার ও কারুশিল্প' },
  'shop.subtitle': { en: 'Discover unique specialties, iconic traditional dresses, famous regional sweets, and GI-certified heritage treasures found only in their native districts.', bn: 'বাংলাদেশের প্রতিটি জেলার স্বকীয় ঐতিহ্যবাহী পোশাক, বিখ্যাত মিষ্টান্ন, অনন্য খাবার ও জিআই সনদপ্রাপ্ত দুর্লভ পণ্যের আসল সংগ্রহ।' },
  'shop.tab_exclusives': { en: 'Place-Exclusive Specialties', bn: 'স্থানভিত্তিক অনন্য পণ্য ও খাবার' },
  'shop.tab_bazaars': { en: 'Traditional Bazaars & Markets', bn: 'ঐতিহ্যবাহী মার্কেট ও হাটবাজার' },
  'shop.all_categories': { en: 'All Specialties', bn: 'সকল অনন্য পণ্য' },
  'shop.dress_handloom': { en: 'Traditional Dresses & Handloom', bn: 'পোশাক ও তাঁতশিল্প' },
  'shop.food_sweet': { en: 'Iconic Regional Foods & Sweets', bn: 'ঐতিহ্যবাহী খাবার ও মিষ্টি' },
  'shop.folk_craft': { en: 'Folk Crafts & Souvenirs', bn: 'হস্তশিল্প ও স্যুভনির' },
  'shop.natural_produce': { en: 'Natural Honey, Tea & Produce', bn: 'প্রাকৃতিক মধু, চা ও ফলমূল' },
  'shop.gi_tagged': { en: 'GI Certified Heritage', bn: 'জিআই স্বীকৃতিপ্রাপ্ত' },
  'shop.search_placeholder': { en: 'Search specialties (e.g. Jamdani, Chomchom, Silk, Doi, Honey)...', bn: 'পণ্য খুঁজুন (যেমন: জামদানি, চমচম, সিল্ক, দই, মধু, খাঁদি)...' },
  'shop.why_exclusive': { en: 'Why It Is Uniquely Found Here:', bn: 'কেন এই স্থানের অনন্য ঐতিহ্য:' },
  'shop.price_estimate': { en: 'Estimated Price Range:', bn: 'আনুমানিক মূল্য সীমা:' },
  'shop.authentic_spot': { en: 'Where to Buy Authentic Original:', bn: 'আসল পণ্য পাওয়ার নির্ভরযোগ্য স্থান:' },
  'shop.authenticity_guide': { en: 'Authenticity & Buyer Tip:', bn: 'আসল চেনার উপায় ও পরামর্শ:' },
  'shop.view_guide': { en: 'Authenticity Details', bn: 'বিস্তারিত গাইড' },

  // Keep Notes & Expenses
  'notes.title': { en: 'Traveler Notes & Cost Keeper', bn: 'ভ্রমণ নোট ও খরচের হিসাব' },
  'notes.subtitle': { en: 'Log your trip expenses in BDT (৳), calculate group splits, track budgets, and save important travel checklists & diary notes with offline auto-sync.', bn: 'আপনার সমস্ত ভ্রমণ খরচের হিসাব (৳), বন্ধুদের মাঝে খরচের ভাগ, বাজেট ট্র্যাকিং এবং প্রয়োজনীয় ভ্রমণ নোট ও চেকলিস্ট এক জায়গায় সংরক্ষণ করুন।' },
  'notes.tab_expenses': { en: 'Costs & Expenses', bn: 'খরচের হিসাব' },
  'notes.tab_notes': { en: 'Travel Notes & Diary', bn: 'ভ্রমণ নোট ও ডায়েরি' },
  'notes.tab_split': { en: 'Group Splitter', bn: 'গ্রুপ খরচের ভাগ' },
  'notes.tab_checklists': { en: 'Packing & Checklists', bn: 'প্যাকিং ও চেকলিস্ট' },
  'notes.add_expense': { en: 'Add New Expense', bn: 'নতুন খরচ যুক্ত করুন' },
  'notes.add_note': { en: 'Create New Note', bn: 'নতুন নোট লিখুন' },
  'notes.budget_target': { en: 'Target Budget Goal', bn: 'মোট ভ্রমণ বাজেট' },
  'notes.total_spent': { en: 'Total Spent', bn: 'মোট খরচ হয়েছে' },
  'notes.balance_left': { en: 'Remaining Balance', bn: 'অবশিষ্ট টাকা' },
  'notes.export_whatsapp': { en: 'Share to WhatsApp', bn: 'হোয়াটসঅ্যাপে পাঠান' },
  'notes.load_sample': { en: 'Load Sample Tour', bn: 'নমুনা ট্যুর লোড করুন' },
  'notes.empty_expenses': { en: 'No expenses logged yet. Start recording your journey costs!', bn: 'এখনও কোনো খরচ যুক্ত করা হয়নি। আপনার ভ্রমণের খরচের হিসাব রাখুন!' },
  'notes.empty_notes': { en: 'No notes created yet. Keep your emergency hotlines, packing lists, and memories here.', bn: 'এখনও কোনো নোট নেই। জরুরি নম্বর, প্যাকিং লিস্ট ও সুন্দর স্মৃতিগুলো লিখে রাখুন।' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('yeana_language');
    return (saved === 'bn' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('yeana_language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry.en || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
