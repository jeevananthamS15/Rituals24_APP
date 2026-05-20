import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

const MUHURATS = [
  { id: '1', name: 'Braham Muhurat', time: '5:40 AM - 7:30 AM', type: 'auspicious' },
  { id: '2', name: 'Abhijit Muhurat', time: '9:00 AM - 10:30 AM', type: 'auspicious' },
  { id: '3', name: 'Rahu Kalam', time: '12:00 PM - 1:00 PM', type: 'rahu' },
];

interface Props {
  onViewAll?: () => void;
}

export const MuhuratStrip: React.FC<Props> = ({ onViewAll }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Today's Muhurat</Text>
      <TouchableOpacity onPress={onViewAll}>
        <Text style={styles.viewAll}>View Full Calendar</Text>
      </TouchableOpacity>
    </View>
    {MUHURATS.map(m => (
      <View key={m.id} style={styles.row}>
        <View style={[styles.dot, m.type === 'rahu' && styles.dotRahu]} />
        <Text style={styles.time}>{m.time}</Text>
        <Text style={styles.name}>{m.name}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.screenPadding,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
  },
  viewAll: {
    ...theme.typography.labelSm,
    color: theme.colors.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.success,
  },
  dotRahu: {
    backgroundColor: theme.colors.error,
  },
  time: {
    ...theme.typography.labelMd,
    color: theme.colors.textPrimary,
    width: 130,
  },
  name: {
    ...theme.typography.bodyMd,
    color: theme.colors.textSecondary,
    flex: 1,
  },
});