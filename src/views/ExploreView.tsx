import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Compass, 
  Hotel as HotelIcon, 
  Utensils, 
  Bus, 
  ShoppingBag, 
  Car, 
  Calendar, 
  ArrowLeft, 
  Star, 
  Sparkles,
  Phone,
  ArrowRight
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { District, Place, Hotel, Restaurant, TransportRoute, ShoppingPlace, Ride, Division } from '../types';
import { PlaceCard } from '../components/common/PlaceCard';
import { HotelCard } from '../components/common/HotelCard';
import { RestaurantCard } from '../components/common/RestaurantCard';
import { useLanguage } from '../context/LanguageContext';
import { generateRoutesBetween, getLocationByNameOrId } from '../services/transportService';

interface ExploreViewProps {
  onSelectPlace: (place: Place) => void;
  onSelectHotel: (hotel: Hotel) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onAddToTrip: (place: Place) => void;
  initialDistrictId?: string;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onSelectPlace,
  onSelectHotel,
  onSelectRestaurant,
  onAddToTrip,
  initialDistrictId
}) => {
  const { t, language } = useLanguage();
  const [districts, setDistricts] = useState<District[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [transports, setTransports] = useState<TransportRoute[]>([]);
  const [shopping, setShopping] = useState<ShoppingPlace[]>([]);
  const [rides, setRides] = useState<Ride[]>([]);

  const [districtSearch, setDistrictSearch] = useState<string>('');
  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [activeDistrictTab, setActiveDistrictTab] = useState<'places' | 'hotels' | 'food' | 'shopping' | 'ride' | 'transport'>('places');

  useEffect(() => {
    async function loadData() {
      const [d, p, h, r, tr, s, rd] = await Promise.all([
        DataService.getDistricts(),
        DataService.getPlaces(),
        DataService.getHotels(),
        DataService.getRestaurants(),
        DataService.getTransports(),
        DataService.getShopping(),
        DataService.getRides()
      ]);
      setDistricts(d);
      setPlaces(p);
      setHotels(h);
      setRestaurants(r);
      setTransports(tr);
      setShopping(s);
      setRides(rd);

      if (initialDistrictId) {
        const found = d.find(item => item.id === initialDistrictId);
        if (found) setSelectedDistrict(found);
      }
    }
    loadData();
  }, [initialDistrictId]);

  const divisions: (string | Division)[] = [
    'All',
    'Dhaka',
    'Chattogram',
    'Khulna',
    'Rajshahi',
    'Rangpur',
    'Barishal',
    'Sylhet',
    'Mymensingh'
  ];

  const filteredDistricts = districts.filter(d => {
    const matchesDiv = selectedDivision === 'All' || d.division === selectedDivision;
    const matchesSearch = !districtSearch.trim() || 
      d.name.toLowerCase().includes(districtSearch.toLowerCase()) ||
      d.name_bn.includes(districtSearch) ||
      d.description.toLowerCase().includes(districtSearch.toLowerCase());
    return matchesDiv && matchesSearch;
  });

  // When a district is selected, filter its contents
  const districtPlaces = selectedDistrict 
    ? places.filter(p => p.district_id === selectedDistrict.id)
    : [];

  const districtHotels = selectedDistrict
    ? hotels.filter(h => h.district_id === selectedDistrict.id)
    : [];

  const districtRestaurants = selectedDistrict
    ? restaurants.filter(r => r.district_id === selectedDistrict.id)
    : [];

  const districtShopping = selectedDistrict
    ? shopping.filter(s => s.district_id === selectedDistrict.id)
    : [];

  const districtRides = selectedDistrict
    ? rides.filter(rd => rd.district_id === selectedDistrict.id)
    : [];

  const districtTransports = React.useMemo(() => {
    if (!selectedDistrict) return [];
    const direct = transports.filter(tr => 
      tr.from_district.toLowerCase().includes(selectedDistrict.name.toLowerCase()) ||
      tr.to_district.toLowerCase().includes(selectedDistrict.name.toLowerCase()) ||
      selectedDistrict.name.toLowerCase().includes(tr.to_district.toLowerCase())
    );
    if (direct.length > 0) return direct;

    const fromLoc = getLocationByNameOrId('dhaka');
    const toLoc = getLocationByNameOrId(selectedDistrict.id) || getLocationByNameOrId(selectedDistrict.name);
    if (fromLoc && toLoc) {
      return generateRoutesBetween(fromLoc, toLoc, transports).routes;
    }
    return direct;
  }, [selectedDistrict, transports]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      
      {/* If No District Selected: SHOW DISTRICTS BROWSER */}
      {!selectedDistrict ? (
        <div className="space-y-8">
          
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-700">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span>Explore Bangladesh by Division & District</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
              All 64 Districts of Bangladesh
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              Explore scenic districts across all 8 administrative divisions. Select any district to view its tourist spots, hotels, local cuisine, transport routes, and vehicle rentals.
            </p>
          </div>

          {/* Search & Division Filter Controls */}
          <div className="space-y-4">
            {/* Live Search Input */}
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="🔍 Search any district (e.g. Cox's Bazar, Bogura, Panchagarh, Dinajpur)..."
                value={districtSearch}
                onChange={(e) => setDistrictSearch(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
              {districtSearch && (
                <button
                  onClick={() => setDistrictSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold px-1.5 py-0.5 rounded-full"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Division Tabs with Counts */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {divisions.map(div => {
                const count = div === 'All' 
                  ? districts.length 
                  : districts.filter(d => d.division === div).length;

                return (
                  <button
                    key={div}
                    onClick={() => setSelectedDivision(div)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedDivision === div 
                        ? 'bg-brand-600 text-white shadow-md shadow-brand-700/20' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{div === 'All' ? 'All Bangladesh' : `${div} Division`}</span>
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                      selectedDivision === div ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Counter Summary */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Showing <strong>{filteredDistricts.length}</strong> of <strong>{districts.length}</strong> Districts</span>
              {districtSearch && <span>Filtered by search: "{districtSearch}"</span>}
            </div>
          </div>

          {/* Districts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDistricts.map(dist => {
              const placeCount = places.filter(p => p.district_id === dist.id).length;
              const hotelCount = hotels.filter(h => h.district_id === dist.id).length;

              return (
                <div
                  key={dist.id}
                  onClick={() => setSelectedDistrict(dist)}
                  className="group bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                    <img
                      src={dist.image_url}
                      alt={dist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/90 backdrop-blur-md text-brand-900 shadow-xs">
                        {dist.division} Division
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-lg font-black font-sans leading-snug">
                        {language === 'bn' && dist.name_bn ? dist.name_bn : dist.name}
                      </h3>
                      <p className="text-[11px] text-slate-300 font-medium">
                        🗓️ {dist.popular_season}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {dist.description}
                    </p>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 text-slate-600 font-medium">
                        <span className="flex items-center gap-1">
                          <Compass className="w-3.5 h-3.5 text-teal-600" /> {placeCount || 3}+ spots
                        </span>
                        <span className="flex items-center gap-1">
                          <HotelIcon className="w-3.5 h-3.5 text-sky-600" /> {hotelCount || 2}+ hotels
                        </span>
                      </div>

                      <span className="font-bold text-brand-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Explore <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      ) : (
        /* IF DISTRICT SELECTED: SHOW DISTRICT TRAVEL HUB */
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Back button */}
          <button
            onClick={() => setSelectedDistrict(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-700 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Districts</span>
          </button>

          {/* District Banner Card */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[260px] flex flex-col justify-end p-6 sm:p-10 shadow-xl">
            <img
              src={selectedDistrict.image_url}
              alt={selectedDistrict.name}
              className="absolute inset-0 w-full h-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

            <div className="relative z-10 max-w-3xl space-y-2">
              <span className="px-3 py-1 rounded-full bg-brand-500/30 text-brand-300 border border-brand-400/40 text-xs font-bold backdrop-blur-md">
                {selectedDistrict.division} Division, Bangladesh
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-sans">
                {selectedDistrict.name} {selectedDistrict.name_bn ? `(${selectedDistrict.name_bn})` : ''}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
                {selectedDistrict.description}
              </p>
              <p className="text-xs text-brand-300 font-semibold pt-1">
                🌟 Best Season to Visit: <span className="text-white font-normal">{selectedDistrict.popular_season}</span>
              </p>
            </div>
          </div>

          {/* District Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
            {[
              { id: 'places', label: `Places (${districtPlaces.length})`, icon: Compass },
              { id: 'hotels', label: `Hotels (${districtHotels.length})`, icon: HotelIcon },
              { id: 'food', label: `Food & Cafés (${districtRestaurants.length})`, icon: Utensils },
              { id: 'transport', label: `Transport Routes (${districtTransports.length})`, icon: Bus },
              { id: 'shopping', label: `Shopping (${districtShopping.length})`, icon: ShoppingBag },
              { id: 'ride', label: `Vehicle Rentals (${districtRides.length})`, icon: Car },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeDistrictTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDistrictTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                    isActive 
                      ? 'bg-brand-600 text-white shadow-sm' 
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[300px]">
            
            {/* 1. PLACES TAB */}
            {activeDistrictTab === 'places' && (
              <div className="space-y-4">
                {districtPlaces.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {districtPlaces.map(place => (
                      <PlaceCard
                        key={place.id}
                        place={place}
                        onSelect={onSelectPlace}
                        onAddToTrip={onAddToTrip}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-2">
                    <Compass className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-700">No places listed yet for this district</p>
                    <p className="text-xs text-slate-500">More verified tourist spots are being added weekly.</p>
                  </div>
                )}
              </div>
            )}

            {/* 2. HOTELS TAB */}
            {activeDistrictTab === 'hotels' && (
              <div className="space-y-4">
                {districtHotels.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {districtHotels.map(hotel => (
                      <HotelCard
                        key={hotel.id}
                        hotel={hotel}
                        onSelect={onSelectHotel}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-2">
                    <HotelIcon className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-700">No hotels listed yet for this district</p>
                  </div>
                )}
              </div>
            )}

            {/* 3. FOOD TAB */}
            {activeDistrictTab === 'food' && (
              <div className="space-y-4">
                {districtRestaurants.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {districtRestaurants.map(rest => (
                      <RestaurantCard
                        key={rest.id}
                        restaurant={rest}
                        onSelect={onSelectRestaurant}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-2">
                    <Utensils className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-700">No restaurants listed yet for this district</p>
                  </div>
                )}
              </div>
            )}

            {/* 4. TRANSPORT TAB */}
            {activeDistrictTab === 'transport' && (
              <div className="space-y-4">
                {districtTransports.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {districtTransports.map(tr => (
                      <div key={tr.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                              {tr.transport_type}
                            </span>
                            <h4 className="text-base font-bold text-slate-900 mt-1">{tr.company}</h4>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-black text-emerald-700">৳{tr.price_min} - ৳{tr.price_max}</span>
                            <p className="text-[10px] text-slate-400">est. fare</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center text-xs">
                          <div>
                            <p className="text-[10px] text-slate-400 font-semibold">Route</p>
                            <p className="font-bold text-slate-800 truncate">{tr.from_district} ➔ {tr.to_district}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-semibold">Duration</p>
                            <p className="font-bold text-slate-800">{tr.duration}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-semibold">Timing</p>
                            <p className="font-bold text-slate-800 truncate">{tr.departure_time.split('/')[0]}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-2">
                    <Bus className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-700">Check regular inter-district bus and train stations</p>
                  </div>
                )}
              </div>
            )}

            {/* 5. SHOPPING TAB */}
            {activeDistrictTab === 'shopping' && (
              <div className="space-y-4">
                {districtShopping.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {districtShopping.map(shop => (
                      <div key={shop.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card p-5 space-y-3">
                        <img src={shop.image_url} alt="" className="w-full h-40 object-cover rounded-xl" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                            {shop.category}
                          </span>
                          <h4 className="text-base font-bold text-slate-900 mt-1">{shop.name}</h4>
                          <p className="text-xs text-slate-500 mt-1">📍 {shop.location}</p>
                        </div>
                        <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl leading-relaxed">
                          <span className="font-bold text-purple-900">Famous For:</span> {shop.famous_for}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-2">
                    <ShoppingBag className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-700">Explore local municipal bazaars and handicrafts</p>
                  </div>
                )}
              </div>
            )}

            {/* 6. RIDE TAB */}
            {activeDistrictTab === 'ride' && (
              <div className="space-y-4">
                {districtRides.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {districtRides.map(rd => (
                      <div key={rd.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card p-5 space-y-3">
                        <img src={rd.image_url} alt="" className="w-full h-40 object-cover rounded-xl" />
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                              {rd.vehicle_type} • {rd.rental_type}
                            </span>
                            <h4 className="text-base font-bold text-slate-900 mt-1">{rd.model}</h4>
                            <p className="text-xs text-slate-500">📍 {rd.location}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-black text-slate-900">৳{rd.price_per_day}</span>
                            <p className="text-[10px] text-slate-400">per day</p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs text-slate-600 font-medium">Host: {rd.owner_name}</span>
                          <a
                            href={`tel:${rd.contact_phone}`}
                            className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                          >
                            <Phone className="w-3.5 h-3.5" /> Call
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-2">
                    <Car className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-700">Local CNGs, Auto-rickshaws, and Rent-a-car available on arrival</p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
