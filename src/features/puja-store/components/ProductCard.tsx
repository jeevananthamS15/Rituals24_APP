import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
} from 'react-native';

import {Product} from '../../../types';

const SCREEN_WIDTH = Dimensions.get('window').width;

const HORIZONTAL_PADDING = 20;
const GAP = 15;

const STORE_CARD_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - GAP) / 2;

const HOME_CARD_WIDTH = 130;

interface Props {
  item: Product;
  onPress: (id: string) => void;
  onAdd: (id: string) => void;
  variant?: 'home' | 'store';
}

export const ProductCard: React.FC<Props> = ({
  item,
  onPress,
  onAdd,
  variant = 'home',
}) => {
  const cardWidth = variant === 'store' ? STORE_CARD_WIDTH : HOME_CARD_WIDTH;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          width: cardWidth,
          marginRight: variant === 'home' ? 12 : 0,
        },
      ]}
      onPress={() => onPress(item.id)}
      activeOpacity={0.85}>
      {/* IMAGE */}
      <Image source={item.imageUrl} style={styles.image} resizeMode="cover" />

      {/* CONTENT */}
      <View style={styles.infoContainer}>
        {/* TOP CONTENT */}
        <View style={styles.topContent}>
          {/* TITLE */}
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {item.name}
          </Text>

          {/* ITEM COUNT */}
          <Text style={styles.itemCount} numberOfLines={1}>
            {item.itemCount} items included
          </Text>

          {/* RATING */}
          <View style={styles.ratingRow}>
            <Text style={styles.star}>★</Text>

            <Text style={styles.ratingVal}>{item.rating}</Text>

            <Text style={styles.reviewCount}>({item.reviewCount})</Text>
          </View>

          {/* PRICE */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ₹{item.price?.toLocaleString('en-IN')}
            </Text>

            <Text style={styles.originalPrice}>
              ₹{item.originalPrice?.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        {/* ADD BUTTON */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={e => {
            e.stopPropagation?.();
            onAdd(item.id);
          }}
          activeOpacity={0.8}>
          <Text style={styles.addIcon}>＋</Text>

          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 160,

    borderRadius: 16,

    backgroundColor: '#E0E0E0',

    marginBottom: 8,
  },

  infoContainer: {
    flex: 1,
  },

  topContent: {
    rowGap: 4,
  },

  /* TITLE */
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',

    fontSize: 14,
    lineHeight: 20,

    color: '#281518',

    height: 40, // FIXED 2 LINES
  },

  /* DESCRIPTION */
  itemCount: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',

    fontSize: 10,
    lineHeight: 12,

    color: '#757575',

    height: 12,
  },

  /* RATING */
  ratingRow: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 2,

    height: 18,
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

    color: '#281518',

    includeFontPadding: false,
  },

  reviewCount: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',

    fontSize: 10,
    lineHeight: 12,

    color: '#666666',

    includeFontPadding: false,
  },

  /* PRICE */
  priceRow: {
    flexDirection: 'row',

    alignItems: 'flex-end',

    gap: 4,

    marginTop: 2,

    height: 24,
  },

  price: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22,

    color: '#281518',

    includeFontPadding: false,
  },

  originalPrice: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',

    fontSize: 10,
    lineHeight: 10,

    color: '#757575',

    textDecorationLine: 'line-through',

    includeFontPadding: false,

    paddingBottom: 3,
  },

  /* BUTTON */
  addBtn: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#2B000A',

    borderRadius: 12,

    height: 40,

    gap: 4,

    marginTop: 12,
  },

  addIcon: {
    fontSize: 18,
    lineHeight: 20,
    color: '#FFFAF0',
    includeFontPadding: false,
  },

  addText: {
    fontFamily: Platform.OS === 'ios' ? 'Roboto' : 'Roboto',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFAF0',
    includeFontPadding: false,
  },
});
