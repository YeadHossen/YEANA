import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Compass, 
  Filter, 
  Sparkles, 
  MapPin, 
  X,
  Mountain,
  Waves,
  TreePine,
  Building2,
  Landmark,
  Star
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { Place, Division } from '../types';
import { PlaceCard } from '../components/common/PlaceCard';
import { useLanguage } from '../context/LanguageContext';

interface PlacesViewProps {
  onSelectPlace: (place: Place) => void;
  onAddToTrip: (place: Place) => void;
  initialSearch?: string;
}

export const PlacesView: React.FC<PlacesViewProps> = ({
  onSelectPlace,
  onAddToTrip,
  initialSearch = ''
}) => {
  const { t, language } = useLanguage();
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');

  useEffect(() => {
    async function loadPlaces() {
      const data = await DataService.getPlaces();
      setPlaces(data);
    }
    loadPlaces();
  }, []);

  const categories = [
    'All',
    'Nature',
    'Hill',
    'Beach',
    'Forest',
    'Waterfall',
    'Tea Garden',
    'Heritage'
  ];

  const getCategoryEmoji = (cat: string) => {
    switch (cat) {
      case 'Hill': return '🏔️';
      case 'Beach': return '🏖️';
      case 'Forest': return '🌲';
      case 'Waterfall': return '🌊';
      case 'Tea Garden': return '🍃';
      case 'Heritage': return '🏛️';
      case 'Nature': return '🌿';
      default: return '✨';
    }
  };

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

  const filteredPlaces = places.filter(place => {
    const matchesSearch = !searchQuery.trim() || 
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (place.district_name && place.district_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (place.name_bn && place.name_bn.includes(searchQuery)) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.short_description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;
    const matchesDivision = selectedDivision === 'All' || place.division === selectedDivision;

    return matchesSearch && matchesCategory && matchesDivision;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      
      {/* Visual Panoramic Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 sm:p-10 text-white shadow-elevated">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
            <Compass className="w-3.5 h-3.5" />
            <span>64 Districts Verified • Scenic & Heritage Tourism</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading">
            {language === 'bn' ? 'সোনার বাংলার অপরূপ দর্শনীয় স্থান' : 'Explore Beautiful Bangladesh'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {language === 'bn' 
              ? 'সাজেকের মেঘের ভেলা থেকে কক্সবাজারের সমুদ্রসৈকত, শ্রীমঙ্গলের সবুজ চা বাগান থেকে সুন্দরবনের ম্যানগ্রোভ অরণ্য—সবকিছু এক প্ল্যাটফর্মে।' 
              : 'From cloud-capped hilltops in Sajek and the unbroken sea beach of Cox’s Bazar to rolling emerald tea estates and ancient archaeological heritage.'}
          </p>

          {/* Quick Category Summary Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block font-black text-sm text-emerald-400">🏔️ Sajek & Hills</span>
              <span className="text-[10px] text-slate-300">Cloud Peaks & Valleys</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block font-black text-sm text-sky-400">🏖️ 120km Beach</span>
              <span className="text-[10px] text-slate-300">Cox's Bazar & Kuakata</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block font-black text-sm text-green-400">🍃 Tea Estates</span>
              <span className="text-[10px] text-slate-300">Sreemangal & Sylhet</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block font-black text-sm text-amber-400">🏛️ UNESCO Heritage</span>
              <span className="text-[10px] text-slate-300">Sundarbans, Bagerhat</span>
            </div>
          </div>
        </div>

        <div className="absolute right-[-30px] bottom-[-30px] opacity-10 pointer-events-none">
          <Compass className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card space-y-4">
        
        {/* Search input and Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places by name, district, or location..."
              className="w-full pl-10 pr-9 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-bold text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="rating">Top Rated ⭐</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-2.5 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 active:scale-95 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-black'
                    : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                }`}
              >
                <span>{getCategoryEmoji(cat)}</span>
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Division Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {divisions.map(div => {
              const divCount = div === 'All' 
                ? places.length 
                : places.filter(p => p.division === div).length;
              return (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all flex items-center gap-1 active:scale-95 ${
                    selectedDivision === div
                      ? 'bg-slate-900 text-white font-black shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70'
                  }`}
                >
                  <span>{div === 'All' ? 'All Divisions' : `${div}`}</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                    selectedDivision === div ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'
                  }`}>
                    {divCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Places Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
        <span>Showing <strong className="text-slate-900">{filteredPlaces.length}</strong> beautiful destinations</span>
        {(selectedCategory !== 'All' || selectedDivision !== 'All' || searchQuery) && (
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedDivision('All'); }}
            className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Places Grid */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map(place => (
            <PlaceCard
              key={place.id}
              place={place}
              onSelect={onSelectPlace}
              onAddToTrip={onAddToTrip}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-card space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Compass className="w-8 h-8 animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">No destinations found</h3>
            <p className="text-xs text-slate-500">Try adjusting your category, division, or search query.</p>
          </div>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedDivision('All'); }}
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md shadow-emerald-700/20 transition-all active:scale-95"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
