export type Division = 
  | 'Dhaka' 
  | 'Chattogram' 
  | 'Sylhet' 
  | 'Rajshahi' 
  | 'Khulna' 
  | 'Barishal' 
  | 'Rangpur' 
  | 'Mymensingh';

export interface District {
  id: string;
  division: Division;
  name: string;
  name_bn: string;
  description: string;
  description_bn?: string;
  image_url: string;
  lat: number;
  lng: number;
  popular_season: string;
  place_count?: number;
}

export interface Place {
  id: string;
  district_id: string;
  district_name?: string;
  division?: Division;
  name: string;
  name_bn: string;
  rating: number;
  reviews_count: number;
  short_description: string;
  short_description_bn?: string;
  full_description: string;
  full_description_bn?: string;
  location: string;
  location_bn?: string;
  lat: number;
  lng: number;
  entry_fee: string;
  entry_fee_bn?: string;
  opening_time: string;
  opening_time_bn?: string;
  best_time: string;
  best_time_bn?: string;
  how_to_reach: string;
  how_to_reach_bn?: string;
  image_url: string;
  gallery: string[];
  category: 'Nature' | 'Hill' | 'Beach' | 'Heritage' | 'Island' | 'Waterfall' | 'Tea Garden' | 'Forest';
  is_featured?: boolean;
  nearby_hotels?: string[];
  nearby_restaurants?: string[];
}

export interface Hotel {
  id: string;
  district_id: string;
  district_name?: string;
  name: string;
  name_bn: string;
  rating: number;
  reviews_count: number;
  price_per_night: number;
  price_formatted?: string;
  location: string;
  address: string;
  contact_phone: string;
  contact_email?: string;
  has_ac: boolean;
  has_wifi: boolean;
  has_parking: boolean;
  has_restaurant: boolean;
  has_room_service: boolean;
  has_security: boolean;
  image_url: string;
  gallery: string[];
  room_types: string[];
  check_in: string;
  check_out: string;
  is_featured?: boolean;
}

export interface Restaurant {
  id: string;
  district_id: string;
  district_name?: string;
  name: string;
  name_bn: string;
  rating: number;
  reviews_count: number;
  cuisine: string;
  cuisine_bn?: string;
  price_tier: '৳' | '৳৳' | '৳৳৳';
  location: string;
  address: string;
  phone: string;
  opening_hours: string;
  menu_highlights: string[];
  image_url: string;
  is_featured?: boolean;
}

export type TransportType = 'Bus' | 'Train' | 'Flight' | 'Car' | 'Launch';

export interface TransportRoute {
  id: string;
  transport_type: TransportType;
  company: string;
  from_district: string;
  to_district: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  price_min: number;
  price_max: number;
  boarding_points: string[];
  schedule_days: string;
  contact_phone?: string;
  is_active: boolean;
}

export interface ShoppingPlace {
  id: string;
  district_id: string;
  district_name?: string;
  name: string;
  name_bn: string;
  category: string;
  location: string;
  address: string;
  famous_for: string;
  opening_hours: string;
  image_url: string;
}

export interface Ride {
  id: string;
  district_id: string;
  district_name?: string;
  vehicle_type: 'Bike' | 'Car' | 'Microbus' | 'Chander Gari';
  model: string;
  rental_type: 'Self Drive' | 'With Driver' | 'Both';
  price_per_hour?: number;
  price_per_day: number;
  location: string;
  owner_name: string;
  contact_phone: string;
  availability_status: 'Available' | 'Booked' | 'Under Maintenance';
  image_url: string;
}

export interface TripPlace {
  id: string;
  trip_id: string;
  place_id?: string;
  place?: Place;
  custom_title?: string;
  day_number: number;
  order_index: number;
  time_slot?: string;
  notes?: string;
}

export interface TripBudget {
  transport: number;
  hotel: number;
  food: number;
  activities: number;
  shopping: number;
  ride: number;
  other: number;
}

export interface Trip {
  id: string;
  user_id?: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  duration_days: number;
  budget: TripBudget;
  total_budget: number;
  notes?: string;
  places: TripPlace[];
  created_at: string;
}

export type FavoriteType = 'place' | 'hotel' | 'restaurant' | 'shopping' | 'ride';

export interface FavoriteItem {
  id: string;
  user_id?: string;
  item_type: FavoriteType;
  item_id: string;
  item_data: Place | Hotel | Restaurant | ShoppingPlace | Ride;
  created_at: string;
}

export interface Review {
  id: string;
  user_id?: string;
  user_name: string;
  user_avatar?: string;
  target_type: 'place' | 'hotel' | 'restaurant' | 'ride';
  target_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  role: 'user' | 'admin' | 'partner';
  bio?: string;
  preferred_language: 'en' | 'bn';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'alert' | 'trip';
  date: string;
  read: boolean;
}
