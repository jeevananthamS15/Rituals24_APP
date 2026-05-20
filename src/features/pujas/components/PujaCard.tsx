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
import { Puja } from '../../../types';

const CARD_WIDTH = Dimensions.get('window').width * 0.44;

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
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <RatingBadge rating={item.rating} reviewCount={item.reviewCount} />
      <PriceDisplay price={item.price} originalPrice={item.originalPrice} size="sm" />
      <View style={styles.meta}>
        <Text style={styles.metaText}>⏱ {item.duration}</Text>
        <Text style={styles.metaText}>👤 {item.panditsCount} pandits</Text>
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
    height: CARD_WIDTH * 0.65,
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
  meta: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  metaText: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
});