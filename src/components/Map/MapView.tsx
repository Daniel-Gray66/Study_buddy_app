import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';

// Web-specific component
const WebMapView = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Map view is not available on web. Please use a mobile device.</Text>
  </View>
);

// Native MapView (will be dynamically imported)
let NativeMapView: any = null;
if (Platform.OS !== 'web') {
  try {
    NativeMapView = require('react-native-maps').default;
  } catch (error) {
    console.warn('Failed to load react-native-maps:', error);
  }
}

// Main MapView component
export default function MapView(props: any) {
  if (Platform.OS === 'web') {
    return <WebMapView />;
  }

  if (!NativeMapView) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Failed to load maps. Please check your configuration.</Text>
      </View>
    );
  }

  return <NativeMapView {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    textAlign: 'center',
    padding: 20,
  },
});
