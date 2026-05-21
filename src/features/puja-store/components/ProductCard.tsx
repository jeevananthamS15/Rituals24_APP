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
import { Product } from '../../../types';



const CARD_WIDTH = 130;

interface Props {
  item: Product;
  onPress: (id: string) => void;
  onAdd: (id: string) => void;
}

export const ProductCard = ({ item, onPress, onAdd }:Props) => (
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
      
      <Text style={styles.title} numberOfLines={2}>{item.name}</Text>

   
      <Text style={styles.itemCount}>{item.itemCount} items included</Text>

      
      <RatingBadge rating={item.rating} reviewCount={item.reviewCount} />

     
      <PriceDisplay
        price={item.price}
        originalPrice={item.originalPrice}
        size="sm"
      />

    
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => onAdd(item.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.addIcon}>+</Text>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
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
  itemCount: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 12,
    color: '#757575',
  },
  // Figma: Component 4 — full width, bg #2B000A, borderRadius 12, height 40
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B000A',
    borderRadius: 12,
    height: 40,
    marginTop: 4,
    gap: 4,
  },
  addIcon: {
    // lucide:plus icon — using text as placeholder
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 20,
    fontWeight: '400',
  },
  addText: {
    // M3/title/medium: Roboto 500 16px / 24px, color #FFFAF0
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#FFFAF0',
  },
});