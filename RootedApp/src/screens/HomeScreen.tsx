import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Top Segmented Control */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity style={[styles.segmentButton, styles.activeSegment]}>
            <Text style={[styles.segmentText, styles.activeSegmentText]}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.segmentButton}>
            <Text style={styles.segmentText}>Events Near Me</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop'
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroText}>This Week in Faith Near You</Text>
          </View>
        </View>

        {/* Event Cards */}
        <View style={styles.eventCard}>
          <View style={styles.eventContent}>
            <Text style={styles.eventTitle}>Young Adults Worship Night</Text>
            <Text style={styles.eventDate}>Fri, Oct 25 · 7:00 PM</Text>
            <Text style={styles.eventLocation}>Hope Church, Alexandria, VA</Text>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop'
            }}
            style={styles.eventImage}
          />
        </View>

        <View style={styles.eventCard}>
          <View style={styles.eventContent}>
            <Text style={styles.eventTitle}>Serve the City: Food Outreach</Text>
            <Text style={styles.eventDate}>Sat, Oct 26 · 10:00 AM</Text>
            <Text style={styles.eventLocation}>Reston Bible Church</Text>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop'
            }}
            style={styles.eventImage}
          />
        </View>

        {/* Podcasts Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Podcasts</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.podcastCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=60&h=60&fit=crop'
            }}
            style={styles.podcastImage}
          />
          <View style={styles.podcastContent}>
            <Text style={styles.podcastTitle}>Finding Peace</Text>
            <Text style={styles.podcastSubtitle}>Daily Devotionals</Text>
          </View>
        </View>
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
