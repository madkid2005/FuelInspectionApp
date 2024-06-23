import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CalculationScreen from './screens/CalculationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'بازرسی جایگاه‌های سوخت' }}
        />
        <Stack.Screen
          name="Calculations"
          component={CalculationScreen}
          options={{ title: 'محاسبات' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
