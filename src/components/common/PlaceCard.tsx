import React from 'react';
import { Star, MapPin, Heart, CalendarPlus, ArrowRight } from 'lucide-react';
import { Place } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';

interface PlaceCardProps {
  place: Place;
  onSelect: (place: Place) => void;
  onAddToTrip?: (place: Place) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onSelect, onAddToTrip }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { language, t } = useLanguage();
  const favorited = isFavorite('place', place.id);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Hill': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Beach': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Forest': return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Waterfall': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Heritage': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Tea Garden': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-brand-50 text-brand-700 border-brand-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Thumbnail & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={place.image_url}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border backdrop-blur-md shadow-xs ${getCategoryColor(place.category)}`}>
            {place.category}
          </span>
          {place.is_featured && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500 text-white shadow-xs">
              ★ Featured
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite('place', place.id, place);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
            favorited 
              ? 'bg-rose-500 text-white shadow-md' 
              : 'bg-black/30 hover:bg-black/50 text-white'
          }`}
          title={favorited ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
        </button>

        {/* District Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-brand-300" />
            {place.district_name || place.location.split(',')[1]?.trim() || place.district_id}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onSelect(place)}
              className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors cursor-pointer line-clamp-1"
            >
              {language === 'bn' && place.name_bn ? place.name_bn : place.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-900">{place.rating}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {place.short_description}
          </p>
        </div>

        {/* Location & Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{place.location}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onAddToTrip && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToTrip(place);
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 transition-colors"
                title="Add to Trip Itinerary"
              >
                <CalendarPlus className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onSelect(place)}
              className="px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-600 hover:text-white text-brand-700 text-xs font-bold transition-all flex items-center gap-1"
            >
              <span>{t('common.view_details')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
