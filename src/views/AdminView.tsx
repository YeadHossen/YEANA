import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Compass, 
  Hotel as HotelIcon, 
  Utensils, 
  Bus, 
  Users, 
  Calendar, 
  CheckCircle2, 
  X,
  MapPin,
  MessageSquare,
  Send,
  Phone,
  Mail,
  Printer,
  Sparkles,
  Search,
  ShoppingBag,
  Car,
  AlertCircle,
  Clock,
  ChevronRight,
  Building2
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { Place, Hotel, Restaurant, TransportRoute, District, TravelerInquiry, InquiryCategory, InquiryStatus } from '../types';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { CompanyPortalSection } from '../components/admin/CompanyPortalSection';

export const AdminView: React.FC = () => {
  const { isAdmin, loginDemoAdmin } = useAuth();
  const { 
    inquiries, 
    activeInquiry, 
    activeInquiryId, 
    setActiveInquiryId, 
    unreadAdminCount, 
    sendChatMessage, 
    updateStatus, 
    markAsRead, 
    refreshInquiries 
  } = useChat();

  const [stats, setStats] = useState<any>({
    totalUsers: 2540,
    totalPlaces: 0,
    totalHotels: 0,
    totalRestaurants: 0,
    totalTransports: 0,
    totalTrips: 0,
    totalInquiries: 0,
    unreadInquiries: 0
  });

  const [activeTab, setActiveTab] = useState<'portal' | 'inquiries' | 'places' | 'hotels' | 'restaurants' | 'transports'>('portal');
  const [places, setPlaces] = useState<Place[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [transports, setTransports] = useState<TransportRoute[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  // Inquiries Filtering & Messaging State
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<'all' | InquiryStatus>('all');
  const [inquiryCategoryFilter, setInquiryCategoryFilter] = useState<'all' | InquiryCategory>('all');
  const [adminReplyText, setAdminReplyText] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

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
  const [placeRating] = useState(4.8);

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

  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (activeInquiry && activeInquiry.unread_for_admin > 0) {
      markAsRead(activeInquiry.id, 'admin');
    }
    if (activeInquiry) {
      setInternalNotes(activeInquiry.admin_notes || '');
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeInquiry, markAsRead]);

  // Handle Admin sending message
  const handleAdminSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText.trim() || !activeInquiryId) return;
    try {
      await sendChatMessage(activeInquiryId, adminReplyText, 'admin');
      setAdminReplyText('');
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setSuccessToast('Message sent to traveler!');
      setTimeout(() => setSuccessToast(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // Quick Action Template Buttons
  const handleQuickTemplate = async (templateText: string, newStatus?: InquiryStatus) => {
    if (!activeInquiryId) return;
    try {
      await sendChatMessage(activeInquiryId, templateText, 'admin', 'status_update');
      if (newStatus) {
        await updateStatus(activeInquiryId, newStatus);
      }
      setSuccessToast('Quick response and status update applied!');
      setTimeout(() => setSuccessToast(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (inqId: string, status: InquiryStatus) => {
    await updateStatus(inqId, status, internalNotes);
    setSuccessToast(`Inquiry status updated to ${status.toUpperCase()}`);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleSaveNotes = async () => {
    if (!activeInquiryId) return;
    await updateStatus(activeInquiryId, activeInquiry?.status || 'in_progress', internalNotes);
    setSuccessToast('Admin notes saved successfully!');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.traveler_name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.subject.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.traveler_email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      (inq.traveler_choices?.destination && inq.traveler_choices.destination.toLowerCase().includes(inquirySearch.toLowerCase()));

    const matchesStatus = inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
    const matchesCategory = inquiryCategoryFilter === 'all' || inq.category === inquiryCategoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>YEANA Management Console</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
            Platform Admin & Traveler Messaging Portal
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            Monitor incoming traveler messages, inspect customized choices (itineraries, hotels, rides, specialties), and manage platform listings.
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

      {/* Success Toast */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2 border border-emerald-200 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Live Traveler Notification Alert Banner */}
      {unreadAdminCount > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg flex items-center justify-between gap-4 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-black">
                {unreadAdminCount} Unread Traveler Inquiries / Choices Awaiting Review!
              </h4>
              <p className="text-xs text-white/90">
                Travelers have submitted customized tour plans, hotel booking assistance, and specialty sourcing orders.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('inquiries')}
            className="px-4 py-2 bg-white text-amber-900 rounded-xl text-xs font-black hover:bg-amber-50 shadow-md transition-colors whitespace-nowrap"
          >
            Review Choices Now
          </button>
        </div>
      )}

      {/* METRICS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* Inquiries & Messaging Metric (Highlighted) */}
        <div 
          onClick={() => setActiveTab('inquiries')}
          className={`p-4 rounded-3xl border cursor-pointer transition-all ${
            activeTab === 'inquiries' 
              ? 'bg-brand-900 text-white border-brand-800 shadow-lg' 
              : 'bg-white border-brand-200 hover:border-brand-500 shadow-card'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              activeTab === 'inquiries' ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand-700'
            }`}>
              <MessageSquare className="w-4 h-4" />
            </div>
            {unreadAdminCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black animate-pulse">
                {unreadAdminCount} New
              </span>
            )}
          </div>
          <p className="text-2xl font-black font-mono">{inquiries.length}</p>
          <p className={`text-[10px] font-bold uppercase tracking-wider ${
            activeTab === 'inquiries' ? 'text-brand-200' : 'text-slate-400'
          }`}>
            Traveler Inquiries
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2">
            <Users className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">{stats.totalUsers}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Total Users</p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2">
            <Compass className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-teal-700 font-mono">{stats.totalPlaces}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Places</p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-2">
            <HotelIcon className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-sky-700 font-mono">{stats.totalHotels}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Hotels</p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
            <Utensils className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-amber-700 font-mono">{stats.totalRestaurants}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Restaurants</p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
            <Bus className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-emerald-700 font-mono">{stats.totalTransports}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Transports</p>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'portal', label: '🏢 Company E-Portal (কোম্পানি ই-পোর্টাল)', icon: Building2 },
          { id: 'inquiries', label: `Traveler Inquiries & Choices (${inquiries.length})`, icon: MessageSquare, badge: unreadAdminCount },
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
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && tab.badge > 0 ? (
                <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 0. COMPANY E-PORTAL (REAL-TIME SEAT & ROOM INVENTORY & MANIFEST)          */}
      {/* ========================================================================= */}
      {activeTab === 'portal' && (
        <CompanyPortalSection
          transports={transports}
          hotels={hotels}
          onNotify={(msg) => {
            setSuccessToast(msg);
            setTimeout(() => setSuccessToast(''), 3000);
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* 1. TRAVELER INQUIRIES & CHOICES PORTAL (MASTER-DETAIL VIEW) */}
      {/* ========================================================================= */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          
          {/* Filtering and Search Toolbar */}
          <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inquirySearch}
                onChange={e => setInquirySearch(e.target.value)}
                placeholder="Search by traveler name, email, destination, or subject..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Status & Category Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {(['all', 'new', 'in_progress', 'confirmed', 'resolved'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setInquiryStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-all ${
                      inquiryStatusFilter === st 
                        ? 'bg-white text-slate-900 shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <select
                value={inquiryCategoryFilter}
                onChange={e => setInquiryCategoryFilter(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-700 text-xs"
              >
                <option value="all">All Categories</option>
                <option value="trip_planning">Trip Planning</option>
                <option value="hotel_booking">Hotel Booking</option>
                <option value="ride_assistance">Ride Assistance</option>
                <option value="specialty_order">Specialty Sourcing</option>
                <option value="custom_package">Custom Package</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>

          {/* Master-Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Inquiry Inbox List */}
            <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1">
              {filteredInquiries.length === 0 ? (
                <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-2">
                  <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-700">No inquiries found</p>
                  <p className="text-xs text-slate-400">Try adjusting your search or filters.</p>
                </div>
              ) : (
                filteredInquiries.map(inq => {
                  const isSelected = activeInquiryId === inq.id;
                  const hasChoices = inq.traveler_choices && Object.keys(inq.traveler_choices).length > 0;
                  return (
                    <div
                      key={inq.id}
                      onClick={() => setActiveInquiryId(inq.id)}
                      className={`p-4 rounded-3xl border cursor-pointer transition-all space-y-2.5 ${
                        isSelected 
                          ? 'bg-brand-50/70 border-brand-500 shadow-md ring-1 ring-brand-500/20' 
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-card'
                      }`}
                    >
                      {/* Top Row: User & Status */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={inq.traveler_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                            alt=""
                            className="w-9 h-9 rounded-2xl object-cover ring-2 ring-slate-100"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{inq.traveler_name}</h4>
                            <p className="text-[11px] text-slate-400">{inq.traveler_email}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            inq.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            inq.status === 'in_progress' ? 'bg-amber-100 text-amber-800' :
                            inq.status === 'resolved' ? 'bg-slate-100 text-slate-700' :
                            'bg-rose-100 text-rose-800 font-black'
                          }`}>
                            {inq.status.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(inq.updated_at).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>

                      {/* Subject */}
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">
                        {inq.subject}
                      </p>

                      {/* Attached Choices Quick Tags */}
                      {hasChoices && inq.traveler_choices && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {inq.traveler_choices.destination && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">
                              <MapPin className="w-3 h-3 text-teal-600" />
                              <span>{inq.traveler_choices.destination}</span>
                            </span>
                          )}
                          {inq.traveler_choices.selected_hotel && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-sky-50 text-sky-800 text-[10px] font-bold border border-sky-200">
                              <HotelIcon className="w-3 h-3 text-sky-600" />
                              <span>Hotel Chosen</span>
                            </span>
                          )}
                          {inq.traveler_choices.selected_ride && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                              <Car className="w-3 h-3 text-emerald-600" />
                              <span>Ride Chosen</span>
                            </span>
                          )}
                          {inq.traveler_choices.selected_specialties && inq.traveler_choices.selected_specialties.length > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-purple-50 text-purple-800 text-[10px] font-bold border border-purple-200">
                              <ShoppingBag className="w-3 h-3 text-purple-600" />
                              <span>{inq.traveler_choices.selected_specialties.length} Specialties</span>
                            </span>
                          )}
                        </div>
                      )}

                      {/* Last Message Preview & Unread Pill */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                        <span className="truncate">{inq.last_message}</span>
                        {inq.unread_for_admin > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold text-[10px] animate-pulse whitespace-nowrap">
                            {inq.unread_for_admin} Unread
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Column: Detailed Choice Inspector & Live Chat Thread */}
            <div className="lg:col-span-7 space-y-4">
              {!activeInquiry ? (
                <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-3 shadow-card">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Select an inquiry from the inbox</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Click any traveler request on the left to inspect their choices (destinations, hotels, rides, specialties) and respond in real-time.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden flex flex-col">
                  
                  {/* Top Bar: Traveler Metadata & Status Control */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={activeInquiry.traveler_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                        alt=""
                        className="w-11 h-11 rounded-2xl object-cover ring-2 ring-brand-500"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-white">{activeInquiry.traveler_name}</h3>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-brand-500/20 text-brand-300 rounded-full border border-brand-500/30">
                            {activeInquiry.category.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
                          <a href={`tel:${activeInquiry.traveler_phone}`} className="hover:text-brand-300 flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-brand-400" />
                            <span>{activeInquiry.traveler_phone || 'No phone'}</span>
                          </a>
                          <a href={`mailto:${activeInquiry.traveler_email}`} className="hover:text-brand-300 flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-brand-400" />
                            <span>{activeInquiry.traveler_email}</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-300 font-bold hidden sm:inline">Status:</span>
                      <select
                        value={activeInquiry.status}
                        onChange={e => handleStatusChange(activeInquiry.id, e.target.value as InquiryStatus)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs border border-slate-700 focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="new">🔴 New / Unreviewed</option>
                        <option value="in_progress">🟡 In Progress</option>
                        <option value="confirmed">🟢 Confirmed & Booked</option>
                        <option value="resolved">⚪ Resolved / Completed</option>
                        <option value="cancelled">❌ Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* 🌟 TRAVELER CHOICES & SELECTION INSPECTOR CARD */}
                  {activeInquiry.traveler_choices && (
                    <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                            Traveler Selections & Preferences Inspector
                          </h4>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {activeInquiry.traveler_choices.group_size ? `Group: ${activeInquiry.traveler_choices.group_size} Travelers` : 'Custom Order'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        
                        {/* Destination & Dates */}
                        {activeInquiry.traveler_choices.destination && (
                          <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-brand-600" />
                              Destination & Duration
                            </span>
                            <p className="font-bold text-slate-800">{activeInquiry.traveler_choices.destination}</p>
                            {activeInquiry.traveler_choices.travel_dates && (
                              <p className="text-[11px] text-slate-500">
                                {activeInquiry.traveler_choices.travel_dates.start_date} to {activeInquiry.traveler_choices.travel_dates.end_date} ({activeInquiry.traveler_choices.travel_dates.duration_days} Days)
                              </p>
                            )}
                          </div>
                        )}

                        {/* Selected Hotel */}
                        {activeInquiry.traveler_choices.selected_hotel && (
                          <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                              <HotelIcon className="w-3 h-3 text-sky-600" />
                              Chosen Hotel / Resort
                            </span>
                            <p className="font-bold text-slate-800">{activeInquiry.traveler_choices.selected_hotel.name}</p>
                            <p className="text-[11px] text-slate-500">
                              {activeInquiry.traveler_choices.selected_hotel.room_type} (৳{activeInquiry.traveler_choices.selected_hotel.price_per_night?.toLocaleString()} / night)
                            </p>
                          </div>
                        )}

                        {/* Selected Ride */}
                        {activeInquiry.traveler_choices.selected_ride && (
                          <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                              <Car className="w-3 h-3 text-emerald-600" />
                              Chosen Ride / Transport
                            </span>
                            <p className="font-bold text-slate-800">{activeInquiry.traveler_choices.selected_ride.title}</p>
                            <p className="text-[11px] text-slate-500">
                              Est. Cost: ৳{activeInquiry.traveler_choices.selected_ride.estimated_cost?.toLocaleString()}
                            </p>
                          </div>
                        )}

                        {/* Budget & Group */}
                        <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-1">
                          <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-purple-600" />
                            Estimated Budget & Group
                          </span>
                          <p className="font-bold text-slate-800">
                            {activeInquiry.traveler_choices.budget_range || 'Standard Package'}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {activeInquiry.traveler_choices.group_size || 1} Travelers
                          </p>
                        </div>

                      </div>

                      {/* Selected Places List */}
                      {activeInquiry.traveler_choices.selected_places && activeInquiry.traveler_choices.selected_places.length > 0 && (
                        <div className="p-3 bg-white rounded-2xl border border-slate-200 text-xs space-y-1.5">
                          <span className="text-[10px] font-bold uppercase text-slate-400">
                            Planned Itinerary Spots ({activeInquiry.traveler_choices.selected_places.length}):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeInquiry.traveler_choices.selected_places.map(p => (
                              <span key={p.id} className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold text-[11px] border border-slate-200">
                                📍 {p.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Selected Exclusive Specialties */}
                      {activeInquiry.traveler_choices.selected_specialties && activeInquiry.traveler_choices.selected_specialties.length > 0 && (
                        <div className="p-3 bg-white rounded-2xl border border-purple-200 text-xs space-y-1.5">
                          <span className="text-[10px] font-bold uppercase text-purple-800 flex items-center gap-1">
                            <ShoppingBag className="w-3 h-3 text-purple-600" />
                            Requested Place-Exclusive Specialties ({activeInquiry.traveler_choices.selected_specialties.length}):
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {activeInquiry.traveler_choices.selected_specialties.map(spec => (
                              <div key={spec.id} className="p-2 rounded-xl bg-purple-50/80 border border-purple-100 text-[11px]">
                                <p className="font-bold text-purple-950">🛍️ {spec.name}</p>
                                <p className="text-purple-700">{spec.category} • {spec.price_range}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Special Notes from Traveler */}
                      {activeInquiry.traveler_choices.special_notes && (
                        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
                          <strong>Traveler Instruction:</strong> "{activeInquiry.traveler_choices.special_notes}"
                        </div>
                      )}
                    </div>
                  )}

                  {/* Live Chat Stream */}
                  <div className="p-4 sm:p-5 space-y-3 max-h-[360px] overflow-y-auto bg-slate-100/40">
                    <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider my-2">
                      Inquiry Created on {new Date(activeInquiry.created_at).toLocaleDateString()}
                    </div>

                    {activeInquiry.messages.map(msg => {
                      const isAdminSender = msg.sender_role === 'admin';
                      return (
                        <div
                          key={msg.id}
                          className={`flex gap-2.5 ${isAdminSender ? 'justify-end' : 'justify-start'}`}
                        >
                          {!isAdminSender && (
                            <img
                              src={msg.sender_avatar || activeInquiry.traveler_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                              alt=""
                              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 self-end"
                            />
                          )}

                          <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs space-y-1.5 ${
                            isAdminSender 
                              ? 'bg-slate-900 text-white rounded-br-none shadow-sm' 
                              : 'bg-white border border-slate-200 text-slate-800 shadow-xs'
                          }`}>
                            <div className="flex items-center justify-between gap-3 text-[10px] opacity-75">
                              <span className="font-bold">{isAdminSender ? 'You (YEANA Admin)' : msg.sender_name}</span>
                              <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Action Template Buttons */}
                  <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Quick Response Actions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleQuickTemplate('Hello! We have reviewed your choices and confirmed hotel & transport availability. We are assigning a verified local guide.', 'confirmed')}
                        className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold transition-colors"
                      >
                        ✅ Approve & Assign Guide
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickTemplate('We have checked with the hotel and reserved your requested suite. Please verify if you need airport pick-up.', 'in_progress')}
                        className="px-2.5 py-1 rounded-xl bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 text-[11px] font-bold transition-colors"
                      >
                        🏨 Confirm Hotel Room
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickTemplate('Your requested specialty items have been verified and packaged directly from artisan cooperatives with GI authenticity certification.', 'confirmed')}
                        className="px-2.5 py-1 rounded-xl bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200 text-[11px] font-bold transition-colors"
                      >
                        🛍️ Specialties Sourced
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickTemplate('We have calculated the total quotation for your group. Total estimated package cost is ready for confirmation.', 'in_progress')}
                        className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 text-[11px] font-bold transition-colors"
                      >
                        💰 Send Quotation
                      </button>
                    </div>
                  </div>

                  {/* Message Composer & Send Form */}
                  <form onSubmit={handleAdminSendReply} className="p-4 bg-white border-t border-slate-200 flex gap-2">
                    <input
                      type="text"
                      value={adminReplyText}
                      onChange={e => setAdminReplyText(e.target.value)}
                      placeholder={`Reply to ${activeInquiry.traveler_name}...`}
                      className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </button>
                  </form>

                  {/* Internal Admin Notes */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-200 flex items-center gap-3">
                    <input
                      type="text"
                      value={internalNotes}
                      onChange={e => setInternalNotes(e.target.value)}
                      placeholder="Private admin notes (e.g. Assigned driver Jamal 01711223344)..."
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-700"
                    />
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-[11px] font-bold transition-colors"
                    >
                      Save Note
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PLACES TABLE */}
      {/* ========================================================================= */}
      {activeTab === 'places' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
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
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold text-[10px]">{p.category}</span></td>
                    <td className="p-4 font-bold text-amber-600">⭐ {p.rating}</td>
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
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. HOTELS TABLE */}
      {/* ========================================================================= */}
      {activeTab === 'hotels' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Hotel Name</th>
                  <th className="p-4">District</th>
                  <th className="p-4">Nightly Price</th>
                  <th className="p-4">Rating</th>
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
                        <p className="text-[10px] text-slate-400 truncate max-w-xs">{h.location}</p>
                      </div>
                    </td>
                    <td className="p-4">{h.district_name || h.district_id}</td>
                    <td className="p-4 font-mono font-bold text-brand-700">৳{h.price_per_night}</td>
                    <td className="p-4 font-bold text-amber-600">⭐ {h.rating}</td>
                    <td className="p-4 text-slate-500">{h.contact_phone}</td>
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
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. RESTAURANTS TABLE */}
      {/* ========================================================================= */}
      {activeTab === 'restaurants' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Restaurant Name</th>
                  <th className="p-4">District</th>
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
                        <p className="text-[10px] text-slate-400 truncate max-w-xs">{r.location}</p>
                      </div>
                    </td>
                    <td className="p-4">{r.district_name || r.district_id}</td>
                    <td className="p-4">{r.cuisine}</td>
                    <td className="p-4 font-bold text-amber-700">{r.price_tier}</td>
                    <td className="p-4 font-bold text-amber-600">⭐ {r.rating}</td>
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
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TRANSPORTS TABLE */}
      {/* ========================================================================= */}
      {activeTab === 'transports' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Transport Operator</th>
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
        </div>
      )}

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
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                    >
                      {districts.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Price / Night (৳)</label>
                    <input
                      type="number"
                      value={hotelPrice}
                      onChange={(e) => setHotelPrice(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location / Address</label>
                  <input
                    type="text"
                    value={hotelLocation}
                    onChange={(e) => setHotelLocation(e.target.value)}
                    placeholder="e.g. Kolatoli Beach Road, Cox's Bazar"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={hotelPhone}
                      onChange={(e) => setHotelPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={hotelImage}
                      onChange={(e) => setHotelImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold">
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
                    placeholder="e.g. Panshi Restaurant"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">District</label>
                    <select
                      value={restDistrict}
                      onChange={(e) => setRestDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                    >
                      {districts.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Cuisine Type</label>
                    <input
                      type="text"
                      value={restCuisine}
                      onChange={(e) => setRestCuisine(e.target.value)}
                      placeholder="e.g. Traditional Bengali, Fish Curries"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Price Tier</label>
                    <select
                      value={restPriceTier}
                      onChange={(e) => setRestPriceTier(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                    >
                      <option value="৳">৳ - Budget Friendly</option>
                      <option value="৳৳">৳৳ - Moderate</option>
                      <option value="৳৳৳">৳৳৳ - Fine Dining</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={restImage}
                      onChange={(e) => setRestImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold">
                    Add Restaurant
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'transports' && (
              <form onSubmit={handleAddTransportSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Transport Mode</label>
                    <select
                      value={trType}
                      onChange={(e) => setTrType(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                    >
                      <option value="Bus">Bus</option>
                      <option value="Train">Train</option>
                      <option value="Flight">Flight</option>
                      <option value="Car">Car Rental</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company / Train Name</label>
                    <input
                      type="text"
                      value={trCompany}
                      onChange={(e) => setTrCompany(e.target.value)}
                      placeholder="e.g. Green Line Paribahan"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
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

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Departure</label>
                    <input
                      type="text"
                      value={trDep}
                      onChange={(e) => setTrDep(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Arrival</label>
                    <input
                      type="text"
                      value={trArr}
                      onChange={(e) => setTrArr(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={trDuration}
                      onChange={(e) => setTrDuration(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Min Price (৳)</label>
                    <input
                      type="number"
                      value={trPriceMin}
                      onChange={(e) => setTrPriceMin(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Max Price (৳)</label>
                    <input
                      type="number"
                      value={trPriceMax}
                      onChange={(e) => setTrPriceMax(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold">
                    Add Transport
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
