import React from 'react';
import { Compass, PhoneCall, ShieldCheck, Heart, Mail, Globe, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacy }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 xl:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white font-sans">
                YEANA
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Enjoy Life, Explore More. The unified travel, tourism, and lifestyle ecosystem crafted for exploring Bangladesh’s natural wonders, hotels, heritage, cuisine, and local communities.
            </p>
            
            {/* Bangladesh Tourist Helpline Box */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2 text-brand-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>24/7 Bangladesh Traveler Helplines</span>
              </div>
              <p className="text-slate-300">
                Tourist Police: <a href="tel:+8801320222222" className="text-white font-mono hover:underline">+880 1320-222222</a>
              </p>
              <p className="text-slate-300">
                National Emergency: <span className="text-white font-mono font-bold">999</span> | Railway Hotline: <span className="text-white font-mono font-bold">131</span>
              </p>
            </div>
          </div>

          {/* Quick Discover Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Discover
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => onNavigate('places')} className="hover:text-brand-400 transition-colors">Beautiful Places</button></li>
              <li><button onClick={() => onNavigate('hotels')} className="hover:text-brand-400 transition-colors">Hotels & Eco-Resorts</button></li>
              <li><button onClick={() => onNavigate('food')} className="hover:text-brand-400 transition-colors">Local Cuisine & Cafés</button></li>
              <li><button onClick={() => onNavigate('transport')} className="hover:text-brand-400 transition-colors">Bus, Train & Flights</button></li>
              <li><button onClick={() => onNavigate('shopping')} className="hover:text-brand-400 transition-colors">Handicrafts & Markets</button></li>
              <li><button onClick={() => onNavigate('ride')} className="hover:text-brand-400 transition-colors">Bike & Car Rentals</button></li>
            </ul>
          </div>

          {/* 8 Divisions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Divisions of BD
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => onNavigate('explore')} className="hover:text-brand-400 transition-colors">Sylhet Division</button></li>
              <li><button onClick={() => onNavigate('explore')} className="hover:text-brand-400 transition-colors">Chattogram & Hill Tracts</button></li>
              <li><button onClick={() => onNavigate('explore')} className="hover:text-brand-400 transition-colors">Dhaka & Heritage</button></li>
              <li><button onClick={() => onNavigate('explore')} className="hover:text-brand-400 transition-colors">Khulna & Sundarbans</button></li>
              <li><button onClick={() => onNavigate('explore')} className="hover:text-brand-400 transition-colors">Barishal & Kuakata</button></li>
              <li><button onClick={() => onNavigate('explore')} className="hover:text-brand-400 transition-colors">Rajshahi, Rangpur & Mymensingh</button></li>
            </ul>
          </div>

          {/* Planning & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Trip Planning
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => onNavigate('trips')} className="hover:text-brand-400 transition-colors">Multi-Day Trip Itinerary</button></li>
              <li><button onClick={() => onNavigate('notes')} className="hover:text-emerald-400 text-emerald-300 font-semibold transition-colors">Keep Notes & Expenses (নোট ও খরচ)</button></li>
              <li><button onClick={() => onNavigate('favorites')} className="hover:text-brand-400 transition-colors">Saved Offline Guides</button></li>
              <li><button onClick={() => onNavigate('profile')} className="hover:text-brand-400 transition-colors">My Traveler Profile</button></li>
              <li><button onClick={() => onNavigate('admin')} className="hover:text-brand-400 transition-colors text-amber-400">Admin Portal</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} YEANA Platforms Ltd. All rights reserved. Made with pride for Bangladesh Tourism.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Globe className="w-3.5 h-3.5 text-brand-500" />
              <span>Bangla & English</span>
            </span>
            <button 
              onClick={onOpenPrivacy}
              className="text-slate-400 hover:text-brand-400 transition-colors underline underline-offset-4"
            >
              Privacy Policy
            </button>
            <button 
              onClick={onOpenPrivacy}
              className="text-slate-400 hover:text-brand-400 transition-colors underline underline-offset-4"
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
