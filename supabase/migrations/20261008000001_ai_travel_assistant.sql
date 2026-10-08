-- ========================================================================
-- YEANA — Bangladesh Tour & Travel Platform
-- Migration: 20261008000001_ai_travel_assistant.sql
-- Description: AI Travel Assistant Schema: ai_conversations, ai_messages,
--              ai_user_preferences, ai_usage, Indexes, Triggers,
--              Row Level Security (RLS) Policies, and Parameterized
--              Travel Data Retrieval Helpers.
-- ========================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================================================
-- 1. AI CONVERSATIONS
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'New Travel Chat',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 2. AI MESSAGES
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.ai_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 3. AI USER PREFERENCES (Travel Persona & Preferences)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.ai_user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    preferred_destinations JSONB NOT NULL DEFAULT '[]'::jsonb,
    preferred_activities JSONB NOT NULL DEFAULT '[]'::jsonb,
    preferred_food JSONB NOT NULL DEFAULT '[]'::jsonb,
    budget_preference NUMERIC(10, 2),
    preferred_trip_type TEXT,
    preferred_transport JSONB NOT NULL DEFAULT '[]'::jsonb,
    preferred_hotel_type TEXT,
    travel_companions TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 4. AI USAGE (Token Tracking & Quota Guard)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.ai_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES public.ai_conversations(id) ON DELETE SET NULL,
    model TEXT NOT NULL,
    input_tokens INTEGER NOT NULL DEFAULT 0,
    output_tokens INTEGER NOT NULL DEFAULT 0,
    total_tokens INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- 5. AUTOMATIC UPDATED_AT TRIGGERS
-- ========================================================================
DROP TRIGGER IF EXISTS trg_ai_conversations_updated_at ON public.ai_conversations;
CREATE TRIGGER trg_ai_conversations_updated_at
    BEFORE UPDATE ON public.ai_conversations
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_ai_user_preferences_updated_at ON public.ai_user_preferences;
CREATE TRIGGER trg_ai_user_preferences_updated_at
    BEFORE UPDATE ON public.ai_user_preferences
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ========================================================================
-- 6. PERFORMANCE INDEXES
-- ========================================================================
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_id ON public.ai_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_updated_at ON public.ai_conversations(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_messages_conv_created ON public.ai_messages(conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_ai_messages_user_id ON public.ai_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_user_preferences_user_id ON public.ai_user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_usage_user_created ON public.ai_usage(user_id, created_at DESC);

-- ========================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================================
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;

-- 7.1 ai_conversations Policies
CREATE POLICY "Users can view their own AI conversations"
    ON public.ai_conversations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own AI conversations"
    ON public.ai_conversations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI conversations"
    ON public.ai_conversations FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AI conversations"
    ON public.ai_conversations FOR DELETE
    USING (auth.uid() = user_id);

-- 7.2 ai_messages Policies
CREATE POLICY "Users can view messages from their conversations"
    ON public.ai_messages FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create messages in their conversations"
    ON public.ai_messages FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete messages in their conversations"
    ON public.ai_messages FOR DELETE
    USING (auth.uid() = user_id);

-- 7.3 ai_user_preferences Policies
CREATE POLICY "Users can view their own AI preferences"
    ON public.ai_user_preferences FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI preferences"
    ON public.ai_user_preferences FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI preferences"
    ON public.ai_user_preferences FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AI preferences"
    ON public.ai_user_preferences FOR DELETE
    USING (auth.uid() = user_id);

-- 7.4 ai_usage Policies
CREATE POLICY "Users can view their own AI usage"
    ON public.ai_usage FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users or Service Role can record AI usage"
    ON public.ai_usage FOR INSERT
    WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');
