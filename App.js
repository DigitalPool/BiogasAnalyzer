import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // ✅ this is good
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import GasScreen from './screens/GasScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Gas" component={GasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
