import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with padding

interface Brand {
  id: string;
  name: string;
  tagline: string;
  image: string;
  category: string;
}

const christianBrands: Brand[] = [
  {
    id: '1',
    name: 'Not Of This World',
    tagline: 'Bold Faith Apparel',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
    category: 'Streetwear',
  },
  {
    id: '2',
    name: 'Faith Over Fear',
    tagline: 'Inspiring Designs',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    category: 'Lifestyle',
  },
  {
    id: '3',
    name: 'Elevated Faith',
    tagline: 'Women\'s Christian Fashion',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop',
    category: 'Women',
  },
  {
    id: '4',
    name: 'Kerusso',
    tagline: 'Gospel Inspired Clothing',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
    category: 'Casual',
  },
  {
    id: '5',
    name: 'His Glory',
    tagline: 'Worship Wear',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
    category: 'Worship',
  },
  {
    id: '6',
    name: 'Crown & Cross',
    tagline: 'Premium Christian Apparel',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Premium',
  },
  {
    id: '7',
    name: 'Jesus Saves',
    tagline: 'Classic Faith Wear',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop',
    category: 'Classic',
  },
  {
    id: '8',
    name: 'Kingdom Threads',
    tagline: 'Urban Christian Style',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
    category: 'Urban',
  },
  {
    id: '9',
    name: 'Blessed Basics',
    tagline: 'Everyday Faith Fashion',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop',
    category: 'Basics',
  },
  {
    id: '10',
    name: 'Gospel Gear',
    tagline: 'Athletic Christian Wear',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    category: 'Athletic',
  },
];

export default function ApparelScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#212529" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Christian Apparel</Text>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={24} color="#212529" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Faith-Inspired Fashion</Text>
          <Text style={styles.heroSubtitle}>
            Shop from trusted Christian brands and wear your faith proudly
          </Text>
        </View>

        {/* Categories Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          <TouchableOpacity style={[styles.categoryPill, styles.activeCategoryPill]}>
            <Text style={[styles.categoryPillText, styles.activeCategoryPillText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>Streetwear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>Women</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>Premium</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>Athletic</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Brands Grid */}
        <View style={styles.brandsGrid}>
          {christianBrands.map((brand) => (
            <TouchableOpacity key={brand.id} style={styles.brandCard}>
              <ImageBackground 
                source={{ uri: brand.image }} 
                style={styles.brandImage}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.brandOverlay}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{brand.category}</Text>
                  </View>
                </View>
              </ImageBackground>
              <View style={styles.brandInfo}>
                <Text style={styles.brandName}>{brand.name}</Text>
                <Text style={styles.brandTagline}>{brand.tagline}</Text>
                <TouchableOpacity style={styles.shopButton}>
                  <Text style={styles.shopButtonText}>Shop Now</Text>
                  <Ionicons name="arrow-forward" size={16} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Section */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Why Shop Christian Brands?</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="heart" size={24} color="#8B6F47" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Faith-Centered</Text>
                <Text style={styles.featureDescription}>
                  Every purchase supports Christian values and missions
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="shield-checkmark" size={24} color="#8B6F47" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Quality Assured</Text>
                <Text style={styles.featureDescription}>
                  Premium materials and ethical manufacturing
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="people" size={24} color="#8B6F47" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Community Impact</Text>
                <Text style={styles.featureDescription}>
                  Proceeds help fund ministries and outreach programs
                </Text>
              </View>
            </View>
          </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E6DDD1',
    backgroundColor: '#F5F1E8',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  cartButton: {
    padding: 8,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: 'center',
    backgroundColor: '#FFFEF9',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
  },
  categoriesContainer: {
    backgroundColor: '#F5F1E8',
    paddingVertical: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFEF9',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E6DDD1',
  },
  activeCategoryPill: {
    backgroundColor: '#8B6F47',
    borderColor: '#8B6F47',
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  activeCategoryPillText: {
    color: '#ffffff',
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  brandCard: {
    width: cardWidth,
    backgroundColor: '#FFFEF9',
    borderRadius: 12,
    shadowColor: '#4A4238',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  brandImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#6c757d',
  },
  brandOverlay: {
    flex: 1,
    padding: 12,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  categoryBadge: {
    backgroundColor: 'rgba(139, 111, 71, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  brandInfo: {
    padding: 12,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  brandTagline: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 12,
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B6F47',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  shopButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  featuredSection: {
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 16,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFEF9',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#4A4238',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(139, 111, 71, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
});

