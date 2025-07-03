// screens/ExportDataScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchGasDataHistory } from '../utils/fetchThingSpeakData';
import Constants from 'expo-constants';

const { channelId: CHANNEL_ID, readApiKey: READ_API_KEY } = Constants.expoConfig.extra || {};

export default function ExportDataScreen() {
	const [exporting, setExporting] = useState(false);
	const [statusMsg, setStatusMsg] = useState('');

	const FIELD_MAPPING = {
		Methane: 1,
		H2S: 2,
		Oxygen: 3,
		Hydrogen: 4,
		CO2: 5,
		CO: 6,
	};

	const exportData = async () => {
		setExporting(true);
		setStatusMsg('Preparing data...');

		try {
			let fullExport = '';

			for (const [gas, fieldNum] of Object.entries(FIELD_MAPPING)) {
				const history = await fetchGasDataHistory(CHANNEL_ID, READ_API_KEY, fieldNum);
				const cleanData = history.filter(d => !isNaN(d.value));
				const lines = cleanData.map(d => `${d.time},${gas},${d.value}`);
				fullExport += `\n${lines.join('\n')}`;
			}

			await Share.share({
				message: `Timestamp,Gas,Value\n${fullExport.trim()}`,
			});
			setStatusMsg('Data ready to share!');
		} catch (err) {
			console.error(err);
			setStatusMsg('Failed to export data.');
		} finally {
			setExporting(false);
		}
	};

	return (
		<View style={styles.container}>
			<Ionicons name="cloud-download" size={40} color="#004225" />
			<Text style={styles.title}>Export Gas Data</Text>
			<Text style={styles.subtitle}>Export readings from ThingSpeak and share as CSV</Text>

			<TouchableOpacity style={styles.button} onPress={exportData} disabled={exporting}>
				{exporting ? (
					<ActivityIndicator size="small" color="#fff" />
				) : (
					<Text style={styles.buttonText}>Export All Gas Data</Text>
				)}
			</TouchableOpacity>

			{statusMsg !== '' && <Text style={styles.status}>{statusMsg}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fefefe',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#004225',
		marginVertical: 10,
	},
	subtitle: {
		fontSize: 14,
		color: '#666',
		marginBottom: 30,
		textAlign: 'center',
	},
	button: {
		backgroundColor: '#004225',
		paddingVertical: 12,
		paddingHorizontal: 28,
		borderRadius: 8,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
	status: {
		marginTop: 16,
		fontSize: 14,
		color: '#333',
	},
});
