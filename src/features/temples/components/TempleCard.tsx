import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {MapPin} from 'lucide-react-native';

import {Temple} from '../../../types';

const CARD_WIDTH = 130;

interface Props {
  item: Temple;
  onPress: (id: string) => void;
}

export const TempleCard: React.FC<Props> = ({item, onPress}) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => onPress(item.id)}
    activeOpacity={0.85}>
    {/* IMAGE SECTION */}
    <Image source={item.imageUrl} style={styles.image} resizeMode="cover" />

    {/* INFO SECTION */}
    <View style={styles.infoContainer}>
      <View style={styles.topContent}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.subtitle} numberOfLines={2}>
          {item.subtitle}
        </Text>

        <View style={styles.locationRow}>
          <MapPin size={10} color="#757575" strokeWidth={2} />

          <Text style={styles.locationText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>

        <View style={styles.ratingRow}>
          <Text style={styles.star}>★</Text>

          <Text style={styles.ratingVal}>{item.rating}</Text>

          <Text style={styles.reviewCount}>({item.reviewCount})</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: 12,
  },

  image: {
    width: CARD_WIDTH,
    height: 160,

    borderRadius: 16,

    backgroundColor: '#E0E0E0',

    marginBottom: 6,
  },

  infoContainer: {
    paddingTop: 2,
  },

  topContent: {
    gap: 4,
  },

  name: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',

    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#281518',

    minHeight: 22,
  },

  subtitle: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Regular' : 'Lato_400Regular',

    fontSize: 12,
    lineHeight: 18,

    color: '#000000',

    minHeight: 36,
  },

  locationRow: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 2,
  },

  locationText: {
    flex: 1,

    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',

    fontSize: 10,
    lineHeight: 12,

    color: '#757575',
  },

  ratingRow: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 2,
  },

  star: {
    fontSize: 11,
    lineHeight: 14,

    color: '#F3B416',
  },

  ratingVal: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 18,

    color: '#281518',
  },

  reviewCount: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',

    fontSize: 10,
    lineHeight: 18,

    color: '#666666',
  },
});
