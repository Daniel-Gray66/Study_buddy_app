import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../config/firebase';

export const FirebaseTest = () => {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    // Test if Firebase is initialized
    try {
      if (auth) {
        setStatus(`✅ Firebase Auth initialized\nApp: ${auth.app.name}\nAPI Key: ${auth.app.options.apiKey?.substring(0, 20)}...`);
      } else {
        setStatus('❌ Firebase Auth is null');
      }
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    margin: 20,
    borderRadius: 8,
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
});
