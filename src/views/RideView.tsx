import React, { useState, useEffect } from 'react';
import { Car, Bike, Phone, MapPin, CheckCircle2, Search, Filter, ShieldCheck, Heart, User, Clock } from 'lucide-react';
import { DataService } from '../services/dataService';
import { Ride, District } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';

export const RideView: React.FC = () => {
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [rides, setRides] = useState<Ride[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  
  // Contact Owner modal state
  const [activeRideModal, setActiveRideModal] = useState<Ride | null>(null);

  useEffect(() => {
    async function loadData() {
      const [rd, d] = await Promise.all([
        DataService.getRides(),
        DataService.getDistricts()
      ]);
      setRides(rd);
      setDistricts(d);
    }
    loadData();
  }, []);

  const vehicleTypes = [
    { id: 'All', label: 'All Vehicles', icon: Car },
    { id: 'Bike', label: 'Motorcycles & Scooters', icon: Bike },
    { id: 'Car', label: 'Sedan Cars', icon: Car },
    { id: 'Microbus', label: 'AC Microbuses (Noah/HiAce)', icon: Car },
    { id: 'Chander Gari', label: '4x4 Mountain Jeeps', icon: Car },
  ];

  const filteredRides = rides.filter(ride => {
    const matchesType = selectedType === 'All' || ride.vehicle_type === selectedType;
    const matchesDistrict = selectedDistrict === 'All' || ride.district_id === selectedDistrict;
    return matchesType && matchesDistrict;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-700">
          <Car className="w-4 h-4 text-rose-600" />
          <span>Vehicle Rentals & Self-Drive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
          Rent Bikes, Cars & Mountain 4x4 Jeeps
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          Explore Marine Drive on a rental scooter, take a 4x4 Chander Gari to Sajek Valley, or hire an AC family microbus for Sylhet tours.
        </p>
      </div>

      {/* Filter and Search Container */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card space-y-4">
        
        {/* Vehicle Type Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 scrollbar-none">
          {vehicleTypes.map(item => {
            const Icon = item.icon;
            const isActive = selectedType === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedType(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-rose-600 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* District Selector */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:max-w-xs">
            <span className="text-xs font-bold text-slate-600 shrink-0">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none"
            >
              <option value="All">All Locations</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <span className="text-xs text-slate-500 hidden sm:inline">
            Showing {filteredRides.length} available vehicles
          </span>
        </div>

      </div>

      {/* Verified Safety Badge Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-slate-300">
            <span className="text-white font-bold">YEANA Verified Host Network:</span> All vehicle hosts provide valid fitness certificates, helmets (for bikes), and licensed drivers.
          </p>
        </div>
      </div>

      {/* Grid of Vehicles */}
      {filteredRides.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRides.map(ride => {
            const favorited = isFavorite('ride', ride.id);
            return (
              <div
                key={ride.id}
                className="group bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                  <img
                    src={ride.image_url}
                    alt={ride.model}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
                      {ride.vehicle_type}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFavorite('ride', ride.id, ride)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
                      favorited ? 'bg-rose-500 text-white' : 'bg-black/30 text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-300" />
                      {ride.location}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[10px] font-extrabold uppercase">
                      {ride.rental_type}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {ride.model}
                    </h3>
                    
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-black text-slate-900 font-mono">
                        ৳{ride.price_per_day.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400">/ day</span>
                      {ride.price_per_hour && (
                        <span className="text-xs text-slate-500">
                          (৳{ride.price_per_hour}/hr)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500 truncate max-w-[120px]">
                      Host: <span className="font-semibold text-slate-700">{ride.owner_name}</span>
                    </div>

                    <a
                      href={`tel:${ride.contact_phone}`}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{t('common.call')}</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Car className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No vehicle rentals found for this category</h3>
          <p className="text-xs text-slate-500">Try selecting "All Vehicles".</p>
        </div>
      )}

    </div>
  );
};
