import { Division } from '../types';

export interface UpazilaInfo {
  id: string;
  name: string;
  name_bn: string;
  districtId: string;
  districtName: string;
  division: Division;
  lat: number;
  lng: number;
  hasRailway?: boolean;
  hasLaunchGhat?: boolean;
  transitHubType?: 'Bus Terminal' | 'Railway Station' | 'Launch Ghat' | 'Local Stand' | 'Highways Junction';
  popular_tag?: string;
}

// ============================================================================
// ALL ~495 UPAZILAS OF BANGLADESH ACROSS ALL 64 DISTRICTS & 8 DIVISIONS
// ============================================================================
export const BANGLADESH_UPAZILAS: UpazilaInfo[] = [
  // --------------------------------------------------------------------------
  // 1. DHAKA DIVISION
  // --------------------------------------------------------------------------
  // Dhaka District
  { id: 'savar', name: 'Savar', name_bn: 'সাভার', districtId: 'dhaka', districtName: 'Dhaka', division: 'Dhaka', lat: 23.8583, lng: 90.2667, transitHubType: 'Bus Terminal', popular_tag: 'Jatiya Smriti Soudho & EPZ' },
  { id: 'dhamrai', name: 'Dhamrai', name_bn: 'ধামরাই', districtId: 'dhaka', districtName: 'Dhaka', division: 'Dhaka', lat: 23.9167, lng: 90.2167, transitHubType: 'Local Stand', popular_tag: 'Historic Metal Crafts & Rath' },
  { id: 'keraniganj', name: 'Keraniganj', name_bn: 'কেরানীগঞ্জ', districtId: 'dhaka', districtName: 'Dhaka', division: 'Dhaka', lat: 23.6833, lng: 90.3167, transitHubType: 'Highways Junction', popular_tag: 'Buriganga Riverfront' },
  { id: 'nawabganj-dhaka', name: 'Nawabganj', name_bn: 'নবাবগঞ্জ', districtId: 'dhaka', districtName: 'Dhaka', division: 'Dhaka', lat: 23.6667, lng: 90.1667, transitHubType: 'Local Stand', popular_tag: 'Ichamati River & Palaces' },
  { id: 'dohar', name: 'Dohar', name_bn: 'দোহার', districtId: 'dhaka', districtName: 'Dhaka', division: 'Dhaka', lat: 23.5833, lng: 90.1333, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Moinot Ghat (Mini Coxs Bazar)' },
  { id: 'tejgaon', name: 'Tejgaon', name_bn: 'তেজগাঁও', districtId: 'dhaka', districtName: 'Dhaka', division: 'Dhaka', lat: 23.7590, lng: 90.3910, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'mirpur', name: 'Mirpur', name_bn: 'মিরপুর', districtId: 'dhaka', districtName: 'Dhaka', division: 'Dhaka', lat: 23.8041, lng: 90.3687, transitHubType: 'Bus Terminal', popular_tag: 'National Zoo & Botanical Garden' },
  { id: 'uttara', name: 'Uttara', name_bn: 'উত্তরা', districtId: 'dhaka', districtName: 'Dhaka', division: 'Dhaka', lat: 23.8759, lng: 90.3795, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Airport Gateway' },
  { id: 'gulshan', name: 'Gulshan / Banani', name_bn: 'গুলশান / বনানী', districtId: 'dhaka', districtName: 'Dhaka', division: 'Dhaka', lat: 23.7925, lng: 90.4078, transitHubType: 'Highways Junction' },
  { id: 'dhanmondi', name: 'Dhanmondi', name_bn: 'ধানমন্ডি', districtId: 'dhaka', districtName: 'Dhaka', division: 'Dhaka', lat: 23.7461, lng: 90.3742, transitHubType: 'Local Stand', popular_tag: 'Dhanmondi Lake & Culture' },

  // Gazipur District
  { id: 'gazipur-sadar', name: 'Gazipur Sadar (Joydebpur)', name_bn: 'গাজীপুর সদর (জয়দেবপুর)', districtId: 'gazipur', districtName: 'Gazipur', division: 'Dhaka', lat: 24.0023, lng: 90.4267, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'kaliakair', name: 'Kaliakair', name_bn: 'কালিয়াকৈর', districtId: 'gazipur', districtName: 'Gazipur', division: 'Dhaka', lat: 24.0750, lng: 90.2167, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Hi-Tech City' },
  { id: 'kapasia', name: 'Kapasia', name_bn: 'কাপাসিয়া', districtId: 'gazipur', districtName: 'Gazipur', division: 'Dhaka', lat: 24.1167, lng: 90.5667, transitHubType: 'Local Stand' },
  { id: 'sreepur-gazipur', name: 'Sreepur', name_bn: 'শ্রীপুর', districtId: 'gazipur', districtName: 'Gazipur', division: 'Dhaka', lat: 24.2000, lng: 90.4667, transitHubType: 'Bus Terminal', popular_tag: 'Safari Park & Eco Resorts' },
  { id: 'kaliganj-gazipur', name: 'Kaliganj', name_bn: 'কালীগঞ্জ', districtId: 'gazipur', districtName: 'Gazipur', division: 'Dhaka', lat: 23.9167, lng: 90.5667, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'tongi', name: 'Tongi', name_bn: 'টঙ্গী', districtId: 'gazipur', districtName: 'Gazipur', division: 'Dhaka', lat: 23.8920, lng: 90.4042, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Tongi Railway Junction' },

  // Narayanganj District
  { id: 'narayanganj-sadar', name: 'Narayanganj Sadar', name_bn: 'নারায়ণগঞ্জ সদর', districtId: 'narayanganj', districtName: 'Narayanganj', division: 'Dhaka', lat: 23.6238, lng: 90.5000, transitHubType: 'Railway Station', hasRailway: true, hasLaunchGhat: true },
  { id: 'sonargaon', name: 'Sonargaon', name_bn: 'সোনারগাঁ', districtId: 'narayanganj', districtName: 'Narayanganj', division: 'Dhaka', lat: 23.6450, lng: 90.6000, transitHubType: 'Highways Junction', popular_tag: 'Panam City & Folk Art Museum' },
  { id: 'bandar', name: 'Bandar', name_bn: 'বন্দর', districtId: 'narayanganj', districtName: 'Narayanganj', division: 'Dhaka', lat: 23.5978, lng: 90.5311, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Sonakanda Fort' },
  { id: 'rupganj', name: 'Rupganj', name_bn: 'রূপগঞ্জ', districtId: 'narayanganj', districtName: 'Narayanganj', division: 'Dhaka', lat: 23.7917, lng: 90.5167, transitHubType: 'Local Stand', popular_tag: 'Murapara Zamindar Bari' },
  { id: 'araihazar', name: 'Araihazar', name_bn: 'আড়াইহাজার', districtId: 'narayanganj', districtName: 'Narayanganj', division: 'Dhaka', lat: 23.7833, lng: 90.6500, transitHubType: 'Local Stand' },

  // Tangail District
  { id: 'tangail-sadar', name: 'Tangail Sadar', name_bn: 'টাঙ্গাইল সদর', districtId: 'tangail', districtName: 'Tangail', division: 'Dhaka', lat: 24.2513, lng: 89.9167, transitHubType: 'Bus Terminal', hasRailway: true, popular_tag: 'Porabari Chomchom' },
  { id: 'mirzapur', name: 'Mirzapur', name_bn: 'মির্জাপুর', districtId: 'tangail', districtName: 'Tangail', division: 'Dhaka', lat: 24.1000, lng: 90.1000, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Mohera Zamindar Bari' },
  { id: 'madhupur', name: 'Madhupur', name_bn: 'মধুপুর', districtId: 'tangail', districtName: 'Tangail', division: 'Dhaka', lat: 24.6167, lng: 90.0333, transitHubType: 'Bus Terminal', popular_tag: 'Madhupur National Park & Pineapples' },
  { id: 'kalihati', name: 'Kalihati (Elenga)', name_bn: 'কালিহাতী (এলেঙ্গা)', districtId: 'tangail', districtName: 'Tangail', division: 'Dhaka', lat: 24.3833, lng: 90.0000, transitHubType: 'Highways Junction', popular_tag: 'Elenga Resort Hub' },
  { id: 'ghatail', name: 'Ghatail', name_bn: 'ঘাটাইল', districtId: 'tangail', districtName: 'Tangail', division: 'Dhaka', lat: 24.5000, lng: 90.0000, transitHubType: 'Local Stand' },
  { id: 'gopalpur-tangail', name: 'Gopalpur', name_bn: 'গোপালপুর', districtId: 'tangail', districtName: 'Tangail', division: 'Dhaka', lat: 24.5500, lng: 89.9167, transitHubType: 'Local Stand', popular_tag: '201 Dome Mosque' },
  { id: 'bhuapur', name: 'Bhuapur', name_bn: 'ভুঞাপুর', districtId: 'tangail', districtName: 'Tangail', division: 'Dhaka', lat: 24.4667, lng: 89.8667, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Jamuna River Bridge East' },
  { id: 'sakhipur', name: 'Sakhipur', name_bn: 'সখিপুর', districtId: 'tangail', districtName: 'Tangail', division: 'Dhaka', lat: 24.3167, lng: 90.1667, transitHubType: 'Local Stand' },
  { id: 'basail', name: 'Basail', name_bn: 'বাসাইল', districtId: 'tangail', districtName: 'Tangail', division: 'Dhaka', lat: 24.2167, lng: 90.0500, transitHubType: 'Local Stand' },
  { id: 'delduar', name: 'Delduar', name_bn: 'দেলদুয়ার', districtId: 'tangail', districtName: 'Tangail', division: 'Dhaka', lat: 24.1500, lng: 89.9667, transitHubType: 'Local Stand' },
  { id: 'nagarpur', name: 'Nagarpur', name_bn: 'নাগরপুর', districtId: 'tangail', districtName: 'Tangail', division: 'Dhaka', lat: 24.0500, lng: 89.8667, transitHubType: 'Local Stand' },
  { id: 'dhanbari', name: 'Dhanbari', name_bn: 'ধনবাড়ী', districtId: 'tangail', districtName: 'Tangail', division: 'Dhaka', lat: 24.6833, lng: 89.9667, transitHubType: 'Local Stand', popular_tag: 'Dhanbari Nawab Palace' },

  // Kishoreganj District
  { id: 'kishoreganj-sadar', name: 'Kishoreganj Sadar', name_bn: 'কিশোরগঞ্জ সদর', districtId: 'kishoreganj', districtName: 'Kishoreganj', division: 'Dhaka', lat: 24.4449, lng: 90.7766, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'nikli', name: 'Nikli', name_bn: 'নিকলী', districtId: 'kishoreganj', districtName: 'Kishoreganj', division: 'Dhaka', lat: 24.3167, lng: 90.9333, transitHubType: 'Local Stand', popular_tag: 'Nikli Haor & Submerged Highway' },
  { id: 'mithamain', name: 'Mithamain', name_bn: 'মিঠামইন', districtId: 'kishoreganj', districtName: 'Kishoreganj', division: 'Dhaka', lat: 24.4333, lng: 91.0500, transitHubType: 'Local Stand', popular_tag: 'All-Weather Haor Highway' },
  { id: 'itna', name: 'Itna', name_bn: 'ইটনা', districtId: 'kishoreganj', districtName: 'Kishoreganj', division: 'Dhaka', lat: 24.5333, lng: 91.0833, transitHubType: 'Local Stand' },
  { id: 'astagram', name: 'Astagram', name_bn: 'অষ্টগ্রাম', districtId: 'kishoreganj', districtName: 'Kishoreganj', division: 'Dhaka', lat: 24.2667, lng: 91.1167, transitHubType: 'Local Stand', popular_tag: 'Historic 5-Dome Qutb Mosque & Cheese' },
  { id: 'bhairab', name: 'Bhairab', name_bn: 'ভৈরব', districtId: 'kishoreganj', districtName: 'Kishoreganj', division: 'Dhaka', lat: 24.0500, lng: 90.9833, transitHubType: 'Railway Station', hasRailway: true, hasLaunchGhat: true, popular_tag: 'Meghna River Railway Junction' },
  { id: 'bajitpur', name: 'Bajitpur', name_bn: 'বাজিতপুর', districtId: 'kishoreganj', districtName: 'Kishoreganj', division: 'Dhaka', lat: 24.2167, lng: 90.9500, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'kuliarchar', name: 'Kuliarchar', name_bn: 'কুলিয়ারচর', districtId: 'kishoreganj', districtName: 'Kishoreganj', division: 'Dhaka', lat: 24.1500, lng: 90.9000, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'katiadi', name: 'Katiadi', name_bn: 'কটিয়াদী', districtId: 'kishoreganj', districtName: 'Kishoreganj', division: 'Dhaka', lat: 24.2500, lng: 90.8000, transitHubType: 'Local Stand' },
  { id: 'pakundia', name: 'Pakundia', name_bn: 'পাকুন্দিয়া', districtId: 'kishoreganj', districtName: 'Kishoreganj', division: 'Dhaka', lat: 24.3333, lng: 90.6833, transitHubType: 'Local Stand' },
  { id: 'hossainpur', name: 'Hossainpur', name_bn: 'হোসেনপুর', districtId: 'kishoreganj', districtName: 'Kishoreganj', division: 'Dhaka', lat: 24.4167, lng: 90.6500, transitHubType: 'Local Stand' },
  { id: 'karimganj', name: 'Karimganj', name_bn: 'করিমগঞ্জ', districtId: 'kishoreganj', districtName: 'Kishoreganj', division: 'Dhaka', lat: 24.4667, lng: 90.8667, transitHubType: 'Local Stand' },
  { id: 'tarail', name: 'Tarail', name_bn: 'তাড়াইল', districtId: 'kishoreganj', districtName: 'Kishoreganj', division: 'Dhaka', lat: 24.5500, lng: 90.8667, transitHubType: 'Local Stand' },

  // Manikganj District
  { id: 'manikganj-sadar', name: 'Manikganj Sadar', name_bn: 'মানিকগঞ্জ সদর', districtId: 'manikganj', districtName: 'Manikganj', division: 'Dhaka', lat: 23.8644, lng: 90.0047, transitHubType: 'Bus Terminal' },
  { id: 'saturia', name: 'Saturia', name_bn: 'সাটুরিয়া', districtId: 'manikganj', districtName: 'Manikganj', division: 'Dhaka', lat: 23.9500, lng: 90.0333, transitHubType: 'Local Stand', popular_tag: 'Baliati Palace' },
  { id: 'shibalaya', name: 'Shibalaya (Paturia Ghat)', name_bn: 'শিবালয় (পাটুরিয়া ঘাট)', districtId: 'manikganj', districtName: 'Manikganj', division: 'Dhaka', lat: 23.8333, lng: 89.8000, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Paturia Ferry & Launch Terminal' },
  { id: 'singair', name: 'Singair', name_bn: 'সিংগাইর', districtId: 'manikganj', districtName: 'Manikganj', division: 'Dhaka', lat: 23.8167, lng: 90.1500, transitHubType: 'Local Stand' },
  { id: 'ghior', name: 'Ghior', name_bn: 'ঘিওর', districtId: 'manikganj', districtName: 'Manikganj', division: 'Dhaka', lat: 23.8833, lng: 89.9333, transitHubType: 'Local Stand' },
  { id: 'harirampur', name: 'Harirampur', name_bn: 'হরিরামপুর', districtId: 'manikganj', districtName: 'Manikganj', division: 'Dhaka', lat: 23.7333, lng: 89.9667, transitHubType: 'Local Stand' },
  { id: 'daulatpur-manikganj', name: 'Daulatpur', name_bn: 'দৌলতপুর', districtId: 'manikganj', districtName: 'Manikganj', division: 'Dhaka', lat: 23.9667, lng: 89.8333, transitHubType: 'Local Stand' },

  // Munshiganj District
  { id: 'munshiganj-sadar', name: 'Munshiganj Sadar', name_bn: 'মুন্সিগঞ্জ সদর', districtId: 'munshiganj', districtName: 'Munshiganj', division: 'Dhaka', lat: 23.5422, lng: 90.5305, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Idrakpur Fort' },
  { id: 'sreenagar', name: 'Sreenagar', name_bn: 'শ্রীনগর', districtId: 'munshiganj', districtName: 'Munshiganj', division: 'Dhaka', lat: 23.5333, lng: 90.2833, transitHubType: 'Local Stand', popular_tag: 'Arial Beel & Historic Dighis' },
  { id: 'sirajdikhan', name: 'Sirajdikhan', name_bn: 'সিরাজদিখান', districtId: 'munshiganj', districtName: 'Munshiganj', division: 'Dhaka', lat: 23.5833, lng: 90.3833, transitHubType: 'Local Stand' },
  { id: 'louhajang', name: 'Louhajang (Mawa Ghat)', name_bn: 'লৌহজং (মাওয়া ঘাট)', districtId: 'munshiganj', districtName: 'Munshiganj', division: 'Dhaka', lat: 23.4667, lng: 90.3000, transitHubType: 'Highways Junction', hasRailway: true, popular_tag: 'Padma Bridge North Station & Ilish' },
  { id: 'tongibari', name: 'Tongibari', name_bn: 'টংগিবাড়ী', districtId: 'munshiganj', districtName: 'Munshiganj', division: 'Dhaka', lat: 23.5000, lng: 90.4500, transitHubType: 'Local Stand' },
  { id: 'gazaria', name: 'Gazaria', name_bn: 'গজারিয়া', districtId: 'munshiganj', districtName: 'Munshiganj', division: 'Dhaka', lat: 23.5833, lng: 90.6000, transitHubType: 'Highways Junction', popular_tag: 'Meghna Bridge Corridor' },

  // Narsingdi District
  { id: 'narsingdi-sadar', name: 'Narsingdi Sadar', name_bn: 'নরসিংদী সদর', districtId: 'narsingdi', districtName: 'Narsingdi', division: 'Dhaka', lat: 23.9322, lng: 90.7154, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'belabo', name: 'Belabo', name_bn: 'বেলাব', districtId: 'narsingdi', districtName: 'Narsingdi', division: 'Dhaka', lat: 24.1167, lng: 90.8500, transitHubType: 'Local Stand', popular_tag: 'Wari-Bateshwar Ancient Fort City' },
  { id: 'shibpur', name: 'Shibpur', name_bn: 'শিবপুর', districtId: 'narsingdi', districtName: 'Narsingdi', division: 'Dhaka', lat: 24.0333, lng: 90.7333, transitHubType: 'Local Stand', popular_tag: 'Dream Holiday Park' },
  { id: 'raipura', name: 'Raipura', name_bn: 'রায়পুরা', districtId: 'narsingdi', districtName: 'Narsingdi', division: 'Dhaka', lat: 23.9833, lng: 90.8833, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'palash', name: 'Palash (Ghorashal)', name_bn: 'পলাশ (ঘোড়াশাল)', districtId: 'narsingdi', districtName: 'Narsingdi', division: 'Dhaka', lat: 23.9667, lng: 90.6333, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'monohardi', name: 'Monohardi', name_bn: 'মনোহরদী', districtId: 'narsingdi', districtName: 'Narsingdi', division: 'Dhaka', lat: 24.1333, lng: 90.7000, transitHubType: 'Local Stand' },

  // Faridpur District
  { id: 'faridpur-sadar', name: 'Faridpur Sadar', name_bn: 'ফরিদপুর সদর', districtId: 'faridpur', districtName: 'Faridpur', division: 'Dhaka', lat: 23.6071, lng: 89.8429, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Jasimuddin Ananda Bari' },
  { id: 'bhanga', name: 'Bhanga', name_bn: 'ভাঙ্গা', districtId: 'faridpur', districtName: 'Faridpur', division: 'Dhaka', lat: 23.3833, lng: 89.9833, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Bhanga Iconic Cloverleaf Expressway' },
  { id: 'boalmari', name: 'Boalmari', name_bn: 'বোয়ালমারী', districtId: 'faridpur', districtName: 'Faridpur', division: 'Dhaka', lat: 23.3833, lng: 89.6833, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'alfadanga', name: 'Alfadanga', name_bn: 'আলফাডাঙ্গা', districtId: 'faridpur', districtName: 'Faridpur', division: 'Dhaka', lat: 23.2833, lng: 89.7000, transitHubType: 'Local Stand' },
  { id: 'madhukhali', name: 'Madhukhali', name_bn: 'মধুখালী', districtId: 'faridpur', districtName: 'Faridpur', division: 'Dhaka', lat: 23.5333, lng: 89.6333, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'nagarkanda', name: 'Nagarkanda', name_bn: 'নগরকান্দা', districtId: 'faridpur', districtName: 'Faridpur', division: 'Dhaka', lat: 23.4167, lng: 89.8833, transitHubType: 'Local Stand' },
  { id: 'sadarpur', name: 'Sadarpur', name_bn: 'সদরপুর', districtId: 'faridpur', districtName: 'Faridpur', division: 'Dhaka', lat: 23.4833, lng: 90.0333, transitHubType: 'Local Stand', popular_tag: 'Atrishi Dargah' },
  { id: 'charbhadrasan', name: 'Charbhadrasan', name_bn: 'চরভদ্রাসন', districtId: 'faridpur', districtName: 'Faridpur', division: 'Dhaka', lat: 23.6000, lng: 90.0167, transitHubType: 'Local Stand' },
  { id: 'saltha', name: 'Saltha', name_bn: 'সালথা', districtId: 'faridpur', districtName: 'Faridpur', division: 'Dhaka', lat: 23.4667, lng: 89.7833, transitHubType: 'Local Stand' },

  // Gopalganj District
  { id: 'gopalganj-sadar', name: 'Gopalganj Sadar', name_bn: 'গোপালগঞ্জ সদর', districtId: 'gopalganj', districtName: 'Gopalganj', division: 'Dhaka', lat: 23.0051, lng: 89.8266, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'tungipara', name: 'Tungipara', name_bn: 'টুঙ্গিপাড়া', districtId: 'gopalganj', districtName: 'Gopalganj', division: 'Dhaka', lat: 22.9000, lng: 89.8833, transitHubType: 'Local Stand', popular_tag: 'Mausoleum Complex of Bangabandhu' },
  { id: 'kotalipara', name: 'Kotalipara', name_bn: 'কোটালীপাড়া', districtId: 'gopalganj', districtName: 'Gopalganj', division: 'Dhaka', lat: 22.9833, lng: 90.0000, transitHubType: 'Local Stand' },
  { id: 'kashiani', name: 'Kashiani', name_bn: 'কাশিয়ানী', districtId: 'gopalganj', districtName: 'Gopalganj', division: 'Dhaka', lat: 23.2167, lng: 89.7000, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'muksudpur', name: 'Muksudpur', name_bn: 'মুকসুদপুর', districtId: 'gopalganj', districtName: 'Gopalganj', division: 'Dhaka', lat: 23.2500, lng: 89.8667, transitHubType: 'Railway Station', hasRailway: true },

  // Madaripur District
  { id: 'madaripur-sadar', name: 'Madaripur Sadar', name_bn: 'মাদারীপুর সদর', districtId: 'madaripur', districtName: 'Madaripur', division: 'Dhaka', lat: 23.1641, lng: 90.1897, transitHubType: 'Bus Terminal' },
  { id: 'shibchar', name: 'Shibchar (Padma South)', name_bn: 'শিবচর (পদ্মা দক্ষিণ)', districtId: 'madaripur', districtName: 'Madaripur', division: 'Dhaka', lat: 23.3500, lng: 90.1667, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Padma Bridge South Station' },
  { id: 'kalkini', name: 'Kalkini', name_bn: 'কালকিনি', districtId: 'madaripur', districtName: 'Madaripur', division: 'Dhaka', lat: 23.0667, lng: 90.2333, transitHubType: 'Local Stand' },
  { id: 'rajoir', name: 'Rajoir', name_bn: 'রাজৈর', districtId: 'madaripur', districtName: 'Madaripur', division: 'Dhaka', lat: 23.2167, lng: 89.9333, transitHubType: 'Local Stand', popular_tag: 'Prannathpur Zamindar Palace' },
  { id: 'dasar', name: 'Dasar', name_bn: 'ডাসার', districtId: 'madaripur', districtName: 'Madaripur', division: 'Dhaka', lat: 23.0833, lng: 90.1833, transitHubType: 'Local Stand' },

  // Rajbari District
  { id: 'rajbari-sadar', name: 'Rajbari Sadar', name_bn: 'রাজবাড়ী সদর', districtId: 'rajbari', districtName: 'Rajbari', division: 'Dhaka', lat: 23.7574, lng: 89.6445, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'goalandaghat', name: 'Goalanda (Daulatdia Ghat)', name_bn: 'গোয়ালন্দ (দৌলতদিয়া ঘাট)', districtId: 'rajbari', districtName: 'Rajbari', division: 'Dhaka', lat: 23.7333, lng: 89.7667, transitHubType: 'Launch Ghat', hasRailway: true, hasLaunchGhat: true, popular_tag: 'Padma River Ferry Ghat' },
  { id: 'pangsha', name: 'Pangsha', name_bn: 'পাংশা', districtId: 'rajbari', districtName: 'Rajbari', division: 'Dhaka', lat: 23.7833, lng: 89.4167, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'baliakandi', name: 'Baliakandi', name_bn: 'বালিয়াকান্দি', districtId: 'rajbari', districtName: 'Rajbari', division: 'Dhaka', lat: 23.6333, lng: 89.5500, transitHubType: 'Local Stand', popular_tag: 'Mir Mosharraf Hossain Memorial' },
  { id: 'kalukhali', name: 'Kalukhali', name_bn: 'কালুখালী', districtId: 'rajbari', districtName: 'Rajbari', division: 'Dhaka', lat: 23.7167, lng: 89.5000, transitHubType: 'Railway Station', hasRailway: true },

  // Shariatpur District
  { id: 'shariatpur-sadar', name: 'Shariatpur Sadar', name_bn: 'শরীয়তপুর সদর', districtId: 'shariatpur', districtName: 'Shariatpur', division: 'Dhaka', lat: 23.2423, lng: 90.4348, transitHubType: 'Bus Terminal' },
  { id: 'zanjira', name: 'Zanjira', name_bn: 'জাজিরা', districtId: 'shariatpur', districtName: 'Shariatpur', division: 'Dhaka', lat: 23.3667, lng: 90.3500, transitHubType: 'Highways Junction', popular_tag: 'Padma Bridge South Approach' },
  { id: 'naria', name: 'Naria', name_bn: 'নড়িয়া', districtId: 'shariatpur', districtName: 'Shariatpur', division: 'Dhaka', lat: 23.3167, lng: 90.4500, transitHubType: 'Local Stand' },
  { id: 'damudya', name: 'Damudya', name_bn: 'ডামুড্যা', districtId: 'shariatpur', districtName: 'Shariatpur', division: 'Dhaka', lat: 23.1333, lng: 90.4500, transitHubType: 'Local Stand' },
  { id: 'bhedarganj', name: 'Bhedarganj', name_bn: 'ভেদরগঞ্জ', districtId: 'shariatpur', districtName: 'Shariatpur', division: 'Dhaka', lat: 23.2000, lng: 90.5000, transitHubType: 'Local Stand' },
  { id: 'gosairhat', name: 'Gosairhat', name_bn: 'গোসাইরহাট', districtId: 'shariatpur', districtName: 'Shariatpur', division: 'Dhaka', lat: 23.0667, lng: 90.4667, transitHubType: 'Launch Ghat', hasLaunchGhat: true },

  // --------------------------------------------------------------------------
  // 2. CHATTOGRAM DIVISION
  // --------------------------------------------------------------------------
  // Chattogram District
  { id: 'chattogram-sadar', name: 'Chattogram City (Agrabad / GEC)', name_bn: 'চট্টগ্রাম সদর (আগ্রাবাদ / জিইসি)', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.3569, lng: 91.7832, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Port City & Patenga' },
  { id: 'sitakunda', name: 'Sitakunda', name_bn: 'সীতাকুণ্ড', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.6167, lng: 91.6667, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Chandranath Peak & Guliakhali Beach' },
  { id: 'mirsharai', name: 'Mirsharai', name_bn: 'মীরসরাই', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.7667, lng: 91.5833, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Mohamaya Lake & Bangabandhu Economic Zone' },
  { id: 'hathazari', name: 'Hathazari', name_bn: 'হাটহাজারী', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.5000, lng: 91.8000, transitHubType: 'Bus Terminal', popular_tag: 'Chittagong University & Halda River' },
  { id: 'raozan', name: 'Raozan', name_bn: 'রাউজান', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.5333, lng: 91.9167, transitHubType: 'Local Stand', popular_tag: 'CUET Campus' },
  { id: 'fatikchhari', name: 'Fatikchhari', name_bn: 'ফটিকছড়ি', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.6833, lng: 91.7833, transitHubType: 'Local Stand', popular_tag: 'Maijbhandar Darbar Sharif' },
  { id: 'rangunia', name: 'Rangunia', name_bn: 'রাঙ্গুনিয়া', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.4500, lng: 92.0500, transitHubType: 'Local Stand', popular_tag: 'Karnafuli Riverside' },
  { id: 'boalkhali', name: 'Boalkhali', name_bn: 'বোয়ালখালী', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.3833, lng: 91.9167, transitHubType: 'Local Stand' },
  { id: 'patiya', name: 'Patiya', name_bn: 'পটিয়া', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.3000, lng: 91.9833, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'anwara', name: 'Anwara (Parki Beach)', name_bn: 'আনোয়ারা (পারকি বিচ)', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.2167, lng: 91.9167, transitHubType: 'Highways Junction', popular_tag: 'Bangabandhu Tunnel & Parki Beach' },
  { id: 'chandanaish', name: 'Chandanaish', name_bn: 'চন্দনাইশ', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.2167, lng: 92.0500, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'satkania', name: 'Satkania', name_bn: 'সাতকানিয়া', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.0833, lng: 92.0500, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'lohagara-ctg', name: 'Lohagara', name_bn: 'লোহাগাড়া', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.0000, lng: 92.1000, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Chunati Wildlife Sanctuary' },
  { id: 'banshkhali', name: 'Banshkhali', name_bn: 'বাঁশখালী', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.0333, lng: 91.9500, transitHubType: 'Local Stand', popular_tag: 'Banshkhali Eco Park & Beach' },
  { id: 'sandwip', name: 'Sandwip Island', name_bn: 'সন্দ্বীপ দ্বীপ', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.4833, lng: 91.4500, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Offshore Sea Island' },
  { id: 'karnaphuli', name: 'Karnaphuli', name_bn: 'কর্ণফুলী', districtId: 'chattogram', districtName: 'Chattogram', division: 'Chattogram', lat: 22.2833, lng: 91.8333, transitHubType: 'Local Stand' },

  // Cox's Bazar District
  { id: 'coxs-bazar-sadar', name: "Cox's Bazar Sadar (Kolatoli/Laboni)", name_bn: 'কক্সবাজার সদর (কলাতলী / লাবণী)', districtId: 'coxs-bazar', districtName: "Cox's Bazar", division: 'Chattogram', lat: 21.4272, lng: 92.0058, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'World Longest Sandy Beach & Iconic Rail Station' },
  { id: 'teknaf', name: 'Teknaf', name_bn: 'টেকনাফ', districtId: 'coxs-bazar', districtName: "Cox's Bazar", division: 'Chattogram', lat: 20.8667, lng: 92.3000, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Saint Martin Ship Jetty & Naf River' },
  { id: 'ramu', name: 'Ramu', name_bn: 'রামু', districtId: 'coxs-bazar', districtName: "Cox's Bazar", division: 'Chattogram', lat: 21.4500, lng: 92.1000, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Buddhist Monastery & Rubber Gardens' },
  { id: 'ukhia', name: 'Ukhia (Inani Beach)', name_bn: 'উখিয়া (ইনানী সৈকত)', districtId: 'coxs-bazar', districtName: "Cox's Bazar", division: 'Chattogram', lat: 21.2333, lng: 92.0833, transitHubType: 'Bus Terminal', popular_tag: 'Inani Coral Beach & Marine Drive' },
  { id: 'chakaria', name: 'Chakaria', name_bn: 'চকরিয়া', districtId: 'coxs-bazar', districtName: "Cox's Bazar", division: 'Chattogram', lat: 21.7500, lng: 92.0833, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Dulahazra Safari Park' },
  { id: 'maheshkhali', name: 'Maheshkhali Island', name_bn: 'মহেশখালী দ্বীপ', districtId: 'coxs-bazar', districtName: "Cox's Bazar", division: 'Chattogram', lat: 21.5500, lng: 91.9500, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Adinath Temple & Deep Sea Port' },
  { id: 'kutubdia', name: 'Kutubdia Island', name_bn: 'কুতুবদিয়া দ্বীপ', districtId: 'coxs-bazar', districtName: "Cox's Bazar", division: 'Chattogram', lat: 21.8167, lng: 91.8500, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Windmill Beach & Lighthouse' },
  { id: 'pekua', name: 'Pekua', name_bn: 'পেকুয়া', districtId: 'coxs-bazar', districtName: "Cox's Bazar", division: 'Chattogram', lat: 21.8000, lng: 91.9667, transitHubType: 'Local Stand' },
  { id: 'eidgaon', name: 'Eidgaon', name_bn: 'ঈদগাঁও', districtId: 'coxs-bazar', districtName: "Cox's Bazar", division: 'Chattogram', lat: 21.5500, lng: 92.0500, transitHubType: 'Railway Station', hasRailway: true },

  // Rangamati District
  { id: 'rangamati-sadar', name: 'Rangamati Sadar', name_bn: 'রাঙ্গামাটি সদর', districtId: 'rangamati', districtName: 'Rangamati', division: 'Chattogram', lat: 22.6533, lng: 92.1753, transitHubType: 'Bus Terminal', hasLaunchGhat: true, popular_tag: 'Kaptai Lake & Hanging Bridge' },
  { id: 'baghaichhari-sajek', name: 'Baghaichhari (Sajek Valley)', name_bn: 'বাঘাইছড়ি (সাজেক ভ্যালি)', districtId: 'rangamati', districtName: 'Rangamati', division: 'Chattogram', lat: 23.3820, lng: 92.2938, transitHubType: 'Local Stand', popular_tag: 'Sajek Valley (Valley of Clouds)' },
  { id: 'kaptai', name: 'Kaptai', name_bn: 'কাপ্তাই', districtId: 'rangamati', districtName: 'Rangamati', division: 'Chattogram', lat: 22.5000, lng: 92.2167, transitHubType: 'Local Stand', popular_tag: 'Kaptai Hydro Dam & Kayaking' },
  { id: 'barkal', name: 'Barkal (Shuvolong)', name_bn: 'বরকল (শুভলং ঝর্ণা)', districtId: 'rangamati', districtName: 'Rangamati', division: 'Chattogram', lat: 22.7333, lng: 92.3667, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Shuvolong Waterfall' },
  { id: 'langadu', name: 'Langadu', name_bn: 'লংগদু', districtId: 'rangamati', districtName: 'Rangamati', division: 'Chattogram', lat: 22.9500, lng: 92.1500, transitHubType: 'Launch Ghat', hasLaunchGhat: true },
  { id: 'naniarchar', name: 'Naniarchar', name_bn: 'নানিয়ারচর', districtId: 'rangamati', districtName: 'Rangamati', division: 'Chattogram', lat: 22.8667, lng: 92.1167, transitHubType: 'Local Stand' },
  { id: 'kawkhali-rangamati', name: 'Kawkhali (Betbunia)', name_bn: 'কাউখালী (বেতবুনিয়া)', districtId: 'rangamati', districtName: 'Rangamati', division: 'Chattogram', lat: 22.5833, lng: 92.0500, transitHubType: 'Local Stand', popular_tag: 'First Satellite Ground Station' },
  { id: 'jurachhari', name: 'Jurachhari', name_bn: 'জুরাছড়ি', districtId: 'rangamati', districtName: 'Rangamati', division: 'Chattogram', lat: 22.6667, lng: 92.3833, transitHubType: 'Launch Ghat', hasLaunchGhat: true },
  { id: 'belaichhari', name: 'Belaichhari', name_bn: 'বিলাইছড়ি', districtId: 'rangamati', districtName: 'Rangamati', division: 'Chattogram', lat: 22.4833, lng: 92.3833, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Dhuppani & Muppochhori Waterfalls' },
  { id: 'rajasthali', name: 'Rajasthali', name_bn: 'রাজস্থলী', districtId: 'rangamati', districtName: 'Rangamati', division: 'Chattogram', lat: 22.3833, lng: 92.2500, transitHubType: 'Local Stand' },

  // Bandarban District
  { id: 'bandarban-sadar', name: 'Bandarban Sadar (Nilachal/Meghla)', name_bn: 'বান্দরবান সদর (নীলাচল / মেঘলা)', districtId: 'bandarban', districtName: 'Bandarban', division: 'Chattogram', lat: 22.1953, lng: 92.2184, transitHubType: 'Bus Terminal', popular_tag: 'Nilachal Peak & Golden Temple' },
  { id: 'ruma', name: 'Ruma (Boga Lake & Keokradong)', name_bn: 'রুমা (বগালেক ও কেওক্রাডং)', districtId: 'bandarban', districtName: 'Bandarban', division: 'Chattogram', lat: 22.0500, lng: 92.4167, transitHubType: 'Local Stand', popular_tag: 'Boga Lake & Keokradong Peak' },
  { id: 'thanchi', name: 'Thanchi (Nafakhum/Amiakhum)', name_bn: 'থানচি (নাফাকুম ও অমিয়কুম)', districtId: 'bandarban', districtName: 'Bandarban', division: 'Chattogram', lat: 21.7833, lng: 92.4333, transitHubType: 'Local Stand', popular_tag: 'Nafakhum, Remakri & Sangu River' },
  { id: 'alikadam', name: 'Alikadam (Dim Pahar/Ali Cave)', name_bn: 'আলীকদম (ডিম পাহাড় ও আলীর গুহা)', districtId: 'bandarban', districtName: 'Bandarban', division: 'Chattogram', lat: 21.6500, lng: 92.3000, transitHubType: 'Local Stand', popular_tag: 'Highest Paved Road (Dim Pahar)' },
  { id: 'lama', name: 'Lama', name_bn: 'লামা', districtId: 'bandarban', districtName: 'Bandarban', division: 'Chattogram', lat: 21.7667, lng: 92.2000, transitHubType: 'Local Stand', popular_tag: 'Mirinja Valley' },
  { id: 'naikhongchhari', name: 'Naikhongchhari', name_bn: 'নাইক্ষ্যংছড়ি', districtId: 'bandarban', districtName: 'Bandarban', division: 'Chattogram', lat: 21.4167, lng: 92.1833, transitHubType: 'Local Stand', popular_tag: 'Upaban Lake' },
  { id: 'rowangchhari', name: 'Rowangchhari (Debotakhum)', name_bn: 'রোয়াংছড়ি (দেবতাখুম)', districtId: 'bandarban', districtName: 'Bandarban', division: 'Chattogram', lat: 22.1667, lng: 92.3500, transitHubType: 'Local Stand', popular_tag: 'Debotakhum Bamboo Rafting' },

  // Khagrachhari District
  { id: 'khagrachhari-sadar', name: 'Khagrachhari Sadar (Alutila Cave)', name_bn: 'খাগড়াছড়ি সদর (আলুটিলা গুহা)', districtId: 'khagrachhari', districtName: 'Khagrachhari', division: 'Chattogram', lat: 23.1192, lng: 91.9846, transitHubType: 'Bus Terminal', popular_tag: 'Alutila Mysterious Cave & Tareng' },
  { id: 'dighinala', name: 'Dighinala', name_bn: 'দীঘিনালা', districtId: 'khagrachhari', districtName: 'Khagrachhari', division: 'Chattogram', lat: 23.2500, lng: 92.0500, transitHubType: 'Bus Terminal', popular_tag: 'Gateway to Sajek Valley' },
  { id: 'matiranga', name: 'Matiranga (Richhang Falls)', name_bn: 'মাটিরাঙ্গা (রিছাং ঝর্ণা)', districtId: 'khagrachhari', districtName: 'Khagrachhari', division: 'Chattogram', lat: 23.0500, lng: 91.8833, transitHubType: 'Local Stand', popular_tag: 'Richhang Waterfall' },
  { id: 'ramgarh', name: 'Ramgarh', name_bn: 'রামগড়', districtId: 'khagrachhari', districtName: 'Khagrachhari', division: 'Chattogram', lat: 22.9667, lng: 91.7000, transitHubType: 'Local Stand', popular_tag: 'Maitri Bridge Border' },
  { id: 'panchhari', name: 'Panchhari', name_bn: 'পানছড়ি', districtId: 'khagrachhari', districtName: 'Khagrachhari', division: 'Chattogram', lat: 23.3000, lng: 91.9000, transitHubType: 'Local Stand', popular_tag: 'Shantipur Forest Monastery' },
  { id: 'mahalchhari', name: 'Mahalchhari', name_bn: 'মহালছড়ি', districtId: 'khagrachhari', districtName: 'Khagrachhari', division: 'Chattogram', lat: 22.9167, lng: 92.0333, transitHubType: 'Local Stand' },
  { id: 'manikchhari', name: 'Manikchhari', name_bn: 'মানিকছড়ি', districtId: 'khagrachhari', districtName: 'Khagrachhari', division: 'Chattogram', lat: 22.8333, lng: 91.8333, transitHubType: 'Local Stand' },
  { id: 'lakshmichhari', name: 'Lakshmichhari', name_bn: 'লক্ষ্মীছড়ি', districtId: 'khagrachhari', districtName: 'Khagrachhari', division: 'Chattogram', lat: 22.8000, lng: 91.9000, transitHubType: 'Local Stand' },
  { id: 'guimara', name: 'Guimara', name_bn: 'গুইমারা', districtId: 'khagrachhari', districtName: 'Khagrachhari', division: 'Chattogram', lat: 22.9667, lng: 91.8333, transitHubType: 'Local Stand' },

  // Cumilla District
  { id: 'cumilla-sadar', name: 'Cumilla Sadar (Kotwali/Shalban)', name_bn: 'কুমিল্লা সদর (শালবন বিহার)', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.4682, lng: 91.1788, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Shalban Buddhist Vihara & Authentic Rasmalai' },
  { id: 'daudkandi', name: 'Daudkandi', name_bn: 'দাউদকান্দি', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.5333, lng: 90.7167, transitHubType: 'Highways Junction', popular_tag: 'Meghna-Gomti Bridge Gateway' },
  { id: 'chauddagram', name: 'Chauddagram', name_bn: 'চৌদ্দগ্রাম', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.2167, lng: 91.3167, transitHubType: 'Highways Junction' },
  { id: 'laksam', name: 'Laksam', name_bn: 'লাকসাম', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.2333, lng: 91.1333, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Major Railway Junction' },
  { id: 'chandina', name: 'Chandina', name_bn: 'চান্দিনা', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.4833, lng: 91.0000, transitHubType: 'Highways Junction' },
  { id: 'burichang', name: 'Burichang', name_bn: 'বুড়িচং', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.5500, lng: 91.1333, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'brahmanpara', name: 'Brahmanpara', name_bn: 'ব্রাহ্মণপাড়া', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.6167, lng: 91.1167, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'debidwar', name: 'Debidwar', name_bn: 'দেবীদ্বার', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.6000, lng: 90.9833, transitHubType: 'Local Stand' },
  { id: 'homna', name: 'Homna', name_bn: 'হোমনা', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.6833, lng: 90.7833, transitHubType: 'Local Stand' },
  { id: 'muradnagar', name: 'Muradnagar', name_bn: 'মুরাদনগর', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.6500, lng: 90.9333, transitHubType: 'Local Stand' },
  { id: 'nangalkot', name: 'Nangalkot', name_bn: 'নাঙ্গলকোট', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.1667, lng: 91.2000, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'barura', name: 'Barura', name_bn: 'বরুড়া', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.3667, lng: 91.0500, transitHubType: 'Local Stand' },
  { id: 'lalmai', name: 'Lalmai', name_bn: 'লালমাই', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.3500, lng: 91.1500, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Lalmai Hills & Archaeological Sites' },
  { id: 'meghna', name: 'Meghna', name_bn: 'মেঘনা', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.6333, lng: 90.6833, transitHubType: 'Local Stand' },
  { id: 'titas', name: 'Titas', name_bn: 'তিতাস', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.5833, lng: 90.8000, transitHubType: 'Local Stand' },
  { id: 'monohargonj', name: 'Monohargonj', name_bn: 'মনোহরগঞ্জ', districtId: 'cumilla', districtName: 'Cumilla', division: 'Chattogram', lat: 23.1167, lng: 91.1333, transitHubType: 'Local Stand' },

  // Feni District
  { id: 'feni-sadar', name: 'Feni Sadar', name_bn: 'ফেনী সদর', districtId: 'feni', districtName: 'Feni', division: 'Chattogram', lat: 23.0186, lng: 91.3966, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Bijoy Singh Dighi & Highway Rest Stop' },
  { id: 'chhagalnaiya', name: 'Chhagalnaiya', name_bn: 'ছাগলনাইয়া', districtId: 'feni', districtName: 'Feni', division: 'Chattogram', lat: 23.0333, lng: 91.5167, transitHubType: 'Local Stand', popular_tag: 'Shamser Gazi Fort' },
  { id: 'daganbhuiyan', name: 'Daganbhuiyan', name_bn: 'দাগনভূঞা', districtId: 'feni', districtName: 'Feni', division: 'Chattogram', lat: 22.9333, lng: 91.3000, transitHubType: 'Local Stand', popular_tag: 'Language Martyr Salam Memorial' },
  { id: 'sonagazi', name: 'Sonagazi (Muhuri Project)', name_bn: 'সোনাগাজী (মুহুরী প্রজেক্ট)', districtId: 'feni', districtName: 'Feni', division: 'Chattogram', lat: 22.8500, lng: 91.3833, transitHubType: 'Local Stand', popular_tag: 'Muhuri Dam & Wind Energy Park' },
  { id: 'parshuram', name: 'Parshuram', name_bn: 'পরশুরাম', districtId: 'feni', districtName: 'Feni', division: 'Chattogram', lat: 23.2167, lng: 91.4333, transitHubType: 'Local Stand', popular_tag: 'Bilonia Border Heritage' },
  { id: 'fulgazi', name: 'Fulgazi', name_bn: 'ফুলগাজী', districtId: 'feni', districtName: 'Feni', division: 'Chattogram', lat: 23.1333, lng: 91.4167, transitHubType: 'Local Stand' },

  // Brahmanbaria District
  { id: 'brahmanbaria-sadar', name: 'Brahmanbaria Sadar', name_bn: 'ব্রাহ্মণবাড়িয়া সদর', districtId: 'brahmanbaria', districtName: 'Brahmanbaria', division: 'Chattogram', lat: 23.9571, lng: 91.1119, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Chhanar Mukhi & Cultural Heritage' },
  { id: 'ashuganj', name: 'Ashuganj', name_bn: 'আশুগঞ্জ', districtId: 'brahmanbaria', districtName: 'Brahmanbaria', division: 'Chattogram', lat: 24.0333, lng: 91.0000, transitHubType: 'Railway Station', hasRailway: true, hasLaunchGhat: true, popular_tag: 'Meghna River Port & Power Hub' },
  { id: 'akhaura', name: 'Akhaura', name_bn: 'আখাউড়া', districtId: 'brahmanbaria', districtName: 'Brahmanbaria', division: 'Chattogram', lat: 23.8667, lng: 91.2167, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'International Land Port & Railway Junction' },
  { id: 'sarail', name: 'Sarail', name_bn: 'সরাইল', districtId: 'brahmanbaria', districtName: 'Brahmanbaria', division: 'Chattogram', lat: 24.1167, lng: 91.1167, transitHubType: 'Local Stand', popular_tag: 'Sarail Hound & Hatirpul' },
  { id: 'kasba', name: 'Kasba', name_bn: 'কসবা', districtId: 'brahmanbaria', districtName: 'Brahmanbaria', division: 'Chattogram', lat: 23.7333, lng: 91.1667, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Kalyasagar Dighi' },
  { id: 'nabinagar', name: 'Nabinagar', name_bn: 'নবীনগর', districtId: 'brahmanbaria', districtName: 'Brahmanbaria', division: 'Chattogram', lat: 23.8833, lng: 90.9667, transitHubType: 'Local Stand' },
  { id: 'bancharampur', name: 'Bancharampur', name_bn: 'বাঞ্ছারামপুর', districtId: 'brahmanbaria', districtName: 'Brahmanbaria', division: 'Chattogram', lat: 23.7667, lng: 90.8167, transitHubType: 'Local Stand' },
  { id: 'nasirnagar', name: 'Nasirnagar', name_bn: 'নাসিরনগর', districtId: 'brahmanbaria', districtName: 'Brahmanbaria', division: 'Chattogram', lat: 24.2000, lng: 91.2000, transitHubType: 'Local Stand' },
  { id: 'bijoynagar', name: 'Bijoynagar', name_bn: 'বিজয়নগর', districtId: 'brahmanbaria', districtName: 'Brahmanbaria', division: 'Chattogram', lat: 24.0167, lng: 91.2667, transitHubType: 'Railway Station', hasRailway: true },

  // Noakhali District
  { id: 'noakhali-sadar', name: 'Noakhali Sadar (Maijdee)', name_bn: 'নোয়াখালী সদর (মাইজদী)', districtId: 'noakhali', districtName: 'Noakhali', division: 'Chattogram', lat: 22.8696, lng: 91.0993, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'hatiya', name: 'Hatiya (Nijhum Dwip)', name_bn: 'হাতিয়া (নিঝুম দ্বীপ)', districtId: 'noakhali', districtName: 'Noakhali', division: 'Chattogram', lat: 22.2833, lng: 91.1000, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Nijhum Dwip Spotted Deer Island' },
  { id: 'begumganj', name: 'Begumganj (Chowmuhani)', name_bn: 'বেগমগঞ্জ (চৌমুহনী)', districtId: 'noakhali', districtName: 'Noakhali', division: 'Chattogram', lat: 22.9500, lng: 91.1000, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Chowmuhani Business & Railway Hub' },
  { id: 'companiganj-noakhali', name: 'Companiganj (Basurhat)', name_bn: 'কোম্পানীগঞ্জ (বসুরহাট)', districtId: 'noakhali', districtName: 'Noakhali', division: 'Chattogram', lat: 22.7500, lng: 91.2833, transitHubType: 'Local Stand', popular_tag: 'Muchapur Closer Eco Beach' },
  { id: 'chatkhil', name: 'Chatkhil', name_bn: 'চাটখিল', districtId: 'noakhali', districtName: 'Noakhali', division: 'Chattogram', lat: 23.0500, lng: 90.9667, transitHubType: 'Local Stand' },
  { id: 'senbagh', name: 'Senbagh', name_bn: 'সেনবাগ', districtId: 'noakhali', districtName: 'Noakhali', division: 'Chattogram', lat: 22.9833, lng: 91.2333, transitHubType: 'Local Stand' },
  { id: 'sonaimuri', name: 'Sonaimuri', name_bn: 'সোনাইমুড়ী', districtId: 'noakhali', districtName: 'Noakhali', division: 'Chattogram', lat: 23.0333, lng: 91.1000, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Gandhi Ashram Trust' },
  { id: 'subarnachar', name: 'Subarnachar', name_bn: 'সুবর্ণচর', districtId: 'noakhali', districtName: 'Noakhali', division: 'Chattogram', lat: 22.6833, lng: 91.1500, transitHubType: 'Local Stand' },
  { id: 'kabirhat', name: 'Kabirhat', name_bn: 'কবিরহাট', districtId: 'noakhali', districtName: 'Noakhali', division: 'Chattogram', lat: 22.8333, lng: 91.2000, transitHubType: 'Local Stand' },

  // Chandpur District
  { id: 'chandpur-sadar', name: 'Chandpur Sadar (Mollahata/Launch Ghat)', name_bn: 'চাঁদপুর সদর (মোল্লাহাটা / মোহনা)', districtId: 'chandpur', districtName: 'Chandpur', division: 'Chattogram', lat: 23.2333, lng: 90.6667, transitHubType: 'Launch Ghat', hasRailway: true, hasLaunchGhat: true, popular_tag: 'Padma-Meghna River Confluence & Hilsa Capital' },
  { id: 'haziganj', name: 'Haziganj', name_bn: 'হাজীগঞ্জ', districtId: 'chandpur', districtName: 'Chandpur', division: 'Chattogram', lat: 23.2500, lng: 90.8500, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Historic Haziganj Boro Mosque' },
  { id: 'faridganj', name: 'Faridganj', name_bn: 'ফরিদগঞ্জ', districtId: 'chandpur', districtName: 'Chandpur', division: 'Chattogram', lat: 23.1333, lng: 90.7500, transitHubType: 'Local Stand', popular_tag: 'Rupsha Zamindar Bari' },
  { id: 'shahrasti', name: 'Shahrasti', name_bn: 'শাহরাস্তি', districtId: 'chandpur', districtName: 'Chandpur', division: 'Chattogram', lat: 23.2167, lng: 90.9500, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Hazrat Rastisaha Dargah' },
  { id: 'matlab-dakshin', name: 'Matlab Dakshin', name_bn: 'মতলব দক্ষিণ', districtId: 'chandpur', districtName: 'Chandpur', division: 'Chattogram', lat: 23.3500, lng: 90.7000, transitHubType: 'Local Stand', popular_tag: 'ICDDRB Health Research Campus' },
  { id: 'matlab-uttar', name: 'Matlab Uttar', name_bn: 'মতলব উত্তর', districtId: 'chandpur', districtName: 'Chandpur', division: 'Chattogram', lat: 23.4667, lng: 90.6333, transitHubType: 'Local Stand' },
  { id: 'kachua-chandpur', name: 'Kachua', name_bn: 'কচুয়া', districtId: 'chandpur', districtName: 'Chandpur', division: 'Chattogram', lat: 23.3500, lng: 90.9000, transitHubType: 'Local Stand' },
  { id: 'haimchar', name: 'Haimchar', name_bn: 'হাইমচর', districtId: 'chandpur', districtName: 'Chandpur', division: 'Chattogram', lat: 23.0667, lng: 90.6333, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Meghna River Char Islands' },

  // Lakshmipur District
  { id: 'lakshmipur-sadar', name: 'Lakshmipur Sadar', name_bn: 'লক্ষ্মীপুর সদর', districtId: 'lakshmipur', districtName: 'Lakshmipur', division: 'Chattogram', lat: 22.9425, lng: 90.8412, transitHubType: 'Bus Terminal' },
  { id: 'raipur-lakshmipur', name: 'Raipur', name_bn: 'রায়পুর', districtId: 'lakshmipur', districtName: 'Lakshmipur', division: 'Chattogram', lat: 23.0333, lng: 90.7667, transitHubType: 'Local Stand', popular_tag: 'Jinn Mosque (Masjid-e-Jame)' },
  { id: 'ramganj', name: 'Ramganj', name_bn: 'রামগঞ্জ', districtId: 'lakshmipur', districtName: 'Lakshmipur', division: 'Chattogram', lat: 23.1000, lng: 90.8667, transitHubType: 'Local Stand' },
  { id: 'ramgati', name: 'Ramgati (Alexander Ghat)', name_bn: 'রামগতি (আলেকজান্ডার ঘাট)', districtId: 'lakshmipur', districtName: 'Lakshmipur', division: 'Chattogram', lat: 22.6000, lng: 90.9000, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Char Alexander Coastal Park' },
  { id: 'kamalnagar', name: 'Kamalnagar', name_bn: 'কমলনগর', districtId: 'lakshmipur', districtName: 'Lakshmipur', division: 'Chattogram', lat: 22.7500, lng: 90.8667, transitHubType: 'Local Stand' },

  // --------------------------------------------------------------------------
  // 3. SYLHET DIVISION
  // --------------------------------------------------------------------------
  // Sylhet District
  { id: 'sylhet-sadar', name: 'Sylhet Sadar (Amberkhana/Zindabazar)', name_bn: 'সিলেট সদর (আম্বরখানা / জিন্দাবাজার)', districtId: 'sylhet', districtName: 'Sylhet', division: 'Sylhet', lat: 24.8949, lng: 91.8687, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Hazrat Shah Jalal Dargah & Keane Bridge' },
  { id: 'gowainghat', name: 'Gowainghat (Jaflong & Ratargul)', name_bn: 'গোয়াইনঘাট (জাফলং ও রাতারগুল)', districtId: 'sylhet', districtName: 'Sylhet', division: 'Sylhet', lat: 25.1634, lng: 92.0175, transitHubType: 'Local Stand', popular_tag: 'Jaflong Piyain River, Sangrampunji & Ratargul Swamp Forest' },
  { id: 'companiganj-sylhet', name: 'Companiganj (Bholaganj Sada Pathor)', name_bn: 'কোম্পানীগঞ্জ (ভোলাগঞ্জ সাদা পাথর)', districtId: 'sylhet', districtName: 'Sylhet', division: 'Sylhet', lat: 25.0833, lng: 91.7500, transitHubType: 'Local Stand', popular_tag: 'Bholaganj Sada Pathor Pristine Water' },
  { id: 'jaintiapur', name: 'Jaintiapur (Lalakhal)', name_bn: 'জৈন্তাপুর (লালাখাল)', districtId: 'sylhet', districtName: 'Sylhet', division: 'Sylhet', lat: 25.1333, lng: 92.1167, transitHubType: 'Local Stand', popular_tag: 'Lalakhal Emerald Blue Water & Jaintia Kingdom' },
  { id: 'fenchuganj', name: 'Fenchuganj', name_bn: 'ফেঞ্চুগঞ্জ', districtId: 'sylhet', districtName: 'Sylhet', division: 'Sylhet', lat: 24.7000, lng: 91.9333, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Kushiyara River & Fertilizer Complex' },
  { id: 'beanibazar', name: 'Beanibazar', name_bn: 'বিয়ানীবাজার', districtId: 'sylhet', districtName: 'Sylhet', division: 'Sylhet', lat: 24.8333, lng: 92.1667, transitHubType: 'Bus Terminal' },
  { id: 'golapganj', name: 'Golapganj', name_bn: 'গোলাপগঞ্জ', districtId: 'sylhet', districtName: 'Sylhet', division: 'Sylhet', lat: 24.8667, lng: 92.0167, transitHubType: 'Local Stand', popular_tag: 'Sylhet Gas Fields' },
  { id: 'bishwanath', name: 'Bishwanath', name_bn: 'বিশ্বনাথ', districtId: 'sylhet', districtName: 'Sylhet', division: 'Sylhet', lat: 24.8167, lng: 91.7333, transitHubType: 'Local Stand' },
  { id: 'kanaighat', name: 'Kanaighat (Lobhachhora)', name_bn: 'কানাইঘাট (লোভাছড়া)', districtId: 'sylhet', districtName: 'Sylhet', division: 'Sylhet', lat: 25.0167, lng: 92.2500, transitHubType: 'Local Stand', popular_tag: 'Lobhachhora Tea Estate & Stone Quarry' },
  { id: 'zakiganj', name: 'Zakiganj', name_bn: 'জকিগঞ্জ', districtId: 'sylhet', districtName: 'Sylhet', division: 'Sylhet', lat: 24.8833, lng: 92.3667, transitHubType: 'Local Stand', popular_tag: 'Surma-Kushiyara Confluence (Amalshid)' },
  { id: 'south-surma', name: 'South Surma (Kadamtali Bus/Rail Hub)', name_bn: 'দক্ষিণ সুরমা (কদমতলী বাস/রেল হাব)', districtId: 'sylhet', districtName: 'Sylhet', division: 'Sylhet', lat: 24.8700, lng: 91.8600, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Central Intercity Transport Terminal' },
  { id: 'osmaninagar', name: 'Osmani Nagar', name_bn: 'ওসমানী নগর', districtId: 'sylhet', districtName: 'Sylhet', division: 'Sylhet', lat: 24.7500, lng: 91.7500, transitHubType: 'Highways Junction' },

  // Moulvibazar District
  { id: 'sreemangal', name: 'Sreemangal (Tea Capital)', name_bn: 'শ্রীমঙ্গল (চা রাজধানী)', districtId: 'moulvibazar', districtName: 'Moulvibazar', division: 'Sylhet', lat: 24.3065, lng: 91.7296, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Rolling Tea Gardens, Lawachara Rainforest & Baikka Beel' },
  { id: 'kamalganj', name: 'Kamalganj (Lawachara / Madhabpur Lake)', name_bn: 'কমলগঞ্জ (লাউয়াছড়া ও মাধবপুর লেক)', districtId: 'moulvibazar', districtName: 'Moulvibazar', division: 'Sylhet', lat: 24.3667, lng: 91.8667, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Madhabpur Lotus Lake & Manipuri Dance' },
  { id: 'moulvibazar-sadar', name: 'Moulvibazar Sadar', name_bn: 'মৌলভীবাজার সদর', districtId: 'moulvibazar', districtName: 'Moulvibazar', division: 'Sylhet', lat: 24.4833, lng: 91.7667, transitHubType: 'Bus Terminal', popular_tag: 'Manu River Barrage & Rubber Plantations' },
  { id: 'barlekha', name: 'Barlekha (Madhabkunda Waterfall)', name_bn: 'বড়লেখা (মাধবকুণ্ড ঝর্ণা)', districtId: 'moulvibazar', districtName: 'Moulvibazar', division: 'Sylhet', lat: 24.7000, lng: 92.2000, transitHubType: 'Local Stand', popular_tag: 'Madhabkunda Waterfall & Hakaluki Haor' },
  { id: 'kulaura', name: 'Kulaura', name_bn: 'কুলাউড়া', districtId: 'moulvibazar', districtName: 'Moulvibazar', division: 'Sylhet', lat: 24.5167, lng: 92.0333, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Major Railway Junction & Prithimpassa Palace' },
  { id: 'rajnagar', name: 'Rajnagar', name_bn: 'রাজনগর', districtId: 'moulvibazar', districtName: 'Moulvibazar', division: 'Sylhet', lat: 24.5333, lng: 91.8667, transitHubType: 'Local Stand' },
  { id: 'juri', name: 'Juri', name_bn: 'জুড়ী', districtId: 'moulvibazar', districtName: 'Moulvibazar', division: 'Sylhet', lat: 24.6000, lng: 92.1167, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Juri Valley & Lathitila Forest' },

  // Sunamganj District
  { id: 'tahirpur', name: 'Tahirpur (Tanguar Haor / Shimul Bagan)', name_bn: 'তাহিরপুর (টাঙ্গুয়ার হাওর ও শিমুল বাগান)', districtId: 'sunamganj', districtName: 'Sunamganj', division: 'Sylhet', lat: 25.1278, lng: 91.0744, transitHubType: 'Local Stand', popular_tag: 'Tanguar Haor Luxury Houseboats, Niladri Lake & Jadukata River' },
  { id: 'sunamganj-sadar', name: 'Sunamganj Sadar', name_bn: 'সুনামগঞ্জ সদর', districtId: 'sunamganj', districtName: 'Sunamganj', division: 'Sylhet', lat: 25.0658, lng: 91.4073, transitHubType: 'Bus Terminal', popular_tag: 'Hason Raja Museum & Surma River' },
  { id: 'chhatak', name: 'Chhatak', name_bn: 'ছাতক', districtId: 'sunamganj', districtName: 'Sunamganj', division: 'Sylhet', lat: 25.0500, lng: 91.6667, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Chhatak Cement Factory & Ropeway' },
  { id: 'jagannathpur', name: 'Jagannathpur', name_bn: 'জগন্নাথপুর', districtId: 'sunamganj', districtName: 'Sunamganj', division: 'Sylhet', lat: 24.7667, lng: 91.5500, transitHubType: 'Local Stand' },
  { id: 'derai', name: 'Derai', name_bn: 'দিরাই', districtId: 'sunamganj', districtName: 'Sunamganj', division: 'Sylhet', lat: 24.7833, lng: 91.3500, transitHubType: 'Local Stand' },
  { id: 'dharamposha', name: 'Dharamposha', name_bn: 'ধর্মপাশা', districtId: 'sunamganj', districtName: 'Sunamganj', division: 'Sylhet', lat: 24.9000, lng: 91.0167, transitHubType: 'Local Stand' },
  { id: 'jamalganj', name: 'Jamalganj', name_bn: 'জামালগঞ্জ', districtId: 'sunamganj', districtName: 'Sunamganj', division: 'Sylhet', lat: 25.0167, lng: 91.2333, transitHubType: 'Local Stand' },
  { id: 'sullah', name: 'Sullah', name_bn: 'শাল্লা', districtId: 'sunamganj', districtName: 'Sunamganj', division: 'Sylhet', lat: 24.6500, lng: 91.2500, transitHubType: 'Local Stand' },
  { id: 'bishwamvarpur', name: 'Bishwamvarpur', name_bn: 'বিশ্বম্ভরপুর', districtId: 'sunamganj', districtName: 'Sunamganj', division: 'Sylhet', lat: 25.2000, lng: 91.3000, transitHubType: 'Local Stand', popular_tag: 'Paharer Chura Viewpoint' },
  { id: 'dowarabazar', name: 'Dowarabazar', name_bn: 'দোয়ারাবাজার', districtId: 'sunamganj', districtName: 'Sunamganj', division: 'Sylhet', lat: 25.0500, lng: 91.5667, transitHubType: 'Local Stand' },
  { id: 'shantiganj', name: 'Shantiganj (Dakshin Sunamganj)', name_bn: 'শান্তিগঞ্জ (দক্ষিণ সুনামগঞ্জ)', districtId: 'sunamganj', districtName: 'Sunamganj', division: 'Sylhet', lat: 24.9500, lng: 91.4333, transitHubType: 'Local Stand' },
  { id: 'madhyanagar', name: 'Madhyanagar', name_bn: 'মধ্যনগর', districtId: 'sunamganj', districtName: 'Sunamganj', division: 'Sylhet', lat: 25.1000, lng: 90.9667, transitHubType: 'Local Stand' },

  // Habiganj District
  { id: 'habiganj-sadar', name: 'Habiganj Sadar', name_bn: 'হবিগঞ্জ সদর', districtId: 'habiganj', districtName: 'Habiganj', division: 'Sylhet', lat: 24.3749, lng: 91.4155, transitHubType: 'Bus Terminal' },
  { id: 'chunarughat', name: 'Chunarughat (Satchari National Park)', name_bn: 'চুনারুঘাট (সাতছড়ি জাতীয় উদ্যান)', districtId: 'habiganj', districtName: 'Habiganj', division: 'Sylhet', lat: 24.2167, lng: 91.5167, transitHubType: 'Local Stand', popular_tag: 'Satchari National Park & Tea Gardens' },
  { id: 'sayestaganj', name: 'Sayestaganj', name_bn: 'শায়েস্তাগঞ্জ', districtId: 'habiganj', districtName: 'Habiganj', division: 'Sylhet', lat: 24.2667, lng: 91.4667, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Major Intercity Train Junction' },
  { id: 'baniachong', name: 'Baniachong', name_bn: 'বানিয়াচং', districtId: 'habiganj', districtName: 'Habiganj', division: 'Sylhet', lat: 24.5167, lng: 91.3667, transitHubType: 'Local Stand', popular_tag: 'Largest Village in Asia & Kamalamukhi Dighi' },
  { id: 'bahubal', name: 'Bahubal', name_bn: 'বাহুবল', districtId: 'habiganj', districtName: 'Habiganj', division: 'Sylhet', lat: 24.3500, lng: 91.5500, transitHubType: 'Highways Junction', popular_tag: 'The Palace Luxury Resort' },
  { id: 'madhabpur', name: 'Madhabpur', name_bn: 'মাধবপুর', districtId: 'habiganj', districtName: 'Habiganj', division: 'Sylhet', lat: 24.1000, lng: 91.3000, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'nabiganj', name: 'Nabiganj', name_bn: 'নবীগঞ্জ', districtId: 'habiganj', districtName: 'Habiganj', division: 'Sylhet', lat: 24.5667, lng: 91.5167, transitHubType: 'Local Stand' },
  { id: 'ajmiriganj', name: 'Ajmiriganj', name_bn: 'আজমিরীগঞ্জ', districtId: 'habiganj', districtName: 'Habiganj', division: 'Sylhet', lat: 24.5500, lng: 91.2500, transitHubType: 'Launch Ghat', hasLaunchGhat: true },
  { id: 'lakhai', name: 'Lakhai', name_bn: 'লাখাই', districtId: 'habiganj', districtName: 'Habiganj', division: 'Sylhet', lat: 24.2833, lng: 91.2167, transitHubType: 'Local Stand' },

  // --------------------------------------------------------------------------
  // 4. RAJSHAHI DIVISION
  // --------------------------------------------------------------------------
  // Rajshahi District
  { id: 'rajshahi-sadar', name: 'Rajshahi City (Shaheb Bazar/Shiroil)', name_bn: 'রাজশাহী সদর (সাহেব বাজার / শিরোইল)', districtId: 'rajshahi', districtName: 'Rajshahi', division: 'Rajshahi', lat: 24.3745, lng: 88.6042, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Silk City, Padma River Park & Varendra Museum' },
  { id: 'puthia', name: 'Puthia', name_bn: 'পুঠিয়া', districtId: 'rajshahi', districtName: 'Rajshahi', division: 'Rajshahi', lat: 24.3667, lng: 88.8333, transitHubType: 'Local Stand', popular_tag: 'Puthia Historic Terracotta Temple Complex & Palace' },
  { id: 'bagha', name: 'Bagha', name_bn: 'বাঘা', districtId: 'rajshahi', districtName: 'Rajshahi', division: 'Rajshahi', lat: 24.1833, lng: 88.7667, transitHubType: 'Local Stand', popular_tag: 'Historic 1523 AD Bagha Shahi Mosque (50 Taka note)' },
  { id: 'godagari', name: 'Godagari', name_bn: 'গোদাগাড়ী', districtId: 'rajshahi', districtName: 'Rajshahi', division: 'Rajshahi', lat: 24.4667, lng: 88.3333, transitHubType: 'Local Stand', popular_tag: 'Padma-Mahananda River Confluence' },
  { id: 'charghat', name: 'Charghat', name_bn: 'চারঘাট', districtId: 'rajshahi', districtName: 'Rajshahi', division: 'Rajshahi', lat: 24.2833, lng: 88.7500, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Sarda Police Academy' },
  { id: 'tanore', name: 'Tanore', name_bn: 'তানোর', districtId: 'rajshahi', districtName: 'Rajshahi', division: 'Rajshahi', lat: 24.6000, lng: 88.5833, transitHubType: 'Local Stand' },
  { id: 'bagmara', name: 'Bagmara', name_bn: 'বাগমারা', districtId: 'rajshahi', districtName: 'Rajshahi', division: 'Rajshahi', lat: 24.5667, lng: 88.8000, transitHubType: 'Local Stand' },
  { id: 'mohonpur', name: 'Mohonpur', name_bn: 'মোহনপুর', districtId: 'rajshahi', districtName: 'Rajshahi', division: 'Rajshahi', lat: 24.5333, lng: 88.6500, transitHubType: 'Local Stand' },
  { id: 'durgapur-rajshahi', name: 'Durgapur', name_bn: 'দুর্গাপুর', districtId: 'rajshahi', districtName: 'Rajshahi', division: 'Rajshahi', lat: 24.4500, lng: 88.7667, transitHubType: 'Local Stand' },
  { id: 'paba', name: 'Paba', name_bn: 'পবা', districtId: 'rajshahi', districtName: 'Rajshahi', division: 'Rajshahi', lat: 24.4333, lng: 88.5833, transitHubType: 'Highways Junction' },

  // Bogura District
  { id: 'bogura-sadar', name: 'Bogura Sadar (Thana/Charmatha)', name_bn: 'বগুড়া সদর (চারমাথা)', districtId: 'bogura', districtName: 'Bogura', division: 'Rajshahi', lat: 24.8465, lng: 89.3777, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Famous Bogurar Doi & Highway Hub' },
  { id: 'shibganj-bogura', name: 'Shibganj (Mahasthangarh)', name_bn: 'শিবগঞ্জ (মহাস্থানগড়)', districtId: 'bogura', districtName: 'Bogura', division: 'Rajshahi', lat: 24.9667, lng: 89.3167, transitHubType: 'Local Stand', popular_tag: 'Mahasthangarh 3rd Century BC Ancient Citadel' },
  { id: 'sherpur-bogura', name: 'Sherpur', name_bn: 'শেরপুর', districtId: 'bogura', districtName: 'Bogura', division: 'Rajshahi', lat: 24.6667, lng: 89.4167, transitHubType: 'Highways Junction', popular_tag: 'Kherua Mosque (1582 AD)' },
  { id: 'sariakandi', name: 'Sariakandi', name_bn: 'সারিয়াকান্দি', districtId: 'bogura', districtName: 'Bogura', division: 'Rajshahi', lat: 24.8833, lng: 89.5667, transitHubType: 'Local Stand', popular_tag: 'Jamuna River Prem Jamuna Ghat' },
  { id: 'adamdighi', name: 'Adamdighi (Santahar)', name_bn: 'আদমদিঘী (সান্তাহার)', districtId: 'bogura', districtName: 'Bogura', division: 'Rajshahi', lat: 24.7833, lng: 88.9333, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Santahar Major Railway Junction' },
  { id: 'dhupchanchia', name: 'Dhupchanchia', name_bn: 'দুপচাঁচিয়া', districtId: 'bogura', districtName: 'Bogura', division: 'Rajshahi', lat: 24.8667, lng: 89.1667, transitHubType: 'Local Stand' },
  { id: 'gabtali', name: 'Gabtali', name_bn: 'গাবতলী', districtId: 'bogura', districtName: 'Bogura', division: 'Rajshahi', lat: 24.8833, lng: 89.4833, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Pora Daha Fish Mela' },
  { id: 'kahaloo', name: 'Kahaloo', name_bn: 'কাহালু', districtId: 'bogura', districtName: 'Bogura', division: 'Rajshahi', lat: 24.8167, lng: 89.2667, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'nandigram', name: 'Nandigram', name_bn: 'নন্দীগ্রাম', districtId: 'bogura', districtName: 'Bogura', division: 'Rajshahi', lat: 24.6833, lng: 89.2333, transitHubType: 'Local Stand' },
  { id: 'sahajanpur', name: 'Sahajanpur', name_bn: 'শাজাহানপুর', districtId: 'bogura', districtName: 'Bogura', division: 'Rajshahi', lat: 24.7833, lng: 89.4000, transitHubType: 'Local Stand' },
  { id: 'sonatala', name: 'Sonatala', name_bn: 'সোনাতলা', districtId: 'bogura', districtName: 'Bogura', division: 'Rajshahi', lat: 25.0000, lng: 89.4833, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'dhunat', name: 'Dhunat', name_bn: 'ধুনট', districtId: 'bogura', districtName: 'Bogura', division: 'Rajshahi', lat: 24.6833, lng: 89.5333, transitHubType: 'Local Stand' },

  // Naogaon District
  { id: 'naogaon-sadar', name: 'Naogaon Sadar', name_bn: 'নওগাঁ সদর', districtId: 'naogaon', districtName: 'Naogaon', division: 'Rajshahi', lat: 24.8103, lng: 88.9419, transitHubType: 'Bus Terminal', popular_tag: 'Dubalhati & Balihar Zamindar Bari' },
  { id: 'badalgachhi', name: 'Badalgachhi (Paharpur Mahavihara)', name_bn: 'বদলগাছী (পাহাড়পুর বৌদ্ধবিহার)', districtId: 'naogaon', districtName: 'Naogaon', division: 'Rajshahi', lat: 25.0333, lng: 88.9000, transitHubType: 'Local Stand', popular_tag: 'UNESCO Somapura Mahavihara (Paharpur)' },
  { id: 'manda', name: 'Manda (Kusumba Mosque)', name_bn: 'মান্দা (কুসুম্বা মসজিদ)', districtId: 'naogaon', districtName: 'Naogaon', division: 'Rajshahi', lat: 24.7833, lng: 88.6667, transitHubType: 'Local Stand', popular_tag: 'Historic 1558 AD Black Stone Kusumba Mosque' },
  { id: 'patnitala', name: 'Patnitala', name_bn: 'পত্নীতলা', districtId: 'naogaon', districtName: 'Naogaon', division: 'Rajshahi', lat: 25.0500, lng: 88.7333, transitHubType: 'Local Stand', popular_tag: 'Dibbiak Dighi' },
  { id: 'dhamoirhat', name: 'Dhamoirhat', name_bn: 'ধামইরহাট', districtId: 'naogaon', districtName: 'Naogaon', division: 'Rajshahi', lat: 25.1333, lng: 88.8500, transitHubType: 'Local Stand', popular_tag: 'Altadighi National Park' },
  { id: 'mohadevpur', name: 'Mohadevpur', name_bn: 'মহাদেবপুর', districtId: 'naogaon', districtName: 'Naogaon', division: 'Rajshahi', lat: 24.9167, lng: 88.7500, transitHubType: 'Local Stand' },
  { id: 'niamatpur', name: 'Niamatpur', name_bn: 'নিয়ামতপুর', districtId: 'naogaon', districtName: 'Naogaon', division: 'Rajshahi', lat: 24.8667, lng: 88.5667, transitHubType: 'Local Stand' },
  { id: 'porsha', name: 'Porsha', name_bn: 'পোরশা', districtId: 'naogaon', districtName: 'Naogaon', division: 'Rajshahi', lat: 25.0167, lng: 88.5167, transitHubType: 'Local Stand' },
  { id: 'sapahar', name: 'Sapahar', name_bn: 'সাপাহার', districtId: 'naogaon', districtName: 'Naogaon', division: 'Rajshahi', lat: 25.1167, lng: 88.5833, transitHubType: 'Local Stand', popular_tag: 'Jobai Beel Migratory Birds' },
  { id: 'raninagar', name: 'Raninagar', name_bn: 'রানীনগর', districtId: 'naogaon', districtName: 'Naogaon', division: 'Rajshahi', lat: 24.7333, lng: 88.9667, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'atrai', name: 'Atrai', name_bn: 'আত্রাই', districtId: 'naogaon', districtName: 'Naogaon', division: 'Rajshahi', lat: 24.6167, lng: 88.9667, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Rabindranath Tagore Kachharibari (Patisar)' },

  // Natore District
  { id: 'natore-sadar', name: 'Natore Sadar (Rani Bhabani Palace)', name_bn: 'নাটোর সদর (রাণী ভবানী রাজবাড়ি)', districtId: 'natore', districtName: 'Natore', division: 'Rajshahi', lat: 24.4206, lng: 88.9324, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Natore Rajbari, Uttara Ganabhaban & Authentic Kachagolla' },
  { id: 'singra', name: 'Singra (Chalan Beel)', name_bn: 'সিংড়া (চলনবিল)', districtId: 'natore', districtName: 'Natore', division: 'Rajshahi', lat: 24.5000, lng: 89.1500, transitHubType: 'Local Stand', popular_tag: 'Chalan Beel Wetland Ecosystem' },
  { id: 'bagatipara', name: 'Bagatipara (Dayarampur)', name_bn: 'বাগাতিপাড়া (দয়ারামপুর)', districtId: 'natore', districtName: 'Natore', division: 'Rajshahi', lat: 24.3167, lng: 88.9500, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Dayarampur Zamindar Palace' },
  { id: 'baraigram', name: 'Baraigram (Bonpara)', name_bn: 'বড়াইগ্রাম (বনপাড়া)', districtId: 'natore', districtName: 'Natore', division: 'Rajshahi', lat: 24.3000, lng: 89.1667, transitHubType: 'Highways Junction', popular_tag: 'Bonpara Strategic Highway Crossing' },
  { id: 'gurudaspur', name: 'Gurudaspur', name_bn: 'গুরুদাসপুর', districtId: 'natore', districtName: 'Natore', division: 'Rajshahi', lat: 24.3667, lng: 89.2500, transitHubType: 'Local Stand', popular_tag: 'Chalan Beel Museum' },
  { id: 'lalpur', name: 'Lalpur (Ishwardi Bypass)', name_bn: 'লালপুর', districtId: 'natore', districtName: 'Natore', division: 'Rajshahi', lat: 24.1833, lng: 88.9833, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Green Valleys Park & Sugar Mills' },
  { id: 'naldanga', name: 'Naldanga', name_bn: 'নলডাঙ্গা', districtId: 'natore', districtName: 'Natore', division: 'Rajshahi', lat: 24.5000, lng: 88.9500, transitHubType: 'Railway Station', hasRailway: true },

  // Chapainawabganj District
  { id: 'chapainawabganj-sadar', name: 'Chapainawabganj Sadar', name_bn: 'চাঁপাইনবাবগঞ্জ সদর', districtId: 'chapainawabganj', districtName: 'Chapainawabganj', division: 'Rajshahi', lat: 24.5965, lng: 88.2775, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Mango Capital of Bangladesh & Gambhira' },
  { id: 'shibganj-chapainawabganj', name: 'Shibganj (Choto Sona Mosque)', name_bn: 'শিবগঞ্জ (ছোট সোনা মসজিদ)', districtId: 'chapainawabganj', districtName: 'Chapainawabganj', division: 'Rajshahi', lat: 24.6833, lng: 88.1667, transitHubType: 'Local Stand', popular_tag: '1493 AD Historic Choto Sona Mosque & Tahakhana' },
  { id: 'gomastapur', name: 'Gomastapur (Rohanpur)', name_bn: 'গোমস্তাপুর (রহনপুর)', districtId: 'chapainawabganj', districtName: 'Chapainawabganj', division: 'Rajshahi', lat: 24.7833, lng: 88.2833, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Rohanpur Railway Junction' },
  { id: 'nachole', name: 'Nachole', name_bn: 'নাচোল', districtId: 'chapainawabganj', districtName: 'Chapainawabganj', division: 'Rajshahi', lat: 24.7333, lng: 88.4167, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Historic Tevaga Movement (Ila Mitra)' },
  { id: 'bholahat', name: 'Bholahat', name_bn: 'ভোলাহাট', districtId: 'chapainawabganj', districtName: 'Chapainawabganj', division: 'Rajshahi', lat: 24.8833, lng: 88.2500, transitHubType: 'Local Stand' },

  // Pabna District
  { id: 'pabna-sadar', name: 'Pabna Sadar', name_bn: 'পাবনা সদর', districtId: 'pabna', districtName: 'Pabna', division: 'Rajshahi', lat: 24.0064, lng: 89.2372, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Satsanga Ashram & Suchitra Sen Memorial' },
  { id: 'ishwardi', name: 'Ishwardi (Pakshi / Hardinge Bridge)', name_bn: 'ঈশ্বরদী (পাকশী / হার্ডিঞ্জ ব্রিজ)', districtId: 'pabna', districtName: 'Pabna', division: 'Rajshahi', lat: 24.1500, lng: 89.0667, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Hardinge Bridge, Lalon Shah Bridge & Rooppur Nuclear Plant' },
  { id: 'bera', name: 'Bera (Kashinathpur)', name_bn: 'বেড়া (কাশীনাথপুর)', districtId: 'pabna', districtName: 'Pabna', division: 'Rajshahi', lat: 24.0667, lng: 89.6167, transitHubType: 'Highways Junction' },
  { id: 'santhia', name: 'Santhia', name_bn: 'সাঁথিয়া', districtId: 'pabna', districtName: 'Pabna', division: 'Rajshahi', lat: 24.0500, lng: 89.5333, transitHubType: 'Local Stand' },
  { id: 'sujanagar', name: 'Sujanagar', name_bn: 'সুজানগর', districtId: 'pabna', districtName: 'Pabna', division: 'Rajshahi', lat: 23.9167, lng: 89.4333, transitHubType: 'Local Stand', popular_tag: 'Gajnar Beel' },
  { id: 'chatmohar', name: 'Chatmohar', name_bn: 'চাটমোহর', districtId: 'pabna', districtName: 'Pabna', division: 'Rajshahi', lat: 24.2333, lng: 89.2833, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Historic Shahi Mosque' },
  { id: 'bhangura', name: 'Bhangura', name_bn: 'ভাঙ্গুড়া', districtId: 'pabna', districtName: 'Pabna', division: 'Rajshahi', lat: 24.2167, lng: 89.4000, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'faridpur-pabna', name: 'Faridpur', name_bn: 'ফরিদপুর', districtId: 'pabna', districtName: 'Pabna', division: 'Rajshahi', lat: 24.1667, lng: 89.4500, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'atgharia', name: 'Atgharia', name_bn: 'আটঘরিয়া', districtId: 'pabna', districtName: 'Pabna', division: 'Rajshahi', lat: 24.1333, lng: 89.2500, transitHubType: 'Local Stand' },

  // Sirajganj District
  { id: 'sirajganj-sadar', name: 'Sirajganj Sadar', name_bn: 'সিরাজগঞ্জ সদর', districtId: 'sirajganj', districtName: 'Sirajganj', division: 'Rajshahi', lat: 24.4534, lng: 89.7008, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Jamuna River Hard Point Park' },
  { id: 'shahjadpur', name: 'Shahjadpur', name_bn: 'শাহজাদপুর', districtId: 'sirajganj', districtName: 'Sirajganj', division: 'Rajshahi', lat: 24.1833, lng: 89.6000, transitHubType: 'Local Stand', popular_tag: 'Rabindranath Tagore Kachharibari & Handloom Sarees' },
  { id: 'ullahpara', name: 'Ullahpara', name_bn: 'উল্লাপাড়া', districtId: 'sirajganj', districtName: 'Sirajganj', division: 'Rajshahi', lat: 24.3167, lng: 89.5667, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Major Railway Junction' },
  { id: 'belkuchi', name: 'Belkuchi', name_bn: 'বেলকুচি', districtId: 'sirajganj', districtName: 'Sirajganj', division: 'Rajshahi', lat: 24.2833, lng: 89.7000, transitHubType: 'Local Stand', popular_tag: 'Handloom Lungi/Saree Weaving Capital' },
  { id: 'kamarkhanda', name: 'Kamarkhanda (Jamuna Bridge West)', name_bn: 'কামারখন্দ (যমুনা সেতু পশ্চিম)', districtId: 'sirajganj', districtName: 'Sirajganj', division: 'Rajshahi', lat: 24.3667, lng: 89.6667, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Bangabandhu Jamuna Bridge West Station' },
  { id: 'raiganj', name: 'Raiganj', name_bn: 'রায়গঞ্জ', districtId: 'sirajganj', districtName: 'Sirajganj', division: 'Rajshahi', lat: 24.5167, lng: 89.5333, transitHubType: 'Local Stand' },
  { id: 'tarash', name: 'Tarash', name_bn: 'তাড়াশ', districtId: 'sirajganj', districtName: 'Sirajganj', division: 'Rajshahi', lat: 24.4333, lng: 89.3667, transitHubType: 'Local Stand', popular_tag: 'Chalan Beel Heart & Tarash Rajbari' },
  { id: 'kazipur', name: 'Kazipur', name_bn: 'কাজীপুর', districtId: 'sirajganj', districtName: 'Sirajganj', division: 'Rajshahi', lat: 24.6333, lng: 89.6500, transitHubType: 'Local Stand' },
  { id: 'chauhali', name: 'Chauhali', name_bn: 'চৌহালী', districtId: 'sirajganj', districtName: 'Sirajganj', division: 'Rajshahi', lat: 24.2167, lng: 89.7500, transitHubType: 'Launch Ghat', hasLaunchGhat: true },

  // Joypurhat District
  { id: 'joypurhat-sadar', name: 'Joypurhat Sadar', name_bn: 'জয়পুরহাট সদর', districtId: 'joypurhat', districtName: 'Joypurhat', division: 'Rajshahi', lat: 25.1015, lng: 89.0277, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Sugar Mills & Lokma Rajbari' },
  { id: 'panchbibi', name: 'Panchbibi', name_bn: 'পাঁচবিবি', districtId: 'joypurhat', districtName: 'Joypurhat', division: 'Rajshahi', lat: 25.1833, lng: 89.0167, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Atapara Border & Archaeological Sites' },
  { id: 'akkelpur', name: 'Akkelpur', name_bn: 'আক্কেলপুর', districtId: 'joypurhat', districtName: 'Joypurhat', division: 'Rajshahi', lat: 24.9667, lng: 89.0167, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'kalai', name: 'Kalai', name_bn: 'কালাই', districtId: 'joypurhat', districtName: 'Joypurhat', division: 'Rajshahi', lat: 25.0667, lng: 89.1833, transitHubType: 'Local Stand' },
  { id: 'khetlal', name: 'Khetlal', name_bn: 'ক্ষেতলাল', districtId: 'joypurhat', districtName: 'Joypurhat', division: 'Rajshahi', lat: 24.9833, lng: 89.1167, transitHubType: 'Local Stand' },

  // --------------------------------------------------------------------------
  // 5. KHULNA DIVISION
  // --------------------------------------------------------------------------
  // Khulna District
  { id: 'khulna-sadar', name: 'Khulna Sadar (Sonadanga / Royal)', name_bn: 'খুলনা সদর (সোনাডাঙ্গা)', districtId: 'khulna', districtName: 'Khulna', division: 'Khulna', lat: 22.8456, lng: 89.5403, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Gateway to Sundarbans & Spicy Chui Jhal' },
  { id: 'koyra', name: 'Koyra (Sundarbans South Range)', name_bn: 'কয়রা (সুন্দরবন দক্ষিণ রেঞ্জ)', districtId: 'khulna', districtName: 'Khulna', division: 'Khulna', lat: 22.3417, lng: 89.3000, transitHubType: 'Local Stand', popular_tag: 'Sundarbans Forest Station & Coastal Trail' },
  { id: 'dacope', name: 'Dacope (Chalna / Karamjal)', name_bn: 'দাকোপ (চালনা ও করমজল)', districtId: 'khulna', districtName: 'Khulna', division: 'Khulna', lat: 22.5667, lng: 89.5167, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Karamjal Crocodile & Deer Breeding Eco Park' },
  { id: 'paikgachha', name: 'Paikgachha', name_bn: 'পাইকগাছা', districtId: 'khulna', districtName: 'Khulna', division: 'Khulna', lat: 22.5833, lng: 89.3333, transitHubType: 'Local Stand', popular_tag: 'Sir PC Ray Ancestral Residence' },
  { id: 'dumuria', name: 'Dumuria', name_bn: 'ডুমুরিয়া', districtId: 'khulna', districtName: 'Khulna', division: 'Khulna', lat: 22.8000, lng: 89.4167, transitHubType: 'Highways Junction', popular_tag: 'Chui Jhal Delicacies' },
  { id: 'phultala', name: 'Phultala', name_bn: 'ফুলতলা', districtId: 'khulna', districtName: 'Khulna', division: 'Khulna', lat: 22.9667, lng: 89.4667, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'rupsha', name: 'Rupsha', name_bn: 'রূপসা', districtId: 'khulna', districtName: 'Khulna', division: 'Khulna', lat: 22.8167, lng: 89.5833, transitHubType: 'Highways Junction', popular_tag: 'Rupsha Bridge viewpoint' },
  { id: 'terokhada', name: 'Terokhada', name_bn: 'তেরখাদা', districtId: 'khulna', districtName: 'Khulna', division: 'Khulna', lat: 22.9333, lng: 89.6667, transitHubType: 'Local Stand' },
  { id: 'dighalia', name: 'Dighalia', name_bn: 'দিঘলিয়া', districtId: 'khulna', districtName: 'Khulna', division: 'Khulna', lat: 22.9000, lng: 89.5333, transitHubType: 'Local Stand' },
  { id: 'batiaghata', name: 'Batiaghata', name_bn: 'বটিয়াঘাটা', districtId: 'khulna', districtName: 'Khulna', division: 'Khulna', lat: 22.7500, lng: 89.5167, transitHubType: 'Local Stand' },

  // Bagerhat District
  { id: 'bagerhat-sadar', name: 'Bagerhat Sadar (Sixty Dome Mosque)', name_bn: 'বাগেরহাট সদর (ষাট গম্বুজ মসজিদ)', districtId: 'bagerhat', districtName: 'Bagerhat', division: 'Khulna', lat: 22.6516, lng: 89.7859, transitHubType: 'Bus Terminal', popular_tag: 'UNESCO 15th Century Sixty Dome Mosque & Khan Jahan Ali Tomb' },
  { id: 'mongla', name: 'Mongla Port (Kotka/Hiron Point)', name_bn: 'মোংলা পোর্ট (কোটকা ও হিরণ পয়েন্ট)', districtId: 'bagerhat', districtName: 'Bagerhat', division: 'Khulna', lat: 22.4833, lng: 89.6000, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Mongla Sea Port & Sundarbans Cruise Terminal' },
  { id: 'sarankhola', name: 'Sarankhola', name_bn: 'শরণখোলা', districtId: 'bagerhat', districtName: 'Bagerhat', division: 'Khulna', lat: 22.3167, lng: 89.7833, transitHubType: 'Local Stand', popular_tag: 'Sundarbans Eastern Gateway' },
  { id: 'morrelganj', name: 'Morrelganj', name_bn: 'মোড়েলগঞ্জ', districtId: 'bagerhat', districtName: 'Bagerhat', division: 'Khulna', lat: 22.4500, lng: 89.8500, transitHubType: 'Launch Ghat', hasLaunchGhat: true },
  { id: 'rampal', name: 'Rampal', name_bn: 'রামপাল', districtId: 'bagerhat', districtName: 'Bagerhat', division: 'Khulna', lat: 22.5667, lng: 89.6500, transitHubType: 'Local Stand' },
  { id: 'fakirhat', name: 'Fakirhat', name_bn: 'ফকিরহাট', districtId: 'bagerhat', districtName: 'Bagerhat', division: 'Khulna', lat: 22.7833, lng: 89.7000, transitHubType: 'Local Stand' },
  { id: 'mollahat', name: 'Mollahat', name_bn: 'মোল্লাহাট', districtId: 'bagerhat', districtName: 'Bagerhat', division: 'Khulna', lat: 22.9333, lng: 89.8000, transitHubType: 'Highways Junction' },
  { id: 'chitalmari', name: 'Chitalmari', name_bn: 'চিতলমারী', districtId: 'bagerhat', districtName: 'Bagerhat', division: 'Khulna', lat: 22.8000, lng: 89.8667, transitHubType: 'Local Stand' },
  { id: 'kachua-bagerhat', name: 'Kachua', name_bn: 'কচুয়া', districtId: 'bagerhat', districtName: 'Bagerhat', division: 'Khulna', lat: 22.6500, lng: 89.8833, transitHubType: 'Local Stand' },

  // Jashore District
  { id: 'jashore-sadar', name: 'Jashore Sadar (Churamonkathi)', name_bn: 'যশোর সদর', districtId: 'jashore', districtName: 'Jashore', division: 'Khulna', lat: 23.1664, lng: 89.2182, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Airport Hub & Date Palm Jaggery' },
  { id: 'jhikargachha', name: 'Jhikargachha (Gadkhali Flower Realm)', name_bn: 'ঝিকরগাছা (গদখালী ফুলের রাজধানী)', districtId: 'jashore', districtName: 'Jashore', division: 'Khulna', lat: 23.1000, lng: 89.1333, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Gadkhali Blooming Flower Fields' },
  { id: 'sharsha', name: 'Sharsha (Benapole Land Port)', name_bn: 'শার্শা (বেনাপোল স্থলবন্দর)', districtId: 'jashore', districtName: 'Jashore', division: 'Khulna', lat: 23.0667, lng: 88.9000, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Largest International Land Port (Benapole)' },
  { id: 'keshabpur', name: 'Keshabpur (Sagardari)', name_bn: 'কেশবপুর (সাগরদাঁড়ী)', districtId: 'jashore', districtName: 'Jashore', division: 'Khulna', lat: 22.9000, lng: 89.2167, transitHubType: 'Local Stand', popular_tag: 'Poet Michael Madhusudan Dutt Birthplace (Sagardari)' },
  { id: 'abhaynagar', name: 'Abhaynagar (Noapara Industrial Port)', name_bn: 'অভয়নগর (নওয়াপাড়া নদী বন্দর)', districtId: 'jashore', districtName: 'Jashore', division: 'Khulna', lat: 23.0167, lng: 89.4333, transitHubType: 'Railway Station', hasRailway: true, popular_tag: '11 Shiva Temple Complex' },
  { id: 'manirampur', name: 'Manirampur', name_bn: 'মণিরামপুর', districtId: 'jashore', districtName: 'Jashore', division: 'Khulna', lat: 23.0167, lng: 89.2333, transitHubType: 'Local Stand' },
  { id: 'chaugachha', name: 'Chaugachha', name_bn: 'চৌগাছা', districtId: 'jashore', districtName: 'Jashore', division: 'Khulna', lat: 23.2667, lng: 89.0833, transitHubType: 'Local Stand' },
  { id: 'bagherpara', name: 'Bagherpara', name_bn: 'বাঘারপাড়া', districtId: 'jashore', districtName: 'Jashore', division: 'Khulna', lat: 23.2167, lng: 89.3500, transitHubType: 'Local Stand' },

  // Satkhira District
  { id: 'satkhira-sadar', name: 'Satkhira Sadar', name_bn: 'সাতক্ষীরা সদর', districtId: 'satkhira', districtName: 'Satkhira', division: 'Khulna', lat: 22.7185, lng: 89.0705, transitHubType: 'Bus Terminal', popular_tag: 'Sundarbans Honey & Sandesh Sweet' },
  { id: 'shyamnagar', name: 'Shyamnagar (Munshiganj Eco Resorts)', name_bn: 'শ্যামনগর (মুন্সিগঞ্জ সুন্দরবন রিসোর্ট)', districtId: 'satkhira', districtName: 'Satkhira', division: 'Khulna', lat: 22.3333, lng: 89.1000, transitHubType: 'Local Stand', popular_tag: 'Western Sundarbans Eco-Resorts & Mangrove Trail' },
  { id: 'kaliganj-satkhira', name: 'Kaliganj', name_bn: 'কালীগঞ্জ', districtId: 'satkhira', districtName: 'Satkhira', division: 'Khulna', lat: 22.4500, lng: 89.0333, transitHubType: 'Local Stand' },
  { id: 'assasuni', name: 'Assasuni', name_bn: 'আশাশুনি', districtId: 'satkhira', districtName: 'Satkhira', division: 'Khulna', lat: 22.5500, lng: 89.1667, transitHubType: 'Local Stand' },
  { id: 'kalaroa', name: 'Kalaroa', name_bn: 'কলারোয়া', districtId: 'satkhira', districtName: 'Satkhira', division: 'Khulna', lat: 22.8667, lng: 89.0333, transitHubType: 'Local Stand' },
  { id: 'tala', name: 'Tala', name_bn: 'তালা', districtId: 'satkhira', districtName: 'Satkhira', division: 'Khulna', lat: 22.7500, lng: 89.2500, transitHubType: 'Local Stand' },
  { id: 'debhata', name: 'Debhata', name_bn: 'দেবহাটা', districtId: 'satkhira', districtName: 'Satkhira', division: 'Khulna', lat: 22.5667, lng: 88.9667, transitHubType: 'Local Stand', popular_tag: 'Historic Zamindar Houses & Ichamati River' },

  // Kushtia District
  { id: 'kushtia-sadar', name: 'Kushtia Sadar (Mohini Mills)', name_bn: 'কুষ্টিয়া সদর', districtId: 'kushtia', districtName: 'Kushtia', division: 'Khulna', lat: 23.9013, lng: 89.1204, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Tilotoli Sweets & Gorai River Bridge' },
  { id: 'kumarkhali', name: 'Kumarkhali (Lalon Shah Shrine & Shilaidaha)', name_bn: 'কুমারখালী (লালন মাজার ও শিলাইদহ)', districtId: 'kushtia', districtName: 'Kushtia', division: 'Khulna', lat: 23.8667, lng: 89.2500, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Fakir Lalon Shah Mazar & Tagore Kuthibari' },
  { id: 'bheramara', name: 'Bheramara (Hardinge Bridge South)', name_bn: 'ভেড়ামারা (পাকশী সেতু দক্ষিণ)', districtId: 'kushtia', districtName: 'Kushtia', division: 'Khulna', lat: 24.0167, lng: 88.9833, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'GK Irrigation Project' },
  { id: 'mirpur-kushtia', name: 'Mirpur (Poradah Railway Junction)', name_bn: 'মিরপুর (পোড়াদহ রেল জংশন)', districtId: 'kushtia', districtName: 'Kushtia', division: 'Khulna', lat: 23.9333, lng: 88.9833, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Poradah Famous Cloth Market' },
  { id: 'daulatpur-kushtia', name: 'Daulatpur', name_bn: 'দৌলতপুর', districtId: 'kushtia', districtName: 'Kushtia', division: 'Khulna', lat: 24.0000, lng: 88.8500, transitHubType: 'Local Stand' },
  { id: 'khoksa', name: 'Khoksa', name_bn: 'খোকসা', districtId: 'kushtia', districtName: 'Kushtia', division: 'Khulna', lat: 23.8000, lng: 89.2833, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Historic Kali Puja & Cane Industry' },

  // Meherpur District
  { id: 'meherpur-sadar', name: 'Meherpur Sadar', name_bn: 'মেহেরপুর সদর', districtId: 'meherpur', districtName: 'Meherpur', division: 'Khulna', lat: 23.7719, lng: 88.6318, transitHubType: 'Bus Terminal' },
  { id: 'mujibnagar', name: 'Mujibnagar', name_bn: 'মুজিবনগর', districtId: 'meherpur', districtName: 'Meherpur', division: 'Khulna', lat: 23.6500, lng: 88.6000, transitHubType: 'Local Stand', popular_tag: 'Mujibnagar 1971 Independence Memorial Complex' },
  { id: 'gangni', name: 'Gangni', name_bn: 'গাংনী', districtId: 'meherpur', districtName: 'Meherpur', division: 'Khulna', lat: 23.8000, lng: 88.7167, transitHubType: 'Local Stand', popular_tag: 'Bhatpara Neelkuthi' },

  // Chuadanga District
  { id: 'chuadanga-sadar', name: 'Chuadanga Sadar', name_bn: 'চুয়াডাঙ্গা সদর', districtId: 'chuadanga', districtName: 'Chuadanga', division: 'Khulna', lat: 23.6402, lng: 88.8418, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'damurhuda', name: 'Damurhuda (Darsana Border / Carew)', name_bn: 'দামুড়হুদা (দর্শনা ও কেরু)', districtId: 'chuadanga', districtName: 'Chuadanga', division: 'Khulna', lat: 23.5667, lng: 88.7500, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Carew & Co Sugar Distillery & Darsana Land Port' },
  { id: 'alamdanga', name: 'Alamdanga', name_bn: 'আলমডাঙ্গা', districtId: 'chuadanga', districtName: 'Chuadanga', division: 'Khulna', lat: 23.7667, lng: 88.9500, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'jibannagar', name: 'Jibannagar', name_bn: 'জীবননগর', districtId: 'chuadanga', districtName: 'Chuadanga', division: 'Khulna', lat: 23.4167, lng: 88.8333, transitHubType: 'Local Stand' },

  // Jhenaidah District
  { id: 'jhenaidah-sadar', name: 'Jhenaidah Sadar', name_bn: 'ঝিনাইদহ সদর', districtId: 'jhenaidah', districtName: 'Jhenaidah', division: 'Khulna', lat: 23.5450, lng: 89.1726, transitHubType: 'Bus Terminal' },
  { id: 'kaliganj-jhenaidah', name: 'Kaliganj (Naldanga / Mobarakganj)', name_bn: 'কালীগঞ্জ (নলডাঙ্গা ও মোবারকগঞ্জ)', districtId: 'jhenaidah', districtName: 'Jhenaidah', division: 'Khulna', lat: 23.4167, lng: 89.1333, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Naldanga Temple Complex & Sugar Mills' },
  { id: 'kotchandpur', name: 'Kotchandpur', name_bn: 'কোটচাঁদপুর', districtId: 'jhenaidah', districtName: 'Jhenaidah', division: 'Khulna', lat: 23.4000, lng: 88.9833, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'maheshpur', name: 'Maheshpur', name_bn: 'মহেশপুর', districtId: 'jhenaidah', districtName: 'Jhenaidah', division: 'Khulna', lat: 23.3500, lng: 88.9167, transitHubType: 'Local Stand' },
  { id: 'shailkupa', name: 'Shailkupa', name_bn: 'শৈলকুপা', districtId: 'jhenaidah', districtName: 'Jhenaidah', division: 'Khulna', lat: 23.6833, lng: 89.2500, transitHubType: 'Local Stand', popular_tag: 'Shailkupa Shahi Mosque & Ramgopal Temple' },
  { id: 'harinakundu', name: 'Harinakundu', name_bn: 'হরিণাকুণ্ডু', districtId: 'jhenaidah', districtName: 'Jhenaidah', division: 'Khulna', lat: 23.6500, lng: 89.0500, transitHubType: 'Local Stand' },

  // Magura District
  { id: 'magura-sadar', name: 'Magura Sadar', name_bn: 'মাগুরা সদর', districtId: 'magura', districtName: 'Magura', division: 'Khulna', lat: 23.4873, lng: 89.4198, transitHubType: 'Bus Terminal', popular_tag: 'Katayani Puja Mega Festival' },
  { id: 'sreepur-magura', name: 'Sreepur', name_bn: 'শ্রীপুর', districtId: 'magura', districtName: 'Magura', division: 'Khulna', lat: 23.6000, lng: 89.3833, transitHubType: 'Local Stand' },
  { id: 'shalikha', name: 'Shalikha', name_bn: 'শালিখা', districtId: 'magura', districtName: 'Magura', division: 'Khulna', lat: 23.3333, lng: 89.3667, transitHubType: 'Local Stand' },
  { id: 'mohammadpur', name: 'Mohammadpur', name_bn: 'মহম্মদপুর', districtId: 'magura', districtName: 'Magura', division: 'Khulna', lat: 23.4000, lng: 89.6000, transitHubType: 'Local Stand', popular_tag: 'Raja Sitaram Palace' },

  // Narail District
  { id: 'narail-sadar', name: 'Narail Sadar (SM Sultan Complex)', name_bn: 'নড়াইল সদর (এস এম সুলতান কমপ্লেক্স)', districtId: 'narail', districtName: 'Narail', division: 'Khulna', lat: 23.1725, lng: 89.5127, transitHubType: 'Bus Terminal', popular_tag: 'SM Sultan Shishu Swargo Art Gallery & Chitra River' },
  { id: 'lohagara-narail', name: 'Lohagara (Kalna Bridge)', name_bn: 'লোহাগড়া (কালনা সেতু)', districtId: 'narail', districtName: 'Narail', division: 'Khulna', lat: 23.1833, lng: 89.6500, transitHubType: 'Highways Junction', popular_tag: 'Madhumati (Kalna) 6-Lane Bridge' },
  { id: 'kalia', name: 'Kalia', name_bn: 'কালিয়া', districtId: 'narail', districtName: 'Narail', division: 'Khulna', lat: 23.0333, lng: 89.6333, transitHubType: 'Local Stand' },

  // --------------------------------------------------------------------------
  // 6. BARISHAL DIVISION
  // --------------------------------------------------------------------------
  // Barishal District
  { id: 'barishal-sadar', name: 'Barishal Sadar (Launch Ghat / Nathullabad)', name_bn: 'বরিশাল সদর (লঞ্চ ঘাট / নথুল্লাবাদ)', districtId: 'barishal', districtName: 'Barishal', division: 'Barishal', lat: 22.7010, lng: 90.3535, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Venice of Bengal, Guthia Mosque & Luxury Launch' },
  { id: 'banaripara', name: 'Banaripara (Floating Guava Market)', name_bn: 'বানারীপাড়া (ভাসমান পেয়ারা বাজার)', districtId: 'barishal', districtName: 'Barishal', division: 'Barishal', lat: 22.7833, lng: 90.1667, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Floating Guava Markets & Backwater Canals' },
  { id: 'wazirpur', name: 'Wazirpur (Guthia Mosque)', name_bn: 'উজিরপুর (গুঠিয়া মসজিদ)', districtId: 'barishal', districtName: 'Barishal', division: 'Barishal', lat: 22.8167, lng: 90.2500, transitHubType: 'Local Stand', popular_tag: 'Baitul Aman Guthia Mosque Complex' },
  { id: 'bakerganj', name: 'Bakerganj', name_bn: 'বাকেরগঞ্জ', districtId: 'barishal', districtName: 'Barishal', division: 'Barishal', lat: 22.5500, lng: 90.3333, transitHubType: 'Local Stand' },
  { id: 'babuganj', name: 'Babuganj (Barishal Airport)', name_bn: 'বাবুগঞ্জ (বরিশাল বিমানবন্দর)', districtId: 'barishal', districtName: 'Barishal', division: 'Barishal', lat: 22.8000, lng: 90.3167, transitHubType: 'Highways Junction', popular_tag: 'Barishal Domestic Airport' },
  { id: 'gaurnadi', name: 'Gaurnadi', name_bn: 'গৌরনদী', districtId: 'barishal', districtName: 'Barishal', division: 'Barishal', lat: 22.9667, lng: 90.2167, transitHubType: 'Highways Junction', popular_tag: 'Gaurnadi Sweet Curd' },
  { id: 'agailjhara', name: 'Agailjhara', name_bn: 'আগৈলঝাড়া', districtId: 'barishal', districtName: 'Barishal', division: 'Barishal', lat: 22.9833, lng: 90.1500, transitHubType: 'Local Stand' },
  { id: 'mehendiganj', name: 'Mehendiganj', name_bn: 'মেহেন্দিগঞ্জ', districtId: 'barishal', districtName: 'Barishal', division: 'Barishal', lat: 22.8333, lng: 90.5333, transitHubType: 'Launch Ghat', hasLaunchGhat: true },
  { id: 'muladi', name: 'Muladi', name_bn: 'মুলাদী', districtId: 'barishal', districtName: 'Barishal', division: 'Barishal', lat: 22.9167, lng: 90.4167, transitHubType: 'Launch Ghat', hasLaunchGhat: true },
  { id: 'hizla', name: 'Hizla', name_bn: 'হিজলা', districtId: 'barishal', districtName: 'Barishal', division: 'Barishal', lat: 22.9833, lng: 90.5000, transitHubType: 'Launch Ghat', hasLaunchGhat: true },

  // Patuakhali District
  { id: 'kalapara', name: 'Kalapara (Kuakata Sea Beach)', name_bn: 'কলাপাড়া (কুয়াকাটা সমুদ্র সৈকত)', districtId: 'patuakhali', districtName: 'Patuakhali', division: 'Barishal', lat: 21.8167, lng: 90.1167, transitHubType: 'Bus Terminal', hasLaunchGhat: true, popular_tag: 'Kuakata Daughter of Sea (Sunrise & Sunset Beach)' },
  { id: 'patuakhali-sadar', name: 'Patuakhali Sadar', name_bn: 'পটুয়াখালী সদর', districtId: 'patuakhali', districtName: 'Patuakhali', division: 'Barishal', lat: 22.3594, lng: 90.3297, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Payra Bridge & River Launch Port' },
  { id: 'galachipa', name: 'Galachipa', name_bn: 'গলাচিপা', districtId: 'patuakhali', districtName: 'Patuakhali', division: 'Barishal', lat: 22.1667, lng: 90.4167, transitHubType: 'Launch Ghat', hasLaunchGhat: true },
  { id: 'bauphal', name: 'Bauphal', name_bn: 'বাউফল', districtId: 'patuakhali', districtName: 'Patuakhali', division: 'Barishal', lat: 22.4167, lng: 90.5667, transitHubType: 'Local Stand' },
  { id: 'dashmina', name: 'Dashmina', name_bn: 'দশমিনা', districtId: 'patuakhali', districtName: 'Patuakhali', division: 'Barishal', lat: 22.2833, lng: 90.5833, transitHubType: 'Local Stand' },
  { id: 'mirzaganj', name: 'Mirzaganj (Yaruddin Khalifa Shrine)', name_bn: 'মির্জাগঞ্জ (ইয়ারুদ্দীন খলিফা মাজার)', districtId: 'patuakhali', districtName: 'Patuakhali', division: 'Barishal', lat: 22.3500, lng: 90.2333, transitHubType: 'Local Stand' },
  { id: 'dumki', name: 'Dumki (PSTU Campus)', name_bn: 'দুমকি', districtId: 'patuakhali', districtName: 'Patuakhali', division: 'Barishal', lat: 22.4500, lng: 90.3833, transitHubType: 'Local Stand', popular_tag: 'Patuakhali Science & Tech University' },
  { id: 'rangabali', name: 'Rangabali Island', name_bn: 'রাঙ্গাবালী দ্বীপ', districtId: 'patuakhali', districtName: 'Patuakhali', division: 'Barishal', lat: 21.9167, lng: 90.4667, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Sonarchar Wildlife Island' },

  // Bhola District
  { id: 'bhola-sadar', name: 'Bhola Sadar', name_bn: 'ভোলা সদর', districtId: 'bhola', districtName: 'Bhola', division: 'Barishal', lat: 22.6859, lng: 90.6481, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Largest Island District & Buffalo Milk Curd' },
  { id: 'char-fasson', name: 'Char Fasson (Jacob Tower / Kukri Mukri)', name_bn: 'চরফ্যাশন (জ্যাকব টাওয়ার ও কুকরি মুকরি)', districtId: 'bhola', districtName: 'Bhola', division: 'Barishal', lat: 22.1833, lng: 90.7167, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Jacob Tower 225ft & Char Kukri Mukri Island' },
  { id: 'manpura', name: 'Manpura Island', name_bn: 'মনপুরা দ্বীপ', districtId: 'bhola', districtName: 'Bhola', division: 'Barishal', lat: 22.3000, lng: 90.9667, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Isolated Sea Island & Deer Sanctuary' },
  { id: 'lalmohan', name: 'Lalmohan', name_bn: 'লালমোহন', districtId: 'bhola', districtName: 'Bhola', division: 'Barishal', lat: 22.3333, lng: 90.7333, transitHubType: 'Launch Ghat', hasLaunchGhat: true },
  { id: 'burhanuddin', name: 'Burhanuddin', name_bn: 'বোরহানউদ্দিন', districtId: 'bhola', districtName: 'Bhola', division: 'Barishal', lat: 22.5000, lng: 90.7167, transitHubType: 'Local Stand' },
  { id: 'daulatkhan', name: 'Daulatkhan', name_bn: 'দৌলতখান', districtId: 'bhola', districtName: 'Bhola', division: 'Barishal', lat: 22.6167, lng: 90.7667, transitHubType: 'Launch Ghat', hasLaunchGhat: true },
  { id: 'tazumuddin', name: 'Tazumuddin', name_bn: 'তজুমদ্দিন', districtId: 'bhola', districtName: 'Bhola', division: 'Barishal', lat: 22.4167, lng: 90.8333, transitHubType: 'Launch Ghat', hasLaunchGhat: true },

  // Jhalokathi District
  { id: 'jhalokathi-sadar', name: 'Jhalokathi Sadar (Bhimruli)', name_bn: 'ঝালকাঠি সদর (ভিমরুলি)', districtId: 'jhalokathi', districtName: 'Jhalokathi', division: 'Barishal', lat: 22.6406, lng: 90.1987, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Bhimruli Floating Guava & Amra Market' },
  { id: 'rajapur', name: 'Rajapur', name_bn: 'রাজাপুর', districtId: 'jhalokathi', districtName: 'Jhalokathi', division: 'Barishal', lat: 22.5667, lng: 90.1500, transitHubType: 'Local Stand', popular_tag: 'Sujabad Fort' },
  { id: 'nalchhiti', name: 'Nalchhiti', name_bn: 'নলছিটি', districtId: 'jhalokathi', districtName: 'Jhalokathi', division: 'Barishal', lat: 22.6000, lng: 90.2667, transitHubType: 'Local Stand' },
  { id: 'kathalia', name: 'Kathalia', name_bn: 'কাঠালিয়া', districtId: 'jhalokathi', districtName: 'Jhalokathi', division: 'Barishal', lat: 22.4167, lng: 90.1333, transitHubType: 'Local Stand' },

  // Pirojpur District
  { id: 'pirojpur-sadar', name: 'Pirojpur Sadar', name_bn: 'পিরোজপুর সদর', districtId: 'pirojpur', districtName: 'Pirojpur', division: 'Barishal', lat: 22.5841, lng: 89.9720, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Baleshwar Riverfront' },
  { id: 'nesarabad', name: 'Nesarabad (Swarupkathi / Kuriana)', name_bn: 'নেছারাবাদ (স্বরূপকাঠি ও কুড়িয়ানা)', districtId: 'pirojpur', districtName: 'Pirojpur', division: 'Barishal', lat: 22.7500, lng: 90.1000, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Kuriana Floating Guava Market & Timber Port' },
  { id: 'mathbaria', name: 'Mathbaria', name_bn: 'মঠবাড়িয়া', districtId: 'pirojpur', districtName: 'Pirojpur', division: 'Barishal', lat: 22.2833, lng: 89.9667, transitHubType: 'Local Stand', popular_tag: 'Sapleza Eco Park' },
  { id: 'bhandaria', name: 'Bhandaria', name_bn: 'ভান্ডারিয়া', districtId: 'pirojpur', districtName: 'Pirojpur', division: 'Barishal', lat: 22.4833, lng: 90.0667, transitHubType: 'Local Stand' },
  { id: 'kawkhali-pirojpur', name: 'Kawkhali', name_bn: 'কাউখালী', districtId: 'pirojpur', districtName: 'Pirojpur', division: 'Barishal', lat: 22.6167, lng: 90.0667, transitHubType: 'Launch Ghat', hasLaunchGhat: true },
  { id: 'nazirpur', name: 'Nazirpur', name_bn: 'নাজিরপুর', districtId: 'pirojpur', districtName: 'Pirojpur', division: 'Barishal', lat: 22.7167, lng: 89.9667, transitHubType: 'Local Stand' },
  { id: 'indurkani', name: 'Indurkani (Zianagar)', name_bn: 'ইন্দুরকানী', districtId: 'pirojpur', districtName: 'Pirojpur', division: 'Barishal', lat: 22.4500, lng: 89.9500, transitHubType: 'Local Stand' },

  // Barguna District
  { id: 'barguna-sadar', name: 'Barguna Sadar', name_bn: 'বরগুনা সদর', districtId: 'barguna', districtName: 'Barguna', division: 'Barishal', lat: 22.0953, lng: 90.1121, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Payra-Bishkhali Riverbank' },
  { id: 'patharghata', name: 'Patharghata (Haringhata Forest)', name_bn: 'পাথরঘাটা (হরিণঘাটা বন)', districtId: 'barguna', districtName: 'Barguna', division: 'Barishal', lat: 22.0500, lng: 89.9667, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Haringhata Eco-Park Deer Sanctuary' },
  { id: 'taltali', name: 'Taltali (Shuvo Shondha Beach)', name_bn: 'তালতলী (শুভ সন্ধ্যা সৈকত)', districtId: 'barguna', districtName: 'Barguna', division: 'Barishal', lat: 21.9833, lng: 90.1833, transitHubType: 'Local Stand', popular_tag: 'Shuvo Shondha Virgin Beach & Tengragiri Mangrove' },
  { id: 'amtali', name: 'Amtali', name_bn: 'আমতলী', districtId: 'barguna', districtName: 'Barguna', division: 'Barishal', lat: 22.1333, lng: 90.2333, transitHubType: 'Bus Terminal' },
  { id: 'betagi', name: 'Betagi', name_bn: 'বেতাগী', districtId: 'barguna', districtName: 'Barguna', division: 'Barishal', lat: 22.4167, lng: 90.1667, transitHubType: 'Local Stand', popular_tag: 'Bibichini Historic Shahi Mosque' },
  { id: 'bamna', name: 'Bamna', name_bn: 'বামনা', districtId: 'barguna', districtName: 'Barguna', division: 'Barishal', lat: 22.3000, lng: 90.0833, transitHubType: 'Local Stand' },

  // --------------------------------------------------------------------------
  // 7. RANGPUR DIVISION
  // --------------------------------------------------------------------------
  // Rangpur District
  { id: 'rangpur-sadar', name: 'Rangpur City (Tajhat / Carmichael)', name_bn: 'রংপুর সদর (তাজহাট / কারমাইকেল)', districtId: 'rangpur', districtName: 'Rangpur', division: 'Rangpur', lat: 25.7439, lng: 89.2752, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Tajhat Palace, Chikli Water Park & Haribhanga Mango' },
  { id: 'badarganj', name: 'Badarganj', name_bn: 'বদরগঞ্জ', districtId: 'rangpur', districtName: 'Rangpur', division: 'Rangpur', lat: 25.6833, lng: 89.0500, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'mithapukur', name: 'Mithapukur', name_bn: 'মিঠাপুকুর', districtId: 'rangpur', districtName: 'Rangpur', division: 'Rangpur', lat: 25.5833, lng: 89.2833, transitHubType: 'Highways Junction', popular_tag: 'Mithapukur Historic Shahi Mosque' },
  { id: 'pirganj-rangpur', name: 'Pirganj', name_bn: 'পীরগঞ্জ', districtId: 'rangpur', districtName: 'Rangpur', division: 'Rangpur', lat: 25.4167, lng: 89.3167, transitHubType: 'Highways Junction', popular_tag: 'Anandnagar Eco Park' },
  { id: 'kaunia', name: 'Kaunia (Teesta Bridge)', name_bn: 'কাউনিয়া (তিস্তা রেল সেতু)', districtId: 'rangpur', districtName: 'Rangpur', division: 'Rangpur', lat: 25.7167, lng: 89.4167, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Teesta Railway Junction' },
  { id: 'gangachhara', name: 'Gangachhara', name_bn: 'গঙ্গাচড়া', districtId: 'rangpur', districtName: 'Rangpur', division: 'Rangpur', lat: 25.8500, lng: 89.2167, transitHubType: 'Local Stand' },
  { id: 'pirgachha', name: 'Pirgachha', name_bn: 'পীরগাছা', districtId: 'rangpur', districtName: 'Rangpur', division: 'Rangpur', lat: 25.5833, lng: 89.4000, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Manthana Zamindar Palace' },
  { id: 'taraganj', name: 'Taraganj', name_bn: 'তারাগঞ্জ', districtId: 'rangpur', districtName: 'Rangpur', division: 'Rangpur', lat: 25.8667, lng: 89.0167, transitHubType: 'Highways Junction' },

  // Dinajpur District
  { id: 'dinajpur-sadar', name: 'Dinajpur Sadar (Ramsagar)', name_bn: 'দিনাজপুর সদর (রামসাগর)', districtId: 'dinajpur', districtName: 'Dinajpur', division: 'Rangpur', lat: 25.6217, lng: 88.6355, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Ramsagar National Lake & Dinajpur Rajbari' },
  { id: 'kaharole', name: 'Kaharole (Kantaji Temple)', name_bn: 'কাহারোল (কান্তজীউ মন্দির)', districtId: 'dinajpur', districtName: 'Dinajpur', division: 'Rangpur', lat: 25.7833, lng: 88.6000, transitHubType: 'Local Stand', popular_tag: '1752 AD Kantajew Terracotta Temple Masterpiece' },
  { id: 'parbatipur', name: 'Parbatipur (Central Railway Junction)', name_bn: 'পার্বতীপুর (কেন্দ্রীয় রেল জংশন)', districtId: 'dinajpur', districtName: 'Dinajpur', division: 'Rangpur', lat: 25.6667, lng: 88.9167, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Largest Railway Junction of North Bengal' },
  { id: 'birampur', name: 'Birampur', name_bn: 'বিরামপুর', districtId: 'dinajpur', districtName: 'Dinajpur', division: 'Rangpur', lat: 25.4000, lng: 88.9000, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'phulbari-dinajpur', name: 'Phulbari', name_bn: 'ফুলবাড়ী', districtId: 'dinajpur', districtName: 'Dinajpur', division: 'Rangpur', lat: 25.5000, lng: 88.8833, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'birganj', name: 'Birganj', name_bn: 'বীরগঞ্জ', districtId: 'dinajpur', districtName: 'Dinajpur', division: 'Rangpur', lat: 25.8500, lng: 88.6667, transitHubType: 'Highways Junction', popular_tag: 'Singra National Sal Forest' },
  { id: 'biral', name: 'Biral', name_bn: 'বিরল', districtId: 'dinajpur', districtName: 'Dinajpur', division: 'Rangpur', lat: 25.6333, lng: 88.5500, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Radhikapur-Biral Border Rail Crossing' },
  { id: 'bochaganj', name: 'Bochaganj (Setabganj)', name_bn: 'বোচাগঞ্জ (সেতাবগঞ্জ)', districtId: 'dinajpur', districtName: 'Dinajpur', division: 'Rangpur', lat: 25.8000, lng: 88.4667, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'chirirbandar', name: 'Chirirbandar', name_bn: 'চিরিরবন্দর', districtId: 'dinajpur', districtName: 'Dinajpur', division: 'Rangpur', lat: 25.6667, lng: 88.7833, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'ghoraghat', name: 'Ghoraghat', name_bn: 'ঘোড়াঘাট', districtId: 'dinajpur', districtName: 'Dinajpur', division: 'Rangpur', lat: 25.2500, lng: 89.2833, transitHubType: 'Local Stand', popular_tag: 'Historic Ghoraghat Fort' },
  { id: 'hakimpur', name: 'Hakimpur (Hili Land Port)', name_bn: 'হাকিমপুর (হিলি স্থলবন্দর)', districtId: 'dinajpur', districtName: 'Dinajpur', division: 'Rangpur', lat: 25.2833, lng: 89.0167, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Hili International Land Port' },
  { id: 'khansama', name: 'Khansama', name_bn: 'খানসামা', districtId: 'dinajpur', districtName: 'Dinajpur', division: 'Rangpur', lat: 25.9167, lng: 88.7167, transitHubType: 'Local Stand' },
  { id: 'nawabganj-dinajpur', name: 'Nawabganj', name_bn: 'নবাবগঞ্জ', districtId: 'dinajpur', districtName: 'Dinajpur', division: 'Rangpur', lat: 25.4167, lng: 89.0833, transitHubType: 'Local Stand', popular_tag: 'Ashurar Beel & Wooden Footbridge' },

  // Panchagarh District
  { id: 'tetulia', name: 'Tetulia (Kanchenjunga Viewpoint)', name_bn: 'তেঁতুলিয়া (কাঞ্চনজঙ্ঘা ভিউ)', districtId: 'panchagarh', districtName: 'Panchagarh', division: 'Rangpur', lat: 26.4950, lng: 88.3420, transitHubType: 'Bus Terminal', popular_tag: 'Mt Kanchenjunga Himalayan View, Tea Gardens & Mahananda' },
  { id: 'panchagarh-sadar', name: 'Panchagarh Sadar (Express Terminal)', name_bn: 'পঞ্চগড় সদর (বীর মুক্তিযোদ্ধা সিরাজুল ইসলাম রেল)', districtId: 'panchagarh', districtName: 'Panchagarh', division: 'Rangpur', lat: 26.3354, lng: 88.5517, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Northernmost Broad Gauge Railway Terminal' },
  { id: 'boda', name: 'Boda', name_bn: 'বোদা', districtId: 'panchagarh', districtName: 'Panchagarh', division: 'Rangpur', lat: 26.2000, lng: 88.6000, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Bodeshwari Temple' },
  { id: 'atwari', name: 'Atwari', name_bn: 'আটোয়ারী', districtId: 'panchagarh', districtName: 'Panchagarh', division: 'Rangpur', lat: 26.3000, lng: 88.4167, transitHubType: 'Local Stand', popular_tag: 'Mirzapur Shahi Mosque' },
  { id: 'debiganj', name: 'Debiganj', name_bn: 'দেবীগঞ্জ', districtId: 'panchagarh', districtName: 'Panchagarh', division: 'Rangpur', lat: 26.1167, lng: 88.7500, transitHubType: 'Local Stand' },

  // Nilphamari District
  { id: 'saidpur', name: 'Saidpur (Airport & Railway Works)', name_bn: 'সৈয়দপুর (বিমানবন্দর ও রেলওয়ে)', districtId: 'nilphamari', districtName: 'Nilphamari', division: 'Rangpur', lat: 25.7778, lng: 88.8917, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Saidpur Domestic Airport & Chini Mosque' },
  { id: 'nilphamari-sadar', name: 'Nilphamari Sadar (Nil Sagar)', name_bn: 'নীলফামারী সদর (নীল সাগর)', districtId: 'nilphamari', districtName: 'Nilphamari', division: 'Rangpur', lat: 25.9318, lng: 88.8560, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Nil Sagar Migratory Bird Lake' },
  { id: 'domar', name: 'Domar (Chilahati Border Rail)', name_bn: 'ডোমার (চিলাহাটি সীমান্ত রেল)', districtId: 'nilphamari', districtName: 'Nilphamari', division: 'Rangpur', lat: 26.1000, lng: 88.8333, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Chilahati-Haldibari Mitali Express Crossing' },
  { id: 'jaldhaka', name: 'Jaldhaka', name_bn: 'জলঢাকা', districtId: 'nilphamari', districtName: 'Nilphamari', division: 'Rangpur', lat: 26.0167, lng: 89.0167, transitHubType: 'Local Stand' },
  { id: 'dimla', name: 'Dimla (Teesta Barrage)', name_bn: 'ডিমলা (তিস্তা ব্যারেজ)', districtId: 'nilphamari', districtName: 'Nilphamari', division: 'Rangpur', lat: 26.1333, lng: 88.9333, transitHubType: 'Local Stand', popular_tag: 'Teesta Irrigation Barrage' },
  { id: 'kishoreganj-nilphamari', name: 'Kishoreganj', name_bn: 'কিশোরগঞ্জ', districtId: 'nilphamari', districtName: 'Nilphamari', division: 'Rangpur', lat: 25.9000, lng: 89.0167, transitHubType: 'Local Stand' },

  // Lalmonirhat District
  { id: 'lalmonirhat-sadar', name: 'Lalmonirhat Sadar', name_bn: 'লালমনিরহাট সদর', districtId: 'lalmonirhat', districtName: 'Lalmonirhat', division: 'Rangpur', lat: 25.9923, lng: 89.2847, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Railway Heritage Museum' },
  { id: 'patgram', name: 'Patgram (Burimari Land Port / Tin Bigha)', name_bn: 'পাটগ্রাম (বুড়িমারী স্থলবন্দর ও তিনবিঘা)', districtId: 'lalmonirhat', districtName: 'Lalmonirhat', division: 'Rangpur', lat: 26.3500, lng: 89.0167, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Burimari International Land Port & Tin Bigha Corridor' },
  { id: 'hatibandha', name: 'Hatibandha (Teesta Barrage North)', name_bn: 'হাতীবান্ধা (তিস্তা ব্যারেজ)', districtId: 'lalmonirhat', districtName: 'Lalmonirhat', division: 'Rangpur', lat: 26.1167, lng: 89.1333, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Largest Irrigation Project in Bangladesh' },
  { id: 'kaliganj-lalmonirhat', name: 'Kaliganj', name_bn: 'কালীগঞ্জ', districtId: 'lalmonirhat', districtName: 'Lalmonirhat', division: 'Rangpur', lat: 25.9833, lng: 89.1833, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'aditmari', name: 'Aditmari', name_bn: 'আদিতমারী', districtId: 'lalmonirhat', districtName: 'Lalmonirhat', division: 'Rangpur', lat: 25.9167, lng: 89.3500, transitHubType: 'Railway Station', hasRailway: true },

  // Kurigram District
  { id: 'kurigram-sadar', name: 'Kurigram Sadar (Kurigram Express)', name_bn: 'কুড়িগ্রাম সদর', districtId: 'kurigram', districtName: 'Kurigram', division: 'Rangpur', lat: 25.8054, lng: 89.6362, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Brahmaputra & Dharla River Chars' },
  { id: 'chilmari', name: 'Chilmari (River Port)', name_bn: 'চিলমারী (নদী বন্দর)', districtId: 'kurigram', districtName: 'Kurigram', division: 'Rangpur', lat: 25.5500, lng: 89.6667, transitHubType: 'Launch Ghat', hasRailway: true, hasLaunchGhat: true, popular_tag: 'Historic Chilmari River Port' },
  { id: 'nageshwari', name: 'Nageshwari', name_bn: 'নাগেশ্বরী', districtId: 'kurigram', districtName: 'Kurigram', division: 'Rangpur', lat: 25.9667, lng: 89.7000, transitHubType: 'Local Stand' },
  { id: 'bhurungamari', name: 'Bhurungamari (Sonahat Land Port)', name_bn: 'ভুরুঙ্গামারী (সোনাহাট স্থলবন্দর)', districtId: 'kurigram', districtName: 'Kurigram', division: 'Rangpur', lat: 26.1333, lng: 89.6833, transitHubType: 'Local Stand', popular_tag: 'Sonahat Historic British Iron Bridge' },
  { id: 'ulipur', name: 'Ulipur', name_bn: 'উলিপুর', districtId: 'kurigram', districtName: 'Kurigram', division: 'Rangpur', lat: 25.6667, lng: 89.6333, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'rajarhat', name: 'Rajarhat', name_bn: 'রাজারহাট', districtId: 'kurigram', districtName: 'Kurigram', division: 'Rangpur', lat: 25.8000, lng: 89.5500, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Chandamari Historic Mosque' },
  { id: 'raumari', name: 'Raumari', name_bn: 'রৌমারী', districtId: 'kurigram', districtName: 'Kurigram', division: 'Rangpur', lat: 25.5667, lng: 89.8500, transitHubType: 'Local Stand' },
  { id: 'char-rajibpur', name: 'Char Rajibpur', name_bn: 'চর রাজীবপুর', districtId: 'kurigram', districtName: 'Kurigram', division: 'Rangpur', lat: 25.4000, lng: 89.7833, transitHubType: 'Local Stand' },
  { id: 'phulbari-kurigram', name: 'Phulbari', name_bn: 'ফুলবাড়ী', districtId: 'kurigram', districtName: 'Kurigram', division: 'Rangpur', lat: 25.9500, lng: 89.5667, transitHubType: 'Local Stand' },

  // Gaibandha District
  { id: 'gaibandha-sadar', name: 'Gaibandha Sadar (Balashi Ghat)', name_bn: 'গাইবান্ধা সদর (বালাসী ঘাট)', districtId: 'gaibandha', districtName: 'Gaibandha', division: 'Rangpur', lat: 25.3288, lng: 89.5406, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Rasmanjari Sweet & Balashi River Ghat' },
  { id: 'gobindaganj', name: 'Gobindaganj', name_bn: 'গোবিন্দগঞ্জ', districtId: 'gaibandha', districtName: 'Gaibandha', division: 'Rangpur', lat: 25.1333, lng: 89.3833, transitHubType: 'Highways Junction', popular_tag: 'Historic Mahimaganj Sugar Mills' },
  { id: 'palashbari', name: 'Palashbari', name_bn: 'পলাশবাড়ী', districtId: 'gaibandha', districtName: 'Gaibandha', division: 'Rangpur', lat: 25.2833, lng: 89.3500, transitHubType: 'Highways Junction' },
  { id: 'sadullapur', name: 'Sadullapur', name_bn: 'সাদুল্লাপুর', districtId: 'gaibandha', districtName: 'Gaibandha', division: 'Rangpur', lat: 25.3833, lng: 89.4667, transitHubType: 'Local Stand' },
  { id: 'sundarganj', name: 'Sundarganj', name_bn: 'সুন্দরগঞ্জ', districtId: 'gaibandha', districtName: 'Gaibandha', division: 'Rangpur', lat: 25.5667, lng: 89.5167, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'sughatta', name: 'Sughatta (Bonarpara Junction)', name_bn: 'সাঘাটা (বোনারপাড়া জংশন)', districtId: 'gaibandha', districtName: 'Gaibandha', division: 'Rangpur', lat: 25.1833, lng: 89.5833, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Bonarpara Major Railway Junction' },
  { id: 'fulchhari', name: 'Fulchhari', name_bn: 'ফুলছড়ি', districtId: 'gaibandha', districtName: 'Gaibandha', division: 'Rangpur', lat: 25.2167, lng: 89.6167, transitHubType: 'Launch Ghat', hasLaunchGhat: true },

  // Thakurgaon District
  { id: 'thakurgaon-sadar', name: 'Thakurgaon Sadar', name_bn: 'ঠাকুরগাঁও সদর', districtId: 'thakurgaon', districtName: 'Thakurgaon', division: 'Rangpur', lat: 26.0337, lng: 88.4617, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Sugar Mills & Tangon River' },
  { id: 'baliadangi', name: 'Baliadangi (Surjapuri Mango Tree)', name_bn: 'বালিয়াডাঙ্গী (সূর্যপূরী আমগাছ)', districtId: 'thakurgaon', districtName: 'Thakurgaon', division: 'Rangpur', lat: 26.1000, lng: 88.2833, transitHubType: 'Local Stand', popular_tag: '200-Year-Old Giant Surjapuri Mango Tree' },
  { id: 'pirganj-thakurgaon', name: 'Pirganj', name_bn: 'পীরগঞ্জ', districtId: 'thakurgaon', districtName: 'Thakurgaon', division: 'Rangpur', lat: 25.8500, lng: 88.3667, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'ranisankail', name: 'Ranisankail (King Palace)', name_bn: 'রাণীশংকৈল (রাজবাড়ি)', districtId: 'thakurgaon', districtName: 'Thakurgaon', division: 'Rangpur', lat: 25.9500, lng: 88.2500, transitHubType: 'Local Stand', popular_tag: 'Raja Tonkanath Palace & Gorokhnath Temple' },
  { id: 'haripur', name: 'Haripur', name_bn: 'হরিপুর', districtId: 'thakurgaon', districtName: 'Thakurgaon', division: 'Rangpur', lat: 25.9667, lng: 88.1333, transitHubType: 'Local Stand', popular_tag: 'Haripur King Palace' },

  // --------------------------------------------------------------------------
  // 8. MYMENSINGH DIVISION
  // --------------------------------------------------------------------------
  // Mymensingh District
  { id: 'mymensingh-sadar', name: 'Mymensingh Sadar (Shashi Lodge)', name_bn: 'ময়মনসিংহ সদর (শশী লজ)', districtId: 'mymensingh', districtName: 'Mymensingh', division: 'Mymensingh', lat: 24.7471, lng: 90.4203, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Shashi Lodge, Agricultural University & Brahmaputra River' },
  { id: 'muktagachha', name: 'Muktagachha (Rajbari & Monda)', name_bn: 'মুক্তাগাছা (রাজবাড়ি ও মণ্ডা)', districtId: 'mymensingh', districtName: 'Mymensingh', division: 'Mymensingh', lat: 24.7667, lng: 90.2667, transitHubType: 'Local Stand', popular_tag: 'Historic Muktagachha Rajbari & World Famous Monda' },
  { id: 'bhaluka', name: 'Bhaluka', name_bn: 'ভালুকা', districtId: 'mymensingh', districtName: 'Mymensingh', division: 'Mymensingh', lat: 24.2333, lng: 90.3833, transitHubType: 'Highways Junction', popular_tag: 'Reptiles Farm (Crocodile Farm)' },
  { id: 'trishal', name: 'Trishal (Nazrul University)', name_bn: 'ত্রিশাল (নজরুল বিশ্ববিদ্যালয়)', districtId: 'mymensingh', districtName: 'Mymensingh', division: 'Mymensingh', lat: 24.5833, lng: 90.4000, transitHubType: 'Local Stand', popular_tag: 'Jatiya Kabi Kazi Nazrul Islam University' },
  { id: 'gaffargaon', name: 'Gaffargaon', name_bn: 'গফরগাঁও', districtId: 'mymensingh', districtName: 'Mymensingh', division: 'Mymensingh', lat: 24.4333, lng: 90.5500, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Intercity Railway Junction' },
  { id: 'fulbaria', name: 'Fulbaria', name_bn: 'ফুলবাড়ীয়া', districtId: 'mymensingh', districtName: 'Mymensingh', division: 'Mymensingh', lat: 24.6333, lng: 90.2667, transitHubType: 'Local Stand', popular_tag: 'Anakut Eco Forest' },
  { id: 'haluaghat', name: 'Haluaghat (Land Port)', name_bn: 'হালুয়াঘাট (স্থলবন্দর)', districtId: 'mymensingh', districtName: 'Mymensingh', division: 'Mymensingh', lat: 25.1333, lng: 90.3500, transitHubType: 'Local Stand', popular_tag: 'Haluaghat Border & Garo Foothills' },
  { id: 'dhobaura', name: 'Dhobaura', name_bn: 'ধোবাউড়া', districtId: 'mymensingh', districtName: 'Mymensingh', division: 'Mymensingh', lat: 25.1000, lng: 90.5333, transitHubType: 'Local Stand' },
  { id: 'phulpur', name: 'Phulpur', name_bn: 'ফুলপুর', districtId: 'mymensingh', districtName: 'Mymensingh', division: 'Mymensingh', lat: 24.9500, lng: 90.3500, transitHubType: 'Local Stand' },
  { id: 'tarakanda', name: 'Tarakanda', name_bn: 'তারাকান্দা', districtId: 'mymensingh', districtName: 'Mymensingh', division: 'Mymensingh', lat: 24.8667, lng: 90.4000, transitHubType: 'Highways Junction' },
  { id: 'ishwarganj', name: 'Ishwarganj', name_bn: 'ঈশ্বরগঞ্জ', districtId: 'mymensingh', districtName: 'Mymensingh', division: 'Mymensingh', lat: 24.6833, lng: 90.6000, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'nandail', name: 'Nandail', name_bn: 'নান্দাইল', districtId: 'mymensingh', districtName: 'Mymensingh', division: 'Mymensingh', lat: 24.5667, lng: 90.6833, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'gauripur', name: 'Gauripur', name_bn: 'গৌরীপুর', districtId: 'mymensingh', districtName: 'Mymensingh', division: 'Mymensingh', lat: 24.7667, lng: 90.5833, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Gauripur Railway Junction' },

  // Netrokona District
  { id: 'durgapur-netrokona', name: 'Durgapur (Birishiri Ceramic Lake)', name_bn: 'দুর্গাপুর (বিরিশিরি ও চিনামাটির পাহাড়)', districtId: 'netrokona', districtName: 'Netrokona', division: 'Mymensingh', lat: 25.1167, lng: 90.6833, transitHubType: 'Local Stand', popular_tag: 'Birishiri Turquoise Blue Lake, Someshwari River & Garo Culture' },
  { id: 'netrokona-sadar', name: 'Netrokona Sadar', name_bn: 'নেত্রকোণা সদর', districtId: 'netrokona', districtName: 'Netrokona', division: 'Mymensingh', lat: 24.8833, lng: 90.7333, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Baluza Sweet & Haor Gateway' },
  { id: 'mohanganj', name: 'Mohanganj (Haor Express Terminus)', name_bn: 'মোহনগঞ্জ (হাওর এক্সপ্রেস টার্মিনাস)', districtId: 'netrokona', districtName: 'Netrokona', division: 'Mymensingh', lat: 24.8667, lng: 90.9667, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Dingapota Haor & Direct Train Terminus' },
  { id: 'kalmakanda', name: 'Kalmakanda', name_bn: 'কলমাকান্দা', districtId: 'netrokona', districtName: 'Netrokona', division: 'Mymensingh', lat: 25.0833, lng: 90.8833, transitHubType: 'Local Stand' },
  { id: 'barhatta', name: 'Barhatta', name_bn: 'বারহাট্টা', districtId: 'netrokona', districtName: 'Netrokona', division: 'Mymensingh', lat: 24.9000, lng: 90.8833, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'purbadhala', name: 'Purbadhala', name_bn: 'পূর্বধলা', districtId: 'netrokona', districtName: 'Netrokona', division: 'Mymensingh', lat: 24.9333, lng: 90.6000, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'kendua', name: 'Kendua', name_bn: 'কেন্দুয়া', districtId: 'netrokona', districtName: 'Netrokona', division: 'Mymensingh', lat: 24.6500, lng: 90.8333, transitHubType: 'Local Stand', popular_tag: 'Roailbari Ancient Fort' },
  { id: 'madan', name: 'Madan', name_bn: 'মদন', districtId: 'netrokona', districtName: 'Netrokona', division: 'Mymensingh', lat: 24.7167, lng: 90.9500, transitHubType: 'Local Stand' },
  { id: 'atpara', name: 'Atpara', name_bn: 'আটপাড়া', districtId: 'netrokona', districtName: 'Netrokona', division: 'Mymensingh', lat: 24.8000, lng: 90.8333, transitHubType: 'Local Stand' },
  { id: 'khaliajuri', name: 'Khaliajuri', name_bn: 'খালিয়াজুরী', districtId: 'netrokona', districtName: 'Netrokona', division: 'Mymensingh', lat: 24.7000, lng: 91.1333, transitHubType: 'Launch Ghat', hasLaunchGhat: true, popular_tag: 'Vast Haor Wetland & Island Villages' },

  // Jamalpur District
  { id: 'jamalpur-sadar', name: 'Jamalpur Sadar', name_bn: 'জামালপুর সদর', districtId: 'jamalpur', districtName: 'Jamalpur', division: 'Mymensingh', lat: 24.9375, lng: 89.9378, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Nakshi Kantha Handloom Heritage' },
  { id: 'dewanganj', name: 'Dewanganj (Express Terminus)', name_bn: 'দেওয়ানগঞ্জ (রেলওয়ে টার্মিনাস)', districtId: 'jamalpur', districtName: 'Jamalpur', division: 'Mymensingh', lat: 25.1333, lng: 89.7833, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Brahmaputra Express Railway Terminus' },
  { id: 'sarishabari', name: 'Sarishabari (Tarakandi)', name_bn: 'সরিষাবাড়ী (তারাকান্দি)', districtId: 'jamalpur', districtName: 'Jamalpur', division: 'Mymensingh', lat: 24.7500, lng: 89.8333, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Jamuna Fertilizer Factory & Jute Mills' },
  { id: 'islampur', name: 'Islampur', name_bn: 'ইসলামপুর', districtId: 'jamalpur', districtName: 'Jamalpur', division: 'Mymensingh', lat: 25.0833, lng: 89.8000, transitHubType: 'Railway Station', hasRailway: true, popular_tag: 'Historic Bell-Metal Crafts (Kasha Shilpa)' },
  { id: 'melandaha', name: 'Melandaha', name_bn: 'মেলান্দহ', districtId: 'jamalpur', districtName: 'Jamalpur', division: 'Mymensingh', lat: 24.9667, lng: 89.8333, transitHubType: 'Railway Station', hasRailway: true },
  { id: 'madarganj', name: 'Madarganj', name_bn: 'মাদারগঞ্জ', districtId: 'jamalpur', districtName: 'Jamalpur', division: 'Mymensingh', lat: 24.9000, lng: 89.7500, transitHubType: 'Local Stand' },
  { id: 'bakshiganj', name: 'Bakshiganj (Kamalpur Border)', name_bn: 'বকশীগঞ্জ (কামালপুর)', districtId: 'jamalpur', districtName: 'Jamalpur', division: 'Mymensingh', lat: 25.2167, lng: 89.8833, transitHubType: 'Local Stand', popular_tag: 'Historic Dhalu-Kamalpur Battleground & Garo Hills' },

  // Sherpur District
  { id: 'sherpur-sadar', name: 'Sherpur Sadar', name_bn: 'শেরপুর সদর', districtId: 'sherpur', districtName: 'Sherpur', division: 'Mymensingh', lat: 25.0205, lng: 90.0153, transitHubType: 'Bus Terminal', popular_tag: 'Maisaheba Mosque & Chhanamukhi Sweet' },
  { id: 'jhenaigati', name: 'Jhenaigati (Ghazni Abakash)', name_bn: 'ঝিনাইগাতী (গজনী অবকাশ)', districtId: 'sherpur', districtName: 'Sherpur', division: 'Mymensingh', lat: 25.1833, lng: 90.0667, transitHubType: 'Local Stand', popular_tag: 'Ghazni Abakash Eco Tourism Park & Garo Hills' },
  { id: 'nalitabari', name: 'Nalitabari (Madhutila Eco Park)', name_bn: 'নালিতাবাড়ী (মধুটিলা ইকোপার্ক)', districtId: 'sherpur', districtName: 'Sherpur', division: 'Mymensingh', lat: 25.0833, lng: 90.1833, transitHubType: 'Local Stand', popular_tag: 'Madhutila Eco Park & Pine Forests' },
  { id: 'sreebardi', name: 'Sreebardi (Raja Pahar)', name_bn: 'শ্রীবরদী (রাজা পাহাড়)', districtId: 'sherpur', districtName: 'Sherpur', division: 'Mymensingh', lat: 25.1500, lng: 89.9167, transitHubType: 'Local Stand', popular_tag: 'Raja Pahar & Meghalaya Foothills' },
  { id: 'nakla', name: 'Nakla', name_bn: 'নকলা', districtId: 'sherpur', districtName: 'Sherpur', division: 'Mymensingh', lat: 24.9833, lng: 90.1833, transitHubType: 'Highways Junction' }
];

export function getUpazilasByDistrict(districtId: string): UpazilaInfo[] {
  return BANGLADESH_UPAZILAS.filter(u => u.districtId.toLowerCase() === districtId.toLowerCase());
}

export function getUpazilaById(id: string): UpazilaInfo | undefined {
  return BANGLADESH_UPAZILAS.find(u => u.id.toLowerCase() === id.toLowerCase());
}
