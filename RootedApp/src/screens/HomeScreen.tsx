import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'community' | 'events'>('community');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
            <TouchableOpacity style={[styles.browseCard, styles.musicCard]}>
              <Text style={styles.browseCardText}>Music</Text>
              <Ionicons name="musical-notes" size={24} color="rgba(255,255,255,0.3)" style={styles.browseCardIcon} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.browseCard, styles.podcastsCard]}>
              <Text style={styles.browseCardText}>Podcasts</Text>
              <Ionicons name="headset" size={24} color="rgba(255,255,255,0.3)" style={styles.browseCardIcon} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.browseCard, styles.audiobooksCard]}>
              <Text style={styles.browseCardText}>Audiobooks</Text>
              <Ionicons name="book" size={24} color="rgba(255,255,255,0.3)" style={styles.browseCardIcon} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.browseCard, styles.liveEventsCard]}>
              <Text style={styles.browseCardText}>Live Events</Text>
              <Ionicons name="calendar" size={24} color="rgba(255,255,255,0.3)" style={styles.browseCardIcon} />
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
                <Text style={styles.eventsFilterText}>Worship</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.eventsFilterPill}>
                <Text style={styles.eventsFilterText}>Prayer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.eventsFilterPill}>
                <Text style={styles.eventsFilterText}>Fellowship</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.eventsFilterPill}>
                <Text style={styles.eventsFilterText}>Service</Text>
              </TouchableOpacity>
            </ScrollView>

            {/* Events List */}
            <View style={styles.eventsList}>
              {/* Worship Night Event */}
              <View style={styles.eventCard}>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>Friday Night Worship</Text>
                  <Text style={styles.eventDate}>Fri, Oct 25 · 7:00 PM</Text>
                  <Text style={styles.eventLocation}>Grace Community Church, Alexandria, VA</Text>
                  <Text style={styles.eventDescription}>
                    Join us for an evening of worship, prayer, and fellowship
                  </Text>
                </View>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop'
                  }}
                  style={styles.eventImage}
                />
              </View>

              {/* Night Vigil Event */}
              <View style={styles.eventCard}>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>All Night Prayer Vigil</Text>
                  <Text style={styles.eventDate}>Sat, Oct 26 · 10:00 PM</Text>
                  <Text style={styles.eventLocation}>Hope Church, Reston, VA</Text>
                  <Text style={styles.eventDescription}>
                    A night of prayer, fasting, and seeking God's presence
                  </Text>
                </View>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop'
                  }}
                  style={styles.eventImage}
                />
              </View>

              {/* Bible Study Event */}
              <View style={styles.eventCard}>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>Young Adults Bible Study</Text>
                  <Text style={styles.eventDate}>Wed, Oct 23 · 7:30 PM</Text>
                  <Text style={styles.eventLocation}>New Life Church, Arlington, VA</Text>
                  <Text style={styles.eventDescription}>
                    Deep dive into the Book of Romans with other young adults
                  </Text>
                </View>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop'
                  }}
                  style={styles.eventImage}
                />
              </View>

              {/* Community Service Event */}
              <View style={styles.eventCard}>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>Community Outreach</Text>
                  <Text style={styles.eventDate}>Sun, Oct 27 · 2:00 PM</Text>
                  <Text style={styles.eventLocation}>Downtown Shelter, Washington DC</Text>
                  <Text style={styles.eventDescription}>
                    Serve meals and minister to those in need in our community
                  </Text>
                </View>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop'
                  }}
                  style={styles.eventImage}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
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
    height: 100,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  musicCard: {
    backgroundColor: '#ff6b9d',
  },
  podcastsCard: {
    backgroundColor: '#2d5a87',
  },
  audiobooksCard: {
    backgroundColor: '#6c5ce7',
  },
  liveEventsCard: {
    backgroundColor: '#a29bfe',
  },
  browseCardText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
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
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
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
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  activeEventsFilter: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  eventsFilterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6c757d',
  },
  activeEventsFilterText: {
    color: '#ffffff',
  },
  eventsList: {
    marginBottom: 20,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef',
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
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
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
  eventCard: {
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
  eventContent: {
    flex: 1,
    marginRight: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 14,
    color: '#6c757d',
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
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
