// screens/GasScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Share } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { fetchGasDataHistory } from '../utils/fetchThingSpeakData';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { getAiInsight } from '../utils/getAiInsight';

const screenWidth = Dimensions.get('window').width;

const { channelId: CHANNEL_ID, readApiKey: READ_API_KEY } = Constants.expoConfig.extra || {};

if (!CHANNEL_ID || !READ_API_KEY) {
  console.error('Missing ThingSpeak configuration: CHANNEL_ID or READ_API_KEY is undefined.');
}

export default function GasScreen({ route }) {
  const gasType = route?.params?.gasType || 'Methane';
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState(null);
  const [aiInsight, setAiInsight] = useState('Loading AI insight...');

  const FIELD_MAPPING = {
    Methane: 1,
    H2S: 2,
    Oxygen: 3,
    Hydrogen: 4,
    CO2: 5,
    CO: 6,
  };

  const fieldNum = FIELD_MAPPING[gasType];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const history = await fetchGasDataHistory(CHANNEL_ID, READ_API_KEY, fieldNum);
        const valid = history.filter(d => !isNaN(d.value));
        setData(valid);
        const latestVal = valid.length > 0 ? valid[valid.length - 1].value : null;
        setLatest(latestVal);

        const valuesOnly = valid.map(d => d.value);

        if (valuesOnly.length > 0) {
          setTimeout(async () => {
            try {
              const insight = await getAiInsight(gasType, valuesOnly);
              setAiInsight(insight);
            } catch (aiError) {
              console.error('Error fetching AI insight:', aiError);
              if (aiError.response?.status === 429) {
                setAiInsight('Too many requests to AI. Please wait and try again later.');
              } else {
                setAiInsight('AI insight could not be retrieved.');
              }
            }
          }, 1000); // 1 second cooldown
        } else {
          setAiInsight('Not enough data for AI insight.');
        }
      } catch (err) {
        console.error('Error fetching gas data history:', err);
        setAiInsight('Error loading data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const labels = data.map((d, i) => (i % 30 === 0 ? new Date(d.time).toLocaleTimeString() : ''));
  const values = data.map((d) => d.value);

  const gasPercentage = latest ? parseFloat(((latest / 10000) * 100).toFixed(2)) : 0;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${gasType} current level: ${latest || 'N/A'} ppm`,
      });
    } catch (error) {
      alert('Error sharing data');
    }
  };

  const pieData = [
    {
      name: `${gasType} (${gasPercentage}%)`,
      population: gasPercentage,
      color: '#00cc88',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Other Gases',
      population: 100 - gasPercentage,
      color: '#dddddd',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons name="analytics" size={28} color="#004225" />
        <Text style={styles.title}>{gasType} Dashboard</Text>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-social" size={24} color="#004225" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#004225" />
      ) : (
        <>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Current Level</Text>
            <Text style={styles.metricValue}>
              {latest != null ? `${latest} ppm (${gasPercentage}%)` : 'N/A'}
            </Text>
          </View>

          <Text style={styles.chartLabel}>Composition of {gasType}</Text>
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={160}
            chartConfig={{
              backgroundColor: 'transparent',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: () => '#333',
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            hasLegend={false}
            center={[10, 0]}
          />

          {values.length === 0 ? (
            <Text style={styles.noDataText}>No data available for this gas</Text>
          ) : (
            <>
              <Text style={styles.chartLabel}>Last 100 readings</Text>
              <LineChart
                data={{
                  labels,
                  datasets: [{ data: values }],
                }}
                width={screenWidth - 40}
                height={250}
                yAxisSuffix=" ppm"
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#f2f2f2',
                  backgroundGradientTo: '#e0f7ec',
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(0, 66, 37, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 66, 37, ${opacity})`,
                  fromZero: true,
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: '#00cc88',
                  },
                }}
                bezier
                style={{ marginVertical: 12, borderRadius: 16 }}
              />
            </>
          )}

          <View style={styles.insightBox}>
            <Text style={styles.insightTitle}>AI Insight</Text>
            <Text style={styles.insightText}>{aiInsight}</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdfdfd',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004225',
  },
  metricCard: {
    backgroundColor: '#004225',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  metricLabel: {
    color: '#bbb',
    fontSize: 16,
  },
  metricValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
  },
  chartLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  noDataText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  insightBox: {
    marginTop: 20,
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  insightText: {
    fontSize: 15,
    color: '#333',
  },
});
