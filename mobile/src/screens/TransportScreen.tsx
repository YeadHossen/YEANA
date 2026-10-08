import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { MobileApiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { TransportRouteRecord, TransportTypeRecord } from '../types/database';
import { Bus, Train, Plane, Ship, Car, Clock, Phone, ArrowRight, X } from 'lucide-react-native';

export const TransportScreen = ({ route, navigation }: any) => {
  const { user, isAuthenticated } = useAuth();
  const [types, setTypes] = useState<TransportTypeRecord[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<number>(1);
  const [routes, setRoutes] = useState<TransportRouteRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking Modal State
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<TransportRouteRecord | null>(null);
  const [passengerName, setPassengerName] = useState(user?.full_name || '');
  const [passengerPhone, setPassengerPhone] = useState(user?.phone || '');
  const [seatCount, setSeatCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    MobileApiService.getTransportTypes().then(res => {
      setTypes(res);
      if (route.params?.initialType) {
        const found = res.find(t => t.name.toLowerCase() === route.params.initialType.toLowerCase());
        if (found) setSelectedTypeId(found.id);
      }
    });
  }, []);

  useEffect(() => {
    loadRoutes();
  }, [selectedTypeId]);

  const loadRoutes = async () => {
    try {
      setLoading(true);
      const res = await MobileApiService.getTransportRoutes({ transportTypeId: selectedTypeId });
      setRoutes(res);
    } catch (err) {
      console.error('Error loading routes:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTransportIcon = (name: string) => {
    switch (name) {
      case 'Train': return <Train size={18} color="#2563EB" />;
      case 'Flight': return <Plane size={18} color="#7C3AED" />;
      case 'Launch': return <Ship size={18} color="#D97706" />;
      case 'Car': return <Car size={18} color="#DC2626" />;
      default: return <Bus size={18} color="#059669" />;
    }
  };

  const handleBookRoute = (item: TransportRouteRecord) => {
    if (!isAuthenticated || !user) {
      Alert.alert('Sign In Required', 'Please sign in to book transport tickets.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign In', onPress: () => navigation.navigate('Login') },
      ]);
      return;
    }
    setSelectedRoute(item);
    setBookingModalVisible(true);
  };

  const confirmTransportBooking = async () => {
    if (!selectedRoute || !user) return;
    if (!passengerName.trim() || !passengerPhone.trim()) {
      Alert.alert('Information Missing', 'Please enter passenger name and mobile number.');
      return;
    }

    try {
      setIsSubmitting(true);
      const farePerSeat = selectedRoute.price_min;
      const totalAmount = farePerSeat * seatCount;
      const travelDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];

      await MobileApiService.createBooking({
        userId: user.id,
        totalAmount,
        contactName: passengerName.trim(),
        contactPhone: passengerPhone.trim(),
        contactEmail: user.email,
        specialRequests: `Seats: ${seatCount} | Route: ${selectedRoute.company}`,
        items: [
          {
            itemType: 'transport',
            itemId: selectedRoute.id,
            title: `${selectedRoute.company} (${selectedRoute.from_district?.name} to ${selectedRoute.to_district?.name})`,
            startDate: travelDate,
            quantity: seatCount,
            unitPrice: farePerSeat,
            totalPrice: totalAmount,
            details: {
              departure: selectedRoute.departure_time,
              arrival: selectedRoute.arrival_time,
              boarding_points: selectedRoute.boarding_points,
            },
          },
        ],
      });

      setBookingModalVisible(false);
      Alert.alert(
        'Transport Booking Confirmed!',
        `Your electronic ticket voucher for ${selectedRoute.company} has been generated.`,
        [{ text: 'View Bookings', onPress: () => navigation.navigate('Bookings') }, { text: 'Done' }]
      );
    } catch (err: any) {
      Alert.alert('Booking Error', err.message || 'Failed to place booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRoute = ({ item }: { item: TransportRouteRecord }) => (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.companyRow}>
          {getTransportIcon(item.transport_type?.name || 'Bus')}
          <Text style={styles.companyName}>{item.company}</Text>
        </View>
        <View style={styles.durationBadge}>
          <Clock size={11} color="#6B7280" />
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>

      <View style={styles.routePath}>
        <View style={styles.stationBlock}>
          <Text style={styles.stationTime}>{item.departure_time}</Text>
          <Text style={styles.stationName}>{item.from_district?.name || 'Dhaka'}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <ArrowRight size={18} color="#9CA3AF" />
          <Text style={styles.scheduleText}>{item.schedule_days}</Text>
        </View>
        <View style={[styles.stationBlock, { alignItems: 'flex-end' }]}>
          <Text style={styles.stationTime}>{item.arrival_time}</Text>
          <Text style={styles.stationName}>{item.to_district?.name || 'Destination'}</Text>
        </View>
      </View>

      <View style={styles.cardBottom}>
        <View>
          <Text style={styles.fareLabel}>Ticket Fare</Text>
          <Text style={styles.farePrice}>
            ৳{item.price_min.toLocaleString()} - ৳{item.price_max.toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity style={styles.bookBtn} onPress={() => handleBookRoute(item)}>
          <Text style={styles.bookBtnText}>Select Seats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All-in-One Transport Schedules</Text>
        <Text style={styles.subtitle}>Verified Intercity Buses, Railways, Flights & River Launches</Text>

        {/* Transport Type Tabs */}
        <View style={styles.typesRow}>
          {types.map(t => (
            <TouchableOpacity
              key={t.id}
              style={[styles.typeTab, selectedTypeId === t.id && styles.typeTabActive]}
              onPress={() => setSelectedTypeId(t.id)}
            >
              {getTransportIcon(t.name)}
              <Text style={[styles.typeTabText, selectedTypeId === t.id && styles.typeTabTextActive]}>
                {t.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#059669" />
          <Text style={{ marginTop: 10, color: '#6B7280' }}>Fetching real-time schedules...</Text>
        </View>
      ) : routes.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>No scheduled routes found</Text>
          <Text style={styles.emptySubtitle}>Try choosing another transport type</Text>
        </View>
      ) : (
        <FlatList
          data={routes}
          renderItem={renderRoute}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Booking Modal */}
      <Modal visible={bookingModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Transport Tickets</Text>
              <TouchableOpacity onPress={() => setBookingModalVisible(false)}>
                <X size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {selectedRoute && (
              <View>
                <Text style={styles.modalRouteName}>{selectedRoute.company}</Text>
                <Text style={styles.modalRouteDetails}>
                  {selectedRoute.from_district?.name} ➔ {selectedRoute.to_district?.name} ({selectedRoute.departure_time})
                </Text>

                <View style={styles.fareBreakdown}>
                  <Text style={styles.modalFareLabel}>Ticket Fare (Per Seat):</Text>
                  <Text style={styles.fareValue}>৳{selectedRoute.price_min.toLocaleString()}</Text>
                </View>

                <Text style={styles.inputLabel}>Passenger Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full name"
                  value={passengerName}
                  onChangeText={setPassengerName}
                />

                <Text style={styles.inputLabel}>Passenger Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="017XX-XXXXXX"
                  keyboardType="phone-pad"
                  value={passengerPhone}
                  onChangeText={setPassengerPhone}
                />

                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={confirmTransportBooking}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.confirmBtnText}>Confirm Electronic Ticket</Text>
                  )}
                </TouchableOpacity>
              </View>
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
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 14,
  },
  typesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 3,
  },
  typeTabActive: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1.5,
    borderColor: '#059669',
  },
  typeTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
    marginLeft: 4,
  },
  typeTabTextActive: {
    color: '#059669',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  durationText: {
    fontSize: 10,
    color: '#6B7280',
    marginLeft: 3,
  },
  routePath: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  stationBlock: {
    flex: 1,
  },
  stationTime: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  stationName: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  arrowContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  scheduleText: {
    fontSize: 9,
    color: '#9CA3AF',
    marginTop: 2,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#F3F4F6',
  },
  fareLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  farePrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#059669',
  },
  bookBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
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
  modalRouteName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  modalRouteDetails: {
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
  modalFareLabel: {
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
});
