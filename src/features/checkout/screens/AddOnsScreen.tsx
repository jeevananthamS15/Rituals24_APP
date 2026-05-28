import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Polyline,
  Polygon,
} from 'react-native-svg';

const {width: SW} = Dimensions.get('window');
const BASE = 393;
const sc = (n: number) => (SW / BASE) * n;

const PRIMARY = '#2B000A';
const GOLD = '#F3B416';
const GOLD2 = '#DDAB2C';
const GOLD_BG = 'rgba(221,171,44,0.2)';
const WHITE = '#FFFFFF';
const SURFACE = '#F9F9F9';
const BORDER = '#D9D9D9';
const TEXT_PRI = '#000000';
const TEXT_DEEP = '#281518';
const TEXT_SEC = '#757575';
const GREEN = '#00A703';
const GREEN_BG = 'rgba(0,167,3,0.18)';
const SEG_DIM = 'rgba(255,255,255,0.2)';

// ── SVG Icons ────────────────────────────────────────────────
const ChevronLeft: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({size = 20, color = PRIMARY, strokeWidth = 1.64}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ArrowRight: React.FC<{size?: number; color?: string}> = ({
  size = 20,
  color = WHITE,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12h14M12 5l7 7-7 7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BoxIcon: React.FC<{size?: number; color?: string}> = ({
  size = 18,
  color = GOLD2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TruckIcon: React.FC<{size?: number; color?: string}> = ({
  size = 14,
  color = TEXT_SEC,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="5.5" cy="18.5" r="2.5" stroke={color} strokeWidth={1.5} />
    <Circle cx="18.5" cy="18.5" r="2.5" stroke={color} strokeWidth={1.5} />
  </Svg>
);

const MicIcon: React.FC<{size?: number; color?: string}> = ({
  size = 14,
  color = TEXT_SEC,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="9"
      y="2"
      width="6"
      height="12"
      rx="3"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 10a7 7 0 0014 0"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 19v3M8 22h8"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ClockIcon: React.FC<{size?: number; color?: string}> = ({
  size = 14,
  color = TEXT_SEC,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={1.5} />
    <Path
      d="M12 6v6l4 2"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Header ───────────────────────────────────────────────────
const Header: React.FC<{
  onBack: () => void;
  onSkip: () => void;
  pujaName?: string;
}> = ({onBack, onSkip, pujaName}) => {
  const insets = useSafeAreaInsets();
  const SEG_COLORS = [GOLD, GOLD2, GOLD2, GOLD2, SEG_DIM];

  return (
    <View style={[hdr.wrap, {paddingTop: insets.top}]}>
      {/* Row: back + title + skip */}
      <View style={hdr.row}>
        <TouchableOpacity
          style={hdr.backBtn}
          onPress={onBack}
          activeOpacity={0.8}>
          <View style={hdr.circle}>
            <ChevronLeft size={sc(20)} color={PRIMARY} strokeWidth={2} />
          </View>
        </TouchableOpacity>

        <View style={hdr.titleBlock}>
          <Text style={hdr.title} numberOfLines={1}>
            {pujaName || 'Satyanarayan puja'}
          </Text>
          <Text style={hdr.step}>
            {'Step '}
            <Text style={hdr.bold}>4 / 5</Text>
            {' : '}
            <Text style={hdr.bold}>Service mode</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={hdr.skipBtn}
          onPress={onSkip}
          activeOpacity={0.8}>
          <Text style={hdr.skipTxt}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Progress segments */}
      <View style={hdr.progRow}>
        {SEG_COLORS.map((c, i) => (
          <View key={i} style={[hdr.seg, {backgroundColor: c}]} />
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
    paddingBottom: sc(18),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sc(8),
    gap: sc(8),
  },
  backBtn: {
    marginTop: sc(2),
  },
  circle: {
    width: sc(32),
    height: sc(32),
    borderRadius: sc(16),
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    flex: 1,
    gap: sc(4),
    paddingRight: sc(4),
  },
  title: {
    fontWeight: '700',
    fontSize: sc(28),
    lineHeight: sc(36),
    color: WHITE,
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'sans-serif-medium',
  },
  step: {
    fontSize: sc(10),
    lineHeight: sc(12),
    color: WHITE,
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
  },
  bold: {fontWeight: '700'},
  skipBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.75)',
    borderRadius: sc(12),
    paddingHorizontal: sc(12),
    paddingVertical: sc(6),
    alignSelf: 'center',
  },
  skipTxt: {
    fontSize: sc(14),
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
    lineHeight: sc(17),
  },
  progRow: {
    flexDirection: 'row',
    gap: sc(18),
    marginTop: sc(14),
    alignSelf: 'center',
  },
  seg: {
    width: sc(40),
    height: 5,
    borderRadius: 2,
  },
});

// ── Summary Bar ──────────────────────────────────────────────
const SummaryBar: React.FC<{
  mode?: string;
  date?: string | number;
  time?: any;
  pandit?: any;
}> = ({mode, date, time, pandit}) => (
  <View style={sb.wrap}>
    <View style={sb.cell}>
      <Text style={sb.lbl}>Mode:</Text>
      <Text style={sb.val}>{mode || 'Home Visit'}</Text>
    </View>

    <View style={sb.divider} />

    <View style={sb.cell}>
      <Text style={sb.lbl}>Date & Time:</Text>

      <Text style={sb.val}>
        {date || '11-05'} / {time?.time || '6:00 AM'}
      </Text>
    </View>

    <View style={sb.divider} />

    <View style={sb.cell}>
      <Text style={sb.lbl}>Pandits</Text>

      <Text style={sb.val}>{pandit?.name || 'Pt. Acharya Vivek'}</Text>
    </View>
  </View>
);

const sb = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: sc(12),
    paddingVertical: sc(8),
    paddingHorizontal: sc(16),
    marginHorizontal: sc(20),
    marginTop: sc(12),
    height: sc(44),
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: sc(4),
  },
  lbl: {
    fontSize: sc(10),
    color: TEXT_PRI,
    lineHeight: sc(12),
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
  },
  val: {
    fontSize: sc(10),
    fontWeight: '700',
    color: TEXT_PRI,
    lineHeight: sc(12),
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
  },
  divider: {
    width: 1,
    height: sc(28),
    backgroundColor: BORDER,
  },
});

// ── Enhance Banner ───────────────────────────────────────────
const EnhanceBanner: React.FC = () => (
  <View style={en.wrap}>
    <BoxIcon size={sc(18)} color={GOLD2} />
    <View style={en.textBlock}>
      <Text style={en.title}>Enhance Your Ritual Experience</Text>
      <Text style={en.sub}>
        All add-ons are completely optional — skip freely.
      </Text>
    </View>
  </View>
);

const en = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GOLD_BG,
    borderRadius: sc(12),
    paddingVertical: sc(8),
    paddingHorizontal: sc(16),
    gap: sc(10),
  },
  textBlock: {
    flex: 1,
    gap: sc(4),
  },
  title: {
    fontSize: sc(10),
    fontWeight: '700',
    color: TEXT_PRI,
    lineHeight: sc(12),
  },
  sub: {
    fontSize: sc(10),
    color: TEXT_PRI,
    lineHeight: sc(12),
  },
});

// ── Image Placeholder ────────────────────────────────────────
const ImgPlaceholder: React.FC<{source: any}> = ({source}) => (
  <Image source={source} style={img.box} resizeMode="cover" />
);

const img = StyleSheet.create({
  box: {
    width: sc(77),
    height: sc(76),
    borderRadius: sc(16),
    overflow: 'hidden',
  },
});

// ── AddonCard ────────────────────────────────────────────────
interface AddonItem {
  id: string;
  title: string;
  badge?: string;
  price: string;
  metaType: 'truck' | 'mic_clock';
  metaText: string;
  items?: string[];
  image: any;
}

const MetaRow: React.FC<{type: 'truck' | 'mic_clock'; text: string}> = ({
  type,
  text,
}) => {
  if (type === 'truck') {
    return (
      <View style={meta.row}>
        <TruckIcon size={sc(14)} color={TEXT_SEC} />
        <Text style={meta.txt}>{text}</Text>
      </View>
    );
  }
  // mic + clock side by side
  const [singers, hours] = text.split('  ');
  return (
    <View style={meta.row}>
      <MicIcon size={sc(14)} color={TEXT_SEC} />
      <Text style={meta.txt}>{singers}</Text>
      <View style={meta.spacer} />
      <ClockIcon size={sc(14)} color={TEXT_SEC} />
      <Text style={meta.txt}>{hours}</Text>
    </View>
  );
};

const meta = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center', gap: sc(4)},
  txt: {fontSize: sc(10), color: TEXT_SEC, lineHeight: sc(12)},
  spacer: {width: sc(4)},
});

const AddonCard: React.FC<{
  item: AddonItem;
  selected: boolean;
  onSelect: () => void;
}> = ({item, selected, onSelect}) => (
  <TouchableOpacity
    style={[adc.card, selected && adc.cardActive]}
    onPress={onSelect}
    activeOpacity={0.85}>
    <View style={adc.topRow}>
      <ImgPlaceholder source={item.image} />

      <View style={adc.info}>
        <View style={adc.titleRow}>
          <Text style={adc.title}>{item.title}</Text>
          {item.badge && (
            <View style={adc.badge}>
              <Text style={adc.badgeTxt}>{item.badge}</Text>
            </View>
          )}
        </View>
        <MetaRow type={item.metaType} text={item.metaText} />
      </View>

      <Text style={adc.price}>{item.price}</Text>
    </View>

    {item.items && item.items.length > 0 && (
      <>
        <View style={adc.divider} />
        <View style={adc.itemsList}>
          {item.items.map((it, i) => (
            <Text key={i} style={adc.itemTxt}>
              {'• ' + it}
            </Text>
          ))}
        </View>
      </>
    )}
  </TouchableOpacity>
);

const adc = StyleSheet.create({
  card: {
    backgroundColor: SURFACE,
    borderRadius: sc(16),
    borderWidth: 1,
    borderColor: BORDER,
    padding: sc(16),
    gap: sc(10),
  },
  cardActive: {borderColor: PRIMARY, borderWidth: 1.5},
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sc(8),
  },
  info: {
    flex: 1,
    gap: sc(4),
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sc(8),
    flexWrap: 'wrap',
  },
  title: {
    fontWeight: '700',
    fontSize: sc(14),
    lineHeight: sc(22),
    color: TEXT_DEEP,
  },
  badge: {
    backgroundColor: GREEN_BG,
    borderRadius: sc(19),
    paddingHorizontal: sc(6),
    paddingVertical: sc(3),
  },
  badgeTxt: {
    fontSize: sc(7),
    fontWeight: '700',
    color: GREEN,
    lineHeight: sc(8),
  },
  price: {
    fontWeight: '700',
    fontSize: sc(16),
    lineHeight: sc(24),
    color: TEXT_DEEP,
    alignSelf: 'center',
    minWidth: sc(50),
    textAlign: 'right',
  },
  divider: {
    borderTopWidth: 0.75,
    borderTopColor: BORDER,
  },
  itemsList: {gap: sc(2)},
  itemTxt: {
    fontSize: sc(12),
    color: TEXT_SEC,
    lineHeight: sc(18),
  },
});

// ── Data ─────────────────────────────────────────────────────
const KITS: AddonItem[] = [
  {
    id: 'essentials',
    title: 'Essentials Kit',
    badge: 'Recommended',
    price: '₹2,100',
    metaType: 'truck',
    metaText: 'Next day delivery',
    items: [
      'Diyas (10)',
      'Incense sticks',
      'Flowers',
      'Kumkum & Haldi',
      'Coconut',
    ],
    image: require('../../../../assets/HomeScreen/StoreKit/pk1.jpg'),
  },
  {
    id: 'complete',
    title: 'Complete Puja Kit',
    badge: 'Recommended',
    price: '₹2,100',
    metaType: 'truck',
    metaText: 'Next day delivery',
    image: require('../../../../assets/HomeScreen/StoreKit/pk2.jpg'),
  },
  {
    id: 'premium',
    title: 'Premium Ceremony Kit',
    badge: 'Premium',
    price: '₹2,100',
    metaType: 'truck',
    metaText: 'Same day delivery',
    image: require('../../../../assets/HomeScreen/StoreKit/pk3.jpg'),
  },
];

const BHAJANS: AddonItem[] = [
  {
    id: 'basic',
    title: 'Basic',
    price: '₹2,100',
    metaType: 'mic_clock',
    metaText: '2 singers  1 Hour',
    image: require('../../../../assets/HomeScreen/StoreKit/pk1.jpg'),
  },
  {
    id: 'pro',
    title: 'Pro',
    badge: 'Popular',
    price: '₹2,100',
    metaType: 'mic_clock',
    metaText: '2 singers  1 Hour',
    items: [
      '4 professional singers',
      'Full percussion',
      'Customised song selection',
      'Sound system',
    ],
    image: require('../../../../assets/HomeScreen/StoreKit/pk2.jpg'),
  },
  {
    id: 'advanced',
    title: 'Advanced',
    price: '₹2,100',
    metaType: 'mic_clock',
    metaText: '2 singers  1 Hour',
    image: require('../../../../assets/HomeScreen/StoreKit/pk3.jpg'),
  },
];

// ── Screen ───────────────────────────────────────────────────
export const AddOnsScreen: React.FC<{
  navigation?: any;
  route?: any;
}> = ({navigation, route}) => {
  const {
    puja,
    pujaId,
    selectedMode,
    selectedDate,
    selectedTime,
    selectedPandit,
  } = route?.params || {};
  const [selectedKit, setSelectedKit] = useState<string | null>(null);
  const formattedMode =
    selectedMode === 'home_visit'
      ? 'Home Visit'
      : selectedMode === 'temple_visit'
      ? 'Temple Visit'
      : 'Home Visit';
  const [selectedBhajan, setSelectedBhajan] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  return (
    <View style={s.container}>
      <Header
        pujaName={puja?.title}
        onBack={() => navigation?.goBack()}
        onSkip={() =>
          navigation?.navigate('Payment', {
            puja,
            pujaId,
            selectedMode,
            selectedDate,
            selectedTime,
            selectedPandit,
          })
        }
      />

      <SummaryBar
        mode={formattedMode}
        date={selectedDate}
        time={selectedTime}
        pandit={selectedPandit}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}>
        {/* ── Puja Kit section ── */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Puja Kit</Text>
          <Text style={s.sectionSub}>All items delivered before your puja</Text>
        </View>

        <EnhanceBanner />

        {KITS.map(kit => (
          <AddonCard
            key={kit.id}
            item={kit}
            selected={selectedKit === kit.id}
            onSelect={() =>
              setSelectedKit(selectedKit === kit.id ? null : kit.id)
            }
          />
        ))}

        {/* ── Separator ── */}
        <View style={s.separator} />

        {/* ── Bhajan Services section ── */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Bhajan Services</Text>
          <Text style={s.sectionSub}>Add devotional music to your ritual</Text>
        </View>

        {BHAJANS.map(b => (
          <AddonCard
            key={b.id}
            item={b}
            selected={selectedBhajan === b.id}
            onSelect={() =>
              setSelectedBhajan(selectedBhajan === b.id ? null : b.id)
            }
          />
        ))}
      </ScrollView>

      {/* ── Footer ── */}
      <View style={[s.footer, {paddingBottom: insets.bottom || sc(16)}]}>
        <TouchableOpacity
          style={s.cta}
          onPress={() =>
            navigation?.navigate('Payment', {
              puja,
              pujaId,
              selectedMode,
              selectedDate,
              selectedTime,
              selectedPandit,
              selectedKit,
              selectedBhajan,
            })
          }
          activeOpacity={0.88}>
          <Text style={s.ctaTxt}>Continue Booking</Text>
          <ArrowRight size={sc(20)} color={WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
  scroll: {
    paddingHorizontal: sc(20),
    paddingTop: sc(16),
    paddingBottom: sc(32),
    gap: sc(12),
  },
  sectionHeader: {gap: sc(2)},
  sectionTitle: {
    fontWeight: '700',
    fontSize: sc(20),
    lineHeight: sc(28),
    color: TEXT_PRI,
  },
  sectionSub: {
    fontSize: sc(14),
    lineHeight: sc(22),
    color: TEXT_SEC,
  },
  separator: {
    height: 1,
    backgroundColor: BORDER,
    marginVertical: sc(4),
  },
  footer: {
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingHorizontal: sc(20),
    paddingTop: sc(16),
  },
  cta: {
    backgroundColor: PRIMARY,
    borderRadius: sc(12),
    height: sc(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sc(4),
  },
  ctaTxt: {
    color: '#FFFAF0',
    fontWeight: '500',
    fontSize: sc(16),
    lineHeight: sc(24),
    letterSpacing: 0.15,
  },
});

export default AddOnsScreen;
