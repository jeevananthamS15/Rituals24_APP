import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const FestivalBanner = () => (
  <View style={styles.card}>
    <View style={styles.badge}>
      <Text style={styles.badgeText}>Festival Offer</Text>
    </View>

    <View style={styles.textBlock}>
      <Text style={styles.title}>Navratri Special</Text>
      <Text style={styles.subtitle}>Book Durga Puja with verified pandits</Text>
    </View>

    <TouchableOpacity style={styles.bookBtn} activeOpacity={0.8}>
      <Text style={styles.bookBtnText}>Book Now</Text>
    </TouchableOpacity>

    <View style={styles.ellipse1} pointerEvents="none" />
    <View style={styles.ellipse2} pointerEvents="none" />
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 145,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 24,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 0,
    justifyContent: 'center',
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
    gap: 2,
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    lineHeight: 28,
    color: '#000000',
  },
  subtitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#000000',
  },
  bookBtn: {
    position: 'absolute',
    left: 16,
    top: 100,
    backgroundColor: '#FEB44B',
    borderRadius: 44,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    height: 29,
  },
  bookBtnText: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 17,
    color: '#000000',
  },
  ellipse1: {
    position: 'absolute',
    width: 131,
    height: 131,
    borderRadius: 66,
    right: -20,
    top: -28,
    backgroundColor: 'rgba(43, 0, 10, 0.06)',
  },
  ellipse2: {
    position: 'absolute',
    width: 131,
    height: 131,
    borderRadius: 66,
    right: 40,
    bottom: -60,
    backgroundColor: 'rgba(43, 0, 10, 0.04)',
  },
});