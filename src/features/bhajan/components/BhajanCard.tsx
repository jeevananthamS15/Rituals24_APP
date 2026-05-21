import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { theme } from '../../../theme';
import { RatingBadge } from '../../../components/ui/RatingBadge';
import { PriceDisplay } from '../../../components/ui/PriceDisplay';
import { BhajanService } from '../../../types';



const CARD_WIDTH = 130;

interface Props {
  item: BhajanService;
  onPress: (id: string) => void;
}

export const BhajanCard = ({ item, onPress }:Props) => (
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
  
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>

      
      <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>

      <RatingBadge rating={item.rating} reviewCount={item.reviewCount} />

      <PriceDisplay
        price={item.price}
        originalPrice={item.originalPrice}
        size="sm"
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
  image: {
    width: CARD_WIDTH,
    height: 160,
    backgroundColor: theme.colors.surfaceElevated,
  },
  body: {
    padding: 8,
    gap: 4,
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 22,
    color: '#281518',
  },
  desc: {
  
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 12,
    color: '#757575',
  },
});