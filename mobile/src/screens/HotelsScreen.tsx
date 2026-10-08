import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { MobileApiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { HotelRecord } from '../types/database';
import { Search, MapPin, Star, Wifi, ShieldCheck, Coffee, Car, Check, X, Calendar, Sparkles } from 'lucide-react-native';

export const HotelsScreen = ({ route, navigation }: any) => {
  const { user, isAuthenticated } = useAuth();
  const [hotels, setHotels] = useState<HotelRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<HotelRecord | null>(null);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [contactName, setContactName] = useState(user?.full_name || '');
  const [contactPhone, setContactPhone] = useState(user?.phone || '');
  const [guestCount, setGuestCount] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadHotels();
  }, [search]);

  const loadHotels = async () => {
    try {
      setLoading(true);
      const res = await MobileApiService.getHotels({ search: search.trim() || undefined, limit: 30 });
      setHotels(res.data);
      if (route.params?.selectedHotelId) {
        const found = res.data.find(h => h.id === route.params.selectedHotelId);
        if (found) setSelectedHotel(found);
      }
    } catch (err) {
      console.error('Error loading hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookHotel = (hotel: HotelRecord) => {
    if (!isAuthenticated || !user) {
      Alert.alert('Sign In Required', 'Please sign in to confirm a hotel reservation.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign In', onPress: () => navigation.navigate('Login') },
      ]);
      return;
    }
    setSelectedHotel(hotel);
    setBookingModalVisible(true);
  };

  const confirmReservation = async () => {
    if (!selectedHotel || !user) return;
    if (!contactName.trim() || !contactPhone.trim()) {
      Alert.alert('Details Required', 'Please provide contact name and phone number.');
      return;
    }

    try {
      setIsSubmitting(true);
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

      await MobileApiService.createBooking({
        userId: user.id,
        totalAmount: selectedHotel.price_per_night,
        contactName: contactName.trim(),
        contactPhone: contactPhone.trim(),
        contactEmail: user.email,
        specialRequests: `Guests: ${guestCount}`,
        items: [
          {
            itemType: 'hotel',
            itemId: selectedHotel.id,
            title: selectedHotel.name,
            startDate: today,
            endDate: tomorrow,
            quantity: 1,
            unitPrice: selectedHotel.price_per_night,
            totalPrice: selectedHotel.price_per_night,
            details: {
              room_type: selectedHotel.room_types[0] || 'Standard Room',
              location: selectedHotel.location_address,
            },
          },
        ],
      });

      setBookingModalVisible(false);
      Alert.alert(
        'Booking Confirmed!',
        `Your reservation at ${selectedHotel.name} has been placed. You can view your electronic voucher in Bookings.`,
        [{ text: 'View Bookings', onPress: () => navigation.navigate('Bookings') }, { text: 'Done' }]
      );
    } catch (err: any) {
      Alert.alert('Booking Error', err.message || 'Failed to place booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderHotel = ({ item }: { item: HotelRecord }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.cover_image_url }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.hotelTitle} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingBadge}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.hotelBangla}>{item.name_bn}</Text>

        <View style={styles.locationRow}>
          <MapPin size={13} color="#6B7280" />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.location_address} ({item.district?.name})
          </Text>
        </View>

        {/* Amenities Icons */}
        <View style={styles.amenitiesRow}>
          {item.has_wifi && (
            <View style={styles.amenityBadge}><Wifi size={12} color="#059669" /><Text style={styles.amenityText}>WiFi</Text></View>
          )}
          {item.has_ac && (
            <View style={styles.amenityBadge}><ShieldCheck size={12} color="#059669" /><Text style={styles.amenityText}>AC</Text></View>
          )}
          {item.has_restaurant && (
            <View style={styles.amenityBadge}><Coffee size={12} color="#059669" /><Text style={styles.amenityText}>Dining</Text></View>
          )}
          {item.has_parking && (
            <View style={styles.amenityBadge}><Car size={12} color="#059669" /><Text style={styles.amenityText}>Parking</Text></View>
          )}
        </View>

        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.priceLabel}>Price starting from</Text>
            <Text style={styles.priceValue}>৳{item.price_per_night.toLocaleString()} <Text style={styles.priceNight}>/night</Text></Text>
          </View>
          <TouchableOpacity style={styles.bookBtn} onPress={() => handleBookHotel(item)}>
            <Text style={styles.bookBtnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Verified Hotels & Resorts</Text>
        <Text style={styles.pageSubtitle}>100% Real photos & instant room reservation</Text>
        <View style={styles.searchBar}>
          <Search size={18} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search hotel name, district, Cox's Bazar..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Ask AI about hotels */}
        <TouchableOpacity
          style={styles.aiAskBar}
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('AIChat', {
              initialPrompt: search.trim()
                ? `Find the best verified hotels in ${search.trim()} with prices in Taka (৳)`
                : 'Find the best verified hotels and eco-resorts with prices across Bangladesh',
            })
          }
        >
          <Sparkles size={15} color="#059669" />
          <Text style={styles.aiAskBarText}>Ask AI about verified hotels & best rates</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#059669" />
          <Text style={{ marginTop: 10, color: '#6B7280' }}>Loading verified stays...</Text>
        </View>
      ) : (
        <FlatList
          data={hotels}
          renderItem={renderHotel}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Reservation Modal */}
      <Modal visible={bookingModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Confirm Reservation</Text>
              <TouchableOpacity onPress={() => setBookingModalVisible(false)}>
                <X size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {selectedHotel && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.modalHotelName}>{selectedHotel.name}</Text>
                <Text style={styles.modalHotelLoc}>{selectedHotel.location_address}</Text>

                <View style={styles.fareBreakdown}>
                  <Text style={styles.fareLabel}>Room Rate (1 Night):</Text>
                  <Text style={styles.fareValue}>৳{selectedHotel.price_per_night.toLocaleString()}</Text>
                </View>

                <Text style={styles.inputLabel}>Guest Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Tanvir Ahmed"
                  value={contactName}
                  onChangeText={setContactName}
                />

                <Text style={styles.inputLabel}>Contact Phone (Mobile / bKash)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="017XX-XXXXXX"
                  keyboardType="phone-pad"
                  value={contactPhone}
                  onChangeText={setContactPhone}
                />

                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={confirmReservation}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.confirmBtnText}>Confirm Electronic Booking</Text>
                  )}
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  pageSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#1F2937',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#E5E7EB',
  },
  cardContent: {
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hotelTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
    marginLeft: 3,
  },
  hotelBangla: {
    fontSize: 13,
    color: '#059669',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    flex: 1,
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
  },
  amenityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  amenityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#F3F4F6',
  },
  priceLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  priceValue: {
    fontSize: 17,
    fontWeight: '800',
    color: '#059669',
  },
  priceNight: {
    fontSize: 11,
    fontWeight: 'normal',
    color: '#9CA3AF',
  },
  bookBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 10,
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  modalHotelName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  modalHotelLoc: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 14,
  },
  fareBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
  },
  fareLabel: {
    fontSize: 13,
    color: '#4B5563',
  },
  fareValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 12,
  },
  confirmBtn: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  aiAskBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  aiAskBarText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065F46',
  },
});
