import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CreatorsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#212529" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Creators</Text>
          <View style={styles.placeholder} />
        </View>

        <Text style={styles.subtitle}>Discover Christian content creators by category</Text>

        {/* Categories Grid */}
        <View style={styles.categoriesGrid}>
          <TouchableOpacity 
            style={[styles.categoryCard, styles.relationshipsCard]}
            onPress={() => navigation.navigate('CreatorCategory' as never, { category: 'Relationships/Dating', color: '#D14D72' } as never)}
          >
            <Text style={styles.categoryCardText}>Relationships/Dating</Text>
            <Ionicons name="heart" size={24} color="rgba(255,255,255,0.3)" style={styles.categoryCardIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.parentingCard]}
            onPress={() => navigation.navigate('CreatorCategory' as never, { category: 'Parenting & Family', color: '#5E7C84' } as never)}
          >
            <Text style={styles.categoryCardText}>Parenting & Family</Text>
            <Ionicons name="people" size={24} color="rgba(255,255,255,0.3)" style={styles.categoryCardIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.singlesCard]}
            onPress={() => navigation.navigate('CreatorCategory' as never, { category: 'Singles/Singleness', color: '#8B6F47' } as never)}
          >
            <Text style={styles.categoryCardText}>Singles/Singleness</Text>
            <Ionicons name="person" size={24} color="rgba(255,255,255,0.3)" style={styles.categoryCardIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.apologeticsCard]}
            onPress={() => navigation.navigate('CreatorCategory' as never, { category: 'Apologetics', color: '#4A4238' } as never)}
          >
            <Text style={styles.categoryCardText}>Apologetics</Text>
            <Ionicons name="shield-checkmark" size={24} color="rgba(255,255,255,0.3)" style={styles.categoryCardIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.proverbs31Card]}
            onPress={() => navigation.navigate('CreatorCategory' as never, { category: 'Proverbs 31', color: '#B87FA6' } as never)}
          >
            <Text style={styles.categoryCardText}>Proverbs 31</Text>
            <Ionicons name="rose" size={24} color="rgba(255,255,255,0.3)" style={styles.categoryCardIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.manOfGodCard]}
            onPress={() => navigation.navigate('CreatorCategory' as never, { category: 'Man of God', color: '#6B4423' } as never)}
          >
            <Text style={styles.categoryCardText}>Man of God</Text>
            <Ionicons name="shield" size={24} color="rgba(255,255,255,0.3)" style={styles.categoryCardIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.addictionCard]}
            onPress={() => navigation.navigate('CreatorCategory' as never, { category: 'Overcoming Addiction', color: '#2E7D5F' } as never)}
          >
            <Text style={styles.categoryCardText}>Overcoming Addiction</Text>
            <Ionicons name="trending-up" size={24} color="rgba(255,255,255,0.3)" style={styles.categoryCardIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.fitnessCard]}
            onPress={() => navigation.navigate('CreatorCategory' as never, { category: 'Fitness & Health', color: '#7D5E3F' } as never)}
          >
            <Text style={styles.categoryCardText}>Fitness & Health</Text>
            <Ionicons name="fitness" size={24} color="rgba(255,255,255,0.3)" style={styles.categoryCardIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.financeCard]}
            onPress={() => navigation.navigate('CreatorCategory' as never, { category: 'Finance & Stewardship', color: '#4B8F3A' } as never)}
          >
            <Text style={styles.categoryCardText}>Finance & Stewardship</Text>
            <Ionicons name="cash" size={24} color="rgba(255,255,255,0.3)" style={styles.categoryCardIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.comedyCard]}
            onPress={() => navigation.navigate('CreatorCategory' as never, { category: 'Christian Comedy', color: '#E89B4F' } as never)}
          >
            <Text style={styles.categoryCardText}>Christian Comedy</Text>
            <Ionicons name="happy" size={24} color="rgba(255,255,255,0.3)" style={styles.categoryCardIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.fashionCard]}
            onPress={() => navigation.navigate('CreatorCategory' as never, { category: 'Modesty & Fashion', color: '#C19A6B' } as never)}
          >
            <Text style={styles.categoryCardText}>Modesty & Fashion</Text>
            <Ionicons name="shirt" size={24} color="rgba(255,255,255,0.3)" style={styles.categoryCardIcon} />
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212529',
  },
  placeholder: {
    width: 40,
  },
  subtitle: {
    fontSize: 15,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  categoryCard: {
    width: '48%',
    height: 100,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  relationshipsCard: {
    backgroundColor: '#D14D72', // Rose/Pink
  },
  parentingCard: {
    backgroundColor: '#5E7C84', // Muted teal
  },
  singlesCard: {
    backgroundColor: '#8B6F47', // Warm brown
  },
  apologeticsCard: {
    backgroundColor: '#4A4238', // Dark brown
  },
  proverbs31Card: {
    backgroundColor: '#B87FA6', // Mauve/Purple
  },
  manOfGodCard: {
    backgroundColor: '#6B4423', // Deep brown
  },
  addictionCard: {
    backgroundColor: '#2E7D5F', // Forest green
  },
  fitnessCard: {
    backgroundColor: '#7D5E3F', // Medium brown
  },
  financeCard: {
    backgroundColor: '#4B8F3A', // Green
  },
  comedyCard: {
    backgroundColor: '#E89B4F', // Orange
  },
  fashionCard: {
    backgroundColor: '#C19A6B', // Tan/Beige
  },
  categoryCardText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  categoryCardIcon: {
    alignSelf: 'flex-end',
  },
});

