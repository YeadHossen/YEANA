import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, DollarSign, Users, Compass, CheckCircle2 } from 'lucide-react-native';
import { AITripPlan } from '../../types/ai';

interface Props {
  plan: AITripPlan;
  onOpenPlanner?: (plan: AITripPlan) => void;
}

export const AITripPlanCard: React.FC<Props> = ({ plan, onOpenPlanner }) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconCircle}>
            <Compass size={16} color="#059669" />
          </View>
          <View>
            <Text style={styles.destinationTitle}>{plan.destination}</Text>
            <Text style={styles.subTitle}>
              {plan.duration_days} Days Itinerary • {plan.travellers} Travelers
            </Text>
          </View>
        </View>
        <View style={styles.budgetBadge}>
          <Text style={styles.budgetLabel}>Est. Budget</Text>
          <Text style={styles.budgetValue}>৳{plan.estimated_budget.toLocaleString()}</Text>
        </View>
      </View>

      {/* Days Breakdown */}
      <View style={styles.daysContainer}>
        {plan.days.map((d) => (
          <View key={d.day} style={styles.dayRow}>
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeText}>Day {d.day}</Text>
            </View>
            <View style={styles.dayContent}>
              <Text style={styles.dayTitle}>{d.title}</Text>
              {d.estimated_cost ? (
                <Text style={styles.dayCost}>Est: ৳{d.estimated_cost.toLocaleString()}</Text>
              ) : null}
            </View>
          </View>
        ))}
      </View>

      {/* Action Footer */}
      {onOpenPlanner && (
        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.8}
          onPress={() => onOpenPlanner(plan)}
        >
          <CheckCircle2 size={14} color="#FFFFFF" />
          <Text style={styles.actionBtnText}>Customize in Trip Planner</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
    padding: 14,
    marginVertical: 10,
    shadowColor: '#059669',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DCFCE7',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destinationTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#065F46',
  },
  subTitle: {
    fontSize: 11,
    color: '#047857',
    marginTop: 1,
  },
  budgetBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  budgetLabel: {
    fontSize: 9,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  budgetValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#059669',
  },
  daysContainer: {
    marginTop: 10,
    gap: 8,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 10,
    gap: 10,
  },
  dayBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  dayBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  dayContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  dayCost: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
    marginLeft: 6,
  },
  actionBtn: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    marginTop: 12,
    gap: 6,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
