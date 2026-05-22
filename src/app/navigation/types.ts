import { NavigatorScreenParams } from '@react-navigation/native';


export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  PujaDetail: { pujaId: string };
  PanditDetail: { panditId: string };
  TempleDetail: { templeId: string };
};


export type StoreStackParamList = {
  StoreMain: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
};


export type CheckoutStackParamList = {
  ServiceMode: { pujaId: string };
  DateMuhurat: undefined;
  PanditSelect: undefined;
  AddOns: undefined;
  Payment: undefined;
};


export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Explore: undefined;
  Store: NavigatorScreenParams<StoreStackParamList>;
  Booking: undefined;
  Profile: undefined;
  MuhuratCalendar: undefined;
};


export type RootStackParamList = {
  Splash: undefined;  
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Checkout: NavigatorScreenParams<CheckoutStackParamList>;
};