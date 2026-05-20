import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../../theme';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
// import { useAuthStore } from '../../auth/store/authStore';
import { APP_VERSION } from '../../../constants';

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { id: 'edit', label: 'Edit Profile', emoji: '✏️' },
      { id: 'family', label: 'Family Members', emoji: '👨‍👩‍👧' },
      { id: 'addresses', label: 'Saved Addresses', emoji: '📍' },
      { id: 'payment', label: 'Payment Methods', emoji: '💳' },
    ],
  },
  {
    title: 'Spirituality',
    items: [
      { id: 'loyalty', label: 'Loyalty & Rewards', emoji: '⭐' },
      { id: 'bookings', label: 'My Booking', emoji: '📅' },
      { id: 'orders', label: 'My Orders', emoji: '📦' },
      { id: 'wishlist', label: 'Wishlist', emoji: '♡' },
      { id: 'blogs', label: 'Saved Blogs', emoji: '📖' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'darkmode', label: 'Dark mode', emoji: '🌙', toggle: true },
      { id: 'notifications', label: 'Notifications', emoji: '🔔' },
      { id: 'language', label: 'Language (English)', emoji: '🌐' },
      { id: 'privacy', label: 'Privacy Settings', emoji: '🔒' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 'help', label: 'Help & Support', emoji: '❓' },
      { id: 'contact', label: 'Contact Us', emoji: '📞' },
    ],
  },
];

export const ProfileScreen: React.FC = () => {
//   const { userName, mobile, logout } = useAuthStore();  for production
const userName="jeeva";
const mobile="12346678889";
const logout="";

  return (
    <ScreenWrapper scrollable>

      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(userName ?? 'A').charAt(0).toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={styles.name}>{userName ?? 'Devotee'}</Text>
          <Text style={styles.mobile}>+91 {mobile ?? '—'}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        {[
          { label: 'Bookings', value: '23' },
          { label: 'Orders', value: '2' },
          { label: 'Points', value: '2,450' },
        ].map(stat => (
          <View key={stat.label} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

  
      {MENU_SECTIONS.map(section => (
        <View key={section.title} style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>{section.title}</Text>
          <View style={styles.menuCard}>
            {section.items.map((item, i) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  i < section.items.length - 1 && styles.menuItemBorder,
                ]}
                activeOpacity={0.7}
              >
                <Text style={styles.menuEmoji}>{item.emoji}</Text>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}


      <TouchableOpacity style={styles.signOut} onPress={logout} activeOpacity={0.7}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Divya v{APP_VERSION} · Made with devotion 🙏</Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.screenPadding,
    paddingTop: theme.spacing.xl,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...theme.typography.displayMd,
    color: theme.colors.textInverse,
  },
  name: { ...theme.typography.h2, color: theme.colors.textPrimary },
  mobile: { ...theme.typography.bodyMd, color: theme.colors.textSecondary },
  stats: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.screenPadding,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  statValue: { ...theme.typography.h2, color: theme.colors.primary },
  statLabel: { ...theme.typography.caption, color: theme.colors.textMuted },
  menuSection: {
    marginBottom: theme.spacing.md,
  },
  menuSectionTitle: {
    ...theme.typography.labelMd,
    color: theme.colors.textMuted,
    paddingHorizontal: theme.spacing.screenPadding,
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuCard: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.screenPadding,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.md,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuEmoji: { fontSize: 18 },
  menuLabel: { ...theme.typography.bodyMd, color: theme.colors.textPrimary, flex: 1 },
  menuArrow: { fontSize: 20, color: theme.colors.textMuted },
  signOut: {
    marginHorizontal: theme.spacing.screenPadding,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    backgroundColor: theme.colors.errorLight,
    borderRadius: theme.radii.lg,
    marginBottom: theme.spacing.md,
  },
  signOutText: { ...theme.typography.labelLg, color: theme.colors.error },
  footer: {
    alignItems: 'center',
    paddingBottom: theme.spacing.xl,
  },
  footerText: { ...theme.typography.caption, color: theme.colors.textMuted },
});