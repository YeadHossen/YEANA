import React, { useState, useEffect } from 'react';
import { Search, Hotel as HotelIcon, Star, Filter, Phone, Check, Wifi, Wind, Car, Utensils, X, Calendar } from 'lucide-react';
import { DataService } from '../services/dataService';
import { Hotel, District } from '../types';
import { HotelCard } from '../components/common/HotelCard';
import { useLanguage } from '../context/LanguageContext';

interface HotelsViewProps {
  onSelectHotel: (hotel: Hotel) => void;
  selectedHotelModal: Hotel | null;
  onCloseModal: () => void;
}

export const HotelsView: React.FC<HotelsViewProps> = ({
  onSelectHotel,
  selectedHotelModal,
  onCloseModal
}) => {
  const { t, language } = useLanguage();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [acFilter, setAcFilter] = useState<'All' | 'AC' | 'Non-AC'>('All');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  
  // Booking inquiry modal state
  const [inquirySuccess, setInquirySuccess] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [roomType, setRoomType] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      const [h, d] = await Promise.all([
        DataService.getHotels(),
        DataService.getDistricts()
      ]);
      setHotels(h);
      setDistricts(d);
    }
    loadData();
  }, []);

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = !searchQuery.trim() ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDistrict = selectedDistrict === 'All' || hotel.district_id === selectedDistrict;
    
    const matchesAC = acFilter === 'All' 
      ? true 
      : acFilter === 'AC' ? hotel.has_ac : !hotel.has_ac;

    const matchesPrice = hotel.price_per_night <= maxPrice;

    return matchesSearch && matchesDistrict && matchesAC && matchesPrice;
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      onCloseModal();
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-sky-700">
          <HotelIcon className="w-4 h-4 text-sky-600" />
          <span>Accommodations & Resorts</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
          Hotels, Resorts & Eco-Lodges
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          Find comfortable stays tailored for students, couples, families, and luxury travelers in Bangladesh.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card space-y-4">
        
        {/* Search bar & District filter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hotel name or location..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:outline-none"
            >
              <option value="All">All Districts</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={acFilter}
              onChange={(e) => setAcFilter(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:outline-none"
            >
              <option value="All">AC & Non-AC</option>
              <option value="AC">AC Rooms Only</option>
              <option value="Non-AC">Eco / Non-AC</option>
            </select>
          </div>

        </div>

        {/* Price Slider */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-slate-500 font-bold whitespace-nowrap">Max Price / Night:</span>
            <input
              type="range"
              min="1000"
              max="25000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full sm:w-48 accent-brand-600 cursor-pointer"
            />
            <span className="font-extrabold text-brand-800 bg-brand-50 px-2.5 py-1 rounded-lg shrink-0">
              ৳{maxPrice.toLocaleString()}
            </span>
          </div>

          <div className="text-slate-400 font-medium">
            Showing {filteredHotels.length} verified stays
          </div>
        </div>

      </div>

      {/* Hotels Grid */}
      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onSelect={onSelectHotel}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <HotelIcon className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No hotels match your filter</h3>
          <p className="text-xs text-slate-500">Try increasing the price limit or resetting the district filter.</p>
        </div>
      )}

      {/* Hotel Detail & Booking Inquiry Modal */}
      {selectedHotelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Photo */}
            <div className="relative h-48 sm:h-64 overflow-hidden bg-slate-900 shrink-0">
              <img
                src={selectedHotelModal.image_url}
                alt={selectedHotelModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> {selectedHotelModal.rating}
                  </span>
                  <span className="text-xs text-slate-300">({selectedHotelModal.reviews_count || 120} reviews)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black">{selectedHotelModal.name}</h2>
                <p className="text-xs text-slate-300">📍 {selectedHotelModal.address || selectedHotelModal.location}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Pricing & Timing */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center text-xs">
                <div>
                  <p className="text-slate-400 font-bold">Standard Rate</p>
                  <p className="text-base font-black text-brand-700 mt-0.5">৳{selectedHotelModal.price_per_night.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold">Check-in</p>
                  <p className="font-extrabold text-slate-800 mt-1">{selectedHotelModal.check_in}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold">Check-out</p>
                  <p className="font-extrabold text-slate-800 mt-1">{selectedHotelModal.check_out}</p>
                </div>
              </div>

              {/* Facilities Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Hotel Amenities</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {selectedHotelModal.has_wifi && <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700"><Wifi className="w-4 h-4 text-brand-600" /> High-speed WiFi</div>}
                  {selectedHotelModal.has_ac && <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700"><Wind className="w-4 h-4 text-sky-600" /> Air Conditioned</div>}
                  {selectedHotelModal.has_parking && <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700"><Car className="w-4 h-4 text-emerald-600" /> Secure Parking</div>}
                  {selectedHotelModal.has_restaurant && <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700"><Utensils className="w-4 h-4 text-amber-600" /> In-house Restaurant</div>}
                  {selectedHotelModal.has_room_service && <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700"><Check className="w-4 h-4 text-purple-600" /> 24h Room Service</div>}
                  {selectedHotelModal.has_security && <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700"><Check className="w-4 h-4 text-teal-600" /> CCTV & Security</div>}
                </div>
              </div>

              {/* Booking / Inquiry Form */}
              <form onSubmit={handleInquirySubmit} className="bg-brand-50/70 p-5 rounded-2xl border border-brand-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-900">Direct Reservation Inquiry</h4>
                  <a href={`tel:${selectedHotelModal.contact_phone}`} className="text-xs font-bold text-brand-700 flex items-center gap-1 hover:underline">
                    <Phone className="w-3.5 h-3.5" /> {selectedHotelModal.contact_phone}
                  </a>
                </div>

                {inquirySuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center">
                    ✓ Your booking inquiry has been recorded. The front desk will contact your phone shortly.
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full p-2 rounded-xl border border-slate-200 bg-white text-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+880 17..."
                          className="w-full p-2 rounded-xl border border-slate-200 bg-white text-xs"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-700/20"
                    >
                      Send Free Booking Inquiry
                    </button>
                  </>
                )}
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
