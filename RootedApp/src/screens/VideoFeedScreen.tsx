import React, { useEffect, useRef, useState } from 'react';
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
import { Video } from 'expo-av';

const { height, width } = Dimensions.get('window');

interface VideoData {
  id: string;
  title: string;
  category: string;
  location: string;
  likes: number;
  comments: number;
  shares: number;
  thumbnail: string;
  videoUrl?: string;
  author: string;
  authorAvatar: string;
}

const videos: VideoData[] = [
  {
    id: '1',
    title: 'Young Life VA',
    category: 'Bible Study',
    location: 'Alexandria',
    likes: 234,
    comments: 45,
    shares: 12,
    thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=800&fit=crop',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/Move%20Church.mp4?alt=media&token=25aa211b-2e8c-453c-b787-74256e2575dd',
    author: 'Young Life VA',
    authorAvatar: '',
  },
  {
    id: '2',
    title: 'Cornerstone YA',
    category: 'Testimonies',
    location: 'Leesburg VA',
    likes: 567,
    comments: 89,
    shares: 34,
    thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=800&fit=crop',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/CornerstoneYA.mp4?alt=media&token=ea5cdd5a-9a69-4546-aeac-62b0698c0be5',
    author: 'Cornerstone YA',
    authorAvatar: '',
  },
  {
    id: '3',
    title: 'City Light Young Adults',
    category: 'Worship',
    location: 'Falls Church VA',
    likes: 892,
    comments: 156,
    shares: 67,
    thumbnail: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?w=400&h=800&fit=crop',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/CityLigtht.mp4?alt=media&token=ab04fd54-0c74-4baf-81c4-9cd54cfa598b',
    author: 'City Light Young Adults',
    authorAvatar: '',
  },
  {
    id: '4',
    title: 'Word of Life Young Adults',
    category: 'Fellowship',
    location: 'Virginia Beach',
    likes: 445,
    comments: 78,
    shares: 23,
    thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&h=800&fit=crop',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/WordOfLife.mp4?alt=media&token=e693a96c-05ec-4927-9d10-1ee4fb134a05',
    author: 'Word of Life Young Adults',
    authorAvatar: '',
  },
];


type VideoItemProps = {
  item: VideoData;
  index: number;
  currentIndex: number;
  onBackPress: () => void;
};

const VideoItem = ({ item, index, currentIndex, onBackPress }: VideoItemProps) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const controlPlayback = async () => {
      if (!videoRef.current) {
        return;
      }

      try {
        if (index === currentIndex && item.videoUrl) {
          await videoRef.current.playAsync();
          if (isMounted) {
            setIsPlaying(true);
          }
        } else {
          await videoRef.current.pauseAsync();
          if (isMounted) {
            setIsPlaying(false);
          }
        }
      } catch (error) {
        console.warn('Video playback control error:', error);
      }
    };

    controlPlayback();

    return () => {
      isMounted = false;
      if (videoRef.current) {
        videoRef.current.pauseAsync().catch(() => undefined);
      }
    };
  }, [currentIndex, index, item.videoUrl]);

  const handlePlayPause = async () => {
    if (!videoRef.current) {
      return;
    }

    try {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.warn('Play/Pause error:', error);
    }
  };

  return (
    <View style={styles.videoContainer}>
      {item.videoUrl ? (
        <Video
          ref={videoRef}
          source={{ uri: item.videoUrl }}
          style={styles.videoBackground}
          resizeMode="cover"
          isLooping
          shouldPlay={false}
          useNativeControls={false}
        />
      ) : (
        <ImageBackground
          source={{ uri: item.thumbnail }}
          style={styles.videoBackground}
          resizeMode="cover"
        />
      )}

      {/* Gradient overlay for better text readability */}
      <View style={styles.gradientOverlay} />

      {/* Back button - top left */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
      >
        <Ionicons name="arrow-back" size={28} color="#ffffff" />
      </TouchableOpacity>

      {/* Play/Pause button - center */}
      {item.videoUrl && (
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <View style={styles.playButtonCircle}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={40}
              color="#ffffff"
            />
          </View>
        </TouchableOpacity>
      )}

      {/* Right side actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={36} color="#ffffff" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={36} color="#ffffff" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="paper-plane-outline" size={36} color="#ffffff" />
          <Text style={styles.actionText}>{item.shares}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={36} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Bottom info section */}
      <View style={styles.bottomInfo}>
        <Text style={styles.groupTitle}>{item.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{item.category}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>{item.location}</Text>
        </View>
      </View>
    </View>
  );
};

export default function VideoFeedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as { initialIndex?: number } | undefined;
  const initialIndex = params?.initialIndex ?? 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (initialIndex > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false,
        });
      }, 100);
    }
  }, [initialIndex]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderVideo = ({ item, index }: { item: VideoData; index: number }) => (
    <VideoItem
      item={item}
      index={index}
      currentIndex={currentIndex}
      onBackPress={() => navigation.goBack()}
    />
  );


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
      />
    </SafeAreaView>
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
    position: 'relative',
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    backgroundColor: 'transparent',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 5,
  },
  playButtonCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  actionsContainer: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    alignItems: 'center',
    gap: 24,
    zIndex: 10,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 80,
    zIndex: 10,
  },
  groupTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  metaDot: {
    fontSize: 15,
    color: '#ffffff',
    marginHorizontal: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  distance: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

