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
  Armchair,
  Ticket,
  Bike,
  HelpCircle
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { TransportRoute, TransportType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useTrip } from '../context/TripContext';
import { 
  ALL_SEARCHABLE_LOCATIONS, 
  POPULAR_ROUTE_SHORTCUTS, 
  LOCAL_VEHICLES_GUIDE,
  BANGLADESH_BORDER_CHECKPOSTS,
  BorderCheckpostInfo,
  LocalVehicleGuideItem,
  SearchableLocation, 
  searchLocations, 
  generateRoutesBetween,
  RouteCalculationResult,
  getLocationByNameOrId
} from '../services/transportService';
import { SeatSelectionModal, ConfirmedBooking } from '../components/transport/SeatSelectionModal';

export const TransportView: React.FC = () => {
  const { t } = useLanguage();
  const { activeTrip, addCustomStopToTrip, updateTripBudget } = useTrip();

  // Static DB routes
  const [staticTransports, setStaticTransports] = useState<TransportRoute[]>([]);
  
  // Selection State (Clean Initial State: No default Dhaka or Benapole)
  const [fromQuery, setFromQuery] = useState<string>('');
  const [toQuery, setToQuery] = useState<string>('');
  const [fromLocation, setFromLocation] = useState<SearchableLocation | null>(null);
  const [toLocation, setToLocation] = useState<SearchableLocation | null>(null);

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
  const [passengers, setPassengers] = useState<number>(2);

  // Route Engine Result & Seat Booking Modal
  const [routeResult, setRouteResult] = useState<RouteCalculationResult | null>(null);
  const [selectedRouteForModal, setSelectedRouteForModal] = useState<TransportRoute | null>(null);
  const [detailRouteModal, setDetailRouteModal] = useState<TransportRoute | null>(null);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState<boolean>(false);
  const [showLocalGuideModal, setShowLocalGuideModal] = useState<boolean>(false);
  const [showBorderGuideModal, setShowBorderGuideModal] = useState<boolean>(false);
  const [borderSearchQuery, setBorderSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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
    showToast(`Departure set: ${loc.name} (${loc.name_bn || loc.division})`);
  };

  const handleSelectTo = (loc: SearchableLocation) => {
    setToLocation(loc);
    setToQuery(loc.name);
    setShowToDropdown(false);
    showToast(`Arrival set: ${loc.name} (${loc.name_bn || loc.division})`);
  };

  const handleEnterFrom = () => {
    if (fromFiltered.length > 0) {
      handleSelectFrom(fromFiltered[0]);
      toInputRef.current?.focus();
    } else {
      const match = getLocationByNameOrId(fromQuery);
      if (match) {
        handleSelectFrom(match);
        toInputRef.current?.focus();
      } else {
        setShowFromDropdown(false);
      }
    }
  };

  const handleEnterTo = () => {
    if (toFiltered.length > 0) {
      handleSelectTo(toFiltered[0]);
    } else {
      const match = getLocationByNameOrId(toQuery);
      if (match) {
        handleSelectTo(match);
      } else {
        setShowToDropdown(false);
      }
    }
  };

  const handleSearchRoutes = () => {
    handleEnterFrom();
    handleEnterTo();
    if (fromLocation && toLocation) {
      showToast(`Calculating best routes from ${fromLocation.name} ➔ ${toLocation.name}...`);
      const resultsEl = document.getElementById('transport-results-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      showToast('Please select both Departure and Arrival places.');
    }
  };

  const handleSwap = () => {
    if (!fromLocation && !toLocation) return;
    const tempLoc = fromLocation;
    const tempQuery = fromQuery;
    setFromLocation(toLocation);
    setFromQuery(toQuery);
    setToLocation(tempLoc);
    setToQuery(tempQuery);
    if (toLocation && tempLoc) {
      showToast(`Swapped: ${toLocation.name} ➔ ${tempLoc.name}`);
    }
  };

  const handleSelectShortcut = (shortcut: typeof POPULAR_ROUTE_SHORTCUTS[0]) => {
    const from = getLocationByNameOrId(shortcut.from) || ALL_SEARCHABLE_LOCATIONS[0];
    const to = getLocationByNameOrId(shortcut.to) || ALL_SEARCHABLE_LOCATIONS[1];
    setFromLocation(from);
    setFromQuery(from.name);
    setToLocation(to);
    setToQuery(to.name);
    window.scrollTo({ top: 180, behavior: 'smooth' });
    showToast(`Selected corridor: ${from.name} ➔ ${to.name}`);
  };

  const transportTypes = [
    { id: 'All', label: 'All Modes', icon: Compass },
    { id: 'Local', label: 'Local Vehicles (সিএনজি / চাঁদের গাড়ি)', icon: Sparkles },
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

  const getTransportIcon = (type: TransportType, cat?: string) => {
    if (type === 'Local') {
      if (cat === 'chander_gari') return <Compass className="w-5 h-5 text-amber-600" />;
      if (cat === 'boat_trawler') return <Ship className="w-5 h-5 text-teal-600" />;
      if (cat === 'bike_ride') return <Bike className="w-5 h-5 text-emerald-600" />;
      return <Car className="w-5 h-5 text-amber-600" />;
    }
    switch (type) {
      case 'Train': return <Train className="w-5 h-5 text-emerald-600" />;
      case 'Flight': return <Plane className="w-5 h-5 text-sky-600" />;
      case 'Car': return <Car className="w-5 h-5 text-purple-600" />;
      case 'Launch': return <Ship className="w-5 h-5 text-teal-600" />;
      default: return <Bus className="w-5 h-5 text-emerald-600" />;
    }
  };

  const handleOpenSeatModal = (route: TransportRoute) => {
    setSelectedRouteForModal(route);
    setIsSeatModalOpen(true);
  };

  const handleBookingConfirmed = (booking: ConfirmedBooking) => {
    showToast(`🎉 Booking ${booking.bookingId} Confirmed! ${booking.isFullReserve ? 'Full Vehicle Reserved' : `${booking.selectedSeats.length} seats reserved.`}`);
  };

  const handleAddToTripPlan = (route: TransportRoute) => {
    if (activeTrip) {
      addCustomStopToTrip(
        activeTrip.id,
        `${route.local_vehicle_name || route.transport_type}: ${route.company} (${route.from_district} ➔ ${route.to_district})`,
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
    const text = `YEANA Transport Route: ${route.local_vehicle_name || route.transport_type} - ${route.company}\nRoute: ${route.from_district} ➔ ${route.to_district}\nDuration: ${route.duration}\nFare: ৳${route.price_min} - ৳${route.price_max} (Reserve: ৳${route.reserve_price || 'N/A'})\nBoarding: ${route.boarding_points.join(', ')}\nHelpline: ${route.contact_phone || 'N/A'}`;
    navigator.clipboard.writeText(text);
    showToast('Route details copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-10 text-white shadow-elevated">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider border border-emerald-500/30">
            <Compass className="w-3.5 h-3.5" />
            <span>Universal Bangladesh Highway & Local Vehicle System</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Go Anywhere in Bangladesh
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Search schedules across all <strong>495+ Upazilas</strong> and <strong>64 Districts</strong>. Explore luxury AC buses, express trains, flights, launches, and authentic <strong>Local Vehicles (Chander Gari, CNG Auto, Haor Trawler, Easy Bike, Leguna)</strong> with live seat & full vehicle reserve booking!
          </p>

          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowBorderGuideModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all active:scale-95"
            >
              <Compass className="w-4 h-4 text-purple-200" />
              <span>🛂 20 Official Border Land Ports & Immigration Guide (স্থলবন্দর ও ইমিগ্রেশন)</span>
            </button>
            <button
              onClick={() => setShowLocalGuideModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Local Vehicle Stand & Union Fare Guide (চাঁদের গাড়ি, সিএনজি, ট্রলার)</span>
            </button>
          </div>
        </div>
        <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none">
          <Bus className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Route Finder Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-600" />
            <span>Select Origin & Destination (All Upazilas, Stands & 20 Border Ports)</span>
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              🛂 20 Active Border Land Ports
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ✓ 64 Districts + 495+ Upazilas
            </span>
          </div>
        </div>

        {/* Origin / Destination Search Inputs with Autocomplete Dropdowns & Enter triggers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          
          {/* DEPARTURE / FROM INPUT */}
          <div className="lg:col-span-5 relative from-search-container">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-extrabold text-emerald-900">Departure Place (ছাড়ার স্থান):</span>
              </span>
              {fromLocation ? (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {fromLocation.name} {fromLocation.name_bn ? `(${fromLocation.name_bn})` : ''}
                </span>
              ) : (
                <span className="text-[10px] font-medium text-slate-400 italic">
                  Not selected
                </span>
              )}
            </label>
            <div className="relative flex items-center">
              <input
                ref={fromInputRef}
                type="text"
                value={fromQuery}
                onFocus={() => setShowFromDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleEnterFrom();
                  }
                }}
                onChange={(e) => {
                  setFromQuery(e.target.value);
                  setShowFromDropdown(true);
                }}
                placeholder="Search departure place (e.g. Dhaka, Benapole, Burimari, Savar)..."
                className="w-full pl-10 pr-24 py-3.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {fromQuery && (
                  <button
                    onClick={() => {
                      setFromQuery('');
                      fromInputRef.current?.focus();
                    }}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
                    title="Clear"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleEnterFrom}
                  className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black shadow-xs flex items-center gap-1 active:scale-95 transition-all"
                  title="Press Enter to select"
                >
                  <span>Enter</span>
                  <span className="font-mono text-[10px]">⏎</span>
                </button>
              </div>
            </div>

            {/* FROM DROPDOWN */}
            {showFromDropdown && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl max-h-72 overflow-y-auto z-40 p-2 space-y-1">
                <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase text-slate-400 flex items-center justify-between">
                  <span>Select Departure Location</span>
                  <span>{fromFiltered.length} Results • Press Enter</span>
                </div>
                {fromFiltered.length > 0 ? (
                  fromFiltered.map(loc => (
                    <button
                      key={`from-${loc.id}`}
                      onClick={() => handleSelectFrom(loc)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-bold flex items-center justify-between hover:bg-emerald-50 hover:text-emerald-900 transition-all ${
                        fromLocation?.id === loc.id ? 'bg-emerald-100/70 text-emerald-900' : 'text-slate-800'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <MapPin className={`w-3.5 h-3.5 ${loc.type === 'border_checkpost' ? 'text-purple-600' : 'text-emerald-600'}`} />
                          <span className="font-extrabold">{loc.name}</span>
                          <span className="text-slate-400 font-normal">({loc.name_bn})</span>
                        </div>
                        {loc.popular_tag && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium inline-block ${
                            loc.type === 'border_checkpost'
                              ? 'text-purple-800 bg-purple-100'
                              : 'text-emerald-700 bg-emerald-100/80'
                          }`}>
                            {loc.popular_tag}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                          loc.type === 'border_checkpost'
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : loc.type === 'upazila' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : loc.type === 'tourist_spot' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {loc.type === 'border_checkpost' ? '🛂 IMMIGRATION' : loc.type}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {loc.division}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No matching location found. Type any Land Port, Upazila or District name.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SWAP BUTTON */}
          <div className="lg:col-span-2 flex justify-center py-1 lg:py-0">
            <button
              onClick={handleSwap}
              title="Swap Departure and Arrival Places"
              className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm active:scale-95 group"
            >
              <ArrowLeftRight className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* ARRIVAL / TO INPUT */}
          <div className="lg:col-span-5 relative to-search-container">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span className="font-extrabold text-teal-900">Arrival Place (গন্তব্য স্থান):</span>
              </span>
              {toLocation ? (
                <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                  {toLocation.name} {toLocation.name_bn ? `(${toLocation.name_bn})` : ''}
                </span>
              ) : (
                <span className="text-[10px] font-medium text-slate-400 italic">
                  Not selected
                </span>
              )}
            </label>
            <div className="relative flex items-center">
              <input
                ref={toInputRef}
                type="text"
                value={toQuery}
                onFocus={() => setShowToDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleEnterTo();
                  }
                }}
                onChange={(e) => {
                  setToQuery(e.target.value);
                  setShowToDropdown(true);
                }}
                placeholder="Search arrival (e.g. Benapole, Tamabil, Burimari, Sajek, Kuakata)..."
                className="w-full pl-10 pr-24 py-3.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
              <Search className="w-4 h-4 text-teal-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {toQuery && (
                  <button
                    onClick={() => {
                      setToQuery('');
                      toInputRef.current?.focus();
                    }}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
                    title="Clear"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleEnterTo}
                  className="px-2.5 py-1 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-black shadow-xs flex items-center gap-1 active:scale-95 transition-all"
                  title="Press Enter to select"
                >
                  <span>Enter</span>
                  <span className="font-mono text-[10px]">⏎</span>
                </button>
              </div>
            </div>

            {/* TO DROPDOWN */}
            {showToDropdown && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl max-h-72 overflow-y-auto z-40 p-2 space-y-1">
                <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase text-slate-400 flex items-center justify-between">
                  <span>Select Arrival Location</span>
                  <span>{toFiltered.length} Results • Press Enter</span>
                </div>
                {toFiltered.length > 0 ? (
                  toFiltered.map(loc => (
                    <button
                      key={`to-${loc.id}`}
                      onClick={() => handleSelectTo(loc)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-bold flex items-center justify-between hover:bg-teal-50 hover:text-teal-900 transition-all ${
                        toLocation?.id === loc.id ? 'bg-teal-100/70 text-teal-900' : 'text-slate-800'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <MapPin className={`w-3.5 h-3.5 ${loc.type === 'border_checkpost' ? 'text-purple-600' : 'text-teal-600'}`} />
                          <span className="font-extrabold">{loc.name}</span>
                          <span className="text-slate-400 font-normal">({loc.name_bn})</span>
                        </div>
                        {loc.popular_tag && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium inline-block ${
                            loc.type === 'border_checkpost'
                              ? 'text-purple-800 bg-purple-100'
                              : 'text-teal-700 bg-teal-100/80'
                          }`}>
                            {loc.popular_tag}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                          loc.type === 'border_checkpost'
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : loc.type === 'upazila' 
                            ? 'bg-teal-100 text-teal-800' 
                            : loc.type === 'tourist_spot' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {loc.type === 'border_checkpost' ? '🛂 IMMIGRATION' : loc.type}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {loc.division}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No matching location found. Type any Land Port, Upazila or District name.
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Date, Passengers & Search Action Button */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 items-end">
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
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>Seats / Passengers</span>
              </span>
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                Interactive Grid
              </span>
            </label>
            
            {/* Quick seat selector buttons */}
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1 flex-1">
                <button
                  type="button"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  disabled={passengers <= 1}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center disabled:opacity-40"
                >
                  -
                </button>
                <div className="flex-1 text-center font-black text-sm text-slate-900">
                  {passengers} {passengers === 1 ? 'Seat' : 'Seats'}
                </div>
                <button
                  type="button"
                  onClick={() => setPassengers(Math.min(14, passengers + 1))}
                  disabled={passengers >= 14}
                  className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center disabled:opacity-40"
                >
                  +
                </button>
              </div>

              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shrink-0"
              >
                <option value={1}>1 Seat (Solo)</option>
                <option value={2}>2 Seats (Pair)</option>
                <option value={3}>3 Seats (CNG)</option>
                <option value={4}>4 Seats (Family)</option>
                <option value={6}>6 Seats (TomTom)</option>
                <option value={10}>10 Seats (Leguna)</option>
                <option value={14}>14 Seats (Chander Gari)</option>
              </select>
            </div>
          </div>

          <div>
            <button
              onClick={handleSearchRoutes}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-elevated transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Search Routes (Enter ⏎)</span>
            </button>
          </div>
        </div>

        {/* Popular Quick Route Shortcut Pills */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          
          {/* Border Checkpost Corridors */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-purple-600" />
                <span>🛂 International Border & Immigration Checkposts (স্থলবন্দর ও ট্রানজিট)</span>
              </span>
              <button
                type="button"
                onClick={() => setShowBorderGuideModal(true)}
                className="text-[11px] font-bold text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-1"
              >
                <span>View All 20 Border Ports</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {POPULAR_ROUTE_SHORTCUTS.filter(s => s.badge.includes('🇮🇳') || s.badge.includes('🇳🇵') || s.badge.includes('🇲🇲') || s.badge.includes('🚆')).map(sc => (
                <button
                  key={sc.label}
                  onClick={() => handleSelectShortcut(sc)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-900 whitespace-nowrap transition-all flex items-center gap-1.5 border border-purple-200"
                >
                  <span>{sc.label}</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.2 rounded-full text-purple-900 font-extrabold shadow-2xs">
                    {sc.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Domestic Tourism & Safari Corridors */}
          <div className="space-y-1.5">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Popular Upazila & Local Safari Corridors</span>
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {POPULAR_ROUTE_SHORTCUTS.filter(s => !s.badge.includes('🇮🇳') && !s.badge.includes('🇳🇵') && !s.badge.includes('🇲🇲') && !s.badge.includes('🚆')).map(sc => (
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

      </div>

      {/* Route Calculation Summary Bar */}
      {routeResult && (
        <div id="transport-results-section" className={`p-5 sm:p-6 rounded-3xl border shadow-xs space-y-4 scroll-mt-24 ${
          routeResult.isBorderRoute 
            ? 'bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border-purple-200/90' 
            : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-emerald-200/80'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-black text-lg sm:text-xl flex-wrap">
                <span className={`px-3 py-1 rounded-xl text-white text-xs sm:text-sm font-extrabold shadow-sm ${
                  fromLocation?.type === 'border_checkpost' ? 'bg-purple-700' : 'bg-emerald-600'
                }`}>
                  Departure: {fromLocation?.name || 'Selected Origin'} {fromLocation?.name_bn ? `(${fromLocation.name_bn})` : ''}
                </span>
                <ArrowRight className={`w-5 h-5 shrink-0 ${routeResult.isBorderRoute ? 'text-purple-600' : 'text-emerald-600'}`} />
                <span className={`px-3 py-1 rounded-xl text-white text-xs sm:text-sm font-extrabold shadow-sm ${
                  toLocation?.type === 'border_checkpost' ? 'bg-purple-700' : 'bg-teal-600'
                }`}>
                  Arrival: {toLocation?.name || 'Selected Destination'} {toLocation?.name_bn ? `(${toLocation.name_bn})` : ''}
                </span>
              </div>
              
              <p className={`text-xs flex items-center gap-2 flex-wrap font-medium ${
                routeResult.isBorderRoute ? 'text-purple-950' : 'text-emerald-900'
              }`}>
                <span className="font-bold">Distance:</span> ~{routeResult.distanceKm} km
                <span className={`inline-block w-1 h-1 rounded-full ${routeResult.isBorderRoute ? 'bg-purple-400' : 'bg-emerald-400'}`} />
                <span className="font-bold">Fare per Seat:</span> From ৳{routeResult.cheapestFare}
                <span className={`inline-block w-1 h-1 rounded-full ${routeResult.isBorderRoute ? 'bg-purple-400' : 'bg-emerald-400'}`} />
                <span className="font-bold">Selected:</span> {passengers} {passengers === 1 ? 'Seat' : 'Seats'} (Total from ৳{routeResult.cheapestFare * passengers})
                <span className={`inline-block w-1 h-1 rounded-full ${routeResult.isBorderRoute ? 'bg-purple-400' : 'bg-emerald-400'}`} />
                <span className="font-bold">Fastest Option:</span> {routeResult.fastestMode}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {routeResult.isBorderRoute && (
                <span className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-black shadow-xs flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Cross-Border Route</span>
                </span>
              )}
              <span className={`px-3 py-1.5 rounded-xl bg-white border text-xs font-bold shadow-xs ${
                routeResult.isBorderRoute ? 'text-purple-900 border-purple-200' : 'text-emerald-900 border-emerald-200'
              }`}>
                {filteredAndSortedRoutes.length} Direct Schedules & Vehicles
              </span>
            </div>
          </div>

          {/* Border Checkpost Detail Box (if Border Port is selected) */}
          {routeResult.isBorderRoute && routeResult.borderInfo && (
            <div className="p-4 rounded-2xl bg-white border border-purple-200 space-y-2 text-xs text-slate-800 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-black text-purple-900 text-sm flex items-center gap-1.5">
                  <span>🛂 Land Port: {routeResult.borderInfo.name}</span>
                </span>
                <span className="text-[11px] font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  Immigration Hours: {routeResult.borderInfo.immigrationHours}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100">
                  <strong className="text-purple-900 font-bold">Counterpart Checkpost: </strong>
                  <span>{routeResult.borderInfo.counterpartPort} ({routeResult.borderInfo.counterpartCountry})</span>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100">
                  <strong className="text-purple-900 font-bold">Travel Tax & Port Fees: </strong>
                  <span>{routeResult.borderInfo.travelTaxInfo}</span>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed font-normal pt-1">
                <strong className="text-slate-900 font-bold">Passport & Transit Advice: </strong>
                {routeResult.borderInfo.transitAdvice}
              </p>
            </div>
          )}

          {/* Transit Advice / Local Tip */}
          <div className={`p-3.5 rounded-2xl border text-xs flex items-start gap-2.5 ${
            routeResult.isBorderRoute
              ? 'bg-purple-100/60 border-purple-200 text-purple-950'
              : 'bg-white/80 border-emerald-200 text-emerald-950'
          }`}>
            <Info className={`w-4 h-4 shrink-0 mt-0.5 ${routeResult.isBorderRoute ? 'text-purple-600' : 'text-emerald-600'}`} />
            <p className="leading-relaxed font-medium">
              <strong className={`font-bold ${routeResult.isBorderRoute ? 'text-purple-900' : 'text-emerald-900'}`}>Transit & Route Guide:</strong> {routeResult.transitTip}
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
          filteredAndSortedRoutes.map(route => {
            const totalForSelection = (route.price_min || 500) * passengers;
            const isLocal = route.transport_type === 'Local';

            return (
              <div
                key={route.id}
                className={`bg-white rounded-3xl p-5 sm:p-7 border shadow-card hover:shadow-elevated transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative group ${
                  isLocal ? 'border-amber-200 bg-gradient-to-r from-amber-50/30 to-white' : 'border-slate-200'
                }`}
              >
                
                {/* Left Column: Operator & Transport Details */}
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${
                    isLocal 
                      ? 'bg-amber-100 border-amber-300 text-amber-900 group-hover:bg-amber-200' 
                      : 'bg-slate-100 border-slate-200 group-hover:bg-emerald-50'
                  }`}>
                    {getTransportIcon(route.transport_type, route.local_category)}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                        isLocal ? 'bg-amber-600 text-white' : 'bg-slate-900 text-white'
                      }`}>
                        {route.local_vehicle_name || route.transport_type}
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
                      <span><strong>Boarding:</strong> {route.boarding_points?.join(' • ') || 'Main Stand'}</span>
                    </div>

                    {/* Amenities & Local Tags */}
                    <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500 font-medium flex-wrap">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                        <Armchair className="w-3.5 h-3.5 text-emerald-600" /> Live Seat & Reserve
                      </span>
                      {route.capacity_seats && (
                        <span className="inline-flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                          <Users className="w-3.5 h-3.5 text-slate-500" /> {route.capacity_seats} Seats Capacity
                        </span>
                      )}
                      {route.reserve_price && (
                        <span className="inline-flex items-center gap-1 text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-md">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Full Reserve: ৳{route.reserve_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Middle Column: Route & Timing with Departure / Arrival Place Names */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center text-xs lg:min-w-[360px]">
                  <div>
                    <p className="text-[10px] text-emerald-700 font-extrabold uppercase truncate" title={`Departure: ${fromLocation?.name || route.from_district}`}>
                      From: {fromLocation?.name || route.from_district}
                    </p>
                    <p className="font-black text-slate-900 mt-1 text-sm">{route.departure_time.split('/')[0]}</p>
                    <p className="text-[10px] text-slate-500">{fromLocation?.name_bn || route.from_district}</p>
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
                    <span className="text-[10px] text-slate-400">Direct Route</span>
                  </div>

                  <div>
                    <p className="text-[10px] text-teal-700 font-extrabold uppercase truncate" title={`Arrival: ${toLocation?.name || route.to_district}`}>
                      To: {toLocation?.name || route.to_district}
                    </p>
                    <p className="font-black text-slate-900 mt-1 text-sm">{route.arrival_time.split('/')[0]}</p>
                    <p className="text-[10px] text-slate-500">{toLocation?.name_bn || route.to_district}</p>
                  </div>
                </div>

                {/* Right Column: Price & Actions */}
                <div className="flex items-center justify-between lg:flex-col lg:items-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="lg:text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Fare ({passengers} {passengers === 1 ? 'Seat' : 'Seats'})
                    </p>
                    <p className="text-xl font-black text-emerald-700 font-mono">
                      ৳{totalForSelection}
                      <span className="text-xs text-slate-400 font-sans font-normal ml-1">
                        (৳{route.price_min}/seat)
                      </span>
                    </p>
                    {route.reserve_price && (
                      <p className="text-[11px] text-slate-500 font-medium">
                        Reserve Full: <strong className="text-slate-800 font-mono">৳{route.reserve_price}</strong>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* View Details Button */}
                    <button
                      onClick={() => setDetailRouteModal(route)}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
                      title="View complete route, stops, amenities and baggage policy"
                    >
                      <Info className="w-4 h-4 text-emerald-600" />
                      <span>View Details</span>
                    </button>

                    {/* Seat selection / Reserve Button */}
                    <button
                      onClick={() => handleOpenSeatModal(route)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black flex items-center gap-2 shadow-elevated transition-all"
                    >
                      <Armchair className="w-4 h-4" />
                      <span>{route.reserve_price ? 'Seats / Reserve' : 'Select Seats & Book'}</span>
                    </button>

                    {route.contact_phone && (
                      <a
                        href={`tel:${route.contact_phone.split('/')[0].trim()}`}
                        className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
                        title="Call Stand / Union Helpline"
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
            );
          })
        ) : (!fromLocation || !toLocation) ? (
          <div className="text-center py-16 px-6 bg-gradient-to-b from-slate-50 to-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-emerald-700 mx-auto shadow-xs">
              <Compass className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-lg font-black text-slate-900">
                Choose Your Departure & Arrival Places
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Type your starting point and destination above to view verified inter-district bus, train, launch, flight schedules, and book seats.
              </p>
            </div>
            {/* Quick Suggestions */}
            <div className="pt-2 max-w-xl mx-auto">
              <p className="text-xs font-bold text-slate-600 mb-2.5">Or choose a popular corridor:</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { from: 'Dhaka', to: "Cox's Bazar", label: "Dhaka ➔ Cox's Bazar" },
                  { from: 'Dhaka', to: 'Sylhet', label: 'Dhaka ➔ Sylhet' },
                  { from: 'Dhaka', to: 'Benapole Land Port & Immigration (বেনাপোল)', label: 'Dhaka ➔ Benapole' },
                  { from: 'Chattogram', to: 'Sajek', label: 'Chattogram ➔ Sajek' },
                  { from: 'Dhaka', to: 'Kuakata', label: 'Dhaka ➔ Kuakata' },
                  { from: 'Dhaka', to: 'Sreemangal', label: 'Dhaka ➔ Sreemangal' },
                ].map(pair => (
                  <button
                    key={pair.label}
                    onClick={() => {
                      const f = getLocationByNameOrId(pair.from) || ALL_SEARCHABLE_LOCATIONS[0];
                      const t = getLocationByNameOrId(pair.to) || ALL_SEARCHABLE_LOCATIONS[1];
                      handleSelectFrom(f);
                      handleSelectTo(t);
                    }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 shadow-2xs transition-all hover:scale-102"
                  >
                    {pair.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <Bus className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No routes found for selected filter</h3>
            <p className="text-xs text-slate-500">Switch to "All Modes" to view all available transport options.</p>
          </div>
        )}
      </div>

      {/* Comprehensive Transport Route Detail Modal */}
      {detailRouteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                  {getTransportIcon(detailRouteModal.transport_type, detailRouteModal.local_category)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-extrabold uppercase">
                      {detailRouteModal.local_vehicle_name || detailRouteModal.transport_type}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      Schedule: {detailRouteModal.schedule_days}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    {detailRouteModal.company}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setDetailRouteModal(null)}
                className="p-2.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Journey Route Strip */}
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-5 rounded-2xl border border-emerald-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>DEPARTURE</span>
                <span>DURATION: ~{detailRouteModal.duration}</span>
                <span>ARRIVAL</span>
              </div>
              
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-base sm:text-lg font-black text-slate-900">
                    {fromLocation?.name || detailRouteModal.from_district}
                  </p>
                  <p className="text-xs font-extrabold text-emerald-700">
                    {detailRouteModal.departure_time.split('/')[0]}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {fromLocation?.name_bn || fromLocation?.districtName || detailRouteModal.from_district}
                  </p>
                </div>

                <div className="flex flex-col items-center flex-1 max-w-[140px] px-2">
                  <div className="w-full h-0.5 bg-emerald-400 relative">
                    <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-emerald-600 rotate-45" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 mt-1">Direct Journey</span>
                </div>

                <div className="text-right">
                  <p className="text-base sm:text-lg font-black text-slate-900">
                    {toLocation?.name || detailRouteModal.to_district}
                  </p>
                  <p className="text-xs font-extrabold text-teal-700">
                    {detailRouteModal.arrival_time.split('/')[0]}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {toLocation?.name_bn || toLocation?.districtName || detailRouteModal.to_district}
                  </p>
                </div>
              </div>
            </div>

            {/* Boarding Points & Dropping Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-extrabold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Boarding Counters / Stands:</span>
                </span>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {detailRouteModal.boarding_points?.join(', ') || `${fromLocation?.name || detailRouteModal.from_district} Main Bus Terminal / Railway Station`}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-extrabold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  <span>Dropping Stand / Destination:</span>
                </span>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {detailRouteModal.dropping_points?.join(', ') || `${toLocation?.name || detailRouteModal.to_district} Main Stand / Resort Gateway`}
                </p>
              </div>
            </div>

            {/* Pricing Breakdown & Seats */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-xs text-slate-400 font-medium">Official Rate per Seat:</p>
                <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                  <span className="text-2xl font-black font-mono text-emerald-400">৳{detailRouteModal.price_min}</span>
                  <span className="text-xs text-slate-300">/ person (Total ৳{detailRouteModal.price_min * passengers} for {passengers} seats)</span>
                </div>
              </div>

              {detailRouteModal.reserve_price && (
                <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-700 pt-2 sm:pt-0 sm:pl-4">
                  <p className="text-xs text-amber-300 font-bold">Full Charter / Reserve:</p>
                  <p className="text-xl font-black font-mono text-white">৳{detailRouteModal.reserve_price.toLocaleString()}</p>
                </div>
              )}
            </div>

            {/* Included Amenities & Features */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Onboard Amenities & Services:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>AC / Air Ventilation</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Push-back Recliner</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>20kg Free Luggage</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>USB Fast Charger</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Emergency First Aid</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Driver</span>
                </div>
              </div>
            </div>

            {/* Contact & Actions */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              {detailRouteModal.contact_phone && (
                <a
                  href={`tel:${detailRouteModal.contact_phone.split('/')[0].trim()}`}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call Operator Helpline ({detailRouteModal.contact_phone.split('/')[0].trim()})</span>
                </a>
              )}

              <button
                onClick={() => {
                  const target = detailRouteModal;
                  setDetailRouteModal(null);
                  handleOpenSeatModal(target);
                }}
                className="w-full sm:w-auto flex-1 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black flex items-center justify-center gap-2 shadow-elevated transition-all"
              >
                <Armchair className="w-4 h-4" />
                <span>Select Seats & Book Online (Enter ⏎)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Interactive Multi-Seat Selection & Digital E-Ticket Modal */}
      {isSeatModalOpen && selectedRouteForModal && (
        <SeatSelectionModal
          route={selectedRouteForModal}
          travelDate={travelDate}
          initialPassengerCount={passengers}
          onClose={() => setIsSeatModalOpen(false)}
          onBookingSuccess={handleBookingConfirmed}
        />
      )}

      {/* Local Vehicles Stand & Union Rates Guide Modal */}
      {showLocalGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    Bangladesh Local Vehicles & Stand Guide
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Verified union fares, negotiation tips, army escort schedules, and feeder vehicles.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLocalGuideModal(false)}
                className="p-2.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Guide Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LOCAL_VEHICLES_GUIDE.map(item => (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 hover:border-amber-400 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-extrabold uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <h4 className="text-base font-black text-slate-900">{item.name}</h4>
                      <p className="text-xs text-slate-500 font-bold">{item.name_bn}</p>
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-xl border border-slate-200">
                      {item.capacity}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-100 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Standard Union Fare:</span>
                      <span className="font-mono font-black text-emerald-700">{item.typicalFare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Top Corridors:</span>
                      <span className="font-semibold text-slate-800 text-right line-clamp-1">{item.bestFor}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/80">
                    <strong className="text-amber-900 font-bold">Traveler Tip: </strong>
                    {item.tips}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowLocalGuideModal(false)}
                className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
              >
                Close Guide
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Bangladesh Border Customs & Immigration Ports Modal */}
      {showBorderGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto border border-purple-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-800 shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-extrabold uppercase">
                      20 Active Ports
                    </span>
                    <span className="text-xs text-purple-700 font-bold">
                      National Land Port Authority (বাংলাদেশ স্থলবন্দর কর্তৃপক্ষ)
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    Bangladesh Border Land Ports & Immigration Checkposts
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowBorderGuideModal(false)}
                className="p-2.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Travel Tax & Customs Guidelines Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-950 text-white space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xs sm:text-sm font-black flex items-center gap-2 text-purple-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Important Cross-Border Travel & Immigration Advisory</span>
                </h4>
                <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
                  Land Travel Tax: ৳1,000 + Port Fee: ৳500
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Travel Tax is payable online via <strong>Sonali Bank e-Service portal</strong> or directly at the Border Bank Booth. Ensure your passport has at least <strong>6 months validity</strong> and the specific Land Port (e.g. Benapole, Changrabandha, Dawki, Agartala) is endorsed on your visa.
              </p>
            </div>

            {/* Search Input for Border Ports */}
            <div className="relative">
              <input
                type="text"
                value={borderSearchQuery}
                onChange={(e) => setBorderSearchQuery(e.target.value)}
                placeholder="Search border port by name, counterpart city (e.g. Kolkata, Shillong, Siliguri, Agartala, Nepal, Myanmar)..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
              <Search className="w-4 h-4 text-purple-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Border Ports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BANGLADESH_BORDER_CHECKPOSTS.filter(p => {
                if (!borderSearchQuery.trim()) return true;
                const q = borderSearchQuery.toLowerCase();
                return (
                  p.name.toLowerCase().includes(q) ||
                  p.name_bn.toLowerCase().includes(q) ||
                  p.counterpartPort.toLowerCase().includes(q) ||
                  p.counterpartState.toLowerCase().includes(q) ||
                  p.popularFor.toLowerCase().includes(q) ||
                  p.districtName.toLowerCase().includes(q)
                );
              }).map(port => (
                <div
                  key={port.id}
                  className="p-5 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-purple-400 transition-all space-y-3 relative group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-extrabold uppercase text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                            {port.portType}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500">
                            {port.upazilaName}, {port.districtName}
                          </span>
                        </div>
                        <h4 className="text-base font-black text-slate-900 mt-1">
                          {port.name}
                        </h4>
                        <p className="text-xs text-purple-900 font-bold">
                          {port.name_bn}
                        </p>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 shrink-0">
                        {port.counterpartCountry === 'Myanmar' ? '🇲🇲 Myanmar' : '🇮🇳 India'}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-700 font-bold">Counterpart Port: </strong>
                          <span className="text-purple-900 font-bold">{port.counterpartPort}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span><strong>Operating Hours: </strong>{port.immigrationHours}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-2">
                        <strong>Gateway to: </strong>{port.popularFor}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                      <strong className="text-purple-950 font-bold">Direct Operators: </strong>
                      {port.directBusOperators.join(', ')}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold text-slate-400">
                      {port.division} Division
                    </span>

                    <button
                      onClick={() => {
                        const loc = getLocationByNameOrId(port.id) || ALL_SEARCHABLE_LOCATIONS.find(l => l.id === port.id);
                        if (loc) {
                          setToLocation(loc);
                          setToQuery(loc.name);
                        }
                        setShowBorderGuideModal(false);
                        const resultsSection = document.getElementById('transport-results-section');
                        if (resultsSection) {
                          resultsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black flex items-center gap-1 shadow-xs transition-all active:scale-95"
                    >
                      <span>Set as Destination</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Showing all 20 recognized Land Customs Stations & Immigration Ports in Bangladesh
              </span>
              <button
                onClick={() => setShowBorderGuideModal(false)}
                className="px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
              >
                Close Guide
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
