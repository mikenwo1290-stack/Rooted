import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Video, ResizeMode, AVPlaybackStatus, Audio } from 'expo-av';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');
const HIT = { top: 10, bottom: 10, left: 10, right: 10 };

interface MusicReel {
  id: string;
  videoUrl?: string;
  imageUrl?: string;
  artistName: string;
  artistProfilePic?: string | any;
  artistFollowers: string;
  songTitle: string;
  albumTitle: string;
  albumArt?: string;
  textOverlay: string;
  isFollowing?: boolean;
}

// Music Reels Data
// TO UPDATE VIDEO URL: Go to Firebase Console → Storage → Find YourWaysBetter.mp4 → Copy Download URL
// Then replace the videoUrl below with the complete URL including the token
const defaultMusicReels: MusicReel[] = [
  {
    id: '1',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/YourWaysBetter.mp4?alt=media&token=YOUR_TOKEN_HERE',
    imageUrl: undefined,
    artistName: 'Forrest Frank',
    artistProfilePic: require('../../assets/forrest frank.jpeg'),
    artistFollowers: '125K',
    songTitle: 'Your Ways Better',
    albumTitle: 'Gospel Collection',
    albumArt: undefined,
    textOverlay: 'YOUR WAYS BETTER',
    isFollowing: false,
  },
  {
    id: '2',
    videoUrl: undefined,
    imageUrl: undefined,
    artistName: 'Alex Jean',
    artistProfilePic: undefined,
    artistFollowers: '89K',
    songTitle: 'Amazing Grace',
    albumTitle: 'Worship Songs',
    albumArt: undefined,
    textOverlay: 'AMAZING GRACE HOW SWEET THE SOUND',
    isFollowing: false,
  },
  {
    id: '3',
    videoUrl: undefined,
    imageUrl: undefined,
    artistName: 'Lecrae',
    artistProfilePic: undefined,
    artistFollowers: '2.1M',
    songTitle: 'Blessings',
    albumTitle: 'Restoration',
    albumArt: undefined,
    textOverlay: 'COUNT YOUR BLESSINGS',
    isFollowing: true,
  },
];

export default function MusicReelsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const [isMuted, setIsMuted] = useState(false);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const [savedReels, setSavedReels] = useState<Set<string>>(new Set());
  const [followingArtists, setFollowingArtists] = useState<Set<string>>(new Set());
  const [playbackProgress, setPlaybackProgress] = useState<{ [key: string]: number }>({});
  
  const flatListRef = useRef<FlatList>(null);
  const videoRefs = useRef<{ [key: string]: Video | null }>({});
  const progressIntervalRefs = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

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

  // Initialize following state from reel data
  useEffect(() => {
    const following = new Set<string>();
    defaultMusicReels.forEach(reel => {
      if (reel.isFollowing) {
        following.add(reel.artistName);
      }
    });
    setFollowingArtists(following);
  }, []);

  // Autoplay the first reel if it has a video
  useEffect(() => {
    const first = defaultMusicReels[0];
    if (first?.videoUrl) {
      const t = setTimeout(() => {
        const ref = videoRefs.current[first.id];
        if (ref) {
          ref.playAsync();
          setIsPlaying(prev => ({ ...prev, [first.id]: true }));
          startProgressTracking(first.id);
        }
      }, 300);
      return () => clearTimeout(t);
    }
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index || 0;
      setCurrentIndex(newIndex);
      
      // Pause all videos except the current one
      defaultMusicReels.forEach((reel, index) => {
        if (index !== newIndex && videoRefs.current[reel.id]) {
          videoRefs.current[reel.id]?.pauseAsync();
          setIsPlaying(prev => ({ ...prev, [reel.id]: false }));
          // Clear progress interval
          if (progressIntervalRefs.current[reel.id]) {
            clearInterval(progressIntervalRefs.current[reel.id]!);
            progressIntervalRefs.current[reel.id] = null;
          }
        }
      });
      
      // Auto-play the new current video if it has a video URL
      const currentReel = defaultMusicReels[newIndex];
      if (currentReel && currentReel.videoUrl && videoRefs.current[currentReel.id]) {
        videoRefs.current[currentReel.id]?.playAsync();
        setIsPlaying(prev => ({ ...prev, [currentReel.id]: true }));
        startProgressTracking(currentReel.id);
      }
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const startProgressTracking = (reelId: string) => {
    // Clear existing interval
    if (progressIntervalRefs.current[reelId]) {
      clearInterval(progressIntervalRefs.current[reelId]!);
    }
    
    // Update progress every 100ms
    progressIntervalRefs.current[reelId] = setInterval(() => {
      const video = videoRefs.current[reelId];
      if (video) {
        video.getStatusAsync().then((status) => {
          if (status.isLoaded) {
            const progress = status.positionMillis / status.durationMillis;
            setPlaybackProgress(prev => ({ ...prev, [reelId]: progress }));
            
            // Clear interval if video ended
            if (status.didJustFinish) {
              if (progressIntervalRefs.current[reelId]) {
                clearInterval(progressIntervalRefs.current[reelId]!);
                progressIntervalRefs.current[reelId] = null;
              }
            }
          }
        });
      }
    }, 100);
  };

  const togglePlayPause = async (reelId: string) => {
    const reel = defaultMusicReels.find(r => r.id === reelId);
    if (!reel || !reel.videoUrl) return;
    
    const video = videoRefs.current[reelId];
    if (video) {
      const status = await video.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await video.pauseAsync();
          setIsPlaying(prev => ({ ...prev, [reelId]: false }));
          if (progressIntervalRefs.current[reelId]) {
            clearInterval(progressIntervalRefs.current[reelId]!);
            progressIntervalRefs.current[reelId] = null;
          }
        } else {
          await video.playAsync();
          setIsPlaying(prev => ({ ...prev, [reelId]: true }));
          startProgressTracking(reelId);
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

  const toggleFollow = (artistName: string) => {
    setFollowingArtists((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(artistName)) {
        newSet.delete(artistName);
      } else {
        newSet.add(artistName);
      }
      return newSet;
    });
  };

  const renderMusicReel = ({ item, index }: { item: MusicReel; index: number }) => {
    const isLiked = likedReels.has(item.id);
    const isSaved = savedReels.has(item.id);
    const isFollowing = followingArtists.has(item.artistName);
    const isVideoPlaying = isPlaying[item.id] || false;
    const progress = playbackProgress[item.id] || 0;
    const overlayFontSize = Math.min(44, Math.max(28, width * 0.095));

    return (
      <View style={styles.reelContainer}>
        {/* Video or Image Background */}
        {item.videoUrl ? (
          <TouchableOpacity 
            style={styles.mediaTouchable}
            activeOpacity={1}
            onPress={() => togglePlayPause(item.id)}
          >
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
              usePoster={!!item.imageUrl}
              posterSource={item.imageUrl ? { uri: item.imageUrl } : undefined}
              posterStyle={styles.reelBackground}
            />
          </TouchableOpacity>
        ) : (
          <ImageBackground
            source={{ uri: item.imageUrl || 'https://via.placeholder.com/800x1200' }}
            style={styles.reelBackground}
            resizeMode="cover"
          >
            <TouchableOpacity 
              style={styles.mediaTouchable}
              activeOpacity={1}
            />
          </ImageBackground>
        )}

        {/* Gradients for better text/control legibility */}
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(0,0,0,0.65)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0)']}
          locations={[0, 0.35, 1]}
          style={styles.gradientTop}
        />
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.65)']}
          locations={[0, 0.6, 1]}
          style={styles.gradientBottom}
        />

        {/* Top Header Overlay */}
        <View style={[styles.topOverlay, { paddingTop: insets.top + 16 }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color="#ffffff" />
          </TouchableOpacity>
          
          {/* Centered Artist Name */}
          <Text style={styles.artistNameHeader} numberOfLines={1}>
            {item.artistName}
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

        {/* Bottom Overlay */}
        <View style={[styles.bottomOverlay, { paddingBottom: insets.bottom + 24 }]}>
          <View style={styles.bottomContent}>
            {/* Left Side - Song Info Pill */}
            <View style={styles.leftContent}>
              <View style={styles.songInfoPill}>
                {item.artistProfilePic ? (
                  <Image 
                    source={typeof item.artistProfilePic === 'string' ? { uri: item.artistProfilePic } : item.artistProfilePic} 
                    style={styles.artistProfilePic}
                  />
                ) : (
                  <View style={styles.artistProfilePicPlaceholder}>
                    <Ionicons name="person" size={20} color="#ffffff" />
                  </View>
                )}
                <View style={styles.songInfoText}>
                  <Text style={styles.songTitle} numberOfLines={1}>
                    {item.songTitle}
                  </Text>
                  <Text style={styles.artistNameText} numberOfLines={1}>
                    {item.artistName}
                  </Text>
                </View>
              </View>
            </View>

            {/* Right Side - Action Buttons */}
            <View style={styles.rightActions}>
              <TouchableOpacity 
                hitSlop={HIT}
                activeOpacity={0.75}
                style={styles.actionButton}
                onPress={() => toggleLike(item.id)}
              >
                <Ionicons 
                  name={isLiked ? "heart" : "heart-outline"} 
                  size={32} 
                  color={isLiked ? "#ff4444" : "#ffffff"} 
                />
                <Text style={styles.actionText}>Like</Text>
              </TouchableOpacity>

              <TouchableOpacity hitSlop={HIT} activeOpacity={0.75} style={styles.actionButton}>
                <Ionicons name="paper-plane-outline" size={32} color="#ffffff" />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                hitSlop={HIT}
                activeOpacity={0.75}
                style={styles.actionButton}
                onPress={() => toggleSave(item.id)}
              >
                <Ionicons 
                  name={isSaved ? "bookmark" : "bookmark-outline"} 
                  size={32} 
                  color={isSaved ? "#ffd700" : "#ffffff"} 
                />
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity hitSlop={HIT} activeOpacity={0.75} style={styles.actionButton}>
                <Ionicons name="ellipsis-horizontal" size={32} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Play/Pause Controls */}
          {item.videoUrl && (
            <View style={styles.playbackControls}>
              <TouchableOpacity 
                style={styles.playPauseButton}
                onPress={() => togglePlayPause(item.id)}
              >
                <Ionicons 
                  name={isVideoPlaying ? "pause" : "play"} 
                  size={24} 
                  color="#ffffff" 
                />
              </TouchableOpacity>
              
              {/* Progress Bar */}
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View 
                    style={[styles.progressBarFill, { width: `${progress * 100}%` }]} 
                  />
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Play Button Overlay - only show when paused and has video */}
        {item.videoUrl && !isVideoPlaying && (
          <View style={styles.playButtonOverlay}>
            <View style={styles.playButton}>
              <Ionicons name="play" size={40} color="#ffffff" />
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <FlatList
        ref={flatListRef}
        data={defaultMusicReels}
        renderItem={renderMusicReel}
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
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: false });
          });
        }}
      />
    </SafeAreaView>
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
  mediaTouchable: {
    flex: 1,
  },
  reelBackground: {
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Math.max(160, height * 0.25),
    zIndex: 4,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Math.max(200, height * 0.33),
    zIndex: 4,
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
    paddingBottom: 16,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  artistNameHeader: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginHorizontal: 16,
  },
  volumeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOverlayContainer: {
    position: 'absolute',
    top: '26%',
    left: 0,
    right: 0,
    paddingHorizontal: 32,
    zIndex: 5,
  },
  textOverlay: {
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
    letterSpacing: 1.5,
    includeFontPadding: false,
    alignSelf: 'center',
    maxWidth: '92%',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  leftContent: {
    flex: 1,
    marginRight: 12,
    maxWidth: '68%',
  },
  songInfoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  artistProfilePic: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  artistProfilePicPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  songInfoText: {
    flex: 1,
    justifyContent: 'center',
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  artistNameText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ffffff',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  rightActions: {
    alignItems: 'center',
    gap: 28,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 4,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
  },
  playPauseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
  },
  progressBarBackground: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  playButtonOverlay: {
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
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
});
