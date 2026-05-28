import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

import {BhajanService} from '../../../types';

const CARD_WIDTH = 130;

interface Props {
  item: BhajanService;
  onPress: (id: string) => void;
  variant?: 'home' | 'store';
}

export const BhajanCard: React.FC<Props> = ({
  item,
  onPress,
  variant = 'store',
}) => {
  const colors =
    variant === 'store'
      ? {
          title: '#FFFFFF',
          rating: '#FFFFFF',
          price: '#FFFFFF',
          secondary: '#FFFFFFBF',
        }
      : {
          title: '#281518',
          rating: '#281518',
          price: '#281518',
          secondary: '#757575',
        };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item.id)}
      activeOpacity={0.85}>
      {/* IMAGE SECTION */}
      <Image source={item.imageUrl} style={styles.image} resizeMode="cover" />

      {/* INFO SECTION */}
      <View style={styles.infoContainer}>
        <View style={styles.topContent}>
          {/* TITLE */}
          <Text style={[styles.title, {color: colors.title}]} numberOfLines={1}>
            {item.title}
          </Text>

          {/* DESCRIPTION */}
          <Text
            style={[styles.desc, {color: colors.secondary}]}
            numberOfLines={2}>
            {item.description}
          </Text>

          {/* RATING */}
          <View style={styles.ratingRow}>
            <Text style={styles.star}>★</Text>

            <Text style={[styles.ratingVal, {color: colors.rating}]}>
              {item.rating}
            </Text>

            <Text style={[styles.reviewCount, {color: colors.secondary}]}>
              ({item.reviewCount})
            </Text>
          </View>

          {/* PRICE */}
          <View style={styles.priceRow}>
            <Text style={[styles.price, {color: colors.price}]}>
              ₹{item.price?.toLocaleString('en-IN')}
            </Text>

            <Text style={[styles.originalPrice, {color: colors.secondary}]}>
              ₹{item.originalPrice?.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: 12,
  },

  image: {
    width: CARD_WIDTH,
    height: 160,

    borderRadius: 16,

    backgroundColor: '#E0E0E0',

    marginBottom: 6,
  },

  infoContainer: {
    paddingTop: 2,
  },

  topContent: {
    gap: 4,
  },

  title: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',

    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'bold',
    minHeight: 22,
  },

  desc: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',

    fontSize: 10,
    lineHeight: 12,

    minHeight: 24,
  },

  ratingRow: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 2,
  },

  star: {
    fontSize: 11,
    lineHeight: 14,

    color: '#F3B416',
  },

  ratingVal: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 18,
  },

  reviewCount: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',

    fontSize: 10,
    lineHeight: 18,
  },

  priceRow: {
    flexDirection: 'row',

    alignItems: 'flex-end',

    gap: 4,

    marginTop: 2,
  },

  price: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22,

    includeFontPadding: false,
  },

  originalPrice: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',

    fontSize: 10,
    lineHeight: 10,

    textDecorationLine: 'line-through',

    includeFontPadding: false,

    paddingBottom: 3,
  },
});
