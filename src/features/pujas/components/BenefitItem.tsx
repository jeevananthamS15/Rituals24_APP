import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

interface Props {
  text: string;
  icon?: string;
}

export const BenefitItem: React.FC<Props> = ({ text, icon = '✦' }) => (
  <View style={styles.container}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  icon: {
    color: theme.colors.gold,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  text: {
    ...theme.typography.bodyMd,
    color: theme.colors.textSecondary,
    flex: 1,
    lineHeight: 22,
  },
});