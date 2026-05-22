import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../app/navigation/types';

const {width, height} = Dimensions.get('window');

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;
const scaleX = (size: number) => (width / BASE_WIDTH) * size;
const scaleY = (size: number) => (height / BASE_HEIGHT) * size;

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'> & {
  onFinish: () => void;
};

export const SplashScreen = ({onFinish}: Props) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.92)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }

    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 35,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Ellipse size scaled from Figma's 279.13px on 393px wide frame
  const ELLIPSE_W = scaleX(279);
  const ELLIPSE_H = scaleX(279); // keep aspect ratio square

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/*
       * ─── DECORATIVE ELLIPSES ────────────────────────────────────────────
       * Each PNG is placed using exact Figma coordinates scaled to device.
       * The PNGs already contain the gradient arc shape — no simulation needed.
       *
       * Figma positions (left, top) on 393×852 frame:
       *   Ellipse 6:  left=191.73, top=-184.54  rotate(-154.03deg)
       *   Ellipse 7:  left=161.10, top=131.10   rotate(-3.88deg)
       *   Ellipse 8:  left=-197.13,top=-75.13   rotate(125.94deg)
       *   Ellipse 9:  left=-78.27, top=555.46   rotate(-154.03deg)
       *   Ellipse 10: left=221.10, top=701.10   rotate(-3.88deg)
       *   Ellipse 11: left=-5,     top=578      rotate(-42.06deg)
       */}

      {/* Ellipse 6 — top right */}
      <Image
        source={require('../../../../assets/SplashScreenEllipse/Ellipse6.png')}
        style={[
          styles.ellipse,
          {
            width: ELLIPSE_W,
            height: ELLIPSE_H,
            top: scaleY(-184),
            left: scaleX(192),
            transform: [{rotate: '-154.03deg'}],
          },
        ]}
        resizeMode="contain"
      />

      {/* Ellipse 8 — top left */}
      <Image
        source={require('../../../../assets/SplashScreenEllipse/Ellipse8.png')}
        style={[
          styles.ellipse,
          {
            width: ELLIPSE_W,
            height: ELLIPSE_H,
            top: scaleY(-75),
            left: scaleX(-197),
            transform: [{rotate: '125.94deg'}],
          },
        ]}
        resizeMode="contain"
      />

      {/* Ellipse 7 — center right */}
      <Image
        source={require('../../../../assets/SplashScreenEllipse/Ellipse7.png')}
        style={[
          styles.ellipse,
          {
            width: ELLIPSE_W,
            height: ELLIPSE_H,
            top: scaleY(131),
            left: scaleX(161),
            transform: [{rotate: '-3.88deg'}],
          },
        ]}
        resizeMode="contain"
      />

      {/* Ellipse 9 — lower left */}
      <Image
        source={require('../../../../assets/SplashScreenEllipse/Ellipse9.png')}
        style={[
          styles.ellipse,
          {
            width: ELLIPSE_W,
            height: ELLIPSE_H,
            top: scaleY(555),
            left: scaleX(-78),
            transform: [{rotate: '-154.03deg'}],
          },
        ]}
        resizeMode="contain"
      />

      {/* Ellipse 11 — lower left variant */}
      <Image
        source={require('../../../../assets/SplashScreenEllipse/Ellipse11.png')}
        style={[
          styles.ellipse,
          {
            width: ELLIPSE_W,
            height: ELLIPSE_H,
            top: scaleY(578),
            left: scaleX(-5),
            transform: [{rotate: '-42.06deg'}],
          },
        ]}
        resizeMode="contain"
      />

      {/* Ellipse 10 — bottom right */}
      <Image
        source={require('../../../../assets/SplashScreenEllipse/Ellipse10.png')}
        style={[
          styles.ellipse,
          {
            width: ELLIPSE_W,
            height: ELLIPSE_H,
            top: scaleY(701),
            left: scaleX(221),
            transform: [{rotate: '-3.88deg'}],
          },
        ]}
        resizeMode="contain"
      />

      {/* ── Central ambient glow (Ellipse 2 — blurred gold circle) ── */}
      <View style={styles.centerGlow} />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>

        {/* ── Logo + Divider + Tagline ── */}
        <Animated.View
          style={[styles.contentContainer, {opacity: contentOpacity}]}>
          <Animated.View
            style={{
              opacity: logoOpacity,
              transform: [{scale: logoScale}],
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../../assets/images/logo.png')}
              resizeMode="contain"
              style={styles.logo}
            />
          </Animated.View>

          <View style={styles.divider} />

          <Text style={styles.tagline}>Your Sacred Journey, Simplified</Text>
        </Animated.View>

        {/* ── Footer ── */}
        <Animated.View
          style={[styles.footerContainer, {opacity: contentOpacity}]}>
          <Text style={styles.footerText}>
            Connecting Devotees with Sacred Traditions
          </Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B000A',
  },

  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // ── Ellipse PNGs — absolute positioned over background ───────────────────
  ellipse: {
    position: 'absolute',
    opacity: 1, // opacity is already baked into the PNG exports
  },

  // ── Central warm glow ─────────────────────────────────────────────────────
  centerGlow: {
    position: 'absolute',
    width: scaleX(366),
    height: scaleX(366),
    borderRadius: scaleX(183),
    backgroundColor: 'rgba(221, 171, 44, 0.07)',
    shadowColor: '#DDAB2C',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.45,
    shadowRadius: 100,
    elevation: 0,
    top: height * 0.5 - scaleX(183),
    alignSelf: 'center',
  },

  // ── Main content ──────────────────────────────────────────────────────────
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: scaleX(245),
    height: scaleX(212),
  },

  divider: {
    width: scaleX(185),
    height: StyleSheet.hairlineWidth,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    marginTop: scaleY(7),
    marginBottom: scaleY(14),
  },

  tagline: {
    width: scaleX(245),
    fontSize: scaleX(12),
    lineHeight: scaleX(18),
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footerContainer: {
    paddingBottom: Platform.OS === 'android' ? scaleY(20) : scaleY(8),
    alignItems: 'center',
  },

  footerText: {
    width: scaleX(211),
    fontSize: scaleX(10),
    lineHeight: scaleX(12),
    fontWeight: '400',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.54)',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
});