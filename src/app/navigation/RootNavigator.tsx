import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {SplashScreen} from '../../features/auth/screens/SplashScreen';
import {AuthNavigator} from './AuthNavigator';
import {MainNavigator} from './MainNavigator';
import { MuhuratCalendarScreen } from '../../features/muhurat/screens/MuhuratCalendarScreen';
//import { BookingNavigator } from './BookingNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [showSplash, setShowSplash] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: {
            backgroundColor: '#000',
          },
        }}>
        
        {showSplash ? (
          <Stack.Screen name="Splash">
            {props => (
              <SplashScreen
                {...props}
                onFinish={() => setShowSplash(false)}
              />
            )}
          </Stack.Screen>
        ) : !isAuthenticated ? (
          <Stack.Screen name="Auth">
            {props => (
              <AuthNavigator
                {...props}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}
          </Stack.Screen>
        ) : (<>
          <Stack.Screen name="Main" component={MainNavigator}/>
          <Stack.Screen name="MuhuratCalendar" component={MuhuratCalendarScreen}/>
          
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};



// <Stack.Screen name="Checkout" component={BookingNavigator} options={{presentation: 'card',}}/>


 