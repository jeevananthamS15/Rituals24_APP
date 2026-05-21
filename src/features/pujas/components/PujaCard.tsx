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
import { Puja } from '../../../types';


const CARD_WIDTH = 130;

interface Props {
  item: Puja;
  onPress: (id: string) => void;
}

export const PujaCard: React.FC<Props> = ({ item, onPress }) => (
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

      {/* Meta: duration + pandits count */}
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>⏱ {item.duration}</Text>
        <Text style={styles.metaDot}>·</Text>
        <Text style={styles.metaText}>👤 {item.panditsCount} pandits</Text>
      </View>

      {/* Rating */}
      <RatingBadge rating={item.rating} reviewCount={item.reviewCount} />

      {/* Price */}
      <PriceDisplay
        price={item.price}
        originalPrice={item.originalPrice}
        size="sm"
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    // Figma: Soft Card Shadow: 0px 4px 20px rgba(0,0,0,0.06)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
  image: {
    width: CARD_WIDTH,
    height: 160,
    backgroundColor: theme.colors.surfaceElevated,
  },
  body: {
    padding: 8,
    gap: 4,
  },
  title: {
    // BODY: Lato Bold 14px / 22px, color #281518
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 22,
    color: '#281518',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    // small caption: Inter Regular 10px / 12px, #757575
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