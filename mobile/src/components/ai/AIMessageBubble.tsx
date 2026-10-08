import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Sparkles, User, Copy, Check } from 'lucide-react-native';
import { AIMessage, AIRecommendationItem, AITripPlan } from '../../types/ai';
import { AIRecommendationCard } from './AIRecommendationCard';
import { AITripPlanCard } from './AITripPlanCard';

interface Props {
  message: AIMessage;
  onRecommendationPress?: (item: AIRecommendationItem) => void;
  onOpenPlanner?: (plan: AITripPlan) => void;
}

// Simple text formatter for markdown-like syntax
const renderInlineText = (text: string, baseStyle: any, boldStyle: any) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <Text style={baseStyle}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <Text key={i} style={boldStyle}>
              {part.slice(2, -2)}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
};

const FormattedContent: React.FC<{ content: string; isUser: boolean }> = ({ content, isUser }) => {
  const lines = content.split('\n');

  return (
    <View style={styles.contentLines}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <View key={idx} style={{ height: 4 }} />;
        }

        if (trimmed === '---') {
          return <View key={idx} style={styles.divider} />;
        }

        // Heading ###
        if (trimmed.startsWith('###')) {
          const headingText = trimmed.replace(/^###\s*/, '');
          return (
            <Text
              key={idx}
              style={[
                styles.heading3,
                isUser ? styles.textUser : styles.textAssistantHeading,
              ]}
            >
              {headingText}
            </Text>
          );
        }

        // Blockquote > 💡
        if (trimmed.startsWith('>')) {
          const quoteText = trimmed.replace(/^>\s*/, '');
          return (
            <View key={idx} style={styles.quoteBox}>
              {renderInlineText(
                quoteText,
                styles.quoteText,
                styles.boldQuoteText
              )}
            </View>
          );
        }

        // Bullet point - or *
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <View key={idx} style={styles.bulletRow}>
              <View style={[styles.bulletDot, { backgroundColor: isUser ? '#FFFFFF' : '#059669' }]} />
              <View style={styles.bulletText}>
                {renderInlineText(
                  trimmed.substring(2),
                  [styles.bodyText, isUser ? styles.textUser : styles.textAssistant],
                  styles.boldText
                )}
              </View>
            </View>
          );
        }

        // Numbered list 1.
        const numMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
        if (numMatch) {
          return (
            <View key={idx} style={styles.bulletRow}>
              <Text style={[styles.numText, { color: isUser ? '#FFFFFF' : '#059669' }]}>
                {numMatch[1]}.
              </Text>
              <View style={styles.bulletText}>
                {renderInlineText(
                  numMatch[2],
                  [styles.bodyText, isUser ? styles.textUser : styles.textAssistant],
                  styles.boldText
                )}
              </View>
            </View>
          );
        }

        // Standard body line
        return (
          <View key={idx} style={{ marginVertical: 1 }}>
            {renderInlineText(
              trimmed,
              [styles.bodyText, isUser ? styles.textUser : styles.textAssistant],
              styles.boldText
            )}
          </View>
        );
      })}
    </View>
  );
};

export const AIMessageBubble: React.FC<Props> = ({
  message,
  onRecommendationPress,
  onOpenPlanner,
}) => {
  const isUser = message.role === 'user';
  const recommendations = message.metadata?.recommendations || [];
  const tripPlan = message.metadata?.trip_plan;

  const formatTime = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <View style={[styles.bubbleWrapper, isUser ? styles.wrapperUser : styles.wrapperAssistant]}>
      {/* Assistant Avatar */}
      {!isUser && (
        <View style={styles.assistantAvatar}>
          <Sparkles size={14} color="#FFFFFF" />
        </View>
      )}

      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant]}>
        {/* Role Header for Assistant */}
        {!isUser && (
          <View style={styles.assistantHeader}>
            <Text style={styles.assistantName}>YEANA AI</Text>
            <View style={styles.verifiedPill}>
              <Text style={styles.verifiedPillText}>Travel Assistant</Text>
            </View>
          </View>
        )}

        {/* Message Body */}
        <FormattedContent content={message.content} isUser={isUser} />

        {/* Trip Plan Card if present */}
        {tripPlan && !isUser && (
          <View style={styles.cardsBlock}>
            <AITripPlanCard plan={tripPlan} onOpenPlanner={onOpenPlanner} />
          </View>
        )}

        {/* Recommendation Cards if present */}
        {recommendations.length > 0 && !isUser && (
          <View style={styles.cardsBlock}>
            <Text style={styles.recommendationsLabel}>
              Verified YEANA Recommendations ({recommendations.length}):
            </Text>
            {recommendations.map((rec) => (
              <AIRecommendationCard
                key={rec.id}
                item={rec}
                onPress={onRecommendationPress}
              />
            ))}
          </View>
        )}

        {/* Footer with Timestamp */}
        <View style={[styles.footer, isUser ? styles.footerUser : styles.footerAssistant]}>
          <Text style={[styles.timeText, isUser ? styles.timeTextUser : styles.timeTextAssistant]}>
            {formatTime(message.created_at)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleWrapper: {
    flexDirection: 'row',
    marginVertical: 6,
    paddingHorizontal: 16,
    maxWidth: '100%',
  },
  wrapperUser: {
    justifyContent: 'flex-end',
  },
  wrapperAssistant: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  assistantAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  bubble: {
    maxWidth: '86%',
    borderRadius: 18,
    padding: 12,
  },
  bubbleUser: {
    backgroundColor: '#059669',
    borderBottomRightRadius: 4,
    shadowColor: '#059669',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  bubbleAssistant: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  assistantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  assistantName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#065F46',
  },
  verifiedPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 8,
  },
  verifiedPillText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#059669',
  },
  contentLines: {
    gap: 3,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  textUser: {
    color: '#FFFFFF',
  },
  textAssistant: {
    color: '#1F2937',
  },
  textAssistantHeading: {
    color: '#111827',
  },
  heading3: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 2,
  },
  boldText: {
    fontWeight: '700',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 6,
  },
  quoteBox: {
    backgroundColor: '#ECFDF5',
    borderLeftWidth: 3.5,
    borderLeftColor: '#059669',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  quoteText: {
    fontSize: 13,
    color: '#064E3B',
    lineHeight: 18,
  },
  boldQuoteText: {
    fontWeight: '700',
    color: '#065F46',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginVertical: 1,
  },
  bulletDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
  bulletText: {
    flex: 1,
  },
  numText: {
    fontSize: 13,
    fontWeight: '700',
  },
  cardsBlock: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  recommendationsLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  footerUser: {
    justifyContent: 'flex-end',
  },
  footerAssistant: {
    justifyContent: 'flex-start',
  },
  timeText: {
    fontSize: 10,
  },
  timeTextUser: {
    color: '#D1FAE5',
  },
  timeTextAssistant: {
    color: '#9CA3AF',
  },
});
