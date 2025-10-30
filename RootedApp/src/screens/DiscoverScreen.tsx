import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';

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

        {/* Suggest Group Button */}
        <TouchableOpacity 
          style={styles.suggestGroupButton}
          onPress={() => navigation.navigate('SuggestGroup' as never)}
        >
          <Ionicons name="add-circle" size={20} color="#007bff" />
          <Text style={styles.suggestGroupText}>Suggest Your Group</Text>
          <Ionicons name="arrow-forward" size={16} color="#007bff" />
        </TouchableOpacity>

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
              onPress={() => navigation.navigate('VideoFeed' as never, { initialIndex: 0 } as never)}
            >
              <View style={styles.videoThumbnail}>
                <Video
                  source={{ uri: "https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/Move%20Church.mp4?alt=media&token=25aa211b-2e8c-453c-b787-74256e2575dd" }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={ResizeMode.COVER}
                  shouldPlay={true}
                  isLooping={true}
                  isMuted={true}
                  useNativeControls={false}
                />
              </View>
              <Text style={styles.videoCardTitle}>Young Life VA</Text>
              <Text style={styles.videoCardSubtitle}>Bible Study • Alexandria</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.videoCard}
              onPress={() => navigation.navigate('VideoFeed' as never, { initialIndex: 1 } as never)}
            >
              <View style={styles.videoThumbnail}>
                <Video
                  source={{ uri: "https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/CornerstoneYA.mp4?alt=media&token=ea5cdd5a-9a69-4546-aeac-62b0698c0be5" }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={ResizeMode.COVER}
                  shouldPlay={true}
                  isLooping={true}
                  isMuted={true}
                  useNativeControls={false}
                />
              </View>

              <Text style={styles.videoCardTitle}>Cornerstone YA</Text>
              <Text style={styles.videoCardSubtitle}>Testimonies • Leesburg VA</Text>
            </TouchableOpacity>
          </View>

          {/* Row 2 */}
          <View style={styles.videoGridRow}>
            <TouchableOpacity 
              style={styles.videoCard}
              onPress={() => navigation.navigate('VideoFeed' as never, { initialIndex: 2 } as never)}
            >
              <View style={styles.videoThumbnail}>
                <Video
                  source={{ uri: "https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/CityLigtht.mp4?alt=media&token=ab04fd54-0c74-4baf-81c4-9cd54cfa598b" }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={ResizeMode.COVER}
                  shouldPlay={true}
                  isLooping={true}
                  isMuted={true}
                  useNativeControls={false}
                />
              </View>
              <Text style={styles.videoCardTitle}>City Light Young Adults</Text>
              <Text style={styles.videoCardSubtitle}>Worship • Falls Church VA</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.videoCard}
              onPress={() => navigation.navigate('VideoFeed' as never, { initialIndex: 3 } as never)}
            >
              <View style={styles.videoThumbnail}>
                <Video
                  source={{ uri: "https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/WordOfLife.mp4?alt=media&token=e693a96c-05ec-4927-9d10-1ee4fb134a05" }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={ResizeMode.COVER}
                  shouldPlay={true}
                  isLooping={true}
                  isMuted={true}
                  useNativeControls={false}
                />
              </View>

              <Text style={styles.videoCardTitle}>Word of Life Young Adults</Text>
              <Text style={styles.videoCardSubtitle}>Fellowship • Virginia Beach</Text>
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
    overflow: 'hidden',
    position: 'relative',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
  suggestGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7f3ff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  suggestGroupText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
    marginLeft: 8,
    marginRight: 8,
  },
});