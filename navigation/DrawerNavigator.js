// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import your screens
import HomeScreen from '../screens/HomeScreen';
import GasTypesScreen from '../screens/GasTypesScreen';
import AIInsightsScreen from '../screens/AIInsightsScreen';
import ExportDataScreen from '../screens/ExportDataScreen';
import ReactorProfileScreen from '../screens/ReactorProfileScreen';
import CalibrationScreen from '../screens/CalibrationScreen';
import ThingSpeakSettingsScreen from '../screens/ThingSpeakSettingsScreen';
import AppInfoScreen from '../screens/AppInfoScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home Dashboard">
      <Drawer.Screen name="🏠 Home Dashboard" component={HomeScreen} />
      <Drawer.Screen name="📈 Gas Types" component={GasTypesScreen} />
      <Drawer.Screen name="🧠 AI Insights History" component={AIInsightsScreen} />
      <Drawer.Screen name="📤 Export Data" component={ExportDataScreen} />
      <Drawer.Screen name="⚙️ Reactor Profile" component={ReactorProfileScreen} />
      <Drawer.Screen name="🧪 Calibration & Units" component={CalibrationScreen} />
      <Drawer.Screen name="📡 ThingSpeak Settings" component={ThingSpeakSettingsScreen} />
      <Drawer.Screen name="🔐 Account / App Info" component={AppInfoScreen} />
    </Drawer.Navigator>
  );
}
