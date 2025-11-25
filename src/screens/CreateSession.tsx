import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { StudyGroupForm } from '../components/StudyGroupForm';
import { StudyGroup } from '../types/studyGroup';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export const CreateSession = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (payload: StudyGroup) => {
    try {
      if (submitting) return;
      setSubmitting(true);
      if (!user) throw new Error('You must be signed in');
      console.log('[CreateSession] Creating study group with payload', payload);
      const ref = await addDoc(collection(db, 'studyGroups'), {
        ...payload,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      });
      console.log('[CreateSession] Created study group id:', ref.id);
      setSnackbarMessage(`Study group created (id: ${ref.id})`);
      setSnackbarVisible(true);
      // Navigate back immediately so user sees the list/map again
      navigation.goBack();
    } catch (e: any) {
      console.error('[CreateSession] Create failed', e);
      const msg = e?.code ? `${e.code}: ${e.message}` : (e?.message || 'Failed to create');
      setSnackbarMessage(msg);
      setSnackbarVisible(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StudyGroupForm onSubmit={handleCreate} />
      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={2000}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default CreateSession;
