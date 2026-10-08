import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { MobileApiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FavoriteRecord } from '../types/database';
import { Heart, Trash2, ArrowRight } from 'lucide-react-native';

export const FavoritesScreen = ({ navigation }: any) => {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadFavorites();
    } else {
      setLoading(false);
    }
  }, [user, isAuthenticated]);

  const loadFavorites = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await MobileApiService.getFavorites(user.id);
      setFavorites(res);
    } catch (err) {
      console.error('Error loading favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (item: FavoriteRecord) => {
    if (!user) return;
    await MobileApiService.toggleFavorite(user.id, item.item_type, item.item_id, {});
    setFavorites(prev => prev.filter(f => f.id !== item.id));
  };

  const renderFavorite = ({ item }: { item: FavoriteRecord }) => (
    <View style={styles.card}>
      {item.item_data?.image_url && (
        <Image source={{ uri: item.item_data.image_url }} style={styles.cardImage} />
      )}
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.itemTypeBadge}>{item.item_type.toUpperCase()}</Text>
          <TouchableOpacity onPress={() => removeFavorite(item)}>
            <Trash2 size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemTitle} numberOfLines={1}>{item.item_data?.name || item.item_id}</Text>
        {item.item_data?.district_name && (
          <Text style={styles.itemLocation}>{item.item_data.district_name}</Text>
        )}
      </View>
    </View>
  );

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Heart size={44} color="#9CA3AF" />
        <Text style={styles.unauthTitle}>Save Your Favorite Places</Text>
        <Text style={styles.unauthSubtitle}>Sign in to bookmark destinations, stays, and food spots across Bangladesh.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Saved & Favorites</Text>
        <Text style={styles.pageSubtitle}>Bookmarks saved to your YEANA account</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#059669" />
        </View>
      ) : favorites.length === 0 ? (
        <View style={styles.centerContainer}>
          <Heart size={40} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>No saved items yet</Text>
          <Text style={styles.emptySubtitle}>Tap the heart icon on any destination to save it here</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
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
  cardImage: {
    width: 90,
    height: 90,
    backgroundColor: '#E5E7EB',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTypeBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  itemLocation: {
    fontSize: 12,
    color: '#6B7280',
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
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnText: {
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
  },
});
