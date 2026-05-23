import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Pandit } from '../../../types';



const CARD_WIDTH = 130;

const TIER_CONFIG: Record<string, { bg: string; textColor: string; badgeBg: string; badgeName: string }> = {
  gold:   { bg: '#DDAB2C', textColor: '#FFFFFF', badgeBg: '#DDAB2C', badgeName: 'Gold' },
  bronze: { bg: '#B87333', textColor: '#FFFFFF', badgeBg: '#B87333', badgeName: 'Bronze' },
  silver: { bg: '#D9D9D9', textColor: '#1A1A1A', badgeBg: '#D9D9D9', badgeName: 'Silver' },
};

interface Props {
  item: Pandit;
  onPress: (id: string) => void;
}

export const PanditCard: React.FC<Props> = ({ item, onPress }) => {
  const tierKey = (item.tier || 'silver').toLowerCase();
  const tier = TIER_CONFIG[tierKey] ?? TIER_CONFIG.silver;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item.id)}
      activeOpacity={0.85}
    >

      <View style={styles.imageContainer}>
        <Image
          source={ item.imageUrl}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={[styles.pujasBadge, { backgroundColor: tier.bg }]}>
          <Text style={[styles.pujasBadgeText, { color: tier.textColor }]}>
            ✓ {item.pujaCount}+ Pujas
          </Text>
        </View>
      </View>


      <View style={styles.body}>
 
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>


        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{item.years} Years</Text>
          <Text style={styles.bullet}> • </Text>
          <Text style={styles.metaText} numberOfLines={1}>{item.languages?.join(', ')}</Text>
        </View>


        <View style={styles.ratingRow}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.ratingVal}>{item.rating}</Text>
          <Text style={styles.reviewCount}>({item.reviewCount})</Text>

          <View style={[styles.tierPill, { backgroundColor: tier.badgeBg }]}>
            <Text style={[styles.tierText, { color: tier.textColor }]}>
              {tier.badgeName}
            </Text>
          </View>
        </View>


        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price?.toLocaleString('en-IN')}</Text>
          <Text style={styles.originalPrice}>₹{item.originalPrice?.toLocaleString('en-IN')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
  imageContainer: {
    width: CARD_WIDTH,
    height: 160,
    position: 'relative',
  },
  image: {
    width: CARD_WIDTH,
    height: 160,
    backgroundColor: '#E0E0E0',
  },

  pujasBadge: {
    position: 'absolute',
    left: 4,
    top: 136,
    height: 20,
    borderRadius: 30,
    paddingHorizontal: 4,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pujasBadgeText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
  },
  body: {
    padding: 8,
    gap: 4,
  },
  name: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 22,
    color: '#281518',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: '#757575',
  },
  bullet: {
    fontFamily: 'Inter',
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

  tierPill: {
    borderRadius: 16,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  tierText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
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