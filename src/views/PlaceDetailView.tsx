import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Star, 
  CalendarPlus, 
  Clock, 
  Ticket, 
  Sun, 
  Navigation, 
  Hotel as HotelIcon, 
  Utensils, 
  MessageSquare, 
  Send, 
  Share2,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { Place, Hotel, Restaurant, Review } from '../types';
import { DataService } from '../services/dataService';
import { MapView } from '../components/common/MapView';
import { HotelCard } from '../components/common/HotelCard';
import { RestaurantCard } from '../components/common/RestaurantCard';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface PlaceDetailViewProps {
  place: Place;
  onBack: () => void;
  onSelectHotel: (hotel: Hotel) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onAddToTrip: (place: Place) => void;
}

export const PlaceDetailView: React.FC<PlaceDetailViewProps> = ({
  place,
  onBack,
  onSelectHotel,
  onSelectRestaurant,
  onAddToTrip
}) => {
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  
  const favorited = isFavorite('place', place.id);
  const [activePhoto, setActivePhoto] = useState<string>(place.image_url);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [nearbyHotels, setNearbyHotels] = useState<Hotel[]>([]);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<Restaurant[]>([]);
  
  // New review form state
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [reviewSuccess, setReviewSuccess] = useState<boolean>(false);

  const gallery = [place.image_url, ...(place.gallery || [])].filter((v, i, a) => a.indexOf(v) === i);

  useEffect(() => {
    async function loadData() {
      const [revs, hList, rList] = await Promise.all([
        DataService.getReviews('place', place.id),
        DataService.getHotels(),
        DataService.getRestaurants()
      ]);
      setReviews(revs);
      setNearbyHotels(hList.filter(h => h.district_id === place.district_id).slice(0, 2));
      setNearbyRestaurants(rList.filter(r => r.district_id === place.district_id).slice(0, 2));
    }
    loadData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [place]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added = await DataService.addReview({
      user_name: user?.full_name || 'Traveler Explorer',
      user_avatar: user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      target_type: 'place',
      target_id: place.id,
      rating: newRating,
      comment: newComment
    });

    setReviews(prev => [added, ...prev]);
    setNewComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${place.name} — YEANA Travel`,
        text: place.short_description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 pb-20 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-brand-700 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-2xs hover:bg-slate-50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Places</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold shadow-2xs"
            title="Share Destination"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavorite('place', place.id, place)}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
              favorited 
                ? 'bg-rose-50 border-rose-200 text-rose-600' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span className="hidden sm:inline">{favorited ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery on left, Details on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Photo */}
          <div className="relative aspect-[16/11] rounded-3xl overflow-hidden bg-slate-100 shadow-card border border-slate-200">
            <img
              src={activePhoto}
              alt={place.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-brand-900/80 backdrop-blur-md text-white border border-brand-700/50 shadow-md">
                {place.category}
              </span>
            </div>
          </div>

          {/* Thumbnail Selector */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {gallery.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(photo)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                    activePhoto === photo ? 'border-brand-600 ring-2 ring-brand-500/30 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Action Floating Bar for Mobile/Desktop */}
          <div className="p-4 rounded-2xl bg-brand-50/80 border border-brand-200/80 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold text-brand-950">Add {place.name} to Trip Plan</p>
              <p className="text-[11px] text-brand-700">Organize Day 1, 2 or 3 itinerary with budget estimator</p>
            </div>
            <button
              onClick={() => onAddToTrip(place)}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-700/20 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>{t('common.add_to_trip')}</span>
            </button>
          </div>

        </div>

        {/* Right Column: Key Details & Specs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{place.location}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-sans leading-tight">
              {language === 'bn' && place.name_bn ? place.name_bn : place.name}
            </h1>
            
            {/* Rating Bar */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-black text-amber-900">{place.rating}</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                ({place.reviews_count || reviews.length} verified traveler reviews)
              </span>
            </div>
          </div>

          {/* Quick Specs Cards */}
          <div className="grid grid-cols-2 gap-3">
            
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-brand-700 text-[11px] font-bold">
                <Ticket className="w-4 h-4 text-brand-600" />
                <span>{t('common.entry_fee')}</span>
              </div>
              <p className="text-xs font-semibold text-slate-800">{place.entry_fee || 'Free'}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-sky-700 text-[11px] font-bold">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>{t('common.opening_time')}</span>
              </div>
              <p className="text-xs font-semibold text-slate-800">{place.opening_time || 'Open 24/7'}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1 col-span-2">
              <div className="flex items-center gap-1.5 text-amber-700 text-[11px] font-bold">
                <Sun className="w-4 h-4 text-amber-600" />
                <span>{t('common.best_time')}</span>
              </div>
              <p className="text-xs font-semibold text-slate-800">{place.best_time || 'October to March'}</p>
            </div>

          </div>

          {/* How to Reach Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Navigation className="w-4 h-4 text-brand-600" />
              <span>{t('common.how_to_reach')}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {place.how_to_reach || 'Regular bus, train and domestic flights available from Dhaka and Chattogram.'}
            </p>
          </div>

          {/* Google Directions Button */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Navigation className="w-4 h-4 text-brand-400" />
            <span>Open in Google Maps Directions</span>
          </a>

        </div>

      </div>

      {/* Description & Overview */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-sans">
          About {place.name}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
          {place.full_description || place.short_description}
        </p>
      </section>

      {/* Interactive Location Map */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 font-sans flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-600" />
            <span>Exact Location & Surroundings</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {place.lat.toFixed(4)}° N, {place.lng.toFixed(4)}° E
          </span>
        </div>

        <MapView
          center={[place.lat, place.lng]}
          zoom={13}
          markers={[{
            id: place.id,
            title: place.name,
            lat: place.lat,
            lng: place.lng,
            category: place.category,
            description: place.short_description
          }]}
          className="h-80 w-full rounded-2xl overflow-hidden"
        />
      </section>

      {/* Nearby Hotels in this District */}
      {nearbyHotels.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 font-sans flex items-center gap-2">
              <HotelIcon className="w-5 h-5 text-sky-600" />
              <span>Recommended Nearby Hotels & Resorts</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {nearbyHotels.map(hotel => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onSelect={onSelectHotel}
              />
            ))}
          </div>
        </section>
      )}

      {/* Nearby Restaurants in this District */}
      {nearbyRestaurants.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 font-sans flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-600" />
              <span>Nearby Food & Traditional Dining</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {nearbyRestaurants.map(rest => (
              <RestaurantCard
                key={rest.id}
                restaurant={rest}
                onSelect={onSelectRestaurant}
              />
            ))}
          </div>
        </section>
      )}

      {/* Reviews Section & Review Submission */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-8">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-sans flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-600" />
              <span>Traveler Reviews & Tips</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Read experiences from fellow explorers who visited this place.</p>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-black text-amber-900">{place.rating} / 5</span>
          </div>
        </div>

        {/* Submit Review Form */}
        <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <p className="text-xs font-bold text-slate-800">Write a Review or Travel Tip</p>
          
          {reviewSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Your review has been posted.</span>
            </div>
          )}

          {/* Star selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Your Rating:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your travel advice (e.g. 'Best boat price is ৳600 from ghat 2, visit during early morning for fog...')"
            className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            rows={3}
            required
          />

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Review</span>
          </button>
        </form>

        {/* Existing Reviews List */}
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map(rev => (
              <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={rev.user_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{rev.user_name}</p>
                      <p className="text-[10px] text-slate-400">{new Date(rev.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    {'⭐'.repeat(rev.rating)}
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-10">
                  {rev.comment}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs text-slate-400">
              No reviews written yet. Be the first to share your experience!
            </div>
          )}
        </div>

      </section>

    </div>
  );
};
