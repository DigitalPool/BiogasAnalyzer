// screens/HomeDashboardScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
});