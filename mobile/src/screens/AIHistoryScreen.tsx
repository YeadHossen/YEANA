import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ArrowLeft, MessageSquare, Trash2, Plus, Calendar, ChevronRight } from 'lucide-react-native';
import { aiService } from '../services/aiService';
import { AIConversation } from '../types/ai';

export const AIHistoryScreen = ({ navigation, route }: any) => {
  const onSelectConversation = route?.params?.onSelectConversation;
  const [conversations, setConversations] = useState<AIConversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const list = await aiService.getConversations();
      setConversations(list);
    } catch (e) {
      console.warn('Error loading AI history:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      'Delete Conversation',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await aiService.deleteConversation(id);
            setConversations((prev) => prev.filter((c) => c.id !== id));
          },
        },
      ]
    );
  };

  const handleSelect = (conv: AIConversation) => {
    if (onSelectConversation) {
      onSelectConversation(conv.id);
      navigation.goBack();
    } else {
      navigation.navigate('AIChat', { conversationId: conv.id });
    }
  };

  const handleNewChat = () => {
    navigation.navigate('AIChat', { conversationId: null });
  };

  // Group conversations by Today, Yesterday, Older
  const groupConversations = () => {
    const today: AIConversation[] = [];
    const yesterday: AIConversation[] = [];
    const older: AIConversation[] = [];

    const now = new Date();
    const todayDateStr = now.toDateString();

    const yest = new Date(now);
    yest.setDate(now.getDate() - 1);
    const yesterdayDateStr = yest.toDateString();

    conversations.forEach((c) => {
      const d = new Date(c.updated_at || c.created_at);
      const dateStr = d.toDateString();
      if (dateStr === todayDateStr) {
        today.push(c);
      } else if (dateStr === yesterdayDateStr) {
        yesterday.push(c);
      } else {
        older.push(c);
      }
    });

    const sections = [];
    if (today.length > 0) sections.push({ title: 'Today', data: today });
    if (yesterday.length > 0) sections.push({ title: 'Yesterday', data: yesterday });
    if (older.length > 0) sections.push({ title: 'Older', data: older });
    return sections;
  };

  const sections = groupConversations();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#047857" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Travel History</Text>
        <TouchableOpacity style={styles.newChatBtn} onPress={handleNewChat}>
          <Plus size={18} color="#FFFFFF" />
          <Text style={styles.newChatBtnText}>New</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#059669" />
          <Text style={styles.loadingText}>Loading conversations...</Text>
        </View>
      ) : conversations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <MessageSquare size={32} color="#9CA3AF" />
          </View>
          <Text style={styles.emptyTitle}>No Conversations Yet</Text>
          <Text style={styles.emptySubtitle}>
            Start a new conversation with YEANA AI to plan trips and explore Bangladesh.
          </Text>
          <TouchableOpacity style={styles.startBtn} onPress={handleNewChat}>
            <Plus size={16} color="#FFFFFF" />
            <Text style={styles.startBtnText}>Start New Travel Chat</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(item, index) => item.title + index}
          contentContainerStyle={styles.listContent}
          renderItem={({ item: section }) => (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              {section.data.map((conv) => (
                <TouchableOpacity
                  key={conv.id}
                  style={styles.card}
                  activeOpacity={0.7}
                  onPress={() => handleSelect(conv)}
                >
                  <View style={styles.cardIcon}>
                    <MessageSquare size={16} color="#059669" />
                  </View>
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {conv.title}
                    </Text>
                    {conv.last_message ? (
                      <Text style={styles.cardPreview} numberOfLines={1}>
                        {conv.last_message}
                      </Text>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(conv.id, conv.title)}
                  >
                    <Trash2 size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                  <ChevronRight size={16} color="#D1D5DB" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#047857',
  },
  header: {
    backgroundColor: '#047857',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  newChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  newChatBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  startBtn: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  listContent: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  cardIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  cardPreview: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  deleteBtn: {
    padding: 8,
    marginRight: 4,
  },
});
