import React, { useState, useEffect } from 'react';
import { Search, Utensils, Star, MapPin, Phone, Clock, Filter } from 'lucide-react';
import { DataService } from '../services/dataService';
import { Restaurant, District } from '../types';
import { RestaurantCard } from '../components/common/RestaurantCard';
import { useLanguage } from '../context/LanguageContext';

interface FoodViewProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const FoodView: React.FC<FoodViewProps> = ({ onSelectRestaurant }) => {
  const { t, language } = useLanguage();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');

  useEffect(() => {
    async function loadData() {
      const [r, d] = await Promise.all([
        DataService.getRestaurants(),
        DataService.getDistricts()
      ]);
      setRestaurants(r);
      setDistricts(d);
    }
    loadData();
  }, []);

  const cuisines = [
    'All',
    'Traditional Bengali',
    'Coastal Seafood',
    'Mughal Kebab',
    'Indigenous Bamboo',
    'Biryani'
  ];

  const filteredRestaurants = restaurants.filter(rest => {
    const matchesSearch = !searchQuery.trim() ||
      rest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rest.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rest.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDistrict = selectedDistrict === 'All' || rest.district_id === selectedDistrict;
    const matchesCuisine = selectedCuisine === 'All' || rest.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase());

    return matchesSearch && matchesDistrict && matchesCuisine;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-700">
          <Utensils className="w-4 h-4 text-amber-600" />
          <span>Taste of Bangladesh</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
          Iconic Cuisine, Restaurants & Cafés
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          From 30+ varieties of traditional Bhartas in Sylhet, fresh fried Rupchanda in Cox's Bazar, to Old Dhaka Shahi Kacchi Biryani.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. 'Duck Bhuna', 'Kacchi', 'Bhartas', 'Seafood')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:outline-none"
            >
              <option value="All">All Districts</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Cuisine Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-100 pt-3 scrollbar-none">
          {cuisines.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCuisine(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCuisine === c
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

      </div>

      {/* Grid */}
      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map(rest => (
            <RestaurantCard
              key={rest.id}
              restaurant={rest}
              onSelect={onSelectRestaurant}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Utensils className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No restaurants match this search</h3>
          <p className="text-xs text-slate-500">Try choosing All Cuisines or search for general dishes.</p>
        </div>
      )}

    </div>
  );
};
