import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


export const HomeFooterOval: React.FC = () => (
  <View style={styles.ovalContainer}>

    <View style={styles.logoBlock}>
 
      <Text style={styles.logoPlaceholder}>🔔</Text>

      <Text style={styles.brandName}>Rituals24</Text>

      <Text style={styles.taglineSub}>Everything your Puja Needs</Text>


      <View style={styles.divider} />


      <Text style={styles.tagline}>Your Sacred Journey, Simplified</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  ovalContainer: {
    width: '100%',
    height: 395,
    backgroundColor: '#2B000A',

    borderTopLeftRadius: 196.5,
    borderTopRightRadius: 196.5,

    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingTop: 60,
  },

  logoBlock: {
    alignItems: 'center',
    gap: 5,
  },

  logoPlaceholder: {
    fontSize: 60,
  },

  brandName: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
    color: '#FEB44B',
    letterSpacing: 1,
  },

  taglineSub: {
    fontFamily: 'Lato-Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
  },

  divider: {
    width: 127,
    height: 1,
    borderTopWidth: 0.7,
    borderTopColor: '#F3B416',
  },

  tagline: {
    fontFamily: 'Lato-Regular',
    fontSize: 8.26,
    lineHeight: 12,
    color: '#F3B416',
    textAlign: 'center',
  },
});
