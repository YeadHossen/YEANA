import React from 'react';
import { 
  Star, 
  MapPin, 
  Heart, 
  Phone, 
  Waves, 
  Coffee, 
  Wind, 
  Wifi, 
  Mountain, 
  Building2, 
  Info,
  ArrowRight,
  Sparkles,
  Dumbbell
} from 'lucide-react';
import { Hotel } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';

interface HotelCardProps {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
  onInquire?: (hotel: Hotel) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelect, onInquire }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { language, t } = useLanguage();
  const favorited = isFavorite('hotel', hotel.id);

  const starCount = hotel.star_category || (hotel.price_per_night > 12000 ? 5 : hotel.price_per_night > 5000 ? 4 : hotel.price_per_night > 2000 ? 3 : 2);
  const isResort = hotel.property_category?.includes('Resort') || hotel.name.toLowerCase().includes('resort');

  return (
    <div 
      onClick={() => onSelect(hotel)}
      className="group glass-card rounded-3xl border border-slate-200/80 shadow-glass hover:shadow-glass-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden relative cursor-pointer bg-white/90"
    >
      
      {/* Photo & Top Tags */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={hotel.image_url}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85';
          }}
        />

        {/* Price Tag Overlay */}
        <div className="absolute top-3.5 left-3.5 bg-slate-950/85 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl text-xs font-black shadow-lg border border-white/15 flex items-center gap-1.5 z-10">
          <span className="text-emerald-400 font-mono text-sm font-black">৳{hotel.price_per_night.toLocaleString()}</span>
          <span className="font-medium text-[10px] text-slate-300">/ night</span>
        </div>

        {/* Top Right Action & Photo Count */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
          <span className="bg-slate-950/80 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-[10px] font-black border border-white/20 shadow-md flex items-center gap-1">
            📸 {(hotel.gallery && hotel.gallery.length > 0 ? hotel.gallery.length : 4)} Photos
          </span>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite('hotel', hotel.id, hotel);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 shadow-md ${
              favorited 
                ? 'bg-rose-500 text-white ring-2 ring-rose-300' 
                : 'bg-black/40 hover:bg-black/60 text-white border border-white/20'
            }`}
            title={favorited ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Star Rating & Category Badges */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
          <span className="px-3 py-1 rounded-xl bg-slate-950/75 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5 truncate max-w-[70%] border border-white/10 shadow-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{hotel.upazila_name ? `${hotel.upazila_name}, ${hotel.district_name}` : hotel.district_name || hotel.location}</span>
          </span>

          <div className="flex items-center gap-1 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-xl text-[11px] font-black shadow-md shrink-0">
            <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
            <span>{starCount}-Star</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-lg ${
                  isResort 
                    ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                    : starCount >= 4 
                    ? 'bg-purple-100 text-purple-900 border border-purple-200'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}>
                  {hotel.property_category || `${starCount}-Star Stay`}
                </span>
                {hotel.upazila_name_bn && (
                  <span className="text-[10px] text-slate-400 font-bold">
                    ({hotel.upazila_name_bn})
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 font-heading">
                {language === 'bn' && hotel.name_bn ? hotel.name_bn : hotel.name}
              </h3>
            </div>

            {/* User Rating Score */}
            <div className="flex items-center gap-1 bg-emerald-50/90 px-2.5 py-1 rounded-xl border border-emerald-200/60 shrink-0 shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
              <span className="text-xs font-black text-emerald-950">{hotel.rating}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 line-clamp-1 mt-1 font-medium">
            {hotel.address || hotel.location}
          </p>

          {/* Amenities Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hotel.has_swimming_pool && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 text-[10px] font-bold border border-sky-100">
                <Waves className="w-3 h-3 text-sky-600" /> Pool
              </span>
            )}
            {hotel.has_breakfast && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-100">
                <Coffee className="w-3 h-3 text-amber-600" /> Breakfast
              </span>
            )}
            {hotel.has_ac && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">
                <Wind className="w-3 h-3 text-emerald-600" /> AC
              </span>
            )}
            {hotel.has_wifi && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">
                <Wifi className="w-3 h-3 text-indigo-600" /> WiFi
              </span>
            )}
            {(hotel.has_hill_view || hotel.has_sea_view) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-100">
                <Mountain className="w-3 h-3 text-teal-600" /> {hotel.has_sea_view ? 'Sea View' : 'Hill View'}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Actions with Explicit "View Details & Book" Button */}
        <div className="pt-3.5 border-t border-slate-100/90 flex items-center justify-between gap-2">
          <a
            href={`tel:${hotel.contact_phone}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100/80 hover:bg-slate-200 text-slate-700 border border-slate-200/60 transition-colors flex items-center gap-1.5 text-xs font-bold"
            title="Call hotel reception desk"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Call Desk</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(hotel);
              }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black transition-all shadow-sm hover:shadow-glow-emerald flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5 text-emerald-200" />
              <span>View Details & Book</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
