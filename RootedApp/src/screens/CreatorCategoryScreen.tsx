import React, { useState } from 'react';
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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type Platform = 'All' | 'TikTok' | 'YouTube' | 'Instagram' | 'X';

type RouteParams = {
  CreatorCategory: {
    category: string;
    color: string;
  };
};

export default function CreatorCategoryScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'CreatorCategory'>>();
  const { category, color } = route.params;
  
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('All');
  const [votes, setVotes] = useState<{ [key: number]: { upvoted: boolean; downvoted: boolean; score: number } }>({});

  const platforms: Platform[] = ['All', 'TikTok', 'YouTube', 'Instagram', 'X'];

  const handleVote = (creatorId: number, type: 'up' | 'down') => {
    setVotes(prev => {
      const currentVote = prev[creatorId] || { upvoted: false, downvoted: false, score: 0 };
      
      if (type === 'up') {
        if (currentVote.upvoted) {
          // Remove upvote
          return { ...prev, [creatorId]: { upvoted: false, downvoted: false, score: currentVote.score - 1 } };
        } else if (currentVote.downvoted) {
          // Switch from downvote to upvote
          return { ...prev, [creatorId]: { upvoted: true, downvoted: false, score: currentVote.score + 2 } };
        } else {
          // Add upvote
          return { ...prev, [creatorId]: { upvoted: true, downvoted: false, score: currentVote.score + 1 } };
        }
      } else {
        if (currentVote.downvoted) {
          // Remove downvote
          return { ...prev, [creatorId]: { upvoted: false, downvoted: false, score: currentVote.score + 1 } };
        } else if (currentVote.upvoted) {
          // Switch from upvote to downvote
          return { ...prev, [creatorId]: { upvoted: false, downvoted: true, score: currentVote.score - 2 } };
        } else {
          // Add downvote
          return { ...prev, [creatorId]: { upvoted: false, downvoted: true, score: currentVote.score - 1 } };
        }
      }
    });
  };

  // Sample creators data - in a real app, this would come from an API
  const creatorsByPlatform: Record<Platform, Array<{ id: number; name: string; image: string; platform: string; followers: string }>> = {
    All: [
      {
        id: 1,
        name: 'Sarah Johnson',
        image: '',
        platform: 'TikTok',
        followers: '2.4M',
      },
      {
        id: 2,
        name: 'Michael Chen',
        image: '',
        platform: 'YouTube',
        followers: '1.8M',
      },
      {
        id: 3,
        name: 'Grace Williams',
        image: '',
        platform: 'Instagram',
        followers: '890K',
      },
      {
        id: 4,
        name: 'David Martinez',
        image: '',
        platform: 'TikTok',
        followers: '1.2M',
      },
      {
        id: 5,
        name: 'Emma Thompson',
        image: '',
        platform: 'YouTube',
        followers: '3.1M',
      },
    ],
    TikTok: [
      {
        id: 11,
        name: 'Sarah Johnson',
        image: '',
        platform: 'TikTok',
        followers: '2.4M',
      },
      {
        id: 12,
        name: 'David Martinez',
        image: '',
        platform: 'TikTok',
        followers: '1.2M',
      },
      {
        id: 13,
        name: 'Jessica Lee',
        image: '',
        platform: 'TikTok',
        followers: '950K',
      },
    ],
    YouTube: [
      {
        id: 21,
        name: 'Emma Thompson',
        image: '',
        platform: 'YouTube',
        followers: '3.1M',
      },
      {
        id: 22,
        name: 'Michael Chen',
        image: '',
        platform: 'YouTube',
        followers: '1.8M',
      },
      {
        id: 23,
        name: 'Brandon Smith',
        image: '',
        platform: 'YouTube',
        followers: '2.2M',
      },
    ],
    Instagram: [
      {
        id: 31,
        name: 'Grace Williams',
        image: '',
        platform: 'Instagram',
        followers: '890K',
      },
      {
        id: 32,
        name: 'Olivia Brown',
        image: '',
        platform: 'Instagram',
        followers: '1.5M',
      },
      {
        id: 33,
        name: 'Noah Davis',
        image: '',
        platform: 'Instagram',
        followers: '720K',
      },
    ],
    X: [
      {
        id: 41,
        name: 'James Wilson',
        image: '',
        platform: 'X',
        followers: '450K',
      },
      {
        id: 42,
        name: 'Sophia Anderson',
        image: '',
        platform: 'X',
        followers: '680K',
      },
    ],
  };

  const creators = creatorsByPlatform[selectedPlatform] || creatorsByPlatform.All;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'TikTok':
        return 'musical-note';
      case 'YouTube':
        return 'logo-youtube';
      case 'Instagram':
        return 'logo-instagram';
      case 'X':
        return 'logo-twitter';
      default:
        return 'planet';
    }
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (id: number) => {
    const colors = ['#8B6F47', '#D14D72', '#4B8F3A', '#5E7C84', '#B87FA6', '#E89B4F', '#6B4423'];
    return colors[id % colors.length];
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: color }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{category}</Text>
            <Text style={styles.headerSubtitle}>Top Christian Creators</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <View style={styles.moreDots}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Platform Filter Pills */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={[styles.platformFilterContainer, { backgroundColor: color }]}
          contentContainerStyle={styles.platformFilterContent}
        >
          {platforms.map((platform) => (
            <TouchableOpacity
              key={platform}
              style={[
                styles.platformPill,
                selectedPlatform === platform && styles.activePlatformPill,
              ]}
              onPress={() => setSelectedPlatform(platform)}
            >
              {platform !== 'All' && (
                <Ionicons 
                  name={getPlatformIcon(platform) as any} 
                  size={16} 
                  color={selectedPlatform === platform ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'}
                  style={styles.platformIcon}
                />
              )}
              <Text
                style={[
                  styles.platformPillText,
                  selectedPlatform === platform && styles.activePlatformPillText,
                ]}
              >
                {platform}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Creators List */}
        <View style={styles.creatorsList}>
          {creators.map((creator) => {
            const creatorVote = votes[creator.id] || { upvoted: false, downvoted: false, score: 0 };
            
            return (
              <View key={creator.id} style={styles.creatorItem}>
                {/* Vote Section */}
                <View style={styles.voteSection}>
                  <TouchableOpacity 
                    onPress={() => handleVote(creator.id, 'up')}
                    style={styles.voteButton}
                  >
                    <Ionicons 
                      name={creatorVote.upvoted ? "arrow-up" : "arrow-up-outline"} 
                      size={24} 
                      color={creatorVote.upvoted ? "#4B8F3A" : "#6c757d"} 
                    />
                  </TouchableOpacity>
                  <Text style={[styles.voteScore, creatorVote.score > 0 && styles.positiveScore, creatorVote.score < 0 && styles.negativeScore]}>
                    {creatorVote.score}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => handleVote(creator.id, 'down')}
                    style={styles.voteButton}
                  >
                    <Ionicons 
                      name={creatorVote.downvoted ? "arrow-down" : "arrow-down-outline"} 
                      size={24} 
                      color={creatorVote.downvoted ? "#D14D72" : "#6c757d"} 
                    />
                  </TouchableOpacity>
                </View>

                {/* Creator Content */}
                <TouchableOpacity 
                  style={styles.creatorContent}
                  onPress={() => navigation.navigate('ArtistProfile' as never, { artistName: creator.name } as never)}
                >
                  {creator.image ? (
                    <Image source={{ uri: creator.image }} style={styles.creatorImage} />
                  ) : (
                    <View style={[styles.creatorImagePlaceholder, { backgroundColor: getAvatarColor(creator.id) }]}>
                      <Text style={styles.initialsText}>{getInitials(creator.name)}</Text>
                    </View>
                  )}
                  <View style={styles.creatorInfo}>
                    <Text style={styles.creatorName}>{creator.name}</Text>
                    <View style={styles.platformTag}>
                      <Ionicons 
                        name={getPlatformIcon(creator.platform) as any} 
                        size={14} 
                        color="#6c757d" 
                      />
                      <Text style={styles.followersText}>{creator.followers} followers</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Bottom Action Bar */}
        <View style={[styles.bottomBar, { backgroundColor: color }]}>
          <View style={styles.messageContainer}>
            <Text style={styles.messagePlaceholder}>Suggest a creator</Text>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle" size={28} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 10,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  moreButton: {
    padding: 8,
  },
  moreDots: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffffff',
    marginVertical: 1,
  },
  platformFilterContainer: {
    paddingVertical: 12,
  },
  platformFilterContent: {
    paddingHorizontal: 16,
  },
  platformPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  activePlatformPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: 'rgba(255, 255, 255, 0.95)',
  },
  platformIcon: {
    marginRight: 6,
  },
  platformPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  activePlatformPillText: {
    color: '#212529',
  },
  creatorsList: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  creatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 12,
  },
  voteSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: '#e9ecef',
  },
  voteButton: {
    padding: 4,
  },
  voteScore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212529',
    marginVertical: 4,
    minWidth: 32,
    textAlign: 'center',
  },
  positiveScore: {
    color: '#4B8F3A',
  },
  negativeScore: {
    color: '#D14D72',
  },
  creatorContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginHorizontal: 12,
  },
  creatorImagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  creatorInfo: {
    flex: 1,
  },
  creatorName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  platformTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followersText: {
    fontSize: 13,
    color: '#6c757d',
    marginLeft: 4,
  },
  followButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#8B6F47',
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    marginTop: 20,
  },
  messageContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 24,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginRight: 12,
  },
  messagePlaceholder: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  actionButton: {
    padding: 4,
  },
});

