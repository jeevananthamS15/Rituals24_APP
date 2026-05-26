import {
  Puja,
  Pandit,
  Temple,
  Product,
  BhajanService,
} from '../types';



export const MOCK_PUJAS: Puja[] = [
  {
    id: 'p1',
    title: 'Satyanarayan Katha',

    imageUrl: require('../../assets/HomeScreen/Puja/pooja8.png'),

    price: 2100,
    originalPrice: 2500,
    rating: 4.9,
    reviewCount: 234,

    duration: '2-3 hours',
    panditsCount: 12,
    category: 'vaishnava',
  },

  {
    id: 'p2',
    title: 'Griha Pravesh Puja',

    imageUrl: require('../../assets/HomeScreen/Puja/pooja5.png'),

    price: 3100,
    originalPrice: 3600,
    rating: 4.8,
    reviewCount: 190,

    duration: '3-4 hours',
    panditsCount: 10,
    category: 'home',
  },

  {
    id: 'p3',
    title: 'Navratri Special Puja',

        imageUrl: require('../../assets/HomeScreen/Puja/pooja6.png'),

    price: 4100,
    originalPrice: 4700,
    rating: 4.9,
    reviewCount: 321,

    duration: '4-5 hours',
    panditsCount: 18,
    category: 'festival',
  },
];



export const MOCK_PANDITS: Pandit[] = [
  {
    id: 'pt1',
    name: 'Pt. Acharya Vivek',

    imageUrl: require('../../assets/HomeScreen/pandit/pandit_1.png'),

    tier: 'gold',

    rating: 4.9,
    reviewCount: 234,

    price: 2100,
    originalPrice: 2500,

    years: 15,

    languages: ['Hindi', 'Sanskrit'],

    pujaCount: 300,
    completedCount: 1200,

    specializations: ['Satyanarayan', 'Muhurat'],
  },

  {
    id: 'pt2',
    name: 'Pt. Suresh Dikshit',

 imageUrl: require('../../assets/HomeScreen/pandit/pandit_2.png'),

    tier: 'silver',

    rating: 4.8,
    reviewCount: 180,

    price: 2500,
    originalPrice: 3000,

    years: 12,

    languages: ['Hindi', 'Tamil'],

    pujaCount: 220,
    completedCount: 950,

    specializations: ['Griha Pravesh'],
  },

  {
    id: 'pt3',
    name: 'Pt. Ramesh Shastri',

   imageUrl: require('../../assets/HomeScreen/pandit/pandit_3.png'),

    tier: 'bronze',

    rating: 4.7,
    reviewCount: 142,

    price: 1800,
    originalPrice: 2200,

    years: 10,

    languages: ['Hindi', 'Telugu'],

    pujaCount: 180,
    completedCount: 700,

    specializations: ['Navratri'],
  },
];


export const MOCK_TEMPLES: Temple[] = [
  {
    id: 't1',

    name: 'Tirupati Balaji',

    subtitle: 'Abhishekam & VIP Darshan',

    location: 'Andhra Pradesh',

     imageUrl: require('../../assets/HomeScreen/temples/tm1.jpg'),

    rating: 4.9,
    reviewCount: 234,
  },

  {
    id: 't2',

    name: 'Kashi Vishwanath',

    subtitle: 'Rudrabhishek & Ganga Aarti',

    location: 'Varanasi, UP',

   imageUrl: require('../../assets/HomeScreen/temples/tm2.jpg'),

    rating: 4.8,
    reviewCount: 190,
  },

  {
    id: 't3',

    name: 'Meenakshi Temple',

    subtitle: 'Archana & Special Darshan',

    location: 'Madurai, TN',

   imageUrl: require('../../assets/HomeScreen/temples/tm3.jpg'),

    rating: 4.9,
    reviewCount: 278,
  },
];



export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'pr1',

    name: 'Satyanarayan Puja Kit',

    itemCount: 21,

     imageUrl: require('../../assets/HomeScreen/StoreKit/pk1.jpg'),

    price: 2100,
    originalPrice: 2600,

    rating: 4.9,
    reviewCount: 234,
  },

  {
    id: 'pr2',

    name: 'Griha Pravesh Essentials',

    itemCount: 35,

     imageUrl: require('../../assets/HomeScreen/StoreKit/pk2.jpg'),

    price: 3100,
    originalPrice: 3600,

    rating: 4.8,
    reviewCount: 182,
  },

  {
    id: 'pr3',

    name: 'Navratri Kit',

    itemCount: 18,

 imageUrl: require('../../assets/HomeScreen/StoreKit/pk3.jpg'),

    price: 1800,
    originalPrice: 2400,

    rating: 4.9,
    reviewCount: 321,
  },
];



export const MOCK_BHAJANS: BhajanService[] = [
  {
    id: 'b1',

    title: 'Traditional Bhajan',

    description:
      'Classical devotional songs with traditional ragas',

   imageUrl: require('../../assets/HomeScreen/Puja/pooja5.png'),

    price: 2100,
    originalPrice: 2600,

    rating: 4.9,
    reviewCount: 234,
  },

  {
    id: 'b2',

    title: 'Devotional Night',

    description:
      'Extended evening kirtan & bhajan experience',

     imageUrl: require('../../assets/HomeScreen/Puja/pooja6.png'),

    price: 3100,
    originalPrice: 3600,

    rating: 4.8,
    reviewCount: 198,
  },

  {
    id: 'b3',

    title: 'Morning Bhakti Session',

    description:
      'Peaceful devotional chanting and spiritual songs',

     imageUrl: require('../../assets/HomeScreen/StoreKit/pk3.jpg'),

    price: 1800,
    originalPrice: 2200,

    rating: 4.9,
    reviewCount: 276,
  },
];