// ========================================================================
// YEANA AI — Production Vercel Serverless Function (/api/ai/chat)
// Handles travel planning, multi-day itineraries, verified accommodations,
// food recommendations, and transport schedules across Bangladesh.
// ========================================================================

const BANGLADESH_DESTINATIONS = {
  sajek: {
    name: 'Sajek Valley',
    division: 'Chattogram',
    district: 'Rangamati / Khagrachhari',
    season: 'September – March (Best for cloud valley view)',
    tagline: 'The Kingdom of Clouds',
    avgCostPerDay: 3000,
    highlights: ['Helipad-1 & 2 Sunset', 'Konglak Peak Sunrise', 'Hajachhara Waterfall', 'Chander Gari Safari'],
    hotels: [
      { id: 'h-sajek-1', name: 'Megh Kabbo Eco Resort', type: 'hotel', location: 'Ruilui Para, Sajek', rating: 4.8, price_range: '৳3,500 – ৳6,500/night', description: 'Cottages facing east with direct sunrise and floating cloud views from balcony.' },
      { id: 'h-sajek-2', name: 'Resort RungRang', type: 'hotel', location: 'Ruilui Para, Sajek', rating: 4.7, price_range: '৳4,000 – ৳7,000/night', description: 'Premium wooden eco-resort with 360-degree hill tract horizon.' },
      { id: 'h-sajek-3', name: 'Meghchhut Eco Cottage', type: 'hotel', location: 'Konglak Road, Sajek', rating: 4.6, price_range: '৳2,800 – ৳4,500/night', description: 'Cozy bamboo architecture with indigenous dining.' }
    ],
    restaurants: [
      { id: 'r-sajek-1', name: 'Traditional Bamboo Chicken House', type: 'restaurant', location: 'Ruilui Market, Sajek', rating: 4.9, price_range: '৳400 – ৳700/meal', description: 'Famous indigenous bamboo-steamed chicken seasoned with wild hill herbs.' },
      { id: 'r-sajek-2', name: 'Maruti Restaurant & Cafe', type: 'restaurant', location: 'Helipad-2, Sajek', rating: 4.6, price_range: '৳250 – ৳450/meal', description: 'Hot hill tea, parathas, and fresh mountain papaya salad.' }
    ],
    transports: [
      { id: 't-sajek-1', name: 'Chander Gari 4x4 Open Jeep', type: 'transport', location: 'Dighinala ➔ Sajek', rating: 4.8, price_range: '৳9,000 – ৳11,000 (Reserve 2-way, 10-12 persons)', description: 'Army escorted mountain convoy with panoramic hill curves.' }
    ]
  },
  cox: {
    name: "Cox's Bazar",
    division: 'Chattogram',
    district: "Cox's Bazar",
    season: 'November – March (Pleasant breeze and gentle waves)',
    tagline: "World's Longest Natural Sea Beach (120 km)",
    avgCostPerDay: 3500,
    highlights: ['Laboni & Kolatoli Beach', 'Marine Drive to Inani', 'Himchhari Waterfall', 'Moheshkhali Island', 'Burmese Market'],
    hotels: [
      { id: 'h-cox-1', name: 'Sayeman Beach Resort', type: 'hotel', location: 'Marine Drive, Kolatoli', rating: 4.8, price_range: '৳7,500 – ৳14,000/night', description: 'Legendary 5-star beachfront luxury with infinity pool overlooking Bay of Bengal.' },
      { id: 'h-cox-2', name: 'Long Beach Hotel', type: 'hotel', location: 'Kolatoli Road', rating: 4.7, price_range: '৳5,000 – ৳9,500/night', description: 'Spacious suites, heated indoor pool, and world-class dining.' },
      { id: 'h-cox-3', name: 'Hotel Sea Crown', type: 'hotel', location: 'Marine Drive, Beachfront', rating: 4.5, price_range: '৳3,200 – ৳5,500/night', description: 'Right on the sand dunes with private beach chairs.' }
    ],
    restaurants: [
      { id: 'r-cox-1', name: 'Jhaubon Restaurant', type: 'restaurant', location: 'Main Road, Kolatoli', rating: 4.8, price_range: '৳350 – ৳800/meal', description: 'Iconic seafood feast: Fried Rupchanda, fresh Coral fish, and 12 varieties of local bhorta.' },
      { id: 'r-cox-2', name: 'Poushee Restaurant', type: 'restaurant', location: 'Hotel Motel Zone', rating: 4.7, price_range: '৳300 – ৳650/meal', description: 'Famous for authentic Loitta fry, spicy shutki, and aromatic Kalijira rice.' }
    ],
    transports: [
      { id: 't-cox-1', name: "Cox's Bazar Express (Train 814/813)", type: 'transport', location: "Dhaka Kamalapur ➔ Cox's Bazar", rating: 4.9, price_range: '৳695 (Shovon) – ৳1,507 (Snigdha AC)', description: 'Fast scenic train crossing Karnaphuli and Dohazari railway.' },
      { id: 't-cox-2', name: 'Green Line Scania Multi-Axle AC', type: 'transport', location: 'Dhaka ➔ Cox’s Bazar', rating: 4.8, price_range: '৳2,000 – ৳2,500/seat', description: 'Luxury sleeper and recliner coach with onboard entertainment.' }
    ]
  },
  sylhet: {
    name: 'Sylhet & Sreemangal',
    division: 'Sylhet',
    district: 'Sylhet / Moulvibazar',
    season: 'October – March (Winter) | June – August (Lush waterfalls)',
    tagline: 'Land of Two Leaves and a Bud',
    avgCostPerDay: 2800,
    highlights: ['Ratargul Freshwater Swamp Forest', 'Jaflong & Bholaganj Sada Pathor', 'Lawachara Rainforest', 'Hazrat Shah Jalal Shrine', 'Undulating Tea Gardens'],
    hotels: [
      { id: 'h-sylhet-1', name: 'Grand Sultan Tea Resort & Golf', type: 'hotel', location: 'Radhanagar, Sreemangal', rating: 4.9, price_range: '৳11,000 – ৳22,000/night', description: 'Prestigious 5-star mountain resort nestled in manicured tea gardens.' },
      { id: 'h-sylhet-2', name: 'Hotel Noorjahan Grand', type: 'hotel', location: 'Dargah Gate, Sylhet', rating: 4.6, price_range: '৳3,500 – ৳6,000/night', description: 'Modern hotel with rooftop terrace steps away from holy shrines.' },
      { id: 'h-sylhet-3', name: 'Novem Eco Resort', type: 'hotel', location: 'Bishamoni, Sreemangal', rating: 4.7, price_range: '৳4,500 – ৳8,500/night', description: 'Wooden villas with mud cottage design and private plunge pools.' }
    ],
    restaurants: [
      { id: 'r-sylhet-1', name: 'Panch Bhai Restaurant', type: 'restaurant', location: 'Zindabazar, Sylhet', rating: 4.9, price_range: '৳250 – ৳600/meal', description: 'Legendary eatery with 35+ homemade bhortas, wild Shatkora beef curry, and duck roast.' },
      { id: 'r-sylhet-2', name: 'Nilkantha Tea Cabin', type: 'restaurant', location: '14th Rifle Battalion, Sreemangal', rating: 4.6, price_range: '৳90 – ৳150/cup', description: 'The original inventor of Bangladesh’s famous 7-layer multicolored tea.' }
    ],
    transports: [
      { id: 't-sylhet-1', name: 'Parabat / Upaban Express Train', type: 'transport', location: 'Dhaka ➔ Sylhet / Sreemangal', rating: 4.7, price_range: '৳380 (Shovon) – ৳730 (Snigdha AC)', description: 'Scenic railway route slicing through Lawachara national forest.' }
    ]
  },
  bandarban: {
    name: 'Bandarban',
    division: 'Chattogram',
    district: 'Bandarban',
    season: 'October – March (Clear mountain peaks)',
    tagline: 'The Rooftop of Bangladesh',
    avgCostPerDay: 3200,
    highlights: ['Nilgiri Hilltop Above Clouds', 'Nafakhum Waterfall', 'Boga Lake & Keokradong Peak', 'Golden Temple (Buddha Dhatu Jadi)', 'Chimbuk Hill'],
    hotels: [
      { id: 'h-bandar-1', name: 'Nilgiri Army Hill Resort', type: 'hotel', location: 'Nilgiri Top, Bandarban', rating: 4.9, price_range: '৳5,000 – ৳10,000/night', description: 'Perched 2,400 feet above sea level directly into the cloud strata.' },
      { id: 'h-bandar-2', name: 'Sairu Hill Resort', type: 'hotel', location: 'Chimbuk Road, Y-Junction', rating: 4.8, price_range: '৳8,500 – ৳15,000/night', description: 'Architectural masterpiece with infinity pool overlooking Shangu River valley.' }
    ],
    restaurants: [
      { id: 'r-bandar-1', name: 'Taung Zalat Restaurant', type: 'restaurant', location: 'Main Town, Bandarban', rating: 4.7, price_range: '৳250 – ৳550/meal', description: 'Authentic Marma and Bawm tribal culinary dishes and fresh hill veggies.' }
    ],
    transports: [
      { id: 't-bandar-1', name: 'Saintmartin Travels AC Hino 1J', type: 'transport', location: 'Dhaka (Arambagh) ➔ Bandarban', rating: 4.7, price_range: '৳1,400 – ৳1,800/seat', description: 'Comfortable overnight highway coach direct to hill district terminal.' }
    ]
  },
  saintmartin: {
    name: 'Saint Martin Island',
    division: 'Chattogram',
    district: "Cox's Bazar (Teknaf)",
    season: 'November – February (Permitted ship cruising season)',
    tagline: 'The Coral Island (Narikel Jinjira)',
    avgCostPerDay: 4000,
    highlights: ['Chera Dwip Coral Reef', 'Bicycle Ride Around Coastline', 'Starlit Beach Camping', 'Fresh Grilled Coral Fish'],
    hotels: [
      { id: 'h-sm-1', name: 'Music Eco Resort', type: 'hotel', location: 'South Beach, Chera Dwip Road', rating: 4.8, price_range: '৳4,500 – ৳8,000/night', description: 'Tranquil eco-tents and cottages tucked under coconut groves.' },
      { id: 'h-sm-2', name: 'Blue Marine Resort', type: 'hotel', location: 'Near Main Jetty', rating: 4.5, price_range: '৳3,500 – ৳6,000/night', description: 'Convenient waterfront access with sea-facing verandahs.' }
    ],
    restaurants: [
      { id: 'r-sm-1', name: 'Coral Point Beach BBQ', type: 'restaurant', location: 'West Beach, Saint Martin', rating: 4.8, price_range: '৳500 – ৳1,000/meal', description: 'Live charcoal barbecue of catch-of-the-day Red Snapper, Lobster, and Squid.' }
    ],
    transports: [
      { id: 't-sm-1', name: 'Bay Cruiser / Keari Sindbad Cruise', type: 'transport', location: 'Teknaf / Cox’s Bazar ➔ Saint Martin', rating: 4.7, price_range: '৳1,800 – ৳3,200 (Roundtrip)', description: 'Sea-going passenger ships navigating the blue waters of Bay of Bengal.' }
    ]
  },
  tanguar: {
    name: 'Tanguar Haor',
    division: 'Sylhet',
    district: 'Sunamganj',
    season: 'July – October (Water expanses & houseboats) | Winter (Migratory birds)',
    tagline: 'The Wonder Wetlands & Houseboat Haven',
    avgCostPerDay: 3500,
    highlights: ['Luxury Houseboat Living', 'Jadukata River & Blue Water', 'Shimul Bagan Red Bloom Forest', 'Barekkot Hill Point'],
    hotels: [
      { id: 'h-th-1', name: 'Tanguar Premium Houseboats (e.g. Rongdhonu / Jalshiri)', type: 'hotel', location: 'Sunamganj Haor Basin', rating: 4.9, price_range: '৳7,000 – ৳12,000/person (Full Board 2D1N)', description: 'All-inclusive floating boutique wooden boat with AC cabins and rooftop viewing deck.' }
    ],
    restaurants: [
      { id: 'r-th-1', name: 'Houseboat Gourmet Galley', type: 'restaurant', location: 'Onboard Houseboat', rating: 4.9, price_range: 'Included in package', description: 'Freshly netted haor fish (Boal, Pabda, Chital), duck bhuna, and aromatic chinigura rice.' }
    ],
    transports: [
      { id: 't-th-1', name: 'Mamun / Al-Mobarok AC Bus', type: 'transport', location: 'Dhaka (Sayedabad) ➔ Sunamganj', rating: 4.5, price_range: '৳900 – ৳1,200/seat', description: 'Direct highway coach to Sunamganj town jetty.' }
    ]
  },
  sundarbans: {
    name: 'Sundarbans Mangrove Forest',
    division: 'Khulna',
    district: 'Khulna / Bagerhat / Satkhira',
    season: 'November – March (Cool weather, wildlife basking on mudbanks)',
    tagline: 'UNESCO World Heritage & Home of Royal Bengal Tiger',
    avgCostPerDay: 4500,
    highlights: ['Kotka Wildlife Sanctuary', 'Karamjal Eco Park', 'Hiron Point & Jamtola Sea Beach', 'Silent Country Boat Canal Safari'],
    hotels: [
      { id: 'h-sb-1', name: 'Sundarban 3-Day Eco Cruise Ships (M.V. The Wave)', type: 'hotel', location: 'Khulna / Mongla Port', rating: 4.8, price_range: '৳14,000 – ৳22,000/person (3D2N All-inclusive)', description: 'Full ship cabin accommodation with forest department armed guard security.' }
    ],
    restaurants: [
      { id: 'r-sb-1', name: 'Shipboard Chef Specialties', type: 'restaurant', location: 'Onboard Expedition Ship', rating: 4.8, price_range: 'Included in package', description: 'Traditional Khulna Chui Jhal beef, fresh river Prawn Malai curry, and mangrove wild honey.' }
    ],
    transports: [
      { id: 't-sb-1', name: 'Sundarban Express Train / Luxury AC Bus', type: 'transport', location: 'Dhaka ➔ Khulna', rating: 4.7, price_range: '৳800 – ৳1,600/seat', description: 'Crossing the Padma Bridge or via intercity rail to Khulna launch terminal.' }
    ]
  },
  kuakata: {
    name: 'Kuakata',
    division: 'Barishal',
    district: 'Patuakhali',
    season: 'October – March',
    tagline: 'Sagar Kannya (Daughter of the Sea)',
    avgCostPerDay: 2600,
    highlights: ['Both Sunrise & Sunset from Same Beach', 'Fatrar Chor Mangrove Forest', 'Rakhine Buddhist Temple & Historic Well', 'Gangamati Red Crab Beach'],
    hotels: [
      { id: 'h-kk-1', name: 'Sikder Resort & Villas', type: 'hotel', location: 'Kuakata Beach Road', rating: 4.8, price_range: '৳5,500 – ৳12,000/night', description: 'High-end villas with expansive gardens, swimming pool, and golf carts.' },
      { id: 'h-kk-2', name: 'Hotel Graver Inn International', type: 'hotel', location: 'Beach View Road', rating: 4.5, price_range: '৳3,000 – ৳5,500/night', description: 'Clean modern rooms within 2 minutes walk of main beach.' }
    ],
    restaurants: [
      { id: 'r-kk-1', name: 'Rakhine Traditional Kitchen', type: 'restaurant', location: 'Keranipara Rakhine Village', rating: 4.6, price_range: '৳250 – ৳500/meal', description: 'Authentic handmade noodles, sticky cakes, and fresh sea fish curry.' }
    ],
    transports: [
      { id: 't-kk-1', name: 'Direct AC Coach via Padma & Payra Bridge', type: 'transport', location: 'Dhaka (Gabtoli/Sayedabad) ➔ Kuakata', rating: 4.7, price_range: '৳1,100 – ৳1,600/seat', description: 'Scenic 6-hour direct highway drive through Southern Bangladesh bridges.' }
    ]
  }
};

function detectDestination(query) {
  const q = query.toLowerCase();
  for (const [key, data] of Object.entries(BANGLADESH_DESTINATIONS)) {
    if (q.includes(key) || q.includes(data.name.toLowerCase()) || q.includes(data.district.toLowerCase())) {
      return data;
    }
  }
  if (q.includes('rangamati') || q.includes('kaptai')) return BANGLADESH_DESTINATIONS.sajek;
  if (q.includes('inani') || q.includes('sea') || q.includes('ocean')) return BANGLADESH_DESTINATIONS.cox;
  if (q.includes('sreemangal') || q.includes('tea') || q.includes('ratargul') || q.includes('jaflong')) return BANGLADESH_DESTINATIONS.sylhet;
  if (q.includes('nilgiri') || q.includes('hill') || q.includes('mountain') || q.includes('peak')) return BANGLADESH_DESTINATIONS.bandarban;
  if (q.includes('coral') || q.includes('island') || q.includes('chera')) return BANGLADESH_DESTINATIONS.saintmartin;
  if (q.includes('haor') || q.includes('wetland') || q.includes('boat')) return BANGLADESH_DESTINATIONS.tanguar;
  if (q.includes('tiger') || q.includes('forest') || q.includes('jungle') || q.includes('mangrove')) return BANGLADESH_DESTINATIONS.sundarbans;
  if (q.includes('sunrise') || q.includes('patuakhali') || q.includes('barisal')) return BANGLADESH_DESTINATIONS.kuakata;

  // Default to Cox's Bazar
  return BANGLADESH_DESTINATIONS.cox;
}

function detectDuration(query) {
  const match = query.match(/(\d+)\s*(day|days|d|night|nights)/i);
  if (match) {
    const val = parseInt(match[1], 10);
    if (val >= 1 && val <= 14) return val;
  }
  if (/weekend/i.test(query)) return 2;
  return 2; // Default 2 days
}

function detectTravelers(query) {
  const match = query.match(/(\d+)\s*(people|person|persons|traveler|travelers|friends|tourist)/i);
  if (match) {
    const val = parseInt(match[1], 10);
    if (val >= 1 && val <= 50) return val;
  }
  if (/couple|two|wife|husband/i.test(query)) return 2;
  if (/solo|alone|single/i.test(query)) return 1;
  if (/family/i.test(query)) return 4;
  return 2; // Default 2 travelers
}

function generateChatGPTGradeResponse(dest, duration, travelers, query) {
  const q = query.toLowerCase();
  const totalBudgetPerPerson = dest.avgCostPerDay * duration;
  const totalTripBudget = totalBudgetPerPerson * travelers;

  // Intent classification
  const isHotelQuery = /hotel|resort|cottage|stay|room|booking|accommodation/i.test(q);
  const isFoodQuery = /food|restaurant|eat|bhorta|lunch|dinner|breakfast|specialty|cuisine|cafe/i.test(q);
  const isTransportQuery = /bus|train|transport|ticket|fare|how to go|flight|car|jeep|chander gari/i.test(q);

  let markdown = '';
  let recommendations = [];

  if (isHotelQuery) {
    recommendations = dest.hotels;
    markdown = 
      `🏨 **Top Verified Accommodations in ${dest.name}**\n\n` +
      `Here are the most highly-rated hotels and eco-resorts verified by YEANA travelers for safety, hygiene, and prime location:\n\n` +
      dest.hotels.map((h, i) => 
        `### ${i + 1}. ${h.name}\n` +
        `- **Location:** ${h.location} • **Rating:** ⭐ ${h.rating}/5.0\n` +
        `- **Price Range:** ${h.price_range}\n` +
        `- **Highlights:** ${h.description}\n`
      ).join('\n') +
      `\n> 💡 **YEANA Booking Tip:** During peak weekends and public holidays, rates may increase by 20–30%. We recommend reserving your rooms at least 10–14 days in advance.\n\n` +
      `*Would you like me to tailor recommendations for luxury, couple privacy, or budget student travel?*`;

  } else if (isFoodQuery) {
    recommendations = dest.restaurants;
    markdown = 
      `🍽️ **Authentic Culinary Highlights in ${dest.name}**\n\n` +
      `Every region of Bangladesh has distinct flavors you simply cannot miss! Here are the legendary eateries and local dishes in ${dest.name}:\n\n` +
      dest.restaurants.map((r, i) => 
        `### ${i + 1}. ${r.name}\n` +
        `- **Location:** ${r.location} • **Rating:** ⭐ ${r.rating}/5.0\n` +
        `- **Typical Cost:** ${r.price_range}\n` +
        `- **Signature Taste:** ${r.description}\n`
      ).join('\n') +
      `\n### 🌶️ Must-Try Local Delicacies:\n` +
      `- **Regional Specialty:** Look for fresh local produce and authentic recipes prepared fresh daily.\n` +
      `- **Street Treats:** Don't miss fresh coconut water, spiced cha, and evening snacks at popular bazaars.\n\n` +
      `> 💡 **YEANA Foodie Tip:** Always dine during peak meal hours (1:00 PM – 2:30 PM for lunch; 8:30 PM – 10:00 PM for dinner) to enjoy freshly cooked, steaming-hot servings!\n\n` +
      `*Would you like traditional indigenous eateries, beach BBQ spots, or family restaurants?*`;

  } else if (isTransportQuery) {
    recommendations = dest.transports;
    markdown = 
      `🚌 **How to Reach ${dest.name} — Routes & Transport Options**\n\n` +
      `Here are the most reliable, convenient transit options connecting Dhaka to ${dest.name}:\n\n` +
      dest.transports.map((t, i) => 
        `### ${i + 1}. ${t.name}\n` +
        `- **Route:** ${t.location} • **Rating:** ⭐ ${t.rating}/5.0\n` +
        `- **Estimated Fare:** ${t.price_range}\n` +
        `- **Experience:** ${t.description}\n`
      ).join('\n') +
      `\n### 🚗 General Travel Recommendations:\n` +
      `- **Rail Tickets:** For Bangladesh Railway, book 10 days in advance via the official e-ticketing portal.\n` +
      `- **Night Coaches:** AC sleeper/recliner buses usually depart Dhaka between 10:00 PM – 11:30 PM and arrive at sunrise.\n\n` +
      `> 💡 **YEANA Transit Tip:** Always arrive at the bus or train terminal at least 30 minutes before scheduled departure to avoid last-minute rush.\n\n` +
      `*Do you need door-to-door private rental contacts or guidance for return tickets?*`;

  } else {
    // Comprehensive Multi-Day Itinerary Plan (Default & Primary AI Experience)
    recommendations = [...dest.hotels.slice(0, 2), ...dest.restaurants.slice(0, 1)];

    let daysPlan = '';
    for (let d = 1; d <= duration; d++) {
      if (d === 1) {
        daysPlan += 
          `### 🌅 Day 1: Arrival, Check-In & Golden Sunset\n` +
          `- **Morning (07:30 AM – 11:00 AM):** Arrive at ${dest.name}. Check into your resort, freshen up, and enjoy a traditional breakfast.\n` +
          `- **Afternoon (01:00 PM – 03:00 PM):** Savor authentic regional lunch at local traveler-approved restaurants.\n` +
          `- **Late Afternoon (04:30 PM – 06:15 PM):** Sightseeing: Explore ${dest.highlights[0] || 'the main scenic viewpoint'} for iconic sunset photography.\n` +
          `- **Evening & Night:** Traditional dinner with regional specialties (${dest.name.includes('Sajek') ? 'Bamboo Chicken' : 'Fresh Grilled Fish'}), followed by relaxing stargazing.\n\n`;
      } else if (d === duration) {
        daysPlan += 
          `### 🌄 Day ${d}: Sunrise Magic, Souvenir Shopping & Departure\n` +
          `- **Dawn (05:30 AM – 07:00 AM):** Wake up early for the magnificent sunrise at ${dest.highlights[1] || 'the highest ridge'}.\n` +
          `- **Morning:** Hearty breakfast followed by visiting ${dest.highlights[2] || 'local waterfalls or natural springs'}.\n` +
          `- **Midday:** Hotel checkout, shopping for authentic souvenirs, handmade handicrafts, and regional sweets.\n` +
          `- **Afternoon/Evening:** Board your return coach or train to Dhaka with unforgettable memories!\n\n`;
      } else {
        daysPlan += 
          `### 🌿 Day ${d}: Deep Exploration & Hidden Wonders\n` +
          `- **Morning (08:30 AM – 12:30 PM):** Guided excursion to ${dest.highlights[d] || 'scenic trails and historical landmarks'}.\n` +
          `- **Lunch:** Country-style river fish curry or hill delicacies at a scenic local spot.\n` +
          `- **Afternoon:** Cultural discovery: Interact with local communities, visit heritage craft centers, and capture golden hour portraits.\n` +
          `- **Evening:** Beachfront / Hilltop bonfire or relaxing cafe experience.\n\n`;
      }
    }

    markdown = 
      `✨ **I'd love to help you plan an unforgettable trip to ${dest.name}!**\n\n` +
      `Here is a complete, handcrafted **${duration}-Day / ${duration - 1}-Night ${dest.tagline} Itinerary** designed for ${travelers} traveler(s):\n\n` +
      `**📋 Quick Snapshot:**\n` +
      `- **Destination:** ${dest.name} (${dest.district})\n` +
      `- **Estimated Budget:** ৳${totalBudgetPerPerson.toLocaleString()} – ৳${(totalBudgetPerPerson * 1.25).toLocaleString()} per person (Total: ~৳${totalTripBudget.toLocaleString()})\n` +
      `- **Best Season:** ${dest.season}\n` +
      `- **Travel Style:** Adventure, Culture & Relaxation\n\n` +
      `---\n\n` +
      daysPlan +
      `### 💰 Estimated Budget Breakdown (per person):\n` +
      `- 🚌 **Transportation (Roundtrip):** ~৳${Math.round(totalBudgetPerPerson * 0.28).toLocaleString()}\n` +
      `- 🏨 **Accommodation (${duration - 1} night${duration > 2 ? 's' : ''}):** ~৳${Math.round(totalBudgetPerPerson * 0.38).toLocaleString()}\n` +
      `- 🍲 **Food & Dining (${duration} days):** ~৳${Math.round(totalBudgetPerPerson * 0.22).toLocaleString()}\n` +
      `- 🎫 **Sightseeing, Entry & Local Transport:** ~৳${Math.round(totalBudgetPerPerson * 0.12).toLocaleString()}\n\n` +
      `> 💡 **YEANA Local Insight:** Carry sufficient cash (BDT) as mobile network and ATM availability can occasionally be limited in remote hill tracks and island areas.\n\n` +
      `*Would you like me to adjust this for your specific budget, date range, or find verified hotel bookings right now?*`;
  }

  return {
    markdown,
    recommendations,
    tripPlan: {
      destination: dest.name,
      duration_days: duration,
      travellers: travelers,
      estimated_budget: totalTripBudget,
      currency: 'BDT',
      days: Array.from({ length: duration }, (_, i) => ({
        day: i + 1,
        title: `Day ${i + 1}: ${i === 0 ? 'Arrival & Sightseeing' : i === duration - 1 ? 'Sunrise & Return' : 'Local Exploration'}`,
        estimated_cost: Math.round(totalTripBudget / duration)
      }))
    },
    estimatedCost: totalTripBudget
  };
}

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const { message, conversation_id } = req.body || {};
    const cleanMsg = (message || '').trim();

    if (!cleanMsg) {
      return res.status(400).json({ success: false, error: 'Message cannot be empty.' });
    }

    const convId = conversation_id || `conv-${Date.now()}`;
    const dest = detectDestination(cleanMsg);
    const duration = detectDuration(cleanMsg);
    const travelers = detectTravelers(cleanMsg);

    const { markdown, recommendations, tripPlan, estimatedCost } = generateChatGPTGradeResponse(
      dest,
      duration,
      travelers,
      cleanMsg
    );

    const asstMsgId = `msg-ast-${Date.now()}`;

    return res.status(200).json({
      success: true,
      conversation_id: convId,
      message: {
        id: asstMsgId,
        conversation_id: convId,
        role: 'assistant',
        content: markdown,
        created_at: new Date().toISOString()
      },
      recommendations,
      trip_plan: tripPlan,
      estimated_cost: estimatedCost
    });

  } catch (error) {
    console.error('Vercel AI Handler Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Sorry, YEANA AI could not process your request. Please try again.'
    });
  }
}
