import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  UserRound,
  UsersRound,
  MapPin,
  CreditCard,
  Star,
  CalendarDays,
  Package,
  Heart,
  BookOpen,
  Moon,
  Bell,
  Languages,
  Lock,
  HelpCircle,
  MessageCircle,
  LogOut,
  Pencil,
} from 'lucide-react-native';


import {ScreenWrapper} from '../../../components/layout/ScreenWrapper';
import {APP_VERSION} from '../../../constants';

const ICON_SIZE = 20;
const ICON_COLOR = '#0D0D12';

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      {id: 'edit', label: 'Edit Profile', icon: Pencil, highlighted: true},
      {id: 'family', label: 'Family Members', icon: UsersRound},
      {id: 'addresses', label: 'Saved Addresses', icon: MapPin},
      {id: 'payment', label: 'Payment Methods', icon: CreditCard},
    ],
  },
  {
    title: 'Spirituality',
    items: [
      {id: 'loyalty', label: 'Loyalty & Rewards', icon: Star},
      {id: 'bookings', label: 'My Booking', icon: CalendarDays},
      {id: 'orders', label: 'My Orders', icon: Package},
      {id: 'wishlist', label: 'Wishlist', icon: Heart},
      {id: 'blogs', label: 'Saved Blogs', icon: BookOpen},
      {id: 'darkmode', label: 'Dark mode', icon: Moon},
    ],
  },
  {
    title: 'Preferences',
    items: [
      {id: 'notifications', label: 'Notifications', icon: Bell},
      {id: 'language', label: 'Language (English)', icon: Languages},
      {id: 'privacy', label: 'Privacy Settings', icon: Lock},
    ],
  },
  {
    title: 'Support',
    items: [
      {id: 'help', label: 'Help & Support', icon: HelpCircle},
      {id: 'contact', label: 'Contact Us', icon: MessageCircle},
      {
        id: 'logout',
        label: 'Sign Out',
        icon: LogOut,
        destructive: true,
      },
    ],
  },
];

export const ProfileScreen = () => {
  const userName = 'Arjun Sharma';
  const mobile = '9766776767';

  return (
    <ScreenWrapper scrollable>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerBackground}>
          <View style={[styles.bgCircleLarge, styles.circleLeft]} />
          <View style={[styles.bgCircleLarge, styles.circleRight]} />
          <View style={[styles.bgCircleSmall, styles.circleBottomLeft]} />
          <View style={[styles.bgCircleSmall, styles.circleBottomRight]} />
        </View>

        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.mobile}>+91 {mobile}</Text>
        </View>

        <View style={styles.statsCard}>
          {[
            {label: 'Bookings', value: '23'},
            {label: 'Orders', value: '2'},
            {label: 'Points', value: '2,450'},
          ].map((item, index) => (
            <React.Fragment key={item.label}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>

              {index !== 2 && <View style={styles.statDivider} />}
            </React.Fragment>
          ))}
        </View>

        {MENU_SECTIONS.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            <View style={styles.sectionList}>
              {section.items.map(item => {
                const Icon = item.icon;

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.menuItem,
                      item.highlighted && styles.highlightedItem,
                    ]}
                    activeOpacity={0.7}>
                    <Icon
                      size={ICON_SIZE}
                      color={item.destructive ? '#FF383C' : ICON_COLOR}
                      strokeWidth={1.8}
                    />

                    <Text
                      style={[
                        styles.menuText,
                        item.destructive && styles.destructiveText,
                      ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <Text style={styles.footer}>
          Divya v{APP_VERSION} - Made with devotion
        </Text>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 120,
  },

  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 260,
    overflow: 'hidden',
  },

  bgCircleLarge: {
    position: 'absolute',
    width: 198,
    height: 198,
    borderRadius: 999,
    borderWidth: 28,
    borderColor: 'rgba(43,0,10,0.05)',
  },

  bgCircleSmall: {
    position: 'absolute',
    width: 132,
    height: 132,
    borderRadius: 999,
    borderWidth: 22,
    borderColor: 'rgba(43,0,10,0.04)',
  },

  circleLeft: {
    left: -40,
    top: 32,
  },

  circleRight: {
    right: -58,
    top: -8,
  },

  circleBottomLeft: {
    left: -72,
    top: 100,
  },

  circleBottomRight: {
    right: -30,
    top: 124,
  },

  profileSection: {
    alignItems: 'center',
    paddingTop: 86,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: '#000',
  },

  mobile: {
    fontSize: 12,
    lineHeight: 18,
    color: '#000',
    marginTop: 2,
  },

  statsCard: {
    marginTop: 18,
    marginHorizontal: 20,
    height: 84,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  statItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  statDivider: {
    width: 1,
    height: 48,
    backgroundColor: '#D9D9D9',
  },

  statValue: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: '#000',
  },

  statLabel: {
    fontSize: 12,
    lineHeight: 18,
    color: '#000',
    marginTop: 2,
  },

  section: {
    marginTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DFE1E6',
  },

  sectionTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },

  sectionList: {
    paddingBottom: 4,
  },

  menuItem: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: 8,
  },

  highlightedItem: {
    backgroundColor: '#F9F9FB',
    borderWidth: 1,
    borderColor: '#DFE1E6',
  },

  menuText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '700',
    color: '#0D0D12',
  },

  destructiveText: {
    color: '#FF383C',
  },

  footer: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 12,
    color: '#757575',
  },
});
