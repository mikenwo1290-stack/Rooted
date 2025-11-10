import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MusicScreen from '../screens/MusicScreen';
import MusicReelsScreen from '../screens/MusicReelsScreen';
import PodcastScreen from '../screens/PodcastScreen';
import AudiobookScreen from '../screens/AudiobookScreen';
import VideoFeedScreen from '../screens/VideoFeedScreen';
import EventVideoFeedScreen from '../screens/EventVideoFeedScreen';
import ArtistProfileScreen from '../screens/ArtistProfileScreen';
import ArtistReelsScreen from '../screens/ArtistReelsScreen';
import ApparelScreen from '../screens/ApparelScreen';
import CreatorsScreen from '../screens/CreatorsScreen';
import CreatorCategoryScreen from '../screens/CreatorCategoryScreen';
import SuggestArtistScreen from '../screens/SuggestArtistScreen';
import SuggestGroupScreen from '../screens/SuggestGroupScreen';
import SuggestEventScreen from '../screens/SuggestEventScreen';
import GroupProfileScreen from '../screens/GroupProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Home tab
function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Music" component={MusicScreen} />
      <Stack.Screen name="MusicReels" component={MusicReelsScreen} />
      <Stack.Screen name="Podcast" component={PodcastScreen} />
      <Stack.Screen name="Audiobook" component={AudiobookScreen} />
      <Stack.Screen name="EventVideoFeed" component={EventVideoFeedScreen} />
      <Stack.Screen name="ArtistProfile" component={ArtistProfileScreen} />
      <Stack.Screen name="ArtistReels" component={ArtistReelsScreen} />
      <Stack.Screen name="Apparel" component={ApparelScreen} />
      <Stack.Screen name="Creators" component={CreatorsScreen} />
      <Stack.Screen name="CreatorCategory" component={CreatorCategoryScreen} />
      <Stack.Screen name="SuggestArtist" component={SuggestArtistScreen} />
      <Stack.Screen name="SuggestEvent" component={SuggestEventScreen} />
    </Stack.Navigator>
  );
}

// Stack Navigator for Discover tab
function DiscoverStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiscoverMain" component={DiscoverScreen} />
      <Stack.Screen name="VideoFeed" component={VideoFeedScreen} />
      <Stack.Screen name="GroupProfile" component={GroupProfileScreen} />
      <Stack.Screen name="SuggestGroup" component={SuggestGroupScreen} />
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
              iconName = 'ellipse';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007aff',
          tabBarInactiveTintColor: '#8e8e93',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0.5,
            borderTopColor: '#e5e5e7',
            height: 84,
            paddingTop: 8,
            paddingBottom: 28,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            marginTop: 4,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStackNavigator}
          options={({ route }) => ({
            tabBarLabel: 'Home',
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? '';
              if (['MusicReels', 'ArtistReels', 'EventVideoFeed'].includes(routeName)) {
                return { display: 'none' };
              }
              return {
                backgroundColor: '#ffffff',
                borderTopWidth: 0.5,
                borderTopColor: '#e5e5e7',
                height: 84,
                paddingTop: 8,
                paddingBottom: 28,
                elevation: 0,
                shadowOpacity: 0,
              };
            })(route),
          })}
        />
        <Tab.Screen 
          name="Discover" 
          component={DiscoverStackNavigator}
          options={({ route }) => ({
            tabBarLabel: 'Discover',
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? '';
              if (['VideoFeed'].includes(routeName)) {
                return { display: 'none' };
              }
              return {
                backgroundColor: '#ffffff',
                borderTopWidth: 0.5,
                borderTopColor: '#e5e5e7',
                height: 84,
                paddingTop: 8,
                paddingBottom: 28,
                elevation: 0,
                shadowOpacity: 0,
              };
            })(route),
          })}
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
