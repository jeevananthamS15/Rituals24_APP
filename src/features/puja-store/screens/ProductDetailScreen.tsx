import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../../theme';
import { AppButton } from '../../../components/ui/AppButton';
import { RatingBadge } from '../../../components/ui/RatingBadge';
import { PriceDisplay } from '../../../components/ui/PriceDisplay';
import { ProductCard } from '../components/ProductCard';
import { StoreStackParamList } from '../../../app/navigation/types';
import { MOCK_PRODUCTS } from '../../../constants/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = NativeStackScreenProps<StoreStackParamList, 'ProductDetail'>;

const INCLUDED_ITEMS = [
  'Brass Kalash', 'Mango Leaves', 'Turmeric & Kumkum',
  'Akshat (Rice)', 'Incense & Camphor', 'Puja Thali',
  'Coconut', 'Cotton Wicks & Ghee',
];

export const ProductDetailScreen = ({ route, navigation }:Props) => {
  const { productId } = route.params;
  const product = MOCK_PRODUCTS.find(p => p.id === productId) ?? MOCK_PRODUCTS[0];
  const [quantity, setQuantity] = useState(2);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          {/* Title */}
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.itemCount}>{product.itemCount} items included</Text>

          {/* Price & Rating */}
          <View style={styles.priceRatingRow}>
            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              size="lg"
            />
            <RatingBadge rating={product.rating} reviewCount={product.reviewCount} size="md" />
          </View>

          {/* Quantity */}
          <View style={styles.qtyRow}>
            <Text style={styles.qtyLabel}>Quantity</Text>
            <View style={styles.qtyControl}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(q => Math.max(1, q - 1))}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(q => q + 1)}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Delivery */}
          <View style={styles.deliveryBadge}>
            <Text style={styles.deliveryIcon}>🚚</Text>
            <Text style={styles.deliveryText}>Delivery by 20 May, Wed</Text>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            Complete puja samagri kit for Griha Pravesh ceremony. Includes kalash,
            mango leaves, turmeric, kumkum, akshat, and all essentials.
          </Text>

          <View style={styles.divider} />

          {/* What's Included */}
          <Text style={styles.sectionTitle}>What's Included</Text>
          <View style={styles.includedGrid}>
            {INCLUDED_ITEMS.map((item, i) => (
              <View key={i} style={styles.includedChip}>
                <Text style={styles.includedText}>✓ {item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Reviews */}
          <Text style={styles.sectionTitle}>Reviews</Text>
          <View style={styles.reviewCard}>
            <Text style={styles.reviewerName}>Ramesh</Text>
            <Text style={styles.reviewText}>
              Fresh, Pure and Good quality. Perfect for puja
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Related */}
          <Text style={styles.sectionTitle}>Products you may also like</Text>
          <FlatList
            data={MOCK_PRODUCTS.filter(p => p.id !== product.id)}
            renderItem={({ item }) => (
              <ProductCard item={item} onPress={id =>
                navigation.replace('ProductDetail', { productId: id })
              } onAdd={() => {}} />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedList}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Sticky Bottom */}
      <View style={styles.stickyBottom}>
        <AppButton
          title="Add to Cart"
          onPress={() => {}}
          variant="outline"
          fullWidth={false}
          style={styles.cartBtn}
        />
        <AppButton
          title={`Buy At ₹${product.price.toLocaleString('en-IN')}`}
          onPress={() => {}}
          fullWidth={false}
          style={styles.buyBtn}
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
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.65,
    backgroundColor: theme.colors.surfaceElevated,
  },
  backBtn: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    width: 40,
    height: 40,
    borderRadius: theme.radii.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  backIcon: { fontSize: 20, color: theme.colors.textPrimary },
  body: { padding: theme.spacing.screenPadding },
  title: {
    ...theme.typography.h1,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  itemCount: {
    ...theme.typography.bodyMd,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  qtyLabel: {
    ...theme.typography.labelLg,
    color: theme.colors.textPrimary,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  qtyBtnText: {
    fontSize: 18,
    color: theme.colors.textPrimary,
    fontWeight: '700',
  },
  qtyValue: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    minWidth: 24,
    textAlign: 'center',
  },
  deliveryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.successLight,
    padding: theme.spacing.sm,
    borderRadius: theme.radii.sm,
    marginBottom: theme.spacing.sm,
  },
  deliveryIcon: { fontSize: 16 },
  deliveryText: {
    ...theme.typography.labelMd,
    color: theme.colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    ...theme.typography.bodyMd,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  includedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  includedChip: {
    backgroundColor: theme.colors.surfaceElevated,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  includedText: {
    ...theme.typography.labelMd,
    color: theme.colors.textSecondary,
  },
  reviewCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  reviewerName: {
    ...theme.typography.labelLg,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  reviewText: {
    ...theme.typography.bodyMd,
    color: theme.colors.textSecondary,
  },
  relatedList: { paddingBottom: theme.spacing.sm },
  stickyBottom: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    padding: theme.spacing.screenPadding,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  cartBtn: { flex: 1, height: 48 },
  buyBtn: { flex: 1, height: 48 },
});