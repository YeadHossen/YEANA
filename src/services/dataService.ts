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
  TravelerChoicePayload,
  TransportBooking,
  HotelBooking,
  BookingStatus,
  SeatInventoryItem,
  RoomInventoryItem,
  CompanyPortalStats
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
  INQUIRIES: 'yeana_inquiries',
  TRANSPORT_BOOKINGS: 'yeana_transport_bookings',
  HOTEL_BOOKINGS: 'yeana_hotel_bookings',
  SEAT_INVENTORY: 'yeana_seat_inventory',
  ROOM_INVENTORY: 'yeana_room_inventory'
};

export const INITIAL_TRANSPORT_BOOKINGS: TransportBooking[] = [
  {
    id: 'YN-TR-849102',
    route_id: 'tr-1',
    company: 'Green Line Paribahan',
    transport_type: 'Bus',
    from_district: 'Dhaka',
    to_district: 'Sylhet',
    departure_time: '08:00 AM',
    travel_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    selected_seats: ['A1', 'A2'],
    seat_count: 2,
    is_full_reserve: false,
    passenger_name: 'Tanvir Ahmed',
    passenger_phone: '01711-223344',
    passenger_email: 'tanvir@gmail.com',
    passenger_gender: 'Male',
    boarding_point: 'Sayedabad Bus Terminal',
    dropping_point: 'Sylhet Kadamtoli Bus Stand',
    total_fare: 2400,
    status: 'confirmed',
    booked_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'YN-TR-623819',
    route_id: 'tr-2',
    company: 'Shohoz Transport',
    transport_type: 'Bus',
    from_district: 'Dhaka',
    to_district: "Cox's Bazar",
    departure_time: '10:30 PM',
    travel_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    selected_seats: ['C1', 'C2', 'C3'],
    seat_count: 3,
    is_full_reserve: false,
    passenger_name: 'Farzana Yasmin',
    passenger_phone: '01819-334455',
    passenger_email: 'farzana.y@yahoo.com',
    passenger_gender: 'Female',
    boarding_point: 'Arambagh Counter',
    dropping_point: "Cox's Bazar Kolatoli Beach Stand",
    total_fare: 4500,
    status: 'confirmed',
    booked_at: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    id: 'YN-TR-392014',
    route_id: 'tr-fl-1',
    company: 'US-Bangla Airlines',
    transport_type: 'Flight',
    from_district: 'Dhaka',
    to_district: 'Chattogram',
    departure_time: '09:15 AM',
    travel_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    selected_seats: ['4A', '4B'],
    seat_count: 2,
    is_full_reserve: false,
    passenger_name: 'Rahim Chowdhury',
    passenger_phone: '01912-778899',
    passenger_email: 'rahim.chowdhury@outlook.com',
    passenger_gender: 'Male',
    boarding_point: 'Hazrat Shahjalal Int Airport (DAC)',
    dropping_point: 'Shah Amanat Int Airport (CGP)',
    total_fare: 9600,
    status: 'checked_in',
    booked_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'YN-TR-554109',
    route_id: 'tr-ln-1',
    company: 'MV Parabat Waterways',
    transport_type: 'Launch',
    from_district: 'Dhaka',
    to_district: 'Barishal',
    departure_time: '08:30 PM',
    travel_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    selected_seats: ['Cabin-104'],
    seat_count: 1,
    is_full_reserve: false,
    passenger_name: 'Mahmudul Hasan',
    passenger_phone: '01715-998877',
    passenger_email: 'mahmud.h@gmail.com',
    passenger_gender: 'Male',
    boarding_point: 'Sadarghat Launch Terminal',
    dropping_point: 'Barishal River Port Ghat',
    total_fare: 2800,
    status: 'confirmed',
    booked_at: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: 'YN-TR-710492',
    route_id: 'tr-jk-1',
    company: 'Sajek 4x4 Mountain Jeep Safari',
    transport_type: 'Local',
    from_district: 'Khagrachhari',
    to_district: 'Sajek Valley',
    departure_time: '10:30 AM',
    travel_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    selected_seats: ['F1', 'M1', 'M2'],
    seat_count: 3,
    is_full_reserve: false,
    passenger_name: 'Nusrat Jahan',
    passenger_phone: '01611-445566',
    passenger_email: 'nusrat.jahan@gmail.com',
    passenger_gender: 'Female',
    boarding_point: 'Khagrachhari Shapla Chattar',
    dropping_point: 'Sajek Ruilui Para Stand',
    total_fare: 3600,
    status: 'confirmed',
    booked_at: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

export const INITIAL_HOTEL_BOOKINGS: HotelBooking[] = [
  {
    id: 'HTL-GRNDS-912',
    hotel_id: 'htl-syl-01',
    hotel_name: 'Grand Sultan Tea Resort & Golf',
    hotel_image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
    district_name: 'Moulvibazar / Sreemangal',
    room_type: 'Deluxe King Golf Suite',
    room_count: 1,
    guest_count: 2,
    check_in_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    check_out_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    nights: 2,
    guest_name: 'Kamrul Islam',
    guest_phone: '01712-889900',
    guest_email: 'kamrul.islam@gmail.com',
    total_cost: 17000,
    status: 'confirmed',
    special_requests: 'High floor, complimentary breakfast, quiet corner room',
    booked_at: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    id: 'HTL-RADSN-405',
    hotel_id: 'htl-dhk-01',
    hotel_name: 'Radisson Blu Water Garden Dhaka',
    hotel_image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
    district_name: 'Dhaka',
    room_type: 'Executive Club Room',
    room_count: 1,
    guest_count: 1,
    check_in_date: new Date().toISOString().split('T')[0],
    check_out_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    nights: 1,
    guest_name: 'Dr. Shireen Akhtar',
    guest_phone: '01819-001122',
    guest_email: 'shireen.akhtar@yahoo.com',
    total_cost: 14500,
    status: 'checked_in',
    special_requests: 'Late check-in at 8 PM, airport shuttle required',
    booked_at: new Date(Date.now() - 3600000 * 14).toISOString()
  },
  {
    id: 'HTL-SAJEK-771',
    hotel_id: 'htl-saj-01',
    hotel_name: 'Sajek Valley Cloud Eco Resort',
    hotel_image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
    district_name: 'Rangamati / Sajek',
    room_type: 'Cloud View Wooden Cottage',
    room_count: 2,
    guest_count: 4,
    check_in_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    check_out_date: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    nights: 2,
    guest_name: 'Sabbir Hossain',
    guest_phone: '01911-332211',
    guest_email: 'sabbir.h@gmail.com',
    total_cost: 12000,
    status: 'confirmed',
    special_requests: 'Both cottages side-by-side with balcony facing east',
    booked_at: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    id: 'HTL-SAYMN-283',
    hotel_id: 'htl-cox-01',
    hotel_name: 'Sayeman Beach Resort',
    hotel_image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
    district_name: "Cox's Bazar",
    room_type: 'Ocean Front Suite with Balcony',
    room_count: 1,
    guest_count: 2,
    check_in_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    check_out_date: new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0],
    nights: 3,
    guest_name: 'Anika Rahman',
    guest_phone: '+880 1712-345678',
    guest_email: 'anika.travel@yeana.bd',
    total_cost: 25500,
    status: 'confirmed',
    special_requests: 'Honeymoon arrangement, high floor sunset view',
    booked_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'HTL-TANGR-618',
    hotel_id: 'htl-tan-01',
    hotel_name: 'Tanguar Haor Luxury Houseboat',
    hotel_image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200',
    district_name: 'Sunamganj / Tahirpur',
    room_type: 'Upper Deck Water Suite',
    room_count: 1,
    guest_count: 2,
    check_in_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    check_out_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    nights: 1,
    guest_name: 'Zubair Al-Mamun',
    guest_phone: '01713-776655',
    guest_email: 'zubair.mamun@gmail.com',
    total_cost: 9500,
    status: 'confirmed',
    special_requests: 'Includes local Haor fish BBQ and evening boat safari',
    booked_at: new Date(Date.now() - 3600000 * 30).toISOString()
  }
];

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

    const savedTransportBookings = localStorage.getItem(STORAGE_KEYS.TRANSPORT_BOOKINGS);
    if (!savedTransportBookings || JSON.parse(savedTransportBookings).length < INITIAL_TRANSPORT_BOOKINGS.length) {
      localStorage.setItem(STORAGE_KEYS.TRANSPORT_BOOKINGS, JSON.stringify(INITIAL_TRANSPORT_BOOKINGS));
    }

    const savedHotelBookings = localStorage.getItem(STORAGE_KEYS.HOTEL_BOOKINGS);
    if (!savedHotelBookings || JSON.parse(savedHotelBookings).length < INITIAL_HOTEL_BOOKINGS.length) {
      localStorage.setItem(STORAGE_KEYS.HOTEL_BOOKINGS, JSON.stringify(INITIAL_HOTEL_BOOKINGS));
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
  },

  // ==============================================================
  // 12. TRANSPORT BOOKINGS & REAL-TIME SEAT INVENTORY
  // ==============================================================
  async getTransportBookings(filters?: { company?: string; date?: string; status?: string; search?: string }): Promise<TransportBooking[]> {
    const apiData = await fetchApi<TransportBooking[]>(`/api/bookings/transport?${new URLSearchParams(filters as any).toString()}`);
    if (apiData) {
      setLocal(STORAGE_KEYS.TRANSPORT_BOOKINGS, apiData);
      return apiData;
    }

    let local = getLocal<TransportBooking>(STORAGE_KEYS.TRANSPORT_BOOKINGS, INITIAL_TRANSPORT_BOOKINGS);
    if (filters?.company && filters.company !== 'All') {
      local = local.filter(b => b.company.toLowerCase().includes(filters.company!.toLowerCase()));
    }
    if (filters?.date) {
      local = local.filter(b => b.travel_date === filters.date);
    }
    if (filters?.status && filters.status !== 'all') {
      local = local.filter(b => b.status === filters.status);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      local = local.filter(b => 
        b.id.toLowerCase().includes(q) || 
        b.passenger_name.toLowerCase().includes(q) || 
        b.passenger_phone.includes(q) ||
        b.company.toLowerCase().includes(q)
      );
    }
    return local;
  },

  async createTransportBooking(booking: Partial<TransportBooking>): Promise<TransportBooking> {
    const id = booking.id || `YN-TR-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: TransportBooking = {
      id,
      route_id: booking.route_id || 'tr-1',
      route: booking.route,
      company: booking.company || 'Green Line Paribahan',
      transport_type: booking.transport_type || 'Bus',
      from_district: booking.from_district || 'Dhaka',
      to_district: booking.to_district || 'Sylhet',
      departure_time: booking.departure_time || '08:00 AM',
      travel_date: booking.travel_date || new Date().toISOString().split('T')[0],
      selected_seats: booking.selected_seats || [],
      seat_count: booking.selected_seats?.length || booking.seat_count || 1,
      is_full_reserve: Boolean(booking.is_full_reserve),
      passenger_name: booking.passenger_name || 'Traveler',
      passenger_phone: booking.passenger_phone || '01700-000000',
      passenger_email: booking.passenger_email || 'traveler@yeana.bd',
      passenger_gender: booking.passenger_gender || 'Male',
      boarding_point: booking.boarding_point || 'Main Station',
      dropping_point: booking.dropping_point || 'Central Stand',
      total_fare: booking.total_fare || 1000,
      status: booking.status || 'confirmed',
      booked_at: new Date().toISOString()
    };

    // Try API
    const apiResult = await fetchApi<TransportBooking>('/api/bookings/transport', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking)
    });

    // Update local storage
    const currentList = getLocal<TransportBooking>(STORAGE_KEYS.TRANSPORT_BOOKINGS, INITIAL_TRANSPORT_BOOKINGS);
    const updatedList = [apiResult || newBooking, ...currentList.filter(b => b.id !== id)];
    setLocal(STORAGE_KEYS.TRANSPORT_BOOKINGS, updatedList);

    // Record seat inventory locally
    const seatInv = getLocal<SeatInventoryItem>(STORAGE_KEYS.SEAT_INVENTORY, []);
    const newSeatItems: SeatInventoryItem[] = newBooking.selected_seats.map(seat => ({
      id: `${newBooking.route_id}_${newBooking.travel_date}_${seat}`,
      route_id: newBooking.route_id,
      travel_date: newBooking.travel_date,
      seat_id: seat,
      status: 'booked',
      booking_id: newBooking.id,
      passenger_name: newBooking.passenger_name,
      passenger_phone: newBooking.passenger_phone,
      updated_at: new Date().toISOString()
    }));
    setLocal(STORAGE_KEYS.SEAT_INVENTORY, [...newSeatItems, ...seatInv.filter(s => !newSeatItems.some(n => n.id === s.id))]);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('yeana:transport_booking_created', { detail: apiResult || newBooking }));
    }

    return apiResult || newBooking;
  },

  async updateTransportBookingStatus(id: string, status: BookingStatus): Promise<boolean> {
    await fetchApi(`/api/bookings/transport/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    const list = getLocal<TransportBooking>(STORAGE_KEYS.TRANSPORT_BOOKINGS, INITIAL_TRANSPORT_BOOKINGS);
    const idx = list.findIndex(b => b.id === id);
    if (idx >= 0) {
      list[idx].status = status;
      setLocal(STORAGE_KEYS.TRANSPORT_BOOKINGS, list);

      if (status === 'cancelled') {
        const seatInv = getLocal<SeatInventoryItem>(STORAGE_KEYS.SEAT_INVENTORY, []);
        setLocal(STORAGE_KEYS.SEAT_INVENTORY, seatInv.filter(s => s.booking_id !== id));
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('yeana:transport_booking_updated', { detail: list[idx] }));
      }
      return true;
    }
    return false;
  },

  async getTransportSeatAvailability(routeId: string, travelDate: string): Promise<SeatInventoryItem[]> {
    const apiData = await fetchApi<SeatInventoryItem[]>(`/api/inventory/transport/${routeId}?date=${travelDate}`);
    if (apiData) return apiData;

    const allSeatInv = getLocal<SeatInventoryItem>(STORAGE_KEYS.SEAT_INVENTORY, []);
    const matching = allSeatInv.filter(s => s.route_id === routeId && s.travel_date === travelDate);

    // Also include seats from bookings
    const bookings = getLocal<TransportBooking>(STORAGE_KEYS.TRANSPORT_BOOKINGS, INITIAL_TRANSPORT_BOOKINGS);
    const dateBookings = bookings.filter(b => b.route_id === routeId && b.travel_date === travelDate && b.status !== 'cancelled');

    const combined = [...matching];
    for (const b of dateBookings) {
      for (const seat of b.selected_seats) {
        if (!combined.some(c => c.seat_id === seat)) {
          combined.push({
            id: `${routeId}_${travelDate}_${seat}`,
            route_id: routeId,
            travel_date: travelDate,
            seat_id: seat,
            status: 'booked',
            booking_id: b.id,
            passenger_name: b.passenger_name,
            passenger_phone: b.passenger_phone
          });
        }
      }
    }

    return combined;
  },

  async blockOrReleaseSeat(routeId: string, travelDate: string, seatId: string, action: 'block' | 'release', notes?: string): Promise<boolean> {
    await fetchApi('/api/inventory/transport/block-seat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ route_id: routeId, travel_date: travelDate, seat_id: seatId, action, notes })
    });

    const seatInv = getLocal<SeatInventoryItem>(STORAGE_KEYS.SEAT_INVENTORY, []);
    const invId = `${routeId}_${travelDate}_${seatId}`;

    if (action === 'release') {
      const updated = seatInv.filter(s => s.id !== invId);
      setLocal(STORAGE_KEYS.SEAT_INVENTORY, updated);
    } else {
      const newItem: SeatInventoryItem = {
        id: invId,
        route_id: routeId,
        travel_date: travelDate,
        seat_id: seatId,
        status: 'blocked',
        passenger_name: notes || 'Operator Blocked',
        updated_at: new Date().toISOString()
      };
      setLocal(STORAGE_KEYS.SEAT_INVENTORY, [newItem, ...seatInv.filter(s => s.id !== invId)]);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('yeana:seat_inventory_updated', { detail: { routeId, travelDate, seatId, action } }));
    }
    return true;
  },

  // ==============================================================
  // 13. HOTEL BOOKINGS & LIVE ROOM INVENTORY
  // ==============================================================
  async getHotelBookings(filters?: { hotel_id?: string; company?: string; date?: string; status?: string; search?: string }): Promise<HotelBooking[]> {
    const apiData = await fetchApi<HotelBooking[]>(`/api/bookings/hotel?${new URLSearchParams(filters as any).toString()}`);
    if (apiData) {
      setLocal(STORAGE_KEYS.HOTEL_BOOKINGS, apiData);
      return apiData;
    }

    let local = getLocal<HotelBooking>(STORAGE_KEYS.HOTEL_BOOKINGS, INITIAL_HOTEL_BOOKINGS);
    if (filters?.hotel_id) {
      local = local.filter(b => b.hotel_id === filters.hotel_id);
    }
    if (filters?.company && filters.company !== 'All') {
      local = local.filter(b => b.hotel_name.toLowerCase().includes(filters.company!.toLowerCase()));
    }
    if (filters?.date) {
      local = local.filter(b => b.check_in_date <= filters.date! && b.check_out_date >= filters.date!);
    }
    if (filters?.status && filters.status !== 'all') {
      local = local.filter(b => b.status === filters.status);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      local = local.filter(b => 
        b.id.toLowerCase().includes(q) || 
        b.guest_name.toLowerCase().includes(q) || 
        b.guest_phone.includes(q) ||
        b.hotel_name.toLowerCase().includes(q) ||
        b.room_type.toLowerCase().includes(q)
      );
    }
    return local;
  },

  async createHotelBooking(booking: Partial<HotelBooking>): Promise<HotelBooking> {
    const id = booking.id || `HTL-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking: HotelBooking = {
      id,
      hotel_id: booking.hotel_id || 'htl-01',
      hotel_name: booking.hotel_name || 'YEANA Certified Resort',
      hotel_image: booking.hotel_image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      district_name: booking.district_name || 'Sylhet',
      room_type: booking.room_type || 'Deluxe AC Room',
      room_count: booking.room_count || 1,
      guest_count: booking.guest_count || 2,
      check_in_date: booking.check_in_date || new Date().toISOString().split('T')[0],
      check_out_date: booking.check_out_date || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      nights: booking.nights || 2,
      guest_name: booking.guest_name || 'Guest Traveler',
      guest_phone: booking.guest_phone || '01700-000000',
      guest_email: booking.guest_email || 'guest@yeana.bd',
      total_cost: booking.total_cost || 6000,
      status: booking.status || 'confirmed',
      special_requests: booking.special_requests || '',
      booked_at: new Date().toISOString()
    };

    const apiResult = await fetchApi<HotelBooking>('/api/bookings/hotel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking)
    });

    const currentList = getLocal<HotelBooking>(STORAGE_KEYS.HOTEL_BOOKINGS, INITIAL_HOTEL_BOOKINGS);
    const updatedList = [apiResult || newBooking, ...currentList.filter(b => b.id !== id)];
    setLocal(STORAGE_KEYS.HOTEL_BOOKINGS, updatedList);

    // Update Room Inventory locally
    const roomInv = getLocal<RoomInventoryItem>(STORAGE_KEYS.ROOM_INVENTORY, []);
    const invIdx = roomInv.findIndex(r => r.hotel_id === newBooking.hotel_id && r.room_type === newBooking.room_type);
    if (invIdx >= 0) {
      roomInv[invIdx].available_rooms = Math.max(0, roomInv[invIdx].available_rooms - newBooking.room_count);
      roomInv[invIdx].booked_rooms += newBooking.room_count;
      setLocal(STORAGE_KEYS.ROOM_INVENTORY, roomInv);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('yeana:hotel_booking_created', { detail: apiResult || newBooking }));
    }

    return apiResult || newBooking;
  },

  async updateHotelBookingStatus(id: string, status: BookingStatus): Promise<boolean> {
    await fetchApi(`/api/bookings/hotel/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    const list = getLocal<HotelBooking>(STORAGE_KEYS.HOTEL_BOOKINGS, INITIAL_HOTEL_BOOKINGS);
    const idx = list.findIndex(b => b.id === id);
    if (idx >= 0) {
      const prevStatus = list[idx].status;
      list[idx].status = status;
      setLocal(STORAGE_KEYS.HOTEL_BOOKINGS, list);

      // If cancelled, restore available rooms
      if (status === 'cancelled' && prevStatus !== 'cancelled') {
        const roomInv = getLocal<RoomInventoryItem>(STORAGE_KEYS.ROOM_INVENTORY, []);
        const invIdx = roomInv.findIndex(r => r.hotel_id === list[idx].hotel_id && r.room_type === list[idx].room_type);
        if (invIdx >= 0) {
          roomInv[invIdx].available_rooms += list[idx].room_count;
          roomInv[invIdx].booked_rooms = Math.max(0, roomInv[invIdx].booked_rooms - list[idx].room_count);
          setLocal(STORAGE_KEYS.ROOM_INVENTORY, roomInv);
        }
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('yeana:hotel_booking_updated', { detail: list[idx] }));
      }
      return true;
    }
    return false;
  },

  async getHotelRoomAvailability(hotelId: string): Promise<RoomInventoryItem[]> {
    const apiData = await fetchApi<RoomInventoryItem[]>(`/api/inventory/hotel/${hotelId}`);
    if (apiData && apiData.length > 0) return apiData;

    let roomInv = getLocal<RoomInventoryItem>(STORAGE_KEYS.ROOM_INVENTORY, []);
    let hotelRooms = roomInv.filter(r => r.hotel_id === hotelId);

    if (hotelRooms.length === 0) {
      // Initialize default inventory for this hotel
      const hotels = getLocal<Hotel>(STORAGE_KEYS.HOTELS, INITIAL_HOTELS);
      const targetHotel = hotels.find(h => h.id === hotelId);
      const roomTypes = targetHotel?.room_types || ['Deluxe AC Room', 'Executive Suite'];

      hotelRooms = roomTypes.map((rt, idx) => {
        const name = typeof rt === 'object' ? rt.name : rt;
        const price = typeof rt === 'object' ? rt.price : (targetHotel?.price_per_night || 3500);
        return {
          id: `${hotelId}_${name.replace(/\s+/g, '_')}`,
          hotel_id: hotelId,
          room_type: name,
          total_rooms: idx === 0 ? 12 : 6,
          available_rooms: idx === 0 ? 8 : 4,
          booked_rooms: idx === 0 ? 4 : 2,
          blocked_rooms: 0,
          price_per_night: price
        };
      });

      setLocal(STORAGE_KEYS.ROOM_INVENTORY, [...roomInv, ...hotelRooms]);
    }

    return hotelRooms;
  },

  async updateHotelRoomInventory(
    hotelId: string,
    roomType: string,
    totalRooms: number,
    availableRooms: number,
    pricePerNight?: number,
    blockedRooms?: number
  ): Promise<boolean> {
    await fetchApi('/api/inventory/hotel/rooms', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hotel_id: hotelId,
        room_type: roomType,
        total_rooms: totalRooms,
        available_rooms: availableRooms,
        price_per_night: pricePerNight,
        blocked_rooms: blockedRooms
      })
    });

    const roomInv = getLocal<RoomInventoryItem>(STORAGE_KEYS.ROOM_INVENTORY, []);
    const invIdx = roomInv.findIndex(r => r.hotel_id === hotelId && r.room_type === roomType);
    const item: RoomInventoryItem = {
      id: `${hotelId}_${roomType.replace(/\s+/g, '_')}`,
      hotel_id: hotelId,
      room_type: roomType,
      total_rooms: totalRooms,
      available_rooms: availableRooms,
      booked_rooms: Math.max(0, totalRooms - availableRooms - (blockedRooms || 0)),
      blocked_rooms: blockedRooms || 0,
      price_per_night: pricePerNight || (roomInv[invIdx]?.price_per_night || 3500),
      updated_at: new Date().toISOString()
    };

    if (invIdx >= 0) {
      roomInv[invIdx] = item;
    } else {
      roomInv.push(item);
    }
    setLocal(STORAGE_KEYS.ROOM_INVENTORY, roomInv);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('yeana:room_inventory_updated', { detail: item }));
    }
    return true;
  },

  // ==============================================================
  // 14. COMPANY E-PORTAL AGGREGATED METRICS
  // ==============================================================
  async getCompanyPortalStats(companyName?: string): Promise<CompanyPortalStats> {
    const apiData = await fetchApi<CompanyPortalStats>(`/api/portal/stats?company=${encodeURIComponent(companyName || 'All')}`);
    if (apiData) return apiData;

    const trBookings = getLocal<TransportBooking>(STORAGE_KEYS.TRANSPORT_BOOKINGS, INITIAL_TRANSPORT_BOOKINGS);
    const htlBookings = getLocal<HotelBooking>(STORAGE_KEYS.HOTEL_BOOKINGS, INITIAL_HOTEL_BOOKINGS);

    const filteredTr = (!companyName || companyName === 'All')
      ? trBookings
      : trBookings.filter(b => b.company.toLowerCase().includes(companyName.toLowerCase()));

    const filteredHtl = (!companyName || companyName === 'All')
      ? htlBookings
      : htlBookings.filter(b => b.hotel_name.toLowerCase().includes(companyName.toLowerCase()));

    const trConfirmed = filteredTr.filter(b => b.status !== 'cancelled');
    const htlConfirmed = filteredHtl.filter(b => b.status !== 'cancelled');

    const seatsSold = trConfirmed.reduce((sum, b) => sum + (b.seat_count || 1), 0);
    const trRevenue = trConfirmed.reduce((sum, b) => sum + (b.total_fare || 0), 0);

    const roomsBooked = htlConfirmed.reduce((sum, b) => sum + (b.room_count || 1), 0);
    const htlRevenue = htlConfirmed.reduce((sum, b) => sum + (b.total_cost || 0), 0);

    return {
      transport: {
        totalBookings: trConfirmed.length,
        seatsSold,
        revenue: trRevenue,
        totalRoutes: 48
      },
      hotel: {
        totalBookings: htlConfirmed.length,
        roomsBooked,
        revenue: htlRevenue,
        totalProperties: 520
      },
      summary: {
        totalRevenue: trRevenue + htlRevenue,
        totalCompanies: 65
      }
    };
  }
};


