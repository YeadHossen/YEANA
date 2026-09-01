import { TravelerInquiry } from '../types';

export const INITIAL_INQUIRIES: TravelerInquiry[] = [
  {
    id: 'inq-bandarban-trek-01',
    traveler_id: 'usr-traveler-01',
    traveler_name: 'Anika Rahman',
    traveler_email: 'anika.travel@yeana.bd',
    traveler_phone: '+880 1712-345678',
    traveler_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    subject: '4-Day Mountain Trek & 4x4 Chander Gari Booking Assistance in Bandarban',
    category: 'trip_planning',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    last_message: 'Hi YEANA team! We chose our itinerary and need a verified local guide and Chander Gari driver.',
    unread_for_admin: 1,
    unread_for_traveler: 0,
    traveler_choices: {
      destination: 'Bandarban (বান্দরবান)',
      district_name: 'Bandarban',
      selected_places: [
        { id: 'place-nilgiri', name: 'Nilgiri Peak (নীলগিরি)', category: 'Hill' },
        { id: 'place-nafakhum', name: 'Nafakhum Waterfall (নাফাখুম জলপ্রপাত)', category: 'Waterfall' },
        { id: 'place-boga-lake', name: 'Boga Lake & Keokradong (বগা লেক)', category: 'Nature' },
        { id: 'place-golden-temple', name: 'Buddha Dhatu Jadi / Golden Temple', category: 'Heritage' }
      ],
      selected_hotel: {
        id: 'hotel-bandarban-eco',
        name: 'Hillside Eco Resort & Cottages, Chimbuk Road',
        room_type: 'Mountain View Deluxe Wooden Cottage (2 Rooms)',
        price_per_night: 4500
      },
      selected_ride: {
        id: 'ride-chander-gari',
        title: 'Chander Gari 4x4 Mountain Jeep (Full Day Reserve with Hill Driver)',
        vehicle_type: 'Chander Gari (4x4)',
        estimated_cost: 6500
      },
      selected_specialties: [
        { id: 'spec-bandarban-tribal-shawls', name: 'Bandarban Bawm & Marma Handloom Shawls', category: 'Dress & Handloom', price_range: '৳৬০০ - ৳৩,৫০০' },
        { id: 'spec-bandarban-mountain-honey', name: 'Hill Wild Honey & Organic Mountain Coffee', category: 'Natural Produce', price_range: '৳৭০০ - ৳১,২০০ / কেজি' }
      ],
      travel_dates: {
        start_date: '2026-10-20',
        end_date: '2026-10-23',
        duration_days: 4
      },
      group_size: 4,
      budget_range: '৳২৮,০০০ - ৳৩৫,০০০',
      special_notes: 'We need an experienced licensed local tribal guide for the Remakri-Nafakhum river trekking route. Please confirm permit requirements.'
    },
    messages: [
      {
        id: 'msg-01-01',
        inquiry_id: 'inq-bandarban-trek-01',
        sender_id: 'usr-traveler-01',
        sender_name: 'Anika Rahman',
        sender_role: 'traveler',
        sender_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        message: 'Hello YEANA Concierge! I have created our 4-day Bandarban mountain itinerary through the trip planner. We selected our preferred places, eco-cottage, and 4x4 Chander Gari ride. Could you please review our choices, check guide availability, and confirm the total quotation?',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        is_read: false,
        attachment_type: 'choices'
      }
    ],
    admin_notes: 'Requires Thanchi police clearance and approved guide assignment. Chander Gari association contact pending.'
  },
  {
    id: 'inq-sylhet-honeymoon-02',
    traveler_id: 'usr-traveler-02',
    traveler_name: 'Tanvir Ahmed',
    traveler_email: 'tanvir.ahmed@outlook.com',
    traveler_phone: '+880 1819-876543',
    traveler_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    subject: 'Luxury Sreemangal & Sylhet Resort Booking with 7-Layer Tea Experience',
    category: 'hotel_booking',
    status: 'in_progress',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    last_message: 'Admin: We have contacted Grand Sultan and arranged the VIP Tea Garden tour package.',
    unread_for_admin: 0,
    unread_for_traveler: 1,
    traveler_choices: {
      destination: 'Moulvibazar & Sylhet (শ্রীমঙ্গল ও সিলেট)',
      district_name: 'Moulvibazar',
      selected_places: [
        { id: 'place-lawachara', name: 'Lawachara National Park & Rain Forest', category: 'Forest' },
        { id: 'place-madhabkunda', name: 'Madhabkunda Waterfall (মাধবকুণ্ড)', category: 'Waterfall' },
        { id: 'place-ratargul', name: 'Ratargul Swamp Forest (রাতারগুল)', category: 'Forest' }
      ],
      selected_hotel: {
        id: 'hotel-grand-sultan',
        name: 'Grand Sultan Tea Resort & Golf, Sreemangal',
        room_type: 'King Executive Suite with Golf & Mountain View',
        price_per_night: 14500
      },
      selected_specialties: [
        { id: 'spec-monipuri-saree-shawl', name: 'Monipuri Handwoven Saree & Shawl', category: 'Dress & Handloom', price_range: '৳১,৫০০ - ৳১২,০০০' },
        { id: 'spec-sreemangal-seven-layer-tea', name: 'Sreemangal 7-Layer Colored Tea & Organic Tea Boxes', category: 'Food & Sweet', price_range: '৳৮০ - ৳১,৫০০' }
      ],
      travel_dates: {
        start_date: '2026-11-05',
        end_date: '2026-11-08',
        duration_days: 3
      },
      group_size: 2,
      budget_range: '৳৪৫,০০০ - ৳৬০,০০০',
      special_notes: 'Honeymoon couple trip. Looking for private AC sedan airport pick-up from Osmani International Airport to Grand Sultan.'
    },
    messages: [
      {
        id: 'msg-02-01',
        inquiry_id: 'inq-sylhet-honeymoon-02',
        sender_id: 'usr-traveler-02',
        sender_name: 'Tanvir Ahmed',
        sender_role: 'traveler',
        sender_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        message: 'Hi Admin, I have selected Grand Sultan for 3 nights along with Lawachara and Ratargul. Is private airport transfer included, and can you assist with reserving the King Suite?',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        is_read: true,
        attachment_type: 'choices'
      },
      {
        id: 'msg-02-02',
        inquiry_id: 'inq-sylhet-honeymoon-02',
        sender_id: 'usr-admin-01',
        sender_name: 'YEANA Admin (Zubayer)',
        sender_role: 'admin',
        sender_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        message: 'Hello Tanvir! Congratulations on your upcoming trip! We have verified availability at Grand Sultan for Nov 5-8. We can arrange a dedicated luxury private sedan (Noah/Allion) from Sylhet Airport for ৳3,500. We also arranged a complimentary tea tasting session at Nilkantha Tea Cabin.',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        is_read: false,
        attachment_type: 'quote'
      }
    ],
    admin_notes: 'Airport pick-up car reservation requested with driver Jamal (+880 1711-334455).'
  },
  {
    id: 'inq-tangail-specialty-03',
    traveler_id: 'usr-traveler-03',
    traveler_name: 'Sadia Karim',
    traveler_email: 'sadia.karim@gmail.com',
    traveler_phone: '+880 1912-998877',
    traveler_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    subject: 'Direct Sourcing of Authentic Tangail Taant Sarees & Porabari Chomchom',
    category: 'specialty_order',
    status: 'confirmed',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    last_message: 'Admin: Your 2 GI Taant Sarees and 3kg Porabari Chomchom are packed and dispatched via express courier.',
    unread_for_admin: 0,
    unread_for_traveler: 0,
    traveler_choices: {
      destination: 'Tangail (টাঙ্গাইল)',
      district_name: 'Tangail',
      selected_specialties: [
        { id: 'spec-tangail-taant-saree', name: 'Tangail Taant Saree (GI Tagged - 2 Pieces, Royal Jacquard Blue & Gold)', category: 'Dress & Handloom', price_range: '৳৪,৫০০ / পিস' },
        { id: 'spec-tangail-porabari-chomchom', name: 'Porabari Chomchom (GI Tagged - 3 kg, Fresh Mawa Pack)', category: 'Food & Sweet', price_range: '৳৪৫০ / কেজি' }
      ],
      group_size: 1,
      budget_range: '৳১১,০০০',
      special_notes: 'Authentic Pathrail weaver Basak master collection required with GI seal.'
    },
    messages: [
      {
        id: 'msg-03-01',
        inquiry_id: 'inq-tangail-specialty-03',
        sender_id: 'usr-traveler-03',
        sender_name: 'Sadia Karim',
        sender_role: 'traveler',
        sender_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        message: 'Can YEANA help source authentic GI-certified Tangail Taant sarees directly from Pathrail Basak weavers and fresh Porabari Chomchom for a family gift hamper?',
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        is_read: true,
        attachment_type: 'choices'
      },
      {
        id: 'msg-03-02',
        inquiry_id: 'inq-tangail-specialty-03',
        sender_id: 'usr-admin-01',
        sender_name: 'YEANA Admin',
        sender_role: 'admin',
        sender_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        message: 'Dear Sadia, your items have been hand-picked directly from Pathrail Handloom Society and fresh Porabari Chomchom from Five Star Sweetmeat. They are securely insulated and dispatched via Sundarban Express (Tracking #SN-982341).',
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
        is_read: true,
        attachment_type: 'status_update'
      }
    ],
    admin_notes: 'Sourced from Pathrail Artisan #08. Chomchom packed in thermal dry container.'
  }
];
