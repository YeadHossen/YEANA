// ========================================================================
// YEANA — Supabase Data Service (TypeScript)
// High-performance typed queries, pagination, relation joins, and CRUD
// ========================================================================

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  DivisionRecord,
  DistrictRecord,
  UpazilaRecord,
  DestinationRecord,
  DestinationImageRecord,
  HotelRecord,
  HotelImageRecord,
  RestaurantRecord,
  RestaurantImageRecord,
  TransportTypeRecord,
  TransportRouteRecord,
  ShoppingPlaceRecord,
  RentalServiceRecord,
  RentalVehicleRecord,
  ProfileRecord,
  UserPreferencesRecord,
  FavoriteRecord,
  ReviewRecord,
  NotificationRecord,
  BookingRecord,
  BookingItemRecord
} from '../types/database';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  count: number | null;
  page: number;
  limit: number;
  totalPages: number;
}

export const SupabaseService = {
  // ======================================================================
  // 1. LOCATION HIERARCHY
  // ======================================================================
  async getDivisions(): Promise<DivisionRecord[]> {
    if (!isSupabaseConfigured || !supabase) return [];
    const { data, error } = await supabase
      .from('divisions')
      .select('*')
      .order('id', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getDistricts(divisionId?: number): Promise<DistrictRecord[]> {
    if (!isSupabaseConfigured || !supabase) return [];
    let query = supabase.from('districts').select('*, division:divisions(*)').order('name', { ascending: true });
    if (divisionId) {
      query = query.eq('division_id', divisionId);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async getUpazilas(districtId?: number): Promise<UpazilaRecord[]> {
    if (!isSupabaseConfigured || !supabase) return [];
    let query = supabase.from('upazilas').select('*').order('name', { ascending: true });
    if (districtId) {
      query = query.eq('district_id', districtId);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // ======================================================================
  // 2. DESTINATIONS (TOURISM)
  // ======================================================================
  async getDestinations(params?: {
    districtId?: number;
    upazilaId?: number;
    category?: string;
    search?: string;
    isFeatured?: boolean;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResult<DestinationRecord>> {
    if (!isSupabaseConfigured || !supabase) {
      return { data: [], count: 0, page: 1, limit: 20, totalPages: 0 };
    }

    const page = Math.max(1, params?.page || 1);
    const limit = Math.min(50, Math.max(1, params?.limit || 20));
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('destinations')
      .select('*, district:districts(*), upazila:upazilas(*), images:destination_images(*)', { count: 'exact' })
      .eq('is_active', true);

    if (params?.districtId) query = query.eq('district_id', params.districtId);
    if (params?.upazilaId) query = query.eq('upazila_id', params.upazilaId);
    if (params?.category) query = query.eq('category', params.category);
    if (params?.isFeatured !== undefined) query = query.eq('is_featured', params.isFeatured);
    if (params?.search) {
      query = query.or(`name.ilike.%${params.search}%,name_bn.ilike.%${params.search}%,short_description.ilike.%${params.search}%`);
    }

    query = query.order('rating', { ascending: false }).range(from, to);

    const { data, count, error } = await query;
    if (error) throw error;

    const totalCount = count || 0;
    return {
      data: data || [],
      count: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit)
    };
  },

  async getDestinationById(id: string): Promise<DestinationRecord | null> {
    if (!isSupabaseConfigured || !supabase) return null;
    const { data, error } = await supabase
      .from('destinations')
      .select('*, district:districts(*), upazila:upazilas(*), images:destination_images(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createDestination(dest: Partial<DestinationRecord>): Promise<DestinationRecord> {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.from('destinations').insert(dest).select().single();
    if (error) throw error;
    return data;
  },

  async updateDestination(id: string, updates: Partial<DestinationRecord>): Promise<DestinationRecord> {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.from('destinations').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async deleteDestination(id: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const { error } = await supabase.from('destinations').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // ======================================================================
  // 3. HOTELS
  // ======================================================================
  async getHotels(params?: {
    districtId?: number;
    upazilaId?: number;
    maxPrice?: number;
    minRating?: number;
    search?: string;
    isFeatured?: boolean;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResult<HotelRecord>> {
    if (!isSupabaseConfigured || !supabase) {
      return { data: [], count: 0, page: 1, limit: 20, totalPages: 0 };
    }

    const page = Math.max(1, params?.page || 1);
    const limit = Math.min(50, Math.max(1, params?.limit || 20));
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('hotels')
      .select('*, district:districts(*), upazila:upazilas(*), images:hotel_images(*)', { count: 'exact' })
      .eq('is_active', true);

    if (params?.districtId) query = query.eq('district_id', params.districtId);
    if (params?.upazilaId) query = query.eq('upazila_id', params.upazilaId);
    if (params?.maxPrice) query = query.lte('price_per_night', params.maxPrice);
    if (params?.minRating) query = query.gte('rating', params.minRating);
    if (params?.isFeatured !== undefined) query = query.eq('is_featured', params.isFeatured);
    if (params?.search) {
      query = query.or(`name.ilike.%${params.search}%,name_bn.ilike.%${params.search}%,location_address.ilike.%${params.search}%`);
    }

    query = query.order('rating', { ascending: false }).range(from, to);

    const { data, count, error } = await query;
    if (error) throw error;

    const totalCount = count || 0;
    return {
      data: data || [],
      count: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit)
    };
  },

  async getHotelById(id: string): Promise<HotelRecord | null> {
    if (!isSupabaseConfigured || !supabase) return null;
    const { data, error } = await supabase
      .from('hotels')
      .select('*, district:districts(*), upazila:upazilas(*), images:hotel_images(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  // ======================================================================
  // 4. RESTAURANTS
  // ======================================================================
  async getRestaurants(params?: {
    districtId?: number;
    cuisine?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResult<RestaurantRecord>> {
    if (!isSupabaseConfigured || !supabase) {
      return { data: [], count: 0, page: 1, limit: 20, totalPages: 0 };
    }

    const page = Math.max(1, params?.page || 1);
    const limit = Math.min(50, Math.max(1, params?.limit || 20));
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('restaurants')
      .select('*, district:districts(*), images:restaurant_images(*)', { count: 'exact' })
      .eq('is_active', true);

    if (params?.districtId) query = query.eq('district_id', params.districtId);
    if (params?.cuisine) query = query.ilike('cuisine', `%${params.cuisine}%`);
    if (params?.search) {
      query = query.or(`name.ilike.%${params.search}%,name_bn.ilike.%${params.search}%,cuisine.ilike.%${params.search}%`);
    }

    query = query.order('rating', { ascending: false }).range(from, to);

    const { data, count, error } = await query;
    if (error) throw error;

    const totalCount = count || 0;
    return {
      data: data || [],
      count: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit)
    };
  },

  // ======================================================================
  // 5. TRANSPORT
  // ======================================================================
  async getTransportTypes(): Promise<TransportTypeRecord[]> {
    if (!isSupabaseConfigured || !supabase) return [];
    const { data, error } = await supabase.from('transport_types').select('*').eq('is_active', true).order('id');
    if (error) throw error;
    return data || [];
  },

  async getTransportRoutes(params?: {
    transportTypeId?: number;
    fromDistrictId?: number;
    toDistrictId?: number;
  }): Promise<TransportRouteRecord[]> {
    if (!isSupabaseConfigured || !supabase) return [];
    let query = supabase
      .from('transport_routes')
      .select('*, transport_type:transport_types(*), from_district:districts!from_district_id(*), to_district:districts!to_district_id(*)')
      .eq('is_active', true);

    if (params?.transportTypeId) query = query.eq('transport_type_id', params.transportTypeId);
    if (params?.fromDistrictId) query = query.eq('from_district_id', params.fromDistrictId);
    if (params?.toDistrictId) query = query.eq('to_district_id', params.toDistrictId);

    const { data, error } = await query.order('price_min', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  // ======================================================================
  // 6. SHOPPING & RENTALS
  // ======================================================================
  async getShoppingPlaces(params?: { districtId?: number; category?: string }): Promise<ShoppingPlaceRecord[]> {
    if (!isSupabaseConfigured || !supabase) return [];
    let query = supabase.from('shopping_places').select('*, district:districts(*)').eq('is_active', true);
    if (params?.districtId) query = query.eq('district_id', params.districtId);
    if (params?.category) query = query.eq('category', params.category);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getRentalServices(params?: { districtId?: number }): Promise<RentalServiceRecord[]> {
    if (!isSupabaseConfigured || !supabase) return [];
    let query = supabase.from('rental_services').select('*, district:districts(*), vehicles:rental_vehicles(*)').eq('is_active', true);
    if (params?.districtId) query = query.eq('district_id', params.districtId);
    const { data, error } = await query.order('rating', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  // ======================================================================
  // 7. USER FEATURES (FAVORITES, REVIEWS, NOTIFICATIONS)
  // ======================================================================
  async getFavorites(userId: string): Promise<FavoriteRecord[]> {
    if (!isSupabaseConfigured || !supabase) return [];
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async addFavorite(userId: string, itemType: FavoriteRecord['item_type'], itemId: string, itemData: Record<string, any>): Promise<FavoriteRecord> {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('favorites')
      .upsert({ user_id: userId, item_type: itemType, item_id: itemId, item_data: itemData })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async removeFavorite(userId: string, itemType: string, itemId: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('item_type', itemType)
      .eq('item_id', itemId);
    if (error) throw error;
    return true;
  },

  async getReviews(targetType: string, targetId: string): Promise<ReviewRecord[]> {
    if (!isSupabaseConfigured || !supabase) return [];
    const { data, error } = await supabase
      .from('reviews')
      .select('*, author:profiles(*)')
      .eq('target_type', targetType)
      .eq('target_id', targetId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async createReview(review: {
    userId: string;
    targetType: ReviewRecord['target_type'];
    targetId: string;
    rating: number;
    comment: string;
  }): Promise<ReviewRecord> {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
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
    if (error) throw error;
    return data;
  },

  async getNotifications(userId: string): Promise<NotificationRecord[]> {
    if (!isSupabaseConfigured || !supabase) return [];
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async markNotificationRead(id: string): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);
    if (error) throw error;
  },

  // ======================================================================
  // 8. BOOKINGS & BOOKING ITEMS
  // ======================================================================
  async createBooking(
    booking: {
      userId: string;
      totalAmount: number;
      contactName: string;
      contactPhone: string;
      contactEmail?: string;
      specialRequests?: string;
    },
    items: Array<{
      itemType: BookingItemRecord['item_type'];
      itemId: string;
      title: string;
      startDate: string;
      endDate?: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      details?: Record<string, any>;
    }>
  ): Promise<BookingRecord> {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

    const bookingNumber = 'YN-' + Math.floor(100000 + Math.random() * 900000);

    // 1. Insert Booking Record
    const { data: bookingData, error: bookingError } = await supabase
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

    if (bookingError) throw bookingError;

    // 2. Insert Booking Items
    if (items.length > 0) {
      const itemsToInsert = items.map(item => ({
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

      const { error: itemsError } = await supabase.from('booking_items').insert(itemsToInsert);
      if (itemsError) throw itemsError;
    }

    // 3. Create Notification for the user
    await supabase.from('notifications').insert({
      user_id: booking.userId,
      title: 'Booking Confirmed!',
      message: `Your booking #${bookingNumber} for ${items[0]?.title || 'travel reservation'} has been confirmed.`,
      type: 'booking_confirmation',
      metadata: { booking_id: bookingData.id, booking_number: bookingNumber }
    });

    return bookingData;
  },

  async getUserBookings(userId: string): Promise<BookingRecord[]> {
    if (!isSupabaseConfigured || !supabase) return [];
    const { data, error } = await supabase
      .from('bookings')
      .select('*, items:booking_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  // ======================================================================
  // 9. SUPABASE STORAGE (IMAGE UPLOADS)
  // ======================================================================
  async uploadImage(
    bucket: 'destination-images' | 'hotel-images' | 'restaurant-images' | 'shopping-images' | 'rental-images' | 'profile-images' | 'app-assets',
    path: string,
    file: Blob | File
  ): Promise<string> {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      upsert: true
    });
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }
};
