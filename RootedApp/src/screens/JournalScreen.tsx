import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function JournalScreen() {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: 'October 22, 2024',
      title: 'Morning Reflection',
      content: 'Today I am grateful for the peace that comes from trusting in God\'s plan...',
      type: 'prayer',
    },
    {
      id: 2,
      date: 'October 21, 2024',
      title: 'Devotion Notes',
      content: 'Reading through Romans 8:28 - "And we know that in all things God works for the good..."',
      type: 'devotion',
    },
  ]);

  const [newEntry, setNewEntry] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const addEntry = () => {
    if (newTitle.trim() && newEntry.trim()) {
      const entry = {
        id: entries.length + 1,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        title: newTitle,
        content: newEntry,
        type: 'note',
      };
      setEntries([entry, ...entries]);
      setNewTitle('');
      setNewEntry('');
      Alert.alert('Success', 'Entry added to your journal');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Journal</Text>
          <Text style={styles.headerSubtitle}>Reflect, pray, and grow</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle" size={24} color="#007bff" />
            <Text style={styles.actionText}>New Entry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Prayer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="book" size={24} color="#28a745" />
            <Text style={styles.actionText}>Devotion</Text>
          </TouchableOpacity>
        </View>

        {/* New Entry Form */}
        <View style={styles.newEntryForm}>
          <Text style={styles.formTitle}>Add New Entry</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Entry title..."
            value={newTitle}
            onChangeText={setNewTitle}
            placeholderTextColor="#6c757d"
          />
          <TextInput
            style={styles.contentInput}
            placeholder="What's on your heart today?"
            value={newEntry}
            onChangeText={setNewEntry}
            multiline
            numberOfLines={4}
            placeholderTextColor="#6c757d"
          />
          <TouchableOpacity style={styles.saveButton} onPress={addEntry}>
            <Text style={styles.saveButtonText}>Save Entry</Text>
          </TouchableOpacity>
        </View>

        {/* Journal Entries */}
        <View style={styles.entriesContainer}>
          <Text style={styles.entriesTitle}>Recent Entries</Text>
          {entries.map((entry) => (
            <View key={entry.id} style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryDate}>{entry.date}</Text>
                <View style={styles.entryType}>
                  <Ionicons
                    name={entry.type === 'prayer' ? 'heart' : entry.type === 'devotion' ? 'book' : 'document-text'}
                    size={16}
                    color="#6c757d"
                  />
                </View>
              </View>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <Text style={styles.entryContent} numberOfLines={3}>
                {entry.content}
              </Text>
              <TouchableOpacity style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Read More</Text>
              </TouchableOpacity>
            </View>
          ))}
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
  header: {
    marginVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
    fontWeight: '500',
  },
  newEntryForm: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  entriesContainer: {
    marginBottom: 20,
  },
  entriesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 16,
  },
  entryCard: {
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
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryDate: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '500',
  },
  entryType: {
    padding: 4,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  entryContent: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginBottom: 12,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
  },
});
