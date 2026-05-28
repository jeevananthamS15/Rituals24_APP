import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {theme} from '../../../theme';
import {ScreenWrapper} from '../../../components/layout/ScreenWrapper';
import {SectionHeader} from '../components/SectionHeader';
import {PujaCard} from '../../pujas/components/PujaCard';
import {PanditCard} from '../../pandits/components/PanditCard';
import {TempleCard} from '../../temples/components/TempleCard';
import {ProductCard} from '../../puja-store/components/ProductCard';
import {BhajanCard} from '../../bhajan/components/BhajanCard';
import {getHomeData} from '../../../services/home.service';
import {EXPLORE_TABS} from '../../../constants';
import {
  Search,
  Mic,
  Bell,
  Heart,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const H_PADDING = 20;

const PRIMARY = '#2B000A';
const TEXT_SECONDARY = '#666666';
const TEXT_MUTED = '#757575';
const BORDER = '#D9D9D9';
const SURFACE = '#F9F9F9';

const TRENDING = [
  {label: 'Pandits'},
  {label: 'Temple Darshan'},
  {label: 'Satyanarayan Puja'},
  {label: 'Puja Kit'},
  {label: 'Griha Pravesh'},
  {label: 'Navratri'},
];

const EXPLORE_TABS_LIST = ['All', 'Pandits', 'Poojas', 'Temples', 'Store', 'Bhajan'];

const Divider = () => (
  <LinearGradient
    colors={['#FFFFFF', '#2B000A', '#FFFFFF']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    style={styles.divider}
  />
);

export const ExploreScreen = () => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [pujas, setPujas] = useState([]);
  const [pandits, setPandits] = useState([]);
  const [temples, setTemples] = useState([]);
  const [products, setProducts] = useState([]);
  const [bhajans, setBhajans] = useState([]);

  useEffect(() => {
    loadExploreData();
  }, []);

  const loadExploreData = async () => {
    try {
      setLoading(true);
      const data = await getHomeData();
      setPujas(data.pujas);
      setPandits(data.pandits);
      setTemples(data.temples);
      setProducts(data.products);
      setBhajans(data.bhajans);
    } catch (error) {
      console.log('EXPLORE API ERROR:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScreenWrapper scrollable>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
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

      {/* ── Search Bar ── */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <View style={styles.searchLeft}>
            <Search size={16} color="rgba(60,60,67,0.6)" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search poojas, pandits, temples..."
              placeholderTextColor={TEXT_MUTED}
              value={query}
              onChangeText={setQuery}
            />
          </View>
          <View style={styles.micWrapper}>
            <Mic size={16} color={PRIMARY} strokeWidth={1.5} />
          </View>
        </View>
      </View>

      {/* ── Trending + Divider (one block, no fragment) ── */}
      {query.length === 0 && (
        <View style={styles.trendingSection}>
          <Text style={styles.trendingTitle}>Trending Searches</Text>
          <View style={styles.trendingGrid}>
            {TRENDING.map(item => (
              <TouchableOpacity
                key={item.label}
                style={styles.trendingItem}
                onPress={() => setQuery(item.label)}
                activeOpacity={0.7}>
                <TrendingUp size={16} color={TEXT_SECONDARY} strokeWidth={1.5} />
                <Text style={styles.trendingText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Divider />
        </View>
      )}

      {/* ── Filter Tabs ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContent}
        style={styles.tabsScroll}>
        {EXPLORE_TABS_LIST.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Puja Services ── */}
      {(activeTab === 'All' || activeTab === 'Poojas') && (
        <View style={styles.section}>
          <SectionHeader title="Our Puja Services" onViewAll={() => {}} />
          <FlatList
            data={pujas}
            renderItem={({item}) => <PujaCard item={item} onPress={() => {}} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
          />
        </View>
      )}

      {/* ── Store ── */}
      {(activeTab === 'All' || activeTab === 'Store') && (
        <View style={styles.section}>
          <SectionHeader title="Our Store" onViewAll={() => {}} />
          <FlatList
            data={products}
            renderItem={({item}) => (
              <ProductCard item={item} onPress={() => {}} onAdd={() => {}} />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
          />
        </View>
      )}

      {/* ── Pandits ── */}
      {(activeTab === 'All' || activeTab === 'Pandits') && (
        <View style={styles.section}>
          <SectionHeader title="Our Pandits" onViewAll={() => {}} />
          <FlatList
            data={pandits}
            renderItem={({item}) => <PanditCard item={item} onPress={() => {}} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
          />
        </View>
      )}

      {/* ── Temples ── */}
      {(activeTab === 'All' || activeTab === 'Temples') && (
        <View style={styles.section}>
          <SectionHeader title="Temple Pooja & Darshan" onViewAll={() => {}} />
          <FlatList
            data={temples}
            renderItem={({item}) => <TempleCard item={item} onPress={() => {}} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
          />
        </View>
      )}

      {/* ── Bhajan ── */}
      {(activeTab === 'All' || activeTab === 'Bhajan') && (
        <View style={[styles.section, styles.lastSection]}>
          <SectionHeader title="Book a Bhajan" onViewAll={() => {}} />
          <FlatList
            data={bhajans}
            renderItem={({item}) => (
              <BhajanCard item={item} onPress={() => {}} variant="home" />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
          />
        </View>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  /* ── Header ── */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: H_PADDING,
    paddingTop: 12,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 28,
    lineHeight: 36,
    color: PRIMARY,
    fontWeight: '700',
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

  /* ── Search ── */
  searchRow: {
    paddingHorizontal: H_PADDING,
    marginBottom: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SURFACE,
    borderRadius: 35,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: BORDER,
  },
  searchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: TEXT_MUTED,
    paddingVertical: 0,
  },
  micWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(118,118,128,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  /* ── Trending ── */
  trendingSection: {
    paddingHorizontal: H_PADDING,
    // NO marginBottom here — divider's own marginBottom handles the gap
  },
  trendingTitle: {
    fontFamily: 'Lato-Medium',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 6,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 20,
    marginBottom: 4,
  },
  trendingText: {
    fontFamily: 'Lato-Medium',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '500',
    color: TEXT_SECONDARY,
  },

  /* ── Divider ── */
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 0, // already inside paddingHorizontal of parent
    marginTop: 10,
    marginBottom: 10,    // this is the ONLY spacing between divider and tabs
  },

  /* ── Tabs ── */
  tabsScroll: {
    flexGrow: 0,         // KEY: prevents ScrollView from taking extra height
    flexShrink: 0,
    marginBottom: 12,
  },
  tabsContent: {
    paddingHorizontal: H_PADDING,
    gap: 8,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: PRIMARY,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: PRIMARY,
  },
  tabText: {
    fontFamily: 'Lato-Medium',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '500',
    color: PRIMARY,
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },

  /* ── Sections ── */
  section: {
    marginBottom: 24,
  },
  hList: {
    paddingHorizontal: H_PADDING,
    gap: 12,
  },
  lastSection: {
    marginBottom: 120,
  },
});