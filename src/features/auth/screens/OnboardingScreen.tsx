import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ListRenderItemInfo,
  StatusBar,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../app/navigation/types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: any;
}

const SLIDES: Slide[] = [
  {
    id: '1',
    title: 'Verified Pandits',
    subtitle:
      'Every pandit on Ritual24 is background-checked,\ncertified, and rated by thousand of devotees.',
    image: require('../../../../assets/images/Onboard/onboard1.png'),
  },

  {
    id: '2',
    title: 'Easy Ritual Booking',
    subtitle:
      'Book any puja in under 2 minutes. Choose the\nritual, pick a date, and your pandit is confirmed.',
    image: require('../../../../assets/images/Onboard/onboard2.png'),
  },

  {
    id: '3',
    title: 'Temple & Online Puja',
    subtitle:
      'Book darshan at top temples across India, Or join\nlive online puja from anywhere in the world.',
    image: require('../../../../assets/images/Onboard/onboard3.png'),
  },

  {
    id: '4',
    title: 'Sacred Muhurat Guide',
    subtitle:
      'Never miss an auspicious Moment. Our vedic\ncalendar show daily muhurats, festivals, and\nfasting days.',
    image: require('../../../../assets/images/Onboard/onboard4.png'),
  },
];

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

export const OnboardingScreen = ({ navigation }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });

      setCurrentIndex(prev => prev + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const renderSlide = ({ item }: ListRenderItemInfo<Slide>) => {
    return (
      <View style={styles.slide}>
  
        {/* <View style={styles.topEllipse} /> */}

    
        <View style={styles.bottomEllipse} />

      
        <View style={styles.rightCurve} />

    
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>

          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>

        
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      />

   
      <View style={styles.bottomContainer}>
     
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          {currentIndex !== SLIDES.length - 1 && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.skipButton}
              onPress={handleSkip}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.nextButton,
              currentIndex === SLIDES.length - 1 &&
                styles.fullWidthButton,
            ]}
            onPress={handleNext}
          >
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
    backgroundColor: '#FAFAFA',
  },

  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },



  topEllipse: {
    position: 'absolute',

    width: 383.57,
    height: 383.57,

    top: 62,
    left: -6,

    borderRadius: 999,

    backgroundColor: 'rgba(43,0,10,0.05)',
  },

  bottomEllipse: {
    position: 'absolute',

    width: 383.57,
    height: 383.57,

    top: SCREEN_HEIGHT * 0.53,
    left: -168,

    borderRadius: 999,

    backgroundColor: 'rgba(43,0,10,0.04)',
  },

  rightCurve: {
    position: 'absolute',

    width: SCREEN_WIDTH * 1.15,
    height: SCREEN_WIDTH * 1.15,

    borderRadius: 999,

    right: -SCREEN_WIDTH * 0.58,
    bottom: SCREEN_HEIGHT * 0.19,

    backgroundColor: 'rgba(43,0,10,0.05)',
  },

 

  textContainer: {
    marginTop:
      Platform.OS === 'ios'
        ? SCREEN_HEIGHT * 0.07
        : SCREEN_HEIGHT * 0.06,

    paddingHorizontal: 16,
    zIndex: 10,
  },

  title: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 10,
  },

  subtitle: {
    width: '92%',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    color: '#222222',
  },



  imageContainer: {
    position: 'absolute',

    right: -35,
    bottom: 92,

    zIndex: 5,
  },

  image: {
    width: SCREEN_WIDTH * 0.86,
    height: SCREEN_HEIGHT * 0.42,
  },



  bottomContainer: {
    position: 'absolute',

    bottom: Platform.OS === 'ios' ? 24 : 18,

    width: '100%',

    paddingHorizontal: 16,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 26,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 99,

    backgroundColor: '#D9D9D9',

    marginHorizontal: 4,
  },

  activeDot: {
    width: 20,
    height: 6,
    borderRadius: 99,

    backgroundColor: '#4B0013',
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  skipButton: {
    width: 62,
    height: 38,

    borderRadius: 10,

    borderWidth: 1,
    borderColor: '#4B0013',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 10,

    backgroundColor: '#FFFFFF',
  },

  skipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4B0013',
  },

  nextButton: {
    flex: 1,
    height: 38,

    borderRadius: 10,

    backgroundColor: '#4B0013',

    justifyContent: 'center',
    alignItems: 'center',
  },

  fullWidthButton: {
    width: '100%',
  },

  nextText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});