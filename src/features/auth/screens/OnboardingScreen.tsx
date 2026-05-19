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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../../theme';
import { AppButton } from '../../../components/ui/AppButton';
import { AuthStackParamList } from '../../../app/navigation/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
}

const SLIDES: Slide[] = [
  {
    id: '1',
    emoji: '🕉️',
    title: 'Verified Pandits',
    subtitle: 'Every pandit on Ritual24 is background checked, certified, and rated by thousands of devotees.',
  },
  {
    id: '2',
    emoji: '📿',
    title: 'Easy Ritual Booking',
    subtitle: 'Book any puja in under 2 minutes. Choose the ritual, pick a date, and your pandit is confirmed.',
  },
  {
    id: '3',
    emoji: '🛕',
    title: 'Temple & Online Puja',
    subtitle: 'Book darshan at top temples across India, or join live online puja from anywhere in the world.',
  },
  {
    id: '4',
    emoji: '🌙',
    title: 'Sacred Muhurat Guide',
    subtitle: 'Never miss an auspicious moment. Our Vedic calendar shows daily muhurats, festivals, and fasting days.',
  },
];

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(prev => prev + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => navigation.replace('Login');

  const renderSlide = ({ item }: ListRenderItemInfo<Slide>) => (
    <View style={styles.slide}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  const isLast = currentIndex === SLIDES.length - 1;

  return (
    <View style={styles.container}>
      {/* Header with Skip */}
      <View style={styles.header}>
        <Text style={styles.logo}>🔱 Rituals24</Text>
        {!isLast && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.slider}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === currentIndex && styles.dotActive]}
          />
        ))}
      </View>

      {/* CTA */}
      <View style={styles.cta}>
        <AppButton
          title={isLast ? 'Get Started' : 'Next'}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.screenPadding,
    paddingTop: theme.spacing.xl,
  },
  logo: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  skip: {
    ...theme.typography.labelLg,
    color: theme.colors.textSecondary,
  },
  slider: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emoji: {
    fontSize: 80,
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.displayMd,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.bodyLg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginVertical: theme.spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: theme.colors.primary,
  },
  cta: {
    paddingHorizontal: theme.spacing.screenPadding,
    paddingBottom: theme.spacing.xxxl,
  },
});