import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CheckoutStackParamList } from './types';
import { ServiceModeScreen } from '../../features/checkout/screens/ServiceModeScreen';
import { DateMuhuratScreen } from '../../features/checkout/screens/DateMuhuratScreen';
import { PanditSelectScreen } from '../../features/checkout/screens/PanditSelectScreen';
import { AddOnsScreen } from '../../features/checkout/screens/AddOnsScreen';
import { PaymentScreen } from '../../features/checkout/screens/PaymentScreen';

const Stack = createNativeStackNavigator<CheckoutStackParamList>();

export const BookingNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ServiceMode" component={ServiceModeScreen} />
    <Stack.Screen name="DateMuhurat" component={DateMuhuratScreen} />
    <Stack.Screen name="PanditSelect" component={PanditSelectScreen} />
    <Stack.Screen name="AddOns" component={AddOnsScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
  </Stack.Navigator>
);