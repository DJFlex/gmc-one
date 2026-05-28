import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const MODELS = ['Kingsley', 'Royale', 'Eleganza', 'Palm Beach', 'Birchaven', 'Other'];
const YEARS = ['1973', '1974', '1975', '1976', '1977', '1978'];

export default function AddCoachScreen() {
  const [year, setYear] = useState('');
  const [model, setModel] = useState('');
  const [vin, setVin] = useState('');
  const [nickname, setNickname] = useState('');

  const saveCoach = async () => {
    const coach = {
      id: Date.now().toString(),
      year,
      model,
      vin,
      nickname,
      createdAt: new Date().toISOString(),
    };
    const existing = await AsyncStorage.getItem('coaches');
    const coaches = existing ? JSON.parse(existing) : [];
    coaches.push(coach);
    await AsyncStorage.setItem('coaches', JSON.stringify(coaches));
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionLabel}>Year</Text>
      <View style={styles.optionRow}>
        {YEARS.map(y => (
          <TouchableOpacity
            key={y}
            style={[styles.optionButton, year === y && styles.optionSelected]}
            onPress={() => setYear(y)}
          >
            <Text style={[styles.optionText, year === y && styles.optionTextSelected]}>{y}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Model</Text>
      <View style={styles.optionRow}>
        {MODELS.map(m => (
          <TouchableOpacity
            key={m}
            style={[styles.optionButton, model === m && styles.optionSelected]}
            onPress={() => setModel(m)}
          >
            <Text style={[styles.optionText, model === m && styles.optionTextSelected]}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Nickname (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. The Old Girl"
        value={nickname}
        onChangeText={setNickname}
      />

      <Text style={styles.sectionLabel}>VIN (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter VIN manually"
        value={vin}
        onChangeText={setVin}
        autoCapitalize="characters"
      />

      <TouchableOpacity
        style={[styles.saveButton, (!year || !model) && styles.saveButtonDisabled]}
        disabled={!year || !model}
        onPress={saveCoach}
      >
        <Text style={styles.saveButtonText}>Save My Coach</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', padding: 16 },
  sectionLabel: { fontSize: 18, fontWeight: '600', color: '#333', marginTop: 24, marginBottom: 10 },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  optionButton: {
    paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8,
    borderWidth: 2, borderColor: '#8B4513', backgroundColor: '#FFF',
  },
  optionSelected: { backgroundColor: '#8B4513' },
  optionText: { fontSize: 16, color: '#8B4513', fontWeight: '600' },
  optionTextSelected: { color: '#FFF' },
  input: {
    backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1,
    borderColor: '#DDD', padding: 14, fontSize: 18,
  },
  saveButton: {
    backgroundColor: '#8B4513', borderRadius: 10,
    padding: 18, alignItems: 'center', marginTop: 32, marginBottom: 40,
  },
  saveButtonDisabled: { backgroundColor: '#CCC' },
  saveButtonText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
});