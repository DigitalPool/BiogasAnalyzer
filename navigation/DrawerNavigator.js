import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// Screens
import HomeScreen from '../screens/HomeScreen';
import AIInsightsScreen from '../screens/AIInsightsScreen';
import ExportDataScreen from '../screens/ExportDataScreen';
import ReactorProfileScreen from '../screens/ReactorProfileScreen';
import CalibrationScreen from '../screens/CalibrationScreen';
import ThingSpeakSettingsScreen from '../screens/ThingSpeakSettingsScreen';
import AppInfoScreen from '../screens/AppInfoScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
      <View style={styles.footer}>
        <Image
          source={require('../assets/brtlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.footerText}>Built by BioResources and Technology Division, FTZ, CZU</Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home Dashboard" component={HomeScreen} />
      <Drawer.Screen name="All Gas Insights" component={AIInsightsScreen} />
      <Drawer.Screen name="Export Data" component={ExportDataScreen} />
      <Drawer.Screen name="Reactor Profile" component={ReactorProfileScreen} />
      <Drawer.Screen name="Calibration & Units" component={CalibrationScreen} />
      <Drawer.Screen name="ThingSpeak Settings" component={ThingSpeakSettingsScreen} />
      <Drawer.Screen name="Account / App Info" component={AppInfoScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
});
