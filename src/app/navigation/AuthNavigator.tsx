import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { OnboardingScreen } from '../../features/auth/screens/OnboardingScreen';
import { LoginScreen } from '../../features/auth/screens/LoginScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator= () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);