import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image, Dimensions,
} from 'react-native';
import { theme } from '../../../theme';
import { RatingBadge } from '../../../components/ui/RatingBadge';
import { PriceDisplay } from '../../../components/ui/PriceDisplay';
import { BhajanService } from '../../../types';

const CARD_WIDTH = Dimensions.get('window').width * 0.60;

interface Props {
  item: BhajanService;
  onPress: (id: string) => void;
}

export const BhajanCard: React.FC<Props> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(item.id)} activeOpacity={0.85}>
    <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
    <View style={styles.body}>
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
      <RatingBadge rating={item.rating} reviewCount={item.reviewCount} />
      <PriceDisplay price={item.price} originalPrice={item.originalPrice} size="sm" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    marginRight: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.card,
  },
  image: {
    width: '100%',
    height: CARD_WIDTH * 0.6,
    backgroundColor: theme.colors.surfaceElevated,
  },
  body: {
    padding: theme.spacing.cardPadding,
    gap: theme.spacing.xs,
  },
  title: {
    ...theme.typography.labelLg,
    color: theme.colors.textPrimary,
  },
  desc: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
});