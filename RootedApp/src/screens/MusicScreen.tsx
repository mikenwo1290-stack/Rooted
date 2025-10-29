import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type Genre = 'All' | 'Gospel' | 'Worship' | 'Hip Hop' | 'R&B' | 'Contemporary';

export default function MusicScreen() {
  const navigation = useNavigation();
  const [selectedGenre, setSelectedGenre] = useState<Genre>('All');

  const genres: Genre[] = ['All', 'Gospel', 'Worship', 'Hip Hop', 'R&B', 'Contemporary'];

  const artistsByGenre: Record<Genre, Array<{ id: number; name: string; image: string }>> = {
    All: [
      {
        id: 1,
        name: 'Forrest Frank',
        image: 'https://iscale.iheart.com/catalog/artist/39644335',
      },
      {
        id: 2,
        name: 'Alex Jean',
        image: 'https://i.scdn.co/image/ab6761610000e5eb944b0a0667b676f995af4314',
      },
      {
        id: 3,
        name: 'Lecrae',
        image: 'https://cdn.rapzilla.com/wp-content/uploads/2020/02/23110153/lecrae_82352427_609507742939725_4716740008231310092_n-e1580802632146.jpg',
      },
      {
        id: 4,
        name: 'Caleb Gordon',
        image: 'https://i.ytimg.com/vi/xWC808UHCr4/maxresdefault.jpg',
      },
    ],
    Gospel: [
      {
        id: 11,
        name: 'Kirk Franklin',
        image: 'https://i.scdn.co/image/ab6761610000e5eb944b0a0667b676f995af4314',
      },
      {
        id: 12,
        name: 'Tasha Cobbs Leonard',
        image: 'https://i.ytimg.com/vi/xWC808UHCr4/maxresdefault.jpg',
      },
      {
        id: 13,
        name: 'Marvin Sapp',
        image: 'https://iscale.iheart.com/catalog/artist/39644335',
      },
    ],
    Worship: [
      {
        id: 21,
        name: 'Maverick City Music',
        image: 'https://i.scdn.co/image/ab6761610000e5eb944b0a0667b676f995af4314',
      },
      {
        id: 22,
        name: 'Elevation Worship',
        image: 'https://iscale.iheart.com/catalog/artist/39644335',
      },
      {
        id: 23,
        name: 'Brandon Lake',
        image: 'https://i.ytimg.com/vi/xWC808UHCr4/maxresdefault.jpg',
      },
    ],
    'Hip Hop': [
      {
        id: 31,
        name: 'Lecrae',
        image: 'https://cdn.rapzilla.com/wp-content/uploads/2020/02/23110153/lecrae_82352427_609507742939725_4716740008231310092_n-e1580802632146.jpg',
      },
      {
        id: 32,
        name: 'Andy Mineo',
        image: 'https://i.scdn.co/image/ab6761610000e5eb944b0a0667b676f995af4314',
      },
      {
        id: 33,
        name: 'Trip Lee',
        image: 'https://iscale.iheart.com/catalog/artist/39644335',
      },
    ],
    'R&B': [
      {
        id: 41,
        name: 'Forrest Frank',
        image: 'https://iscale.iheart.com/catalog/artist/39644335',
      },
      {
        id: 42,
        name: 'Alex Jean',
        image: 'https://i.scdn.co/image/ab6761610000e5eb944b0a0667b676f995af4314',
      },
      {
        id: 43,
        name: 'Jonathan McReynolds',
        image: 'https://i.ytimg.com/vi/xWC808UHCr4/maxresdefault.jpg',
      },
    ],
    Contemporary: [
      {
        id: 51,
        name: 'Caleb Gordon',
        image: 'https://i.ytimg.com/vi/xWC808UHCr4/maxresdefault.jpg',
      },
      {
        id: 52,
        name: 'Lauren Daigle',
        image: 'https://i.scdn.co/image/ab6761610000e5eb944b0a0667b676f995af4314',
      },
      {
        id: 53,
        name: 'Chris Tomlin',
        image: 'https://iscale.iheart.com/catalog/artist/39644335',
      },
    ],
  };

  const topArtists = artistsByGenre[selectedGenre] || [
    {
      id: 1,
      name: 'Forrest Frank',
      image: 'https://iscale.iheart.com/catalog/artist/39644335',
    },
    {
      id: 2,
      name: 'Alex Jean',
      image: 'https://i.scdn.co/image/ab6761610000e5eb944b0a0667b676f995af4314',
    },
    {
      id: 3,
      name: 'Lecrae',
      image: 'https://cdn.rapzilla.com/wp-content/uploads/2020/02/23110153/lecrae_82352427_609507742939725_4716740008231310092_n-e1580802632146.jpg',
    },
    {
      id: 4,
      name: 'Caleb Gordon',
      image: 'https://i.ytimg.com/vi/xWC808UHCr4/maxresdefault.jpg',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Top Artists</Text>
            <View style={styles.spotifyLink}>
              <View style={styles.spotifyLogo}>
                <Text style={styles.spotifyText}>♪</Text>
              </View>
              <Text style={styles.playText}>Play on Spotify</Text>
              <Ionicons name="chevron-forward" size={16} color="#000000" />
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <View style={styles.moreDots}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Genre Filter Pills */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.genreFilterContainer}
          contentContainerStyle={styles.genreFilterContent}
        >
          {genres.map((genre) => (
            <TouchableOpacity
              key={genre}
              style={[
                styles.genrePill,
                selectedGenre === genre && styles.activeGenrePill,
              ]}
              onPress={() => setSelectedGenre(genre)}
            >
              <Text
                style={[
                  styles.genrePillText,
                  selectedGenre === genre && styles.activeGenrePillText,
                ]}
              >
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Top Artists List */}
        <View style={styles.artistsList}>
          {topArtists.map((artist, index) => (
            <TouchableOpacity 
              key={artist.id} 
              style={styles.artistItem}
              onPress={() => navigation.navigate('ArtistProfile' as never, { artistName: artist.name } as never)}
            >
              <View style={styles.artistNumber}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <Image source={{ uri: artist.image }} style={styles.artistImage} />
              <Text style={styles.artistName}>{artist.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Action Bar */}
        <View style={styles.bottomBar}>
          <View style={styles.messageContainer}>
            <Text style={styles.messagePlaceholder}>Message</Text>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF2B2B',
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
    backgroundColor: '#FF2B2B',
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
    color: '#000000',
    marginBottom: 4,
  },
  spotifyLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotifyLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1db954',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  spotifyText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  playText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
    marginRight: 4,
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
  genreFilterContainer: {
    backgroundColor: '#FF2B2B',
    paddingVertical: 12,
  },
  genreFilterContent: {
    paddingHorizontal: 16,
  },
  genrePill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeGenrePill: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  genrePillText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  activeGenrePillText: {
    color: '#ffffff',
  },
  artistsList: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  artistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  artistNumber: {
    width: 40,
    alignItems: 'center',
  },
  numberText: {
    fontSize: 64,
    fontWeight: '900',
    color: '#000000',
  },
  artistImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  artistName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FF2B2B',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
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
    color: 'rgba(255,255,255,0.7)',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});
