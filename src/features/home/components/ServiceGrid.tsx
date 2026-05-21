import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

const SERVICES = [
  { id: 'book_puja',    label: 'Book puja',       emoji: '🪔' },
  { id: 'pandits',      label: 'Book Pandits',    emoji: '🙏' },
  { id: 'online',       label: 'Online Pooja',    emoji: '📱' },
  { id: 'darshan',      label: 'Temple Darshan',  emoji: '🛕' },
  { id: 'store',        label: 'Puja Store',      emoji: '🛒' },
  { id: 'bhajan',       label: 'Bhajan service',  emoji: '🎵' },
  { id: 'muhurat',      label: 'Muhurat',         emoji: '📅' },
  { id: 'festival',     label: 'Festival Specials', emoji: '🎁' },
];

interface Props {
  onServicePress?: (id: string) => void;
}

export const ServiceGrid: React.FC<Props> = ({ onServicePress }) => (
  <View style={styles.grid}>
    {SERVICES.map(service => (
      <TouchableOpacity
        key={service.id}
        style={styles.item}
        onPress={() => onServicePress?.(service.id)}
        activeOpacity={0.7}
      >
        <View style={styles.iconBox}>
          <Text style={styles.emoji}>{service.emoji}</Text>
        </View>
        <Text style={styles.label} numberOfLines={2}>{service.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.screenPadding,
    gap: 15,
  },
  item: {
    width: '22%',
    alignItems: 'center',
    gap: 8,
  },
  iconBox: {
    width: 77,
    height: 77,
    borderRadius: 28,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 32,
  },
  label: {
    fontFamily: 'Lato-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: '#000000',
    textAlign: 'center',
  },
});