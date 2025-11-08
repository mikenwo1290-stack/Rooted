import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'community' | 'events'>('community');
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Segmented Control */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity 
            style={[styles.segmentButton, activeTab === 'community' && styles.activeSegment]}
            onPress={() => setActiveTab('community')}
          >
            <Text style={[styles.segmentText, activeTab === 'community' && styles.activeSegmentText]}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.segmentButton, activeTab === 'events' && styles.activeSegment]}
            onPress={() => setActiveTab('events')}
          >
            <Text style={[styles.segmentText, activeTab === 'events' && styles.activeSegmentText]}>Events Near Me</Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === 'community' ? (
          /* Browse Categories Grid */
          <View style={styles.browseGrid}>
            <TouchableOpacity 
              style={styles.browseCard}
              onPress={() => navigation.navigate('Music' as never)}
            >
              <ImageBackground
                source={require('../../assets/Worship.jpg')}
                style={styles.browseCardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.browseCardOverlay}>
                  <Text style={styles.browseCardText}>Music</Text>
                  <Ionicons name="musical-notes" size={24} color="rgba(255,255,255,0.9)" style={styles.browseCardIcon} />
                </View>
              </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.browseCard}
              onPress={() => navigation.navigate('Podcast' as never)}
            >
              <ImageBackground
                source={require('../../assets/Podcast.jpg')}
                style={styles.browseCardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.browseCardOverlay}>
                  <Text style={styles.browseCardText}>Podcasts</Text>
                  <Ionicons name="headset" size={24} color="rgba(255,255,255,0.9)" style={styles.browseCardIcon} />
                </View>
              </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.browseCard}
              onPress={() => navigation.navigate('Audiobook' as never)}
            >
              <ImageBackground
                source={require('../../assets/Books.jpg')}
                style={styles.browseCardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.browseCardOverlay}>
                  <Text style={styles.browseCardText}>Books</Text>
                  <Ionicons name="book" size={24} color="rgba(255,255,255,0.9)" style={styles.browseCardIcon} />
                </View>
              </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.browseCard}>
              <ImageBackground
                source={require('../../assets/Devotional.jpg')}
                style={styles.browseCardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.browseCardOverlay}>
                  <Text style={styles.browseCardText}>Devotionals</Text>
                  <Ionicons name="heart" size={24} color="rgba(255,255,255,0.9)" style={styles.browseCardIcon} />
                </View>
              </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.browseCard}
              onPress={() => navigation.navigate('Apparel' as never)}
            >
              <ImageBackground
                source={require('../../assets/Fashion.jpg')}
                style={styles.browseCardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.browseCardOverlay}>
                  <Text style={styles.browseCardText}>Apparel</Text>
                  <Ionicons name="shirt" size={24} color="rgba(255,255,255,0.9)" style={styles.browseCardIcon} />
                </View>
              </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.browseCard}
              onPress={() => navigation.navigate('Creators' as never)}
            >
              <ImageBackground
                source={require('../../assets/GodFirst.jpg')}
                style={styles.browseCardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.browseCardOverlay}>
                  <Text style={styles.browseCardText}>Creators</Text>
                  <Ionicons name="people" size={24} color="rgba(255,255,255,0.9)" style={styles.browseCardIcon} />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        ) : (
          /* Events Near Me Content */
          <View style={styles.eventsContainer}>
            {/* Search Bar */}
            <View style={styles.eventsSearchContainer}>
              <Ionicons name="search" size={20} color="#6c757d" style={styles.eventsSearchIcon} />
              <TextInput
                style={styles.eventsSearchInput}
                placeholder="Search events near you..."
                placeholderTextColor="#6c757d"
              />
            </View>

            {/* Filter Pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.eventsFilterContainer}>
              <TouchableOpacity style={[styles.eventsFilterPill, styles.activeEventsFilter]}>
                <Text style={[styles.eventsFilterText, styles.activeEventsFilterText]}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.eventsFilterPill}>
                <Text style={styles.eventsFilterText}>Concerts</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.eventsFilterPill}>
                <Text style={styles.eventsFilterText}>Worship Night</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.eventsFilterPill}>
                <Text style={styles.eventsFilterText}>Live Events</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.eventsFilterPill}>
                <Text style={styles.eventsFilterText}>Community Outreach</Text>
              </TouchableOpacity>
            </ScrollView>

            {/* Events Video Grid */}
            <View style={styles.eventsVideoGrid}>
              {/* Row 1 */}
              <View style={styles.eventsVideoGridRow}>
                <TouchableOpacity 
                  style={styles.eventsVideoCard}
                  onPress={() => navigation.navigate('EventVideoFeed' as never)}
                >
                  <ImageBackground 
                    source={{ uri: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=200&fit=crop' }}
                    style={styles.eventsVideoThumbnail}
                    imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  >
                    <View style={styles.eventsPlayOverlay}>
                      <Ionicons name="play-circle" size={40} color="#ffffff" />
                    </View>
                  </ImageBackground>
                  <View style={styles.eventsVideoCardContent}>
                    <Text style={styles.eventsVideoCardTitle}>Gospel Concert</Text>
                    <Text style={styles.eventsVideoCardSubtitle}>Concert • Downtown DC</Text>
                    <Text style={styles.eventsVideoCardDate}>Fri, Nov 1 · 7:00 PM</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.eventsVideoCard}
                  onPress={() => navigation.navigate('EventVideoFeed' as never)}
                >
                  <ImageBackground 
                    source={{ uri: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop' }}
                    style={styles.eventsVideoThumbnail}
                    imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  >
                    <View style={styles.eventsPlayOverlay}>
                      <Ionicons name="play-circle" size={40} color="#ffffff" />
                    </View>
                  </ImageBackground>
                  <View style={styles.eventsVideoCardContent}>
                    <Text style={styles.eventsVideoCardTitle}>Friday Night Worship</Text>
                    <Text style={styles.eventsVideoCardSubtitle}>Worship Night • Alexandria</Text>
                    <Text style={styles.eventsVideoCardDate}>Fri, Oct 25 · 7:00 PM</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Row 2 */}
              <View style={styles.eventsVideoGridRow}>
                <TouchableOpacity 
                  style={styles.eventsVideoCard}
                  onPress={() => navigation.navigate('EventVideoFeed' as never)}
                >
                  <ImageBackground 
                    source={{ uri: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&h=200&fit=crop' }}
                    style={styles.eventsVideoThumbnail}
                    imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  >
                    <View style={styles.eventsPlayOverlay}>
                      <Ionicons name="play-circle" size={40} color="#ffffff" />
                    </View>
                  </ImageBackground>
                  <View style={styles.eventsVideoCardContent}>
                    <Text style={styles.eventsVideoCardTitle}>All Night Prayer Vigil</Text>
                    <Text style={styles.eventsVideoCardSubtitle}>Worship Night • Reston</Text>
                    <Text style={styles.eventsVideoCardDate}>Sat, Oct 26 · 10:00 PM</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.eventsVideoCard}
                  onPress={() => navigation.navigate('EventVideoFeed' as never)}
                >
                  <ImageBackground 
                    source={{ uri: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&h=200&fit=crop' }}
                    style={styles.eventsVideoThumbnail}
                    imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  >
                    <View style={styles.eventsPlayOverlay}>
                      <Ionicons name="play-circle" size={40} color="#ffffff" />
                    </View>
                  </ImageBackground>
                  <View style={styles.eventsVideoCardContent}>
                    <Text style={styles.eventsVideoCardTitle}>Youth Conference</Text>
                    <Text style={styles.eventsVideoCardSubtitle}>Live Events • Arlington</Text>
                    <Text style={styles.eventsVideoCardDate}>Sun, Oct 27 · 3:00 PM</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Row 3 */}
              <View style={styles.eventsVideoGridRow}>
                <TouchableOpacity 
                  style={styles.eventsVideoCard}
                  onPress={() => navigation.navigate('EventVideoFeed' as never)}
                >
                  <ImageBackground 
                    source={{ uri: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop' }}
                    style={styles.eventsVideoThumbnail}
                    imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  >
                    <View style={styles.eventsPlayOverlay}>
                      <Ionicons name="play-circle" size={40} color="#ffffff" />
                    </View>
                  </ImageBackground>
                  <View style={styles.eventsVideoCardContent}>
                    <Text style={styles.eventsVideoCardTitle}>Community Outreach</Text>
                    <Text style={styles.eventsVideoCardSubtitle}>Community Outreach • DC</Text>
                    <Text style={styles.eventsVideoCardDate}>Sun, Oct 27 · 2:00 PM</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.eventsVideoCard}
                  onPress={() => navigation.navigate('EventVideoFeed' as never)}
                >
                  <ImageBackground 
                    source={{ uri: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300&h=200&fit=crop' }}
                    style={styles.eventsVideoThumbnail}
                    imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  >
                    <View style={styles.eventsPlayOverlay}>
                      <Ionicons name="play-circle" size={40} color="#ffffff" />
                    </View>
                  </ImageBackground>
                  <View style={styles.eventsVideoCardContent}>
                    <Text style={styles.eventsVideoCardTitle}>Praise & Worship Concert</Text>
                    <Text style={styles.eventsVideoCardSubtitle}>Concert • Navy Yard</Text>
                    <Text style={styles.eventsVideoCardDate}>Sat, Nov 2 · 6:30 PM</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate(activeTab === 'events' ? 'SuggestEvent' as never : 'SuggestArtist' as never)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E8',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 80, // Add padding to prevent content from being hidden behind FAB
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8B6F47',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A4238',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  browseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  browseCard: {
    width: '48%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  browseCardBackground: {
    width: '100%',
    height: '100%',
  },
  browseCardOverlay: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 12,
  },
  browseCardText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  browseCardIcon: {
    alignSelf: 'flex-end',
  },
  eventsContainer: {
    paddingHorizontal: 16,
  },
  eventsSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFEF9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 16,
    shadowColor: '#4A4238',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventsSearchIcon: {
    marginRight: 12,
  },
  eventsSearchInput: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
  },
  eventsFilterContainer: {
    marginBottom: 20,
  },
  eventsFilterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFEF9',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#C19A6B',
  },
  activeEventsFilter: {
    backgroundColor: '#8B6F47',
    borderColor: '#8B6F47',
  },
  eventsFilterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6c757d',
  },
  activeEventsFilterText: {
    color: '#ffffff',
  },
  eventsVideoGrid: {
    paddingHorizontal: 0,
    paddingBottom: 20,
  },
  eventsVideoGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  eventsVideoCard: {
    flex: 1,
    backgroundColor: '#FFFEF9',
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#4A4238',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventsVideoThumbnail: {
    height: 140,
    backgroundColor: '#6c757d',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  eventsPlayOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
  },
  eventsVideoCardContent: {
    padding: 12,
  },
  eventsVideoCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  eventsVideoCardSubtitle: {
    fontSize: 13,
    color: '#8B6F47',
    marginBottom: 4,
    fontWeight: '500',
  },
  eventsVideoCardDate: {
    fontSize: 12,
    color: '#6c757d',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#E6DDD1',
    borderRadius: 25,
    padding: 4,
    marginVertical: 16,
    marginHorizontal: 4,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeSegment: {
    backgroundColor: '#FFFEF9',
    shadowColor: '#4A4238',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6c757d',
  },
  activeSegmentText: {
    color: '#495057',
    fontWeight: '600',
  },
  heroCard: {
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(73, 80, 87, 0.8)',
    padding: 20,
    justifyContent: 'flex-end',
  },
  heroText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
  },
  seeAllText: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  podcastCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  podcastImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  podcastContent: {
    flex: 1,
    justifyContent: 'center',
  },
  podcastTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 2,
  },
  podcastSubtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
});
