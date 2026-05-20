import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface Props {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  prefix?: string;
}

export const PriceDisplay: React.FC<Props> = ({
  price,
  originalPrice,
  size = 'md',
  prefix = '₹',
}) => (
  <View style={styles.container}>
    <Text style={[styles.price, styles[`price_${size}`]]}>
      {prefix}{price.toLocaleString('en-IN')}
    </Text>
    {originalPrice && originalPrice !== price && (
      <Text style={[styles.original, styles[`original_${size}`]]}>
        {prefix}{originalPrice.toLocaleString('en-IN')}
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: theme.spacing.xs,
  },
  price: {
    color: theme.colors.textPrimary,
    fontWeight: '700',
  },
  price_sm: { ...theme.typography.priceMd },
  price_md: { ...theme.typography.priceMd },
  price_lg: { ...theme.typography.priceLg },
  original: {
    textDecorationLine: 'line-through',
    color: theme.colors.textMuted,
  },
  original_sm: { ...theme.typography.caption },
  original_md: { ...theme.typography.bodySm },
  original_lg: { ...theme.typography.bodyMd },
});