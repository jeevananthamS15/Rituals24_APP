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
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

const scaleW = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;
const scaleH = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

const SLIDES = [
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

export const OnboardingScreen = ({navigation}: any) => {
  const flatListRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
      });

      setCurrentIndex(prev => prev + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.slide}>
        <View style={styles.card}>
          
          <LinearGradient
            colors={[
              'rgba(43,0,10,0.10)',
              'rgba(255,255,255,0.03)',
              'rgba(255,255,255,0)',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.topEllipse}
          />

      
          <LinearGradient
            colors={[
              'rgba(43,0,10,0.08)',
              'rgba(255,255,255,0.02)',
              'rgba(255,255,255,0)',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.bottomEllipse}
          />

      
          <View style={styles.softCircle} />


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
      </View>
    );
  };

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
      />

  
      <View style={styles.bottomWrapper}>
  
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => {
            const active = index === currentIndex;

            return (
              <View
                key={index}
                style={[styles.dot, active && styles.activeDot]}
              />
            );
          })}
        </View>

       
        <View style={styles.buttonRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSkip}
            style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleNext}
            style={styles.nextButton}>
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
    backgroundColor: '#F4F4F4',
  },

  slide: {
    width: SCREEN_WIDTH,
  },

  card: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
    borderBottomRightRadius: scaleW(260),
  },

  topEllipse: {
    position: 'absolute',

    width: scaleW(620),
    height: scaleW(620),

    borderRadius: scaleW(620),

    top: scaleH(110),
    left: scaleW(-210),

    opacity: 0.55,

    transform: [{rotate: '12deg'}],
  },

  bottomEllipse: {
    position: 'absolute',

    width: scaleW(520),
    height: scaleW(520),

    borderRadius: scaleW(520),

    left: scaleW(-250),
    bottom: scaleH(-160),

    opacity: 0.45,

    transform: [{rotate: '-8deg'}],
  },

  softCircle: {
    position: 'absolute',

    width: scaleW(420),
    height: scaleW(420),

    borderRadius: scaleW(420),

    backgroundColor: 'rgba(0,0,0,0.015)',

    right: scaleW(-180),
    top: scaleH(180),
  },

  textContainer: {
    marginTop: scaleH(110),
    paddingHorizontal: scaleW(20),
    zIndex: 20,
  },

  title: {
    fontSize: scaleW(28),
    lineHeight: scaleW(36),
    fontWeight: '700',
    color: '#111111',
    marginBottom: scaleH(10),
  },

  subtitle: {
    width: scaleW(300),
    fontSize: scaleW(14),
    lineHeight: scaleW(22),
    color: '#3A3A3A',
    fontWeight: '400',
  },

  imageContainer: {
    position: 'absolute',
    width: scaleW(450),
    height: scaleH(450),
    right: scaleW(-70),
    bottom: scaleH(-20),
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  bottomWrapper: {
    paddingHorizontal: scaleW(20),
    paddingBottom: Platform.OS === 'ios' ? scaleH(26) : scaleH(18),
    paddingTop: scaleH(12),
    backgroundColor: '#FAFAFA',
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleH(22),
  },

  dot: {
    width: scaleW(6),
    height: scaleW(6),
    borderRadius: scaleW(10),
    backgroundColor: '#D4D4D4',
    marginHorizontal: scaleW(4),
  },

  activeDot: {
    width: scaleW(22),
    backgroundColor: '#2B000A',
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  skipButton: {
    width: scaleW(62),
    height: scaleH(42),
    borderRadius: scaleW(12),
    borderWidth: 1,
    borderColor: '#2B000A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleW(10),
    backgroundColor: '#FAFAFA',
  },

  skipText: {
    color: '#2B000A',
    fontSize: scaleW(14),
    fontWeight: '500',
  },

  nextButton: {
    flex: 1,
    height: scaleH(42),
    borderRadius: scaleW(12),
    backgroundColor: '#2B000A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextText: {
    color: '#FFFFFF',
    fontSize: scaleW(14),
    fontWeight: '500',
  },
});
