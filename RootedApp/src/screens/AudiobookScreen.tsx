import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function AudiobookScreen() {
  const navigation = useNavigation();
  const topAudiobooks = [
    {
      id: 1,
      name: 'The Bible',
      image: '',
    },
    {
      id: 2,
      name: 'Mere Christianity',
      image: '',
    },
    {
      id: 3,
      name: 'The Purpose Driven Life',
      image: '',
    },
    {
      id: 4,
      name: 'Jesus Calling',
      image: '',
    },
    {
      id: 5,
      name: 'The Screwtape Letters',
      image: '',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Top Audiobooks</Text>
            <View style={styles.spotifyLink}>
              <View style={styles.spotifyLogo}>
                <Text style={styles.spotifyText}>♪</Text>
              </View>
              <Text style={styles.playText}>Play on Spotify</Text>
              <Ionicons name="chevron-forward" size={16} color="#000000" />
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <View style={styles.moreDots}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Top Audiobooks List */}
        <View style={styles.audiobooksList}>
          {topAudiobooks.map((audiobook, index) => (
            <TouchableOpacity key={audiobook.id} style={styles.audiobookItem}>
              <View style={styles.audiobookNumber}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <Image source={{ uri: audiobook.image }} style={styles.audiobookImage} />
              <Text style={styles.audiobookName}>{audiobook.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Action Bar */}
        <View style={styles.bottomBar}>
          <View style={styles.messageContainer}>
            <Text style={styles.messagePlaceholder}>Message</Text>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF2B2B',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FF2B2B',
  },
  backButton: {
    padding: 10,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  spotifyLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotifyLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1db954',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  spotifyText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  playText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
    marginRight: 4,
  },
  moreButton: {
    padding: 8,
  },
  moreDots: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffffff',
    marginVertical: 1,
  },
  audiobooksList: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  audiobookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  audiobookNumber: {
    width: 40,
    alignItems: 'center',
  },
  numberText: {
    fontSize: 64,
    fontWeight: '900',
    color: '#000000',
  },
  audiobookImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  audiobookName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FF2B2B',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  messageContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 24,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginRight: 12,
  },
  messagePlaceholder: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});
