import axios from 'axios';

export async function fetchGasLatestValue(channelId, readApiKey, fieldNum) {
  try {
    const response = await axios.get(
      `https://api.thingspeak.com/channels/${channelId}/fields/${fieldNum}/last.json?api_key=${readApiKey}`
    );
    return parseFloat(response.data[`field${fieldNum}`]);
  } catch (err) {
    console.error(`Error fetching field ${fieldNum}:`, err);
    return null;
  }
}

export async function fetchGasDataHistory(channelId, readApiKey, fieldNum) {
  try {
    const url = `https://api.thingspeak.com/channels/${channelId}/fields/${fieldNum}.json?api_key=${readApiKey}&results=100`;
    const response = await axios.get(url);

    return response.data.feeds.map(feed => ({
      time: feed.created_at,
      value: parseFloat(feed[`field${fieldNum}`]),
    })).filter(d => !isNaN(d.value));
  } catch (err) {
    console.error(`Error fetching history for field ${fieldNum}`, err);
    return [];
  }
}
