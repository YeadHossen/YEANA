import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  MapPin, 
  Compass, 
  Hotel, 
  Utensils, 
  Bus, 
  ShoppingBag, 
  Car, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  Layers,
  Heart,
  UserCheck
} from 'lucide-react';
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
  const isYeanaBrandSearch = cleanQuery === 'yeana' || 
                            cleanQuery === 'yeana app' || 
                            cleanQuery === 'yean' || 
                            cleanQuery === 'iana' || 
                            cleanQuery === 'app' || 
                            cleanQuery === 'website' ||
                            cleanQuery === 'about yeana';

  // Filter Districts
  const filteredDistricts = cleanQuery
    ? districts.filter(d => 
        d.name.toLowerCase().includes(cleanQuery) || 
        d.name_bn.includes(cleanQuery) ||
        d.division.toLowerCase().includes(cleanQuery)
      )
    : [];

  // Filter Places
  const filteredPlaces = cleanQuery
    ? places.filter(p => 
        p.name.toLowerCase().includes(cleanQuery) || 
        (p.name_bn && p.name_bn.includes(cleanQuery)) ||
        p.location.toLowerCase().includes(cleanQuery) ||
        p.short_description.toLowerCase().includes(cleanQuery) ||
        p.category.toLowerCase().includes(cleanQuery)
      )
    : places.slice(0, 3);

  // Filter Hotels
  const filteredHotels = cleanQuery
    ? hotels.filter(h => 
        h.name.toLowerCase().includes(cleanQuery) || 
        h.location.toLowerCase().includes(cleanQuery)
      )
    : hotels.slice(0, 2);

  // Filter Restaurants
  const filteredRestaurants = cleanQuery
    ? restaurants.filter(r => 
        r.name.toLowerCase().includes(cleanQuery) || 
        r.cuisine.toLowerCase().includes(cleanQuery) ||
        r.location.toLowerCase().includes(cleanQuery)
      )
    : restaurants.slice(0, 2);

  // Filter Transports
  const filteredTransports = cleanQuery
    ? transports.filter(t => 
        t.from_district.toLowerCase().includes(cleanQuery) ||
        t.to_district.toLowerCase().includes(cleanQuery) ||
        t.company.toLowerCase().includes(cleanQuery)
      )
    : [];

  const totalResults = (cleanQuery 
    ? (isYeanaBrandSearch ? 1 : 0) + filteredDistricts.length + filteredPlaces.length + filteredHotels.length + filteredRestaurants.length + filteredTransports.length 
    : 0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Search Dialog Card */}
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 'YEANA', 'Sylhet', 'Cox's Bazar', 'Inter-district Transport'..."
            className="w-full bg-transparent border-none text-base sm:text-lg font-bold text-slate-800 placeholder-slate-400 focus:outline-none"
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
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 text-xs font-bold"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!cleanQuery && (
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
            <span className="text-slate-400 font-semibold shrink-0">Popular:</span>
            {['YEANA', 'Cox\'s Bazar', 'Sylhet', 'Sajek', 'Transport Hub', 'Kacchi Biryani', 'Green Line'].map(pill => (
              <button
                key={pill}
                onClick={() => setQuery(pill)}
                className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 font-bold shrink-0 shadow-2xs transition-all"
              >
                {pill}
              </button>
            ))}
          </div>
        )}

        {/* Results Container */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-6 flex-1">
          
          {/* SPECIAL: YEANA BRAND & PLATFORM CARD (Shown on "YEANA" or brand queries) */}
          {isYeanaBrandSearch && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white shadow-lg space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-400/30">
                    <Sparkles className="w-3 h-3" />
                    <span>Official Application & Portal</span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight">
                    YEANA — Explore More. Enjoy Life.
                  </h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed max-w-xl">
                    YEANA is Bangladesh's premier all-in-one travel, tourism, and lifestyle platform. Explore 64 districts, verify inter-district transport, book top hotels, savor traditional cuisine, and create unforgettable trip itineraries.
                  </p>
                </div>
              </div>

              {/* Quick Navigation Links */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-800/60">
                <button
                  onClick={() => { onNavigateTab('explore'); onClose(); }}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <Compass className="w-4 h-4 text-emerald-300" />
                  <span>64 Districts</span>
                </button>
                <button
                  onClick={() => { onNavigateTab('transport'); onClose(); }}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <Bus className="w-4 h-4 text-emerald-300" />
                  <span>Transport</span>
                </button>
                <button
                  onClick={() => { onNavigateTab('hotels'); onClose(); }}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <Hotel className="w-4 h-4 text-emerald-300" />
                  <span>Hotels</span>
                </button>
                <button
                  onClick={() => { onNavigateTab('trips'); onClose(); }}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4 text-emerald-300" />
                  <span>Trip Planner</span>
                </button>
              </div>
            </div>
          )}

          {/* Districts Results */}
          {filteredDistricts.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Districts & Divisions ({filteredDistricts.length})
                </span>
                <button 
                  onClick={() => { onNavigateTab('explore'); onClose(); }}
                  className="text-xs font-semibold text-emerald-600 hover:underline"
                >
                  View all districts
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredDistricts.map(d => (
                  <div
                    key={d.id}
                    onClick={() => { onNavigateTab('explore'); onClose(); }}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img src={d.image_url} alt="" className="w-11 h-11 rounded-xl object-cover" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                        {d.name} <span className="text-slate-400 font-normal text-xs">({d.name_bn})</span>
                      </p>
                      <p className="text-xs text-slate-500">{d.division} Division</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Places Results */}
          {filteredPlaces.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Tourist Spots ({filteredPlaces.length})
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
                  <Hotel className="w-3.5 h-3.5" /> Hotels & Resorts ({filteredHotels.length})
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
              <p className="text-xs text-slate-500">Try searching for "YEANA", "Sylhet", "Cox's Bazar", "Sajek", "Hotel", or "Transport".</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-5">
          <span>YEANA — Travel & Lifestyle Bangladesh</span>
          <span className="font-semibold text-emerald-700">64 Districts • 100+ Attractions</span>
        </div>

      </div>

    </div>
  );
};
