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
  { id: 'bible-study', label: 'Bible Study', icon: 'book' },
  { id: 'testimonies', label: 'Testimonies', icon: 'megaphone' },
  { id: 'worship', label: 'Worship', icon: 'musical-notes' },
  { id: 'fellowship', label: 'Fellowship', icon: 'people' },
  { id: 'life-topics', label: 'Life Topics', icon: 'chatbubbles' },
  { id: 'outreach', label: 'Outreach', icon: 'heart' },
];

export default function SuggestGroupScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    // Validation
    if (!selectedCategory) {
      Alert.alert('Missing Information', 'Please select a category.');
      return;
    }
    if (!groupName.trim()) {
      Alert.alert('Missing Information', 'Please enter the group name.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Missing Information', 'Please provide a description.');
      return;
    }
    if (!instagram.trim() && !tiktok.trim()) {
      Alert.alert('Missing Information', 'Please provide at least one social media handle (Instagram or TikTok).');
      return;
    }
    if (!meetingTime.trim()) {
      Alert.alert('Missing Information', 'Please specify when your group meets.');
      return;
    }
    if (!location.trim()) {
      Alert.alert('Missing Information', 'Please specify the meeting location.');
      return;
    }

    // Here you would normally send this data to your backend
    const suggestionData = {
      category: selectedCategory,
      groupName: groupName.trim(),
      description: description.trim(),
      instagram: instagram.trim(),
      tiktok: tiktok.trim(),
      meetingTime: meetingTime.trim(),
      location: location.trim(),
      submittedAt: new Date().toISOString(),
    };

    console.log('Group suggestion submitted:', suggestionData);

    // Show success message
    Alert.alert(
      'Thank You!',
      'Your young adult group has been submitted for review. We appreciate your contribution to the Rooted community!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );

    // Reset form
    setSelectedCategory('');
    setGroupName('');
    setDescription('');
    setInstagram('');
    setTiktok('');
    setMeetingTime('');
    setLocation('');
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
        <Text style={styles.headerTitle}>Suggest a Group</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro Text */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Share your community!</Text>
          <Text style={styles.introText}>
            Lead a young adult group? Help others discover it by sharing your group's information with the Rooted community.
          </Text>
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Category <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sectionDescription}>
            Select the main focus of your group
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
                    selectedCategory === category.id ? '#ffffff' : '#007bff'
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

        {/* Group Name */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Group Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your group's name"
            placeholderTextColor="#6c757d"
            value={groupName}
            onChangeText={setGroupName}
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Description <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sectionDescription}>
            Tell us about your group - what you do, who you are, and what makes your community special
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Share details about your group's mission, activities, atmosphere, or what members can expect..."
            placeholderTextColor="#6c757d"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Instagram */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Instagram <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sectionDescription}>
            Your group's Instagram handle or profile link
          </Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="logo-instagram" size={20} color="#6c757d" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithPadding}
              placeholder="@yourgroup or instagram.com/yourgroup"
              placeholderTextColor="#6c757d"
              value={instagram}
              onChangeText={setInstagram}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* TikTok */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>TikTok</Text>
          <Text style={styles.sectionDescription}>
            Your group's TikTok handle or profile link (optional)
          </Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="logo-tiktok" size={20} color="#6c757d" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithPadding}
              placeholder="@yourgroup or tiktok.com/@yourgroup"
              placeholderTextColor="#6c757d"
              value={tiktok}
              onChangeText={setTiktok}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Meeting Time */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Meeting Time <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sectionDescription}>
            When does your group meet?
          </Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="time-outline" size={20} color="#6c757d" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithPadding}
              placeholder="e.g., Every Thursday at 7:00 PM"
              placeholderTextColor="#6c757d"
              value={meetingTime}
              onChangeText={setMeetingTime}
            />
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Meeting Location <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sectionDescription}>
            Where does your group meet?
          </Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="location-outline" size={20} color="#6c757d" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithPadding}
              placeholder="e.g., Grace Church, 123 Main St, Alexandria, VA"
              placeholderTextColor="#6c757d"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Submit Group</Text>
          <Ionicons name="arrow-forward" size={20} color="#ffffff" />
        </TouchableOpacity>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Ionicons name="information-circle-outline" size={20} color="#007bff" />
          <Text style={styles.footerText}>
            All group submissions will be reviewed by our team to ensure they align with our community values. We'll reach out if we need more information.
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
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
    backgroundColor: '#007bff',
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
    color: '#ffffff',
    lineHeight: 22,
    opacity: 0.95,
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
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#212529',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputWithPadding: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#212529',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
    position: 'relative',
  },
  categoryCardSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  categoryCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginTop: 8,
    textAlign: 'center',
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
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
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
    backgroundColor: '#e7f3ff',
    borderRadius: 12,
  },
  footerText: {
    flex: 1,
    fontSize: 13,
    color: '#004085',
    lineHeight: 18,
    marginLeft: 10,
  },
});

