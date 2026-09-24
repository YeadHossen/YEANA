import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldCheck, CheckCircle2, Sparkles, Eye, EyeOff, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup, loginDemoTraveler, isLoading } = useAuth();
  const { t } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name');
        return;
      }
      if (!password || password.length < 6) {
        setErrorMsg('Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify.');
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
      const normalizedEmail = email.toLowerCase().trim();
      const isAdmin = normalizedEmail === 'admin@yeana.com.bd' || normalizedEmail === 'admin@yeana.bd';
      const isCompany = normalizedEmail === 'partner@yeana.bd' || normalizedEmail === 'company@yeana.bd' || normalizedEmail.endsWith('@partner.yeana.bd');

      if (isAdmin && (!password || (password.trim() !== 'admin123' && password.trim() !== 'yeana2026'))) {
        setErrorMsg('Access Denied: Incorrect Admin Password. Password required every time.');
        return;
      }

      if (isCompany && (!password || (password.trim() !== 'partner123' && password.trim() !== 'company123'))) {
        setErrorMsg('Access Denied: Incorrect Company Password. Password required every time.');
        return;
      }

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

        {/* Account Persona Selectors (Password Required for Admin & Company) */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Select Account Type:</span>
            </span>
            <span className="text-[10px] text-amber-700 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3 text-amber-600" />
              <span>Password Required</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => { loginDemoTraveler(); onClose(); }}
              className="py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-2xs transition-colors flex flex-col items-center justify-center gap-0.5"
            >
              <User className="w-3 h-3 text-emerald-200" />
              <span>Traveler</span>
            </button>
            <button
              type="button"
              onClick={() => { 
                setIsSignUp(false); 
                setEmail('admin@yeana.com.bd'); 
                setPassword(''); 
                setErrorMsg('');
                setSuccessMsg('Admin selected. Enter password (admin123).');
              }}
              className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] shadow-2xs transition-colors flex flex-col items-center justify-center gap-0.5 border border-slate-700"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>Admin</span>
            </button>
            <button
              type="button"
              onClick={() => { 
                setIsSignUp(false); 
                setEmail('partner@yeana.bd'); 
                setPassword(''); 
                setErrorMsg('');
                setSuccessMsg('Company selected. Enter password (partner123).');
              }}
              className="py-1.5 px-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-[11px] shadow-2xs transition-colors flex flex-col items-center justify-center gap-0.5 border border-blue-700"
            >
              <Building2 className="w-3 h-3 text-cyan-300" />
              <span>Company</span>
            </button>
          </div>

          <p className="text-[10px] text-slate-500 text-center">
            Admin Pass: <code className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200 text-amber-700 font-bold">admin123</code> | Company Pass: <code className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200 text-blue-700 font-bold">partner123</code>
          </p>
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
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password {isSignUp && <span className="text-[11px] text-slate-400 font-normal">(min 6 chars)</span>}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

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
              onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); setConfirmPassword(''); }}
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
