import React, { useState, useEffect, useRef } from 'react';
import { 
  Bus, 
  Train, 
  Plane, 
  Car, 
  Ship, 
  Clock, 
  MapPin, 
  ArrowRight, 
  ArrowLeftRight, 
  Phone, 
  Info, 
  Calendar, 
  Sparkles, 
  Search, 
  X, 
  ChevronDown, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Share2, 
  PlusCircle, 
  DollarSign, 
  Navigation, 
  Compass, 
  SlidersHorizontal, 
  Users, 
  CheckCircle2, 
  Bookmark,
  Wifi,
  Coffee,
  BatteryCharging,
  Armchair
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { TransportRoute, TransportType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useTrip } from '../context/TripContext';
import { 
  ALL_SEARCHABLE_LOCATIONS, 
  POPULAR_ROUTE_SHORTCUTS, 
  SearchableLocation, 
  searchLocations, 
  generateRoutesBetween,
  RouteCalculationResult,
  getLocationByNameOrId
} from '../services/transportService';

export const TransportView: React.FC = () => {
  const { t } = useLanguage();
  const { activeTrip, addCustomStopToTrip, updateTripBudget } = useTrip();

  // Static DB routes
  const [staticTransports, setStaticTransports] = useState<TransportRoute[]>([]);
  
  // Selection State
  const [fromQuery, setFromQuery] = useState<string>('Dhaka');
  const [toQuery, setToQuery] = useState<string>("Cox's Bazar");
  const [fromLocation, setFromLocation] = useState<SearchableLocation>(() => {
    return getLocationByNameOrId('dhaka') || ALL_SEARCHABLE_LOCATIONS[0];
  });
  const [toLocation, setToLocation] = useState<SearchableLocation>(() => {
    return getLocationByNameOrId('coxs-bazar') || ALL_SEARCHABLE_LOCATIONS[1];
  });

  // Autocomplete UI dropdowns
  const [showFromDropdown, setShowFromDropdown] = useState<boolean>(false);
  const [showToDropdown, setShowToDropdown] = useState<boolean>(false);
  const [fromFiltered, setFromFiltered] = useState<SearchableLocation[]>([]);
  const [toFiltered, setToFiltered] = useState<SearchableLocation[]>([]);

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  // Filters & Options
  const [selectedType, setSelectedType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'duration_fast' | 'departure'>('recommended');
  const [travelDate, setTravelDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState<number>(1);

  // Route Engine Result
  const [routeResult, setRouteResult] = useState<RouteCalculationResult | null>(null);
  const [selectedRouteForModal, setSelectedRouteForModal] = useState<TransportRoute | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Load static transports from DB
  useEffect(() => {
    async function loadTransports() {
      const data = await DataService.getTransports();
      setStaticTransports(data);
    }
    loadTransports();
  }, []);

  // Recalculate route whenever From, To, or static data changes
  useEffect(() => {
    if (fromLocation && toLocation) {
      const result = generateRoutesBetween(fromLocation, toLocation, staticTransports);
      setRouteResult(result);
    }
  }, [fromLocation, toLocation, staticTransports]);

  // Handle Autocomplete filtering
  useEffect(() => {
    setFromFiltered(searchLocations(fromQuery));
  }, [fromQuery]);

  useEffect(() => {
    setToFiltered(searchLocations(toQuery));
  }, [toQuery]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.from-search-container')) setShowFromDropdown(false);
      if (!target.closest('.to-search-container')) setShowToDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectFrom = (loc: SearchableLocation) => {
    setFromLocation(loc);
    setFromQuery(loc.name);
    setShowFromDropdown(false);
  };

  const handleSelectTo = (loc: SearchableLocation) => {
    setToLocation(loc);
    setToQuery(loc.name);
    setShowToDropdown(false);
  };

  const handleSwap = () => {
    const tempLoc = fromLocation;
    const tempQuery = fromQuery;
    setFromLocation(toLocation);
    setFromQuery(toQuery);
    setToLocation(tempLoc);
    setToQuery(tempQuery);
  };

  const handleSelectShortcut = (shortcut: typeof POPULAR_ROUTE_SHORTCUTS[0]) => {
    const from = getLocationByNameOrId(shortcut.from) || ALL_SEARCHABLE_LOCATIONS[0];
    const to = getLocationByNameOrId(shortcut.to) || ALL_SEARCHABLE_LOCATIONS[1];
    setFromLocation(from);
    setFromQuery(from.name);
    setToLocation(to);
    setToQuery(to.name);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const transportTypes = [
    { id: 'All', label: 'All Modes', icon: Compass },
    { id: 'Bus', label: 'AC & Sleeper Bus', icon: Bus },
    { id: 'Train', label: 'Train (Intercity)', icon: Train },
    { id: 'Flight', label: 'Domestic Flight', icon: Plane },
    { id: 'Launch', label: 'Launch & Cruise', icon: Ship },
    { id: 'Car', label: 'Private Car / Microbus', icon: Car },
  ];

  // Filter & Sort routes
  const filteredAndSortedRoutes = React.useMemo(() => {
    if (!routeResult) return [];

    let list = routeResult.routes.filter(r => {
      if (selectedType === 'All') return true;
      return r.transport_type === selectedType;
    });

    if (sortBy === 'price_low') {
      list.sort((a, b) => a.price_min - b.price_min);
    } else if (sortBy === 'duration_fast') {
      const getMins = (dur: string) => {
        if (dur.includes('m') && !dur.includes('h')) return parseInt(dur) || 45;
        const hMatch = dur.match(/(\d+)h/);
        const mMatch = dur.match(/(\d+)m/);
        const h = hMatch ? parseInt(hMatch[1]) : 5;
        const m = mMatch ? parseInt(mMatch[1]) : 0;
        return h * 60 + m;
      };
      list.sort((a, b) => getMins(a.duration) - getMins(b.duration));
    }

    return list;
  }, [routeResult, selectedType, sortBy]);

  const getTransportIcon = (type: TransportType) => {
    switch (type) {
      case 'Train': return <Train className="w-5 h-5 text-emerald-600" />;
      case 'Flight': return <Plane className="w-5 h-5 text-sky-600" />;
      case 'Car': return <Car className="w-5 h-5 text-purple-600" />;
      case 'Launch': return <Ship className="w-5 h-5 text-teal-600" />;
      default: return <Bus className="w-5 h-5 text-brand-600" />;
    }
  };

  const handleAddToTripPlan = (route: TransportRoute) => {
    if (activeTrip) {
      addCustomStopToTrip(
        activeTrip.id,
        `${route.transport_type}: ${route.company} (${route.from_district} ➔ ${route.to_district})`,
        1,
        route.departure_time.split('/')[0],
        `Duration: ${route.duration}. Estimated Fare: ৳${route.price_min} - ৳${route.price_max}`
      );
      updateTripBudget(activeTrip.id, {
        ...activeTrip.budget,
        transport: Math.max(activeTrip.budget.transport, route.price_min * passengers)
      });
      showToast(`Added ${route.company} transport route to "${activeTrip.title}"!`);
    } else {
      showToast(`Please create a trip in the Trip Planner tab first.`);
    }
  };

  const handleCopyRouteDetails = (route: TransportRoute) => {
    const text = `YEANA Transport Route: ${route.transport_type} - ${route.company}\nRoute: ${route.from_district} ➔ ${route.to_district}\nDuration: ${route.duration}\nFare: ৳${route.price_min} - ৳${route.price_max}\nBoarding: ${route.boarding_points.join(', ')}\nHelpline: ${route.contact_phone || 'N/A'}`;
    navigator.clipboard.writeText(text);
    showToast('Route details copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-10 text-white shadow-elevated">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider border border-emerald-500/30">
            <Compass className="w-3.5 h-3.5" />
            <span>Universal Bangladesh Transport Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Go Anywhere in Bangladesh
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Search travel schedules, luxury AC sleeper buses, intercity express trains, domestic flights, river launches, and rental microbuses connecting all 64 districts and top tourist destinations.
          </p>
        </div>
        <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none">
          <Bus className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Route Finder Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-600" />
            <span>Select Origin & Destination</span>
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Covering 64 Districts & Tourist Spots
          </span>
        </div>

        {/* Origin / Destination Search Inputs with Autocomplete Dropdowns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          
          {/* FROM INPUT */}
          <div className="lg:col-span-5 relative from-search-container">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{t('transport.from')} (Origin Place / District)</span>
            </label>
            <div className="relative">
              <input
                ref={fromInputRef}
                type="text"
                value={fromQuery}
                onFocus={() => setShowFromDropdown(true)}
                onChange={(e) => {
                  setFromQuery(e.target.value);
                  setShowFromDropdown(true);
                }}
                placeholder="Search origin (e.g. Dhaka, Rajshahi, ঢাকা)..."
                className="w-full pl-10 pr-9 py-3.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {fromQuery && (
                <button
                  onClick={() => {
                    setFromQuery('');
                    fromInputRef.current?.focus();
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* FROM DROPDOWN */}
            {showFromDropdown && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl max-h-72 overflow-y-auto z-40 p-2 space-y-1">
                <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase text-slate-400">
                  Select Starting Point
                </div>
                {fromFiltered.length > 0 ? (
                  fromFiltered.map(loc => (
                    <button
                      key={`from-${loc.id}`}
                      onClick={() => handleSelectFrom(loc)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-bold flex items-center justify-between hover:bg-emerald-50 hover:text-emerald-900 transition-all ${
                        fromLocation.id === loc.id ? 'bg-emerald-100/70 text-emerald-900' : 'text-slate-800'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-extrabold">{loc.name}</span>
                          <span className="text-slate-400 font-normal">({loc.name_bn})</span>
                        </div>
                        {loc.popular_tag && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-medium inline-block">
                            {loc.popular_tag}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {loc.division}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No matching location found.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SWAP BUTTON */}
          <div className="lg:col-span-2 flex justify-center py-1 lg:py-0">
            <button
              onClick={handleSwap}
              title="Swap Origin and Destination"
              className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm active:scale-95 group"
            >
              <ArrowLeftRight className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* TO INPUT */}
          <div className="lg:col-span-5 relative to-search-container">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('transport.to')} (Destination Place / District)</span>
            </label>
            <div className="relative">
              <input
                ref={toInputRef}
                type="text"
                value={toQuery}
                onFocus={() => setShowToDropdown(true)}
                onChange={(e) => {
                  setToQuery(e.target.value);
                  setShowToDropdown(true);
                }}
                placeholder="Search destination (e.g. Cox's Bazar, Sajek, সিলেট)..."
                className="w-full pl-10 pr-9 py-3.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {toQuery && (
                <button
                  onClick={() => {
                    setToQuery('');
                    toInputRef.current?.focus();
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* TO DROPDOWN */}
            {showToDropdown && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl max-h-72 overflow-y-auto z-40 p-2 space-y-1">
                <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase text-slate-400">
                  Select Destination
                </div>
                {toFiltered.length > 0 ? (
                  toFiltered.map(loc => (
                    <button
                      key={`to-${loc.id}`}
                      onClick={() => handleSelectTo(loc)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-bold flex items-center justify-between hover:bg-emerald-50 hover:text-emerald-900 transition-all ${
                        toLocation.id === loc.id ? 'bg-emerald-100/70 text-emerald-900' : 'text-slate-800'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-extrabold">{loc.name}</span>
                          <span className="text-slate-400 font-normal">({loc.name_bn})</span>
                        </div>
                        {loc.popular_tag && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-medium inline-block">
                            {loc.popular_tag}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {loc.division}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No matching destination found.
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Date & Passengers Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
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

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>Number of Passengers / Seats</span>
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value={1}>1 Passenger (Solo)</option>
              <option value={2}>2 Passengers (Couple)</option>
              <option value={4}>4 Passengers (Family / Friends)</option>
              <option value={7}>7-10 Passengers (Microbus Group)</option>
            </select>
          </div>
        </div>

        {/* Popular Quick Route Shortcut Pills */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Popular Travel Corridors (1-Click Search)</span>
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {POPULAR_ROUTE_SHORTCUTS.map(sc => (
              <button
                key={sc.label}
                onClick={() => handleSelectShortcut(sc)}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 whitespace-nowrap transition-all flex items-center gap-1.5 border border-slate-200/80"
              >
                <span>{sc.label}</span>
                <span className="text-[10px] bg-white px-1.5 py-0.2 rounded-full text-slate-600 font-medium">
                  {sc.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Route Calculation Summary Bar */}
      {routeResult && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-lg sm:text-xl">
                <span>{fromLocation.name}</span>
                <ArrowRight className="w-5 h-5 text-emerald-600" />
                <span>{toLocation.name}</span>
              </div>
              <p className="text-xs text-emerald-800 flex items-center gap-2 flex-wrap">
                <span className="font-bold">Estimated Distance:</span> ~{routeResult.distanceKm} km highway route
                <span className="inline-block w-1 h-1 rounded-full bg-emerald-400" />
                <span className="font-bold">Lowest Fare:</span> ৳{routeResult.cheapestFare}
                <span className="inline-block w-1 h-1 rounded-full bg-emerald-400" />
                <span className="font-bold">Fastest Option:</span> {routeResult.fastestMode}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-white text-emerald-900 border border-emerald-200 text-xs font-bold shadow-xs">
                {filteredAndSortedRoutes.length} Schedules Available
              </span>
            </div>
          </div>

          {/* Transit Advice / Local Tip */}
          <div className="p-3.5 rounded-2xl bg-white/80 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              <strong className="font-bold text-emerald-900">Traveler Guidance:</strong> {routeResult.transitTip}
            </p>
          </div>
        </div>
      )}

      {/* Mode Tabs & Sorting Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Mode Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {transportTypes.map(item => {
            const Icon = item.icon;
            const isActive = selectedType === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedType(item.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="recommended">Best Recommended</option>
            <option value="price_low">Lowest Price First</option>
            <option value="duration_fast">Fastest Travel Time</option>
          </select>
        </div>

      </div>

      {/* Routes List */}
      <div className="space-y-4">
        {filteredAndSortedRoutes.length > 0 ? (
          filteredAndSortedRoutes.map(route => (
            <div
              key={route.id}
              className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative group"
            >
              
              {/* Left Column: Operator & Transport Details */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 group-hover:bg-emerald-50 transition-colors">
                  {getTransportIcon(route.transport_type)}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider">
                      {route.transport_type}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{route.schedule_days}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {route.company}
                  </h3>

                  <div className="text-xs text-slate-500 flex items-center gap-1 flex-wrap">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span><strong>Boarding:</strong> {route.boarding_points?.join(' • ') || 'Main District Terminal'}</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Armchair className="w-3.5 h-3.5 text-emerald-600" /> Reclining
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BatteryCharging className="w-3.5 h-3.5 text-sky-600" /> USB Port
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Column: Route & Timing */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center text-xs lg:min-w-[360px]">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{route.from_district}</p>
                  <p className="font-black text-slate-900 mt-1 text-sm">{route.departure_time.split('/')[0]}</p>
                  <p className="text-[10px] text-slate-500">Departure</p>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-100 px-2.5 py-0.5 rounded-full shadow-2xs">
                    {route.duration}
                  </span>
                  <div className="w-full flex items-center justify-center my-1.5">
                    <div className="h-[2px] bg-slate-300 w-full relative">
                      <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-slate-400 rotate-45" />
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">Direct Journey</span>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{route.to_district}</p>
                  <p className="font-black text-slate-900 mt-1 text-sm">{route.arrival_time.split('/')[0]}</p>
                  <p className="text-[10px] text-slate-500">Arrival</p>
                </div>
              </div>

              {/* Right Column: Price & Actions */}
              <div className="flex items-center justify-between lg:flex-col lg:items-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="lg:text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Estimated Fare</p>
                  <p className="text-xl font-black text-emerald-700 font-mono">
                    ৳{route.price_min} - ৳{route.price_max}
                    <span className="text-xs text-slate-400 font-sans font-normal ml-1">/ seat</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedRouteForModal(route);
                      setIsBookingModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                  >
                    <span>Book / Info</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  {route.contact_phone && (
                    <a
                      href={`tel:${route.contact_phone.split('/')[0].trim()}`}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
                      title="Call Operator Counter"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    </a>
                  )}

                  <button
                    onClick={() => handleAddToTripPlan(route)}
                    title="Add to Itinerary"
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
                  </button>

                  <button
                    onClick={() => handleCopyRouteDetails(route)}
                    title="Share / Copy Route Details"
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <Bus className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No routes found for selected filter</h3>
            <p className="text-xs text-slate-500">Switch to "All Modes" to view all available transport options.</p>
          </div>
        )}
      </div>

      {/* Online Booking & Helpline Modal */}
      {isBookingModalOpen && selectedRouteForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-slate-100 shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 text-[10px] font-extrabold uppercase tracking-wider">
                  {selectedRouteForModal.transport_type} Reservation
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedRouteForModal.company}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedRouteForModal.from_district} ➔ {selectedRouteForModal.to_district}
                </p>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Details Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Duration:</span>
                <span className="font-extrabold text-slate-900">{selectedRouteForModal.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Standard Fare:</span>
                <span className="font-extrabold text-emerald-700">৳{selectedRouteForModal.price_min} - ৳{selectedRouteForModal.price_max} BDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Boarding Point:</span>
                <span className="font-bold text-slate-900">{selectedRouteForModal.boarding_points.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact / Helpline:</span>
                <span className="font-bold text-slate-900">{selectedRouteForModal.contact_phone || 'Direct Counter'}</span>
              </div>
            </div>

            {/* Authorized Online Portals */}
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-slate-800">
                Official Booking & Ticket Portals:
              </p>
              
              {selectedRouteForModal.transport_type === 'Train' && (
                <a
                  href="https://eticket.railway.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-between shadow-xs transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Train className="w-4 h-4" />
                    <span>Bangladesh Railway e-Ticketing Portal</span>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {selectedRouteForModal.transport_type === 'Bus' && (
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://www.shohoz.com/bus-tickets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Shohoz Bus</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://bdtickets.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>BDTickets</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {selectedRouteForModal.transport_type === 'Flight' && (
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://www.biman-airlines.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Biman Airlines</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://usbair.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>US-Bangla Air</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Direct Dial Hotline */}
            {selectedRouteForModal.contact_phone && (
              <a
                href={`tel:${selectedRouteForModal.contact_phone.split('/')[0].trim()}`}
                className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Operator Counter ({selectedRouteForModal.contact_phone})</span>
              </a>
            )}

            <button
              onClick={() => {
                handleAddToTripPlan(selectedRouteForModal);
                setIsBookingModalOpen(false);
              }}
              className="w-full py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Bookmark className="w-4 h-4 text-emerald-600" />
              <span>Add this to My Trip Planner</span>
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
