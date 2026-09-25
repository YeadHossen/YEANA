import React, { useState, useEffect } from 'react';
import { Search, Utensils, Star, MapPin, Phone, Clock, Filter, X, Sparkles } from 'lucide-react';
import { DataService } from '../services/dataService';
import { Restaurant, District } from '../types';
import { RestaurantCard } from '../components/common/RestaurantCard';
import { useLanguage } from '../context/LanguageContext';

interface FoodViewProps {
  onSelectRestaurant?: (restaurant: Restaurant) => void;
}

export const FoodView: React.FC<FoodViewProps> = ({ onSelectRestaurant }) => {
  const { t, language } = useLanguage();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [selectedRestModal, setSelectedRestModal] = useState<Restaurant | null>(null);

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
    { id: 'All', label: 'All Cuisines', emoji: '🍽️' },
    { id: 'Traditional Bengali', label: 'Traditional Bengali', emoji: '🍛' },
    { id: 'Coastal Seafood', label: 'Coastal Seafood', emoji: '🐟' },
    { id: 'Mughal Kebab', label: 'Mughal Kebab', emoji: '🍢' },
    { id: 'Indigenous Bamboo', label: 'Indigenous Bamboo', emoji: '🎋' },
    { id: 'Biryani', label: 'Biryani & Kacchi', emoji: '🍚' }
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

  const handleOpenRestaurantModal = (rest: Restaurant) => {
    setSelectedRestModal(rest);
    if (onSelectRestaurant) {
      onSelectRestaurant(rest);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      
      {/* Visual Panoramic Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-6 sm:p-10 text-white shadow-elevated">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-500/30">
            <Utensils className="w-3.5 h-3.5" />
            <span>Culinary Heritage of Bangladesh</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading">
            {language === 'bn' ? 'ঐতিহ্যবাহী খাবার ও রেস্তোরাঁ' : 'Iconic Flavors, Eateries & Cafés'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {language === 'bn' 
              ? 'সিলেটের ৩০+ রকমের ভর্তা, কক্সবাজারের তাজা রূপচাঁদা ফ্রাই, পুরান ঢাকার কাচ্চি থেকে পাহাড়ি বাঁশের চুলায় রান্না—সব স্বাদের সন্ধান।' 
              : 'From 30+ varieties of village Bhartas and fresh fried Rupchanda on the coastline to authentic Old Dhaka Shahi Kacchi Biryani and indigenous bamboo delicacies.'}
          </p>

          {/* Quick Cuisine Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block font-black text-sm text-amber-400">🍛 Authentic Bharta</span>
              <span className="text-[10px] text-slate-300">30+ Local Varieties</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block font-black text-sm text-sky-400">🐟 Fresh Sea Catch</span>
              <span className="text-[10px] text-slate-300">Rupchanda & Coral</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block font-black text-sm text-orange-400">🍚 Shahi Kacchi</span>
              <span className="text-[10px] text-slate-300">Old Dhaka Heritage</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block font-black text-sm text-emerald-400">🎋 Bamboo Chicken</span>
              <span className="text-[10px] text-slate-300">Indigenous Hills</span>
            </div>
          </div>
        </div>

        <div className="absolute right-[-30px] bottom-[-30px] opacity-10 pointer-events-none">
          <Utensils className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. 'Duck Bhuna', 'Kacchi', 'Bhartas', 'Seafood')..."
              className="w-full pl-10 pr-9 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
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

          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="All">All 64 Districts (সকল জেলা)</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.name_bn})</option>
              ))}
            </select>
          </div>

        </div>

        {/* Cuisine Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-100 pt-3 scrollbar-none">
          {cuisines.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCuisine(c.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 active:scale-95 ${
                selectedCuisine === c.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                  : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
              }`}
            >
              <span>{c.emoji}</span>
              <span>{c.label}</span>
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
              onSelect={handleOpenRestaurantModal}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-card space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Utensils className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">No restaurants match this search</h3>
            <p className="text-xs text-slate-500">Try choosing All Cuisines or search for general dishes.</p>
          </div>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCuisine('All'); setSelectedDistrict('All'); }}
            className="px-5 py-2.5 rounded-2xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 shadow-md shadow-amber-500/20 transition-all active:scale-95"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Restaurant Detail Modal */}
      {selectedRestModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-extrabold uppercase">
                  {selectedRestModal.cuisine} • {selectedRestModal.price_tier}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1 font-heading">
                  {language === 'bn' && selectedRestModal.name_bn ? selectedRestModal.name_bn : selectedRestModal.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{selectedRestModal.address || selectedRestModal.location}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedRestModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={selectedRestModal.image_url}
                alt={selectedRestModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 bg-amber-50/60 p-4 rounded-2xl border border-amber-100 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-bold">Rating Score:</span>
                <div className="flex items-center gap-1 text-amber-950 font-black text-base">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{selectedRestModal.rating} / 5.0</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 font-bold">Operating Hours:</span>
                <div className="flex items-center gap-1 text-slate-800 font-bold text-xs mt-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{selectedRestModal.opening_hours || '11:00 AM - 11:00 PM'}</span>
                </div>
              </div>
            </div>

            {selectedRestModal.menu_highlights && selectedRestModal.menu_highlights.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Must-Try Specialty Dishes:
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedRestModal.menu_highlights.map((dish, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>🍽️ {dish}</span>
                      <span className="text-amber-700 font-extrabold bg-amber-100 px-2 py-0.5 rounded">Chef Recommended</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
              <a
                href={`tel:${selectedRestModal.phone}`}
                className="flex-1 px-4 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Call for Table Reservation ({selectedRestModal.phone})</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
