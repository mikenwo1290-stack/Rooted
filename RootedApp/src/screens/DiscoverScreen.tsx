import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6c757d" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, groups, or communities..."
            placeholderTextColor="#6c757d"
          />
        </View>

        {/* Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          <TouchableOpacity style={[styles.filterPill, styles.activeFilter]}>
            <Text style={[styles.filterText, styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Worship</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Study</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Results */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Discover Events</Text>
          
          <View style={styles.eventCard}>
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>Bible Study Group</Text>
              <Text style={styles.eventDate}>Wed, Oct 23 · 7:00 PM</Text>
              <Text style={styles.eventLocation}>Grace Community Church</Text>
              <Text style={styles.eventDescription}>
                Join us for an in-depth study of the Book of Romans
              </Text>
            </View>
            <TouchableOpacity style={styles.rsvpButton}>
              <Text style={styles.rsvpText}>RSVP</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.eventCard}>
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>Community Outreach</Text>
              <Text style={styles.eventDate}>Sat, Oct 26 · 9:00 AM</Text>
              <Text style={styles.eventLocation}>Downtown Shelter</Text>
              <Text style={styles.eventDescription}>
                Help serve meals to those in need in our community
              </Text>
            </View>
            <TouchableOpacity style={styles.rsvpButton}>
              <Text style={styles.rsvpText}>RSVP</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.eventCard}>
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>Young Adults Social</Text>
              <Text style={styles.eventDate}>Fri, Oct 25 · 8:00 PM</Text>
              <Text style={styles.eventLocation}>Coffee House Downtown</Text>
              <Text style={styles.eventDescription}>
                Connect with other young adults over coffee and conversation
              </Text>
            </View>
            <TouchableOpacity style={styles.rsvpButton}>
              <Text style={styles.rsvpText}>RSVP</Text>
            </TouchableOpacity>
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
  searchContainer: {
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
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  activeFilter: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6c757d',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  resultsContainer: {
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 16,
  },
  eventCard: {
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
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  rsvpButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  rsvpText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
