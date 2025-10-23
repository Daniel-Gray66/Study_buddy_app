// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { AuthScreen } from './src/screens/Auth';
import { HomeScreen } from './src/screens/HomeScreen';
import { MapScreen } from './src/screens/MapScreen';

// Define the type for our navigation parameters
export type RootStackParamList = {
  Map: undefined;
  Home: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Main app navigator
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen 
        name="Map" 
        component={MapScreen} 
        options={{ title: 'Study Groups Map' }} 
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Study Buddies' }} 
      />
      <Stack.Screen 
        name="Auth" 
        component={AuthScreen} 
        options={{ title: 'Sign In' }} 
      />
    </Stack.Navigator>
  );
};

// Component that handles auth state and shows appropriate screens
const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthScreen />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

// Main App component
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});