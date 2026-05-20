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
import { Temple } from '../../../types';

const CARD_WIDTH = Dimensions.get('window').width * 0.56;

interface Props {
  item: Temple;
  onPress: (id: string) => void;
}

export const TempleCard: React.FC<Props> = ({ item, onPress }) => (
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
    <View style={styles.overlay}>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
      <View style={styles.footer}>
        <Text style={styles.location}>📍 {item.location}</Text>
        <RatingBadge rating={item.rating} />
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.85,
    borderRadius: theme.radii.md,
    marginRight: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.card,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.surfaceElevated,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlay,
    padding: theme.spacing.cardPadding,
    justifyContent: 'flex-end',
  },
  name: {
    ...theme.typography.h4,
    color: theme.colors.textInverse,
  },
  subtitle: {
    ...theme.typography.caption,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  location: {
    ...theme.typography.caption,
    color: 'rgba(255,255,255,0.9)',
  },
});