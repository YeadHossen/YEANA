// ========================================================================
// YEANA AI — Supabase Edge Function (ai-chat)
// Handles authenticated chat requests, intent detection, safe database
// retrieval, conversation history, personalization, and AI generation.
// ========================================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import { YEANA_AI_SYSTEM_PROMPT, buildPromptWithContext } from './systemPrompt.ts';
import { detectIntentAndKeywords, searchDatabaseContext } from './retrieval.ts';
import { AIProviderService } from './provider.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const aiProvider = new AIProviderService();

serve(async (req: Request) => {
  // 1. Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const authHeader = req.headers.get('Authorization');

    // Create Supabase client with request context
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: authHeader ? { Authorization: authHeader } : {},
      },
    });

    // 2. Authentication Check
    let user = null;
    if (authHeader) {
      try {
        const { data: authData } = await supabase.auth.getUser();
        user = authData?.user;
      } catch (authErr) {
        console.warn('Auth token verification note:', authErr);
      }
    }

    // 3. Parse and Validate Request Body
    const body = await req.json().catch(() => ({}));
    const message = (body.message || '').trim();
    let conversationId = body.conversation_id || null;

    if (!message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message cannot be empty.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (message.length > 2500) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message is too long. Please keep under 2,500 characters.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Rate Limiting Check (for authenticated users)
    if (user) {
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
      const { count } = await supabase
        .from('ai_usage')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', oneMinuteAgo);

      if (count && count > 20) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'You have reached the temporary rate limit. Please wait a minute before sending another message.'
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // 5. Load User Preferences (if user is authenticated)
    let userPreferencesSummary = '';
    let userPrefs = null;
    if (user) {
      const { data: prefs } = await supabase
        .from('ai_user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (prefs) {
        userPrefs = prefs;
        const prefParts: string[] = [];
        if (prefs.preferred_trip_type) prefParts.push(`Trip Type: ${prefs.preferred_trip_type}`);
        if (prefs.preferred_hotel_type) prefParts.push(`Hotel Preference: ${prefs.preferred_hotel_type}`);
        if (prefs.budget_preference) prefParts.push(`Standard Budget: ৳${prefs.budget_preference}`);
        if (prefs.travel_companions) prefParts.push(`Companions: ${prefs.travel_companions}`);
        userPreferencesSummary = prefParts.join(', ');
      }
    }

    // 6. Intent Detection & Database Search
    const { intent, targetDistrict, budgetMentioned, daysMentioned, travellersMentioned } =
      detectIntentAndKeywords(message);

    const { contextText, recommendations } = await searchDatabaseContext(
      supabase,
      intent,
      targetDistrict,
      message
    );

    // 7. Manage Conversation & Load History
    let conversationHistorySummary = '';
    if (user) {
      if (conversationId) {
        // Fetch last 8 messages for context
        const { data: history } = await supabase
          .from('ai_messages')
          .select('role, content')
          .eq('conversation_id', conversationId)
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
          .limit(8);

        if (history && history.length > 0) {
          conversationHistorySummary = history
            .map((h: any) => `${h.role === 'user' ? 'User' : 'YEANA AI'}: ${h.content}`)
            .join('\n');
        }
      } else {
        // Generate conversation title from message
        const titleSnippet = message.slice(0, 40).replace(/[\r\n]+/g, ' ');
        const generatedTitle = targetDistrict ? `${targetDistrict} Trip Guide` : `${titleSnippet}...`;

        const { data: newConv } = await supabase
          .from('ai_conversations')
          .insert({
            user_id: user.id,
            title: generatedTitle,
          })
          .select('id')
          .single();

        if (newConv) {
          conversationId = newConv.id;
        }
      }
    }

    // 8. Build Prompt with Safe Separation
    const fullUserPrompt = buildPromptWithContext({
      systemPrompt: YEANA_AI_SYSTEM_PROMPT,
      userMessage: message,
      databaseContext: contextText,
      userPreferencesSummary: userPreferencesSummary || undefined,
      conversationHistorySummary: conversationHistorySummary || undefined,
    });

    // 9. Call AI Provider
    const aiResult = await aiProvider.generateResponse({
      systemPrompt: YEANA_AI_SYSTEM_PROMPT,
      userPrompt: fullUserPrompt,
      temperature: 0.6,
      maxOutputTokens: 1500,
    });

    // 10. Formulate Trip Plan Object if Trip Planning Intent
    let tripPlan = null;
    let estimatedCost = budgetMentioned || null;

    if (intent === 'trip_planning' || daysMentioned) {
      const days = daysMentioned || 2;
      const budget = budgetMentioned || (days * 2500);
      estimatedCost = budget;

      tripPlan = {
        destination: targetDistrict || 'Bangladesh Destination',
        duration_days: days,
        travellers: travellersMentioned || 2,
        estimated_budget: budget,
        currency: 'BDT',
        days: Array.from({ length: days }).map((_, idx) => ({
          day: idx + 1,
          title: `Day ${idx + 1}: ${idx === 0 ? 'Arrival & Exploration' : idx === days - 1 ? 'Highlights & Return' : 'Adventure & Local Delights'}`,
          estimated_cost: Math.round(budget / days)
        }))
      };
    }

    // 11. Persist Messages & Usage in Supabase (if authenticated)
    let savedAssistantMessageId = crypto.randomUUID();

    if (user && conversationId) {
      // Save User Message
      await supabase.from('ai_messages').insert({
        conversation_id: conversationId,
        user_id: user.id,
        role: 'user',
        content: message,
        metadata: {
          intent,
          targetDistrict,
          budgetMentioned,
        }
      });

      // Save Assistant Message
      const { data: savedMsg } = await supabase.from('ai_messages').insert({
        id: savedAssistantMessageId,
        conversation_id: conversationId,
        user_id: user.id,
        role: 'assistant',
        content: aiResult.content,
        metadata: {
          intent,
          model: aiResult.model,
          recommendations_count: recommendations.length,
          has_trip_plan: !!tripPlan,
          estimated_cost: estimatedCost,
          token_usage: {
            input: aiResult.inputTokens,
            output: aiResult.outputTokens,
            total: aiResult.totalTokens,
          }
        }
      }).select('id').single();

      if (savedMsg) {
        savedAssistantMessageId = savedMsg.id;
      }

      // Record AI Usage
      await supabase.from('ai_usage').insert({
        user_id: user.id,
        conversation_id: conversationId,
        model: aiResult.model,
        input_tokens: aiResult.inputTokens,
        output_tokens: aiResult.outputTokens,
        total_tokens: aiResult.totalTokens,
      });

      // Update Conversation Updated_at
      await supabase
        .from('ai_conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);
    }

    // 12. Return Final Structured Response
    return new Response(
      JSON.stringify({
        success: true,
        conversation_id: conversationId || 'guest-session',
        message: {
          id: savedAssistantMessageId,
          role: 'assistant',
          content: aiResult.content,
          created_at: new Date().toISOString(),
        },
        recommendations,
        trip_plan: tripPlan,
        estimated_cost: estimatedCost,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('YEANA AI Edge Function Exception:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Sorry, YEANA AI couldn't respond right now. Please try again.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
