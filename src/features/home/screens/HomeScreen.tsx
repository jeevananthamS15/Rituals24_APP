import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../../theme';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { SectionHeader } from '../components/SectionHeader';
import { ServiceGrid } from '../components/ServiceGrid';
import { FestivalBanner } from '../components/FestivalBanner';
import { MuhuratStrip } from '../components/MuhuratStrip';
import { PujaCard } from '../../pujas/components/PujaCard';
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
  const userName = 'Amit';

  return (
    <ScreenWrapper scrollable backgroundColor={theme.colors.background}>
      <View style={styles.topBar}>
        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>🙏 Jai Shri Ram</Text>
          <Text style={styles.userName}>{userName ?? 'Devotee'}</Text>
        </View>
        <View style={styles.topActions}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconEmoji}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconEmoji}>🤍</Text>
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
        <View style={styles.searchLeft}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>
            Search poojas, pandits, temples...
          </Text>
        </View>
        <View style={styles.micBtn}>
          <Text style={{ fontSize: 12 }}>🎤</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.divider} />

      <View style={styles.section}>
        <SectionHeader title="Our Services" />
        <ServiceGrid />
      </View>

      <View style={styles.bannerSection}>
        <FestivalBanner />
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Our Puja Services"
          onViewAll={() => {}}
        />
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
        <MuhuratStrip
          onViewAll={() => navigation.navigate('MuhuratCalendar')}
        />
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
        <SectionHeader
          title="Temple Pooja & Darshan"
          onViewAll={() => {}}
        />
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
  greetingBlock: {
    gap: 2,
  },
  greeting: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 12,
    color: '#000000',
  },
  userName: {
    fontFamily: 'Lato-Bold',
    fontSize: 28,
    lineHeight: 36,
    color: '#2B000A',
  },
  topActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 18,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    marginHorizontal: theme.spacing.screenPadding,
    marginTop: theme.spacing.sm,
    marginBottom: 0,
    borderRadius: 35,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  searchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  searchIcon: {
    fontSize: 16,
    color: '#757575',
  },
  searchPlaceholder: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#757575',
  },
  micBtn: {
    width: 24,
    height: 24,
    borderRadius: 39,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.screenPadding,
    marginTop: 10,
    marginBottom: 0,
  },

  section: {
    marginTop: 20,
  },
  bannerSection: {
    paddingHorizontal: theme.spacing.screenPadding,
    marginTop: 20,
  },
  hList: {
    paddingHorizontal: theme.spacing.screenPadding,
    paddingBottom: theme.spacing.sm,
  },
  lastSection: {
    marginBottom: 32,
  },
});