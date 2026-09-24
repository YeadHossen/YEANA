import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Compass, 
  Bus, 
  ShieldAlert, 
  Languages,
  ArrowRight,
  Shield,
  HeartHandshake,
  MapPin,
  Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { BrandLogo } from '../components/common/BrandLogo';

interface LoginViewProps {
  onLoginSuccess?: () => void;
  onOpenPrivacy?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onOpenPrivacy }) => {
  const { login, signup, loginDemoTraveler, isLoading } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg(language === 'bn' ? 'সঠিক ইমেইল এড্রেস লিখুন।' : 'Please enter a valid email address.');
      return;
    }

    if (isSignUp) {
      if (!fullName.trim()) {
        setErrorMsg(language === 'bn' ? 'আপনার পুরো নাম লিখুন।' : 'Please enter your full name.');
        return;
      }
      if (!password || password.length < 6) {
        setErrorMsg(language === 'bn' ? 'কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন।' : 'Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg(language === 'bn' ? 'পাসওয়ার্ড এবং নিশ্চিতকরণ পাসওয়ার্ড মিলছে না।' : 'Passwords do not match. Please verify.');
        return;
      }
      const success = await signup(email, fullName, password);
      if (success) {
        setSuccessMsg(language === 'bn' ? 'একাউন্ট সফলভাবে তৈরি হয়েছে! স্বাগতম।' : 'Account created successfully! Welcome.');
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setErrorMsg(language === 'bn' ? 'একাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।' : 'Could not register account. Please try again.');
      }
    } else {
      const normalizedEmail = email.toLowerCase().trim();
      const isAdmin = normalizedEmail === 'admin@yeana.com.bd' || normalizedEmail === 'admin@yeana.bd';
      const isCompany = normalizedEmail === 'partner@yeana.bd' || normalizedEmail === 'company@yeana.bd' || normalizedEmail.endsWith('@partner.yeana.bd');

      if (isAdmin && (!password || (password.trim() !== 'admin123' && password.trim() !== 'yeana2026'))) {
        setErrorMsg(language === 'bn' 
          ? 'ভুল পাসওয়ার্ড! অ্যাডমিন অ্যাক্সেসের জন্য পাসওয়ার্ড (admin123) প্রয়োজন।' 
          : 'Access Denied: Incorrect Admin Password. Password required every time.');
        return;
      }

      if (isCompany && (!password || (password.trim() !== 'partner123' && password.trim() !== 'company123'))) {
        setErrorMsg(language === 'bn' 
          ? 'ভুল পাসওয়ার্ড! কোম্পানি পার্টনার পোর্টালের জন্য পাসওয়ার্ড (partner123) প্রয়োজন।' 
          : 'Access Denied: Incorrect Company Password. Password required every time.');
        return;
      }

      const success = await login(email, password);
      if (success) {
        setSuccessMsg(language === 'bn' ? 'সফলভাবে লগইন হয়েছে!' : 'Signed in successfully!');
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setErrorMsg(language === 'bn' ? 'ভুল ইমেইল বা পাসওয়ার্ড।' : 'Invalid email or password.');
      }
    }
  };

  const handleDemoTraveler = () => {
    loginDemoTraveler();
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleSelectAdmin = () => {
    setIsSignUp(false);
    setEmail('admin@yeana.com.bd');
    setPassword('');
    setErrorMsg('');
    setSuccessMsg(language === 'bn' 
      ? 'অ্যাডমিন অ্যাকাউন্ট সিলেক্ট করা হয়েছে। প্রবেশ করতে পাসওয়ার্ড (admin123) দিন।' 
      : 'Admin account selected. Enter password (admin123) to sign in.');
  };

  const handleSelectCompany = () => {
    setIsSignUp(false);
    setEmail('partner@yeana.bd');
    setPassword('');
    setErrorMsg('');
    setSuccessMsg(language === 'bn' 
      ? 'কোম্পানি পার্টনার সিলেক্ট করা হয়েছে। প্রবেশ করতে পাসওয়ার্ড (partner123) দিন।' 
      : 'Company partner selected. Enter password (partner123) to sign in.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Decorative Rings & Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
        <BrandLogo size="md" />

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Column: Bangladesh Travel Showcase */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{language === 'bn' ? 'বাংলাদেশের পর্যটন ও ভ্রমণ নেটওয়ার্ক' : 'Discover Beautiful Bangladesh'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight leading-tight">
              {language === 'bn' ? (
                <>
                  ভ্রমণে প্রবেশ করতে <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    লগইন করুন
                  </span>
                </>
              ) : (
                <>
                  Sign in to Explore <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    Bangladesh With YEANA
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
              {language === 'bn' 
                ? 'নিরাপদ যাতায়াত টিকিট বুকিং (বিকাশ, নগদ, রকেট, কার্ড), দেশের ৬৪ জেলার আকর্ষণীয় স্পট ও হোটেল রিজার্ভেশন সুবিধা পেতে আপনার একাউন্টে প্রবেশ করুন।'
                : 'Access 64 verified district guides, direct transport seat booking with bKash, Nagad, Rocket, and Card, 24/7 crisis emergency helplines, and customized multi-day trip itineraries.'}
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                <Compass className="w-5 h-5 text-emerald-400" />
                <p className="text-xs font-black text-white">
                  {language === 'bn' ? '৬৪টি জেলা' : '64 Districts'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'সম্পূর্ণ দর্শনীয় স্থান' : 'Authentic guides'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                <Bus className="w-5 h-5 text-sky-400" />
                <p className="text-xs font-black text-white">
                  {language === 'bn' ? 'যাতায়াত বুকিং' : 'Direct Booking'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'বিকাশ, নগদ, কার্ড' : 'bKash, Nagad, Cards'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <p className="text-xs font-black text-white">
                  {language === 'bn' ? '২৪/৭ জরুরি সেবা' : '24/7 Helpline'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'পুলিশ ও এম্বুলেন্স' : 'Police & Ambulance'}
                </p>
              </div>
            </div>

            {/* Privacy Compliance Badge */}
            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {language === 'bn' 
                  ? 'বাংলাদেশ আইসিটি আইন ২০০৬ ও সাইবার সিকিউরিটি আইন ২০২৩ অনুযায়ী সংরক্ষিত।' 
                  : 'Secured under Bangladesh ICT Act 2006 & Cyber Security Act 2023.'}
              </span>
            </div>
          </div>

          {/* Right Column: Sign In Card */}
          <div className="lg:col-span-6 max-w-md w-full mx-auto">
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 text-slate-900 space-y-6 animate-in zoom-in-95 duration-200">
              
              {/* Tab Selector: Sign In vs Register */}
              <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200 text-xs font-black">
                <button
                  type="button"
                  onClick={() => { setIsSignUp(false); setErrorMsg(''); setSuccessMsg(''); setConfirmPassword(''); }}
                  className={`flex-1 py-2.5 rounded-xl transition-all ${
                    !isSignUp 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {language === 'bn' ? 'সাইন ইন (লগইন)' : 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); setConfirmPassword(''); }}
                  className={`flex-1 py-2.5 rounded-xl transition-all ${
                    isSignUp 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {language === 'bn' ? 'নতুন একাউন্ট খুলুন' : 'Create Account'}
                </button>
              </div>

              {/* Quick Persona Form-Fillers (Passwords Strictly Enforced) */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'bn' ? 'অ্যাকাউন্ট টাইপ সিলেক্ট করুন:' : 'Select Account Persona:'}</span>
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-600" />
                    <span>Password Required</span>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={handleDemoTraveler}
                    className="py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs transition-all active:scale-95 flex flex-col items-center justify-center gap-0.5 text-center"
                    title="1-Click Traveler Access"
                  >
                    <User className="w-3.5 h-3.5 text-emerald-200" />
                    <span>{language === 'bn' ? 'ট্রাভেলার' : 'Traveler'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSelectAdmin}
                    className="py-2 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] shadow-xs transition-all active:scale-95 flex flex-col items-center justify-center gap-0.5 text-center border border-slate-700"
                    title="Admin login - Password required"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'bn' ? 'অ্যাডমিন' : 'Admin'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSelectCompany}
                    className="py-2 px-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-[11px] shadow-xs transition-all active:scale-95 flex flex-col items-center justify-center gap-0.5 text-center border border-blue-700"
                    title="Company login - Password required"
                  >
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{language === 'bn' ? 'কোম্পানি' : 'Company'}</span>
                  </button>
                </div>

                <div className="text-[10px] text-slate-500 text-center space-y-0.5 pt-1 border-t border-slate-200/80">
                  <p>Admin: <code className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200">admin@yeana.com.bd</code> (Pass: <code className="font-mono text-amber-700 font-bold bg-amber-50 px-1 py-0.5 rounded border border-amber-200">admin123</code>)</p>
                  <p>Company: <code className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200">partner@yeana.bd</code> (Pass: <code className="font-mono text-blue-700 font-bold bg-blue-50 px-1 py-0.5 rounded border border-blue-200">partner123</code>)</p>
                </div>
              </div>

              {/* Error and Success Feedback */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold animate-in fade-in">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                {isSignUp && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'bn' ? 'পুরো নাম' : 'Full Name'} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={language === 'bn' ? 'যেমন: মোহাম্মদ ইয়াদ' : 'e.g. Mohammed Yead'}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'bn' ? 'ইমেইল এড্রেস' : 'Email Address'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="traveler@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isSignUp && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'bn' ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm Password'} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition-all disabled:opacity-50"
                >
                  <span>
                    {isLoading 
                      ? (language === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Signing In...') 
                      : (isSignUp 
                          ? (language === 'bn' ? 'একাউন্ট তৈরি করুন' : 'Create Traveler Account') 
                          : (language === 'bn' ? 'লগইন করুন ➔' : 'Sign In to YEANA ➔'))}
                  </span>
                </button>

              </form>

              {/* Privacy Policy Link */}
              <div className="pt-2 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-[11px] text-slate-500 hover:text-emerald-700 font-semibold hover:underline"
                >
                  {language === 'bn' ? 'বাংলাদেশ প্রাইভেসী পলিসি ও নীতিমালা পড়ুন' : 'Read Bangladesh Privacy Policy & Terms'}
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 text-center text-xs text-slate-500 border-t border-white/5">
        <span>© {new Date().getFullYear()} YEANA Travel Bangladesh. All rights reserved.</span>
      </footer>

    </div>
  );
};
