import { CITY_COORDS, Country, LANG_CODES, RATES_USD } from '../data/countries';

export type VisaStatus = {
  tone: 'ok' | 'warn' | 'danger';
  icon: string;
  text: string;
  detail: string;
  days?: number;
};

export type WeatherResult = {
  city: string;
  current: {
    temperature_2m: number;
    weathercode: number;
    windspeed_10m: number;
    relativehumidity_2m: number;
  };
  daily?: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};

export type ExchangeRateResult = {
  rate: number;
  updatedAt?: string;
};

export function formatTime(timeZone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone
    }).format(new Date());
  } catch {
    return '--:--:--';
  }
}

export function formatDate(timeZone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      timeZone
    }).format(new Date());
  } catch {
    return '';
  }
}

export function getTimeDiff(homeTz: string, visitTz: string): string {
  try {
    const now = new Date();
    const home = getZonedTimestamp(now, homeTz);
    const visit = getZonedTimestamp(now, visitTz);
    const hours = Math.round((visit - home) / 3600000);
    if (!Number.isFinite(hours)) return '?';
    if (hours === 0) return 'Same time';
    return `${hours > 0 ? '+' : ''}${hours}h`;
  } catch {
    return '?';
  }
}

function getZonedTimestamp(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, Number(part.value)])
  );

  return Date.UTC(
    values.year,
    values.month - 1,
    values.day,
    values.hour % 24,
    values.minute,
    values.second
  );
}

export function getRate(fromCurrency: string, toCurrency: string): number {
  const from = RATES_USD[fromCurrency] ?? 1;
  const to = RATES_USD[toCurrency] ?? 1;
  return to / from;
}

export async function fetchExchangeRate(fromCurrency: string, toCurrency: string): Promise<ExchangeRateResult | null> {
  if (fromCurrency === toCurrency) return { rate: 1 };

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(fromCurrency)}`);
    const data = await response.json();
    const rate = data?.rates?.[toCurrency];

    if (data?.result !== 'success' || typeof rate !== 'number') {
      return null;
    }

    return {
      rate,
      updatedAt: data.time_last_update_utc
    };
  } catch {
    return null;
  }
}

export function formatRate(rate: number): string {
  if (rate >= 1000) return formatCurrencyAmount(rate, 0);
  if (rate >= 100) return rate.toFixed(1);
  return rate.toFixed(4);
}

export function formatQuickAmount(value: number): string {
  if (value >= 10) return formatCurrencyAmount(value, 0);
  return formatCurrencyAmount(value, 2);
}

export function parseCurrencyAmount(value: string): number {
  return Number(value.replace(/,/g, '')) || 0;
}

export function formatCurrencyInput(value: string): string {
  const cleaned = value
    .replace(/,/g, '')
    .replace(/[^\d.]/g, '')
    .replace(/(\..*)\./g, '$1');
  const [integer = '', decimal] = cleaned.split('.');
  const groupedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (cleaned.endsWith('.')) return `${groupedInteger}.`;
  if (decimal !== undefined) return `${groupedInteger}.${decimal}`;
  return groupedInteger;
}

export function formatCurrencyAmount(value: number, fractionDigits = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value);
}

export function getVisaStatus(home: Country, visit: Country): VisaStatus {
  if (home.code === visit.code) {
    return { tone: 'ok', icon: '✓', text: 'You are home!', detail: '' };
  }

  if (visit.visa.default === 'free') {
    return {
      tone: 'ok',
      icon: '✓',
      text: 'Visa Not Required',
      detail: visit.visa.text,
      days: visit.visa.days
    };
  }

  if (visit.visa.default === 'voa') {
    return {
      tone: 'warn',
      icon: '⚡',
      text: 'Visa / ETA Required',
      detail: visit.visa.text,
      days: visit.visa.days
    };
  }

  return {
    tone: 'danger',
    icon: '⚠',
    text: 'Visa Required',
    detail: visit.visa.text,
    days: visit.visa.days
  };
}

export function getPackingTips(home: Country, visit: Country): string[] {
  const tips: string[] = [];

  if (home.plug !== visit.plug) {
    tips.push(`Bring a Type ${visit.plug} plug adapter. Plugs differ from home.`);
  }

  const homeVoltage = Number.parseInt(home.voltage, 10);
  const visitVoltage = Number.parseInt(visit.voltage, 10);
  if (Math.abs(homeVoltage - visitVoltage) > 20) {
    tips.push(`Check device compatibility. ${visit.name} uses ${visit.voltage}.`);
  }

  if (home.drives !== visit.drives) {
    tips.push(`Traffic drives on the ${visit.drives}. Stay alert when crossing roads.`);
  }

  if (['TH', 'VN', 'SG', 'IN', 'BR', 'MX'].includes(visit.code)) {
    tips.push('Pack lightweight, breathable clothing. Humidity can be high.');
  }

  if (['JP', 'CA', 'DE', 'CH', 'NO'].includes(visit.code)) {
    tips.push('Layer up. Temperatures can drop significantly, especially at night.');
  }

  if (home.lang !== visit.lang && visit.lang !== 'English') {
    tips.push(`Learn basic ${visit.lang} phrases. Locals appreciate the effort.`);
  }

  tips.push(`Keep some ${visit.currency} cash handy. Not all venues accept cards.`);
  tips.push('Store passport and visa copies in cloud storage as a backup.');
  tips.push('Check travel insurance coverage before departure.');

  if (tips.length < 4) tips.push('Download offline maps for the destination city.');
  return tips.slice(0, 6);
}

export async function fetchWeather(countryCode: string): Promise<WeatherResult | null> {
  const coord = CITY_COORDS[countryCode];
  if (!coord) return null;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coord.lat}&longitude=${coord.lon}&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=4`;
    const response = await fetch(url);
    const data = await response.json();
    return { ...data, city: coord.city };
  } catch {
    return null;
  }
}

export function cToF(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

export function displayTemp(celsius: number, unit: 'C' | 'F'): string {
  return unit === 'C' ? `${Math.round(celsius)}°C` : `${cToF(celsius)}°F`;
}

export async function translateToDestination(text: string, visit: Country): Promise<string> {
  const targetLang = LANG_CODES[visit.code] ?? 'en';
  if (targetLang === 'en') return 'The destination language is English. No translation needed.';

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
  const response = await fetch(url);
  const data = await response.json();
  const translated = data.responseData?.translatedText;

  if (!translated || data.responseStatus !== 200) {
    throw new Error('Translation failed');
  }

  return translated;
}
