import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  Send,
  Sparkles,
  History,
  RotateCcw,
  PlusCircle,
  Compass,
} from 'lucide-react-native';
import { aiService } from '../services/aiService';
import { AIMessage, AIRecommendationItem, AITripPlan } from '../types/ai';
import { AIMessageBubble } from '../components/ai/AIMessageBubble';
import { AITypingIndicator } from '../components/ai/AITypingIndicator';
import { AISuggestionChips } from '../components/ai/AISuggestionChips';
import { AIQuickActionBar } from '../components/ai/AIQuickActionBar';
import { AIEmptyState } from '../components/ai/AIEmptyState';
import { AIErrorState } from '../components/ai/AIErrorState';
import { useAuth } from '../context/AuthContext';

export const AIChatScreen = ({ navigation, route }: any) => {
  const { user } = useAuth();
  const initialPrompt = route?.params?.initialPrompt || '';
  const initialConversationId = route?.params?.conversationId || null;

  const [conversationId, setConversationId] = useState<string | null>(initialConversationId);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const flatListRef = useRef<FlatList>(null);

  // Load existing messages if conversationId is provided
  useEffect(() => {
    if (conversationId) {
      loadMessages(conversationId);
    }
  }, [conversationId]);

  // Handle initial prompt passed from another screen (e.g. from Destination or Hotel screen)
  useEffect(() => {
    if (initialPrompt && messages.length === 0 && !isLoading) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const loadMessages = async (cid: string) => {
    try {
      const msgs = await aiService.getMessages(cid);
      setMessages(msgs);
    } catch (e) {
      console.warn('Error loading conversation messages:', e);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    setInputText('');
    setErrorMessage(null);
    setLastFailedMessage(null);

    // Optimistically append user message
    const tempUserMsg: AIMessage = {
      id: `temp-${Date.now()}`,
      conversation_id: conversationId || 'temp',
      role: 'user',
      content: text,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempUserMsg]);
    setIsLoading(true);

    // Auto scroll down
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const res = await aiService.sendMessage(text, conversationId);

      if (res && res.success) {
        if (!conversationId && res.conversation_id) {
          setConversationId(res.conversation_id);
        }

        // Replace user temp message or append assistant message
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== tempUserMsg.id);
          const confirmedUserMsg: AIMessage = {
            ...tempUserMsg,
            conversation_id: res.conversation_id,
          };
          return [...filtered, confirmedUserMsg, res.message];
        });
      } else {
        throw new Error(res.error || 'Failed to get response');
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setLastFailedMessage(text);
      setErrorMessage("Sorry, YEANA AI couldn't respond right now. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 150);
    }
  };

  const handleStartNewChat = () => {
    setConversationId(null);
    setMessages([]);
    setErrorMessage(null);
    setLastFailedMessage(null);
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSendMessage(lastFailedMessage);
    }
  };

  const handleRecommendationPress = (item: AIRecommendationItem) => {
    if (item.type === 'destination') {
      navigation.navigate('DestinationDetail', {
        destination: {
          id: item.id,
          name: item.name,
          name_bn: item.name_bn || item.name,
          category: 'Nature',
          short_description: item.location,
          location_address: item.location,
          cover_image_url: item.image,
          rating: item.rating || 4.5,
          entry_fee: 50,
          district: { name: item.location },
        },
      });
    } else if (item.type === 'hotel') {
      navigation.navigate('Main', { screen: 'HotelsTab' });
    } else if (item.type === 'restaurant') {
      navigation.navigate('Main', { screen: 'FoodTab' });
    } else if (item.type === 'transport') {
      navigation.navigate('Transport');
    }
  };

  const handleOpenPlanner = (plan: AITripPlan) => {
    navigation.navigate('TripPlanner', {
      initialDestination: plan.destination,
      initialDuration: plan.duration_days.toString(),
      initialBudget: plan.estimated_budget.toString(),
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#047857" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Back"
          >
            <ArrowLeft size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.aiBadge}>
            <Sparkles size={16} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>YEANA AI</Text>
            <View style={styles.statusRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.statusText}>Verified Travel Assistant</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerActionBtn}
            onPress={handleStartNewChat}
            accessibilityLabel="New Chat"
          >
            <PlusCircle size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerActionBtn}
            onPress={() =>
              navigation.navigate('AIHistory', {
                onSelectConversation: (cid: string) => {
                  setConversationId(cid);
                  loadMessages(cid);
                },
              })
            }
            accessibilityLabel="History"
          >
            <History size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        {/* Messages or Welcome State */}
        {messages.length === 0 ? (
          <AIEmptyState onSelectPrompt={(p) => handleSendMessage(p)} />
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AIMessageBubble
                message={item}
                onRecommendationPress={handleRecommendationPress}
                onOpenPlanner={handleOpenPlanner}
              />
            )}
            contentContainerStyle={styles.listContent}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Typing Indicator */}
        {isLoading && <AITypingIndicator />}

        {/* Error State with Retry */}
        {errorMessage && (
          <AIErrorState error={errorMessage} onRetry={handleRetry} />
        )}

        {/* Quick Action Bar & Chips */}
        <AIQuickActionBar onActionPress={(p) => handleSendMessage(p)} />
        <AISuggestionChips onSelectPrompt={(p) => handleSendMessage(p)} />

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask YEANA AI (e.g. 2-day Sajek trip under 6000৳)..."
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={1000}
            onSubmitEditing={() => handleSendMessage()}
          />
          <TouchableOpacity
            style={[
              styles.sendBtn,
              (!inputText.trim() || isLoading) && styles.sendBtnDisabled,
            ]}
            onPress={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            accessibilityLabel="Send message"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Send size={18} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#047857',
  },
  flex: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#047857',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtn: {
    padding: 4,
    marginRight: 2,
  },
  aiBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#34D399',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 1,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34D399',
  },
  statusText: {
    fontSize: 11,
    color: '#A7F3D0',
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerActionBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  listContent: {
    paddingVertical: 14,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 8,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: '#111827',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#059669',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sendBtnDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
});
