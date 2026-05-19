import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../../app/navigation/types';
//import { storage } from '../../../lib/storage/storage';
//import { useAuthStore } from '../store/authStore';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen = ({navigation}: Props) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.92)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  //const login = useAuthStore(state => state.login);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#2B0006');

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
      checkAuthAndNavigate();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const checkAuthAndNavigate = async () => {
    navigation.replace('Auth', {
      screen: 'Onboarding',
    });
  };

  //   const checkAuthAndNavigate = async () => {
  //     try {
  //       const token = await storage.get<string>(storage.KEYS.AUTH_TOKEN);

  //       const userData = await storage.get<{
  //         name: string;
  //         mobile: string;
  //       }>(storage.KEYS.USER_DATA);

  //       const onboardingDone = await storage.get<boolean>(
  //         storage.KEYS.ONBOARDING_DONE,
  //       );

  //       if (token && userData) {
  //         login(userData.mobile, userData.name);
  //         navigation.replace('Main');
  //       } else if (onboardingDone) {
  //         navigation.replace('Auth', {
  //           screen: 'Login',
  //         });
  //       } else {
  //         navigation.replace('Auth', {
  //           screen: 'Onboarding',
  //         });
  //       }
  //     } catch {
  //       navigation.replace('Auth', {
  //         screen: 'Onboarding',
  //       });
  //     }
  //   };

  return (
    <LinearGradient
      colors={['#2B0006', '#5A1E0C', '#2A0005']}
      start={{x: 0.1, y: 0}}
      end={{x: 0.9, y: 1}}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <View style={[styles.ring, styles.topLeftRing]} />
        <View style={[styles.ring, styles.topRightRing]} />
        <View style={[styles.ring, styles.centerRightRing]} />
        <View style={[styles.ring, styles.bottomLeftRing]} />
        <View style={[styles.ring, styles.bottomRightRing]} />

        <View style={styles.centerGlow} />

        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: contentOpacity,
            },
          ]}>
          <Animated.View
            style={{
              opacity: logoOpacity,
              transform: [{scale: logoScale}],
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

        <Animated.View
          style={[
            styles.footerContainer,
            {
              opacity: contentOpacity,
            },
          ]}>
          <Text style={styles.footerText}>
            Connecting Devotees with Sacred Traditions
          </Text>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const RING_SIZE = 280;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -35,
  },

  logo: {
    width: 245,
    height: 212,
  },

  divider: {
    width: 185,
    borderWidth: 0.8,
    borderColor: '#FFFFFF',
    opacity: 0.85,
    marginTop: 4,
    marginBottom: 14,
  },

  tagline: {
    width: 245,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.2,
  },

  footerContainer: {
    paddingBottom: 28,
  },

  footerText: {
    width: 211,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '400',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.54)',
  },

  ring: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 28,
    borderColor: 'rgba(221,171,44,0.10)',
  },

  topLeftRing: {
    top: -75,
    left: -197,
  },

  topRightRing: {
    top: -185,
    right: -115,
  },

  centerRightRing: {
    top: 130,
    right: -120,
  },

  bottomLeftRing: {
    bottom: -80,
    left: -78,
  },

  bottomRightRing: {
    bottom: -170,
    right: -110,
  },

  centerGlow: {
    position: 'absolute',
    width: 366,
    height: 366,
    borderRadius: 183,
    backgroundColor: 'rgba(221,171,44,0.12)',
    top: height * 0.32,
    alignSelf: 'center',
  },
});
