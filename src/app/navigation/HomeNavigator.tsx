import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';
import { HomeScreen } from '../../features/home/screens/HomeScreen';
// import { PujaDetailScreen } from '../../features/pujas/screens/PujaDetailScreen';
import VerifiedPanditsScreen from '../../features/home/screens/verify';
const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator= () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={VerifiedPanditsScreen} />
    <Stack.Screen name="PujaDetail" component={()=>""} />
  </Stack.Navigator>
);