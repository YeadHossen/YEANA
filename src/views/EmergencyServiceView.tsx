import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  ShieldAlert, 
  Hospital, 
  Ambulance, 
  MapPin, 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  Share2, 
  Navigation, 
  AlertTriangle, 
  PhoneCall, 
  Clock, 
  Building2, 
  X,
  Compass,
  CheckCircle2,
  HeartPulse,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  NATIONAL_EMERGENCY_CONTACTS, 
  DISTRICT_EMERGENCY_DATA, 
  DistrictEmergencyProfile, 
  EmergencyContact,
  searchEmergencyDirectory,
  getEmergencySuggestions
} from '../data/emergencyServicesData';

export const EmergencyServiceView: React.FC = () => {
  const { language } = useLanguage();

  // Search query & selected district state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<DistrictEmergencyProfile | null>(() => {
    // Default to Dhaka or first district profile
    return DISTRICT_EMERGENCY_DATA.find(d => d.id === 'dhaka') || DISTRICT_EMERGENCY_DATA[0];
  });
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'police' | 'hospital' | 'ambulance'>('all');

  // Interactive feedback states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [sosModalOpen, setSosModalOpen] = useState<boolean>(false);

  // Suggestions list
  const suggestions = getEmergencySuggestions(searchQuery);

  const handleSelectDistrict = (profile: DistrictEmergencyProfile) => {
    setSelectedProfile(profile);
    setSearchQuery(profile.district);
    setShowSuggestions(false);
  };

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone.replace(/\s+/g, ''));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Auto-detect location via browser Geolocation API
  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError(language === 'bn' ? 'আপনার ব্রাউজার লোকেশন সমর্থন করে না।' : 'Geolocation is not supported by your browser.');
      setIsDetectingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetectingLocation(false);
        const { latitude, longitude } = position.coords;

        // Approximate coordinates mapping to Bangladesh districts
        // Cox's Bazar: ~21.4, 91.9
        // Sylhet: ~24.8, 91.8
        // Chattogram: ~22.3, 91.8
        // Rangamati: ~22.6, 92.1
        // Dhaka: ~23.8, 90.4
        // Khulna: ~22.8, 89.5
        // Rajshahi: ~24.3, 88.6
        // Barishal: ~22.7, 90.3
        let matchedId = 'dhaka';

        if (latitude < 21.8 && longitude > 91.5) {
          matchedId = 'coxs-bazar';
        } else if (latitude > 24.3 && longitude > 91.3) {
          matchedId = 'sylhet';
        } else if (latitude > 22.0 && latitude < 23.0 && longitude > 91.6) {
          matchedId = 'chattogram';
        } else if (latitude > 22.2 && longitude > 92.0) {
          matchedId = 'rangamati';
        } else if (latitude < 22.5 && longitude < 90.6 && longitude > 89.8) {
          matchedId = 'patuakhali';
        } else if (longitude < 89.8) {
          matchedId = 'khulna';
        }

        const found = DISTRICT_EMERGENCY_DATA.find(d => d.id === matchedId) || DISTRICT_EMERGENCY_DATA[0];
        setSelectedProfile(found);
        setSearchQuery(found.district);
      },
      (error) => {
        setIsDetectingLocation(false);
        setLocationError(
          language === 'bn' 
            ? 'লোকেশন শনাক্ত করা সম্ভব হয়নি। অনুগ্রহ করে সার্চ বক্সে জেলার নাম লিখুন।' 
            : 'Could not detect location. Please search your district manually.'
        );
      },
      { timeout: 8000 }
    );
  };

  // Format SOS Message for WhatsApp or SMS
  const generateSosMessage = () => {
    const locName = selectedProfile ? `${selectedProfile.district} (${selectedProfile.division})` : 'Bangladesh';
    return encodeURIComponent(
      `🚨 *EMERGENCY SOS ALERT via YEANA Travel Bangladesh*\n` +
      `I require urgent assistance!\n` +
      `Current Area / District: ${locName}\n` +
      `National Emergency: 999\n` +
      `Tourist Police Hotline: +880 1320-222222\n` +
      `Please contact local emergency responders immediately!`
    );
  };

  // Filter contacts by active category tab
  const getFilteredContacts = () => {
    if (!selectedProfile) return [];
    if (activeCategory === 'police') return selectedProfile.police;
    if (activeCategory === 'hospital') return selectedProfile.hospital;
    if (activeCategory === 'ambulance') return selectedProfile.ambulance;
    return [...selectedProfile.police, ...selectedProfile.hospital, ...selectedProfile.ambulance];
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-20">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-red-950 p-6 sm:p-10 text-white shadow-elevated border border-rose-900/40">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-black uppercase tracking-wider border border-rose-500/30">
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>24/7 Bangladesh Traveler Safety & Emergency Hub</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight leading-tight">
            {language === 'bn' ? 'জরুরি সেবা ও হটলাইন নেটওয়ার্ক' : 'Emergency Services & Crisis Helpline'}
          </h1>
          
          <p className="text-sm sm:text-base text-rose-100/80 leading-relaxed max-w-2xl">
            {language === 'bn' 
              ? 'আপনার বর্তমান জেলা বা দর্শনীয় স্থান অনুযায়ী বাংলাদেশ পুলিশ, ট্যুরিস্ট পুলিশ, নিকটস্থ সদর হাসপাতাল এবং ২৪ ঘণ্টা অ্যাম্বুলেন্স জরুরি নম্বর এক ক্লিকে কল বা কপি করুন।'
              : 'Search your current location or tourist destination across all 64 districts in Bangladesh to instantly access verified Police, Hospital, and Ambulance emergency contacts with one-tap calling.'}
          </p>

          {/* Quick SOS Trigger Button */}
          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setSosModalOpen(true)}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-black shadow-lg shadow-rose-900/50 flex items-center gap-2 transition-all active:scale-95"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{language === 'bn' ? 'জরুরি এসওএস (SOS) মেসেজ পাঠান' : 'Send Emergency SOS Alert'}</span>
            </button>
            <a
              href="tel:999"
              className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-black flex items-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-rose-400" />
              <span>{language === 'bn' ? 'সরাসরি ৯৯৯-এ কল দিন' : 'Call 999 Immediately'}</span>
            </a>
          </div>
        </div>

        {/* Decorative Watermark Emblem */}
        <div className="absolute right-4 -bottom-10 opacity-10 pointer-events-none hidden md:block">
          <ShieldAlert className="w-80 h-80 text-rose-500" />
        </div>
      </div>

      {/* Location Search Bar & Geolocation Auto-Detection */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          {/* Input with Auto-complete */}
          <div className="relative flex-1">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                  const matched = searchEmergencyDirectory(e.target.value);
                  if (matched) setSelectedProfile(matched);
                }}
                placeholder={
                  language === 'bn' 
                    ? 'আপনার অবস্থান লিখুন (যেমন: কক্সবাজার, সিলেট, ঢাকা, সাজেক, রাঙামাটি, কুয়াকাটা)...' 
                    : 'Search your location (e.g. Cox\'s Bazar, Sylhet, Dhaka, Sajek, Rangamati, Kuakata)...'
                }
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-600 absolute right-3 rounded-full"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl max-h-60 overflow-y-auto z-40 p-2 space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase text-slate-400">
                  {language === 'bn' ? 'জেলা ও পর্যটন এলাকা নির্বাচন করুন' : 'Select District or Tourist Area'}
                </div>
                {suggestions.map((item) => {
                  const prof = DISTRICT_EMERGENCY_DATA.find(d => d.id === item.id);
                  if (!prof) return null;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectDistrict(prof)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-900 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{item.name}</span>
                        <span className="text-slate-400 font-medium">({item.name_bn})</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                        {item.division}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Auto Detect Location Button */}
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isDetectingLocation}
            className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-rose-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm shrink-0 active:scale-95 disabled:opacity-50"
          >
            <Navigation className={`w-4 h-4 ${isDetectingLocation ? 'animate-spin text-rose-400' : 'text-rose-400'}`} />
            <span>
              {isDetectingLocation 
                ? (language === 'bn' ? 'লোকেশন শনাক্ত হচ্ছে...' : 'Detecting GPS Location...') 
                : (language === 'bn' ? 'আমার বর্তমান লোকেশন' : 'Detect My Location')}
            </span>
          </button>

        </div>

        {locationError && (
          <p className="text-xs text-rose-600 font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{locationError}</span>
          </p>
        )}

        {/* Quick Popular Tourist Destinations Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-rose-500" />
            <span>{language === 'bn' ? 'জনপ্রিয় এলাকা:' : 'Popular Areas:'}</span>
          </span>
          {[
            { id: 'coxs-bazar', label: "Cox's Bazar (কক্সবাজার)" },
            { id: 'sylhet', label: 'Sylhet (সিলেট)' },
            { id: 'dhaka', label: 'Dhaka (ঢাকা)' },
            { id: 'rangamati', label: 'Sajek / Rangamati (সাজেক)' },
            { id: 'bandarban', label: 'Bandarban (বান্দরবান)' },
            { id: 'patuakhali', label: 'Kuakata (কুয়াকাটা)' },
            { id: 'moulvibazar', label: 'Sreemangal (শ্রীমঙ্গল)' },
            { id: 'chattogram', label: 'Chattogram (চট্টগ্রাম)' },
            { id: 'khulna', label: 'Sundarbans (খুলনা)' },
          ].map(pill => (
            <button
              key={pill.id}
              type="button"
              onClick={() => {
                const prof = DISTRICT_EMERGENCY_DATA.find(d => d.id === pill.id);
                if (prof) handleSelectDistrict(prof);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedProfile?.id === pill.id
                  ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                  : 'bg-slate-100 hover:bg-rose-50 hover:text-rose-900 text-slate-700 border-slate-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Location Profile Summary Badge */}
      {selectedProfile && (
        <div className="bg-gradient-to-r from-rose-50 via-slate-50 to-rose-50 p-4 sm:p-5 rounded-2xl border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-5 h-5 text-rose-600" />
                <span>{selectedProfile.district} ({selectedProfile.district_bn})</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-900 text-xs font-bold">
                {selectedProfile.division} Division
              </span>
            </div>
            <p className="text-xs text-slate-600">
              <strong className="font-bold text-slate-700">{language === 'bn' ? 'আওতাভুক্ত স্পটসমূহ:' : 'Covered Hubs:'}</strong>{' '}
              {selectedProfile.tourist_hubs.join(' • ')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-white border border-rose-200 text-xs font-bold text-rose-800 shadow-2xs">
              {filteredContacts.length} {language === 'bn' ? 'জরুরি হেল্পলাইন সক্রিয়' : 'Verified Hotlines Ready'}
            </span>
          </div>
        </div>
      )}

      {/* Category Filter Tabs: All, Police, Hospital, Ambulance */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: language === 'bn' ? 'সকল জরুরি সেবা' : 'All Emergency Services', icon: ShieldAlert, count: (selectedProfile?.police.length || 0) + (selectedProfile?.hospital.length || 0) + (selectedProfile?.ambulance.length || 0) },
          { id: 'police', label: language === 'bn' ? 'পুলিশ ও ট্যুরিস্ট পুলিশ' : 'Police & Tourist Police', icon: ShieldAlert, count: selectedProfile?.police.length || 0 },
          { id: 'hospital', label: language === 'bn' ? 'হাসপাতাল ও ট্রমা কেয়ার' : 'Hospitals & Medical ER', icon: Hospital, count: selectedProfile?.hospital.length || 0 },
          { id: 'ambulance', label: language === 'bn' ? 'অ্যাম্বুলেন্স ও উদ্ধার' : 'Ambulance & Rescue', icon: Ambulance, count: selectedProfile?.ambulance.length || 0 },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border whitespace-nowrap ${
                isActive
                  ? 'bg-rose-600 text-white border-rose-700 shadow-md shadow-rose-600/20'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-rose-600'}`} />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Localized Emergency Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredContacts.map(contact => {
          const isCopied = copiedId === contact.id;
          const isPolice = contact.category === 'police';
          const isHospital = contact.category === 'hospital';
          const isAmbulance = contact.category === 'ambulance';

          return (
            <div
              key={contact.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
            >
              {/* Top Card Bar */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                      isPolice 
                        ? 'bg-rose-50 border-rose-200 text-rose-600' 
                        : isHospital 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                        : 'bg-amber-50 border-amber-200 text-amber-600'
                    }`}>
                      {isPolice && <ShieldAlert className="w-5 h-5" />}
                      {isHospital && <Hospital className="w-5 h-5" />}
                      {isAmbulance && <Ambulance className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                        isPolice 
                          ? 'bg-rose-100 text-rose-800' 
                          : isHospital 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isPolice 
                          ? (language === 'bn' ? 'পুলিশ' : 'Police') 
                          : isHospital 
                          ? (language === 'bn' ? 'হাসপাতাল' : 'Hospital') 
                          : (language === 'bn' ? 'অ্যাম্বুলেন্স' : 'Ambulance')}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{contact.available_hours}</span>
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                  {language === 'bn' ? contact.name_bn : contact.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'bn' ? contact.description_bn : contact.description}
                </p>

                {contact.address && (
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{contact.address}</span>
                  </p>
                )}
              </div>

              {/* Action Buttons: One-tap Call & Copy Number */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  
                  {/* Big Call Button */}
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className={`flex-1 py-3 px-4 rounded-2xl text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 ${
                      isPolice
                        ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                        : isHospital
                        ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                        : 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                    }`}
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span className="font-mono tracking-wide">{contact.phone}</span>
                  </a>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopyPhone(contact.id, contact.phone)}
                    className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all active:scale-95 border border-slate-200"
                    title="Copy Phone Number"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  </button>

                </div>

                {isCopied && (
                  <p className="text-[11px] text-emerald-700 font-bold text-center animate-in fade-in duration-150">
                    ✓ {language === 'bn' ? 'নম্বর কপি করা হয়েছে' : 'Number copied to clipboard'}
                  </p>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* 24/7 Universal National Emergency Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>{language === 'bn' ? 'জাতীয় ২৪/৭ সার্বজনীন জরুরি হেল্পলাইন (সমগ্র বাংলাদেশ)' : 'National 24/7 Universal Emergency Hotlines (Bangladesh)'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'bn' ? 'যেকোনো সিম থেকে বিনামূল্যে অথবা প্রযোজ্য রেটে সরাসরি সংযোগের জন্য' : 'Direct emergency response accessible from any local mobile operator without internet'}
            </p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-black border border-emerald-200">
            {language === 'bn' ? 'অফলাইনেও কার্যকর' : '100% Offline Ready'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NATIONAL_EMERGENCY_CONTACTS.map(contact => (
            <div 
              key={contact.id}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-rose-50/50 border border-slate-200 hover:border-rose-200 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                    {contact.is_toll_free ? 'Toll-Free' : 'National'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">24/7</span>
                </div>
                <h4 className="text-xs font-black text-slate-900 line-clamp-2">
                  {language === 'bn' ? contact.name_bn : contact.name}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {language === 'bn' ? contact.description_bn : contact.description}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-mono font-black flex items-center justify-center gap-1.5 transition-all"
                >
                  <Phone className="w-3 h-3" />
                  <span>{contact.phone}</span>
                </a>
                <button
                  onClick={() => handleCopyPhone(contact.id, contact.phone)}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                  title="Copy"
                >
                  {copiedId === contact.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency SOS Modal */}
      {sosModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
          onClick={() => setSosModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-rose-200 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {language === 'bn' ? 'জরুরি এসওএস (SOS) মেসেজ' : 'Emergency SOS Alert'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'আপনার পরিবার বা জরুরি যোগাযোগকে মেসেজ পাঠান' : 'Share crisis details with family or responders'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSosModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-2">
              <p className="font-bold">
                {language === 'bn' ? 'বর্তমান শনাক্তকৃত এলাকা:' : 'Current Detected Location:'} {selectedProfile?.district} ({selectedProfile?.division})
              </p>
              <p className="text-[11px] text-rose-800 leading-normal">
                {language === 'bn' 
                  ? 'এই বাটনটিতে চাপ দিলে আপনার বর্তমান এলাকা ও জাতীয় জরুরি যোগাযোগের বিবরণসহ হোয়াটসঅ্যাপ বা এসএমএস অ্যাপ ওপেন হবে।' 
                  : 'Tapping WhatsApp or SMS will open your messaging app with pre-filled location distress details.'}
              </p>
            </div>

            <div className="space-y-2">
              <a
                href={`https://api.whatsapp.com/send?text=${generateSosMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে এসওএস পাঠান' : 'Send SOS via WhatsApp'}</span>
              </a>

              <a
                href={`sms:?body=${generateSosMessage()}`}
                className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>{language === 'bn' ? 'এসএমএস (SMS) পাঠান' : 'Send SOS via SMS'}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setSosModalOpen(false)}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
            >
              {language === 'bn' ? 'বাতিল করুন' : 'Cancel'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
