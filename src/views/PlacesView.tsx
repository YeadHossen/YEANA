import React, { useState, useEffect } from 'react';
import { Search, Compass, Filter, Sparkles, MapPin } from 'lucide-react';
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
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-700">
          <Compass className="w-4 h-4 text-brand-600" />
          <span>Scenic & Heritage Tourism</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
          Beautiful Places in Bangladesh
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          From the cloud-capped peaks of Sajek to the mangrove trails of Sundarbans and the rolling tea hills of Sylhet.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card space-y-4">
        
        {/* Search input and Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places by name, district, or location..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-semibold text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:outline-none"
            >
              <option value="rating">Top Rated ⭐</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Division Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {divisions.map(div => (
              <button
                key={div}
                onClick={() => setSelectedDivision(div)}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                  selectedDivision === div
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {div === 'All' ? 'All Divisions' : `${div}`}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Places Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Showing {filteredPlaces.length} beautiful destinations</span>
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
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Compass className="w-10 h-10 text-slate-400 mx-auto animate-spin" />
          <h3 className="text-base font-bold text-slate-800">No destinations found</h3>
          <p className="text-xs text-slate-500">Try adjusting your category or search query.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedDivision('All'); }}
            className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
