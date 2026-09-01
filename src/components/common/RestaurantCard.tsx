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
    <div className="group glass-card rounded-3xl border border-slate-200/80 shadow-glass hover:shadow-glass-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden bg-white/90">
      
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80';
          }}
        />

        {/* Cuisine & Price Tier Tag */}
        <div className="absolute top-3.5 left-3.5 flex gap-1.5 z-10">
          <span className="px-3 py-1 rounded-xl text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-900 shadow-sm border border-white/40">
            {restaurant.cuisine}
          </span>
          <span className="px-2.5 py-1 rounded-xl text-[11px] font-black bg-slate-950/85 backdrop-blur-md text-emerald-400 border border-white/15 shadow-sm font-mono">
            {restaurant.price_tier}
          </span>
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite('restaurant', restaurant.id, restaurant);
          }}
          className={`absolute top-3.5 right-3.5 p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 shadow-md z-10 ${
            favorited 
              ? 'bg-rose-500 text-white ring-2 ring-rose-300' 
              : 'bg-black/40 hover:bg-black/60 text-white border border-white/20'
          }`}
          title={favorited ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
        </button>

        {/* Location */}
        <div className="absolute bottom-3.5 left-3.5 z-10">
          <span className="px-3 py-1 rounded-xl bg-slate-950/75 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5 border border-white/10 shadow-md">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            {restaurant.district_name || restaurant.location.split(',')[0]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onSelect(restaurant)}
              className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1 font-heading"
            >
              {language === 'bn' && restaurant.name_bn ? restaurant.name_bn : restaurant.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 bg-amber-50/90 px-2.5 py-1 rounded-xl border border-amber-200/60 shrink-0 shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-black text-amber-900">{restaurant.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{restaurant.opening_hours}</span>
          </div>

          {/* Menu highlight pills */}
          {restaurant.menu_highlights && restaurant.menu_highlights.length > 0 && (
            <div className="mt-3 space-y-1">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Popular Delicacies:</p>
              <div className="flex flex-wrap gap-1">
                {restaurant.menu_highlights.slice(0, 2).map((item, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 text-[10px] font-bold border border-amber-200/60 truncate max-w-full">
                    • {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-3.5 border-t border-slate-100/90 flex items-center justify-between gap-2">
          <a
            href={`tel:${restaurant.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100/80 hover:bg-slate-200 text-slate-700 border border-slate-200/60 transition-colors flex items-center gap-1 text-xs font-bold"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">{t('common.call')}</span>
          </a>

          <button
            onClick={() => onSelect(restaurant)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black transition-all shadow-sm hover:shadow-glow-emerald"
          >
            {t('common.view_details')}
          </button>
        </div>

      </div>

    </div>
  );
};
