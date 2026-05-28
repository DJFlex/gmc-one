import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CATEGORIES = [
  'Oil & Filter', 'Tyres', 'Brakes', 'Transmission',
  'Fuel System', 'Electrical', 'Body & Interior', 'Other',
];

export default function AddEntryScreen() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [cost, setCost] = useState('');
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateConfirm = (d: Date) => {
    setDate(d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }));
    setShowDatePicker(false);
  };

  const saveEntry = async () => {
    const entry = {
      id: Date.now().toString(),
      title,
      category,
      date,
      cost,
      notes,
      coachId: id,
      createdAt: new Date().toISOString(),
    };
    const existing = await AsyncStorage.getItem(`logbook_${id}`);
    const entries = existing ? JSON.parse(existing) : [];
    entries.push(entry);
    await AsyncStorage.setItem(`logbook_${id}`, JSON.stringify(entries));
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionLabel}>Category</Text>
      <View style={styles.optionRow}>
        {CATEGORIES.map(c => (
          <TouchableOpacity
            key={c}
            style={[styles.optionButton, category === c && styles.optionSelected]}
            onPress={() => setCategory(c)}
          >
            <Text style={[styles.optionText, category === c && styles.optionTextSelected]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>What was done?</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Oil and filter change"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.sectionLabel}>Date</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Ionicons name="calendar-outline" size={22} color="#8B4513" />
        <Text style={[styles.dateButtonText, !date && styles.datePlaceholder]}>
          {date || 'Pick a date'}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setShowDatePicker(false)}
      />

      <Text style={styles.sectionLabel}>Cost (optional)</Text>
      <View style={styles.costRow}>
        <Text style={styles.dollarSign}>$</Text>
        <TextInput
          style={[styles.input, styles.costInput]}
          placeholder="0.00"
          value={cost}
          onChangeText={setCost}
          keyboardType="decimal-pad"
        />
      </View>

      <Text style={styles.sectionLabel}>Notes (optional)</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Any extra details..."
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
      />

      <TouchableOpacity
        style={[styles.saveButton, (!title || !date) && styles.saveButtonDisabled]}
        disabled={!title || !date}
        onPress={saveEntry}
      >
        <Ionicons name="checkmark-circle-outline" size={22} color="#FFF" />
        <Text style={styles.saveButtonText}>Save Entry</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', padding: 16 },
  sectionLabel: { fontSize: 18, fontWeight: '600', color: '#333', marginTop: 24, marginBottom: 10 },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  optionButton: {
    paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8,
    borderWidth: 2, borderColor: '#8B4513', backgroundColor: '#FFF',
  },
  optionSelected: { backgroundColor: '#8B4513' },
  optionText: { fontSize: 15, color: '#8B4513', fontWeight: '600' },
  optionTextSelected: { color: '#FFF' },
  input: {
    backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1,
    borderColor: '#DDD', padding: 14, fontSize: 18, flex: 1,
  },
  inputMultiline: { height: 100, textAlignVertical: 'top' },
  dateButton: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1,
    borderColor: '#DDD', padding: 14,
  },
  dateButtonText: { fontSize: 18, color: '#333' },
  datePlaceholder: { color: '#AAA' },
  costRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dollarSign: { fontSize: 22, color: '#333', fontWeight: '600' },
  costInput: { flex: 1 },
  saveButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#8B4513', borderRadius: 10,
    padding: 18, marginTop: 32, marginBottom: 40, gap: 8,
  },
  saveButtonDisabled: { backgroundColor: '#CCC' },
  saveButtonText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
});