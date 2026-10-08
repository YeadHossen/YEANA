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
  ScrollView,
} from 'react-native';
import { MobileApiService } from '../services/api';
import { DestinationRecord, DistrictRecord } from '../types/database';
import { Search, MapPin, Star, Filter, X } from 'lucide-react-native';

const CATEGORIES = ['All', 'Nature', 'Hill', 'Beach', 'Heritage', 'Island', 'Waterfall', 'Tea Garden'];

export const ExploreScreen = ({ navigation, route }: any) => {
  const [destinations, setDestinations] = useState<DestinationRecord[]>([]);
  const [districts, setDistricts] = useState<DistrictRecord[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(route.params?.districtId || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>(route.params?.search || '');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    MobileApiService.getDistricts(route.params?.divisionId).then(setDistricts);
  }, [route.params?.divisionId]);

  const fetchDestinations = async (pageNum = 1, shouldAppend = false) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await MobileApiService.getDestinations({
        districtId: selectedDistrict || undefined,
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        search: search.trim() || undefined,
        page: pageNum,
        limit: 15,
      });

      if (shouldAppend) {
        setDestinations(prev => [...prev, ...res.data]);
      } else {
        setDestinations(res.data);
      }

      setHasMore(destinations.length + res.data.length < res.count);
      setPage(pageNum);
    } catch (err) {
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchDestinations(1, false);
  }, [selectedDistrict, selectedCategory, search]);

  const loadMore = () => {
    if (!loadingMore && hasMore && !loading) {
      fetchDestinations(page + 1, true);
    }
  };

  const renderItem = ({ item }: { item: DestinationRecord }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DestinationDetail', { id: item.id })}
    >
      <Image source={{ uri: item.cover_image_url }} style={styles.cardImage} />
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingBadge}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.cardBangla} numberOfLines={1}>{item.name_bn}</Text>
        <View style={styles.locationRow}>
          <MapPin size={12} color="#6B7280" />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.district?.name || item.location_address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Search size={18} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search attractions across Bangladesh..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <X size={16} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Pills */}
      <View style={styles.categoryWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.catPill, selectedCategory === cat && styles.catPillActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.catPillText, selectedCategory === cat && styles.catPillTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Districts Quick Filter */}
      {districts.length > 0 && (
        <View style={styles.districtWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.districtScroll}>
            <TouchableOpacity
              style={[styles.districtPill, selectedDistrict === null && styles.districtPillActive]}
              onPress={() => setSelectedDistrict(null)}
            >
              <Text style={[styles.districtText, selectedDistrict === null && styles.districtTextActive]}>
                All 64 Zilas
              </Text>
            </TouchableOpacity>
            {districts.map(d => (
              <TouchableOpacity
                key={d.id}
                style={[styles.districtPill, selectedDistrict === d.id && styles.districtPillActive]}
                onPress={() => setSelectedDistrict(selectedDistrict === d.id ? null : d.id)}
              >
                <Text style={[styles.districtText, selectedDistrict === d.id && styles.districtTextActive]}>
                  {d.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Destination Grid */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#059669" />
          <Text style={styles.loadingText}>Loading destinations...</Text>
        </View>
      ) : destinations.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyTitle}>No destinations found</Text>
          <Text style={styles.emptySubtitle}>Try adjusting your search or category filter</Text>
        </View>
      ) : (
        <FlatList
          data={destinations}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#059669" style={{ marginVertical: 15 }} /> : null}
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
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
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
  categoryWrapper: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  categoryScroll: {
    paddingHorizontal: 16,
  },
  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  catPillActive: {
    backgroundColor: '#059669',
  },
  catPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  catPillTextActive: {
    color: '#FFFFFF',
  },
  districtWrapper: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  districtScroll: {
    paddingHorizontal: 16,
  },
  districtPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 6,
  },
  districtPillActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#059669',
  },
  districtText: {
    fontSize: 11,
    color: '#4B5563',
  },
  districtTextActive: {
    color: '#059669',
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
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
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(5, 150, 105, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  cardContent: {
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
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
  cardBangla: {
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
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
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
});
