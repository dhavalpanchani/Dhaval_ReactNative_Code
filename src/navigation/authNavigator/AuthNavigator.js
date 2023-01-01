import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';

const AuthStack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName={'Login'}>
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
