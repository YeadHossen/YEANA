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
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[500px] sm:min-h-[560px] flex flex-col justify-center px-6 sm:px-12 py-12 sm:py-20 shadow-2xl">

        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=85"
            alt="Explore Bangladesh"
            className="w-full h-full object-cover object-center opacity-40 scale-105 animate-in fade-in duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl space-y-6 mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('hero.tagline')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-sans">
            Explore Bangladesh. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300">
              Enjoy Life.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Hero Search Box */}
          <form
            onSubmit={handleHeroSearch}
            className="p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/40 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="flex items-center gap-2 px-3 py-2 flex-1 w-full">
              <MapPin className="w-5 h-5 text-brand-600 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Where do you want to go? (e.g. Sylhet, Sajek...)"
                className="w-full text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none bg-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-md shadow-brand-700/30 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>{t('hero.search_btn')}</span>
            </button>
          </form>

          {/* Quick Destination Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-slate-400 font-semibold">{t('hero.popular')}</span>
            {['Sylhet', 'Cox\'s Bazar', 'Sajek', 'Sreemangal', 'Sundarbans', 'Kuakata'].map(item => (
              <button
                key={item}
                onClick={() => onNavigateTab('places', { search: item })}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition-colors backdrop-blur-xs"
              >
                {item}
              </button>
            ))}
          </div>

        </div>

      </section>

      {/* 2. QUICK CATEGORY PILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {[
            { id: 'places', label: t('nav.places'), icon: Compass, color: 'bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200' },
            { id: 'hotels', label: t('nav.hotels'), icon: HotelIcon, color: 'bg-sky-50 text-sky-700 hover:bg-sky-100 border-sky-200' },
            { id: 'food', label: t('nav.food'), icon: Utensils, color: 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200' },
            { id: 'transport', label: t('nav.transport'), icon: Bus, color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200' },
            { id: 'shopping', label: t('nav.shopping'), icon: ShoppingBag, color: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200' },
            { id: 'ride', label: t('nav.ride'), icon: Car, color: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200' },
          ].map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onNavigateTab(cat.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center gap-2 group shadow-2xs hover:shadow-md hover:-translate-y-0.5 ${cat.color}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-black tracking-tight text-center">
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
            <div className="flex items-center gap-2 text-brand-700 text-xs font-extrabold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4 text-brand-600" />
              <span>Explore Bangladesh</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
              Beautiful Destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Discover top-rated waterfalls, cloud valleys, tea estates, and sea beaches.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => onNavigateTab('explore')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-xl shadow-xs transition-all"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Explore 64 Districts</span>
            </button>
            <button
              onClick={() => onNavigateTab('places')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-xl transition-colors"
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
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedDivision === div
                ? 'bg-brand-600 text-white shadow-sm shadow-brand-700/20'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
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
        <div className="rounded-3xl bg-gradient-to-r from-brand-800 via-brand-700 to-teal-800 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="space-y-4 max-w-xl z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-bold border border-white/20">
              <Calendar className="w-3.5 h-3.5" />
              <span>Smart Travel Itinerary Builder</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black font-sans leading-tight">
              Plan Your Dream Trip to Sylhet, Cox's Bazar or Sajek
            </h3>
            <p className="text-xs sm:text-sm text-brand-100 leading-relaxed">
              Build custom Day 1, Day 2, Day 3 itineraries with real-time budget calculation for transport, hotels, food, and activities.
            </p>
            <button
              onClick={() => onNavigateTab('trips')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-brand-50 text-brand-900 text-xs sm:text-sm font-extrabold shadow-lg transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <span>Launch Trip Planner</span>
              <ArrowRight className="w-4 h-4 text-brand-700" />
            </button>
          </div>

          <div className="z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-xs space-y-3 w-full md:w-80 shrink-0">
            <p className="font-extrabold uppercase tracking-wider text-brand-300">Sylhet 3-Day Example</p>
            <div className="space-y-2 border-t border-white/10 pt-2">
              <div className="flex justify-between"><span>Day 1: Jaflong & Ratargul</span><span className="font-bold">৳2,500</span></div>
              <div className="flex justify-between"><span>Day 2: Bichanakandi & Lalakhal</span><span className="font-bold">৳2,800</span></div>
              <div className="flex justify-between"><span>Day 3: Sreemangal Tea Estates</span><span className="font-bold">৳2,700</span></div>
              <div className="flex justify-between border-t border-white/20 pt-1 text-teal-300 font-extrabold text-sm">
                <span>Estimated Total:</span>
                <span>৳8,000</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TOP HOTELS & RESORTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sky-700 text-xs font-extrabold uppercase tracking-wider mb-1">
              <HotelIcon className="w-4 h-4 text-sky-600" />
              <span>Stays & Accommodations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
              Top-Rated Hotels & Eco-Resorts
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('hotels')}
            className="text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-xl transition-colors inline-flex items-center gap-1"
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
            <div className="flex items-center gap-2 text-amber-700 text-xs font-extrabold uppercase tracking-wider mb-1">
              <Utensils className="w-4 h-4 text-amber-600" />
              <span>Cuisine & Dining</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
              Iconic Food Spots & Cafés
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('food')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl transition-colors inline-flex items-center gap-1"
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
            <div className="flex items-center gap-2 text-brand-700 text-xs font-extrabold uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span>Interactive Navigation</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-sans">
              Explore Bangladesh Map
            </h2>
          </div>
        </div>

        <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-card">
          <MapView
            markers={mapMarkers}
            zoom={7}
            className="h-96 w-full rounded-2xl overflow-hidden"
            onMarkerClick={(markerId) => {
              const place = places.find(p => p.id === markerId);
              if (place) onSelectPlace(place);
            }}
          />
        </div>
      </section>

      {/* 8. WHY TRAVELERS CHOOSE YEANA STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center border border-slate-800 shadow-xl">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-brand-400 font-mono">64</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Districts Covered</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-sky-400 font-mono">450+</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Scenic Destinations</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">620+</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Verified Hotels</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">100%</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Offline Ready</p>
          </div>
        </div>
      </section>

    </div>
  );
};
