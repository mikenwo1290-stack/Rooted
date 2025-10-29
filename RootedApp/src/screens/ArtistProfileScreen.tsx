import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const gridItemWidth = (width - 6) / 3; // 3 columns with 2px gap

interface Song {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  duration: string;
}

interface ArtistData {
  name: string;
  image: string;
  followers: string;
  bio: string;
  genre: string;
  songs: Song[];
}

const artistProfiles: Record<string, ArtistData> = {
  'Forrest Frank': {
    name: 'Forrest Frank',
    image: 'https://iscale.iheart.com/catalog/artist/39644335',
    followers: '1.2M',
    bio: 'Christian artist spreading love and positivity through music 🙏✨',
    genre: 'R&B / Contemporary',
    songs: [
      {
        id: '1',
        title: 'Good Day',
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
        views: '2.3M',
        duration: '0:10',
      },
      {
        id: '2',
        title: 'Low Key',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        views: '1.8M',
        duration: '0:10',
      },
      {
        id: '3',
        title: 'No Longer Bound',
        thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
        views: '1.5M',
        duration: '0:10',
      },
      {
        id: '4',
        title: 'Psalm 23',
        thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
        views: '1.2M',
        duration: '0:10',
      },
      {
        id: '5',
        title: 'Always Been You',
        thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
        views: '980K',
        duration: '0:10',
      },
      {
        id: '6',
        title: 'Breathing',
        thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
        views: '850K',
        duration: '0:10',
      },
    ],
  },
  'Lecrae': {
    name: 'Lecrae',
    image: 'https://cdn.rapzilla.com/wp-content/uploads/2020/02/23110153/lecrae_82352427_609507742939725_4716740008231310092_n-e1580802632146.jpg',
    followers: '3.5M',
    bio: 'Hip Hop artist. Spreading the Gospel one verse at a time 🎤',
    genre: 'Hip Hop / Rap',
    songs: [
      {
        id: '1',
        title: 'I\'ll Find You',
        thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop',
        views: '5.2M',
        duration: '0:10',
      },
      {
        id: '2',
        title: 'Blessings',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        views: '4.8M',
        duration: '0:10',
      },
      {
        id: '3',
        title: 'All Things Work Together',
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
        views: '3.9M',
        duration: '0:10',
      },
      {
        id: '4',
        title: 'Deep End',
        thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
        views: '3.1M',
        duration: '0:10',
      },
      {
        id: '5',
        title: 'Sunday Morning',
        thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
        views: '2.7M',
        duration: '0:10',
      },
      {
        id: '6',
        title: 'Messengers',
        thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
        views: '2.3M',
        duration: '0:10',
      },
    ],
  },
  'Alex Jean': {
    name: 'Alex Jean',
    image: 'https://i.scdn.co/image/ab6761610000e5eb944b0a0667b676f995af4314',
    followers: '850K',
    bio: 'Worship leader & songwriter. Bringing heaven to earth 🎶',
    genre: 'Worship / R&B',
    songs: [
      {
        id: '1',
        title: 'Come to Me',
        thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
        views: '1.5M',
        duration: '0:10',
      },
      {
        id: '2',
        title: 'Still Waters',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        views: '1.2M',
        duration: '0:10',
      },
      {
        id: '3',
        title: 'Grace Abounds',
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
        views: '980K',
        duration: '0:10',
      },
      {
        id: '4',
        title: 'Holy Ground',
        thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
        views: '750K',
        duration: '0:10',
      },
      {
        id: '5',
        title: 'Faithful One',
        thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
        views: '620K',
        duration: '0:10',
      },
      {
        id: '6',
        title: 'Surrender All',
        thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
        views: '580K',
        duration: '0:10',
      },
    ],
  },
  'Caleb Gordon': {
    name: 'Caleb Gordon',
    image: 'https://i.ytimg.com/vi/xWC808UHCr4/maxresdefault.jpg',
    followers: '650K',
    bio: 'Making music that glorifies God 🎵 Inspiring the next generation',
    genre: 'Contemporary Christian',
    songs: [
      {
        id: '1',
        title: 'Higher',
        thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop',
        views: '890K',
        duration: '0:10',
      },
      {
        id: '2',
        title: 'Never Alone',
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
        views: '780K',
        duration: '0:10',
      },
      {
        id: '3',
        title: 'Breakthrough',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        views: '650K',
        duration: '0:10',
      },
      {
        id: '4',
        title: 'Overflow',
        thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
        views: '520K',
        duration: '0:10',
      },
      {
        id: '5',
        title: 'Renewed',
        thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
        views: '480K',
        duration: '0:10',
      },
      {
        id: '6',
        title: 'In Your Presence',
        thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
        views: '420K',
        duration: '0:10',
      },
    ],
  },
};

export default function ArtistProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { artistName } = route.params as { artistName: string };
  
  const [activeTab, setActiveTab] = useState<'songs' | 'about'>('songs');
  
  const artistData = artistProfiles[artistName] || artistProfiles['Forrest Frank'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#212529" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{artistData.name}</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#212529" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={{ uri: artistData.image }} style={styles.profileImage} />
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{artistData.songs.length}</Text>
              <Text style={styles.statLabel}>Songs</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{artistData.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{artistData.genre}</Text>
              <Text style={styles.statLabel}>Genre</Text>
            </View>
          </View>

          <Text style={styles.artistName}>{artistData.name}</Text>
          <Text style={styles.bio}>{artistData.bio}</Text>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'songs' && styles.activeTab]}
            onPress={() => setActiveTab('songs')}
          >
            <Ionicons 
              name="grid-outline" 
              size={24} 
              color={activeTab === 'songs' ? '#212529' : '#6c757d'} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'about' && styles.activeTab]}
            onPress={() => setActiveTab('about')}
          >
            <Ionicons 
              name="information-circle-outline" 
              size={24} 
              color={activeTab === 'about' ? '#212529' : '#6c757d'} 
            />
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === 'songs' ? (
          /* Songs Grid */
          <View style={styles.songsGrid}>
            {artistData.songs.map((song, index) => (
              <TouchableOpacity 
                key={song.id} 
                style={styles.songItem}
                onPress={() => navigation.navigate('ArtistReels' as never, { 
                  artistName: artistData.name,
                  songs: artistData.songs,
                  initialIndex: index
                } as never)}
              >
                <ImageBackground 
                  source={{ uri: song.thumbnail }} 
                  style={styles.songThumbnail}
                  imageStyle={{ borderRadius: 4 }}
                >
                  <View style={styles.songOverlay}>
                    <View style={styles.playIconContainer}>
                      <Ionicons name="play" size={32} color="#ffffff" />
                    </View>
                    <View style={styles.songInfo}>
                      <View style={styles.viewsContainer}>
                        <Ionicons name="play" size={12} color="#ffffff" />
                        <Text style={styles.views}>{song.views}</Text>
                      </View>
                      <View style={styles.durationBadge}>
                        <Text style={styles.duration}>{song.duration}</Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
                <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* About Section */
          <View style={styles.aboutSection}>
            <View style={styles.aboutItem}>
              <Ionicons name="musical-note" size={24} color="#8B6F47" />
              <View style={styles.aboutTextContainer}>
                <Text style={styles.aboutLabel}>Genre</Text>
                <Text style={styles.aboutValue}>{artistData.genre}</Text>
              </View>
            </View>
            <View style={styles.aboutItem}>
              <Ionicons name="people" size={24} color="#8B6F47" />
              <View style={styles.aboutTextContainer}>
                <Text style={styles.aboutLabel}>Followers</Text>
                <Text style={styles.aboutValue}>{artistData.followers} followers</Text>
              </View>
            </View>
            <View style={styles.aboutItem}>
              <Ionicons name="disc" size={24} color="#8B6F47" />
              <View style={styles.aboutTextContainer}>
                <Text style={styles.aboutLabel}>Total Songs</Text>
                <Text style={styles.aboutValue}>{artistData.songs.length} songs available</Text>
              </View>
            </View>
            <View style={styles.aboutItem}>
              <Ionicons name="information-circle" size={24} color="#8B6F47" />
              <View style={styles.aboutTextContainer}>
                <Text style={styles.aboutLabel}>About</Text>
                <Text style={styles.aboutValue}>{artistData.bio}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E8',
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
    borderBottomWidth: 1,
    borderBottomColor: '#E6DDD1',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  moreButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#8B6F47',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
  artistName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E6DDD1',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#212529',
  },
  songsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 1,
  },
  songItem: {
    width: gridItemWidth,
    marginBottom: 8,
    padding: 1,
  },
  songThumbnail: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#6c757d',
    borderRadius: 4,
  },
  songOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: 8,
  },
  playIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  songInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  views: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  durationBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  duration: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  songTitle: {
    fontSize: 12,
    color: '#212529',
    marginTop: 4,
    paddingHorizontal: 2,
  },
  aboutSection: {
    padding: 16,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#FFFEF9',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#4A4238',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  aboutTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  aboutLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 4,
    fontWeight: '500',
  },
  aboutValue: {
    fontSize: 14,
    color: '#212529',
    fontWeight: '600',
  },
});

