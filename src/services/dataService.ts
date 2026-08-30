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
  Trip
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

// LocalStorage Keys for persistent offline/mock mode
const STORAGE_KEYS = {
  DISTRICTS: 'yeana_districts',
  PLACES: 'yeana_places',
  HOTELS: 'yeana_hotels',
  RESTAURANTS: 'yeana_restaurants',
  TRANSPORTS: 'yeana_transports',
  SHOPPING: 'yeana_shopping',
  RIDES: 'yeana_rides',
  TRIPS: 'yeana_trips',
  REVIEWS: 'yeana_reviews'
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
    return getLocal<Hotel>(STORAGE_KEYS.HOTELS, INITIAL_HOTELS);
  },

  async getHotelById(id: string): Promise<Hotel | null> {
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

  // Shopping
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
      totalUsers: 2540
    };
  }
};
