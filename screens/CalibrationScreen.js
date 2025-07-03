import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	TouchableOpacity,
	Alert,
} from 'react-native';

export default function CalibrationScreen() {
	const [calibrationValues, setCalibrationValues] = useState({
		CH4: '',
		CO2: '',
		H2S: '',
		O2: '',
	});

	const handleChange = (key, value) => {
		setCalibrationValues((prev) => ({ ...prev, [key]: value }));
	};

	const handleSave = () => {
		console.log('Calibration saved:', calibrationValues);
		Alert.alert('✅ Success', 'Calibration values saved!');
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>🛠️ Sensor Calibration</Text>

			{Object.keys(calibrationValues).map((gas) => (
				<View key={gas} style={styles.inputGroup}>
					<Text style={styles.label}>{gas} Calibration Factor</Text>
					<TextInput
						style={styles.input}
						value={calibrationValues[gas]}
						onChangeText={(val) => handleChange(gas, val)}
						keyboardType="numeric"
						placeholder={`e.g. 1.25`}
					/>
				</View>
			))}

			<TouchableOpacity style={styles.button} onPress={handleSave}>
				<Text style={styles.buttonText}>💾 Save Calibration</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	inputGroup: {
		marginBottom: 15,
		width: '100%',
	},
	label: {
		fontSize: 16,
		marginBottom: 5,
		color: '#333',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 6,
		padding: 10,
		fontSize: 16,
		width: '100%',
	},
	button: {
		marginTop: 30,
		backgroundColor: '#28a745',
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
