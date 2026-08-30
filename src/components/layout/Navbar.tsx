import React, { useState } from 'react';
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
  Car
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';

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
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { favorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('nav.home'), icon: Compass },
    { id: 'explore', label: t('nav.explore'), icon: MapPin },
    { id: 'places', label: t('nav.places'), icon: Compass },
    { id: 'hotels', label: t('nav.hotels'), icon: Hotel },
    { id: 'food', label: t('nav.food'), icon: Utensils },
    { id: 'transport', label: t('nav.transport'), icon: Bus },
    { id: 'shopping', label: t('nav.shopping'), icon: ShoppingBag },
    { id: 'ride', label: t('nav.ride'), icon: Car },
    { id: 'trips', label: t('nav.trips'), icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo & Tagline */}
          <div 
            onClick={() => { setCurrentTab('home'); }} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white shadow-md shadow-brand-700/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-sans">
                  YEANA
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-brand-100 text-brand-800 font-sans">
                  BD
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Explore More. Enjoy Life.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentTab(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs' 
                      : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Global Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm"
              title="Search places, hotels, transport..."
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline text-xs text-slate-500 pr-1">Search...</span>
            </button>

            {/* Language Switcher (EN / বাংলা) */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Toggle Language"
            >
              <Languages className="w-3.5 h-3.5 text-brand-600" />
              <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            {/* Favorites Button */}
            <button
              onClick={() => setCurrentTab('favorites')}
              className={`p-2.5 rounded-xl transition-colors relative ${
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

            {/* Admin Badge/Link if Admin */}
            {isAdmin && (
              <button
                onClick={() => setCurrentTab('admin')}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentTab === 'admin' 
                    ? 'bg-amber-500 text-white shadow-sm' 
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin</span>
              </button>
            )}

            {/* User Profile / Login */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <img
                    src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={user?.full_name || 'User'}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-500/20"
                  />
                  <span className="text-xs font-semibold text-slate-700 hidden lg:inline max-w-[100px] truncate">
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

                    {isAdmin && (
                      <button
                        onClick={() => { setCurrentTab('admin'); setUserDropdownOpen(false); }}
                        className="w-full px-4 py-2 text-left text-xs font-bold text-amber-700 hover:bg-amber-50 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                        <span>{t('nav.admin')}</span>
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => { logout(); setUserDropdownOpen(false); }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm shadow-brand-700/20 transition-all flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t('nav.login')}</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg">
          <div className="grid grid-cols-2 gap-1.5 pt-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 ${
                    isActive ? 'bg-brand-600 text-white font-bold' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-600'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
            {isAdmin && (
              <button
                onClick={() => {
                  setCurrentTab('admin');
                  setMobileMenuOpen(false);
                }}
                className="col-span-2 p-2.5 rounded-xl text-xs font-bold bg-amber-500 text-white flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t('nav.admin')}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
