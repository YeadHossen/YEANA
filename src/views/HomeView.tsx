import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  MapPin,
  Sparkles,
  TrendingUp,
  Hotel as HotelIcon,
  Utensils,
  Bus,
  ShoppingBag,
  Car,
  ArrowRight,
  Compass,
  ShieldCheck,
  Calendar,
  Layers,
  Heart,
  Clock,
  Phone,
  CheckCircle2,
  Coffee,
  Sun,
  CloudRain,
  Anchor,
  Flame,
  Star,
  Award
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { Place, Hotel, Restaurant, District, Division } from '../types';
import { PlaceCard } from '../components/common/PlaceCard';
import { HotelCard } from '../components/common/HotelCard';
import { RestaurantCard } from '../components/common/RestaurantCard';
import { MapView } from '../components/common/MapView';
import { useLanguage } from '../context/LanguageContext';

interface HomeViewProps {
  onSelectPlace: (place: Place) => void;
  onSelectHotel: (hotel: Hotel) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onNavigateTab: (tab: string, filterData?: any) => void;
  onAddToTrip: (place: Place) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectPlace,
  onSelectHotel,
  onSelectRestaurant,
  onNavigateTab,
  onAddToTrip
}) => {
  const { t, language } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [activeSearchTab, setActiveSearchTab] = useState<'destinations' | 'hotels' | 'transport' | 'food' | 'shopping'>('destinations');
  const [places, setPlaces] = useState<Place[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string>('All');

  useEffect(() => {
    async function loadData() {
      const [p, h, r, d] = await Promise.all([
        DataService.getPlaces(),
        DataService.getHotels(),
        DataService.getRestaurants(),
        DataService.getDistricts()
      ]);
      setPlaces(p);
      setHotels(h);
      setRestaurants(r);
      setDistricts(d);
    }
    loadData();
  }, []);

  // Time of day dynamic greeting (English & Bengali)
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        text: language === 'bn' ? 'সকালের শুভেচ্ছা' : 'Good Morning',
        icon: '☀️',
        tag: language === 'bn' ? 'সূর্যোদয় ও প্রকৃতির সতেজতা' : 'Sunrise & Fresh Morning Trails'
      };
    }
    if (hour >= 12 && hour < 17) {
      return {
        text: language === 'bn' ? 'শুভ অপরাহ্ন' : 'Good Afternoon',
        icon: '🌤️',
        tag: language === 'bn' ? 'হাওড় ও পাহাড়ের মায়াবী রূপ' : 'Sunny Hills & Haor Waters'
      };
    }
    if (hour >= 17 && hour < 20) {
      return {
        text: language === 'bn' ? 'শুভ সন্ধ্যা' : 'Good Evening',
        icon: '🌇',
        tag: language === 'bn' ? 'মনোরম সূর্যাস্ত ও চায়ের আড্ডা' : 'Golden Sunset & Tea Garden Breeze'
      };
    }
    return {
      text: language === 'bn' ? 'শুভ রাত্রি' : 'Good Night',
      icon: '🌙',
      tag: language === 'bn' ? 'শান্ত রাতের মেঘ ও তারার মেলা' : 'Starry Night Skies & Valleys'
    };
  }, [language]);

  const divisions: (string | Division)[] = [
    'All',
    'Sylhet',
    'Chattogram',
    'Dhaka',
    'Khulna',
    'Barishal',
    'Rajshahi',
    'Rangpur',
    'Mymensingh'
  ];

  const filteredPlaces = selectedDivision === 'All'
    ? places
    : places.filter(p => {
      const dist = districts.find(d => d.id === p.district_id);
      return dist?.division === selectedDivision || p.division === selectedDivision;
    });

  const featuredHotels = hotels.slice(0, 4);
  const featuredRestaurants = restaurants.slice(0, 4);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      if (activeSearchTab === 'destinations') onNavigateTab('places', { search: searchInput });
      else if (activeSearchTab === 'hotels') onNavigateTab('hotels', { search: searchInput });
      else if (activeSearchTab === 'transport') onNavigateTab('transport', { search: searchInput });
      else if (activeSearchTab === 'food') onNavigateTab('food', { search: searchInput });
      else if (activeSearchTab === 'shopping') onNavigateTab('shopping', { search: searchInput });
    }
  };

  const mapMarkers = places.map(p => ({
    id: p.id,
    title: p.name,
    lat: p.lat,
    lng: p.lng,
    category: p.category,
    description: p.short_description
  }));

  // Iconic 64-Districts Food & Sweets
  const ICONIC_FOODS = [
    {
      district: language === 'bn' ? 'বগুড়া' : 'Bogura',
      name: language === 'bn' ? 'ঐতিহ্যবাহী খাস্তা দই' : 'Bogura Sweet & Sour Curd (Doi)',
      eng: 'Traditional Clay Pot Curd',
      price: '৳350/kg',
      image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80',
      badge: language === 'bn' ? 'জিআই ট্যাগ' : 'GI Certified'
    },
    {
      district: language === 'bn' ? 'কুমিল্লা' : 'Cumilla',
      name: language === 'bn' ? 'মাতৃভাণ্ডারের রসমালাই' : 'Authentic Matrivandar Rosomalai',
      eng: 'Pure Clotted Cream Dessert',
      price: '৳400/kg',
      image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80',
      badge: language === 'bn' ? 'শতবর্ষী স্বাদ' : 'Legendary'
    },
    {
      district: language === 'bn' ? 'চাঁদপুর' : 'Chandpur',
      name: language === 'bn' ? 'পদ্মা-মেঘনার রূপালী ইলিশ' : 'Padma-Meghna Silver Ilish',
      eng: 'Fresh King of Fish Feast',
      price: '৳1,200+',
      image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&auto=format&fit=crop&q=80',
      badge: language === 'bn' ? 'জাতীয় মাছ' : 'National Fish'
    },
    {
      district: language === 'bn' ? 'চট্টগ্রাম' : 'Chittagong',
      name: language === 'bn' ? 'মেজবানি মাংস ও কালাভুনা' : 'Authentic Mezbani Gosht & Kala Bhuna',
      eng: 'Slow Cooked Spicy Beef Feast',
      price: '৳280/plate',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
      badge: language === 'bn' ? 'চাটগাঁইয়া ঐতিহ্য' : 'Heritage'
    },
    {
      district: language === 'bn' ? 'সিলেট' : 'Sylhet',
      name: language === 'bn' ? 'সাতকড়া গরুর মাংস ও চা' : 'Sylheti Satkora Beef & 7-Layer Tea',
      eng: 'Wild Citrus Delicacy',
      price: '৳250/plate',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80',
      badge: language === 'bn' ? 'সিলেটি স্পেশাল' : 'Sylhet Special'
    },
    {
      district: language === 'bn' ? 'নাটোর' : 'Natore',
      name: language === 'bn' ? 'জয়কালী বাড়ির কাঁচাগোল্লা' : 'Joykali Bari Pure Kachagolla',
      eng: 'Royal Milk Sweet',
      price: '৳380/kg',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80',
      badge: language === 'bn' ? 'রাজকীয় মিষ্টান্ন' : 'Royal Sweet'
    }
  ];

  // Authentic GI & Indigenous Craft Clothing
  const ICONIC_CRAFTS = [
    {
      title: language === 'bn' ? 'ঢাকাই জামদানি শাড়ি' : 'Dhakai Jamdani Saree',
      district: language === 'bn' ? 'নারায়ণগঞ্জ (রুপগঞ্জ)' : 'Narayanganj (Rupganj)',
      eng: 'Handwoven Fine Muslin Heritage',
      tag: 'UNESCO World Heritage',
      img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: language === 'bn' ? 'কুমিল্লার খাদি কাপড় ও শাল' : 'Cumilla Pure Cotton Khadi',
      district: language === 'bn' ? 'কুমিল্লা' : 'Cumilla',
      eng: 'Pure Handspun Organic Wear',
      tag: language === 'bn' ? 'শতবর্ষী ঐতিহ্য' : 'Centuries Old',
      img: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: language === 'bn' ? 'মণিপুরী তাঁত ও চাদর' : 'Manipuri Handloom Shawls',
      district: language === 'bn' ? 'মৌলভীবাজার (কমলগঞ্জ)' : 'Moulvibazar (Kamalganj)',
      eng: 'Indigenous Tribal Weaving',
      tag: language === 'bn' ? 'আদিবাসী শিল্প' : 'Indigenous Craft',
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: language === 'bn' ? 'টাঙ্গাইল তাঁতের শাড়ি' : 'Tangail Traditional Taant',
      district: language === 'bn' ? 'টাঙ্গাইল (বাজিতপুর)' : 'Tangail (Bajitpur)',
      eng: 'Jacquard Weave Saree',
      tag: language === 'bn' ? 'বাংলার অহংকার' : 'Pride of Bengal',
      img: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600&auto=format&fit=crop&q=80'
    },
  ];

  return (
    <div className="space-y-16 pb-20 bg-bangla-mesh">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: ALL-IN-ONE BANGLADESHI TRAVEL HUB                       */}
      {/* ========================================================================= */}
      <section className="relative rounded-3xl sm:rounded-4xl overflow-hidden bg-slate-950 text-white min-h-[560px] sm:min-h-[620px] flex flex-col justify-center px-5 sm:px-12 py-12 sm:py-20 shadow-2xl border border-white/10">

        {/* Ambient Nature Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=1600&auto=format&fit=crop&q=85"
            alt="Explore Beautiful Bangladesh"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/35" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-shyamol-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-surjo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-shorisha-500/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl space-y-6 mx-auto text-center">

          {/* Dynamic Time Greeting & Seasonal Chip */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold backdrop-blur-xl shadow-lg animate-float">
            <span className="text-base">{greeting.icon}</span>
            <span className="font-bold text-white">{greeting.text}!</span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-400 font-medium">{greeting.tag}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-heading">
            {language === 'bn' ? 'চলুন ঘুরে আসি ' : 'Explore Beautiful '}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-shorisha-400 to-surjo-400 drop-shadow-sm">
              {language === 'bn' ? 'রূপসী বাংলাদেশ' : 'Bangladesh'}
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium">
            {language === 'bn' 
              ? '৬৪ জেলার দর্শনীয় স্থান, সেরা হোটেল, ঐতিহ্যবাহী খাবার, বাস-ট্রেন-লঞ্চ টিকিট এবং নির্ভরযোগ্য স্মার্ট ট্রিপ প্ল্যানার।'
              : 'Discover 64 districts, scenic destinations, top hotels, iconic regional foods, live bus & train tickets, and smart itinerary planners.'
            }
          </p>

          {/* All-in-One Multi-Service Search Hub */}
          <div className="max-w-2xl mx-auto space-y-3 pt-2">
            
            {/* Quick Service Tab Selectors */}
            <div className="flex items-center justify-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-slate-900/80 border border-white/15 backdrop-blur-xl">
              {[
                { id: 'destinations', label: language === 'bn' ? '📍 দর্শনীয় স্থান' : '📍 Destinations' },
                { id: 'hotels', label: language === 'bn' ? '🏨 হোটেল ও রিসোর্ট' : '🏨 Hotels & Stays' },
                { id: 'transport', label: language === 'bn' ? '🚌 বাস ও ট্রেন সিট' : '🚌 Transit Seats' },
                { id: 'food', label: language === 'bn' ? '🍛 বিখ্যাত খাবার' : '🍛 Famous Food' },
                { id: 'shopping', label: language === 'bn' ? '🛍️ তাঁত ও পোশাক' : '🛍️ Native Crafts' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSearchTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeSearchTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Smart Search Form */}
            <form
              onSubmit={handleHeroSearch}
              className="p-2 sm:p-2.5 rounded-3xl bg-white/95 backdrop-blur-2xl shadow-2xl border border-white/60 flex flex-col sm:flex-row items-center gap-2 shadow-emerald-950/20"
            >
              <div className="flex items-center gap-2.5 px-4 py-2.5 flex-1 w-full">
                <MapPin className="w-5 h-5 text-emerald-700 shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={
                    activeSearchTab === 'destinations' ? (language === 'bn' ? 'কোথায় ভ্রমণ করতে চান? (যেমন: সাজেক, জাফলং, কক্সবাজার...)' : 'Where do you want to go? (e.g. Sajek, Sylhet, Cox\'s Bazar...)') :
                    activeSearchTab === 'hotels' ? (language === 'bn' ? 'হোটেল বা রিসোর্ট খুঁজুন (যেমন: গ্র্যান্ড সুলতান, সায়মন...)' : 'Search hotels & eco-resorts (e.g. Grand Sultan, Sayeman...)') :
                    activeSearchTab === 'transport' ? (language === 'bn' ? 'বাস বা ট্রেনের রুট খুঁজুন (যেমন: ঢাকা ➔ কক্সবাজার...)' : 'Search bus & train routes (e.g. Dhaka to Cox\'s Bazar...)') :
                    activeSearchTab === 'food' ? (language === 'bn' ? 'ঐতিহ্যবাহী খাবার খুঁজুন (যেমন: বগুড়ার দই, মেজবানি...)' : 'Search iconic food (e.g. Bogura Doi, Mezbani Beef...)') :
                    (language === 'bn' ? 'ঐতিহ্যবাহী পোশাক খুঁজুন (যেমন: জামদানি শাড়ি, খাদি কাপড়...)' : 'Search traditional attire & crafts (e.g. Jamdani, Khadi...)')
                  }
                  className="w-full text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-bold focus:outline-none bg-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white text-xs sm:text-sm font-black shadow-lg shadow-emerald-700/30 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 hover:shadow-glow-emerald"
              >
                <Search className="w-4 h-4" />
                <span>{language === 'bn' ? 'সন্ধান করুন' : 'Search'}</span>
              </button>
            </form>

            {/* Trending Destination Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
              <span className="text-shorisha-300 font-bold">{language === 'bn' ? 'জনপ্রিয় গন্তব্য:' : 'Popular:'}</span>
              {[
                { name: language === 'bn' ? 'কক্সবাজার' : "Cox's Bazar", query: "Cox's Bazar", icon: '🌊' },
                { name: language === 'bn' ? 'সাজেক ভ্যালি' : 'Sajek Valley', query: 'Sajek', icon: '☁️' },
                { name: language === 'bn' ? 'সুন্দরবন' : 'Sundarbans', query: 'Sundarbans', icon: '🌿' },
                { name: language === 'bn' ? 'শ্রীমঙ্গল' : 'Sreemangal', query: 'Sreemangal', icon: '☕' },
                { name: language === 'bn' ? 'টাঙ্গুয়ার হাওড়' : 'Tanguar Haor', query: 'Tahirpur', icon: '⛵' },
                { name: language === 'bn' ? 'কুয়াকাটা' : 'Kuakata', query: 'Kuakata', icon: '🌅' },
                { name: language === 'bn' ? 'বান্দরবান' : 'Bandarban', query: 'Bandarban', icon: '🏞️' },
              ].map(item => (
                <button
                  key={item.query}
                  onClick={() => onNavigateTab('places', { search: item.query })}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-white font-bold border border-white/20 transition-all backdrop-blur-md shadow-xs flex items-center gap-1"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Real-time Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 max-w-2xl mx-auto text-white">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-xl font-black text-emerald-400 font-heading block">64</span>
              <span className="text-[11px] text-slate-300 font-medium">{language === 'bn' ? 'সমগ্র বাংলাদেশ কাভারেজ' : 'Districts Covered'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-xl font-black text-sky-400 font-heading block">2,500+</span>
              <span className="text-[11px] text-slate-300 font-medium">{language === 'bn' ? 'প্রাকৃতিক ও ঐতিহ্য স্থান' : 'Scenic Spots'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-xl font-black text-shorisha-400 font-heading block">1,000+</span>
              <span className="text-[11px] text-slate-300 font-medium">{language === 'bn' ? 'লাইভ রুম রিজার্ভেশন' : 'Verified Hotels'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-xl font-black text-surjo-400 font-heading block">Live</span>
              <span className="text-[11px] text-slate-300 font-medium">{language === 'bn' ? 'বাস, ট্রেন ও লঞ্চ সিট' : 'Bus & Train Seats'}</span>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. QUICK CATEGORY PILLS                                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { id: 'places', label: language === 'bn' ? 'দর্শনীয় স্থান' : 'Places', en: 'Destinations', icon: Compass, color: 'bg-emerald-50/90 text-emerald-900 border-emerald-200/90 hover:border-emerald-500 shadow-emerald-950/5' },
            { id: 'hotels', label: language === 'bn' ? 'হোটেল ও রিসোর্ট' : 'Hotels', en: 'Accommodations', icon: HotelIcon, color: 'bg-sky-50/90 text-sky-900 border-sky-200/90 hover:border-sky-500 shadow-sky-950/5' },
            { id: 'food', label: language === 'bn' ? 'ঐতিহ্যবাহী খাবার' : 'Local Food', en: 'Cuisine & Dining', icon: Utensils, color: 'bg-amber-50/90 text-amber-950 border-amber-200/90 hover:border-amber-500 shadow-amber-950/5' },
            { id: 'transport', label: language === 'bn' ? 'বাস ও ট্রেন সিট' : 'Transport', en: 'Bus & Train Routes', icon: Bus, color: 'bg-teal-50/90 text-teal-900 border-teal-200/90 hover:border-teal-500 shadow-teal-950/5' },
            { id: 'shopping', label: language === 'bn' ? 'তাঁত ও জিআই পণ্য' : 'Native Crafts', en: 'Regional Handloom', icon: ShoppingBag, color: 'bg-purple-50/90 text-purple-900 border-purple-200/90 hover:border-purple-500 shadow-purple-950/5' },
            { id: 'ride', label: language === 'bn' ? 'গাড়ি ও রাইড' : 'Rentals', en: 'Cars & Jeeps', icon: Car, color: 'bg-rose-50/90 text-rose-900 border-rose-200/90 hover:border-rose-500 shadow-rose-950/5' },
          ].map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onNavigateTab(cat.id)}
                className={`p-4 rounded-3xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 group shadow-sm hover:shadow-xl hover:-translate-y-1 ${cat.color}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 border border-slate-100">
                  <Icon className="w-6 h-6 text-slate-800 group-hover:text-emerald-700 transition-colors" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-black text-slate-900 tracking-tight block">
                    {cat.label}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {cat.en}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SEASONAL TRAVEL PICKS                                                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'bn' ? 'ঋতুভিত্তিক সেরা ভ্রমণ গাইড' : 'Seasonal Travel Specials'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {language === 'bn' ? 'প্রকৃতির সাথে বাংলার ভ্রমণ' : 'Travel in Rhythm with Nature'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              season: language === 'bn' ? '🌧️ বর্ষা স্পেশাল' : '🌧️ Monsoon Magic',
              title: language === 'bn' ? 'টাঙ্গুয়ার হাওড় ও জলরাশি' : 'Tanguar Haor & Waterways',
              subtitle: language === 'bn' ? 'প্রিমিয়াম হাউসবোট ক্রুজ, বিছনাকান্দি ও জাফলং ঝর্ণা' : 'Premium Houseboat Cruise, Bichanakandi & Jaflong',
              badge: language === 'bn' ? 'হাউসবোট সিট লাইভ' : 'Houseboat Live',
              badgeColor: 'bg-sky-600',
              query: 'Tahirpur',
              img: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600&auto=format&fit=crop&q=80'
            },
            {
              season: language === 'bn' ? '☁️ শরৎ ও কাশফুল' : '☁️ Autumn Clouds',
              title: language === 'bn' ? 'সাজেক ভ্যালি ও মেঘের পাহাড়' : 'Sajek Valley & Cloud Kingdom',
              subtitle: language === 'bn' ? 'হেলিপ্যাড সানরাইজ, কংলাক পাহাড় ও চাঁদের গাড়ি রাইড' : 'Helipad Sunrise, Konglak Peak & Chander Gari',
              badge: language === 'bn' ? 'ইকো কটেজ বুকিং' : 'Eco Cottage',
              badgeColor: 'bg-emerald-600',
              query: 'Sajek',
              img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80'
            },
            {
              season: language === 'bn' ? '☕ শীতের আমেজ' : '☕ Winter Escape',
              title: language === 'bn' ? 'শ্রীমঙ্গলের চা বাগান ও কুয়াশা' : 'Sreemangal Tea Gardens & Mist',
              subtitle: language === 'bn' ? 'লাউয়াছড়া রেইনফরেস্ট, মাধবপুর লেক ও সাতকড়া চা' : 'Lawachara Rainforest, Madhabpur Lake & 7-Layer Tea',
              badge: language === 'bn' ? 'রিসোর্ট অফার' : 'Resort Deals',
              badgeColor: 'bg-amber-600',
              query: 'Sreemangal',
              img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80'
            },
            {
              season: language === 'bn' ? '🌴 গ্রীষ্মের সাগর' : '🌴 Summer Coral Island',
              title: language === 'bn' ? 'সেন্টমার্টিন ও ছেঁড়াদ্বীপ' : 'St. Martin & Chera Dwip',
              subtitle: language === 'bn' ? 'নীল সমুদ্র, ডাব ও সামুদ্রিক মাছের বারবিকিউ' : 'Turquoise Waves, Coconut Groves & Fresh Seafood BBQ',
              badge: language === 'bn' ? 'শিপ টিকিট লাইভ' : 'Ship Tickets Live',
              badgeColor: 'bg-teal-600',
              query: "Cox's Bazar",
              img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'
            }
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => onNavigateTab('places', { search: item.query })}
              className="relative h-72 rounded-3xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                  {item.season}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className={`px-2 py-0.5 rounded-lg text-white font-bold text-[10px] uppercase shadow-sm ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>

              <div className="absolute bottom-4 inset-x-4 space-y-1">
                <h4 className="text-base font-black text-white leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-300 line-clamp-2 font-medium">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. DIVISION FILTER & FEATURED DESTINATIONS                                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-black uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>{language === 'bn' ? '৮ বিভাগের রূপসৌন্দর্য' : '8 Divisions of Bangladesh'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {language === 'bn' ? 'জনপ্রিয় দর্শনীয় স্থানসমূহ' : 'Featured Tourist Destinations'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {language === 'bn' 
                ? 'ঝর্ণা, মেঘের উপত্যকা, প্রাচীন প্রত্নতত্ত্ব, চা বাগান এবং সমুদ্র সৈকত আবিষ্কার করুন।'
                : 'Explore waterfalls, cloud valleys, tea estates, archaeological sites, and sea beaches.'
              }
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              onClick={() => onNavigateTab('explore')}
              className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 px-4 py-2.5 rounded-2xl shadow-sm hover:shadow-glow-emerald transition-all"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? '৬৪ জেলা এক্সপ্লোর করুন' : 'Explore 64 Districts'}</span>
            </button>
            <button
              onClick={() => onNavigateTab('places')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-2xl border border-emerald-200 transition-colors"
            >
              <span>{language === 'bn' ? 'সকল স্থান' : 'View All Places'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Division Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {divisions.map(div => (
            <button
              key={div}
              onClick={() => setSelectedDivision(div)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${selectedDivision === div
                ? 'bg-slate-900 text-white shadow-md'
                : 'glass-panel text-slate-700 hover:bg-white border border-slate-200/80 shadow-2xs'
                }`}
            >
              {div === 'All' ? (language === 'bn' ? 'সব বিভাগ' : 'All Divisions') : `${div}`}
            </button>
          ))}
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.slice(0, 6).map(place => (
            <PlaceCard
              key={place.id}
              place={place}
              onSelect={onSelectPlace}
              onAddToTrip={onAddToTrip}
            />
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. 64-DISTRICTS FAMOUS FOOD & SWEETS SHOWCASE                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full mb-1">
              <Utensils className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'bn' ? '৬৪ জেলার ঐতিহ্য ও স্বাদ' : '64-Districts Authentic Cuisine'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {language === 'bn' ? 'বিখ্যাত আঞ্চলিক খাবার ও মিষ্টান্ন' : 'Iconic Regional Foods & Sweets'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {language === 'bn' 
                ? 'বগুড়ার দই থেকে চাটগাঁর মেজবানি—বাংলার প্রতিটি জেলার বিখ্যাত স্বাদ সন্ধান করুন।'
                : 'From Bogura Doi to Chittagong Mezbani—discover legendary delicacies across all 64 districts.'
              }
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('food')}
            className="text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 px-4 py-2.5 rounded-2xl border border-amber-300 transition-colors inline-flex items-center gap-1"
          >
            <span>{language === 'bn' ? 'সকল খাবার' : 'View All Foods'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {ICONIC_FOODS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateTab('food', { search: item.name })}
              className="glass-card rounded-2xl sm:rounded-3xl border border-slate-200/80 p-3 space-y-2.5 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="relative h-28 sm:h-32 rounded-2xl overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[9px]">
                    {item.badge}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-800 block">📍 {item.district}</span>
                  <h5 className="font-black text-xs sm:text-sm text-slate-900 leading-snug line-clamp-1">{item.name}</h5>
                  <p className="text-[10px] text-slate-400 truncate">{item.eng}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
                <span className="text-emerald-700 font-black font-mono">{item.price}</span>
                <span className="text-[10px] text-slate-500 font-bold group-hover:text-emerald-700">Explore →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. GI CRAFTS & NATIVE CLOTHING (ভৌগোলিক বিশেষত্ব ও পোশাক)                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full mb-1">
              <ShoppingBag className="w-3.5 h-3.5 text-purple-700" />
              <span>{language === 'bn' ? 'ঐতিহ্যবাহী তাঁত ও ভৌগোলিক বিশেষত্ব' : 'GI Heritage & Native Handloom Crafts'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {language === 'bn' ? 'বাংলার আদি ও খাঁটি পোশাক শিল্প' : 'Authentic Handloom & Textile Treasures'}
            </h2>
          </div>

          <button
            onClick={() => onNavigateTab('shopping')}
            className="text-xs font-bold text-purple-900 hover:text-purple-950 bg-purple-100 hover:bg-purple-200 px-4 py-2.5 rounded-2xl border border-purple-300 transition-colors inline-flex items-center gap-1"
          >
            <span>{language === 'bn' ? 'সকল শপিং ও তাঁত' : 'Explore All Crafts'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ICONIC_CRAFTS.map((craft, i) => (
            <div
              key={i}
              onClick={() => onNavigateTab('shopping', { search: craft.title })}
              className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex items-center gap-3"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                <img src={craft.img} alt={craft.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 font-bold text-[9px] inline-block mb-1">
                  {craft.tag}
                </span>
                <h5 className="font-black text-xs sm:text-sm text-slate-900 truncate">{craft.title}</h5>
                <p className="text-[11px] text-slate-500">📍 {craft.district}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TRIP PLANNER PROMO BANNER                                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl sm:rounded-4xl bg-gradient-to-tr from-slate-950 via-emerald-950 to-teal-950 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">

          <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-xl z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/20 backdrop-blur-md">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'bn' ? 'স্মার্ট ট্রিপ ও বাজেট প্ল্যানার' : 'Smart Travel Itinerary Builder'}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black leading-tight font-heading">
              {language === 'bn' 
                ? 'সাজেক, সিলেট বা কক্সবাজার ভ্রমণের পূর্ণাঙ্গ বাজেট ও রুট প্ল্যান'
                : 'Plan Your Dream Trip to Sylhet, Cox\'s Bazar or Sajek'
              }
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {language === 'bn'
                ? 'দিন-ভিত্তিক রুট (Day 1, Day 2, Day 3), গাড়ি রিজার্ভ, হোটেল ও খাবারের স্বয়ংক্রিয় খরচ ক্যালকুলেটর।'
                : 'Build custom Day 1, Day 2, Day 3 itineraries with real-time budget calculation for transport, hotels, food, and activities.'
              }
            </p>
            <button
              onClick={() => onNavigateTab('trips')}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-slate-950 text-xs sm:text-sm font-black shadow-lg transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <span>{language === 'bn' ? 'ট্রিপ প্ল্যান শুরু করুন' : 'Launch Trip Planner'}</span>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </button>
          </div>

          <div className="z-10 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 text-xs space-y-3 w-full md:w-80 shrink-0 shadow-xl">
            <p className="font-black uppercase tracking-wider text-emerald-300 font-heading">
              {language === 'bn' ? 'সিলেট ৩ দিনের আনুমানিক বাজেট' : 'Sylhet 3-Day Sample Budget'}
            </p>
            <div className="space-y-2 border-t border-white/10 pt-2 font-medium">
              <div className="flex justify-between">
                <span>{language === 'bn' ? 'দিন ১: জাফলং ও রাতারগুল' : 'Day 1: Jaflong & Ratargul'}</span>
                <span className="font-bold font-mono">৳2,500</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'bn' ? 'দিন ২: বিছনাকান্দি ও লালাখাল' : 'Day 2: Bichanakandi & Lalakhal'}</span>
                <span className="font-bold font-mono">৳2,800</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'bn' ? 'দিন ৩: শ্রীমঙ্গল চা বাগান' : 'Day 3: Sreemangal Tea Estates'}</span>
                <span className="font-bold font-mono">৳2,700</span>
              </div>
              <div className="flex justify-between border-t border-white/20 pt-2 text-emerald-300 font-black text-sm">
                <span>{language === 'bn' ? 'সর্বমোট আনুমানিক খরচ:' : 'Estimated Total:'}</span>
                <span className="font-mono">৳8,000</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. TOP HOTELS & RESORTS                                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sky-800 text-xs font-black uppercase tracking-wider mb-1">
              <HotelIcon className="w-4 h-4 text-sky-700" />
              <span>{language === 'bn' ? 'হোটেল ও রিসোর্ট' : 'Stays & Accommodations'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {language === 'bn' ? 'শীর্ষ তারকা ও ইকো রিসোর্ট' : 'Top-Rated Hotels & Eco-Resorts'}
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('hotels')}
            className="text-xs font-bold text-sky-800 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-4 py-2.5 rounded-2xl border border-sky-200 transition-colors inline-flex items-center gap-1"
          >
            <span>{language === 'bn' ? 'সকল হোটেল' : 'All Hotels'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredHotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onSelect={onSelectHotel}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. INTERACTIVE DESTINATIONS MAP                                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-black uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>{language === 'bn' ? 'লাইভ ম্যাপ নেভিগেশন' : 'Interactive Navigation'}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-heading">
              {language === 'bn' ? 'বাংলাদেশ ভ্রমণ মানচিত্র' : 'Explore Bangladesh Map'}
            </h2>
          </div>
        </div>

        <div className="glass-panel p-3 rounded-3xl sm:rounded-4xl border border-slate-200/80 shadow-glass">
          <MapView
            markers={mapMarkers}
            zoom={7}
            className="h-96 w-full rounded-2xl sm:rounded-3xl overflow-hidden"
            onMarkerClick={(markerId) => {
              const place = places.find(p => p.id === markerId);
              if (place) onSelectPlace(place);
            }}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. TRUSTED BANGLADESHI PAYMENT & TOURIST EMERGENCY HELPLINE BADGES       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl sm:rounded-4xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white p-8 sm:p-10 border border-white/10 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{language === 'bn' ? '১০০% নিরাপদ ও নির্ভরযোগ্য ভ্রমণ প্ল্যাটফর্ম' : '100% Verified & Secure Travel Platform'}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black font-heading">
                {language === 'bn' 
                  ? 'সহজ পেমেন্ট ও দেশজুড়ে সার্বক্ষণিক ট্রাভেলার সাপোর্ট'
                  : 'Seamless Local Payments & Nationwide 24/7 Traveler Care'
                }
              </h4>
            </div>

            {/* Trusted Payment Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1.5 rounded-xl bg-pink-950/80 border border-pink-500/40 text-pink-300 font-black text-xs font-mono">
                bKash বিকাশ
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 font-black text-xs font-mono">
                Nagad নগদ
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 font-black text-xs font-mono">
                Rocket রকেট
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-blue-950/80 border border-blue-500/40 text-blue-300 font-black text-xs font-mono">
                Visa / Master
              </span>
            </div>
          </div>

          {/* Emergency Helplines for Travelers in Bangladesh */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-black text-sm shrink-0">
                🚨 999
              </div>
              <div>
                <strong className="text-white block font-bold">{language === 'bn' ? 'জাতীয় জরুরি সেবা' : 'National Emergency 999'}</strong>
                <span className="text-slate-400 text-[11px]">{language === 'bn' ? 'পুলিশ, অ্যাম্বুলেন্স ও ফায়ার সার্ভিস' : 'Police, Ambulance & Fire Services'}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm shrink-0">
                👮‍♂️ 01320
              </div>
              <div>
                <strong className="text-white block font-bold">{language === 'bn' ? 'বাংলাদেশ ট্যুরিস্ট পুলিশ' : 'Bangladesh Tourist Police'}</strong>
                <span className="text-slate-400 text-[11px]">{language === 'bn' ? 'হটলাইন: 01320-163599' : 'Hotline: 01320-163599'}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-black text-sm shrink-0">
                💬 24/7
              </div>
              <div>
                <strong className="text-white block font-bold">{language === 'bn' ? 'YEANA কনসিয়ার্জ হেল্প' : 'YEANA Concierge Help'}</strong>
                <span className="text-slate-400 text-[11px]">{language === 'bn' ? 'লাইভ ট্রাভেল সাপোর্ট' : 'Live Chat & Instant Travel Support'}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
