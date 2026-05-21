import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { theme } from '../../../theme';
import { RatingBadge } from '../../../components/ui/RatingBadge';
import { PriceDisplay } from '../../../components/ui/PriceDisplay';
import { Pandit } from '../../../types';

const CARD_WIDTH = 130;

const TIER_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  gold:   { bg: '#DDAB2C', text: '#FFFFFF', label: 'Gold' },
  bronze: { bg: '#B87333', text: '#FFFFFF', label: 'Bronze' },
  silver: { bg: '#D9D9D9', text: '#1A1A1A', label: 'Silver' },
};

interface Props {
  item: Pandit;
  onPress: (id: string) => void;
}

export const PanditCard: React.FC<Props> = ({ item, onPress }) => {
  const tierStyle = TIER_STYLES[item.tier?.toLowerCase() ?? 'silver'];
  const pujaCountBg = tierStyle?.bg ?? '#D9D9D9';
  const pujaCountText = tierStyle?.text ?? '#1A1A1A';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item.id)}
      activeOpacity={0.85}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={[styles.pujaCountBadge, { backgroundColor: pujaCountBg }]}>
          <Text style={[styles.pujaCountText, { color: pujaCountText }]}>
            {item.pujaCount}+ Pujas
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          {tierStyle && (
            <View style={[styles.tierBadge, { backgroundColor: tierStyle.bg }]}>
              <Text style={[styles.tierText, { color: tierStyle.text }]}>
                {tierStyle.label}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{item.years} Years</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{item.languages?.join(', ')}</Text>
        </View>

        <RatingBadge rating={item.rating} reviewCount={item.reviewCount} />

        <PriceDisplay
          price={item.price}
          originalPrice={item.originalPrice}
          size="sm"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#000',
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
    backgroundColor: theme.colors.surfaceElevated,
  },
  pujaCountBadge: {
    position: 'absolute',
    left: 4,
    bottom: 4,
    borderRadius: 30,
    paddingHorizontal: 4,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pujaCountText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
  },
  body: {
    padding: 8,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  name: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 22,
    color: '#281518',
    flex: 1,
  },
  tierBadge: {
    borderRadius: 16,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  tierText: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: { 
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 12,
    color: '#757575',
  },
  metaDot: {
    fontSize: 10,
    color: '#757575',
  },
});