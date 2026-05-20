import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { HomeNavigator } from './HomeNavigator';
import { ExploreScreen } from '../../features/home/screens/ExploreScreen';
// import { StoreNavigator } from './StoreNavigator';
// import { MyBookingsScreen } from '../../features/bookings/screens/MyBookingsScreen';
import { ProfileScreen } from '../../features/profile/screens/ProfileScreen';
import { BottomTabBar } from '../../components/layout/BottomTabBar';


const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator: React.FC = () => (
  <Tab.Navigator
    tabBar={props => <BottomTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Explore" component={ExploreScreen} />
    <Tab.Screen name="Store" component={()=>""} />
    <Tab.Screen name="Booking" component={()=>""} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);