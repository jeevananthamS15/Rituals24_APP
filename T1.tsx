/**
 * OnboardingScreen.tsx
 * Path: src/features/auth/screens/OnboardingScreen.tsx
 *
 * Pixel-close implementation of Figma "iPhone 14 & 15 Pro - 26".
 *
 * Key design details from Figma spec:
 * - Background: #FAFAFA block with borderRadius 0 0 264px 0 (bottom-right only)
 * - Two decorative ellipse ring PNG assets (Ellipse9 & Ellipse10) at low opacity
 * - Pandit illustration overflows bottom of #FAFAFA block
 * - Progress: wide half-pill + 3 small circles
 * - Skip (outline) + Next (filled #2B000A) button row at bottom
 *
 * ASSET PATHS — place the exported PNGs at:
 *   src/assets/images/ellipse_ring_9.png   (Ellipse 9 — full ring)
 *   src/assets/images/ellipse_ring_10.png  (Ellipse 10 — partial ring, bottom-left)
 *   src/assets/images/pandit_slide1.png    (pandit illustration, slide 1)
 *   src/assets/images/slide2_image.png     (slide 2 illustration)
 *   src/assets/images/slide3_image.png     (slide 3 illustration)
 *   src/assets/images/slide4_image.png     (slide 4 illustration)
 *
 * Required packages (already in project):
 *   react-native-safe-area-context
 */

import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Platform,
  StatusBar,
  ListRenderItemInfo,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList} from './src/app/navigation/types';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Slide {
  id: string;
  title: string;
  subtitle: string;
  /** require() path for the main illustration */
  image: ReturnType<typeof require> | null;
}

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

// ─── Slide data ───────────────────────────────────────────────────────────────
const SLIDES: Slide[] = [
  {
    id: '1',
    title: 'Verified Pandits',
    subtitle:
      'Every pandit on Ritual24 is background-checked, certified, and rated by thousand of devotees.',
    // Replace with actual require once asset is added:
    // image: require('../../../assets/images/pandit_slide1.png'),
    image: null,
  },
  {
    id: '2',
    title: 'Easy Ritual Booking',
    subtitle:
      'Book any puja in under 2 minutes. Choose the ritual, pick a date, and your pandit is confirmed.',
    image: null,
  },
  {
    id: '3',
    title: 'Temple & Online Puja',
    subtitle:
      'Book darshan at top temples across India, or join live online puja from anywhere in the world.',
    image: null,
  },
  {
    id: '4',
    title: 'Sacred Muhurat Guide',
    subtitle:
      'Never miss an auspicious moment. Our Vedic calendar shows daily muhurats, festivals, and fasting days.',
    image: null,
  },
];

// ─── Design tokens (from Figma) ───────────────────────────────────────────────
const PRIMARY    = '#2B000A';
const BG_FAFAFA  = '#FAFAFA';
const WHITE      = '#FFFFFF';
const DOT_GRAY   = '#D9D9D9';
const TEXT_BLACK = '#000000';

// ─── Responsive scaling ───────────────────────────────────────────────────────
const { width: W, height: H } = Dimensions.get('window');
/** Scale factor relative to Figma 393px design width */
const scale = (px: number) => (W / 393) * px;
/** Height scale relative to Figma 852px design height */
const vScale = (px: number) => (H / 852) * px;

// ─── Component ────────────────────────────────────────────────────────────────
export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);
  const insets = useSafeAreaInsets();

  // ── Navigation handlers ─────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (activeIndex < SLIDES.length - 1) {
      const next = activeIndex + 1;
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setActiveIndex(next);
    } else {
      navigation.replace('Login');
    }
  }, [activeIndex, navigation]);

  const goSkip = useCallback(() => {
    navigation.replace('Login');
  }, [navigation]);

  // ── Render each slide ───────────────────────────────────────────────────────
  const renderSlide = useCallback(
    ({ item }: ListRenderItemInfo<Slide>) => (
      <SlideItem slide={item} />
    ),
    [],
  );

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // ── Button label ────────────────────────────────────────────────────────────
  const isLast = activeIndex === SLIDES.length - 1;

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={WHITE}
        translucent={false}
      />

      {/* ── Slide pager ─────────────────────────────────────────────────── */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
        style={styles.flatList}
        getItemLayout={(_, index) => ({
          length: W,
          offset: W * index,
          index,
        })}
      />

      {/* ── Progress indicator + Buttons (always on top of slides) ─────── */}
      <View
        style={[
          styles.bottomContainer,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        {/* Progress dots */}
        <ProgressDots total={SLIDES.length} active={activeIndex} />

        {/* Buttons row */}
        <View style={styles.buttonRow}>
          {/* Skip button — outline */}
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={goSkip}
            activeOpacity={0.75}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          {/* Next / Get Started button — filled */}
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={goNext}
            activeOpacity={0.85}
          >
            <Text style={styles.nextText}>
              {isLast ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ─── Slide item ───────────────────────────────────────────────────────────────
const SlideItem: React.FC<{ slide: Slide }> = ({ slide }) => {
  /**
   * Figma layout (393 × 852 frame):
   *
   * • #FAFAFA bg block: full width, height 671px (78.75% of screen),
   *   borderRadius 0 0 264px 0 (bottom-right only).
   *
   * • Ellipse 9 (full ring):
   *   natural size 383.57px, positioned left: -6.2px, top: 62px,
   *   rotated -153.16deg, opacity ~0.1 (gradient rgba(43,0,10,0.1)).
   *   We render using the PNG asset with low opacity.
   *
   * • Ellipse 10 (partial ring, bottom-left crop):
   *   natural size 383.57px, positioned left: -168px, top: 427.77px,
   *   rotated -3deg, same opacity.
   *
   * • Text block: left 20px, top 136px, width 299px.
   *
   * • Image (pandit): width 578px, height 543px, left -16px, bottom -142px
   *   relative to the FAFAFA block (so absolute bottom of FAFAFA = 671px,
   *   image bottom = 671 - (-142) = 813px → extends past FAFAFA).
   *   In responsive terms: image top = 671 - 543 + 142 = 270px from screen top.
   */

  // ── Responsive values ──────────────────────────────────────────────────────
  // FAFAFA block height (Figma: 671 / 852 = 78.75%)
  const bgBlockH = H * 0.7875;

  // Ellipse natural size scaled proportionally from Figma 393 width base
  const ellipseSize = scale(383.57);

  // Ellipse 9: top-left area
  const e9Left = scale(-6.2);
  const e9Top  = vScale(62);

  // Ellipse 10: lower-left, partially offscreen left
  const e10Left = scale(-168);
  const e10Top  = vScale(427.77);

  // Text block
  const textLeft = scale(20);
  const textTop  = vScale(136);
  const textWidth = scale(299);

  // Illustration: Figma width 578px on 393 base → 147% of screen width
  // Positioned left: -16px, bottom of image at (671 + 142) = 813px from screen top
  const illWidth  = scale(578);
  const illHeight = scale(543);  // preserve aspect ratio (578:543 ≈ 1:0.94)
  const illLeft   = scale(-16);
  // Top of illustration = bgBlockH + scale(-142) - illHeight
  // i.e. it sits such that its bottom is 142px below the FAFAFA block bottom
  const illTop = bgBlockH + scale(-142) - illHeight + illHeight;
  // Simplified: bottom edge of illustration = bgBlockH + scale(142)
  // So top = bgBlockH + scale(142) - illHeight
  const illTopCalc = bgBlockH + vScale(142) - illHeight;

  return (
    <View style={[styles.slide, { width: W }]}>

      {/* ── #FAFAFA background block with bottom-right radius ─────────── */}
      <View
        style={[
          styles.bgBlock,
          {
            height: bgBlockH,
            width: W,
            // bottom-right radius only: borderBottomRightRadius
            // Figma: 264px → scale proportionally
            borderBottomRightRadius: scale(264),
          },
        ]}
      />

      {/* ── Ellipse 9 — top-left decorative ring ──────────────────────── */}
      {/* Using PNG asset: opacity simulates rgba(43,0,10,0.1) gradient */}
      <View
        pointerEvents="none"
        style={[
          styles.ellipseWrapper,
          {
            width: ellipseSize,
            height: ellipseSize,
            left: e9Left,
            top: e9Top,
            // Figma: rotate(-153.16deg)
            transform: [{ rotate: '-153.16deg' }],
          },
        ]}
      >
        {slide.image !== null ? (
          // When real asset is available for ellipse 9:
          // <Image
          //   source={require('../../../assets/images/ellipse_ring_9.png')}
          //   style={{ width: ellipseSize, height: ellipseSize, opacity: 0.15 }}
          //   resizeMode="contain"
          // />
          null
        ) : (
          // Fallback: pure RN circle ring (approximation for dev)
          <View style={[styles.ellipseFallback, { width: ellipseSize, height: ellipseSize, opacity: 0.09 }]} />
        )}
      </View>

      {/* ── Ellipse 10 — lower-left decorative ring ───────────────────── */}
      <View
        pointerEvents="none"
        style={[
          styles.ellipseWrapper,
          {
            width: ellipseSize,
            height: ellipseSize,
            left: e10Left,
            top: e10Top,
            // Figma: rotate(-3deg)
            transform: [{ rotate: '-3deg' }],
          },
        ]}
      >
        {slide.image !== null ? (
          // <Image
          //   source={require('../../../assets/images/ellipse_ring_10.png')}
          //   style={{ width: ellipseSize, height: ellipseSize, opacity: 0.15 }}
          //   resizeMode="contain"
          // />
          null
        ) : (
          <View style={[styles.ellipseFallback, { width: ellipseSize, height: ellipseSize, opacity: 0.09 }]} />
        )}
      </View>

      {/* ── Main illustration ──────────────────────────────────────────── */}
      {/*
       * Figma: image 22 — width 578, height 543, left -16, bottom -142
       * (relative to the FAFAFA block bottom at 671px).
       * This means the image top = 671 - 543 - (-142) = 270px from top of screen
       * In responsive: illTopCalc (computed above)
       */}
      <View
        pointerEvents="none"
        style={[
          styles.illustrationWrapper,
          {
            width: illWidth,
            height: illHeight,
            left: illLeft,
            top: illTopCalc,
          },
        ]}
      >
        {slide.image ? (
          <Image
            source={slide.image}
            style={{ width: illWidth, height: illHeight }}
            resizeMode="contain"
          />
        ) : (
          // Placeholder when image asset not yet added
          <View style={[styles.imagePlaceholder, { width: illWidth, height: illHeight }]}>
            <Text style={styles.placeholderEmoji}>🙏</Text>
            <Text style={styles.placeholderText}>Add image asset</Text>
          </View>
        )}
      </View>

      {/* ── Text content — title + subtitle ───────────────────────────── */}
      <View
        style={[
          styles.textBlock,
          {
            left: textLeft,
            top: textTop,
            width: textWidth,
          },
        ]}
      >
        <Text style={styles.slideTitle}>{slide.title}</Text>
        <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
      </View>

    </View>
  );
};

// ─── Progress Dots ────────────────────────────────────────────────────────────
/**
 * Figma progress indicator (Frame 1000003226):
 * • Container: width 100px centered at top: 733px
 * • Active segment: wide pill shape, left half = active (#2B000A), right half = gray (#D9D9D9)
 *   implemented as a 40px wide bar with left 20px = #2B000A, right 20px = #D9D9D9
 * • Then 3 small circles at x: 52, 72, 92 — all #D9D9D9 — 8px diameter
 *
 * Simplified responsive version:
 * • Current active slide: filled wide pill + unfilled pill, then N-1 small dots
 */
const ProgressDots: React.FC<{ total: number; active: number }> = ({ total, active }) => (
  <View style={styles.progressContainer}>
    {Array.from({ length: total }, (_, i) => {
      const isActive  = i === active;
      const isPrevious = i < active;
      return (
        <View
          key={i}
          style={[
            styles.progressDot,
            isActive   && styles.progressDotActive,
            isPrevious && styles.progressDotDone,
          ]}
        />
      );
    })}
  </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

  // ── Root ──────────────────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: WHITE,
  },

  flatList: {
    flex: 1,
  },

  // ── Slide ─────────────────────────────────────────────────────────────
  slide: {
    flex: 1,
    backgroundColor: WHITE,
    // Height fills available space above the bottom container
    // (FlatList takes flex:1, bottom container has fixed height)
    position: 'relative',
    overflow: 'hidden',
  },

  // ── FAFAFA background block ────────────────────────────────────────────
  bgBlock: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: BG_FAFAFA,
    // bottom-right radius applied inline from scale()
  },

  // ── Ellipse wrappers ───────────────────────────────────────────────────
  ellipseWrapper: {
    position: 'absolute',
    // overflow hidden so the ring doesn't bleed into text area
    overflow: 'hidden',
  },

  // Fallback ring when PNG asset is not yet available
  ellipseFallback: {
    borderRadius: 999,
    borderWidth: 40,
    borderColor: `rgba(43, 0, 10, 0.08)`,
    backgroundColor: 'transparent',
  },

  // ── Illustration ───────────────────────────────────────────────────────
  illustrationWrapper: {
    position: 'absolute',
    // overflow visible so pandit figure shows below FAFAFA block
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(43, 0, 10, 0.04)',
    borderRadius: 20,
  },
  placeholderEmoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 12,
    color: 'rgba(43, 0, 10, 0.4)',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // ── Text block ─────────────────────────────────────────────────────────
  textBlock: {
    position: 'absolute',
    gap: 12,
  },
  slideTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 36,
    color: TEXT_BLACK,
    letterSpacing: -0.3,
  },
  slideSubtitle: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato_400Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: TEXT_BLACK,
  },

  // ── Bottom container (progress + buttons) ──────────────────────────────
  bottomContainer: {
    width: '100%',
    backgroundColor: WHITE,
    paddingTop: 16,
    paddingHorizontal: scale(20),
    gap: 16,
  },

  // ── Progress dots ──────────────────────────────────────────────────────
  /**
   * Figma spec: 100px container centred
   * — Active slide: a wide 40px bar split half/half (#2B000A | #D9D9D9)
   * — Other slides: 8px circle #D9D9D9
   *
   * Implementation: each dot is either a wide pill (active) or small circle.
   * The "half-filled" pill from Figma is achieved by showing:
   *   • left 20px = #2B000A  → leftSegment
   *   • right 20px = #D9D9D9 → rightSegment
   * Here we simplify to a full pill for active, circle for inactive.
   */
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: DOT_GRAY,
  },
  progressDotActive: {
    // Wide pill for active slide — matches Figma "Line 14" over "Line 13"
    width: 32,
    borderRadius: 4,
    backgroundColor: PRIMARY,
  },
  progressDotDone: {
    // Completed slides: slightly smaller circle, still gray
    width: 8,
    borderRadius: 4,
    backgroundColor: DOT_GRAY,
  },

  // ── Button row ─────────────────────────────────────────────────────────
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    // Figma: Skip = 85px wide, Next = 261px wide, left: 20px
    // Total: 85 + 8 + 261 = 354px on 393-20*2 = 353px content width → perfect fit
  },

  // Skip — outline
  skipBtn: {
    width: scale(85),
    height: scale(42),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
  },
  skipText: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato_500Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: PRIMARY,
  },

  // Next — filled
  nextBtn: {
    flex: 1,              // takes remaining width = ~261px equivalent
    height: scale(42),
    borderRadius: 12,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato_500Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: WHITE,
  },
});