import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { MobileApiService } from '../services/api';
import { RestaurantRecord } from '../types/database';
import { Search, MapPin, Star, Utensils, Phone, Clock, Sparkles } from 'lucide-react-native';

export const FoodScreen = ({ navigation }: any) => {
  const [restaurants, setRestaurants] = useState<RestaurantRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadRestaurants();
  }, [search]);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      const res = await MobileApiService.getRestaurants({ search: search.trim() || undefined, limit: 30 });
      setRestaurants(res.data);
    } catch (err) {
      console.error('Error loading restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderRestaurant = ({ item }: { item: RestaurantRecord }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.cover_image_url }} style={styles.cardImage} />
      <View style={styles.priceTierBadge}>
        <Text style={styles.priceTierText}>{item.price_tier}</Text>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.restTitle} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingBadge}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.restBangla}>{item.name_bn}</Text>

        <View style={styles.cuisineRow}>
          <Utensils size={13} color="#059669" />
          <Text style={styles.cuisineText} numberOfLines={1}>{item.cuisine}</Text>
        </View>

        <View style={styles.locationRow}>
          <MapPin size={13} color="#6B7280" />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.location_address} ({item.district?.name})
          </Text>
        </View>

        {/* Menu Highlights */}
        {item.menu_highlights && item.menu_highlights.length > 0 && (
          <View style={styles.highlightsContainer}>
            <Text style={styles.highlightsLabel}>Specialties: </Text>
            <Text style={styles.highlightsText} numberOfLines={1}>
              {item.menu_highlights.join(' • ')}
            </Text>
          </View>
        )}

        {item.contact_phone && (
          <View style={styles.contactRow}>
            <Phone size={12} color="#059669" />
            <Text style={styles.contactText}>{item.contact_phone}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Authentic Bengali Delicacies</Text>
        <Text style={styles.pageSubtitle}>District-wise heritage foods, Biryani, and fresh river fish</Text>
        <View style={styles.searchBar}>
          <Search size={18} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Kacchi, Satkora Beef, Bogura Doi..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Ask AI about food */}
        <TouchableOpacity
          style={styles.aiAskBar}
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('AIChat', {
              initialPrompt: search.trim()
                ? `What are the best traditional restaurants and famous food in ${search.trim()}?`
                : 'What are the top famous regional delicacies across Bangladesh (e.g. Old Dhaka Biryani, Sylhet Shatkora, Bogura Doi, Cox’s Bazar Seafood)?',
            })
          }
        >
          <Sparkles size={15} color="#D97706" />
          <Text style={styles.aiAskBarText}>Ask AI about regional delicacies & best food</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#059669" />
          <Text style={{ marginTop: 10, color: '#6B7280' }}>Loading authentic foods...</Text>
        </View>
      ) : (
        <FlatList
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
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
    height: 160,
    backgroundColor: '#E5E7EB',
  },
  priceTierBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  priceTierText: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '700',
  },
  cardContent: {
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restTitle: {
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
  restBangla: {
    fontSize: 13,
    color: '#059669',
    marginTop: 2,
  },
  cuisineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  cuisineText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    flex: 1,
  },
  highlightsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  highlightsLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#374151',
  },
  highlightsText: {
    fontSize: 11,
    color: '#6B7280',
    flex: 1,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  contactText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
    marginLeft: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiAskBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  aiAskBarText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
});
