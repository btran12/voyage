export type Country = {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  tz: string;
  visaSummary: string;
  emergency: string;
  drives: 'left' | 'right';
};

export const COUNTRIES: Country[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    tz: 'America/New_York',
    visaSummary: 'ESTA or visa may be required depending on nationality.',
    emergency: '911',
    drives: 'right'
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    currency: 'JPY',
    symbol: '¥',
    tz: 'Asia/Tokyo',
    visaSummary: 'Visa-free up to 90 days for many countries.',
    emergency: '110 / 119',
    drives: 'left'
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    symbol: '€',
    tz: 'Europe/Paris',
    visaSummary: 'Schengen 90/180 rule for many travelers.',
    emergency: '112',
    drives: 'right'
  },
  {
    code: 'VN',
    name: 'Vietnam',
    flag: '🇻🇳',
    currency: 'VND',
    symbol: '₫',
    tz: 'Asia/Ho_Chi_Minh',
    visaSummary: 'E-visa available for many nationalities.',
    emergency: '113 / 114 / 115',
    drives: 'right'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    symbol: '£',
    tz: 'Europe/London',
    visaSummary: 'ETA may be required for eligible nationalities.',
    emergency: '999',
    drives: 'left'
  }
];
