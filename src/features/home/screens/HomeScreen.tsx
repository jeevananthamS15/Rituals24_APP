import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../../theme';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { SectionHeader } from '../components/SectionHeader';
import { ServiceGrid } from '../components/ServiceGrid';
import { FestivalBanner } from '../components/FestivalBanner';
import { MuhuratStrip } from '../components/MuhuratStrip';
import { PujaCard } from   '../../pujas/components/PujaCard';
import { PanditCard } from '../../pandits/components/PanditCard';
import { TempleCard } from '../../temples/components/TempleCard';
import { ProductCard } from '../../puja-store/components/ProductCard';
import { BhajanCard } from '../../bhajan/components/BhajanCard';

import {
  MOCK_PUJAS,
  MOCK_PANDITS,
  MOCK_TEMPLES,
  MOCK_PRODUCTS,
  MOCK_BHAJANS,
} from '../../../constants/mockData';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const userName = "jeeva";

  return (
    <ScreenWrapper scrollable backgroundColor={theme.colors.background}>
    
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>🙏 Jai Shri Ram</Text>
          <Text style={styles.userName}>{userName ?? 'Devotee'}</Text>
        </View>
        <View style={styles.topActions}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconEmoji}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconEmoji}>🛒</Text>
          </TouchableOpacity>
        </View>
      </View>

 
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate('Explore')}
        activeOpacity={0.8}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchPlaceholder}>Search poojas, pandits, temples...</Text>
      </TouchableOpacity>

  
      <View style={styles.section}>
        <SectionHeader title="Our Services" />
        <ServiceGrid />
      </View>

 
      <View style={styles.bannerSection}>
        <FestivalBanner />
      </View>


      <View style={styles.section}>
        <SectionHeader title="Our Puja Services" onViewAll={() => {}} />
        <FlatList
          data={MOCK_PUJAS}
          renderItem={({ item }) => (
            <PujaCard
              item={item}
              onPress={id => navigation.navigate('PujaDetail', { pujaId: id })}
            />
          )}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hList}
        />
      </View>

 
      <View style={styles.section}>
        <MuhuratStrip onViewAll={() => navigation.navigate('MuhuratCalendar')} />
      </View>

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
        />
      </View>

 
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
        />
      </View>

  
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
        />
      </View>

      
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
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.screenPadding,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  greeting: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  userName: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  topActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  iconEmoji: {
    fontSize: 18,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.screenPadding,
    marginVertical: theme.spacing.md,
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm,
  },
  searchIcon: {
    fontSize: 16,
    color: theme.colors.textMuted,
  },
  searchPlaceholder: {
    ...theme.typography.bodyMd,
    color: theme.colors.textMuted,
  },
  section: {
    marginBottom: theme.spacing.sectionGap,
  },
  bannerSection: {
    marginHorizontal: theme.spacing.screenPadding,
    marginBottom: theme.spacing.sectionGap,
  },
  hList: {
    paddingHorizontal: theme.spacing.screenPadding,
    paddingBottom: theme.spacing.sm,
  },
  lastSection: {
    marginBottom: theme.spacing.xl,
  },
});