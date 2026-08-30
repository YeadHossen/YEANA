import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Compass, Hotel, Utensils, Bus, ShoppingBag, Car, ArrowRight } from 'lucide-react';
import { DataService } from '../../services/dataService';
import { Place, Hotel as HotelType, Restaurant, TransportRoute, ShoppingPlace, Ride, District } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlace: (place: Place) => void;
  onSelectHotel: (hotel: HotelType) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onNavigateTab: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPlace,
  onSelectHotel,
  onSelectRestaurant,
  onNavigateTab
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [transports, setTransports] = useState<TransportRoute[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    async function loadAll() {
      const [p, h, r, t, d] = await Promise.all([
        DataService.getPlaces(),
        DataService.getHotels(),
        DataService.getRestaurants(),
        DataService.getTransports(),
        DataService.getDistricts()
      ]);
      setPlaces(p);
      setHotels(h);
      setRestaurants(r);
      setTransports(t);
      setDistricts(d);
    }
    if (isOpen) {
      loadAll();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredPlaces = cleanQuery
    ? places.filter(p => 
        p.name.toLowerCase().includes(cleanQuery) || 
        p.location.toLowerCase().includes(cleanQuery) ||
        p.short_description.toLowerCase().includes(cleanQuery) ||
        p.category.toLowerCase().includes(cleanQuery)
      )
    : places.slice(0, 3);

  const filteredHotels = cleanQuery
    ? hotels.filter(h => 
        h.name.toLowerCase().includes(cleanQuery) || 
        h.location.toLowerCase().includes(cleanQuery)
      )
    : hotels.slice(0, 2);

  const filteredRestaurants = cleanQuery
    ? restaurants.filter(r => 
        r.name.toLowerCase().includes(cleanQuery) || 
        r.cuisine.toLowerCase().includes(cleanQuery) ||
        r.location.toLowerCase().includes(cleanQuery)
      )
    : restaurants.slice(0, 2);

  const filteredTransports = cleanQuery
    ? transports.filter(t => 
        t.from_district.toLowerCase().includes(cleanQuery) ||
        t.to_district.toLowerCase().includes(cleanQuery) ||
        t.company.toLowerCase().includes(cleanQuery)
      )
    : [];

  const totalResults = (cleanQuery ? filteredPlaces.length + filteredHotels.length + filteredRestaurants.length + filteredTransports.length : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Search Dialog Card */}
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-brand-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 'Sylhet', 'Jaflong', 'Cox's Bazar', 'Kacchi Biryani'..."
            className="w-full bg-transparent border-none text-base sm:text-lg font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 text-xs font-bold"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!cleanQuery && (
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 font-semibold shrink-0">Popular:</span>
            {['Sylhet', 'Cox\'s Bazar', 'Sajek', 'Ratargul', 'Sreemangal', 'Biryani', 'Green Line'].map(pill => (
              <button
                key={pill}
                onClick={() => setQuery(pill)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-brand-500 hover:text-brand-700 font-medium shrink-0 shadow-2xs transition-colors"
              >
                {pill}
              </button>
            ))}
          </div>
        )}

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1">
          
          {/* Places Results */}
          {filteredPlaces.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Places ({filteredPlaces.length})
                </span>
                <button 
                  onClick={() => { onNavigateTab('places'); onClose(); }}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  View all places
                </button>
              </div>

              <div className="space-y-1.5">
                {filteredPlaces.map(place => (
                  <div
                    key={place.id}
                    onClick={() => { onSelectPlace(place); onClose(); }}
                    className="p-3 rounded-2xl hover:bg-brand-50/70 border border-transparent hover:border-brand-200 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={place.image_url} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-brand-700">{place.name}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" /> {place.location}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-700 flex items-center gap-1">
                      ⭐ {place.rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hotels Results */}
          {filteredHotels.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700 flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5" /> Hotels ({filteredHotels.length})
                </span>
                <button 
                  onClick={() => { onNavigateTab('hotels'); onClose(); }}
                  className="text-xs font-semibold text-sky-600 hover:underline"
                >
                  View all hotels
                </button>
              </div>

              <div className="space-y-1.5">
                {filteredHotels.map(hotel => (
                  <div
                    key={hotel.id}
                    onClick={() => { onSelectHotel(hotel); onClose(); }}
                    className="p-3 rounded-2xl hover:bg-sky-50/70 border border-transparent hover:border-sky-200 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={hotel.image_url} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-sky-700">{hotel.name}</p>
                        <p className="text-xs text-slate-500">{hotel.location}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-sky-900 bg-sky-100 px-2 py-0.5 rounded-lg">
                      ৳{hotel.price_per_night}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Food Results */}
          {filteredRestaurants.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" /> Restaurants & Food ({filteredRestaurants.length})
                </span>
                <button 
                  onClick={() => { onNavigateTab('food'); onClose(); }}
                  className="text-xs font-semibold text-amber-600 hover:underline"
                >
                  View all restaurants
                </button>
              </div>

              <div className="space-y-1.5">
                {filteredRestaurants.map(rest => (
                  <div
                    key={rest.id}
                    onClick={() => { onSelectRestaurant(rest); onClose(); }}
                    className="p-3 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-200 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={rest.image_url} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-amber-700">{rest.name}</p>
                        <p className="text-xs text-slate-500">{rest.cuisine} • {rest.location}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-900">
                      {rest.price_tier} ⭐ {rest.rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transport Results */}
          {filteredTransports.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5" /> Transport Routes ({filteredTransports.length})
              </span>

              <div className="space-y-1.5">
                {filteredTransports.map(tr => (
                  <div
                    key={tr.id}
                    onClick={() => { onNavigateTab('transport'); onClose(); }}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-100 hover:border-emerald-200 transition-all cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900">{tr.company}</p>
                      <p className="text-xs text-slate-500">{tr.from_district} ➔ {tr.to_district} ({tr.transport_type})</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-lg">
                      ৳{tr.price_min} - ৳{tr.price_max}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cleanQuery && totalResults === 0 && (
            <div className="text-center py-12 space-y-2">
              <p className="text-base font-bold text-slate-700">No matching destinations or services found</p>
              <p className="text-xs text-slate-500">Try searching for districts like "Sylhet", "Cox's Bazar", "Sajek" or places like "Jaflong".</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
          Search covers all 8 Divisions, 64 Districts, Hotels, Food, Transport & Rentals in Bangladesh.
        </div>

      </div>

    </div>
  );
};
