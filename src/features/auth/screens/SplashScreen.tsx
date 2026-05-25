import React, {useEffect} from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack'; 
import {RootStackParamList} from '../../../app/navigation/types'; 

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'> & {
  onFinish: () => void;
};

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 393;
const guidelineBaseHeight = 852;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const BackgroundGlow = () => {
  const glowSize = Math.max(width, height) * 1.2;

  return (
    <Image
      source={require('../../../../assets/SplashScreenEllipse/Ellipse2.png')}
      style={{
        position: 'absolute',
        width: glowSize,
        height: glowSize,
        top: height / 2 - glowSize / 2,
        left: width / 2 - glowSize / 2,
        opacity: 0.95,
      }}
      resizeMode="contain"
    />
  );
};

const DecorativeEllipse = ({
  source,
  top,
  left,
  rotate,
}: {
  source: any;
  top: number;
  left: number;
  rotate: string;
}) => {
  const size = scale(279.13);

  return (
    <Image
      source={source}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        top: verticalScale(top),
        left: scale(left),
        transform: [
          {translateX: -size / 2},
          {translateY: -size / 2},
          {rotate},
          {translateX: size / 2},
          {translateY: size / 2},
        ],
      }}
      resizeMode="contain"
    />
  );
};

const SplashLogoSection = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../../../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.divider} />
      <Text style={styles.tagline}>Your Sacred Journey, Simplified</Text>
    </View>
  );
};

export const SplashScreen = ({onFinish}: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <BackgroundGlow />

      <DecorativeEllipse
        source={require('../../../../assets/SplashScreenEllipse/Ellipse7_1.png')}
        top={60}
        left={150}
        rotate="-358deg"
      />

      <DecorativeEllipse
        source={require('../../../../assets/SplashScreenEllipse/Ellipse7.png')}
        top={250.46}
        left={350.27}
        rotate="-121.03deg"
      />

      <DecorativeEllipse
        source={require('../../../../assets/SplashScreenEllipse/Ellipse7.png')}
        top={750}
        left={10}
        rotate="-28.88deg"
      />

      <DecorativeEllipse
        source={require('../../../../assets/SplashScreenEllipse/Ellipse10.png')}
        top={701.1}
        left={221.1}
        rotate="-3.88deg"
      />

      <DecorativeEllipse
        source={require('../../../../assets/SplashScreenEllipse/Ellipse8.png')}
        top={10}
        left={-70}
        rotate="-355.94deg"
      />

      <DecorativeEllipse
        source={require('../../../../assets/SplashScreenEllipse/Ellipse10.png')}
        top={1035}
        left={-20}
        rotate="-108.06deg"
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContent}>
          <SplashLogoSection />
        </View>

        <Text style={styles.footer}>
          Connecting Devotees with Sacred Traditions
        </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    width: scale(245),
    alignItems: 'center',
  },

  logo: {
    width: '100%',
    height: scale(212),
  },

  divider: {
    width: '75%', 
    alignSelf: 'center',
    borderTopWidth: moderateScale(1),
    borderColor: 'rgba(255,255,255,0.85)',
    marginTop: verticalScale(-35),
    marginBottom: moderateScale(4),
  },

  tagline: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',

    marginTop: verticalScale(15),
    paddingHorizontal: scale(20), 
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',
  },

  footer: {
    fontSize: moderateScale(10),
    lineHeight: moderateScale(12),
    color: 'rgba(255,255,255,0.54)',
    marginBottom: moderateScale(20),
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
  },
});
