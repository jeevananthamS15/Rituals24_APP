import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { theme } from '../../../theme';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { SectionHeader } from '../components/SectionHeader';
import { PujaCard } from '../../pujas/components/PujaCard';
import { PanditCard } from '../../pandits/components/PanditCard';
import { TempleCard } from '../../temples/components/TempleCard';
import { ProductCard } from '../../puja-store/components/ProductCard';
import { BhajanCard } from '../../bhajan/components/BhajanCard';
import { EXPLORE_TABS } from '../../../constants';
import {
  MOCK_PUJAS,
  MOCK_PANDITS,
  MOCK_TEMPLES,
  MOCK_PRODUCTS,
  MOCK_BHAJANS,
} from '../../../constants/mockData';

const TRENDING = [
  'Temple Darshan', 'Satyanarayan Puja', 'Puja Kit',
  'Griha Pravesh', 'Navratri', 'Pandits',
];

export const ExploreScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('All');

  return (
    <ScreenWrapper scrollable>
   
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>

      
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search poojas, pandits, temples..."
            placeholderTextColor={theme.colors.textMuted}
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>


      {query.length === 0 && (
        <View style={styles.trendingSection}>
          <Text style={styles.trendingTitle}>Trending Searches</Text>
          <View style={styles.tags}>
            {TRENDING.map(tag => (
              <TouchableOpacity
                key={tag}
                style={styles.tag}
                onPress={() => setQuery(tag)}
                activeOpacity={0.7}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

    
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
        style={styles.tabsContainer}
      >
        {EXPLORE_TABS.map(tab => (
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

    
      {(activeTab === 'All' || activeTab === 'Poojas') && (
        <View style={styles.section}>
          <SectionHeader title="Our Puja Services" onViewAll={() => {}} />
          <FlatList
            data={MOCK_PUJAS}
            renderItem={({ item }) => (
              <PujaCard item={item} onPress={() => {}} />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
            scrollEnabled={false}
          />
        </View>
      )}

 
      {(activeTab === 'All' || activeTab === 'Store') && (
        <View style={styles.section}>
          <SectionHeader title="Our Store" onViewAll={() => {}} />
          <FlatList
            data={MOCK_PRODUCTS}
            renderItem={({ item }) => (
              <ProductCard item={item} onPress={() => {}} onAdd={() => {}} />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
            scrollEnabled={false}
          />
        </View>
      )}

  
      {(activeTab === 'All' || activeTab === 'Pandits') && (
        <View style={styles.section}>
          <SectionHeader title="Our Pandits" onViewAll={() => {}} />
          <FlatList
            data={MOCK_PANDITS}
            renderItem={({ item }) => (
              <PanditCard item={item} onPress={() => {}} />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
            scrollEnabled={false}
          />
        </View>
      )}


      {(activeTab === 'All' || activeTab === 'Temples') && (
        <View style={styles.section}>
          <SectionHeader title="Temple Pooja & Darshan" onViewAll={() => {}} />
          <FlatList
            data={MOCK_TEMPLES}
            renderItem={({ item }) => (
              <TempleCard item={item} onPress={() => {}} />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
            scrollEnabled={false}
          />
        </View>
      )}

   
      {(activeTab === 'All' || activeTab === 'Bhajan') && (
        <View style={[styles.section, styles.lastSection]}>
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
  searchRow: {
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
  clearIcon: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  trendingSection: {
    paddingHorizontal: theme.spacing.screenPadding,
    marginBottom: theme.spacing.md,
  },
  trendingTitle: {
    ...theme.typography.h4,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  tag: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radii.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tagText: {
    ...theme.typography.labelMd,
    color: theme.colors.textSecondary,
  },
  tabsContainer: {
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
  lastSection: {
    marginBottom: theme.spacing.xl,
  },
});