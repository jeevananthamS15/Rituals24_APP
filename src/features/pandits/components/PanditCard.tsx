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
import { TierBadge } from '../../../components/ui/Badge';
import { Pandit } from '../../../types';

const CARD_WIDTH = Dimensions.get('window').width * 0.44;

interface Props {
  item: Pandit;
  onPress: (id: string) => void;
}

export const PanditCard: React.FC<Props> = ({ item, onPress }) => (
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
      <View style={styles.row}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <TierBadge tier={item.tier} />
      </View>
      <RatingBadge rating={item.rating} reviewCount={item.reviewCount} />
      <Text style={styles.meta}>{item.years} Yrs · {item.languages.join(', ')}</Text>
      <Text style={styles.pujaCount}>{item.pujaCount}+ Pujas</Text>
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
    height: CARD_WIDTH * 0.75,
    backgroundColor: theme.colors.surfaceElevated,
  },
  body: {
    padding: theme.spacing.cardPadding,
    gap: theme.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    ...theme.typography.labelLg,
    color: theme.colors.textPrimary,
    flex: 1,
    marginRight: theme.spacing.xs,
  },
  meta: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  pujaCount: {
    ...theme.typography.caption,
    color: theme.colors.gold,
    fontWeight: '600',
  },
});