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
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video, ResizeMode, AVPlaybackStatus, Audio } from 'expo-av';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');

interface VideoItem {
  id: string;
  title: string;
  category: string;
  location: string;
  likes: number;
  comments: number;
  shares: number;
  videoUrl: string;
  author: string;
}

const videos: VideoItem[] = [
  {
    id: '1',
    title: 'Young Life VA',
    category: 'Bible Study',
    location: 'Alexandria',
    likes: 234,
    comments: 45,
    shares: 12,
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/Move%20Church.mp4?alt=media&token=25aa211b-2e8c-453c-b787-74256e2575dd',
    author: 'Young Life VA',
  },
  {
    id: '2',
    title: 'Cornerstone YA',
    category: 'Testimonies',
    location: 'Leesburg VA',
    likes: 567,
    comments: 89,
    shares: 34,
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/CornerstoneYA.mp4?alt=media&token=ea5cdd5a-9a69-4546-aeac-62b0698c0be5',
    author: 'Cornerstone YA',
  },
  {
    id: '3',
    title: 'City Light Young Adults',
    category: 'Worship',
    location: 'Falls Church VA',
    likes: 892,
    comments: 156,
    shares: 67,
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/CityLigtht.mp4?alt=media&token=ab04fd54-0c74-4baf-81c4-9cd54cfa598b',
    author: 'City Light Young Adults',
  },
  {
    id: '4',
    title: 'Word of Life Young Adults',
    category: 'Fellowship',
    location: 'Virginia Beach',
    likes: 445,
    comments: 78,
    shares: 23,
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/WordOfLife.mp4?alt=media&token=e693a96c-05ec-4927-9d10-1ee4fb134a05',
    author: 'Word of Life Young Adults',
  },
];

export default function VideoFeedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as any;
  const initialIndex = params?.initialIndex || 0;
  const insets = useSafeAreaInsets();
  
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const [isMuted, setIsMuted] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const videoRefs = useRef<{ [key: string]: Video | null }>({});
  const [isReady, setIsReady] = useState(false);

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
    if (!isReady) {
      // Small delay to ensure video is rendered
      const timer = setTimeout(() => {
        const initialVideo = videos[initialIndex];
        if (initialVideo && videoRefs.current[initialVideo.id]) {
          videoRefs.current[initialVideo.id]?.playAsync();
          setIsPlaying(prev => ({ ...prev, [initialVideo.id]: true }));
        }
        setIsReady(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [initialIndex, isReady]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index || 0;
      setCurrentIndex(newIndex);
      
      // Pause all videos except the current one
      videos.forEach((video, index) => {
        if (index !== newIndex && videoRefs.current[video.id]) {
          videoRefs.current[video.id]?.pauseAsync();
          setIsPlaying(prev => ({ ...prev, [video.id]: false }));
        }
      });
      
      // Auto-play the new current video
      const currentVideo = videos[newIndex];
      if (currentVideo && videoRefs.current[currentVideo.id]) {
        videoRefs.current[currentVideo.id]?.playAsync();
        setIsPlaying(prev => ({ ...prev, [currentVideo.id]: true }));
      }
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const togglePlayPause = async (videoId: string) => {
    const video = videoRefs.current[videoId];
    if (video) {
      const status = await video.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await video.pauseAsync();
          setIsPlaying(prev => ({ ...prev, [videoId]: false }));
        } else {
          await video.playAsync();
          setIsPlaying(prev => ({ ...prev, [videoId]: true }));
        }
      }
    }
  };

  const toggleMute = async () => {
    setIsMuted(!isMuted);
    // Update all video refs to mute/unmute
    Object.values(videoRefs.current).forEach(async (video) => {
      if (video) {
        await video.setIsMutedAsync(!isMuted);
      }
    });
  };

  const renderVideo = ({ item }: { item: VideoItem }) => {
    const isVideoPlaying = isPlaying[item.id] || false;
    
    return (
      <View style={styles.videoContainer}>
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
            source={{ uri: item.videoUrl }}
            style={styles.videoBackground}
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay={false}
            isMuted={isMuted}
            volume={1.0}
          />

          {/* Top overlay with back button */}
          <View style={[styles.topOverlay, { paddingTop: insets.top + 16 }]}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={28} color="#ffffff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.muteButton}
              onPress={toggleMute}
            >
              <Ionicons 
                name={isMuted ? "volume-mute" : "volume-high"} 
                size={24} 
                color="#ffffff" 
              />
            </TouchableOpacity>
          </View>
          
          <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

          {/* Bottom overlay with info and actions */}
          <View style={[styles.bottomOverlay, { paddingBottom: insets.bottom + 32 }]}>
            <View style={styles.infoContainer}>
              <TouchableOpacity 
                style={styles.authorInfoButton}
                onPress={() => navigation.navigate('GroupProfile' as never, {
                  groupData: {
                    title: item.title,
                    category: item.category,
                    location: item.location,
                    likes: item.likes,
                    comments: item.comments,
                    shares: item.shares,
                    author: item.author,
                    username: `@${item.author.toLowerCase().replace(/\s+/g, '')}`,
                  }
                } as never)}
                activeOpacity={0.7}
              >
                <View style={styles.authorAvatar}>
                  <Ionicons name="person" size={32} color="#ffffff" />
                </View>
                <View style={styles.authorTextContainer}>
                  <View style={styles.authorNameRow}>
                    <Text
                      style={styles.authorName}
                      numberOfLines={2}
                    >
                      {item.author}
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color="#ffffff" style={styles.chevronIcon} />
                  </View>
                  <Text style={styles.videoMeta}>{item.location}</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Action buttons on the right */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="bookmark-outline" size={36} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Play/Pause button in center - only show when paused */}
          {!isVideoPlaying && (
            <View style={styles.playButtonContainer}>
              <View style={styles.playButton}>
                <Ionicons name="play" size={32} color="#ffffff" />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialScrollIndex={initialIndex}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          // Fallback: wait and try again
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
  videoContainer: {
    height: height,
    width: width,
  },
  videoTouchable: {
    flex: 1,
  },
  videoBackground: {
    width: '100%',
    height: '100%',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteButton: {
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
    alignItems: 'flex-end',
    zIndex: 10,
  },
  infoContainer: {
    flex: 1,
    marginRight: 28,
    maxWidth: '72%',
  },
  authorInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 32,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    maxWidth: '100%',
  },
  authorAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  authorTextContainer: {
    paddingRight: 8,
    flex: 1,
    maxWidth: '100%',
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginBottom: 2,
    flex: 1,
    flexShrink: 1,
    includeFontPadding: false,
  },
  chevronIcon: {
    marginLeft: 6,
    opacity: 0.8,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  videoMeta: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  actionsContainer: {
    alignItems: 'center',
    gap: 26,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 8,
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
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
});

