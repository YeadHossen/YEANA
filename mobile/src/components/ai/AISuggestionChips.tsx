import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Sparkles } from 'lucide-react-native';

interface Props {
  onSelectPrompt: (prompt: string) => void;
}

const DEFAULT_PROMPTS = [
  'Plan a 2-day trip to Sajek',
  'Find a trip under ৳5,000',
  'Best places to visit in Sylhet',
  "Find cheap hotels in Cox's Bazar",
  'Make a trip plan for 2 people',
  'Famous food in Old Dhaka',
  'Best season to visit Sundarbans',
];

export const AISuggestionChips: React.FC<Props> = ({ onSelectPrompt }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {DEFAULT_PROMPTS.map((prompt, index) => (
          <TouchableOpacity
            key={index}
            style={styles.chip}
            activeOpacity={0.7}
            onPress={() => onSelectPrompt(prompt)}
          >
            <Sparkles size={12} color="#059669" />
            <Text style={styles.chipText}>{prompt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 6,
  },
  chipText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '600',
  },
});
