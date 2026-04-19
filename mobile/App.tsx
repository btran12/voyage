import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { COUNTRIES, Country } from './src/data/countries';
import { convertCurrency, formatClock } from './src/utils/format';

type CountryPickerProps = {
  label: string;
  value: Country;
  onSelect: (country: Country) => void;
};

function CountryPicker({ label, value, onSelect }: CountryPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.block}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.selector} onPress={() => setOpen(true)}>
        <Text style={styles.selectorText}>{`${value.flag} ${value.name}`}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>Choose country</Text>
            <ScrollView>
              {COUNTRIES.map((country) => (
                <Pressable
                  key={country.code}
                  style={styles.countryItem}
                  onPress={() => {
                    onSelect(country);
                    setOpen(false);
                  }}
                >
                  <Text style={styles.countryText}>{`${country.flag} ${country.name}`}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={() => setOpen(false)}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function App() {
  const [origin, setOrigin] = useState(COUNTRIES[0]);
  const [destination, setDestination] = useState(COUNTRIES[1]);
  const [amount, setAmount] = useState('100');

  // TODO: Replace with live FX rates API
  const rates = {
    USD: 1,
    GBP: 0.79,
    JPY: 151.2,
    EUR: 0.91,
    VND: 25340
  } as Record<string, number>;

  const converted = useMemo(() => {
    const sourceRate = rates[origin.currency] ?? 1;
    const targetRate = rates[destination.currency] ?? 1;
    return convertCurrency(Number(amount) || 0, sourceRate, targetRate);
  }, [amount, destination.currency, origin.currency]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.brand}>VOYAGE</Text>
          <Text style={styles.subtitle}>International Travel Dashboard</Text>
        </View>

        <CountryPicker label="Origin" value={origin} onSelect={setOrigin} />
        <CountryPicker label="Destination" value={destination} onSelect={setDestination} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Currency Converter</Text>
          <TextInput
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
            placeholder={`Amount in ${origin.currency}`}
            placeholderTextColor="#8f857a"
          />
          <Text style={styles.value}>
            {destination.symbol}
            {converted.toFixed(2)} {destination.currency}
          </Text>
          <Text style={styles.meta}>{`1 ${origin.currency} ≈ ${(
            (rates[destination.currency] ?? 1) / (rates[origin.currency] ?? 1)
          ).toFixed(4)} ${destination.currency}`}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Time Zones</Text>
          <Text style={styles.rowText}>{`${origin.flag} ${origin.name}: ${formatClock(origin.tz)}`}</Text>
          <Text style={styles.rowText}>{`${destination.flag} ${destination.name}: ${formatClock(destination.tz)}`}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weather</Text>
          <Text style={styles.weatherMain}>{`${destination.weather.icon} ${destination.weather.tempC}°C`}</Text>
          <Text style={styles.rowText}>{destination.weather.description}</Text>
          <Text style={styles.meta}>{`Humidity ${destination.weather.humidity}%`}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Travel Essentials</Text>
          <Text style={styles.rowText}>{`Capital: ${destination.capital}`}</Text>
          <Text style={styles.rowText}>{`Language: ${destination.language}`}</Text>
          <Text style={styles.rowText}>{`Visa: ${destination.visaSummary}`}</Text>
          <Text style={styles.rowText}>{`Plug/Voltage: ${destination.plug}, ${destination.voltage}`}</Text>
          <Text style={styles.rowText}>{`Driving side: ${destination.drives}`}</Text>
          <Text style={styles.meta}>{`Emergency — Police ${destination.emergency.police}, Ambulance ${destination.emergency.ambulance}, Fire ${destination.emergency.fire}`}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Essential Phrases</Text>
          {destination.phrases.map((phrase) => (
            <View style={styles.phraseRow} key={`${destination.code}-${phrase.english}`}>
              <Text style={styles.rowText}>{`${phrase.english}: ${phrase.local}`}</Text>
              <Text style={styles.meta}>{phrase.pronunciation}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Packing Tips</Text>
          {destination.packingTips.map((tip) => (
            <Text key={`${destination.code}-${tip}`} style={styles.rowText}>{`• ${tip}`}</Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Must-See Places</Text>
          {destination.mustSee.map((place) => (
            <Text key={`${destination.code}-${place}`} style={styles.rowText}>{`• ${place}`}</Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f2ec' },
  content: { padding: 20, gap: 14 },
  header: {
    paddingVertical: 8,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ded6ca'
  },
  brand: {
    fontSize: 30,
    letterSpacing: 6,
    color: '#9a6f2e',
    textAlign: 'center',
    fontWeight: '300'
  },
  subtitle: {
    textAlign: 'center',
    color: '#7a6e60',
    fontSize: 12,
    letterSpacing: 1.5,
    marginTop: 2,
    textTransform: 'uppercase'
  },
  block: { gap: 6 },
  label: { fontSize: 11, color: '#7a6e60', textTransform: 'uppercase', letterSpacing: 1.5 },
  selector: {
    borderWidth: 1,
    borderColor: '#d8d0c5',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14
  },
  selectorText: { fontSize: 16, color: '#1a1612' },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3ddd3',
    borderRadius: 12,
    padding: 16,
    gap: 7,
    shadowColor: '#9a6f2e',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 }
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9a6f2e',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  input: {
    borderWidth: 1,
    borderColor: '#d8d0c5',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    backgroundColor: '#fff',
    color: '#1a1612'
  },
  value: { fontSize: 24, color: '#2e7fa0', fontWeight: '700' },
  rowText: { fontSize: 14, color: '#1a1612', lineHeight: 20 },
  meta: { fontSize: 12, color: '#7a6e60', lineHeight: 18 },
  weatherMain: { fontSize: 28, color: '#2e7fa0', fontWeight: '700' },
  phraseRow: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0ece3'
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end'
  },
  modalBody: {
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    gap: 8
  },
  modalTitle: { fontWeight: '600', fontSize: 18, marginBottom: 8, color: '#1a1612' },
  countryItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  countryText: { fontSize: 15, color: '#1a1612' },
  closeButton: {
    marginTop: 8,
    backgroundColor: '#9a6f2e',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center'
  },
  closeText: { color: '#fff', fontWeight: '600' }
});
