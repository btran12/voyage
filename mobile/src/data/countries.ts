export type Phrase = {
  english: string;
  local: string;
  pronunciation: string;
};

export type Country = {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  tz: string;
  capital: string;
  language: string;
  plug: string;
  voltage: string;
  visaSummary: string;
  emergency: {
    police: string;
    ambulance: string;
    fire: string;
  };
  drives: 'left' | 'right';
  weather: {
    icon: string;
    description: string;
    tempC: number;
    humidity: number;
  };
  phrases: Phrase[];
  packingTips: string[];
  mustSee: string[];
};

export const COUNTRIES: Country[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    tz: 'America/New_York',
    capital: 'Washington, D.C.',
    language: 'English',
    plug: 'A/B',
    voltage: '120V / 60Hz',
    visaSummary: 'ESTA or visa may be required depending on nationality.',
    emergency: { police: '911', ambulance: '911', fire: '911' },
    drives: 'right',
    weather: { icon: '⛅', description: 'Partly cloudy', tempC: 16, humidity: 62 },
    phrases: [
      { english: 'Hello', local: 'Hello', pronunciation: 'heh-loh' },
      { english: 'Thank you', local: 'Thank you', pronunciation: 'thangk-yoo' }
    ],
    packingTips: ['Layered clothing', 'Portable charger', 'Travel insurance card'],
    mustSee: ['New York City', 'Grand Canyon', 'San Francisco']
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    currency: 'JPY',
    symbol: '¥',
    tz: 'Asia/Tokyo',
    capital: 'Tokyo',
    language: 'Japanese',
    plug: 'A/B',
    voltage: '100V / 50-60Hz',
    visaSummary: 'Visa-free up to 90 days for many countries.',
    emergency: { police: '110', ambulance: '119', fire: '119' },
    drives: 'left',
    weather: { icon: '🌤️', description: 'Mild and sunny', tempC: 19, humidity: 58 },
    phrases: [
      { english: 'Hello', local: 'こんにちは', pronunciation: 'kon-ni-chi-wa' },
      { english: 'Thank you', local: 'ありがとう', pronunciation: 'a-ri-ga-toh' }
    ],
    packingTips: ['Comfortable walking shoes', 'Cash for smaller shops', 'Transit IC card'],
    mustSee: ['Shibuya Crossing', 'Kyoto Temples', 'Mount Fuji']
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    symbol: '€',
    tz: 'Europe/Paris',
    capital: 'Paris',
    language: 'French',
    plug: 'C/E',
    voltage: '230V / 50Hz',
    visaSummary: 'Schengen 90/180 rule for many travelers.',
    emergency: { police: '17', ambulance: '15', fire: '18' },
    drives: 'right',
    weather: { icon: '🌦️', description: 'Light showers', tempC: 14, humidity: 71 },
    phrases: [
      { english: 'Hello', local: 'Bonjour', pronunciation: 'bon-zhoor' },
      { english: 'Thank you', local: 'Merci', pronunciation: 'mehr-see' }
    ],
    packingTips: ['Compact umbrella', 'Museum pass', 'Universal adapter'],
    mustSee: ['Eiffel Tower', 'Louvre Museum', 'French Riviera']
  },
  {
    code: 'VN',
    name: 'Vietnam',
    flag: '🇻🇳',
    currency: 'VND',
    symbol: '₫',
    tz: 'Asia/Ho_Chi_Minh',
    capital: 'Hanoi',
    language: 'Vietnamese',
    plug: 'A/C/F',
    voltage: '220V / 50Hz',
    visaSummary: 'E-visa available for many nationalities.',
    emergency: { police: '113', ambulance: '115', fire: '114' },
    drives: 'right',
    weather: { icon: '🌧️', description: 'Warm with rain', tempC: 29, humidity: 83 },
    phrases: [
      { english: 'Hello', local: 'Xin chào', pronunciation: 'sin chow' },
      { english: 'Thank you', local: 'Cảm ơn', pronunciation: 'gahm uhn' }
    ],
    packingTips: ['Breathable clothes', 'Mosquito repellent', 'Light rain jacket'],
    mustSee: ['Ha Long Bay', 'Hoi An Ancient Town', 'Ho Chi Minh City']
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    symbol: '£',
    tz: 'Europe/London',
    capital: 'London',
    language: 'English',
    plug: 'G',
    voltage: '230V / 50Hz',
    visaSummary: 'ETA may be required for eligible nationalities.',
    emergency: { police: '999', ambulance: '999', fire: '999' },
    drives: 'left',
    weather: { icon: '🌥️', description: 'Cool and cloudy', tempC: 12, humidity: 68 },
    phrases: [
      { english: 'Hello', local: 'Hiya', pronunciation: 'hai-yah' },
      { english: 'Thank you', local: 'Cheers', pronunciation: 'cheerz' }
    ],
    packingTips: ['Waterproof jacket', 'Contactless card', 'Comfortable shoes'],
    mustSee: ['London Eye', 'Edinburgh Castle', 'Lake District']
  }
];
