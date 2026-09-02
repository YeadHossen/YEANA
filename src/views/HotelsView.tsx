import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Hotel as HotelIcon, 
  Star, 
  Filter, 
  Phone, 
  Check, 
  Wifi, 
  Wind, 
  Car, 
  Utensils, 
  X, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Waves, 
  Coffee, 
  Dumbbell, 
  Mountain, 
  Compass, 
  SlidersHorizontal, 
  CheckCircle2, 
  Users, 
  BedDouble, 
  ShieldCheck, 
  Bookmark, 
  Share2, 
  ArrowRight,
  QrCode,
  Download,
  Building,
  TreePine,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  Layers,
  Eye,
  CheckCircle,
  Globe,
  Sparkle
} from 'lucide-react';
import { Hotel, District, HotelStarRating, PropertyCategory, HotelRoomType, RoomInventoryItem, HotelBooking } from '../types';
import { HotelCard } from '../components/common/HotelCard';
import { useLanguage } from '../context/LanguageContext';
import { useTrip } from '../context/TripContext';
import { BANGLADESH_UPAZILAS, UpazilaInfo } from '../data/upazilaData';
import { 
  getAllAccommodations, 
  searchAccommodations, 
  getAccommodationsStats,
  getHotelRealPhotos,
  LabeledHotelPhoto,
  HotelSearchFilterParams 
} from '../services/hotelService';
import { DataService } from '../services/dataService';

interface HotelsViewProps {
  onSelectHotel?: (hotel: Hotel) => void;
  selectedHotelModal?: Hotel | null;
  onCloseModal?: () => void;
}

export const HotelsView: React.FC<HotelsViewProps> = ({
  onSelectHotel,
  selectedHotelModal: externalSelectedHotel,
  onCloseModal: externalOnCloseModal
}) => {
  const { t, language } = useLanguage();
  const { activeTrip, addCustomStopToTrip, updateTripBudget } = useTrip();

  // Master Accommodations List
  const [allHotels, setAllHotels] = useState<Hotel[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('All');
  const [selectedStar, setSelectedStar] = useState<string>('All'); // 'All' | '5' | '4' | '3' | '2' | 'Resort'
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'rating' | 'stars'>('recommended');

  // Amenity filters
  const [poolOnly, setPoolOnly] = useState<boolean>(false);
  const [breakfastOnly, setBreakfastOnly] = useState<boolean>(false);
  const [acOnly, setAcOnly] = useState<boolean>(false);
  const [gymOnly, setGymOnly] = useState<boolean>(false);
  const [viewsOnly, setViewsOnly] = useState<boolean>(false);

  // Active Hotel Modal State
  const [activeHotel, setActiveHotel] = useState<Hotel | null>(null);
  const [roomInventory, setRoomInventory] = useState<RoomInventoryItem[]>([]);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [photoCategoryFilter, setPhotoCategoryFilter] = useState<'all' | 'rooms' | 'suites' | 'pool' | 'dining' | 'exterior'>('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const [checkInDate, setCheckInDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [checkOutDate, setCheckOutDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [roomCount, setRoomCount] = useState<number>(1);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<HotelBooking | null>(null);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load live room inventory whenever active hotel changes
  useEffect(() => {
    if (activeHotel) {
      DataService.getHotelRoomAvailability(activeHotel.id).then(inv => {
        setRoomInventory(inv);
      });
    } else {
      setRoomInventory([]);
    }
  }, [activeHotel]);

  // Sync external selected hotel if passed from parent
  useEffect(() => {
    if (externalSelectedHotel) {
      setActiveHotel(externalSelectedHotel);
      setSelectedRoomIndex(0);
      setSelectedPhotoIndex(0);
      setPhotoCategoryFilter('all');
      setConfirmedBookingId(null);
    }
  }, [externalSelectedHotel]);

  // Real Photos computation for active hotel
  const hotelPhotos: LabeledHotelPhoto[] = useMemo(() => {
    return activeHotel ? getHotelRealPhotos(activeHotel) : [];
  }, [activeHotel]);

  const filteredPhotos = useMemo(() => {
    if (photoCategoryFilter === 'all') return hotelPhotos;
    return hotelPhotos.filter(p => p.category === photoCategoryFilter);
  }, [hotelPhotos, photoCategoryFilter]);

  const activePhoto = hotelPhotos[selectedPhotoIndex] || hotelPhotos[0] || (activeHotel ? {
    url: activeHotel.image_url,
    category: 'exterior',
    title: activeHotel.name,
    title_bn: activeHotel.name_bn
  } : null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen || hotelPhotos.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev + 1) % hotelPhotos.length);
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev - 1 + hotelPhotos.length) % hotelPhotos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, hotelPhotos.length]);

  // Load Accommodations & Districts
  useEffect(() => {
    async function loadData() {
      const [hList, dList] = await Promise.all([
        DataService.getHotels(),
        DataService.getDistricts()
      ]);
      setAllHotels(hList.length > 0 ? hList : getAllAccommodations());
      setDistricts(dList);
    }
    loadData();
  }, []);

  // Quick stats
  const stats = useMemo(() => getAccommodationsStats(), []);

  // Upazilas list for selected district
  const availableUpazilas = useMemo(() => {
    if (selectedDistrict === 'All') return BANGLADESH_UPAZILAS;
    return BANGLADESH_UPAZILAS.filter(u => u.districtId.toLowerCase() === selectedDistrict.toLowerCase());
  }, [selectedDistrict]);

  // Handle District change (resets upazila if not in new district)
  const handleDistrictChange = (distId: string) => {
    setSelectedDistrict(distId);
    setSelectedUpazila('All');
  };

  // Filtered & Sorted Hotels
  const filteredHotels = useMemo(() => {
    const starsFilter: HotelStarRating[] | undefined = 
      selectedStar === '5' ? [5] :
      selectedStar === '4' ? [4] :
      selectedStar === '3' ? [3] :
      selectedStar === '2' ? [2] : undefined;

    const categoriesFilter: PropertyCategory[] | undefined = 
      selectedStar === 'Resort' ? ['Resort & Spa', 'Eco-Resort & Cottage', 'Luxury Resort & Spa' as any, 'Water Villa & Houseboat'] :
      selectedCategory !== 'All' ? [selectedCategory as PropertyCategory] : undefined;

    const filterParams: HotelSearchFilterParams = {
      query: searchQuery,
      districtId: selectedDistrict,
      upazilaId: selectedUpazila,
      starRatings: starsFilter,
      propertyCategories: categoriesFilter,
      maxPrice: maxPrice < 30000 ? maxPrice : undefined,
      acOnly,
      poolOnly,
      breakfastOnly,
      gymOnly,
      viewsOnly,
      sortBy
    };

    return searchAccommodations(filterParams);
  }, [
    searchQuery, 
    selectedDistrict, 
    selectedUpazila, 
    selectedStar, 
    selectedCategory, 
    maxPrice, 
    acOnly, 
    poolOnly, 
    breakfastOnly, 
    gymOnly, 
    viewsOnly, 
    sortBy
  ]);

  // Calculate nights
  const numberOfNights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 1;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkInDate, checkOutDate]);

  // Selected Room in Modal
  const currentRoom = useMemo(() => {
    if (!activeHotel || !activeHotel.room_types || activeHotel.room_types.length === 0) {
      return {
        name: 'Standard AC Room',
        name_bn: 'স্ট্যান্ডার্ড এসি রুম',
        price: activeHotel?.price_per_night || 3000,
        bed: '1 King or 2 Twin Beds',
        capacity: '2 Adults',
        is_ac: true
      };
    }
    const r = activeHotel.room_types[selectedRoomIndex] || activeHotel.room_types[0];
    if (typeof r === 'string') {
      return {
        name: r,
        name_bn: r,
        price: activeHotel.price_per_night,
        bed: '1 King Bed',
        capacity: '2 Adults',
        is_ac: activeHotel.has_ac
      };
    }
    return r;
  }, [activeHotel, selectedRoomIndex]);

  const totalBookingCost = useMemo(() => {
    return (currentRoom.price || 3000) * numberOfNights * roomCount;
  }, [currentRoom, numberOfNights, roomCount]);

  const handleOpenHotelModal = (hotel: Hotel) => {
    setActiveHotel(hotel);
    setSelectedRoomIndex(0);
    setConfirmedBookingId(null);
    if (onSelectHotel) onSelectHotel(hotel);
  };

  const handleCloseModal = () => {
    setActiveHotel(null);
    setConfirmedBookingId(null);
    if (externalOnCloseModal) externalOnCloseModal();
  };

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      showToast('Please enter guest name and phone number.');
      return;
    }

    if (!activeHotel) return;

    // Check available rooms for this room type
    const invItem = roomInventory.find(r => r.room_type === currentRoom.name);
    if (invItem && invItem.available_rooms < roomCount) {
      showToast(`⚠️ Only ${invItem.available_rooms} rooms available for ${currentRoom.name}. Please select fewer rooms.`);
      return;
    }

    const pnr = `HTL-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    
    const newBooking: Partial<HotelBooking> = {
      id: pnr,
      hotel_id: activeHotel.id,
      hotel_name: activeHotel.name,
      hotel_image: activeHotel.image_url,
      district_name: activeHotel.district_name || activeHotel.location,
      room_type: currentRoom.name,
      room_count: roomCount,
      guest_count: guestCount,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      nights: numberOfNights,
      guest_name: guestName.trim(),
      guest_phone: guestPhone.trim(),
      guest_email: guestEmail.trim() || 'traveler@yeana.bd',
      total_cost: totalBookingCost,
      status: 'confirmed',
      special_requests: specialRequests.trim()
    };

    const saved = await DataService.createHotelBooking(newBooking);
    setConfirmedBooking(saved);
    setConfirmedBookingId(pnr);
    
    // Refresh room inventory
    const updatedInv = await DataService.getHotelRoomAvailability(activeHotel.id);
    setRoomInventory(updatedInv);

    showToast(`🎉 Hotel Voucher Confirmed! Booking ID: ${pnr}`);

    if (activeTrip) {
      addCustomStopToTrip(
        activeTrip.id,
        `Stay at ${activeHotel.name} (${currentRoom.name})`,
        1,
        activeHotel.check_in,
        `${numberOfNights} Nights • ${roomCount} Room • Total: ৳${totalBookingCost.toLocaleString()}`
      );
      updateTripBudget(activeTrip.id, {
        ...activeTrip.budget,
        hotel: Math.max(activeTrip.budget.hotel, totalBookingCost)
      });
      showToast(`Synced ${activeHotel.name} to Trip Planner "${activeTrip.title}"!`);
    }
  };

  // Quick Shortcuts
  const QUICK_SHORTCUTS = [
    { label: 'Sajek Valley Cloud Resorts', query: 'Sajek', badge: '⭐⭐⭐⭐ Eco Stays' },
    { label: "Cox's Bazar 5-Star Beach", query: "Cox's Bazar", star: '5', badge: 'Sea View' },
    { label: 'Sreemangal Tea Cottages', query: 'Sreemangal', badge: 'Tea Gardens' },
    { label: 'Tanguar Haor Houseboats', query: 'Tahirpur', badge: 'Haor Water Villa' },
    { label: 'Kuakata Beach Resorts', query: 'Kuakata', badge: 'Sunrise & Sunset' },
    { label: 'Gazipur Forest Resorts', query: 'Gazipur', badge: 'Luxury Pools' },
    { label: 'Bandarban Hilltop Villas', query: 'Bandarban', badge: 'Mountain Peaks' },
    { label: 'Bogura Momo Inn & Heritage', query: 'Bogura', star: '5', badge: 'Heritage Stay' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-24">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner with Full-Country Stats */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950 p-6 sm:p-10 text-white shadow-elevated">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-extrabold uppercase tracking-wider border border-sky-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>All 64 Districts & 495+ Upazilas, Thanas & Pouroshavas</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-sans">
            Hotels, Resorts & Eco-Stays Across Bangladesh
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Find and book every stay in Bangladesh: from international <strong>5-Star Luxury Hotels</strong> & <strong>Private Pool Resorts</strong> to authentic <strong>4-Star Stays</strong>, <strong>3-Star Modern Stays</strong>, <strong>2-Star Budget Lodges</strong>, and <strong>Pouroshava & District Dakbangla</strong> in every single upazila!
          </p>

          {/* Quick Category Summary Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block font-black text-base text-amber-400">⭐⭐⭐⭐⭐</span>
              <span className="text-[11px] text-slate-300 font-semibold">{stats.fiveStar}+ 5-Star Luxury</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block font-black text-base text-sky-400">⭐⭐⭐⭐</span>
              <span className="text-[11px] text-slate-300 font-semibold">{stats.fourStar}+ 4-Star Premium</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block font-black text-base text-emerald-400">🌴 {stats.resorts}+</span>
              <span className="text-[11px] text-slate-300 font-semibold">Resorts & Eco-Villas</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block font-black text-base text-purple-400">🏛️ {stats.upazilasCount}+</span>
              <span className="text-[11px] text-slate-300 font-semibold">Upazilas Covered</span>
            </div>
          </div>
        </div>

        <div className="absolute right-[-30px] bottom-[-30px] opacity-10 pointer-events-none">
          <HotelIcon className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Main Search & Cascading Filter Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        
        {/* Star Rating Primary Filter Bar */}
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Select Star Rating & Stay Type</span>
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'All', label: 'All Stays (সকল হোটেল ও রিসোর্ট)', icon: Building },
              { id: '5', label: '5-Star Luxury (⭐⭐⭐⭐⭐)', icon: Sparkles },
              { id: '4', label: '4-Star Premium (⭐⭐⭐⭐)', icon: Star },
              { id: '3', label: '3-Star Comfort (⭐⭐⭐)', icon: Building },
              { id: '2', label: '2-Star Budget (⭐⭐)', icon: Building },
              { id: 'Resort', label: 'Resorts & Eco-Lodges (রিসোর্ট ও ভিলা)', icon: TreePine },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = selectedStar === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStar(tab.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Row: Search Query, District, Upazila / Thana / Pouroshava */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Universal Text Search */}
          <div className="md:col-span-6 relative">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search Hotel, Resort, Upazila, Thana or Pouroshava</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search e.g. Sajek, Inani, Sreemangal, Savar, InterContinental, বাঘাইছড়ি..."
                className="w-full pl-10 pr-9 py-3.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
              <Search className="w-4 h-4 text-sky-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* District Selector (64 Districts) */}
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Zila / District (জেলা)</span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="All">All 64 Districts (সকল জেলা)</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.name_bn})
                </option>
              ))}
            </select>
          </div>

          {/* Upazila / Thana / Pouroshava Selector */}
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Upazila / Thana (উপজেলা)</span>
            </label>
            <select
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="All">
                {selectedDistrict === 'All' ? 'All ~495 Upazilas & Thanas' : `All Upazilas in ${selectedDistrict}`}
              </option>
              {availableUpazilas.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.name_bn})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Quick Discovery Shortcuts */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Popular Tourist Corridors & Stay Destinations</span>
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {QUICK_SHORTCUTS.map(sc => (
              <button
                key={sc.label}
                onClick={() => {
                  setSearchQuery(sc.query);
                  if (sc.star) setSelectedStar(sc.star);
                  else setSelectedStar('All');
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-sky-100 hover:text-sky-900 text-slate-700 whitespace-nowrap transition-all flex items-center gap-1.5 border border-slate-200/80"
              >
                <span>{sc.label}</span>
                <span className="text-[10px] bg-white px-1.5 py-0.2 rounded-full text-slate-600 font-medium">
                  {sc.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Toggles & Price Range Slider */}
        <div className="pt-3 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
          
          {/* Amenity Filter Checkbox Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-500 mr-1">Amenities:</span>
            
            <button
              onClick={() => setPoolOnly(!poolOnly)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                poolOnly ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>Swimming Pool</span>
            </button>

            <button
              onClick={() => setBreakfastOnly(!breakfastOnly)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                breakfastOnly ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Free Breakfast</span>
            </button>

            <button
              onClick={() => setAcOnly(!acOnly)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                acOnly ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>AC Rooms</span>
            </button>

            <button
              onClick={() => setGymOnly(!gymOnly)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                gymOnly ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Gym / Fitness</span>
            </button>

            <button
              onClick={() => setViewsOnly(!viewsOnly)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                viewsOnly ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>Hill / Sea View</span>
            </button>
          </div>

          {/* Price Range Slider & Sorting */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-bold">Max / Night:</span>
              <input
                type="range"
                min="800"
                max="30000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-28 sm:w-36 accent-sky-600 cursor-pointer"
              />
              <span className="font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                {maxPrice >= 30000 ? 'Any ৳' : `৳${maxPrice.toLocaleString()}`}
              </span>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none"
              >
                <option value="recommended">Best Recommended</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Top Guest Rating</option>
                <option value="stars">Star Rating: High to Low</option>
              </select>
            </div>
          </div>

        </div>

      </div>

      {/* Results Header Count Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-black text-slate-900">
            Available Accommodations & Resorts
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
            {filteredHotels.length} Stays Found
          </span>
        </div>
        
        <p className="text-xs text-slate-500">
          Showing 2-Star to 5-Star Hotels, Resorts & Dakbangla across Bangladesh
        </p>
      </div>

      {/* Hotels Grid */}
      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onSelect={handleOpenHotelModal}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-4">
          <HotelIcon className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-black text-slate-800">No properties match your filter</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try clearing search queries, increasing the maximum price limit, or selecting "All 64 Districts".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDistrict('All');
              setSelectedUpazila('All');
              setSelectedStar('All');
              setMaxPrice(30000);
              setPoolOnly(false);
              setBreakfastOnly(false);
              setAcOnly(false);
              setGymOnly(false);
              setViewsOnly(false);
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* HOTEL DETAIL, ROOM SELECTION & VERIFIED E-VOUCHER MODAL */}
      {/* ========================================================================= */}
      {activeHotel && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div 
            className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md transition-all z-30 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ========================================================================= */}
            {/* 1. INTERACTIVE REAL PHOTO SHOWCASE & HERO BANNER */}
            {/* ========================================================================= */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-950 shrink-0 select-none group">
              <img
                src={activePhoto?.url || activeHotel.image_url}
                alt={activePhoto?.title || activeHotel.name}
                className="w-full h-full object-cover transition-all duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
              
              {/* Top Bar Badges */}
              <div className="absolute top-4 left-4 right-16 flex items-center justify-between gap-2 z-20">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-emerald-500 text-slate-950 text-[11px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-md">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified Real Photos
                  </span>
                  <span className="bg-amber-500 text-slate-950 text-[11px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" /> 
                    {activeHotel.star_category || 4}-Star
                  </span>
                </div>

                <button
                  onClick={() => {
                    setLightboxIndex(selectedPhotoIndex);
                    setIsLightboxOpen(true);
                  }}
                  className="bg-slate-900/80 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md border border-white/20 shadow-md flex items-center gap-1.5 transition-all"
                  title="Open Fullscreen Lightbox"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>
              </div>

              {/* Next / Previous Photo Buttons over Hero */}
              {hotelPhotos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPhotoIndex((prev) => (prev - 1 + hotelPhotos.length) % hotelPhotos.length);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md transition-all opacity-80 group-hover:opacity-100 shadow-lg z-20"
                    title="Previous Photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPhotoIndex((prev) => (prev + 1) % hotelPhotos.length);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md transition-all opacity-80 group-hover:opacity-100 shadow-lg z-20"
                    title="Next Photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Bottom Caption & Hotel Information */}
              <div className="absolute bottom-3 left-4 right-4 text-white space-y-1.5 z-20">
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-slate-900/90 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
                    <Camera className="w-3 h-3 text-emerald-400" />
                    <span>Photo {selectedPhotoIndex + 1} of {hotelPhotos.length}: {activePhoto?.title}</span>
                  </span>
                  <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                    ★ {activeHotel.rating} ({activeHotel.reviews_count || 120} reviews)
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black">{activeHotel.name}</h2>
                <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{activeHotel.address || activeHotel.location}</span>
                </p>
              </div>
            </div>

            {/* Photo Category Filter Tabs & Interactive Real Thumbnail Strip */}
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 space-y-2">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
                <span className="text-[11px] text-slate-400 font-bold uppercase shrink-0 mr-1 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-emerald-400" /> Filter Gallery:
                </span>
                {[
                  { id: 'all', label: `All Photos (${hotelPhotos.length})` },
                  { id: 'rooms', label: '🛏️ Rooms & Suites' },
                  { id: 'pool', label: '🌊 Pool & Views' },
                  { id: 'dining', label: '🍽️ Dining & Buffet' },
                  { id: 'exterior', label: '🏛️ Exterior & Grounds' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setPhotoCategoryFilter(tab.id as any)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      photoCategoryFilter === tab.id
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Thumbnail Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {filteredPhotos.map((photo, pIdx) => {
                  const globalIdx = hotelPhotos.findIndex(p => p.url === photo.url);
                  const isSelected = selectedPhotoIndex === globalIdx;

                  return (
                    <button
                      key={pIdx}
                      onClick={() => setSelectedPhotoIndex(globalIdx >= 0 ? globalIdx : 0)}
                      className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all group ${
                        isSelected 
                          ? 'border-emerald-400 ring-2 ring-emerald-500/50 scale-105 shadow-md' 
                          : 'border-slate-700 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop&q=80';
                        }}
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-emerald-950/30 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-emerald-300 drop-shadow" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
              
              {/* Hotel Overview & Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-700">Property Overview</h3>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    🟢 Live Instant Confirmation
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeHotel.description || `Experience world-class hospitality at ${activeHotel.name} in ${activeHotel.upazila_name || activeHotel.location}. Featuring high-speed Wi-Fi, round-the-clock room service, and authentic dining.`}
                </p>
              </div>

              {/* Facilities Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Property Amenities & Facilities</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {activeHotel.has_wifi && <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-bold"><Wifi className="w-4 h-4 text-indigo-600" /> High-speed WiFi</div>}
                  {activeHotel.has_ac && <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-bold"><Wind className="w-4 h-4 text-emerald-600" /> Air Conditioning</div>}
                  {activeHotel.has_swimming_pool && <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-800 font-bold"><Waves className="w-4 h-4 text-sky-600" /> Swimming Pool</div>}
                  {activeHotel.has_breakfast && <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 font-bold"><Coffee className="w-4 h-4 text-amber-600" /> Buffet Breakfast</div>}
                  {activeHotel.has_gym && <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50 border border-purple-100 text-purple-800 font-bold"><Dumbbell className="w-4 h-4 text-purple-600" /> Fitness Gym</div>}
                  {activeHotel.has_restaurant && <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-bold"><Utensils className="w-4 h-4 text-amber-600" /> In-House Dining</div>}
                  {activeHotel.has_parking && <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-bold"><Car className="w-4 h-4 text-emerald-600" /> Secure Parking</div>}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-bold"><ShieldCheck className="w-4 h-4 text-teal-600" /> 24/7 Security & CCTV</div>
                </div>
              </div>

              {/* Room Selection Grid with Real Room Photos */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <BedDouble className="w-4 h-4 text-sky-600" />
                    <span>Select Room Type with Real Photos (রুম নির্বাচন করুন)</span>
                  </h4>
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                    Instant Online Confirmation
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(activeHotel.room_types && activeHotel.room_types.length > 0 ? activeHotel.room_types : [
                    { 
                      name: 'Standard AC Room', 
                      name_bn: 'স্ট্যান্ডার্ড এসি রুম', 
                      price: activeHotel.price_per_night, 
                      bed: '1 King Bed', 
                      capacity: '2 Adults', 
                      is_ac: true,
                      image_url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80'
                    },
                    { 
                      name: 'Executive Suite', 
                      name_bn: 'এক্সিকিউটিভ স্যুট', 
                      price: Math.round(activeHotel.price_per_night * 1.5), 
                      bed: '1 King Bed + Lounge', 
                      capacity: '3 Guests', 
                      is_ac: true,
                      image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80'
                    }
                  ]).map((room: any, index: number) => {
                    const isSelected = selectedRoomIndex === index;
                    const rName = typeof room === 'string' ? room : room.name;
                    const rNameBn = typeof room === 'string' ? '' : room.name_bn;
                    const rPrice = typeof room === 'string' ? activeHotel.price_per_night : room.price;
                    const rBed = typeof room === 'string' ? '1 King Bed' : room.bed;
                    const rCap = typeof room === 'string' ? '2 Adults' : room.capacity;
                    const rImg = typeof room === 'object' && room.image_url ? room.image_url : (hotelPhotos[index + 1]?.url || activeHotel.image_url);
                    const rInv = roomInventory.find(item => item.room_type === rName);
                    const rAvailableCount = rInv ? rInv.available_rooms : 8;
                    const isSoldOut = rAvailableCount <= 0;

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          if (!isSoldOut) setSelectedRoomIndex(index);
                        }}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                          isSoldOut 
                            ? 'opacity-60 bg-slate-100 border-slate-200 cursor-not-allowed'
                            : isSelected 
                            ? 'bg-sky-50/80 border-sky-500 shadow-md ring-2 ring-sky-500/20' 
                            : 'bg-slate-50 border-slate-200 hover:border-sky-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Room Real Photo Thumbnail */}
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                            <img
                              src={rImg}
                              alt={rName}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&auto=format&fit=crop&q=80';
                              }}
                            />
                            <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold text-center py-0.5">
                              Real Photo
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <h5 className="font-black text-sm text-slate-900 truncate">{rName}</h5>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                                isSelected ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300'
                              }`}>
                                {isSelected && <Check className="w-3.5 h-3.5" />}
                              </div>
                            </div>
                            {rNameBn && <p className="text-xs text-slate-500 font-bold">{rNameBn}</p>}
                            <p className="text-[11px] text-slate-600 mt-1 font-medium">🛏️ {rBed} • 👥 {rCap}</p>
                            
                            {/* Live Availability Tag */}
                            {(() => {
                              const inv = roomInventory.find(item => item.room_type === rName);
                              const availableCount = inv ? inv.available_rooms : 8;
                              const isSold = availableCount <= 0;
                              return (
                                <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
                                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                                    isSold 
                                      ? 'bg-rose-100 text-rose-800 border-rose-200' 
                                      : availableCount <= 2 
                                      ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse' 
                                      : 'bg-emerald-100 text-emerald-900 border-emerald-200'
                                  }`}>
                                    {isSold ? '🔴 Sold Out' : availableCount <= 2 ? `⚠️ Only ${availableCount} Left!` : `🟢 ${availableCount} Rooms Available`}
                                  </span>
                                  {inv?.total_rooms && (
                                    <span className="text-[10px] text-slate-400 font-medium">
                                      ({inv.total_rooms} cap)
                                    </span>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-200/60 pt-2 text-xs">
                          <span className="text-slate-500 font-medium">Per Night:</span>
                          <span className="text-base font-mono font-black text-emerald-700">
                            ৳{rPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Booking Dates, Guests & Price Calculation Form */}
              <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-sm font-black flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Travel Dates & Guest Details</span>
                  </h4>
                  <span className="text-xs text-emerald-300 font-bold">
                    {numberOfNights} {numberOfNights === 1 ? 'Night' : 'Nights'} Total
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Check-in Date</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Check-out Date</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Number of Rooms</label>
                    <select
                      value={roomCount}
                      onChange={(e) => setRoomCount(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-xs focus:outline-none"
                    >
                      <option value={1}>1 Room</option>
                      <option value={2}>2 Rooms</option>
                      <option value={3}>3 Rooms</option>
                      <option value={4}>4 Rooms</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Guests Quantity</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-xs focus:outline-none"
                    >
                      <option value={1}>1 Guest (Solo)</option>
                      <option value={2}>2 Guests (Pair)</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests (Family)</option>
                      <option value={6}>6 Guests (Group)</option>
                    </select>
                  </div>
                </div>

                {/* Lead Guest Contact */}
                {!confirmedBookingId && (
                  <form onSubmit={handleConfirmReservation} className="space-y-4 pt-2 border-t border-slate-800">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Lead Guest Name (নাম)</label>
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="e.g. Tanvir Ahmed"
                          className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-xs focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Contact Phone (মোবাইল)</label>
                        <input
                          type="tel"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+880 17..."
                          className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-xs focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Email (ঐচ্ছিক ইমেইল)</label>
                        <input
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="traveler@yeana.bd"
                          className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">Special Requests & Notes (বিশেষ অনুরোধ)</label>
                      <input
                        type="text"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="e.g. High floor, quiet room, late check-in at 7 PM"
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium text-xs focus:outline-none"
                      />
                    </div>

                    {/* Total Price Summary */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex-wrap gap-2">
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold">Total Reservation Amount ({numberOfNights} Nights × {roomCount} Room)</p>
                        <p className="text-2xl font-mono font-black text-emerald-400">
                          ৳{totalBookingCost.toLocaleString()}
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm & Generate Hotel Voucher</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Confirmed E-Voucher Pass */}
                {confirmedBookingId && (
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-sky-950 border-2 border-emerald-500/60 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between flex-wrap gap-3 border-b border-emerald-500/30 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-black uppercase">
                              Official Voucher
                            </span>
                            <span className="text-[11px] text-emerald-300 font-bold">Verified Reservation</span>
                          </div>
                          <h5 className="font-black text-lg text-white font-heading">{activeHotel.name}</h5>
                          <p className="text-xs text-slate-300 font-mono">PNR / Voucher Code: <strong className="text-emerald-400 font-black">{confirmedBookingId}</strong></p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.print()}
                          className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 transition-all"
                        >
                          <Download className="w-4 h-4 text-sky-400" />
                          <span>Print Voucher</span>
                        </button>
                        <a
                          href={`tel:${activeHotel.contact_phone}`}
                          className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md transition-all"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Call Front Desk</span>
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-semibold">Lead Guest</span>
                        <strong className="text-white font-black text-sm">{guestName}</strong>
                        <span className="text-[11px] text-slate-400 block">{guestPhone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-semibold">Room & Quantity</span>
                        <strong className="text-white font-black text-sm">{currentRoom.name}</strong>
                        <span className="text-[11px] text-emerald-300 block">{roomCount} Room ({guestCount} Guests)</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-semibold">Stay Duration</span>
                        <strong className="text-white font-black text-sm">{checkInDate}</strong>
                        <span className="text-[11px] text-slate-300 block">to {checkOutDate} ({numberOfNights} Nights)</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-semibold">Total Price</span>
                        <strong className="text-2xl text-emerald-400 font-mono font-black block">৳{totalBookingCost.toLocaleString()}</strong>
                        <span className="text-[10px] text-emerald-300/80 font-bold">Payable at Check-in</span>
                      </div>
                    </div>

                    {/* QR Code & Mobile Check-in Tag */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-8 h-8 text-emerald-400" />
                        <div>
                          <p className="text-white font-bold">Fast Digital QR Check-in</p>
                          <p className="text-[11px] text-slate-400">Show this QR / Voucher code to front desk upon arrival for instant key handover.</p>
                        </div>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold text-xs bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-500/40">
                        {confirmedBookingId}
                      </span>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Modal Bottom Close */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Helpline: <strong className="text-slate-800">{activeHotel.contact_phone}</strong>
              </span>
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FULLSCREEN HIGH-RES HOTEL PHOTO LIGHTBOX VIEWER */}
      {/* ========================================================================= */}
      {isLightboxOpen && hotelPhotos.length > 0 && (
        <div 
          className="fixed inset-0 z-60 bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-4 text-white z-20" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-emerald-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified Real Photography
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {lightboxIndex + 1} / {hotelPhotos.length} Photos
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-white">{activeHotel?.name}</h3>
              <p className="text-xs text-emerald-400 font-bold">{hotelPhotos[lightboxIndex]?.title}</p>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white backdrop-blur-md transition-all shadow-lg border border-slate-700"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Fullscreen High-Res Photo */}
          <div className="relative flex-1 flex items-center justify-center my-3 max-h-[70vh] sm:max-h-[78vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={hotelPhotos[lightboxIndex]?.url || activeHotel?.image_url}
              alt={hotelPhotos[lightboxIndex]?.title || 'Hotel Photo'}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/10"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85';
              }}
            />

            {/* Navigation Arrows */}
            {hotelPhotos.length > 1 && (
              <>
                <button
                  onClick={() => setLightboxIndex((prev) => (prev - 1 + hotelPhotos.length) % hotelPhotos.length)}
                  className="absolute left-2 sm:left-4 p-3.5 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white backdrop-blur-md transition-all shadow-2xl border border-white/10"
                  title="Previous Photo (← Arrow Left)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setLightboxIndex((prev) => (prev + 1) % hotelPhotos.length)}
                  className="absolute right-2 sm:right-4 p-3.5 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white backdrop-blur-md transition-all shadow-2xl border border-white/10"
                  title="Next Photo (→ Arrow Right)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar z-20" onClick={(e) => e.stopPropagation()}>
            {hotelPhotos.map((photo, lIdx) => (
              <button
                key={lIdx}
                onClick={() => setLightboxIndex(lIdx)}
                className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  lightboxIndex === lIdx
                    ? 'border-emerald-400 ring-2 ring-emerald-500/60 scale-110 shadow-lg'
                    : 'border-slate-800 opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop&q=80';
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
