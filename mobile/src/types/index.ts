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

export type HotelStarRating = 2 | 3 | 4 | 5;
export type PropertyCategory = 
  | '5-Star Luxury' 
  | '4-Star Premium' 
  | '3-Star Comfort' 
  | '2-Star Budget' 
  | 'Luxury Resort & Spa'
  | 'Resort & Spa' 
  | 'Eco-Resort & Cottage' 
  | 'Guest House / Dakbangla'
  | 'Water Villa & Houseboat';

export interface HotelRoomType {
  name: string;
  name_bn?: string;
  price: number;
  bed: string;
  capacity: string;
  is_ac: boolean;
  image_url?: string;
  total_rooms?: number;
  available_rooms?: number;
  booked_rooms?: number;
  amenities?: string[];
}

export interface Hotel {
  id: string;
  district_id: string;
  district_name?: string;
  upazila_id?: string;
  upazila_name?: string;
  upazila_name_bn?: string;
  pouroshava_or_thana?: string;
  division?: Division;
  name: string;
  name_bn: string;
  star_category?: HotelStarRating;
  property_category?: PropertyCategory;
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
  has_swimming_pool?: boolean;
  has_gym?: boolean;
  has_breakfast?: boolean;
  has_hill_view?: boolean;
  has_sea_view?: boolean;
  has_lake_view?: boolean;
  image_url: string;
  gallery: string[];
  room_types: string[] | HotelRoomType[];
  check_in: string;
  check_out: string;
  is_featured?: boolean;
  description?: string;
  nearby_attractions?: string[];
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

export type TransportType = 'Bus' | 'Train' | 'Flight' | 'Car' | 'Launch' | 'Local';

export type LocalVehicleCategory = 
  | 'chander_gari'     // 4x4 Hill Safari Jeep (Sajek, Bandarban, Nilgiri)
  | 'cng'              // 3-Wheeler Auto-Rickshaw (Intracity & Upazila)
  | 'easy_bike'        // Electric Battery Auto / TomTom
  | 'leguna'           // Human Hauler / Local Feeder Pickup
  | 'boat_trawler'     // Tourist Engine Boat / Trawler / Speedboat (Haor / River)
  | 'bike_ride'        // Local Motorcycle / Haor Trail Rider
  | 'rickshaw';        // Traditional Heritage Rickshaw

export interface TransportRoute {
  id: string;
  transport_type: TransportType;
  local_category?: LocalVehicleCategory;
  local_vehicle_name?: string;
  company: string;
  from_district: string;
  to_district: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  price_min: number;
  price_max: number;
  reserve_price?: number;
  is_reserve_available?: boolean;
  capacity_seats?: number;
  boarding_points: string[];
  dropping_points?: string[];
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

export type Shopping = ShoppingPlace;

export interface Ride {
  id: string;
  district_id: string;
  district_name?: string;
  vehicle_type: 'Bike' | 'Car' | 'Sedan' | 'Microbus' | 'Chander Gari' | 'Boat';
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

export type SpecialtyCategory = 
  | 'Dress & Handloom' 
  | 'Food & Sweet' 
  | 'Folk Craft & Souvenir' 
  | 'Natural Produce';

export interface LocalSpecialtyItem {
  id: string;
  district_id: string;
  district_name: string;
  division?: Division;
  name: string;
  name_bn: string;
  category: SpecialtyCategory;
  category_bn?: string;
  is_gi_tagged?: boolean;
  gi_tag_year?: string;
  origin_story: string;
  origin_story_bn?: string;
  price_range: string;
  best_market_or_spot: string;
  best_market_or_spot_bn?: string;
  authenticity_tip: string;
  authenticity_tip_bn?: string;
  image_url: string;
  seasonality?: string;
  tags: string[];
}

export type FavoriteType = 'place' | 'hotel' | 'restaurant' | 'shopping' | 'ride' | 'specialty';

export interface FavoriteItem {
  id: string;
  user_id?: string;
  item_type: FavoriteType;
  item_id: string;
  item_data: Place | Hotel | Restaurant | ShoppingPlace | Ride | LocalSpecialtyItem;
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

// Traveler Choices & Selection Payload
export interface TravelerChoicePayload {
  destination?: string;
  district_name?: string;
  selected_places?: { id: string; name: string; category?: string }[];
  selected_hotel?: { id: string; name: string; room_type?: string; price_per_night?: number };
  selected_ride?: { id: string; title: string; vehicle_type?: string; estimated_cost?: number };
  selected_specialties?: { id: string; name: string; category?: string; price_range?: string }[];
  travel_dates?: { start_date?: string; end_date?: string; duration_days?: number };
  group_size?: number;
  budget_range?: string;
  special_notes?: string;
}

export type MessageSenderRole = 'traveler' | 'admin';

export interface ChatMessage {
  id: string;
  inquiry_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: MessageSenderRole;
  sender_avatar?: string;
  message: string;
  timestamp: string;
  is_read: boolean;
  attachment_type?: 'choices' | 'quote' | 'status_update' | 'general';
  attachment_data?: TravelerChoicePayload;
}

export type InquiryCategory = 
  | 'trip_planning' 
  | 'hotel_booking' 
  | 'ride_assistance' 
  | 'specialty_order' 
  | 'custom_package'
  | 'general';

export type InquiryStatus = 
  | 'new' 
  | 'in_progress' 
  | 'confirmed' 
  | 'resolved' 
  | 'cancelled';

export interface TravelerInquiry {
  id: string;
  traveler_id: string;
  traveler_name: string;
  traveler_email: string;
  traveler_phone?: string;
  traveler_avatar?: string;
  subject: string;
  category: InquiryCategory;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
  last_message: string;
  unread_for_admin: number;
  unread_for_traveler: number;
  traveler_choices?: TravelerChoicePayload;
  messages: ChatMessage[];
  admin_notes?: string;
}

// ==========================================
// KEEP NOTES & TRAVEL EXPENSES TYPES
// ==========================================

export type ExpenseCategory = 
  | 'food' 
  | 'transport' 
  | 'hotel' 
  | 'shopping' 
  | 'activities' 
  | 'ride' 
  | 'emergency' 
  | 'tips' 
  | 'other';

export type PaymentMethod = 
  | 'cash' 
  | 'bkash' 
  | 'nagad' 
  | 'card' 
  | 'other';

export interface TravelExpense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  time?: string;
  payment_method: PaymentMethod;
  payer_name?: string;
  split_count?: number;
  location?: string;
  notes?: string;
  created_at: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export type NoteCategory = 
  | 'general' 
  | 'places' 
  | 'food' 
  | 'emergency' 
  | 'tips' 
  | 'packing' 
  | 'diary';

export type NoteColor = 
  | 'emerald' 
  | 'sky' 
  | 'amber' 
  | 'rose' 
  | 'purple' 
  | 'slate';

export interface TravelNote {
  id: string;
  title: string;
  content: string;
  category: NoteCategory;
  color: NoteColor;
  is_pinned: boolean;
  has_checklist: boolean;
  checklist_items: ChecklistItem[];
  location_tag?: string;
  created_at: string;
  updated_at: string;
}

export interface GroupSplitMember {
  id: string;
  name: string;
  paid_amount: number;
}

// ==========================================
// TRANSPORT & HOTEL BOOKING SYSTEM TYPES
// ==========================================

export type BookingStatus = 'confirmed' | 'checked_in' | 'boarded' | 'completed' | 'cancelled';

export interface TransportBooking {
  id: string;
  route_id: string;
  route?: TransportRoute;
  company: string;
  transport_type: TransportType;
  from_district: string;
  to_district: string;
  departure_time: string;
  travel_date: string;
  selected_seats: string[];
  seat_count: number;
  is_full_reserve: boolean;
  passenger_name: string;
  passenger_phone: string;
  passenger_email: string;
  passenger_gender: 'Male' | 'Female' | 'Other';
  boarding_point: string;
  dropping_point: string;
  total_fare: number;
  payment_method?: 'card' | 'bkash' | 'rocket' | 'nogod';
  transaction_id?: string;
  status: BookingStatus;
  booked_at: string;
}

export interface HotelBooking {
  id: string;
  hotel_id: string;
  hotel_name: string;
  hotel_image?: string;
  district_name: string;
  room_type: string;
  room_count: number;
  guest_count: number;
  check_in_date: string;
  check_out_date: string;
  nights: number;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  total_cost: number;
  status: BookingStatus;
  special_requests?: string;
  booked_at: string;
}

export interface SeatInventoryItem {
  id: string;
  route_id: string;
  travel_date: string;
  seat_id: string;
  status: 'available' | 'booked' | 'blocked' | 'female_reserved';
  booking_id?: string;
  passenger_name?: string;
  passenger_phone?: string;
  blocked_reason?: string;
  updated_at?: string;
}

export interface RoomInventoryItem {
  id: string;
  hotel_id: string;
  room_type: string;
  total_rooms: number;
  available_rooms: number;
  booked_rooms: number;
  blocked_rooms: number;
  price_per_night: number;
  updated_at?: string;
}

export interface CompanyPortalStats {
  transport: {
    totalBookings: number;
    seatsSold: number;
    revenue: number;
    totalRoutes: number;
  };
  hotel: {
    totalBookings: number;
    roomsBooked: number;
    revenue: number;
    totalProperties: number;
  };
  summary: {
    totalRevenue: number;
    totalCompanies: number;
  };
}



