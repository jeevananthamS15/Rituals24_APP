import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface Props {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
}

export const RatingBadge: React.FC<Props> = ({
  rating,
  reviewCount,
  size = 'sm',
}) => (
  <View style={styles.container}>
    <Text style={[styles.star, size === 'md' && styles.starMd]}>⭐</Text>
    <Text style={[styles.rating, size === 'md' && styles.ratingMd]}>
      {rating.toFixed(1)}
    </Text>
    {reviewCount !== undefined && (
      <Text style={styles.count}> ({reviewCount})</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 10,
    marginRight: 2,
  },
  starMd: {
    fontSize: 12,
  },
  rating: {
    ...theme.typography.labelMd,
    color: theme.colors.textPrimary,
  },
  ratingMd: {
    ...theme.typography.labelLg,
  },
  count: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
});