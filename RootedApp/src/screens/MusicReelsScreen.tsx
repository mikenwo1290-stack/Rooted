import React, { useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode } from 'expo-av';
import type { AVPlaybackStatus } from 'expo-av';

type ReelMedia =
  | {
      type: 'video';
      uri: string;
      preview?: string;
    }
  | {
      type: 'image';
      uri: string;
    };

type MusicReel = {
  id: string;
  media: ReelMedia;
  artist: {
    name: string;
    username: string;
    followers: string;
    avatar: string;
  };
  track: {
    title: string;
    album: string;
    artwork: string;
    lyricLine: string;
  };
};

type PlaybackSnapshot = {
  positionMillis: number;
  durationMillis: number;
};

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

const DEFAULT_REELS: MusicReel[] = [
  {
    id: 'forrest-frank',
    media: {
      type: 'video',
      uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      preview: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80',
    },
    artist: {
      name: 'Forrest Frank',
      username: '@forrestfrankmusic',
      followers: '128K Followers',
      avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=256&q=80',
    },
    track: {
      title: 'Nothing But The Blood',
      album: 'Wildflower Worship',
      artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=256&q=80',
      lyricLine: 'NOTHING BUT THE BLOOD OF JESUS',
    },
  },
  {
    id: 'caleb-gordon',
    media: {
      type: 'video',
      uri: 'https://d23dyxeqlo5psv.cloudfront.net/elephants-dream.mp4',
      preview: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    },
    artist: {
      name: 'Caleb Gordon',
      username: '@calebgordon44',
      followers: '96K Followers',
      avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80',
    },
    track: {
      title: 'Spirit Lead',
      album: 'Psalms In Motion',
      artwork: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=256&q=80',
      lyricLine: 'LEANING ON THE EVERLASTING ARMS',
    },
  },
  {
    id: 'maverick-city',
    media: {
      type: 'image',
      uri: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1400&q=80',
    },
    artist: {
      name: 'Maverick City',
      username: '@maverickcitymusic',
      followers: '502K Followers',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    },
    track: {
      title: 'Firm Foundation (He Won’t)',
      album: 'Revelation Records',
      artwork: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80',
      lyricLine: 'CHRIST IS MY FIRM FOUNDATION',
    },
  },
];

export default function MusicReelsScreen() {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const initialPausedState = useMemo(
    () =>
      DEFAULT_REELS.reduce<Record<string, boolean>>((accumulator, reel) => {
        accumulator[reel.id] = false;
        return accumulator;
      }, {}),
    []
  );

  const [pausedMap, setPausedMap] = useState<Record<string, boolean>>(initialPausedState);
  const [playbackMap, setPlaybackMap] = useState<Record<string, PlaybackSnapshot>>(() =>
    DEFAULT_REELS.reduce<Record<string, PlaybackSnapshot>>((accumulator, reel) => {
      accumulator[reel.id] = { positionMillis: 0, durationMillis: 1 };
      return accumulator;
    }, {})
  );
  const [isMuted, setIsMuted] = useState(false);
  const videoRefs = useRef<Record<string, Video | null>>({});

  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (!viewableItems.length) {
        return;
      }

      const firstViewable = viewableItems[0];
      if (firstViewable.index == null) {
        return;
      }

      setActiveIndex(firstViewable.index);

      const reelItem = firstViewable.item as MusicReel | undefined;
      if (reelItem) {
        setPausedMap((previous) => ({
          ...previous,
          [reelItem.id]: false,
        }));
      }
    }
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70,
  });

  const togglePlayPause = (reelId: string) => {
    setPausedMap((previous) => {
      const nextPausedState = !previous[reelId];
      const videoRef = videoRefs.current[reelId];
      if (videoRef) {
        if (nextPausedState) {
          videoRef.pauseAsync().catch(() => undefined);
        } else {
          videoRef.playAsync().catch(() => undefined);
        }
      }
      return {
        ...previous,
        [reelId]: nextPausedState,
      };
    });
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    Object.values(videoRefs.current).forEach((videoRef) => {
      if (videoRef) {
        videoRef.setIsMutedAsync(nextMuted).catch(() => undefined);
      }
    });
  };

  const handlePlaybackStatusUpdate =
    (reelId: string) =>
    (status: AVPlaybackStatus): void => {
      if (!status.isLoaded) {
        return;
      }

      setPlaybackMap((previous) => ({
        ...previous,
        [reelId]: {
          positionMillis: status.positionMillis ?? 0,
          durationMillis: status.durationMillis ?? previous[reelId]?.durationMillis ?? 1,
        },
      }));

      if (status.didJustFinish) {
        const videoRef = videoRefs.current[reelId];
        videoRef?.replayAsync().catch(() => undefined);
      }
    };

  const renderReel = ({ item, index }: { item: MusicReel; index: number }) => {
    const isActive = index === activeIndex;
    const isPaused = pausedMap[item.id];
    const playbackStatus = playbackMap[item.id];
    const progress =
      playbackStatus && playbackStatus.durationMillis > 0
        ? playbackStatus.positionMillis / playbackStatus.durationMillis
        : 0;

    return (
      <View style={[styles.reelContainer, { height: WINDOW_HEIGHT }]}>
        {item.media.type === 'video' ? (
          <Video
            ref={(ref) => {
              videoRefs.current[item.id] = ref;
            }}
            style={StyleSheet.absoluteFill}
            source={{ uri: item.media.uri }}
            resizeMode={ResizeMode.COVER}
            shouldPlay={isActive && !isPaused}
            isLooping
            isMuted={isMuted}
            posterSource={item.media.preview ? { uri: item.media.preview } : undefined}
            usePoster={Boolean(item.media.preview)}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate(item.id)}
          />
        ) : (
          <ImageBackground source={{ uri: item.media.uri }} style={StyleSheet.absoluteFill} />
        )}

        <LinearGradient
          colors={['rgba(0,0,0,0.55)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.65)']}
          locations={[0, 0.5, 0.95]}
          style={StyleSheet.absoluteFill}
        />

        <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'left']}>
          <View style={[styles.header, { paddingTop: 12 }]}>
            <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{item.artist.name}</Text>
            <TouchableOpacity style={styles.headerButton} onPress={toggleMute}>
              <Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={22} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View style={styles.contentOverlay}>
          <Text style={styles.lyricText}>{item.track.lyricLine}</Text>

          <View style={styles.bottomSection}>
            <View style={styles.bottomLeftColumn}>
              <View style={styles.artistInfoRow}>
                <Image source={{ uri: item.artist.avatar }} style={styles.avatar} />
                <View style={styles.artistMeta}>
                  <Text style={styles.artistName}>{item.artist.name}</Text>
                  <Text style={styles.artistHandle}>{item.artist.username}</Text>
                  <Text style={styles.artistFollowers}>{item.artist.followers}</Text>
                </View>
                <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{item.track.title}</Text>
              </View>

              <View style={styles.albumRow}>
                <Image source={{ uri: item.track.artwork }} style={styles.albumArt} />
                <View style={styles.albumMeta}>
                  <Text style={styles.albumLabel}>Album</Text>
                  <Text style={styles.albumTitle}>{item.track.album}</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <Ionicons name="add" size={18} color="#0c0c0c" />
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.playbackControlsRow}>
                <TouchableOpacity
                  style={styles.playPauseButton}
                  onPress={() => togglePlayPause(item.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons name={isPaused ? 'play' : 'pause'} size={18} color="#0c0c0c" />
                </TouchableOpacity>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${Math.min(progress * 100, 100)}%` }]} />
                </View>
              </View>
            </View>

            <View style={styles.actionColumn}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="heart-outline" size={26} color="#ffffff" />
                <Text style={styles.actionLabel}>1.2K</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-ellipses-outline" size={26} color="#ffffff" />
                <Text style={styles.actionLabel}>203</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="paper-plane-outline" size={26} color="#ffffff" />
                <Text style={styles.actionLabel}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="bookmark-outline" size={26} color="#ffffff" />
                <Text style={styles.actionLabel}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.lastActionButton]}>
                <Ionicons name="ellipsis-vertical" size={26} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={DEFAULT_REELS}
        keyExtractor={(item) => item.id}
        renderItem={renderReel}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        windowSize={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(12,12,12,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  reelContainer: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  contentOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 80,
  },
  lyricText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginRight: 48,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomLeftColumn: {
    flex: 1,
    marginRight: 12,
  },
  artistInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  artistMeta: {
    flex: 1,
    marginHorizontal: 12,
  },
  artistName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  artistHandle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginTop: 2,
  },
  artistFollowers: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 2,
  },
  followButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#ffffff',
  },
  followButtonText: {
    color: '#0c0c0c',
    fontSize: 13,
    fontWeight: '700',
  },
  trackInfo: {
    marginBottom: 12,
  },
  trackTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  albumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(12,12,12,0.5)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 18,
  },
  albumArt: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  albumMeta: {
    flex: 1,
    marginHorizontal: 12,
  },
  albumLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  albumTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#0c0c0c',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  playbackControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  actionColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 18,
  },
  actionLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  lastActionButton: {
    marginBottom: 0,
  },
});
