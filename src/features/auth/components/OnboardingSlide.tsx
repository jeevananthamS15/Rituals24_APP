import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { theme } from '../../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface OnboardingSlideData {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
}

interface Props {
  item: OnboardingSlideData;
}

export const OnboardingSlide= ({ item }:Props) => (
  <View style={styles.container}>
    <View style={styles.emojiContainer}>
      <Text style={styles.emoji}>{item.emoji}</Text>
    </View>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.subtitle}>{item.subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
    borderWidth: 2,
    borderColor: theme.colors.gold + '44',
    ...theme.shadows.md,
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    ...theme.typography.displayMd,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.bodyLg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
  },
});