import React, { useState, useEffect } from 'react';
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
  Heart
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

  const featuredPlaces = places.filter(p => p.is_featured).slice(0, 6);
  const featuredHotels = hotels.slice(0, 4);
  const featuredRestaurants = restaurants.slice(0, 4);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onNavigateTab('places', { search: searchInput });
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

  return (
    <div className="space-y-16 pb-16">

      {/* 1. HERO SECTION */}
      <section className="relative rounded-3xl sm:rounded-4xl overflow-hidden bg-slate-950 text-white min-h-[520px] sm:min-h-[580px] flex flex-col justify-center px-6 sm:px-12 py-14 sm:py-20 shadow-2xl border border-white/10">

        {/* Background Image with Ambient Glow Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=85"
            alt="Explore Bangladesh"
            className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl space-y-6 mx-auto text-center">

          {/* Floating Luxury Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-black backdrop-blur-xl shadow-lg animate-float">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('hero.tagline')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-heading">
            Explore Bangladesh. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300 drop-shadow-sm">
              Enjoy Life.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans font-medium">
            {t('hero.subtitle')}
          </p>

          {/* Luxury Frosted Glass Search Box */}
          <form
            onSubmit={handleHeroSearch}
            className="p-2 sm:p-2.5 rounded-3xl bg-white/95 backdrop-blur-2xl shadow-2xl border border-white/60 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-2 shadow-emerald-950/20"
          >
            <div className="flex items-center gap-2.5 px-4 py-2.5 flex-1 w-full">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Where do you want to go? (e.g. Sylhet, Sajek...)"
                className="w-full text-slate-900 placeholder-slate-400 text-sm sm:text-base font-semibold focus:outline-none bg-transparent font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-sm font-black shadow-lg shadow-emerald-700/30 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 hover:shadow-glow-emerald"
            >
              <Search className="w-4 h-4" />
              <span>{t('hero.search_btn')}</span>
            </button>
          </form>

          {/* Quick Destination Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-slate-300 font-bold">{t('hero.popular')}</span>
            {['Sylhet', 'Cox\'s Bazar', 'Sajek', 'Sreemangal', 'Sundarbans', 'Kuakata'].map(item => (
              <button
                key={item}
                onClick={() => onNavigateTab('places', { search: item })}
                className="px-3.5 py-1 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-white font-bold border border-white/20 transition-all backdrop-blur-md shadow-xs"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Live Ecosystem Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 max-w-2xl mx-auto text-white">
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-lg font-black text-emerald-400 font-heading block">64</span>
              <span className="text-[11px] text-slate-300 font-medium">Districts Covered</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-lg font-black text-sky-400 font-heading block">2,500+</span>
              <span className="text-[11px] text-slate-300 font-medium">Tourist Spots</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-lg font-black text-amber-400 font-heading block">1,000+</span>
              <span className="text-[11px] text-slate-300 font-medium">Verified Hotels</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-lg font-black text-teal-400 font-heading block">Live</span>
              <span className="text-[11px] text-slate-300 font-medium">Bus & Train Routes</span>
            </div>
          </div>

        </div>

      </section>

      {/* 2. QUICK CATEGORY PILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {[
            { id: 'places', label: t('nav.places'), icon: Compass, color: 'bg-teal-50/80 text-teal-800 border-teal-200/80 hover:border-teal-400' },
            { id: 'hotels', label: t('nav.hotels'), icon: HotelIcon, color: 'bg-sky-50/80 text-sky-800 border-sky-200/80 hover:border-sky-400' },
            { id: 'food', label: t('nav.food'), icon: Utensils, color: 'bg-amber-50/80 text-amber-900 border-amber-200/80 hover:border-amber-400' },
            { id: 'transport', label: t('nav.transport'), icon: Bus, color: 'bg-emerald-50/80 text-emerald-800 border-emerald-200/80 hover:border-emerald-400' },
            { id: 'shopping', label: t('nav.shopping'), icon: ShoppingBag, color: 'bg-purple-50/80 text-purple-900 border-purple-200/80 hover:border-purple-400' },
            { id: 'ride', label: t('nav.ride'), icon: Car, color: 'bg-rose-50/80 text-rose-800 border-rose-200/80 hover:border-rose-400' },
          ].map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onNavigateTab(cat.id)}
                className={`glass-card p-4 rounded-3xl border transition-all duration-300 flex flex-col items-center justify-center gap-2.5 group shadow-sm hover:shadow-md hover:-translate-y-1 ${cat.color}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 border border-slate-100">
                  <Icon className="w-6 h-6 text-slate-800 group-hover:text-emerald-700 transition-colors" />
                </div>
                <span className="text-xs font-black text-slate-900 tracking-tight text-center font-heading">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. DIVISION FILTER & FEATURED DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-black uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Explore Bangladesh</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Beautiful Destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Discover top-rated waterfalls, cloud valleys, tea estates, and sea beaches.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => onNavigateTab('explore')}
              className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 px-4 py-2.5 rounded-2xl shadow-sm hover:shadow-glow-emerald transition-all"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Explore 64 Districts</span>
            </button>
            <button
              onClick={() => onNavigateTab('places')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 px-4 py-2.5 rounded-2xl border border-emerald-200/60 transition-colors"
            >
              <span>View Places</span>
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
              {div === 'All' ? 'All Divisions' : `${div} Division`}
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

      {/* 4. TRIP PLANNER PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl sm:rounded-4xl bg-gradient-to-tr from-slate-950 via-teal-950 to-emerald-950 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">

          <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-xl z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/20 backdrop-blur-md">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Smart Travel Itinerary Builder</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black font-heading leading-tight">
              Plan Your Dream Trip to Sylhet, Cox's Bazar or Sajek
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-medium">
              Build custom Day 1, Day 2, Day 3 itineraries with real-time budget calculation for transport, hotels, food, and activities.
            </p>
            <button
              onClick={() => onNavigateTab('trips')}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-slate-950 text-xs sm:text-sm font-black shadow-lg transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <span>Launch Trip Planner</span>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </button>
          </div>

          <div className="z-10 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 text-xs space-y-3 w-full md:w-80 shrink-0 shadow-xl">
            <p className="font-black uppercase tracking-wider text-emerald-300 font-heading">Sylhet 3-Day Example</p>
            <div className="space-y-2 border-t border-white/10 pt-2 font-sans font-medium">
              <div className="flex justify-between"><span>Day 1: Jaflong & Ratargul</span><span className="font-bold font-mono">৳2,500</span></div>
              <div className="flex justify-between"><span>Day 2: Bichanakandi & Lalakhal</span><span className="font-bold font-mono">৳2,800</span></div>
              <div className="flex justify-between"><span>Day 3: Sreemangal Tea Estates</span><span className="font-bold font-mono">৳2,700</span></div>
              <div className="flex justify-between border-t border-white/20 pt-2 text-emerald-300 font-black text-sm">
                <span>Estimated Total:</span>
                <span className="font-mono">৳8,000</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TOP HOTELS & RESORTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sky-700 text-xs font-black uppercase tracking-wider mb-1">
              <HotelIcon className="w-4 h-4 text-sky-600" />
              <span>Stays & Accommodations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Top-Rated Hotels & Eco-Resorts
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('hotels')}
            className="text-xs font-bold text-sky-800 hover:text-sky-900 bg-sky-50 hover:bg-sky-100/80 px-4 py-2.5 rounded-2xl border border-sky-200/60 transition-colors inline-flex items-center gap-1"
          >
            <span>All Hotels</span>
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

      {/* 6. AUTHENTIC LOCAL FOOD & RESTAURANTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-700 text-xs font-black uppercase tracking-wider mb-1">
              <Utensils className="w-4 h-4 text-amber-600" />
              <span>Cuisine & Dining</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Iconic Food Spots & Cafés
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('food')}
            className="text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100/80 px-4 py-2.5 rounded-2xl border border-amber-200/60 transition-colors inline-flex items-center gap-1"
          >
            <span>All Food</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRestaurants.map(rest => (
            <RestaurantCard
              key={rest.id}
              restaurant={rest}
              onSelect={onSelectRestaurant}
            />
          ))}
        </div>
      </section>

      {/* 7. INTERACTIVE DESTINATIONS MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-black uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Interactive Navigation</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-heading">
              Explore Bangladesh Map
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

      {/* 8. WHY TRAVELERS CHOOSE YEANA STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl sm:rounded-4xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center border border-white/10 shadow-2xl">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">64</p>
            <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">Districts Covered</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-sky-400 font-mono">2,500+</p>
            <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">Scenic Spots</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">1,000+</p>
            <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">Verified Hotels</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-teal-400 font-mono">100%</p>
            <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">Live & Offline Ready</p>
          </div>
        </div>
      </section>

    </div>
  );
};
