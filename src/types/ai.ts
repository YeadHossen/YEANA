// ========================================================================
// YEANA AI — Type Definitions for Web & Desktop Travel Assistant
// ========================================================================

export type AIMessageRole = 'user' | 'assistant' | 'system';

export interface AIRecommendationItem {
  type: 'destination' | 'hotel' | 'restaurant' | 'transport' | 'shopping' | 'rental';
  id: string;
  name: string;
  name_bn?: string;
  location: string;
  price?: string | number;
  rating?: number;
  image?: string;
  details?: Record<string, any>;
}

export interface AITripDay {
  day: number;
  title: string;
  estimated_cost?: number;
  activities?: string[];
}

export interface AITripPlan {
  destination: string;
  duration_days: number;
  travellers: number;
  estimated_budget: number;
  currency?: string;
  days: AITripDay[];
}

export interface AIMessageMetadata {
  intent?: string;
  targetDistrict?: string;
  budgetMentioned?: number;
  recommendations?: AIRecommendationItem[];
  trip_plan?: AITripPlan | null;
  estimated_cost?: number | null;
  model?: string;
  token_usage?: {
    input?: number;
    output?: number;
    total?: number;
  };
}

export interface AIMessage {
  id: string;
  conversation_id: string;
  user_id?: string;
  role: AIMessageRole;
  content: string;
  metadata?: AIMessageMetadata;
  created_at: string;
}

export interface AIConversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  last_message?: string;
}

export interface AIUserPreferences {
  id?: string;
  user_id: string;
  preferred_destinations?: string[];
  preferred_activities?: string[];
  preferred_food?: string[];
  budget_preference?: number;
  preferred_trip_type?: string;
  preferred_transport?: string[];
  preferred_hotel_type?: string;
  travel_companions?: string;
  updated_at?: string;
}

export interface AIChatRequest {
  message: string;
  conversation_id?: string | null;
  context?: Record<string, any>;
}

export interface AIChatResponse {
  success: boolean;
  conversation_id: string;
  message: AIMessage;
  recommendations?: AIRecommendationItem[];
  trip_plan?: AITripPlan | null;
  estimated_cost?: number | null;
  error?: string;
}
