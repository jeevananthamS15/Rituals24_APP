import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path, Circle, Line} from 'react-native-svg';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const DESIGN_WIDTH = 393;

const scale = (size: number) => (size / DESIGN_WIDTH) * SCREEN_WIDTH;

const C = {
  primary: '#2B000A',
  textPrimary: '#281518',
  textSecondary: '#757575',
  textMuted: '#666666',
  textBody: '#505050',
  gold: '#F3B416',
  white: '#FFFFFF',
  border: '#D9D9D9',
  bgLight: '#F9F9F9',
  pinkLight: '#FFE8ED',
  reviewBg: 'rgba(221,171,44,0.12)',
  tagBg: '#F9F9F9',
  black: '#000000',
  priceBg: 'rgba(237,237,237,0.34)',
};

// ─────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────

const ChevronLeft = ({color = C.white, size = 20}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={color}
      strokeWidth={1.64}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BellIcon = ({color = C.white, size = 20}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
      stroke={color}
      strokeWidth={1.64}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21a2 2 0 0 1-3.46 0"
      stroke={color}
      strokeWidth={1.64}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HeartIcon = ({color = C.white, size = 20}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke={color}
      strokeWidth={1.64}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CartIcon = ({color = C.white, size = 20}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="9" cy="21" r="1" stroke={color} strokeWidth={1.64} />
    <Circle cx="20" cy="21" r="1" stroke={color} strokeWidth={1.64} />
    <Path
      d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
      stroke={color}
      strokeWidth={1.64}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ClockIcon = ({color = '#757575', size = 16}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={1.5} />
    <Path
      d="M12 6v6l4 2"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const StarIcon2 = ({color = '#757575', size = 16}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const StarFilledIcon = ({size = 16}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={C.gold}
    />
  </Svg>
);

const ChevronDownIcon = ({size = 24, rotated = false}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={rotated ? {transform: [{rotate: '180deg'}]} : {}}>
    <Path
      d="M6 9l6 6 6-6"
      stroke={C.black}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const InfoIcon = ({size = 14}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={C.primary} strokeWidth={1} />
    <Line
      x1="12"
      y1="8"
      x2="12"
      y2="8"
      stroke={C.primary}
      strokeWidth={1}
      strokeLinecap="round"
    />
    <Path
      d="M12 11v6"
      stroke={C.primary}
      strokeWidth={1}
      strokeLinecap="round"
    />
  </Svg>
);

const ArrowRightIcon = ({size = 24, color = C.white}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12h14M12 5l7 7-7 7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ─────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────

const IconButton = ({children, onPress}: any) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={styles.iconBtn}>
    {children}
  </TouchableOpacity>
);

const TagPill = ({icon, label}: any) => (
  <View style={styles.tagPill}>
    {icon}
    <Text style={styles.tagLabel}>{label}</Text>
  </View>
);

const FAQItem = ({question, answer, defaultOpen = false}: any) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen(!open)}
        style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{question}</Text>

        <ChevronDownIcon size={24} rotated={open} />
      </TouchableOpacity>

      {open && answer ? <Text style={styles.faqAnswer}>{answer}</Text> : null}
    </View>
  );
};

// ─────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────

export const PujaDetailScreen = ({navigation, route}: any) => {
  const insets = useSafeAreaInsets();

  const {pujaId, puja} = route.params;

  const pujaData = puja || {};

  const imageUri =
    pujaData?.imageUrl?.uri ||
    pujaData?.imageUrl ||
    'https://via.placeholder.com/300';

  const title = pujaData?.title || pujaData?.name || 'Sacred Puja';

  const rating = pujaData?.rating || 4.5;

  const reviewCount = pujaData?.reviewCount || 120;

  const duration = pujaData?.duration || '2 Hours';

  const category = pujaData?.category || 'Spiritual';

  const price = pujaData?.price || 0;

  const originalPrice = pujaData?.originalPrice || price + 500;

  const description =
    pujaData?.description ||
    "One of the most beloved Vaishnava rituals, performed to seek Lord Vishnu's blessings.";

  const benefits = pujaData?.benefits || [
    'Brings prosperity and wealth',
    'Fulfills heartfelt wishes',
    'Strengthens family bonds',
    'Removes financial obstacles',
  ];

  const idealFor =
    pujaData?.idealFor || 'Overcoming obstacles, prosperity & peace';

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          paddingBottom: 111 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}>
        {/* HERO IMAGE */}

        <View style={styles.heroContainer}>
          <ImageBackground
            source={{
              uri: imageUri,
            }}
            style={styles.heroImage}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(0,0,0,0.62)', 'rgba(102,102,102,0)']}
              style={StyleSheet.absoluteFillObject}
            />

            {/* ACTION BUTTONS */}

            <View style={[styles.heroActions, {top: (insets.top || 21) + 42}]}>
              <IconButton onPress={() => navigation.goBack()}>
                <ChevronLeft size={scale(20)} />
              </IconButton>

              <View style={styles.heroRight}>
                <IconButton>
                  <BellIcon size={scale(20)} />
                </IconButton>

                <IconButton>
                  <HeartIcon size={scale(20)} />
                </IconButton>

                <IconButton>
                  <CartIcon size={scale(20)} />
                </IconButton>
              </View>
            </View>

            {/* DOTS */}

            <View style={styles.dotRow}>
              {[0, 1, 2, 3].map(i => (
                <View
                  key={i}
                  style={[styles.dot, i === 0 && styles.dotActive]}
                />
              ))}
            </View>
          </ImageBackground>
        </View>

        {/* CONTENT */}

        <View style={styles.content}>
          {/* TITLE */}

          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.ratingRow}>
              <StarFilledIcon size={16} />

              <Text style={styles.ratingValue}>{rating}</Text>

              <Text style={styles.ratingCount}>({reviewCount})</Text>
            </View>
          </View>

          {/* TAGS */}

          <View style={styles.tagRow}>
            <TagPill icon={<ClockIcon size={16} />} label={duration} />

            <TagPill
              icon={<StarIcon2 size={16} color="#757575" />}
              label={category}
            />
          </View>

          {/* PRICE */}

          <View style={styles.pricingSection}>
            <Text style={styles.pricingLabel}>Starting from</Text>

            <View style={styles.priceRow}>
              <Text style={styles.priceMain}>₹{price}</Text>

              <Text style={styles.priceStrike}>₹{originalPrice}</Text>
            </View>

            <View style={styles.priceDisclaimer}>
              <Text style={styles.priceDisclaimerText}>
                Final price depends on pandit, mode & add-ons
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* DESCRIPTION */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>

            <Text style={styles.bodyText}>{description}</Text>
          </View>

          {/* BENEFITS */}

          <View style={styles.benefitsCard}>
            <View style={styles.benefitsTop}>
              <Text style={styles.sectionTitle}>Benefits</Text>

              <Text style={styles.benefitsBody}>
                {benefits.map((item: string) => `• ${item}`).join('\n')}
              </Text>
            </View>

            {/* IDEA FOR */}

            <View style={styles.ideaCard}>
              <View style={styles.ideaForRow}>
                <InfoIcon size={14} />

                <Text style={styles.ideaForLabel}>Ideal For</Text>
              </View>

              <Text style={styles.ideaText}>{idealFor}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* FAQ */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>FAQ</Text>

            <View style={styles.faqList}>
              <FAQItem
                question="What are the benefits of this puja?"
                answer={description}
                defaultOpen
              />

              <FAQItem question="Can this puja be performed online?" />

              <FAQItem question="Are puja samagri included?" />
            </View>
          </View>

          <View style={styles.divider} />

          {/* REVIEW */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>

            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>R</Text>
                </View>

                <Text style={styles.reviewerName}>Ramesh</Text>

                <View style={styles.reviewStars}>
                  {[0, 1, 2, 3, 4].map(i => (
                    <StarFilledIcon key={i} size={16} />
                  ))}
                </View>
              </View>

              <Text style={styles.reviewText}>
                Fresh, Pure and Good quality. Perfect for puja
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM BAR */}

      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom: insets.bottom || 16,
          },
        ]}>
        <View style={styles.bottomLeft}>
          <Text style={styles.bottomPrice}>₹{price}</Text>

          <Text style={styles.bottomSubtitle}>Puja + Pandits</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.bookingBtn}
          onPress={() =>
            navigation.navigate('Checkout', {
              screen: 'ServiceMode',
              params: {
                pujaId,
                puja: pujaData,
              },
            })
          }>
          <Text style={styles.bookingBtnText}>Continue Booking</Text>

          <ArrowRightIcon size={20} color={C.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.white,
  },

  scroll: {
    flex: 1,
  },

  heroContainer: {
    width: '100%',
    height: scale(382),
  },

  heroImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },

  heroActions: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  heroRight: {
    flexDirection: 'row',
    gap: 8,
  },

  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.33)',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 35,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  dotActive: {
    backgroundColor: C.white,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: C.textPrimary,
    flex: 1,
    marginRight: 8,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  ratingValue: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: C.textPrimary,
    marginLeft: 2,
  },

  ratingCount: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    color: C.textMuted,
  },

  tagRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },

  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: C.tagBg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 17,
  },

  tagLabel: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: C.textBody,
  },

  pricingSection: {
    marginBottom: 16,
    gap: 4,
  },

  pricingLabel: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: C.textSecondary,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },

  priceMain: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: C.textPrimary,
  },

  priceStrike: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: C.textSecondary,
    textDecorationLine: 'line-through',
  },

  priceDisclaimer: {
    backgroundColor: C.priceBg,
    borderRadius: 42,
    paddingVertical: 2,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
  },

  priceDisclaimerText: {
    fontFamily: 'Inter',
    fontSize: 8,
    fontWeight: '400',
    lineHeight: 10,
    color: C.textSecondary,
  },

  divider: {
    height: 1,
    backgroundColor: C.border,
    marginHorizontal: -20,
    marginVertical: 20,
  },

  section: {
    gap: 8,
    marginBottom: 4,
  },

  sectionTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    color: C.black,
  },

  bodyText: {
    fontFamily: 'Lato',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: C.textSecondary,
  },

  benefitsCard: {
    backgroundColor: C.bgLight,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },

  benefitsTop: {
    gap: 8,
  },

  benefitsBody: {
    fontFamily: 'Lato',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: C.textSecondary,
  },

  ideaCard: {
    backgroundColor: C.pinkLight,
    borderRadius: 16,
    padding: 12,
    gap: 4,
  },

  ideaForRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ideaForLabel: {
    fontFamily: 'Lato',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: C.black,
  },

  ideaText: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    color: C.black,
  },

  faqList: {
    gap: 8,
  },

  faqItem: {
    backgroundColor: C.bgLight,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 16,
  },

  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  faqQuestion: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: C.black,
    flex: 1,
  },

  faqAnswer: {
    fontFamily: 'Lato',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: C.textSecondary,
    marginTop: 10,
  },

  reviewCard: {
    backgroundColor: C.reviewBg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },

  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 10,
    fontWeight: '700',
    color: C.primary,
  },

  reviewerName: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: C.black,
    flex: 1,
  },

  reviewStars: {
    flexDirection: 'row',
    gap: 2,
  },

  reviewText: {
    fontFamily: 'Lato',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: C.black,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 111,
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    justifyContent: 'space-between',
  },

  bottomLeft: {
    justifyContent: 'center',
    gap: 2,
  },

  bottomPrice: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: C.textPrimary,
  },

  bottomSubtitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: C.textSecondary,
  },

  bookingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: C.primary,
    borderRadius: 12,
    height: 40,
    minWidth: scale(248 - 80),
  },

  bookingBtnText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#FFFAF0',
  },
});

export default PujaDetailScreen;
