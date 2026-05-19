import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';

import { SplashScreen } from '../../features/auth/screens/SplashScreen';
import { AuthNavigator } from './AuthNavigator';

// import { MainNavigator } from './MainNavigator';
// import { CheckoutNavigator } from './CheckoutNavigator';
// import { MuhuratCalendarScreen } from '../../features/muhurat/screens/MuhuratCalendarScreen';
// import { useAuthStore } from '../../features/auth/store/authStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  // const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const isAuthenticated = false;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: {
            backgroundColor: '#000',
          },
        }}
      >
      
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

      
        {!isAuthenticated ? (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
          />
        ) : null}

        {/*
        

        <>
          <Stack.Screen
            name="Main"
            component={MainNavigator}
          />

          <Stack.Screen
            name="Checkout"
            component={CheckoutNavigator}
            options={{
              presentation: 'card',
            }}
          />

          <Stack.Screen
            name="MuhuratCalendar"
            component={MuhuratCalendarScreen}
          />
        </>
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};