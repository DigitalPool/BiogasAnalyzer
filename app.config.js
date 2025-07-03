// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'biogas-mobile-app',
    slug: 'biogas-mobile-app',
    extra: {
      channelId: process.env.THINGSPEAK_CHANNEL_ID,
      readApiKey: process.env.THINGSPEAK_READ_API_KEY,
      openAiKey: process.env.OPENAI_API_KEY,
    },
  },
};
