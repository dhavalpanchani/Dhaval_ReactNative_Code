import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from '../../screens/dashBoard/DashBoard';

const AppStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName={'DashBoard'}>
        <AppStack.Screen
          name="DashBoard"
          component={DashBoard}
          options={{ headerTitleAlign: 'center' }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
