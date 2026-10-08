import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { MobileApiService } from '../services/api';
import { DestinationRecord, HotelRecord, DivisionRecord } from '../types/database';
import { Search, MapPin, Star, Bus, Train, Plane, Ship, Compass, Heart, Sparkles } from 'lucide-react-native';

export const HomeScreen = ({ navigation }: any) => {
  const [divisions, setDivisions] = useState<DivisionRecord[]>([]);
  const [featuredDestinations, setFeaturedDestinations] = useState<DestinationRecord[]>([]);
  const [topHotels, setTopHotels] = useState<HotelRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<number | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [divs, dests, hotels] = await Promise.all([
        MobileApiService.getDivisions(),
        MobileApiService.getDestinations({ featuredOnly: true, limit: 10 }),
        MobileApiService.getHotels({ limit: 6 })
      ]);
      setDivisions(divs);
      setFeaturedDestinations(dests.data);
      setTopHotels(hotels.data);
    } catch (e) {
      console.error('Error loading home data:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#047857" />
      
      {/* Header Banner */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.appTitle}>YEANA</Text>
            <Text style={styles.appSubtitle}>Discover Beautiful Bangladesh</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <TouchableOpacity 
              style={styles.aiHeaderBtn}
              onPress={() => navigation.navigate('AIChat')}
            >
              <Sparkles size={15} color="#FFFFFF" />
              <Text style={styles.aiHeaderBtnText}>YEANA AI</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.profileBadge}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.profileBadgeText}>BD</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#059669" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search districts, Cox's Bazar, Sajek..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => navigation.navigate('Explore', { search: searchQuery })}
          />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#059669']} />}
      >
        {/* YEANA AI Travel Assistant Banner */}
        <TouchableOpacity 
          style={styles.aiBannerCard}
          activeOpacity={0.88}
          onPress={() => navigation.navigate('AIChat')}
        >
          <View style={styles.aiBannerLeft}>
            <View style={styles.aiBannerIconCircle}>
              <Sparkles size={20} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.aiBannerTagRow}>
                <Text style={styles.aiBannerTag}>YEANA AI ASSISTANT</Text>
                <View style={styles.aiBadgeNew}>
                  <Text style={styles.aiBadgeNewText}>SMART PLANNER</Text>
                </View>
              </View>
              <Text style={styles.aiBannerTitle}>Plan your tour with YEANA AI</Text>
              <Text style={styles.aiBannerSub}>
                Instant multi-day itineraries, verified stays, local food & budget estimation
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Transport Access */}
        <View style={styles.transportSection}>
          <Text style={styles.sectionTitle}>Travel by Transport</Text>
          <View style={styles.transportRow}>
            <TouchableOpacity 
              style={styles.transportItem}
              onPress={() => navigation.navigate('Transport', { initialType: 'Bus' })}
            >
              <View style={[styles.transportIconBox, { backgroundColor: '#ECFDF5' }]}>
                <Bus size={22} color="#059669" />
              </View>
              <Text style={styles.transportLabel}>Bus</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.transportItem}
              onPress={() => navigation.navigate('Transport', { initialType: 'Train' })}
            >
              <View style={[styles.transportIconBox, { backgroundColor: '#EFF6FF' }]}>
                <Train size={22} color="#2563EB" />
              </View>
              <Text style={styles.transportLabel}>Train</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.transportItem}
              onPress={() => navigation.navigate('Transport', { initialType: 'Flight' })}
            >
              <View style={[styles.transportIconBox, { backgroundColor: '#F5F3FF' }]}>
                <Plane size={22} color="#7C3AED" />
              </View>
              <Text style={styles.transportLabel}>Flight</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.transportItem}
              onPress={() => navigation.navigate('Transport', { initialType: 'Launch' })}
            >
              <View style={[styles.transportIconBox, { backgroundColor: '#FFFBEB' }]}>
                <Ship size={22} color="#D97706" />
              </View>
              <Text style={styles.transportLabel}>Launch</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Divisions Carousel */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>8 Divisions of Bangladesh</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.seeAllText}>Explore 64 Zilas</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {divisions.map((div) => {
            const isSelected = selectedDivision === div.id;
            return (
              <TouchableOpacity
                key={div.id}
                style={[styles.divisionChip, isSelected && styles.divisionChipActive]}
                onPress={() => {
                  setSelectedDivision(isSelected ? null : div.id);
                  navigation.navigate('Explore', { divisionId: div.id });
                }}
              >
                <Compass size={14} color={isSelected ? '#FFFFFF' : '#059669'} />
                <Text style={[styles.divisionChipText, isSelected && styles.divisionChipTextActive]}>
                  {div.name} ({div.name_bn})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Featured Destinations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Destinations</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color="#059669" style={{ marginVertical: 20 }} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredDestinations.map((dest) => (
              <TouchableOpacity
                key={dest.id}
                style={styles.destCard}
                onPress={() => navigation.navigate('DestinationDetail', { id: dest.id })}
              >
                <Image source={{ uri: dest.cover_image_url }} style={styles.destImage} />
                <View style={styles.destRatingBadge}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.destRatingText}>{dest.rating}</Text>
                </View>
                <View style={styles.destInfo}>
                  <Text style={styles.destCategory}>{dest.category}</Text>
                  <Text style={styles.destName} numberOfLines={1}>{dest.name}</Text>
                  <View style={styles.destLocationRow}>
                    <MapPin size={12} color="#6B7280" />
                    <Text style={styles.destLocationText} numberOfLines={1}>
                      {dest.district?.name || dest.location_address}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Top Verified Hotels */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Resorts & Hotels</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Hotels')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hotelsList}>
          {topHotels.map((hotel) => (
            <TouchableOpacity
              key={hotel.id}
              style={styles.hotelCard}
              onPress={() => navigation.navigate('Hotels', { selectedHotelId: hotel.id })}
            >
              <Image source={{ uri: hotel.cover_image_url }} style={styles.hotelImage} />
              <View style={styles.hotelContent}>
                <View style={styles.hotelHeader}>
                  <Text style={styles.hotelName} numberOfLines={1}>{hotel.name}</Text>
                  <View style={styles.hotelRating}>
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.hotelRatingText}>{hotel.rating}</Text>
                  </View>
                </View>
                <Text style={styles.hotelLocation} numberOfLines={1}>{hotel.location_address}</Text>
                <View style={styles.hotelPriceRow}>
                  <Text style={styles.hotelPrice}>৳{hotel.price_per_night.toLocaleString()}</Text>
                  <Text style={styles.hotelPriceSub}> / night</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Floating YEANA AI Action Button */}
      <TouchableOpacity
        style={styles.fabAiBtn}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('AIChat')}
        accessibilityLabel="Ask YEANA AI"
      >
        <Sparkles size={18} color="#FFFFFF" />
        <Text style={styles.fabAiBtnText}>Ask AI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 13,
    color: '#D1FAE5',
    marginTop: 2,
  },
  profileBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#047857',
    borderWidth: 1.5,
    borderColor: '#34D399',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBadgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#1F2937',
  },
  transportSection: {
    paddingHorizontal: 16,
    marginTop: 18,
  },
  transportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  transportItem: {
    alignItems: 'center',
    flex: 1,
  },
  transportIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  transportLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 22,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
  },
  horizontalScroll: {
    paddingLeft: 16,
    marginBottom: 10,
  },
  divisionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  divisionChipActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  divisionChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 6,
  },
  divisionChipTextActive: {
    color: '#FFFFFF',
  },
  destCard: {
    width: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 6,
  },
  destImage: {
    width: '100%',
    height: 130,
    backgroundColor: '#E5E7EB',
  },
  destRatingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  destRatingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 4,
  },
  destInfo: {
    padding: 12,
  },
  destCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
    textTransform: 'uppercase',
  },
  destName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  destLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  destLocationText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    flex: 1,
  },
  hotelsList: {
    paddingHorizontal: 16,
  },
  hotelCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  hotelImage: {
    width: 100,
    height: 90,
    backgroundColor: '#E5E7EB',
  },
  hotelContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  hotelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hotelName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  hotelRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  hotelRatingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 3,
  },
  hotelLocation: {
    fontSize: 11,
    color: '#6B7280',
  },
  hotelPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  hotelPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#059669',
  },
  hotelPriceSub: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  aiHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#047857',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#34D399',
    gap: 4,
  },
  aiHeaderBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  aiBannerCard: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    shadowColor: '#059669',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
  aiBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aiBannerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#059669',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  aiBannerTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aiBannerTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.5,
  },
  aiBadgeNew: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
  },
  aiBadgeNewText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#047857',
  },
  aiBannerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginTop: 2,
  },
  aiBannerSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 15,
  },
  fabAiBtn: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 28,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: '#34D399',
  },
  fabAiBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
