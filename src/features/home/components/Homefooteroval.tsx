import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

export const HomeFooterOval: React.FC = () => (
  <View style={styles.ovalContainer}>
    <View style={styles.logoContainer}>

      <Image
        source={require('../../../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.divider} />

      <Text style={styles.tagline}>
        Your Sacred Journey, Simplified
      </Text>
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

    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingTop: 36,
  },

  logoContainer: {
    width: 245,
    alignItems: 'center',
  },

  logo: {
    width: '100%',
    height: 212,
  },

  divider: {
    width: 185,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.85)',
    marginTop: -35,
    marginBottom: 4,
  },

  tagline: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',
  },
});