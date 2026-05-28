import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from './types';

import {SplashScreen} from '../../features/auth/screens/SplashScreen';
import {AuthNavigator} from './AuthNavigator';
import {MainNavigator} from './MainNavigator';
import {BookingNavigator} from './BookingNavigator';

import {AuthProvider, useAuth} from '../providers/AuthProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const {isLoading, isAuthenticated} = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: {
          backgroundColor: '#000',
        },
      }}>
      {!isAuthenticated ? (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
        />
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={MainNavigator}
          />

          <Stack.Screen
            name="Checkout"
            component={BookingNavigator}
            options={{
              presentation: 'card',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </AuthProvider>
  );
};