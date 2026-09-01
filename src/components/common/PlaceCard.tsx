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
    <div className="group glass-card rounded-3xl border border-slate-200/80 shadow-glass hover:shadow-glass-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden bg-white/90">
      
      {/* Thumbnail & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={place.image_url}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&auto=format&fit=crop&q=80';
          }}
        />
        
        {/* Top Floating Glass Badges */}
        <div className="absolute top-3.5 left-3.5 flex gap-2 flex-wrap z-10">
          <span className={`px-3 py-1 rounded-xl text-[11px] font-bold border backdrop-blur-md shadow-xs ${getCategoryColor(place.category)}`}>
            {place.category}
          </span>
          {place.is_featured && (
            <span className="px-3 py-1 rounded-xl text-[11px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
              ★ Top Pick
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite('place', place.id, place);
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

        {/* District Tag */}
        <div className="absolute bottom-3.5 left-3.5">
          <span className="px-3 py-1 rounded-xl bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5 border border-white/10 shadow-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            {place.district_name || place.location.split(',')[1]?.trim() || place.district_id}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onSelect(place)}
              className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1 font-heading"
            >
              {language === 'bn' && place.name_bn ? place.name_bn : place.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1 bg-amber-50/90 px-2.5 py-1 rounded-xl border border-amber-200/60 shrink-0 shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-black text-amber-900">{place.rating}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed font-sans">
            {place.short_description}
          </p>
        </div>

        {/* Location & Actions */}
        <div className="pt-3.5 border-t border-slate-100/90 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{place.location}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onAddToTrip && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToTrip(place);
                }}
                className="p-2 rounded-xl bg-slate-100/80 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 border border-slate-200/60 transition-colors"
                title="Add to Trip Itinerary"
              >
                <CalendarPlus className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onSelect(place)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black transition-all flex items-center gap-1 shadow-sm hover:shadow-glow-emerald"
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
