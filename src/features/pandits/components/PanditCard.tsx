import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

import {Pandit} from '../../../types';

const CARD_WIDTH = 130;

const TIER_CONFIG: Record<
  string,
  {
    bg: string;
    textColor: string;
    badgeBg: string;
    badgeName: string;
  }
> = {
  gold: {
    bg: '#DDAB2C',
    textColor: '#FFFFFF',
    badgeBg: '#DDAB2C',
    badgeName: 'Gold',
  },

  bronze: {
    bg: '#B87333',
    textColor: '#FFFFFF',
    badgeBg: '#B87333',
    badgeName: 'Bronze',
  },

  silver: {
    bg: '#D9D9D9',
    textColor: '#1A1A1A',
    badgeBg: '#D9D9D9',
    badgeName: 'Silver',
  },
};

interface Props {
  item: Pandit;
  onPress: (id: string) => void;
}

export const PanditCard: React.FC<Props> = ({item, onPress}) => {
  const tierKey = (item.tier || 'silver').toLowerCase();

  const tier = TIER_CONFIG[tierKey] ?? TIER_CONFIG.silver;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item.id)}
      activeOpacity={0.85}>
      {/* IMAGE SECTION */}
      <View style={styles.imageContainer}>
        <Image source={item.imageUrl} style={styles.image} resizeMode="cover" />

        <View
          style={[
            styles.pujasBadge,
            {
              backgroundColor: tier.bg,
            },
          ]}>
          <Text
            style={[
              styles.pujasBadgeText,
              {
                color: tier.textColor,
              },
            ]}>
            ✓ {item.pujaCount}+ Pujas
          </Text>
        </View>
      </View>

      {/* INFO SECTION */}
      <View style={styles.infoContainer}>
        <View style={styles.topContent}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{item.years} Years</Text>

            <Text style={styles.bullet}>•</Text>

            <Text style={styles.metaText} numberOfLines={1}>
              {item.languages?.join(', ')}
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.star}>★</Text>

            <Text style={styles.ratingVal}>{item.rating}</Text>

            <Text style={styles.reviewCount}>({item.reviewCount})</Text>

            <View
              style={[
                styles.tierPill,
                {
                  backgroundColor: tier.badgeBg,
                },
              ]}>
              <Text
                style={[
                  styles.tierText,
                  {
                    color: tier.textColor,
                  },
                ]}>
                {tier.badgeName}
              </Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ₹{item.price?.toLocaleString('en-IN')}
            </Text>

            <Text style={styles.originalPrice}>
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

  imageContainer: {
    width: CARD_WIDTH,
    height: 160,
    position: 'relative',
    marginBottom: 6,
  },

  image: {
    width: CARD_WIDTH,
    height: 160,

    borderRadius: 16,

    backgroundColor: '#E0E0E0',
  },

  pujasBadge: {
    position: 'absolute',

    left: 4,
    bottom: 4,

    height: 20,

    borderRadius: 30,

    paddingHorizontal: 6,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pujasBadgeText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_600SemiBold',

    fontSize: 10,
    lineHeight: 14,
  },

  infoContainer: {
    paddingTop: 2,
  },

  topContent: {
    gap: 4,
  },

  name: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 22,

    color: '#281518',

    minHeight: 22,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 4,
  },

  metaText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',

    fontSize: 10,
    lineHeight: 12,

    color: '#757575',
  },

  bullet: {
    fontSize: 10,
    lineHeight: 12,

    color: '#757575',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 2,

    flexWrap: 'wrap',
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
  },

  reviewCount: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',

    fontSize: 10,
    lineHeight: 12,

    color: '#666666',
  },

  tierPill: {
    borderRadius: 16,

    paddingHorizontal: 6,
    paddingVertical: 2,

    marginLeft: 4,
  },

  tierText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',

    fontSize: 10,
    lineHeight: 12,
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

    color: '#281518',

    includeFontPadding: false,
  },

  originalPrice: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',

    fontSize: 10,
    lineHeight: 10,

    color: '#757575',

    textDecorationLine: 'line-through',

    includeFontPadding: false,

    paddingBottom: 3,
  },
});
