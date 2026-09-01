import React from 'react';
import { X, ShieldCheck, Lock, Eye, FileText, Phone, Mail, Globe, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-900 to-slate-900 p-5 sm:p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">
                {language === 'bn' ? 'গোপনীয়তা নীতি ও ব্যবহারের শর্তাবলী' : 'Privacy Policy & Terms of Service'}
              </h2>
              <p className="text-xs text-slate-300">
                {language === 'bn' ? 'YEANA ট্রাভেল বাংলাদেশ প্ল্যাটফর্ম • গুগল প্লে স্টোর অনুমোদিত' : 'YEANA Travel Bangladesh • Google Play Verified Policy'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">
          
          {/* Quick Summary Alert */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm">
                {language === 'bn' ? 'আপনার তথ্যের শতভাগ নিরাপত্তা নিশ্চয়তা' : 'Your Privacy is 100% Protected'}
              </h3>
              <p className="text-xs text-emerald-800 mt-1">
                {language === 'bn' 
                  ? 'YEANA কোনো অপ্রয়োজনীয় ব্যক্তিগত তথ্য সংরক্ষণ করে না। আপনার বুকিং এবং পছন্দের তথ্য শুধুমাত্র আপনার সুবিধার্থে নিরাপদে এনক্রিপ্ট রাখা হয়।' 
                  : 'YEANA does not sell or share personal data with third parties. Your trip plans, favorites, and hotel bookings are securely encrypted.'}
              </p>
            </div>
          </div>

          {/* Section 1: Information We Collect */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-brand-600" />
              <span>1. {language === 'bn' ? 'আমরা যে তথ্য সংগ্রহ করি' : 'Information We Collect'}</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                <strong>{language === 'bn' ? 'অ্যাকাউন্ট ও বুকিং তথ্য:' : 'Account & Booking Information:'}</strong>{' '}
                {language === 'bn' 
                  ? 'হোটেল বুকিং এবং ট্রিপ প্ল্যান সেভ করার জন্য নাম, মোবাইল নম্বর ও ইমেইল।' 
                  : 'Name, contact phone number, and optional email when confirming hotel stays or trip itineraries.'}
              </li>
              <li>
                <strong>{language === 'bn' ? 'লোকেশন ডাটা (ঐচ্ছিক):' : 'Location Data (Optional):'}</strong>{' '}
                {language === 'bn' 
                  ? 'আপনার বর্তমান অবস্থান থেকে নিকটস্থ দর্শনীয় স্থান এবং হোটেল দেখানোর জন্য ডিভাইস লোকেশন অনুরোধ করা হতে পারে।' 
                  : 'Used solely to calculate travel distances and display nearby tourist attractions on the interactive map.'}
              </li>
            </ul>
          </div>

          {/* Section 2: How We Use Data */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-600" />
              <span>2. {language === 'bn' ? 'তথ্যের ব্যবহার ও সুরক্ষা' : 'How We Protect Your Data'}</span>
            </h3>
            <p className="text-slate-600">
              {language === 'bn'
                ? 'আপনার তথ্যাদি ইন্ডাস্ট্রি স্ট্যান্ডার্ড এসএসএল (SSL) এনক্রিপশনের মাধ্যমে নিরাপদ ক্লাউডে সংরক্ষিত থাকে। আমরা কোনো থার্ড পার্টি বিজ্ঞাপনী সংস্থাকে ব্যবহারকারীর তথ্য প্রদান করি না।'
                : 'All network transmissions utilize TLS/SSL encryption. We do not sell user data to advertising brokers or unauthorized third parties.'}
            </p>
          </div>

          {/* Section 3: User Rights & Deletion */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-600" />
              <span>3. {language === 'bn' ? 'ব্যবহারকারীর অধিকার ও ডাটা মুছে ফেলা' : 'User Rights & Account Deletion'}</span>
            </h3>
            <p className="text-slate-600">
              {language === 'bn'
                ? 'গুগল প্লে স্টোর পলিসি অনুযায়ী, আপনি যেকোনো সময় আপনার অ্যাকাউন্ট, বুকিং হিস্ট্রি বা ট্রিপ ডাটা স্থায়ীভাবে মুছে ফেলার অনুরোধ করতে পারেন।'
                : 'In full compliance with Google Play Developer Policies and GDPR, users may request complete deletion of their account and cached itineraries at any time.'}
            </p>
          </div>

          {/* Section 4: Developer Contact */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
              {language === 'bn' ? 'ডেভেলপার ও হেল্পলাইন যোগাযোগ' : 'Developer & Support Contact'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600" />
                <span>support@yeanatravel.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>+880 1800-YEANA-BD</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-600" />
                <span>https://yeanatravel.com</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Version 1.0.0 (Release Build)
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md"
          >
            {language === 'bn' ? 'বুঝেছি / বন্ধ করুন' : 'I Understand / Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
