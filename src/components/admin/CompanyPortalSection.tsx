import React, { useState, useEffect } from 'react';
import {
  Building2,
  Bus,
  Hotel as HotelIcon,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Armchair,
  BedDouble,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Phone,
  Mail,
  Printer,
  Sliders,
  Check,
  Ban,
  Download,
  QrCode,
  Sparkles,
  ArrowRight,
  Plane,
  Ship,
  Car,
  ChevronRight,
  X,
  FileSpreadsheet,
  Zap,
  Layers
} from 'lucide-react';
import { 
  TransportBooking, 
  HotelBooking, 
  CompanyPortalStats, 
  TransportRoute, 
  Hotel, 
  SeatInventoryItem, 
  RoomInventoryItem,
  BookingStatus,
  TransportType
} from '../../types';
import { DataService } from '../../services/dataService';

interface CompanyPortalSectionProps {
  transports: TransportRoute[];
  hotels: Hotel[];
  onNotify?: (msg: string) => void;
}

export const CompanyPortalSection: React.FC<CompanyPortalSectionProps> = ({
  transports,
  hotels,
  onNotify
}) => {
  // State
  const [stats, setStats] = useState<CompanyPortalStats | null>(null);
  const [transportBookings, setTransportBookings] = useState<TransportBooking[]>([]);
  const [hotelBookings, setHotelBookings] = useState<HotelBooking[]>([]);
  
  // Filters
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [portalType, setPortalType] = useState<'all' | 'transport' | 'hotel'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Active selection for live manifest & inventory
  const [selectedRouteId, setSelectedRouteId] = useState<string>('');
  const [selectedHotelId, setSelectedHotelId] = useState<string>('');
  const [activeDate, setActiveDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Live seat & room inventories
  const [seatInventory, setSeatInventory] = useState<SeatInventoryItem[]>([]);
  const [roomInventory, setRoomInventory] = useState<RoomInventoryItem[]>([]);
  
  // Modal states
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [actionSuccess, setActionSuccess] = useState<string>('');

  // List of unique companies
  const transportCompanies = Array.from(new Set(transports.map(t => t.company)));
  const hotelCompanies = Array.from(new Set(hotels.map(h => h.name)));
  const allCompanies = [
    { type: 'all', name: 'all', label: '🌐 All Companies (Super Admin / Management Console)' },
    ...transportCompanies.map(c => ({ type: 'transport', name: c, label: `🚌 ${c} (Transport Operator)` })),
    ...hotelCompanies.map(h => ({ type: 'hotel', name: h, label: `🏨 ${h} (Hotel Property)` }))
  ];

  // Load all live data
  const loadPortalData = async () => {
    setIsSyncing(true);
    try {
      const [st, tBookings, hBookings] = await Promise.all([
        DataService.getCompanyPortalStats(),
        DataService.getTransportBookings(),
        DataService.getHotelBookings()
      ]);
      setStats(st);
      setTransportBookings(tBookings);
      setHotelBookings(hBookings);

      // Default selected route & hotel
      if (!selectedRouteId && transports.length > 0) {
        setSelectedRouteId(transports[0].id);
      }
      if (!selectedHotelId && hotels.length > 0) {
        setSelectedHotelId(hotels[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    loadPortalData();

    // Listen to real-time broadcast events from user booking flows
    const handleSyncEvent = () => {
      loadPortalData();
    };

    window.addEventListener('yeana:transport_booking_created', handleSyncEvent);
    window.addEventListener('yeana:hotel_booking_created', handleSyncEvent);
    window.addEventListener('yeana:transport_booking_updated', handleSyncEvent);
    window.addEventListener('yeana:hotel_booking_updated', handleSyncEvent);
    window.addEventListener('yeana:seat_inventory_updated', handleSyncEvent);
    window.addEventListener('yeana:room_inventory_updated', handleSyncEvent);

    return () => {
      window.removeEventListener('yeana:transport_booking_created', handleSyncEvent);
      window.removeEventListener('yeana:hotel_booking_created', handleSyncEvent);
      window.removeEventListener('yeana:transport_booking_updated', handleSyncEvent);
      window.removeEventListener('yeana:hotel_booking_updated', handleSyncEvent);
      window.removeEventListener('yeana:seat_inventory_updated', handleSyncEvent);
      window.removeEventListener('yeana:room_inventory_updated', handleSyncEvent);
    };
  }, [transports, hotels]);

  // Load route seat inventory when route or date changes
  useEffect(() => {
    if (selectedRouteId) {
      DataService.getTransportSeatAvailability(selectedRouteId, activeDate).then(inv => {
        setSeatInventory(inv);
      });
    }
  }, [selectedRouteId, activeDate]);

  // Load hotel room inventory when hotel changes
  useEffect(() => {
    if (selectedHotelId) {
      DataService.getHotelRoomAvailability(selectedHotelId).then(inv => {
        setRoomInventory(inv);
      });
    }
  }, [selectedHotelId]);

  const showToast = (msg: string) => {
    setActionSuccess(msg);
    if (onNotify) onNotify(msg);
    setTimeout(() => setActionSuccess(''), 3500);
  };

  // 1-Click Check In Handler
  const handleCheckInBooking = async (booking: TransportBooking | HotelBooking, type: 'transport' | 'hotel') => {
    if (type === 'transport') {
      await DataService.updateTransportBookingStatus(booking.id, 'checked_in');
      showToast(`✅ Passenger ${(booking as TransportBooking).passenger_name} checked in successfully!`);
    } else {
      await DataService.updateHotelBookingStatus(booking.id, 'checked_in');
      showToast(`🔑 Guest ${(booking as HotelBooking).guest_name} checked in & key issued!`);
    }
    await loadPortalData();
  };

  // 1-Click Cancel Booking Handler
  const handleCancelBooking = async (booking: TransportBooking | HotelBooking, type: 'transport' | 'hotel') => {
    if (!confirm(`Are you sure you want to cancel booking ${booking.id}? Seats/Rooms will be restored to live inventory.`)) return;
    if (type === 'transport') {
      await DataService.updateTransportBookingStatus(booking.id, 'cancelled');
      showToast(`❌ Booking ${booking.id} cancelled. Seats released.`);
    } else {
      await DataService.updateHotelBookingStatus(booking.id, 'cancelled');
      showToast(`❌ Hotel booking ${booking.id} cancelled. Room released.`);
    }
    await loadPortalData();
  };

  // Operator VIP Block / Release Seat
  const handleToggleSeatBlock = async (seatId: string, currentStatus: string) => {
    if (!selectedRouteId) return;
    const isCurrentlyBlocked = currentStatus === 'blocked';
    const action = isCurrentlyBlocked ? 'release' : 'block';
    const reason = isCurrentlyBlocked ? '' : 'VIP Counter Reservation';

    await DataService.blockOrReleaseSeat(selectedRouteId, activeDate, seatId, action, reason);
    const updated = await DataService.getTransportSeatAvailability(selectedRouteId, activeDate);
    setSeatInventory(updated);
    showToast(isCurrentlyBlocked ? `🟢 Seat ${seatId} released to online booking` : `🔒 Seat ${seatId} blocked for VIP / offline counter`);
  };

  // Operator Adjust Room Inventory
  const handleAdjustRoomCount = async (roomType: string, delta: number) => {
    if (!selectedHotelId) return;
    const current = roomInventory.find(r => r.room_type === roomType);
    if (!current) return;
    const newAvailable = Math.max(0, current.available_rooms + delta);
    const newTotal = Math.max(newAvailable, current.total_rooms + delta);

    await DataService.updateHotelRoomInventory(
      selectedHotelId,
      roomType,
      newTotal,
      newAvailable,
      current.price_per_night
    );
    const updated = await DataService.getHotelRoomAvailability(selectedHotelId);
    setRoomInventory(updated);
    showToast(`🏨 Room inventory for "${roomType}" updated! Available: ${newAvailable}`);
  };

  // Instant Booking Simulator for Live Demo
  const handleSimulateTravelerBooking = async (type: 'transport' | 'hotel') => {
    if (type === 'transport') {
      const activeRoute = transports.find(t => t.id === selectedRouteId) || transports[0];
      const pnr = `YN-${activeRoute.transport_type.substring(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const travelerNames = ['Tanvir Ahmed', 'Nusrat Jahan', 'Rahim Uddin', 'Sabrina Chowdhury', 'Mahmudul Hasan'];
      const randomName = travelerNames[Math.floor(Math.random() * travelerNames.length)];
      const sampleSeat = ['A1', 'A2', 'B3', 'C1', 'D2', 'E4'][Math.floor(Math.random() * 6)];

      await DataService.createTransportBooking({
        id: pnr,
        route_id: activeRoute.id,
        route: activeRoute,
        company: activeRoute.company,
        transport_type: activeRoute.transport_type,
        from_district: activeRoute.from_district,
        to_district: activeRoute.to_district,
        departure_time: activeRoute.departure_time,
        travel_date: activeDate,
        selected_seats: [sampleSeat],
        seat_count: 1,
        is_full_reserve: false,
        passenger_name: randomName,
        passenger_phone: '+880 1711-889900',
        passenger_email: 'traveler@yeana.bd',
        passenger_gender: 'Male',
        boarding_point: activeRoute.boarding_points?.[0] || 'Main Counter',
        dropping_point: `${activeRoute.to_district} Central Drop`,
        total_fare: activeRoute.price_min,
        status: 'confirmed'
      });

      showToast(`⚡ Simulated Traveler Booking! ${randomName} booked Seat ${sampleSeat} on ${activeRoute.company}`);
    } else {
      const activeHtl = hotels.find(h => h.id === selectedHotelId) || hotels[0];
      const pnr = `HTL-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      const guestNames = ['Farhana Karim', 'Dr. Ashiqur Rahman', 'Shamim Hossain', 'Zinia Afroz'];
      const randomGuest = guestNames[Math.floor(Math.random() * guestNames.length)];
      const rType = activeHtl.room_types?.[0] ? (typeof activeHtl.room_types[0] === 'string' ? activeHtl.room_types[0] : activeHtl.room_types[0].name) : 'Deluxe Room';

      await DataService.createHotelBooking({
        id: pnr,
        hotel_id: activeHtl.id,
        hotel_name: activeHtl.name,
        hotel_image: activeHtl.image_url,
        district_name: activeHtl.district_name || activeHtl.location,
        room_type: rType,
        room_count: 1,
        guest_count: 2,
        check_in_date: activeDate,
        check_out_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        nights: 2,
        guest_name: randomGuest,
        guest_phone: '+880 1812-334455',
        guest_email: 'traveler@yeana.bd',
        total_cost: (activeHtl.price_per_night || 3500) * 2,
        status: 'confirmed',
        special_requests: 'High floor, complimentary breakfast'
      });

      showToast(`⚡ Simulated Traveler Hotel Booking! ${randomGuest} booked at ${activeHtl.name}`);
    }
    await loadPortalData();
  };

  // Filtered Bookings
  const filteredTransportBookings = transportBookings.filter(b => {
    const matchesCompany = selectedCompany === 'all' || b.company.toLowerCase() === selectedCompany.toLowerCase();
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = !searchQuery || 
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.passenger_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.passenger_phone.includes(searchQuery) ||
      b.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCompany && matchesStatus && matchesSearch;
  });

  const filteredHotelBookings = hotelBookings.filter(b => {
    const matchesCompany = selectedCompany === 'all' || b.hotel_name.toLowerCase() === selectedCompany.toLowerCase();
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = !searchQuery || 
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.guest_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.guest_phone.includes(searchQuery) ||
      b.hotel_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCompany && matchesStatus && matchesSearch;
  });

  // Selected Route Details
  const currentRoute = transports.find(t => t.id === selectedRouteId) || transports[0];
  const currentHotel = hotels.find(h => h.id === selectedHotelId) || hotels[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & COMPANY SELECTOR BAR                                      */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-6 text-white border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live 2-Way Sync Connected
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Portals Active: {transportCompanies.length + hotelCompanies.length} Operators
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-white flex items-center gap-2.5">
              <Building2 className="w-7 h-7 text-emerald-400" />
              <span>Company E-Portal Management</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Real-time synchronization engine for Transport Companies and Hotel Properties. View live ticket seats, room availability, passenger manifests, and control inventory.
            </p>
          </div>

          {/* Quick Simulation & Refresh Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => handleSimulateTravelerBooking('transport')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-black flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-all"
              title="Simulate a live booking from traveler app"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate Bus Booking</span>
            </button>
            <button
              onClick={() => handleSimulateTravelerBooking('hotel')}
              className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white text-xs font-black flex items-center gap-1.5 shadow-lg shadow-sky-600/30 transition-all"
              title="Simulate a live hotel booking from traveler app"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate Hotel Booking</span>
            </button>
            <button
              onClick={loadPortalData}
              disabled={isSyncing}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 border border-white/10 transition-all"
              title="Refresh live portal data"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Company Switcher Dropdown & Category Filter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-4 border-t border-slate-800">
          <div className="md:col-span-6 space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              🏢 Select Company / Operator Portal (কোম্পানি নির্বাচন)
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white font-black text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {allCompanies.map((c, i) => (
                <option key={i} value={c.name}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              System Category (বিভাগ)
            </label>
            <div className="flex items-center bg-slate-800 p-1 rounded-2xl border border-slate-700">
              {(['all', 'transport', 'hotel'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setPortalType(t)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    portalType === t ? 'bg-emerald-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t === 'all' ? 'All' : t === 'transport' ? '🚌 Transport' : '🏨 Hotels'}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Search PNR / Passenger / Phone
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PNR, name..."
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Toast Alert */}
      {actionSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess('')} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. EXECUTIVE LIVE KPI CARDS                                               */}
      {/* ========================================================================= */}
      {(() => {
        const transportBookingsCount = stats?.transport?.totalBookings ?? transportBookings.length;
        const hotelBookingsCount = stats?.hotel?.totalBookings ?? hotelBookings.length;
        const totalBookingsCount = transportBookingsCount + hotelBookingsCount;

        const totalSeatsSold = stats?.transport?.seatsSold ?? transportBookings.reduce((s, b) => s + b.seat_count, 0);
        const totalSeatsCapacity = 160;
        const transportOccupancy = Math.min(100, Math.round((totalSeatsSold / totalSeatsCapacity) * 100));

        const totalRoomsBooked = stats?.hotel?.roomsBooked ?? hotelBookings.reduce((s, b) => s + b.room_count, 0);
        const totalRoomsCapacity = 85;
        const hotelOccupancy = Math.min(100, Math.round((totalRoomsBooked / totalRoomsCapacity) * 100));

        const totalRevenue = stats?.summary?.totalRevenue ?? (
          (stats?.transport?.revenue ?? transportBookings.reduce((s, b) => s + b.total_fare, 0)) +
          (stats?.hotel?.revenue ?? hotelBookings.reduce((s, b) => s + b.total_cost, 0))
        );

        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Bookings */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Bookings</span>
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-xs">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 font-mono">
                {totalBookingsCount}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>🚌 {transportBookingsCount} Transport</span>
                <span>•</span>
                <span>🏨 {hotelBookingsCount} Hotel</span>
              </div>
            </div>

            {/* Live Transport Seats Occupancy */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Transport Seat Occupancy</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs">
                  <Armchair className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-emerald-700 font-mono">
                  {transportOccupancy}%
                </p>
                <span className="text-xs text-slate-400 font-bold">
                  ({totalSeatsSold}/{totalSeatsCapacity} Seats)
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${transportOccupancy}%` }}
                />
              </div>
            </div>

            {/* Live Hotel Room Occupancy */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Hotel Room Occupancy</span>
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-black text-xs">
                  <BedDouble className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-sky-700 font-mono">
                  {hotelOccupancy}%
                </p>
                <span className="text-xs text-slate-400 font-bold">
                  ({totalRoomsBooked}/{totalRoomsCapacity} Rooms)
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-sky-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${hotelOccupancy}%` }}
                />
              </div>
            </div>

            {/* Gross Revenue */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Gross Booking Value</span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-black text-amber-700 font-mono">
                ৳{totalRevenue.toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                Real-time synced across all channels
              </p>
            </div>
          </div>
        );
      })()}

      {/* ========================================================================= */}
      {/* 3. TRANSPORT SYSTEM E-PORTAL (OPERATOR SEAT CONTROL & MANIFEST)           */}
      {/* ========================================================================= */}
      {(portalType === 'all' || portalType === 'transport') && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                    Transport System
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Live Operator Floor Manifest</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 font-heading">
                  {selectedCompany === 'all' ? 'All Transport Operators' : selectedCompany}
                </h3>
              </div>
            </div>

            {/* Route Selector & Travel Date Selector */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="date"
                  value={activeDate}
                  onChange={(e) => setActiveDate(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none"
                />
              </div>

              <select
                value={selectedRouteId}
                onChange={(e) => setSelectedRouteId(e.target.value)}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none"
              >
                {transports.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.company} ({t.from_district} ➔ {t.to_district})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Current Route Visual Seat Layout & VIP Seat Blocker */}
          {currentRoute && (
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold">
                    {currentRoute.transport_type === 'Flight' ? '✈️' : currentRoute.transport_type === 'Launch' ? '🚢' : '🚌'}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">
                      {currentRoute.company} — {currentRoute.from_district} to {currentRoute.to_district}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Departure: {currentRoute.departure_time} • Standard Fare: ৳{currentRoute.price_min} BDT
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Online Available ({seatInventory.filter(s => s.status === 'available').length || 28})
                  </span>
                  <span className="flex items-center gap-1 text-rose-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Booked ({seatInventory.filter(s => s.status === 'booked').length || 4})
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Blocked/VIP ({seatInventory.filter(s => s.status === 'blocked').length || 0})
                  </span>
                </div>
              </div>

              {/* Vehicle Seat Grid for Operator */}
              <div>
                <p className="text-[11px] text-slate-400 mb-2 font-medium">
                  💡 <strong>Operator Control:</strong> Click on any seat to <strong>Block (VIP / Offline Counter)</strong> or <strong>Release</strong> it back to online travelers.
                </p>

                <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4', 'E1', 'E2', 'E3', 'E4', 'F1', 'F2', 'F3', 'F4', 'G1', 'G2', 'G3', 'G4', 'H1', 'H2', 'H3', 'H4'].map((seatLabel) => {
                    const inv = seatInventory.find(s => s.seat_id === seatLabel);
                    const isBooked = inv ? inv.status === 'booked' : false;
                    const isBlocked = inv ? inv.status === 'blocked' : false;
                    const status = isBooked ? 'booked' : isBlocked ? 'blocked' : 'available';

                    return (
                      <button
                        key={seatLabel}
                        onClick={() => {
                          if (!isBooked) handleToggleSeatBlock(seatLabel, status);
                        }}
                        disabled={isBooked}
                        className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all flex flex-col items-center justify-between gap-1 ${
                          isBooked
                            ? 'bg-rose-950/80 border-rose-600 text-rose-300 cursor-not-allowed shadow-inner'
                            : isBlocked
                            ? 'bg-amber-950/80 border-amber-500 text-amber-300 hover:bg-amber-900 cursor-pointer ring-1 ring-amber-400'
                            : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:border-emerald-400 cursor-pointer'
                        }`}
                        title={
                          isBooked
                            ? `Seat ${seatLabel}: Booked by Passenger (${inv?.passenger_name || 'Traveler'})`
                            : isBlocked
                            ? `Seat ${seatLabel}: Blocked by Operator (${inv?.blocked_reason || 'VIP'}). Click to release.`
                            : `Seat ${seatLabel}: Available. Click to Block.`
                        }
                      >
                        <span className="font-black text-sm">{seatLabel}</span>
                        <span className={`text-[9px] px-1 py-0.2 rounded font-extrabold uppercase ${
                          isBooked ? 'bg-rose-500 text-white' : isBlocked ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {isBooked ? 'Booked' : isBlocked ? 'VIP Block' : 'Open'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Passenger Bookings Manifest Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Passenger Reservation Manifest ({filteredTransportBookings.length} Bookings)</span>
              </h4>

              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Trip Manifest</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black border-b border-slate-200">
                  <tr>
                    <th className="p-3">PNR / Ticket</th>
                    <th className="p-3">Lead Passenger</th>
                    <th className="p-3">Route / Company</th>
                    <th className="p-3">Date / Time</th>
                    <th className="p-3">Seats</th>
                    <th className="p-3">Boarding Stand</th>
                    <th className="p-3">Fare</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransportBookings.length > 0 ? (
                    filteredTransportBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-mono font-black text-slate-900">
                          {b.id}
                        </td>
                        <td className="p-3">
                          <strong className="font-bold text-slate-900 block">{b.passenger_name}</strong>
                          <span className="text-[11px] text-slate-500 font-mono">{b.passenger_phone}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-slate-800 block">{b.company}</span>
                          <span className="text-[11px] text-slate-400">
                            {b.from_district} ➔ {b.to_district}
                          </span>
                        </td>
                        <td className="p-3 font-medium text-slate-600">
                          <span className="font-bold text-slate-900 block">{b.travel_date}</span>
                          <span className="text-[11px] text-slate-400">{b.departure_time}</span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-mono font-bold text-xs border border-emerald-200">
                            {b.selected_seats.join(', ')}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {b.is_full_reserve ? 'Full Vehicle' : `${b.seat_count} Seats`}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 font-medium">
                          {b.boarding_point}
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-700 text-sm">
                          ৳{b.total_fare.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase inline-flex items-center gap-1 ${
                            b.status === 'checked_in'
                              ? 'bg-purple-100 text-purple-800'
                              : b.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {b.status === 'checked_in' ? '🟣 Boarded' : b.status === 'confirmed' ? '🟢 Confirmed' : '🔴 Cancelled'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {b.status === 'confirmed' && (
                              <button
                                onClick={() => handleCheckInBooking(b, 'transport')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition-all"
                                title="Check In Passenger"
                              >
                                <Check className="w-3 h-3" />
                                <span>Board</span>
                              </button>
                            )}

                            {b.status !== 'cancelled' && (
                              <button
                                onClick={() => handleCancelBooking(b, 'transport')}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-700 transition-all"
                                title="Cancel Ticket"
                              >
                                <Ban className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-slate-400">
                        No transport bookings found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. HOTEL SYSTEM E-PORTAL (ROOM INVENTORY & GUEST MANIFEST)                */}
      {/* ========================================================================= */}
      {(portalType === 'all' || portalType === 'hotel') && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 shrink-0">
                <HotelIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[10px] font-extrabold uppercase">
                    Hotel System
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Live Room Inventory & Rates</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 font-heading">
                  {selectedCompany === 'all' ? 'All Hotel Properties' : selectedCompany}
                </h3>
              </div>
            </div>

            {/* Hotel Property Selector */}
            <select
              value={selectedHotelId}
              onChange={(e) => setSelectedHotelId(e.target.value)}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none"
            >
              {hotels.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.district_name || h.location})
                </option>
              ))}
            </select>
          </div>

          {/* Current Hotel Room Inventory Control */}
          {currentHotel && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-sky-950 text-white space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                    <img src={currentHotel.image_url} alt={currentHotel.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{currentHotel.name}</h4>
                    <p className="text-[11px] text-slate-400">
                      {currentHotel.location} • Front Desk: {currentHotel.contact_phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    Live Room Manager
                  </span>
                </div>
              </div>

              {/* Room Types Inventory Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {roomInventory.map((room, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-sm text-white">{room.room_type}</h5>
                        <p className="text-xs text-emerald-400 font-mono font-black mt-0.5">
                          ৳{room.price_per_night.toLocaleString()} / night
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                        room.available_rooms <= 0 
                          ? 'bg-rose-500 text-white' 
                          : room.available_rooms <= 2 
                          ? 'bg-amber-500 text-slate-950 animate-pulse' 
                          : 'bg-emerald-500 text-slate-950'
                      }`}>
                        {room.available_rooms <= 0 ? 'Sold Out' : `${room.available_rooms} Open`}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-[11px] bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[9px] font-bold">TOTAL</span>
                        <strong className="text-white font-mono">{room.total_rooms}</strong>
                      </div>
                      <div>
                        <span className="text-emerald-400 block text-[9px] font-bold">AVAILABLE</span>
                        <strong className="text-emerald-400 font-mono">{room.available_rooms}</strong>
                      </div>
                      <div>
                        <span className="text-rose-400 block text-[9px] font-bold">BOOKED</span>
                        <strong className="text-rose-400 font-mono">{room.booked_rooms}</strong>
                      </div>
                    </div>

                    {/* Adjust Availability Buttons */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="text-[10px] text-slate-400 font-medium">Adjust Capacity:</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleAdjustRoomCount(room.room_type, -1)}
                          disabled={room.available_rooms <= 0}
                          className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-black flex items-center justify-center disabled:opacity-30 transition-all"
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleAdjustRoomCount(room.room_type, 1)}
                          className="w-7 h-7 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-black flex items-center justify-center transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hotel Reservations Manifest Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-sky-600" />
                <span>Hotel Reservation Manifest ({filteredHotelBookings.length} Reservations)</span>
              </h4>

              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Rooming Sheet</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black border-b border-slate-200">
                  <tr>
                    <th className="p-3">Voucher PNR</th>
                    <th className="p-3">Lead Guest</th>
                    <th className="p-3">Hotel Property</th>
                    <th className="p-3">Room Type</th>
                    <th className="p-3">Dates (Nights)</th>
                    <th className="p-3">Special Request</th>
                    <th className="p-3">Total Cost</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredHotelBookings.length > 0 ? (
                    filteredHotelBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-mono font-black text-slate-900">
                          {b.id}
                        </td>
                        <td className="p-3">
                          <strong className="font-bold text-slate-900 block">{b.guest_name}</strong>
                          <span className="text-[11px] text-slate-500 font-mono">{b.guest_phone}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-slate-800 block">{b.hotel_name}</span>
                          <span className="text-[11px] text-slate-400">{b.district_name}</span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 font-bold text-xs border border-sky-200">
                            {b.room_type}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {b.room_count} Room ({b.guest_count} Guests)
                          </span>
                        </td>
                        <td className="p-3 font-medium text-slate-600">
                          <span className="font-bold text-slate-900 block">{b.check_in_date} ➔ {b.check_out_date}</span>
                          <span className="text-[11px] text-slate-400 font-bold">{b.nights} Nights</span>
                        </td>
                        <td className="p-3 text-slate-500 italic max-w-xs truncate" title={b.special_requests || 'None'}>
                          {b.special_requests || '—'}
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-700 text-sm">
                          ৳{b.total_cost.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase inline-flex items-center gap-1 ${
                            b.status === 'checked_in'
                              ? 'bg-purple-100 text-purple-800'
                              : b.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {b.status === 'checked_in' ? '🟣 Checked In' : b.status === 'confirmed' ? '🟢 Confirmed' : '🔴 Cancelled'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {b.status === 'confirmed' && (
                              <button
                                onClick={() => handleCheckInBooking(b, 'hotel')}
                                className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition-all"
                                title="Check In Guest"
                              >
                                <Check className="w-3 h-3" />
                                <span>Check-in</span>
                              </button>
                            )}

                            {b.status !== 'cancelled' && (
                              <button
                                onClick={() => handleCancelBooking(b, 'hotel')}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-700 transition-all"
                                title="Cancel Reservation"
                              >
                                <Ban className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-slate-400">
                        No hotel bookings found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
