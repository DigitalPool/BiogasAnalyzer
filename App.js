import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import GasScreen from './screens/GasScreen';
import DrawerNavigator from './navigation/DrawerNavigator'; // This wraps your Home and drawer routes

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gas"
          component={GasScreen}
          options={{ headerShown: true, title: 'Gas Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
