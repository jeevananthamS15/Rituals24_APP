import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookingCard } from '../components/BookingCard';
import { OrderCard } from '../components/OrderCard';
import { AppButton } from '../../../components/ui/AppButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PAD = 20;

const TABS: { label: string; key: string; count: number }[] = [
  { label: 'Upcoming', key: 'upcoming', count: 2 },
  { label: 'Active',   key: 'active',   count: 1 },
  { label: 'Completed', key: 'completed', count: 0 },
  { label: 'Cancelled', key: 'cancelled', count: 0 },
];

const MOCK_BOOKINGS = [
  {
    id: 'b1',
    pujaTitle: 'Navgraha Puja',
    imageUrl: 'https://picsum.photos/seed/puja1/400/200',
    status: 'upcoming' as const,
    date: '20-05-2026',
    time: '9:00AM',
    panditName: 'Pt. Suresh Tiwari',
    price: 2100,
    mode: 'home_visit' as const,
    message: 'Your auspicious puja begins in 7 days',
  },
  {
    id: 'b2',
    pujaTitle: 'Navgraha Puja',
    imageUrl: 'https://picsum.photos/seed/puja1/400/200',
    status: 'upcoming' as const,
    date: '20-05-2026',
    time: '9:00AM',
    panditName: 'Pt. Suresh Tiwari',
    price: 2100,
    mode: 'home_visit' as const,
    message: 'Your auspicious puja begins in 7 days',
  },
  {
    id: 'b3',
    pujaTitle: 'Satyanarayan Katha',
    imageUrl: 'https://picsum.photos/seed/puja2/400/200',
    status: 'active' as const,
    date: '20-05-2026',
    time: '9:00AM',
    panditName: 'Pt. Suresh Tiwari',
    price: 2100,
    mode: 'home_visit' as const,
    otp: '2020',
    message: '',
  },
];

const MOCK_ORDERS = [
  {
    id: 'o1',
    name: 'Satyanarayan Puja Kit',
    orderNumber: 'OR1',
    price: 1247,
    status: 'shipped',
    expectedDelivery: '20 Apr 2026',
    imageUrl: 'https://picsum.photos/seed/order1/400/200',
  },
];

export const MyBookingsScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<string>('upcoming');

  const visibleBookings = MOCK_BOOKINGS.filter(b => b.status === activeTab);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.staticTop}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>My Bookings</Text>
            <Text style={styles.subtitle}>3 Upcoming rituals</Text>
          </View>
          <View style={styles.headerIcons}>
            <BellIcon />
            <HeartIcon />
            <CartIcon />
          </View>
        </View>

        <View style={styles.tabBar}>
          {TABS.map(tab => {
            const active = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {tab.label}
                </Text>
                {tab.count > 0 && (
                  <View
                    style={[
                      styles.badge,
                      active ? styles.badgeActive : styles.badgeInactive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        active
                          ? styles.badgeTextActive
                          : styles.badgeTextInactive,
                      ]}
                    >
                      {tab.count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {visibleBookings.length > 0 ? (
          <View style={styles.cardsList}>
            {visibleBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No bookings here</Text>
          </View>
        )}

        <View style={styles.ordersSectionHeader}>
          <View style={styles.ordersDividerLine} />
          <Text style={styles.ordersSectionTitle}>Store Orders</Text>
          <View style={styles.ordersDividerLine} />
        </View>

        <View style={styles.cardsList}>
          {MOCK_ORDERS.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>

        <View style={styles.ctaWrap}>
          <AppButton title="+ Book a New Puja" onPress={() => {}} />
        </View>
      </ScrollView>
    </View>
  );
};

const BellIcon = () => (
  <View style={headerIconStyles.wrap}>
    <View style={headerIconStyles.bellBody} />
    <View style={headerIconStyles.bellClapper} />
  </View>
);

const HeartIcon = () => (
  <View style={headerIconStyles.wrap}>
    <View style={headerIconStyles.heart} />
  </View>
);

const CartIcon = () => (
  <View style={headerIconStyles.wrap}>
    <View style={headerIconStyles.cartBody} />
    <View style={headerIconStyles.wheelL} />
    <View style={headerIconStyles.wheelR} />
  </View>
);

const headerIconStyles = StyleSheet.create({
  wrap: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  bellBody: {
    width: 14,
    height: 13,
    borderWidth: 1.64,
    borderColor: '#2B000A',
    borderRadius: 7,
  },
  bellClapper: {
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 1.64,
    borderColor: '#2B000A',
    position: 'absolute',
    bottom: 0,
  },
  heart: {
    width: 16,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.64,
    borderColor: '#2B000A',
  },
  cartBody: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 13,
    height: 9,
    borderWidth: 1.64,
    borderColor: '#2B000A',
    borderRadius: 1,
  },
  wheelL: {
    position: 'absolute',
    bottom: 1,
    left: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 1.64,
    borderColor: '#2B000A',
  },
  wheelR: {
    position: 'absolute',
    bottom: 1,
    right: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 1.64,
    borderColor: '#2B000A',
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  staticTop: {
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: H_PAD,
    paddingTop: 18,
    paddingBottom: 10,
  },
  headerLeft: {
    gap: 2,
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 28,
    lineHeight: 36,
    color: '#2B000A',
    fontWeight: '700',
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 12,
    color: '#2B000A',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 0.75,
    borderBottomColor: '#D9D9D9',
    paddingHorizontal: H_PAD,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    marginRight: 16,
    gap: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#2B000A',
  },
  tabText: {
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 17,
    color: '#757575',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#000000',
  },

  badge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeActive: { backgroundColor: '#2B000A' },
  badgeInactive: { backgroundColor: '#E4E4E4' },
  badgeText: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 12,
  },
  badgeTextActive: { color: '#FFFFFF' },
  badgeTextInactive: { color: '#757575' },

  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: H_PAD,
    paddingTop: 16,
    gap: 16,
  },

  cardsList: {
    gap: 16,
  },

  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Lato',
    fontSize: 14,
    color: '#757575',
  },

  ordersSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  ordersDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#757575',
  },
  ordersSectionTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 22,
    color: '#757575',
    fontWeight: '700',
  },

  ctaWrap: {
    marginTop: 8,
  },
});