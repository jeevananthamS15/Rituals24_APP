import { api } from "./api";

const transformPuja = (item: any) => ({
  id: item._id,

  title: item.name || 'Sacred Puja',

imageUrl: {
  uri:
    item.images?.[0] ||
    item.image ||
    'https://via.placeholder.com/300',
},

  price: item.price || 0,

  originalPrice: (item.price || 0) + 500,

  rating: item.rating || 4.5,

  reviewCount: 120,

  duration: item.duration
    ? `1-${item.duration} hours`
    : '2 hours',

  panditsCount: item.panditCount || 5,

  category: item.category || 'spiritual',
});



const transformProduct = (item: any) => ({
  id: item._id,

  name: item.name || 'Puja Kit',

  itemCount: item.items?.length || 10,

  imageUrl: {
    uri:
      item.images?.[0] ||
      'https://via.placeholder.com/300',
  },

  price: item.selling_price || 0,

  originalPrice:
    item.cost_price ||
    (item.selling_price || 0) + 500,

  rating: item.rating || 4.5,

  reviewCount: 100,
});

const transformPandit = (item: any) => ({
  id: item._id,

  name: item.name || 'Pandit Ji',

  imageUrl: {
    uri:
      item.panditDetails?.profile_photo ||
      'https://via.placeholder.com/300',
  },

  tier:
    item.verificationStatus === 'verified'
      ? 'gold'
      : 'silver',

  rating: 4.8,

  reviewCount: 120,

  price:
    item.panditDetails?.price || 0,

  originalPrice:
    (item.panditDetails?.price || 0) + 500,

  years:
    item.panditDetails?.years_of_experience || 5,

  languages:
    item.panditDetails?.languages_spoken || [
      'Hindi',
    ],

  pujaCount: 150,

  completedCount: 500,

  specializations:
    item.panditDetails?.specialization
      ? [item.panditDetails.specialization]
      : ['Puja Services'],
});

const transformTemple = (item: any) => ({
  id: item._id,

  name: item.name || 'Sacred Temple',

  subtitle:
    item.special_poojas?.[0]?.name ||
    item.description ||
    'Special Darshan & Pooja',

  location: item.state || 'India',

  imageUrl: {
    uri:
      item.images?.[0] ||
      'https://via.placeholder.com/300',
  },

  rating: item.rating || 4.5,

  reviewCount: 120,
});

const transformBhajan = (item: any) => ({
  id: item._id,

  title: item.name || 'Divine Bhajan',

  description:
    item.description ||
    'Spiritual devotional bhajans',

  imageUrl: {
    uri:
      item.images?.[0] ||
      'https://via.placeholder.com/300',
  },

  price: 2100,

  originalPrice: 2600,

  rating: item.rating || 4.5,

  reviewCount: 120,
});



export const getHomeData = async () => {
  const [
    pujas,
    pandits,
    temples,
    products,
    bhajans,
  ] = await Promise.all([
    api.get('/pujas'),
    api.get('/pandits'),
    api.get('/temples'),
    api.get('/puja-kits'),
    api.get('/bhajans'),
  ]);

  return {
    pujas: pujas.data.result.map(transformPuja),

    pandits: pandits.data.result.map(transformPandit),

    temples: temples.data.result.map(transformTemple),

    products: products.data.result.map(transformProduct),

    bhajans: bhajans.data.result.map(transformBhajan),
  };
};