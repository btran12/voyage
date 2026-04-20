import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { COUNTRIES, Country, WMO_DESC, WMO_ICONS } from './src/data/countries';
import {
  displayTemp,
  fetchExchangeRate,
  fetchWeather,
  formatCurrencyAmount,
  formatCurrencyInput,
  formatDate,
  formatQuickAmount,
  formatRate,
  formatTime,
  getPackingTips,
  getRate,
  getTimeDiff,
  getVisaStatus,
  parseCurrencyAmount,
  translateToDestination,
  WeatherResult
} from './src/utils/format';

type ActivePage = 'home' | 'currency' | 'weather' | 'places' | 'translator';

type CountryPickerProps = {
  label: string;
  value: Country;
  onSelect: (country: Country) => void;
};

type TranslationItem = {
  en: string;
  local: string;
  lang: string;
};

const sortedCountries = [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name));
const quickAmounts = [10, 20, 50, 100, 200, 500];
const navItems: { key: ActivePage; label: string; icon: string }[] = [
  { key: 'home', label: 'Home', icon: '⌂' },
  { key: 'currency', label: 'Currency', icon: '$' },
  { key: 'weather', label: 'Weather', icon: '☼' },
  { key: 'places', label: 'Places', icon: '◎' },
  { key: 'translator', label: 'Translate', icon: '文' }
];

function formatForecastDay(date: string): string {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(parsed);
}

function CountryPicker({ label, value, onSelect }: CountryPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.selectorBlock}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.selector} onPress={() => setOpen(true)}>
        <Text style={styles.selectorText} numberOfLines={1}>{`${value.flag} ${value.name}`}</Text>
        <Text style={styles.selectorMeta} numberOfLines={1}>{`${value.currency} - ${value.capital}`}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBody}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose country</Text>
              <Pressable onPress={() => setOpen(false)}>
                <Text style={styles.modalClose}>Close</Text>
              </Pressable>
            </View>
            <ScrollView>
              {sortedCountries.map((country) => (
                <Pressable
                  key={country.code}
                  style={styles.countryItem}
                  onPress={() => {
                    onSelect(country);
                    setOpen(false);
                  }}
                >
                  <Text style={styles.countryName}>{`${country.flag} ${country.name}`}</Text>
                  <Text style={styles.countryMeta}>{`${country.currency} - ${country.lang} - ${country.airport}`}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <View style={styles.sectionRow}>
      <View style={styles.sectionLine} />
      <Text style={styles.sectionTitle}>{children}</Text>
      <View style={styles.sectionLine} />
    </View>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function EmergencyButton({ label, number }: { label: string; number: string }) {
  const dial = number.match(/[+\d][+\d\s-]*/)?.[0]?.replace(/\s/g, '');

  return (
    <Pressable
      style={styles.emergencyItem}
      onPress={() => {
        if (dial) Linking.openURL(`tel:${dial}`);
      }}
    >
      <Text style={styles.emergencyNumber}>{number}</Text>
      <Text style={styles.emergencyLabel}>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [origin, setOrigin] = useState(COUNTRIES.find((country) => country.code === 'US') ?? COUNTRIES[0]);
  const [destination, setDestination] = useState(COUNTRIES.find((country) => country.code === 'VN') ?? COUNTRIES[1]);
  const [amount, setAmount] = useState('100');
  const [swapped, setSwapped] = useState(false);
  const [liveRate, setLiveRate] = useState<number | null>(null);
  const [rateLoading, setRateLoading] = useState(false);
  const [rateUpdatedAt, setRateUpdatedAt] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherUnit, setWeatherUnit] = useState<'C' | 'F'>('C');
  const [translationInput, setTranslationInput] = useState('');
  const [translationOutput, setTranslationOutput] = useState('');
  const [translationLoading, setTranslationLoading] = useState(false);
  const [translationHistory, setTranslationHistory] = useState<TranslationItem[]>([]);
  const [, setClockTick] = useState(0);

  useEffect(() => {
    AsyncStorage.multiGet(['voyage-home', 'voyage-visit']).then((pairs) => {
      const homeCode = pairs.find(([key]) => key === 'voyage-home')?.[1];
      const visitCode = pairs.find(([key]) => key === 'voyage-visit')?.[1];
      const savedHome = COUNTRIES.find((country) => country.code === homeCode);
      const savedVisit = COUNTRIES.find((country) => country.code === visitCode);
      if (savedHome) setOrigin(savedHome);
      if (savedVisit) setDestination(savedVisit);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.multiSet([
      ['voyage-home', origin.code],
      ['voyage-visit', destination.code]
    ]);
  }, [destination.code, origin.code]);

  useEffect(() => {
    let alive = true;
    setWeatherLoading(true);
    setWeather(null);

    fetchWeather(destination.code).then((result) => {
      if (!alive) return;
      setWeather(result);
      setWeatherLoading(false);
    });

    return () => {
      alive = false;
    };
  }, [destination.code]);

  useEffect(() => {
    const interval = setInterval(() => setClockTick((tick) => tick + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const from = swapped ? destination : origin;
  const to = swapped ? origin : destination;
  const numericAmount = parseCurrencyAmount(amount);
  const fallbackRate = useMemo(() => getRate(from.currency, to.currency), [from.currency, to.currency]);
  const rate = liveRate ?? fallbackRate;
  const converted = numericAmount * rate;
  const visa = useMemo(() => getVisaStatus(origin, destination), [origin, destination]);
  const packingTips = useMemo(() => getPackingTips(origin, destination), [origin, destination]);
  const phrases = Object.entries(destination.phrases);
  const currentWeather = weather?.current;
  const weatherCode = currentWeather?.weathercode ?? -1;
  const dailyForecast = weather?.daily?.time
    ?.map((date, index) => ({
      date,
      code: weather.daily?.weathercode[index] ?? -1,
      max: weather.daily?.temperature_2m_max[index],
      min: weather.daily?.temperature_2m_min[index]
    }))
    .slice(1, 4) ?? [];

  useEffect(() => {
    let alive = true;
    setLiveRate(null);
    setRateUpdatedAt(null);
    setRateLoading(true);

    fetchExchangeRate(from.currency, to.currency).then((result) => {
      if (!alive) return;
      setLiveRate(result?.rate ?? null);
      setRateUpdatedAt(result?.updatedAt ?? null);
      setRateLoading(false);
    });

    return () => {
      alive = false;
    };
  }, [from.currency, to.currency]);

  async function translate() {
    const text = translationInput.trim();
    if (!text) return;

    setTranslationLoading(true);
    setTranslationOutput('Translating...');

    try {
      const translated = await translateToDestination(text, destination);
      setTranslationOutput(translated);
      setTranslationHistory((items) => [
        { en: text, local: translated, lang: destination.lang },
        ...items
      ].slice(0, 10));
    } catch {
      setTranslationOutput('Could not reach the translation service. Check your connection and try again.');
    } finally {
      setTranslationLoading(false);
    }
  }

  async function copyTranslation() {
    if (!translationOutput) return;
    await Clipboard.setStringAsync(translationOutput);
    Alert.alert('Copied', 'Translation copied to clipboard.');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.brand}>VOYAGE</Text>
          <Text style={styles.subtitle}>International Travel Dashboard</Text>
        </View>

        <View style={styles.routeSelectors}>
          <CountryPicker label="Origin" value={origin} onSelect={setOrigin} />
          <Text style={styles.routeArrow}>&gt;</Text>
          <CountryPicker label="Destination" value={destination} onSelect={setDestination} />
        </View>

        {activePage === 'home' && (
          <>
            <SectionTitle>Time & Location</SectionTitle>
            <Card title="Dual Time">
              <View style={styles.clockGrid}>
                <View style={styles.clockFace}>
                  <Text style={styles.clockTime}>{formatTime(origin.tz)}</Text>
                  <Text style={styles.muted} numberOfLines={1}>{formatDate(origin.tz)}</Text>
                  <Text style={styles.accentSmall} numberOfLines={1}>{`${origin.flag} ${origin.name}`}</Text>
                </View>
                <View style={styles.diffPill}>
                  <Text style={styles.diffValue}>{getTimeDiff(origin.tz, destination.tz)}</Text>
                </View>
                <View style={styles.clockFace}>
                  <Text style={[styles.clockTime, styles.blueText]}>{formatTime(destination.tz)}</Text>
                  <Text style={styles.muted} numberOfLines={1}>{formatDate(destination.tz)}</Text>
                  <Text style={styles.accentSmall} numberOfLines={1}>{`${destination.flag} ${destination.name}`}</Text>
                </View>
              </View>
            </Card>

            <Card title="Route Overview">
              <View style={styles.flightBar}>
                <View style={styles.flightEnd}>
                  <Text style={styles.airport}>{origin.airport}</Text>
                  <Text style={styles.muted}>{origin.capital}</Text>
                </View>
                <View style={styles.flightCenter}>
                  <Text style={styles.plane}>✈</Text>
                  <Text style={styles.muted}>{`${origin.flag} > ${destination.flag}`}</Text>
                </View>
                <View style={styles.flightEnd}>
                  <Text style={styles.airport}>{destination.airport}</Text>
                  <Text style={styles.muted}>{destination.capital}</Text>
                </View>
              </View>
              <Text style={styles.footnote}>Major international airports shown.</Text>
            </Card>

            <Card title="Visa Status">
              <View style={[styles.visaBadge, styles[`visa_${visa.tone}`]]}>
                <Text style={[styles.visaText, styles[`visaText_${visa.tone}`]]}>{`${visa.icon} ${visa.text}`}</Text>
              </View>
              {!!visa.detail && <Text style={styles.bodyText}>{visa.detail}</Text>}
              {!!visa.days && <Text style={styles.blueLine}>{`Stay up to: ${visa.days} days`}</Text>}
            </Card>

            <View style={styles.twoColumn}>
              <Card title="Power & Plug">
                <Text style={styles.largeIcon}>🔌</Text>
                <Text style={styles.bodyText}>{`Type: ${destination.plug}`}</Text>
                <Text style={styles.bodyText}>{`Voltage: ${destination.voltage}`}</Text>
                <Text style={origin.plug === destination.plug ? styles.greenLine : styles.dangerLine}>
                  {origin.plug === destination.plug ? 'Compatible with home plugs' : 'Adapter needed'}
                </Text>
                {Number.parseInt(origin.voltage, 10) !== Number.parseInt(destination.voltage, 10) && (
                  <Text style={styles.warnLine}>Check whether your devices need a converter.</Text>
                )}
              </Card>

              <Card title="Driving Side">
                <Text style={styles.largeIcon}>{destination.drives === 'right' ? '🚗→' : '←🚗'}</Text>
                <Text style={styles.bodyText}>{`Drives on the ${destination.drives}`}</Text>
                <Text style={origin.drives === destination.drives ? styles.greenLine : styles.dangerLine}>
                  {origin.drives === destination.drives ? 'Same as home' : 'Opposite to home. Take care.'}
                </Text>
              </Card>
            </View>

            <SectionTitle>Safety & Communication</SectionTitle>
            <Card title="Emergency Numbers">
              <View style={styles.emergencyGrid}>
                <EmergencyButton label="Police" number={destination.emergency.police} />
                <EmergencyButton label="Ambulance" number={destination.emergency.ambulance} />
                <EmergencyButton label="Fire" number={destination.emergency.fire} />
                <EmergencyButton label="Tourist Helpline" number={destination.emergency.tourist} />
              </View>
            </Card>

            <Card title={`Essential Phrases - ${destination.lang}`}>
              {phrases.length > 0 ? (
                phrases.map(([english, [local, pronunciation]]) => (
                  <View key={english} style={styles.phraseRow}>
                    <Text style={styles.phraseEnglish}>{english}</Text>
                    <View style={styles.phraseLocalWrap}>
                      <Text style={styles.phraseLocal}>{local}</Text>
                      <Text style={styles.phrasePronunciation}>{pronunciation}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.bodyText}>English is widely spoken or phrases are not available for this destination.</Text>
              )}
            </Card>

            <Card title="Packing & Travel Tips">
              {packingTips.map((tip) => (
                <View key={tip} style={styles.tipRow}>
                  <View style={styles.tipDot} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </Card>
          </>
        )}

        {activePage === 'currency' && (
          <>
            <SectionTitle>Money & Exchange</SectionTitle>
            <Card title="Currency Converter">
              <View style={styles.currencyRow}>
                <View>
                  <Text style={styles.currencyCode}>{from.currency}</Text>
                  <Text style={styles.muted}>{from.name}</Text>
                </View>
                <TextInput
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={(value) => setAmount(formatCurrencyInput(value))}
                  style={styles.currencyInput}
                />
              </View>
              <View style={styles.rateRow}>
                <Text style={styles.rateText}>{`1 ${from.currency} = ${formatRate(rate)} ${to.currency}`}</Text>
                <Pressable style={styles.swapButton} onPress={() => setSwapped((value) => !value)}>
                  <Text style={styles.swapText}>⇅</Text>
                </Pressable>
              </View>
              <Text style={styles.rateSource}>
                {rateLoading
                  ? 'Fetching live exchange rate...'
                  : liveRate
                    ? `Live rate via ExchangeRate-API${rateUpdatedAt ? ` - ${rateUpdatedAt}` : ''}`
                    : 'Using offline fallback rate'}
              </Text>
              <View style={styles.currencyRow}>
                <View>
                  <Text style={styles.currencyCode}>{to.currency}</Text>
                  <Text style={styles.muted}>{to.name}</Text>
                </View>
                <Text style={styles.resultValue}>{`${to.symbol}${formatCurrencyAmount(converted)}`}</Text>
              </View>
            </Card>

            <Card title={`Quick Reference - ${from.currency} > ${to.currency}`}>
              <View style={styles.quickGrid}>
                {quickAmounts.map((quickAmount) => (
                  <View key={quickAmount} style={styles.quickItem}>
                    <Text style={styles.quickFrom}>{`${from.symbol}${quickAmount}`}</Text>
                    <Text style={styles.quickTo}>{`${to.symbol}${formatQuickAmount(quickAmount * rate)}`}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </>
        )}

        {activePage === 'weather' && (
          <>
            <SectionTitle>Weather & Environment</SectionTitle>
            <Card title={`Current Weather - ${destination.name}`}>
              {weatherLoading ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator />
                  <Text style={styles.muted}>Fetching weather...</Text>
                </View>
              ) : currentWeather ? (
                <>
                  <View style={styles.weatherTop}>
                    <Text style={styles.weatherIcon}>{WMO_ICONS[weatherCode] ?? '🌡'}</Text>
                    <View style={styles.weatherInfo}>
                      <Text style={styles.accentSmall}>{weather?.city}</Text>
                      <Text style={styles.weatherTemp}>{displayTemp(currentWeather.temperature_2m, weatherUnit)}</Text>
                      <Text style={styles.muted}>{WMO_DESC[weatherCode] ?? 'Unknown'}</Text>
                    </View>
                    <View style={styles.unitToggle}>
                      {(['C', 'F'] as const).map((unit) => (
                        <Pressable
                          key={unit}
                          style={[styles.unitButton, weatherUnit === unit && styles.unitButtonActive]}
                          onPress={() => setWeatherUnit(unit)}
                        >
                          <Text style={[styles.unitText, weatherUnit === unit && styles.unitTextActive]}>{unit}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                  <View style={styles.weatherStats}>
                    <View style={styles.statBox}>
                      <Text style={styles.statValue}>{`${currentWeather.windspeed_10m} km/h`}</Text>
                      <Text style={styles.statLabel}>Wind</Text>
                    </View>
                    <View style={styles.statBox}>
                      <Text style={styles.statValue}>{`${currentWeather.relativehumidity_2m}%`}</Text>
                      <Text style={styles.statLabel}>Humidity</Text>
                    </View>
                    <View style={styles.statBox}>
                      <Text style={styles.statValue}>{displayTemp(currentWeather.temperature_2m - 2, weatherUnit)}</Text>
                      <Text style={styles.statLabel}>Feels Like</Text>
                    </View>
                  </View>
                  {dailyForecast.length > 0 && (
                    <View style={styles.forecastList}>
                      <Text style={styles.forecastTitle}>Next Few Days</Text>
                      {dailyForecast.map((day) => (
                        <View key={day.date} style={styles.forecastRow}>
                          <Text style={styles.forecastIcon}>{WMO_ICONS[day.code] ?? '🌡'}</Text>
                          <View style={styles.forecastInfo}>
                            <Text style={styles.forecastDay}>{formatForecastDay(day.date)}</Text>
                            <Text style={styles.muted}>{WMO_DESC[day.code] ?? 'Forecast'}</Text>
                          </View>
                          <Text style={styles.forecastTemp}>
                            {`${displayTemp(day.max ?? 0, weatherUnit)} / ${displayTemp(day.min ?? 0, weatherUnit)}`}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </>
              ) : (
                <Text style={styles.bodyText}>Weather unavailable. Check your connection.</Text>
              )}
            </Card>
          </>
        )}

        {activePage === 'places' && (
          <>
            <SectionTitle>Top Places to Visit</SectionTitle>
            <Card title={`Must-See Destinations - ${destination.name}`}>
              {destination.spots.map((spot) => (
                <View key={`${spot.name}-${spot.desc}`} style={styles.spotItem}>
                  <Text style={styles.spotName}>{`${spot.emoji} ${spot.name}`}</Text>
                  <Text style={styles.bodyText}>{spot.desc}</Text>
                </View>
              ))}
            </Card>
          </>
        )}

        {activePage === 'translator' && (
          <>
            <SectionTitle>Translator</SectionTitle>
            <Card title={`Type & Translate - English > ${destination.lang}`}>
              <TextInput
                multiline
                maxLength={500}
                value={translationInput}
                onChangeText={setTranslationInput}
                placeholder="Where is the nearest pharmacy?"
                placeholderTextColor="#8b8175"
                style={styles.translateInput}
              />
              <Pressable
                style={[styles.translateButton, translationLoading && styles.translateButtonDisabled]}
                onPress={translate}
                disabled={translationLoading}
              >
                <Text style={styles.translateButtonText}>
                  {translationLoading ? 'Translating...' : `Translate to ${destination.lang}`}
                </Text>
              </Pressable>
              <Pressable style={styles.translationResult} onPress={copyTranslation}>
                <Text style={translationOutput ? styles.bodyText : styles.placeholderText}>
                  {translationOutput || 'Translation will appear here. Tap the result to copy it.'}
                </Text>
              </Pressable>
            </Card>

            <Card title="Recent Translations">
              {translationHistory.length > 0 ? (
                translationHistory.map((item, index) => (
                  <Pressable
                    key={`${item.en}-${index}`}
                    style={styles.historyItem}
                    onPress={() => setTranslationInput(item.en)}
                  >
                    <Text style={styles.historyEnglish}>{item.en}</Text>
                    <Text style={styles.historyLocal}>{`${item.local} (${item.lang})`}</Text>
                  </Pressable>
                ))
              ) : (
                <Text style={styles.placeholderText}>Your translations will appear here.</Text>
              )}
            </Card>
          </>
        )}

        <View style={styles.statusBar}>
          <Text style={styles.statusRoute}>{`${origin.flag} ${origin.name} > ${destination.flag} ${destination.name}`}</Text>
          <Text style={styles.statusText}>
            Rates approximate - Weather by Open-Meteo - Translation by MyMemory - Verify visas officially
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {navItems.map((item) => {
          const active = activePage === item.key;
          return (
            <Pressable
              key={item.key}
              style={[styles.navItem, active && styles.navItemActive]}
              onPress={() => setActivePage(item.key)}
            >
              <Text style={[styles.navIcon, active && styles.navTextActive]}>{item.icon}</Text>
              <Text style={[styles.navLabel, active && styles.navTextActive]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const colors = {
  bg: '#f5f2ec',
  surface: '#ffffff',
  surface2: '#f0ece3',
  border: '#ded7cd',
  accent: '#9a6f2e',
  blue: '#2e7fa0',
  green: '#3a8c3d',
  danger: '#b04040',
  text: '#1a1612',
  muted: '#746b60'
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 18, gap: 14, paddingBottom: 104 },
  header: { gap: 4, paddingTop: 6, paddingBottom: 4 },
  brand: {
    color: colors.accent,
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 6,
    textAlign: 'center'
  },
  subtitle: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 2,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  routeSelectors: { alignItems: 'flex-end', flexDirection: 'row', gap: 8 },
  selectorBlock: { flex: 1, gap: 8, minWidth: 0 },
  label: { color: colors.muted, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' },
  selector: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 70,
    paddingHorizontal: 10,
    paddingVertical: 12
  },
  selectorText: { color: colors.text, fontSize: 14 },
  selectorMeta: { color: colors.muted, fontSize: 11, marginTop: 4 },
  routeArrow: { color: colors.accent, fontSize: 18, paddingBottom: 24 },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.35)' },
  modalBody: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    maxHeight: '76%',
    padding: 16
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  modalTitle: { color: colors.text, fontSize: 18, fontWeight: '600' },
  modalClose: { color: colors.accent, fontWeight: '600' },
  countryItem: { borderBottomColor: '#ece6dc', borderBottomWidth: 1, paddingVertical: 12 },
  countryName: { color: colors.text, fontSize: 16 },
  countryMeta: { color: colors.muted, fontSize: 12, marginTop: 3 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 },
  sectionLine: { flex: 1, height: 1, backgroundColor: colors.border },
  sectionTitle: { color: colors.muted, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 16
  },
  cardTitle: { color: colors.muted, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' },
  clockGrid: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  clockFace: { alignItems: 'center', flex: 1, gap: 5, minWidth: 0, paddingVertical: 6 },
  clockTime: { color: colors.accent, fontSize: 24, fontVariant: ['tabular-nums'], fontWeight: '300' },
  blueText: { color: colors.text },
  muted: { color: colors.muted, fontSize: 12 },
  accentSmall: { color: colors.accent, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' },
  diffPill: {
    alignItems: 'center',
    alignSelf: 'center',
    flexShrink: 0,
    paddingHorizontal: 4,
    paddingVertical: 8
  },
  diffValue: { color: colors.accent, fontSize: 18, fontVariant: ['tabular-nums'] },
  flightBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  flightEnd: { flex: 1, alignItems: 'center' },
  flightCenter: { alignItems: 'center', gap: 3 },
  airport: { color: colors.accent, fontSize: 30, fontVariant: ['tabular-nums'] },
  plane: { color: colors.text, fontSize: 13, fontWeight: '700' },
  footnote: { color: colors.muted, fontSize: 11, textAlign: 'center' },
  currencyRow: {
    alignItems: 'center',
    backgroundColor: colors.surface2,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    padding: 12
  },
  currencyCode: { color: colors.accent, fontSize: 14, fontWeight: '600' },
  currencyInput: {
    color: colors.text,
    flex: 1,
    fontSize: 24,
    fontVariant: ['tabular-nums'],
    padding: 0,
    textAlign: 'right'
  },
  rateRow: { alignItems: 'center', flexDirection: 'row', gap: 12, justifyContent: 'center' },
  rateText: { color: colors.muted, flex: 1, fontSize: 12, textAlign: 'center' },
  rateSource: { color: colors.muted, fontSize: 10, lineHeight: 14, textAlign: 'center' },
  swapButton: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  swapText: { color: colors.accent, fontSize: 12, fontWeight: '700' },
  resultValue: { color: colors.text, flex: 1, fontSize: 24, fontWeight: '600', textAlign: 'right' },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickItem: {
    backgroundColor: colors.surface2,
    borderRadius: 8,
    flexBasis: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  quickFrom: { color: colors.muted, fontVariant: ['tabular-nums'] },
  quickTo: { color: colors.accent, fontVariant: ['tabular-nums'], fontWeight: '600' },
  visaBadge: { alignSelf: 'flex-start', borderRadius: 8, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8 },
  visaText: { fontSize: 13, fontWeight: '600' },
  visa_ok: { backgroundColor: '#eef7ee', borderColor: '#bedec0' },
  visa_warn: { backgroundColor: '#fbf5e9', borderColor: '#e7cf9d' },
  visa_danger: { backgroundColor: '#f8eded', borderColor: '#e4b9b9' },
  visaText_ok: { color: colors.green },
  visaText_warn: { color: colors.accent },
  visaText_danger: { color: colors.danger },
  bodyText: { color: colors.text, fontSize: 13, lineHeight: 20 },
  blueLine: { color: colors.text, fontSize: 12 },
  greenLine: { color: colors.green, fontSize: 12, fontWeight: '600' },
  dangerLine: { color: colors.danger, fontSize: 12, fontWeight: '600' },
  warnLine: { color: colors.accent, fontSize: 12 },
  loadingRow: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  weatherTop: { alignItems: 'center', flexDirection: 'row', gap: 14 },
  weatherIcon: { fontSize: 42 },
  weatherInfo: { flex: 1 },
  weatherTemp: { color: colors.text, fontSize: 46, fontWeight: '300' },
  unitToggle: { flexDirection: 'row', gap: 4 },
  unitButton: { borderColor: colors.border, borderRadius: 6, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 6 },
  unitButtonActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  unitText: { color: colors.muted, fontSize: 12 },
  unitTextActive: { color: colors.surface, fontWeight: '700' },
  weatherStats: { flexDirection: 'row', gap: 8 },
  statBox: { alignItems: 'center', backgroundColor: colors.surface2, borderRadius: 8, flex: 1, padding: 10 },
  statValue: { color: colors.text, fontSize: 14, fontVariant: ['tabular-nums'], fontWeight: '600' },
  statLabel: { color: colors.muted, fontSize: 9, letterSpacing: 1, marginTop: 4, textTransform: 'uppercase' },
  forecastList: { gap: 8, marginTop: 2 },
  forecastTitle: { color: colors.muted, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' },
  forecastRow: {
    alignItems: 'center',
    backgroundColor: colors.surface2,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 10,
    padding: 10
  },
  forecastIcon: { fontSize: 24, width: 30 },
  forecastInfo: { flex: 1, minWidth: 0 },
  forecastDay: { color: colors.text, fontSize: 14, fontWeight: '600' },
  forecastTemp: { color: colors.text, fontSize: 13, fontVariant: ['tabular-nums'], fontWeight: '600' },
  twoColumn: { gap: 14 },
  largeIcon: { color: colors.accent, fontSize: 22, fontWeight: '600', textAlign: 'center' },
  emergencyGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  emergencyItem: {
    backgroundColor: colors.surface2,
    borderColor: '#e4c4c4',
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: '48%',
    padding: 12
  },
  emergencyNumber: { color: colors.danger, fontSize: 20, fontVariant: ['tabular-nums'] },
  emergencyLabel: { color: colors.muted, fontSize: 10, letterSpacing: 1, marginTop: 2, textTransform: 'uppercase' },
  phraseRow: {
    alignItems: 'center',
    backgroundColor: colors.surface2,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    padding: 12
  },
  phraseEnglish: { color: colors.muted, flex: 1, fontSize: 12 },
  phraseLocalWrap: { flex: 1.4 },
  phraseLocal: { color: colors.text, fontSize: 16, textAlign: 'right' },
  phrasePronunciation: { color: colors.accent, fontSize: 11, fontStyle: 'italic', textAlign: 'right' },
  tipRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 10 },
  tipDot: { backgroundColor: colors.accent, borderRadius: 3, height: 6, marginTop: 7, width: 6 },
  tipText: { color: colors.muted, flex: 1, fontSize: 13, lineHeight: 20 },
  spotItem: { backgroundColor: colors.surface2, borderRadius: 8, gap: 4, padding: 12 },
  spotName: { color: colors.text, fontSize: 15, fontWeight: '600' },
  translateInput: {
    backgroundColor: colors.surface2,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    minHeight: 96,
    padding: 12,
    textAlignVertical: 'top'
  },
  translateButton: { alignItems: 'center', backgroundColor: colors.accent, borderRadius: 8, paddingVertical: 13 },
  translateButtonDisabled: { opacity: 0.65 },
  translateButtonText: { color: colors.surface, fontSize: 15, fontWeight: '700' },
  translationResult: { backgroundColor: colors.surface2, borderRadius: 8, minHeight: 64, padding: 12 },
  placeholderText: { color: colors.muted, fontSize: 13, fontStyle: 'italic', lineHeight: 20 },
  historyItem: { borderBottomColor: colors.border, borderBottomWidth: 1, gap: 4, paddingVertical: 10 },
  historyEnglish: { color: colors.muted, fontSize: 12 },
  historyLocal: { color: colors.text, fontSize: 14 },
  statusBar: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    gap: 4,
    paddingTop: 12
  },
  statusText: { color: colors.muted, fontSize: 10, lineHeight: 14, textAlign: 'center' },
  statusRoute: { color: colors.accent, fontSize: 12, fontWeight: '600', textAlign: 'center' },
  bottomNav: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 4,
    paddingBottom: 10,
    paddingHorizontal: 8,
    paddingTop: 8
  },
  navItem: {
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
    gap: 2,
    paddingVertical: 8
  },
  navItemActive: { backgroundColor: colors.surface2 },
  navIcon: { color: colors.muted, fontSize: 18 },
  navLabel: { color: colors.muted, fontSize: 10, fontWeight: '600' },
  navTextActive: { color: colors.accent }
});
