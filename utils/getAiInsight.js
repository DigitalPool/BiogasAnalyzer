// utils/getAiInsight.js
import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OPENAI_API_KEY = Constants.expoConfig?.extra?.openAiKey;

export const getAiInsight = async (gasType, values, context = '') => {
  if (!OPENAI_API_KEY) throw new Error('Missing OpenAI API key!');

  const feedstock = await AsyncStorage.getItem('feedstock');
  const temperature = await AsyncStorage.getItem('temperature');
  const retentionTime = await AsyncStorage.getItem('retentionTime');
  const status = await AsyncStorage.getItem('status');

  const trendDescription = `Here is a trend of ${gasType} gas values in ppm over time: [${values.join(', ')}]`;

  const systemMessage = {
    role: 'system',
    content: 'You are an expert in biogas reactor monitoring and diagnostics.',
  };

  const userMessage = {
    role: 'user',
    content: `
${trendDescription}

Reactor details:
- Feedstock: ${feedstock || 'unknown'}
- Temperature: ${temperature || 'unknown'}°C
- Retention Time: ${retentionTime || 'unknown'} days
- Current Status: ${status || 'not available'}

${context ? `Additional context: ${context}` : ''}

Please provide a short, practical insight or warning about the reactor's gas behavior and possible biological explanations.
Keep it relevant to this specific gas type and conditions.`,
  };

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, userMessage],
      temperature: 0.4,
      max_tokens: 150,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content.trim();
};
