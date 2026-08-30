import React from 'react';
import { Star, MapPin, Heart, Wifi, Wind, Car, Utensils, Phone, CheckCircle2 } from 'lucide-react';
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

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Photo & Top Tags */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={hotel.image_url}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Price Tag Overlay */}
        <div className="absolute top-3 left-3 bg-brand-900/90 backdrop-blur-md text-white px-3 py-1 rounded-xl text-xs font-extrabold shadow-md border border-brand-700/50">
          ৳{hotel.price_per_night.toLocaleString()} <span className="font-normal text-[10px] text-slate-300">{t('common.per_night')}</span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite('hotel', hotel.id, hotel);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
            favorited 
              ? 'bg-rose-500 text-white shadow-md' 
              : 'bg-black/30 hover:bg-black/50 text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
        </button>

        {/* District */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-brand-300" />
            {hotel.district_name || hotel.location.split(',')[0]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onSelect(hotel)}
              className="text-base font-bold text-slate-900 group-hover:text-brand-700 transition-colors cursor-pointer line-clamp-1"
            >
              {language === 'bn' && hotel.name_bn ? hotel.name_bn : hotel.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-900">{hotel.rating}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 line-clamp-1 mt-1">
            {hotel.address || hotel.location}
          </p>

          {/* Amenities Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hotel.has_wifi && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                <Wifi className="w-3 h-3 text-brand-600" /> WiFi
              </span>
            )}
            {hotel.has_ac && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                <Wind className="w-3 h-3 text-sky-600" /> AC
              </span>
            )}
            {hotel.has_parking && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                <Car className="w-3 h-3 text-emerald-600" /> Parking
              </span>
            )}
            {hotel.has_restaurant && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                <Utensils className="w-3 h-3 text-amber-600" /> Dining
              </span>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <a
            href={`tel:${hotel.contact_phone}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 text-xs font-semibold"
            title="Call hotel front desk"
          >
            <Phone className="w-3.5 h-3.5 text-brand-600" />
            <span className="hidden sm:inline">Call</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(hotel)}
              className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              {t('common.view_details')}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
