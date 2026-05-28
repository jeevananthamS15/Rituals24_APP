import {NavigatorScreenParams} from '@react-navigation/native';

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  PujaDetail: {pujaId: string};
  PanditDetail: {panditId: string};
  TempleDetail: {templeId: string};
};

export type StoreStackParamList = {
  StoreMain: undefined;
  ProductDetail: {
    product: any;
    products: any[];
  };
  Cart: undefined;
};

type PujaType = {
  id: string;
  title: string;
  category: string;
  duration: string;
  imageUrl: {
    uri: string;
  };
  originalPrice: number;
  panditsCount: number;
  price: number;
  rating: number;
  reviewCount: number;
};

export type CheckoutStackParamList = {
  ServiceMode: {
    pujaId: string;
    puja: PujaType;
  };

  DateMuhurat: {
    pujaId: string;
    puja: PujaType;
    selectedMode: string;
  };

  PanditSelect: {
    pujaId: string;
    puja: PujaType;
    selectedMode: string;
    selectedDate: number;
    selectedTime: {
      id: string;
      time: string;
      label: string;
    };
  };

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
