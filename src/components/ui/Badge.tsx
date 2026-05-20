import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';
import { PanditTier } from '../../types';

interface TierBadgeProps {
  tier: PanditTier;
  style?: ViewStyle;
}

export const TierBadge: React.FC<TierBadgeProps> = ({ tier, style }) => {
  const color = {
    gold: theme.colors.tierGold,
    silver: theme.colors.tierSilver,
    bronze: theme.colors.tierBronze,
  }[tier];

  return (
    <View style={[styles.tier, { backgroundColor: color + '22', borderColor: color }, style]}>
      <Text style={[styles.tierText, { color }]}>
        {tier.charAt(0).toUpperCase() + tier.slice(1)}
      </Text>
    </View>
  );
};

interface TagProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Tag: React.FC<TagProps> = ({ label, variant = 'default' }) => {
  const colors = {
    default: { bg: theme.colors.surfaceElevated, text: theme.colors.textSecondary },
    success: { bg: theme.colors.successLight, text: theme.colors.success },
    warning: { bg: theme.colors.warningLight, text: theme.colors.warning },
    error: { bg: theme.colors.errorLight, text: theme.colors.error },
  }[variant];

  return (
    <View style={[styles.tag, { backgroundColor: colors.bg }]}>
      <Text style={[styles.tagText, { color: colors.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tier: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.radii.full,
    borderWidth: 1,
  },
  tierText: {
    ...theme.typography.labelSm,
    fontWeight: '700',
  },
  tag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 3,
    borderRadius: theme.radii.full,
  },
  tagText: {
    ...theme.typography.caption,
    fontWeight: '600',
  },
});