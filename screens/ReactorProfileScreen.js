import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReactorProfileScreen() {
  const [feedstock, setFeedstock] = useState('');
  const [temperature, setTemperature] = useState('');
  const [retentionTime, setRetentionTime] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const storedFeedstock = await AsyncStorage.getItem('feedstock');
      const storedTemperature = await AsyncStorage.getItem('temperature');
      const storedRetentionTime = await AsyncStorage.getItem('retentionTime');
      const storedStatus = await AsyncStorage.getItem('status');
      if (storedFeedstock) setFeedstock(storedFeedstock);
      if (storedTemperature) setTemperature(storedTemperature);
      if (storedRetentionTime) setRetentionTime(storedRetentionTime);
      if (storedStatus) setStatus(storedStatus);
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('feedstock', feedstock);
      await AsyncStorage.setItem('temperature', temperature);
      await AsyncStorage.setItem('retentionTime', retentionTime);
      await AsyncStorage.setItem('status', status);
      Alert.alert('Saved', 'Reactor profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Feedstock Description</Text>
      <TextInput
        style={styles.input}
        value={feedstock}
        onChangeText={setFeedstock}
        placeholder="e.g. Chicken manure, straw, MCC"
      />
      <Text style={styles.label}>Temperature Range (°C)</Text>
      <TextInput
        style={styles.input}
        value={temperature}
        onChangeText={setTemperature}
        placeholder="e.g. 35–38"
        keyboardType="default"
      />
      <Text style={styles.label}>Retention Time (days)</Text>
      <TextInput
        style={styles.input}
        value={retentionTime}
        onChangeText={setRetentionTime}
        placeholder="e.g. 20"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Current Status</Text>
      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
        placeholder="active / paused"
      />
      <Button title="Save Profile" onPress={saveProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginTop: 20, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginTop: 8,
  },
});
