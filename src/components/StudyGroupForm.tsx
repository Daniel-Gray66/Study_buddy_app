import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput, Text, useTheme, HelperText } from 'react-native-paper';
import { StudyGroup } from '../types/studyGroup';
import DateTimePicker from '@react-native-community/datetimepicker';

export const StudyGroupForm = ({ onSubmit, initialData = {} as Partial<StudyGroup> }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<Partial<StudyGroup>>({
    title: '',
    subject: '',
    description: '',
    location: { name: '', latitude: 0, longitude: 0 },
    dateTime: new Date(),
    maxParticipants: 5,
    participants: [],
    ...initialData
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.subject?.trim()) newErrors.subject = 'Subject is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.location?.name.trim()) newErrors.location = 'Location is required';
    if (formData.maxParticipants && formData.maxParticipants < 2) {
      newErrors.maxParticipants = 'At least 2 participants are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        ...formData,
        createdAt: new Date(),
        participants: []
      } as StudyGroup);
    }
  };

  const handleLocationSelect = (location: any) => {
    setFormData(prev => ({
      ...prev,
      location: {
        name: location.description,
        latitude: location.geometry.location.lat,
        longitude: location.geometry.location.lng
      }
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Title"
        value={formData.title}
        onChangeText={(text) => setFormData({...formData, title: text})}
        style={styles.input}
        error={!!errors.title}
      />
      {errors.title && <HelperText type="error">{errors.title}</HelperText>}

      <TextInput
        label="Subject"
        value={formData.subject}
        onChangeText={(text) => setFormData({...formData, subject: text})}
        style={styles.input}
        error={!!errors.subject}
      />
      {errors.subject && <HelperText type="error">{errors.subject}</HelperText>}

      <TextInput
        label="Description"
        value={formData.description}
        onChangeText={(text) => setFormData({...formData, description: text})}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.textArea]}
        error={!!errors.description}
      />
      {errors.description && <HelperText type="error">{errors.description}</HelperText>}

      <TextInput
        label="Location"
        value={formData.location?.name}
        onChangeText={(text) => setFormData(prev => ({
          ...prev,
          location: { ...prev.location, name: text }
        }))}
        style={styles.input}
        error={!!errors.location}
        right={<TextInput.Icon name="map-marker" />}
      />
      {errors.location && <HelperText type="error">{errors.location}</HelperText>}

      <View style={styles.dateTimeContainer}>
        <Button 
          onPress={() => setShowDatePicker(true)}
          mode="outlined"
          style={styles.dateButton}
        >
          {formData.dateTime?.toLocaleString() || 'Select Date & Time'}
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={formData.dateTime || new Date()}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setFormData({...formData, dateTime: selectedDate});
              }
            }}
          />
        )}
      </View>

      <TextInput
        label="Maximum Participants"
        value={formData.maxParticipants?.toString()}
        onChangeText={(text) => {
          const num = parseInt(text, 10);
          if (!isNaN(num)) {
            setFormData({...formData, maxParticipants: num});
          }
        }}
        keyboardType="numeric"
        style={styles.input}
        error={!!errors.maxParticipants}
      />
      {errors.maxParticipants && (
        <HelperText type="error">{errors.maxParticipants}</HelperText>
      )}

      <Button 
        mode="contained" 
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        Create Study Group
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateTimeContainer: {
    marginVertical: 8,
  },
  dateButton: {
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
});
