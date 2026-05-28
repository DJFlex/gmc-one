import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TEMPLATES = [
  'Oil & Filter Change',
  'Tyre Rotation',
  'Brake Inspection',
  'Transmission Service',
  'Coolant Flush',
  'Fuel Filter',
  'Air Filter',
  'Spark Plugs',
  'Battery Check',
  'Full Service',
];

export default function AddReminderScreen() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateConfirm = (date: Date) => {
    setDueDate(date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }));
    setShowDatePicker(false);
  };

  const saveReminder = async () => {
    const reminder = {
      id: Date.now().toString(),
      title,
      dueDate,
      notes,
      coachId: id,
      createdAt: new Date().toISOString(),
    };
    const existing = await AsyncStorage.getItem(`reminders_${id}`);
    const reminders = existing ? JSON.parse(existing) : [];
    reminders.push(reminder);
    await AsyncStorage.setItem(`reminders_${id}`, JSON.stringify(reminders));
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionLabel}>What needs doing?</Text>
      <View style={styles.templateGrid}>
        {TEMPLATES.map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.templateButton, title === t && styles.templateSelected]}
            onPress={() => setTitle(t)}
          >
            <Text style={[styles.templateText, title === t && styles.templateTextSelected]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Or type your own</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Check wheel bearings"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.sectionLabel}>Due date</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Ionicons name="calendar-outline" size={22} color="#8B4513" />
        <Text style={[styles.dateButtonText, !dueDate && styles.datePlaceholder]}>
          {dueDate || 'Pick a date'}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setShowDatePicker(false)}
        minimumDate={new Date()}
      />

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
        style={[styles.saveButton, (!title || !dueDate) && styles.saveButtonDisabled]}
        disabled={!title || !dueDate}
        onPress={saveReminder}
      >
        <Ionicons name="checkmark-circle-outline" size={22} color="#FFF" />
        <Text style={styles.saveButtonText}>Save Reminder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', padding: 16 },
  sectionLabel: { fontSize: 18, fontWeight: '600', color: '#333', marginTop: 24, marginBottom: 10 },
  templateGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  templateButton: {
    paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8,
    borderWidth: 2, borderColor: '#8B4513', backgroundColor: '#FFF',
  },
  templateSelected: { backgroundColor: '#8B4513' },
  templateText: { fontSize: 15, color: '#8B4513', fontWeight: '600' },
  templateTextSelected: { color: '#FFF' },
  input: {
    backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1,
    borderColor: '#DDD', padding: 14, fontSize: 18,
  },
  inputMultiline: { height: 100, textAlignVertical: 'top' },
  dateButton: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1,
    borderColor: '#DDD', padding: 14,
  },
  dateButtonText: { fontSize: 18, color: '#333' },
  datePlaceholder: { color: '#AAA' },
  saveButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#8B4513', borderRadius: 10,
    padding: 18, marginTop: 32, marginBottom: 40, gap: 8,
  },
  saveButtonDisabled: { backgroundColor: '#CCC' },
  saveButtonText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
});