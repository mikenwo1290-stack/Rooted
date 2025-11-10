import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  ViewToken,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface MusicReel {
  id: string;
  artistName: string;
  artistImage: string;
  artistFollowers: string;
  songTitle: string;
  videoOverlayText: string;
  albumTitle: string;
  albumArt: string;
  videoUrl?: string; // Will be populated later with actual video URLs
  backgroundImage: string; // Placeholder background until video is added
}

// Placeholder data - video URLs can be easily added to this structure
const MUSIC_REELS: MusicReel[] = [
  {
    id: '1',
    artistName: 'Forrest Frank',
    artistImage: 'https://iscale.iheart.com/catalog/artist/39644335',
    artistFollowers: '1.2M',
    songTitle: 'Nothing But The Blood',
    videoOverlayText: 'NOTHING BUT THE\nBLOOD OF JESUS',
    albumTitle: 'Sunday Service',
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273a0b0e3f6c3e9f1f2e3f6c3e9',
    backgroundImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1080&fit=crop',
  },
  {
    id: '2',
    artistName: 'Alex Jean',
    artistImage: 'https://i.scdn.co/image/ab6761610000e5eb944b0a0667b676f995af4314',
    artistFollowers: '850K',
    songTitle: 'Good News',
    videoOverlayText: 'GOOD NEWS\nFOR THE SOUL',
    albumTitle: 'Revival',
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273a0b0e3f6c3e9f1f2e3f6c3e9',
    backgroundImage: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1080&fit=crop',
  },
  {
    id: '3',
    artistName: 'Lecrae',
    artistImage: 'https://cdn.rapzilla.com/wp-content/uploads/2020/02/23110153/lecrae_82352427_609507742939725_4716740008231310092_n-e1580802632146.jpg',
    artistFollowers: '2.5M',
    songTitle: 'Blessings',
    videoOverlayText: 'COUNT YOUR\nBLESSINGS',
    albumTitle: 'All Things Work Together',
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273a0b0e3f6c3e9f1f2e3f6c3e9',
    backgroundImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1080&fit=crop',
  },
];

export default function MusicReelsScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const currentReel = MUSIC_REELS[currentIndex];

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderReel = ({ item }: { item: MusicReel }) => (
    <View style={styles.reelContainer}>
      {/* Full-screen background - will be video when URLs are added */}
      <ImageBackground
        source={{ uri: item.backgroundImage }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Top Header */}
          <SafeAreaView edges={['top']} style={styles.topSafeArea}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={28} color="#ffffff" />
              </TouchableOpacity>

              <Text style={styles.artistHeaderName}>{item.artistName}</Text>

              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => setIsMuted(!isMuted)}
              >
                <Ionicons
                  name={isMuted ? 'volume-mute' : 'volume-high'}
                  size={28}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Center Text Overlay */}
          <View style={styles.centerContent}>
            <Text style={styles.overlayText}>{item.videoOverlayText}</Text>
          </View>

          {/* Bottom Content */}
          <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea}>
            <View style={styles.bottomContent}>
              {/* Right Side Action Buttons */}
              <View style={styles.rightActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setIsLiked(!isLiked)}
                >
                  <Ionicons
                    name={isLiked ? 'heart' : 'heart-outline'}
                    size={32}
                    color={isLiked ? '#FF2B2B' : '#ffffff'}
                  />
                  <Text style={styles.actionText}>12.5K</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chatbubble-outline" size={32} color="#ffffff" />
                  <Text style={styles.actionText}>842</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="paper-plane-outline" size={32} color="#ffffff" />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setIsSaved(!isSaved)}
                >
                  <Ionicons
                    name={isSaved ? 'bookmark' : 'bookmark-outline'}
                    size={32}
                    color="#ffffff"
                  />
                  <Text style={styles.actionText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="ellipsis-vertical" size={32} color="#ffffff" />
                </TouchableOpacity>
              </View>

              {/* Bottom Left Info */}
              <View style={styles.bottomLeftContent}>
                {/* Artist Info */}
                <View style={styles.artistInfo}>
                  <Image
                    source={{ uri: item.artistImage }}
                    style={styles.artistAvatar}
                  />
                  <View style={styles.artistDetails}>
                    <Text style={styles.artistName}>{item.artistName}</Text>
                    <Text style={styles.followerCount}>{item.artistFollowers} followers</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.followButton, isFollowing && styles.followingButton]}
                    onPress={() => setIsFollowing(!isFollowing)}
                  >
                    <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                      {isFollowing ? 'Following' : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Song Title */}
                <Text style={styles.songTitle}>{item.songTitle}</Text>

                {/* Album Info */}
                <View style={styles.albumInfo}>
                  <Image
                    source={{ uri: item.albumArt }}
                    style={styles.albumArt}
                  />
                  <View style={styles.albumDetails}>
                    <Text style={styles.albumTitle}>{item.albumTitle}</Text>
                  </View>
                  <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '35%' }]} />
                  </View>
                  <View style={styles.progressTime}>
                    <Text style={styles.timeText}>1:23</Text>
                    <Text style={styles.timeText}>3:45</Text>
                  </View>
                </View>

                {/* Play/Pause Control */}
                <View style={styles.playControls}>
                  <TouchableOpacity style={styles.playButton}>
                    <Ionicons name="play-skip-back" size={28} color="#ffffff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.mainPlayButton}>
                    <Ionicons name="pause" size={36} color="#ffffff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.playButton}>
                    <Ionicons name="play-skip-forward" size={28} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={MUSIC_REELS}
        renderItem={renderReel}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  reelContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  topSafeArea: {
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 22,
  },
  artistHeaderName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  overlayText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 2,
    lineHeight: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bottomSafeArea: {
    zIndex: 10,
  },
  bottomContent: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  bottomLeftContent: {
    flex: 1,
    marginRight: 16,
  },
  artistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  artistAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  artistDetails: {
    flex: 1,
    marginLeft: 12,
  },
  artistName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  followerCount: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  followButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  followingButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  followingButtonText: {
    color: '#ffffff',
  },
  songTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  albumInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
  },
  albumArt: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  albumDetails: {
    flex: 1,
    marginLeft: 10,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  progressTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  playControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  playButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainPlayButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  rightActions: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 80,
    gap: 24,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
