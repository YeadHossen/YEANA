import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2, 
  Scale, 
  CreditCard, 
  MapPin 
} from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 p-5 sm:p-6 text-white flex items-center justify-between shrink-0 border-b border-emerald-900/40">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black font-heading">
                  {language === 'bn' ? 'বাংলাদেশ প্রাইভেসি পলিসি ও নিরাপত্তা নীতিমালা' : 'Bangladesh Privacy Policy & Data Protection'}
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {language === 'bn' ? 'আইনসম্মত ও সুরক্ষিত' : 'Legal Compliance'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {language === 'bn' 
                  ? 'আইসিটি আইন ২০০৬, সাইবার নিরাপত্তা আইন ২০২৩ এবং বাংলাদেশ ব্যাংক নির্দেশিকা অনুযায়ী প্রস্তুতকৃত' 
                  : 'Formulated under Bangladesh ICT Act 2006, Cyber Security Act 2023 & Bangladesh Bank Guidelines'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">
          
          {/* Statutory Compliance Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 flex items-start gap-3 shadow-xs">
            <Scale className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-extrabold text-sm text-emerald-900 flex items-center gap-1.5">
                <span>{language === 'bn' ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের আইন ও নীতিমালা অনুসরণ' : 'Government of Bangladesh Statutory Framework'}</span>
              </h3>
              <p className="text-xs text-emerald-800 mt-1 leading-normal">
                {language === 'bn' 
                  ? 'YEANA প্ল্যাটফর্ম তথ্য ও যোগাযোগ প্রযুক্তি (সংশোধন) আইন ২০০৬, ডিজিটাল নিরাপত্তা আইন ২০১৮/সাইবার নিরাপত্তা আইন ২০২৩ এবং বিটিআরসি (BTRC) বিধিবিধানের পূর্ণ অনুগত। আমরা ব্যবহারকারীর ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করতে এবং যেকোনো সাইবার হুমকি থেকে আপনার অ্যাকাউন্টের সুরক্ষা দিতে প্রতিশ্রুতিবদ্ধ।'
                  : 'YEANA operates in strict adherence to the Information and Communication Technology (ICT) Act 2006 (Amended 2013), the Cyber Security Act 2023, and Bangladesh Telecommunication Regulatory Commission (BTRC) frameworks. We guarantee the confidentiality, integrity, and safety of all traveler records.'}
              </p>
            </div>
          </div>

          {/* Section 1: Information We Collect */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>1. {language === 'bn' ? 'আমরা যেসকল তথ্য সংগ্রহ ও প্রক্রিয়াকরণ করি' : 'Information We Collect & Process'}</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>{language === 'bn' ? 'ব্যবহারকারীর পরিচিতি ও বুকিং তথ্য:' : 'Traveler Profile & Booking Records:'}</strong>{' '}
                {language === 'bn' 
                  ? 'বাস, ট্রেন, লঞ্চ ও অভ্যন্তরীণ বিমানের আসন বুকিং এবং হোটেল সংরক্ষণের জন্য নাম, যোগাযোগ নম্বর (মোবাইল), ইমেইল ও লিঙ্গ তথ্য।' 
                  : 'Lead passenger name, verified mobile number, gender, and optional email for ticketing passes, hotel reservations, and emergency communication.'}
              </li>
              <li>
                <strong>{language === 'bn' ? 'ডিভাইসের ভৌগোলিক অবস্থান (GPS / লোকেশন):' : 'Geographic Location Data (GPS):'}</strong>{' '}
                {language === 'bn' 
                  ? 'আপনার বর্তমান অবস্থানের নিকটবর্তী দর্শনীয় স্থান, আন্তঃজেলা যাতায়াত রুট এবং সবচেয়ে কাছের জরুরি সেবা (পুলিশ, হাসপাতাল, অ্যাম্বুলেন্স) প্রদর্শন করতে লোকেশন ডাটা প্রয়োজন হয়। কোনো অবস্থাতেই ব্যবহারকারীর অনুমতি ছাড়া ব্যাকগ্রাউন্ড ট্র্যাকিং করা হয় না।' 
                  : 'Used solely to calculate travel distances, identify nearby attractions, display inter-district transit boarding points, and dispatch emergency support (Police, Hospital, Ambulance). We never track users in the background without explicit permission.'}
              </li>
              <li>
                <strong>{language === 'bn' ? 'ডিভাইস ও অফলাইন ক্যাশ তথ্য:' : 'Device & Offline Synchronized Data:'}</strong>{' '}
                {language === 'bn' 
                  ? 'ইন্টারনেট সংযোগবিহীন দুর্গম পার্বত্য বা হাওর অঞ্চলে যাতে অফলাইনে নোট ও ট্রিপ ব্যবহার করা যায় সেজন্য লোকাল স্টোরেজে তথ্য সংরক্ষিত থাকে।' 
                  : 'Local cache stored on device (IndexedDB/LocalStorage) ensuring travelers in cellular blackout areas (e.g. Sajek, Tanguar Haor) have instant offline access.'}
              </li>
            </ul>
          </div>

          {/* Section 2: Financial Transactions & Payment Security */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>2. {language === 'bn' ? 'ডিজিটাল পেমেন্ট ও লেনদেনের শতভাগ নিরাপত্তা' : 'Digital Financial Services & Payment Security'}</span>
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              {language === 'bn' 
                ? 'YEANA প্ল্যাটফর্মে কার্ড (Visa, Mastercard, AMEX), বিকাশ (bKash), নগদ (Nagad), ও রকেট (Rocket) এর মাধ্যমে পরিশোধিত প্রতিটি লেনদেন বাংলাদেশ ব্যাংক (Bangladesh Bank Payment Systems Department) অনুমোদিত পেমেন্ট গেটওয়ের মাধ্যমে পরিচালিত হয়।'
                : 'All transactions executed via Cards (Visa, Mastercard, AMEX), bKash, Nagad, or DBBL Rocket comply with Bangladesh Bank Payment Systems Department (PSD) regulatory guidelines.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-700">
              <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'bn' ? 'পিন বা সিভিভি (CVV) কখনোই সার্ভারে সংরক্ষিত হয় না' : 'PINs and CVVs are NEVER stored on our servers'}</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'bn' ? '২৫৬-বিট এসএসএল (SSL/TLS 1.3) ব্যাংক গ্রেড এনক্রিপশন' : '256-bit SSL/TLS 1.3 Bank-Grade Transport Security'}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Emergency Dispatch & Location Safety */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>3. {language === 'bn' ? 'জরুরি সেবা ও লোকেশন শেয়ারিং নীতি' : 'Emergency Services & Public Safety Coordination'}</span>
            </h3>
            <p className="text-slate-600">
              {language === 'bn'
                ? 'YEANA-এর "জরুরি সেবা" ফিচারে ব্যবহারকারী যেকোনো জেলার জাতীয় জরুরি সেবা ৯৯৯, ট্যুরিস্ট পুলিশ ২৪/৭ হটলাইন (+৮৮০ ১৩২০-২২২২২২), জেলা সদর হাসপাতাল এবং অ্যাম্বুলেন্স নম্বর সরাসরি দেখতে পান। ব্যবহারকারী এসওএস (SOS) মেসেজ পাঠালে তার লোকেশন শুধুমাত্র তার নির্বাচিত জরুরি নম্বরে প্রেরণ করা হয়।'
                : 'Through the "Emergency Service" module, users can instantly access Bangladesh National Emergency 999, Bangladesh Tourist Police (+880 1320-222222), District Sadar Hospitals, and 24/7 Ambulances. Location coordinates are shared strictly when triggered by the traveler.'}
            </p>
          </div>

          {/* Section 4: Data Sharing & Non-Disclosure */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              <span>4. {language === 'bn' ? 'তৃতীয় পক্ষের কাছে তথ্য গোপনীয়তা নিশ্চয়তা' : 'Zero Data Selling & Third-Party Disclosure'}</span>
            </h3>
            <p className="text-slate-600">
              {language === 'bn'
                ? 'আমরা কোনো বাণিজ্যিক বা বিজ্ঞাপনী ব্রোকারের কাছে ব্যবহারকারীর ব্যক্তিগত তথ্য বিক্রয় বা হস্তান্তর করি না। কেবল আইন প্রয়োগকারী সংস্থা বা আদালতের আনুষ্ঠানিক বৈধ আদেশ ব্যতীত কোনো তথ্য উন্মোচন করা হয় না।'
                : 'We do not sell, rent, or trade personal data with advertisers or data brokers. Disclosures are made strictly in compliance with lawful orders issued by the Courts or Cyber Tribunals of Bangladesh.'}
            </p>
          </div>

          {/* Section 5: User Rights & Account Deletion */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-amber-950">
            <h3 className="text-sm font-black flex items-center gap-2 text-amber-900">
              <FileText className="w-4 h-4 text-amber-700" />
              <span>5. {language === 'bn' ? 'ব্যবহারকারীর অধিকার ও স্থায়ীভাবে ডাটা মুছে ফেলার সুবিধা' : 'User Rights & Permanent Account Deletion'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              {language === 'bn'
                ? 'গুগল প্লে কনসোল পলিসি ও আন্তর্জাতিক জিডিপিআর মানদণ্ড অনুযায়ী, যেকোনো ব্যবহারকারী তাদের সংরক্ষিত ট্রিপ, বুকিং ইতিহাস বা সমগ্র অ্যাকাউন্ট সম্পূর্ণভাবে মুছে ফেলার অধিকার রাখেন। আপনি সরাসরি প্রোফাইল থেকে অথবা আমাদের হেল্পলাইনে ইমেইল করে ডাটা মোছার অনুরোধ করতে পারেন।'
                : 'In full alignment with Google Play Developer Policy on User Data Deletion and international privacy standards, you have the right to request permanent deletion of your account, booking records, and saved itineraries at any time.'}
            </p>
          </div>

          {/* Section 6: Official Bangladesh Registered Contact */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
              {language === 'bn' ? 'অফিসিয়াল যোগাযোগ ও অভিযোগ কর্মকর্তা (বাংলাদেশ অফিস)' : 'Official Registered Entity & Grievance Contact (Dhaka, Bangladesh)'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-mono">support@yeanatravel.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-mono font-bold">+880 1800-YEANA-BD</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-mono">https://yeanatravel.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Gulshan-1 / Motijheel, Dhaka-1212, Bangladesh</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{language === 'bn' ? 'সংস্করণ ১.০.০ (বাংলাদেশ সার্টিফাইড)' : 'YEANA v1.0.0 (Bangladesh Certified)'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md active:scale-95"
          >
            {language === 'bn' ? 'বুঝেছি ও সম্মত / বন্ধ করুন' : 'I Understand & Agree'}
          </button>
        </div>

      </div>
    </div>
  );
};
