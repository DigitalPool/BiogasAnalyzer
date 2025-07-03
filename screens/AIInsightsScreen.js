import React, { useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { getAiInsight } from '../utils/getAiInsight';
import { fetchGasDataHistory } from '../utils/fetchThingSpeakData';
import Constants from 'expo-constants';

const { channelId: CHANNEL_ID, readApiKey: READ_API_KEY } = Constants.expoConfig.extra || {};

const GAS_TYPES = ['Methane', 'H2S', 'Oxygen', 'Hydrogen', 'CO2', 'CO'];

const FIELD_MAPPING = {
	Methane: 1,
	H2S: 2,
	Oxygen: 3,
	Hydrogen: 4,
	CO2: 5,
	CO: 6,
};

export default function AllInsightsScreen() {
	const [insights, setInsights] = useState({});
	const [loading, setLoading] = useState(false);
	const [fetched, setFetched] = useState(false);

	const fetchInsights = async () => {
		setLoading(true);
		const results = {};

		for (let gas of GAS_TYPES) {
			try {
				const fieldNum = FIELD_MAPPING[gas];
				const data = await fetchGasDataHistory(CHANNEL_ID, READ_API_KEY, fieldNum);
				const cleanData = data.filter((d) => !isNaN(d.value)).map((d) => d.value);

				if (cleanData.length > 0) {
					const insight = await getAiInsight(gas, cleanData);
					results[gas] = insight;
				} else {
					results[gas] = 'Not enough data for AI insight.';
				}
			} catch (error) {
				console.error(`Error fetching insight for ${gas}:`, error);
				results[gas] = 'Error retrieving insight.';
			}
		}

		setInsights(results);
		setLoading(false);
		setFetched(true);
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Insights for All Gases</Text>

			{!fetched && (
				<TouchableOpacity style={styles.button} onPress={fetchInsights} disabled={loading}>
					<Text style={styles.buttonText}>{loading ? 'Loading Insights...' : 'Read All Insights'}</Text>
				</TouchableOpacity>
			)}

			{loading && (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#004225" />
					<Text style={{ marginTop: 10, color: '#555' }}>Gathering insights...</Text>
				</View>
			)}

			{fetched &&
				GAS_TYPES.map((gas) => (
					<View key={gas} style={styles.insightCard}>
						<Text style={styles.gasTitle}>{gas}</Text>
						<Text style={styles.insightText}>{insights[gas]}</Text>
					</View>
				))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#ffffff',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#004225',
		marginBottom: 20,
	},
	button: {
		backgroundColor: '#004225',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
		marginBottom: 20,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	insightCard: {
		backgroundColor: '#f1f1f1',
		padding: 16,
		borderRadius: 10,
		marginBottom: 15,
		elevation: 1,
	},
	gasTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#004225',
		marginBottom: 8,
	},
	insightText: {
		fontSize: 15,
		color: '#333',
	},
});
