import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Location {
  id: string;
  name: string;
  state: string;
  country: string;
  distance?: string;
}

const popularLocations: Location[] = [
  { id: '1', name: 'Washington DC', state: 'DC', country: 'USA' },
  { id: '2', name: 'New York', state: 'NY', country: 'USA' },
  { id: '3', name: 'Los Angeles', state: 'CA', country: 'USA' },
  { id: '4', name: 'Chicago', state: 'IL', country: 'USA' },
  { id: '5', name: 'Houston', state: 'TX', country: 'USA' },
  { id: '6', name: 'Phoenix', state: 'AZ', country: 'USA' },
  { id: '7', name: 'Philadelphia', state: 'PA', country: 'USA' },
  { id: '8', name: 'San Antonio', state: 'TX', country: 'USA' },
  { id: '9', name: 'San Diego', state: 'CA', country: 'USA' },
  { id: '10', name: 'Dallas', state: 'TX', country: 'USA' },
  { id: '11', name: 'San Jose', state: 'CA', country: 'USA' },
  { id: '12', name: 'Austin', state: 'TX', country: 'USA' },
  { id: '13', name: 'Jacksonville', state: 'FL', country: 'USA' },
  { id: '14', name: 'Fort Worth', state: 'TX', country: 'USA' },
  { id: '15', name: 'Columbus', state: 'OH', country: 'USA' },
];

interface LocationScreenProps {
  navigation: any;
  route: any;
}

export default function LocationScreen({ navigation, route }: LocationScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(popularLocations);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredLocations(popularLocations);
    } else {
      const filtered = popularLocations.filter(location =>
        location.name.toLowerCase().includes(query.toLowerCase()) ||
        location.state.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  };

  const handleLocationSelect = (location: Location) => {
    // Navigate back to Discover screen with selected location
    navigation.navigate('Discover', { selectedLocation: location });
  };

  const renderLocationItem = ({ item }: { item: Location }) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handleLocationSelect(item)}
    >
      <View style={styles.locationIcon}>
        <Ionicons name="location-outline" size={20} color="#6c757d" />
      </View>
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationDetails}>{item.state}, {item.country}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#6c757d" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#212529" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Location</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6c757d" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search cities..."
          placeholderTextColor="#6c757d"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => handleSearch('')}
          >
            <Ionicons name="close-circle" size={20} color="#6c757d" />
          </TouchableOpacity>
        )}
      </View>

      {/* Current Location */}
      <TouchableOpacity style={styles.currentLocationItem}>
        <View style={styles.locationIcon}>
          <Ionicons name="locate-outline" size={20} color="#007bff" />
        </View>
        <View style={styles.locationInfo}>
          <Text style={styles.currentLocationName}>Use Current Location</Text>
          <Text style={styles.locationDetails}>Detect automatically</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#6c757d" />
      </TouchableOpacity>

      {/* Popular Locations */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Cities</Text>
      </View>

      <FlatList
        data={filteredLocations}
        renderItem={renderLocationItem}
        keyExtractor={(item) => item.id}
        style={styles.locationsList}
        showsVerticalScrollIndicator={false}
      />
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
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
  },
  clearButton: {
    padding: 4,
  },
  currentLocationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 2,
  },
  currentLocationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
    marginBottom: 2,
  },
  locationDetails: {
    fontSize: 14,
    color: '#6c757d',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  locationsList: {
    flex: 1,
    paddingBottom: 20,
  },
});
