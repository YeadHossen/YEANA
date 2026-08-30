import React, { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, Clock, Sparkles, Search, Tag, Heart } from 'lucide-react';
import { DataService } from '../services/dataService';
import { ShoppingPlace, District } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';

export const ShoppingView: React.FC = () => {
  const { t, language } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [shopping, setShopping] = useState<ShoppingPlace[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');

  useEffect(() => {
    async function loadData() {
      const [s, d] = await Promise.all([
        DataService.getShopping(),
        DataService.getDistricts()
      ]);
      setShopping(s);
      setDistricts(d);
    }
    loadData();
  }, []);

  const filteredShopping = shopping.filter(shop => {
    const matchesSearch = !searchQuery.trim() ||
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.famous_for.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDistrict = selectedDistrict === 'All' || shop.district_id === selectedDistrict;

    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-purple-700">
          <ShoppingBag className="w-4 h-4 text-purple-600" />
          <span>Local Crafts & Souvenirs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
          Shopping, Traditional Crafts & Markets
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          Discover authentic Manipuri shawls in Sylhet, Burmese pickles & pearls in Cox's Bazar, Rajshahi pure silks, and artisan handicrafts across Bangladesh.
        </p>
      </div>

      {/* Filter and Search Container */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search local products (e.g. 'Manipuri Shawl', 'Pickles', 'Tea', 'Nakshi Kantha')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
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
      </div>

      {/* Shopping Cards Grid */}
      {filteredShopping.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShopping.map(shop => {
            const favorited = isFavorite('shopping', shop.id);
            return (
              <div
                key={shop.id}
                className="group bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={shop.image_url}
                    alt={shop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/90 backdrop-blur-md text-purple-900 shadow-xs">
                      {shop.category}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFavorite('shopping', shop.id, shop)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
                      favorited ? 'bg-rose-500 text-white' : 'bg-black/30 text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-300" />
                      {shop.location}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {language === 'bn' && shop.name_bn ? shop.name_bn : shop.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{shop.opening_hours}</span>
                    </div>

                    <div className="mt-3 p-3 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-slate-700 leading-relaxed">
                      <p className="font-bold text-purple-950 flex items-center gap-1 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Specialty Products:
                      </p>
                      <p>{shop.famous_for}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>📍 {shop.address || shop.location}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <ShoppingBag className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No shopping areas found for this filter</h3>
          <p className="text-xs text-slate-500">Try resetting the district filter.</p>
        </div>
      )}

    </div>
  );
};
