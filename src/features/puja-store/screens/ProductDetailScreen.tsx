import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProductCard} from '../components/ProductCard';

import {
  ChevronLeft,
  Bell,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Check,
  Star,
  Box,
  ChevronRight,
} from 'lucide-react-native';

import {StoreStackParamList} from '../../../app/navigation/types';
import {MOCK_PRODUCTS} from '../../../constants/mockData';
const {width: SW} = Dimensions.get('window');
const scale = (px: number) => (px / 393) * SW;
const PRIMARY = '#2B000A';
const GONDOLA = '#281518';
const WHITE = '#FFFFFF';
const GRAY_BORDER = '#D9D9D9';
const GRAY_BG = '#F9F9F9';
const TEXT_MUTED = '#757575';
const TEXT_DARK = '#000000';
const STAR_GOLD = '#F3B416';
const GREEN = '#039900';
const GREEN_BG = 'rgba(3,153,0,0.12)';
const REVIEW_BG = 'rgba(221,171,44,0.12)';
const CHIP_BG = '#F2F2F7';
const BRIDAL_HEATH = '#FFFAF0';

type Props = NativeStackScreenProps<StoreStackParamList, 'ProductDetail'>;

const INCLUDED_ITEMS = [
  'Brass Kalash',
  'Mango Leaves',
  'Turmeric & Kumkum',
  'Akshat (Rice)',
  'Incense & Camphor',
  'Puja Thali',
  'Coconut',
  'Cotton Wicks & Ghee',
];

const HeroAction = ({children}: {children: React.ReactNode}) => (
  <View style={heroStyles.actionCircle}>{children}</View>
);

const IncludedChip = ({label}: {label: string}) => (
  <View style={chipStyles.chip}>
    <View style={chipStyles.checkCircle}>
      <Check size={8} color={WHITE} strokeWidth={1.5} />
    </View>
    <Text style={chipStyles.label}>{label}</Text>
  </View>
);

const StarRow = ({count = 5}: {count?: number}) => (
  <View style={{flexDirection: 'row', gap: 2}}>
    {Array.from({length: count}).map((_, i) => (
      <Star
        key={i}
        size={16}
        color={STAR_GOLD}
        fill={STAR_GOLD}
        strokeWidth={0}
      />
    ))}
  </View>
);

export const ProductDetailScreen = ({route, navigation}: Props) => {
  const {productId} = route.params;
  const product =
    MOCK_PRODUCTS.find(p => p.id === productId) ?? MOCK_PRODUCTS[0];
  const related = MOCK_PRODUCTS.filter(p => p.id !== productId).slice(0, 3);
  const [quantity, setQuantity] = useState(2);

  const IMAGE_HEIGHT = scale(382);

  return (
    <View style={s.root}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}>
        <View style={[s.heroContainer, {height: IMAGE_HEIGHT}]}>
          <Image
            source={product.imageUrl}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />

          <View style={s.heroGradient} />

          <SafeAreaView style={s.heroSafeArea}>
            <View style={s.heroControls}>
              <TouchableOpacity
                style={heroStyles.actionCircle}
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}>
                <ChevronLeft
                  size={scale(19.64)}
                  color={WHITE}
                  strokeWidth={1.64}
                />
              </TouchableOpacity>

              <View style={heroStyles.rightActions}>
                <HeroAction>
                  <Bell size={scale(19.64)} color={WHITE} strokeWidth={1.64} />
                </HeroAction>
                <HeroAction>
                  <Heart size={scale(19.64)} color={WHITE} strokeWidth={1.64} />
                </HeroAction>
                <HeroAction>
                  <ShoppingCart
                    size={scale(19.64)}
                    color={WHITE}
                    strokeWidth={1.64}
                  />
                </HeroAction>
              </View>
            </View>
          </SafeAreaView>

          <View style={s.dotsContainer}>
            {[0, 1, 2, 3].map(i => (
              <View key={i} style={s.dot} />
            ))}
          </View>
        </View>

        <View style={s.body}>
          <View style={s.titleRow}>
            <Text style={s.title} numberOfLines={1}>
              {product.name}
            </Text>
            <View style={s.ratingInline}>
              <Star
                size={16}
                color={STAR_GOLD}
                fill={STAR_GOLD}
                strokeWidth={0}
              />
              <Text style={s.ratingVal}>{product.rating}</Text>
              <Text style={s.ratingCount}>({product.reviewCount})</Text>
            </View>
          </View>

          <View style={s.itemsBadge}>
            <Box size={16} color={TEXT_MUTED} strokeWidth={1.5} />
            <Text style={s.itemsBadgeText}>
              {product.itemCount} items included
            </Text>
          </View>

          <View style={s.priceRow}>
            <Text style={s.price}>
              ₹{product.price?.toLocaleString('en-IN')}
            </Text>
            <Text style={s.originalPrice}>
              ₹{product.originalPrice?.toLocaleString('en-IN')}
            </Text>
          </View>

          <View style={s.qtyBar}>
            <Text style={s.qtyLabel}>Quantity</Text>
            <View style={s.qtyControls}>
              <TouchableOpacity
                style={s.qtySquareBtn}
                onPress={() => setQuantity(q => Math.max(1, q - 1))}
                activeOpacity={0.8}>
                <Minus size={18} color={WHITE} strokeWidth={1.5} />
              </TouchableOpacity>
              <Text style={s.qtyValue}>{quantity}</Text>

              <TouchableOpacity
                style={s.qtySquareBtn}
                onPress={() => setQuantity(q => q + 1)}
                activeOpacity={0.8}>
                <Plus size={18} color={WHITE} strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={s.deliveryBadge}>
            <Text style={s.deliveryText}>Delivery by 20 May, Wed</Text>
          </View>

          <View style={s.divider} />

          <View style={s.descSection}>
            <Text style={s.sectionTitle}>Description</Text>
            <Text style={s.descText}>
              Complete puja samagri kit for Griha Pravesh ceremony. Includes
              kalash, mango leaves, turmeric, kumkum, akshat, and all
              essentials.
            </Text>
          </View>

          <View style={s.divider} />

          <View style={s.includedCard}>
            <Text style={s.includedTitle}>What's Included</Text>
            <View style={s.chipsGrid}>
              {INCLUDED_ITEMS.map((item, i) => (
                <IncludedChip key={i} label={item} />
              ))}
            </View>
          </View>

          <View style={s.divider} />

          <Text style={s.sectionTitle}>Reviews</Text>
          <View style={s.reviewCard}>
            <View style={s.reviewHeader}>
              <View style={s.reviewAvatar} />
              <Text style={s.reviewerName}>Ramesh</Text>
            </View>

            <View style={s.reviewStarsAbsolute}>
              <StarRow count={5} />
            </View>

            <Text style={s.reviewText}>
              Fresh, Pure and Good quality. Perfect for puja
            </Text>
          </View>

          <View style={s.divider} />

          <View style={s.relatedHeader}>
            <Text style={s.sectionTitle}>Product may also like</Text>
            <TouchableOpacity style={s.viewAllBtn} activeOpacity={0.7}>
              <Text style={s.viewAllText}>View All</Text>
              <ChevronRight size={20} color={PRIMARY} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.relatedScroll}>
            {related.map(item => (
              <ProductCard
                key={item.id}
                item={item}
                onPress={id =>
                  navigation.replace('ProductDetail', {productId: id})
                }
                onAdd={() => {}}
                variant="home"
              />
            ))}
          </ScrollView>

          <View style={{height: scale(111)}} />
        </View>
      </ScrollView>

      <View style={s.stickyBottom}>
        <TouchableOpacity
          style={s.cartBtn}
          activeOpacity={0.8}
          onPress={() => {}}>
          <Text style={s.cartBtnText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.buyBtn}
          activeOpacity={0.8}
          onPress={() => {}}>
          <Text style={s.buyBtnText}>
            Buy At ₹{product.price?.toLocaleString('en-IN')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const heroStyles = StyleSheet.create({
  actionCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightActions: {
    flexDirection: 'row',
    gap: scale(8),
  },
});

const chipStyles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    backgroundColor: CHIP_BG,
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 19,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 1,
  },
  checkCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: TEXT_DARK,
  },
});

const relStyles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
    marginRight: scale(8),
  },
  image: {
    height: scale(160),
    backgroundColor: '#727272',
  },
  body: {
    padding: 8,
    gap: 4,
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 22,
    color: GONDOLA,
  },
  itemCount: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: TEXT_MUTED,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingVal: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    lineHeight: 18,
    color: GONDOLA,
  },
  reviewCount: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: '#666666',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  price: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: GONDOLA,
  },
  originalPrice: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: TEXT_MUTED,
    textDecorationLine: 'line-through',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY,
    borderRadius: 12,
    height: 40,
    gap: 6,
  },
  addText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: BRIDAL_HEATH,
  },
});

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: WHITE,
  },
  scrollContent: {
    flexGrow: 1,
  },

  heroContainer: {
    width: SW,
    overflow: 'hidden',
    backgroundColor: '#727272',
  },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: scale(148),
    backgroundColor: 'transparent',
  },
  heroSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  heroControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: Platform.OS === 'android' ? scale(24) : scale(16),
  },
  dotsContainer: {
    position: 'absolute',
    bottom: scale(18),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    backgroundColor: 'rgba(0,0,0,0.33)',
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: 35,
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: WHITE,
  },

  body: {
    paddingHorizontal: scale(20),
    paddingTop: scale(16),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: scale(24),
    lineHeight: scale(32),
    color: GONDOLA,
    flex: 1,
    marginRight: scale(8),
  },
  ratingInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(2),
  },
  ratingVal: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    lineHeight: 18,
    color: GONDOLA,
  },
  ratingCount: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: '#666666',
  },

  itemsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: GRAY_BORDER,
    borderRadius: 17,
    backgroundColor: GRAY_BG,
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    marginBottom: scale(16),
  },
  itemsBadgeText: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    lineHeight: 18,
    color: TEXT_MUTED,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginBottom: scale(16),
  },
  price: {
    fontFamily: 'Lato-Bold',
    fontSize: scale(24),
    lineHeight: scale(32),
    color: GONDOLA,
  },
  originalPrice: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    lineHeight: 18,
    color: TEXT_MUTED,
    textDecorationLine: 'line-through',
  },

  qtyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scale(40),
    borderWidth: 0.75,
    borderColor: GRAY_BORDER,
    borderRadius: scale(14.25),
    backgroundColor: GRAY_BG,
    paddingHorizontal: scale(12),
    marginBottom: scale(8),
  },
  qtyLabel: {
    fontFamily: 'Lato-Bold',
    fontSize: scale(16),
    lineHeight: scale(24),
    color: TEXT_DARK,
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  qtySquareBtn: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(4.5),
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyValue: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 22,
    color: TEXT_DARK,
    minWidth: scale(9),
    textAlign: 'center',
  },

  deliveryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: GREEN_BG,
    borderRadius: 19,
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    marginBottom: scale(16),
  },
  deliveryText: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    lineHeight: 18,
    color: GREEN,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: GRAY_BORDER,
    marginVertical: scale(16),
  },

  descSection: {
    gap: scale(8),
  },
  sectionTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: scale(20),
    lineHeight: scale(28),
    color: TEXT_DARK,
    marginBottom: scale(8),
  },
  descText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: TEXT_MUTED,
  },

  includedCard: {
    borderWidth: 1,
    borderColor: GRAY_BORDER,
    borderRadius: 16,
    backgroundColor: GRAY_BG,
    padding: scale(16),
  },
  includedTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: scale(20),
    lineHeight: scale(28),
    color: TEXT_DARK,
    marginBottom: scale(12),
  },
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
  },

  reviewCard: {
    borderWidth: 1,
    borderColor: GRAY_BORDER,
    borderRadius: 16,
    backgroundColor: REVIEW_BG,
    padding: scale(16),
    paddingTop: scale(17),
    minHeight: scale(89),
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginBottom: scale(16),
  },
  reviewAvatar: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: GRAY_BORDER,
  },
  reviewerName: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    lineHeight: 18,
    color: TEXT_DARK,
  },
  reviewStarsAbsolute: {
    position: 'absolute',
    top: scale(20),
    right: scale(16),
  },
  reviewText: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: TEXT_DARK,
  },

  relatedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Lato-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: PRIMARY,
  },

  relatedScroll: {
    paddingBottom: scale(8),
  },

  stickyBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: GRAY_BORDER,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    paddingHorizontal: scale(20),
    paddingTop: scale(16),
    paddingBottom: Platform.OS === 'ios' ? scale(34) : scale(16),

    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  cartBtn: {
    flex: 136 / (136 + 205),
    height: scale(40),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PRIMARY,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBtnText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: PRIMARY,
  },
  buyBtn: {
    flex: 205 / (136 + 205),
    height: scale(40),
    borderRadius: 12,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtnText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: BRIDAL_HEATH,
  },
});
