import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
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
  { id: 'concert', label: 'Concert', icon: 'musical-notes' },
  { id: 'worship-night', label: 'Worship Night', icon: 'flame' },
  { id: 'conference', label: 'Conference', icon: 'people' },
  { id: 'outreach', label: 'Outreach', icon: 'heart' },
  { id: 'prayer', label: 'Prayer', icon: 'hand-left' },
  { id: 'other', label: 'Other', icon: 'calendar' },
];

export default function SuggestEventScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [location, setLocation] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [organizerContact, setOrganizerContact] = useState('');

  const handleSubmit = () => {
    // Validation
    if (!selectedCategory) {
      Alert.alert('Missing Information', 'Please select an event category.');
      return;
    }
    if (!eventName.trim()) {
      Alert.alert('Missing Information', 'Please enter the event name.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Missing Information', 'Please provide a description.');
      return;
    }
    if (!eventLink.trim()) {
      Alert.alert('Missing Information', 'Please provide a link to the event page.');
      return;
    }
    if (!eventDate.trim()) {
      Alert.alert('Missing Information', 'Please specify the event date.');
      return;
    }
    if (!eventTime.trim()) {
      Alert.alert('Missing Information', 'Please specify the event time.');
      return;
    }
    if (!location.trim()) {
      Alert.alert('Missing Information', 'Please specify the event location.');
      return;
    }

    // Here you would normally send this data to your backend
    const suggestionData = {
      category: selectedCategory,
      eventName: eventName.trim(),
      description: description.trim(),
      eventLink: eventLink.trim(),
      eventDate: eventDate.trim(),
      eventTime: eventTime.trim(),
      location: location.trim(),
      organizerName: organizerName.trim(),
      organizerContact: organizerContact.trim(),
      submittedAt: new Date().toISOString(),
    };

    console.log('Event suggestion submitted:', suggestionData);

    // Show success message
    Alert.alert(
      'Thank You!',
      'Your event has been submitted for review. We appreciate your contribution to the Rooted community!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );

    // Reset form
    setSelectedCategory('');
    setEventName('');
    setDescription('');
    setEventLink('');
    setEventDate('');
    setEventTime('');
    setLocation('');
    setOrganizerName('');
    setOrganizerContact('');
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
        <Text style={styles.headerTitle}>Suggest an Event</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro Text */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Share an upcoming event!</Text>
          <Text style={styles.introText}>
            Know about a Christian event happening in your area? Help others discover it by sharing the details with our community.
          </Text>
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Event Category <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sectionDescription}>
            Select the type of event
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

        {/* Event Name */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Event Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the event name"
            placeholderTextColor="#6c757d"
            value={eventName}
            onChangeText={setEventName}
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Description <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sectionDescription}>
            Tell us about this event - what to expect, who's performing, etc.
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Share details about the event, what makes it special, who should attend..."
            placeholderTextColor="#6c757d"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Event Link */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Event Page Link <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sectionDescription}>
            Link to the event page, registration, or tickets
          </Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="link" size={20} color="#6c757d" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithPadding}
              placeholder="https://..."
              placeholderTextColor="#6c757d"
              value={eventLink}
              onChangeText={setEventLink}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>
        </View>

        {/* Date */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Event Date <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sectionDescription}>
            When is the event happening?
          </Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="calendar-outline" size={20} color="#6c757d" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithPadding}
              placeholder="e.g., Friday, November 1, 2024"
              placeholderTextColor="#6c757d"
              value={eventDate}
              onChangeText={setEventDate}
            />
          </View>
        </View>

        {/* Time */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Event Time <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sectionDescription}>
            What time does the event start?
          </Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="time-outline" size={20} color="#6c757d" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithPadding}
              placeholder="e.g., 7:00 PM"
              placeholderTextColor="#6c757d"
              value={eventTime}
              onChangeText={setEventTime}
            />
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Location <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sectionDescription}>
            Where is the event taking place?
          </Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="location-outline" size={20} color="#6c757d" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithPadding}
              placeholder="e.g., Grace Church, 123 Main St, Washington DC"
              placeholderTextColor="#6c757d"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        {/* Organizer Name */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Organizer Name</Text>
          <Text style={styles.sectionDescription}>
            Who is organizing this event? (optional)
          </Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="person-outline" size={20} color="#6c757d" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithPadding}
              placeholder="Event organizer or church name"
              placeholderTextColor="#6c757d"
              value={organizerName}
              onChangeText={setOrganizerName}
            />
          </View>
        </View>

        {/* Organizer Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Contact Information</Text>
          <Text style={styles.sectionDescription}>
            Email or phone number for questions (optional)
          </Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="mail-outline" size={20} color="#6c757d" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithPadding}
              placeholder="contact@example.com or (123) 456-7890"
              placeholderTextColor="#6c757d"
              value={organizerContact}
              onChangeText={setOrganizerContact}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Submit Event</Text>
          <Ionicons name="arrow-forward" size={20} color="#ffffff" />
        </TouchableOpacity>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Ionicons name="information-circle-outline" size={20} color="#8B6F47" />
          <Text style={styles.footerText}>
            All event submissions will be reviewed by our team to ensure they align with our community values. We'll reach out if we need more information.
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
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFEF9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6DDD1',
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

