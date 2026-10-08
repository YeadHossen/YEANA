import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { MobileApiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { BookingRecord } from '../types/database';
import { Calendar, CheckCircle2, Clock, AlertCircle, MapPin, Receipt, ArrowRight } from 'lucide-react-native';

export const BookingsScreen = ({ navigation }: any) => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadBookings = async () => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      setRefreshing(false);
      return;
    }
    try {
      setLoading(true);
      const res = await MobileApiService.getUserBookings(user.id);
      setBookings(res);
    } catch (err) {
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [user, isAuthenticated]);

  const onRefresh = () => {
    setRefreshing(true);
    loadBookings();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#059669';
      case 'completed': return '#2563EB';
      case 'cancelled': return '#DC2626';
      default: return '#D97706';
    }
  };

  const renderBooking = ({ item }: { item: BookingRecord }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.bookingNumberRow}>
          <Receipt size={16} color="#059669" />
          <Text style={styles.bookingNumber}>{item.booking_number}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Booking Items */}
      {item.items && item.items.map(bItem => (
        <View key={bItem.id} style={styles.itemRow}>
          <View style={styles.itemBullet} />
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>{bItem.title}</Text>
            <Text style={styles.itemDates}>Date: {bItem.start_date} {bItem.end_date ? `to ${bItem.end_date}` : ''}</Text>
          </View>
          <Text style={styles.itemPrice}>৳{bItem.total_price.toLocaleString()}</Text>
        </View>
      ))}

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.footerLabel}>Total Amount</Text>
          <Text style={styles.footerTotal}>৳{item.total_amount.toLocaleString()}</Text>
        </View>
        <View style={styles.paymentBadge}>
          <Text style={styles.paymentText}>Payment: {item.payment_status}</Text>
        </View>
      </View>
    </View>
  );

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Receipt size={48} color="#9CA3AF" />
        <Text style={styles.unauthTitle}>Sign in to view your bookings</Text>
        <Text style={styles.unauthSubtitle}>Manage your verified hotel rooms & transport tickets</Text>
        <TouchableOpacity style={styles.signInBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInBtnText}>Sign In / Register</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>My Electronic Bookings</Text>
        <Text style={styles.pageSubtitle}>All verified vouchers and reservations</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#059669" />
          <Text style={{ marginTop: 10, color: '#6B7280' }}>Loading vouchers...</Text>
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.centerContainer}>
          <Receipt size={44} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>No bookings yet</Text>
          <Text style={styles.emptySubtitle}>Explore top resorts and travel routes across Bangladesh</Text>
          <TouchableOpacity style={styles.exploreBtn} onPress={() => navigation.navigate('Hotels')}>
            <Text style={styles.exploreBtnText}>Book a Resort</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBooking}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#059669']} />}
        />
      )}
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
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  bookingNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
    marginLeft: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  itemBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  itemDates: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#F3F4F6',
  },
  footerLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  footerTotal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#059669',
  },
  paymentBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  paymentText: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  unauthTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginTop: 14,
  },
  unauthSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
    marginBottom: 20,
  },
  signInBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  signInBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
    marginBottom: 16,
    textAlign: 'center',
  },
  exploreBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
