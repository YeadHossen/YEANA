import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Sparkles, Compass, Building2, Utensils, Bus, DollarSign } from 'lucide-react-native';

interface Props {
  onSelectPrompt: (prompt: string) => void;
}

const STARTER_PROMPTS = [
  {
    icon: Compass,
    title: 'Plan a 2-day trip to Sajek',
    desc: 'Jeep escort, eco-resort stays & cloud valley view',
    prompt: 'Plan a 2-day trip to Sajek Valley for 2 people with budget estimation',
  },
  {
    icon: DollarSign,
    title: 'Find a trip under ৳5,000',
    desc: 'Budget-friendly weekend getaway in Bangladesh',
    prompt: 'Find a complete travel trip in Bangladesh with budget under ৳5,000',
  },
  {
    icon: Building2,
    title: 'Cheap hotels in Cox’s Bazar',
    desc: 'Clean & verified beachfront and Kolatoli hotels',
    prompt: "Find cheap, verified hotels in Cox's Bazar near the beach",
  },
  {
    icon: Utensils,
    title: 'Best places & food in Sylhet',
    desc: 'Ratargul, Jaflong, tea gardens & Beef Shatkora',
    prompt: 'Best tourist places to visit in Sylhet and famous local restaurants',
  },
];

export const AIEmptyState: React.FC<Props> = ({ onSelectPrompt }) => {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Brand Badge */}
      <View style={styles.badgeContainer}>
        <View style={styles.iconCircle}>
          <Sparkles size={24} color="#059669" />
        </View>
        <Text style={styles.brandTitle}>YEANA AI</Text>
        <Text style={styles.brandSubtitle}>Your Personal Bangladesh Travel Assistant</Text>
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Hi! I'm YEANA AI ✈️</Text>
        <Text style={styles.welcomeDesc}>
          I can help you plan trips across all 64 districts, discover verified places, estimate budgets in Taka (৳), recommend hotels, restaurants and transportation.
        </Text>
        <Text style={styles.welcomePromptQuestion}>What are you planning today?</Text>
      </View>

      {/* Starter Prompts */}
      <Text style={styles.sectionHeader}>Suggested Prompts</Text>
      <View style={styles.promptsList}>
        {STARTER_PROMPTS.map((item, index) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.promptCard}
              activeOpacity={0.8}
              onPress={() => onSelectPrompt(item.prompt)}
            >
              <View style={styles.promptIconCircle}>
                <Icon size={16} color="#059669" />
              </View>
              <View style={styles.promptTextContainer}>
                <Text style={styles.promptTitle}>{item.title}</Text>
                <Text style={styles.promptDesc}>{item.desc}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ECFDF5',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#059669',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '600',
    marginTop: 2,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  welcomeDesc: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 19,
  },
  welcomePromptQuestion: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
    marginTop: 10,
  },
  sectionHeader: {
    alignSelf: 'flex-start',
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  promptsList: {
    width: '100%',
    gap: 10,
  },
  promptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  promptIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  promptTextContainer: {
    flex: 1,
  },
  promptTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  promptDesc: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
});
