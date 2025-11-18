// src/screens/MapScreen.tsx
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_MAPS_API_KEY } from '../config/maps';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

export const MapScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout} style={styles.signOutBtn}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, logout]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        provider="google"
        mapType="standard"
      >
        {/* We'll add markers here later */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  signOutBtn: {
    marginRight: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#FF3B30',
    borderRadius: 6,
  },
  signOutText: {
    color: '#fff',
    fontWeight: '600',
  },
});