import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit, 
  Compass, 
  Hotel as HotelIcon, 
  Utensils, 
  Bus, 
  Users, 
  Calendar, 
  CheckCircle2, 
  X,
  Star,
  MapPin,
  DollarSign
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { Place, Hotel, Restaurant, TransportRoute, District, Division } from '../types';
import { useAuth } from '../context/AuthContext';

export const AdminView: React.FC = () => {
  const { isAdmin, loginDemoAdmin } = useAuth();
  const [stats, setStats] = useState<any>({
    totalUsers: 2540,
    totalPlaces: 0,
    totalHotels: 0,
    totalRestaurants: 0,
    totalTransports: 0,
    totalTrips: 0
  });

  const [activeTab, setActiveTab] = useState<'places' | 'hotels' | 'restaurants' | 'transports'>('places');
  const [places, setPlaces] = useState<Place[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [transports, setTransports] = useState<TransportRoute[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  // Modal forms
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // Form states for new Place
  const [placeName, setPlaceName] = useState('');
  const [placeDistrict, setPlaceDistrict] = useState('sylhet');
  const [placeCategory, setPlaceCategory] = useState<'Nature' | 'Hill' | 'Beach' | 'Heritage' | 'Forest' | 'Tea Garden' | 'Waterfall'>('Nature');
  const [placeLocation, setPlaceLocation] = useState('');
  const [placeShortDesc, setPlaceShortDesc] = useState('');
  const [placeImageUrl, setPlaceImageUrl] = useState('');
  const [placeEntryFee, setPlaceEntryFee] = useState('Free');
  const [placeRating, setPlaceRating] = useState(4.8);

  // Form states for new Hotel
  const [hotelName, setHotelName] = useState('');
  const [hotelDistrict, setHotelDistrict] = useState('sylhet');
  const [hotelPrice, setHotelPrice] = useState(3500);
  const [hotelLocation, setHotelLocation] = useState('');
  const [hotelPhone, setHotelPhone] = useState('+880 1700-000000');
  const [hotelImage, setHotelImage] = useState('');

  // Form states for new Restaurant
  const [restName, setRestName] = useState('');
  const [restDistrict, setRestDistrict] = useState('sylhet');
  const [restCuisine, setRestCuisine] = useState('Traditional Bengali');
  const [restLocation, setRestLocation] = useState('');
  const [restPriceTier, setRestPriceTier] = useState<'৳' | '৳৳' | '৳৳৳'>('৳৳');
  const [restImage, setRestImage] = useState('');

  // Form states for new Transport
  const [trType, setTrType] = useState<'Bus' | 'Train' | 'Flight' | 'Car'>('Bus');
  const [trCompany, setTrCompany] = useState('');
  const [trFrom, setTrFrom] = useState('Dhaka');
  const [trTo, setTrTo] = useState('Sylhet');
  const [trDep, setTrDep] = useState('08:00 AM');
  const [trArr, setTrArr] = useState('01:30 PM');
  const [trDuration, setTrDuration] = useState('5h 30m');
  const [trPriceMin, setTrPriceMin] = useState(800);
  const [trPriceMax, setTrPriceMax] = useState(1200);

  const loadAll = async () => {
    const [st, p, h, r, tr, d] = await Promise.all([
      DataService.getAdminStats(),
      DataService.getPlaces(),
      DataService.getHotels(),
      DataService.getRestaurants(),
      DataService.getTransports(),
      DataService.getDistricts()
    ]);
    setStats(st);
    setPlaces(p);
    setHotels(h);
    setRestaurants(r);
    setTransports(tr);
    setDistricts(d);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleAddPlaceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPlace: Place = {
      id: `place-${Date.now()}`,
      district_id: placeDistrict,
      district_name: districts.find(d => d.id === placeDistrict)?.name || 'Sylhet',
      name: placeName,
      name_bn: placeName,
      rating: placeRating,
      reviews_count: 1,
      short_description: placeShortDesc,
      full_description: placeShortDesc,
      location: placeLocation || `${placeDistrict}, Bangladesh`,
      lat: 24.8949,
      lng: 91.8687,
      entry_fee: placeEntryFee,
      opening_time: '08:00 AM - 06:00 PM',
      best_time: 'October to March',
      how_to_reach: 'Regular bus and train services from major cities.',
      image_url: placeImageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
      gallery: [placeImageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800'],
      category: placeCategory,
      is_featured: true
    };
    await DataService.savePlace(newPlace);
    await loadAll();
    setIsAddModalOpen(false);
    setSuccessToast('New place published to YEANA platform!');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleAddHotelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newHotel: Hotel = {
      id: `hotel-${Date.now()}`,
      district_id: hotelDistrict,
      district_name: districts.find(d => d.id === hotelDistrict)?.name || 'Sylhet',
      name: hotelName,
      name_bn: hotelName,
      rating: 4.6,
      reviews_count: 10,
      price_per_night: hotelPrice,
      location: hotelLocation || `${hotelDistrict}, Bangladesh`,
      address: hotelLocation || `${hotelDistrict}, Bangladesh`,
      contact_phone: hotelPhone,
      has_ac: true,
      has_wifi: true,
      has_parking: true,
      has_restaurant: true,
      has_room_service: true,
      has_security: true,
      image_url: hotelImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      gallery: [],
      room_types: ['Deluxe Couple', 'Family Room'],
      check_in: '12:00 PM',
      check_out: '11:00 AM'
    };
    await DataService.saveHotel(newHotel);
    await loadAll();
    setIsAddModalOpen(false);
    setSuccessToast('New hotel added!');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleAddRestaurantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRest: Restaurant = {
      id: `rest-${Date.now()}`,
      district_id: restDistrict,
      district_name: districts.find(d => d.id === restDistrict)?.name || 'Sylhet',
      name: restName,
      name_bn: restName,
      rating: 4.5,
      reviews_count: 5,
      cuisine: restCuisine,
      price_tier: restPriceTier,
      location: restLocation || `${restDistrict}, Bangladesh`,
      address: restLocation || `${restDistrict}, Bangladesh`,
      phone: '+880 1711-223344',
      opening_hours: '08:00 AM - 11:00 PM',
      menu_highlights: ['Special Platter', 'Fresh Delicacies'],
      image_url: restImage || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'
    };
    await DataService.saveRestaurant(newRest);
    await loadAll();
    setIsAddModalOpen(false);
    setSuccessToast('New restaurant added!');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleAddTransportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRoute: TransportRoute = {
      id: `tr-${Date.now()}`,
      transport_type: trType,
      company: trCompany,
      from_district: trFrom,
      to_district: trTo,
      departure_time: trDep,
      arrival_time: trArr,
      duration: trDuration,
      price_min: trPriceMin,
      price_max: trPriceMax,
      boarding_points: ['Main Counter'],
      schedule_days: 'Daily',
      contact_phone: '+880 1900-112233',
      is_active: true
    };
    await DataService.saveTransport(newRoute);
    await loadAll();
    setIsAddModalOpen(false);
    setSuccessToast('New transport route added!');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleDeleteItem = async (type: string, id: string) => {
    if (!confirm(`Are you sure you want to remove this ${type}?`)) return;
    if (type === 'place') await DataService.deletePlace(id);
    if (type === 'hotel') await DataService.deleteHotel(id);
    if (type === 'restaurant') await DataService.deleteRestaurant(id);
    if (type === 'transport') await DataService.deleteTransport(id);
    await loadAll();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>YEANA Management Console</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
            Platform Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            Manage Bangladesh tourist destinations, hotels, dining spots, transport timetables, and monitor platform metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isAdmin && (
            <button
              onClick={loginDemoAdmin}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Enable Admin Mode</span>
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-700/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Listing</span>
          </button>
        </div>
      </div>

      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2 border border-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{successToast}</span>
        </div>
      )}

      {/* METRICS CARDS (PRD Section 30) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2">
            <Users className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">{stats.totalUsers}</p>
          <p className="text-[11px] text-slate-400 font-bold uppercase">Total Users</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2">
            <Compass className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-teal-700 font-mono">{stats.totalPlaces}</p>
          <p className="text-[11px] text-slate-400 font-bold uppercase">Places</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-2">
            <HotelIcon className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-sky-700 font-mono">{stats.totalHotels}</p>
          <p className="text-[11px] text-slate-400 font-bold uppercase">Hotels</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
            <Utensils className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-amber-700 font-mono">{stats.totalRestaurants}</p>
          <p className="text-[11px] text-slate-400 font-bold uppercase">Restaurants</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
            <Bus className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-emerald-700 font-mono">{stats.totalTransports}</p>
          <p className="text-[11px] text-slate-400 font-bold uppercase">Transports</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-2">
            <Calendar className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-rose-700 font-mono">3,450</p>
          <p className="text-[11px] text-slate-400 font-bold uppercase">Trips Planned</p>
        </div>

      </div>

      {/* Management Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'places', label: `Manage Places (${places.length})`, icon: Compass },
          { id: 'hotels', label: `Manage Hotels (${hotels.length})`, icon: HotelIcon },
          { id: 'restaurants', label: `Manage Restaurants (${restaurants.length})`, icon: Utensils },
          { id: 'transports', label: `Manage Transport (${transports.length})`, icon: Bus },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Listings Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        
        {/* 1. PLACES TABLE */}
        {activeTab === 'places' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Place Name</th>
                  <th className="p-4">District</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Entry Fee</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {places.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={p.image_url} alt="" className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-slate-900">{p.name}</p>
                        <p className="text-[10px] text-slate-400 truncate max-w-xs">{p.location}</p>
                      </div>
                    </td>
                    <td className="p-4">{p.district_name || p.district_id}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-brand-50 text-brand-800 text-[10px] font-bold">{p.category}</span></td>
                    <td className="p-4">⭐ {p.rating}</td>
                    <td className="p-4">{p.entry_fee}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteItem('place', p.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete place"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. HOTELS TABLE */}
        {activeTab === 'hotels' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Hotel Name</th>
                  <th className="p-4">District</th>
                  <th className="p-4">Price / Night</th>
                  <th className="p-4">Contact Phone</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {hotels.map(h => (
                  <tr key={h.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={h.image_url} alt="" className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-slate-900">{h.name}</p>
                        <p className="text-[10px] text-slate-400">{h.location}</p>
                      </div>
                    </td>
                    <td className="p-4">{h.district_name || h.district_id}</td>
                    <td className="p-4 font-bold text-brand-700">৳{h.price_per_night}</td>
                    <td className="p-4 font-mono">{h.contact_phone}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteItem('hotel', h.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete hotel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. RESTAURANTS TABLE */}
        {activeTab === 'restaurants' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Restaurant Name</th>
                  <th className="p-4">Cuisine</th>
                  <th className="p-4">Price Tier</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {restaurants.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={r.image_url} alt="" className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-slate-900">{r.name}</p>
                        <p className="text-[10px] text-slate-400">{r.location}</p>
                      </div>
                    </td>
                    <td className="p-4">{r.cuisine}</td>
                    <td className="p-4 font-bold">{r.price_tier}</td>
                    <td className="p-4">⭐ {r.rating}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteItem('restaurant', r.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete restaurant"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. TRANSPORT ROUTES TABLE */}
        {activeTab === 'transports' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Company / Operator</th>
                  <th className="p-4">Route</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Fare Range</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {transports.map(tr => (
                  <tr key={tr.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{tr.company}</td>
                    <td className="p-4">{tr.from_district} ➔ {tr.to_district}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px]">{tr.transport_type}</span></td>
                    <td className="p-4 font-mono font-bold text-emerald-700">৳{tr.price_min} - ৳{tr.price_max}</td>
                    <td className="p-4">{tr.duration}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteItem('transport', tr.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete route"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* ADD LISTING MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900 font-sans">
                Add New {activeTab === 'places' ? 'Tourist Place' : activeTab === 'hotels' ? 'Hotel' : activeTab === 'restaurants' ? 'Restaurant' : 'Transport Route'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dynamic Form based on activeTab */}
            {activeTab === 'places' && (
              <form onSubmit={handleAddPlaceSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Place Name</label>
                  <input
                    type="text"
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                    placeholder="e.g. Bichanakandi Stone Valley"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">District</label>
                    <select
                      value={placeDistrict}
                      onChange={(e) => setPlaceDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                    >
                      {districts.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={placeCategory}
                      onChange={(e) => setPlaceCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                    >
                      <option value="Nature">Nature</option>
                      <option value="Hill">Hill</option>
                      <option value="Beach">Beach</option>
                      <option value="Forest">Forest</option>
                      <option value="Waterfall">Waterfall</option>
                      <option value="Tea Garden">Tea Garden</option>
                      <option value="Heritage">Heritage</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location Details</label>
                  <input
                    type="text"
                    value={placeLocation}
                    onChange={(e) => setPlaceLocation(e.target.value)}
                    placeholder="e.g. Gowainghat, Sylhet"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                  <textarea
                    value={placeShortDesc}
                    onChange={(e) => setPlaceShortDesc(e.target.value)}
                    placeholder="Highlights of this scenic spot..."
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    rows={2}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Entry Fee</label>
                    <input
                      type="text"
                      value={placeEntryFee}
                      onChange={(e) => setPlaceEntryFee(e.target.value)}
                      placeholder="Free / ৳50 per person"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={placeImageUrl}
                      onChange={(e) => setPlaceImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold">
                    Publish Place
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'hotels' && (
              <form onSubmit={handleAddHotelSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hotel Name</label>
                  <input
                    type="text"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    placeholder="e.g. Royal Bengal Eco Resort"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">District</label>
                    <select
                      value={hotelDistrict}
                      onChange={(e) => setHotelDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    >
                      {districts.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Price per Night (৳)</label>
                    <input
                      type="number"
                      value={hotelPrice}
                      onChange={(e) => setHotelPrice(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={hotelPhone}
                    onChange={(e) => setHotelPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div className="flex justify-end pt-3">
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold">
                    Add Hotel
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'restaurants' && (
              <form onSubmit={handleAddRestaurantSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Restaurant Name</label>
                  <input
                    type="text"
                    value={restName}
                    onChange={(e) => setRestName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Cuisine</label>
                    <input
                      type="text"
                      value={restCuisine}
                      onChange={(e) => setRestCuisine(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Price Tier</label>
                    <select
                      value={restPriceTier}
                      onChange={(e) => setRestPriceTier(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    >
                      <option value="৳">৳ (Budget)</option>
                      <option value="৳৳">৳৳ (Moderate)</option>
                      <option value="৳৳৳">৳৳৳ (Fine Dining)</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end pt-3">
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold">
                    Add Restaurant
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'transports' && (
              <form onSubmit={handleAddTransportSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Operator Company</label>
                  <input
                    type="text"
                    value={trCompany}
                    onChange={(e) => setTrCompany(e.target.value)}
                    placeholder="e.g. Green Line Paribahan"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">From District</label>
                    <input
                      type="text"
                      value={trFrom}
                      onChange={(e) => setTrFrom(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">To District</label>
                    <input
                      type="text"
                      value={trTo}
                      onChange={(e) => setTrTo(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Min Fare (৳)</label>
                    <input
                      type="number"
                      value={trPriceMin}
                      onChange={(e) => setTrPriceMin(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Max Fare (৳)</label>
                    <input
                      type="number"
                      value={trPriceMax}
                      onChange={(e) => setTrPriceMax(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-3">
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                    Add Transport Route
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
