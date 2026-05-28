import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GUIDES = [
  {
    id: '1',
    title: 'Oil & Filter Change',
    category: 'Engine',
    skill: 'Beginner',
    time: '45 mins',
    description: 'Step-by-step guide to changing the oil and filter on your GMC Motorhome.',
  },
  {
    id: '2',
    title: 'Carburettor Flooding Fix',
    category: 'Fuel System',
    skill: 'Intermediate',
    time: '2 hours',
    description: 'Diagnose and fix the common carburettor flooding issue on 1973–78 coaches.',
  },
  {
    id: '3',
    title: 'Rear Air Suspension Check',
    category: 'Suspension',
    skill: 'Intermediate',
    time: '1 hour',
    description: 'Inspect and test the rear air suspension system for leaks and proper operation.',
  },
  {
    id: '4',
    title: 'Converter Seal Leak Repair',
    category: 'Drivetrain',
    skill: 'Expert',
    time: '4 hours',
    description: 'Repair the common front wheel drive converter seal leak.',
  },
  {
    id: '5',
    title: 'Battery & Charging System',
    category: 'Electrical',
    skill: 'Beginner',
    time: '30 mins',
    description: 'Test your battery and charging system to prevent unexpected breakdowns.',
  },
  {
    id: '6',
    title: 'Brake Inspection & Adjustment',
    category: 'Brakes',
    skill: 'Intermediate',
    time: '2 hours',
    description: 'Inspect brake pads, drums, and adjust for safe stopping performance.',
  },
];

const SKILL_COLOURS: Record<string, string> = {
  Beginner: '#2E7D32',
  Intermediate: '#E65100',
  Expert: '#B71C1C',
};

export default function LearnScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.intro}>Plain-English repair guides written for GMC owners.</Text>

      <View style={styles.legend}>
        {Object.entries(SKILL_COLOURS).map(([level, colour]) => (
          <View key={level} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colour }]} />
            <Text style={styles.legendText}>{level}</Text>
          </View>
        ))}
      </View>

      {GUIDES.map(guide => (
        <TouchableOpacity
          key={guide.id}
          style={styles.guideCard}
          onPress={() => router.push(`/guide/${guide.id}`)}
        >
          <View style={styles.guideHeader}>
            <Text style={styles.guideTitle}>{guide.title}</Text>
            <View style={[styles.skillBadge, { backgroundColor: SKILL_COLOURS[guide.skill] }]}>
              <Text style={styles.skillText}>{guide.skill}</Text>
            </View>
          </View>
          <Text style={styles.guideCategory}>{guide.category}</Text>
          <Text style={styles.guideDescription}>{guide.description}</Text>
          <View style={styles.guideFooter}>
            <Ionicons name="time-outline" size={16} color="#888" />
            <Text style={styles.guideTime}>{guide.time}</Text>
            <Ionicons name="chevron-forward" size={18} color="#CCC" style={styles.chevron} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', padding: 16 },
  intro: { fontSize: 16, color: '#666', marginBottom: 16 },
  legend: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 14, color: '#555' },
  guideCard: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 18, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  guideHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  guideTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 8 },
  skillBadge: { paddingVertical: 3, paddingHorizontal: 10, borderRadius: 12 },
  skillText: { fontSize: 12, color: '#FFF', fontWeight: '700' },
  guideCategory: { fontSize: 13, color: '#8B4513', fontWeight: '600', marginTop: 4 },
  guideDescription: { fontSize: 15, color: '#666', marginTop: 8, lineHeight: 22 },
  guideFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 4 },
  guideTime: { fontSize: 14, color: '#888', flex: 1 },
  chevron: { marginLeft: 'auto' },
});
