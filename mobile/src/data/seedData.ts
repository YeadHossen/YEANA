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
  // 1. DHAKA DIVISION (13)
  { id: 'dhaka', division: 'Dhaka', name: 'Dhaka', name_bn: 'ঢাকা', description: 'The vibrant 400-year-old historic capital city with Mughal heritage, bustling rivers, and street food culture.', image_url: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800&auto=format&fit=crop&q=80', lat: 23.8103, lng: 90.4125, popular_season: 'October to March', place_count: 8 },
  { id: 'gazipur', division: 'Dhaka', name: 'Gazipur', name_bn: 'গাজীপুর', description: 'Home to the largest Safari Park in South Asia, serene eco-resorts, and dense Bhawal Sal forests.', image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', lat: 24.0023, lng: 90.4267, popular_season: 'Year round, especially Winter & Weekends', place_count: 4 },
  { id: 'narayanganj', division: 'Dhaka', name: 'Narayanganj', name_bn: 'নারায়ণগঞ্জ', description: 'Ancient capital Panam City (Sonargaon), historic river forts, and the heritage of Jamdani weaving.', image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', lat: 23.6238, lng: 90.5000, popular_season: 'November to February', place_count: 5 },
  { id: 'tangail', division: 'Dhaka', name: 'Tangail', name_bn: 'টাঙ্গাইল', description: 'World-famous Tangail cotton & silk handloom sarees, Mohera Zamindar Bari, and legendary Porabari Chomchom.', image_url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', lat: 24.2513, lng: 89.9167, popular_season: 'October to March', place_count: 4 },
  { id: 'kishoreganj', division: 'Dhaka', name: 'Kishoreganj', name_bn: 'কিশোরগঞ্জ', description: 'Spectacular Nikli Haor wetlands, all-weather submerged highway, and historic Isha Khan forts.', image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', lat: 24.4449, lng: 90.7766, popular_season: 'July to October (Haor season) & Winter', place_count: 4 },
  { id: 'manikganj', division: 'Dhaka', name: 'Manikganj', name_bn: 'মানিকগঞ্জ', description: 'Famous for Baliati Palace (one of the largest zamindar palaces in Bangladesh) and Teota Zamindar Bari.', image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', lat: 23.8644, lng: 90.0047, popular_season: 'Autumn and Winter', place_count: 3 },
  { id: 'munshiganj', division: 'Dhaka', name: 'Munshiganj', name_bn: 'মুন্সিগঞ্জ', description: 'Ancient Bikrampur heritage, Idrakpur water fort, Arial Beel wetlands, and Padma bridge views.', image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', lat: 23.5422, lng: 90.5305, popular_season: 'October to March', place_count: 3 },
  { id: 'narsingdi', division: 'Dhaka', name: 'Narsingdi', name_bn: 'নরসিংদী', description: 'Ancient Wari-Bateshwar archaeological site dating back 2,500 years and the Dream Holiday Park.', image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', lat: 23.9322, lng: 90.7154, popular_season: 'Winter & Spring', place_count: 3 },
  { id: 'faridpur', division: 'Dhaka', name: 'Faridpur', name_bn: 'ফরিদপুর', description: 'Spiritual city of Sufi Shah Farid, Jasimuddin’s ancestral home, and sweet Khejur Gur.', image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', lat: 23.6071, lng: 89.8429, popular_season: 'November to February', place_count: 2 },
  { id: 'gopalganj', division: 'Dhaka', name: 'Gopalganj', name_bn: 'গোপালগঞ্জ', description: 'Birthplace and mausoleum complex of Bangabandhu Sheikh Mujibur Rahman in Tungipara.', image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', lat: 23.0051, lng: 89.8266, popular_season: 'Year round', place_count: 2 },
  { id: 'madaripur', division: 'Dhaka', name: 'Madaripur', name_bn: 'মাদারীপুর', description: 'Padma riverbank viewpoints, historic Shah Madar shrine, and traditional molasses production.', image_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', lat: 23.1641, lng: 90.1897, popular_season: 'Winter', place_count: 2 },
  { id: 'rajbari', division: 'Dhaka', name: 'Rajbari', name_bn: 'রাজবাড়ী', description: 'Gateway to Southern Bangladesh along the mighty Padma River, historic railway heritage and Chamcham sweets.', image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', lat: 23.7574, lng: 89.6445, popular_season: 'October to February', place_count: 2 },
  { id: 'shariatpur', division: 'Dhaka', name: 'Shariatpur', name_bn: 'শরীয়তপুর', description: 'Riverine beauty with the Padma and Meghna rivers confluence, named after Haji Shariatullah.', image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', lat: 23.2423, lng: 90.4348, popular_season: 'Winter & Autumn', place_count: 2 },

  // 2. CHATTOGRAM DIVISION (11)
  { id: 'chattogram', division: 'Chattogram', name: 'Chattogram', name_bn: 'চট্টগ্রাম', description: 'Commercial capital with Patenga Beach, Guliakhali green beach, heritage shrines, and Mezbani beef.', image_url: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800&auto=format&fit=crop&q=80', lat: 22.3569, lng: 91.7832, popular_season: 'October to March', place_count: 7 },
  { id: 'coxs-bazar', division: 'Chattogram', name: "Cox's Bazar", name_bn: 'কক্সবাজার', description: 'The world’s longest natural unbroken sandy sea beach (120 km), Marine Drive, Inani, and Saint Martin coral island.', image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', lat: 21.4272, lng: 92.0058, popular_season: 'November to March', place_count: 8 },
  { id: 'rangamati', division: 'Chattogram', name: 'Rangamati (Sajek)', name_bn: 'রাঙ্গামাটি (সাজেক ভ্যালি)', description: 'Valley of clouds Sajek, breathtaking Kaptai Lake, hanging bridges, and Chakma tribal lifestyle.', image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', lat: 22.6533, lng: 92.1753, popular_season: 'September to February', place_count: 6 },
  { id: 'bandarban', division: 'Chattogram', name: 'Bandarban', name_bn: 'বান্দরবান', description: 'Highest mountain peaks of Bangladesh (Keokradong, Saka Haphong), Nafakhum waterfall, and Nilgiri hilltop.', image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', lat: 22.1953, lng: 92.2184, popular_season: 'October to March', place_count: 6 },
  { id: 'khagrachhari', division: 'Chattogram', name: 'Khagrachhari', name_bn: 'খাগড়াছড়ি', description: 'Rich hill district with mysterious Alutila Cave, Richhang waterfall, and scenic mountain roads to Sajek.', image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', lat: 23.1192, lng: 91.9846, popular_season: 'October to March', place_count: 4 },
  { id: 'cumilla', division: 'Chattogram', name: 'Cumilla', name_bn: 'কুমিল্লা', description: 'Ancient 8th-century Shalban Vihara (Mainamati), Lalmai Hills, and world-famous authentic Rasmalai.', image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', lat: 23.4682, lng: 91.1788, popular_season: 'November to February', place_count: 5 },
  { id: 'feni', division: 'Chattogram', name: 'Feni', name_bn: 'ফেনী', description: 'Muhuri Project river barrage, scenic green embankment parks, and historic Bijoy Singh Dighi.', image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', lat: 23.0186, lng: 91.3966, popular_season: 'Winter & Autumn', place_count: 3 },
  { id: 'brahmanbaria', division: 'Chattogram', name: 'Brahmanbaria', name_bn: 'ব্রাহ্মণবাড়িয়া', description: 'Cultural capital of classical music (Ustad Alauddin Khan), Titas river, and delicious Chhanar Mukhi.', image_url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80', lat: 23.9571, lng: 91.1119, popular_season: 'Winter', place_count: 3 },
  { id: 'noakhali', division: 'Chattogram', name: 'Noakhali', name_bn: 'নোয়াখালী', description: 'Nijhum Dwip island (home to thousands of spotted deer), Gandhi Ashram, and Bay of Bengal coastline.', image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', lat: 22.8696, lng: 91.0993, popular_season: 'November to February', place_count: 4 },
  { id: 'chandpur', division: 'Chattogram', name: 'Chandpur', name_bn: 'চাঁদপুর', description: 'City of Hilsa (Ilish) fish, iconic Padma-Meghna-Dakatia river triple estuary confluence (Mollahata).', image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', lat: 23.2333, lng: 90.6667, popular_season: 'Monsoon for Hilsa & Winter for cruising', place_count: 3 },
  { id: 'lakshmipur', division: 'Chattogram', name: 'Lakshmipur', name_bn: 'লক্ষ্মীপুর', description: 'Meghna riverbanks, Char Alexander eco-tourism, Dalal Bazar Zamindar Bari, and betel nut orchards.', image_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', lat: 22.9425, lng: 90.8412, popular_season: 'Winter', place_count: 2 },

  // 3. SYLHET DIVISION (4)
  { id: 'sylhet', division: 'Sylhet', name: 'Sylhet', name_bn: 'সিলেট', description: 'Land of two leaves and a bud, spiritual Hazrat Shah Jalal shrine, crystal-clear Jaflong rivers, and Ratargul swamp forest.', image_url: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&auto=format&fit=crop&q=80', lat: 24.8949, lng: 91.8687, popular_season: 'October to March (Monsoon for waterfalls)', place_count: 7 },
  { id: 'moulvibazar', division: 'Sylhet', name: 'Moulvibazar (Sreemangal)', name_bn: 'মৌলভীবাজার (শ্রীমঙ্গল)', description: 'The tea capital of Bangladesh with rolling tea estates, Lawachara rainforest, Madhabkunda waterfall, and 7-layer tea.', image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', lat: 24.3065, lng: 91.7296, popular_season: 'Year round, especially Winter', place_count: 6 },
  { id: 'sunamganj', division: 'Sylhet', name: 'Sunamganj (Tanguar Haor)', name_bn: 'সুনামগঞ্জ (টাঙ্গুয়ার হাওর)', description: 'Ramsar site Tanguar Haor, luxury houseboats, Shimul Bagan (red silk cotton forest), and Jadukata River.', image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', lat: 25.0658, lng: 91.4073, popular_season: 'July to October (Houseboat season) & Winter for birds', place_count: 5 },
  { id: 'habiganj', division: 'Sylhet', name: 'Habiganj', name_bn: 'হবিগঞ্জ', description: 'Satchari National Park, lush green tea gardens of Chunarughat, and serene Baniachong (Asia’s largest village).', image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', lat: 24.3749, lng: 91.4155, popular_season: 'October to February', place_count: 3 },

  // 4. RAJSHAHI DIVISION (8)
  { id: 'rajshahi', division: 'Rajshahi', name: 'Rajshahi', name_bn: 'রাজশাহী', description: 'Silk City along the Padma River, renowned for delicious Fazli mangoes, Varendra Research Museum, and Kalai Ruti.', image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', lat: 24.3745, lng: 88.6042, popular_season: 'May-July for Mangoes / Nov-Feb for Travel', place_count: 5 },
  { id: 'bogura', division: 'Rajshahi', name: 'Bogura', name_bn: 'বগুড়া', description: 'Ancient 3rd-century BC Mahasthangarh fortress city, rich history, and world-famous Bogurar Doi (curd).', image_url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', lat: 24.8465, lng: 89.3777, popular_season: 'October to March', place_count: 5 },
  { id: 'naogaon', division: 'Rajshahi', name: 'Naogaon', name_bn: 'নওগাঁ', description: 'UNESCO World Heritage site Somapura Mahavihara (Paharpur Buddhist Monastery), Kusumba Mosque, and Dubalhati Palace.', image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', lat: 24.8103, lng: 88.9419, popular_season: 'November to February', place_count: 4 },
  { id: 'natore', division: 'Rajshahi', name: 'Natore', name_bn: 'নাটোর', description: 'Historic palace of Rani Bhabani (Natore Rajbari), Uttara Ganabhaban, and mouth-watering Kachagolla sweet.', image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', lat: 24.4206, lng: 88.9324, popular_season: 'October to March', place_count: 4 },
  { id: 'chapainawabganj', division: 'Rajshahi', name: 'Chapainawabganj', name_bn: 'চাঁপাইনবাবগঞ্জ', description: 'Mango capital of Bangladesh, historic Choto Sona Mosque (1493 AD), and Gambhira folk music heritage.', image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', lat: 24.5965, lng: 88.2775, popular_season: 'Summer for Mangoes / Winter for Heritage', place_count: 3 },
  { id: 'pabna', division: 'Rajshahi', name: 'Pabna', name_bn: 'পাবনা', description: 'Hardinge Bridge & Lalon Shah Bridge over the Padma, historic Tarash Rajbari, and Anukulchandra Satsanga Ashram.', image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', lat: 24.0064, lng: 89.2372, popular_season: 'October to February', place_count: 3 },
  { id: 'sirajganj', division: 'Rajshahi', name: 'Sirajganj', name_bn: 'সিরাজগঞ্জ', description: 'Iconic Bangabandhu Jamuna Multipurpose Bridge, Navaratna Temple in Hatkumrul, and handloom lungi/sarees.', image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', lat: 24.4534, lng: 89.7008, popular_season: 'Autumn and Winter', place_count: 3 },
  { id: 'joypurhat', division: 'Rajshahi', name: 'Joypurhat', name_bn: 'জয়পুরহাট', description: 'Archaeological sites like Lokma Rajbari, Paharpur adjacent trails, and sugar mills belt.', image_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', lat: 25.1015, lng: 89.0277, popular_season: 'Winter', place_count: 2 },

  // 5. KHULNA DIVISION (10)
  { id: 'khulna', division: 'Khulna', name: 'Khulna (Sundarbans)', name_bn: 'খুলনা (সুন্দরবন)', description: 'Gateway to UNESCO World Heritage Sundarbans (largest mangrove forest on Earth & Royal Bengal Tiger habitat) and spicy Chui Jhal beef.', image_url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80', lat: 22.8456, lng: 89.5403, popular_season: 'November to March (Cruising Season)', place_count: 6 },
  { id: 'bagerhat', division: 'Khulna', name: 'Bagerhat', name_bn: 'বাগেরহাট', description: 'UNESCO World Heritage Historic Mosque City of Bagerhat featuring the 15th-century Sixty Dome Mosque (Shat Gombuj Masjid).', image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', lat: 22.6516, lng: 89.7859, popular_season: 'October to February', place_count: 5 },
  { id: 'jashore', division: 'Khulna', name: 'Jashore', name_bn: 'যশোর', description: 'Gadkhali flower capital (blooming roses & gerberas), poet Michael Madhusudan Dutt’s birthplace, and date palm jaggery (Patali Gur).', image_url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', lat: 23.1664, lng: 89.2182, popular_season: 'December to February (Flower season & Winter)', place_count: 4 },
  { id: 'satkhira', division: 'Khulna', name: 'Satkhira', name_bn: 'সাতক্ষীরা', description: 'Sundarbans Western range (Munshiganj & Kalidaspur eco-resorts), wild honey harvest, and fresh Sundarbans crabs.', image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', lat: 22.7185, lng: 89.0705, popular_season: 'November to March', place_count: 3 },
  { id: 'kushtia', division: 'Khulna', name: 'Kushtia', name_bn: 'কুষ্টিয়া', description: 'Mystical shrine of Baul philosopher Fakir Lalon Shah (Chheuriya), Rabindranath Tagore’s Kuthibari in Shilaidaha, and Gorai river.', image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', lat: 23.9013, lng: 89.1204, popular_season: 'Dol Purnima (March) & Autumn/Winter', place_count: 5 },
  { id: 'meherpur', division: 'Khulna', name: 'Meherpur', name_bn: 'মেহেরপুর', description: 'Mujibnagar Memorial Complex where the Provisional Government of Bangladesh took oath in 1971.', image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', lat: 23.7719, lng: 88.6318, popular_season: 'Year round', place_count: 3 },
  { id: 'chuadanga', division: 'Khulna', name: 'Chuadanga', name_bn: 'চুয়াডাঙ্গা', description: 'Historic Gholdari Mosque, Carew & Co. (British era sugar distillery heritage), and Mathabhanga river.', image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', lat: 23.6402, lng: 88.8418, popular_season: 'Winter', place_count: 2 },
  { id: 'jhenaidah', division: 'Khulna', name: 'Jhenaidah', name_bn: 'ঝিনাইদহ', description: 'Famous for Marjat Baor eco-tourism, Naldanga Rajbari temple complex, and sweet banana cultivation.', image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', lat: 23.5450, lng: 89.1726, popular_season: 'Winter & Spring', place_count: 2 },
  { id: 'magura', division: 'Khulna', name: 'Magura', name_bn: 'মাগুরা', description: 'Historic Siddheswari Math, Gorai river viewpoints, and traditional Katayani Puja festival celebrations.', image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', lat: 23.4873, lng: 89.4198, popular_season: 'Autumn and Winter', place_count: 2 },
  { id: 'narail', division: 'Khulna', name: 'Narail', name_bn: 'নড়াইল', description: 'Land of legendary painter SM Sultan (Shishu Swargo art complex), Chitra River, and traditional otter fishing.', image_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', lat: 23.1725, lng: 89.5127, popular_season: 'Autumn and Winter', place_count: 3 },

  // 6. BARISHAL DIVISION (6)
  { id: 'barishal', division: 'Barishal', name: 'Barishal', name_bn: 'বরিশাল', description: 'The Venice of Bengal with romantic backwaters, floating guava markets, Guthia Mosque, and luxury river launches.', image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', lat: 22.7010, lng: 90.3535, popular_season: 'July to October for Guava Markets / Nov-Feb for Cruising', place_count: 6 },
  { id: 'patuakhali', division: 'Barishal', name: 'Patuakhali (Kuakata)', name_bn: 'পটুয়াখালী (কুয়াকাটা)', description: 'Daughter of the Sea (Sagor Konna) Kuakata beach where both sunrise and sunset can be viewed over the Bay of Bengal.', image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', lat: 21.8167, lng: 90.1167, popular_season: 'October to March', place_count: 6 },
  { id: 'bhola', division: 'Barishal', name: 'Bhola', name_bn: 'ভোলা', description: 'The largest island district of Bangladesh, Char Kukri Mukri wildlife sanctuary, mangrove forests, and buffalo milk curd.', image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', lat: 22.6859, lng: 90.6481, popular_season: 'November to February', place_count: 4 },
  { id: 'jhalokathi', division: 'Barishal', name: 'Jhalokathi', name_bn: 'ঝালকাঠি', description: 'Famous for Bhimruli floating guava and hog plum (Amra) market canals, water hyacinth trails, and Sujabad fort.', image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', lat: 22.6406, lng: 90.1987, popular_season: 'July to September (Guava canal boats)', place_count: 4 },
  { id: 'pirojpur', division: 'Barishal', name: 'Pirojpur', name_bn: 'পিরোজপুর', description: 'Kuriana floating market, Baleshwar riverbank, and Swarupkathi timber & coconut trading canals.', image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', lat: 22.5841, lng: 89.9720, popular_season: 'Monsoon and Winter', place_count: 3 },
  { id: 'barguna', division: 'Barishal', name: 'Barguna', name_bn: 'বরগুনা', description: 'Shuvo Shondha sea beach, Haringhata eco-tourism mangrove trail, and scenic Payra river delta.', image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', lat: 22.0953, lng: 90.1121, popular_season: 'November to March', place_count: 3 },

  // 7. RANGPUR DIVISION (8)
  { id: 'rangpur', division: 'Rangpur', name: 'Rangpur', name_bn: 'রংপুর', description: 'Palatial Tajhat Palace (now archaeological museum), Chikli Water Park, and delicious Haribhanga mangoes.', image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', lat: 25.7439, lng: 89.2752, popular_season: 'October to February / June for Haribhanga', place_count: 5 },
  { id: 'dinajpur', division: 'Rangpur', name: 'Dinajpur', name_bn: 'দিনাজপুর', description: 'Masterpiece 18th-century terracotta Kantajew Temple (Kantaji Mandir), Ramsagar National Park, and aromatic Kataribhog rice.', image_url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', lat: 25.6217, lng: 88.6355, popular_season: 'October to March', place_count: 5 },
  { id: 'panchagarh', division: 'Rangpur', name: 'Panchagarh (Tetulia)', name_bn: 'পঞ্চগড় (তেঁতুলিয়া)', description: 'Northernmost tip of Bangladesh with plainland tea gardens, views of Mt. Kanchenjunga (Himalayas) in autumn, and Mahananda river.', image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', lat: 26.3354, lng: 88.5517, popular_season: 'October to December (Kanchenjunga clear views)', place_count: 5 },
  { id: 'nilphamari', division: 'Rangpur', name: 'Nilphamari', name_bn: 'নীলফামারী', description: 'Historic Nil Sagar lake (sanctuary for migratory birds), Saidpur railway workshop heritage, and Teesta Barrage.', image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', lat: 25.9318, lng: 88.8560, popular_season: 'November to February', place_count: 3 },
  { id: 'lalmonirhat', division: 'Rangpur', name: 'Lalmonirhat', name_bn: 'লালমনিরহাট', description: 'Teesta Barrage, Mogolhat border crossing, and Tin Bigha Corridor enclave heritage.', image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80', lat: 25.9923, lng: 89.2847, popular_season: 'Winter', place_count: 3 },
  { id: 'kurigram', division: 'Rangpur', name: 'Kurigram', name_bn: 'কুড়িগ্রাম', description: 'Brahmaputra and Dharla river islands (Chars), historic Chilmari river port, and Chandamari Mosque.', image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', lat: 25.8054, lng: 89.6362, popular_season: 'Autumn and Winter', place_count: 3 },
  { id: 'gaibandha', division: 'Rangpur', name: 'Gaibandha', name_bn: 'গাইবান্ধা', description: 'Brahmaputra river eco-tourism, Balashi Ghat river views, and legendary Rasmanjari sweets.', image_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', lat: 25.3288, lng: 89.5406, popular_season: 'Winter', place_count: 2 },
  { id: 'thakurgaon', division: 'Rangpur', name: 'Thakurgaon', name_bn: 'ঠাকুরগাঁও', description: 'Ancient King’s Palace in Baliadangi, century-old giant mango tree (Shurjapuri), and Tangon river.', image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', lat: 26.0337, lng: 88.4617, popular_season: 'Autumn and Winter', place_count: 3 },

  // 8. MYMENSINGH DIVISION (4)
  { id: 'mymensingh', division: 'Mymensingh', name: 'Mymensingh', name_bn: 'ময়মনসিংহ', description: 'Shashi Lodge (Rajbari), scenic Brahmaputra riverbanks, Bangladesh Agricultural University botanical gardens, and Muktagacha Monda sweet.', image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80', lat: 24.7471, lng: 90.4203, popular_season: 'Autumn and Winter', place_count: 5 },
  { id: 'netrokona', division: 'Mymensingh', name: 'Netrokona (Birishiri)', name_bn: 'নেত্রকোণা (বিরিশিরি)', description: 'Mesmerizing white ceramic clay hills of Durgapur, turquoise blue Someshwari River lake, and Hajong/Garo tribal culture.', image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', lat: 24.8833, lng: 90.7333, popular_season: 'October to March (Clear water season)', place_count: 5 },
  { id: 'jamalpur', division: 'Mymensingh', name: 'Jamalpur', name_bn: 'জামালপুর', description: 'Famous for traditional Nakshi Kantha handcrafted quilts, Lojpoti sweet curd, and historic Gakul Amin Dargah.', image_url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', lat: 24.9375, lng: 89.9378, popular_season: 'Winter', place_count: 3 },
  { id: 'sherpur', division: 'Mymensingh', name: 'Sherpur (Garo Hills)', name_bn: 'শেরপুর (গারো পাহাড়)', description: 'Ghazni Abakash and Madhutila eco-parks in the foothills of Meghalaya Garo mountain ranges.', image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', lat: 25.0205, lng: 90.0153, popular_season: 'October to February', place_count: 4 }
];

// Helper to generate district-specific items cleanly for all 64 districts
const DISTRICT_DATA_CATALOG: Record<string, {
  placeName: string;
  placeNameBn: string;
  placeCategory: Place['category'];
  placeDesc: string;
  placeImg: string;
  hotelName: string;
  hotelNameBn: string;
  hotelPrice: number;
  hotelImg: string;
  restName: string;
  restNameBn: string;
  cuisine: string;
  menuItem: string;
  shopName: string;
  shopNameBn: string;
  specialty: string;
  rideModel: string;
  rideType: Ride['vehicle_type'];
  ridePrice: number;
}> = {
  dhaka: {
    placeName: 'Lalbagh Fort & Ahsan Manzil',
    placeNameBn: 'লালবাগ কেল্লা ও আহসান মঞ্জিল',
    placeCategory: 'Heritage',
    placeDesc: '17th-century Mughal fort complex with Pari Bibi tomb and the Pink Palace on the Buriganga river.',
    placeImg: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800',
    hotelName: 'InterContinental Dhaka',
    hotelNameBn: 'ইন্টারকন্টিনেন্টাল ঢাকা',
    hotelPrice: 15500,
    hotelImg: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    restName: 'Star Kabab & Restaurant',
    restNameBn: 'স্টার কাবাব',
    cuisine: 'Authentic Kacchi Biryani & Kebabs',
    menuItem: 'Mutton Kacchi Biryani & Boti Kabab',
    shopName: 'Aarong Dhanmondi Crafts',
    shopNameBn: 'আড়ং হস্তশিল্প',
    specialty: 'Jamdani Sarees, Nakshi Kantha, Jute crafts',
    rideModel: 'Toyota Noah Super GL (8 Seater AC)',
    rideType: 'Microbus',
    ridePrice: 5500
  },
  gazipur: {
    placeName: 'Bangabandhu Safari Park & Bhawal Sal Forest',
    placeNameBn: 'বঙ্গবন্ধু সাফারি পার্ক ও ভাওয়াল উদ্যান',
    placeCategory: 'Nature',
    placeDesc: 'South Asia’s largest open wildlife safari park with tiger, lion and elephant zones in Sal forests.',
    placeImg: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    hotelName: 'Sarah Resort & Spa Gazipur',
    hotelNameBn: 'সারাহ রিসোর্ট গাজীপুর',
    hotelPrice: 7500,
    hotelImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    restName: 'Bhawal Forest Kitchen',
    restNameBn: 'ভাওয়াল ফরেস্ট কিচেন',
    cuisine: 'Local Duck Bhuna & Forest Delicacies',
    menuItem: 'Deshi Duck Bhuna with Steamed Rice',
    shopName: 'Gazipur Pottery & Bamboo Crafts',
    shopNameBn: 'গাজীপুর বাঁশ ও মৃৎশিল্প',
    specialty: 'Bhawal Cane products & Clay pottery',
    rideModel: 'Mahindra Bolero 4x4',
    rideType: 'Chander Gari',
    ridePrice: 3500
  },
  narayanganj: {
    placeName: 'Panam City (Sonargaon) & Folk Art Museum',
    placeNameBn: 'পানাম নগর (সোনারগাঁও) ও লোকশিল্প জাদুঘর',
    placeCategory: 'Heritage',
    placeDesc: 'Historic ghost town with colonial architecture and Zainul Abedin folk art heritage foundation.',
    placeImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    hotelName: 'Hotel Royal Resort Sonargaon',
    hotelNameBn: 'রয়্যাল রিসোর্ট সোনারগাঁও',
    hotelPrice: 3800,
    hotelImg: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    restName: 'Sonargaon Heritage Cafe',
    restNameBn: 'সোনারগাঁও হেরিটেজ ক্যাফে',
    cuisine: 'Traditional Bengali & Fresh River Fish',
    menuItem: 'Shorshe Ilish & Traditional Pitha',
    shopName: 'Jamdani Palli Weaving Center',
    shopNameBn: 'জামদানি পল্লী',
    specialty: 'Authentic GI Certified Handloom Jamdani',
    rideModel: 'Honda CB Shine 125',
    rideType: 'Bike',
    ridePrice: 800
  },
  tangail: {
    placeName: 'Mohera Zamindar Bari & 201 Dome Mosque',
    placeNameBn: 'মহেরা জমিদার বাড়ি ও ২০১ গম্বুজ মসজিদ',
    placeCategory: 'Heritage',
    placeDesc: 'Magnificent 18th-century palace architecture and the world record 201-dome modern brick mosque.',
    placeImg: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800',
    hotelName: 'Hotel Al Faisal Tangail',
    hotelNameBn: 'হোটেল আল ফয়সাল',
    hotelPrice: 2200,
    hotelImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    restName: 'Porabari Original Chomchom House',
    restNameBn: 'পোড়াবাড়ী চমচম ঘর',
    cuisine: 'Legendary Bengali Sweets & Snacks',
    menuItem: 'Porabari Chomchom (World famous sweet)',
    shopName: 'Tangail Tat Saree Market (Bajitpur)',
    shopNameBn: 'টাঙ্গাইল তাঁত শাড়ির হাট',
    specialty: 'World famous Tangail Silk & Cotton Tat Sarees',
    rideModel: 'TVS Metro Plus 110',
    rideType: 'Bike',
    ridePrice: 700
  },
  kishoreganj: {
    placeName: 'Nikli Haor & Submerged Highway',
    placeNameBn: 'নিকলী হাওর ও অল-ওয়েদার সড়ক',
    placeCategory: 'Nature',
    placeDesc: 'Expansive water kingdom, scenic boat rides over submerged roads, and fresh freshwater river fish.',
    placeImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    hotelName: 'Nikli Riverfront Guest House',
    hotelNameBn: 'নিকলী রিভারফ্রন্ট গেস্ট হাউস',
    hotelPrice: 2500,
    hotelImg: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    restName: 'Haor Fresh Fish Kitchen',
    restNameBn: 'হাওর ফ্রেশ ফিশ কিচেন',
    cuisine: 'Fresh Haor Fish & Bengali Curries',
    menuItem: 'Boal & Pabda Fish Curry with Steamed Rice',
    shopName: 'Kishoreganj Cane & Jute Market',
    shopNameBn: 'কিশোরগঞ্জ বেত ও পাটশিল্প',
    specialty: 'Handmade Fishing Traps & Cane Baskets',
    rideModel: 'Engine Boat / Speedboat Rental',
    rideType: 'Boat',
    ridePrice: 1500
  },
  sylhet: {
    placeName: 'Jaflong & Ratargul Swamp Forest',
    placeNameBn: 'জাফলং ও রাতারগুল সোয়াম্প ফরেস্ট',
    placeCategory: 'Nature',
    placeDesc: 'Crystal clear river beds under Meghalaya mountains and freshwater mangrove swamp forest.',
    placeImg: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800',
    hotelName: 'Hotel Noorjahan Grand Sylhet',
    hotelNameBn: 'হোটেল নূরজাহান গ্র্যান্ড',
    hotelPrice: 3500,
    hotelImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    restName: 'Panshi Restaurant',
    restNameBn: 'পানসী রেস্তোরাঁ',
    cuisine: 'Traditional Bengali & 30+ Bhartas',
    menuItem: 'Shatkora Beef & Duck Curry',
    shopName: 'Zindabazar Handloom & Tea Hub',
    shopNameBn: 'জিন্দাবাজার তাঁত ও চা বিপণী',
    specialty: 'Manipuri Shawls & First-flush Sreemangal Tea',
    rideModel: 'Yamaha FZ-S FI V3 (150cc)',
    rideType: 'Bike',
    ridePrice: 1000
  },
  moulvibazar: {
    placeName: 'Sreemangal Tea Estates & Lawachara',
    placeNameBn: 'শ্রীমঙ্গল চা বাগান ও লাউয়াছড়া',
    placeCategory: 'Tea Garden',
    placeDesc: 'Lush green tea gardens, tropical rainforest, and seven-layer tea.',
    placeImg: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    hotelName: 'Grand Sultan Tea Resort & Golf',
    hotelNameBn: 'গ্র্যান্ড সুলতান টি রিসোর্ট',
    hotelPrice: 12500,
    hotelImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    restName: 'Nilkantha Tea Cabin',
    restNameBn: 'নীলকণ্ঠ টি কেবিন',
    cuisine: 'Iconic Multi-layer Tea & Local Snacks',
    menuItem: 'Seven-Layer Colored Tea & Pitha',
    shopName: 'Monipuri Handloom Complex',
    shopNameBn: 'মণিপুরী হ্যান্ডলুম কমপ্লেক্স',
    specialty: 'Handwoven Monipuri sarees & scarves',
    rideModel: '4x4 Open Safari Jeep',
    rideType: 'Chander Gari',
    ridePrice: 3500
  },
  sunamganj: {
    placeName: 'Tanguar Haor, Shimul Bagan & Niladri',
    placeNameBn: 'টাঙ্গুয়ার হাওর, শিমুল বাগান ও নীলাদ্রি',
    placeCategory: 'Nature',
    placeDesc: 'UNESCO Ramsar wetland site with luxury houseboats and turquoise river lakes.',
    placeImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    hotelName: 'Tanguar Haor Luxury Houseboats',
    hotelNameBn: 'টাঙ্গুয়ার হাওর হাউসবোট',
    hotelPrice: 6500,
    hotelImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    restName: 'Haor Boat Floating Kitchen',
    restNameBn: 'হাওর বোট কিচেন',
    cuisine: 'Fresh Haor Baim & Duck Roast',
    menuItem: 'Duck Bhuna with Haor Fish Fry',
    shopName: 'Tahirpur Shital Pati Market',
    shopNameBn: 'তাহিরপুর শীতল পাটি',
    specialty: 'Cooling Shital Pati mats & cane crafts',
    rideModel: 'Haor Speedboat & Houseboat',
    rideType: 'Boat',
    ridePrice: 2500
  },
  chattogram: {
    placeName: 'Patenga Beach & Guliakhali Green Beach',
    placeNameBn: 'পতেঙ্গা ও গুলিয়াখালী সমুদ্র সৈকত',
    placeCategory: 'Beach',
    placeDesc: 'Naval beach viewpoints, green grass carpeted Guliakhali, and historic Chittagong port.',
    placeImg: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800',
    hotelName: 'Radisson Blu Chattogram Bay View',
    hotelNameBn: 'র‍্যাডিসন ব্লু চট্টগ্রাম',
    hotelPrice: 11000,
    hotelImg: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    restName: 'Mezzan Haile Aaiun',
    restNameBn: 'মেজবান হাইলে আইয়ুন',
    cuisine: 'Authentic Mezbani Beef & Kala Bhuna',
    menuItem: 'Mezbani Beef with Chonar Dal',
    shopName: 'Teri Bazar Handicrafts',
    shopNameBn: 'টেরি বাজার',
    specialty: 'Chittagong Dry Fish & Traditional fabrics',
    rideModel: 'Toyota Corolla Sedan AC',
    rideType: 'Sedan',
    ridePrice: 4000
  },
  'coxs-bazar': {
    placeName: 'Inani Beach, Marine Drive & Saint Martin',
    placeNameBn: 'ইনানী বিচ, মেরিন ড্রাইভ ও সেন্ট মার্টিন',
    placeCategory: 'Beach',
    placeDesc: 'World’s longest sandy beach, coral reefs, and scenic hillside coastal highway.',
    placeImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    hotelName: 'Sayeman Beach Resort',
    hotelNameBn: 'সায়মন বিচ রিসোর্ট',
    hotelPrice: 8500,
    hotelImg: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    restName: 'Jhaubon Seafood Restaurant',
    restNameBn: 'ঝাউবন রেস্তোরাঁ',
    cuisine: 'Fresh Grilled Ocean Fish & Crab',
    menuItem: 'Grilled Red Snapper & Coral Fish BBQ',
    shopName: 'Burmese Market (বর্মী মার্কেট)',
    shopNameBn: 'বর্মী মার্কেট',
    specialty: 'Burmese pickles, sea shell jewelry, Rakhine textiles',
    rideModel: 'Honda CB Shine 125',
    rideType: 'Bike',
    ridePrice: 800
  },
  rangamati: {
    placeName: 'Sajek Valley & Kaptai Lake',
    placeNameBn: 'সাজেক ভ্যালি ও কাপ্তাই লেক',
    placeCategory: 'Hill',
    placeDesc: 'Kingdom of clouds atop lush ridges and boat cruising across turquoise Kaptai lake.',
    placeImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    hotelName: 'Meghpunji Eco Resort Sajek',
    hotelNameBn: 'মেঘপুঞ্জি ইকো রিসোর্ট',
    hotelPrice: 4500,
    hotelImg: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    restName: 'Sajek Hilltop Bamboo Cuisine',
    restNameBn: 'সাজেক হিলটপ ক্যাফে',
    cuisine: 'Tribal Bamboo Chicken & Hill Herbs',
    menuItem: 'Bamboo Chicken & Mountain Ginger Tea',
    shopName: 'Chakma Tribal Handloom Emporium',
    shopNameBn: 'চাকমা হস্তশিল্প',
    specialty: 'Ethnic Pinon-Hadi dresses & Bamboo crafts',
    rideModel: 'Mahindra 4x4 Mountain Chander Gari',
    rideType: 'Chander Gari',
    ridePrice: 4500
  },
  bandarban: {
    placeName: 'Nilgiri Hilltop & Nafakhum Waterfall',
    placeNameBn: 'নীলগিরি ও নাফাখুম জলপ্রপাত',
    placeCategory: 'Waterfall',
    placeDesc: 'Touch clouds at Nilgiri resort and trek through mountain streams to roaring waterfalls.',
    placeImg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    hotelName: 'Hill Crown Resort Bandarban',
    hotelNameBn: 'হিল ক্রাউন রিসোর্ট',
    hotelPrice: 4200,
    hotelImg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    restName: 'Marma Kitchen Bandarban',
    restNameBn: 'মারমা কিচেন',
    cuisine: 'Tribal Delicacies & Wild Bamboo Curry',
    menuItem: 'Smoked Mountain Fish & Sticky Rice',
    shopName: 'Bandarban Tribal Weaving Market',
    shopNameBn: 'বান্দরবান উপজাতীয় তাঁত বাজার',
    specialty: 'Bawm blankets & handmade hill shawls',
    rideModel: 'Land Cruiser 4x4 Mountain Jeep',
    rideType: 'Chander Gari',
    ridePrice: 5000
  },
  khagrachhari: {
    placeName: 'Alutila Mysterious Cave & Richhang Falls',
    placeNameBn: 'আলুটিলা গুহা ও রিছাং ঝর্ণা',
    placeCategory: 'Nature',
    placeDesc: 'Walk through torch-lit prehistoric underground stone cave and swim in cascading falls.',
    placeImg: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    hotelName: 'Hotel Gairing Khagrachhari',
    hotelNameBn: 'হোটেল গাইরিং',
    hotelPrice: 2800,
    hotelImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    restName: 'Paharia Kitchen Khagrachhari',
    restNameBn: 'পাহাড়িয়া কিচেন',
    cuisine: 'Indigenous Hill Cuisine',
    menuItem: 'Herbal Papaya Curry & Hill Chicken',
    shopName: 'Khagrachhari Hill Souvenirs',
    shopNameBn: 'খাগড়াছড়ি স্যুভনির',
    specialty: 'Pure Hill Mustard Honey & Wood Carvings',
    rideModel: 'Chander Gari 4x4',
    rideType: 'Chander Gari',
    ridePrice: 3800
  },
  cumilla: {
    placeName: 'Shalban Vihara & Mainamati Archaeological Site',
    placeNameBn: 'শালবন বিহার ও ময়নামতি',
    placeCategory: 'Heritage',
    placeDesc: '8th-century ancient Buddhist university and monastic complex in Lalmai hills.',
    placeImg: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    hotelName: 'Hotel Red Roof Inn Cumilla',
    hotelNameBn: 'রেড রুফ ইন কুমিল্লা',
    hotelPrice: 3200,
    hotelImg: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    restName: 'Matri Bhander (Original)',
    restNameBn: 'মাতৃভাণ্ডার রসমালাই',
    cuisine: 'Authentic World-Renowned Rasmalai',
    menuItem: 'Authentic Cumilla Rasmalai (৳300/kg)',
    shopName: 'Cumilla Khadi Cloth Center',
    shopNameBn: 'কুমিল্লা খাদি বস্ত্রালয়',
    specialty: 'Pure Handwoven Traditional Khadi Fabrics',
    rideModel: 'Bajaj Pulsar 150',
    rideType: 'Bike',
    ridePrice: 900
  },
  khulna: {
    placeName: 'Sundarbans Mangrove (Karamjal / Kotka)',
    placeNameBn: 'সুন্দরবন করমজল ও কটকা অভয়ারণ্য',
    placeCategory: 'Forest',
    placeDesc: 'UNESCO World Heritage mangrove habitat of Royal Bengal Tigers and saltwater crocodiles.',
    placeImg: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800',
    hotelName: 'City Inn Khulna',
    hotelNameBn: 'সিটি ইন খুলনা',
    hotelPrice: 4800,
    hotelImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    restName: 'Abbas Hotel (Chuknagar)',
    restNameBn: 'আব্বাস হোটেল (চুই ঝাল)',
    cuisine: 'Spicy Chui Jhal Mutton & Beef',
    menuItem: 'Chui Jhal Khasi with Steamed Rice',
    shopName: 'Sundarbans Pure Honey Mart',
    shopNameBn: 'সুন্দরবন খাঁটি মধু ও মোম',
    specialty: 'Raw Khalisha Flower Honey & Sundarban Wax',
    rideModel: 'Sundarbans Eco Cruise Boat',
    rideType: 'Boat',
    ridePrice: 8500
  },
  bagerhat: {
    placeName: 'Sixty Dome Mosque (Shat Gombuj Masjid)',
    placeNameBn: 'ষাট গম্বুজ মসজিদ ও খান জাহান মাজার',
    placeCategory: 'Heritage',
    placeDesc: '15th-century UNESCO World Heritage Sultanate brick architecture with 77 domes.',
    placeImg: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    hotelName: 'Hotel Momotaz Bagerhat',
    hotelNameBn: 'হোটেল মমতাজ',
    hotelPrice: 2000,
    hotelImg: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    restName: 'Khan Jahan Heritage Restaurant',
    restNameBn: 'খান জাহান হেরিটেজ রেস্তোরাঁ',
    cuisine: 'Fresh River Prawn & Coastal Curries',
    menuItem: 'Golda Chingri Malaikari',
    shopName: 'Bagerhat Coconut Shell Crafts',
    shopNameBn: 'বাগেরহাট নারিকেল পণ্য',
    specialty: 'Carved Coconut Shell Art & Coir Mats',
    rideModel: 'Tourist CNG Auto-rickshaw',
    rideType: 'Bike',
    ridePrice: 800
  },
  jashore: {
    placeName: 'Gadkhali Flower Capital & Michael Madhusudan House',
    placeNameBn: 'গদখালী ফুলের রাজ্য ও মাইকেল মধুসূদন বাড়ি',
    placeCategory: 'Nature',
    placeDesc: 'Vast colorful fields of blooming roses and gladiolus supplying flowers across Bangladesh.',
    placeImg: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800',
    hotelName: 'Hotel Zabeer International Jashore',
    hotelNameBn: 'হোটেল জাবীর ইন্টারন্যাশনাল',
    hotelPrice: 6200,
    hotelImg: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    restName: 'Jashore Nolen Gur Kitchen',
    restNameBn: 'যশোর নলেন গুড় কিচেন',
    cuisine: 'Date Palm Sweets & Traditional Bengali',
    menuItem: 'Nolen Gurer Payesh & Patali Gur',
    shopName: 'Gadkhali Fresh Flower Hub',
    shopNameBn: 'গদখালী ফুল বাজার',
    specialty: 'Fresh Roses, Gerbera & Date Palm Jaggery',
    rideModel: 'Toyota Allion Sedan',
    rideType: 'Sedan',
    ridePrice: 3800
  },
  kushtia: {
    placeName: 'Lalon Shah Mazar & Tagore Kuthibari',
    placeNameBn: 'লালন শাহ মাজার ও শিলাইদহ কুঠিবাড়ি',
    placeCategory: 'Heritage',
    placeDesc: 'Spiritual shrine of mystic Baul philosopher Fakir Lalon Shah and Rabindranath Tagore’s bungalow.',
    placeImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    hotelName: 'Hotel River View Kushtia',
    hotelNameBn: 'হোটেল রিভার ভিউ কুষ্টিয়া',
    hotelPrice: 2600,
    hotelImg: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    restName: 'Lalon Folk Sweet & Dining',
    restNameBn: 'লালন লোকসংগীত ক্যাফে',
    cuisine: 'Traditional Sweets & Bengali Dishes',
    menuItem: 'Kushtia Tilor Khaja & Special Kulfi',
    shopName: 'Kushtia Baul Instrument Shop',
    shopNameBn: 'কুষ্টিয়া বাউল একতারা ও দোতারা',
    specialty: 'Handcrafted Ektara, Dotara & Folk Instruments',
    rideModel: 'Hero Glamour 125',
    rideType: 'Bike',
    ridePrice: 750
  },
  barishal: {
    placeName: 'Guthia Mosque & Floating Guava Market',
    placeNameBn: 'গুঠিয়া মসজিদ ও ভাসমান পেয়ারা বাজার',
    placeCategory: 'Heritage',
    placeDesc: 'Majestic Guthia Islamic architecture and hundreds of wooden boats trading fresh guavas in canals.',
    placeImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    hotelName: 'Grand Park Hotel Barishal',
    hotelNameBn: 'গ্র্যান্ড পার্ক হোটেল',
    hotelPrice: 5200,
    hotelImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    restName: 'Hotel Kasturi Barishal',
    restNameBn: 'হোটেল কস্তুরী',
    cuisine: 'Fresh River Hilsa & Duck Bhuna',
    menuItem: 'Padma/Meghna Ilish Bhaji with Kacha Morich',
    shopName: 'Barishal Shital Pati & Craft Center',
    shopNameBn: 'বরিশাল শীতল পাটি বিপণী',
    specialty: 'Handwoven Shital Pati & Hog Plum (Amra) Jams',
    rideModel: 'River Speedboat & Engine Trawler',
    rideType: 'Boat',
    ridePrice: 2000
  },
  patuakhali: {
    placeName: 'Kuakata Beach (Sunrise & Sunset Point)',
    placeNameBn: 'কুয়াকাটা সৈকত (সূর্যাস্ত ও সূর্যোদয়)',
    placeCategory: 'Beach',
    placeDesc: '18km scenic sandy beach where both sunrise and sunset can be viewed over the ocean horizon.',
    placeImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    hotelName: 'Sikder Resort & Villas Kuakata',
    hotelNameBn: 'শিকদার রিসোর্ট কুয়াকাটা',
    hotelPrice: 4200,
    hotelImg: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    restName: 'Kuakata Beachside BBQ Cafe',
    restNameBn: 'কুয়াকাটা বিচ ক্যাফে',
    cuisine: 'Fresh Seafood BBQ & Crab Fry',
    menuItem: 'Spicy Fried Red Crab & Grilled Rupchanda',
    shopName: 'Rakhine Handloom Market Kuakata',
    shopNameBn: 'রাখাইন হস্তশিল্প মার্কেট',
    specialty: 'Rakhine lungi, handmade shawls, conch shells',
    rideModel: 'Beach 4-Wheel Quad Bike',
    rideType: 'Bike',
    ridePrice: 1200
  },
  rajshahi: {
    placeName: 'Varendra Research Museum & Padma River Park',
    placeNameBn: 'বরেন্দ্র গবেষণা জাদুঘর ও পদ্মাপাড়',
    placeCategory: 'Heritage',
    placeDesc: 'Oldest museum in Bangladesh with ancient Pala sculptures and scenic sunset promenade over Padma.',
    placeImg: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
    hotelName: 'Hotel Grand Riverview Rajshahi',
    hotelNameBn: 'গ্র্যান্ড রিভারভিউ রাজশাহী',
    hotelPrice: 4500,
    hotelImg: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    restName: 'Rajshahi Kalai Ruti & Duck House',
    restNameBn: 'রাজশাহী কালাই রুটি ঘর',
    cuisine: 'Famous Mashkalai Flatbread with Chili Bharta',
    menuItem: 'Kalai Ruti with Duck Bhuna & Begun Bharta',
    shopName: 'Rajshahi Silk Factory Showroom',
    shopNameBn: 'রাজশাহী সিল্ক শো-রুম',
    specialty: 'Pure Mulberry Silk Sarees & Kurtas',
    rideModel: 'Yamaha FZ 150',
    rideType: 'Bike',
    ridePrice: 950
  },
  bogura: {
    placeName: 'Mahasthangarh Ancient Citadel & Museum',
    placeNameBn: 'মহাস্থানগড় প্রত্নস্থল ও জাদুঘর',
    placeCategory: 'Heritage',
    placeDesc: '3rd-century BC fortified archaeological city of Pundranagara on Karatoya River.',
    placeImg: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800',
    hotelName: 'Hotel Naz Garden Bogura',
    hotelNameBn: 'হোটেল নাজ গার্ডেন বগুড়া',
    hotelPrice: 4800,
    hotelImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    restName: 'Akboria Grand (Original Bogurar Doi)',
    restNameBn: 'আকবরিয়া স্পেশাল দই',
    cuisine: 'GI-Certified Traditional Bogurar Doi',
    menuItem: 'Bogurar Shahi Misti Doi in Clay Pot',
    shopName: 'Bogura Terracotta & Clay Craft',
    shopNameBn: 'বগুড়া মৃৎশিল্প',
    specialty: 'Clay pots, terracotta souvenirs, traditional sweets',
    rideModel: 'Honda Shine 125',
    rideType: 'Bike',
    ridePrice: 800
  },
  naogaon: {
    placeName: 'Somapura Mahavihara (Paharpur UNESCO Site)',
    placeNameBn: 'সোমপুর মহাবিহার (পাহাড়পুর)',
    placeCategory: 'Heritage',
    placeDesc: '8th-century Buddhist monastery with colossal central cruciform temple.',
    placeImg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    hotelName: 'Hotel Avanti Naogaon',
    hotelNameBn: 'হোটেল অবন্তি নওগাঁ',
    hotelPrice: 2200,
    hotelImg: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    restName: 'Paharpur Heritage Dining',
    restNameBn: 'পাহাড়পুর হেরিটেজ ডাইনিং',
    cuisine: 'Northern Bengali Cuisine & Sandesh',
    menuItem: 'Naogaon Peda Sandesh & Deshi Fish',
    shopName: 'Paharpur Archaeological Souvenir Shop',
    shopNameBn: 'পাহাড়পুর স্যুভনির',
    specialty: 'Terracotta plaques, terracotta showpieces',
    rideModel: 'Toyota Hiace AC Microbus',
    rideType: 'Microbus',
    ridePrice: 4500
  },
  natore: {
    placeName: 'Natore Rajbari (Rani Bhabani Palace) & Uttara Ganabhaban',
    placeNameBn: 'নাটোর রাজবাড়ি ও উত্তরা গণভবন',
    placeCategory: 'Heritage',
    placeDesc: 'Historic royal palace complex of Queen Bhabani with grand gardens and Italian marble statues.',
    placeImg: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    hotelName: 'Hotel VIP Natore',
    hotelNameBn: 'হোটেল ভিআইপি নাটোর',
    hotelPrice: 2400,
    hotelImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    restName: 'Kundu Mistanna Bhandar',
    restNameBn: 'কুন্ডু মিষ্টান্ন ভান্ডার (কাঁচাগোল্লা)',
    cuisine: 'World Famous Authentic Kachagolla',
    menuItem: 'Natorer Authentic Kachagolla (৳420/kg)',
    shopName: 'Natore Cane & Jaggery Market',
    shopNameBn: 'নাটোর বেত ও গুড় বিপণী',
    specialty: 'Cane furniture, pure date palm molasses',
    rideModel: 'Bajaj Discover 125',
    rideType: 'Bike',
    ridePrice: 750
  },
  dinajpur: {
    placeName: 'Kantajew Temple (Kantaji Mandir) & Ramsagar',
    placeNameBn: 'কান্তজীউ মন্দির ও রামসাগর',
    placeCategory: 'Heritage',
    placeDesc: 'South Asia’s most intricate 18th-century terracotta art temple and the largest man-made lake Ramsagar.',
    placeImg: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800',
    hotelName: 'Hotel Diamond Dinajpur',
    hotelNameBn: 'হোটেল ডায়মন্ড',
    hotelPrice: 2500,
    hotelImg: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    restName: 'Kataribhog Polao House',
    restNameBn: 'কাটারিভোগ পোলাও ঘর',
    cuisine: 'Aromatic Kataribhog Rice & Roast',
    menuItem: 'Dinajpur Special Polao with Deshi Chicken',
    shopName: 'Dinajpur Rice & Terracotta Market',
    shopNameBn: 'দিনাজপুর কাটারিভোগ চাল ও হস্তশিল্প',
    specialty: 'Premium Kataribhog Rice & Terracotta art replicas',
    rideModel: 'TVS Apache RTR 160',
    rideType: 'Bike',
    ridePrice: 850
  },
  panchagarh: {
    placeName: 'Tetulia Plainland Tea Gardens & Kanchenjunga View',
    placeNameBn: 'তেঁতুলিয়া চা বাগান ও কাঞ্চনজঙ্ঘা ভিউ',
    placeCategory: 'Tea Garden',
    placeDesc: 'Northernmost plainland tea gardens with clear views of snow-capped Mt. Kanchenjunga in autumn.',
    placeImg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    hotelName: 'Kanchenjunga Eco Resort Tetulia',
    hotelNameBn: 'কাঞ্চনজঙ্ঘা ইকো রিসোর্ট',
    hotelPrice: 3500,
    hotelImg: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    restName: 'Mahananda River View Dining',
    restNameBn: 'মহানন্দা ভিউ ক্যাফে',
    cuisine: 'Northern Freshwater Trout & Organic Tea',
    menuItem: 'River Fish Fry & Green Tea Infusions',
    shopName: 'Panchagarh Tea & Stone Crafts',
    shopNameBn: 'পঞ্চগড় অর্গানিক চা ও পাথর শিল্প',
    specialty: 'Organic Plainland Tea & Carved Mahananda Rocks',
    rideModel: 'Mahindra 4x4 Mountain Jeep',
    rideType: 'Chander Gari',
    ridePrice: 3500
  },
  rangpur: {
    placeName: 'Tajhat Palace Archaeological Museum & Chikli Water Park',
    placeNameBn: 'তাজহাট জমিদার বাড়ি ও চিকলি পার্ক',
    placeCategory: 'Heritage',
    placeDesc: 'Magnificent neoclassical palace built by Maharaja Govinda Lal with 31 white marble staircases.',
    placeImg: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    hotelName: 'Hotel Grand Palace Rangpur',
    hotelNameBn: 'হোটেল গ্র্যান্ড প্যালেস রংপুর',
    hotelPrice: 4200,
    hotelImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    restName: 'Haribhanga Royal Feast',
    restNameBn: 'হাঁড়িভাঙা রয়্যাল কিচেন',
    cuisine: 'Northern Bangladeshi Cuisine & Mango Desserts',
    menuItem: 'Morog Polao with Haribhanga Mango Chutney',
    shopName: 'Shataranji Handloom Center (Nisbetganj)',
    shopNameBn: 'শতরঞ্জি পল্লী (রংপুর)',
    specialty: 'GI-Certified Historic Shataranji floor rugs & tapestry',
    rideModel: 'Toyota Corolla Axio',
    rideType: 'Sedan',
    ridePrice: 3500
  },
  mymensingh: {
    placeName: 'Shashi Lodge (Rajbari) & Botanical Garden',
    placeNameBn: 'শশী লজ ও বোটানিক্যাল গার্ডেন',
    placeCategory: 'Heritage',
    placeDesc: 'Victorian-era palace with Roman Venus statue and Brahmaputra riverside gardens.',
    placeImg: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    hotelName: 'Hotel Silver Castle Mymensingh',
    hotelNameBn: 'হোটেল সিলভার ক্যাসেল',
    hotelPrice: 3800,
    hotelImg: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    restName: 'Gopal Pal Original Monda (Muktagacha)',
    restNameBn: 'গোপাল পালের আসল মণ্ডা (মুক্তাগাছা)',
    cuisine: 'Centuries-Old Royal Heritage Sweet (since 1824)',
    menuItem: 'Muktagachar Authentic Monda (৳500/kg)',
    shopName: 'Mymensingh Nakshi Kantha Bazaar',
    shopNameBn: 'ময়মনসিংহ নকশিকাঁথা বাজার',
    specialty: 'Exquisite hand-embroidered Nakshi Kantha quilts',
    rideModel: 'Honda Livo 110',
    rideType: 'Bike',
    ridePrice: 700
  },
  netrokona: {
    placeName: 'Birishiri White Ceramic Hills & Someshwari Lake',
    placeNameBn: 'বিরিশিরি চিনামাটির পাহাড় ও নীল লেক',
    placeCategory: 'Nature',
    placeDesc: 'Turquoise blue lakes amidst white clay hills and cultural academy of Garo and Hajong tribes.',
    placeImg: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    hotelName: 'Birishiri Eco Cottages Durgapur',
    hotelNameBn: 'বিরিশিরি ইকো কটেজ',
    hotelPrice: 2800,
    hotelImg: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    restName: 'Goyanath Authentic Balish Misti',
    restNameBn: 'গয়ানাথের বালিশ মিষ্টি',
    cuisine: 'Famous Giant Pillow-shaped Sweet',
    menuItem: 'Netrokonar Balish Misti (Pillow Sweet)',
    shopName: 'Garo Tribal Weaving Center',
    shopNameBn: 'গারো উপজাতীয় হস্তশিল্প',
    specialty: 'Handwoven Dokmanda dresses & bamboo mugs',
    rideModel: 'Durgapur Mountain Bike & Chander Gari',
    rideType: 'Bike',
    ridePrice: 600
  }
};

// Generate comprehensive data lists for all 64 districts
export const INITIAL_PLACES: Place[] = INITIAL_DISTRICTS.map(district => {
  const custom = DISTRICT_DATA_CATALOG[district.id];
  const name = custom ? custom.placeName : `${district.name} Historic Landmark & Eco Park`;
  const name_bn = custom ? custom.placeNameBn : `${district.name_bn} ঐতিহাসিক দর্শনীয় স্থান`;
  const category = custom ? custom.placeCategory : 'Nature';
  const short_desc = custom ? custom.placeDesc : `Scenic natural attractions, heritage monuments, and peaceful spots in ${district.name}.`;
  const img = custom ? custom.placeImg : district.image_url;

  return {
    id: `place-${district.id}`,
    district_id: district.id,
    district_name: district.name,
    division: district.division,
    name: name,
    name_bn: name_bn,
    rating: Number((4.6 + ((district.name.length % 4) * 0.1)).toFixed(1)),
    reviews_count: 120 + (district.name.length * 18),
    short_description: short_desc,
    full_description: `${name} is one of the premier tourist landmarks of ${district.name} in ${district.division} division. Explore the scenic surroundings, regional heritage, and local hospitality.`,
    location: `${district.name} Sadar, Bangladesh`,
    lat: district.lat,
    lng: district.lng,
    entry_fee: 'Free / ৳20-৳50 entry',
    opening_time: '08:00 AM - 06:00 PM',
    best_time: district.popular_season,
    how_to_reach: `Easily accessible via direct bus or train routes from Dhaka and regional division hubs to ${district.name}.`,
    image_url: img,
    gallery: [img, district.image_url],
    category: category,
    is_featured: ['dhaka', 'coxs-bazar', 'sylhet', 'moulvibazar', 'rangamati', 'bandarban', 'khulna', 'patuakhali', 'panchagarh', 'dinajpur', 'naogaon', 'netrokona', 'bogura', 'sunamganj'].includes(district.id),
    nearby_hotels: [`hotel-${district.id}`],
    nearby_restaurants: [`rest-${district.id}`]
  };
});

export const INITIAL_HOTELS: Hotel[] = INITIAL_DISTRICTS.map((district, index) => {
  const custom = DISTRICT_DATA_CATALOG[district.id];
  const name = custom ? custom.hotelName : `Hotel ${district.name} Regency & Resort`;
  const name_bn = custom ? custom.hotelNameBn : `হোটেল ${district.name_bn} রিজেন্সি`;
  const price = custom ? custom.hotelPrice : 2200 + ((district.name.length % 5) * 400);
  const img = custom ? custom.hotelImg : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85';

  const roomPhoto1 = 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80';
  const roomPhoto2 = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80';
  const diningPhoto = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80';
  const viewPhoto = 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80';

  return {
    id: `hotel-${district.id}`,
    district_id: district.id,
    district_name: district.name,
    name: name,
    name_bn: name_bn,
    rating: Number((4.5 + ((district.name.length % 4) * 0.1)).toFixed(1)),
    reviews_count: 80 + (district.name.length * 12),
    price_per_night: price,
    price_formatted: `৳${price.toLocaleString()}/night`,
    location: `${district.name} City Center`,
    address: `Station Road, ${district.name} Sadar`,
    contact_phone: '+880 1711-' + String(100000 + district.name.length * 11111).slice(0, 6),
    contact_email: `info@hotel${district.id}.com.bd`,
    has_ac: true,
    has_wifi: true,
    has_parking: true,
    has_restaurant: true,
    has_room_service: true,
    has_security: true,
    image_url: img,
    gallery: [img, roomPhoto1, roomPhoto2, diningPhoto, viewPhoto],
    room_types: [
      { name: 'Deluxe AC Room', name_bn: 'ডিলাক্স এসি রুম', price: price, bed: '1 King Bed', capacity: '2 Adults', is_ac: true, image_url: roomPhoto1 },
      { name: 'Executive Suite', name_bn: 'এক্সিকিউটিভ স্যুট', price: Math.round(price * 1.5), bed: '1 King Bed + Lounge', capacity: '3 Guests', is_ac: true, image_url: roomPhoto2 }
    ],
    check_in: '12:00 PM',
    check_out: '11:30 AM',
    is_featured: ['moulvibazar', 'coxs-bazar', 'rangamati', 'patuakhali', 'dhaka', 'sylhet', 'chattogram', 'khulna'].includes(district.id)
  };
});

export const INITIAL_RESTAURANTS: Restaurant[] = INITIAL_DISTRICTS.map(district => {
  const custom = DISTRICT_DATA_CATALOG[district.id];
  const name = custom ? custom.restName : `${district.name} Heritage Dining & Sweets`;
  const name_bn = custom ? custom.restNameBn : `${district.name_bn} ঐতিহ্যবাহী খাবার`;
  const cuisine = custom ? custom.cuisine : `Traditional ${district.name} Cuisine & River Fish`;
  const menuItem = custom ? custom.menuItem : `${district.name} Special Curd & Fresh Fish Curry`;
  const img = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800';

  return {
    id: `rest-${district.id}`,
    district_id: district.id,
    district_name: district.name,
    name: name,
    name_bn: name_bn,
    rating: Number((4.6 + ((district.name.length % 4) * 0.1)).toFixed(1)),
    reviews_count: 140 + (district.name.length * 20),
    cuisine: cuisine,
    cuisine_bn: 'ঐতিহ্যবাহী খাবার',
    price_tier: '৳৳',
    location: `${district.name} Sadar`,
    address: `Main Road, ${district.name}`,
    phone: '+880 1812-' + String(200000 + district.name.length * 11111).slice(0, 6),
    opening_hours: '07:00 AM - 11:00 PM',
    menu_highlights: [menuItem, 'Deshi Chicken Bhuna', 'Special Bharta Platter'],
    image_url: img,
    is_featured: ['dhaka', 'chattogram', 'sylhet', 'bogura', 'natore', 'khulna', 'barishal'].includes(district.id)
  };
});

export const INITIAL_SHOPPING: ShoppingPlace[] = INITIAL_DISTRICTS.map(district => {
  const custom = DISTRICT_DATA_CATALOG[district.id];
  const name = custom ? custom.shopName : `${district.name} Traditional Handicrafts & Bazaar`;
  const name_bn = custom ? custom.shopNameBn : `${district.name_bn} ঐতিহ্যবাহী শপিং`;
  const specialty = custom ? custom.specialty : `Authentic ${district.name} Handloom, Jute, Cane & Local Sweets`;
  const img = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800';

  return {
    id: `shop-${district.id}`,
    district_id: district.id,
    district_name: district.name,
    name: name,
    name_bn: name_bn,
    category: 'Handicrafts & Souvenirs',
    location: `${district.name} Town Center`,
    address: `Bazar Road, ${district.name}`,
    famous_for: specialty,
    opening_hours: '09:00 AM - 09:30 PM',
    image_url: img
  };
});

export const INITIAL_RIDES: Ride[] = INITIAL_DISTRICTS.map(district => {
  const custom = DISTRICT_DATA_CATALOG[district.id];
  const model = custom ? custom.rideModel : 'Bajaj Pulsar 150 / Tourist CNG';
  const type = custom ? custom.rideType : 'Bike';
  const price = custom ? custom.ridePrice : 800;
  const img = type === 'Chander Gari' 
    ? 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
    : type === 'Microbus' 
    ? 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800'
    : type === 'Boat'
    ? 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800'
    : 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800';

  return {
    id: `ride-${district.id}`,
    district_id: district.id,
    district_name: district.name,
    vehicle_type: type,
    model: model,
    rental_type: type === 'Bike' ? 'Self Drive' : 'With Driver',
    price_per_hour: type === 'Bike' ? 120 : undefined,
    price_per_day: price,
    location: `${district.name} Sadar`,
    owner_name: `${district.name} Travel & Ride Rentals`,
    contact_phone: '+880 1913-' + String(300000 + district.name.length * 11111).slice(0, 6),
    availability_status: 'Available',
    image_url: img
  };
});

// INTER-DISTRICT TRANSPORT ROUTES
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

// SAMPLE ITINERARY TRIP
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
      place_id: 'place-sylhet',
      day_number: 1,
      order_index: 1,
      time_slot: '09:00 AM - 01:30 PM',
      notes: 'Morning boat ride across Dauki river and explore stone valley.'
    },
    {
      id: 'tp-2',
      trip_id: 'trip-sylhet-3day',
      place_id: 'place-sylhet',
      day_number: 1,
      order_index: 2,
      time_slot: '03:00 PM - 05:30 PM',
      notes: 'Afternoon calm boat cruise into the swamp forest.'
    },
    {
      id: 'tp-3',
      trip_id: 'trip-sylhet-3day',
      place_id: 'place-moulvibazar',
      day_number: 2,
      order_index: 1,
      time_slot: '09:30 AM - 02:00 PM',
      notes: 'Cycle through Sreemangal tea estates and sample Seven-layer tea.'
    }
  ],
  created_at: new Date().toISOString()
};
