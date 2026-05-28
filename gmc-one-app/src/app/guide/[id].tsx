import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const GUIDE_CONTENT: Record<string, any> = {
  '1': {
    title: 'Oil & Filter Change',
    skill: 'Beginner',
    time: '45 mins',
    category: 'Engine',
    intro: 'Regular oil changes are the single most important maintenance task for your GMC Motorhome. The 403 and 455 Oldsmobile engines used in these coaches respond well to fresh oil every 3,000 miles.',
    parts: [
      '5 quarts engine oil (10W-30 or 10W-40)',
      'Oil filter (AC Delco PF-35 or equivalent)',
      'Drain plug washer (recommended)',
    ],
    tools: [
      'Oil drain pan',
      'Oil filter wrench',
      '15mm socket or wrench',
      'Funnel',
      'Rags',
    ],
    steps: [
      { title: 'Warm up the engine', detail: 'Run the engine for 5 minutes. Warm oil drains faster and carries more contaminants with it. Then turn it off and wait 2 minutes.' },
      { title: 'Position the drain pan', detail: 'The drain plug is on the bottom of the oil pan, driver\'s side. Slide your drain pan underneath — it\'s a tight spot on these coaches.' },
      { title: 'Remove the drain plug', detail: 'Use a 15mm socket. Turn counter-clockwise. The oil will flow quickly at first — keep your hand clear. Let it drain fully, about 5 minutes.' },
      { title: 'Remove the old filter', detail: 'The oil filter is on the passenger side of the engine block. Use your filter wrench to loosen it, then unscrew by hand. Some oil will spill — have a rag ready.' },
      { title: 'Fit the new filter', detail: 'Wipe a little fresh oil around the rubber gasket on the new filter. Screw it on by hand until snug, then turn a further half turn. Do not over-tighten.' },
      { title: 'Replace the drain plug', detail: 'Fit a new washer if you have one. Hand-tighten first, then snug with the socket. Do not over-tighten — you can crack the oil pan.' },
      { title: 'Add new oil', detail: 'Remove the oil cap on top of the engine (marked OIL). Add 4.5 quarts, then check the dipstick. Add the remaining half quart if needed. Do not overfill.' },
      { title: 'Check for leaks', detail: 'Start the engine and let it idle for 2 minutes. Watch underneath for drips around the drain plug and filter. If none, you\'re done. Check the oil level one more time when cool.' },
    ],
    tip: 'Write the date and mileage on a piece of tape and stick it inside the engine bay. Saves you guessing next time.',
  },
  '2': {
    title: 'Carburettor Flooding Fix',
    skill: 'Intermediate',
    time: '2 hours',
    category: 'Fuel System',
    intro: 'Carburettor flooding is one of the most common issues on 1973–78 GMC Motorhomes. It usually shows up as fuel smell, rough idle, or black smoke. The usual culprit is a worn needle valve or stuck float.',
    parts: [
      'Carburettor rebuild kit (Rochester Quadrajet)',
      'Needle valve and seat kit',
      'Carburettor gasket set',
    ],
    tools: [
      'Flathead and Phillips screwdrivers',
      'Needle-nose pliers',
      'Small bowl for parts',
      'Carburettor cleaner spray',
      'Torque wrench',
    ],
    steps: [
      { title: 'Safety first', detail: 'Disconnect the negative battery terminal. Do not smoke or work near any ignition source. Keep a fire extinguisher nearby when working on fuel systems.' },
      { title: 'Remove the air cleaner', detail: 'Unscrew the wing nut on top of the air cleaner assembly and lift it off. Set aside.' },
      { title: 'Disconnect fuel line and linkages', detail: 'Take a photo of the throttle and choke linkages before disconnecting anything. You\'ll thank yourself when reassembling.' },
      { title: 'Remove the carburettor', detail: 'Four nuts hold it to the intake manifold. Remove them and lift the carburettor off. Place it on a clean workbench.' },
      { title: 'Remove the float bowl lid', detail: 'Unscrew the top of the carburettor. Inside you\'ll find the float and needle valve assembly.' },
      { title: 'Inspect the needle valve', detail: 'The needle valve controls fuel entry into the float bowl. If it\'s worn or has a groove worn into the rubber tip, it won\'t seal properly and fuel will flood in.' },
      { title: 'Replace needle valve and check float', detail: 'Fit the new needle valve. Check the float for fuel inside it by shaking — if you hear liquid, the float is sunk and needs replacement. Set float height per your rebuild kit instructions.' },
      { title: 'Reassemble and refit', detail: 'Reassemble in reverse order. Use your photo to reconnect linkages correctly. Start the engine and check for leaks before fitting the air cleaner.' },
    ],
    tip: 'The Rochester Quadrajet was used across all model years. Parts are still available from most classic car suppliers.',
  },
  '3': {
    title: 'Rear Air Suspension Check',
    skill: 'Intermediate',
    time: '1 hour',
    category: 'Suspension',
    intro: 'The rear air suspension on GMC Motorhomes is unique to these coaches and gives them their distinctive ride. Regular checks prevent blowouts on the road.',
    parts: ['Air line fittings (if replacing)', 'Air bags (if failed)'],
    tools: ['Soapy water in a spray bottle', 'Air pressure gauge', 'Flashlight'],
    steps: [
      { title: 'Check ride height', detail: 'Park on level ground. The rear of the coach should sit level. If one side is lower, that air bag may be failing.' },
      { title: 'Check air pressure', detail: 'The system should hold 60–80 PSI depending on load. Use your gauge on the Schrader valve near the compressor.' },
      { title: 'Spray test for leaks', detail: 'Spray soapy water on all air line connections, fittings, and the bags themselves. Bubbles indicate a leak.' },
      { title: 'Inspect the bags visually', detail: 'Look for cracks, abrasion wear, or bulging in the rubber air bags. Any damage means replacement before your next trip.' },
      { title: 'Check the compressor', detail: 'The levelling compressor should cycle on when you load the coach and off when level is reached. A compressor that runs constantly indicates a leak.' },
    ],
    tip: 'Carry a can of tyre inflator as an emergency fix for a slow air bag leak on the road. It buys you time to reach a repair shop.',
  },
  '4': {
    title: 'Converter Seal Leak Repair',
    skill: 'Expert',
    time: '4 hours',
    category: 'Drivetrain',
    intro: 'The front wheel drive converter seal leak is well-known in the GMC Motorhome community. Oil leaks from the converter housing onto the exhaust and creates smoke and smell. This is a significant job but very doable for an experienced DIYer.',
    parts: ['Converter seal kit', 'Transmission fluid (Dexron III)', 'RTV sealant'],
    tools: ['Floor jack and jack stands', 'Transmission jack', 'Socket set', 'Torque wrench', 'Seal puller'],
    steps: [
      { title: 'Drain the transmission', detail: 'Place a drain pan and remove the transmission drain plug. Allow to fully drain before proceeding.' },
      { title: 'Support the drivetrain', detail: 'Use a transmission jack under the torque converter housing. This job requires solid support — do not skip this step.' },
      { title: 'Remove the converter cover', detail: 'Eight bolts hold the cover. Remove them and carefully lower the cover away.' },
      { title: 'Extract the old seal', detail: 'Use your seal puller to remove the old converter seal. Note the orientation before removal.' },
      { title: 'Clean the seal surface', detail: 'Clean the seal bore thoroughly. Any debris will cause the new seal to fail.' },
      { title: 'Install the new seal', detail: 'Press the new seal in squarely. A seal driver or appropriate socket works well for this.' },
      { title: 'Reassemble', detail: 'Refit the converter cover, torque bolts to spec (18 ft-lbs). Refill transmission with fresh Dexron III.' },
      { title: 'Test', detail: 'Run the engine, cycle through all transmission positions, and check for leaks.' },
    ],
    tip: 'Join the GMC Motorhome Club forum before attempting this — members who have done this job can walk you through coach-specific quirks.',
  },
  '5': {
    title: 'Battery & Charging System',
    skill: 'Beginner',
    time: '30 mins',
    category: 'Electrical',
    intro: 'A weak battery or failing alternator is the most common cause of breakdowns. This simple check takes 30 minutes and can save a roadside call.',
    parts: ['Battery terminal cleaner (optional)', 'Dielectric grease'],
    tools: ['Multimeter', 'Wire brush'],
    steps: [
      { title: 'Check battery voltage', detail: 'With the engine off, touch your multimeter leads to the battery terminals (red to positive, black to negative). A healthy battery reads 12.6V or higher. Below 12.2V means it needs charging or replacement.' },
      { title: 'Check for corrosion', detail: 'White or blue crusty build-up on the terminals increases resistance and causes starting problems. Clean with a wire brush or terminal cleaner.' },
      { title: 'Check charging voltage', detail: 'Start the engine and recheck voltage at the battery. It should now read 13.8–14.4V. This confirms the alternator is charging. Below 13.5V points to an alternator issue.' },
      { title: 'Check terminal tightness', detail: 'Wiggle each terminal. They should be firm with no movement. Loose terminals cause intermittent electrical gremlins.' },
      { title: 'Apply dielectric grease', detail: 'A thin coat on the terminals after cleaning prevents future corrosion.' },
    ],
    tip: 'GMC Motorhomes have both a chassis battery and a house battery. Check both — they fail independently.',
  },
  '6': {
    title: 'Brake Inspection & Adjustment',
    skill: 'Intermediate',
    time: '2 hours',
    category: 'Brakes',
    intro: 'The GMC Motorhome uses front disc brakes and rear drum brakes. Regular inspection is essential — these coaches are heavy and require properly maintained brakes.',
    parts: ['Brake cleaner spray', 'Brake pads or shoes (if replacing)'],
    tools: ['Jack and jack stands', 'Tyre iron', 'Flathead screwdriver', 'Brake adjusting tool'],
    steps: [
      { title: 'Safety first', detail: 'Chock the wheels, engage the park brake, and use proper jack stands. Never work under a vehicle supported only by a jack.' },
      { title: 'Remove front wheels', detail: 'Loosen the lug nuts before jacking. Remove wheels and set aside.' },
      { title: 'Inspect front disc pads', detail: 'Look through the caliper at the pad thickness. Less than 3mm means replacement soon. Check the rotor surface for deep grooves.' },
      { title: 'Remove rear wheels', detail: 'Same process. The rear drums require removing a small cover or the wheel to access the adjuster.' },
      { title: 'Inspect rear drums', detail: 'Remove the drum if accessible. Check shoe thickness and the drum surface. Look for oil contamination from a leaking wheel cylinder.' },
      { title: 'Adjust rear brakes', detail: 'Through the adjuster slot in the backing plate, turn the star wheel until the drum just drags, then back off 5 clicks. Repeat on both sides.' },
      { title: 'Reassemble and test', detail: 'Refit drums and wheels. Torque lug nuts to 100 ft-lbs. Pump the brake pedal several times before moving the vehicle to seat the pads.' },
    ],
    tip: 'If the brake pedal feels spongy after this inspection, the brake fluid may need bleeding. That\'s a separate guide.',
  },
};

const SKILL_COLOURS: Record<string, string> = {
  Beginner: '#2E7D32',
  Intermediate: '#E65100',
  Expert: '#B71C1C',
};

export default function GuideScreen() {
  const { id } = useLocalSearchParams();
  const guide = GUIDE_CONTENT[id as string];

  if (!guide) return (
    <View style={styles.container}>
      <Text style={styles.error}>Guide not found.</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={[styles.skillBadge, { backgroundColor: SKILL_COLOURS[guide.skill] }]}>
            <Text style={styles.skillText}>{guide.skill}</Text>
          </View>
          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={16} color="#888" />
            <Text style={styles.timeText}>{guide.time}</Text>
          </View>
        </View>
        <Text style={styles.intro}>{guide.intro}</Text>
      </View>

      {/* Parts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parts needed</Text>
        {guide.parts.map((part: string, i: number) => (
          <View key={i} style={styles.listItem}>
            <Ionicons name="ellipse" size={8} color="#8B4513" />
            <Text style={styles.listText}>{part}</Text>
          </View>
        ))}
      </View>

      {/* Tools */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tools needed</Text>
        {guide.tools.map((tool: string, i: number) => (
          <View key={i} style={styles.listItem}>
            <Ionicons name="ellipse" size={8} color="#8B4513" />
            <Text style={styles.listText}>{tool}</Text>
          </View>
        ))}
      </View>

      {/* Steps */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Steps</Text>
        {guide.steps.map((step: any, i: number) => (
          <View key={i} style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{i + 1}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDetail}>{step.detail}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Tip */}
      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={22} color="#8B4513" />
        <Text style={styles.tipText}>{guide.tip}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', padding: 16 },
  error: { fontSize: 18, color: '#888', textAlign: 'center', marginTop: 40 },
  header: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 18, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  skillBadge: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 12 },
  skillText: { fontSize: 13, color: '#FFF', fontWeight: '700' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { fontSize: 14, color: '#888' },
  intro: { fontSize: 16, color: '#444', lineHeight: 24 },
  section: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 18, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  listItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  listText: { fontSize: 16, color: '#444', flex: 1 },
  stepCard: { flexDirection: 'row', gap: 14, marginBottom: 16 },
  stepNumber: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#8B4513', alignItems: 'center', justifyContent: 'center',
    marginTop: 2, flexShrink: 0,
  },
  stepNumberText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 17, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  stepDetail: { fontSize: 15, color: '#555', lineHeight: 23 },
  tipCard: {
    backgroundColor: '#FFF8E1', borderRadius: 12, padding: 16,
    flexDirection: 'row', gap: 12, alignItems: 'flex-start',
    marginBottom: 40, borderLeftWidth: 4, borderLeftColor: '#8B4513',
  },
  tipText: { fontSize: 15, color: '#555', flex: 1, lineHeight: 22 },
});