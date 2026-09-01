import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  District, 
  Place, 
  Hotel, 
  Restaurant, 
  TransportRoute, 
  ShoppingPlace, 
  Ride, 
  Review,
  Trip,
  LocalSpecialtyItem,
  TravelerInquiry,
  ChatMessage,
  InquiryCategory,
  InquiryStatus,
  TravelerChoicePayload
} from '../types';
import { 
  INITIAL_DISTRICTS, 
  INITIAL_PLACES, 
  INITIAL_HOTELS, 
  INITIAL_RESTAURANTS, 
  INITIAL_TRANSPORTS, 
  INITIAL_SHOPPING, 
  INITIAL_RIDES, 
  SAMPLE_TRIP 
} from '../data/seedData';
import { EXCLUSIVE_SPECIALTIES } from '../data/exclusiveSpecialtiesData';
import { INITIAL_INQUIRIES } from '../data/seedInquiriesData';
import { getAllAccommodations } from './hotelService';

// LocalStorage Keys for persistent offline/mock mode
const STORAGE_KEYS = {
  DISTRICTS: 'yeana_districts',
  PLACES: 'yeana_places',
  HOTELS: 'yeana_hotels',
  RESTAURANTS: 'yeana_restaurants',
  TRANSPORTS: 'yeana_transports',
  SHOPPING: 'yeana_shopping',
  SPECIALTIES: 'yeana_specialties',
  RIDES: 'yeana_rides',
  TRIPS: 'yeana_trips',
  REVIEWS: 'yeana_reviews',
  INQUIRIES: 'yeana_inquiries'
};

// Initialize LocalStorage with seed data and auto-upgrade if new districts/places added
function initializeLocalStorage() {
  try {
    const savedDistricts = localStorage.getItem(STORAGE_KEYS.DISTRICTS);
    if (!savedDistricts || JSON.parse(savedDistricts).length < INITIAL_DISTRICTS.length) {
      localStorage.setItem(STORAGE_KEYS.DISTRICTS, JSON.stringify(INITIAL_DISTRICTS));
    }

    const savedPlaces = localStorage.getItem(STORAGE_KEYS.PLACES);
    if (!savedPlaces || JSON.parse(savedPlaces).length < INITIAL_PLACES.length) {
      localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(INITIAL_PLACES));
    }

    const savedHotels = localStorage.getItem(STORAGE_KEYS.HOTELS);
    if (!savedHotels || JSON.parse(savedHotels).length < INITIAL_HOTELS.length) {
      localStorage.setItem(STORAGE_KEYS.HOTELS, JSON.stringify(INITIAL_HOTELS));
    }

    const savedRestaurants = localStorage.getItem(STORAGE_KEYS.RESTAURANTS);
    if (!savedRestaurants || JSON.parse(savedRestaurants).length < INITIAL_RESTAURANTS.length) {
      localStorage.setItem(STORAGE_KEYS.RESTAURANTS, JSON.stringify(INITIAL_RESTAURANTS));
    }

    const savedTransports = localStorage.getItem(STORAGE_KEYS.TRANSPORTS);
    if (!savedTransports || JSON.parse(savedTransports).length < INITIAL_TRANSPORTS.length) {
      localStorage.setItem(STORAGE_KEYS.TRANSPORTS, JSON.stringify(INITIAL_TRANSPORTS));
    }

    const savedShopping = localStorage.getItem(STORAGE_KEYS.SHOPPING);
    if (!savedShopping || JSON.parse(savedShopping).length < INITIAL_SHOPPING.length) {
      localStorage.setItem(STORAGE_KEYS.SHOPPING, JSON.stringify(INITIAL_SHOPPING));
    }

    const savedSpecialties = localStorage.getItem(STORAGE_KEYS.SPECIALTIES);
    if (!savedSpecialties || JSON.parse(savedSpecialties).length < EXCLUSIVE_SPECIALTIES.length) {
      localStorage.setItem(STORAGE_KEYS.SPECIALTIES, JSON.stringify(EXCLUSIVE_SPECIALTIES));
    }

    const savedInquiries = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!savedInquiries || JSON.parse(savedInquiries).length < INITIAL_INQUIRIES.length) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
    }

    const savedRides = localStorage.getItem(STORAGE_KEYS.RIDES);
    if (!savedRides || JSON.parse(savedRides).length < INITIAL_RIDES.length) {
      localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(INITIAL_RIDES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TRIPS)) {
      localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify([SAMPLE_TRIP]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify([]));
    }
  } catch (err) {
    console.error('Error in initializeLocalStorage:', err);
  }
}

// Ensure storage initialized on client load
if (typeof window !== 'undefined') {
  initializeLocalStorage();
}

function getLocal<T>(key: string, fallback: T[]): T[] {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error('Error reading localStorage key:', key, err);
    return fallback;
  }
}

function setLocal<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Error writing to localStorage key:', key, err);
  }
}

// Helper to query local backend REST API with timeout & fallback
async function fetchApi<T>(path: string, options?: RequestInit): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(path, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      return (await res.json()) as T;
    }
  } catch (e) {
    // API backend server is optional/offline, gracefully fall back
  }
  return null;
}

export const DataService = {
  // Districts
  async getDistricts(): Promise<District[]> {
    const apiData = await fetchApi<District[]>('/api/districts');
    if (apiData && apiData.length > 0) {
      setLocal(STORAGE_KEYS.DISTRICTS, apiData);
      return apiData;
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('districts').select('*');
      if (!error && data && data.length > 0) return data as District[];
    }
    return getLocal<District>(STORAGE_KEYS.DISTRICTS, INITIAL_DISTRICTS);
  },

  // Places
  async getPlaces(): Promise<Place[]> {
    const apiData = await fetchApi<Place[]>('/api/places');
    if (apiData && apiData.length > 0) {
      setLocal(STORAGE_KEYS.PLACES, apiData);
      return apiData;
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('places').select('*');
      if (!error && data && data.length > 0) return data as Place[];
    }
    return getLocal<Place>(STORAGE_KEYS.PLACES, INITIAL_PLACES);
  },

  async getPlaceById(id: string): Promise<Place | null> {
    const apiPlace = await fetchApi<Place>(`/api/places/${id}`);
    if (apiPlace) return apiPlace;

    const places = await this.getPlaces();
    return places.find(p => p.id === id) || null;
  },

  async savePlace(place: Place): Promise<Place> {
    const apiPlace = await fetchApi<Place>('/api/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(place)
    });
    if (apiPlace) {
      const places = getLocal<Place>(STORAGE_KEYS.PLACES, INITIAL_PLACES);
      const index = places.findIndex(p => p.id === place.id);
      if (index >= 0) places[index] = apiPlace;
      else places.unshift(apiPlace);
      setLocal(STORAGE_KEYS.PLACES, places);
      return apiPlace;
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('places').upsert(place).select().single();
      if (!error && data) return data as Place;
    }
    const places = getLocal<Place>(STORAGE_KEYS.PLACES, INITIAL_PLACES);
    const index = places.findIndex(p => p.id === place.id);
    if (index >= 0) {
      places[index] = place;
    } else {
      places.unshift(place);
    }
    setLocal(STORAGE_KEYS.PLACES, places);
    return place;
  },

  async deletePlace(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('places').delete().eq('id', id);
      if (!error) return true;
    }
    const places = getLocal<Place>(STORAGE_KEYS.PLACES, INITIAL_PLACES).filter(p => p.id !== id);
    setLocal(STORAGE_KEYS.PLACES, places);
    return true;
  },

  // Hotels
  async getHotels(): Promise<Hotel[]> {
    const apiData = await fetchApi<Hotel[]>('/api/hotels');
    if (apiData && apiData.length > 0) {
      setLocal(STORAGE_KEYS.HOTELS, apiData);
      return apiData;
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('hotels').select('*');
      if (!error && data && data.length > 0) return data as Hotel[];
    }
    const allAccommodations = getAllAccommodations();
    return allAccommodations.length > 0 ? allAccommodations : getLocal<Hotel>(STORAGE_KEYS.HOTELS, INITIAL_HOTELS);
  },

  async getHotelById(id: string): Promise<Hotel | null> {
    const allAccommodations = getAllAccommodations();
    const foundInAll = allAccommodations.find(h => h.id === id);
    if (foundInAll) return foundInAll;

    const apiHotel = await fetchApi<Hotel>(`/api/hotels/${id}`);
    if (apiHotel) return apiHotel;

    const hotels = await this.getHotels();
    return hotels.find(h => h.id === id) || null;
  },

  async saveHotel(hotel: Hotel): Promise<Hotel> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('hotels').upsert(hotel).select().single();
      if (!error && data) return data as Hotel;
    }
    const hotels = getLocal<Hotel>(STORAGE_KEYS.HOTELS, INITIAL_HOTELS);
    const index = hotels.findIndex(h => h.id === hotel.id);
    if (index >= 0) {
      hotels[index] = hotel;
    } else {
      hotels.unshift(hotel);
    }
    setLocal(STORAGE_KEYS.HOTELS, hotels);
    return hotel;
  },

  async deleteHotel(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('hotels').delete().eq('id', id);
      if (!error) return true;
    }
    const hotels = getLocal<Hotel>(STORAGE_KEYS.HOTELS, INITIAL_HOTELS).filter(h => h.id !== id);
    setLocal(STORAGE_KEYS.HOTELS, hotels);
    return true;
  },

  // Restaurants
  async getRestaurants(): Promise<Restaurant[]> {
    const apiData = await fetchApi<Restaurant[]>('/api/restaurants');
    if (apiData && apiData.length > 0) {
      setLocal(STORAGE_KEYS.RESTAURANTS, apiData);
      return apiData;
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('restaurants').select('*');
      if (!error && data && data.length > 0) return data as Restaurant[];
    }
    return getLocal<Restaurant>(STORAGE_KEYS.RESTAURANTS, INITIAL_RESTAURANTS);
  },

  async saveRestaurant(restaurant: Restaurant): Promise<Restaurant> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('restaurants').upsert(restaurant).select().single();
      if (!error && data) return data as Restaurant;
    }
    const list = getLocal<Restaurant>(STORAGE_KEYS.RESTAURANTS, INITIAL_RESTAURANTS);
    const index = list.findIndex(r => r.id === restaurant.id);
    if (index >= 0) {
      list[index] = restaurant;
    } else {
      list.unshift(restaurant);
    }
    setLocal(STORAGE_KEYS.RESTAURANTS, list);
    return restaurant;
  },

  async deleteRestaurant(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('restaurants').delete().eq('id', id);
      if (!error) return true;
    }
    const list = getLocal<Restaurant>(STORAGE_KEYS.RESTAURANTS, INITIAL_RESTAURANTS).filter(r => r.id !== id);
    setLocal(STORAGE_KEYS.RESTAURANTS, list);
    return true;
  },

  // Transports
  async getTransports(): Promise<TransportRoute[]> {
    const apiData = await fetchApi<TransportRoute[]>('/api/transports');
    if (apiData && apiData.length > 0) {
      setLocal(STORAGE_KEYS.TRANSPORTS, apiData);
      return apiData;
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('transport_routes').select('*');
      if (!error && data && data.length > 0) return data as TransportRoute[];
    }
    return getLocal<TransportRoute>(STORAGE_KEYS.TRANSPORTS, INITIAL_TRANSPORTS);
  },

  async saveTransport(route: TransportRoute): Promise<TransportRoute> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('transport_routes').upsert(route).select().single();
      if (!error && data) return data as TransportRoute;
    }
    const list = getLocal<TransportRoute>(STORAGE_KEYS.TRANSPORTS, INITIAL_TRANSPORTS);
    const index = list.findIndex(r => r.id === route.id);
    if (index >= 0) {
      list[index] = route;
    } else {
      list.unshift(route);
    }
    setLocal(STORAGE_KEYS.TRANSPORTS, list);
    return route;
  },

  async deleteTransport(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('transport_routes').delete().eq('id', id);
      if (!error) return true;
    }
    const list = getLocal<TransportRoute>(STORAGE_KEYS.TRANSPORTS, INITIAL_TRANSPORTS).filter(r => r.id !== id);
    setLocal(STORAGE_KEYS.TRANSPORTS, list);
    return true;
  },

  // Shopping & Place Exclusives
  async getShopping(): Promise<ShoppingPlace[]> {
    const apiData = await fetchApi<ShoppingPlace[]>('/api/shopping');
    if (apiData && apiData.length > 0) {
      setLocal(STORAGE_KEYS.SHOPPING, apiData);
      return apiData;
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('shopping_places').select('*');
      if (!error && data && data.length > 0) return data as ShoppingPlace[];
    }
    return getLocal<ShoppingPlace>(STORAGE_KEYS.SHOPPING, INITIAL_SHOPPING);
  },

  async getExclusiveSpecialties(districtId?: string, category?: string): Promise<LocalSpecialtyItem[]> {
    const apiData = await fetchApi<LocalSpecialtyItem[]>('/api/specialties');
    let list: LocalSpecialtyItem[];
    if (apiData && apiData.length > 0) {
      setLocal(STORAGE_KEYS.SPECIALTIES, apiData);
      list = apiData;
    } else {
      list = getLocal<LocalSpecialtyItem>(STORAGE_KEYS.SPECIALTIES, EXCLUSIVE_SPECIALTIES);
    }

    if (districtId && districtId !== 'All') {
      list = list.filter(item => item.district_id === districtId);
    }
    if (category && category !== 'All') {
      list = list.filter(item => item.category === category);
    }
    return list;
  },

  // Rides
  async getRides(): Promise<Ride[]> {
    const apiData = await fetchApi<Ride[]>('/api/rides');
    if (apiData && apiData.length > 0) {
      setLocal(STORAGE_KEYS.RIDES, apiData);
      return apiData;
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('rides').select('*');
      if (!error && data && data.length > 0) return data as Ride[];
    }
    return getLocal<Ride>(STORAGE_KEYS.RIDES, INITIAL_RIDES);
  },

  // Reviews
  async getReviews(targetType?: string, targetId?: string): Promise<Review[]> {
    const url = targetId ? `/api/reviews?target_id=${targetId}` : '/api/reviews';
    const apiData = await fetchApi<Review[]>(url);
    if (apiData && apiData.length > 0) {
      return apiData;
    }

    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('reviews').select('*');
      if (targetType) query = query.eq('target_type', targetType);
      if (targetId) query = query.eq('target_id', targetId);
      const { data, error } = await query;
      if (!error && data) return data as Review[];
    }
    let reviews = getLocal<Review>(STORAGE_KEYS.REVIEWS, []);
    if (targetType) reviews = reviews.filter(r => r.target_type === targetType);
    if (targetId) reviews = reviews.filter(r => r.target_id === targetId);
    return reviews;
  },

  async addReview(review: Omit<Review, 'id' | 'created_at'>): Promise<Review> {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    
    // Try posting to API
    await fetchApi<Review>('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    });

    if (isSupabaseConfigured && supabase) {
      await supabase.from('reviews').insert(newReview);
    }
    const reviews = getLocal<Review>(STORAGE_KEYS.REVIEWS, []);
    reviews.unshift(newReview);
    setLocal(STORAGE_KEYS.REVIEWS, reviews);
    return newReview;
  },

  // Admin Dashboard Statistics
  async getAdminStats() {
    const apiStats = await fetchApi<{
      districts: number;
      places: number;
      hotels: number;
      restaurants: number;
      transportRoutes: number;
      tripsCreated: number;
      reviewsPosted: number;
    }>('/api/stats');

    if (apiStats) {
      return {
        totalPlaces: apiStats.places,
        totalHotels: apiStats.hotels,
        totalRestaurants: apiStats.restaurants,
        totalTransports: apiStats.transportRoutes,
        totalRides: 4,
        totalTrips: apiStats.tripsCreated,
        totalReviews: apiStats.reviewsPosted,
        totalUsers: 2540
      };
    }

    const [places, hotels, restaurants, transports, rides, trips, reviews] = await Promise.all([
      this.getPlaces(),
      this.getHotels(),
      this.getRestaurants(),
      this.getTransports(),
      this.getRides(),
      getLocal<Trip>(STORAGE_KEYS.TRIPS, [SAMPLE_TRIP]),
      getLocal<Review>(STORAGE_KEYS.REVIEWS, [])
    ]);

    return {
      totalPlaces: places.length,
      totalHotels: hotels.length,
      totalRestaurants: restaurants.length,
      totalTransports: transports.length,
      totalRides: rides.length,
      totalTrips: trips.length,
      totalReviews: reviews.length,
      totalInquiries: (await this.getInquiries()).length,
      unreadInquiries: (await this.getUnreadInquiryCount('admin')),
      totalUsers: 2540
    };
  },

  // ============================================================================
  // Traveler Inquiries & Admin Messaging System
  // ============================================================================

  async getInquiries(category?: string, status?: string): Promise<TravelerInquiry[]> {
    const apiData = await fetchApi<TravelerInquiry[]>('/api/inquiries');
    let list: TravelerInquiry[];
    if (apiData && apiData.length > 0) {
      setLocal(STORAGE_KEYS.INQUIRIES, apiData);
      list = apiData;
    } else {
      list = getLocal<TravelerInquiry>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
    }

    if (category && category !== 'all') {
      list = list.filter(item => item.category === category);
    }
    if (status && status !== 'all') {
      list = list.filter(item => item.status === status);
    }

    // Sort by updated_at descending
    return list.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  },

  async getInquiryById(id: string): Promise<TravelerInquiry | null> {
    const apiData = await fetchApi<TravelerInquiry>(`/api/inquiries/${id}`);
    if (apiData) return apiData;

    const list = getLocal<TravelerInquiry>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
    return list.find(item => item.id === id) || null;
  },

  async createInquiry(data: {
    traveler_id: string;
    traveler_name: string;
    traveler_email: string;
    traveler_phone?: string;
    traveler_avatar?: string;
    subject: string;
    category: InquiryCategory;
    initial_message: string;
    traveler_choices?: TravelerChoicePayload;
  }): Promise<TravelerInquiry> {
    const now = new Date().toISOString();
    const newInquiryId = `inq-${Date.now()}`;
    const initialMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      inquiry_id: newInquiryId,
      sender_id: data.traveler_id,
      sender_name: data.traveler_name,
      sender_role: 'traveler',
      sender_avatar: data.traveler_avatar,
      message: data.initial_message,
      timestamp: now,
      is_read: false,
      attachment_type: data.traveler_choices ? 'choices' : 'general',
      attachment_data: data.traveler_choices
    };

    const newInquiry: TravelerInquiry = {
      id: newInquiryId,
      traveler_id: data.traveler_id,
      traveler_name: data.traveler_name,
      traveler_email: data.traveler_email,
      traveler_phone: data.traveler_phone || '+880 1700-000000',
      traveler_avatar: data.traveler_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      subject: data.subject,
      category: data.category,
      status: 'new',
      created_at: now,
      updated_at: now,
      last_message: data.initial_message,
      unread_for_admin: 1,
      unread_for_traveler: 0,
      traveler_choices: data.traveler_choices,
      messages: [initialMsg]
    };

    // Try posting to API
    await fetchApi<TravelerInquiry>('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry)
    });

    const list = getLocal<TravelerInquiry>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
    list.unshift(newInquiry);
    setLocal(STORAGE_KEYS.INQUIRIES, list);

    // Trigger custom event for real-time reactivity
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('yeana:inquiries_updated', { detail: newInquiry }));
    }

    return newInquiry;
  },

  async sendMessage(
    inquiryId: string,
    messageText: string,
    senderRole: 'traveler' | 'admin',
    senderName: string,
    senderId: string,
    senderAvatar?: string,
    attachmentType?: 'choices' | 'quote' | 'status_update' | 'general',
    attachmentData?: TravelerChoicePayload
  ): Promise<ChatMessage> {
    const list = getLocal<TravelerInquiry>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
    const index = list.findIndex(i => i.id === inquiryId);
    const now = new Date().toISOString();

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      inquiry_id: inquiryId,
      sender_id: senderId,
      sender_name: senderName,
      sender_role: senderRole,
      sender_avatar: senderAvatar,
      message: messageText,
      timestamp: now,
      is_read: false,
      attachment_type: attachmentType || 'general',
      attachment_data: attachmentData
    };

    if (index >= 0) {
      const inquiry = list[index];
      inquiry.messages.push(newMsg);
      inquiry.last_message = (senderRole === 'admin' ? 'Admin: ' : '') + messageText;
      inquiry.updated_at = now;
      if (senderRole === 'traveler') {
        inquiry.unread_for_admin += 1;
      } else {
        inquiry.unread_for_traveler += 1;
        if (inquiry.status === 'new') {
          inquiry.status = 'in_progress';
        }
      }
      if (attachmentData) {
        inquiry.traveler_choices = { ...inquiry.traveler_choices, ...attachmentData };
      }
      list[index] = inquiry;
      setLocal(STORAGE_KEYS.INQUIRIES, list);

      // Trigger custom event for reactivity
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('yeana:inquiries_updated', { detail: inquiry }));
      }
    }

    return newMsg;
  },

  async updateInquiryStatus(inquiryId: string, status: InquiryStatus, adminNotes?: string): Promise<boolean> {
    const list = getLocal<TravelerInquiry>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
    const index = list.findIndex(i => i.id === inquiryId);
    if (index >= 0) {
      list[index].status = status;
      if (adminNotes !== undefined) {
        list[index].admin_notes = adminNotes;
      }
      list[index].updated_at = new Date().toISOString();
      setLocal(STORAGE_KEYS.INQUIRIES, list);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('yeana:inquiries_updated', { detail: list[index] }));
      }
      return true;
    }
    return false;
  },

  async markInquiryRead(inquiryId: string, forRole: 'admin' | 'traveler'): Promise<void> {
    const list = getLocal<TravelerInquiry>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
    const index = list.findIndex(i => i.id === inquiryId);
    if (index >= 0) {
      if (forRole === 'admin') {
        list[index].unread_for_admin = 0;
      } else {
        list[index].unread_for_traveler = 0;
      }
      list[index].messages.forEach(m => {
        if (forRole === 'admin' && m.sender_role === 'traveler') m.is_read = true;
        if (forRole === 'traveler' && m.sender_role === 'admin') m.is_read = true;
      });
      setLocal(STORAGE_KEYS.INQUIRIES, list);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('yeana:inquiries_updated', { detail: list[index] }));
      }
    }
  },

  async getUnreadInquiryCount(forRole: 'admin' | 'traveler'): Promise<number> {
    const list = getLocal<TravelerInquiry>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
    return list.reduce((total, inq) => {
      return total + (forRole === 'admin' ? inq.unread_for_admin : inq.unread_for_traveler);
    }, 0);
  }
};

