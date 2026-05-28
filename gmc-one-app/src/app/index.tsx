import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GarageScreen() {
  const [coaches, setCoaches] = useState([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('coaches').then(data => {
        if (data) setCoaches(JSON.parse(data));
      });
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {coaches.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons name="car-outline" size={64} color="#8B4513" />
          <Text style={styles.emptyTitle}>No coach added yet</Text>
          <Text style={styles.emptySubtitle}>Add your GMC Motorhome to get started</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-coach')}>
            <Ionicons name="add-circle-outline" size={22} color="#FFF" />
            <Text style={styles.addButtonText}>Add My Coach</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {coaches.map(coach => (
            <TouchableOpacity key={coach.id} style={styles.coachCard} onPress={() => router.push(`/coach/${coach.id}`)}>
              <Ionicons name="car" size={40} color="#8B4513" />
              <View style={styles.coachInfo}>
                <Text style={styles.coachTitle}>{coach.year} GMC {coach.model}</Text>
                {coach.nickname ? <Text style={styles.coachNickname}>"{coach.nickname}"</Text> : null}
                {coach.vin ? <Text style={styles.coachVin}>VIN: {coach.vin}</Text> : null}
              </View>
              <Ionicons name="chevron-forward" size={24} color="#CCC" />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addButtonSmall} onPress={() => router.push('/add-coach')}>
            <Ionicons name="add-circle-outline" size={20} color="#8B4513" />
            <Text style={styles.addButtonSmallText}>Add Another Coach</Text>
          </TouchableOpacity>
        </>
      )}
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
  addButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#8B4513',
    paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10, marginTop: 24, gap: 8,
  },
  addButtonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  coachCard: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 20,
    flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  coachInfo: { flex: 1 },
  coachTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  coachNickname: { fontSize: 16, color: '#8B4513', marginTop: 2 },
  coachVin: { fontSize: 14, color: '#888', marginTop: 2 },
  addButtonSmall: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 16, marginTop: 8,
  },
  addButtonSmallText: { fontSize: 16, color: '#8B4513', fontWeight: '600' },
});