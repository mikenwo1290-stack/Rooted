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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function GroupProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as any;
  const groupData = params?.groupData;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="people" size={60} color="#007aff" />
            </View>
          </View>
          
          <Text style={styles.groupTitle}>{groupData?.title || 'Group Name'}</Text>
          <Text style={styles.username}>{groupData?.username || '@username'}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{groupData?.likes || 0}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{groupData?.comments || 0}</Text>
              <Text style={styles.statLabel}>Comments</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{groupData?.shares || 0}</Text>
              <Text style={styles.statLabel}>Shares</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Ionicons name="chatbubble-outline" size={20} color="#007aff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoRow}>
            <Ionicons name="bookmark-outline" size={20} color="#8e8e93" />
            <Text style={styles.infoText}>{groupData?.category || 'Category'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#8e8e93" />
            <Text style={styles.infoText}>{groupData?.location || 'Location'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={20} color="#8e8e93" />
            <Text style={styles.infoText}>Young Adults Community</Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {groupData?.caption || 'Join us for fellowship, worship, and community. We meet weekly to grow in faith together.'}
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="globe-outline" size={20} color="#007aff" />
            <Text style={styles.contactText}>Visit Website</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="mail-outline" size={20} color="#007aff" />
            <Text style={styles.contactText}>Send Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color="#007aff" />
            <Text style={styles.contactText}>Call</Text>
          </TouchableOpacity>
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
    color: '#000000',
  },
  moreButton: {
    padding: 4,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e7',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f2f2f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#8e8e93',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#8e8e93',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e5e5e7',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  followButton: {
    backgroundColor: '#007aff',
    paddingHorizontal: 48,
    paddingVertical: 12,
    borderRadius: 8,
  },
  followButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  messageButton: {
    backgroundColor: '#f2f2f7',
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e7',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#000000',
    marginLeft: 12,
  },
  description: {
    fontSize: 15,
    color: '#000000',
    lineHeight: 22,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#007aff',
    marginLeft: 12,
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

