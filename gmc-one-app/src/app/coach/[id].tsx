import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CoachScreen() {
  const { id } = useLocalSearchParams();
  const [coach, setCoach] = useState(null);
  const [reminders, setReminders] = useState([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('coaches').then(data => {
        if (data) {
          const coaches = JSON.parse(data);
          setCoach(coaches.find(c => c.id === id));
        }
      });
      AsyncStorage.getItem(`reminders_${id}`).then(data => {
        if (data) setReminders(JSON.parse(data));
      });
    }, [id])
  );

  if (!coach) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="car" size={48} color="#8B4513" />
        <Text style={styles.title}>{coach.year} GMC {coach.model}</Text>
        {coach.nickname ? <Text style={styles.nickname}>"{coach.nickname}"</Text> : null}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Reminders</Text>
        {reminders.length === 0 ? (
          <Text style={styles.emptyText}>No reminders yet</Text>
        ) : (
          reminders.map(r => (
            <View key={r.id} style={styles.reminderCard}>
              <Ionicons name="notifications" size={24} color="#8B4513" />
              <View style={styles.reminderInfo}>
                <Text style={styles.reminderTitle}>{r.title}</Text>
                <Text style={styles.reminderDue}>Due: {r.dueDate}</Text>
              </View>
            </View>
          ))
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push(`/coach/${id}/add-reminder`)}
        >
          <Ionicons name="add-circle-outline" size={20} color="#FFF" />
          <Text style={styles.addButtonText}>Add Reminder</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', padding: 16 },
  header: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 24,
    alignItems: 'center', marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginTop: 12 },
  nickname: { fontSize: 16, color: '#8B4513', marginTop: 4 },
  section: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 20,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  emptyText: { fontSize: 16, color: '#888', marginBottom: 16 },
  reminderCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  reminderInfo: { flex: 1 },
  reminderTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  reminderDue: { fontSize: 14, color: '#888', marginTop: 2 },
  addButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#8B4513', borderRadius: 10,
    padding: 14, marginTop: 16, gap: 8,
  },
  addButtonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
});