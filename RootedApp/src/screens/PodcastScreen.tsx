import React, { useState } from 'react';
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

type Category = 'All' | 'Faith' | 'Devotional' | 'Teaching' | 'Testimony' | 'Contemporary';

export default function PodcastScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const categories: Category[] = ['All', 'Faith', 'Devotional', 'Teaching', 'Testimony', 'Contemporary'];

  const podcastsByCategory: Record<Category, Array<{ id: number; name: string; image: string }>> = {
    All: [
      {
        id: 1,
        name: 'The Daily',
        image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
      },
      {
        id: 2,
        name: 'This American Life',
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
      },
      {
        id: 3,
        name: 'Gospel Conversations',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      },
      {
        id: 4,
        name: 'Faith Today',
        image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
      },
    ],
    Faith: [
      {
        id: 11,
        name: 'Faith Conversations',
        image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
      },
      {
        id: 12,
        name: 'Spiritual Growth',
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
      },
      {
        id: 13,
        name: 'Faith Builders',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      },
    ],
    Devotional: [
      {
        id: 21,
        name: 'Daily Devotions',
        image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
      },
      {
        id: 22,
        name: 'Morning Prayer',
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
      },
      {
        id: 23,
        name: 'Word for Today',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      },
    ],
    Teaching: [
      {
        id: 31,
        name: 'Bible Study',
        image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
      },
      {
        id: 32,
        name: 'Theology 101',
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
      },
      {
        id: 33,
        name: 'Christian Foundations',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      },
    ],
    Testimony: [
      {
        id: 41,
        name: 'Changed Lives',
        image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
      },
      {
        id: 42,
        name: 'Stories of Grace',
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
      },
      {
        id: 43,
        name: 'Transformation Stories',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      },
    ],
    Contemporary: [
      {
        id: 51,
        name: 'Modern Faith',
        image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
      },
      {
        id: 52,
        name: 'Faith in Culture',
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
      },
      {
        id: 53,
        name: 'Next Gen Faith',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      },
    ],
  };

  const topPodcasts = podcastsByCategory[selectedCategory] || [
    {
      id: 1,
      name: 'The Daily',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
    },
    {
      id: 2,
      name: 'This American Life',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
    },
    {
      id: 3,
      name: 'Gospel Conversations',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    },
    {
      id: 4,
      name: 'Faith Today',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
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
            <Text style={styles.headerTitle}>Top Podcasts</Text>
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

        {/* Category Filter Pills */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoryFilterContainer}
          contentContainerStyle={styles.categoryFilterContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryPill,
                selectedCategory === category && styles.activeCategoryPill,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryPillText,
                  selectedCategory === category && styles.activeCategoryPillText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Top Podcasts List */}
        <View style={styles.podcastsList}>
          {topPodcasts.map((podcast, index) => (
            <TouchableOpacity 
              key={podcast.id} 
              style={styles.podcastItem}
              onPress={() => navigation.navigate('PodcastReels' as never)}
            >
              <View style={styles.podcastNumber}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <Image source={{ uri: podcast.image }} style={styles.podcastImage} />
              <Text style={styles.podcastName}>{podcast.name}</Text>
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
  categoryFilterContainer: {
    backgroundColor: '#FF2B2B',
    paddingVertical: 12,
  },
  categoryFilterContent: {
    paddingHorizontal: 16,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeCategoryPill: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  activeCategoryPillText: {
    color: '#ffffff',
  },
  podcastsList: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  podcastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  podcastNumber: {
    width: 40,
    alignItems: 'center',
  },
  numberText: {
    fontSize: 64,
    fontWeight: '900',
    color: '#000000',
  },
  podcastImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  podcastName: {
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
