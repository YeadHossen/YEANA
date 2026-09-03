export interface EmergencyContact {
  id: string;
  name: string;
  name_bn: string;
  phone: string;
  category: 'police' | 'hospital' | 'ambulance';
  description: string;
  description_bn: string;
  address?: string;
  available_hours: string;
  is_national?: boolean;
  is_toll_free?: boolean;
}

export interface DistrictEmergencyProfile {
  id: string;
  district: string;
  district_bn: string;
  division: string;
  division_bn: string;
  tourist_hubs: string[];
  police: EmergencyContact[];
  hospital: EmergencyContact[];
  ambulance: EmergencyContact[];
}

// Universal National Helplines across Bangladesh
export const NATIONAL_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'nat-999-police',
    name: 'National Emergency Service (Police, Ambulance, Fire)',
    name_bn: 'জাতীয় জরুরি সেবা ৯৯৯ (পুলিশ, অ্যাম্বুলেন্স ও ফায়ার সার্ভিস)',
    phone: '999',
    category: 'police',
    description: 'Toll-free 24/7 national emergency dispatcher for immediate police intervention, fire service, and medical ambulance assistance.',
    description_bn: '২৪/৭ টোল-ফ্রি জাতীয় জরুরি হটলাইন। পুলিশি সহায়তা, ফায়ার সার্ভিস ও সরকারি অ্যাম্বুলেন্স সেবা।',
    available_hours: '24/7 Available',
    is_national: true,
    is_toll_free: true,
  },
  {
    id: 'nat-tourist-police',
    name: 'Bangladesh Tourist Police 24/7 National HQ Helpline',
    name_bn: 'বাংলাদেশ ট্যুরিস্ট পুলিশ ২৪/৭ জাতীয় হেল্পলাইন',
    phone: '+8801320222222',
    category: 'police',
    description: 'Dedicated law enforcement and traveler safety support across all tourist spots and travel corridors in Bangladesh.',
    description_bn: 'দেশি ও বিদেশি পর্যটকদের সার্বিক নিরাপত্তা, হয়রানি প্রতিরোধ ও যেকোনো জরুরি সহায়তায় ট্যুরিস্ট পুলিশ।',
    available_hours: '24/7 Available',
    is_national: true,
  },
  {
    id: 'nat-highway-police',
    name: 'Bangladesh Highway Police Central Control Room',
    name_bn: 'বাংলাদেশ হাইওয়ে পুলিশ কেন্দ্রীয় কন্ট্রোল রুম',
    phone: '+8801320182555',
    category: 'police',
    description: 'National highway patrol, highway accident rescue, and inter-district transport corridor safety.',
    description_bn: 'মহাসড়কে দুর্ঘটনা উদ্ধার, ছিনতাই প্রতিরোধ এবং আন্তঃজেলা যাতায়াত নিরাপত্তা।',
    available_hours: '24/7 Available',
    is_national: true,
  },
  {
    id: 'nat-health-16263',
    name: 'Shastho Batayan (National Health Hotline - 16263)',
    name_bn: 'স্বাস্থ্য বাতায়ন (জাতীয় স্বাস্থ্য হটলাইন ১৬২৬৩)',
    phone: '16263',
    category: 'hospital',
    description: 'Ministry of Health 24/7 helpline providing immediate on-call registered doctor consultation and hospital emergency referrals.',
    description_bn: 'স্বাস্থ্য মন্ত্রণালয় পরিচালিত ২৪ ঘণ্টা বিনামূল্যে সরকারি রেজিস্টার্ড ডাক্তারের পরামর্শ ও হাসপাতাল রেফারেল।',
    available_hours: '24/7 Available',
    is_national: true,
    is_toll_free: true,
  },
  {
    id: 'nat-fire-ambulance',
    name: 'Fire Service & Civil Defence Ambulance Dispatch',
    name_bn: 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স অ্যাম্বুলেন্স হটলাইন',
    phone: '16163',
    category: 'ambulance',
    description: 'Govt. emergency rescue, disaster management, and subsidized rapid ambulance transport across all districts.',
    description_bn: 'জরুরি উদ্ধার অভিযান, অগ্নিনির্বাপণ ও সাশ্রয়ী সরকারি জরুরি অ্যাম্বুলেন্স সার্ভিস।',
    available_hours: '24/7 Available',
    is_national: true,
    is_toll_free: true,
  },
  {
    id: 'nat-red-crescent',
    name: 'Bangladesh Red Crescent Society 24/7 Ambulance Fleet',
    name_bn: 'বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি ২৪/৭ অ্যাম্বুলেন্স সেবা',
    phone: '+8801811458524',
    category: 'ambulance',
    description: 'Humanitarian non-profit 24/7 emergency life-support and patient transit ambulance service.',
    description_bn: 'মানবিক সংস্থা রেড ক্রিসেন্টের লাইফ-সাপোর্ট ও জরুরি রোগী পরিবহন অ্যাম্বুলেন্স বহর।',
    available_hours: '24/7 Available',
    is_national: true,
  },
  {
    id: 'nat-railway-131',
    name: 'Bangladesh Railway Traveler Hotline & Security',
    name_bn: 'বাংলাদেশ রেলওয়ে হেল্পলাইন ও নিরাপত্তা',
    phone: '131',
    category: 'police',
    description: 'Railway police, train journey emergency, schedule assistance, and ticket security.',
    description_bn: 'ট্রেন ভ্রমণের নিরাপত্তা, রেলওয়ে পুলিশ সহায়তা ও জরুরি টিকিট সংক্রান্ত তথ্য।',
    available_hours: '24/7 Available',
    is_national: true,
    is_toll_free: true,
  },
];

// District-Specific Verified Profiles
export const DISTRICT_EMERGENCY_DATA: DistrictEmergencyProfile[] = [
  {
    id: 'coxs-bazar',
    district: "Cox's Bazar",
    district_bn: 'কক্সবাজার',
    division: 'Chattogram',
    division_bn: 'চট্টগ্রাম',
    tourist_hubs: ['Laboni Beach', 'Sugandha Point', 'Kolatoli', 'Inani Beach', 'Himchhari', 'Marine Drive', 'Saint Martin Island', 'Teknaf'],
    police: [
      {
        id: 'cx-tp-zone',
        name: "Tourist Police Cox's Bazar Region Control Room",
        name_bn: 'ট্যুরিস্ট পুলিশ কক্সবাজার রিজিয়ন কন্ট্রোল রুম',
        phone: '+8801320163599',
        category: 'police',
        description: '24/7 dedicated beach safety, marine drive patrol, and immediate tourist security desk.',
        description_bn: 'লাবণী, সুগন্ধা, কলাতলী ও মেরিন ড্রাইভে ২৪ ঘণ্টা টহল ও পর্যটক নিরাপত্তা নিশ্চিতকরণ।',
        address: 'Laboni Point Beach Police Box, Cox\'s Bazar',
        available_hours: '24/7 Available',
      },
      {
        id: 'cx-sp-office',
        name: "Superintendent of Police (SP) Control Room, Cox's Bazar",
        name_bn: 'পুলিশ সুপার (এসপি) কন্ট্রোল রুম, কক্সবাজার',
        phone: '+8801320108500',
        category: 'police',
        description: 'District police headquarters control room for law enforcement and emergency response.',
        description_bn: 'কক্সবাজার জেলা পুলিশ হেডকোয়ার্টার্স কেন্দ্রীয় কন্ট্রোল রুম।',
        address: 'Police Lines, Cox\'s Bazar Sadar',
        available_hours: '24/7 Available',
      },
      {
        id: 'cx-sadar-thana',
        name: "Cox's Bazar Sadar Model Police Station (Thana)",
        name_bn: 'কক্সবাজার সদর মডেল থানা',
        phone: '+8801320108520',
        category: 'police',
        description: 'Municipal city & hotel zone primary law enforcement station.',
        description_bn: 'কক্সবাজার পৌরসভা ও হোটেল-মোটেল জোনের প্রধান থানা।',
        address: 'Thana Road, Cox\'s Bazar',
        available_hours: '24/7 Available',
      },
      {
        id: 'cx-stmartin-outpost',
        name: 'Saint Martin Island Police & Coast Guard Post',
        name_bn: 'সেন্টমার্টিন দ্বীপ পুলিশ ও কোস্টগার্ড ফাঁড়ি',
        phone: '+8801320108538',
        category: 'police',
        description: 'Coral island security, naval passenger boat emergency, and beach safety.',
        description_bn: 'সেন্টমার্টিন প্রবাল দ্বীপের সার্বিক নিরাপত্তা ও নৌ-জরুরি সেবা।',
        address: 'Saint Martin Island Jetty Ghat',
        available_hours: '24/7 Available',
      }
    ],
    hospital: [
      {
        id: 'cx-sadar-hosp',
        name: "Cox's Bazar 250-Bed District Sadar Hospital (Emergency Room)",
        name_bn: 'কক্সবাজার ২৫০ শয্যা বিশিষ্ট জেলা সদর হাসপাতাল (জরুরি বিভাগ)',
        phone: '+88034163854',
        category: 'hospital',
        description: 'Largest govt tertiary healthcare, 24/7 emergency trauma center, surgery, and anti-venom center.',
        description_bn: 'জেলার প্রধান সরকারি হাসপাতাল। ২৪ ঘণ্টা জরুরি বিভাগ, ট্রমা সেন্টার, সর্পদংশন চিকিৎসা ও অপারেশন থিয়েটার।',
        address: 'Hospital Road, Cox\'s Bazar Sadar',
        available_hours: '24/7 Emergency Ward',
      },
      {
        id: 'cx-faujdarhat-chest',
        name: 'Cox\'s Bazar Medical College & Hospital',
        name_bn: 'কক্সবাজার মেডিকেল কলেজ হাসপাতাল',
        phone: '+88034162890',
        category: 'hospital',
        description: 'Specialized intensive medical care, cardiology, and emergency trauma facility.',
        description_bn: 'বিশেষায়িত নিবিড় পরিচর্যা ও সার্বক্ষণিক জরুরি মেডিকেল সেবা।',
        address: 'Jhilongja, Cox\'s Bazar',
        available_hours: '24/7 Emergency Ward',
      },
      {
        id: 'cx-fuaad-al-khateeb',
        name: 'Fouad Al-Khateeb Hospital & Trauma Center (Private)',
        name_bn: 'ফুয়াদ আল খতিব হাসপাতাল ও ট্রমা সেন্টার',
        phone: '+8801819612345',
        category: 'hospital',
        description: 'Modern private emergency hospital with ICU, orthopedics, and diagnostic center.',
        description_bn: 'আধুনিক আইসিইউ, অর্থোপেডিক ট্রমা ও ২৪ ঘণ্টা জরুরি বিভাগ।',
        address: 'Main Road, Cox\'s Bazar',
        available_hours: '24/7 Emergency Ward',
      }
    ],
    ambulance: [
      {
        id: 'cx-redcrescent-amb',
        name: "Red Crescent Cyclone Emergency Ambulance (Cox's Bazar)",
        name_bn: 'রেড ক্রিসেন্ট জরুরি অ্যাম্বুলেন্স (কক্সবাজার)',
        phone: '+8801811458524',
        category: 'ambulance',
        description: 'Rapid response ambulance fleet equipped for beach transfers and highway medical transit.',
        description_bn: 'সৈকত অঞ্চল ও হাইওয়েতে দ্রুত রোগী স্থানান্তরের জন্য বিশেষায়িত অ্যাম্বুলেন্স।',
        available_hours: '24/7 On-Call',
      },
      {
        id: 'cx-sadar-amb',
        name: "District Sadar Hospital Govt ICU Ambulance Fleet",
        name_bn: 'জেলা সদর হাসপাতাল সরকারি আইসিইউ অ্যাম্বুলেন্স বহর',
        phone: '+8801712404369',
        category: 'ambulance',
        description: 'Official ICU and cardiac-monitored ambulance for emergency transfers to Chattogram.',
        description_bn: 'চট্টগ্রাম মেডিকেলে মুমূর্ষু রোগী স্থানান্তরের জন্য আইসিইউ কার্ডিয়াক অ্যাম্বুলেন্স।',
        available_hours: '24/7 On-Call',
      },
      {
        id: 'cx-sheba-amb',
        name: "Cox's Bazar 24-Hour Private AC Ambulance Service",
        name_bn: 'কক্সবাজার ২৪ ঘণ্টা প্রাইভেট এসি অ্যাম্বুলেন্স সার্ভিস',
        phone: '+8801815123456',
        category: 'ambulance',
        description: 'Equipped with oxygen cylinders, stretcher, and trained medical paramedic.',
        description_bn: 'অক্সিজেন ও প্রাথমিক প্যারামেডিক সুবিধাসহ সার্বক্ষণিক এসি অ্যাম্বুলেন্স।',
        available_hours: '24/7 On-Call',
      }
    ]
  },
  {
    id: 'sylhet',
    district: 'Sylhet',
    district_bn: 'সিলেট',
    division: 'Sylhet',
    division_bn: 'সিলেট',
    tourist_hubs: ['Ratargul Swamp Forest', 'Jaflong', 'Bisnakhandi', 'Bholaganj Sada Pathor', 'Shah Jalal Mazar', 'Lalakhal'],
    police: [
      {
        id: 'syl-tourist-police',
        name: 'Tourist Police Sylhet Region HQ (Jaflong & Bholaganj Desk)',
        name_bn: 'ট্যুরিস্ট পুলিশ সিলেট রিজিয়ন (জাফলং ও সাদাপাথর হেল্প ডেস্ক)',
        phone: '+8801320163650',
        category: 'police',
        description: 'Water safety, boat trawler security, and tourist guidance across Sylhet waterfalls & swamps.',
        description_bn: 'জাফলং, বিছনাকান্দি ও সাদাপাথরে নৌ-নিরাপত্তা এবং পর্যটক সহায়তা।',
        address: 'Jaflong Zero Point & Sylhet Circuit House',
        available_hours: '24/7 Available',
      },
      {
        id: 'syl-smp-control',
        name: 'Sylhet Metropolitan Police (SMP) Central Control Room',
        name_bn: 'সিলেট মেট্রোপলিটন পুলিশ (এসএমপি) কন্ট্রোল রুম',
        phone: '+8801320117500',
        category: 'police',
        description: 'Citywide law enforcement, rapid emergency response unit, and traffic control.',
        description_bn: 'সিলেট মহানগরীর প্রধান পুলিশ কন্ট্রোল রুম ও জরুরি টিম।',
        address: 'Naiorpool, Sylhet',
        available_hours: '24/7 Available',
      },
      {
        id: 'syl-kotwali-thana',
        name: 'Sylhet Kotwali Model Police Station (Thana)',
        name_bn: 'সিলেট কোতোয়ালি মডেল থানা',
        phone: '+8801320117520',
        category: 'police',
        description: 'Central city division, Zindabazar, and Dargah precinct security.',
        description_bn: 'সিলেট জিন্দাবাজার, দরগাহ গেট ও প্রধান শহর এলাকা।',
        address: 'Kotwali, Sylhet',
        available_hours: '24/7 Available',
      }
    ],
    hospital: [
      {
        id: 'syl-mag-osmani',
        name: 'Sylhet MAG Osmani Medical College Hospital (SOMCH)',
        name_bn: 'সিলেট এমএজি ওসমানী মেডিকেল কলেজ হাসপাতাল (জরুরি বিভাগ)',
        phone: '+880821713487',
        category: 'hospital',
        description: 'Largest 1000-bed tertiary govt medical college in Sylhet division with full surgical and ICU wings.',
        description_bn: 'সিলেট বিভাগের প্রধান সরকারি মেডিকেল কলেজ। ২৪ ঘণ্টা জরুরি সার্জারি, বার্ন ও আইসিইউ ইউনিট।',
        address: 'Kajalshah, Medical Road, Sylhet',
        available_hours: '24/7 Emergency Ward',
      },
      {
        id: 'syl-mount-adora',
        name: 'Mount Adora Hospital (Private Emergency & Trauma Center)',
        name_bn: 'মাউন্ট এডোরা হাসপাতাল (জরুরি ট্রমা সেন্টার)',
        phone: '+8801777709000',
        category: 'hospital',
        description: 'Premium private healthcare facility with 24/7 trauma emergency, neurology, and diagnostics.',
        description_bn: 'আন্তর্জাতিক মানের বেসরকারি হাসপাতাল, ২৪ ঘণ্টা আইসিইউ ও কার্ডিয়াক কেয়ার।',
        address: 'Mirboxtula / Akhalia, Sylhet',
        available_hours: '24/7 Emergency Ward',
      },
      {
        id: 'syl-popular-medical',
        name: 'Popular Medical Center & Hospital Sylhet',
        name_bn: 'পপুলার মেডিকেল সেন্টার ও হাসপাতাল সিলেট',
        phone: '+880821717888',
        category: 'hospital',
        description: 'Round-the-clock emergency medical diagnostics, casualty ward, and ambulance service.',
        description_bn: 'সার্বক্ষণিক জরুরি চিকিৎসা ও ডায়াগনস্টিক সাপোর্ট।',
        address: 'Subhanighat, Sylhet',
        available_hours: '24/7 Emergency Ward',
      }
    ],
    ambulance: [
      {
        id: 'syl-osmani-amb',
        name: 'MAG Osmani Hospital Central Ambulance Dispatch',
        name_bn: 'ওসমানী হাসপাতাল কেন্দ্রীয় জরুরি অ্যাম্বুলেন্স',
        phone: '+8801711234567',
        category: 'ambulance',
        description: 'Govt. non-stop ambulance dispatch for Sylhet city and upazila transfers.',
        description_bn: 'সিলেট বিভাগের সকল জেলা ও উপজেলায় রোগী পরিবহনে সরকারি অ্যাম্বুলেন্স।',
        available_hours: '24/7 On-Call',
      },
      {
        id: 'syl-al-madina-amb',
        name: 'Sylhet ICU & AC Ambulance Service (Private)',
        name_bn: 'সিলেট আইসিইউ ও এসি অ্যাম্বুলেন্স সার্ভিস',
        phone: '+8801716987654',
        category: 'ambulance',
        description: 'Ventilator and cardiac monitor-equipped private ambulance for Dhaka/inter-city transport.',
        description_bn: 'ভেন্টিলেটর ও কার্ডিয়াক মনিটর সুবিধাসহ ঢাকা-সিলেট রুটে রোগী পরিবহন।',
        available_hours: '24/7 On-Call',
      }
    ]
  },
  {
    id: 'dhaka',
    district: 'Dhaka',
    district_bn: 'ঢাকা',
    division: 'Dhaka',
    division_bn: 'ঢাকা',
    tourist_hubs: ['Lalbagh Fort', 'Ahsan Manzil', 'National Museum', 'Hatirjheel', 'Dhanmondi Lake', 'Sadarghat Launch Terminal', 'Hazrat Shahjalal Airport'],
    police: [
      {
        id: 'dhk-dmp-control',
        name: 'Dhaka Metropolitan Police (DMP) Central Control Room',
        name_bn: 'ডিএমপি কেন্দ্রীয় পুলিশ কন্ট্রোল রুম (ঢাকা)',
        phone: '+8801320000100',
        category: 'police',
        description: 'Central control room covering all 50 police stations in the capital city.',
        description_bn: 'ঢাকা মহানগরের ৫০টি থানার সমন্বিত কেন্দ্রীয় পুলিশ কন্ট্রোল রুম।',
        address: 'DMP HQ, 36 Baily Road, Dhaka',
        available_hours: '24/7 Available',
      },
      {
        id: 'dhk-tourist-hq',
        name: 'Bangladesh Tourist Police Headquarters (Dhaka)',
        name_bn: 'বাংলাদেশ ট্যুরিস্ট পুলিশ হেডকোয়ার্টার্স (ঢাকা)',
        phone: '+8801320222222',
        category: 'police',
        description: 'National central monitoring room, foreigner security assistance, and heritage site protection.',
        description_bn: 'জাতীয় ট্যুরিস্ট পুলিশ সদর দফতর ও বিদেশি পর্যটক সুরক্ষা সেল।',
        address: 'Police Officers Mess, Moghbazar, Dhaka',
        available_hours: '24/7 Available',
      },
      {
        id: 'dhk-airport-thana',
        name: 'Airport Armed Police Battalion (APBn) & Police Station',
        name_bn: 'বিমানবন্দর আর্মড পুলিশ ব্যাটালিয়ন ও থানা',
        phone: '+8801320001234',
        category: 'police',
        description: 'International airport arrival, transit safety, and immigration terminal security.',
        description_bn: 'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর টার্মিনাল ও ট্রানজিট নিরাপত্তা।',
        address: 'Terminal 1, Hazrat Shahjalal International Airport, Dhaka',
        available_hours: '24/7 Available',
      }
    ],
    hospital: [
      {
        id: 'dhk-dmch-er',
        name: 'Dhaka Medical College Hospital (DMCH - 24/7 Emergency Casualty)',
        name_bn: 'ঢাকা মেডিকেল কলেজ হাসপাতাল (ডিএমসিএইচ - জরুরি বিভাগ)',
        phone: '+880255165088',
        category: 'hospital',
        description: 'The country\'s premier apex government referral hospital and largest trauma emergency facility.',
        description_bn: 'দেশের সর্ববৃহৎ সরকারি হাসপাতাল ও প্রধান ট্রমা ক্যাজুয়ালটি সেন্টার।',
        address: 'Secretariat Road, Bakshi Bazar, Dhaka',
        available_hours: '24/7 Emergency Ward',
      },
      {
        id: 'dhk-square-hosp',
        name: 'Square Hospital Limited (24/7 Emergency & ICU)',
        name_bn: 'স্কয়ার হাসপাতাল লিমিটেড (জরুরি বিভাগ ও আইসিইউ)',
        phone: '10616',
        category: 'hospital',
        description: 'Leading tertiary multispecialty hospital with high-tech trauma and cardiac response teams.',
        description_bn: 'শীর্ষস্থানীয় আন্তর্জাতিক মানের বেসরকারি জরুরি ট্রমা ও কার্ডিয়াক সেবা।',
        address: '18/F Bir Uttam Qazi Nuruzzaman Sarak, Panthapath, Dhaka',
        available_hours: '24/7 Emergency Ward',
      },
      {
        id: 'dhk-evercare-hosp',
        name: 'Evercare Hospital Dhaka (JCI Accredited Emergency Center)',
        name_bn: 'এভারকেয়ার হাসপাতাল ঢাকা (জরুরি বিভাগ)',
        phone: '10678',
        category: 'hospital',
        description: 'JCI-accredited international hospital with rapid stroke and heart attack emergency team.',
        description_bn: 'জেসিআই সনদপ্রাপ্ত আন্তর্জাতিক মানের জরুরি বিভাগ ও স্ট্রোক ইউনিট।',
        address: 'Plot 81, Block E, Bashundhara R/A, Dhaka',
        available_hours: '24/7 Emergency Ward',
      }
    ],
    ambulance: [
      {
        id: 'dhk-red-crescent-hq',
        name: 'Red Crescent National HQ Ambulance Dispatch (Dhaka)',
        name_bn: 'রেড ক্রিসেন্ট জাতীয় সদর দফতর অ্যাম্বুলেন্স সার্ভিস',
        phone: '+8801811458524',
        category: 'ambulance',
        description: 'Capital city non-profit cardiac and basic life-support ambulance network.',
        description_bn: 'রাজধানীজুড়ে জরুরি রোগী পরিবহন ও কার্ডিয়াক লাইফ সাপোর্ট সুবিধা।',
        address: '684-686, Red Crescent Sarak, Bara Moghbazar, Dhaka',
        available_hours: '24/7 On-Call',
      },
      {
        id: 'dhk-anjuman-mufidul',
        name: 'Anjuman Mufidul Islam 24-Hour Ambulance Service',
        name_bn: 'আঞ্জুমান মফিদুল ইসলাম ২৪ ঘণ্টা অ্যাম্বুলেন্স সেবা',
        phone: '+88029336611',
        category: 'ambulance',
        description: 'Iconic charitable ambulance organization serving Dhaka city round-the-clock.',
        description_bn: 'স্বল্প খরচে ২৪ ঘণ্টা জরুরি রোগী পরিবহন ও ডেডবডি স্থানান্তর।',
        address: 'Kakrail, Dhaka',
        available_hours: '24/7 On-Call',
      }
    ]
  },
  {
    id: 'rangamati',
    district: 'Rangamati',
    district_bn: 'রাঙামাটি',
    division: 'Chattogram',
    division_bn: 'চট্টগ্রাম',
    tourist_hubs: ['Sajek Valley', 'Kaptai Lake', 'Hanging Bridge', 'Shuvolong Waterfall', 'Polwel Park', 'Rajban Vihara'],
    police: [
      {
        id: 'rng-sajek-outpost',
        name: 'Sajek Valley Police Camp & Tourist Help Desk',
        name_bn: 'সাজেক ভ্যালি পুলিশ ফাঁড়ি ও পর্যটক সহায়তা ক্যাম্প',
        phone: '+8801320110000',
        category: 'police',
        description: 'Safety desk on Ruilui and Konglak hill peaks, coordinating army security escorts from Baghaihat.',
        description_bn: 'রুইলুই ও কংলাক পাড়ায় সার্বক্ষণিক নিরাপত্তা ও বাঘাইহাট সেনা এস্কর্ট সমন্বয়।',
        address: 'Ruilui Para, Sajek Valley',
        available_hours: '24/7 Available',
      },
      {
        id: 'rng-sp-office',
        name: 'Superintendent of Police (SP) Control Room, Rangamati',
        name_bn: 'পুলিশ সুপার (এসপি) কন্ট্রোল রুম, রাঙামাটি',
        phone: '+8801320111500',
        category: 'police',
        description: 'Hill district police HQ control room covering all upazilas and lake routes.',
        description_bn: 'রাঙামাটি পার্বত্য জেলার প্রধান পুলিশ কন্ট্রোল রুম।',
        address: 'Police Lines, Rangamati Sadar',
        available_hours: '24/7 Available',
      },
      {
        id: 'rng-kotwali-thana',
        name: 'Rangamati Kotwali Police Station (Thana)',
        name_bn: 'রাঙামাটি কোতোয়ালি থানা',
        phone: '+8801320111520',
        category: 'police',
        description: 'Main town, Hanging bridge, and boat ghat police jurisdiction.',
        description_bn: 'রাঙামাটি সদর শহর ও ঝুলন্ত সেতু এলাকার প্রধান থানা।',
        address: 'Kotwali, Rangamati',
        available_hours: '24/7 Available',
      }
    ],
    hospital: [
      {
        id: 'rng-gen-hosp',
        name: 'Rangamati General Hospital (District Sadar Emergency)',
        name_bn: 'রাঙামাটি জেনারেল হাসপাতাল (জরুরি বিভাগ)',
        phone: '+88035162222',
        category: 'hospital',
        description: 'District primary 100-bed government hospital with anti-venom, emergency medicine, and malaria clinic.',
        description_bn: 'পার্বত্য জেলার প্রধান সরকারি হাসপাতাল। ম্যালেরিয়া চিকিৎসা, সর্পদংশন ও ট্রমা কেয়ার।',
        address: 'Hospital Road, Rangamati Sadar',
        available_hours: '24/7 Emergency Ward',
      },
      {
        id: 'rng-sajek-army-clinic',
        name: 'Baghaihat & Sajek Army Medical Post',
        name_bn: 'বাঘাইহাট ও সাজেক আর্মি মেডিকেল ক্যাম্প',
        phone: '+8801769312345',
        category: 'hospital',
        description: 'Emergency first aid, mountain injury stabilization, and evacuation assistance in Sajek.',
        description_bn: 'সাজেকে পর্যটকদের জরুরি প্রাথমিক চিকিৎসা ও পাহাড়ে জরুরি উদ্ধার সহায়তা।',
        address: 'Baghaihat Army Camp, Sajek Road',
        available_hours: '24/7 Emergency First Aid',
      }
    ],
    ambulance: [
      {
        id: 'rng-hill-amb',
        name: 'Rangamati Mountain & Water Ambulance Service',
        name_bn: 'রাঙামাটি ওয়াটার ও হিল অ্যাম্বুলেন্স সেবা',
        phone: '+8801819876543',
        category: 'ambulance',
        description: 'Fast speedboat ambulance on Kaptai Lake and 4x4 Chander Gari mountain emergency transit.',
        description_bn: 'কাপ্তাই হ্রদে স্পিডবোট ওয়াটার অ্যাম্বুলেন্স ও পাহাড়ি চাঁদের গাড়ি জরুরি সার্ভিস।',
        available_hours: '24/7 On-Call',
      },
      {
        id: 'rng-red-crescent-amb',
        name: 'Red Crescent Hill District Ambulance (Rangamati)',
        name_bn: 'রেড ক্রিসেন্ট হিল ডিস্ট্রিক্ট অ্যাম্বুলেন্স (রাঙামাটি)',
        phone: '+8801811458524',
        category: 'ambulance',
        description: 'Specialized 4x4 mountain emergency response vehicle for hill tracts.',
        description_bn: 'পার্বত্য পাহাড়ি রাস্তায় চলাচলের উপযোগী ফোর-হুইল অ্যাম্বুলেন্স।',
        available_hours: '24/7 On-Call',
      }
    ]
  },
  {
    id: 'bandarban',
    district: 'Bandarban',
    district_bn: 'বান্দরবান',
    division: 'Chattogram',
    division_bn: 'চট্টগ্রাম',
    tourist_hubs: ['Nilgiri', 'Nilachal', 'Nafakhum', 'Amiakhum', 'Boga Lake', 'Keokradong', 'Buddha Dhatu Jadi (Golden Temple)'],
    police: [
      {
        id: 'bnd-tp-desk',
        name: 'Tourist Police Bandarban Zone Control Desk',
        name_bn: 'ট্যুরিস্ট পুলিশ বান্দরবান জোন কন্ট্রোল ডেস্ক',
        phone: '+8801320163620',
        category: 'police',
        description: 'Tracking high-altitude trekkers, Chander Gari route safety, and remote mountain valley protection.',
        description_bn: 'নীলগিরি, নীলাচল ও বগালেক রুটে পর্যটকদের সার্বিক নিরাপত্তা ও গাইড সমন্বয়।',
        address: 'Nilachal Road, Bandarban Sadar',
        available_hours: '24/7 Available',
      },
      {
        id: 'bnd-sp-office',
        name: 'Superintendent of Police (SP) Control Room, Bandarban',
        name_bn: 'পুলিশ সুপার (এসপি) কন্ট্রোল রুম, বান্দরবান',
        phone: '+8801320112500',
        category: 'police',
        description: 'Bandarban hill tracts district central police control headquarters.',
        description_bn: 'বান্দরবান পার্বত্য জেলা কেন্দ্রীয় পুলিশ কন্ট্রোল রুম।',
        address: 'Bandarban Sadar',
        available_hours: '24/7 Available',
      }
    ],
    hospital: [
      {
        id: 'bnd-sadar-hosp',
        name: 'Bandarban 100-Bed District Sadar Hospital (Emergency)',
        name_bn: 'বান্দরবান ১০০ শয্যা বিশিষ্ট জেলা সদর হাসপাতাল (জরুরি বিভাগ)',
        phone: '+88036162234',
        category: 'hospital',
        description: 'Government hill trauma hospital with anti-venom, malaria emergency ward, and fracture stabilization.',
        description_bn: 'পাহাড়ি ট্রমা ও ফ্র্যাকচার চিকিৎসা, অ্যান্টি-ভেনম এবং ম্যালেরিয়া বিশেষায়িত ইউনিট।',
        address: 'Hospital Road, Bandarban Sadar',
        available_hours: '24/7 Emergency Ward',
      }
    ],
    ambulance: [
      {
        id: 'bnd-chander-amb',
        name: 'Bandarban Chander Gari & 4x4 Mountain Ambulance Desk',
        name_bn: 'বান্দরবান ফোর-হুইল পাহাড়ি জরুরি অ্যাম্বুলেন্স ডেস্ক',
        phone: '+8801815987654',
        category: 'ambulance',
        description: 'Heavy duty 4WD vehicle for steep mountain evacuations from Nilgiri and Ruma.',
        description_bn: 'নীলগিরি, রুমা ও থানচি পাহাড়ি অঞ্চল থেকে মুমূর্ষু রোগী স্থানান্তরের ৪x৪ বহর।',
        available_hours: '24/7 On-Call',
      }
    ]
  },
  {
    id: 'chattogram',
    district: 'Chattogram',
    district_bn: 'চট্টগ্রাম',
    division: 'Chattogram',
    division_bn: 'চট্টগ্রাম',
    tourist_hubs: ['Patenga Beach', 'Guliakhali Beach', 'Foy\'s Lake', 'Naval Beach', 'Sitakunda Chandranath Hill', 'Khaiyachhara Waterfall'],
    police: [
      {
        id: 'ctg-cmp-control',
        name: 'Chattogram Metropolitan Police (CMP) Central Control Room',
        name_bn: 'চট্টগ্রাম মেট্রোপলিটন পুলিশ (সিএমপি) কেন্দ্রীয় কন্ট্রোল রুম',
        phone: '+8801320050100',
        category: 'police',
        description: 'Port city emergency police dispatch covering Patenga, Agrabad, and GEC.',
        description_bn: 'চট্টগ্রাম বন্দর নগরী ও পর্যটন সৈকতের প্রধান পুলিশ কন্ট্রোল রুম।',
        address: 'CMP HQ, Dampara Police Lines, Chattogram',
        available_hours: '24/7 Available',
      },
      {
        id: 'ctg-tourist-police',
        name: 'Tourist Police Chattogram Region Desk (Patenga & Sitakunda)',
        name_bn: 'ট্যুরিস্ট পুলিশ চট্টগ্রাম রিজিয়ন (পতেঙ্গা ও সীতাকুণ্ড হেল্পলাইন)',
        phone: '+8801320163610',
        category: 'police',
        description: 'Beach surveillance, mountain trail guidance, and tourist rescue assistance.',
        description_bn: 'পতেঙ্গা সৈকত ও সীতাকুণ্ড পাহাড় ট্রেইলে পর্যটক নিরাপত্তা সেবা।',
        address: 'Patenga Sea Beach Police Box, Chattogram',
        available_hours: '24/7 Available',
      }
    ],
    hospital: [
      {
        id: 'ctg-cmch-er',
        name: 'Chattogram Medical College Hospital (CMCH Emergency)',
        name_bn: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল (সিএমসিএইচ জরুরি বিভাগ)',
        phone: '+88031616801',
        category: 'hospital',
        description: 'Largest tertiary govt teaching hospital in southeastern Bangladesh with 24/7 trauma & burn ICU.',
        description_bn: 'চট্টগ্রামের প্রধান সরকারি বিশেষায়িত হাসপাতাল। ২৪ ঘণ্টা জরুরি ট্রমা ও আইসিইউ সেবা।',
        address: '57 KB Fazlul Kader Road, Chattogram',
        available_hours: '24/7 Emergency Ward',
      },
      {
        id: 'ctg-cscr-hosp',
        name: 'CSCR Hospital & Heart Center (Private Emergency)',
        name_bn: 'সিএসসিআর হাসপাতাল ও হার্ট সেন্টার (জরুরি বিভাগ)',
        phone: '+88031656565',
        category: 'hospital',
        description: 'Leading private emergency center with advanced cardiac life support.',
        description_bn: 'উন্নত কার্ডিয়াক ও নিউরো জরুরি ট্রমা কেয়ার।',
        address: '1675/A O.R. Nizam Road, Chattogram',
        available_hours: '24/7 Emergency Ward',
      }
    ],
    ambulance: [
      {
        id: 'ctg-cmch-amb',
        name: 'CMCH Central Ambulance Service',
        name_bn: 'চট্টগ্রাম মেডিকেল কলেজ কেন্দ্রীয় অ্যাম্বুলেন্স',
        phone: '+8801819123987',
        category: 'ambulance',
        description: 'Govt. emergency transport covering Chattogram and hill district referrals.',
        description_bn: 'চট্টগ্রাম বিভাগের প্রধান সরকারি অ্যাম্বুলেন্স বহর।',
        available_hours: '24/7 On-Call',
      }
    ]
  },
  {
    id: 'patuakhali',
    district: 'Patuakhali',
    district_bn: 'পটুয়াখালী',
    division: 'Barishal',
    division_bn: 'বরিশাল',
    tourist_hubs: ['Kuakata Sea Beach', 'Fatrar Char Mangrove Forest', 'Jhuka Beach', 'Red Crab Island', 'Gangamati Reserved Forest'],
    police: [
      {
        id: 'pat-kuakata-tp',
        name: 'Tourist Police Kuakata Beach Zone Office',
        name_bn: 'ট্যুরিস্ট পুলিশ কুয়াকাটা সৈকত জোন অফিস',
        phone: '+8801320163690',
        category: 'police',
        description: 'Sunrise & sunset beach safety, speed boat supervision, and tourist hotline.',
        description_bn: 'সূর্যোদয় ও সূর্যাস্ত দেখার সৈকত, ঝাউবন ও শুঁটকি পল্লীতে সার্বক্ষণিক টহল।',
        address: 'Zero Point, Kuakata Sea Beach, Patuakhali',
        available_hours: '24/7 Available',
      },
      {
        id: 'pat-sp-office',
        name: 'Superintendent of Police (SP) Control Room, Patuakhali',
        name_bn: 'পুলিশ সুপার (এসপি) কন্ট্রোল রুম, পটুয়াখালী',
        phone: '+8801320150500',
        category: 'police',
        description: 'District police control room for southern coastal corridors.',
        description_bn: 'পটুয়াখালী জেলা পুলিশের কেন্দ্রীয় জরুরি কন্ট্রোল রুম।',
        address: 'Patuakhali Sadar',
        available_hours: '24/7 Available',
      }
    ],
    hospital: [
      {
        id: 'pat-250-hosp',
        name: 'Patuakhali 250-Bed District Sadar Hospital (Emergency)',
        name_bn: 'পটুয়াখালী ২৫০ শয্যা বিশিষ্ট জেলা হাসপাতাল (জরুরি বিভাগ)',
        phone: '+88044162345',
        category: 'hospital',
        description: 'Main coastal government hospital with surgical emergency and trauma care.',
        description_bn: 'উপকূলীয় অঞ্চলের প্রধান সরকারি হাসপাতাল। ২৪ ঘণ্টা জরুরি চিকিৎসা।',
        address: 'Hospital Road, Patuakhali',
        available_hours: '24/7 Emergency Ward',
      },
      {
        id: 'pat-kuakata-hosp',
        name: 'Kuakata 20-Bed Hospital (Emergency First Aid Center)',
        name_bn: 'কুয়াকাটা ২০ শয্যা বিশিষ্ট হাসপাতাল (জরুরি সেবা কেন্দ্র)',
        phone: '+8801712987654',
        category: 'hospital',
        description: 'Beachfront emergency clinic for immediate drowning rescue and medical stabilization.',
        description_bn: 'কুয়াকাটা সৈকতের নিকটস্থ জরুরি চিকিৎসা ও প্রাথমিক স্বাস্থ্যসেবা কেন্দ্র।',
        address: 'Kuakata Municipality, Patuakhali',
        available_hours: '24/7 Emergency Ward',
      }
    ],
    ambulance: [
      {
        id: 'pat-kuakata-amb',
        name: 'Kuakata Beach 24-Hour Sea-Resort Ambulance',
        name_bn: 'কুয়াকাটা সৈকত ২৪ ঘণ্টা জরুরি অ্যাম্বুলেন্স',
        phone: '+8801715456789',
        category: 'ambulance',
        description: 'Dedicated ambulance for beach hotels and swift transit to Barishal Medical.',
        description_bn: 'কুয়াকাটা থেকে বরিশাল শের-ই-বাংলা মেডিকেলে রোগী পরিবহনের জরুরি সার্ভিস।',
        available_hours: '24/7 On-Call',
      }
    ]
  },
  {
    id: 'moulvibazar',
    district: 'Moulvibazar',
    district_bn: 'মৌলভীবাজার',
    division: 'Sylhet',
    division_bn: 'সিলেট',
    tourist_hubs: ['Sreemangal Tea Capital', 'Lawachara National Park', 'Madhabkunda Waterfall', 'Baikka Beel', 'Hum Hum Waterfall'],
    police: [
      {
        id: 'mb-sreemangal-tp',
        name: 'Tourist Police Sreemangal Zone (Tea Garden & Rainforest)',
        name_bn: 'ট্যুরিস্ট পুলিশ শ্রীমঙ্গল জোন (চা বাগান ও লাউয়াছড়া)',
        phone: '+8801320163660',
        category: 'police',
        description: 'Security across scenic tea garden trails, resort zones, and Lawachara rainforest treks.',
        description_bn: 'চা বাগান, ইকো-রিসোর্ট ও লাউয়াছড়া রেইনফরেস্টে পর্যটক নিরাপত্তা সহায়তা।',
        address: 'Sreemangal Thana Road, Moulvibazar',
        available_hours: '24/7 Available',
      },
      {
        id: 'mb-sp-office',
        name: 'Superintendent of Police (SP) Control Room, Moulvibazar',
        name_bn: 'পুলিশ সুপার (এসপি) কন্ট্রোল রুম, মৌলভীবাজার',
        phone: '+8801320119500',
        category: 'police',
        description: 'District police headquarters control center.',
        description_bn: 'মৌলভীবাজার জেলা পুলিশ কেন্দ্রীয় কন্ট্রোল রুম।',
        address: 'Moulvibazar Sadar',
        available_hours: '24/7 Available',
      }
    ],
    hospital: [
      {
        id: 'mb-250-hosp',
        name: 'Moulvibazar 250-Bed District Sadar Hospital (Emergency)',
        name_bn: 'মৌলভীবাজার ২৫০ শয্যা জেলা সদর হাসপাতাল (জরুরি বিভাগ)',
        phone: '+88086152345',
        category: 'hospital',
        description: 'Primary emergency surgical, trauma, and anti-venom center in the tea belt.',
        description_bn: 'চা বাগান অঞ্চলের প্রধান সরকারি ট্রমা ও সর্পদংশন চিকিৎসা কেন্দ্র।',
        address: 'Hospital Road, Moulvibazar',
        available_hours: '24/7 Emergency Ward',
      },
      {
        id: 'mb-sreemangal-hosp',
        name: 'Sreemangal Upazila Health Complex (Emergency Ward)',
        name_bn: 'শ্রীমঙ্গল উপজেলা স্বাস্থ্য কমপ্লেক্স (জরুরি বিভাগ)',
        phone: '+880862671234',
        category: 'hospital',
        description: 'Immediate medical assistance close to all Sreemangal tea resorts.',
        description_bn: 'শ্রীমঙ্গলের পর্যটন রিসোর্টগুলোর নিকটস্থ সরকারি জরুরি চিকিৎসাকেন্দ্র।',
        address: 'Sreemangal Town, Moulvibazar',
        available_hours: '24/7 Emergency Ward',
      }
    ],
    ambulance: [
      {
        id: 'mb-sreemangal-amb',
        name: 'Sreemangal Tea Valley 24/7 AC Ambulance Fleet',
        name_bn: 'শ্রীমঙ্গল টি ভ্যালি ২৪/৭ এসি অ্যাম্বুলেন্স বহর',
        phone: '+8801711998877',
        category: 'ambulance',
        description: 'Equipped for rapid patient transit to Sylhet Osmani Medical or Dhaka.',
        description_bn: 'সিলেট বা ঢাকায় দ্রুত রোগী স্থানান্তরের জন্য বিশেষায়িত অ্যাম্বুলেন্স।',
        available_hours: '24/7 On-Call',
      }
    ]
  },
  {
    id: 'khulna',
    district: 'Khulna',
    district_bn: 'খুলনা',
    division: 'Khulna',
    division_bn: 'খুলনা',
    tourist_hubs: ['Sundarbans Mangrove Forest', 'Kotka Beach', 'Karamjal Wildlife Sanctuary', 'Khan Jahan Ali Mazar (Bagerhat)', 'Rupsha Bridge'],
    police: [
      {
        id: 'khl-kmp-control',
        name: 'Khulna Metropolitan Police (KMP) Central Control Room',
        name_bn: 'খুলনা মেট্রোপলিটন পুলিশ (কেএমপি) কন্ট্রোল রুম',
        phone: '+8801320140100',
        category: 'police',
        description: 'Citywide law enforcement and river port emergency response.',
        description_bn: 'খুলনা মহানগরী ও নদী বন্দর এলাকার কেন্দ্রীয় পুলিশ কন্ট্রোল রুম।',
        address: 'KMP HQ, Boyra, Khulna',
        available_hours: '24/7 Available',
      },
      {
        id: 'khl-coastguard',
        name: 'Bangladesh Coast Guard West Zone (Sundarbans Patrol)',
        name_bn: 'বাংলাদেশ কোস্টগার্ড পশ্চিম জোন (সুন্দরবন নৌ-টহল)',
        phone: '+8801769440000',
        category: 'police',
        description: 'Mangrove riverine pirate protection, cruise ship emergency, and forest rescue.',
        description_bn: 'সুন্দরবনের জলসীমায় পর্যটকবাহী ক্রুজ জাহাজের সার্বক্ষণিক নিরাপত্তা ও উদ্ধার।',
        address: 'Mongla Port / Khulna Base',
        available_hours: '24/7 Available',
      }
    ],
    hospital: [
      {
        id: 'khl-kmch-er',
        name: 'Khulna Medical College Hospital (KMCH Emergency Casualty)',
        name_bn: 'খুলনা মেডিকেল কলেজ হাসপাতাল (কেএমসিএইচ জরুরি বিভাগ)',
        phone: '+88041761535',
        category: 'hospital',
        description: '500-bed apex government teaching hospital in southwestern Bangladesh.',
        description_bn: 'দক্ষিণ-পশ্চিমাঞ্চলের প্রধান সরকারি মেডিকেল কলেজ ও জরুরি ট্রমা ইউনিট।',
        address: 'Boyra, Khulna',
        available_hours: '24/7 Emergency Ward',
      }
    ],
    ambulance: [
      {
        id: 'khl-redcrescent-amb',
        name: 'Red Crescent Khulna Division Emergency Ambulance',
        name_bn: 'রেড ক্রিসেন্ট খুলনা বিভাগীয় জরুরি অ্যাম্বুলেন্স',
        phone: '+8801811458524',
        category: 'ambulance',
        description: '24-hour service covering Khulna, Bagerhat, and Mongla port transfers.',
        description_bn: 'খুলনা ও মোংলা বন্দর অঞ্চলে সার্বক্ষণিক জরুরি অ্যাম্বুলেন্স।',
        available_hours: '24/7 On-Call',
      }
    ]
  },
  {
    id: 'rajshahi',
    district: 'Rajshahi',
    district_bn: 'রাজশাহী',
    division: 'Rajshahi',
    division_bn: 'রাজশাহী',
    tourist_hubs: ['Varendra Research Museum', 'Padma River Garden', 'Bagha Mosque', 'Puthia Temple Complex', 'Silk Factory'],
    police: [
      {
        id: 'raj-rmp-control',
        name: 'Rajshahi Metropolitan Police (RMP) Control Room',
        name_bn: 'রাজশাহী মেট্রোপলিটন পুলিশ (আরএমপি) কন্ট্রোল রুম',
        phone: '+8801320060100',
        category: 'police',
        description: 'Divisional capital central police control and tourist security.',
        description_bn: 'পদ্মা নদী তীর ও ঐতিহাসিক পুঠিয়া রাজবাড়ি এলাকার নিরাপত্তা।',
        address: 'RMP HQ, Rajshahi',
        available_hours: '24/7 Available',
      }
    ],
    hospital: [
      {
        id: 'raj-rmch-er',
        name: 'Rajshahi Medical College Hospital (RMCH 24/7 Emergency)',
        name_bn: 'রাজশাহী মেডিকেল কলেজ হাসপাতাল (আরএমসিএইচ জরুরি বিভাগ)',
        phone: '+880721772150',
        category: 'hospital',
        description: 'Largest tertiary medical hospital in northern Bangladesh with extensive trauma unit.',
        description_bn: 'উত্তরবঙ্গের প্রধান সরকারি বিশেষায়িত হাসপাতাল ও জরুরি বিভাগ।',
        address: 'Laxmipur, Rajshahi',
        available_hours: '24/7 Emergency Ward',
      }
    ],
    ambulance: [
      {
        id: 'raj-rmch-amb',
        name: 'Rajshahi Medical College Govt Ambulance Fleet',
        name_bn: 'রাজশাহী মেডিকেল কলেজ সরকারি অ্যাম্বুলেন্স বহর',
        phone: '+8801711345678',
        category: 'ambulance',
        description: 'Equipped for rapid emergency transport across all northern districts.',
        description_bn: 'রাজশাহী বিভাগ ও পার্শ্ববর্তী জেলাগুলোতে দ্রুত রোগী পরিবহনের অ্যাম্বুলেন্স।',
        available_hours: '24/7 On-Call',
      }
    ]
  },
  {
    id: 'barishal',
    district: 'Barishal',
    district_bn: 'বরিশাল',
    division: 'Barishal',
    division_bn: 'বরিশাল',
    tourist_hubs: ['Floating Guava Market (Bhimruli)', 'Durga Sagar Dighi', 'Launch Ghat', 'Guthia Mosque', 'Kuakata Transit'],
    police: [
      {
        id: 'bar-bmp-control',
        name: 'Barishal Metropolitan Police (BMP) Control Room',
        name_bn: 'বরিশাল মেট্রোপলিটন পুলিশ (বিএমপি) কন্ট্রোল রুম',
        phone: '+8801320150100',
        category: 'police',
        description: 'Riverport and floating market tourist security dispatch.',
        description_bn: 'বরিশাল নদীবন্দর, লঞ্চঘাট ও ভাসমান পেয়ারা বাজার নিরাপত্তা।',
        address: 'BMP HQ, Barishal',
        available_hours: '24/7 Available',
      }
    ],
    hospital: [
      {
        id: 'bar-sbmch-er',
        name: 'Sher-e-Bangla Medical College Hospital (SBMCH Emergency)',
        name_bn: 'শের-ই-বাংলা মেডিকেল কলেজ হাসপাতাল (জরুরি বিভাগ)',
        phone: '+8804312173543',
        category: 'hospital',
        description: 'Divisional tertiary hospital serving southern riverine Bangladesh.',
        description_bn: 'দক্ষিণাঞ্চলের প্রধান সরকারি বিশেষায়িত হাসপাতাল ও জরুরি ট্রমা সেন্টার।',
        address: 'Band Road, Barishal',
        available_hours: '24/7 Emergency Ward',
      }
    ],
    ambulance: [
      {
        id: 'bar-sbmch-amb',
        name: 'SBMCH Barishal River & Road Ambulance',
        name_bn: 'বরিশাল রোড ও রিভার অ্যাম্বুলেন্স সার্ভিস',
        phone: '+8801712334455',
        category: 'ambulance',
        description: 'Road ambulance and speed boat emergency transfer to launch ports.',
        description_bn: 'সড়ক ও নৌপথে দ্রুত রোগী পরিবহনে সার্বক্ষণিক অ্যাম্বুলেন্স।',
        available_hours: '24/7 On-Call',
      }
    ]
  },
  {
    id: 'bogura',
    district: 'Bogura',
    district_bn: 'বগুড়া',
    division: 'Rajshahi',
    division_bn: 'রাজশাহী',
    tourist_hubs: ['Mahasthangarh', 'Behula Lakshindar Basor Ghor', 'Kherua Mosque', 'Gokul Medh', 'Nawab Palace'],
    police: [
      {
        id: 'bog-sp-office',
        name: 'Superintendent of Police (SP) Control Room, Bogura',
        name_bn: 'পুলিশ সুপার (এসপি) কন্ট্রোল রুম, বগুড়া',
        phone: '+8801320126500',
        category: 'police',
        description: 'Archaeological site security and northern highway corridor patrol.',
        description_bn: 'মহাস্থানগড় প্রত্নতাত্ত্বিক এলাকা ও মহাসড়ক নিরাপত্তা।',
        address: 'Bogura Sadar',
        available_hours: '24/7 Available',
      }
    ],
    hospital: [
      {
        id: 'bog-szmc-hosp',
        name: 'Shaheed Ziaur Rahman Medical College Hospital (Emergency)',
        name_bn: 'শহীদ জিয়াউর রহমান মেডিকেল কলেজ হাসপাতাল (জরুরি বিভাগ)',
        phone: '+8805165780',
        category: 'hospital',
        description: '500-bed government referral teaching hospital for north Bengal.',
        description_bn: 'উত্তরবঙ্গের আধুনিক সরকারি ট্রমা ও সার্জারি জরুরি হাসপাতাল।',
        address: 'Silimpur, Bogura',
        available_hours: '24/7 Emergency Ward',
      }
    ],
    ambulance: [
      {
        id: 'bog-highway-amb',
        name: 'Bogura Highway 24/7 Emergency Ambulance',
        name_bn: 'বগুড়া হাইওয়ে ২৪/৭ জরুরি অ্যাম্বুলেন্স',
        phone: '+8801711223344',
        category: 'ambulance',
        description: 'Highway rescue and emergency transfer along Dhaka-Rangpur highway.',
        description_bn: 'মহাসড়কে জরুরি উদ্ধার ও রোগী পরিবহনে সার্বক্ষণিক অ্যাম্বুলেন্স।',
        available_hours: '24/7 On-Call',
      }
    ]
  }
];

// Search helper function
export function searchEmergencyDirectory(query: string): DistrictEmergencyProfile | null {
  if (!query || !query.trim()) return null;
  const q = query.trim().toLowerCase();

  // Search by district id or name
  const match = DISTRICT_EMERGENCY_DATA.find(d => 
    d.id.toLowerCase().includes(q) ||
    d.district.toLowerCase().includes(q) ||
    d.district_bn.includes(q) ||
    d.division.toLowerCase().includes(q) ||
    d.tourist_hubs.some(hub => hub.toLowerCase().includes(q))
  );

  return match || null;
}

// Fallback search that returns list of matches for autocomplete
export function getEmergencySuggestions(query: string): Array<{ name: string; name_bn: string; id: string; division: string }> {
  if (!query || !query.trim()) {
    return DISTRICT_EMERGENCY_DATA.map(d => ({
      name: d.district,
      name_bn: d.district_bn,
      id: d.id,
      division: d.division
    }));
  }

  const q = query.trim().toLowerCase();
  return DISTRICT_EMERGENCY_DATA
    .filter(d => 
      d.district.toLowerCase().includes(q) ||
      d.district_bn.includes(q) ||
      d.division.toLowerCase().includes(q) ||
      d.tourist_hubs.some(hub => hub.toLowerCase().includes(q))
    )
    .map(d => ({
      name: d.district,
      name_bn: d.district_bn,
      id: d.id,
      division: d.division
    }));
}
