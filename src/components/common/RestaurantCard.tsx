import React from 'react';
import { Star, MapPin, Heart, UtensilsCrossed, Phone, Clock } from 'lucide-react';
import { Restaurant } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onSelect }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { language, t } = useLanguage();
  const favorited = isFavorite('restaurant', restaurant.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Cuisine & Price Tier Tag */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
            {restaurant.cuisine}
          </span>
          <span className="px-2 py-1 rounded-lg text-[11px] font-extrabold bg-brand-800 text-white shadow-xs">
            {restaurant.price_tier}
          </span>
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite('restaurant', restaurant.id, restaurant);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
            favorited 
              ? 'bg-rose-500 text-white shadow-md' 
              : 'bg-black/30 hover:bg-black/50 text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
        </button>

        {/* Location */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-brand-300" />
            {restaurant.district_name || restaurant.location.split(',')[0]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onSelect(restaurant)}
              className="text-base font-bold text-slate-900 group-hover:text-brand-700 transition-colors cursor-pointer line-clamp-1"
            >
              {language === 'bn' && restaurant.name_bn ? restaurant.name_bn : restaurant.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-900">{restaurant.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{restaurant.opening_hours}</span>
          </div>

          {/* Menu highlight pills */}
          {restaurant.menu_highlights && restaurant.menu_highlights.length > 0 && (
            <div className="mt-2.5 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Popular Delicacies:</p>
              <div className="flex flex-wrap gap-1">
                {restaurant.menu_highlights.slice(0, 2).map((item, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-brand-50 text-brand-800 text-[10px] font-medium truncate max-w-full">
                    • {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <a
            href={`tel:${restaurant.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <Phone className="w-3.5 h-3.5 text-brand-600" />
            <span className="hidden sm:inline">{t('common.call')}</span>
          </a>

          <button
            onClick={() => onSelect(restaurant)}
            className="px-3.5 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-600 hover:text-white text-brand-700 text-xs font-bold transition-all"
          >
            {t('common.view_details')}
          </button>
        </div>

      </div>

    </div>
  );
};
