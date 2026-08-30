import { 
  District, 
  Place, 
  Hotel, 
  Restaurant, 
  TransportRoute, 
  ShoppingPlace, 
  Ride, 
  Trip 
} from '../types';

// ============================================================================
// ALL 64 DISTRICTS (ZILAS) OF BANGLADESH ACROSS 8 DIVISIONS
// ============================================================================
export const INITIAL_DISTRICTS: District[] = [
  // -------------------------------------------------------------
  // 1. DHAKA DIVISION (13 Districts)
  // -------------------------------------------------------------
  {
    id: 'dhaka',
    division: 'Dhaka',
    name: 'Dhaka',
    name_bn: 'ঢাকা',
    description: 'The vibrant 400-year-old historic capital city with Mughal heritage, bustling rivers, and street food culture.',
    image_url: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800&auto=format&fit=crop&q=80',
    lat: 23.8103,
    lng: 90.4125,
    popular_season: 'October to March',
    place_count: 8
  },
  {
    id: 'gazipur',
    division: 'Dhaka',
    name: 'Gazipur',
    name_bn: 'গাজীপুর',
    description: 'Home to the largest Safari Park in South Asia, serene eco-resorts, and dense Bhawal Sal forests.',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    lat: 24.0023,
    lng: 90.4267,
    popular_season: 'Year round, especially Winter & Weekends',
    place_count: 4
  },
  {
    id: 'narayanganj',
    division: 'Dhaka',
    name: 'Narayanganj',
    name_bn: 'নারায়ণগঞ্জ',
    description: 'Ancient capital Panam City (Sonargaon), historic river forts, and the heritage of Jamdani weaving.',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    lat: 23.6238,
    lng: 90.5000,
    popular_season: 'November to February',
    place_count: 5
  },
  {
    id: 'tangail',
    division: 'Dhaka',
    name: 'Tangail',
    name_bn: 'টাঙ্গাইল',
    description: 'World-famous Tangail cotton & silk handloom sarees, Mohera Zamindar Bari, and legendary Porabari Chomchom.',
    image_url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80',
    lat: 24.2513,
    lng: 89.9167,
    popular_season: 'October to March',
    place_count: 4
  },
  {
    id: 'kishoreganj',
    division: 'Dhaka',
    name: 'Kishoreganj',
    name_bn: 'কিশোরগঞ্জ',
    description: 'Spectacular Nikli Haor wetlands, all-weather submerged highway, and historic Isha Khan forts.',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    lat: 24.4449,
    lng: 90.7766,
    popular_season: 'July to October (Haor season) & Winter',
    place_count: 4
  },
  {
    id: 'manikganj',
    division: 'Dhaka',
    name: 'Manikganj',
    name_bn: 'মানিকগঞ্জ',
    description: 'Famous for Baliati Palace (one of the largest zamindar palaces in Bangladesh) and Teota Zamindar Bari.',
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    lat: 23.8644,
    lng: 90.0047,
    popular_season: 'Autumn and Winter',
    place_count: 3
  },
  {
    id: 'munshiganj',
    division: 'Dhaka',
    name: 'Munshiganj',
    name_bn: 'মুন্সিগঞ্জ',
    description: 'Ancient Bikrampur heritage, Idrakpur water fort, Arial Beel wetlands, and Padma bridge views.',
    image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80',
    lat: 23.5422,
    lng: 90.5305,
    popular_season: 'October to March',
    place_count: 3
  },
  {
    id: 'narsingdi',
    division: 'Dhaka',
    name: 'Narsingdi',
    name_bn: 'নরসিংদী',
    description: 'Ancient Wari-Bateshwar archaeological site dating back 2,500 years and the Dream Holiday Park.',
    image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80',
    lat: 23.9322,
    lng: 90.7154,
    popular_season: 'Winter & Spring',
    place_count: 3
  },
  {
    id: 'faridpur',
    division: 'Dhaka',
    name: 'Faridpur',
    name_bn: 'ফরিদপুর',
    description: 'Spiritual city of Sufi Shah Farid, Jasimuddin’s ancestral home, and sweet Khejur Gur.',
    image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80',
    lat: 23.6071,
    lng: 89.8429,
    popular_season: 'November to February',
    place_count: 2
  },
  {
    id: 'gopalganj',
    division: 'Dhaka',
    name: 'Gopalganj',
    name_bn: 'গোপালগঞ্জ',
    description: 'Birthplace and mausoleum complex of Bangabandhu Sheikh Mujibur Rahman in Tungipara.',
    image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    lat: 23.0051,
    lng: 89.8266,
    popular_season: 'Year round',
    place_count: 2
  },
  {
    id: 'madaripur',
    division: 'Dhaka',
    name: 'Madaripur',
    name_bn: 'মাদারীপুর',
    description: 'Padma riverbank viewpoints, historic Shah Madar shrine, and traditional molasses production.',
    image_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80',
    lat: 23.1641,
    lng: 90.1897,
    popular_season: 'Winter',
    place_count: 2
  },
  {
    id: 'rajbari',
    division: 'Dhaka',
    name: 'Rajbari',
    name_bn: 'রাজবাড়ী',
    description: 'Gateway to Southern Bangladesh along the mighty Padma River, historic railway heritage and Chamcham sweets.',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    lat: 23.7574,
    lng: 89.6445,
    popular_season: 'October to February',
    place_count: 2
  },
  {
    id: 'shariatpur',
    division: 'Dhaka',
    name: 'Shariatpur',
    name_bn: 'শরীয়তপুর',
    description: 'Riverine beauty with the Padma and Meghna rivers confluence, named after Haji Shariatullah.',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    lat: 23.2423,
    lng: 90.4348,
    popular_season: 'Winter & Autumn',
    place_count: 2
  },

  // -------------------------------------------------------------
  // 2. CHATTOGRAM DIVISION (11 Districts)
  // -------------------------------------------------------------
  {
    id: 'chattogram',
    division: 'Chattogram',
    name: 'Chattogram',
    name_bn: 'চট্টগ্রাম',
    description: 'Commercial capital with Patenga Beach, Guliakhali green beach, heritage shrines, and Mezbani beef.',
    image_url: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800&auto=format&fit=crop&q=80',
    lat: 22.3569,
    lng: 91.7832,
    popular_season: 'October to March',
    place_count: 7
  },
  {
    id: 'coxs-bazar',
    division: 'Chattogram',
    name: "Cox's Bazar",
    name_bn: 'কক্সবাজার',
    description: 'The world’s longest natural unbroken sandy sea beach (120 km), Marine Drive, Inani, and Saint Martin coral island.',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    lat: 21.4272,
    lng: 92.0058,
    popular_season: 'November to March',
    place_count: 8
  },
  {
    id: 'rangamati',
    division: 'Chattogram',
    name: 'Rangamati (Sajek)',
    name_bn: 'রাঙ্গামাটি (সাজেক ভ্যালি)',
    description: 'Valley of clouds Sajek, breathtaking Kaptai Lake, hanging bridges, and Chakma tribal lifestyle.',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    lat: 22.6533,
    lng: 92.1753,
    popular_season: 'September to February',
    place_count: 6
  },
  {
    id: 'bandarban',
    division: 'Chattogram',
    name: 'Bandarban',
    name_bn: 'বান্দরবান',
    description: 'Highest mountain peaks of Bangladesh (Keokradong, Saka Haphong), Nafakhum waterfall, and Nilgiri hilltop.',
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    lat: 22.1953,
    lng: 92.2184,
    popular_season: 'October to March',
    place_count: 6
  },
  {
    id: 'khagrachhari',
    division: 'Chattogram',
    name: 'Khagrachhari',
    name_bn: 'খাগড়াছড়ি',
    description: 'Rich hill district with mysterious Alutila Cave, Richhang waterfall, and scenic mountain roads to Sajek.',
    image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80',
    lat: 23.1192,
    lng: 91.9846,
    popular_season: 'October to March',
    place_count: 4
  },
  {
    id: 'cumilla',
    division: 'Chattogram',
    name: 'Cumilla',
    name_bn: 'কুমিল্লা',
    description: 'Ancient 8th-century Shalban Vihara (Mainamati), Lalmai Hills, and world-famous authentic Rasmalai.',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    lat: 23.4682,
    lng: 91.1788,
    popular_season: 'November to February',
    place_count: 5
  },
  {
    id: 'feni',
    division: 'Chattogram',
    name: 'Feni',
    name_bn: 'ফেনী',
    description: 'Muhuri Project river barrage, scenic green embankment parks, and historic Bijoy Singh Dighi.',
    image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80',
    lat: 23.0186,
    lng: 91.3966,
    popular_season: 'Winter & Autumn',
    place_count: 3
  },
  {
    id: 'brahmanbaria',
    division: 'Chattogram',
    name: 'Brahmanbaria',
    name_bn: 'ব্রাহ্মণবাড়িয়া',
    description: 'Cultural capital of classical music (Ustad Alauddin Khan), Titas river, and delicious Chhanar Mukhi.',
    image_url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80',
    lat: 23.9571,
    lng: 91.1119,
    popular_season: 'Winter',
    place_count: 3
  },
  {
    id: 'noakhali',
    division: 'Chattogram',
    name: 'Noakhali',
    name_bn: 'নোয়াখালী',
    description: 'Nijhum Dwip island (home to thousands of spotted deer), Gandhi Ashram, and Bay of Bengal coastline.',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    lat: 22.8696,
    lng: 91.0993,
    popular_season: 'November to February',
    place_count: 4
  },
  {
    id: 'chandpur',
    division: 'Chattogram',
    name: 'Chandpur',
    name_bn: 'চাঁদপুর',
    description: 'City of Hilsa (Ilish) fish, iconic Padma-Meghna-Dakatia river triple estuary confluence (Mollahata).',
    image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80',
    lat: 23.2333,
    lng: 90.6667,
    popular_season: 'Monsoon for Hilsa & Winter for cruising',
    place_count: 3
  },
  {
    id: 'lakshmipur',
    division: 'Chattogram',
    name: 'Lakshmipur',
    name_bn: 'লক্ষ্মীপুর',
    description: 'Meghna riverbanks, Char Alexander eco-tourism, Dalal Bazar Zamindar Bari, and betel nut orchards.',
    image_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80',
    lat: 22.9425,
    lng: 90.8412,
    popular_season: 'Winter',
    place_count: 2
  },

  // -------------------------------------------------------------
  // 3. SYLHET DIVISION (4 Districts)
  // -------------------------------------------------------------
  {
    id: 'sylhet',
    division: 'Sylhet',
    name: 'Sylhet',
    name_bn: 'সিলেট',
    description: 'Land of two leaves and a bud, spiritual Hazrat Shah Jalal shrine, crystal-clear Jaflong rivers, and Ratargul swamp forest.',
    image_url: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&auto=format&fit=crop&q=80',
    lat: 24.8949,
    lng: 91.8687,
    popular_season: 'October to March (Monsoon for waterfalls)',
    place_count: 7
  },
  {
    id: 'moulvibazar',
    division: 'Sylhet',
    name: 'Moulvibazar (Sreemangal)',
    name_bn: 'মৌলভীবাজার (শ্রীমঙ্গল)',
    description: 'The tea capital of Bangladesh with rolling tea estates, Lawachara rainforest, Madhabkunda waterfall, and 7-layer tea.',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    lat: 24.3065,
    lng: 91.7296,
    popular_season: 'Year round, especially Winter',
    place_count: 6
  },
  {
    id: 'sunamganj',
    division: 'Sylhet',
    name: 'Sunamganj (Tanguar Haor)',
    name_bn: 'সুনামগঞ্জ (টাঙ্গুয়ার হাওর)',
    description: 'Ramsar site Tanguar Haor, luxury houseboats, Shimul Bagan (red silk cotton forest), and Jadukata River.',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    lat: 25.0658,
    lng: 91.4073,
    popular_season: 'July to October (Houseboat season) & Winter for birds',
    place_count: 5
  },
  {
    id: 'habiganj',
    division: 'Sylhet',
    name: 'Habiganj',
    name_bn: 'হবিগঞ্জ',
    description: 'Satchari National Park, lush green tea gardens of Chunarughat, and serene Baniachong (Asia’s largest village).',
    image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    lat: 24.3749,
    lng: 91.4155,
    popular_season: 'October to February',
    place_count: 3
  },

  // -------------------------------------------------------------
  // 4. RAJSHAHI DIVISION (8 Districts)
  // -------------------------------------------------------------
  {
    id: 'rajshahi',
    division: 'Rajshahi',
    name: 'Rajshahi',
    name_bn: 'রাজশাহী',
    description: 'Silk City along the Padma River, renowned for delicious Fazli mangoes, Varendra Research Museum, and Kalai Ruti.',
    image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80',
    lat: 24.3745,
    lng: 88.6042,
    popular_season: 'May-July for Mangoes / Nov-Feb for Travel',
    place_count: 5
  },
  {
    id: 'bogura',
    division: 'Rajshahi',
    name: 'Bogura',
    name_bn: 'বগুড়া',
    description: 'Ancient 3rd-century BC Mahasthangarh fortress city, rich history, and world-famous Bogurar Doi (curd).',
    image_url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80',
    lat: 24.8465,
    lng: 89.3777,
    popular_season: 'October to March',
    place_count: 5
  },
  {
    id: 'naogaon',
    division: 'Rajshahi',
    name: 'Naogaon',
    name_bn: 'নওগাঁ',
    description: 'UNESCO World Heritage site Somapura Mahavihara (Paharpur Buddhist Monastery), Kusumba Mosque, and Dubalhati Palace.',
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    lat: 24.8103,
    lng: 88.9419,
    popular_season: 'November to February',
    place_count: 4
  },
  {
    id: 'natore',
    division: 'Rajshahi',
    name: 'Natore',
    name_bn: 'নাটোর',
    description: 'Historic palace of Rani Bhabani (Natore Rajbari), Uttara Ganabhaban, and mouth-watering Kachagolla sweet.',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    lat: 24.4206,
    lng: 88.9324,
    popular_season: 'October to March',
    place_count: 4
  },
  {
    id: 'chapainawabganj',
    division: 'Rajshahi',
    name: 'Chapainawabganj',
    name_bn: 'চাঁপাইনবাবগঞ্জ',
    description: 'Mango capital of Bangladesh, historic Choto Sona Mosque (1493 AD), and Gambhira folk music heritage.',
    image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80',
    lat: 24.5965,
    lng: 88.2775,
    popular_season: 'Summer for Mangoes / Winter for Heritage',
    place_count: 3
  },
  {
    id: 'pabna',
    division: 'Rajshahi',
    name: 'Pabna',
    name_bn: 'পাবনা',
    description: 'Hardinge Bridge & Lalon Shah Bridge over the Padma, historic Tarash Rajbari, and Anukulchandra Satsanga Ashram.',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    lat: 24.0064,
    lng: 89.2372,
    popular_season: 'October to February',
    place_count: 3
  },
  {
    id: 'sirajganj',
    division: 'Rajshahi',
    name: 'Sirajganj',
    name_bn: 'সিরাজগঞ্জ',
    description: 'Iconic Bangabandhu Jamuna Multipurpose Bridge, Navaratna Temple in Hatkumrul, and handloom lungi/sarees.',
    image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80',
    lat: 24.4534,
    lng: 89.7008,
    popular_season: 'Autumn and Winter',
    place_count: 3
  },
  {
    id: 'joypurhat',
    division: 'Rajshahi',
    name: 'Joypurhat',
    name_bn: 'জয়পুরহাট',
    description: 'Archaeological sites like Lokma Rajbari, Paharpur adjacent trails, and sugar mills belt.',
    image_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80',
    lat: 25.1015,
    lng: 89.0277,
    popular_season: 'Winter',
    place_count: 2
  },

  // -------------------------------------------------------------
  // 5. KHULNA DIVISION (10 Districts)
  // -------------------------------------------------------------
  {
    id: 'khulna',
    division: 'Khulna',
    name: 'Khulna (Sundarbans)',
    name_bn: 'খুলনা (সুন্দরবন)',
    description: 'Gateway to UNESCO World Heritage Sundarbans (largest mangrove forest on Earth & Royal Bengal Tiger habitat) and spicy Chui Jhal beef.',
    image_url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80',
    lat: 22.8456,
    lng: 89.5403,
    popular_season: 'November to March (Cruising Season)',
    place_count: 6
  },
  {
    id: 'bagerhat',
    division: 'Khulna',
    name: 'Bagerhat',
    name_bn: 'বাগেরহাট',
    description: 'UNESCO World Heritage Historic Mosque City of Bagerhat featuring the 15th-century Sixty Dome Mosque (Shat Gombuj Masjid).',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    lat: 22.6516,
    lng: 89.7859,
    popular_season: 'October to February',
    place_count: 5
  },
  {
    id: 'jashore',
    division: 'Khulna',
    name: 'Jashore',
    name_bn: 'যশোর',
    description: 'Gadkhali flower capital (blooming roses & gerberas), poet Michael Madhusudan Dutt’s birthplace, and date palm jaggery (Patali Gur).',
    image_url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80',
    lat: 23.1664,
    lng: 89.2182,
    popular_season: 'December to February (Flower season & Winter)',
    place_count: 4
  },
  {
    id: 'satkhira',
    division: 'Khulna',
    name: 'Satkhira',
    name_bn: 'সাতক্ষীরা',
    description: 'Sundarbans Western range (Munshiganj & Kalidaspur eco-resorts), wild honey harvest, and fresh Sundarbans crabs.',
    image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    lat: 22.7185,
    lng: 89.0705,
    popular_season: 'November to March',
    place_count: 3
  },
  {
    id: 'kushtia',
    division: 'Khulna',
    name: 'Kushtia',
    name_bn: 'কুষ্টিয়া',
    description: 'Mystical shrine of Baul philosopher Fakir Lalon Shah (Chheuriya), Rabindranath Tagore’s Kuthibari in Shilaidaha, and Gorai river.',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    lat: 23.9013,
    lng: 89.1204,
    popular_season: 'Dol Purnima (March) & Autumn/Winter',
    place_count: 5
  },
  {
    id: 'meherpur',
    division: 'Khulna',
    name: 'Meherpur',
    name_bn: 'মেহেরপুর',
    description: 'Mujibnagar Memorial Complex where the Provisional Government of Bangladesh took oath in 1971.',
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    lat: 23.7719,
    lng: 88.6318,
    popular_season: 'Year round',
    place_count: 3
  },
  {
    id: 'chuadanga',
    division: 'Khulna',
    name: 'Chuadanga',
    name_bn: 'চুয়াডাঙ্গা',
    description: 'Historic Gholdari Mosque, Carew & Co. (British era sugar distillery heritage), and Mathabhanga river.',
    image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80',
    lat: 23.6402,
    lng: 88.8418,
    popular_season: 'Winter',
    place_count: 2
  },
  {
    id: 'jhenaidah',
    division: 'Khulna',
    name: 'Jhenaidah',
    name_bn: 'ঝিনাইদহ',
    description: 'Famous for Marjat Baor eco-tourism, Naldanga Rajbari temple complex, and sweet banana cultivation.',
    image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80',
    lat: 23.5450,
    lng: 89.1726,
    popular_season: 'Winter & Spring',
    place_count: 2
  },
  {
    id: 'magura',
    division: 'Khulna',
    name: 'Magura',
    name_bn: 'মাগুরা',
    description: 'Historic Siddheswari Math, Gorai river viewpoints, and traditional Katayani Puja festival celebrations.',
    image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80',
    lat: 23.4873,
    lng: 89.4198,
    popular_season: 'Autumn and Winter',
    place_count: 2
  },
  {
    id: 'narail',
    division: 'Khulna',
    name: 'Narail',
    name_bn: 'নড়াইল',
    description: 'Land of legendary painter SM Sultan (Shishu Swargo art complex), Chitra River, and traditional otter fishing.',
    image_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80',
    lat: 23.1725,
    lng: 89.5127,
    popular_season: 'Autumn and Winter',
    place_count: 3
  },

  // -------------------------------------------------------------
  // 6. BARISHAL DIVISION (6 Districts)
  // -------------------------------------------------------------
  {
    id: 'barishal',
    division: 'Barishal',
    name: 'Barishal',
    name_bn: 'বরিশাল',
    description: 'The Venice of Bengal with romantic backwaters, floating guava markets, Guthia Mosque, and luxury river launches.',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    lat: 22.7010,
    lng: 90.3535,
    popular_season: 'July to October for Guava Markets / Nov-Feb for Cruising',
    place_count: 6
  },
  {
    id: 'patuakhali',
    division: 'Barishal',
    name: 'Patuakhali (Kuakata)',
    name_bn: 'পটুয়াখালী (কুয়াকাটা)',
    description: 'Daughter of the Sea (Sagor Konna) Kuakata beach where both sunrise and sunset can be viewed over the Bay of Bengal.',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    lat: 21.8167,
    lng: 90.1167,
    popular_season: 'October to March',
    place_count: 6
  },
  {
    id: 'bhola',
    division: 'Barishal',
    name: 'Bhola',
    name_bn: 'ভোলা',
    description: 'The largest island district of Bangladesh, Char Kukri Mukri wildlife sanctuary, mangrove forests, and buffalo milk curd.',
    image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80',
    lat: 22.6859,
    lng: 90.6481,
    popular_season: 'November to February',
    place_count: 4
  },
  {
    id: 'jhalokathi',
    division: 'Barishal',
    name: 'Jhalokathi',
    name_bn: 'ঝালকাঠি',
    description: 'Famous for Bhimruli floating guava and hog plum (Amra) market canals, water hyacinth trails, and Sujabad fort.',
    image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80',
    lat: 22.6406,
    lng: 90.1987,
    popular_season: 'July to September (Guava canal boats)',
    place_count: 4
  },
  {
    id: 'pirojpur',
    division: 'Barishal',
    name: 'Pirojpur',
    name_bn: 'পিরোজপুর',
    description: 'Kuriana floating market, Baleshwar riverbank, and Swarupkathi timber & coconut trading canals.',
    image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    lat: 22.5841,
    lng: 89.9720,
    popular_season: 'Monsoon and Winter',
    place_count: 3
  },
  {
    id: 'barguna',
    division: 'Barishal',
    name: 'Barguna',
    name_bn: 'বরগুনা',
    description: 'Shuvo Shondha sea beach, Haringhata eco-tourism mangrove trail, and scenic Payra river delta.',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    lat: 22.0953,
    lng: 90.1121,
    popular_season: 'November to March',
    place_count: 3
  },

  // -------------------------------------------------------------
  // 7. RANGPUR DIVISION (8 Districts)
  // -------------------------------------------------------------
  {
    id: 'rangpur',
    division: 'Rangpur',
    name: 'Rangpur',
    name_bn: 'রংপুর',
    description: 'Palatial Tajhat Palace (now archaeological museum), Chikli Water Park, and delicious Haribhanga mangoes.',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    lat: 25.7439,
    lng: 89.2752,
    popular_season: 'October to February / June for Haribhanga',
    place_count: 5
  },
  {
    id: 'dinajpur',
    division: 'Rangpur',
    name: 'Dinajpur',
    name_bn: 'দিনাজপুর',
    description: 'Masterpiece 18th-century terracotta Kantajew Temple (Kantaji Mandir), Ramsagar National Park, and aromatic Kataribhog rice.',
    image_url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80',
    lat: 25.6217,
    lng: 88.6355,
    popular_season: 'October to March',
    place_count: 5
  },
  {
    id: 'panchagarh',
    division: 'Rangpur',
    name: 'Panchagarh (Tetulia)',
    name_bn: 'পঞ্চগড় (তেঁতুলিয়া)',
    description: 'Northernmost tip of Bangladesh with plainland tea gardens, views of Mt. Kanchenjunga (Himalayas) in autumn, and Mahananda river.',
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    lat: 26.3354,
    lng: 88.5517,
    popular_season: 'October to December (Kanchenjunga clear views)',
    place_count: 5
  },
  {
    id: 'nilphamari',
    division: 'Rangpur',
    name: 'Nilphamari',
    name_bn: 'নীলফামারী',
    description: 'Historic Nil Sagar lake (sanctuary for migratory birds), Saidpur railway workshop heritage, and Teesta Barrage.',
    image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80',
    lat: 25.9318,
    lng: 88.8560,
    popular_season: 'November to February',
    place_count: 3
  },
  {
    id: 'lalmonirhat',
    division: 'Rangpur',
    name: 'Lalmonirhat',
    name_bn: 'লালমনিরহাট',
    description: 'Teesta Barrage, Mogolhat border crossing, and Tin Bigha Corridor enclave heritage.',
    image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80',
    lat: 25.9923,
    lng: 89.2847,
    popular_season: 'Winter',
    place_count: 3
  },
  {
    id: 'kurigram',
    division: 'Rangpur',
    name: 'Kurigram',
    name_bn: 'কুড়িগ্রাম',
    description: 'Brahmaputra and Dharla river islands (Chars), historic Chilmari river port, and Chandamari Mosque.',
    image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80',
    lat: 25.8054,
    lng: 89.6362,
    popular_season: 'Autumn and Winter',
    place_count: 3
  },
  {
    id: 'gaibandha',
    division: 'Rangpur',
    name: 'Gaibandha',
    name_bn: 'গাইবান্ধা',
    description: 'Brahmaputra river eco-tourism, Balashi Ghat river views, and legendary Rasmanjari sweets.',
    image_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80',
    lat: 25.3288,
    lng: 89.5406,
    popular_season: 'Winter',
    place_count: 2
  },
  {
    id: 'thakurgaon',
    division: 'Rangpur',
    name: 'Thakurgaon',
    name_bn: 'ঠাকুরগাঁও',
    description: 'Ancient King’s Palace in Baliadangi, century-old giant mango tree (Shurjapuri), and Tangon river.',
    image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    lat: 26.0337,
    lng: 88.4617,
    popular_season: 'Autumn and Winter',
    place_count: 3
  },

  // -------------------------------------------------------------
  // 8. MYMENSINGH DIVISION (4 Districts)
  // -------------------------------------------------------------
  {
    id: 'mymensingh',
    division: 'Mymensingh',
    name: 'Mymensingh',
    name_bn: 'ময়মনসিংহ',
    description: 'Shashi Lodge (Rajbari), scenic Brahmaputra riverbanks, Bangladesh Agricultural University botanical gardens, and Muktagacha Monda sweet.',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    lat: 24.7471,
    lng: 90.4203,
    popular_season: 'Autumn and Winter',
    place_count: 5
  },
  {
    id: 'netrokona',
    division: 'Mymensingh',
    name: 'Netrokona (Birishiri)',
    name_bn: 'নেত্রকোণা (বিরিশিরি)',
    description: 'Mesmerizing white ceramic clay hills of Durgapur, turquoise blue Someshwari River lake, and Hajong/Garo tribal culture.',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    lat: 24.8833,
    lng: 90.7333,
    popular_season: 'October to March (Clear water season)',
    place_count: 5
  },
  {
    id: 'jamalpur',
    division: 'Mymensingh',
    name: 'Jamalpur',
    name_bn: 'জামালপুর',
    description: 'Famous for traditional Nakshi Kantha handcrafted quilts, Lojpoti sweet curd, and historic Gakul Amin Dargah.',
    image_url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80',
    lat: 24.9375,
    lng: 89.9378,
    popular_season: 'Winter',
    place_count: 3
  },
  {
    id: 'sherpur',
    division: 'Mymensingh',
    name: 'Sherpur (Garo Hills)',
    name_bn: 'শেরপুর (গারো পাহাড়)',
    description: 'Ghazni अवकाश (Ghazni Abakash) and Madhutila eco-parks in the foothills of Meghalaya Garo mountain ranges.',
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    lat: 25.0205,
    lng: 90.0153,
    popular_season: 'October to February',
    place_count: 4
  }
];

// ============================================================================
// EXPANDED TOURIST PLACES ACROSS ALL REGIONS
// ============================================================================
export const INITIAL_PLACES: Place[] = [
  // --- Sylhet Division ---
  {
    id: 'place-jaflong',
    district_id: 'sylhet',
    district_name: 'Sylhet',
    division: 'Sylhet',
    name: 'Jaflong',
    name_bn: 'জাফলং',
    rating: 4.7,
    reviews_count: 382,
    short_description: 'Picturesque hill and river destination with crystal clear water, stone beds, and views of Meghalaya mountains.',
    full_description: 'Jaflong is one of the most famous tourist spots in Sylhet, located at the border of India and Bangladesh along the scenic Piyain River. It is renowned for its rolling tea gardens, stone collection activities, and the scenic view of the Dauki suspension bridge nestled across the Indian border.',
    location: 'Gowainghat, Sylhet',
    lat: 25.1633,
    lng: 92.0177,
    entry_fee: 'Free (Boat ride ৳500-৳800)',
    opening_time: 'Open 24 Hours (Best 8:00 AM - 5:30 PM)',
    best_time: 'October to April (or Rainy season for rushing water)',
    how_to_reach: 'From Sylhet city, hire a private CNG or take a local bus from Kadamtali for a 2-hour journey.',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Nature',
    is_featured: true,
    nearby_hotels: ['hotel-noorjahan', 'hotel-grand-sylhet'],
    nearby_restaurants: ['rest-panshi', 'rest-woondaal']
  },
  {
    id: 'place-ratargul',
    district_id: 'sylhet',
    district_name: 'Sylhet',
    division: 'Sylhet',
    name: 'Ratargul Swamp Forest',
    name_bn: 'রাতারগুল সোয়াম্প ফরেস্ট',
    rating: 4.8,
    reviews_count: 512,
    short_description: 'The only freshwater swamp forest in Bangladesh, submerged under 20-30 feet of emerald water during monsoon.',
    full_description: 'Often called the Amazon of Bangladesh, Ratargul is an evergreen freshwater swamp forest in Sylhet. Navigating through submerged Millettia pinnata (Koroch) trees on a wooden dinghy boat is an unforgettable mystical experience.',
    location: 'Fatehpur, Gowainghat, Sylhet',
    lat: 25.0019,
    lng: 91.9328,
    entry_fee: '৳50 per person + Boat ৳800 per boat',
    opening_time: '6:00 AM - 6:00 PM',
    best_time: 'July to October (Monsoon & Post-Monsoon)',
    how_to_reach: 'Hire a CNG autorickshaw from Ambarkhana, Sylhet to Motorghat (৳500-৳700). Hire a dinghy boat inside the forest.',
    image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Forest',
    is_featured: true,
    nearby_hotels: ['hotel-noorjahan'],
    nearby_restaurants: ['rest-panshi']
  },
  {
    id: 'place-bichanakandi',
    district_id: 'sylhet',
    district_name: 'Sylhet',
    division: 'Sylhet',
    name: 'Bichanakandi',
    name_bn: 'বিছনাকান্দি',
    rating: 4.6,
    reviews_count: 290,
    short_description: 'A magical landscape where the Meghalaya hills meet a tranquil stone-filled river stream.',
    full_description: 'Bichanakandi is a union of Rustompur in Gowainghat where layers of high mountains from India cascade into a shallow stream with cold mountain currents and thousands of pebbles.',
    location: 'Rustompur, Gowainghat, Sylhet',
    lat: 25.1764,
    lng: 91.8845,
    entry_fee: 'Free (Boat ৳1,000-৳1,500)',
    opening_time: 'Sunrise to Sunset',
    best_time: 'June to October (Monsoon)',
    how_to_reach: 'Travel from Sylhet city to Hadarpar ghat by Leguna, then take an engine boat directly to Bichanakandi.',
    image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Waterfall',
    is_featured: true
  },
  {
    id: 'place-sreemangal-tea',
    district_id: 'moulvibazar',
    district_name: 'Moulvibazar (Sreemangal)',
    division: 'Sylhet',
    name: 'Sreemangal Tea Estates & Lawachara',
    name_bn: 'শ্রীমঙ্গল চা বাগান ও লাউয়াছড়া',
    rating: 4.9,
    reviews_count: 420,
    short_description: 'Rolling green tea hills, endangered Hoolock Gibbon sightings, and Seven Color Tea.',
    full_description: 'Sreemangal is known as the tea capital of Bangladesh, containing hundreds of lush tea gardens including Finlay and Zareen estates, alongside Lawachara National Park and tribal villages.',
    location: 'Sreemangal, Moulvibazar',
    lat: 24.3065,
    lng: 91.7296,
    entry_fee: 'Lawachara Entry: ৳50',
    opening_time: '7:00 AM - 5:00 PM',
    best_time: 'September to March',
    how_to_reach: 'Direct train (Parabat/Kalni) from Dhaka Kamalapur to Sreemangal Station (4 hours).',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Tea Garden',
    is_featured: true
  },
  {
    id: 'place-tanguar-haor',
    district_id: 'sunamganj',
    district_name: 'Sunamganj (Tanguar Haor)',
    division: 'Sylhet',
    name: 'Tanguar Haor & Shimul Bagan',
    name_bn: 'টাঙ্গুয়ার হাওর ও শিমুল বাগান',
    rating: 4.9,
    reviews_count: 650,
    short_description: 'Breathtaking freshwater wetland Ramsar site with wooden houseboats and turquoise Jadukata river.',
    full_description: 'Tanguar Haor in Sunamganj is a unique wetland ecosystem covering over 10,000 hectares. Experience overnight stays on luxury traditional houseboats, visit Niladri Lake (Shahid Siraj Lake), and marvel at the bright red silk cotton trees of Shimul Bagan.',
    location: 'Tahirpur, Sunamganj',
    lat: 25.1219,
    lng: 91.0744,
    entry_fee: 'Houseboat packages (৳5,000 - ৳12,000/person)',
    opening_time: 'Open 24 Hours',
    best_time: 'July to October for Haor water / Dec-Feb for migratory birds',
    how_to_reach: 'Travel from Dhaka/Sylhet to Sunamganj city, then take a bike/CNG to Tahirpur ghat to board houseboats.',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Nature',
    is_featured: true
  },

  // --- Chattogram Division ---
  {
    id: 'place-sajek',
    district_id: 'rangamati',
    district_name: 'Rangamati (Sajek)',
    division: 'Chattogram',
    name: 'Sajek Valley',
    name_bn: 'সাজেক ভ্যালি',
    rating: 4.9,
    reviews_count: 730,
    short_description: 'The Kingdom of Clouds in Bangladesh, nestled high upon lush green mountain ridges.',
    full_description: 'Sajek Valley is located at an altitude of 1,800 feet above sea level in Rangamati. Known as the Queen of Hills, you wake up touching fluffy white clouds floating right into your cottage balcony.',
    location: 'Ruilui & Konglak Para, Sajek, Rangamati',
    lat: 23.3820,
    lng: 92.2938,
    entry_fee: 'Free (Vehicle Escort toll applies)',
    opening_time: 'Army Escort departure: 10:30 AM & 2:30 PM',
    best_time: 'September to February',
    how_to_reach: 'Reach Khagrachhari town by bus, then hire an open 4x4 Chander Gari with army convoy escort.',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Hill',
    is_featured: true
  },
  {
    id: 'place-saint-martin',
    district_id: 'coxs-bazar',
    district_name: "Cox's Bazar",
    division: 'Chattogram',
    name: 'Saint Martin Coral Island',
    name_bn: 'সেন্ট মার্টিন প্রবাল দ্বীপ',
    rating: 4.8,
    reviews_count: 980,
    short_description: 'The only coral reef island in Bangladesh, surrounded by crystal blue ocean, coconut groves, and Chera Dwip.',
    full_description: 'Saint Martin’s Island is an 8-square-kilometer tropical coral island in the northeastern Bay of Bengal. Famous for fresh barbecued coral fish, peaceful bicycle rides around the island, and starry nights by the beach.',
    location: 'Saint Martin Island, Teknaf, Cox’s Bazar',
    lat: 20.6279,
    lng: 92.3225,
    entry_fee: 'Ship cruise ticket: ৳1,200 - ৳2,500 round trip',
    opening_time: 'Ferry runs Nov to March',
    best_time: 'November to February',
    how_to_reach: 'Take a sea cruise ship from Teknaf or Cox’s Bazar jetty (3-hour scenic ocean journey).',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Island',
    is_featured: true
  },
  {
    id: 'place-nafakhum',
    district_id: 'bandarban',
    district_name: 'Bandarban',
    division: 'Chattogram',
    name: 'Nafakhum Waterfall & Remakri',
    name_bn: 'নাফাখুম জলপ্রপাত ও রেমাক্রি',
    rating: 4.9,
    reviews_count: 310,
    short_description: 'The Niagara of Bangladesh, a roaring waterfall deep within the hills of Thanchi.',
    full_description: 'Nafakhum is one of the most magnificent waterfalls in Bangladesh located in Thanchi upazila of Bandarban. The journey involves boating on the crystal rocky Sangu River through massive mountain gorges.',
    location: 'Thanchi, Bandarban',
    lat: 21.8544,
    lng: 92.5186,
    entry_fee: 'Guide required (৳1,500/day) + Sangu boat',
    opening_time: 'Sunrise to 4:00 PM',
    best_time: 'October to February',
    how_to_reach: 'Travel from Bandarban town to Thanchi by Chander Gari (4 hours), then take a boat to Remakri and trek 2.5 hours.',
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Waterfall',
    is_featured: true
  },

  // --- Khulna & Barishal Division ---
  {
    id: 'place-sundarbans',
    district_id: 'khulna',
    district_name: 'Khulna (Sundarbans)',
    division: 'Khulna',
    name: 'Sundarbans National Mangrove Forest',
    name_bn: 'সুন্দরবন জাতীয় উদ্যান',
    rating: 4.9,
    reviews_count: 850,
    short_description: 'The world’s largest mangrove forest, home to Royal Bengal Tigers, spotted deer, and saltwater crocodiles.',
    full_description: 'Sundarbans is a UNESCO World Heritage site and biosphere reserve spanning across southwestern Bangladesh. Cruise on luxury eco-vessels through deep tidal rivers into Kotka, Hiron Point, and Karamjal wildlife breeding centres.',
    location: 'Sundarbans, Khulna / Bagerhat / Satkhira',
    lat: 21.9497,
    lng: 89.1833,
    entry_fee: 'Forest permit + Eco cruise tour package (৳10,000 - ৳25,000)',
    opening_time: 'Guided Cruise Expeditions (3-4 Days)',
    best_time: 'November to March',
    how_to_reach: 'Join a verified Sundarbans cruise departing from Khulna / Mongla Port.',
    image_url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Forest',
    is_featured: true
  },
  {
    id: 'place-sixty-dome',
    district_id: 'bagerhat',
    district_name: 'Bagerhat',
    division: 'Khulna',
    name: 'Sixty Dome Mosque (Shat Gombuj Masjid)',
    name_bn: 'ষাট গম্বুজ মসজিদ',
    rating: 4.8,
    reviews_count: 410,
    short_description: '15th-century UNESCO World Heritage Sultanate brick mosque with 77 domes and 60 pillars.',
    full_description: 'Founded by Sufi Saint Khan Jahan Ali in the 1400s, the Sixty Dome Mosque is an extraordinary masterpiece of medieval Islamic Sultanate architecture in South Asia.',
    location: 'Bagerhat Sadar, Bagerhat',
    lat: 22.6747,
    lng: 89.7423,
    entry_fee: '৳20 for Bangladeshi / ৳200 for Foreigners',
    opening_time: '9:00 AM - 5:00 PM (Closed Sunday)',
    best_time: 'October to February',
    how_to_reach: 'Travel by bus from Khulna to Bagerhat (45 minutes, ৳60).',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Heritage',
    is_featured: true
  },
  {
    id: 'place-kuakata',
    district_id: 'patuakhali',
    district_name: 'Patuakhali (Kuakata)',
    division: 'Barishal',
    name: 'Kuakata Sea Beach',
    name_bn: 'কুয়াকাটা সমুদ্র সৈকত',
    rating: 4.7,
    reviews_count: 620,
    short_description: 'Panoramic 18-km beach where you can witness both sunrise and sunset over the Bay of Bengal.',
    full_description: 'Kuakata is known as Sagor Konna (Daughter of the Sea). Visit the historic Buddhist temple, the ancient well (Kua), Fatrar Bon mangrove forest, and the Lebur Bon red crab island.',
    location: 'Kuakata, Patuakhali',
    lat: 21.8167,
    lng: 90.1167,
    entry_fee: 'Free',
    opening_time: 'Open 24 Hours',
    best_time: 'October to March',
    how_to_reach: 'Direct luxury overnight launch from Dhaka Sadarghat to Patuakhali / Barishal, or direct bus across Padma Bridge.',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Beach',
    is_featured: true
  },

  // --- Rajshahi & Rangpur Division ---
  {
    id: 'place-paharpur',
    district_id: 'naogaon',
    district_name: 'Naogaon',
    division: 'Rajshahi',
    name: 'Somapura Mahavihara (Paharpur)',
    name_bn: 'সোমপুর মহাবিহার (পাহাড়পুর)',
    rating: 4.8,
    reviews_count: 390,
    short_description: 'One of the largest 8th-century Buddhist monasteries south of the Himalayas, UNESCO World Heritage site.',
    full_description: 'Built by King Dharmapala of the Pala dynasty, Somapura Mahavihara was a premier Buddhist university and monastery in ancient India, celebrated for its massive terracotta stupa architecture.',
    location: 'Badalgachhi, Naogaon',
    lat: 25.0315,
    lng: 88.9772,
    entry_fee: '৳20 (Local) / ৳300 (Foreign)',
    opening_time: '9:00 AM - 5:00 PM',
    best_time: 'November to February',
    how_to_reach: 'Take a bus or train to Joypurhat or Naogaon, then hire a CNG to Paharpur (30 minutes).',
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Heritage',
    is_featured: true
  },
  {
    id: 'place-kantajew',
    district_id: 'dinajpur',
    district_name: 'Dinajpur',
    division: 'Rangpur',
    name: 'Kantajew Temple (Kantaji Mandir)',
    name_bn: 'কান্তজীউ মন্দির',
    rating: 4.8,
    reviews_count: 360,
    short_description: '18th-century brick temple renowned for South Asia’s most intricate and magnificent terracotta art panels.',
    full_description: 'Built between 1704 and 1722 by Maharaja Pran Nath, every inch of this Navaratna temple is adorned with exquisite terracotta reliefs depicting Mahabharata and Ramayana scenes.',
    location: 'Kaharole, Dinajpur',
    lat: 25.7925,
    lng: 88.6653,
    entry_fee: 'Free (Donation optional)',
    opening_time: '8:00 AM - 6:00 PM',
    best_time: 'October to March',
    how_to_reach: 'From Dinajpur city, take a local bus or auto-rickshaw (20 km journey on Dinajpur-Tetulia highway).',
    image_url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Heritage',
    is_featured: true
  },
  {
    id: 'place-birishiri',
    district_id: 'netrokona',
    district_name: 'Netrokona (Birishiri)',
    division: 'Mymensingh',
    name: 'Birishiri White Ceramic Hills & Lake',
    name_bn: 'বিরিশিরি চিনামাটির পাহাড় ও নীল লেক',
    rating: 4.7,
    reviews_count: 480,
    short_description: 'Turquoise blue water lakes amidst porcelain white ceramic clay hills and Someshwari river.',
    full_description: 'Birishiri in Durgapur, Netrokona is famed for the scenic China Clay Hills surrounding crystal clear turquoise blue lakes, the Garo Cultural Academy, and scenic river beaches along the Someshwari River.',
    location: 'Durgapur, Netrokona',
    lat: 25.1245,
    lng: 90.6698,
    entry_fee: 'Free',
    opening_time: 'Sunrise to Sunset',
    best_time: 'October to March',
    how_to_reach: 'Direct bus from Dhaka Mohakhali to Birishiri (5-6 hours), then explore by local rickshaw/bike.',
    image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Nature',
    is_featured: true
  }
];

// ============================================================================
// EXPANDED HOTELS & ECO-RESORTS
// ============================================================================
export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'hotel-grand-sultan',
    district_id: 'moulvibazar',
    district_name: 'Moulvibazar (Sreemangal)',
    name: 'Grand Sultan Tea Resort & Golf',
    name_bn: 'গ্র্যান্ড সুলতান টি রিসোর্ট',
    rating: 4.9,
    reviews_count: 580,
    price_per_night: 12500,
    price_formatted: '৳12,500/night',
    location: 'Radhanagar, Sreemangal',
    address: 'Sreemangal-Bhanugach Road, Moulvibazar',
    contact_phone: '+880 1730-793501',
    contact_email: 'reservations@grandsultanresort.com',
    has_ac: true,
    has_wifi: true,
    has_parking: true,
    has_restaurant: true,
    has_room_service: true,
    has_security: true,
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80'
    ],
    room_types: ['King Deluxe (৳12,500)', 'Executive Suite (৳22,000)'],
    check_in: '02:00 PM',
    check_out: '12:00 PM',
    is_featured: true
  },
  {
    id: 'hotel-sayeman',
    district_id: 'coxs-bazar',
    district_name: "Cox's Bazar",
    name: 'Sayeman Beach Resort',
    name_bn: 'সায়মন বিচ রিসোর্ট',
    rating: 4.8,
    reviews_count: 820,
    price_per_night: 8500,
    price_formatted: '৳8,500/night',
    location: 'Marine Drive, Kolatoli, Cox’s Bazar',
    address: 'Marine Drive Road, Kolatoli, Cox’s Bazar',
    contact_phone: '+880 1755-691917',
    has_ac: true,
    has_wifi: true,
    has_parking: true,
    has_restaurant: true,
    has_room_service: true,
    has_security: true,
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80'
    ],
    room_types: ['Ocean View Suite (৳8,500)', 'Infinity Pool View (৳12,000)'],
    check_in: '01:00 PM',
    check_out: '11:30 AM',
    is_featured: true
  },
  {
    id: 'hotel-meghpunji',
    district_id: 'rangamati',
    district_name: 'Rangamati (Sajek)',
    name: 'Meghpunji Eco Resort',
    name_bn: 'মেঘপুঞ্জি ইকো রিসোর্ট',
    rating: 4.9,
    reviews_count: 310,
    price_per_night: 4500,
    price_formatted: '৳4,500/night',
    location: 'Ruilui Para, Sajek Valley',
    address: 'Ruilui Para, Sajek, Rangamati',
    contact_phone: '+880 1811-156507',
    has_ac: false,
    has_wifi: true,
    has_parking: false,
    has_restaurant: true,
    has_room_service: true,
    has_security: true,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80'
    ],
    room_types: ['Meghla Cottage (৳4,500)', 'Tara Cottage (৳5,000)'],
    check_in: '12:00 PM',
    check_out: '10:30 AM',
    is_featured: true
  },
  {
    id: 'hotel-intercontinental',
    district_id: 'dhaka',
    district_name: 'Dhaka',
    name: 'InterContinental Dhaka',
    name_bn: 'ইন্টারকন্টিনেন্টাল ঢাকা',
    rating: 4.8,
    reviews_count: 530,
    price_per_night: 15500,
    price_formatted: '৳15,500/night',
    location: '1 Minto Road, Shahbagh, Dhaka',
    address: '1 Minto Road, Dhaka 1000',
    contact_phone: '+880 2-55663030',
    has_ac: true,
    has_wifi: true,
    has_parking: true,
    has_restaurant: true,
    has_room_service: true,
    has_security: true,
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80'
    ],
    room_types: ['Deluxe Room (৳15,500)', 'Club InterContinental (৳22,000)'],
    check_in: '03:00 PM',
    check_out: '12:00 PM',
    is_featured: false
  },
  {
    id: 'hotel-sikder-resort',
    district_id: 'patuakhali',
    district_name: 'Patuakhali (Kuakata)',
    name: 'Sikder Resort & Villas Kuakata',
    name_bn: 'শিকদার রিসোর্ট কুয়াকাটা',
    rating: 4.7,
    reviews_count: 240,
    price_per_night: 4200,
    price_formatted: '৳4,200/night',
    location: 'Kolapara, Kuakata, Patuakhali',
    address: 'Kuakata Beach Road, Patuakhali',
    contact_phone: '+880 1700-707747',
    has_ac: true,
    has_wifi: true,
    has_parking: true,
    has_restaurant: true,
    has_room_service: true,
    has_security: true,
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80'
    ],
    room_types: ['Deluxe Villa (৳4,200)', 'Executive Suite (৳7,500)'],
    check_in: '12:00 PM',
    check_out: '11:00 AM',
    is_featured: true
  },
  {
    id: 'hotel-noorjahan',
    district_id: 'sylhet',
    district_name: 'Sylhet',
    name: 'Hotel Noorjahan Grand',
    name_bn: 'হোটেল নূরজাহান গ্র্যান্ড',
    rating: 4.6,
    reviews_count: 310,
    price_per_night: 3500,
    price_formatted: '৳3,500/night',
    location: 'Dargah Gate, Sylhet',
    address: 'Waves 1, Dargah Gate, Sylhet 3100',
    contact_phone: '+880 1939-900800',
    has_ac: true,
    has_wifi: true,
    has_parking: true,
    has_restaurant: true,
    has_room_service: true,
    has_security: true,
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80'
    ],
    room_types: ['Super Deluxe (৳3,500)', 'Executive Family (৳5,500)'],
    check_in: '12:00 PM',
    check_out: '11:30 AM',
    is_featured: false
  }
];

// ============================================================================
// FAMOUS RESTAURANTS & LOCAL CULINARY HIGHLIGHTS
// ============================================================================
export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-panshi',
    district_id: 'sylhet',
    district_name: 'Sylhet',
    name: 'Panshi Restaurant',
    name_bn: 'পানসী রেস্তোরাঁ',
    rating: 4.8,
    reviews_count: 1820,
    cuisine: 'Traditional Bengali & 30+ Bharta Varieties',
    cuisine_bn: 'ঐতিহ্যবাহী বাংলা ও ভর্তা',
    price_tier: '৳',
    location: 'Zindabazar, Sylhet',
    address: 'Jail Road, Zindabazar, Sylhet 3100',
    phone: '+880 1712-029944',
    opening_hours: 'Open 24 Hours',
    menu_highlights: ['Duck Bhuna (হাঁসের মাংস)', 'Shatkora Beef (সাতকড়া গরুর মাংস)', '30+ Bharta Items (৳20-৳40 each)', 'Panch Mishali Fish'],
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    is_featured: true
  },
  {
    id: 'rest-star-kabab',
    district_id: 'dhaka',
    district_name: 'Dhaka',
    name: 'Star Kabab & Restaurant',
    name_bn: 'স্টার কাবাব ও রেস্তোরাঁ',
    rating: 4.8,
    reviews_count: 3200,
    cuisine: 'Authentic Kacchi Biryani & Kebabs',
    cuisine_bn: 'ঐতিহ্যবাহী কাচ্চি ও কাবাব',
    price_tier: '৳',
    location: 'Dhanmondi / Banani / Old Dhaka',
    address: 'House 38, Road 2, Dhanmondi, Dhaka',
    phone: '+880 2-8616111',
    opening_hours: '6:00 AM - 11:30 PM',
    menu_highlights: ['Mutton Kacchi Biryani (৳280)', 'Mutton Leg Roast', 'Boti Kabab & Shahi Paratha', 'Special Faluda'],
    image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    is_featured: true
  },
  {
    id: 'rest-mezban-haat',
    district_id: 'chattogram',
    district_name: 'Chattogram',
    name: 'Mezzan Haile Aaiun (মেজবান হাইলে আইয়ুন)',
    name_bn: 'মেজবান হাইলে আইয়ুন',
    rating: 4.9,
    reviews_count: 1450,
    cuisine: 'Authentic Chittagonian Mezbani Beef Feast',
    cuisine_bn: 'চট্টগ্রামের ঐতিহ্যবাহী মেজবানি মাংস',
    price_tier: '৳৳',
    location: 'GEC Circle / Agrabad, Chattogram',
    address: 'CDA Avenue, GEC Circle, Chattogram',
    phone: '+880 1819-334455',
    opening_hours: '11:30 AM - 10:30 PM',
    menu_highlights: ['Mezbani Gosht with spicy gravy (৳320)', 'Nolar Jhol (Bone Marrow Soup)', 'Chonar Dal with Beef', 'Kala Bhuna'],
    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    is_featured: true
  },
  {
    id: 'rest-chui-jhal',
    district_id: 'khulna',
    district_name: 'Khulna (Sundarbans)',
    name: 'Abbas Hotel & Chui Jhal Feast',
    name_bn: 'আব্বাস হোটেল (চুই ঝাল)',
    rating: 4.8,
    reviews_count: 980,
    cuisine: 'Famous Southern Piper Chaba (Chui Jhal) Beef',
    cuisine_bn: 'খুলনার স্পেশাল চুই ঝাল খাসি ও গরুর মাংস',
    price_tier: '৳৳',
    location: 'Chuknagar / Khulna Town',
    address: 'Khulna-Satkhira Highway, Chuknagar, Khulna',
    phone: '+880 1711-223344',
    opening_hours: '10:00 AM - 10:00 PM',
    menu_highlights: ['Chui Jhal Mutton & Beef (৳350)', 'Sundarbans Crab Curry', 'Fresh Golda Chingri Roast'],
    image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    is_featured: true
  },
  {
    id: 'rest-bogura-akboria',
    district_id: 'bogura',
    district_name: 'Bogura',
    name: 'Akboria Grand Hotel & Sweets',
    name_bn: 'আকবরিয়া গ্র্যান্ড হোটেল ও মিষ্টি',
    rating: 4.8,
    reviews_count: 1200,
    cuisine: 'Centuries-Old Sweets, Curd & Bengali Cuisine',
    cuisine_bn: 'বগুড়ার স্পেশাল দই ও ঐতিহ্যবাহী খাবার',
    price_tier: '৳',
    location: 'Kobi Nazrul Islam Road, Bogura',
    address: 'Thana Road, Bogura Sadar',
    phone: '+880 51-66044',
    opening_hours: 'Open 24 Hours',
    menu_highlights: ['Special Bogurar Shahi Misti Doi (৳240/pot)', 'Kheer Doi', 'Paratha with Dal & Halwa', 'Morog Polao'],
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    is_featured: true
  },
  {
    id: 'rest-sajek-cafe',
    district_id: 'rangamati',
    district_name: 'Rangamati (Sajek)',
    name: 'Sajek Hilltop Cafe & Bamboo Cuisine',
    name_bn: 'সাজেক হিলটপ ক্যাফে',
    rating: 4.7,
    reviews_count: 340,
    cuisine: 'Indigenous Tribal Bamboo Delicacies',
    cuisine_bn: 'বাঁশের স্পেশাল খাবার',
    price_tier: '৳৳',
    location: 'Konglak Para, Sajek',
    address: 'Top of Ruilui, Sajek Valley',
    phone: '+880 1832-998877',
    opening_hours: '7:30 AM - 10:30 PM',
    menu_highlights: ['Bamboo Chicken (৳450)', 'Bamboo Rice with Mountain Herbs', 'Smoked Fish', 'Hill Ginger Tea'],
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    is_featured: true
  }
];

// ============================================================================
// INTER-DISTRICT TRANSPORT ROUTES
// ============================================================================
export const INITIAL_TRANSPORTS: TransportRoute[] = [
  {
    id: 'tr-dhaka-sylhet-train',
    transport_type: 'Train',
    company: 'Bangladesh Railway (Parabat / Upaban Express)',
    from_district: 'Dhaka',
    to_district: 'Sylhet',
    departure_time: '06:20 AM (Parabat) / 08:30 PM (Upaban)',
    arrival_time: '01:00 PM / 05:00 AM',
    duration: '6h 40m',
    price_min: 380,
    price_max: 950,
    boarding_points: ['Kamalapur Railway Station', 'Dhaka Airport Station'],
    schedule_days: 'Daily except Tuesday (Parabat) / Wednesday (Upaban)',
    contact_phone: '131 (Railway Helpline)',
    is_active: true
  },
  {
    id: 'tr-dhaka-coxs-train',
    transport_type: 'Train',
    company: 'Cox’s Bazar Express (Non-stop Luxury Train)',
    from_district: 'Dhaka',
    to_district: "Cox's Bazar",
    departure_time: '10:30 PM',
    arrival_time: '07:20 AM',
    duration: '8h 50m',
    price_min: 695,
    price_max: 2050,
    boarding_points: ['Kamalapur Railway Station', 'Dhaka Airport Station'],
    schedule_days: 'Daily except Monday',
    contact_phone: '131',
    is_active: true
  },
  {
    id: 'tr-dhaka-sylhet-bus',
    transport_type: 'Bus',
    company: 'Green Line Paribahan (Scania Multi-Axle)',
    from_district: 'Dhaka',
    to_district: 'Sylhet',
    departure_time: '07:30 AM / 02:00 PM / 11:30 PM',
    arrival_time: '01:00 PM / 07:30 PM / 05:00 AM',
    duration: '5h 30m',
    price_min: 800,
    price_max: 1200,
    boarding_points: ['Sayedabad', 'Arambagh', 'Abdullahpur'],
    schedule_days: 'Daily every hour',
    contact_phone: '+880 1711-830000',
    is_active: true
  },
  {
    id: 'tr-dhaka-barishal-launch',
    transport_type: 'Launch',
    company: 'MV Sundarban-12 / Kuakata-9 (Triple Deck Luxury Launch)',
    from_district: 'Dhaka',
    to_district: 'Barishal',
    departure_time: '08:30 PM / 09:00 PM',
    arrival_time: '05:00 AM',
    duration: '8h 00m (Overnight river cruise)',
    price_min: 400,
    price_max: 5500,
    boarding_points: ['Sadarghat Launch Terminal, Dhaka'],
    schedule_days: 'Daily overnight',
    contact_phone: '+880 1712-334455',
    is_active: true
  },
  {
    id: 'tr-dhaka-rajshahi-train',
    transport_type: 'Train',
    company: 'Silk City / Padma Express',
    from_district: 'Dhaka',
    to_district: 'Rajshahi',
    departure_time: '02:45 PM',
    arrival_time: '08:35 PM',
    duration: '5h 50m',
    price_min: 360,
    price_max: 850,
    boarding_points: ['Kamalapur Railway Station', 'Dhaka Airport'],
    schedule_days: 'Daily except Sunday',
    contact_phone: '131',
    is_active: true
  },
  {
    id: 'tr-dhaka-sajek-car',
    transport_type: 'Car',
    company: 'YEANA Verified Microbus & Chander Gari Package',
    from_district: 'Dhaka',
    to_district: 'Rangamati (Sajek)',
    departure_time: '11:00 PM overnight',
    arrival_time: '08:00 AM at Dighinala / 11:30 AM at Sajek',
    duration: '11h 00m (Including Escort)',
    price_min: 12000,
    price_max: 18000,
    boarding_points: ['Doorstep Pick-up (Dhaka)'],
    schedule_days: 'On Booking Demand',
    contact_phone: '+880 1900-112233',
    is_active: true
  }
];

// ============================================================================
// TRADITIONAL SHOPPING & HANDICRAFTS
// ============================================================================
export const INITIAL_SHOPPING: ShoppingPlace[] = [
  {
    id: 'shop-zindabazar',
    district_id: 'sylhet',
    district_name: 'Sylhet',
    name: 'Zindabazar Handloom & Tea Hub',
    name_bn: 'জিন্দাবাজার তাঁত ও চা বিপণী',
    category: 'Handicrafts & Tea',
    location: 'Zindabazar, Sylhet',
    address: 'Shukria Market & City Centre, Zindabazar, Sylhet',
    famous_for: 'Authentic Manipuri handloom shawls, Sylheti Agarwood perfumes, and pure Sreemangal first-flush tea.',
    opening_hours: '10:00 AM - 10:00 PM',
    image_url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'shop-burmese-market',
    district_id: 'coxs-bazar',
    district_name: "Cox's Bazar",
    name: 'Burmese Market (বর্মী মার্কেট)',
    name_bn: 'বর্মী মার্কেট',
    category: 'Traditional Souvenirs & Pickles',
    location: 'Tekpara, Cox’s Bazar',
    address: 'Main Town Road, Cox’s Bazar',
    famous_for: 'Burmese pickles (Achar), Rakhine handmade lungi and shawls, sea shell jewelry, and wooden carvings.',
    opening_hours: '09:00 AM - 11:30 PM',
    image_url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'shop-aarong-dhaka',
    district_id: 'dhaka',
    district_name: 'Dhaka',
    name: 'Aarong & New Market Crafts',
    name_bn: 'আড়ং ও নিউমার্কেট হস্তশিল্প',
    category: 'Artisan Crafts & Fashion',
    location: 'Dhanmondi / Gulshan, Dhaka',
    address: 'Road 27, Dhanmondi, Dhaka',
    famous_for: 'Nakshi Kantha quilts, Jamdani sarees, brass home decor, jute handicrafts, and ethnic leather goods.',
    opening_hours: '10:00 AM - 08:30 PM',
    image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80'
  }
];

// ============================================================================
// LOCAL RIDES & VEHICLE RENTALS
// ============================================================================
export const INITIAL_RIDES: Ride[] = [
  {
    id: 'ride-yamaha-fz',
    district_id: 'sylhet',
    district_name: 'Sylhet',
    vehicle_type: 'Bike',
    model: 'Yamaha FZ-S FI V3 (150cc)',
    rental_type: 'Self Drive',
    price_per_hour: 150,
    price_per_day: 1000,
    location: 'Subidbazar, Sylhet',
    owner_name: 'Tanvir Bike Rentals',
    contact_phone: '+880 1710-123456',
    availability_status: 'Available',
    image_url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'ride-honda-shine',
    district_id: 'coxs-bazar',
    district_name: "Cox's Bazar",
    vehicle_type: 'Bike',
    model: 'Honda CB Shine 125',
    rental_type: 'Self Drive',
    price_per_hour: 120,
    price_per_day: 800,
    location: 'Marine Drive Road, Kolatoli, Cox’s Bazar',
    owner_name: 'Coastal Riders Cox’s Bazar',
    contact_phone: '+880 1815-998877',
    availability_status: 'Available',
    image_url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'ride-chander-gari',
    district_id: 'rangamati',
    district_name: 'Rangamati (Sajek)',
    vehicle_type: 'Chander Gari',
    model: 'Mahindra 4x4 Mountain Jeep (Chander Gari)',
    rental_type: 'With Driver',
    price_per_day: 4500,
    location: 'Khagrachhari & Sajek Valley',
    owner_name: 'Sajek Drivers Association (Rahim Bhai)',
    contact_phone: '+880 1845-667788',
    availability_status: 'Available',
    image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'ride-noah-microbus',
    district_id: 'dhaka',
    district_name: 'Dhaka',
    vehicle_type: 'Microbus',
    model: 'Toyota Noah Super GL (8 Seater AC)',
    rental_type: 'With Driver',
    price_per_day: 5500,
    location: 'Dhaka Inter-district tours',
    owner_name: 'Green Ways Rent-a-Car',
    contact_phone: '+880 1718-445566',
    availability_status: 'Available',
    image_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80'
  }
];

// ============================================================================
// SAMPLE ITINERARY TRIP
// ============================================================================
export const SAMPLE_TRIP: Trip = {
  id: 'trip-sylhet-3day',
  title: 'Sylhet & Sreemangal Nature Escapade',
  destination: 'Sylhet',
  start_date: '2026-10-15',
  end_date: '2026-10-17',
  duration_days: 3,
  budget: {
    transport: 2000,
    hotel: 3500,
    food: 1500,
    activities: 600,
    shopping: 1000,
    ride: 1000,
    other: 400
  },
  total_budget: 10000,
  notes: 'Pack waterproof phone pouches for Ratargul and light sweaters for tea garden evenings.',
  places: [
    {
      id: 'tp-1',
      trip_id: 'trip-sylhet-3day',
      place_id: 'place-jaflong',
      day_number: 1,
      order_index: 1,
      time_slot: '09:00 AM - 01:30 PM',
      notes: 'Morning boat ride across Dauki river and explore stone valley.'
    },
    {
      id: 'tp-2',
      trip_id: 'trip-sylhet-3day',
      place_id: 'place-ratargul',
      day_number: 1,
      order_index: 2,
      time_slot: '03:00 PM - 05:30 PM',
      notes: 'Afternoon calm boat cruise into the swamp forest.'
    },
    {
      id: 'tp-3',
      trip_id: 'trip-sylhet-3day',
      place_id: 'place-bichanakandi',
      day_number: 2,
      order_index: 1,
      time_slot: '09:30 AM - 02:00 PM',
      notes: 'Dip feet into cool mountain streams and enjoy picnic.'
    },
    {
      id: 'tp-4',
      trip_id: 'trip-sylhet-3day',
      place_id: 'place-sreemangal-tea',
      day_number: 3,
      order_index: 1,
      time_slot: '08:00 AM - 02:00 PM',
      notes: 'Cycle through Sreemangal tea estates and sample Seven-layer tea.'
    }
  ],
  created_at: new Date().toISOString()
};
