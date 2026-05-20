import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList } from './types';

import { OnboardingScreen } from '../../features/auth/screens/OnboardingScreen';
import { LoginScreen } from '../../features/auth/screens/LoginScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

type AuthNavigatorProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({
  setIsAuthenticated,
}) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    
    <Stack.Screen
      name="Onboarding"
      component={OnboardingScreen}
    />

    <Stack.Screen name="Login">
      {props => (
        <LoginScreen
          {...props}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
    </Stack.Screen>

  </Stack.Navigator>
);