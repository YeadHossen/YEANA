import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Search, 
  Heart, 
  Calendar, 
  User, 
  Menu, 
  X, 
  Languages, 
  ShieldCheck, 
  LogOut,
  MapPin,
  Utensils,
  Hotel,
  Bus,
  ShoppingBag,
  Car,
  MessageSquare,
  Receipt,
  Building2,
  ShieldAlert
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useChat } from '../../context/ChatContext';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSearch,
  onOpenAuth
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, isAuthenticated, isAdmin, isCompany, logout } = useAuth();
  const { favorites } = useFavorites();
  const { unreadAdminCount, unreadTravelerCount, openTravelerChat } = useChat();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('nav.home'), icon: Compass, color: 'text-emerald-600', active: 'bg-emerald-50/90 text-emerald-800 border-emerald-200/90 shadow-emerald-950/5', dot: 'bg-emerald-500' },
    { id: 'explore', label: t('nav.explore'), icon: MapPin, color: 'text-teal-600', active: 'bg-teal-50/90 text-teal-800 border-teal-200/90 shadow-teal-950/5', dot: 'bg-teal-500' },
    { id: 'places', label: t('nav.places'), icon: Compass, color: 'text-emerald-700', active: 'bg-emerald-50/90 text-emerald-900 border-emerald-200/90 shadow-emerald-950/5', dot: 'bg-emerald-500' },
    { id: 'hotels', label: t('nav.hotels'), icon: Hotel, color: 'text-indigo-600', active: 'bg-indigo-50/90 text-indigo-900 border-indigo-200/90 shadow-indigo-950/5', dot: 'bg-indigo-500' },
    { id: 'food', label: t('nav.food'), icon: Utensils, color: 'text-amber-600', active: 'bg-amber-50/90 text-amber-950 border-amber-200/90 shadow-amber-950/5', dot: 'bg-amber-500' },
    { id: 'transport', label: t('nav.transport'), icon: Bus, color: 'text-sky-600', active: 'bg-sky-50/90 text-sky-900 border-sky-200/90 shadow-sky-950/5', dot: 'bg-sky-500' },
    { id: 'shopping', label: t('nav.shopping'), icon: ShoppingBag, color: 'text-purple-600', active: 'bg-purple-50/90 text-purple-900 border-purple-200/90 shadow-purple-950/5', dot: 'bg-purple-500' },
    { id: 'ride', label: t('nav.ride'), icon: Car, color: 'text-rose-600', active: 'bg-rose-50/90 text-rose-900 border-rose-200/90 shadow-rose-950/5', dot: 'bg-rose-500' },
    { id: 'trips', label: t('nav.trips'), icon: Calendar, color: 'text-orange-600', active: 'bg-orange-50/90 text-orange-950 border-orange-200/90 shadow-orange-950/5', dot: 'bg-orange-500' },
    { id: 'notes', label: t('nav.notes'), icon: Receipt, color: 'text-teal-700', active: 'bg-teal-50/90 text-teal-900 border-teal-200/90 shadow-teal-950/5', dot: 'bg-teal-500' },
    { id: 'emergency', label: t('nav.emergency'), icon: ShieldAlert, color: 'text-rose-600', active: 'bg-rose-50/90 text-rose-900 border-rose-200/90 shadow-rose-950/5', dot: 'bg-rose-500' },
  ];

  // Company Portal strictly sees ONLY Company E-Portal, Hotel, Transport, and Ride
  const companyNavLinks = [
    { id: 'admin', label: language === 'bn' ? 'কোম্পানি ই-পোর্টাল' : 'Company E-Portal', icon: Building2, color: 'text-blue-600', active: 'bg-blue-50/90 text-blue-900 border-blue-200/90 shadow-blue-950/5', dot: 'bg-blue-500' },
    { id: 'hotels', label: t('nav.hotels'), icon: Hotel, color: 'text-indigo-600', active: 'bg-indigo-50/90 text-indigo-900 border-indigo-200/90 shadow-indigo-950/5', dot: 'bg-indigo-500' },
    { id: 'transport', label: t('nav.transport'), icon: Bus, color: 'text-sky-600', active: 'bg-sky-50/90 text-sky-900 border-sky-200/90 shadow-sky-950/5', dot: 'bg-sky-500' },
    { id: 'ride', label: t('nav.ride'), icon: Car, color: 'text-rose-600', active: 'bg-rose-50/90 text-rose-900 border-rose-200/90 shadow-rose-950/5', dot: 'bg-rose-500' },
  ];

  const activeNavLinks = (isCompany && !isAdmin) ? companyNavLinks : navLinks;

  const [isOnline, setIsOnline] = useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSignOut = async () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
    if (currentTab === 'admin' || currentTab === 'profile') {
      setCurrentTab('home');
    }
    onOpenAuth();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 shadow-xs transition-all">
        {/* Radiant Heritage Accent Top Line */}
        <div className="h-[2.5px] w-full bg-gradient-to-r from-emerald-600 via-teal-400 via-amber-400 to-sky-500 opacity-90 shadow-xs" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo & Tagline */}
          <div 
            onClick={() => { setCurrentTab(isCompany && !isAdmin ? 'admin' : 'home'); }} 
            className="cursor-pointer group select-none"
          >
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 p-1 rounded-2xl bg-slate-100/80 border border-slate-200/70 backdrop-blur-md">
            {activeNavLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentTab(link.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border relative ${
                    isActive 
                      ? `${link.active} font-black shadow-xs scale-102` 
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? link.color : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {isActive && (
                    <span className={`w-1.5 h-1.5 rounded-full ${link.dot} animate-pulse shrink-0`} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Online / Cloud Status Indicator */}
            <div 
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md transition-all ${
                isOnline 
                  ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200/80 shadow-xs' 
                  : 'bg-amber-50/90 text-amber-800 border-amber-200/80 shadow-xs'
              }`}
              title={isOnline ? 'Online: Cloud Synced with Live Platform' : 'Offline: Using cached local data'}
            >
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>{isOnline ? 'Live Online' : 'Offline'}</span>
            </div>

            {/* Global Search Trigger (Traveler only) */}
            {!(isCompany && !isAdmin) && (
              <button
                onClick={onOpenSearch}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100/90 hover:bg-white hover:border-emerald-200 text-slate-600 hover:text-slate-900 border border-slate-200/70 transition-all flex items-center gap-2 text-sm shadow-xs"
                title="Search places, hotels, transport..."
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span className="hidden md:inline text-xs text-slate-500 font-medium pr-1">Search...</span>
              </button>
            )}

            {/* Language Switcher (EN / বাংলা) */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-slate-100/90 hover:bg-white text-slate-700 text-xs font-bold flex items-center gap-1 sm:gap-1.5 border border-slate-200/70 shadow-xs transition-all"
              title="Toggle Language"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            {/* Favorites Button (Desktop/Tablet - Traveler only) */}
            {!(isCompany && !isAdmin) && (
              <button
                onClick={() => setCurrentTab('favorites')}
                className={`hidden sm:flex p-2.5 rounded-xl transition-colors relative ${
                  currentTab === 'favorites' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100/80 text-slate-600 hover:text-rose-600'
                }`}
                title="Favorites & Saved Items"
              >
                <Heart className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
            )}

            {/* Support Concierge Chat Button for Travelers */}
            {!(isCompany && !isAdmin) && (
              <button
                onClick={() => openTravelerChat()}
                className="hidden md:flex p-2.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 hover:text-brand-600 transition-colors relative"
                title="Chat with YEANA Concierge / Tour Support"
              >
                <MessageSquare className="w-4 h-4" />
                {unreadTravelerCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadTravelerCount}
                  </span>
                )}
              </button>
            )}

            {/* Portal / Admin Access: Strictly Role-Adaptive (Hidden for Travelers) */}
            {isAdmin ? (
              <button
                onClick={() => setCurrentTab('admin')}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all relative shadow-xs ${
                  currentTab === 'admin' 
                    ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-400/40' 
                    : 'bg-amber-100/90 text-amber-950 hover:bg-amber-200 border border-amber-300/60'
                }`}
                title="YEANA Administrator Console & Live Booking Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Admin Console</span>
                {unreadAdminCount > 0 ? (
                  <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-black rounded-full animate-pulse">
                    {unreadAdminCount}
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </button>
            ) : isCompany ? (
              <button
                onClick={() => setCurrentTab('admin')}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-xs ${
                  currentTab === 'admin'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-400/40'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200'
                }`}
                title="YEANA Partner & Company E-Portal (Active)"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Company Portal</span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </button>
            ) : null}

            {/* User Profile on Desktop (Hidden on mobile so the right side only shows the Menu Bar) */}
            {isAuthenticated ? (
              <div className="hidden xl:flex items-center gap-2">
                {/* User Dropdown Trigger */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                    title="User Profile Menu"
                  >
                    <img
                      src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt={user?.full_name || 'User'}
                      className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-500/20"
                    />
                    <span className="text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                      {user?.full_name?.split(' ')[0]}
                    </span>
                  </button>

                  {userDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{user?.full_name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                      </div>

                      {isCompany && !isAdmin ? (
                        <>
                          <button
                            onClick={() => { setCurrentTab('admin'); setUserDropdownOpen(false); }}
                            className="w-full px-4 py-2 text-left text-xs font-bold text-blue-700 hover:bg-blue-50 flex items-center gap-2"
                          >
                            <Building2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Company E-Portal</span>
                          </button>
                          <button
                            onClick={() => { setCurrentTab('hotels'); setUserDropdownOpen(false); }}
                            className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2"
                          >
                            <Hotel className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{t('nav.hotels')}</span>
                          </button>
                          <button
                            onClick={() => { setCurrentTab('transport'); setUserDropdownOpen(false); }}
                            className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 flex items-center gap-2"
                          >
                            <Bus className="w-3.5 h-3.5 text-sky-600" />
                            <span>{t('nav.transport')}</span>
                          </button>
                          <button
                            onClick={() => { setCurrentTab('ride'); setUserDropdownOpen(false); }}
                            className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-700 flex items-center gap-2"
                          >
                            <Car className="w-3.5 h-3.5 text-rose-600" />
                            <span>{t('nav.ride')}</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => { setCurrentTab('profile'); setUserDropdownOpen(false); }}
                            className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 flex items-center gap-2"
                          >
                            <User className="w-3.5 h-3.5" />
                            <span>{t('nav.profile')}</span>
                          </button>

                          <button
                            onClick={() => { setCurrentTab('trips'); setUserDropdownOpen(false); }}
                            className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 flex items-center gap-2"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{t('nav.trips')}</span>
                          </button>

                          <button
                            onClick={() => { setCurrentTab('notes'); setUserDropdownOpen(false); }}
                            className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2"
                          >
                            <Receipt className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{t('nav.notes')}</span>
                          </button>

                          {isAdmin && (
                            <button
                              onClick={() => { setCurrentTab('admin'); setUserDropdownOpen(false); }}
                              className="w-full px-4 py-2 text-left text-xs font-bold text-amber-700 hover:bg-amber-50 flex items-center gap-2"
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                              <span>{t('nav.admin')}</span>
                            </button>
                          )}
                        </>
                      )}

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t('nav.logout')}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hidden xl:flex px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm shadow-brand-700/20 transition-all items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t('nav.login')}</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button (Clearly visible on the right side) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden px-3 py-2 rounded-2xl transition-all flex items-center justify-center gap-1.5 border shadow-xs active:scale-90 ${
                mobileMenuOpen 
                  ? 'bg-rose-50 text-rose-600 border-rose-200 ring-2 ring-rose-400/30' 
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500 shadow-md shadow-emerald-950/20 hover:brightness-105'
              }`}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              title="Menu"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4" />
                  <span className="text-xs font-black">Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4" />
                  <span className="text-xs font-black tracking-wide">Menu</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-3xl px-4 pt-3 pb-8 space-y-4 shadow-2xl max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain animate-in slide-in-from-top-2 duration-200">
          
          {/* User Account Bar with Sign Out / Sign In option */}
          {isAuthenticated ? (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 flex items-center justify-between gap-3 shadow-lg">
              <div 
                onClick={() => { 
                  setCurrentTab(isCompany && !isAdmin ? 'admin' : 'profile'); 
                  setMobileMenuOpen(false); 
                }}
                className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
              >
                <div className="relative shrink-0">
                  <img
                    src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={user?.full_name || 'User'}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-400/30"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-black text-white truncate font-heading">{user?.full_name}</p>
                    <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 text-[9px] font-bold uppercase border border-emerald-500/30 shrink-0">
                      {isAdmin ? 'Admin' : isCompany ? 'Partner' : 'Traveler'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate font-mono mt-0.5">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 rounded-xl bg-rose-500/90 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1 shadow-md transition-all shrink-0 active:scale-95 border border-rose-400/40"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t('nav.logout')}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/25 transition-all active:scale-95"
            >
              <User className="w-4 h-4" />
              <span>{t('nav.login')} / Sign In</span>
            </button>
          )}

          {/* Quick Support & Helplines Strip */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openTravelerChat();
              }}
              className="p-2.5 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200/80 flex items-center gap-2 font-bold transition-all text-left shadow-2xs active:scale-95"
            >
              <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-black">24/7 Concierge</span>
                <span className="block text-[9px] text-emerald-600 truncate font-medium">Live Tour Help</span>
              </div>
            </button>

            <a
              href="tel:999"
              className="p-2.5 rounded-2xl bg-rose-50/80 hover:bg-rose-100/80 text-rose-800 border border-rose-200/80 flex items-center gap-2 font-bold transition-all text-left shadow-2xs active:scale-95"
            >
              <div className="w-7 h-7 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldAlert className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-black">Emergency 999</span>
                <span className="block text-[9px] text-rose-600 truncate font-medium">Police & Rescue</span>
              </div>
            </a>
          </div>

          {/* Categorized Navigation Grid */}
          <div>
            <div className="flex items-center justify-between pb-2 px-1">
              <span className="text-[10px] font-black tracking-wider uppercase text-slate-400">All Travel Hubs</span>
              <span className="text-[10px] text-emerald-700 font-bold">{activeNavLinks.length} Services</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {activeNavLinks.map(link => {
                const Icon = link.icon;
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setCurrentTab(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 border transition-all text-left ${
                      isActive 
                        ? `${link.active} shadow-md scale-102 ring-1 ring-emerald-500/30` 
                        : 'bg-slate-50/90 text-slate-800 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xs active:scale-95'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${isActive ? 'bg-white' : 'bg-white border border-slate-200/60'}`}>
                      <Icon className={`w-4 h-4 ${link.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block font-black truncate text-xs">{link.label}</span>
                      {isActive && (
                        <span className="block text-[9px] text-emerald-600 font-semibold">Active View</span>
                      )}
                    </div>
                  </button>
                );
              })}

              {isAdmin && (
                <button
                  onClick={() => {
                    setCurrentTab('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="col-span-2 p-3 rounded-2xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-amber-950/20 active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('nav.admin')} Console</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}
    </header>

    {/* Outside click backdrop when mobile menu is open */}
    {mobileMenuOpen && (
      <div
        className="fixed inset-0 top-16 md:top-20 bg-slate-950/40 backdrop-blur-xs z-40 xl:hidden animate-in fade-in duration-150"
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
    )}

    {/* Structural Layout Spacer: Guarantees page content starts precisely below the fixed menu bar */}
    <div className="h-16 md:h-20 shrink-0 pointer-events-none" aria-hidden="true" />
  </>
);
};
