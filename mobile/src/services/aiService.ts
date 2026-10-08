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

const PROD_API_URL = 'https://yeana.com';

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
          await this.cacheLocalMessage(data.conversation_id, data.message);
          return data as AIChatResponse;
        }

        if (error) {
          console.warn('Supabase Edge Function notice:', error.message || error);
        }
      } catch (edgeErr: any) {
        console.warn('Supabase Edge Function not reachable, trying cloud API:', edgeErr?.message);
      }
    }

    // Step B: Connect to Live YEANA Cloud AI API (yeana.com)
    try {
      const session = supabase ? (await supabase.auth.getSession()).data.session : null;
      const userId = session?.user?.id || 'usr-mobile-guest';

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(`${PROD_API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedMessage,
          conversation_id: conversationId,
          user_id: userId,
          context,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          await this.cacheLocalMessage(data.conversation_id, data.message);
          return data as AIChatResponse;
        }
      }
    } catch (networkErr) {
      console.warn('Cloud API not reachable, using offline assistant:', networkErr);
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

    let content = '';
    let cost = 6000;
    let destination = "Cox's Bazar";

    if (lower.includes('sajek') || lower.includes('khagrachhari')) {
      destination = 'Sajek Valley';
      cost = 6000;
      content = 
        `✈️ **I'd love to help you plan an unforgettable trip to Sajek Valley!**\n\n` +
        `Here is a complete, handcrafted **2-Day / 1-Night Cloud Valley Itinerary**:\n\n` +
        `**📋 Quick Snapshot:**\n` +
        `- **Destination:** Sajek Valley, Khagrachhari\n` +
        `- **Estimated Budget:** ৳5,500 – ৳7,000 per person (2 travelers)\n` +
        `- **Best Season:** September – March (Clear cloud valley view)\n\n` +
        `### 🌅 Day 1: Chander Gari Safari & Sunset Above Clouds\n` +
        `- **Morning (07:30 AM – 10:30 AM):** Arrive at Dighinala. Board the open 4x4 Chander Gari jeep under Army escort.\n` +
        `- **Noon (01:00 PM – 02:30 PM):** Check into your eco-resort (e.g., Megh Kabbo or Resort RungRang) with panoramic valley views.\n` +
        `- **Late Afternoon:** Stroll to Helipad-2 for an iconic sunset above the rolling cloud sea.\n` +
        `- **Evening:** Savor legendary **Bamboo Chicken (বাঁশ মুরগি)** and indigenous sticky rice at a local eatery.\n\n` +
        `### 🌄 Day 2: Konglak Peak Sunrise & Waterfalls\n` +
        `- **Dawn (05:30 AM):** Sunrise cloud sea from **Konglak Para**—the highest peak in Sajek Valley.\n` +
        `- **Midday:** Return escort down to Dighinala, stopping by refreshing **Hajachhara Waterfall**.\n` +
        `- **Night:** Board your return AC bus to Dhaka with unforgettable memories!\n\n` +
        `> 💡 **YEANA Local Insight:** Book your eco-cottage at least 2 weeks ahead during peak weekends. Carry printed copies of your NID for the Baghaihat army checkpoint.\n\n` +
        `*Would you like me to find verified eco-cottages or adjust this for your specific group size?*`;
    } else if (lower.includes('sylhet') || lower.includes('sreemangal')) {
      destination = 'Sylhet';
      cost = 5500;
      content = 
        `🍵 **Sylhet & Sreemangal are pure paradise for nature lovers!**\n\n` +
        `Here is a complete **2-Day / 1-Night Nature & Tea Heritage Itinerary**:\n\n` +
        `**📋 Quick Snapshot:**\n` +
        `- **Destination:** Sylhet & Sreemangal\n` +
        `- **Estimated Budget:** ৳4,500 – ৳6,500 per person\n\n` +
        `### 🌿 Day 1: Ratargul Swamp Forest & Zindabazar Feasts\n` +
        `- **Morning:** Arrive via scenic Parabat Express train. Check into your hotel.\n` +
        `- **Midday:** Traditional country boat cruise through **Ratargul Freshwater Swamp Forest**.\n` +
        `- **Lunch:** Feast on 30+ bhortas, duck curry, and wild citrus beef at **Panch Bhai Restaurant** in Zindabazar.\n` +
        `- **Evening:** Peaceful walk around Hazrat Shah Jalal Dargah Sharif and shopping for Manipuri shawls.\n\n` +
        `### 🍃 Day 2: Sreemangal Tea Gardens & Lawachara\n` +
        `- **Morning:** Explore undulating tea estates and Lawachara Rainforest canopy.\n` +
        `- **Afternoon:** Sip the famous 7-layer tea at Nilkantha Tea Cabin before your return journey.\n\n` +
        `> 💡 **YEANA Local Insight:** Book train tickets 10 days in advance via the Bangladesh Railway portal to secure AC Snigdha seats.\n\n` +
        `*Would you like me to show verified resorts in Sreemangal or hotels in Sylhet town?*`;
    } else if (lower.includes('cox') || lower.includes('beach')) {
      destination = "Cox's Bazar";
      cost = 5800;
      content = 
        `🏖️ **Cox's Bazar is calling! Ready for the world's longest natural sea beach?**\n\n` +
        `Here is a curated **2-Day / 1-Night Beach Escape**:\n\n` +
        `**📋 Quick Snapshot:**\n` +
        `- **Destination:** Cox's Bazar & Marine Drive\n` +
        `- **Estimated Budget:** ৳4,800 – ৳8,000 per person\n\n` +
        `### 🌊 Day 1: Beach Sunsets & Seafood BBQ\n` +
        `- **Morning:** Arrive via Cox's Bazar Express train or luxury AC coach. Check into your hotel.\n` +
        `- **Lunch:** Savor crispy fried Rupchanda and Loitta bhorta at **Jhaubon Restaurant**.\n` +
        `- **Late Afternoon:** Stroll along the shoreline watching the golden sunset into the Bay of Bengal.\n` +
        `- **Evening:** Explore the Burmese Market and enjoy fresh grilled crab and fish BBQ by the beach.\n\n` +
        `### 🚗 Day 2: Marine Drive, Inani & Himchhari\n` +
        `- **Morning:** Cruise along scenic Marine Drive to **Himchhari Waterfall** and coral-strewn **Inani Beach**.\n` +
        `- **Afternoon:** Fresh green coconuts, hotel checkout, and return journey.\n\n` +
        `> 💡 **YEANA Local Insight:** For cleaner beaches and peaceful sunsets, head toward Darianagar or Inani rather than crowded Laboni point.\n\n` +
        `*Would you like me to show beachfront resorts with pools or budget hotels near Kolatoli?*`;
    } else {
      content = 
        `👋 **Hello! I'm YEANA AI, your personal travel companion for Bangladesh.**\n\n` +
        `I can help you plan trips across all 64 districts, estimate realistic budgets in Taka (৳), recommend verified hotels, authentic restaurants, and reliable transportation.\n\n` +
        `### Popular Requests You Can Ask Me:\n` +
        `- *"Plan a 2-day trip to Sajek for 2 people under 6,000 taka"*\n` +
        `- *"Find beachfront hotels in Cox's Bazar"*\n` +
        `- *"What are the best places to visit in Sylhet?"*\n` +
        `- *"How to travel from Dhaka to Bandarban?"*\n\n` +
        `> 💡 **Where would you like to travel next? Tell me your destination, budget, or travel style!**`;
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
