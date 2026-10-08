import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { MobileApiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { DestinationRecord, ReviewRecord } from '../types/database';
import {
  ArrowLeft,
  Heart,
  MapPin,
  Star,
  Clock,
  Ticket,
  Calendar,
  Navigation,
  Send,
  MessageCircle,
  Sparkles,
} from 'lucide-react-native';

export const DestinationDetailScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const { user, isAuthenticated } = useAuth();
  const [destination, setDestination] = useState<DestinationRecord | null>(null);
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        setLoading(true);
        const [dest, revs] = await Promise.all([
          MobileApiService.getDestinationById(id),
          MobileApiService.getReviews('destination', id),
        ]);
        setDestination(dest);
        setReviews(revs);

        if (user) {
          const favs = await MobileApiService.getFavorites(user.id);
          setIsFavorite(favs.some(f => f.item_id === id));
        }
      } catch (err) {
        console.error('Error loading destination detail:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [id, user]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated || !user) {
      Alert.alert('Sign in required', 'Please sign in to save your favorite destinations.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign In', onPress: () => navigation.navigate('Login') },
      ]);
      return;
    }
    if (!destination) return;
    const added = await MobileApiService.toggleFavorite(user.id, 'destination', destination.id, {
      name: destination.name,
      image_url: destination.cover_image_url,
      district_name: destination.district?.name,
    });
    setIsFavorite(added);
  };

  const handleAddReview = async () => {
    if (!isAuthenticated || !user) {
      Alert.alert('Sign in required', 'Please sign in to submit a review.');
      return;
    }
    if (!newComment.trim()) {
      Alert.alert('Comment required', 'Please write a review comment.');
      return;
    }

    try {
      setSubmittingReview(true);
      const created = await MobileApiService.addReview({
        userId: user.id,
        targetType: 'destination',
        targetId: id,
        rating: newRating,
        comment: newComment.trim(),
      });
      setReviews(prev => [created, ...prev]);
      setNewComment('');
      Alert.alert('Review Submitted', 'Thank you for your feedback!');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading || !destination) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#059669" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#1F2937" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleToggleFavorite}>
          <Heart size={22} color={isFavorite ? '#EF4444' : '#1F2937'} fill={isFavorite ? '#EF4444' : 'transparent'} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <Image source={{ uri: destination.cover_image_url }} style={styles.coverImage} />

        <View style={styles.content}>
          {/* Header Info */}
          <View style={styles.categoryRow}>
            <Text style={styles.categoryText}>{destination.category}</Text>
            <View style={styles.ratingBox}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingNumber}>{destination.rating}</Text>
              <Text style={styles.reviewCount}>({destination.reviews_count} reviews)</Text>
            </View>
          </View>

          <Text style={styles.name}>{destination.name}</Text>
          <Text style={styles.nameBn}>{destination.name_bn}</Text>

          <View style={styles.locationRow}>
            <MapPin size={16} color="#059669" />
            <Text style={styles.locationText}>
              {destination.location_address} ({destination.district?.name})
            </Text>
          </View>

          {/* Quick Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Ticket size={18} color="#059669" />
              <Text style={styles.statLabel}>Entry Fee</Text>
              <Text style={styles.statValue}>
                {destination.entry_fee > 0 ? `৳${destination.entry_fee}` : 'Free Entry'}
              </Text>
            </View>
            <View style={styles.statBox}>
              <Clock size={18} color="#059669" />
              <Text style={styles.statLabel}>Visiting Hours</Text>
              <Text style={styles.statValue}>{destination.opening_time || 'Open Daily'}</Text>
            </View>
            <View style={styles.statBox}>
              <Calendar size={18} color="#059669" />
              <Text style={styles.statLabel}>Best Season</Text>
              <Text style={styles.statValue}>{destination.best_time_to_visit || 'Autumn-Winter'}</Text>
            </View>
          </View>

          {/* Photo Gallery (Normalized destination_images table) */}
          {destination.images && destination.images.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Photo Gallery</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
                {destination.images.map((img) => (
                  <Image key={img.id} source={{ uri: img.image_url }} style={styles.galleryThumb} />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Ask YEANA AI Callout */}
          <TouchableOpacity
            style={styles.aiAskBanner}
            activeOpacity={0.88}
            onPress={() =>
              navigation.navigate('AIChat', {
                initialPrompt: `I want to visit ${destination.name} in ${destination.district?.name || 'Bangladesh'}. Plan a complete trip itinerary with hotel recommendations, transportation, and budget in Taka (৳).`,
              })
            }
          >
            <View style={styles.aiAskIconCircle}>
              <Sparkles size={18} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.aiAskTitle}>Ask YEANA AI about this destination</Text>
              <Text style={styles.aiAskSub}>
                Get personalized itineraries, hotel recommendations & estimated costs
              </Text>
            </View>
          </TouchableOpacity>

          {/* Descriptions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.bodyText}>
              {destination.full_description || destination.short_description}
            </Text>
          </View>

          {/* How to Reach */}
          {destination.how_to_reach && (
            <View style={styles.section}>
              <View style={styles.sectionHeaderIcon}>
                <Navigation size={18} color="#059669" />
                <Text style={[styles.sectionTitle, { marginLeft: 6 }]}>How to Reach</Text>
              </View>
              <Text style={styles.bodyText}>{destination.how_to_reach}</Text>
            </View>
          )}

          {/* Reviews Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderIcon}>
              <MessageCircle size={18} color="#059669" />
              <Text style={[styles.sectionTitle, { marginLeft: 6 }]}>
                Traveler Reviews ({reviews.length})
              </Text>
            </View>

            {/* Submit Review Box */}
            <View style={styles.addReviewBox}>
              <Text style={styles.reviewPrompt}>Leave a review & rating</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setNewRating(star)}>
                    <Star
                      size={24}
                      color="#F59E0B"
                      fill={star <= newRating ? '#F59E0B' : 'transparent'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={styles.reviewInput}
                placeholder="Share your travel tips, best viewpoints..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity
                style={styles.submitReviewBtn}
                onPress={handleAddReview}
                disabled={submittingReview}
              >
                {submittingReview ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Send size={16} color="#FFFFFF" />
                    <Text style={styles.submitReviewText}>Post Review</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Existing Reviews */}
            {reviews.map((rev) => (
              <View key={rev.id} style={styles.reviewCard}>
                <View style={styles.reviewTop}>
                  <Text style={styles.reviewerName}>
                    {rev.author?.full_name || 'Traveler'}
                  </Text>
                  <View style={styles.reviewStars}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={12} color="#F59E0B" fill="#F59E0B" />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewComment}>{rev.comment}</Text>
              </View>
            ))}
          </View>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  coverImage: {
    width: '100%',
    height: 280,
    backgroundColor: '#E5E7EB',
  },
  content: {
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
    textTransform: 'uppercase',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginTop: 6,
  },
  nameBn: {
    fontSize: 15,
    color: '#059669',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    fontSize: 13,
    color: '#4B5563',
    marginLeft: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 12,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
    textAlign: 'center',
  },
  section: {
    marginTop: 22,
  },
  sectionHeaderIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
  },
  galleryScroll: {
    marginTop: 6,
  },
  galleryThumb: {
    width: 140,
    height: 95,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: '#E5E7EB',
  },
  addReviewBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  reviewPrompt: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  reviewInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    textAlignVertical: 'top',
  },
  submitReviewBtn: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitReviewText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
    marginLeft: 6,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  reviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 6,
    lineHeight: 18,
  },
  aiAskBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    marginBottom: 16,
    gap: 12,
  },
  aiAskIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiAskTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#065F46',
  },
  aiAskSub: {
    fontSize: 11,
    color: '#047857',
    marginTop: 2,
    lineHeight: 15,
  },
});
