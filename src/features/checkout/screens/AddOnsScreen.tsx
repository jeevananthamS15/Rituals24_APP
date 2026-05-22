import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SW } = Dimensions.get('window');
const BASE = 393;
const sc = (n: number) => (SW / BASE) * n;


const PRIMARY  = '#2B000A';
const GOLD2    = '#DDAB2C';
const WHITE    = '#FFFFFF';
const SURFACE  = '#F9F9F9';
const BORDER   = '#D9D9D9';
const TEXT_PRI = '#000000';
const TEXT_DEEP= '#281518';
const TEXT_SEC = '#757575';
const GREEN    = '#00A703';
const GREEN_BG = 'rgba(0,167,3,0.18)';

const Header: React.FC<{ onBack: () => void; onSkip: () => void }> = ({ onBack, onSkip }) => {
  const insets = useSafeAreaInsets();
  const segColors = [
    '#F3B416', '#DDAB2C', '#DDAB2C', '#DDAB2C', 'rgba(255,255,255,0.2)',
  ];
  return (
    <View style={[hdr.wrap, { paddingTop: insets.top + sc(8) }]}>
      <TouchableOpacity style={hdr.backBtn} onPress={onBack} activeOpacity={0.8}>
        <View style={hdr.circle}>
          <View style={hdr.chevron} />
        </View>
      </TouchableOpacity>
      <View style={hdr.titleBlock}>
        <Text style={hdr.title}>Satyanarayan puja</Text>
        <Text style={hdr.step}>
          Step <Text style={hdr.bold}>4 / 5</Text> :{' '}
          <Text style={hdr.bold}>Service mode</Text>
        </Text>
      </View>
     
      <TouchableOpacity style={hdr.skipBtn} onPress={onSkip} activeOpacity={0.8}>
        <Text style={hdr.skipTxt}>Skip</Text>
      </TouchableOpacity>
      <View style={hdr.progRow}>
        {segColors.map((c, i) => (
          <View key={i} style={[hdr.seg, { backgroundColor: c }]} />
        ))}
      </View>
    </View>
  );
};

const hdr = StyleSheet.create({
  wrap: {
    backgroundColor: PRIMARY,
    borderBottomLeftRadius: sc(16),
    borderBottomRightRadius: sc(16),
    paddingHorizontal: sc(20),
    paddingBottom: sc(20),
  },
  backBtn: { position: 'absolute', left: sc(20), bottom: sc(46) },
  circle: {
    width: sc(32), height: sc(32), borderRadius: sc(16),
    backgroundColor: WHITE, alignItems: 'center', justifyContent: 'center',
  },
  chevron: {
    width: sc(8), height: sc(8),
    borderLeftWidth: 2, borderBottomWidth: 2, borderColor: PRIMARY,
    transform: [{ rotate: '45deg' }, { translateX: sc(2) }],
  },
  titleBlock: { marginLeft: sc(52), marginTop: sc(10), marginRight: sc(60) },
  title: {
    fontWeight: '700', fontSize: sc(28), lineHeight: sc(36), color: WHITE,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  step: { fontSize: sc(10), lineHeight: sc(12), color: WHITE, marginTop: sc(2) },
  bold: { fontWeight: '700' },
  skipBtn: {
    position: 'absolute', right: sc(20), bottom: sc(52),
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.75)',
    borderRadius: sc(12), paddingHorizontal: sc(12), paddingVertical: sc(6),
  },
  skipTxt: { fontSize: sc(14), color: 'rgba(255,255,255,0.75)', fontWeight: '500' },
  progRow: { flexDirection: 'row', gap: sc(18), marginTop: sc(14) },
  seg: { width: sc(40), height: 5, borderRadius: 100 },
});


const SummaryBar: React.FC = () => (
  <View style={sb.wrap}>
    <View style={sb.cell}>
      <Text style={sb.lbl}>Mode:</Text>
      <Text style={sb.val}>Home Visit</Text>
    </View>
    <View style={sb.div} />
    <View style={sb.cell}>
      <Text style={sb.lbl}>Date &amp; Time:</Text>
      <Text style={sb.val}>11-05 / 6:00 AM</Text>
    </View>
    <View style={sb.div} />
    <View style={sb.cell}>
      <Text style={sb.lbl}>Pandits</Text>
      <Text style={sb.val}>Pt. Acharya Vivek</Text>
    </View>
  </View>
);

const sb = StyleSheet.create({
  wrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: SURFACE, borderWidth: 1, borderColor: BORDER,
    borderRadius: sc(12), paddingVertical: sc(8), paddingHorizontal: sc(16),
    marginHorizontal: sc(20), marginTop: sc(12), marginBottom: sc(4),
  },
  cell: { flex: 1, alignItems: 'center', gap: sc(4) },
  lbl: { fontSize: sc(10), color: TEXT_PRI, lineHeight: sc(12) },
  val: { fontSize: sc(10), fontWeight: '700', color: TEXT_PRI, lineHeight: sc(12) },
  div: { width: 1, height: sc(28), backgroundColor: BORDER, marginHorizontal: sc(4) },
});


const EnhanceBanner: React.FC = () => (
  <View style={en.wrap}>
    <View style={en.iconBox}>
      <Text style={en.icon}>📦</Text>
    </View>
    <View style={en.textBlock}>
      <Text style={en.title}>Enhance Your Ritual Experience</Text>
      <Text style={en.sub}>All add-ons are completely optional — skip freely.</Text>
    </View>
  </View>
);

const en = StyleSheet.create({
  wrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(221,171,44,0.2)',
    borderRadius: sc(12), padding: sc(8), paddingHorizontal: sc(16),
    gap: sc(10),
  },
  iconBox: {
    width: sc(18), height: sc(18), alignItems: 'center', justifyContent: 'center',
  },
  icon: { fontSize: sc(16) },
  textBlock: { flex: 1, gap: sc(4) },
  title: { fontSize: sc(10), fontWeight: '700', color: TEXT_PRI, lineHeight: sc(12) },
  sub: { fontSize: sc(10), color: TEXT_PRI, lineHeight: sc(12) },
});


interface AddonItem {
  id: string;
  title: string;
  badge?: string;
  badgeText?: string;
  price: string;
  meta1?: string;
  meta2?: string;
  items?: string[];
  imageEmoji: string;
}

const AddonCard: React.FC<{
  item: AddonItem;
  selected: boolean;
  onSelect: () => void;
}> = ({ item, selected, onSelect }) => (
  <TouchableOpacity
    style={[adc.card, selected && adc.cardActive]}
    onPress={onSelect}
    activeOpacity={0.85}
  >
    <View style={adc.topRow}>
      {/* Image placeholder */}
      <View style={adc.imgBox}>
        <Text style={adc.imgEmoji}>{item.imageEmoji}</Text>
      </View>

      {/* Info */}
      <View style={adc.info}>
        {/* Title + badge */}
        <View style={adc.titleRow}>
          <Text style={adc.title}>{item.title}</Text>
          {item.badge && (
            <View style={[adc.badge, item.badge === 'Premium' && adc.badgePrem]}>
              <Text style={[adc.badgeTxt, item.badge === 'Premium' && adc.badgeTxtPrem]}>
                {item.badge}
              </Text>
            </View>
          )}
        </View>
        {/* Meta line 1 */}
        {item.meta1 && <Text style={adc.meta}>{item.meta1}</Text>}
        {/* Meta line 2 */}
        {item.meta2 && <Text style={adc.meta}>{item.meta2}</Text>}
      </View>

      {/* Price */}
      <Text style={adc.price}>{item.price}</Text>
    </View>

    {/* Expanded items */}
    {item.items && item.items.length > 0 && (
      <>
        <View style={adc.divider} />
        <View style={adc.itemsList}>
          {item.items.map((it, i) => (
            <Text key={i} style={adc.itemTxt}>• {it}</Text>
          ))}
        </View>
      </>
    )}
  </TouchableOpacity>
);

const adc = StyleSheet.create({
  card: {
    backgroundColor: SURFACE, borderRadius: sc(16),
    borderWidth: 1, borderColor: BORDER, padding: sc(16), gap: sc(10),
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 20, elevation: 2,
  },
  cardActive: { borderColor: PRIMARY },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: sc(8) },
  imgBox: {
    width: sc(77), height: sc(76), borderRadius: sc(16),
    backgroundColor: 'rgba(120,120,128,0.1)',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 20, elevation: 1,
  },
  imgEmoji: { fontSize: sc(32) },
  info: { flex: 1, gap: sc(4) },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: sc(8), flexWrap: 'wrap' },
  title: {
    fontWeight: '700', fontSize: sc(14), lineHeight: sc(22), color: TEXT_DEEP,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  badge: {
    backgroundColor: GREEN_BG, borderRadius: sc(19),
    paddingHorizontal: sc(6), paddingVertical: sc(3),
  },
  badgePrem: { backgroundColor: GREEN_BG },
  badgeTxt: { fontSize: sc(7), fontWeight: '700', color: GREEN, lineHeight: sc(8) },
  badgeTxtPrem: { color: GREEN },
  meta: { fontSize: sc(10), color: TEXT_SEC, lineHeight: sc(12) },
  price: {
    fontWeight: '700', fontSize: sc(16), lineHeight: sc(24), color: TEXT_DEEP,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  divider: { borderTopWidth: 0.75, borderTopColor: BORDER },
  itemsList: { gap: sc(4) },
  itemTxt: { fontSize: sc(12), color: TEXT_SEC, lineHeight: sc(18) },
});


const KITS: AddonItem[] = [
  {
    id: 'essentials',
    title: 'Essentials Kit',
    badge: 'Recommended',
    price: '₹2,100',
    meta1: '🚚 Next day delivery',
    items: ['Diyas (10)', 'Incense sticks', 'Flowers', 'Kumkum & Haldi', 'Coconut'],
    imageEmoji: '🧺',
  },
  {
    id: 'complete',
    title: 'Complete Puja Kit',
    badge: 'Recommended',
    price: '₹2,100',
    meta1: '🚚 Next day delivery',
    imageEmoji: '🪔',
  },
  {
    id: 'premium',
    title: 'Premium Ceremony Kit',
    badge: 'Premium',
    price: '₹2,100',
    meta1: '🚚 Same day delivery',
    imageEmoji: '🎁',
  },
];

const BHAJANS: AddonItem[] = [
  {
    id: 'basic',
    title: 'Basic',
    price: '₹2,100',
    meta1: '🎤 2 singers  ⏱ 1 Hour',
    imageEmoji: '🎵',
  },
  {
    id: 'pro',
    title: 'Pro',
    badge: 'Popular',
    price: '₹2,100',
    meta1: '🎤 2 singers  ⏱ 1 Hour',
    items: ['4 professional singers', 'Full percussion', 'Customised song selection', 'Sound system'],
    imageEmoji: '🎼',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    price: '₹2,100',
    meta1: '🎤 2 singers  ⏱ 1 Hour',
    imageEmoji: '🪘',
  },
];


export const AddOnsScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const [selectedKit, setSelectedKit] = useState<string | null>(null);
  const [selectedBhajan, setSelectedBhajan] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  return (
    <View style={s.container}>
      <Header
        onBack={() => navigation?.goBack()}
        onSkip={() => navigation?.navigate('Payment')}
      />
      <SummaryBar />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        <Text style={s.sectionTitle}>Puja Kit</Text>
        <Text style={s.sectionSub}>All items delivered before your puja</Text>

        <EnhanceBanner />

        {KITS.map(kit => (
          <AddonCard
            key={kit.id}
            item={kit}
            selected={selectedKit === kit.id}
            onSelect={() => setSelectedKit(selectedKit === kit.id ? null : kit.id)}
          />
        ))}

 
        <View style={s.separator} />

   
        <Text style={s.sectionTitle}>Bhajan Services</Text>
        <Text style={s.sectionSub}>Add devotional music to your ritual</Text>

        {BHAJANS.map(b => (
          <AddonCard
            key={b.id}
            item={b}
            selected={selectedBhajan === b.id}
            onSelect={() => setSelectedBhajan(selectedBhajan === b.id ? null : b.id)}
          />
        ))}
      </ScrollView>


      <View style={[s.footer, { paddingBottom: insets.bottom + sc(8) }]}>
        <TouchableOpacity
          style={s.cta}
          onPress={() => navigation?.navigate('Payment')}
          activeOpacity={0.88}
        >
          <Text style={s.ctaTxt}>Continue Booking</Text>
          <Text style={s.ctaArrow}> →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  scroll: { paddingHorizontal: sc(20), paddingTop: sc(16), paddingBottom: sc(24), gap: sc(12) },
  sectionTitle: {
    fontWeight: '700', fontSize: sc(20), lineHeight: sc(28), color: TEXT_PRI,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  sectionSub: { fontSize: sc(14), lineHeight: sc(22), color: TEXT_SEC },
  separator: { height: 1, backgroundColor: BORDER, marginVertical: sc(8) },
  footer: {
    backgroundColor: WHITE, borderTopWidth: 1, borderTopColor: BORDER,
    paddingHorizontal: sc(20), paddingTop: sc(16),
  },
  cta: {
    backgroundColor: PRIMARY, borderRadius: sc(12), height: sc(52),
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  ctaTxt: { color: '#FFFAF0', fontWeight: '500', fontSize: sc(16), letterSpacing: 0.15 },
  ctaArrow: { color: WHITE, fontSize: sc(18), fontWeight: '500' },
});

export default AddOnsScreen;