import React from 'react';
import { StatusBar } from 'expo-status-bar';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomTabNavigator />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
