import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export const FestivalBanner: React.FC = () => (
  <View style={styles.wrapper}>
    <View style={styles.card}>
      <View style={styles.ellipse1} />
      <View style={styles.ellipse2} />
      <View style={styles.ellipse3} />

      <Image
        source={require('../../../../assets/FestivalBanner/temple.png')}
        style={styles.templeImage}
        resizeMode="contain"
      />

      <View style={styles.badge}>
        <Text style={styles.badgeText}>Festival Offer</Text>
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>Navratri Special</Text>
        <Text style={styles.subtitle}>
          Book Durga Puja with verfied pandits
        </Text>
      </View>

      <TouchableOpacity style={styles.bookBtn} activeOpacity={0.8}>
        <Text style={styles.bookBtnText}>Book Now</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.dotsRow}>
      <View style={styles.dotInactive} />
      <View style={styles.dotActive} />
      <View style={styles.dotInactive} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 12,
  },

  card: {
    width: '100%',
    height: 145,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },

  ellipse1: {
    position: 'absolute',
    width: 131,
    height: 131,
    borderRadius: 66,
    left: 140,
    top: -28,
    backgroundColor: 'rgba(43, 0, 10, 0.06)',
    transform: [{rotate: '-153.16deg'}],
  },

  ellipse2: {
    position: 'absolute',
    width: 131,
    height: 131,
    borderRadius: 66,
    left: -60,
    top: -102,
    backgroundColor: 'rgba(43, 0, 10, 0.05)',
    transform: [{rotate: '-153.16deg'}],
  },

  ellipse3: {
    position: 'absolute',
    width: 131,
    height: 131,
    borderRadius: 66,
    left: 85,
    top: 97,
    backgroundColor: 'rgba(43, 0, 10, 0.04)',
    transform: [{rotate: '-3deg'}],
  },

  templeImage: {
    position: 'absolute',
    width: 145,
    height: 130,
    right: -8,
    bottom: -7,
  },

  badge: {
    position: 'absolute',
    left: 16,
    top: 16,
    backgroundColor: '#2B000A',
    borderRadius: 33,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  badgeText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    color: '#FFFFFF',
  },

  textBlock: {
    position: 'absolute',
    left: 16,
    top: 42,
    width: 196,
  },
  title: {
    fontFamily: 'Lato',
    fontSize: 20,
    lineHeight: 28,
    fontWeight:'bold',
    color: '#000000',
  },
  subtitle: {
    fontFamily: 'Lato',
    fontSize: 12,
    lineHeight: 18,
    color: '#000000',
  },

  bookBtn: {
    position: 'absolute',
    left: 16,
    top: 100,
    width: 90,
    height: 29,
    backgroundColor: '#FEB44B',
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookBtnText: {
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 17,
    color: '#000000',
  },

  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  dotInactive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D9D9D9',
  },

  dotActive: {
    width: 16,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2B000A',
  },
});
