import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { theme } from '../../../theme';



const SERVICES = [
  {
    id: 'book_puja',
    label: 'Book puja',
    icon: require('../../../../assets/HomeScreen/ServiceGrid/yagna.png'),
  },

  {
    id: 'pandits',
    label: 'Book\nPandits',
    icon: require('../../../../assets/HomeScreen/ServiceGrid/guru.png'),
  },

  {
    id: 'online',
    label: 'Online\nPooja',
    icon: require('../../../../assets/HomeScreen/ServiceGrid/video-call.png'),
  },

  {
    id: 'darshan',
    label: 'Temple\nDarshan',
    icon: require('../../../../assets/HomeScreen/ServiceGrid/temple.png'),
  },

  {
    id: 'store',
    label: 'Puja Store',
    icon: require('../../../../assets/HomeScreen/ServiceGrid/app-store.png'),
  },

  {
    id: 'bhajan',
    label: 'Bhajan\nservice',
    icon: require('../../../../assets/HomeScreen/ServiceGrid/tambourine.png'),
  },

  {
    id: 'muhurat',
    label: 'Muhurat',
    icon: require('../../../../assets/HomeScreen/ServiceGrid/schedule.png'),
  },

  {
    id: 'festival',
    label: 'Festival\nSpecials',
    icon: require('../../../../assets/HomeScreen/ServiceGrid/agni-pooja.png'),
  },
];

interface Props {
  onServicePress?: (id: string) => void;
}

export const ServiceGrid = ({ onServicePress }:Props) => {
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
        <Image source={service.icon} style={styles.icon}/>
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
    paddingHorizontal:13,
    paddingVertical:22,
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
icon: {
  width: 36,
  height: 36,
  resizeMode: 'contain',
},
  label: {
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 17,
    color: '#000000',
    textAlign: 'center',
  },
});