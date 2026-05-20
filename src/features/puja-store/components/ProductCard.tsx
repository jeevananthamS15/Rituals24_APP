import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { theme } from '../../../theme';
import { RatingBadge } from '../../../components/ui/RatingBadge';
import { PriceDisplay } from '../../../components/ui/PriceDisplay';
import { Product } from '../../../types';

const CARD_WIDTH = Dimensions.get('window').width * 0.42;

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
      source={{ uri: item.imageUrl }}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.body}>
      <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.itemCount}>{item.itemCount} items included</Text>
      <RatingBadge rating={item.rating} reviewCount={item.reviewCount} />
      <View style={styles.footer}>
        <PriceDisplay price={item.price} originalPrice={item.originalPrice} size="sm" />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => onAdd(item.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>
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
    height: CARD_WIDTH * 0.75,
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
  itemCount: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  addBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.full,
  },
  addText: {
    ...theme.typography.labelSm,
    color: theme.colors.textInverse,
  },
});