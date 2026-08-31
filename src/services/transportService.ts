import { TransportRoute, TransportType, Division } from '../types';
import { INITIAL_DISTRICTS } from '../data/seedData';

export interface SearchableLocation {
  id: string;
  name: string;
  name_bn: string;
  division: Division;
  districtId: string;
  districtName: string;
  type: 'district' | 'tourist_spot' | 'airport_city' | 'port_city';
  popular_tag?: string;
  lat: number;
  lng: number;
  hasRailway?: boolean;
  railwayStation?: string;
  hasAirport?: boolean;
  airportCode?: string;
  hasLaunchGhat?: boolean;
  launchGhatName?: string;
  transitTip?: string;
}

// ----------------------------------------------------------------------------
// COMPREHENSIVE SEARCHABLE LOCATIONS DATABASE (64 Districts + Top Tourist Hubs)
// ----------------------------------------------------------------------------
export const ALL_SEARCHABLE_LOCATIONS: SearchableLocation[] = [
  // Major Tourist Spots & Sub-Destinations
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

  // All 64 Districts
  ...INITIAL_DISTRICTS.map((d): SearchableLocation => {
    // Determine Railway, Airport, Port metadata for each district
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
  })
];

// ----------------------------------------------------------------------------
// POPULAR TRAVEL ROUTE SHORTCUTS
// ----------------------------------------------------------------------------
export const POPULAR_ROUTE_SHORTCUTS = [
  { from: 'Dhaka', to: "Cox's Bazar", label: "Dhaka ➔ Cox's Bazar", badge: 'Beach Hub' },
  { from: 'Dhaka', to: 'Sylhet', label: 'Dhaka ➔ Sylhet', badge: 'Tea & Hills' },
  { from: 'Dhaka', to: 'Sajek Valley', label: 'Dhaka ➔ Sajek Valley', badge: 'Cloud Valley' },
  { from: 'Chattogram', to: 'Bandarban', label: 'Chattogram ➔ Bandarban', badge: 'Mountain Peaks' },
  { from: 'Dhaka', to: 'Barishal', label: 'Dhaka ➔ Barishal', badge: 'River Cruise' },
  { from: 'Dhaka', to: 'Sreemangal (Tea Capital)', label: 'Dhaka ➔ Sreemangal', badge: 'Tea Gardens' },
  { from: 'Rajshahi', to: 'Dhaka', label: 'Rajshahi ➔ Dhaka', badge: 'Silk City Express' },
  { from: 'Dhaka', to: 'Kuakata (Sea Beach)', label: 'Dhaka ➔ Kuakata', badge: 'Sunrise Beach' },
  { from: 'Dhaka', to: 'Tanguar Haor & Shimul Bagan', label: 'Dhaka ➔ Tanguar Haor', badge: 'Houseboat' },
  { from: 'Dhaka', to: 'Khulna (Sundarbans)', label: 'Dhaka ➔ Sundarbans', badge: 'Mangrove Safari' },
  { from: 'Dhaka', to: 'Birishiri & Durgapur', label: 'Dhaka ➔ Birishiri', badge: 'Ceramic Lake' },
  { from: 'Dhaka', to: 'Tetulia (Kanchenjunga View)', label: 'Dhaka ➔ Tetulia', badge: 'Himalayan View' }
];

// ----------------------------------------------------------------------------
// DISTANCE & DURATION CALCULATIONS
// ----------------------------------------------------------------------------
export function calculateHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
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
  // Bangladesh highway curvature factor: ~1.28x with Padma/Jamuna bridge routes
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
// UNIVERSAL SMART ROUTE GENERATOR (ANY PLACE TO ANY PLACE)
// ----------------------------------------------------------------------------
export interface RouteCalculationResult {
  fromLocation: SearchableLocation;
  toLocation: SearchableLocation;
  distanceKm: number;
  fastestMode: string;
  cheapestFare: number;
  routes: TransportRoute[];
  transitTip: string;
}

export function generateRoutesBetween(
  fromPlace: SearchableLocation,
  toPlace: SearchableLocation,
  staticRoutes: TransportRoute[] = []
): RouteCalculationResult {
  const roadKm = estimateRoadDistanceKm(fromPlace, toPlace);

  // Check if exact static routes exist from seed database
  const matchingStatic = staticRoutes.filter(r =>
    (r.from_district.toLowerCase().includes(fromPlace.name.toLowerCase()) || fromPlace.name.toLowerCase().includes(r.from_district.toLowerCase())) &&
    (r.to_district.toLowerCase().includes(toPlace.name.toLowerCase()) || toPlace.name.toLowerCase().includes(r.to_district.toLowerCase()))
  );

  const generatedRoutes: TransportRoute[] = [];

  // 1. PREMIUM AC / SLEEPER BUS
  const busAcMin = Math.round(Math.max(350, roadKm * 2.6));
  const busAcMax = Math.round(Math.max(600, roadKm * 3.8));
  const busDuration = formatDuration(roadKm, 'Bus');

  // Select realistic operator names based on divisions
  const northOperators = ['Hanif Enterprise', 'Shyamoli Paribahan', 'Nabil Paribahan', 'SR Travels', 'Ena Transport'];
  const southOperators = ['Green Line Paribahan (Scania Multi-Axle)', 'Shohagh Paribahan', 'Sakura Paribahan', 'Tungipara Express', 'Golden Line'];
  const eastOperators = ['Green Line (Sleeper Coach)', 'Desh Travels', 'Saintmartin Travels (Hyundai)', 'Shohagh Elite', 'Ena Paribahan'];
  
  let primaryBusOperator = 'Green Line Paribahan (Scania Multi-Axle)';
  if (toPlace.division === 'Sylhet' || toPlace.division === 'Chattogram') {
    primaryBusOperator = eastOperators[Math.abs(fromPlace.name.length + toPlace.name.length) % eastOperators.length];
  } else if (toPlace.division === 'Barishal' || toPlace.division === 'Khulna') {
    primaryBusOperator = southOperators[Math.abs(fromPlace.name.length + toPlace.name.length) % southOperators.length];
  } else {
    primaryBusOperator = northOperators[Math.abs(fromPlace.name.length + toPlace.name.length) % northOperators.length];
  }

  generatedRoutes.push({
    id: `bus-ac-${fromPlace.id}-${toPlace.id}`,
    transport_type: 'Bus',
    company: primaryBusOperator,
    from_district: fromPlace.name,
    to_district: toPlace.name,
    departure_time: '07:30 AM / 02:30 PM / 10:30 PM (Daily)',
    arrival_time: 'Multiple slots throughout the day',
    duration: busDuration,
    price_min: busAcMin,
    price_max: busAcMax,
    boarding_points: [`${fromPlace.name} Central Bus Terminal`, 'Sayedabad / Gabtoli / Arambagh (Main Counters)'],
    schedule_days: 'Daily every 1-2 hours',
    contact_phone: '+880 1711-830000 / +880 1913-999888',
    is_active: true
  });

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
    boarding_points: [`${fromPlace.name} Highway Counter`, 'District Inter-Bus Stand'],
    schedule_days: 'Daily regular departures',
    contact_phone: '+880 1819-223344',
    is_active: true
  });

  // 3. BANGLADESH RAILWAY (TRAIN) - If railway connects or passes near
  const canTakeTrain = (fromPlace.hasRailway || fromPlace.districtId === 'dhaka') && (toPlace.hasRailway || toPlace.districtId === 'dhaka');
  if (canTakeTrain) {
    const trainMin = Math.round(Math.max(180, roadKm * 1.2)); // Shovon Chair
    const trainMax = Math.round(Math.max(450, roadKm * 3.1)); // AC Berth / Snigdha
    const trainDuration = formatDuration(roadKm, 'Train');

    let trainName = 'Bangladesh Railway Intercity Express';
    if (toPlace.name.toLowerCase().includes('sylhet') || toPlace.name.toLowerCase().includes('sreemangal')) {
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
      boarding_points: [fromPlace.railwayStation || `${fromPlace.name} Junction`, 'Kamalapur / Dhaka Airport'],
      schedule_days: 'Daily (Check weekly off day via Railway e-ticket app)',
      contact_phone: '131 (Bangladesh Railway Helpline)',
      is_active: true
    });
  }

  // 4. DOMESTIC FLIGHTS - If airport within travel corridor
  const flightAirports = ['dhaka', 'chattogram', 'coxs-bazar', 'sylhet', 'rajshahi', 'nilphamari', 'rangpur', 'jashore', 'barishal', 'khulna'];
  const hasFlightRoute = (fromPlace.hasAirport || flightAirports.includes(fromPlace.districtId)) &&
                         (toPlace.hasAirport || flightAirports.includes(toPlace.districtId)) &&
                         roadKm >= 180;

  if (hasFlightRoute) {
    generatedRoutes.push({
      id: `flight-${fromPlace.id}-${toPlace.id}`,
      transport_type: 'Flight',
      company: 'Biman Bangladesh / US-Bangla / Air Astra (Direct Flight)',
      from_district: fromPlace.name,
      to_district: toPlace.name,
      departure_time: '08:30 AM / 12:45 PM / 05:15 PM / 08:30 PM',
      arrival_time: '45 mins flight duration',
      duration: '45m - 55m',
      price_min: 3800,
      price_max: 8500,
      boarding_points: [
        fromPlace.airportCode ? `${fromPlace.name} Airport (${fromPlace.airportCode})` : 'Hazrat Shahjalal Intl (DAC)',
        toPlace.airportCode ? `${toPlace.name} Airport (${toPlace.airportCode})` : 'Destination Airport'
      ],
      schedule_days: 'Daily multiple flights',
      contact_phone: '13605 (US-Bangla) / 13636 (Biman)',
      is_active: true
    });
  }

  // 5. RIVER LAUNCH / WATER CRUISE - For southern river corridors & islands
  const launchLocations = ['barishal', 'bhola', 'patuakhali', 'kuakata-beach', 'jhalokathi', 'pirojpur', 'barguna', 'chandpur', 'saint-martin'];
  const isWaterRoute = (fromPlace.id === 'dhaka' && launchLocations.includes(toPlace.id)) ||
                       (toPlace.id === 'dhaka' && launchLocations.includes(fromPlace.id)) ||
                       (fromPlace.hasLaunchGhat && toPlace.hasLaunchGhat);

  if (isWaterRoute) {
    const launchMin = 400; // Deck fare
    const launchMax = 5500; // VIP suite cabin
    generatedRoutes.push({
      id: `launch-${fromPlace.id}-${toPlace.id}`,
      transport_type: 'Launch',
      company: 'MV Manami / MV Sundarban-12 / Kuakata-9 (Triple Deck Luxury Launch)',
      from_district: fromPlace.name,
      to_district: toPlace.name,
      departure_time: '08:30 PM / 09:00 PM (Overnight Cruise)',
      arrival_time: '05:00 AM (Next Morning)',
      duration: formatDuration(roadKm, 'Launch'),
      price_min: launchMin,
      price_max: launchMax,
      boarding_points: ['Sadarghat Launch Terminal (Dhaka)', `${toPlace.name} Launch Ghat`],
      schedule_days: 'Daily overnight river cruises',
      contact_phone: '+880 1712-334455 / +880 1819-445566',
      is_active: true
    });
  }

  // 6. PRIVATE CAR / MICROBUS / CHANDER GARI RENTAL
  const isHilly = toPlace.division === 'Chattogram' && (toPlace.id.includes('sajek') || toPlace.id.includes('bandarban') || toPlace.id.includes('khagrachhari'));
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
    schedule_days: 'Available 24/7 on advance booking',
    contact_phone: '+880 1900-112233 / +880 1888-556677',
    is_active: true
  });

  // Combine matching static database routes with calculated routes
  const combinedRoutes = [...matchingStatic, ...generatedRoutes];

  // Calculate cheapest & fastest metrics
  const minPrice = Math.min(...combinedRoutes.map(r => r.price_min));
  const fastest = combinedRoutes.some(r => r.transport_type === 'Flight')
    ? 'Flight (45 mins)'
    : combinedRoutes.some(r => r.transport_type === 'Train')
    ? 'Express Train'
    : 'AC Highway Bus';

  const tip = toPlace.transitTip || fromPlace.transitTip || `Direct highway connections available between ${fromPlace.name} and ${toPlace.name} (~${roadKm} km). Book tickets 2-3 days in advance during weekends and holidays.`;

  return {
    fromLocation: fromPlace,
    toLocation: toPlace,
    distanceKm: roadKm,
    fastestMode: fastest,
    cheapestFare: minPrice,
    routes: combinedRoutes,
    transitTip: tip
  };
}

// ----------------------------------------------------------------------------
// SEARCH HELPER: MATCHES ENGLISH, BENGALI & POPULAR DESTINATIONS
// ----------------------------------------------------------------------------
export function searchLocations(query: string): SearchableLocation[] {
  if (!query || !query.trim()) {
    // Return top popular hubs by default
    return ALL_SEARCHABLE_LOCATIONS.slice(0, 12);
  }

  const q = query.trim().toLowerCase();

  return ALL_SEARCHABLE_LOCATIONS.filter(loc => {
    const nameMatch = loc.name.toLowerCase().includes(q);
    const bnMatch = loc.name_bn.includes(q);
    const divMatch = loc.division.toLowerCase().includes(q);
    const distMatch = loc.districtName.toLowerCase().includes(q);
    const tagMatch = loc.popular_tag ? loc.popular_tag.toLowerCase().includes(q) : false;

    return nameMatch || bnMatch || divMatch || distMatch || tagMatch;
  });
}

export function getLocationByNameOrId(nameOrId: string): SearchableLocation | undefined {
  const q = nameOrId.toLowerCase().trim();
  return ALL_SEARCHABLE_LOCATIONS.find(loc => 
    loc.id.toLowerCase() === q ||
    loc.name.toLowerCase() === q ||
    loc.name_bn === q ||
    loc.districtId.toLowerCase() === q ||
    loc.name.toLowerCase().includes(q)
  );
}
