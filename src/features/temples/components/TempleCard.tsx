import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Temple } from '../../../types';



const CARD_WIDTH = 130;

interface Props {
  item: Temple;
  onPress: (id: string) => void;
}

export const TempleCard: React.FC<Props> = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => onPress(item.id)}
    activeOpacity={0.85}
  >
    <Image
      source={{ uri: item.imageUrl }}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.body}>

      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>


      <Text style={styles.subtitle} numberOfLines={2}>{item.subtitle}</Text>

      <View style={styles.locationRow}>
        <Text style={styles.locationPin}>📍</Text>
        <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
      </View>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <Text style={styles.star}>⭐</Text>
        <Text style={styles.ratingVal}>{item.rating}</Text>
        <Text style={styles.reviewCount}>({item.reviewCount})</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
  image: {
    width: CARD_WIDTH,
    height: 160,
    backgroundColor: '#E0E0E0',
  },

  body: {
    padding: 8,
    gap: 4,
  },

  name: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 22,
    color: '#281518',
  },

  subtitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#000000',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  locationPin: {
    fontSize: 10,
  },
  locationText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: '#757575',
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  star: {
    fontSize: 11,
    lineHeight: 14,
  },
  ratingVal: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    lineHeight: 18,
    color: '#281518',
  },
  reviewCount: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: '#666666',
  },
});