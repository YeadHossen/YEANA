import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Sparkles, 
  Filter, 
  Heart, 
  Info, 
  X, 
  ShieldCheck, 
  Search, 
  Award, 
  Tag, 
  Store, 
  Compass, 
  CheckCircle, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Shirt,
  UtensilsCrossed,
  Palette,
  Leaf,
  MessageSquare
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { Shopping, District, LocalSpecialtyItem, SpecialtyCategory, TravelerChoicePayload } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { useChat } from '../context/ChatContext';

export const ShoppingView: React.FC = () => {
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { openTravelerChat } = useChat();
  
  // Data States
  const [shops, setShops] = useState<Shopping[]>([]);
  const [specialties, setSpecialties] = useState<LocalSpecialtyItem[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filter States
  const [viewMode, setViewMode] = useState<'exclusives' | 'bazaars'>('exclusives');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [giOnlyFilter, setGiOnlyFilter] = useState<boolean>(false);

  // Modal States
  const [selectedSpecialtyModal, setSelectedSpecialtyModal] = useState<LocalSpecialtyItem | null>(null);
  const [selectedShopModal, setSelectedShopModal] = useState<Shopping | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [s, spec, d] = await Promise.all([
          DataService.getShopping(),
          DataService.getExclusiveSpecialties(),
          DataService.getDistricts()
        ]);
        setShops(s);
        setSpecialties(spec);
        setDistricts(d);
      } catch (err) {
        console.error('Error loading shopping data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const specialtyCategories: { id: string; labelEn: string; labelBn: string; icon: any }[] = [
    { id: 'All', labelEn: 'All Specialties', labelBn: 'সকল অনন্য পণ্য', icon: Sparkles },
    { id: 'Dress & Handloom', labelEn: 'Dresses & Handlooms', labelBn: 'পোশাক ও তাঁতশিল্প', icon: Shirt },
    { id: 'Food & Sweet', labelEn: 'Foods & Sweets', labelBn: 'ঐতিহ্যবাহী খাবার ও মিষ্টি', icon: UtensilsCrossed },
    { id: 'Folk Craft & Souvenir', labelEn: 'Folk Crafts & Souvenirs', labelBn: 'হস্তশিল্প ও স্যুভনির', icon: Palette },
    { id: 'Natural Produce', labelEn: 'Natural Produce & Tea', labelBn: 'প্রাকৃতিক মধু, চা ও ফল', icon: Leaf },
  ];

  const bazaarCategories = [
    'All',
    'Handloom & Textiles',
    'Tribal Crafts',
    'Tea & Spices',
    'Seafood & Dry Fish',
    'Pottery & Brass'
  ];

  // Filter logic for Place-Exclusive Specialties
  const filteredSpecialties = specialties.filter(item => {
    const matchesDistrict = selectedDistrict === 'All' || item.district_id === selectedDistrict;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesGi = !giOnlyFilter || item.is_gi_tagged;
    
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) ||
      (item.name_bn && item.name_bn.toLowerCase().includes(query)) ||
      item.district_name.toLowerCase().includes(query) ||
      item.origin_story.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query));

    return matchesDistrict && matchesCategory && matchesGi && matchesSearch;
  });

  // Filter logic for Traditional Bazaars
  const filteredShops = shops.filter(shop => {
    const matchesDistrict = selectedDistrict === 'All' || shop.district_id === selectedDistrict;
    const matchesCategory = selectedCategory === 'All' || (shop.category && shop.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query ||
      shop.name.toLowerCase().includes(query) ||
      (shop.name_bn && shop.name_bn.toLowerCase().includes(query)) ||
      (shop.famous_for && shop.famous_for.toLowerCase().includes(query)) ||
      (shop.location && shop.location.toLowerCase().includes(query));

    return matchesDistrict && matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: SpecialtyCategory) => {
    switch (category) {
      case 'Dress & Handloom':
        return <Shirt className="w-3.5 h-3.5" />;
      case 'Food & Sweet':
        return <UtensilsCrossed className="w-3.5 h-3.5" />;
      case 'Folk Craft & Souvenir':
        return <Palette className="w-3.5 h-3.5" />;
      case 'Natural Produce':
        return <Leaf className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const getCategoryBadgeColor = (category: SpecialtyCategory) => {
    switch (category) {
      case 'Dress & Handloom':
        return 'bg-pink-100 text-pink-900 border-pink-200';
      case 'Food & Sweet':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'Folk Craft & Souvenir':
        return 'bg-purple-100 text-purple-900 border-purple-200';
      case 'Natural Produce':
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-900 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-20">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 border border-purple-800/40 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-black tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{t('shop.tagline')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans leading-tight">
            {language === 'bn' 
              ? 'স্থানভিত্তিক অনন্য পণ্য, ঐতিহ্যবাহী পোশাক ও খাবার'
              : 'Authentic Regional Delicacies, Handlooms & Crafts'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {language === 'bn'
              ? 'বাংলাদেশের প্রতিটি অঞ্চলের স্বকীয় ঐতিহ্যবাহী পোশাক (যেমন টাঙ্গাইলের তাঁত, জামদানি, সিল্ক), বিখ্যাত মিষ্টান্ন (বগুড়ার দই, চমচম, কাঁচাগোল্লা), পাহাড়ি কারুশিল্প ও জিআই সনদপ্রাপ্ত বিশেষ দুর্লভ পণ্যের অনন্য সম্ভার।'
              : 'Discover district-exclusive heritage treasures found only in their native places: authentic handloom sarees, legendary regional sweetmeats, tribal mountain crafts, and GI-certified specialties.'}
          </p>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
        <div className="absolute left-1/2 bottom-0 w-96 h-40 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
      </div>

      {/* Main View Mode Selector (Exclusives vs Traditional Bazaars) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200 w-full sm:w-auto">
          <button
            onClick={() => {
              setViewMode('exclusives');
              setSelectedCategory('All');
            }}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              viewMode === 'exclusives'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('shop.tab_exclusives')}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              viewMode === 'exclusives' ? 'bg-purple-800 text-purple-100' : 'bg-slate-200 text-slate-700'
            }`}>
              {specialties.length}
            </span>
          </button>

          <button
            onClick={() => {
              setViewMode('bazaars');
              setSelectedCategory('All');
            }}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              viewMode === 'bazaars'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>{t('shop.tab_bazaars')}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              viewMode === 'bazaars' ? 'bg-purple-800 text-purple-100' : 'bg-slate-200 text-slate-700'
            }`}>
              {shops.length}
            </span>
          </button>
        </div>

        {/* Quick GI Tag Toggle in Exclusives mode */}
        {viewMode === 'exclusives' && (
          <button
            onClick={() => setGiOnlyFilter(!giOnlyFilter)}
            className={`px-4 py-2 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 ${
              giOnlyFilter
                ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-200'
            }`}
          >
            <Award className={`w-4 h-4 ${giOnlyFilter ? 'text-white' : 'text-amber-500'}`} />
            <span>{language === 'bn' ? 'শুধুমাত্র জিআই (GI) সনদপ্রাপ্ত' : 'GI Certified Only'}</span>
            {giOnlyFilter && <CheckCircle className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Filter and Search Container */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-card space-y-5">
        
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              viewMode === 'exclusives'
                ? t('shop.search_placeholder')
                : (language === 'bn' ? 'মার্কেট বা হস্তশিল্পের দোকান খুঁজুন...' : 'Search artisan shops and bazaars...')
            }
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {viewMode === 'exclusives' ? (
              specialtyCategories.map(cat => {
                const IconComponent = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? cat.labelBn : cat.labelEn}</span>
                  </button>
                );
              })
            ) : (
              bazaarCategories.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === c
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  {c}
                </button>
              ))
            )}
          </div>
        </div>

        {/* District Selector & Result Counter */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600">
              {language === 'bn' ? 'জেলা অনুযায়ী ফিল্টার:' : 'Filter District:'}
            </span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="All">{language === 'bn' ? 'সব জেলা (All Districts)' : 'All Districts'}</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>
                  {language === 'bn' ? `${d.name_bn || d.name} (${d.division})` : `${d.name} (${d.division})`}
                </option>
              ))}
            </select>
          </div>

          <span className="text-xs text-slate-500 font-semibold">
            {viewMode === 'exclusives'
              ? `${language === 'bn' ? 'প্রদর্শিত হচ্ছে' : 'Showing'} ${filteredSpecialties.length} ${language === 'bn' ? 'টি স্থানভিত্তিক অনন্য পণ্য' : 'place-exclusive specialties'}`
              : `${language === 'bn' ? 'প্রদর্শিত হচ্ছে' : 'Showing'} ${filteredShops.length} ${language === 'bn' ? 'টি ঐতিহ্যবাহী মার্কেট' : 'artisan markets'}`}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. PLACE-EXCLUSIVE SPECIALTIES GRID                                        */}
      {/* ========================================================================= */}
      {viewMode === 'exclusives' && (
        <>
          {filteredSpecialties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpecialties.map(item => {
                const favorited = isFavorite('specialty', item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedSpecialtyModal(item)}
                    className="group bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer hover:border-purple-300"
                  >
                    {/* Media Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold backdrop-blur-md border shadow-xs flex items-center gap-1.5 ${getCategoryBadgeColor(item.category)}`}>
                          {getCategoryIcon(item.category)}
                          <span>{language === 'bn' && item.category_bn ? item.category_bn : item.category}</span>
                        </span>
                        
                        {item.is_gi_tagged && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-amber-500 text-white shadow-xs flex items-center gap-1">
                            <Award className="w-3 h-3 text-white" />
                            <span>GI Tagged {item.gi_tag_year ? `(${item.gi_tag_year})` : ''}</span>
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite('specialty', item.id, item);
                        }}
                        className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-transform active:scale-90 shadow-xs ${
                          favorited ? 'bg-rose-500 text-white' : 'bg-black/35 text-white hover:bg-black/50'
                        }`}
                        title="Save to Favorites"
                      >
                        <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
                      </button>

                      {/* Origin District Location Chip */}
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-purple-400" />
                          <span>{item.district_name} ({item.division})</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                          {language === 'bn' && item.name_bn ? item.name_bn : item.name}
                        </h3>

                        {/* Origin Story Summary Box */}
                        <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-slate-700 leading-relaxed">
                          <p className="font-extrabold text-purple-950 flex items-center gap-1 mb-1">
                            <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span>{language === 'bn' ? 'কেন এই স্থানের অনন্য:' : "Why It's Only Found Here:"}</span>
                          </p>
                          <p className="line-clamp-2 text-slate-600">
                            {language === 'bn' && item.origin_story_bn ? item.origin_story_bn : item.origin_story}
                          </p>
                        </div>

                        {/* Where to Buy Original Pill */}
                        <div className="text-xs text-slate-600 flex items-start gap-1.5 pt-1">
                          <Store className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">
                            <strong className="text-slate-800">{language === 'bn' ? 'আসল পাওয়ার স্থান:' : 'Authentic Spot:'}</strong> {language === 'bn' && item.best_market_or_spot_bn ? item.best_market_or_spot_bn : item.best_market_or_spot}
                          </span>
                        </div>
                      </div>

                      {/* Footer: Price Range & Details CTA */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            {language === 'bn' ? 'মূল্য সীমা' : 'Price Guide'}
                          </span>
                          <span className="text-xs font-black text-purple-900">
                            {item.price_range}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSpecialtyModal(item);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-purple-50 group-hover:bg-purple-600 group-hover:text-white text-purple-700 text-xs font-bold transition-all flex items-center gap-1"
                        >
                          <span>{language === 'bn' ? 'গাইড ও বিবরণ' : 'View Guide'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
              <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                {language === 'bn' ? 'এই ফিল্টারে কোনো স্থানভিত্তিক বিশেষ পণ্য পাওয়া যায়নি' : 'No place-exclusive specialties found for this filter'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'অনুসন্ধান বা জেলা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।' : 'Try resetting the search or district filter.'}
              </p>
            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* 2. TRADITIONAL BAZAARS & MARKETS GRID                                      */}
      {/* ========================================================================= */}
      {viewMode === 'bazaars' && (
        <>
          {filteredShops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShops.map(shop => {
                const favorited = isFavorite('shopping', shop.id);
                return (
                  <div
                    key={shop.id}
                    onClick={() => setSelectedShopModal(shop)}
                    className="group bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer hover:border-purple-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={shop.image_url}
                        alt={shop.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/90 backdrop-blur-md text-purple-900 shadow-xs">
                          {shop.category}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite('shopping', shop.id, shop);
                        }}
                        className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-transform active:scale-90 shadow-xs ${
                          favorited ? 'bg-rose-500 text-white' : 'bg-black/35 text-white hover:bg-black/50'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
                      </button>

                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-purple-400" />
                          {shop.location}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                          {language === 'bn' && shop.name_bn ? shop.name_bn : shop.name}
                        </h3>
                        
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{shop.opening_hours}</span>
                        </div>

                        <div className="mt-3 p-3 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-slate-700 leading-relaxed">
                          <p className="font-bold text-purple-950 flex items-center gap-1 mb-1">
                            <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Famous Specialties:
                          </p>
                          <p className="line-clamp-2">{shop.famous_for}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <span className="text-xs text-slate-500 truncate max-w-[160px]">
                          📍 {shop.address || shop.location}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedShopModal(shop);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-purple-50 group-hover:bg-purple-600 group-hover:text-white text-purple-700 text-xs font-bold transition-all flex items-center gap-1"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? 'মার্কেট বিবরণ' : 'View Details'}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                {language === 'bn' ? 'কোনো মার্কেট বা দোকান পাওয়া যায়নি' : 'No shopping areas found for this filter'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'জেলা বা ক্যাটাগরি ফিল্টার পরিবর্তন করুন।' : 'Try resetting the district filter.'}
              </p>
            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* 3. PLACE-EXCLUSIVE SPECIALTY DETAIL MODAL                                 */}
      {/* ========================================================================= */}
      {selectedSpecialtyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-extrabold uppercase border ${getCategoryBadgeColor(selectedSpecialtyModal.category)}`}>
                    {language === 'bn' && selectedSpecialtyModal.category_bn ? selectedSpecialtyModal.category_bn : selectedSpecialtyModal.category}
                  </span>
                  {selectedSpecialtyModal.is_gi_tagged && (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-amber-500 text-white flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>GI Certified Tag {selectedSpecialtyModal.gi_tag_year ? `(${selectedSpecialtyModal.gi_tag_year})` : ''}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  {language === 'bn' && selectedSpecialtyModal.name_bn ? selectedSpecialtyModal.name_bn : selectedSpecialtyModal.name}
                </h3>
                
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  <span className="font-bold text-slate-700">{selectedSpecialtyModal.district_name}, {selectedSpecialtyModal.division} Division</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedSpecialtyModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Image */}
            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 relative">
              <img
                src={selectedSpecialtyModal.image_url}
                alt={selectedSpecialtyModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3">
                <span className="px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-white text-xs font-black shadow-lg">
                  {t('shop.price_estimate')} {selectedSpecialtyModal.price_range}
                </span>
              </div>
            </div>

            {/* 1. Origin & Cultural Uniqueness Story */}
            <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2 text-xs">
              <span className="font-black text-purple-950 flex items-center gap-1.5 text-sm">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span>{language === 'bn' ? 'কেন এটি এই স্থানের অনন্য ঐতিহ্য:' : 'Why It Is Uniquely Found Here:'}</span>
              </span>
              <p className="text-slate-700 leading-relaxed font-medium text-xs sm:text-sm">
                {language === 'bn' && selectedSpecialtyModal.origin_story_bn ? selectedSpecialtyModal.origin_story_bn : selectedSpecialtyModal.origin_story}
              </p>
            </div>

            {/* 2. Authenticity & Buyer Checklist */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2 text-xs">
              <span className="font-black text-emerald-950 flex items-center gap-1.5 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'bn' ? 'আসল চেনার উপায় ও পরামর্শ (Authenticity Guide):' : 'Authenticity Guide & Buyer Tip:'}</span>
              </span>
              <p className="text-emerald-900 leading-relaxed font-medium text-xs sm:text-sm">
                {language === 'bn' && selectedSpecialtyModal.authenticity_tip_bn ? selectedSpecialtyModal.authenticity_tip_bn : selectedSpecialtyModal.authenticity_tip}
              </p>
            </div>

            {/* 3. Where to buy authentic original */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-bold flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-purple-600" />
                  <span>{language === 'bn' ? 'আসল পণ্য পাওয়ার হাট/স্থান:' : 'Authentic Market / Artisan Hub:'}</span>
                </span>
                <p className="text-slate-800 font-extrabold text-xs">
                  {language === 'bn' && selectedSpecialtyModal.best_market_or_spot_bn ? selectedSpecialtyModal.best_market_or_spot_bn : selectedSpecialtyModal.best_market_or_spot}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  <span>{language === 'bn' ? 'সেরা সময় / সিজন:' : 'Seasonality & Availability:'}</span>
                </span>
                <p className="text-slate-800 font-extrabold text-xs">
                  {selectedSpecialtyModal.seasonality || 'Year-round'}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    toggleFavorite('specialty', selectedSpecialtyModal.id, selectedSpecialtyModal);
                  }}
                  className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 ${
                    isFavorite('specialty', selectedSpecialtyModal.id)
                      ? 'bg-rose-50 border-rose-200 text-rose-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite('specialty', selectedSpecialtyModal.id) ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>
                    {isFavorite('specialty', selectedSpecialtyModal.id)
                      ? (language === 'bn' ? 'সংরক্ষিত' : 'Saved')
                      : (language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Item')}
                  </span>
                </button>

                <button
                  onClick={() => {
                    const choices: TravelerChoicePayload = {
                      destination: `${selectedSpecialtyModal.district_name} (${selectedSpecialtyModal.division})`,
                      district_name: selectedSpecialtyModal.district_name,
                      selected_specialties: [selectedSpecialtyModal],
                      special_notes: `Traveler requested original ${selectedSpecialtyModal.name} (${selectedSpecialtyModal.price_range}) directly sourced from ${selectedSpecialtyModal.best_market_or_spot}`
                    };
                    setSelectedSpecialtyModal(null);
                    openTravelerChat(choices, `Sourcing Request: ${selectedSpecialtyModal.name}`, 'specialty_order');
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  title="Ask Admin to verify and source authentic item"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{language === 'bn' ? 'অ্যাডমিনকে সংগ্রহের জন্য বলুন' : 'Ask Admin to Source'}</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedSpecialtyModal(null)}
                className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black transition-all"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TRADITIONAL SHOP DETAIL MODAL                                          */}
      {/* ========================================================================= */}
      {selectedShopModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-900 text-xs font-extrabold uppercase">
                  {selectedShopModal.category}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {language === 'bn' && selectedShopModal.name_bn ? selectedShopModal.name_bn : selectedShopModal.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  <span>{selectedShopModal.address || selectedShopModal.location}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedShopModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={selectedShopModal.image_url}
                alt={selectedShopModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2 text-xs">
              <span className="font-extrabold text-purple-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Specialty Craft & Handloom:</span>
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {selectedShopModal.famous_for}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-bold">Opening Hours:</span>
                <div className="flex items-center gap-1 text-slate-800 font-bold text-xs mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  <span>{selectedShopModal.opening_hours || '9:00 AM - 9:00 PM'}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-bold">Shopping Tip:</span>
                <div className="flex items-center gap-1 text-emerald-800 font-bold text-xs mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct Artisan Handcraft</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedShopModal(null)}
                className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black transition-all shadow-elevated"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
