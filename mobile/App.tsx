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
                  <Text>{`${country.flag} ${country.name}`}</Text>
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

  // TODO: Replace with live fx rates from your API
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
        <Text style={styles.brand}>VOYAGE</Text>
        <Text style={styles.subtitle}>Mobile Travel Dashboard</Text>

        <CountryPicker label="From" value={origin} onSelect={setOrigin} />
        <CountryPicker label="To" value={destination} onSelect={setDestination} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Currency</Text>
          <TextInput
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
          />
          <Text style={styles.value}>
            {destination.symbol}
            {converted.toFixed(2)} {destination.currency}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Time Zones</Text>
          <Text>{`${origin.flag} ${origin.name}: ${formatClock(origin.tz)}`}</Text>
          <Text>{`${destination.flag} ${destination.name}: ${formatClock(destination.tz)}`}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Travel Snapshot</Text>
          <Text>{`Visa: ${destination.visaSummary}`}</Text>
          <Text>{`Emergency: ${destination.emergency}`}</Text>
          <Text>{`Driving side: ${destination.drives}`}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f2ec' },
  content: { padding: 20, gap: 16 },
  brand: {
    fontSize: 30,
    letterSpacing: 5,
    color: '#9a6f2e',
    textAlign: 'center',
    marginTop: 8
  },
  subtitle: { textAlign: 'center', color: '#7a6e60', marginBottom: 8 },
  block: { gap: 8 },
  label: { fontSize: 12, color: '#7a6e60', textTransform: 'uppercase' },
  selector: {
    borderWidth: 1,
    borderColor: '#d8d0c5',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14
  },
  selectorText: { fontSize: 16 },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3ddd3',
    borderRadius: 12,
    padding: 16,
    gap: 8
  },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#d8d0c5',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    backgroundColor: '#fff'
  },
  value: { fontSize: 22, color: '#2e7fa0', fontWeight: '700' },
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
  modalTitle: { fontWeight: '600', fontSize: 18, marginBottom: 8 },
  countryItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  closeButton: {
    marginTop: 8,
    backgroundColor: '#9a6f2e',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center'
  },
  closeText: { color: '#fff', fontWeight: '600' }
});
