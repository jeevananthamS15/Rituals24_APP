import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
};

// Home Stack
export type HomeStackParamList = {
  HomeMain: undefined;
  PujaDetail: { pujaId: string };
  PanditDetail: { panditId: string };
  TempleDetail: { templeId: string };
};

// Store Stack
export type StoreStackParamList = {
  StoreMain: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
};

// Booking Stack (checkout flow)
export type CheckoutStackParamList = {
  ServiceMode: { pujaId: string };
  DateMuhurat: undefined;
  PanditSelect: undefined;
  AddOns: undefined;
  Payment: undefined;
};

// Bottom Tab
export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Explore: undefined;
  Store: NavigatorScreenParams<StoreStackParamList>;
  Booking: undefined;
  Profile: undefined;
};

// Root
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Checkout: NavigatorScreenParams<CheckoutStackParamList>;
  MuhuratCalendar: undefined;
};