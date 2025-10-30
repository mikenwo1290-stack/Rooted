import React, { useRef, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

interface EventVideo {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
  attending: number;
  thumbnail: string;
  organizer: string;
  description: string;
}

const eventVideos: EventVideo[] = [
  {
    id: '1',
    title: 'Gospel Concert',
    category: 'Concert',
    location: 'Downtown DC',
    date: 'Fri, Nov 1',
    time: '7:00 PM',
    likes: 1234,
    comments: 234,
    shares: 89,
    attending: 456,
    thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=800&fit=crop',
    organizer: 'Grace Community Church',
    description: 'Join us for an incredible night of gospel music featuring top artists',
  },
  {
    id: '2',
    title: 'Friday Night Worship',
    category: 'Worship Night',
    location: 'Alexandria',
    date: 'Fri, Oct 25',
    time: '7:00 PM',
    likes: 892,
    comments: 156,
    shares: 45,
    attending: 234,
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=800&fit=crop',
    organizer: 'Grace Young Adults',
    description: 'An evening of worship, prayer, and fellowship with young adults',
  },
  {
    id: '3',
    title: 'All Night Prayer Vigil',
    category: 'Worship Night',
    location: 'Reston',
    date: 'Sat, Oct 26',
    time: '10:00 PM',
    likes: 567,
    comments: 98,
    shares: 34,
    attending: 178,
    thumbnail: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=800&fit=crop',
    organizer: 'Hope Church',
    description: 'A night of prayer, fasting, and seeking God\'s presence together',
  },
  {
    id: '4',
    title: 'Youth Conference',
    category: 'Live Events',
    location: 'Arlington',
    date: 'Sun, Oct 27',
    time: '3:00 PM',
    likes: 1456,
    comments: 345,
    shares: 123,
    attending: 589,
    thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=800&fit=crop',
    organizer: 'Word of Life Young Adults',
    description: 'Empowering the next generation through worship and teaching',
  },
  {
    id: '5',
    title: 'Community Outreach',
    category: 'Community Outreach',
    location: 'Washington DC',
    date: 'Sun, Oct 27',
    time: '2:00 PM',
    likes: 678,
    comments: 124,
    shares: 56,
    attending: 145,
    thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=800&fit=crop',
    organizer: 'Faith Community',
    description: 'Serve meals and minister to those in need in our community',
  },
  {
    id: '6',
    title: 'Praise & Worship Concert',
    category: 'Concert',
    location: 'Navy Yard',
    date: 'Sat, Nov 2',
    time: '6:30 PM',
    likes: 2134,
    comments: 456,
    shares: 178,
    attending: 789,
    thumbnail: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=800&fit=crop',
    organizer: 'United Worship',
    description: 'A powerful night of praise and worship with live bands',
  },
];

export default function EventVideoFeedScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [attendingVideos, setAttendingVideos] = useState<Set<string>>(new Set());
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const toggleLike = (videoId: string) => {
    setLikedVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const toggleAttending = (videoId: string) => {
    setAttendingVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const renderEventVideo = ({ item }: { item: EventVideo }) => {
    const isLiked = likedVideos.has(item.id);
    const isAttending = attendingVideos.has(item.id);

    return (
      <View style={styles.videoContainer}>
        <ImageBackground
          source={{ uri: item.thumbnail }}
          style={styles.videoBackground}
          resizeMode="cover"
        >
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
            <View style={styles.topRightButtons}>
              <TouchableOpacity style={styles.topButton}>
                <Ionicons name="search" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom overlay with info and actions */}
          <View style={styles.bottomOverlay}>
            <View style={styles.infoContainer}>
              {/* Organizer Info */}
              <View style={styles.organizerInfo}>
                <View style={styles.organizerAvatar}>
                  <Ionicons name="business" size={20} color="#ffffff" />
                </View>
                <Text style={styles.organizerName}>{item.organizer}</Text>
              </View>
              
              {/* Event Title and Details */}
              <Text style={styles.eventTitle}>{item.title}</Text>
              <View style={styles.eventMetaRow}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{item.category}</Text>
                </View>
                <Text style={styles.eventMeta}>{item.location}</Text>
              </View>
              <View style={styles.eventDateTimeRow}>
                <Ionicons name="calendar-outline" size={16} color="#ffffff" />
                <Text style={styles.eventDateTime}>{item.date} · {item.time}</Text>
              </View>
              <Text style={styles.eventDescription} numberOfLines={2}>
                {item.description}
              </Text>

              {/* Attending count */}
              <View style={styles.attendingRow}>
                <Ionicons name="people" size={16} color="#ffffff" />
                <Text style={styles.attendingText}>{item.attending} people attending</Text>
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
                <Text style={styles.actionText}>{item.likes + (isLiked ? 1 : 0)}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={32} color="#ffffff" />
                <Text style={styles.actionText}>{item.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="paper-plane-outline" size={32} color="#ffffff" />
                <Text style={styles.actionText}>{item.shares}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.attendingButton]}
                onPress={() => toggleAttending(item.id)}
              >
                <View style={[styles.attendingButtonCircle, isAttending && styles.attendingButtonCircleActive]}>
                  <Ionicons 
                    name={isAttending ? "checkmark" : "calendar"} 
                    size={24} 
                    color="#ffffff" 
                  />
                </View>
                <Text style={styles.actionText}>{isAttending ? "Going" : "Attend"}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="ellipsis-horizontal" size={32} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Play button in center (optional) */}
          <View style={styles.playButtonContainer}>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={32} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        ref={flatListRef}
        data={eventVideos}
        renderItem={renderEventVideo}
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
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  topOverlay: {
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
  topRightButtons: {
    flexDirection: 'row',
    gap: 12,
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
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 32,
    alignItems: 'flex-end',
    zIndex: 10,
  },
  infoContainer: {
    flex: 1,
    marginRight: 16,
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  organizerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 111, 71, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: '#8B6F47',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  eventMeta: {
    fontSize: 14,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  eventDateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  eventDateTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  eventDescription: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  attendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  attendingText: {
    fontSize: 13,
    fontWeight: '500',
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
  attendingButton: {
    marginTop: 4,
  },
  attendingButtonCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(139, 111, 71, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  attendingButtonCircleActive: {
    backgroundColor: '#4CAF50',
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

