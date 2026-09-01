import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  LogOut, 
  ShieldCheck, 
  Languages, 
  Edit3, 
  CheckCircle2, 
  Globe,
  Bell,
  Settings,
  Receipt
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrip } from '../context/TripContext';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { useNotes } from '../context/NotesContext';

interface ProfileViewProps {
  onNavigateTab: (tab: string) => void;
  onOpenAuth: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onNavigateTab, onOpenAuth }) => {
  const { user, isAuthenticated, isAdmin, logout, updateProfile, loginDemoAdmin, loginDemoTraveler } = useAuth();
  const { trips } = useTrip();
  const { favorites } = useFavorites();
  const { expenses, notes } = useNotes();
  const { language, setLanguage, t } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      full_name: fullName,
      phone,
      bio
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 shadow-card text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 font-sans">Sign in to YEANA</h2>
          <p className="text-xs text-slate-500">
            Access your personalized multi-day trip itineraries, saved destinations, and reviews.
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-700/20 transition-all"
        >
          Sign In or Create Account
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 pb-20">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6 relative overflow-hidden">
        
        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile information updated successfully!</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Avatar */}
          <div className="relative">
            <img
              src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
              alt={user?.full_name || 'Traveler'}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-brand-500/20 shadow-md"
            />
            {isAdmin && (
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg bg-amber-500 text-white text-[10px] font-extrabold shadow-sm flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3" /> Admin
              </span>
            )}
          </div>

          {/* User Basic Info */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-black text-slate-900 font-sans">{user?.full_name}</h1>
                <p className="text-xs text-slate-500 font-mono">{user?.email}</p>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 self-center sm:self-auto shadow-2xs"
              >
                <Edit3 className="w-3.5 h-3.5 text-brand-600" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              {user?.bio || 'Explorer discovering the rich landscapes, heritage, and cuisine of Bangladesh.'}
            </p>

            {user?.phone && (
              <div className="flex items-center gap-2 text-xs text-slate-500 justify-center sm:justify-start pt-1">
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                <span>{user.phone}</span>
              </div>
            )}
          </div>

        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="pt-6 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">Update Profile Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 17..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Traveler Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share your travel interests..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                rows={2}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-700/20"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        
        <div 
          onClick={() => onNavigateTab('trips')}
          className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-card cursor-pointer hover:border-brand-300 transition-colors"
        >
          <div className="w-9 h-9 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-2">
            <Calendar className="w-4 h-4" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{trips.length}</p>
          <p className="text-[11px] text-slate-500 font-semibold">Planned Trips</p>
        </div>

        <div 
          onClick={() => onNavigateTab('notes')}
          className="p-4 sm:p-5 rounded-3xl bg-emerald-50/60 border border-emerald-200/80 shadow-card cursor-pointer hover:border-emerald-400 transition-colors group"
        >
          <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Receipt className="w-4 h-4" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-emerald-900 font-mono">
            {expenses.length} / {notes.length}
          </p>
          <p className="text-[11px] text-emerald-700 font-bold">Keep Notes & Costs</p>
        </div>

        <div 
          onClick={() => onNavigateTab('favorites')}
          className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-card cursor-pointer hover:border-rose-300 transition-colors"
        >
          <div className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
            <Heart className="w-4 h-4" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{favorites.length}</p>
          <p className="text-[11px] text-slate-500 font-semibold">Saved Bookmarks</p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="w-9 h-9 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mb-2">
            <Globe className="w-4 h-4" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono">8</p>
          <p className="text-[11px] text-slate-500 font-semibold">BD Divisions</p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-card col-span-2 sm:col-span-1">
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-sm font-black text-emerald-700 capitalize truncate">{user?.role || 'Traveler'}</p>
          <p className="text-[11px] text-slate-500 font-semibold">Account Status</p>
        </div>

      </div>

      {/* Preferences & Settings */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-600" />
          <span>Platform Preferences</span>
        </h3>

        <div className="space-y-4 divide-y divide-slate-100 text-xs">
          
          {/* Language Switch */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="font-bold text-slate-800">Primary Display Language</p>
              <p className="text-slate-400">Choose between English and বাংলা</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  language === 'en' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  language === 'bn' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>

          {/* Switch Demo Roles */}
          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="font-bold text-slate-800">Switch Demo Persona</p>
              <p className="text-slate-400">Test different user roles for demonstration</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={loginDemoTraveler}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold"
              >
                Traveler
              </button>
              <button
                onClick={loginDemoAdmin}
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-white hover:bg-amber-600 font-bold"
              >
                Admin
              </button>
            </div>
          </div>

          {/* Admin Panel Deep Link if Admin */}
          {isAdmin && (
            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="font-bold text-amber-900">Admin Control Center</p>
                <p className="text-slate-400">Add, edit, or remove platform destinations and listings</p>
              </div>
              <button
                onClick={() => onNavigateTab('admin')}
                className="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600"
              >
                Open Admin Portal
              </button>
            </div>
          )}

          {/* Logout */}
          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="font-bold text-rose-600">Sign Out</p>
              <p className="text-slate-400">Log out of your traveler account on this device</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
