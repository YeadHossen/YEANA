import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  DivisionRecord,
  DistrictRecord,
  UpazilaRecord,
  DestinationRecord,
  HotelRecord,
  RestaurantRecord,
  TransportRouteRecord,
  TransportTypeRecord,
  ShoppingPlaceRecord,
  RentalVehicleRecord,
  FavoriteRecord,
  ReviewRecord,
  NotificationRecord,
  BookingRecord,
  BookingItemRecord,
} from '../types/database';
import {
  INITIAL_DISTRICTS,
  INITIAL_PLACES,
  INITIAL_HOTELS,
  INITIAL_RESTAURANTS,
  INITIAL_TRANSPORTS,
  INITIAL_SHOPPING,
  INITIAL_RIDES,
} from '../data/seedData';
import { BANGLADESH_UPAZILAS } from '../data/upazilaData';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 8 Divisions of Bangladesh
const LOCAL_DIVISIONS: DivisionRecord[] = [
  { id: 1, name: 'Dhaka', name_bn: 'ঢাকা', code: 'DHK', lat: 23.8103, lng: 90.4125, created_at: '', updated_at: '' },
  { id: 2, name: 'Chattogram', name_bn: 'চট্টগ্রাম', code: 'CTG', lat: 22.3569, lng: 91.7832, created_at: '', updated_at: '' },
  { id: 3, name: 'Sylhet', name_bn: 'সিলেট', code: 'SYL', lat: 24.8949, lng: 91.8687, created_at: '', updated_at: '' },
  { id: 4, name: 'Rajshahi', name_bn: 'রাজশাহী', code: 'RAJ', lat: 24.3745, lng: 88.6042, created_at: '', updated_at: '' },
  { id: 5, name: 'Khulna', name_bn: 'খুলনা', code: 'KHU', lat: 22.8456, lng: 89.5403, created_at: '', updated_at: '' },
  { id: 6, name: 'Barishal', name_bn: 'বরিশাল', code: 'BAR', lat: 22.7010, lng: 90.3535, created_at: '', updated_at: '' },
  { id: 7, name: 'Rangpur', name_bn: 'রংপুর', code: 'RAN', lat: 25.7439, lng: 89.2752, created_at: '', updated_at: '' },
  { id: 8, name: 'Mymensingh', name_bn: 'ময়মনসিংহ', code: 'MYM', lat: 24.7471, lng: 90.4203, created_at: '', updated_at: '' }
];

const LOCAL_TRANSPORT_TYPES: TransportTypeRecord[] = [
  { id: 1, name: 'Bus', name_bn: 'বাস', icon: 'Bus', description: 'Intercity AC and Non-AC luxury buses', is_active: true, created_at: '', updated_at: '' },
  { id: 2, name: 'Train', name_bn: 'ট্রেন', icon: 'Train', description: 'Bangladesh Railway intercity express trains', is_active: true, created_at: '', updated_at: '' },
  { id: 3, name: 'Flight', name_bn: 'বিমান', icon: 'Plane', description: 'Domestic flights connecting major airports', is_active: true, created_at: '', updated_at: '' },
  { id: 4, name: 'Launch', name_bn: 'লঞ্চ', icon: 'Ship', description: 'Luxury river cruises & passenger launches', is_active: true, created_at: '', updated_at: '' },
  { id: 5, name: 'Car', name_bn: 'প্রাইভেট কার', icon: 'Car', description: 'Rental tourist sedans and microbuses', is_active: true, created_at: '', updated_at: '' }
];

// Helper maps
const divisionNameToId: Record<string, number> = {
  Dhaka: 1, Chattogram: 2, Sylhet: 3, Rajshahi: 4, Khulna: 5, Barishal: 6, Rangpur: 7, Mymensingh: 8
};

const LOCAL_DISTRICTS: DistrictRecord[] = INITIAL_DISTRICTS.map((d, idx) => ({
  id: idx + 1,
  division_id: divisionNameToId[d.division] || 1,
  slug: d.id,
  name: d.name,
  name_bn: d.name_bn,
  description: d.description,
  image_url: d.image_url,
  lat: d.lat,
  lng: d.lng,
  popular_season: d.popular_season,
  created_at: '',
  updated_at: '',
  division: LOCAL_DIVISIONS.find(div => div.id === (divisionNameToId[d.division] || 1))
}));

const districtSlugToRecord = new Map(LOCAL_DISTRICTS.map(d => [d.slug, d]));

const LOCAL_DESTINATIONS: DestinationRecord[] = INITIAL_PLACES.map((p, idx) => {
  const dist = districtSlugToRecord.get(p.district_id) || LOCAL_DISTRICTS[0];
  return {
    id: `dest-${idx + 1}`,
    district_id: dist.id,
    name: p.name,
    name_bn: p.name_bn,
    category: p.category as any || 'Nature',
    short_description: p.short_description,
    full_description: p.full_description,
    location_address: p.location,
    lat: p.lat,
    lng: p.lng,
    entry_fee: 50,
    entry_fee_info: p.entry_fee,
    opening_time: p.opening_time,
    best_time_to_visit: p.best_time,
    how_to_reach: p.how_to_reach,
    cover_image_url: p.image_url,
    rating: p.rating,
    reviews_count: p.reviews_count,
    is_featured: p.is_featured || false,
    is_active: true,
    created_at: '',
    updated_at: '',
    district: dist,
    images: (p.gallery || [p.image_url]).map((url, imgIdx) => ({
      id: `img-${idx}-${imgIdx}`,
      destination_id: `dest-${idx + 1}`,
      image_url: url,
      caption: p.name,
      is_primary: imgIdx === 0,
      display_order: imgIdx + 1,
      created_at: ''
    }))
  };
});

const LOCAL_HOTELS: HotelRecord[] = INITIAL_HOTELS.map((h, idx) => {
  const dist = districtSlugToRecord.get(h.district_id) || LOCAL_DISTRICTS[0];
  return {
    id: `hotel-${idx + 1}`,
    district_id: dist.id,
    name: h.name,
    name_bn: h.name_bn,
    description: `Verified luxury stay in ${h.location}`,
    rating: h.rating,
    reviews_count: h.reviews_count,
    price_per_night: h.price_per_night,
    location_address: h.location,
    lat: (h as any).lat || dist.lat,
    lng: (h as any).lng || dist.lng,
    contact_phone: h.contact_phone,
    contact_email: h.contact_email,
    has_ac: h.has_ac ?? true,
    has_wifi: h.has_wifi ?? true,
    has_parking: h.has_parking ?? true,
    has_restaurant: h.has_restaurant ?? true,
    has_room_service: h.has_room_service ?? true,
    has_security: h.has_security ?? true,
    cover_image_url: h.image_url,
    check_in_time: h.check_in || '12:00 PM',
    check_out_time: h.check_out || '11:00 AM',
    room_types: (h.room_types || []).map((r: any) => typeof r === 'string' ? r : r.name),
    is_featured: h.is_featured || false,
    is_active: true,
    created_at: '',
    updated_at: '',
    district: dist,
    images: (h.gallery || [h.image_url]).map((url, imgIdx) => ({
      id: `himg-${idx}-${imgIdx}`,
      hotel_id: `hotel-${idx + 1}`,
      image_url: url,
      is_primary: imgIdx === 0,
      display_order: imgIdx + 1,
      created_at: ''
    }))
  };
});

const LOCAL_RESTAURANTS: RestaurantRecord[] = INITIAL_RESTAURANTS.map((r, idx) => {
  const dist = districtSlugToRecord.get(r.district_id) || LOCAL_DISTRICTS[0];
  return {
    id: `rest-${idx + 1}`,
    district_id: dist.id,
    name: r.name,
    name_bn: r.name_bn,
    rating: r.rating,
    reviews_count: r.reviews_count,
    cuisine: r.cuisine,
    price_tier: (r.price_tier || '৳৳') as any,
    location_address: r.location,
    lat: (r as any).lat || dist.lat,
    lng: (r as any).lng || dist.lng,
    contact_phone: r.phone,
    opening_hours: r.opening_hours,
    menu_highlights: r.menu_highlights || [],
    cover_image_url: r.image_url,
    is_featured: r.is_featured || false,
    is_active: true,
    created_at: '',
    updated_at: '',
    district: dist
  };
});

const LOCAL_ROUTES: TransportRouteRecord[] = INITIAL_TRANSPORTS.map((t, idx) => {
  const fromDistSlug = t.from_district.toLowerCase().replace(/['\s]/g, '-');
  const toDistSlug = t.to_district.toLowerCase().replace(/['\s]/g, '-');
  const fromDist = districtSlugToRecord.get(fromDistSlug) || LOCAL_DISTRICTS[0];
  const toDist = districtSlugToRecord.get(toDistSlug) || LOCAL_DISTRICTS[1];
  const typeMap: Record<string, number> = { Bus: 1, Train: 2, Flight: 3, Launch: 4, Car: 5 };
  const typeId = typeMap[t.transport_type] || 1;

  return {
    id: `route-${idx + 1}`,
    transport_type_id: typeId,
    company: t.company,
    from_district_id: fromDist.id,
    to_district_id: toDist.id,
    departure_time: t.departure_time,
    arrival_time: t.arrival_time,
    duration: t.duration,
    price_min: t.price_min,
    price_max: t.price_max,
    boarding_points: t.boarding_points || [],
    dropping_points: [],
    schedule_days: t.schedule_days || 'Daily',
    contact_phone: t.contact_phone,
    is_active: true,
    created_at: '',
    updated_at: '',
    transport_type: LOCAL_TRANSPORT_TYPES.find(item => item.id === typeId),
    from_district: fromDist,
    to_district: toDist
  };
});

export const MobileApiService = {
  // 1. Geography
  async getDivisions(): Promise<DivisionRecord[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('divisions').select('*').order('id');
        if (!error && data && data.length > 0) return data;
      } catch (e) {}
    }
    return LOCAL_DIVISIONS;
  },

  async getDistricts(divisionId?: number): Promise<DistrictRecord[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let q = supabase.from('districts').select('*, division:divisions(*)').order('name');
        if (divisionId) q = q.eq('division_id', divisionId);
        const { data, error } = await q;
        if (!error && data && data.length > 0) return data;
      } catch (e) {}
    }
    if (divisionId) {
      return LOCAL_DISTRICTS.filter(d => d.division_id === divisionId);
    }
    return LOCAL_DISTRICTS;
  },

  async getUpazilas(districtId?: number): Promise<UpazilaRecord[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let q = supabase.from('upazilas').select('*').order('name');
        if (districtId) q = q.eq('district_id', districtId);
        const { data, error } = await q;
        if (!error && data && data.length > 0) return data;
      } catch (e) {}
    }
    return BANGLADESH_UPAZILAS.map((u, idx) => ({
      id: idx + 1,
      district_id: districtSlugToRecord.get(u.districtId)?.id || 1,
      slug: u.id,
      name: u.name,
      name_bn: u.name_bn,
      lat: u.lat,
      lng: u.lng,
      popular_tag: u.popular_tag,
      has_railway: !!u.hasRailway,
      has_launch_ghat: !!u.hasLaunchGhat,
      transit_hub_type: u.transitHubType,
      created_at: '',
      updated_at: ''
    })).filter(u => !districtId || u.district_id === districtId);
  },

  // 2. Destinations
  async getDestinations(options?: {
    districtId?: number;
    category?: string;
    search?: string;
    featuredOnly?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ data: DestinationRecord[]; count: number }> {
    if (isSupabaseConfigured && supabase) {
      try {
        const page = options?.page || 1;
        const limit = options?.limit || 20;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let q = supabase
          .from('destinations')
          .select('*, district:districts(*), upazila:upazilas(*), images:destination_images(*)', { count: 'exact' })
          .eq('is_active', true);

        if (options?.districtId) q = q.eq('district_id', options.districtId);
        if (options?.category) q = q.eq('category', options.category);
        if (options?.featuredOnly) q = q.eq('is_featured', true);
        if (options?.search) {
          q = q.or(`name.ilike.%${options.search}%,name_bn.ilike.%${options.search}%`);
        }

        q = q.order('rating', { ascending: false }).range(from, to);
        const { data, count, error } = await q;
        if (!error && data && data.length > 0) {
          return { data, count: count || data.length };
        }
      } catch (e) {}
    }

    // Local fallback
    let list = [...LOCAL_DESTINATIONS];
    if (options?.districtId) list = list.filter(d => d.district_id === options.districtId);
    if (options?.category && options.category !== 'All') list = list.filter(d => d.category.toLowerCase() === options.category?.toLowerCase());
    if (options?.featuredOnly) list = list.filter(d => d.is_featured);
    if (options?.search) {
      const q = options.search.toLowerCase();
      list = list.filter(d => d.name.toLowerCase().includes(q) || d.name_bn.includes(q) || d.location_address.toLowerCase().includes(q));
    }

    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const start = (page - 1) * limit;
    const paged = list.slice(start, start + limit);
    return { data: paged, count: list.length };
  },

  async getDestinationById(id: string): Promise<DestinationRecord | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('destinations')
          .select('*, district:districts(*), upazila:upazilas(*), images:destination_images(*)')
          .eq('id', id)
          .single();
        if (!error && data) return data;
      } catch (e) {}
    }
    return LOCAL_DESTINATIONS.find(d => d.id === id) || LOCAL_DESTINATIONS[0] || null;
  },

  // 3. Hotels
  async getHotels(options?: {
    districtId?: number;
    maxPrice?: number;
    minRating?: number;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: HotelRecord[]; count: number }> {
    if (isSupabaseConfigured && supabase) {
      try {
        const page = options?.page || 1;
        const limit = options?.limit || 20;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let q = supabase
          .from('hotels')
          .select('*, district:districts(*), upazila:upazilas(*), images:hotel_images(*)', { count: 'exact' })
          .eq('is_active', true);

        if (options?.districtId) q = q.eq('district_id', options.districtId);
        if (options?.maxPrice) q = q.lte('price_per_night', options.maxPrice);
        if (options?.minRating) q = q.gte('rating', options.minRating);
        if (options?.search) {
          q = q.or(`name.ilike.%${options.search}%,location_address.ilike.%${options.search}%`);
        }

        q = q.order('rating', { ascending: false }).range(from, to);
        const { data, count, error } = await q;
        if (!error && data && data.length > 0) {
          return { data, count: count || data.length };
        }
      } catch (e) {}
    }

    let list = [...LOCAL_HOTELS];
    if (options?.districtId) list = list.filter(h => h.district_id === options.districtId);
    if (options?.maxPrice !== undefined) list = list.filter(h => h.price_per_night <= options.maxPrice!);
    if (options?.minRating !== undefined) list = list.filter(h => h.rating >= options.minRating!);
    if (options?.search) {
      const q = options.search.toLowerCase();
      list = list.filter(h => h.name.toLowerCase().includes(q) || h.location_address.toLowerCase().includes(q));
    }
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const start = (page - 1) * limit;
    return { data: list.slice(start, start + limit), count: list.length };
  },

  // 4. Restaurants
  async getRestaurants(options?: {
    districtId?: number;
    cuisine?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: RestaurantRecord[]; count: number }> {
    if (isSupabaseConfigured && supabase) {
      try {
        const page = options?.page || 1;
        const limit = options?.limit || 20;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let q = supabase
          .from('restaurants')
          .select('*, district:districts(*), images:restaurant_images(*)', { count: 'exact' })
          .eq('is_active', true);

        if (options?.districtId) q = q.eq('district_id', options.districtId);
        if (options?.cuisine) q = q.ilike('cuisine', `%${options.cuisine}%`);
        if (options?.search) {
          q = q.or(`name.ilike.%${options.search}%,cuisine.ilike.%${options.search}%`);
        }

        q = q.order('rating', { ascending: false }).range(from, to);
        const { data, count, error } = await q;
        if (!error && data && data.length > 0) {
          return { data, count: count || data.length };
        }
      } catch (e) {}
    }

    let list = [...LOCAL_RESTAURANTS];
    if (options?.districtId) list = list.filter(r => r.district_id === options.districtId);
    if (options?.cuisine) list = list.filter(r => r.cuisine.toLowerCase().includes(options.cuisine!.toLowerCase()));
    if (options?.search) {
      const q = options.search.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
    }
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const start = (page - 1) * limit;
    return { data: list.slice(start, start + limit), count: list.length };
  },

  // 5. Transports
  async getTransportTypes(): Promise<TransportTypeRecord[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('transport_types').select('*').eq('is_active', true).order('id');
        if (!error && data && data.length > 0) return data;
      } catch (e) {}
    }
    return LOCAL_TRANSPORT_TYPES;
  },

  async getTransportRoutes(params?: {
    transportTypeId?: number;
    fromDistrictId?: number;
    toDistrictId?: number;
  }): Promise<TransportRouteRecord[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let q = supabase
          .from('transport_routes')
          .select('*, transport_type:transport_types(*), from_district:districts!from_district_id(*), to_district:districts!to_district_id(*)')
          .eq('is_active', true);

        if (params?.transportTypeId) q = q.eq('transport_type_id', params.transportTypeId);
        if (params?.fromDistrictId) q = q.eq('from_district_id', params.fromDistrictId);
        if (params?.toDistrictId) q = q.eq('to_district_id', params.toDistrictId);

        const { data, error } = await q.order('price_min', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (e) {}
    }

    let list = [...LOCAL_ROUTES];
    if (params?.transportTypeId) list = list.filter(r => r.transport_type_id === params.transportTypeId);
    return list;
  },

  // 6. Shopping & Rentals
  async getShoppingPlaces(districtId?: number): Promise<ShoppingPlaceRecord[]> {
    return [];
  },

  async getRentalVehicles(districtId?: number): Promise<RentalVehicleRecord[]> {
    return [];
  },

  // 7. Favorites (Local storage persistence when offline)
  async getFavorites(userId: string): Promise<FavoriteRecord[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('favorites').select('*').eq('user_id', userId);
        if (!error && data) return data;
      } catch (e) {}
    }

    try {
      const stored = await AsyncStorage.getItem(`yeana_favs_${userId}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  async toggleFavorite(userId: string, itemType: FavoriteRecord['item_type'], itemId: string, itemData: any): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: existing } = await supabase
          .from('favorites')
          .select('id')
          .eq('user_id', userId)
          .eq('item_type', itemType)
          .eq('item_id', itemId)
          .maybeSingle();

        if (existing) {
          await supabase.from('favorites').delete().eq('id', existing.id);
          return false;
        } else {
          await supabase.from('favorites').insert({
            user_id: userId,
            item_type: itemType,
            item_id: itemId,
            item_data: itemData
          });
          return true;
        }
      } catch (e) {}
    }

    try {
      const stored = await AsyncStorage.getItem(`yeana_favs_${userId}`);
      let list: FavoriteRecord[] = stored ? JSON.parse(stored) : [];
      const idx = list.findIndex(f => f.item_id === itemId && f.item_type === itemType);
      if (idx >= 0) {
        list.splice(idx, 1);
        await AsyncStorage.setItem(`yeana_favs_${userId}`, JSON.stringify(list));
        return false;
      } else {
        list.push({
          id: `fav-${Date.now()}`,
          user_id: userId,
          item_type: itemType,
          item_id: itemId,
          item_data: itemData,
          created_at: new Date().toISOString()
        });
        await AsyncStorage.setItem(`yeana_favs_${userId}`, JSON.stringify(list));
        return true;
      }
    } catch {
      return true;
    }
  },

  // 8. Reviews
  async getReviews(targetType: string, targetId: string): Promise<ReviewRecord[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*, author:profiles(*)')
          .eq('target_type', targetType)
          .eq('target_id', targetId)
          .eq('is_approved', true)
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (e) {}
    }

    return [
      {
        id: 'rev-1',
        user_id: 'usr-1',
        target_type: targetType as any,
        target_id: targetId,
        rating: 5,
        comment: 'Absolutely breathtaking! The views and natural serenity exceeded all expectations.',
        is_approved: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author: { id: 'usr-1', full_name: 'Tanvir Ahmed', email: 'tanvir@yeana.bd', role: 'user', is_active: true, created_at: '', updated_at: '' }
      },
      {
        id: 'rev-2',
        user_id: 'usr-2',
        target_type: targetType as any,
        target_id: targetId,
        rating: 5,
        comment: 'Very safe for family travel. Local transport was readily available and people were hospitable.',
        is_approved: true,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        author: { id: 'usr-2', full_name: 'Farzana Yasmin', email: 'farzana@yeana.bd', role: 'user', is_active: true, created_at: '', updated_at: '' }
      }
    ];
  },

  async addReview(review: {
    userId: string;
    targetType: ReviewRecord['target_type'];
    targetId: string;
    rating: number;
    comment: string;
  }): Promise<ReviewRecord> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .insert({
            user_id: review.userId,
            target_type: review.targetType,
            target_id: review.targetId,
            rating: review.rating,
            comment: review.comment,
            is_approved: true
          })
          .select()
          .single();
        if (!error && data) return data;
      } catch (e) {}
    }

    return {
      id: `rev-${Date.now()}`,
      user_id: review.userId,
      target_type: review.targetType,
      target_id: review.targetId,
      rating: review.rating,
      comment: review.comment,
      is_approved: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: { id: review.userId, full_name: 'You', email: 'you@yeana.bd', role: 'user', is_active: true, created_at: '', updated_at: '' }
    };
  },

  // 9. Bookings (Local persistence in AsyncStorage)
  async createBooking(booking: {
    userId: string;
    totalAmount: number;
    contactName: string;
    contactPhone: string;
    contactEmail?: string;
    specialRequests?: string;
    items: Array<{
      itemType: BookingItemRecord['item_type'];
      itemId: string;
      title: string;
      startDate: string;
      endDate?: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      details?: any;
    }>;
  }): Promise<BookingRecord> {
    const bookingNumber = 'YN-' + Math.floor(100000 + Math.random() * 900000);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data: bookingData, error: bookingErr } = await supabase
          .from('bookings')
          .insert({
            booking_number: bookingNumber,
            user_id: booking.userId,
            total_amount: booking.totalAmount,
            status: 'confirmed',
            payment_status: 'unpaid',
            contact_name: booking.contactName,
            contact_phone: booking.contactPhone,
            contact_email: booking.contactEmail,
            special_requests: booking.specialRequests
          })
          .select()
          .single();

        if (!bookingErr && bookingData) {
          if (booking.items && booking.items.length > 0) {
            const itemsToInsert = booking.items.map(item => ({
              booking_id: bookingData.id,
              item_type: item.itemType,
              item_id: item.itemId,
              title: item.title,
              start_date: item.startDate,
              end_date: item.endDate,
              quantity: item.quantity,
              unit_price: item.unitPrice,
              total_price: item.totalPrice,
              details: item.details || {}
            }));
            await supabase.from('booking_items').insert(itemsToInsert);
          }
          return bookingData;
        }
      } catch (e) {}
    }

    const localBooking: BookingRecord = {
      id: `book-${Date.now()}`,
      booking_number: bookingNumber,
      user_id: booking.userId,
      total_amount: booking.totalAmount,
      status: 'confirmed',
      payment_status: 'unpaid',
      contact_name: booking.contactName,
      contact_phone: booking.contactPhone,
      contact_email: booking.contactEmail || '',
      special_requests: booking.specialRequests || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: (booking.items || []).map((it, i) => ({
        id: `item-${Date.now()}-${i}`,
        booking_id: `book-${Date.now()}`,
        item_type: it.itemType,
        item_id: it.itemId,
        title: it.title,
        start_date: it.startDate,
        end_date: it.endDate || null,
        quantity: it.quantity,
        unit_price: it.unitPrice,
        total_price: it.totalPrice,
        details: it.details || {},
        created_at: new Date().toISOString()
      }))
    };

    try {
      const stored = await AsyncStorage.getItem(`yeana_bookings_${booking.userId}`);
      const list: BookingRecord[] = stored ? JSON.parse(stored) : [];
      list.unshift(localBooking);
      await AsyncStorage.setItem(`yeana_bookings_${booking.userId}`, JSON.stringify(list));
    } catch (e) {}

    return localBooking;
  },

  async getUserBookings(userId: string): Promise<BookingRecord[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*, items:booking_items(*)')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (e) {}
    }

    try {
      const stored = await AsyncStorage.getItem(`yeana_bookings_${userId}`);
      return stored ? JSON.parse(stored) : [
        {
          id: 'b-demo-1',
          booking_number: 'YN-TR-849102',
          user_id: userId,
          total_amount: 3500,
          status: 'confirmed',
          payment_status: 'paid',
          contact_name: 'Anika Rahman',
          contact_phone: '01712-345678',
          created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
          updated_at: new Date().toISOString(),
          items: [
            {
              id: 'bi-1',
              booking_id: 'b-demo-1',
              item_type: 'hotel',
              item_id: 'hotel-1',
              title: 'Grand Sultan Tea Resort (Deluxe King Room)',
              start_date: '2026-10-15',
              end_date: '2026-10-17',
              quantity: 1,
              unit_price: 3500,
              total_price: 3500,
              details: { location: 'Sreemangal, Moulvibazar' },
              created_at: new Date().toISOString()
            }
          ]
        }
      ];
    } catch {
      return [];
    }
  },

  // 10. Notifications
  async getNotifications(userId: string): Promise<NotificationRecord[]> {
    return [
      {
        id: 'notif-1',
        user_id: userId,
        title: 'Welcome to YEANA Bangladesh!',
        message: 'Explore 64 districts, verified hotel stays, and authentic regional delicacies.',
        type: 'system',
        is_read: false,
        metadata: {},
        created_at: new Date().toISOString()
      }
    ];
  }
};
