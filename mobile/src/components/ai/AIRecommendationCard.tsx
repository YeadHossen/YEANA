import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MapPin, Star, Bus, Utensils, Building2, ChevronRight, Compass } from 'lucide-react-native';
import { AIRecommendationItem } from '../../types/ai';

interface Props {
  item: AIRecommendationItem;
  onPress?: (item: AIRecommendationItem) => void;
}

export const AIRecommendationCard: React.FC<Props> = ({ item, onPress }) => {
  const renderIcon = () => {
    switch (item.type) {
      case 'hotel':
        return <Building2 size={13} color="#059669" />;
      case 'restaurant':
        return <Utensils size={13} color="#D97706" />;
      case 'transport':
        return <Bus size={13} color="#2563EB" />;
      default:
        return <Compass size={13} color="#059669" />;
    }
  };

  const getBadgeColor = () => {
    switch (item.type) {
      case 'hotel':
        return { bg: '#ECFDF5', text: '#059669' };
      case 'restaurant':
        return { bg: '#FEF3C7', text: '#D97706' };
      case 'transport':
        return { bg: '#EFF6FF', text: '#2563EB' };
      default:
        return { bg: '#F0FDF4', text: '#15803D' };
    }
  };

  const badgeStyle = getBadgeColor();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress && onPress(item)}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.imagePlaceholder, { backgroundColor: badgeStyle.bg }]}>
          {renderIcon()}
        </View>
      )}

      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
            {renderIcon()}
            <Text style={[styles.badgeText, { color: badgeStyle.text }]}>
              {item.type.toUpperCase()}
            </Text>
          </View>
          {typeof item.rating === 'number' && item.rating > 0 && (
            <View style={styles.ratingBadge}>
              <Star size={11} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>

        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>
        {item.name_bn ? (
          <Text style={styles.titleBn} numberOfLines={1}>
            {item.name_bn}
          </Text>
        ) : null}

        <View style={styles.locationRow}>
          <MapPin size={12} color="#6B7280" />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>

        <View style={styles.footer}>
          {item.price ? (
            <Text style={styles.priceText}>{item.price}</Text>
          ) : (
            <Text style={styles.verifiedText}>Verified</Text>
          )}
          <View style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Details</Text>
            <ChevronRight size={12} color="#059669" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    flexDirection: 'row',
  },
  image: {
    width: 95,
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  imagePlaceholder: {
    width: 95,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#374151',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  titleBn: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  locationText: {
    fontSize: 11,
    color: '#6B7280',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  priceText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
});
