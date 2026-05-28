// OnboardingScreen.tsx

import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../../../app/providers/AuthProvider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../app/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

const {width: SW, height: SH} = Dimensions.get('window');

const BASE_W = 393;
const BASE_H = 852;

const scaleW = (px: number) => (SW / BASE_W) * px;
const scaleH = (px: number) => (SH / BASE_H) * px;

const CARD_H = scaleH(671);
const EL_SIZE = scaleW(383.57);

type SlideImageConfig = {
  imgW: number;
  imgH: number;
  left: number;
  bottom?: number;
  top?: number;
  rotate?: string;
  anchor: 'bottom' | 'top';
  textWidth: number;
};

const S1_CFG: SlideImageConfig = {
  imgW: 578,
  imgH: 700,
  left: -16,
  bottom: -225,
  anchor: 'bottom',
  textWidth: 353,
};

const S2_CFG: SlideImageConfig = {
  imgW: 1000,
  imgH: 550,
  left: -110,
  top: 235,
  anchor: 'top',
  textWidth: 320,
};

const S3_CFG: SlideImageConfig = {
  imgW: 700,
  imgH: 600,
  left: -98,
  bottom: -140,
  anchor: 'bottom',
  textWidth: 310,
};

const S4_CFG: SlideImageConfig = {
  imgW: 450,
  imgH: 450,
  left: 35,
  top: 370,
  anchor: 'top',
  rotate: '-24.77deg',
  textWidth: 301,
};

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  config: SlideImageConfig;
};

const SLIDES: Slide[] = [
  {
    id: '1',
    title: 'Verified Pandits',
    subtitle:
      'Every pandit on Ritual24 is background-checked, certified, and rated by thousand of devotees.',
    image: require('../../../../assets/images/Onboard/onboard1.png'),
    config: S1_CFG,
  },
  {
    id: '2',
    title: 'Easy Ritual Booking',
    subtitle:
      'Book any puja in under 2 minutes. Choose the ritual, pick a date, and your pandit is confirmed.',
    image: require('../../../../assets/images/Onboard/onboard2.png'),
    config: S2_CFG,
  },
  {
    id: '3',
    title: 'Temple & Online Puja',
    subtitle:
      'Book darshan at top temples across India, Or join live online puja from anywhere in the world.',
    image: require('../../../../assets/images/Onboard/onboard3.png'),
    config: S3_CFG,
  },
  {
    id: '4',
    title: 'Sacred Muhurat Guide',
    subtitle:
      'Never miss an auspicious Moment. Our vedic calendar show daily muhurats, festivals, and fasting days.',
    image: require('../../../../assets/images/Onboard/onboard4.png'),
    config: S4_CFG,
  },
];

export const OnboardingScreen = ({navigation}: Props) => {
  const {completeOnboarding} = useAuth();

  const flatListRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastSlide = currentIndex === SLIDES.length - 1;

  const handleCompleteOnboarding = async () => {
  try {
    await completeOnboarding();
  } catch (error) {
    console.log('Onboarding Error:', error);
  }
};



  const handleNext = async () => {
    if (!isLastSlide) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
      });

      setCurrentIndex(prev => prev + 1);
      return;
    }

   await handleCompleteOnboarding();
  };

  const handleSkip = async () => {
  await handleCompleteOnboarding();
  };

  const renderItem = ({item}: {item: Slide}) => {
    const cfg = item.config;

    const imagePositionStyle: any = {
      position: 'absolute' as const,
      width: scaleW(cfg.imgW),
      height: scaleH(cfg.imgH),
      left: scaleW(cfg.left),
    };

    if (cfg.anchor === 'bottom' && cfg.bottom !== undefined) {
      imagePositionStyle.bottom = scaleH(cfg.bottom);
    } else if (cfg.anchor === 'top' && cfg.top !== undefined) {
      imagePositionStyle.top = scaleH(cfg.top);
    }

    if (cfg.rotate) {
      imagePositionStyle.transform = [{rotate: cfg.rotate}];
    }

    return (
      <View style={styles.slide}>
        <View style={styles.card}>
          <Image
            source={require('../../../../assets/images/Onboard/Ellipse9.png')}
            resizeMode="contain"
            style={styles.ellipse9}
          />

          <Image
            source={require('../../../../assets/images/Onboard/Ellipse9.png')}
            resizeMode="contain"
            style={styles.ellipse10}
          />

          <View style={[styles.textContainer, {width: scaleW(cfg.textWidth)}]}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>

          <Image
            source={item.image}
            resizeMode="contain"
            style={imagePositionStyle}
          />
        </View>
      </View>
    );
  };

  const renderPagination = () => (
    <View style={styles.pagination}>
      {SLIDES.map((_, index) => {
        const active = index === currentIndex;

        return (
          <View key={index} style={[styles.dot, active && styles.activeDot]} />
        );
      })}
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        style={styles.flatList}
        getItemLayout={(_, index) => ({
          length: SW,
          offset: SW * index,
          index,
        })}
      />

      <View style={styles.bottomWrapper}>
        {renderPagination()}

        <View style={styles.buttonRow}>
          {!isLastSlide && (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSkip}
              style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleNext}
            style={[styles.nextButton, isLastSlide && styles.nextButtonFull]}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  flatList: {
    flexGrow: 0,
    height: CARD_H,
  },

  slide: {
    width: SW,
    height: CARD_H,
  },

  card: {
    width: SW,
    height: CARD_H,
    backgroundColor: '#FAFAFA',
    borderBottomRightRadius: scaleW(264),
    overflow: 'hidden',
  },

  ellipse9: {
    position: 'absolute',
    width: EL_SIZE,
    height: EL_SIZE,
    left: scaleW(-6.2),
    top: scaleH(75),
    transform: [{rotate: '-1deg'}],
  },

  ellipse10: {
    position: 'absolute',
    width: EL_SIZE,
    height: EL_SIZE,
    left: scaleW(-168),
    top: scaleH(400),
    transform: [{rotate: '-200deg'}],
  },

  textContainer: {
    position: 'absolute',
    left: scaleW(20),
    top: scaleH(136),
    gap: scaleH(12),
    zIndex: 10,
  },

  title: {
    fontFamily: 'Lato',
    fontSize: scaleW(28),
    lineHeight: scaleW(36),
    fontWeight: '700',
    color: '#000000',
  },

  subtitle: {
    fontFamily: 'Lato',
    fontSize: scaleW(14),
    lineHeight: scaleW(22),
    fontWeight: '400',
    color: '#000000',
  },

  bottomWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scaleW(20),
    paddingTop: scaleH(62),
    paddingBottom: Platform.OS === 'ios' ? scaleH(34) : scaleH(20),
    justifyContent: 'flex-start',
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleH(8),
    gap: scaleW(12),
    marginBottom: scaleH(20),
  },

  dot: {
    width: scaleW(8),
    height: scaleW(8),
    borderRadius: scaleW(4),
    backgroundColor: '#D9D9D9',
  },

  activeDot: {
    width: scaleW(40),
    height: scaleW(8),
    borderRadius: scaleW(4),
    backgroundColor: '#2B000A',
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleW(7),
  },

  skipButton: {
    width: scaleW(85),
    height: scaleH(42),
    borderRadius: scaleW(12),
    borderWidth: 1,
    borderColor: '#2B000A',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  skipText: {
    fontFamily: 'Lato',
    fontSize: scaleW(14),
    lineHeight: scaleW(17),
    fontWeight: '500',
    color: '#2B000A',
  },

  nextButton: {
    flex: 1,
    height: scaleH(42),
    borderRadius: scaleW(12),
    backgroundColor: '#2B000A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextButtonFull: {
    flex: 1,
  },

  nextText: {
    fontFamily: 'Lato',
    fontSize: scaleW(14),
    lineHeight: scaleW(17),
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
