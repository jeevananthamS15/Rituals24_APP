import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../theme';



const SERVICES = [
  { id: 'book_puja',  label: 'Book puja',         emoji: '🪔' },
  { id: 'pandits',    label: 'Book\nPandits',      emoji: '🙏' },
  { id: 'online',     label: 'Online\nPooja',      emoji: '📱' },
  { id: 'darshan',    label: 'Temple\nDarshan',    emoji: '🛕' },
  { id: 'store',      label: 'Puja Store',         emoji: '🛒' },
  { id: 'bhajan',     label: 'Bhajan\nservice',    emoji: '🎵' },
  { id: 'muhurat',    label: 'Muhurat',            emoji: '📅' },
  { id: 'festival',   label: 'Festival\nSpecials', emoji: '🔥' },
];

interface Props {
  onServicePress?: (id: string) => void;
}

export const ServiceGrid: React.FC<Props> = ({ onServicePress }) => {
  const row1 = SERVICES.slice(0, 4);
  const row2 = SERVICES.slice(4, 8);

  const renderItem = (service: typeof SERVICES[0]) => (
    <TouchableOpacity
      key={service.id}
      style={styles.item}
      onPress={() => onServicePress?.(service.id)}
      activeOpacity={0.7}
    >
      <View style={styles.iconBox}>
        <Text style={styles.emoji}>{service.emoji}</Text>
      </View>
      <Text style={styles.label}>{service.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>{row1.map(renderItem)}</View>
      <View style={styles.row}>{row2.map(renderItem)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    width: 77,
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