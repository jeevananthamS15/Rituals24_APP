import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScreenWrapper} from '../../../components/layout/ScreenWrapper';
import {SectionHeader} from '../components/SectionHeader';
import {ServiceGrid} from '../components/ServiceGrid';
import {FestivalBanner} from '../components/FestivalBanner';
import {MuhuratStrip} from '../components/MuhuratStrip';
import {PujaCard} from '../../pujas/components/PujaCard';
import {PanditCard} from '../../pandits/components/PanditCard';
import {TempleCard} from '../../temples/components/TempleCard';
import {ProductCard} from '../../puja-store/components/ProductCard';
import {BhajanCard} from '../../bhajan/components/BhajanCard';
import {HomeFooterOval} from '../components/Homefooteroval';
import LinearGradient from 'react-native-linear-gradient';

import {
  Search,
  Mic,
  Bell,
  Heart,
  ShoppingCart,
  TrendingUp,
  ChevronRight,
} from 'lucide-react-native';

import {
  MOCK_PUJAS,
  MOCK_PANDITS,
  MOCK_TEMPLES,
  MOCK_PRODUCTS,
  MOCK_BHAJANS,
} from '../../../constants/mockData';

const PRIMARY = '#2B000A';

const Divider = () => (
  <LinearGradient
    colors={['#FFFFFF', '#2B000A', '#FFFFFF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.divider}
  />
);


export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const userName = 'Amit';

  return (
    <ScreenWrapper scrollable backgroundColor="#FFFFFF">
      <View style={styles.topBar}>
        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>Jai Shri Ram</Text>

          <Text style={styles.userName}>{userName ?? 'Devotee'}</Text>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Bell size={20} color={PRIMARY} strokeWidth={1.64} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Heart size={20} color={PRIMARY} strokeWidth={1.64} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <ShoppingCart size={20} color={PRIMARY} strokeWidth={1.64} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate('Explore')}
        activeOpacity={0.8}>
        <View style={styles.searchLeft}>
          <Search size={16} color="rgba(60,60,67,0.6)" strokeWidth={2} />
          <Text style={styles.searchPlaceholder}>
            Search poojas, pandits, temples...
          </Text>
        </View>
        <View style={styles.micBtn}>
          <Mic size={16} color={PRIMARY} strokeWidth={1.5} />
        </View>
      </TouchableOpacity>

      {Divider()}

      <View style={styles.section}>
        <Text style={styles.sectionTitleOnly}>Our Services</Text>
        <View style={{height: 16}} />
        <ServiceGrid />
      </View>

      <View style={styles.bannerSection}>
        <FestivalBanner />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Our Puja Services" onViewAll={() => {}} />
        <FlatList
          data={MOCK_PUJAS}
          renderItem={({item}) => (
            <PujaCard
              item={item}
              onPress={id => navigation.navigate('PujaDetail', {pujaId: id})}
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
          renderItem={({item}) => (
            <ProductCard item={item} onPress={() => {}} onAdd={() => {}}  variant='home'/>
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
          renderItem={({item}) => <PanditCard item={item} onPress={() => {}} />}
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
          renderItem={({item}) => <TempleCard item={item} onPress={() => {}} />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hList}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Book a Bhajan" onViewAll={() => {}} />
        <FlatList
          data={MOCK_BHAJANS}
          renderItem={({item}) => <BhajanCard item={item} onPress={() => {}} variant='home' />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hList}
        />
      </View>

      <View style={styles.footerSpacing}>
        <HomeFooterOval />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 8,
  },
  greetingBlock: {
    gap: 2,
  },

  greeting: {
    fontFamily: 'Inter',
    fontWeight: '400',
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
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    marginHorizontal: 20,
    marginTop: 10,
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
  searchIconText: {
    fontSize: 14,
    color: '#757575',
  },

  searchPlaceholder: {
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 22,
    color: '#757575',
    flex: 1,
  },

  micBtn: {
    width: 24,
    height: 24,
    borderRadius: 39,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micIcon: {
    fontSize: 12,
  },

   divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 20,
    marginTop:20,
  },

  section: {
    marginTop: 20,
  },
  bannerSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  sectionTitleOnly: {
    fontFamily: 'Lato',
    fontSize: 20,
    fontWeight:'bold',
    lineHeight: 28,
    color: '#000000',
    paddingHorizontal: 20,
  },

  hList: {
    paddingHorizontal: 20,
    paddingBottom: 4,
  },

  footerSpacing: {
  marginTop: 32,
},
});
