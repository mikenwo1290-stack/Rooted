import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DiscoverScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.communityScrollView} showsVerticalScrollIndicator={false}>
        {/* Header with back button, title, and location */}
        <View style={styles.communityHeader}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#212529" />
          </TouchableOpacity>
          <Text style={styles.communityTitle}>Search</Text>
          <View style={styles.locationSelector}>
            <Ionicons name="paper-plane" size={16} color="#6c757d" />
            <Text style={styles.locationText}>Washington DC</Text>
            <Ionicons name="chevron-down" size={16} color="#6c757d" />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.communitySearchContainer}>
          <Ionicons name="search" size={20} color="#6c757d" style={styles.communitySearchIcon} />
          <TextInput
            style={styles.communitySearchInput}
            placeholder="Bible Study"
            placeholderTextColor="#6c757d"
          />
          <TouchableOpacity style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#6c757d" />
          </TouchableOpacity>
        </View>

        {/* Filter Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.communityFilterContainer}>
          <TouchableOpacity style={[styles.communityFilterPill, styles.activeCommunityFilter]}>
            <Text style={[styles.communityFilterText, styles.activeCommunityFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.communityFilterPill}>
            <Text style={styles.communityFilterText}>Bible Study</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.communityFilterPill}>
            <Text style={styles.communityFilterText}>Testimonies</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.communityFilterPill}>
            <Text style={styles.communityFilterText}>Worship</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.communityFilterPill}>
            <Text style={styles.communityFilterText}>Fellowship</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.communityFilterPill}>
            <Text style={styles.communityFilterText}>Life Topics</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Video Grid */}
        <View style={styles.videoGrid}>
          {/* Row 1 */}
          <View style={styles.videoGridRow}>
            <TouchableOpacity 
              style={styles.videoCard}
              onPress={() => navigation.navigate('VideoFeed' as never)}
            >
              <ImageBackground 
                source={{ uri: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&h=200&fit=crop' }}
                style={styles.videoThumbnail}
                imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              >
                <View style={styles.playOverlay}>
                  <Ionicons name="play-circle" size={40} color="#ffffff" />
                </View>
              </ImageBackground>
              <Text style={styles.videoCardTitle}>Grace Young Adults</Text>
              <Text style={styles.videoCardSubtitle}>Bible Study • Alexandria</Text>
              <View style={styles.videoCardFooter}>
                <Text style={styles.videoRating}>4.3 ★</Text>
                <Text style={styles.videoDistance}>18.6 mi</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.videoCard}
              onPress={() => navigation.navigate('VideoFeed' as never)}
            >
              <ImageBackground 
                source={{ uri: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop' }}
                style={styles.videoThumbnail}
                imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              >
                <View style={styles.playOverlay}>
                  <Ionicons name="play-circle" size={40} color="#ffffff" />
                </View>
              </ImageBackground>
              <Text style={styles.videoCardTitle}>Hope Fellowship</Text>
              <Text style={styles.videoCardSubtitle}>Testimonies • Downtown DC</Text>
              <View style={styles.videoCardFooter}>
                <Text style={styles.videoRating}>4.2 ★</Text>
                <Text style={styles.videoDistance}>23.3 mi</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Row 2 */}
          <View style={styles.videoGridRow}>
            <TouchableOpacity 
              style={styles.videoCard}
              onPress={() => navigation.navigate('VideoFeed' as never)}
            >
              <ImageBackground 
                source={{ uri: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?w=300&h=200&fit=crop' }}
                style={styles.videoThumbnail}
                imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              >
                <View style={styles.playOverlay}>
                  <Ionicons name="play-circle" size={40} color="#ffffff" />
                </View>
              </ImageBackground>
              <Text style={styles.videoCardTitle}>Faith Community</Text>
              <Text style={styles.videoCardSubtitle}>Worship • Navy Yard</Text>
              <View style={styles.videoCardFooter}>
                <Text style={styles.videoRating}>4.4 ★</Text>
                <Text style={styles.videoDistance}>23.4 mi</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.videoCard}
              onPress={() => navigation.navigate('VideoFeed' as never)}
            >
              <ImageBackground 
                source={{ uri: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=300&h=200&fit=crop' }}
                style={styles.videoThumbnail}
                imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              >
                <View style={styles.playOverlay}>
                  <Ionicons name="play-circle" size={40} color="#ffffff" />
                </View>
              </ImageBackground>
              <Text style={styles.videoCardTitle}>New Life Church</Text>
              <Text style={styles.videoCardSubtitle}>Fellowship • Virginia Beach</Text>
              <View style={styles.videoCardFooter}>
                <Text style={styles.videoRating}>4.7 ★</Text>
                <Text style={styles.videoDistance}>149.5 mi</Text>
              </View>
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
  communityScrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 8,
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#6c757d',
    marginHorizontal: 4,
  },
  communitySearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  communitySearchIcon: {
    marginRight: 12,
  },
  communitySearchInput: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
  },
  clearButton: {
    padding: 4,
  },
  communityFilterContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  communityFilterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  activeCommunityFilter: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  communityFilterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6c757d',
  },
  activeCommunityFilterText: {
    color: '#ffffff',
  },
  videoGrid: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  videoGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  videoCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoThumbnail: {
    height: 120,
    backgroundColor: '#6c757d',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  playOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
  },
  videoCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginTop: 12,
    marginHorizontal: 12,
  },
  videoCardSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
    marginHorizontal: 12,
  },
  videoCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
    marginHorizontal: 12,
  },
  videoRating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
  },
  videoDistance: {
    fontSize: 14,
    color: '#6c757d',
  },
});