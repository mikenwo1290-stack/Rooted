import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

const { height, width } = Dimensions.get('window');

interface Song {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  views: string;
  duration: string;
}

interface RouteParams {
  artistName: string;
  songs: Song[];
  initialIndex: number;
}

export default function ArtistReelsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { artistName, songs, initialIndex } = route.params as RouteParams;
  
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());
  const [savedSongs, setSavedSongs] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const flatListRef = useRef<FlatList>(null);
  const videoRefs = useRef<{ [key: string]: Video | null }>({});

  // Scroll to initial song on mount
  React.useEffect(() => {
    if (flatListRef.current && initialIndex > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: initialIndex, animated: false });
      }, 100);
    }
  }, [initialIndex]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index || 0;
      setCurrentIndex(newIndex);
      
      // Pause all videos except the current one
      songs.forEach((song, index) => {
        if (index !== newIndex && videoRefs.current[song.id]) {
          videoRefs.current[song.id]?.pauseAsync();
          setIsPlaying(prev => ({ ...prev, [song.id]: false }));
        }
      });
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const togglePlayPause = async (songId: string) => {
    const video = videoRefs.current[songId];
    if (video) {
      const status = await video.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await video.pauseAsync();
          setIsPlaying(prev => ({ ...prev, [songId]: false }));
        } else {
          await video.playAsync();
          setIsPlaying(prev => ({ ...prev, [songId]: true }));
        }
      }
    }
  };

  const toggleLike = (songId: string) => {
    setLikedSongs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  };

  const toggleSave = (songId: string) => {
    setSavedSongs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  };

  const renderSongReel = ({ item, index }: { item: Song; index: number }) => {
    const isLiked = likedSongs.has(item.id);
    const isSaved = savedSongs.has(item.id);
    const isVideoPlaying = isPlaying[item.id] || false;
    const numericViews = parseFloat(item.views.replace(/[MK]/g, '')) * (item.views.includes('M') ? 1000000 : 1000);
    const likes = Math.floor(numericViews * 0.15);
    const comments = Math.floor(numericViews * 0.05);
    const shares = Math.floor(numericViews * 0.02);

    return (
      <View style={styles.reelContainer}>
        <TouchableOpacity 
          style={styles.videoTouchable}
          activeOpacity={1}
          onPress={() => togglePlayPause(item.id)}
        >
          <Video
            ref={(ref) => {
              if (ref) {
                videoRefs.current[item.id] = ref;
              }
            }}
            source={{ uri: item.videoUrl || item.thumbnail }}
            style={styles.reelBackground}
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay={false}
            usePoster
            posterSource={{ uri: item.thumbnail }}
            posterStyle={styles.reelBackground}
          />

          {/* Dark overlay for better text visibility */}
          <View style={styles.darkOverlay} />

          {/* Top overlay with back button */}
          <View style={styles.topOverlay}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={28} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.topTitle}>Songs</Text>
            <TouchableOpacity style={styles.topButton}>
              <Ionicons name="search" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Bottom overlay with info and actions */}
          <View style={styles.bottomOverlay}>
            <View style={styles.infoContainer}>
              {/* Artist Info */}
              <View style={styles.artistInfo}>
                <View style={styles.artistAvatar}>
                  <Ionicons name="person" size={20} color="#ffffff" />
                </View>
                <Text
                  style={styles.artistName}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                  ellipsizeMode="clip"
                >
                  {artistName}
                </Text>
              </View>
              
              {/* Song Title */}
              <Text style={styles.songTitle}>{item.title}</Text>
              
              {/* Stats Row */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons name="play" size={14} color="#ffffff" />
                  <Text style={styles.statText}>{item.views} plays</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="time-outline" size={14} color="#ffffff" />
                  <Text style={styles.statText}>{item.duration}</Text>
                </View>
              </View>

              {/* Progress indicator */}
              <View style={styles.progressIndicator}>
                <Text style={styles.progressText}>
                  {index + 1} / {songs.length}
                </Text>
              </View>
            </View>

            {/* Action buttons on the right */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => toggleLike(item.id)}
              >
                <Ionicons 
                  name={isLiked ? "heart" : "heart-outline"} 
                  size={32} 
                  color={isLiked ? "#ff4444" : "#ffffff"} 
                />
                <Text style={styles.actionText}>{likes + (isLiked ? 1 : 0)}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={32} color="#ffffff" />
                <Text style={styles.actionText}>{comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="paper-plane-outline" size={32} color="#ffffff" />
                <Text style={styles.actionText}>{shares}</Text>
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
                <Text style={styles.actionText}>{isSaved ? "Saved" : "Save"}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="ellipsis-horizontal" size={32} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Play/Pause button in center - only show when paused */}
          {!isVideoPlaying && (
            <View style={styles.playButtonContainer}>
              <View style={styles.playButton}>
                <Ionicons name="play" size={40} color="#ffffff" />
              </View>
            </View>
          )}

          {/* Audio wave animation indicator (visual only) - show when playing */}
          {isVideoPlaying && (
            <View style={styles.audioIndicator}>
              <Ionicons name="musical-notes" size={20} color="#ffffff" />
              <View style={styles.waveContainer}>
                <View style={[styles.wave, styles.wave1]} />
                <View style={[styles.wave, styles.wave2]} />
                <View style={[styles.wave, styles.wave3]} />
                <View style={[styles.wave, styles.wave4]} />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        ref={flatListRef}
        data={songs}
        renderItem={renderSongReel}
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
        initialScrollIndex={initialIndex}
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
  videoTouchable: {
    flex: 1,
  },
  reelBackground: {
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
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
  topTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  topButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 32,
    alignItems: 'flex-end',
    zIndex: 10,
  },
  infoContainer: {
    flex: 1,
    marginRight: 28,
    maxWidth: '72%',
  },
  artistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    maxWidth: '100%',
  },
  artistAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 111, 71, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  artistName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    includeFontPadding: false,
    flex: 1,
    flexShrink: 1,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  progressIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  actionsContainer: {
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  playButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
  audioIndicator: {
    position: 'absolute',
    bottom: 120,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  wave: {
    width: 3,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  wave1: {
    height: 12,
  },
  wave2: {
    height: 18,
  },
  wave3: {
    height: 14,
  },
  wave4: {
    height: 10,
  },
});

