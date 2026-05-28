import { Ionicons } from '@expo/vector-icons';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CAMPGROUNDS = [
  {
    id: '1',
    name: 'Yosemite Valley Campground',
    location: 'Yosemite, CA',
    rating: 4.8,
    clearance: '13\'6"',
    hookups: 'Water & Electric',
    notes: 'GMC-friendly pull-through sites available. Book well ahead.',
    lat: 37.7459,
    lng: -119.5332,
  },
  {
    id: '2',
    name: 'Palo Duro Canyon SP',
    location: 'Canyon, TX',
    rating: 4.6,
    clearance: 'No restrictions',
    hookups: 'Full hookups',
    notes: 'Wide sites, easy access. Popular with classic RV owners.',
    lat: 34.9379,
    lng: -101.6774,
  },
  {
    id: '3',
    name: 'Crater Lake Resort',
    location: 'Fort Klamath, OR',
    rating: 4.5,
    clearance: 'No restrictions',
    hookups: 'Full hookups',
    notes: 'Flat sites, good for older coaches. Friendly staff.',
    lat: 42.7069,
    lng: -122.0269,
  },
];

const EMERGENCY_CONTACTS = [
  { name: 'GMC Motorhome Club', phone: '1-800-GMC-CLUB', type: 'Club' },
  { name: 'Good Sam Roadside', phone: '1-800-234-3450', type: 'Roadside' },
  { name: 'Coach-Net', phone: '1-800-863-9471', type: 'Roadside' },
];

const TIPS = [
  { icon: 'warning-outline', text: 'Check bridge clearance before leaving — GMC Motorhomes are typically 10\'6" tall.' },
  { icon: 'speedometer-outline', text: 'Weight limit on most roads is 80,000 lbs. A fully loaded GMC Motorhome weighs ~16,000 lbs.' },
  { icon: 'flame-outline', text: 'Propane stations along I-10, I-40, and I-80 are plentiful. Search "propane refill" in Maps.' },
  { icon: 'cloud-outline', text: 'Watch wind advisories — the flat side profile makes crosswinds challenging above 45mph.' },
];

export default function ExploreScreen() {
  const openMaps = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  };

  const callNumber = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <ScrollView style={styles.container}>

      {/* Road tips */}
      <Text style={styles.sectionTitle}>Before You Go</Text>
      {TIPS.map((tip, i) => (
        <View key={i} style={styles.tipCard}>
          <Ionicons name={tip.icon as any} size={24} color="#8B4513" />
          <Text style={styles.tipText}>{tip.text}</Text>
        </View>
      ))}

      {/* Campgrounds */}
      <Text style={styles.sectionTitle}>GMC-Friendly Campgrounds</Text>
      {CAMPGROUNDS.map(camp => (
        <View key={camp.id} style={styles.campCard}>
          <View style={styles.campHeader}>
            <View style={styles.campInfo}>
              <Text style={styles.campName}>{camp.name}</Text>
              <Text style={styles.campLocation}>{camp.location}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#FFF" />
              <Text style={styles.ratingText}>{camp.rating}</Text>
            </View>
          </View>
          <View style={styles.campMeta}>
            <View style={styles.campMetaItem}>
              <Ionicons name="arrow-up-outline" size={14} color="#8B4513" />
              <Text style={styles.campMetaText}>{camp.clearance}</Text>
            </View>
            <View style={styles.campMetaItem}>
              <Ionicons name="flash-outline" size={14} color="#8B4513" />
              <Text style={styles.campMetaText}>{camp.hookups}</Text>
            </View>
          </View>
          <Text style={styles.campNotes}>{camp.notes}</Text>
          <TouchableOpacity
            style={styles.mapsButton}
            onPress={() => openMaps(camp.lat, camp.lng, camp.name)}
          >
            <Ionicons name="navigate-outline" size={16} color="#8B4513" />
            <Text style={styles.mapsButtonText}>Open in Maps</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Emergency contacts */}
      <Text style={styles.sectionTitle}>Roadside Help</Text>
      {EMERGENCY_CONTACTS.map((contact, i) => (
        <TouchableOpacity key={i} style={styles.contactCard} onPress={() => callNumber(contact.phone)}>
          <Ionicons name="call-outline" size={24} color="#8B4513" />
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactPhone}>{contact.phone}</Text>
          </View>
          <View style={styles.contactTypeBadge}>
            <Text style={styles.contactTypeText}>{contact.type}</Text>
          </View>
        </TouchableOpacity>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 8, marginBottom: 12 },
  tipCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: '#FFF', borderRadius: 10, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  tipText: { fontSize: 15, color: '#444', flex: 1, lineHeight: 22 },
  campCard: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  campHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  campInfo: { flex: 1 },
  campName: { fontSize: 17, fontWeight: 'bold', color: '#333' },
  campLocation: { fontSize: 13, color: '#888', marginTop: 2 },
  ratingBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#8B4513', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 8,
  },
  ratingText: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  campMeta: { flexDirection: 'row', gap: 16, marginTop: 10 },
  campMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  campMetaText: { fontSize: 13, color: '#555' },
  campNotes: { fontSize: 14, color: '#666', marginTop: 8, lineHeight: 20 },
  mapsButton: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 12, paddingVertical: 8,
  },
  mapsButtonText: { fontSize: 15, color: '#8B4513', fontWeight: '600' },
  contactCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  contactPhone: { fontSize: 14, color: '#888', marginTop: 2 },
  contactTypeBadge: {
    backgroundColor: '#FFF8F0', borderRadius: 8, borderWidth: 1,
    borderColor: '#8B4513', paddingVertical: 4, paddingHorizontal: 10,
  },
  contactTypeText: { fontSize: 12, color: '#8B4513', fontWeight: '600' },
});
