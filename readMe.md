
npm install -g expo-cli

expo init biogas-mobile-app
cd biogas-mobile-app

npm install axios react-native-svg react-native-chart-kit react-navigation react-navigation-stack @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler

mkdir -p screens components utils && touch screens/{SplashScreen.js,HomeScreen.js,GasScreen.js} components/{GasCard.js,PieChart.js} utils/fetchThingSpeakData.js App.js