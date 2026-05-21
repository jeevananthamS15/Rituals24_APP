import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../../theme';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { SectionHeader } from '../../home/components/SectionHeader';
import { ProductCard } from '../components/ProductCard';
import { BhajanCard } from '../../bhajan/components/BhajanCard';
import { STORE_TABS } from '../../../constants';
import { MOCK_PRODUCTS, MOCK_BHAJANS } from '../../../constants/mockData';

export const StoreScreen = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('All');
  const [query, setQuery] = useState('');

  return (
    <ScreenWrapper scrollable>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Spiritual Store</Text>
        <Text style={styles.subtitle}>Curated ritual essentials</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search poojas, pandits, temples..."
            placeholderTextColor={theme.colors.textMuted}
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
        style={styles.tabsWrap}
      >
        {STORE_TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bhajan Services */}
      {(activeTab === 'All' || activeTab === 'Bhajan Services') && (
        <View style={styles.section}>
          <SectionHeader title="Book a Bhajan" onViewAll={() => {}} />
          <FlatList
            data={MOCK_BHAJANS}
            renderItem={({ item }) => (
              <BhajanCard item={item} onPress={() => {}} />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* Puja Kits */}
      {(activeTab === 'All' || activeTab === 'Puja Kits') && (
        <View style={styles.section}>
          <SectionHeader title="Puja Kits & Items" onViewAll={() => {}} />
          <Text style={styles.deliveryNote}>Delivered to your home</Text>
          <View style={styles.grid}>
            {MOCK_PRODUCTS.map(item => (
              <ProductCard
                key={item.id}
                item={item}
                onPress={id =>
                  navigation.navigate('ProductDetail', { productId: id })
                }
                onAdd={() => {}}
              />
            ))}
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.spacing.screenPadding,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.bodyMd,
    color: theme.colors.textSecondary,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.screenPadding,
    marginBottom: theme.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm,
  },
  searchIcon: { fontSize: 16 },
  searchInput: {
    flex: 1,
    ...theme.typography.bodyMd,
    color: theme.colors.textPrimary,
  },
  tabsWrap: {
    marginBottom: theme.spacing.md,
  },
  tabs: {
    paddingHorizontal: theme.spacing.screenPadding,
    gap: theme.spacing.sm,
  },
  tab: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  tabText: {
    ...theme.typography.labelMd,
    color: theme.colors.textSecondary,
  },
  tabTextActive: {
    color: theme.colors.textInverse,
  },
  section: {
    marginBottom: theme.spacing.sectionGap,
  },
  hList: {
    paddingHorizontal: theme.spacing.screenPadding,
  },
  deliveryNote: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    paddingHorizontal: theme.spacing.screenPadding,
    marginBottom: theme.spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.screenPadding,
    gap: theme.spacing.md,
  },
});