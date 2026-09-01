import React, { useState, useEffect } from 'react';
import { Car, Bike, Phone, MapPin, CheckCircle2, Filter, ShieldCheck, Heart, User, Clock, X, Info, Sparkles } from 'lucide-react';
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
  
  // Selected ride modal state
  const [selectedRideModal, setSelectedRideModal] = useState<Ride | null>(null);
  const [bookingConfirmedRide, setBookingConfirmedRide] = useState<Ride | null>(null);

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
    { id: 'Sedan', label: 'Sedan Cars', icon: Car },
    { id: 'Microbus', label: 'AC Microbuses', icon: Car },
    { id: 'Chander Gari', label: '4x4 Mountain Jeeps', icon: Car },
    { id: 'Boat', label: 'Boats & Houseboats', icon: Car },
  ];

  const filteredRides = React.useMemo(() => {
    return rides.filter(ride => {
      const matchesType = selectedType === 'All' || ride.vehicle_type === selectedType;
      const matchesDistrict = selectedDistrict === 'All' || ride.district_id === selectedDistrict;
      return matchesType && matchesDistrict;
    });
  }, [rides, selectedType, selectedDistrict]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-elevated">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-500/30 text-rose-200 border border-rose-400/30 backdrop-blur-md inline-block">
            🚗 Self-Drive & Chauffeur Fleet
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Rent Cars, SUVs & Motorbikes Anywhere in Bangladesh
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Verified hosts across all 64 districts. Daily rentals, hourly city runs, and inter-district chauffeur packages.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {vehicleTypes.map(cat => {
            const Icon = cat.icon;
            const isActive = selectedType === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedType(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-rose-600 text-white shadow-sm' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* District & Count */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600">Filter District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="All">All Districts</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <span className="text-xs text-slate-500 hidden sm:inline font-semibold">
            Showing {filteredRides.length} verified vehicles
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
                onClick={() => setSelectedRideModal(ride)}
                className="group bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
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
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite('ride', ride.id, ride);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
                      favorited ? 'bg-rose-500 text-white' : 'bg-black/30 text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      {ride.location}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[10px] font-extrabold uppercase">
                      {ride.rental_type}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1 group-hover:text-rose-700 transition-colors">
                      {ride.model}
                    </h3>
                    
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-black text-slate-900 font-mono">
                        ৳{ride.price_per_day.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400">/ day</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRideModal(ride);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <Info className="w-3.5 h-3.5 text-rose-600" />
                      <span>View Details</span>
                    </button>

                    <a
                      href={`tel:${ride.contact_phone}`}
                      onClick={(e) => e.stopPropagation()}
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

      {/* Ride Detail & Booking Modal */}
      {selectedRideModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 text-xs font-extrabold uppercase">
                  {selectedRideModal.rental_type} • {selectedRideModal.vehicle_type}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {selectedRideModal.model}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{selectedRideModal.location}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedRideModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={selectedRideModal.image_url}
                alt={selectedRideModal.model}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Daily Package</span>
                <p className="text-xl font-black text-rose-700 font-mono">৳{selectedRideModal.price_per_day.toLocaleString()}</p>
                <span className="text-[10px] text-slate-500">per 24 hours</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Hourly Rate</span>
                <p className="text-xl font-black text-slate-900 font-mono">৳{selectedRideModal.price_per_hour || 250}</p>
                <span className="text-[10px] text-slate-500">per hour in city</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-extrabold text-slate-800 uppercase tracking-wider">Vehicle Specs & Inclusions:</h4>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Valid Fitness & Tax Token</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Full AC Climate</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Host: {selectedRideModal.owner_name}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Driver Option</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
              <a
                href={`tel:${selectedRideModal.contact_phone}`}
                className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Phone className="w-4 h-4 text-rose-600" />
                <span>Call Host ({selectedRideModal.contact_phone})</span>
              </a>

              <button
                onClick={() => {
                  setBookingConfirmedRide(selectedRideModal);
                  setSelectedRideModal(null);
                }}
                className="flex-1 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition-all shadow-elevated active:scale-95"
              >
                Confirm Reservation ⏎
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Toast */}
      {bookingConfirmedRide && (
        <div className="fixed bottom-6 right-6 z-50 p-5 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-4 animate-in slide-in-from-bottom-5">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          <div className="space-y-0.5">
            <h4 className="font-extrabold text-sm text-emerald-400">Reservation Request Sent!</h4>
            <p className="text-xs text-slate-300">Host {bookingConfirmedRide.owner_name} will call you shortly to confirm pickup.</p>
          </div>
          <button
            onClick={() => setBookingConfirmedRide(null)}
            className="p-1 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
