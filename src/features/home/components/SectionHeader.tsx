import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

interface Props {
  title: string;
  onViewAll?: () => void;
}

export const SectionHeader= ({ title, onViewAll }:Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {onViewAll && (
      <TouchableOpacity
        onPress={onViewAll}
        activeOpacity={0.7}
        style={styles.viewAllRow}
      >
        <Text style={styles.viewAll}>View All</Text>
        <View style={styles.chevronWrapper}>
          <Text style={styles.chevron}>›</Text>
        </View>
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
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    lineHeight: 28,
    color: '#000000',
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAll: {
    fontFamily: 'Lato-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: theme.colors.primary,
  },
  chevronWrapper: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    fontSize: 18,
    lineHeight: 20,
    color: theme.colors.primary,
    fontWeight: '500',
    marginTop: -1,
  },
});