import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { auth } from '../config/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export const TestConnection = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Test Firestore connection
    const testConnection = async () => {
      try {
        // Test Auth connection
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Connecting to Firebase...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.error]}>
        <Text style={styles.errorText}>Connection Error:</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.note}>Check your Firebase configuration and internet connection.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.success]}>
      <Text style={styles.successText}>✅ Firebase Connected Successfully!</Text>
      <Text>User: {user ? 'Logged In' : 'Not Logged In'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  error: {
    backgroundColor: '#ffebee',
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 10,
  },
  note: {
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  success: {
    backgroundColor: '#e8f5e9',
  },
  successText: {
    color: '#2e7d32',
    fontSize: 18,
    marginBottom: 10,
  },
});