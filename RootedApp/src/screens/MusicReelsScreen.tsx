import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Video, ResizeMode, AVPlaybackStatus, Audio } from 'expo-av';

const { height, width } = Dimensions.get('window');

// Placeholder data structure for music reels
// Video URLs can be easily added to this array later
interface MusicReel {
  id: string;
  videoUrl?: string; // Video URL - can be added later
  imageUrl?: string; // Fallback image if no video
  artist: {
    name: string;
    profileImage?: string; // Artist profile picture URL
    followers: number; // Follower count
  };
  song: {
    title: string;
    albumArt?: string; // Album art thumbnail URL
    albumTitle?: string; // Album name
  };
  overlayText?: string; // Large text overlay on video (e.g., "NOTHING BUT THE BLOOD OF JESUS")
  likes: number;
  comments: number;
  shares: number;
}

// Placeholder data - video URLs can be added to videoUrl field
const musicReels: MusicReel[] = [
  {
    id: '1',
    videoUrl: undefined, // Add video URL here when available
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1200&fit=crop',
    artist: {
      name: 'Forrest Frank',
      profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
      followers: 125000,
    },
    song: {
      title: 'Nothing But The Blood',
      albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
      albumTitle: 'Gospel Collection',
    },
    overlayText: 'NOTHING BUT THE BLOOD OF JESUS',
    likes: 12500,
    comments: 342,
    shares: 89,
  },
  {
    id: '2',
    videoUrl: undefined, // Add video URL here when available
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=1200&fit=crop',
    artist: {
      name: 'Forrest Frank',
      profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
      followers: 125000,
    },
    song: {
      title: 'Amazing Grace',
      albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
      albumTitle: 'Worship Classics',
    },
    overlayText: 'AMAZING GRACE',
    likes: 9800,
    comments: 267,
    shares: 56,
  },
  {
    id: '3',
    videoUrl: undefined, // Add video URL here when available
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf29a9e?w=800&h=1200&fit=crop',
    artist: {
      name: 'Forrest Frank',
      profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
      followers: 125000,
    },
    song: {
      title: 'How Great Thou Art',
      albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf29a9e?w=200&h=200&fit=crop',
      albumTitle: 'Hymns of Faith',
    },
    overlayText: 'HOW GREAT THOU ART',
    likes: 15200,
    comments: 423,
    shares: 78,
  },
];

export default function MusicReelsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const [isMuted, setIsMuted] = useState(false);
  const [isFollowing, setIsFollowing] = useState<{ [key: string]: boolean }>({});
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const [savedReels, setSavedReels] = useState<Set<string>>(new Set());
  const [playbackStatus, setPlaybackStatus] = useState<{ [key: string]: AVPlaybackStatus }>({});
  
  const flatListRef = useRef<FlatList>(null);
  const videoRefs = useRef<{ [key: string]: Video | null }>({});

  // Configure audio session for video playback
  useEffect(() => {
    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });
      } catch (error) {
        console.log('Error configuring audio:', error);
      }
    };
    
    configureAudio();
  }, []);

  // Auto-play the initial video
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialReel = musicReels[0];
      if (initialReel && initialReel.videoUrl && videoRefs.current[initialReel.id]) {
        videoRefs.current[initialReel.id]?.playAsync();
        setIsPlaying(prev => ({ ...prev, [initialReel.id]: true }));
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index || 0;
      setCurrentIndex(newIndex);
      
      // Pause all videos except the current one
      musicReels.forEach((reel, index) => {
        if (index !== newIndex && videoRefs.current[reel.id]) {
          videoRefs.current[reel.id]?.pauseAsync();
          setIsPlaying(prev => ({ ...prev, [reel.id]: false }));
        }
      });
      
      // Auto-play the new current video
      const currentReel = musicReels[newIndex];
      if (currentReel && currentReel.videoUrl && videoRefs.current[currentReel.id]) {
        videoRefs.current[currentReel.id]?.playAsync();
        setIsPlaying(prev => ({ ...prev, [currentReel.id]: true }));
      }
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const togglePlayPause = async (reelId: string) => {
    const video = videoRefs.current[reelId];
    if (video) {
      const status = await video.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await video.pauseAsync();
          setIsPlaying(prev => ({ ...prev, [reelId]: false }));
        } else {
          await video.playAsync();
          setIsPlaying(prev => ({ ...prev, [reelId]: true }));
        }
      }
    }
  };

  const toggleMute = async () => {
    setIsMuted(!isMuted);
    Object.values(videoRefs.current).forEach(async (video) => {
      if (video) {
        await video.setIsMutedAsync(!isMuted);
      }
    });
  };

  const toggleFollow = (reelId: string) => {
    setIsFollowing(prev => ({
      ...prev,
      [reelId]: !prev[reelId],
    }));
  };

  const toggleLike = (reelId: string) => {
    setLikedReels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });
  };

  const toggleSave = (reelId: string) => {
    setSavedReels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });
  };

  const formatFollowers = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getProgress = (reelId: string): number => {
    const status = playbackStatus[reelId];
    if (status?.isLoaded && status.durationMillis) {
      return (status.positionMillis || 0) / status.durationMillis;
    }
    return 0;
  };

  const renderReel = ({ item }: { item: MusicReel }) => {
    const isVideoPlaying = isPlaying[item.id] || false;
    const isLiked = likedReels.has(item.id);
    const isSaved = savedReels.has(item.id);
    const isFollowed = isFollowing[item.id] || false;
    const progress = getProgress(item.id);
    const currentReel = musicReels[currentIndex];
    const isCurrentReel = currentReel?.id === item.id;

    return (
      <View style={styles.reelContainer}>
        <TouchableOpacity 
          style={styles.videoTouchable}
          activeOpacity={1}
          onPress={() => item.videoUrl && togglePlayPause(item.id)}
        >
          {/* Video or Image Background */}
          {item.videoUrl ? (
            <Video
              ref={(ref) => {
                if (ref) {
                  videoRefs.current[item.id] = ref;
                }
              }}
              source={{ uri: item.videoUrl }}
              style={styles.reelBackground}
              resizeMode={ResizeMode.COVER}
              isLooping
              shouldPlay={false}
              isMuted={isMuted}
              volume={1.0}
              onPlaybackStatusUpdate={(status) => {
                setPlaybackStatus(prev => ({ ...prev, [item.id]: status }));
              }}
            />
          ) : (
            <Image
              source={{ uri: item.imageUrl || 'https://via.placeholder.com/800x1200' }}
              style={styles.reelBackground}
              resizeMode="cover"
            />
          )}

          {/* Dark overlay for better text visibility */}
          <View style={styles.darkOverlay} />

          {/* Top Header Overlay */}
          <View style={[styles.topOverlay, { paddingTop: insets.top + 12 }]}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            
            {/* Centered Artist Name */}
            <Text style={styles.headerArtistName} numberOfLines={1}>
              {item.artist.name}
            </Text>
            
            {/* Volume/Speaker Icon */}
            <TouchableOpacity 
              style={styles.volumeButton}
              onPress={toggleMute}
            >
              <Ionicons 
                name={isMuted ? "volume-mute" : "volume-high"} 
                size={24} 
                color="#ffffff" 
              />
            </TouchableOpacity>
          </View>

          {/* Large Text Overlay */}
          {item.overlayText && (
            <View style={styles.textOverlayContainer}>
              <Text style={styles.textOverlay}>{item.overlayText}</Text>
            </View>
          )}

          {/* Bottom Overlay */}
          <View style={[styles.bottomOverlay, { paddingBottom: insets.bottom + 16 }]}>
            <View style={styles.bottomContent}>
              {/* Left Side - Artist Info, Song, Album */}
              <View style={styles.leftContent}>
                {/* Artist Profile, Name, Followers, Follow Button */}
                <View style={styles.artistSection}>
                  <Image
                    source={{ 
                      uri: item.artist.profileImage || 'https://via.placeholder.com/50'
                    }}
                    style={styles.artistProfileImage}
                  />
                  <View style={styles.artistInfo}>
                    <Text style={styles.artistName} numberOfLines={1}>
                      {item.artist.name}
                    </Text>
                    <Text style={styles.followerCount}>
                      {formatFollowers(item.artist.followers)} followers
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.followButton,
                      isFollowed && styles.followingButton
                    ]}
                    onPress={() => toggleFollow(item.id)}
                  >
                    <Text style={[
                      styles.followButtonText,
                      isFollowed && styles.followingButtonText
                    ]}>
                      {isFollowed ? 'Following' : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Song Title */}
                <Text style={styles.songTitle} numberOfLines={1}>
                  {item.song.title}
                </Text>

                {/* Album Art with Title and Add Button */}
                <View style={styles.albumSection}>
                  <Image
                    source={{ 
                      uri: item.song.albumArt || 'https://via.placeholder.com/60'
                    }}
                    style={styles.albumArt}
                  />
                  <View style={styles.albumInfo}>
                    <Text style={styles.albumTitle} numberOfLines={1}>
                      {item.song.albumTitle || 'Album'}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Right Side - Action Buttons */}
              <View style={styles.rightActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => toggleLike(item.id)}
                >
                  <Ionicons 
                    name={isLiked ? "heart" : "heart-outline"} 
                    size={32} 
                    color={isLiked ? "#ff4444" : "#ffffff"} 
                  />
                  <Text style={styles.actionText}>
                    {formatCount(item.likes + (isLiked ? 1 : 0))}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chatbubble-outline" size={32} color="#ffffff" />
                  <Text style={styles.actionText}>
                    {formatCount(item.comments)}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="paper-plane-outline" size={32} color="#ffffff" />
                  <Text style={styles.actionText}>
                    {formatCount(item.shares)}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => toggleSave(item.id)}
                >
                  <Ionicons 
                    name={isSaved ? "bookmark" : "bookmark-outline"} 
                    size={32} 
                    color={isSaved ? "#ffd700" : "#ffffff"} 
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="ellipsis-horizontal" size={32} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Play/Pause Controls and Progress Bar */}
            {item.videoUrl && (
              <View style={styles.controlsContainer}>
                <TouchableOpacity
                  style={styles.playPauseButton}
                  onPress={() => togglePlayPause(item.id)}
                >
                  <Ionicons 
                    name={isVideoPlaying ? "pause" : "play"} 
                    size={20} 
                    color="#ffffff" 
                  />
                </TouchableOpacity>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Play/Pause overlay - only show when paused */}
          {item.videoUrl && !isVideoPlaying && (
            <View style={styles.playOverlay}>
              <View style={styles.playButton}>
                <Ionicons name="play" size={48} color="#ffffff" />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <FlatList
        ref={flatListRef}
        data={musicReels}
        renderItem={renderReel}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: false,
            });
          }, 100);
        }}
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
    height: height,
    width: width,
  },
  videoTouchable: {
    flex: 1,
  },
  reelBackground: {
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerArtistName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  volumeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOverlayContainer: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
    paddingHorizontal: 20,
  },
  textOverlay: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    letterSpacing: 2,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  leftContent: {
    flex: 1,
    marginRight: 16,
    maxWidth: '70%',
  },
  artistSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  artistProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ffffff',
    marginRight: 10,
  },
  artistInfo: {
    flex: 1,
    marginRight: 8,
  },
  artistName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginBottom: 2,
  },
  followerCount: {
    fontSize: 13,
    color: '#ffffff',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
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
    fontWeight: '600',
    color: '#000000',
  },
  followingButtonText: {
    color: '#ffffff',
  },
  songTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  albumSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  albumInfo: {
    flex: 1,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  rightActions: {
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  playPauseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    width: '100%',
    height: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  playButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
});
