import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertCircle, RotateCcw } from 'lucide-react-native';

interface Props {
  error?: string;
  onRetry: () => void;
}

export const AIErrorState: React.FC<Props> = ({
  error = "Sorry, YEANA AI couldn't respond right now. Please try again.",
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <AlertCircle size={20} color="#DC2626" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.errorTitle}>Connection Issue</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
      <TouchableOpacity style={styles.retryBtn} activeOpacity={0.8} onPress={onRetry}>
        <RotateCcw size={14} color="#FFFFFF" />
        <Text style={styles.retryBtnText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF2F2',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  errorTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#991B1B',
  },
  errorText: {
    fontSize: 11,
    color: '#B91C1C',
    marginTop: 1,
    lineHeight: 15,
  },
  retryBtn: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
