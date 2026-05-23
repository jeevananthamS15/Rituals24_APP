/**
 * OnboardingSlide.tsx
 * Path: src/features/auth/components/OnboardingSlide.tsx
 *
 * Self-contained slide component used inside OnboardingScreen's FlatList.
 *
 * ─── ASSET SETUP ──────────────────────────────────────────────────────────────
 * Add these files to your project:
 *
 *   src/assets/images/ellipse_ring_9.png
 *     → Exported from Figma: "Ellipse 9" layer (full ring with gradient)
 *     → Use as-is — opacity is applied in code (0.15)
 *
 *   src/assets/images/ellipse_ring_10.png
 *     → Exported from Figma: "Ellipse 10" layer (partial bottom-left ring)
 *     → Use as-is — opacity is applied in code (0.15)
 *
 * ─── FIGMA MEASUREMENTS ───────────────────────────────────────────────────────
 * Figma canvas: 393 × 852px
 *
 * FAFAFA block:  width 393, height 671, borderRadius 0 0 264 0
 * Ellipse 9:     383.57 × 383.57, left -6.2, top 62, rotate(-153.16deg)
 * Ellipse 10:    383.57 × 383.57, left -168, top 427.77, rotate(-3deg)
 * image 22:      578 × 543, left -16, bottom -142 (relative to FAFAFA block)
 * Text block:    width 299, left 20, top 136, gap 12
 * ──────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  ImageSourcePropType,
} from 'react-native';

// ─── Responsive helpers ───────────────────────────────────────────────────────
const { width: W, height: H } = Dimensions.get('window');
/** Scale a Figma px value (based on 393px design width) */
const s  = (px: number) => (W / 393) * px;
/** Scale a Figma px value (based on 852px design height) */
const vs = (px: number) => (H / 852) * px;

// ─── Design constants ─────────────────────────────────────────────────────────
const BG_FAFAFA  = '#FAFAFA';
const TEXT_BLACK = '#000000';

// ─── Props ────────────────────────────────────────────────────────────────────
export interface OnboardingSlideData {
  id: string;
  title: string;
  subtitle: string;
  /** Illustration image source — require('...') */
  image?: ImageSourcePropType;
}

interface Props {
  item: OnboardingSlideData;
}

// ─── Ellipse PNG asset references ─────────────────────────────────────────────
// Uncomment once assets are placed in the correct directory:
//
// const ELLIPSE_9  = require('../../../assets/images/ellipse_ring_9.png');
// const ELLIPSE_10 = require('../../../assets/images/ellipse_ring_10.png');
//
// Until then, the component renders a pure-RN ring fallback.
const ELLIPSE_9:  ImageSourcePropType | null = null;
const ELLIPSE_10: ImageSourcePropType | null = null;

// ─── Component ────────────────────────────────────────────────────────────────
export const OnboardingSlide: React.FC<Props> = ({ item }) => {

  // ── Layout math (Figma → responsive) ───────────────────────────────────────

  /** FAFAFA block height: 671px / 852px = 78.75% of screen */
  const bgH = H * 0.7875;

  /** Ellipse natural size (proportional to Figma 393 base) */
  const ellipseSize = s(383.57);

  /**
   * Illustration dimensions:
   * Figma: 578 × 543 — wider than screen (578 > 393).
   * Scale by width factor: s(578) keeps it proportionally larger than screen.
   */
  const illW = s(578);
  const illH = s(543);   // maintains Figma aspect ratio

  /**
   * Illustration position:
   * Figma: left -16px, bottom -142px (relative to FAFAFA block bottom = bgH).
   * Resolved to absolute screen coordinates:
   *   top = bgH - illH + vs(-(-142))
   *       = bgH - illH + vs(142)
   * This places the image so its bottom is 142px BELOW the FAFAFA block edge.
   */
  const illTop  = bgH - illH + vs(142);
  const illLeft = s(-16);

  return (
    <View style={[styles.slide, { width: W }]}>

      {/* ── LAYER 1: #FAFAFA background block ─────────────────────────── */}
      <View
        style={[
          styles.bgBlock,
          {
            height: bgH,
            borderBottomRightRadius: s(264),
          },
        ]}
      />

      {/* ── LAYER 2: Ellipse 9 (top-left ring) ────────────────────────── */}
      {/*
       * Figma:
       *   position: left -6.2px, top 62px
       *   size: 383.57 × 383.57
       *   rotate: -153.16deg
       *   gradient: rgba(43,0,10,0.1) → rgba(255,255,255,0.1)
       *
       * The gradient is baked into the PNG export. We apply opacity here
       * to simulate the rgba(43,0,10,0.1) maximum — opacity ~0.15 gives
       * a barely-visible, delicate ring matching the Figma screenshot.
       */}
      <View
        pointerEvents="none"
        style={[
          styles.ellipseContainer,
          {
            width: ellipseSize,
            height: ellipseSize,
            left: s(-6.2),
            top: vs(62),
            transform: [{ rotate: '-153.16deg' }],
          },
        ]}
      >
        {ELLIPSE_9 ? (
          <Image
            source={ELLIPSE_9}
            style={{ width: ellipseSize, height: ellipseSize, opacity: 0.15 }}
            resizeMode="contain"
            fadeDuration={0}
          />
        ) : (
          /* Dev fallback — remove once PNG asset is added */
          <RingFallback size={ellipseSize} opacity={0.09} />
        )}
      </View>

      {/* ── LAYER 3: Ellipse 10 (lower-left partial ring) ─────────────── */}
      {/*
       * Figma:
       *   position: left -168px, top 427.77px
       *   size: 383.57 × 383.57
       *   rotate: -3deg
       *   Same gradient as Ellipse 9.
       *
       * The -168px left offset means most of the ring is off-screen left,
       * showing only the right arc — matching the screenshot perfectly.
       */}
      <View
        pointerEvents="none"
        style={[
          styles.ellipseContainer,
          {
            width: ellipseSize,
            height: ellipseSize,
            left: s(-168),
            top: vs(427.77),
            transform: [{ rotate: '-3deg' }],
          },
        ]}
      >
        {ELLIPSE_10 ? (
          <Image
            source={ELLIPSE_10}
            style={{ width: ellipseSize, height: ellipseSize, opacity: 0.15 }}
            resizeMode="contain"
            fadeDuration={0}
          />
        ) : (
          /* Dev fallback — remove once PNG asset is added */
          <RingFallback size={ellipseSize} opacity={0.09} />
        )}
      </View>

      {/* ── LAYER 4: Main illustration ─────────────────────────────────── */}
      {/*
       * Figma: image 22 — 578×543, left -16, bottom -142 of FAFAFA block.
       * z-index above ellipses, below text.
       */}
      <View
        pointerEvents="none"
        style={[
          styles.illustrationWrapper,
          {
            width: illW,
            height: illH,
            left: illLeft,
            top: illTop,
          },
        ]}
      >
        {item.image ? (
          <Image
            source={item.image}
            style={{ width: illW, height: illH }}
            resizeMode="contain"
            fadeDuration={0}
          />
        ) : (
          /* Dev placeholder */
          <IllustrationPlaceholder width={illW} height={illH} />
        )}
      </View>

      {/* ── LAYER 5: Text content ──────────────────────────────────────── */}
      {/*
       * Figma: left 20, top 136, width 299, gap 12
       * Title:    Lato 700, 28px, 36px lineHeight, #000000
       * Subtitle: Lato 400, 14px, 22px lineHeight, #000000
       */}
      <View
        style={[
          styles.textBlock,
          {
            left: s(20),
            top: vs(136),
            width: s(299),
          },
        ]}
      >
        <Text style={styles.title} numberOfLines={2} allowFontScaling={false}>
          {item.title}
        </Text>
        <Text style={styles.subtitle} allowFontScaling={false}>
          {item.subtitle}
        </Text>
      </View>

    </View>
  );
};

// ─── Dev fallback ring (replace with PNG) ─────────────────────────────────────
const RingFallback: React.FC<{ size: number; opacity: number }> = ({ size, opacity }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: size * 0.1,
      borderColor: `rgba(43, 0, 10, ${opacity * 2})`,
      backgroundColor: 'transparent',
      opacity,
    }}
  />
);

// ─── Dev illustration placeholder ────────────────────────────────────────────
const IllustrationPlaceholder: React.FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <View
    style={{
      width,
      height,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ fontSize: s(100) }}>🙏</Text>
    <Text
      style={{
        fontSize: s(12),
        color: 'rgba(43,0,10,0.3)',
        marginTop: vs(8),
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
      }}
    >
      Add pandit illustration PNG
    </Text>
  </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },

  bgBlock: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: BG_FAFAFA,
    // borderBottomRightRadius applied inline
  },

  ellipseContainer: {
    position: 'absolute',
    // Do NOT set overflow:hidden — the ring must show past edges
  },

  illustrationWrapper: {
    position: 'absolute',
    zIndex: 2,
  },

  textBlock: {
    position: 'absolute',
    zIndex: 3,
    gap: 12,
  },

  title: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 36,
    color: TEXT_BLACK,
    letterSpacing: -0.3,
  },

  subtitle: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato_400Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: TEXT_BLACK,
  },
});