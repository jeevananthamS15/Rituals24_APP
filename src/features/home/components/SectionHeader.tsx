import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

interface Props {
  title: string;
  onViewAll?: () => void;
}

export const SectionHeader: React.FC<Props> = ({ title, onViewAll }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {onViewAll && (
      <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.screenPadding,
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
  },
  viewAll: {
    ...theme.typography.labelMd,
    color: theme.colors.primary,
  },
});