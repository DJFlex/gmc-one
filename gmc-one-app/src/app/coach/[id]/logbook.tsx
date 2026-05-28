import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LogbookScreen() {
  const { id } = useLocalSearchParams();
  const [entries, setEntries] = useState([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(`logbook_${id}`).then(data => {
        if (data) setEntries(JSON.parse(data).reverse());
      });
    }, [id])
  );

  return (
    <ScrollView style={styles.container}>
      {entries.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons name="book-outline" size={56} color="#8B4513" />
          <Text style={styles.emptyTitle}>No entries yet</Text>
          <Text style={styles.emptySubtitle}>Log your first service or repair</Text>
        </View>
      ) : (
        entries.map((entry: any) => (
          <View key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <Text style={styles.entryDate}>{entry.date}</Text>
            </View>
            {entry.cost ? (
              <Text style={styles.entryCost}>${entry.cost}</Text>
            ) : null}
            {entry.notes ? (
              <Text style={styles.entryNotes}>{entry.notes}</Text>
            ) : null}
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push(`/coach/${id}/add-entry`)}
      >
        <Ionicons name="add-circle-outline" size={22} color="#FFF" />
        <Text style={styles.addButtonText}>Add Entry</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', padding: 16 },
  emptyCard: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 40,
    alignItems: 'center', marginTop: 40,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginTop: 16 },
  emptySubtitle: { fontSize: 16, color: '#888', marginTop: 8, textAlign: 'center' },
  entryCard: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 16,
    marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  entryTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', flex: 1 },
  entryDate: { fontSize: 14, color: '#888' },
  entryCost: { fontSize: 16, color: '#8B4513', fontWeight: '600', marginTop: 6 },
  entryNotes: { fontSize: 15, color: '#666', marginTop: 6 },
  addButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#8B4513', borderRadius: 10,
    padding: 16, marginTop: 16, marginBottom: 40, gap: 8,
  },
  addButtonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
});