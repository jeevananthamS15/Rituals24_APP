import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Product } from '../../../types';



const CARD_WIDTH = 130;

interface Props {
  item: Product;
  onPress: (id: string) => void;
  onAdd: (id: string) => void;
}

export const ProductCard: React.FC<Props> = ({ item, onPress, onAdd }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => onPress(item.id)}
    activeOpacity={0.85}
  >
    <Image
      source={item.imageUrl }
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.body}>
      
      <Text style={styles.title} numberOfLines={2}>{item.name}</Text>

  
      <Text style={styles.itemCount}>{item.itemCount} items included</Text>


      <View style={styles.ratingRow}>
        <Text style={styles.star}>⭐</Text>
        <Text style={styles.ratingVal}>{item.rating}</Text>
        <Text style={styles.reviewCount}>({item.reviewCount})</Text>
      </View>

  
      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{item.price?.toLocaleString('en-IN')}</Text>
        <Text style={styles.originalPrice}>₹{item.originalPrice?.toLocaleString('en-IN')}</Text>
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={(e) => { e.stopPropagation?.(); onAdd(item.id); }}
        activeOpacity={0.8}
      >
        <Text style={styles.addIcon}>＋</Text>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
  image: {
    width: CARD_WIDTH,
    height: 160,
    backgroundColor: '#E0E0E0',
  },
  body: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 8,
    gap: 4,
  },

  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 22,
    color: '#281518',
  },
  itemCount: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: '#757575',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  star: {
    fontSize: 11,
    lineHeight: 14,
  },
  ratingVal: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    lineHeight: 18,
    color: '#281518',
  },
  reviewCount: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: '#666666',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#281518',
  },
  originalPrice: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: '#757575',
    textDecorationLine: 'line-through',
  },

  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B000A',
    borderRadius: 12,
    height: 40,
    marginTop: 4,
    gap: 4,
  },
  addIcon: {
    fontSize: 16,
    color: '#FFFAF0',
    lineHeight: 20,
    fontWeight: '400',
  },

  addText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#FFFAF0',
  },
});