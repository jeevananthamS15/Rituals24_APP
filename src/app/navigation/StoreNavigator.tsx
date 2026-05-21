import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StoreStackParamList } from './types';
import { StoreScreen } from '../../features/puja-store/screens/StoreScreen';
import { ProductDetailScreen } from '../../features/puja-store/screens/ProductDetailScreen';

const Stack = createNativeStackNavigator<StoreStackParamList>();

export const StoreNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="StoreMain" component={StoreScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);