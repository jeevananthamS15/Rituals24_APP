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
      <TouchableOpacity
        onPress={onViewAll}
        activeOpacity={0.7}
        style={styles.viewAllBtn}
      >
        <Text style={styles.viewAllText}>View All </Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  title: {
    fontFamily: 'Lato',
    fontSize: 20,
    fontWeight:'bold',
    lineHeight: 28,
    color: '#000000',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewAllText: {
    fontFamily: 'Lato-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: '#2B000A',
  },

  chevron: {
    fontSize: 18,
    lineHeight: 20,
    color: '#2B000A',
    fontWeight: '400',
    marginTop: -1,
  },
});