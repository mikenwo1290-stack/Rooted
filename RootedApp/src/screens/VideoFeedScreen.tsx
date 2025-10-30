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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

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
  username: string;
  caption: string;
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
    username: '@younglife_virginia',
    caption: 'Sunday worship night highlights 🙏✨',
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
    username: '@cornerstone_ya',
    caption: '"I thought you said youth ended at 10"',
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
    username: '@citylight_youngadults',
    caption: 'Powerful worship experience tonight 🔥',
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
    username: '@wordoflife_ya',
    caption: 'Fellowship and community at its best! 💫',
  },
];


type VideoItemProps = {
  item: VideoData;
  index: number;
  currentIndex: number;
  onBackPress: () => void;
  onUsernamePress: () => void;
};

const VideoItem = ({ item, index, currentIndex, onBackPress, onUsernamePress }: VideoItemProps) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setProgress(status.positionMillis);
      setDuration(status.durationMillis || 0);
    }
  };

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

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <TouchableOpacity 
      style={styles.videoContainer}
      onPress={handlePlayPause}
      activeOpacity={1}
    >
      {/* Video Container - Centered 9:16 aspect ratio */}
      <View style={styles.centeredVideoWrapper}>
        {item.videoUrl ? (
          <Video
            ref={videoRef}
            source={{ uri: item.videoUrl }}
            style={styles.videoBackground}
            resizeMode="cover"
            isLooping
            shouldPlay={false}
            useNativeControls={false}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
        ) : (
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={styles.videoBackground}
            resizeMode="cover"
          />
        )}
      </View>

      {/* Dark overlay for better UI visibility */}
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(0,0,0,0.6)']}
        style={styles.gradientOverlay}
        pointerEvents="none"
      />

      {/* Back button - top left */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
      >
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Right side actions */}
      <View style={styles.actionsContainer} pointerEvents="box-none">
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={toggleLike}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={isLiked ? 'heart' : 'heart-outline'} 
            size={36} 
            color={isLiked ? '#E3B05E' : '#ffffff'} 
          />
          <Text style={[styles.actionText, isLiked && styles.actionTextGold]}>
            {item.likes + (isLiked ? 1 : 0)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Ionicons name="chatbubble-outline" size={36} color="#ffffff" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Ionicons name="share-outline" size={36} color="#ffffff" />
          <Text style={styles.actionText}>{item.shares}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={toggleBookmark}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'} 
            size={36} 
            color={isBookmarked ? '#E3B05E' : '#ffffff'} 
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Ionicons name="ellipsis-horizontal" size={32} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Bottom info section */}
      <View style={styles.bottomInfo} pointerEvents="box-none">
        <TouchableOpacity 
          onPress={onUsernamePress}
          activeOpacity={0.7}
        >
          <Text style={styles.username}>{item.username}</Text>
        </TouchableOpacity>
        <Text style={styles.caption}>{item.caption}</Text>
      </View>

      {/* Progress bar at the bottom */}
      <View style={styles.progressBarContainer} pointerEvents="none">
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
      </View>
    </TouchableOpacity>
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
      onUsernamePress={() => navigation.navigate('GroupProfile' as never, { groupData: item } as never)}
    />
  );


  return (
    <View style={styles.fullScreenContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoContainer: {
    height: height,
    width: width,
    position: 'relative',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredVideoWrapper: {
    width: '100%',
    maxWidth: width < 500 ? width : width * 0.6,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: -(width < 500 ? width : width * 0.6) / 2 }],
  },
  videoBackground: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  actionsContainer: {
    position: 'absolute',
    right: 16,
    bottom: height * 0.25,
    alignItems: 'center',
    gap: 20,
    zIndex: 10,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  actionTextGold: {
    color: '#E3B05E',
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 80,
    zIndex: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  caption: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '400',
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 10,
  },
  progressBarBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#E3B05E',
  },
});
