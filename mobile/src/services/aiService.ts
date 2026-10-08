// ========================================================================
// YEANA AI — Frontend Service Layer (React Native)
// Handles chat communication with Supabase Edge Function, conversation
// history, preferences, and offline fallback.
// ========================================================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  AIConversation,
  AIMessage,
  AIUserPreferences,
  AIChatResponse,
  AIChatRequest,
} from '../types/ai';

const LOCAL_SERVER_URL = 'http://localhost:5000'; // Default local Express server for offline testing

export const aiService = {
  // 1. Send Message to YEANA AI
  async sendMessage(
    message: string,
    conversationId?: string | null,
    context?: Record<string, any>
  ): Promise<AIChatResponse> {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      throw new Error('Message cannot be empty.');
    }

    // Step A: Attempt Supabase Edge Function
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.functions.invoke('ai-chat', {
          body: {
            message: trimmedMessage,
            conversation_id: conversationId,
            context,
          },
        });

        if (!error && data && data.success) {
          // Cache response locally for offline access
          await this.cacheLocalMessage(data.conversation_id, data.message);
          return data as AIChatResponse;
        }

        if (error) {
          console.warn('Supabase Edge Function notice:', error.message || error);
        }
      } catch (edgeErr: any) {
        console.warn('Supabase Edge Function not reachable, trying local service:', edgeErr?.message);
      }
    }

    // Step B: Fallback to Local Express Backend / Offline Simulation
    try {
      const session = supabase ? (await supabase.auth.getSession()).data.session : null;
      const userId = session?.user?.id || 'usr-local-demo';

      const res = await fetch(`${LOCAL_SERVER_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedMessage,
          conversation_id: conversationId,
          user_id: userId,
          context,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          await this.cacheLocalMessage(data.conversation_id, data.message);
          return data as AIChatResponse;
        }
      }
    } catch (localErr) {
      console.warn('Local server not reachable, using offline assistant:', localErr);
    }

    // Step C: Resilient Client-Side Offline Assistant (Zero Failure Guarantee)
    return this.generateClientSideResponse(trimmedMessage, conversationId);
  },

  // 2. Fetch User Conversations
  async getConversations(): Promise<AIConversation[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data, error } = await supabase
            .from('ai_conversations')
            .select('*')
            .order('updated_at', { ascending: false });

          if (!error && data) {
            return data as AIConversation[];
          }
        }
      } catch (err) {
        console.warn('Error fetching Supabase AI conversations:', err);
      }
    }

    // Fallback: Local Server or AsyncStorage
    try {
      const res = await fetch(`${LOCAL_SERVER_URL}/api/ai/conversations`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}

    try {
      const stored = await AsyncStorage.getItem('yeana_ai_conversations');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  // 3. Fetch Messages for a Specific Conversation
  async getMessages(conversationId: string): Promise<AIMessage[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('ai_messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true });

        if (!error && data) {
          return data as AIMessage[];
        }
      } catch (err) {
        console.warn('Error fetching messages from Supabase:', err);
      }
    }

    // Fallback: Local Server or AsyncStorage
    try {
      const res = await fetch(`${LOCAL_SERVER_URL}/api/ai/conversations/${conversationId}/messages`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}

    try {
      const stored = await AsyncStorage.getItem(`yeana_ai_messages_${conversationId}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  // 4. Delete Conversation
  async deleteConversation(conversationId: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('ai_conversations')
          .delete()
          .eq('id', conversationId);

        if (!error) return true;
      } catch (err) {
        console.warn('Error deleting conversation on Supabase:', err);
      }
    }

    try {
      await fetch(`${LOCAL_SERVER_URL}/api/ai/conversations/${conversationId}`, {
        method: 'DELETE',
      });
    } catch (e) {}

    try {
      const stored = await AsyncStorage.getItem('yeana_ai_conversations');
      if (stored) {
        const list: AIConversation[] = JSON.parse(stored);
        const filtered = list.filter((c) => c.id !== conversationId);
        await AsyncStorage.setItem('yeana_ai_conversations', JSON.stringify(filtered));
      }
      await AsyncStorage.removeItem(`yeana_ai_messages_${conversationId}`);
      return true;
    } catch {
      return false;
    }
  },

  // 5. User Travel Preferences
  async getUserPreferences(): Promise<AIUserPreferences | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data } = await supabase
            .from('ai_user_preferences')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();

          if (data) return data as AIUserPreferences;
        }
      } catch (e) {}
    }

    try {
      const res = await fetch(`${LOCAL_SERVER_URL}/api/ai/preferences`);
      if (res.ok) return await res.json();
    } catch (e) {}

    try {
      const stored = await AsyncStorage.getItem('yeana_ai_preferences');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  async updateUserPreferences(prefs: Partial<AIUserPreferences>): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { error } = await supabase
            .from('ai_user_preferences')
            .upsert({
              user_id: session.user.id,
              ...prefs,
              updated_at: new Date().toISOString(),
            });

          if (!error) return true;
        }
      } catch (e) {}
    }

    try {
      await fetch(`${LOCAL_SERVER_URL}/api/ai/preferences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs),
      });
    } catch (e) {}

    try {
      await AsyncStorage.setItem('yeana_ai_preferences', JSON.stringify(prefs));
      return true;
    } catch {
      return false;
    }
  },

  async clearPreferences(): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await supabase.from('ai_user_preferences').delete().eq('user_id', session.user.id);
        }
      } catch (e) {}
    }

    try {
      await fetch(`${LOCAL_SERVER_URL}/api/ai/preferences`, { method: 'DELETE' });
    } catch (e) {}

    try {
      await AsyncStorage.removeItem('yeana_ai_preferences');
      return true;
    } catch {
      return false;
    }
  },

  // Helper: Cache message locally
  async cacheLocalMessage(conversationId: string, message: AIMessage) {
    try {
      const key = `yeana_ai_messages_${conversationId}`;
      const existing = await AsyncStorage.getItem(key);
      const list: AIMessage[] = existing ? JSON.parse(existing) : [];
      list.push(message);
      await AsyncStorage.setItem(key, JSON.stringify(list));

      // Also ensure conversation is in local list
      const convsKey = 'yeana_ai_conversations';
      const convsData = await AsyncStorage.getItem(convsKey);
      const convs: AIConversation[] = convsData ? JSON.parse(convsData) : [];
      const foundIdx = convs.findIndex((c) => c.id === conversationId);

      const titleSnippet = message.content.slice(0, 30);
      if (foundIdx >= 0) {
        convs[foundIdx].updated_at = new Date().toISOString();
        convs[foundIdx].last_message = titleSnippet;
      } else {
        convs.unshift({
          id: conversationId,
          user_id: 'usr-local',
          title: `Trip Chat (${new Date().toLocaleDateString()})`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_message: titleSnippet,
        });
      }
      await AsyncStorage.setItem(convsKey, JSON.stringify(convs));
    } catch (e) {}
  },

  // Client-Side Offline Emergency Fallback
  generateClientSideResponse(message: string, conversationId?: string | null): AIChatResponse {
    const cid = conversationId || `conv-${Date.now()}`;
    const lower = message.toLowerCase();

    let content = `✈️ **YEANA AI Tour Planner**\n\nI received your request: "${message}". I can help you plan trips, discover verified accommodations, authentic regional dishes, and transport options across all 64 districts of Bangladesh.\n\nTell me your destination, number of travelers, or budget in Taka (৳)!`;
    let cost = 5000;

    if (lower.includes('sajek')) {
      content = `☁️ **YEANA AI: 2-Day Sajek Valley Escape**\n\n**Destination:** Sajek Valley, Khagrachhari\n**Estimated Budget:** ৳5,500 – ৳6,500 per person\n\n- **Day 1:** Chander Gari jeep escort from Dighinala, sunset from Helipad, indigenous Bamboo Chicken dinner.\n- **Day 2:** Sunrise cloud sea from Konglak Peak, Hajachhara Waterfall, return to Dhaka by night coach.\n\n💡 *Tip: Book your eco-cottage at least 2 weeks in advance during peak season.*`;
      cost = 6000;
    } else if (lower.includes('sylhet')) {
      content = `🍵 **YEANA AI: Sylhet & Sreemangal Nature Tour**\n\n**Duration:** 2–3 Days\n**Estimated Budget:** ৳4,500 – ৳6,000 per person\n\n- **Must-Visit:** Ratargul Swamp Forest boat cruise, Jaflong Stone River, Lawachara Rain Forest.\n- **Food Highlights:** Traditional Beef Shatkora and 7-layer tea at Nilkantha Tea Cabin.\n- **Transport:** Intercity Parabat Express train from Dhaka.`;
      cost = 5000;
    } else if (lower.includes('cox')) {
      content = `🏖️ **YEANA AI: Cox's Bazar Beach Trip**\n\n**Duration:** 2 Days\n**Estimated Budget:** ৳4,800 – ৳7,500 per person\n\n- **Highlights:** Marine Drive to Inani Coral Beach, Himchhari Hill & Waterfall.\n- **Stays:** Budget stays at Kolatoli Point or luxury beachfront hotels.\n- **Food:** Fresh Rupchanda fish BBQ, Crab Curry, and shutki bhorta.`;
      cost = 5500;
    }

    const assistantMsg: AIMessage = {
      id: `msg-ast-${Date.now()}`,
      conversation_id: cid,
      role: 'assistant',
      content,
      created_at: new Date().toISOString(),
    };

    return {
      success: true,
      conversation_id: cid,
      message: assistantMsg,
      recommendations: [],
      trip_plan: {
        destination: lower.includes('sajek') ? 'Sajek Valley' : lower.includes('sylhet') ? 'Sylhet' : "Cox's Bazar",
        duration_days: 2,
        travellers: 2,
        estimated_budget: cost,
        currency: 'BDT',
        days: [
          { day: 1, title: 'Day 1: Journey & Scenic Sights', estimated_cost: Math.round(cost / 2) },
          { day: 2, title: 'Day 2: Local Exploration & Return', estimated_cost: Math.round(cost / 2) },
        ],
      },
      estimated_cost: cost,
    };
  },
};
