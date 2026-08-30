import React, { useState, useEffect } from 'react';
import { Bus, Train, Plane, Car, Ship, Clock, MapPin, ArrowRight, Phone, Info, Calendar, Sparkles } from 'lucide-react';
import { DataService } from '../services/dataService';
import { TransportRoute, TransportType } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const TransportView: React.FC = () => {
  const { t } = useLanguage();
  const [transports, setTransports] = useState<TransportRoute[]>([]);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [fromDistrict, setFromDistrict] = useState<string>('Dhaka');
  const [toDistrict, setToDistrict] = useState<string>('All');
  const [travelDate, setTravelDate] = useState<string>('2026-10-15');

  useEffect(() => {
    async function loadTransports() {
      const data = await DataService.getTransports();
      setTransports(data);
    }
    loadTransports();
  }, []);

  const transportTypes = [
    { id: 'All', label: 'All Modes', icon: Bus },
    { id: 'Train', label: 'Trains', icon: Train },
    { id: 'Bus', label: 'AC & Sleeper Buses', icon: Bus },
    { id: 'Flight', label: 'Domestic Flights', icon: Plane },
    { id: 'Car', label: 'Microbus & Rentals', icon: Car },
  ];

  const filteredRoutes = transports.filter(route => {
    const matchesType = selectedType === 'All' || route.transport_type === selectedType;
    const matchesFrom = fromDistrict === 'All' || route.from_district.toLowerCase().includes(fromDistrict.toLowerCase());
    const matchesTo = toDistrict === 'All' || route.to_district.toLowerCase().includes(toDistrict.toLowerCase());

    return matchesType && matchesFrom && matchesTo;
  });

  const getTransportIcon = (type: TransportType) => {
    switch (type) {
      case 'Train': return <Train className="w-5 h-5 text-emerald-600" />;
      case 'Flight': return <Plane className="w-5 h-5 text-sky-600" />;
      case 'Car': return <Car className="w-5 h-5 text-purple-600" />;
      default: return <Bus className="w-5 h-5 text-brand-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700">
          <Bus className="w-4 h-4 text-emerald-600" />
          <span>Inter-District Travel Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
          Bus, Train, Flight & Car Schedules
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          Check accurate routes, departure & arrival timings, travel durations, and realistic fare ranges between divisions and tourist hubs across Bangladesh.
        </p>
      </div>

      {/* Route Finder Form Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-5">
        
        {/* Type Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 scrollbar-none">
          {transportTypes.map(item => {
            const Icon = item.icon;
            const isActive = selectedType === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedType(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Origin / Destination / Date Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{t('transport.from')}</span>
            </label>
            <select
              value={fromDistrict}
              onChange={(e) => setFromDistrict(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="All">Any Origin</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Khulna">Khulna</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('transport.to')}</span>
            </label>
            <select
              value={toDistrict}
              onChange={(e) => setToDistrict(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="All">All Destinations</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Cox's Bazar">Cox's Bazar</option>
              <option value="Sajek">Rangamati (Sajek)</option>
              <option value="Bandarban">Bandarban</option>
              <option value="Sreemangal">Sreemangal</option>
              <option value="Sundarbans">Khulna (Sundarbans)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Travel Date</span>
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

        </div>

      </div>

      {/* Real-time informational banner */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-900">
        <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Informational Schedule & Fare Transparency</p>
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            YEANA tracks authentic railway timetables (Bangladesh Railway), luxury coach networks (Green Line, Shohagh, Desh Travels), and domestic airlines (Biman, US-Bangla). Contact counters directly or use authorized railway apps for booking.
          </p>
        </div>
      </div>

      {/* Routes List */}
      <div className="space-y-4">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map(route => (
            <div
              key={route.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              
              {/* Left Column: Operator & Type */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                  {getTransportIcon(route.transport_type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 text-[10px] font-extrabold uppercase tracking-wider">
                      {route.transport_type}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      🗓️ {route.schedule_days}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {route.company}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>Boarding: {route.boarding_points?.join(', ') || 'Main City Counter'}</span>
                  </p>
                </div>
              </div>

              {/* Middle Column: Route & Timing */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center text-xs lg:min-w-[340px]">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{route.from_district}</p>
                  <p className="font-extrabold text-slate-900 mt-1">{route.departure_time.split('/')[0]}</p>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    {route.duration}
                  </span>
                  <div className="w-full flex items-center justify-center my-1">
                    <div className="h-[1.5px] bg-slate-300 w-full relative">
                      <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-slate-400 rotate-45" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{route.to_district}</p>
                  <p className="font-extrabold text-slate-900 mt-1">{route.arrival_time.split('/')[0]}</p>
                </div>
              </div>

              {/* Right Column: Price & Action */}
              <div className="flex items-center justify-between lg:flex-col lg:items-end gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="lg:text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Estimated Fare</p>
                  <p className="text-lg font-black text-emerald-700 font-mono">
                    ৳{route.price_min} - ৳{route.price_max}
                  </p>
                </div>

                {route.contact_phone && (
                  <a
                    href={`tel:${route.contact_phone}`}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-400" />
                    <span>Call Counter</span>
                  </a>
                )}
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <Bus className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No direct routes found for this filter</h3>
            <p className="text-xs text-slate-500">Try selecting "All Modes" or "Any Origin".</p>
          </div>
        )}
      </div>

    </div>
  );
};
