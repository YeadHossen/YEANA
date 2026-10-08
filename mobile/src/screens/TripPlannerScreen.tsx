import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Sparkles, Calendar, DollarSign, MapPin, Plus, Check } from 'lucide-react-native';

export const TripPlannerScreen = ({ navigation, route }: any) => {
  const [destination, setDestination] = useState(route?.params?.initialDestination || 'Sylhet & Sreemangal');
  const [durationDays, setDurationDays] = useState(route?.params?.initialDuration || '3');
  const [budgetTransport, setBudgetTransport] = useState(route?.params?.initialBudget ? Math.round(Number(route.params.initialBudget) * 0.3).toString() : '2400');
  const [budgetHotel, setBudgetHotel] = useState(route?.params?.initialBudget ? Math.round(Number(route.params.initialBudget) * 0.4).toString() : '4500');
  const [budgetFood, setBudgetFood] = useState(route?.params?.initialBudget ? Math.round(Number(route.params.initialBudget) * 0.2).toString() : '2000');
  const [budgetActivities, setBudgetActivities] = useState(route?.params?.initialBudget ? Math.round(Number(route.params.initialBudget) * 0.1).toString() : '1100');

  const total =
    (parseFloat(budgetTransport) || 0) +
    (parseFloat(budgetHotel) || 0) +
    (parseFloat(budgetFood) || 0) +
    (parseFloat(budgetActivities) || 0);

  const handleSaveTrip = () => {
    Alert.alert('Trip Saved', `Your ${durationDays}-day itinerary to ${destination} has been planned! Total estimated budget: ৳${total.toLocaleString()}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart Multi-Day Trip Planner</Text>
        <Text style={styles.subtitle}>Plan your Bangladesh trip with automated budget calculations</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* YEANA AI Planner Trigger */}
        <TouchableOpacity
          style={styles.aiPlannerCallout}
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('AIChat', {
              initialPrompt: `Plan a ${durationDays}-day trip to ${destination} for 2 people with budget breakdown, hotel recommendations, and day-by-day itinerary`,
            })
          }
        >
          <View style={styles.aiPlannerIcon}>
            <Sparkles size={18} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.aiPlannerTitle}>Plan with YEANA AI</Text>
            <Text style={styles.aiPlannerSub}>
              Let AI calculate budgets, recommended routes & daily schedule for {destination}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Main Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Trip Information</Text>

          <Text style={styles.label}>Destination / Region</Text>
          <View style={styles.inputBox}>
            <MapPin size={18} color="#059669" />
            <TextInput
              style={styles.input}
              value={destination}
              onChangeText={setDestination}
              placeholder="e.g. Sajek Valley & Rangamati"
            />
          </View>

          <Text style={styles.label}>Duration (Days)</Text>
          <View style={styles.inputBox}>
            <Calendar size={18} color="#059669" />
            <TextInput
              style={styles.input}
              value={durationDays}
              onChangeText={setDurationDays}
              keyboardType="numeric"
              placeholder="3"
            />
          </View>
        </View>

        {/* Budget Estimation */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Budget Estimation (BDT ৳)</Text>

          <Text style={styles.label}>Transport (Bus, Train, Ferry)</Text>
          <TextInput
            style={styles.inputSingle}
            value={budgetTransport}
            onChangeText={setBudgetTransport}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Accommodation & Resorts</Text>
          <TextInput
            style={styles.inputSingle}
            value={budgetHotel}
            onChangeText={setBudgetHotel}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Food & Dining</Text>
          <TextInput
            style={styles.inputSingle}
            value={budgetFood}
            onChangeText={setBudgetFood}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Activities, Entry Fees & Rides</Text>
          <TextInput
            style={styles.inputSingle}
            value={budgetActivities}
            onChangeText={setBudgetActivities}
            keyboardType="numeric"
          />

          {/* Total Budget Card */}
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Estimated Budget</Text>
            <Text style={styles.totalAmount}>৳{total.toLocaleString()}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveTrip}>
          <Sparkles size={18} color="#FFFFFF" />
          <Text style={styles.saveBtnText}>Save Itinerary</Text>
        </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 14,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#111827',
  },
  inputSingle: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 14,
    color: '#111827',
    marginBottom: 12,
  },
  totalBox: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 14,
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#065F46',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '900',
    color: '#059669',
  },
  saveBtn: {
    backgroundColor: '#059669',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
    marginLeft: 8,
  },
  aiPlannerCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    marginBottom: 16,
    gap: 12,
  },
  aiPlannerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiPlannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#065F46',
  },
  aiPlannerSub: {
    fontSize: 11,
    color: '#047857',
    marginTop: 2,
    lineHeight: 15,
  },
});
