import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ShieldCheck, Plus, Check, Trash2, Building, MapPin, Receipt, Star } from 'lucide-react-native';

export const AdminDashboardScreen = ({ navigation }: any) => {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'stats' | 'destination' | 'reviews'>('stats');
  const [stats, setStats] = useState({
    destinations: 0,
    hotels: 0,
    restaurants: 0,
    bookings: 0,
    reviews: 0,
  });
  const [pendingReviews, setPendingReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Destination Form State
  const [destName, setDestName] = useState('');
  const [destNameBn, setDestNameBn] = useState('');
  const [destCategory, setDestCategory] = useState('Nature');
  const [destDistrictId, setDestDistrictId] = useState('1');
  const [destLocation, setDestLocation] = useState('');
  const [destImage, setDestImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      loadAdminStats();
    }
  }, [isAdmin]);

  const loadAdminStats = async () => {
    if (!isSupabaseConfigured) return;
    try {
      setLoading(true);
      const [destCount, hotelCount, restCount, bookCount, revs] = await Promise.all([
        supabase.from('destinations').select('*', { count: 'exact', head: true }),
        supabase.from('hotels').select('*', { count: 'exact', head: true }),
        supabase.from('restaurants').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
        supabase.from('reviews').select('*, author:profiles(*)').order('created_at', { ascending: false }).limit(20),
      ]);

      setStats({
        destinations: destCount.count || 0,
        hotels: hotelCount.count || 0,
        restaurants: restCount.count || 0,
        bookings: bookCount.count || 0,
        reviews: revs.data?.length || 0,
      });

      setPendingReviews(revs.data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDestination = async () => {
    if (!destName.trim() || !destImage.trim()) {
      Alert.alert('Required Fields', 'Please enter destination name and image URL.');
      return;
    }

    try {
      setIsSubmitting(true);
      const { error } = await supabase.from('destinations').insert({
        name: destName.trim(),
        name_bn: destNameBn.trim() || destName.trim(),
        category: destCategory,
        district_id: parseInt(destDistrictId, 10) || 1,
        location_address: destLocation.trim() || 'Bangladesh',
        cover_image_url: destImage.trim(),
        rating: 4.5,
        is_active: true,
      });

      if (error) throw error;

      Alert.alert('Success', 'Destination successfully added to database!');
      setDestName('');
      setDestNameBn('');
      setDestLocation('');
      setDestImage('');
      loadAdminStats();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to create destination');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
      if (error) throw error;
      setPendingReviews(prev => prev.filter(r => r.id !== reviewId));
      Alert.alert('Deleted', 'Review deleted by administrator.');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to delete review');
    }
  };

  // If user is not an admin according to database profiles role
  if (!authLoading && !isAdmin) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ShieldAlert size={52} color="#EF4444" />
        <Text style={styles.deniedTitle}>Access Restricted</Text>
        <Text style={styles.deniedSubtitle}>
          This console requires verified database Administrator role permissions.
        </Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Return to App</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <ShieldCheck size={22} color="#FFFFFF" />
          <Text style={styles.headerTitle}>YEANA Admin Console</Text>
        </View>
        <Text style={styles.headerSubtitle}>Database-controlled management portal</Text>

        {/* Tab Buttons */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'stats' && styles.tabBtnActive]}
            onPress={() => setActiveTab('stats')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'stats' && styles.tabBtnTextActive]}>Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'destination' && styles.tabBtnActive]}
            onPress={() => setActiveTab('destination')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'destination' && styles.tabBtnTextActive]}>+ Destination</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'reviews' && styles.tabBtnActive]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'reviews' && styles.tabBtnTextActive]}>Reviews</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'stats' && (
          <View>
            <Text style={styles.sectionTitle}>Platform Telemetry & Metrics</Text>
            <View style={styles.metricsGrid}>
              <View style={styles.metricCard}>
                <MapPin size={20} color="#059669" />
                <Text style={styles.metricVal}>{stats.destinations}</Text>
                <Text style={styles.metricLabel}>Destinations</Text>
              </View>
              <View style={styles.metricCard}>
                <Building size={20} color="#2563EB" />
                <Text style={styles.metricVal}>{stats.hotels}</Text>
                <Text style={styles.metricLabel}>Hotels & Stays</Text>
              </View>
              <View style={styles.metricCard}>
                <Receipt size={20} color="#D97706" />
                <Text style={styles.metricVal}>{stats.bookings}</Text>
                <Text style={styles.metricLabel}>Total Bookings</Text>
              </View>
              <View style={styles.metricCard}>
                <Star size={20} color="#7C3AED" />
                <Text style={styles.metricVal}>{stats.reviews}</Text>
                <Text style={styles.metricLabel}>User Reviews</Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'destination' && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Add New Tourism Destination</Text>
            
            <Text style={styles.inputLabel}>Destination Name (English)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Inani Coral Beach"
              value={destName}
              onChangeText={setDestName}
            />

            <Text style={styles.inputLabel}>Name in Bengali (বাংলা)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. ইনানী প্রবাল সৈকত"
              value={destNameBn}
              onChangeText={setDestNameBn}
            />

            <Text style={styles.inputLabel}>Category (Nature, Hill, Beach, Heritage...)</Text>
            <TextInput
              style={styles.input}
              placeholder="Nature"
              value={destCategory}
              onChangeText={setDestCategory}
            />

            <Text style={styles.inputLabel}>District ID (1 to 64)</Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              keyboardType="numeric"
              value={destDistrictId}
              onChangeText={setDestDistrictId}
            />

            <Text style={styles.inputLabel}>Location Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Marine Drive, Cox's Bazar"
              value={destLocation}
              onChangeText={setDestLocation}
            />

            <Text style={styles.inputLabel}>Cover Photo URL (Supabase Storage / Web URL)</Text>
            <TextInput
              style={styles.input}
              placeholder="https://..."
              value={destImage}
              onChangeText={setDestImage}
            />

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleCreateDestination}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.submitBtnText}>Publish Destination</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'reviews' && (
          <View>
            <Text style={styles.sectionTitle}>Moderate User Reviews ({pendingReviews.length})</Text>
            {pendingReviews.map(r => (
              <View key={r.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerText}>{r.author?.full_name || 'Anonymous User'}</Text>
                  <Text style={styles.reviewRating}>★ {r.rating}/5</Text>
                </View>
                <Text style={styles.reviewComment}>{r.comment}</Text>
                <View style={styles.reviewActions}>
                  <TouchableOpacity style={styles.deleteRevBtn} onPress={() => deleteReview(r.id)}>
                    <Trash2 size={14} color="#EF4444" />
                    <Text style={styles.deleteRevText}>Remove Review</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
    marginBottom: 14,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#334155',
    borderRadius: 10,
    padding: 3,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabBtnActive: {
    backgroundColor: '#059669',
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#CBD5E1',
  },
  tabBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  metricVal: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 14,
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
    paddingVertical: 9,
    fontSize: 13,
    color: '#111827',
    marginBottom: 12,
  },
  submitBtn: {
    backgroundColor: '#059669',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  reviewItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  reviewerText: {
    fontWeight: '700',
    fontSize: 13,
    color: '#111827',
  },
  reviewRating: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
  },
  reviewComment: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
  },
  reviewActions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteRevBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteRevText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
    marginLeft: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  deniedTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#EF4444',
    marginTop: 14,
  },
  deniedSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  backBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
