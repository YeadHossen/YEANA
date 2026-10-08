import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Compass, Building2, Utensils, Bus, DollarSign, MapPin } from 'lucide-react-native';

interface Props {
  onActionPress: (prompt: string) => void;
}

const QUICK_ACTIONS = [
  { label: 'Plan My Trip', prompt: 'Help me plan a complete multi-day trip in Bangladesh.', icon: Compass, color: '#059669', bg: '#ECFDF5' },
  { label: 'Find Hotels', prompt: 'Recommend top rated and verified hotels in Bangladesh.', icon: Building2, color: '#0284C7', bg: '#F0F9FF' },
  { label: 'Find Food', prompt: 'What are the best traditional restaurants and famous local food?', icon: Utensils, color: '#D97706', bg: '#FFFBEB' },
  { label: 'Find Places', prompt: 'What are the most scenic and famous tourist spots in Bangladesh?', icon: MapPin, color: '#7C3AED', bg: '#F5F3FF' },
  { label: 'Calculate Budget', prompt: 'Calculate an estimated travel budget for a trip in Bangladesh.', icon: DollarSign, color: '#10B981', bg: '#ECFDF5' },
  { label: 'Find Transport', prompt: 'What are the available intercity bus, train, and flight routes?', icon: Bus, color: '#2563EB', bg: '#EFF6FF' },
];

export const AIQuickActionBar: React.FC<Props> = ({ onActionPress }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {QUICK_ACTIONS.map((action, idx) => {
          const Icon = action.icon;
          return (
            <TouchableOpacity
              key={idx}
              style={[styles.button, { backgroundColor: action.bg }]}
              activeOpacity={0.75}
              onPress={() => onActionPress(action.prompt)}
            >
              <Icon size={14} color={action.color} />
              <Text style={[styles.buttonText, { color: action.color }]}>{action.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 5,
  },
  buttonText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
