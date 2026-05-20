import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../../theme';

const SERVICES = [
  { id: 'book_puja', label: 'Book Puja', emoji: '🪔' },
  { id: 'pandits', label: 'Book Pandits', emoji: '👳' },
  { id: 'online', label: 'Online Pooja', emoji: '📱' },
  { id: 'darshan', label: 'Temple Darshan', emoji: '🛕' },
  { id: 'bhajan', label: 'Bhajan Service', emoji: '🎵' },
  { id: 'store', label: 'Puja Store', emoji: '🛒' },
  { id: 'muhurat', label: 'Muhurat', emoji: '📅' },
  { id: 'offer', label: 'Festival Offer', emoji: '🎁' },
];

interface Props {
  onServicePress?: (id: string) => void;
}

export const ServiceGrid: React.FC<Props> = ({ onServicePress }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}
  >
    {SERVICES.map(service => (
      <TouchableOpacity
        key={service.id}
        style={styles.item}
        onPress={() => onServicePress?.(service.id)}
        activeOpacity={0.7}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.emoji}>{service.emoji}</Text>
        </View>
        <Text style={styles.label}>{service.label}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.screenPadding,
    gap: theme.spacing.md,
  },
  item: {
    alignItems: 'center',
    width: 64,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.xs,
    ...theme.shadows.sm,
  },
  emoji: {
    fontSize: 24,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});