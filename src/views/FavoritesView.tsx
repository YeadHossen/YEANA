import React, { useState } from 'react';
import { Heart, Compass, Hotel as HotelIcon, Utensils, ShoppingBag, Car, Download, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { PlaceCard } from '../components/common/PlaceCard';
import { HotelCard } from '../components/common/HotelCard';
import { RestaurantCard } from '../components/common/RestaurantCard';
import { Place, Hotel, Restaurant, FavoriteType } from '../types';

interface FavoritesViewProps {
  onSelectPlace: (place: Place) => void;
  onSelectHotel: (hotel: Hotel) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onAddToTrip: (place: Place) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  onSelectPlace,
  onSelectHotel,
  onSelectRestaurant,
  onAddToTrip
}) => {
  const { t } = useLanguage();
  const { favorites, removeFavorite, clearAllFavorites, downloadOfflinePackage, isOfflineReady } = useFavorites();
  const [activeTab, setActiveTab] = useState<FavoriteType | 'all'>('all');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const places = favorites.filter(f => f.item_type === 'place').map(f => f.item_data as Place);
  const hotels = favorites.filter(f => f.item_type === 'hotel').map(f => f.item_data as Hotel);
  const restaurants = favorites.filter(f => f.item_type === 'restaurant').map(f => f.item_data as Restaurant);
  const shoppingItems = favorites.filter(f => f.item_type === 'shopping' || f.item_type === 'specialty');

  const handleDownload = () => {
    downloadOfflinePackage();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-20">
      
      {/* Header & Offline Action */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-700">
            <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
            <span>Saved Bookmarks & Offline Cache</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
            My Saved Favorites
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            Your saved destinations, hotels, dining spots, and vehicle hosts stored locally on your device for instant offline access during your travels.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={handleDownload}
            className="px-4 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-700/20 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{downloadSuccess ? 'Offline Guide Ready ✓' : 'Cache Offline Guide'}</span>
          </button>

          {favorites.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Clear all saved favorites?')) clearAllFavorites();
              }}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
              title="Clear all favorites"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Offline Ready Status Banner */}
      <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-between text-xs text-teal-900">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
          <span>
            {isOfflineReady 
              ? 'Offline mode active: All your bookmarks and Bangladesh guide data are stored on this device.'
              : 'Tip: Tap "Cache Offline Guide" to browse your saved spots without mobile data.'}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'all', label: `All Saved (${favorites.length})` },
          { id: 'place', label: `Places (${places.length})`, icon: Compass },
          { id: 'hotel', label: `Hotels (${hotels.length})`, icon: HotelIcon },
          { id: 'restaurant', label: `Food (${restaurants.length})`, icon: Utensils },
          { id: 'shopping', label: `Shopping & Crafts (${shoppingItems.length})`, icon: ShoppingBag },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {favorites.length > 0 ? (
        <div className="space-y-10">
          
          {/* Places Section */}
          {(activeTab === 'all' || activeTab === 'place') && places.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-sans flex items-center gap-2">
                <Compass className="w-5 h-5 text-brand-600" />
                <span>Saved Places ({places.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {places.map(place => (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    onSelect={onSelectPlace}
                    onAddToTrip={onAddToTrip}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Hotels Section */}
          {(activeTab === 'all' || activeTab === 'hotel') && hotels.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-sans flex items-center gap-2">
                <HotelIcon className="w-5 h-5 text-sky-600" />
                <span>Saved Hotels ({hotels.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {hotels.map(hotel => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    onSelect={onSelectHotel}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Restaurants Section */}
          {(activeTab === 'all' || activeTab === 'restaurant') && restaurants.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-sans flex items-center gap-2">
                <Utensils className="w-5 h-5 text-amber-600" />
                <span>Saved Restaurants ({restaurants.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {restaurants.map(rest => (
                  <RestaurantCard
                    key={rest.id}
                    restaurant={rest}
                    onSelect={onSelectRestaurant}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Shopping & Specialties Section */}
          {(activeTab === 'all' || activeTab === 'shopping' || (activeTab as string) === 'specialty') && shoppingItems.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-sans flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-purple-600" />
                <span>Saved Shopping & Local Specialties ({shoppingItems.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shoppingItems.map(item => {
                  const data = item.item_data as any;
                  return (
                    <div key={item.id} className="bg-white rounded-3xl border border-slate-200 shadow-card p-5 space-y-3">
                      {data.image_url && (
                        <img src={data.image_url} alt="" className="w-full h-40 object-cover rounded-2xl" />
                      )}
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800">
                            {data.category || 'Specialty'}
                          </span>
                          {data.is_gi_tagged && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-white">
                              ★ GI Tagged
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mt-2">{data.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">📍 {data.district_name || data.location || 'Bangladesh'}</p>
                      </div>
                      <p className="text-xs text-slate-600 bg-purple-50/50 p-3 rounded-2xl border border-purple-100 leading-relaxed">
                        {data.origin_story || data.famous_for || 'Authentic local treasure of Bangladesh.'}
                      </p>
                      {data.price_range && (
                        <div className="text-xs font-bold text-slate-700 flex justify-between items-center pt-2 border-t border-slate-100">
                          <span>Price Range:</span>
                          <span className="text-purple-700 font-black">{data.price_range}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Heart className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">Your Favorites List is Empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the heart icon on any place, hotel, or food spot to save it for your next trip to Bangladesh.
          </p>
        </div>
      )}

    </div>
  );
};
