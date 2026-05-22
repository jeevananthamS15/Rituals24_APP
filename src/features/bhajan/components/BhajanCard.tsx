import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { BhajanService } from '../../../types';


const CARD_WIDTH = 130;

interface Props {
  item: BhajanService;
  onPress: (id: string) => void;
}

export const BhajanCard: React.FC<Props> = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => onPress(item.id)}
    activeOpacity={0.85}
  >
    <Image
      source={{ uri: item.imageUrl }}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.body}>
      {/* Title */}
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>

      {/* Description — wraps 2 lines per screenshot */}
      <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <Text style={styles.star}>⭐</Text>
        <Text style={styles.ratingVal}>{item.rating}</Text>
        <Text style={styles.reviewCount}>({item.reviewCount})</Text>
      </View>

      {/* Price */}
      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{item.price?.toLocaleString('en-IN')}</Text>
        <Text style={styles.originalPrice}>₹{item.originalPrice?.toLocaleString('en-IN')}</Text>
      </View>
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
    padding: 8,
    gap: 4,
  },
  // Lato Bold 14/22 #281518
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 22,
    color: '#281518',
  },

  desc: {
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
});