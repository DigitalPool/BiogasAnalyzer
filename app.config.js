// app.config.js
import 'dotenv/config';
import { version } from 'react';

export default {
  expo: {
    name: 'biogas-mobile-app',
    slug: 'biogas-mobile-app',
    version: "1.0.0",
    extra: {
      eas: {
        projectId: 'ec31b4d2-41b9-4af4-9d6a-ef0ea0d59608'
      },
      channelId: process.env.THINGSPEAK_CHANNEL_ID,
      readApiKey: process.env.THINGSPEAK_READ_API_KEY,
      openAiKey: process.env.OPENAI_API_KEY,
    },
    ios: {
      bundleIdentifier: 'com.shobaz.biogasanalyzer'
    },
    android: {
      package: 'com.shobaz.biogasanalyzer'
    },
  }
}