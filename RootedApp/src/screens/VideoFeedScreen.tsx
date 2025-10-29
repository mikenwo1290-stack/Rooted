import React, { useRef, useState } from 'react';
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

const { height, width } = Dimensions.get('window');

interface Video {
  id: string;
  title: string;
  category: string;
  location: string;
  likes: number;
  comments: number;
  shares: number;
  thumbnail: string;
  author: string;
  authorAvatar: string;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Grace Young Adults',
    category: 'Bible Study',
    location: 'Alexandria',
    likes: 234,
    comments: 45,
    shares: 12,
    thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=800&fit=crop',
    author: 'Grace Church',
    authorAvatar: '',
  },
  {
    id: '2',
    title: 'Hope Fellowship',
    category: 'Testimonies',
    location: 'Downtown DC',
    likes: 567,
    comments: 89,
    shares: 34,
    thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=800&fit=crop',
    author: 'Hope Fellowship',
    authorAvatar: '',
  },
  {
    id: '3',
    title: 'Faith Community',
    category: 'Worship',
    location: 'Navy Yard',
    likes: 892,
    comments: 156,
    shares: 67,
    thumbnail: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?w=400&h=800&fit=crop',
    author: 'Faith Community',
    authorAvatar: '',
  },
  {
    id: '4',
    title: 'New Life Church',
    category: 'Fellowship',
    location: 'Virginia Beach',
    likes: 445,
    comments: 78,
    shares: 23,
    thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&h=800&fit=crop',
    author: 'New Life Church',
    authorAvatar: '',
  },
];

export default function VideoFeedScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderVideo = ({ item }: { item: Video }) => (
    <View style={styles.videoContainer}>
      <ImageBackground
        source={{ uri: item.thumbnail }}
        style={styles.videoBackground}
        resizeMode="cover"
      >
        {/* Top overlay with back button */}
        <View style={styles.topOverlay}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Bottom overlay with info and actions */}
        <View style={styles.bottomOverlay}>
          <View style={styles.infoContainer}>
            <View style={styles.authorInfo}>
              <View style={styles.authorAvatar}>
                <Ionicons name="person" size={24} color="#ffffff" />
              </View>
              <Text style={styles.authorName}>{item.author}</Text>
            </View>
            
            <Text style={styles.videoTitle}>{item.title}</Text>
            <Text style={styles.videoMeta}>
              {item.category} • {item.location}
            </Text>
          </View>

          {/* Action buttons on the right */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={32} color="#ffffff" />
              <Text style={styles.actionText}>{item.likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={32} color="#ffffff" />
              <Text style={styles.actionText}>{item.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="paper-plane-outline" size={32} color="#ffffff" />
              <Text style={styles.actionText}>{item.shares}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bookmark-outline" size={32} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="ellipsis-horizontal" size={32} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Play button in center */}
        <View style={styles.playButtonContainer}>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={32} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
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
  },
  videoBackground: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topOverlay: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomOverlay: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 32,
    alignItems: 'flex-end',
  },
  infoContainer: {
    flex: 1,
    marginRight: 16,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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

