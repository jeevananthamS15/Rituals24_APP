import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppButton } from '../../../components/ui/AppButton';

export const FestivalBanner: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.badge}>
      <Text style={styles.badgeText}>Festival Specials</Text>
    </View>
    <Text style={styles.title}>Navratri Special</Text>
    <Text style={styles.subtitle}>Book Durga Puja with verified pandits</Text>
    <AppButton
      title="Book Now"
      onPress={() => {}}
      variant="gold"
      fullWidth={false}
      style={styles.btn}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  badge: {
    backgroundColor: theme.colors.gold,
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 3,
    borderRadius: theme.radii.full,
    marginBottom: theme.spacing.sm,
  },
  badgeText: {
    ...theme.typography.labelSm,
    color: theme.colors.textInverse,
    fontWeight: '700',
  },
  title: {
    ...theme.typography.displayMd,
    color: theme.colors.textInverse,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.bodyMd,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: theme.spacing.md,
  },
  btn: {
    width: 'auto',
    height: 40,
    paddingHorizontal: theme.spacing.lg,
  },
});