import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MusicScreen from '../screens/MusicScreen';
import PodcastScreen from '../screens/PodcastScreen';
import AudiobookScreen from '../screens/AudiobookScreen';
import VideoFeedScreen from '../screens/VideoFeedScreen';
import EventVideoFeedScreen from '../screens/EventVideoFeedScreen';
import ArtistProfileScreen from '../screens/ArtistProfileScreen';
import ArtistReelsScreen from '../screens/ArtistReelsScreen';
import ApparelScreen from '../screens/ApparelScreen';
import SuggestArtistScreen from '../screens/SuggestArtistScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Home tab
function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Music" component={MusicScreen} />
      <Stack.Screen name="Podcast" component={PodcastScreen} />
      <Stack.Screen name="Audiobook" component={AudiobookScreen} />
      <Stack.Screen name="EventVideoFeed" component={EventVideoFeedScreen} />
      <Stack.Screen name="ArtistProfile" component={ArtistProfileScreen} />
      <Stack.Screen name="ArtistReels" component={ArtistReelsScreen} />
      <Stack.Screen name="Apparel" component={ApparelScreen} />
      <Stack.Screen name="SuggestArtist" component={SuggestArtistScreen} />
    </Stack.Navigator>
  );
}

// Stack Navigator for Discover tab
function DiscoverStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiscoverMain" component={DiscoverScreen} />
      <Stack.Screen name="VideoFeed" component={VideoFeedScreen} />
    </Stack.Navigator>
  );
}

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Discover') {
              iconName = focused ? 'compass' : 'compass-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else {
              iconName = 'circle';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: '#6c757d',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e9ecef',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStackNavigator}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen 
          name="Discover" 
          component={DiscoverStackNavigator}
          options={{
            tabBarLabel: 'Discover',
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
