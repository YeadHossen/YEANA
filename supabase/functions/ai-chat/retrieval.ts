// ========================================================================
// YEANA AI — Parameterized Database Retrieval & Intent Detection Layer
// Safe, controlled queries against Supabase tables without arbitrary SQL.
// ========================================================================

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

export type TravelIntent = 
  | 'destination_search'
  | 'hotel_search'
  | 'restaurant_search'
  | 'transport_search'
  | 'shopping_search'
  | 'trip_planning'
  | 'budget_calculation'
  | 'general_travel_question';

export interface RetrievedRecommendation {
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

// Major Bangladesh Travel Destinations & District Keywords
const DISTRICT_KEYWORDS: Record<string, string> = {
  'sajek': 'Khagrachhari',
  'sylhet': 'Sylhet',
  'sreemangal': 'Moulvibazar',
  'moulvibazar': 'Moulvibazar',
  'cox': "Cox's Bazar",
  "cox's bazar": "Cox's Bazar",
  'coxsbazar': "Cox's Bazar",
  'bandarban': 'Bandarban',
  'rangamati': 'Rangamati',
  'dhaka': 'Dhaka',
  'chittagong': 'Chattogram',
  'chattogram': 'Chattogram',
  'khulna': 'Khulna',
  'sundarban': 'Bagerhat',
  'sundarbans': 'Bagerhat',
  'bagerhat': 'Bagerhat',
  'barishal': 'Barishal',
  'kuakata': 'Patuakhali',
  'patuakhali': 'Patuakhali',
  'rajshahi': 'Rajshahi',
  'rangpur': 'Rangpur',
  'bogura': 'Bogura',
  'bogra': 'Bogura',
  'saint martin': "Cox's Bazar",
  'st martin': "Cox's Bazar",
  'st. martin': "Cox's Bazar",
  'sunamganj': 'Sunamganj',
  'tanguar': 'Sunamganj',
  'jaflong': 'Sylhet',
  'bichanakandi': 'Sylhet',
  'ratargul': 'Sylhet',
};

export function detectIntentAndKeywords(message: string): {
  intent: TravelIntent;
  targetDistrict?: string;
  budgetMentioned?: number;
  daysMentioned?: number;
  travellersMentioned?: number;
} {
  const lower = message.toLowerCase();

  // 1. Detect District / Location
  let targetDistrict: string | undefined;
  for (const [kw, dist] of Object.entries(DISTRICT_KEYWORDS)) {
    if (lower.includes(kw)) {
      targetDistrict = dist;
      break;
    }
  }

  // 2. Extract Numbers (Days, Budget, Travellers)
  const daysMatch = lower.match(/(\d+)\s*(?:day|days|din|raat)/i);
  const daysMentioned = daysMatch ? parseInt(daysMatch[1], 10) : undefined;

  const budgetMatch = lower.match(/(?:budget|under|cost|taka|৳|tk|bdt)\s*(?:of|is|:)?\s*(\d[\d,]*)/i) ||
                      lower.match(/(\d[\d,]*)\s*(?:taka|৳|tk|bdt)/i);
  const budgetMentioned = budgetMatch ? parseInt(budgetMatch[1].replace(/,/g, ''), 10) : undefined;

  const travellersMatch = lower.match(/(\d+)\s*(?:people|persons|travellers|travelers|jon|friends|family)/i) ||
                          lower.match(/for\s*(\d+)/i);
  const travellersMentioned = travellersMatch ? parseInt(travellersMatch[1], 10) : undefined;

  // 3. Detect Intent
  let intent: TravelIntent = 'general_travel_question';

  if (lower.includes('plan') || lower.includes('itinerary') || (daysMentioned && daysMentioned > 0)) {
    intent = 'trip_planning';
  } else if (lower.includes('hotel') || lower.includes('resort') || lower.includes('stay') || lower.includes('room') || lower.includes('cottage')) {
    intent = 'hotel_search';
  } else if (lower.includes('food') || lower.includes('restaurant') || lower.includes('eat') || lower.includes('cafe') || lower.includes('biryani') || lower.includes('khabar')) {
    intent = 'restaurant_search';
  } else if (lower.includes('transport') || lower.includes('bus') || lower.includes('train') || lower.includes('flight') || lower.includes('launch') || lower.includes('ticket') || lower.includes('route')) {
    intent = 'transport_search';
  } else if (lower.includes('shop') || lower.includes('market') || lower.includes('buy') || lower.includes('handicraft') || lower.includes('craft')) {
    intent = 'shopping_search';
  } else if (lower.includes('budget') || lower.includes('cost') || lower.includes('estimate') || (budgetMentioned && !daysMentioned)) {
    intent = 'budget_calculation';
  } else if (lower.includes('place') || lower.includes('destination') || lower.includes('visit') || lower.includes('sight') || lower.includes('tourist')) {
    intent = 'destination_search';
  }

  return {
    intent,
    targetDistrict,
    budgetMentioned,
    daysMentioned,
    travellersMentioned,
  };
}

export async function searchDatabaseContext(
  supabase: SupabaseClient,
  intent: TravelIntent,
  targetDistrict?: string,
  userMessage?: string
): Promise<{
  contextText: string;
  recommendations: RetrievedRecommendation[];
}> {
  const recommendations: RetrievedRecommendation[] = [];
  const textSections: string[] = [];

  try {
    // 1. Resolve District ID if a district keyword was found
    let districtId: number | null = null;
    if (targetDistrict) {
      const { data: distData } = await supabase
        .from('districts')
        .select('id, name, name_bn, popular_season')
        .ilike('name', `%${targetDistrict}%`)
        .limit(1)
        .maybeSingle();

      if (distData) {
        districtId = distData.id;
        textSections.push(`Target Region: ${distData.name} (${distData.name_bn || ''}), Best Season: ${distData.popular_season || 'Year-round'}`);
      }
    }

    // 2. Fetch Destinations / Places
    if (intent === 'destination_search' || intent === 'trip_planning' || intent === 'general_travel_question') {
      let q = supabase
        .from('destinations')
        .select('id, name, name_bn, category, short_description, location_address, entry_fee, entry_fee_info, rating, cover_image_url, district:districts(name)')
        .eq('is_active', true)
        .order('rating', { ascending: false })
        .limit(districtId ? 6 : 4);

      if (districtId) {
        q = q.eq('district_id', districtId);
      }

      const { data: places } = await q;
      if (places && places.length > 0) {
        const placeLines = places.map((p: any) => {
          recommendations.push({
            type: 'destination',
            id: p.id,
            name: p.name,
            name_bn: p.name_bn,
            location: p.location_address || p.district?.name || 'Bangladesh',
            price: p.entry_fee > 0 ? `৳${p.entry_fee}` : 'Free entry',
            rating: p.rating,
            image: p.cover_image_url,
          });
          return `- ${p.name} (${p.category}): ${p.short_description || ''} | Entry: ৳${p.entry_fee || 0} | Rating: ★${p.rating} | Loc: ${p.location_address}`;
        });
        textSections.push(`Verified Tourist Destinations:\n${placeLines.join('\n')}`);
      }
    }

    // 3. Fetch Hotels
    if (intent === 'hotel_search' || intent === 'trip_planning' || intent === 'budget_calculation') {
      let q = supabase
        .from('hotels')
        .select('id, name, name_bn, price_per_night, rating, location_address, cover_image_url, room_types, district:districts(name)')
        .eq('is_active', true)
        .order('rating', { ascending: false })
        .limit(districtId ? 5 : 4);

      if (districtId) {
        q = q.eq('district_id', districtId);
      }

      const { data: hotels } = await q;
      if (hotels && hotels.length > 0) {
        const hotelLines = hotels.map((h: any) => {
          recommendations.push({
            type: 'hotel',
            id: h.id,
            name: h.name,
            name_bn: h.name_bn,
            location: h.location_address || h.district?.name || 'Bangladesh',
            price: `৳${h.price_per_night}/night`,
            rating: h.rating,
            image: h.cover_image_url,
          });
          return `- ${h.name}: ৳${h.price_per_night}/night | Rating: ★${h.rating} | Address: ${h.location_address}`;
        });
        textSections.push(`Verified Hotels & Accommodations:\n${hotelLines.join('\n')}`);
      }
    }

    // 4. Fetch Restaurants & Delicacies
    if (intent === 'restaurant_search' || intent === 'trip_planning') {
      let q = supabase
        .from('restaurants')
        .select('id, name, name_bn, cuisine, price_tier, rating, location_address, cover_image_url, menu_highlights, district:districts(name)')
        .eq('is_active', true)
        .order('rating', { ascending: false })
        .limit(districtId ? 5 : 3);

      if (districtId) {
        q = q.eq('district_id', districtId);
      }

      const { data: rests } = await q;
      if (rests && rests.length > 0) {
        const restLines = rests.map((r: any) => {
          recommendations.push({
            type: 'restaurant',
            id: r.id,
            name: r.name,
            name_bn: r.name_bn,
            location: r.location_address || r.district?.name || 'Bangladesh',
            price: r.price_tier || '৳৳',
            rating: r.rating,
            image: r.cover_image_url,
          });
          return `- ${r.name} (${r.cuisine}): Rating ★${r.rating} | Tier: ${r.price_tier} | Specialties: ${(r.menu_highlights || []).join(', ')}`;
        });
        textSections.push(`Verified Food & Restaurants:\n${restLines.join('\n')}`);
      }
    }

    // 5. Fetch Transport Routes
    if (intent === 'transport_search' || intent === 'trip_planning') {
      let q = supabase
        .from('transport_routes')
        .select('id, company, departure_time, arrival_time, duration, price_min, price_max, transport_type:transport_types(name), from_district:districts!from_district_id(name), to_district:districts!to_district_id(name)')
        .eq('is_active', true)
        .limit(4);

      if (districtId) {
        q = q.or(`to_district_id.eq.${districtId},from_district_id.eq.${districtId}`);
      }

      const { data: routes } = await q;
      if (routes && routes.length > 0) {
        const routeLines = routes.map((rt: any) => {
          const typeName = rt.transport_type?.name || 'Bus';
          recommendations.push({
            type: 'transport',
            id: rt.id,
            name: `${rt.company} (${typeName})`,
            location: `${rt.from_district?.name || 'Dhaka'} ➔ ${rt.to_district?.name || 'Destination'}`,
            price: `৳${rt.price_min} - ৳${rt.price_max}`,
            details: { duration: rt.duration, departure: rt.departure_time }
          });
          return `- ${rt.company} (${typeName}): ${rt.from_district?.name} to ${rt.to_district?.name} | Fare: ৳${rt.price_min}-${rt.price_max} | Duration: ${rt.duration}`;
        });
        textSections.push(`Verified Transport Routes:\n${routeLines.join('\n')}`);
      }
    }

  } catch (err) {
    console.warn('YEANA Database Context Search Warning:', err);
  }

  return {
    contextText: textSections.join('\n\n'),
    recommendations: recommendations.slice(0, 8), // Cap recommendations at top 8
  };
}
