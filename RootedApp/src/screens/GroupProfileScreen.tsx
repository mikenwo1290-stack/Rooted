import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GroupProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as any;
  const groupData = params?.groupData;
  const [selectedTab, setSelectedTab] = useState('About');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Background with Image */}
        <ImageBackground
          source={require('../../assets/yl-group-photo.jpg')}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
            style={styles.gradientOverlay}
          >
            {/* Header Navigation */}
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Profile</Text>
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-horizontal" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Profile Icon with notification badge */}
            <View style={styles.profileIconContainer}>
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>45</Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={require('../../assets/yl-logo.png')}
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.groupTitle}>{groupData?.title || 'Young Life VA'}</Text>
          
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FFB800" />
            <Text style={styles.ratingText}>4.8</Text>
            <Text style={styles.metaText}> • {groupData?.category || 'Fellowship'} • </Text>
            <Text style={styles.metaText}>{groupData?.location || 'Washington DC'}</Text>
          </View>

          <Text style={styles.description}>
            Join us for fellowship, worship, and community. We meet weekly to grow in faith together and build lasting relationships.
          </Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join Group</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="arrow-redo-outline" size={20} color="#007aff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'About' && styles.activeTab]}
            onPress={() => setSelectedTab('About')}
          >
            <Text style={[styles.tabText, selectedTab === 'About' && styles.activeTabText]}>
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'Events' && styles.activeTab]}
            onPress={() => setSelectedTab('Events')}
          >
            <Text style={[styles.tabText, selectedTab === 'Events' && styles.activeTabText]}>
              Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'Media' && styles.activeTab]}
            onPress={() => setSelectedTab('Media')}
          >
            <Text style={[styles.tabText, selectedTab === 'Media' && styles.activeTabText]}>
              Media
            </Text>
          </TouchableOpacity>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location" size={20} color="#ff3b30" />
            <Text style={styles.addressText}>
              1234 Church Street, {groupData?.location || 'Washington DC'}
            </Text>
          </View>
          <TouchableOpacity style={styles.directionsButton}>
            <Ionicons name="navigate" size={16} color="#007aff" />
            <Text style={styles.directionsText}>Get Directions</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Info Section */}
        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={22} color="#34c759" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Meeting Times</Text>
              <Text style={styles.infoValue}>Sundays 10:00 AM • Wednesdays 7:00 PM</Text>
            </View>
            <Ionicons name="chevron-down" size={20} color="#8e8e93" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={22} color="#007aff" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Community</Text>
              <Text style={styles.infoValue}>Young Adults (18-35)</Text>
            </View>
            <Ionicons name="chevron-down" size={20} color="#8e8e93" />
          </View>
        </View>

        {/* What We Offer Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.offerGrid}>
            <View style={styles.offerItem}>
              <Ionicons name="book-outline" size={28} color="#007aff" />
              <Text style={styles.offerText}>Bible Study</Text>
            </View>
            <View style={styles.offerItem}>
              <Ionicons name="musical-notes-outline" size={28} color="#007aff" />
              <Text style={styles.offerText}>Worship</Text>
            </View>
            <View style={styles.offerItem}>
              <Ionicons name="heart-outline" size={28} color="#007aff" />
              <Text style={styles.offerText}>Fellowship</Text>
            </View>
            <View style={styles.offerItem}>
              <Ionicons name="cafe-outline" size={28} color="#007aff" />
              <Text style={styles.offerText}>Social Events</Text>
            </View>
          </View>
        </View>

        {/* Meeting Times */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meeting Times</Text>
          <View style={styles.meetingItem}>
            <View style={styles.meetingDay}>
              <Text style={styles.dayText}>SUN</Text>
            </View>
            <View style={styles.meetingInfo}>
              <Text style={styles.meetingTitle}>Sunday Service</Text>
              <Text style={styles.meetingTime}>10:00 AM - 12:00 PM</Text>
            </View>
          </View>
          <View style={styles.meetingItem}>
            <View style={styles.meetingDay}>
              <Text style={styles.dayText}>WED</Text>
            </View>
            <View style={styles.meetingInfo}>
              <Text style={styles.meetingTitle}>Bible Study</Text>
              <Text style={styles.meetingTime}>7:00 PM - 8:30 PM</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  headerBackground: {
    width: '100%',
    height: 220,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  moreButton: {
    padding: 4,
  },
  profileIconContainer: {
    alignItems: 'flex-end',
    paddingRight: 16,
    paddingBottom: 16,
  },
  notificationBadge: {
    backgroundColor: '#FFB800',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 45,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  heroSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 8,
    borderBottomColor: '#f2f2f7',
    marginTop: -30,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#000000',
    padding: 16,
  },
  groupTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 4,
  },
  metaText: {
    fontSize: 15,
    color: '#8e8e93',
  },
  description: {
    fontSize: 15,
    color: '#000000',
    lineHeight: 22,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  joinButton: {
    flex: 1,
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  shareButton: {
    backgroundColor: '#f2f2f7',
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e7',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#7c3aed',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8e8e93',
  },
  activeTabText: {
    color: '#7c3aed',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 8,
    borderBottomColor: '#f2f2f7',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  addressText: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 8,
    flex: 1,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f7',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  directionsText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007aff',
    marginLeft: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#8e8e93',
  },
  offerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  offerItem: {
    width: '47%',
    backgroundColor: '#f2f2f7',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  offerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginTop: 8,
  },
  meetingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  meetingDay: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  meetingInfo: {
    flex: 1,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  meetingTime: {
    fontSize: 14,
    color: '#8e8e93',
  },
});



