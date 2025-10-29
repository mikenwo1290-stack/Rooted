import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Category {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const categories: Category[] = [
  { id: 'music', label: 'Music', icon: 'musical-notes' },
  { id: 'podcast', label: 'Podcast', icon: 'headset' },
  { id: 'audiobook', label: 'Audiobook', icon: 'book' },
  { id: 'live-events', label: 'Live Events', icon: 'calendar' },
  { id: 'devotionals', label: 'Devotionals', icon: 'heart' },
  { id: 'apparel', label: 'Apparel', icon: 'shirt' },
];

export default function SuggestArtistScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [artistName, setArtistName] = useState('');
  const [description, setDescription] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = () => {
    // Validation
    if (!selectedCategory) {
      Alert.alert('Missing Information', 'Please select a category.');
      return;
    }
    if (!artistName.trim()) {
      Alert.alert('Missing Information', 'Please enter the artist/creator name.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Missing Information', 'Please provide a description.');
      return;
    }

    // Here you would normally send this data to your backend
    const suggestionData = {
      category: selectedCategory,
      artistName: artistName.trim(),
      description: description.trim(),
      socialMedia: socialMedia.trim(),
      website: website.trim(),
      submittedAt: new Date().toISOString(),
    };

    console.log('Suggestion submitted:', suggestionData);

    // Show success message
    Alert.alert(
      'Thank You!',
      'Your suggestion has been submitted for review. We appreciate your contribution to the Rooted community!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );

    // Reset form
    setSelectedCategory('');
    setArtistName('');
    setDescription('');
    setSocialMedia('');
    setWebsite('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#212529" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suggest an Artist</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro Text */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Help us grow the community!</Text>
          <Text style={styles.introText}>
            Know a talented artist or creator who should be on Rooted? Share their information with us and we'll review it for inclusion.
          </Text>
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Category <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sectionDescription}>
            Select the category this artist/creator belongs to
          </Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categoryCardSelected,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Ionicons
                  name={category.icon}
                  size={28}
                  color={
                    selectedCategory === category.id ? '#ffffff' : '#8B6F47'
                  }
                />
                <Text
                  style={[
                    styles.categoryCardText,
                    selectedCategory === category.id && styles.categoryCardTextSelected,
                  ]}
                >
                  {category.label}
                </Text>
                {selectedCategory === category.id && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Artist Name */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Artist/Creator Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the artist or creator's name"
            placeholderTextColor="#6c757d"
            value={artistName}
            onChangeText={setArtistName}
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Description <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sectionDescription}>
            Tell us about this artist and why you think they'd be a great fit for Rooted
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Share details about their work, style, impact, or why they inspire you..."
            placeholderTextColor="#6c757d"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Social Media */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Social Media Handle</Text>
          <Text style={styles.sectionDescription}>
            Instagram, Twitter, TikTok, etc. (optional)
          </Text>
          <TextInput
            style={styles.input}
            placeholder="@artisthandle or social media link"
            placeholderTextColor="#6c757d"
            value={socialMedia}
            onChangeText={setSocialMedia}
            autoCapitalize="none"
          />
        </View>

        {/* Website */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Website or Portfolio</Text>
          <Text style={styles.sectionDescription}>
            Link to their website, Spotify, YouTube channel, etc. (optional)
          </Text>
          <TextInput
            style={styles.input}
            placeholder="https://..."
            placeholderTextColor="#6c757d"
            value={website}
            onChangeText={setWebsite}
            autoCapitalize="none"
            keyboardType="url"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Submit Suggestion</Text>
          <Ionicons name="arrow-forward" size={20} color="#ffffff" />
        </TouchableOpacity>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Ionicons name="information-circle-outline" size={20} color="#8B6F47" />
          <Text style={styles.footerText}>
            All suggestions will be reviewed by our team. We'll reach out if we need more information.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F1E8',
    borderBottomWidth: 1,
    borderBottomColor: '#E6DDD1',
  },
  backButton: {
    padding: 4,
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  introSection: {
    backgroundColor: '#8B6F47',
    padding: 20,
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  introText: {
    fontSize: 15,
    color: '#FFFEF9',
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 6,
  },
  required: {
    color: '#dc3545',
  },
  sectionDescription: {
    fontSize: 13,
    color: '#6c757d',
    marginBottom: 12,
    lineHeight: 18,
  },
  input: {
    backgroundColor: '#FFFEF9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#212529',
    borderWidth: 1,
    borderColor: '#E6DDD1',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFEF9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E6DDD1',
    position: 'relative',
  },
  categoryCardSelected: {
    backgroundColor: '#8B6F47',
    borderColor: '#8B6F47',
  },
  categoryCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginTop: 8,
  },
  categoryCardTextSelected: {
    color: '#ffffff',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  submitButton: {
    backgroundColor: '#8B6F47',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4A4238',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 16,
    backgroundColor: '#E6DDD1',
    borderRadius: 12,
  },
  footerText: {
    flex: 1,
    fontSize: 13,
    color: '#6B4423',
    lineHeight: 18,
    marginLeft: 10,
  },
});

