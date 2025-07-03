import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Constants from 'expo-constants';

export default function AppInfoScreen() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Biogas Analyzer App</Text>

			<View style={styles.section}>
				<Text style={styles.label}>App Version:</Text>
				<Text style={styles.value}>{Constants.manifest.version || '1.0.0'}</Text>
			</View>

			<View style={styles.section}>
				<Text style={styles.label}>Developer:</Text>
				<Text style={styles.value}>AbdulAzeez Shobajo</Text>
			</View>

			<View style={styles.section}>
				<Text style={styles.label}>API Credits Used:</Text>
				<Text style={styles.value}>🔌 14 out of 1000 (e.g. OpenAI or ThingSpeak)</Text>
			</View>

			<View style={styles.section}>
				<Text style={styles.label}>Feedback / Support:</Text>
				<Text style={styles.value}>Send feedback to abdulazeezshobajo@gmail.com</Text>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={() =>
					Alert.alert(
						'Reset Data',
						'Are you sure you want to clear cached data?',
						[
							{ text: 'Cancel', style: 'cancel' },
							{ text: 'OK', onPress: () => console.log('Data reset') },
						],
						{ cancelable: true }
					)
				}
			>
				<Text style={styles.buttonText}>🧹 Clear Cache / Reset</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	section: {
		marginVertical: 10,
		width: '100%',
	},
	label: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
	},
	value: {
		fontSize: 16,
		color: '#666',
		marginTop: 2,
	},
	button: {
		marginTop: 30,
		backgroundColor: '#007AFF',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
