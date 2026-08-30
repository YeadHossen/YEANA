import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup, loginDemoAdmin, loginDemoTraveler, isLoading } = useAuth();
  const { t } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    if (isSignUp) {
      if (!fullName) {
        setErrorMsg('Please enter your full name');
        return;
      }
      const success = await signup(email, fullName, password);
      if (success) {
        setSuccessMsg('Account created successfully!');
        setTimeout(() => onClose(), 800);
      } else {
        setErrorMsg('Could not register account. Try again.');
      }
    } else {
      const success = await login(email, password);
      if (success) {
        setSuccessMsg('Signed in successfully!');
        setTimeout(() => onClose(), 800);
      } else {
        setErrorMsg('Invalid email or password.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-br from-brand-700 to-brand-900 text-white p-6 sm:p-8">
          <div className="flex items-center gap-2 text-brand-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-brand-300" />
            <span>YEANA Travel Account</span>
          </div>
          <h2 className="text-2xl font-black font-sans">
            {isSignUp ? 'Create Traveler Profile' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-brand-100 mt-1">
            {isSignUp 
              ? 'Join thousands of travelers exploring Bangladesh.' 
              : 'Sign in to access your saved trips, favorites, and reviews.'}
          </p>
        </div>

        {/* Quick Demo Logins Banner */}
        <div className="p-4 bg-brand-50 border-b border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-brand-900">Quick 1-Click Testing:</span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => { loginDemoTraveler(); onClose(); }}
              className="flex-1 sm:flex-none px-2.5 py-1.5 rounded-lg bg-white border border-brand-200 text-brand-700 hover:bg-brand-100 font-bold shadow-2xs transition-colors"
            >
              Traveler Demo
            </button>
            <button
              onClick={() => { loginDemoAdmin(); onClose(); }}
              className="flex-1 sm:flex-none px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-2xs transition-colors flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Demo
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {successMsg}
            </div>
          )}

          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-md shadow-brand-700/20 transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }}
              className="text-xs text-brand-700 font-semibold hover:underline"
            >
              {isSignUp 
                ? 'Already have an account? Sign In' 
                : "Don't have an account yet? Register here"}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
