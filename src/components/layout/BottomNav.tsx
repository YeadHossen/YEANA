import React from 'react';
import { Compass, MapPin, Calendar, Heart, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../context/FavoritesContext';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, setCurrentTab }) => {
  const { t } = useLanguage();
  const { favorites } = useFavorites();

  const tabs = [
    { 
      id: 'home', 
      label: t('nav.home'), 
      icon: Compass,
      activeColor: 'text-emerald-700',
      activeBg: 'bg-emerald-50/90 border-emerald-200/80',
      labelColor: 'text-emerald-800'
    },
    { 
      id: 'explore', 
      label: t('nav.explore'), 
      icon: MapPin,
      activeColor: 'text-sky-600',
      activeBg: 'bg-sky-50/90 border-sky-200/80',
      labelColor: 'text-sky-800'
    },
    { 
      id: 'trips', 
      label: t('nav.trips'), 
      icon: Calendar,
      activeColor: 'text-amber-600',
      activeBg: 'bg-amber-50/90 border-amber-200/80',
      labelColor: 'text-amber-900'
    },
    { 
      id: 'favorites', 
      label: t('nav.favorites'), 
      icon: Heart, 
      badge: favorites.length,
      activeColor: 'text-rose-600',
      activeBg: 'bg-rose-50/90 border-rose-200/80',
      labelColor: 'text-rose-800'
    },
    { 
      id: 'profile', 
      label: t('nav.profile'), 
      icon: User,
      activeColor: 'text-indigo-600',
      activeBg: 'bg-indigo-50/90 border-indigo-200/80',
      labelColor: 'text-indigo-800'
    },
  ];

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-2 pt-1 safe-area-bottom pointer-events-none">
      <div className="max-w-md mx-auto bg-white/90 backdrop-blur-2xl border border-white/70 shadow-2xl rounded-2xl px-2 py-1.5 flex items-center justify-around pointer-events-auto shadow-slate-950/15">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive 
                  ? `${tab.activeColor} font-black scale-105` 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {isActive && (
                <span className={`absolute inset-0 ${tab.activeBg} rounded-xl -z-10 border shadow-xs`} />
              )}
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? `${tab.activeColor} stroke-[2.5] -translate-y-0.5` : 'stroke-[1.75]'}`} />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 min-w-4 h-4 px-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight font-sans ${isActive ? `font-black ${tab.labelColor}` : 'font-medium text-slate-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
