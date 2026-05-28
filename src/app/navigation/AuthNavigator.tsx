import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthStackParamList} from './types';

import {OnboardingScreen} from '../../features/auth/screens/OnboardingScreen';
import {LoginScreen} from '../../features/auth/screens/LoginScreen';
import {SignupScreen} from '../../features/auth/screens/SignupScreen';

import {useAuth} from '../providers/AuthProvider';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  const {onboardingSeen} = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!onboardingSeen && (
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
        />
      )}

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Signup"
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
};