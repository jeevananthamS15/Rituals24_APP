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

const {width: SW} = Dimensions.get('window');
const BASE = 393;
const sc = (n: number) => (SW / BASE) * n;

const PRIMARY = '#2B000A';
const PRIMARY_DK = '#540B1C';
const GOLD = '#F3B416';
const GOLD2 = '#DDAB2C';
const WHITE = '#FFFFFF';
const SURFACE = '#F9F9F9';
const BORDER = '#D9D9D9';
const TEXT_PRI = '#000000';
const TEXT_DEEP = '#281518';
const TEXT_SEC = '#757575';
const TEXT_GREY = '#666666';
const TEXT_ON_DK = 'rgba(255,255,255,0.75)';

interface Pandit {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  tier: string;
  years: string;
  languages: string;
  price: string;
  rituals?: string;
  specialist?: string;
  image: any;
}

const PANDITS: Pandit[] = [
  {
    id: '1',
    name: 'Pt. Acharya Vivek',
    rating: 4.9,
    reviews: 234,
    tier: 'Gold',
    years: '15 Years',
    languages: 'Hindi, Sanskrit',
    price: '₹2,100',
    rituals: '1,200 Completed',
    specialist: 'Satyanarayan puja, Muhurat Selection',
    image: require('../../../../assets/HomeScreen/pandit/pandit_1.png'),
  },
  {
    id: '2',
    name: 'Pt. Acharya Vivek',
    rating: 4.9,
    reviews: 234,
    tier: 'Gold',
    years: '15 Years',
    languages: 'Hindi, Sanskrit',
    price: '₹2,100',
    image: require('../../../../assets/HomeScreen/pandit/pandit_2.png'),
  },
  {
    id: '3',
    name: 'Pt. Acharya Vivek',
    rating: 4.9,
    reviews: 234,
    tier: 'Gold',
    years: '15 Years',
    languages: 'Hindi, Sanskrit',
    price: '₹2,100',
    image: require('../../../../assets/HomeScreen/pandit/pandit_3.png'),
  },
];

const ProgressBar = ({
  currentStep,
  totalSteps = 5,
}: {
  currentStep: number;
  totalSteps?: number;
}) => (
  <View style={hdr.progRow}>
    {Array.from({length: totalSteps}).map((_, index) => {
      const isActive = index + 1 <= currentStep;

      return (
        <View
          key={`step-${index}`}
          style={[hdr.seg, isActive ? hdr.activeSeg : hdr.inactiveSeg]}
        />
      );
    })}
  </View>
);

const Header: React.FC<{
  step: number;
  filledCount: number;
  onBack: () => void;
  title?: string;
}> = ({step, filledCount, onBack, title}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[hdr.wrap, {paddingTop: insets.top + sc(8)}]}>
      <TouchableOpacity
        style={hdr.backBtn}
        onPress={onBack}
        activeOpacity={0.8}>
        <View style={hdr.circle}>
          <View style={hdr.chevron} />
        </View>
      </TouchableOpacity>

      <View style={hdr.titleBlock}>
        <Text style={hdr.title}> {title || 'Satyanarayan puja'}</Text>

        <Text style={hdr.step}>
          Step <Text style={hdr.bold}>{step} / 5</Text> :{' '}
          <Text style={hdr.bold}>Service mode</Text>
        </Text>

        <ProgressBar currentStep={filledCount} />
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

  backBtn: {
    position: 'absolute',
    left: sc(20),
    bottom: sc(46),
  },

  circle: {
    width: sc(32),
    height: sc(32),
    borderRadius: sc(16),
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chevron: {
    width: sc(8),
    height: sc(8),
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: PRIMARY,
    transform: [{rotate: '45deg'}, {translateX: sc(2)}],
  },

  titleBlock: {
    marginLeft: sc(48),
    marginTop: sc(6),
    paddingRight: sc(8),
  },

  title: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',
    fontWeight: '700',
    fontSize: sc(28),
    lineHeight: sc(36),
    color: WHITE,
  },

  step: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    fontSize: sc(10),
    lineHeight: sc(12),
    color: WHITE,
    marginTop: sc(2),
  },

  bold: {
    fontWeight: '700',
  },

  progRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sc(14),
    gap: sc(10),
    width: '100%',
  },

  seg: {
    flex: 1,
    height: sc(4),
    borderRadius: 100,
  },

  activeSeg: {
    backgroundColor: '#F3B416',
  },

  inactiveSeg: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
});

const SummaryBar: React.FC<{
  selectedMode?: string;
  selectedDate?: number;
  selectedTime?: any;
}> = ({selectedMode, selectedDate, selectedTime}) => {
  const formattedMode =
    selectedMode === 'home_visit'
      ? 'Home Visit'
      : selectedMode === 'temple_visit'
      ? 'Temple Visit'
      : 'Home Visit';

  return (
    <View style={sb.wrap}>
      <View style={sb.cell}>
        <Text style={sb.lbl}>Mode:</Text>

        <Text style={sb.val}>{formattedMode}</Text>
      </View>

      <View style={sb.div} />

      <View style={sb.cell}>
        <Text style={sb.lbl}>Date & Time:</Text>

        <Text style={sb.val}>
          {selectedDate
            ? `${selectedDate}-05 / ${selectedTime?.time || ''}`
            : '11-05 / 6:00 AM'}
        </Text>
      </View>

      <View style={sb.div} />

      <View style={sb.cell}>
        <Text style={sb.lbl}>Pandits</Text>
      </View>
    </View>
  );
};

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
    marginBottom: sc(4),
  },
  cell: {flex: 1, alignItems: 'center', gap: sc(4)},
  lbl: {fontSize: sc(10), color: TEXT_PRI, lineHeight: sc(12)},
  val: {
    fontSize: sc(10),
    fontWeight: '700',
    color: TEXT_PRI,
    lineHeight: sc(12),
  },
  div: {
    width: 1,
    height: sc(28),
    backgroundColor: BORDER,
    marginHorizontal: sc(4),
  },
});

// ─── Pandit Card ──────────────────────────────────────────────────────────────
const PanditCard: React.FC<{
  pandit: Pandit;
  selected: boolean;
  onSelect: () => void;
}> = ({pandit, selected, onSelect}) => {
  const isDark = selected;
  const cardBg = isDark ? PRIMARY : SURFACE;
  const nameClr = isDark ? WHITE : TEXT_DEEP;
  const metaClr = isDark ? WHITE : TEXT_SEC;
  const subClr = isDark ? TEXT_ON_DK : TEXT_GREY;
  const priceClr = isDark ? WHITE : TEXT_DEEP;

  return (
    <TouchableOpacity
      style={[
        pc.card,
        {backgroundColor: cardBg, borderColor: isDark ? PRIMARY : BORDER},
      ]}
      onPress={onSelect}
      activeOpacity={0.85}>
      {/* Top row */}
      <View style={pc.topRow}>
        {/* Avatar placeholder */}
        <View style={pc.avatarWrap}>
          <Image
            source={pandit.image}
            style={pc.avatarImage}
            resizeMode="cover"
          />
          {/* 300+ Pujas badge under avatar */}
          <View style={pc.pujasBadge}>
            <Text style={pc.pujasBadgeText}>300+ Pujas</Text>
          </View>
        </View>

        {/* Info */}
        <View style={pc.infoBlock}>
          <Text style={[pc.name, {color: nameClr}]}>{pandit.name}</Text>

          {/* Rating row */}
          <View style={pc.ratingRow}>
            <Text style={pc.star}>★</Text>
            <Text style={[pc.ratingNum, {color: nameClr}]}>
              {pandit.rating}
            </Text>
            <Text style={[pc.reviews, {color: metaClr}]}>
              ({pandit.reviews})
            </Text>
            <View style={pc.goldBadge}>
              <Text style={pc.goldText}>{pandit.tier}</Text>
            </View>
          </View>

          {/* Years · Languages */}
          <View style={pc.metaRow}>
            <Text style={[pc.metaTxt, {color: metaClr}]}>{pandit.years}</Text>
            <View style={pc.dot} />
            <Text style={[pc.metaTxt, {color: metaClr}]}>
              {pandit.languages}
            </Text>
          </View>
        </View>

        {/* Price */}
        <Text style={[pc.price, {color: priceClr}]}>{pandit.price}</Text>
      </View>

      {/* Expanded info (only first / selected) */}
      {(pandit.rituals || pandit.specialist) && (
        <>
          <View
            style={[
              pc.divider,
              {borderColor: isDark ? 'rgba(255,255,255,0.2)' : BORDER},
            ]}
          />
          <View style={pc.extraBlock}>
            {pandit.rituals && (
              <View style={pc.extraRow}>
                <Text style={[pc.extraIcon, {color: subClr}]}>✓</Text>
                <Text style={[pc.extraLbl, {color: subClr}]}>Riruals: </Text>
                <Text style={[pc.extraVal, {color: subClr}]}>
                  {pandit.rituals}
                </Text>
              </View>
            )}
            {pandit.specialist && (
              <View style={pc.extraRow}>
                <Text style={[pc.extraIcon, {color: subClr}]}>👤</Text>
                <Text style={[pc.extraLbl, {color: subClr}]}>Specilist: </Text>
                <Text style={[pc.extraVal, {color: subClr}]}>
                  {pandit.specialist}
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const pc = StyleSheet.create({
  card: {
    borderRadius: sc(16),
    borderWidth: 1,
    padding: sc(16),
    gap: sc(10),
  },
  topRow: {flexDirection: 'row', alignItems: 'center', gap: sc(8)},
  avatarWrap: {alignItems: 'center', gap: sc(4)},
  avatarImage: {
    width: sc(77),
    height: sc(76),
    borderRadius: sc(16),

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 20,
  },
  pujasBadge: {
    backgroundColor: GOLD2,
    borderRadius: sc(30),
    paddingHorizontal: sc(4),
    paddingVertical: sc(2),
  },
  pujasBadgeText: {fontSize: sc(7), fontWeight: '700', color: WHITE},
  infoBlock: {flex: 1, gap: sc(4)},
  name: {
    fontWeight: '700',
    fontSize: sc(14),
    lineHeight: sc(22),
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  ratingRow: {flexDirection: 'row', alignItems: 'center', gap: sc(2)},
  star: {color: GOLD, fontSize: sc(14)},
  ratingNum: {fontWeight: '700', fontSize: sc(12), lineHeight: sc(18)},
  reviews: {fontSize: sc(10), lineHeight: sc(12)},
  goldBadge: {
    backgroundColor: GOLD2,
    borderRadius: sc(16),
    paddingHorizontal: sc(4),
    paddingVertical: sc(2),
  },
  goldText: {fontSize: sc(10), color: WHITE, lineHeight: sc(12)},
  metaRow: {flexDirection: 'row', alignItems: 'center', gap: sc(4)},
  metaTxt: {fontSize: sc(10), lineHeight: sc(12)},
  dot: {width: 3, height: 3, borderRadius: 2, backgroundColor: TEXT_SEC},
  price: {
    fontWeight: '700',
    fontSize: sc(24),
    lineHeight: sc(32),
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  divider: {borderTopWidth: 0.75, marginVertical: sc(2)},
  extraBlock: {gap: sc(4)},
  extraRow: {flexDirection: 'row', alignItems: 'center', gap: sc(4)},
  extraIcon: {fontSize: sc(12)},
  extraLbl: {fontSize: sc(12), fontWeight: '700', lineHeight: sc(18)},
  extraVal: {fontSize: sc(12), lineHeight: sc(18)},
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
export const PanditSelectScreen: React.FC<{
  navigation?: any;
  route?: any;
}> = ({navigation, route}) => {
  const {puja, pujaId, selectedMode, selectedDate, selectedTime} =
    route?.params || {};
  const [selectedId, setSelectedId] = useState<string>('1');
  const insets = useSafeAreaInsets();
  console.log('Received Puja:', puja);
  console.log('Received Puja ID:', pujaId);
  console.log('Received Mode:', selectedMode);
  console.log('Received Date:', selectedDate);
  console.log('Received Time:', selectedTime);

  const selectedPandit = PANDITS.find(p => p.id === selectedId);
  return (
    <View style={s.container}>
      <Header
        step={3}
        filledCount={3}
        title={puja?.title}
        onBack={() => navigation?.goBack()}
      />
      <SummaryBar
        selectedMode={selectedMode}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}>
        <Text style={s.heading}>Matched Pandits</Text>
        <Text style={s.subheading}>
          Pandits selected based on your puja type, mode, and chosen date
        </Text>

        {PANDITS.map(p => (
          <PanditCard
            key={p.id}
            pandit={p}
            selected={selectedId === p.id}
            onSelect={() => setSelectedId(p.id)}
          />
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={[s.footer, {paddingBottom: insets.bottom + sc(8)}]}>
        <TouchableOpacity
          style={[s.cta, !selectedId && s.ctaDis]}
          onPress={() =>
            navigation?.navigate('AddOns', {
              puja,
              pujaId,
              selectedMode,
              selectedDate,
              selectedTime,
              selectedPandit: PANDITS.find(p => p.id === selectedId),
            })
          }
          disabled={!selectedId}
          activeOpacity={0.88}>
          <Text style={s.ctaTxt}>Continue Booking</Text>
          <Text style={s.ctaArrow}> →</Text>
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
    paddingBottom: sc(24),
    gap: sc(12),
  },
  heading: {
    fontWeight: '700',
    fontSize: sc(20),
    lineHeight: sc(28),
    color: TEXT_PRI,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subheading: {
    fontSize: sc(14),
    lineHeight: sc(22),
    color: TEXT_SEC,
    marginBottom: sc(4),
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
    height: sc(52),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaDis: {opacity: 0.5},
  ctaTxt: {
    color: '#FFFAF0',
    fontWeight: '500',
    fontSize: sc(16),
    letterSpacing: 0.15,
  },
  ctaArrow: {color: WHITE, fontSize: sc(18), fontWeight: '500'},
});

export default PanditSelectScreen;
