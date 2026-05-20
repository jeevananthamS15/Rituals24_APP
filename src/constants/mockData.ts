import { Puja, Pandit, Temple, Product, BhajanService } from '../types';

const IMAGE = (seed: number) =>
  `https://picsum.photos/seed/ritual${seed}/300/200`;

export const MOCK_PUJAS: Puja[] = [
  {
    id: 'p1', title: 'Satyanarayan Katha', imageUrl: IMAGE(1),
    price: 2100, originalPrice: 2100, rating: 4.9, reviewCount: 234,
    duration: '2-3 hours', panditsCount: 12, category: 'vaishnava',
  },
  {
    id: 'p2', title: 'Griha Pravesh Puja', imageUrl: IMAGE(2),
    price: 2100, originalPrice: 2100, rating: 4.9, reviewCount: 234,
    duration: '2-3 hours', panditsCount: 12, category: 'home',
  },
  {
    id: 'p3', title: 'Navratri Puja', imageUrl: IMAGE(3),
    price: 2100, originalPrice: 2100, rating: 4.9, reviewCount: 234,
    duration: '2-3 hours', panditsCount: 12, category: 'festival',
  },
];

export const MOCK_PANDITS: Pandit[] = [
  {
    id: 'pt1', name: 'Pt. Acharya Vivek', imageUrl: IMAGE(10),
    tier: 'gold', rating: 4.9, reviewCount: 234, price: 2100, originalPrice: 2100,
    years: 15, languages: ['Hindi', 'Sanskrit'], pujaCount: 300,
    completedCount: 1200, specializations: ['Satyanarayan', 'Muhurat'],
  },
  {
    id: 'pt2', name: 'Pt. Suresh Dikshit', imageUrl: IMAGE(11),
    tier: 'bronze', rating: 4.9, reviewCount: 234, price: 2100, originalPrice: 2100,
    years: 15, languages: ['Hindi', 'Sanskrit'], pujaCount: 200,
    completedCount: 800, specializations: ['Griha Pravesh'],
  },
  {
    id: 'pt3', name: 'Pt. Ramesh Shastri', imageUrl: IMAGE(12),
    tier: 'silver', rating: 4.9, reviewCount: 234, price: 2100, originalPrice: 2100,
    years: 15, languages: ['Hindi', 'Sanskrit'], pujaCount: 100,
    completedCount: 400, specializations: ['Navratri'],
  },
];

export const MOCK_TEMPLES: Temple[] = [
  {
    id: 't1', name: 'Tirupati Balaji', subtitle: 'Abhishekam & VIP Darshan',
    location: 'Andhra Pradesh', imageUrl: IMAGE(20),
    rating: 4.9, reviewCount: 234,
  },
  {
    id: 't2', name: 'Kashi Vishwanath', subtitle: 'Rudrabhishek & Ganga Aarti',
    location: 'Varanasi, UP', imageUrl: IMAGE(21),
    rating: 4.9, reviewCount: 234,
  },
  {
    id: 't3', name: 'Meenakshi Temple', subtitle: 'Archana & Special Darshan',
    location: 'Madurai, TN', imageUrl: IMAGE(22),
    rating: 4.9, reviewCount: 234,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'pr1', name: 'Satyanarayan Puja Kit', itemCount: 21,
    imageUrl: IMAGE(30), price: 2100, originalPrice: 2100,
    rating: 4.9, reviewCount: 234,
  },
  {
    id: 'pr2', name: 'Griha Pravesh Essentials', itemCount: 35,
    imageUrl: IMAGE(31), price: 2100, originalPrice: 2100,
    rating: 4.9, reviewCount: 234,
  },
  {
    id: 'pr3', name: 'Navratri Special Kit', itemCount: 18,
    imageUrl: IMAGE(32), price: 2100, originalPrice: 2100,
    rating: 4.9, reviewCount: 234,
  },
];

export const MOCK_BHAJANS: BhajanService[] = [
  {
    id: 'b1', title: 'Traditional Bhajan',
    description: 'Classical devotional songs with traditional ragas',
    imageUrl: IMAGE(40), price: 2100, originalPrice: 2100,
    rating: 4.9, reviewCount: 234,
  },
  {
    id: 'b2', title: 'Devotional Night',
    description: 'Extended evening kirtan & bhajan experience',
    imageUrl: IMAGE(41), price: 2100, originalPrice: 2100,
    rating: 4.9, reviewCount: 234,
  },
];