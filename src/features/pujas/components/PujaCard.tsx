import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {Puja} from '../../../types';

const CARD_WIDTH = 130;

interface Props {
  item: Puja;
  onPress: (id: string) => void;
}

export const PujaCard = ({item, onPress}: Props) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => onPress(item.id)}
    activeOpacity={0.85}>
    <Image source={item.imageUrl} style={styles.image} resizeMode="cover" />

    <Text style={styles.title} numberOfLines={1}>
      {item.title}
    </Text>

    <View style={styles.metaRow}>
      <Text style={styles.metaText}>{item.duration}</Text>

      <Text style={styles.bullet}> • </Text>

      <Text style={styles.metaText}>{item.panditsCount} pandits</Text>
    </View>

    <View style={styles.ratingRow}>
      <Text style={styles.ratingStar}>★</Text>

      <Text style={styles.ratingValue}>{item.rating}</Text>

      <Text style={styles.ratingCount}>({item.reviewCount})</Text>
    </View>

    <View style={styles.priceRow}>
      <Text style={styles.price}>₹{item.price?.toLocaleString('en-IN')}</Text>

      <Text style={styles.originalPrice}>
        ₹{item.originalPrice?.toLocaleString('en-IN')}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: 12,
    gap: 4,
  },

  image: {
    width: CARD_WIDTH,
    height: 160,
    borderRadius: 16,
    backgroundColor: '#727272',
    marginBottom: 4,
  },

  title: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    color: '#281518',
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  metaText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',

    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    color: '#757575',
  },

  bullet: {
    width: 15,
    height: 12,
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 12,
    color: '#757575',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  ratingStar: {
    fontSize: 12,
    color: '#F3B416',
    lineHeight: 16,
  },

  ratingValue: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',

    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: '#281518',
  },

  ratingCount: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',

    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    color: '#666666',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },

  price: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',

    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: '#281518',
  },

  originalPrice: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',

    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    color: '#757575',
    textDecorationLine: 'line-through',
  },
});
