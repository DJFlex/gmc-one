import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SEED_POSTS = [
  {
    id: 'seed1',
    author: 'Ron M.',
    coach: '1976 GMC Royale',
    text: 'Finally got the rear air bags sorted after two years of fighting them. Turns out the compressor was fine — it was a cracked fitting on the passenger side. $4 part, two hours of crawling around. These coaches will humble you.',
    time: '2 hours ago',
    likes: 12,
  },
  {
    id: 'seed2',
    author: 'Barbara T.',
    coach: '1974 GMC Eleganza',
    text: 'Just back from a 3,000 mile trip down the coast. The old girl ran beautifully. Averaged 8mpg which I\'ll take. Anyone else finding the new ethanol-blend fuel affects the carb? Thinking of a rebuild.',
    time: '5 hours ago',
    likes: 8,
  },
  {
    id: 'seed3',
    author: 'Dave K.',
    coach: '1978 GMC Kingsley',
    text: 'Rally season coming up. Who\'s heading to Gillette this year? First time taking the Kingsley on a long haul since the converter seal repair. Fingers crossed.',
    time: '1 day ago',
    likes: 15,
  },
];

export default function ConnectScreen() {
  const [posts, setPosts] = useState(SEED_POSTS);
  const [newPost, setNewPost] = useState('');

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('community_posts').then(data => {
        if (data) {
          const saved = JSON.parse(data);
          setPosts([...saved, ...SEED_POSTS]);
        }
      });
    }, [])
  );

  const submitPost = async () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now().toString(),
      author: 'You',
      coach: 'My Coach',
      text: newPost.trim(),
      time: 'Just now',
      likes: 0,
    };
    const existing = await AsyncStorage.getItem('community_posts');
    const saved = existing ? JSON.parse(existing) : [];
    saved.unshift(post);
    await AsyncStorage.setItem('community_posts', JSON.stringify(saved));
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container}>
        {/* Post composer */}
        <View style={styles.composer}>
          <TextInput
            style={styles.composerInput}
            placeholder="Share something with the GMC community..."
            value={newPost}
            onChangeText={setNewPost}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity
            style={[styles.postButton, !newPost.trim() && styles.postButtonDisabled]}
            disabled={!newPost.trim()}
            onPress={submitPost}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* Posts */}
        {posts.map(post => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{post.author[0]}</Text>
              </View>
              <View style={styles.postMeta}>
                <Text style={styles.postAuthor}>{post.author}</Text>
                <Text style={styles.postCoach}>{post.coach}</Text>
              </View>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
            <Text style={styles.postText}>{post.text}</Text>
            <View style={styles.postFooter}>
              <Ionicons name="heart-outline" size={18} color="#888" />
              <Text style={styles.likesText}>{post.likes}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', padding: 16 },
  composer: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  composerInput: {
    fontSize: 16, color: '#333', minHeight: 80,
    textAlignVertical: 'top', marginBottom: 12,
  },
  postButton: {
    backgroundColor: '#8B4513', borderRadius: 8,
    paddingVertical: 10, alignItems: 'center',
  },
  postButtonDisabled: { backgroundColor: '#CCC' },
  postButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  postCard: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#8B4513', alignItems: 'center', justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  postMeta: { flex: 1 },
  postAuthor: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  postCoach: { fontSize: 13, color: '#8B4513' },
  postTime: { fontSize: 12, color: '#AAA' },
  postText: { fontSize: 16, color: '#444', lineHeight: 24 },
  postFooter: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  likesText: { fontSize: 14, color: '#888' },
});
