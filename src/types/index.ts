import {ImageSourcePropType} from 'react-native';

export type PujaMode =
  | 'home_visit'
  | 'temple'
  | 'online'
  | 'virtual';

export type BookingStatus =
  | 'upcoming'
  | 'active'
  | 'completed'
  | 'cancelled';

export type PanditTier =
  | 'gold'
  | 'silver'
  | 'bronze';

export interface Puja {
  id: string;
  title: string;

  imageUrl: ImageSourcePropType;

  price: number;
  originalPrice: number;

  rating: number;
  reviewCount: number;

  duration: string;
  panditsCount: number;

  category: string;
}

export interface Pandit {
  id: string;
  name: string;

  imageUrl: ImageSourcePropType;

  tier: PanditTier;

  rating: number;
  reviewCount: number;

  price: number;
  originalPrice: number;

  years: number;

  languages: string[];

  pujaCount: number;
  completedCount: number;

  specializations: string[];
}

export interface Temple {
  id: string;

  name: string;
  subtitle: string;
  location: string;

  imageUrl: ImageSourcePropType;

  rating: number;
  reviewCount: number;
}

export interface Product {
  id: string;

  name: string;
  itemCount: number;

  imageUrl: ImageSourcePropType;

  price: number;
  originalPrice: number;

  rating: number;
  reviewCount: number;
}

export interface BhajanService {
  id: string;

  title: string;
  description: string;

  imageUrl: ImageSourcePropType;

  price: number;
  originalPrice: number;

  rating: number;
  reviewCount: number;
}

export interface Booking {
  id: string;

  pujaTitle: string;

  imageUrl: ImageSourcePropType;

  status: BookingStatus;

  date: string;
  time: string;

  panditName: string;

  price: number;

  mode: PujaMode;

  otp?: string;
}

export interface MuhuratSlot {
  id: string;

  name: string;

  startTime: string;
  endTime: string;

  type:
    | 'auspicious'
    | 'rahu_kalam'
    | 'festival';
}