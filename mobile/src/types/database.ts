// ========================================================================
// YEANA — Database Schema Type Definitions for React Native App
// ========================================================================

export type DivisionName = 
  | 'Dhaka' 
  | 'Chattogram' 
  | 'Sylhet' 
  | 'Rajshahi' 
  | 'Khulna' 
  | 'Barishal' 
  | 'Rangpur' 
  | 'Mymensingh';

export interface DivisionRecord {
  id: number;
  name: DivisionName;
  name_bn: string;
  code: string;
  lat?: number;
  lng?: number;
  created_at: string;
  updated_at: string;
}

export interface DistrictRecord {
  id: number;
  division_id: number;
  slug: string;
  name: string;
  name_bn: string;
  description?: string;
  image_url?: string;
  lat?: number;
  lng?: number;
  popular_season?: string;
  created_at: string;
  updated_at: string;
  division?: DivisionRecord;
}

export interface UpazilaRecord {
  id: number;
  district_id: number;
  slug: string;
  name: string;
  name_bn: string;
  lat?: number;
  lng?: number;
  popular_tag?: string;
  has_railway: boolean;
  has_launch_ghat: boolean;
  transit_hub_type?: string;
  created_at: string;
  updated_at: string;
  district?: DistrictRecord;
}

export type DestinationCategory = 
  | 'Nature' 
  | 'Hill' 
  | 'Beach' 
  | 'Heritage' 
  | 'Island' 
  | 'Waterfall' 
  | 'Tea Garden' 
  | 'Forest';

export interface DestinationImageRecord {
  id: string;
  destination_id: string;
  image_url: string;
  caption?: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface DestinationRecord {
  id: string;
  district_id: number;
  upazila_id?: number | null;
  name: string;
  name_bn: string;
  category: DestinationCategory;
  short_description?: string;
  full_description?: string;
  location_address: string;
  lat?: number;
  lng?: number;
  entry_fee: number;
  entry_fee_info?: string;
  opening_time?: string;
  best_time_to_visit?: string;
  how_to_reach?: string;
  cover_image_url: string;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  district?: DistrictRecord;
  upazila?: UpazilaRecord;
  images?: DestinationImageRecord[];
}

export interface HotelImageRecord {
  id: string;
  hotel_id: string;
  image_url: string;
  room_type?: string;
  caption?: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface HotelRecord {
  id: string;
  district_id: number;
  upazila_id?: number | null;
  name: string;
  name_bn: string;
  description?: string;
  rating: number;
  reviews_count: number;
  price_per_night: number;
  location_address: string;
  lat?: number;
  lng?: number;
  contact_phone?: string;
  contact_email?: string;
  has_ac: boolean;
  has_wifi: boolean;
  has_parking: boolean;
  has_restaurant: boolean;
  has_room_service: boolean;
  has_security: boolean;
  cover_image_url: string;
  check_in_time: string;
  check_out_time: string;
  room_types: string[];
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  district?: DistrictRecord;
  upazila?: UpazilaRecord;
  images?: HotelImageRecord[];
}

export interface RestaurantImageRecord {
  id: string;
  restaurant_id: string;
  image_url: string;
  dish_name?: string;
  caption?: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface RestaurantRecord {
  id: string;
  district_id: number;
  upazila_id?: number | null;
  name: string;
  name_bn: string;
  rating: number;
  reviews_count: number;
  cuisine: string;
  price_tier: '৳' | '৳৳' | '৳৳৳';
  location_address: string;
  lat?: number;
  lng?: number;
  contact_phone?: string;
  opening_hours?: string;
  menu_highlights: string[];
  cover_image_url: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  district?: DistrictRecord;
  upazila?: UpazilaRecord;
  images?: RestaurantImageRecord[];
}

export interface TransportTypeRecord {
  id: number;
  name: 'Bus' | 'Train' | 'Flight' | 'Launch' | 'Car';
  name_bn: string;
  icon: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TransportRouteRecord {
  id: string;
  transport_type_id: number;
  company: string;
  from_district_id: number;
  to_district_id: number;
  departure_time: string;
  arrival_time: string;
  duration: string;
  price_min: number;
  price_max: number;
  boarding_points: string[];
  dropping_points: string[];
  schedule_days: string;
  contact_phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  transport_type?: TransportTypeRecord;
  from_district?: DistrictRecord;
  to_district?: DistrictRecord;
}

export interface ShoppingPlaceRecord {
  id: string;
  district_id: number;
  upazila_id?: number | null;
  name: string;
  name_bn: string;
  category: string;
  location_address: string;
  lat?: number;
  lng?: number;
  famous_for?: string;
  opening_hours?: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  district?: DistrictRecord;
  upazila?: UpazilaRecord;
}

export interface RentalServiceRecord {
  id: string;
  district_id: number;
  provider_name: string;
  contact_phone: string;
  contact_email?: string;
  location_address: string;
  rating: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  district?: DistrictRecord;
  vehicles?: RentalVehicleRecord[];
}

export interface RentalVehicleRecord {
  id: string;
  rental_service_id: string;
  vehicle_type: 'Bike' | 'Car' | 'Microbus' | 'Chander Gari';
  model: string;
  rental_type: 'Self Drive' | 'With Driver' | 'Both';
  price_per_hour?: number | null;
  price_per_day: number;
  availability_status: 'Available' | 'Booked' | 'Under Maintenance';
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  rental_service?: RentalServiceRecord;
}

export interface ProfileRecord {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  avatar_url?: string | null;
  role: 'user' | 'admin' | 'partner';
  bio?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserPreferencesRecord {
  id: string;
  user_id: string;
  preferred_language: 'en' | 'bn';
  theme: 'light' | 'dark' | 'system';
  email_notifications: boolean;
  push_notifications: boolean;
  currency: 'BDT' | 'USD' | 'EUR' | 'GBP';
  created_at: string;
  updated_at: string;
}

export interface FavoriteRecord {
  id: string;
  user_id: string;
  item_type: 'destination' | 'hotel' | 'restaurant' | 'shopping' | 'rental' | 'route';
  item_id: string;
  item_data: Record<string, any>;
  created_at: string;
}

export interface ReviewRecord {
  id: string;
  user_id: string;
  target_type: 'destination' | 'hotel' | 'restaurant' | 'rental';
  target_id: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  author?: ProfileRecord;
}

export interface NotificationRecord {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'booking_confirmation' | 'booking_cancellation' | 'system' | 'promotional';
  is_read: boolean;
  metadata: Record<string, any>;
  created_at: string;
}

export interface BookingRecord {
  id: string;
  booking_number: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_status: 'unpaid' | 'paid' | 'refunded' | 'failed';
  payment_method?: string | null;
  contact_name: string;
  contact_phone: string;
  contact_email?: string | null;
  special_requests?: string | null;
  created_at: string;
  updated_at: string;
  items?: BookingItemRecord[];
  user?: ProfileRecord;
}

export interface BookingItemRecord {
  id: string;
  booking_id: string;
  item_type: 'hotel' | 'transport' | 'rental' | 'activity';
  item_id: string;
  title: string;
  start_date: string;
  end_date?: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  details: Record<string, any>;
  created_at: string;
}
