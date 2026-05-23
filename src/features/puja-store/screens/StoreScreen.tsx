import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Search,
  Mic,
  Bell,
  Heart,
  ShoppingCart,
  TrendingUp,
  ChevronRight,
} from 'lucide-react-native';

import {ProductCard} from '../components/ProductCard';
import {BhajanCard} from '../../bhajan/components/BhajanCard';
import {STORE_TABS} from '../../../constants';
import {MOCK_PRODUCTS, MOCK_BHAJANS} from '../../../constants/mockData';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const HORIZONTAL_PADDING = 20;
const CONTENT_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;

const STORE_FILTER_TABS = [
  'All',
  'Puja Kits',
  'Rituals Items',
  'Festivals Specials',
  'Best Seller',
  'Bhajan Services',
];

const PRIMARY = '#2B000A';
export const StoreScreen = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('All');
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Spiritual Store</Text>
            <Text style={styles.subtitle}>Curated rituals essentials</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
              <Bell size={20} color={PRIMARY} strokeWidth={1.64} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
              <Heart size={20} color={PRIMARY} strokeWidth={1.64} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
              <ShoppingCart size={20} color={PRIMARY} strokeWidth={1.64} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchWrapper}>
          <View style={styles.searchBar}>
            <View style={styles.searchLeft}>
              <Search size={16} color="rgba(60,60,67,0.6)" strokeWidth={2} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search poojas, pandits, temples..."
                placeholderTextColor="#757575"
                value={query}
                onChangeText={setQuery}
              />
            </View>
            <View style={styles.micBtn}>
              <Mic size={16} color={PRIMARY} strokeWidth={1.5} />
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
          style={styles.tabsScroll}>
          {STORE_FILTER_TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.divider} />

        {(activeTab === 'All' || activeTab === 'Bhajan Services') && (
          <View style={styles.bhajanSection}>
            <View style={styles.bhajanContainer}>
              <View style={styles.bhajanHeader}>
                <Text style={styles.bhajanTitle}>Book a Bhajan</Text>
                <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.7}>
                  <Text style={styles.viewAllText}>View All </Text>
                  <ChevronRight size={16} color="#FFFFFF" strokeWidth={1.5} />
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.bhajanCardsContent}
                scrollEnabled={false}>
                {MOCK_BHAJANS.map(item => (
                  <BhajanCard key={item.id} item={item} onPress={() => {}} />
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {(activeTab === 'All' || activeTab === 'Puja Kits') && (
          <View style={styles.pujaSection}>
            <View style={styles.pujaHeader}>
              <View>
                <Text style={styles.pujaTitle}>Puja kits &amp; Items</Text>
                <Text style={styles.pujaSubtitle}>Delivered to your home</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7}></TouchableOpacity>
            </View>

            <View style={styles.productGrid}>
              {MOCK_PRODUCTS.map(item => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onPress={id =>
                    navigation.navigate('ProductDetail', {productId: id})
                  }
                  onAdd={() => {}}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 16,
    paddingBottom: 4,
    height: 52,
  },
  headerLeft: {
    flexDirection: 'column',
    gap: 4,
  },

  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 28,
    lineHeight: 36,
    color: '#2B000A',
  },

  subtitle: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
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

  searchWrapper: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: 20,
    marginBottom: 0,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 35,
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: 44,
  },
  searchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: '#757575',
    padding: 0,
    textAlign: 'center',
  },
  micBtn: {
    width: 24,
    height: 24,
    borderRadius: 39,
    backgroundColor: 'rgba(118,118,128,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabsScroll: {
    marginTop: 12,
    marginBottom: 0,
  },
  tabsContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#2B000A',
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#2B000A',
  },

  tabText: {
    fontFamily: 'Lato-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: '#2B000A',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },

  divider: {
    height: 1,
    backgroundColor: 'transparent',
    marginTop: 12,
    marginHorizontal: HORIZONTAL_PADDING,
  },

  bhajanSection: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: 12,
    marginBottom: 24,
  },

  bhajanContainer: {
    backgroundColor: '#2B000A',
    borderRadius: 12,
    paddingTop: 21,
    paddingBottom: 21,
    paddingHorizontal: 16,
    width: CONTENT_WIDTH,
  },
  bhajanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  bhajanTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    lineHeight: 28,
    color: '#FFFFFF',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewAllText: {
    fontFamily: 'Lato-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: '#FFFFFF',
  },
  bhajanCardsContent: {
    gap: 12,
  },

  pujaSection: {
    paddingTop: 0,
  },
  pujaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: HORIZONTAL_PADDING,
    marginBottom: 16,
  },

  pujaTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    lineHeight: 28,
    color: '#000000',
  },

  pujaSubtitle: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: '#000000',
    marginTop: 3,
  },

  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: HORIZONTAL_PADDING,
    gap: 15,
  },
});
