import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const CONDITION_COLOURS: Record<string, string> = {
  NOS: '#1565C0',
  Excellent: '#2E7D32',
  Good: '#F57F17',
  Fair: '#E65100',
  'As-is': '#B71C1C',
};

const SEED_LISTINGS = [
  {
    id: 'seed1',
    title: 'Rochester Quadrajet Carburettor',
    price: '185',
    condition: 'Excellent',
    year: '1976',
    description: 'Rebuilt and ready to go. Comes with new gaskets. Fits 403 and 455 engines.',
    seller: 'Ron M.',
    location: 'Phoenix, AZ',
  },
  {
    id: 'seed2',
    title: 'Original Dash Clock — Works',
    price: '65',
    condition: 'Good',
    year: '1974',
    description: 'Keeps good time. Minor scratches on the bezel. Hard to find working ones.',
    seller: 'Barbara T.',
    location: 'Sacramento, CA',
  },
  {
    id: 'seed3',
    title: 'Air Bag Set (Rear) — NOS',
    price: '340',
    condition: 'NOS',
    year: 'All',
    description: 'New old stock, still in original packaging. Fits all 1973–78 models.',
    seller: 'Dave K.',
    location: 'Denver, CO',
  },
  {
    id: 'seed4',
    title: 'Side Mirror — Driver Side',
    price: '45',
    condition: 'Good',
    year: '1975–78',
    description: 'Straight, no cracks. Chrome is 80%. Mounting hardware included.',
    seller: 'Jerry P.',
    location: 'Austin, TX',
  },
];

export default function MarketplaceScreen() {
  const [listings, setListings] = useState(SEED_LISTINGS);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('marketplace_listings').then(data => {
        if (data) {
          const saved = JSON.parse(data);
          setListings([...saved, ...SEED_LISTINGS]);
        }
      });
    }, [])
  );

  const saveListing = async () => {
    const listing = {
      id: Date.now().toString(),
      title,
      price,
      condition,
      description,
      contact,
      seller: 'You',
      location: 'Your location',
      year: 'All',
    };
    const existing = await AsyncStorage.getItem('marketplace_listings');
    const saved = existing ? JSON.parse(existing) : [];
    saved.unshift(listing);
    await AsyncStorage.setItem('marketplace_listings', JSON.stringify(saved));
    setListings([listing, ...listings]);
    setShowForm(false);
    setTitle(''); setPrice(''); setCondition(''); setDescription(''); setContact('');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.sellButton} onPress={() => setShowForm(true)}>
          <Ionicons name="add-circle-outline" size={22} color="#FFF" />
          <Text style={styles.sellButtonText}>List a Part for Sale</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Contact sellers directly — no payments through the app.
        </Text>

        {listings.map(item => (
          <View key={item.id} style={styles.listingCard}>
            <View style={styles.listingHeader}>
              <Text style={styles.listingTitle}>{item.title}</Text>
              <Text style={styles.listingPrice}>${item.price}</Text>
            </View>
            <View style={styles.listingMeta}>
              <View style={[styles.conditionBadge, { backgroundColor: CONDITION_COLOURS[item.condition] || '#888' }]}>
                <Text style={styles.conditionText}>{item.condition}</Text>
              </View>
              <Text style={styles.listingYear}>Fits: {item.year}</Text>
            </View>
            <Text style={styles.listingDescription}>{item.description}</Text>
            <View style={styles.listingFooter}>
              <Ionicons name="person-outline" size={14} color="#888" />
              <Text style={styles.listingSeller}>{item.seller}</Text>
              <Ionicons name="location-outline" size={14} color="#888" style={{ marginLeft: 12 }} />
              <Text style={styles.listingSeller}>{item.location}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add listing modal */}
      <Modal visible={showForm} animationType="slide">
        <ScrollView style={styles.modal}>
          <Text style={styles.modalTitle}>List a Part</Text>

          <Text style={styles.label}>Part name</Text>
          <TextInput style={styles.input} placeholder="e.g. Quadrajet carburettor" value={title} onChangeText={setTitle} />

          <Text style={styles.label}>Asking price ($)</Text>
          <TextInput style={styles.input} placeholder="0" value={price} onChangeText={setPrice} keyboardType="decimal-pad" />

          <Text style={styles.label}>Condition</Text>
          <View style={styles.conditionRow}>
            {Object.keys(CONDITION_COLOURS).map(c => (
              <TouchableOpacity
                key={c}
                style={[styles.conditionButton, condition === c && { backgroundColor: CONDITION_COLOURS[c] }]}
                onPress={() => setCondition(c)}
              >
                <Text style={[styles.conditionButtonText, condition === c && { color: '#FFF' }]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput style={[styles.input, styles.inputMultiline]} placeholder="Describe the part..." value={description} onChangeText={setDescription} multiline numberOfLines={3} />

          <Text style={styles.label}>How to contact you</Text>
          <TextInput style={styles.input} placeholder="e.g. email or phone number" value={contact} onChangeText={setContact} />

          <TouchableOpacity
            style={[styles.saveButton, (!title || !price || !condition) && styles.saveButtonDisabled]}
            disabled={!title || !price || !condition}
            onPress={saveListing}
          >
            <Text style={styles.saveButtonText}>Post Listing</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setShowForm(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', padding: 16 },
  sellButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#8B4513', borderRadius: 10, padding: 16, gap: 8, marginBottom: 10,
  },
  sellButtonText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  note: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 16 },
  listingCard: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  listingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  listingTitle: { fontSize: 17, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 8 },
  listingPrice: { fontSize: 20, fontWeight: 'bold', color: '#8B4513' },
  listingMeta: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  conditionBadge: { paddingVertical: 3, paddingHorizontal: 10, borderRadius: 12 },
  conditionText: { fontSize: 12, color: '#FFF', fontWeight: '700' },
  listingYear: { fontSize: 13, color: '#666' },
  listingDescription: { fontSize: 15, color: '#555', marginTop: 10, lineHeight: 22 },
  listingFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  listingSeller: { fontSize: 13, color: '#888', marginLeft: 4 },
  modal: { flex: 1, backgroundColor: '#FFF8F0', padding: 20 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20, marginTop: 40 },
  label: { fontSize: 17, fontWeight: '600', color: '#333', marginTop: 20, marginBottom: 8 },
  input: { backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#DDD', padding: 14, fontSize: 17 },
  inputMultiline: { height: 100, textAlignVertical: 'top' },
  conditionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  conditionButton: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, borderWidth: 2, borderColor: '#8B4513' },
  conditionButtonText: { fontSize: 14, color: '#8B4513', fontWeight: '600' },
  saveButton: { backgroundColor: '#8B4513', borderRadius: 10, padding: 18, alignItems: 'center', marginTop: 32 },
  saveButtonDisabled: { backgroundColor: '#CCC' },
  saveButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  cancelButton: { padding: 16, alignItems: 'center', marginTop: 12, marginBottom: 40 },
  cancelButtonText: { fontSize: 16, color: '#888' },
});
