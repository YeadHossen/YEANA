import { TransportRoute, TransportType, Division } from '../types';
import { INITIAL_DISTRICTS } from '../data/seedData';
import { BANGLADESH_UPAZILAS, UpazilaInfo } from '../data/upazilaData';

export interface BorderCheckpostInfo {
  id: string;
  name: string;
  name_bn: string;
  districtId: string;
  districtName: string;
  upazilaName: string;
  division: Division;
  counterpartPort: string;
  counterpartState: string;
  counterpartCountry: 'India' | 'Myanmar';
  portType: 'Land Customs & Immigration (Road)' | 'Rail & Road Port' | 'River Port';
  popularFor: string;
  immigrationHours: string;
  travelTaxInfo: string;
  directBusOperators: string[];
  hasRailway?: boolean;
  railwayStation?: string;
  lat: number;
  lng: number;
  transitAdvice: string;
}

export interface LocalVehicleGuideItem {
  id: string;
  name: string;
  name_bn: string;
  category: 'cng' | 'chander_gari' | 'easy_bike' | 'trawler' | 'bike' | 'leguna';
  capacity: string;
  typicalFare: string;
  bestFor: string;
  tips: string;
}

export const LOCAL_VEHICLES_GUIDE: LocalVehicleGuideItem[] = [
  {
    id: 'chander-gari',
    name: 'Chander Gari / 4x4 Mahindra Jeep (চাঁদের গাড়ি)',
    name_bn: 'পাহাড় ও ঝর্ণার ৪x৪ চান্দের গাড়ি',
    category: 'chander_gari',
    capacity: '12 - 14 Passengers',
    typicalFare: '৳7,500 - ৳12,000 (Full 2-Day Reserve) / ৳350-500 (Per Seat Shared)',
    bestFor: 'Sajek Valley, Nilgiri, Thanchi, Ruma Bazar, Nafakhum, Boga Lake',
    tips: 'Ensure joining the Army Escort convoy at Dighinala (10:30 AM & 03:00 PM). Booking full reserve includes driver stay.'
  },
  {
    id: 'cng-autorickshaw',
    name: 'CNG Auto-Rickshaw (৩ চাকার সিএনজি)',
    name_bn: 'সবুজ সিএনজি অটোরিকশা',
    category: 'cng',
    capacity: '4 Passengers (Max)',
    typicalFare: '৳30 - ৳80 (Shared Upazila Feeder) / ৳400 - ৳1,200 (Reserved Half/Full Day)',
    bestFor: 'Jaflong, Ratargul, Sreemangal Tea Estates, Cox’s Bazar Inani Marine Drive, Upazila Connectors',
    tips: 'Meter is rare outside Dhaka/Chattogram Sadar. Always agree on reserve price before boarding.'
  },
  {
    id: 'haor-trawler',
    name: 'Haor Wooden Trawler & Luxury Houseboat (হাওর ট্রলার ও হাউসবোট)',
    name_bn: 'টাঙ্গুয়ার হাওর ট্রলার ও কাঠের ইঞ্জিন বোট',
    category: 'trawler',
    capacity: '15 - 30 Passengers (Engine Boat) / 8 - 18 Guests (Luxury Houseboat)',
    typicalFare: '৳4,500 - ৳8,500 (Day Engine Trawler) / ৳6,000 - ৳12,000 per person (Overnight AC Houseboat)',
    bestFor: 'Tanguar Haor, Niladri Lake, Shimul Bagan, Nikli Haor, Astagram',
    tips: 'Life jackets mandatory. For Tanguar Haor, board at Tahirpur Ghat or Sunamganj Shaheb Bari Ghat.'
  },
  {
    id: 'easy-bike-tomtom',
    name: 'Battery Easy Bike / TomTom (ইজি বাইক ও টমটম)',
    name_bn: 'ব্যাটারি চালিত ইজিবাইক ও টমটম',
    category: 'easy_bike',
    capacity: '6 Passengers',
    typicalFare: '৳10 - ৳30 (Per Person Shared) / ৳250 - ৳500 (Upazila Short Reserve)',
    bestFor: 'Town centers, Kuakata Beach zero point, Sreemangal town, Bagerhat Mosque City',
    tips: 'Eco-friendly and affordable for short 5-15 km hops between rural bazaars and tourist spots.'
  },
  {
    id: 'local-leguna',
    name: 'Leguna / Human Hauler (লেগুনা / হিউম্যান হলার)',
    name_bn: 'লোকাল লেগুনা ও ম্যাক্সি',
    category: 'leguna',
    capacity: '10 - 12 Passengers',
    typicalFare: '৳15 - ৳50 (Per Seat Fixed Route)',
    bestFor: 'Suburban highways, Gazipur, Savar, Narayanganj, Cox’s Bazar to Ramu, Rangpur highways',
    tips: 'Departs as soon as all seats are full. Payment collected by the helper at the back gate.'
  },
  {
    id: 'tourist-bike',
    name: 'Local Motorcycle Rider / Bike Shuttle (মোটরসাইকেল যাত্রী সেবা)',
    name_bn: 'লোকাল বাইকার ও পাহাড়ি ট্রেইল রাইডার',
    category: 'bike',
    capacity: '1 Passenger + Backpack',
    typicalFare: '৳150 - ৳600 (Single Hop / Trail Crossing)',
    bestFor: 'Sunamganj to Tahirpur Ghat, Netrokona Birishiri Ceramic Lake, Bandarban remote hills',
    tips: 'Fastest transit across unpaved haor embankments and hill trails where 4-wheelers cannot enter.'
  }
];

export interface SearchableLocation {
  id: string;
  name: string;
  name_bn: string;
  division: Division;
  districtId: string;
  districtName: string;
  type: 'district' | 'upazila' | 'tourist_spot' | 'airport_city' | 'port_city' | 'border_checkpost';
  popular_tag?: string;
  lat: number;
  lng: number;
  hasRailway?: boolean;
  railwayStation?: string;
  hasAirport?: boolean;
  airportCode?: string;
  hasLaunchGhat?: boolean;
  launchGhatName?: string;
  isBorderPort?: boolean;
  counterpartPort?: string;
  counterpartCountry?: string;
  immigrationHours?: string;
  transitTip?: string;
}

// ----------------------------------------------------------------------------
// BANGLADESH BORDER CUSTOMS & IMMIGRATION CHECKPOSTS (ALL ACTIVE LAND PORTS)
// ----------------------------------------------------------------------------
export const BANGLADESH_BORDER_CHECKPOSTS: BorderCheckpostInfo[] = [
  {
    id: 'border-benapole',
    name: 'Benapole Land Port & Immigration (বেনাপোল)',
    name_bn: 'বেনাপোল স্থলবন্দর ও আন্তর্জাতিক ইমিগ্রেশন',
    districtId: 'jashore',
    districtName: 'Jashore',
    upazilaName: 'Sharsha (শার্শা)',
    division: 'Khulna',
    counterpartPort: 'Petrapole (পেট্রাপোল), North 24 Parganas, West Bengal',
    counterpartState: 'West Bengal',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Primary International Gateway to Kolkata (কলকাতা) & Rest of India',
    immigrationHours: '06:00 AM - 06:30 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax + ৳500 Port User Fee (Payable via Sonali Bank online / Border counter)',
    directBusOperators: ['Green Line (Scania AC)', 'Shyamoli NR Travels', 'Shohagh Elite', 'Royal Coach', 'BRTC International', 'Desh Travels'],
    hasRailway: true,
    railwayStation: 'Benapole International Railway Station (Bandhan Express)',
    lat: 23.0378,
    lng: 88.8986,
    transitAdvice: 'Direct AC Sleeper buses from Dhaka (Gabtoli/Arambagh/Sayedabad) via Padma Bridge take ~5.5 hours to Benapole Border Zero Point.'
  },
  {
    id: 'border-burimari',
    name: 'Burimari Land Port & Immigration (বুড়িমারী)',
    name_bn: 'বুড়িমারী স্থলবন্দর ও ইমিগ্রেশন চেকপোস্ট',
    districtId: 'lalmonirhat',
    districtName: 'Lalmonirhat',
    upazilaName: 'Patgram (পাটগ্রাম)',
    division: 'Rangpur',
    counterpartPort: 'Changrabandha (চ্যাংড়াবান্ধা), Cooch Behar, West Bengal',
    counterpartState: 'West Bengal',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Direct route to Siliguri (শিলিগুড়ি), Darjeeling (দার্জিলিং), Gangtok (সিকিম) & Bhutan',
    immigrationHours: '07:00 AM - 06:00 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax + ৳500 Port Fee',
    directBusOperators: ['Shyamoli Paribahan', 'Manik Enterprise', 'SR Travels', 'Nabil Paribahan', 'Hanif Enterprise'],
    hasRailway: true,
    railwayStation: 'Burimari Railway Station',
    lat: 26.3756,
    lng: 88.9882,
    transitAdvice: 'Board direct AC Sleeper Coach from Dhaka (Kalyanpur/Gabtoli). Changrabandha has direct Taxis to Siliguri (70km) and Darjeeling.'
  },
  {
    id: 'border-tamabil',
    name: 'Tamabil Land Port & Dawki Immigration (তামাবিল-ডাউকি)',
    name_bn: 'তামাবিল স্থলবন্দর ও ডাউকি ইমিগ্রেশন',
    districtId: 'sylhet',
    districtName: 'Sylhet',
    upazilaName: 'Gowainghat (গোয়াইনঘাট)',
    division: 'Sylhet',
    counterpartPort: 'Dawki (ডাউকি), West Jaintia Hills, Meghalaya',
    counterpartState: 'Meghalaya',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Scenic gateway to Shillong (শিলং), Cherrapunji (চেরাপুঞ্জি) & Assam (আসাম)',
    immigrationHours: '07:00 AM - 06:00 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax (Sonali Bank e-service)',
    directBusOperators: ['Green Line Paribahan', 'Ena Transport', 'Sylhet-Tamabil AC Tourist Feeder', 'Hanif Enterprise'],
    lat: 25.1764,
    lng: 92.0163,
    transitAdvice: 'Take direct bus to Sylhet Kadamtali, then hire Microbus/CNG to Tamabil Border (55 km, 1.5h). Dawki taxis available to Shillong (85 km, 3h).'
  },
  {
    id: 'border-akhaura',
    name: 'Akhaura Land Port & Agartala Immigration (আখাউড়া-আগরতলা)',
    name_bn: 'আখাউড়া স্থলবন্দর ও আগরতলা চেকপোস্ট',
    districtId: 'brahmanbaria',
    districtName: 'Brahmanbaria',
    upazilaName: 'Akhaura (আখাউড়া)',
    division: 'Chattogram',
    counterpartPort: 'Agartala Integrated Check Post (আগরতলা), Tripura',
    counterpartState: 'Tripura',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Immediate gateway to Agartala city (Tripura Capital, just 2km from Zero Point)',
    immigrationHours: '07:00 AM - 06:30 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax',
    directBusOperators: ['BRTC International Bus (Dhaka-Agartala)', 'Shyamoli NR Travels', 'Shohagh Paribahan'],
    hasRailway: true,
    railwayStation: 'Akhaura Railway Junction',
    lat: 23.8647,
    lng: 91.2483,
    transitAdvice: 'Direct BRTC International Bus departs Kamalapur/Arambagh to Agartala. Or take Intercity Train to Akhaura, then 10-min auto to Border.'
  },
  {
    id: 'border-banglabandha',
    name: 'Banglabandha Zero Point & Land Port (বাংলাবান্ধা জিরো পয়েন্ট)',
    name_bn: 'বাংলাবান্ধা স্থলবন্দর ও চতুর্দেশীয় ট্রানজিট',
    districtId: 'panchagarh',
    districtName: 'Panchagarh',
    upazilaName: 'Tetulia (তেঁতুলিয়া)',
    division: 'Rangpur',
    counterpartPort: 'Phulbari (ফুলবাড়ী), Jalpaiguri, West Bengal',
    counterpartState: 'West Bengal',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Northernmost Point of BD; Quad-country Transit to India (Siliguri 8km), Nepal (Kakarvitta 54km) & Bhutan',
    immigrationHours: '07:00 AM - 05:30 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax',
    directBusOperators: ['Nabil Paribahan (Sleeper AC)', 'Hanif Enterprise', 'Shyamoli Paribahan', 'SR Travels'],
    lat: 26.6534,
    lng: 88.3582,
    transitAdvice: 'Direct AC Sleeper buses from Dhaka directly reach Banglabandha Zero Point. Phulbari is only 8 km from Siliguri City and 54 km from Nepal border.'
  },
  {
    id: 'border-darshana',
    name: 'Darshana International Rail & Road Port (দর্শনা-গেদে)',
    name_bn: 'দর্শনা আন্তর্জাতিক রেলওয়ে ও রোড চেকপোস্ট',
    districtId: 'chuadanga',
    districtName: 'Chuadanga',
    upazilaName: 'Damurhuda (দামুড়হুদা)',
    division: 'Khulna',
    counterpartPort: 'Gede (গেদে), Nadia, West Bengal',
    counterpartState: 'West Bengal',
    counterpartCountry: 'India',
    portType: 'Rail & Road Port',
    popularFor: 'Maitree Express International Train (মৈত্রী এক্সপ্রেস) & Pedestrian/Road Immigration to Kolkata',
    immigrationHours: '06:30 AM - 06:00 PM (Daily)',
    travelTaxInfo: '৳1000 Land/Rail Travel Tax',
    directBusOperators: ['Royal Express', 'SB Super Deluxe', 'Chuadanga Deluxe', 'Purbasa Paribahan'],
    hasRailway: true,
    railwayStation: 'Darshana International Railway Junction (Maitree Express)',
    lat: 23.5303,
    lng: 88.6186,
    transitAdvice: 'Board Maitree Express from Dhaka Cantonment to Kolkata via Darshana/Gede. For road travelers, local auto connects Darshana to Gede Zero Point.'
  },
  {
    id: 'border-hili',
    name: 'Hili Land Port & Customs Checkpost (হিলি)',
    name_bn: 'হিলি স্থলবন্দর ও রেলওয়ে চেকপোস্ট',
    districtId: 'dinajpur',
    districtName: 'Dinajpur',
    upazilaName: 'Hakimpur (হাকিমপুর)',
    division: 'Rangpur',
    counterpartPort: 'Hili (হিলি), Dakshin Dinajpur, West Bengal',
    counterpartState: 'West Bengal',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Major North Bengal Trade and Passenger Immigration Checkpost with Railway boundary line',
    immigrationHours: '07:00 AM - 06:00 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax',
    directBusOperators: ['Hanif Enterprise', 'Shyamoli Paribahan', 'Nabil Paribahan', 'Keya Paribahan'],
    hasRailway: true,
    railwayStation: 'Hili Railway Station',
    lat: 25.2858,
    lng: 89.0069,
    transitAdvice: 'Direct AC/Non-AC buses from Dhaka (Gabtoli) to Hili Border. Railway line divides the two countries right at the station.'
  },
  {
    id: 'border-bhomra',
    name: 'Bhomra Land Port & Immigration (ভোমরা)',
    name_bn: 'ভোমরা স্থলবন্দর ও ইমিগ্রেশন চেকপোস্ট',
    districtId: 'satkhira',
    districtName: 'Satkhira',
    upazilaName: 'Satkhira Sadar (সাতক্ষীরা সদর)',
    division: 'Khulna',
    counterpartPort: 'Ghojadanga (ঘোজাডাঙ্গা), North 24 Parganas, West Bengal',
    counterpartState: 'West Bengal',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Fastest Highway Route from South Bengal/Padma Bridge to Kolkata (Barasat/Basirhat)',
    immigrationHours: '07:00 AM - 06:00 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax',
    directBusOperators: ['Green Line Paribahan', 'SP Golden Line', 'Hamdan Enterprise', 'Sakura Paribahan'],
    lat: 22.7094,
    lng: 88.9056,
    transitAdvice: 'Take direct AC coach from Dhaka via Padma Bridge & Khulna to Satkhira/Bhomra Border (approx 5 hours).'
  },
  {
    id: 'border-sonamasjid',
    name: 'Sonamasjid Land Port & Customs (সোনা মসজিদ)',
    name_bn: 'সোনা মসজিদ স্থলবন্দর ও ইমিগ্রেশন',
    districtId: 'chapainawabganj',
    districtName: 'Chapainawabganj',
    upazilaName: 'Shibganj (শিবগঞ্জ)',
    division: 'Rajshahi',
    counterpartPort: 'Mahadipur (মহদীপুর), Malda, West Bengal',
    counterpartState: 'West Bengal',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Historic gateway to Malda (মালদা), Gour (গৌড়) & Murshidabad (মুর্শিদাবাদ)',
    immigrationHours: '07:00 AM - 06:00 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax',
    directBusOperators: ['National Travels', 'Desh Travels', 'Hanif Enterprise', 'Grameen Travels'],
    lat: 24.8450,
    lng: 88.1340,
    transitAdvice: 'Direct AC/Non-AC buses from Dhaka (Kalyanpur) to Sonamasjid Border via Rajshahi.'
  },
  {
    id: 'border-chilahati',
    name: 'Chilahati International Rail Port (চিলাহাটি-হলদিবাড়ী)',
    name_bn: 'চিলাহাটি আন্তর্জাতিক রেল বন্দর ও মিতালী এক্সপ্রেস',
    districtId: 'nilphamari',
    districtName: 'Nilphamari',
    upazilaName: 'Domar (ডোমার)',
    division: 'Rangpur',
    counterpartPort: 'Haldibari (হলদিবাড়ী), Cooch Behar, West Bengal',
    counterpartState: 'West Bengal',
    counterpartCountry: 'India',
    portType: 'Rail & Road Port',
    popularFor: 'Mitali Express International Train (মিতালী এক্সপ্রেস) from Dhaka to New Jalpaiguri (NJP/Siliguri)',
    immigrationHours: 'Train Scheduled Operational Hours',
    travelTaxInfo: '৳1000 Rail/Land Travel Tax',
    directBusOperators: ['Nabil Paribahan', 'SR Travels', 'Hanif Enterprise'],
    hasRailway: true,
    railwayStation: 'Chilahati International Railway Station',
    lat: 26.3117,
    lng: 88.7906,
    transitAdvice: 'Board Mitali Express directly from Dhaka Cantonment to New Jalpaiguri via Chilahati/Haldibari.'
  },
  {
    id: 'border-bibirbazar',
    name: 'Bibirbazar Land Port (বিবিরবাজার)',
    name_bn: 'বিবিরবাজার স্থলবন্দর ও ইমিগ্রেশন',
    districtId: 'cumilla',
    districtName: 'Cumilla',
    upazilaName: 'Cumilla Adarsha Sadar (কুমিল্লা সদর)',
    division: 'Chattogram',
    counterpartPort: 'Srimantapur (শ্রীমন্তপুর), Sonamura, Tripura',
    counterpartState: 'Tripura',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Quick passenger gateway to South Tripura, Udaipur & Agartala',
    immigrationHours: '07:00 AM - 05:30 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax',
    directBusOperators: ['Asia Line (Dhaka-Cumilla)', 'Tisha Plus', 'Royal Coach'],
    lat: 23.4689,
    lng: 91.2289,
    transitAdvice: 'Take AC bus from Dhaka to Cumilla Sasongachha (2h), then local CNG auto-rickshaw to Bibirbazar Border (9 km, 20 mins).'
  },
  {
    id: 'border-nakugaon',
    name: 'Nakugaon Land Port (নাকুগাঁও)',
    name_bn: 'নাকুগাঁও স্থলবন্দর ও ইমিগ্রেশন চেকপোস্ট',
    districtId: 'sherpur',
    districtName: 'Sherpur',
    upazilaName: 'Nalitabari (নালিতাবাড়ী)',
    division: 'Mymensingh',
    counterpartPort: 'Dalu (ডালু), West Garo Hills, Meghalaya',
    counterpartState: 'Meghalaya',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Scenic Meghalaya border entry to Tura & West Garo Hills',
    immigrationHours: '07:30 AM - 05:00 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax',
    directBusOperators: ['Dreamland Special', 'Anik Paribahan', 'Sherpur Deluxe'],
    lat: 25.2150,
    lng: 90.2280,
    transitAdvice: 'Direct bus from Mohakhali to Nalitabari (Sherpur), then local auto-rickshaw to Nakugaon Zero Point (14 km).'
  },
  {
    id: 'border-gobrakura',
    name: 'Gobrakura & Koroitoli Land Port (গোবরাকুড়া ও কড়ইতলী)',
    name_bn: 'গোবরাকুড়া ও কড়ইতলী স্থলবন্দর',
    districtId: 'mymensingh',
    districtName: 'Mymensingh',
    upazilaName: 'Haluaghat (হালুয়াঘাট)',
    division: 'Mymensingh',
    counterpartPort: 'Gasuapara (গাসুয়াপাড়া), South Garo Hills, Meghalaya',
    counterpartState: 'Meghalaya',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Direct foothills route to South Garo Hills & Baghmara, Meghalaya',
    immigrationHours: '07:30 AM - 05:00 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax',
    directBusOperators: ['Imam Paribahan', 'Shamoli Mymensingh Service', 'Haluaghat Express'],
    lat: 25.1620,
    lng: 90.3540,
    transitAdvice: 'Direct bus from Dhaka Mohakhali to Haluaghat Sadar (4h), then CNG to Gobrakura/Koroitoli Border (6 km).'
  },
  {
    id: 'border-sheola',
    name: 'Sheola Land Port (শেওলা)',
    name_bn: 'শেওলা স্থলবন্দর ও সুতারকান্দি ইমিগ্রেশন',
    districtId: 'sylhet',
    districtName: 'Sylhet',
    upazilaName: 'Beanibazar (বিয়ানীবাজার)',
    division: 'Sylhet',
    counterpartPort: 'Sutarkandi (সুতারকান্দি), Karimganj, Assam',
    counterpartState: 'Assam',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Direct passenger & trade route to Karimganj (করিমগঞ্জ), Silchar (শিলচর) & Barak Valley, Assam',
    immigrationHours: '07:00 AM - 06:00 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax',
    directBusOperators: ['Ena Transport', 'Green Line (Dhaka-Sylhet)', 'Shyamoli Paribahan'],
    lat: 24.8778,
    lng: 92.1764,
    transitAdvice: 'Take bus/train to Sylhet, then local bus/microbus to Beanibazar/Sheola Land Port (44 km).'
  },
  {
    id: 'border-belonia',
    name: 'Belonia Land Port (বিলোনিয়া)',
    name_bn: 'বিলোনিয়া স্থলবন্দর ও চেকপোস্ট',
    districtId: 'feni',
    districtName: 'Feni',
    upazilaName: 'Parshuram (পরশুরাম)',
    division: 'Chattogram',
    counterpartPort: 'Belonia (বিলোনিয়া), South Tripura',
    counterpartState: 'Tripura',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Southern Tripura border checkpost connecting Feni/Chattogram region',
    immigrationHours: '07:00 AM - 05:30 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax',
    directBusOperators: ['Star Line Special', 'Ena Transport', 'Chowdhury Paribahan'],
    lat: 23.1417,
    lng: 91.4611,
    transitAdvice: 'Direct AC bus or Intercity train from Dhaka/Chattogram to Feni, then local CNG/Microbus to Parshuram/Belonia (25 km).'
  },
  {
    id: 'border-ramgarh',
    name: 'Ramgarh Land Port & Maitri Setu (রামগড় মৈত্রী সেতু)',
    name_bn: 'রামগড় স্থলবন্দর ও ফেনী নদী মৈত্রী সেতু',
    districtId: 'khagrachhari',
    districtName: 'Khagrachhari',
    upazilaName: 'Ramgarh (রামগড়)',
    division: 'Chattogram',
    counterpartPort: 'Sabroom (সাবরুম), South Tripura (Connected via Feni River Maitri Bridge)',
    counterpartState: 'Tripura',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Modern Feni River Maitri Setu linking Chattogram Port Corridor with North-East India Railway',
    immigrationHours: '07:00 AM - 05:30 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax',
    directBusOperators: ['Shanti Paribahan', 'Saintmartin Paribahan', 'S. Alam Service'],
    lat: 22.9819,
    lng: 91.7039,
    transitAdvice: 'Direct AC/Non-AC buses from Dhaka/Chattogram to Ramgarh Border Zero Point.'
  },
  {
    id: 'border-teknaf',
    name: 'Teknaf Land & River Port (টেকনাফ নৌ ও স্থলবন্দর)',
    name_bn: 'টেকনাফ স্থল ও নৌ বন্দর ইমিগ্রেশন',
    districtId: 'coxs-bazar',
    districtName: "Cox's Bazar",
    upazilaName: 'Teknaf (টেকনাফ)',
    division: 'Chattogram',
    counterpartPort: 'Maungdaw (মংডু), Rakhine State, Myanmar (across Naf River)',
    counterpartState: 'Rakhine',
    counterpartCountry: 'Myanmar',
    portType: 'River Port',
    popularFor: 'Only recognized border customs and waterway passenger port between Bangladesh & Myanmar',
    immigrationHours: '08:00 AM - 05:00 PM (Subject to border border security protocols)',
    travelTaxInfo: '৳1000 Travel Tax',
    directBusOperators: ['Saintmartin Travels', 'Green Line', 'Desh Travels', 'Hanif Enterprise'],
    lat: 20.8667,
    lng: 92.2986,
    transitAdvice: 'Direct AC Sleeper buses from Dhaka via Marine Drive / Highway reach Teknaf Land Port terminal.'
  },
  {
    id: 'border-biral',
    name: 'Biral International Rail Port (বিরল-রাধিকাপুর)',
    name_bn: 'বিরল আন্তর্জাতিক রেলওয়ে বন্দর',
    districtId: 'dinajpur',
    districtName: 'Dinajpur',
    upazilaName: 'Biral (বিরল)',
    division: 'Rangpur',
    counterpartPort: 'Radhikapur (রাধিকাপুর), Uttar Dinajpur, West Bengal',
    counterpartState: 'West Bengal',
    counterpartCountry: 'India',
    portType: 'Rail & Road Port',
    popularFor: 'Broad-Gauge Cross-Border Freight & Transit Railway line connecting North Bengal',
    immigrationHours: 'Rail Scheduled Hours',
    travelTaxInfo: '৳1000 Travel Tax',
    directBusOperators: ['Nabil Paribahan', 'Hanif Enterprise', 'SR Travels'],
    hasRailway: true,
    railwayStation: 'Biral Railway Junction',
    lat: 25.6267,
    lng: 88.5367,
    transitAdvice: 'Reach Dinajpur Sadar by Intercity Train (Drutojan/Ekota) then 15-min auto to Biral Station.'
  },
  {
    id: 'border-kamalpur',
    name: 'Dhanua Kamalpur Land Port (ধানুয়া কামালপুর)',
    name_bn: 'ধানুয়া কামালপুর স্থলবন্দর ও চেকপোস্ট',
    districtId: 'jamalpur',
    districtName: 'Jamalpur',
    upazilaName: 'Bakshiganj (বকশীগঞ্জ)',
    division: 'Mymensingh',
    counterpartPort: 'Mahendraganj (মহেন্দ্রগঞ্জ), South West Garo Hills, Meghalaya',
    counterpartState: 'Meghalaya',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Border post to Meghalaya Hills and historic Liberation War sector',
    immigrationHours: '07:30 AM - 05:00 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax',
    directBusOperators: ['Rajiv Paribahan', 'Jamalpur Express', 'Bakshiganj Deluxe'],
    lat: 25.2010,
    lng: 89.8720,
    transitAdvice: 'Direct buses from Dhaka (Mohakhali) to Bakshiganj/Dhanua Kamalpur Border.'
  },
  {
    id: 'border-sonahat',
    name: 'Sonahat Land Port (সোনাহাট)',
    name_bn: 'সোনাহাট স্থলবন্দর ও চেকপোস্ট',
    districtId: 'kurigram',
    districtName: 'Kurigram',
    upazilaName: 'Bhurungamari (ভুরুঙ্গামারী)',
    division: 'Rangpur',
    counterpartPort: 'Golakganj (গোলকগঞ্জ), Dhubri, Assam',
    counterpartState: 'Assam',
    counterpartCountry: 'India',
    portType: 'Land Customs & Immigration (Road)',
    popularFor: 'Northern Assam & Lower Brahmaputra border gateway',
    immigrationHours: '07:30 AM - 05:00 PM (Daily)',
    travelTaxInfo: '৳1000 Land Travel Tax',
    directBusOperators: ['Nabil Paribahan', 'Hanif Enterprise', 'Kurigram Express'],
    lat: 26.0667,
    lng: 89.8000,
    transitAdvice: 'Direct bus from Dhaka to Bhurungamari/Sonahat or Kurigram Express Train to Kurigram Sadar.'
  }
];

// ----------------------------------------------------------------------------
// COMPREHENSIVE SEARCHABLE LOCATIONS DATABASE (64 Districts + 495+ Upazilas + 20 Border Ports + Tourist Hubs)
// ----------------------------------------------------------------------------
export const ALL_SEARCHABLE_LOCATIONS: SearchableLocation[] = [
  // 1. All 20 International Border & Immigration Checkposts
  ...BANGLADESH_BORDER_CHECKPOSTS.map((bp): SearchableLocation => ({
    id: bp.id,
    name: bp.name,
    name_bn: bp.name_bn,
    division: bp.division,
    districtId: bp.districtId,
    districtName: bp.districtName,
    type: 'border_checkpost',
    popular_tag: `🛂 Immigration Checkpost ➔ ${bp.counterpartPort}`,
    lat: bp.lat,
    lng: bp.lng,
    hasRailway: bp.hasRailway,
    railwayStation: bp.railwayStation,
    isBorderPort: true,
    counterpartPort: bp.counterpartPort,
    counterpartCountry: bp.counterpartCountry,
    immigrationHours: bp.immigrationHours,
    transitTip: `${bp.transitAdvice} | Operating Hours: ${bp.immigrationHours} | Travel Tax: ${bp.travelTaxInfo}.`
  })),

  // 2. Major Tourist Spots & Sub-Destinations
  {
    id: 'sajek-valley',
    name: 'Sajek Valley',
    name_bn: 'সাজেক ভ্যালি',
    division: 'Chattogram',
    districtId: 'rangamati',
    districtName: 'Rangamati (Sajek)',
    type: 'tourist_spot',
    popular_tag: 'Valley of Clouds & Mountains',
    lat: 23.3820,
    lng: 92.2938,
    transitTip: 'Reach Khagrachhari/Dighinala by AC Bus, then take 4x4 Chander Gari with Army Escort (10:30 AM & 03:00 PM).'
  },
  {
    id: 'saint-martin',
    name: "Saint Martin's Island",
    name_bn: 'সেন্ট মার্টিন দ্বীপ',
    division: 'Chattogram',
    districtId: 'coxs-bazar',
    districtName: "Cox's Bazar",
    type: 'tourist_spot',
    popular_tag: 'Coral Island & Blue Waters',
    lat: 20.6273,
    lng: 92.3225,
    hasLaunchGhat: true,
    launchGhatName: 'Teknaf / Inani Ship Jetty',
    transitTip: 'Take Ship (Bay One / Karnafuly / MV Keari) from Teknaf or Cox’s Bazar to Saint Martin (approx 2h 30m).'
  },
  {
    id: 'kuakata-beach',
    name: 'Kuakata (Sea Beach)',
    name_bn: 'কুয়াকাটা সমুদ্র সৈকত',
    division: 'Barishal',
    districtId: 'patuakhali',
    districtName: 'Patuakhali (Kuakata)',
    type: 'tourist_spot',
    popular_tag: 'Sunrise & Sunset Beach',
    lat: 21.8167,
    lng: 90.1167,
    hasLaunchGhat: true,
    launchGhatName: 'Dhaka to Patuakhali Launch Ghat',
    transitTip: 'Direct AC Bus via Padma & Payra Bridge or Overnight Luxury Launch from Sadarghat to Patuakhali.'
  },
  {
    id: 'sreemangal',
    name: 'Sreemangal (Tea Capital)',
    name_bn: 'শ্রীমঙ্গল (চা রাজধানী)',
    division: 'Sylhet',
    districtId: 'moulvibazar',
    districtName: 'Moulvibazar (Sreemangal)',
    type: 'tourist_spot',
    popular_tag: 'Rolling Tea Gardens & Rainforest',
    lat: 24.3065,
    lng: 91.7296,
    hasRailway: true,
    railwayStation: 'Sreemangal Railway Junction',
    transitTip: 'Direct Intercity Trains (Parabat/Kalni/Upaban) stop at Sreemangal Station, or direct AC Bus.'
  },
  {
    id: 'jaflong-ratargul',
    name: 'Jaflong & Ratargul',
    name_bn: 'জাফলং ও রাতারগুল',
    division: 'Sylhet',
    districtId: 'sylhet',
    districtName: 'Sylhet',
    type: 'tourist_spot',
    popular_tag: 'Pristine River & Swamp Forest',
    lat: 25.1634,
    lng: 92.0175,
    transitTip: 'From Sylhet city, hire local Microbus, Sedan or CNG auto-rickshaw (1.5 - 2 hours drive).'
  },
  {
    id: 'tanguar-haor',
    name: 'Tanguar Haor & Shimul Bagan',
    name_bn: 'টাঙ্গুয়ার হাওর ও শিমুল বাগান',
    division: 'Sylhet',
    districtId: 'sunamganj',
    districtName: 'Sunamganj (Tanguar Haor)',
    type: 'tourist_spot',
    popular_tag: 'Luxury Houseboat Wetlands',
    lat: 25.1278,
    lng: 91.0744,
    transitTip: 'Bus from Dhaka to Sunamganj (Sadar), then Bike/CNG to Tahirpur Ghat for Houseboat boarding.'
  },
  {
    id: 'sundarbans-mangrove',
    name: 'Sundarbans (Kotka & Hiron Point)',
    name_bn: 'সুন্দরবন ম্যানগ্রোভ বন',
    division: 'Khulna',
    districtId: 'khulna',
    districtName: 'Khulna (Sundarbans)',
    type: 'tourist_spot',
    popular_tag: 'World Heritage Mangrove Forest',
    lat: 21.9497,
    lng: 89.5403,
    hasLaunchGhat: true,
    launchGhatName: 'Mongla Port Cruise Jetty',
    transitTip: 'Travel to Khulna/Mongla Port by Train/AC Bus, then board 3-Day Forest Cruise Ship.'
  },
  {
    id: 'birishiri-ceramic-lake',
    name: 'Birishiri & Durgapur',
    name_bn: 'বিরিশিরি ও দুর্গাপুর',
    division: 'Mymensingh',
    districtId: 'netrokona',
    districtName: 'Netrokona (Birishiri)',
    type: 'tourist_spot',
    popular_tag: 'Ceramic Blue Lake & Someshwari River',
    lat: 25.1167,
    lng: 90.6833,
    transitTip: 'Bus from Dhaka (Mohakhali) to Birishiri/Durgapur or Train to Shyamganj + Auto-rickshaw.'
  },
  {
    id: 'nilgiri-bandarban',
    name: 'Nilgiri & Nafakhum (Bandarban)',
    name_bn: 'নীলগিরি ও নাফাকুম (বান্দরবান)',
    division: 'Chattogram',
    districtId: 'bandarban',
    districtName: 'Bandarban',
    type: 'tourist_spot',
    popular_tag: 'High Mountain Peaks & Waterfalls',
    lat: 22.0232,
    lng: 92.3364,
    transitTip: 'AC Bus from Dhaka/Chattogram to Bandarban Sadar, then hire 4x4 Chander Gari for mountain trails.'
  },
  {
    id: 'tetulia-panchagarh',
    name: 'Tetulia (Kanchenjunga View)',
    name_bn: 'তেঁতুলিয়া (কাঞ্চনজঙ্ঘা ভিউ)',
    division: 'Rangpur',
    districtId: 'panchagarh',
    districtName: 'Panchagarh (Tetulia)',
    type: 'tourist_spot',
    popular_tag: 'Himalayan Mountain Views & Tea',
    lat: 26.4950,
    lng: 88.3420,
    hasRailway: true,
    railwayStation: 'Panchagarh (Bir Muktijoddha Sirajul Islam) Station',
    transitTip: 'Direct Ekota/Drutojan/Panchagarh Express Train to Panchagarh, then local bus to Tetulia Dakbangla.'
  },

  // 3. All 64 Districts
  ...INITIAL_DISTRICTS.map((d): SearchableLocation => {
    const isDhaka = d.id === 'dhaka';
    const isChattogram = d.id === 'chattogram';
    const isCox = d.id === 'coxs-bazar';
    const isSylhet = d.id === 'sylhet';
    const isRajshahi = d.id === 'rajshahi';
    const isKhulna = d.id === 'khulna';
    const isSaidpur = d.id === 'nilphamari' || d.id === 'rangpur';
    const isJashore = d.id === 'jashore';
    const isBarishal = d.id === 'barishal';

    const hasAirport = isDhaka || isChattogram || isCox || isSylhet || isRajshahi || isSaidpur || isJashore || isBarishal;
    const airportCode = isDhaka ? 'DAC' : isChattogram ? 'CGP' : isCox ? 'CXB' : isSylhet ? 'ZYL' : isRajshahi ? 'RJH' : isSaidpur ? 'SPD' : isJashore ? 'JSR' : isBarishal ? 'BZL' : undefined;

    const railwayDistricts = [
      'dhaka', 'gazipur', 'narayanganj', 'tangail', 'kishoreganj', 'faridpur', 'rajbari',
      'chattogram', 'coxs-bazar', 'cumilla', 'feni', 'brahmanbaria', 'chandpur',
      'sylhet', 'moulvibazar', 'habiganj', 'sunamganj',
      'rajshahi', 'bogura', 'naogaon', 'natore', 'chapainawabganj', 'pabna', 'sirajganj', 'joypurhat',
      'khulna', 'jashore', 'kushtia', 'chuadanga', 'jhenaidah',
      'rangpur', 'dinajpur', 'panchagarh', 'nilphamari', 'lalmonirhat', 'kurigram', 'gaibandha', 'thakurgaon',
      'mymensingh', 'netrokona', 'jamalpur'
    ];

    const hasRailway = railwayDistricts.includes(d.id);
    const railwayStation = hasRailway ? `${d.name} Railway Station` : undefined;

    const launchDistricts = ['dhaka', 'barishal', 'bhola', 'patuakhali', 'jhalokathi', 'pirojpur', 'barguna', 'chandpur', 'shariatpur', 'khulna'];
    const hasLaunchGhat = launchDistricts.includes(d.id);
    const launchGhatName = hasLaunchGhat ? `${d.name} River Port / Launch Ghat` : undefined;

    return {
      id: d.id,
      name: d.name,
      name_bn: d.name_bn,
      division: d.division,
      districtId: d.id,
      districtName: d.name,
      type: 'district',
      lat: d.lat,
      lng: d.lng,
      hasRailway,
      railwayStation,
      hasAirport,
      airportCode,
      hasLaunchGhat,
      launchGhatName,
      transitTip: `Regular direct AC & Non-AC luxury coaches, train networks, and rental microbuses connect ${d.name} Sadar.`
    };
  }),

  // 4. All 495+ Upazilas (Upzillas) across 64 Districts
  ...BANGLADESH_UPAZILAS.map((u): SearchableLocation => ({
    id: `upz-${u.id}`,
    name: `${u.name} (${u.districtName})`,
    name_bn: `${u.name_bn} (${u.districtName})`,
    division: u.division,
    districtId: u.districtId,
    districtName: u.districtName,
    type: 'upazila',
    popular_tag: u.popular_tag || `Upazila in ${u.districtName} District`,
    lat: u.lat,
    lng: u.lng,
    hasRailway: u.hasRailway,
    railwayStation: u.hasRailway ? `${u.name.split('(')[0].trim()} Railway Station` : undefined,
    hasLaunchGhat: u.hasLaunchGhat,
    launchGhatName: u.hasLaunchGhat ? `${u.name.split('(')[0].trim()} Launch Ghat` : undefined,
    transitTip: `Connected via ${u.transitHubType || 'Local Bus & Regional Counter'}. Regular direct/feeder transports connect ${u.name.split('(')[0].trim()} to ${u.districtName} Sadar and inter-district highways.`
  }))
];

// ----------------------------------------------------------------------------
// POPULAR TRAVEL ROUTE SHORTCUTS (INCLUDING BORDER IMMIGRATION CORRIDORS)
// ----------------------------------------------------------------------------
export const POPULAR_ROUTE_SHORTCUTS = [
  { from: 'Dhaka', to: 'Benapole Land Port & Immigration (বেনাপোল)', label: 'Dhaka ➔ Benapole (Kolkata Port)', badge: 'Kolkata 🇮🇳' },
  { from: 'Dhaka', to: 'Burimari Land Port & Immigration (বুড়িমারী)', label: 'Dhaka ➔ Burimari (Siliguri/Sikkim)', badge: 'Darjeeling 🇮🇳' },
  { from: 'Dhaka', to: 'Tamabil Land Port & Dawki Immigration (তামাবিল-ডাউকি)', label: 'Dhaka ➔ Tamabil (Shillong Port)', badge: 'Meghalaya 🇮🇳' },
  { from: 'Dhaka', to: 'Akhaura Land Port & Agartala Immigration (আখাউড়া-আগরতলা)', label: 'Dhaka ➔ Akhaura (Agartala)', badge: 'Tripura 🇮🇳' },
  { from: 'Dhaka', to: 'Banglabandha Zero Point & Land Port (বাংলাবান্ধা জিরো পয়েন্ট)', label: 'Dhaka ➔ Banglabandha (Nepal/Bhutan)', badge: 'Nepal / Bhutan 🇳🇵' },
  { from: 'Dhaka', to: 'Darshana International Rail & Road Port (দর্শনা-গেদে)', label: 'Dhaka ➔ Darshana (Maitree Train)', badge: 'Maitree Rail 🚆' },
  { from: 'Dhaka', to: "Cox's Bazar", label: "Dhaka ➔ Cox's Bazar", badge: 'Beach Hub' },
  { from: 'Dhaka', to: 'Sajek Valley', label: 'Dhaka ➔ Sajek Valley', badge: 'Cloud Valley' },
  { from: 'Dhaka', to: 'Sylhet', label: 'Dhaka ➔ Sylhet', badge: 'Tea & Hills' },
  { from: 'Dhaka', to: 'Bhomra Land Port & Immigration (ভোমরা)', label: 'Dhaka ➔ Bhomra (Padma Bridge)', badge: 'Kolkata Direct 🇮🇳' },
  { from: 'Dhaka', to: 'Ramgarh Land Port & Maitri Setu (রামগড় মৈত্রী সেতু)', label: 'Dhaka ➔ Ramgarh (Maitri Bridge)', badge: 'Tripura Corridor 🇮🇳' },
  { from: 'Dhaka', to: 'Teknaf Land & River Port (টেকনাফ নৌ ও স্থলবন্দর)', label: 'Dhaka ➔ Teknaf (Myanmar Port)', badge: 'Myanmar 🇲🇲' },
  { from: 'Dhaka', to: 'Tahirpur (Tanguar Haor / Shimul Bagan) (Sunamganj)', label: 'Dhaka ➔ Tahirpur', badge: 'Houseboat' },
  { from: 'Dhaka', to: 'Kuakata (Sea Beach)', label: 'Dhaka ➔ Kuakata', badge: 'Sunrise Beach' },
  { from: 'Rajshahi', to: 'Sonamasjid Land Port & Customs (সোনা মসজিদ)', label: 'Rajshahi ➔ Sonamasjid (Malda)', badge: 'Malda Port 🇮🇳' },
];

export function calculateHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function estimateRoadDistanceKm(loc1: SearchableLocation, loc2: SearchableLocation): number {
  if (loc1.id === loc2.id) return 15;
  const straightKm = calculateHaversineKm(loc1.lat, loc1.lng, loc2.lat, loc2.lng);
  return Math.max(30, Math.round(straightKm * 1.28));
}

export function formatDuration(roadKm: number, type: TransportType): string {
  switch (type) {
    case 'Flight':
      return '45m - 55m';
    case 'Train': {
      const hours = (roadKm / 55) + 0.5;
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60 / 10) * 10;
      return `${Math.max(1, h)}h ${m > 0 ? `${m}m` : '00m'}`;
    }
    case 'Launch': {
      const hours = (roadKm / 35) + 1.5;
      const h = Math.floor(hours);
      return `${Math.max(4, h)}h 00m (Overnight Cruise)`;
    }
    case 'Car': {
      const hours = roadKm / 50;
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60 / 10) * 10;
      return `${Math.max(1, h)}h ${m > 0 ? `${m}m` : '00m'}`;
    }
    case 'Bus':
    default: {
      const hours = (roadKm / 42) + 0.5;
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60 / 10) * 10;
      return `${Math.max(1, h)}h ${m > 0 ? `${m}m` : '00m'}`;
    }
  }
}

// ----------------------------------------------------------------------------
// UNIVERSAL SMART ROUTE GENERATOR (ALL 64 DISTRICTS + 495+ UPAZILAS + 20 BORDER PORTS)
// ----------------------------------------------------------------------------
export interface RouteCalculationResult {
  fromLocation: SearchableLocation;
  toLocation: SearchableLocation;
  distanceKm: number;
  fastestMode: string;
  cheapestFare: number;
  routes: TransportRoute[];
  transitTip: string;
  isBorderRoute?: boolean;
  borderInfo?: BorderCheckpostInfo;
}

export function generateRoutesBetween(
  fromPlace: SearchableLocation,
  toPlace: SearchableLocation,
  staticRoutes: TransportRoute[] = []
): RouteCalculationResult {
  const roadKm = estimateRoadDistanceKm(fromPlace, toPlace);
  const isBorderRoute = Boolean(fromPlace.isBorderPort || toPlace.isBorderPort);
  const borderPortLocation = fromPlace.isBorderPort ? fromPlace : (toPlace.isBorderPort ? toPlace : null);
  const borderInfo = borderPortLocation 
    ? BANGLADESH_BORDER_CHECKPOSTS.find(b => b.id === borderPortLocation.id) 
    : undefined;

  const generatedRoutes: TransportRoute[] = [];

  // =========================================================================
  // 1. PREMIUM / INTERNATIONAL AC BUS (Special Cross-Border Coaches if Border Port)
  // =========================================================================
  const busAcMin = Math.round(Math.max(350, roadKm * 2.6));
  const busAcMax = Math.round(Math.max(600, roadKm * 3.8));
  const busDuration = formatDuration(roadKm, 'Bus');

  let primaryBusOperator = 'Green Line Paribahan (Scania Multi-Axle)';
  let boardingPointsList = [`${fromPlace.name.split('(')[0].trim()} Central Bus Terminal`, 'Sayedabad / Gabtoli / Arambagh (Main Counters)'];
  let droppingPointsList = [`${toPlace.name.split('(')[0].trim()} Main Terminal / Stand`];

  if (isBorderRoute && borderInfo) {
    primaryBusOperator = borderInfo.directBusOperators[0] || 'Green Line International Cross-Border Service';
    boardingPointsList = [
      `${fromPlace.name.split('(')[0].trim()} International Counter (Arambagh / Kalyanpur / Sayedabad)`,
      'Uttara / Airport Road Counter',
      'Dhaka Central Bus Terminal'
    ];
    droppingPointsList = [
      `${borderInfo.name} Zero Point Customs Terminal`,
      'Sonali Bank Travel Tax Booth',
      'Immigration Passenger Lounge'
    ];
  } else if (toPlace.division === 'Sylhet' || toPlace.division === 'Chattogram') {
    primaryBusOperator = 'Green Line (Sleeper Coach) / Desh Travels';
  } else if (toPlace.division === 'Barishal' || toPlace.division === 'Khulna') {
    primaryBusOperator = 'Shohagh Elite / Sakura Paribahan (Padma Bridge Route)';
  } else {
    primaryBusOperator = 'Nabil Paribahan / SR Travels / Hanif Enterprise';
  }

  generatedRoutes.push({
    id: `bus-ac-${fromPlace.id}-${toPlace.id}`,
    transport_type: 'Bus',
    company: primaryBusOperator,
    from_district: fromPlace.name,
    to_district: toPlace.name,
    departure_time: isBorderRoute ? '06:00 AM / 08:30 AM / 10:30 PM (Border Schedule)' : '07:30 AM / 02:30 PM / 10:30 PM (Daily)',
    arrival_time: 'Multiple daily express slots',
    duration: busDuration,
    price_min: busAcMin,
    price_max: busAcMax,
    boarding_points: boardingPointsList,
    dropping_points: droppingPointsList,
    schedule_days: 'Daily Regular Service (Direct to Immigration Checkpost)',
    contact_phone: '+880 1711-830000 / +880 1913-999888',
    is_active: true
  });

  // If Border Port, add secondary authorized International Transit Operators (e.g. BRTC International / Shyamoli)
  if (isBorderRoute && borderInfo && borderInfo.directBusOperators.length > 1) {
    generatedRoutes.push({
      id: `bus-international-${fromPlace.id}-${toPlace.id}`,
      transport_type: 'Bus',
      company: borderInfo.directBusOperators[1] || 'BRTC International Direct Coach',
      from_district: fromPlace.name,
      to_district: toPlace.name,
      departure_time: '07:00 AM & 09:30 PM (Direct Immigration Slot)',
      arrival_time: 'Direct drop at Land Port Customs',
      duration: busDuration,
      price_min: Math.round(busAcMin * 1.1),
      price_max: Math.round(busAcMax * 1.15),
      boarding_points: [
        'BRTC International Bus Terminal (Kamalapur)',
        'Shyamoli NR Travels International Counter (Arambagh)',
        'Kalyanpur International Lounge'
      ],
      dropping_points: [
        `${borderInfo.name} Immigration Lounge`,
        `Passage to ${borderInfo.counterpartPort}`
      ],
      schedule_days: 'Daily International Transit (India/Myanmar Endorsement)',
      contact_phone: '+880 1819-223344 (BRTC International)',
      is_active: true
    });
  }

  // 2. ECONOMY NON-AC COACH
  const busNonAcMin = Math.round(Math.max(200, roadKm * 1.55));
  const busNonAcMax = Math.round(Math.max(350, roadKm * 2.1));
  generatedRoutes.push({
    id: `bus-nonac-${fromPlace.id}-${toPlace.id}`,
    transport_type: 'Bus',
    company: `Hanif / Shyamoli / ${fromPlace.division} Express (Economy)`,
    from_district: fromPlace.name,
    to_district: toPlace.name,
    departure_time: '06:00 AM - 11:30 PM (Every 30 Mins)',
    arrival_time: 'Continuous service',
    duration: busDuration,
    price_min: busNonAcMin,
    price_max: busNonAcMax,
    boarding_points: [`${fromPlace.name.split('(')[0].trim()} Highway Counter`, 'District Inter-Bus Stand'],
    dropping_points: [`${toPlace.name.split('(')[0].trim()} Central Bus Stand`],
    schedule_days: 'Daily regular departures',
    contact_phone: '+880 1819-223344',
    is_active: true
  });

  // =========================================================================
  // 3. BANGLADESH RAILWAY (TRAIN) & INTERNATIONAL TRAINS (Maitree / Mitali / Bandhan)
  // =========================================================================
  const canTakeTrain = (fromPlace.hasRailway || fromPlace.districtId === 'dhaka') && (toPlace.hasRailway || toPlace.districtId === 'dhaka');
  if (canTakeTrain) {
    const trainMin = Math.round(Math.max(180, roadKm * 1.2));
    const trainMax = Math.round(Math.max(450, roadKm * 3.1));
    const trainDuration = formatDuration(roadKm, 'Train');

    let trainName = 'Bangladesh Railway Intercity Express';
    if (fromPlace.id.includes('darshana') || toPlace.id.includes('darshana')) {
      trainName = 'Maitree Express (মৈত্রী এক্সপ্রেস - ঢাকা ➔ কলকাতা via দর্শনা/গেদে)';
    } else if (fromPlace.id.includes('chilahati') || toPlace.id.includes('chilahati')) {
      trainName = 'Mitali Express (মিতালী এক্সপ্রেস - ঢাকা ➔ শিলিগুড়ি/NJP via চিলাহাটি)';
    } else if (fromPlace.id.includes('benapole') || toPlace.id.includes('benapole')) {
      trainName = 'Benapole Express / Bandhan Express (বন্ধন এক্সপ্রেস - বেনাপোল)';
    } else if (toPlace.name.toLowerCase().includes('sylhet') || toPlace.name.toLowerCase().includes('sreemangal')) {
      trainName = 'Parabat / Kalni / Upaban Express (Intercity)';
    } else if (toPlace.name.toLowerCase().includes('cox') || toPlace.name.toLowerCase().includes('chattogram')) {
      trainName = "Cox's Bazar Express / Suborno Express (Luxury Fast Train)";
    } else if (toPlace.name.toLowerCase().includes('rajshahi')) {
      trainName = 'Silk City / Padma / Dhumketu Express';
    } else if (toPlace.name.toLowerCase().includes('khulna')) {
      trainName = 'Sundarban / Chitra Express';
    } else if (toPlace.division === 'Rangpur') {
      trainName = 'Drutojan / Ekota / Kurigram Express';
    } else if (toPlace.division === 'Mymensingh') {
      trainName = 'Brahmaputra / Mohanganj Express';
    }

    generatedRoutes.push({
      id: `train-${fromPlace.id}-${toPlace.id}`,
      transport_type: 'Train',
      company: trainName,
      from_district: fromPlace.name,
      to_district: toPlace.name,
      departure_time: '06:40 AM (Morning) / 03:00 PM (Afternoon) / 10:30 PM (Night)',
      arrival_time: 'Fixed Railway Schedule',
      duration: trainDuration,
      price_min: trainMin,
      price_max: trainMax,
      boarding_points: [fromPlace.railwayStation || `${fromPlace.name.split('(')[0].trim()} Junction`, 'Kamalapur / Dhaka Cantonment'],
      dropping_points: [toPlace.railwayStation || `${toPlace.name.split('(')[0].trim()} Junction`],
      schedule_days: 'Daily (Check weekly off day via Railway e-ticket app)',
      contact_phone: '131 (Bangladesh Railway Helpline)',
      is_active: true
    });
  }

  // =========================================================================
  // 4. DOMESTIC FLIGHTS
  // =========================================================================
  const flightAirports = ['dhaka', 'chattogram', 'coxs-bazar', 'sylhet', 'rajshahi', 'nilphamari', 'rangpur', 'jashore', 'barishal', 'khulna'];
  const hasFlightRoute = (fromPlace.hasAirport || flightAirports.includes(fromPlace.districtId)) &&
                         (toPlace.hasAirport || flightAirports.includes(toPlace.districtId)) &&
                         roadKm >= 180;

  if (hasFlightRoute) {
    generatedRoutes.push({
      id: `flight-${fromPlace.id}-${toPlace.id}`,
      transport_type: 'Flight',
      company: 'Biman Bangladesh Airlines / US-Bangla Airlines / Air Astra',
      from_district: fromPlace.name,
      to_district: toPlace.name,
      departure_time: 'Multiple daily flight departures (Morning, Noon & Evening)',
      arrival_time: 'Check-in 1 hour prior to departure',
      duration: '45m - 55m flight time',
      price_min: 3800,
      price_max: 7500,
      boarding_points: [fromPlace.airportCode ? `${fromPlace.airportCode} Domestic Airport` : 'Hazrat Shahjalal International Airport (DAC)'],
      dropping_points: [toPlace.airportCode ? `${toPlace.airportCode} Domestic Airport` : 'Nearest Regional Domestic Airport'],
      schedule_days: 'Daily 6-12 flights available',
      contact_phone: '13636 (Biman) / 13605 (US-Bangla)',
      is_active: true
    });
  }

  // =========================================================================
  // 5. WATERWAY / LUXURY OVERNIGHT LAUNCH
  // =========================================================================
  const launchDistricts = ['dhaka', 'barishal', 'bhola', 'patuakhali', 'jhalokathi', 'pirojpur', 'barguna', 'chandpur', 'shariatpur', 'khulna'];
  const hasLaunchRoute = (fromPlace.hasLaunchGhat || launchDistricts.includes(fromPlace.districtId)) &&
                         (toPlace.hasLaunchGhat || launchDistricts.includes(toPlace.districtId));

  if (hasLaunchRoute) {
    generatedRoutes.push({
      id: `launch-${fromPlace.id}-${toPlace.id}`,
      transport_type: 'Launch',
      company: 'MV Manami / MV Kuakata / Adventure 9 (Triple-Deck Luxury Cruise)',
      from_district: fromPlace.name,
      to_district: toPlace.name,
      departure_time: '08:30 PM & 09:30 PM (Overnight Sailing)',
      arrival_time: '05:30 AM (Next Morning)',
      duration: formatDuration(roadKm, 'Launch'),
      price_min: 450,
      price_max: 4200,
      boarding_points: [fromPlace.launchGhatName || 'Dhaka Sadarghat Launch Terminal'],
      dropping_points: [toPlace.launchGhatName || `${toPlace.name.split('(')[0].trim()} River Port Pier`],
      schedule_days: 'Daily overnight luxury service',
      contact_phone: '+880 1711-223388 (Launch Booking)',
      is_active: true
    });
  }

  // =========================================================================
  // 6. PRIVATE CAR / MICROBUS CHAUFFEUR
  // =========================================================================
  const isHilly = toPlace.division === 'Chattogram' && (toPlace.id.includes('sajek') || toPlace.id.includes('bandarban'));
  const carType = isHilly ? 'Chander Gari / 4x4 Bolero' : (roadKm > 200 ? 'Toyota Noah / HiAce (AC Microbus)' : 'Toyota Sedan (Premio/Axio)');
  const carRateMin = isHilly ? 7500 : Math.round(Math.max(3500, roadKm * 18));
  const carRateMax = isHilly ? 14000 : Math.round(Math.max(5500, roadKm * 28));

  generatedRoutes.push({
    id: `car-${fromPlace.id}-${toPlace.id}`,
    transport_type: 'Car',
    company: `YEANA Verified Private Charter (${carType})`,
    from_district: fromPlace.name,
    to_district: toPlace.name,
    departure_time: 'Doorstep Pickup (Custom Flexible Timing)',
    arrival_time: 'Direct door-to-door journey',
    duration: formatDuration(roadKm, 'Car'),
    price_min: carRateMin,
    price_max: carRateMax,
    boarding_points: ['Home / Hotel Doorstep Pickup', 'Any custom location'],
    dropping_points: [`${toPlace.name.split('(')[0].trim()} Doorstep / Hotel / Immigration Gateway`],
    schedule_days: 'Available 24/7 on advance booking',
    contact_phone: '+880 1900-112233 / +880 1888-556677',
    is_active: true
  });

  // =========================================================================
  // 7. LOCAL VEHICLES (CNG, Easy Bike, Chander Gari, Feeder Shuttle)
  // =========================================================================
  const cngKm = Math.min(120, roadKm);
  const cngReserveFare = Math.max(350, Math.round(cngKm * 28 + 100));
  const cngPerSeatFare = Math.round(cngReserveFare / 4);

  generatedRoutes.push({
    id: `local-cng-${fromPlace.id}-${toPlace.id}`,
    transport_type: 'Local',
    local_category: 'cng',
    local_vehicle_name: isBorderRoute ? 'Border Shuttle CNG Auto-Rickshaw (ইমিগ্রেশন সিএনজি)' : 'CNG Auto-Rickshaw (৩ চাকার সিএনজি)',
    company: `${fromPlace.districtName} District Auto-Rickshaw Drivers Union`,
    from_district: fromPlace.name,
    to_district: toPlace.name,
    departure_time: 'On-Demand / Shared departures every 10 mins',
    arrival_time: 'Door-to-door direct transit',
    duration: formatDuration(roadKm, 'Car'),
    price_min: cngPerSeatFare,
    price_max: Math.round(cngPerSeatFare * 1.25),
    reserve_price: cngReserveFare,
    is_reserve_available: true,
    capacity_seats: 4,
    boarding_points: [
      `${fromPlace.name.split('(')[0].trim()} Central CNG Stand`,
      `${fromPlace.districtName} Upazila Junction / Highway Stand`
    ],
    dropping_points: [
      isBorderRoute ? `${borderPortLocation?.name.split('(')[0].trim()} Immigration Zero Point Gate` : `${toPlace.name.split('(')[0].trim()} Stand`
    ],
    schedule_days: 'Available 24/7 (Day & Night)',
    contact_phone: '+880 1730-112244 (Local CNG Stand)',
    is_active: true
  });

  // Calculate fastest mode and cheapest fare
  const cheapestFare = Math.min(...generatedRoutes.map(r => r.price_min));
  let fastestMode = 'AC Express Bus';
  if (hasFlightRoute) fastestMode = 'Domestic Flight (~45m)';
  else if (canTakeTrain && roadKm > 150) fastestMode = 'Intercity Express Train';

  // Construct context-rich transit tip
  let transitTip = `Direct highway distance: ~${roadKm} km. Multiple direct AC coaches, regular intercity buses, and rental options available daily.`;
  if (isBorderRoute && borderInfo) {
    transitTip = `🛂 BORDER IMMIGRATION PORT: ${borderInfo.name} ➔ Counterpart: ${borderInfo.counterpartPort}. Operating Hours: ${borderInfo.immigrationHours}. Travel Tax: ${borderInfo.travelTaxInfo}. ${borderInfo.transitAdvice}`;
  } else if (toPlace.transitTip) {
    transitTip = toPlace.transitTip;
  }

  return {
    fromLocation: fromPlace,
    toLocation: toPlace,
    distanceKm: roadKm,
    fastestMode,
    cheapestFare,
    routes: generatedRoutes,
    transitTip,
    isBorderRoute,
    borderInfo
  };
}

export function getLocationByNameOrId(query: string): SearchableLocation | undefined {
  if (!query) return undefined;
  const q = query.toLowerCase().trim();
  return ALL_SEARCHABLE_LOCATIONS.find(loc =>
    loc.id.toLowerCase() === q ||
    loc.name.toLowerCase() === q ||
    loc.name.toLowerCase().includes(q) ||
    loc.name_bn.toLowerCase().includes(q) ||
    (loc.districtName && loc.districtName.toLowerCase().includes(q))
  );
}

export function searchLocations(query: string): SearchableLocation[] {
  if (!query || !query.trim()) {
    return ALL_SEARCHABLE_LOCATIONS.slice(0, 15);
  }
  const q = query.toLowerCase().trim();
  return ALL_SEARCHABLE_LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(q) ||
    loc.name_bn.toLowerCase().includes(q) ||
    loc.division.toLowerCase().includes(q) ||
    (loc.districtName && loc.districtName.toLowerCase().includes(q)) ||
    (loc.popular_tag && loc.popular_tag.toLowerCase().includes(q)) ||
    (loc.counterpartPort && loc.counterpartPort.toLowerCase().includes(q))
  ).slice(0, 25);
}
