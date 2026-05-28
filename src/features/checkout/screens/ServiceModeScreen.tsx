import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowRight, Settings, BadgeIndianRupee} from 'lucide-react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BASE_WIDTH = 393;
const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;
const PRIMARY = '#2B000A';
const GOLD = '#F3B416';
const WHITE = '#FFFFFF';
const SURFACE = '#F9F9F9';
const BORDER = '#D9D9D9';
const TEXT_PRIMARY = '#000000';
const TEXT_SECONDARY = '#757575';
const TEXT_ON_DARK = 'rgba(255,255,255,0.75)';

type PujaMode = 'home_visit' | 'temple' | 'online' | 'virtual';

interface ModeItem {
  id: PujaMode;
  emoji: string;
  title: string;
  desc: string;
  badge?: string;
  badgeColor?: string;
  badgeBg?: string;
  setup?: string;
  pricing?: string;
}

const MODES: ModeItem[] = [
  {
    id: 'home_visit',
    emoji: '🏠',
    title: 'Home Visit',
    desc: 'A certified pandit visits your home to perform the ritual in your sacred space. Visit',
    badge: 'Most Popular',
    badgeColor: '#00A703',
    badgeBg: 'rgba(0,167,3,0.39)',
    setup: 'Clean pujs room, ritual items arranged',
    pricing: 'Base price + travel charges',
  },
  {
    id: 'temple',
    emoji: '🛕',
    title: 'Temple Ritual',
    desc: 'Ritual performed by an in-house pandit at a partnered temple with full ceremony.',
    badge: 'Most Popular',
    badgeColor: '#0064A7',
    badgeBg: 'rgba(0,145,167,0.15)',
  },
  {
    id: 'online',
    emoji: '📹',
    title: 'Online Pooja',
    desc: 'Live video call with a pandit. Participate in real-time from anywhere in the world.',
  },
  {
    id: 'virtual',
    emoji: '📱',
    title: 'Virtual Participation',
    desc: 'Pandit performs on your behalf at a sacred venue. Receive prasad & blessings.',
    badge: 'Most Popular',
    badgeColor: '#A79F00',
    badgeBg: 'rgba(167,159,0,0.15)',
  },
];

const ProgressBar = ({
  currentStep,
  totalSteps = 5,
}: {
  currentStep: number;
  totalSteps?: number;
}) => (
  <View style={pb.row}>
    {Array.from({length: totalSteps}).map((_, index) => {
      const isActive = index + 1 === currentStep;

      return (
        <View
          key={`step-${index}`}
          style={[pb.line, isActive ? pb.active : pb.inactive]}
        />
      );
    })}
  </View>
);

const pb = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(14),
    gap: scale(10),
    width: '100%',
  },

  line: {
    flex: 1,
    height: scale(4),
    borderRadius: 100,
  },

  active: {
    backgroundColor: GOLD,
  },

  inactive: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
});

const Header = ({onBack, title}: {onBack: () => void; title: string}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[hdr.container, {paddingTop: insets.top + scale(8)}]}>
      <TouchableOpacity
        style={hdr.backBtn}
        onPress={onBack}
        activeOpacity={0.8}>
        <View style={hdr.circle}>
          <View style={hdr.chevron} />
        </View>
      </TouchableOpacity>

      <View style={hdr.titleBlock}>
        <Text style={hdr.title}>{title || 'Puja'}</Text>
        <Text style={hdr.step}>
          Step <Text style={hdr.stepBold}>1 / 5</Text> :{' '}
          <Text style={hdr.stepBold}>Service mode</Text>
        </Text>
        <ProgressBar currentStep={1} />
      </View>
    </View>
  );
};

const hdr = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY,
    borderBottomLeftRadius: scale(16),
    borderBottomRightRadius: scale(16),
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
  },
  backBtn: {
    position: 'absolute',
    left: scale(20),
    bottom: scale(46),
  },
  circle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    width: scale(8),
    height: scale(8),
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: PRIMARY,
    transform: [{rotate: '45deg'}, {translateX: scale(2)}],
  },
  titleBlock: {
    marginLeft: scale(48),
    marginTop: scale(6),
    paddingRight: scale(8),
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',
    fontWeight: '700',
    fontSize: scale(28),
    lineHeight: scale(36),
    color: WHITE,
  },
  step: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    fontSize: scale(10),
    lineHeight: scale(12),
    color: WHITE,
    marginTop: scale(2),
  },
  stepBold: {fontWeight: '700'},
});

const ModeCard: React.FC<{
  item: ModeItem;
  selected: boolean;
  onSelect: () => void;
}> = ({item, selected, onSelect}) => {
  const isHomeVisit = item.id === 'home_visit';
  const cardBg =
    selected && isHomeVisit ? PRIMARY : selected ? PRIMARY : SURFACE;
  const titleColor = selected ? WHITE : TEXT_PRIMARY;
  const descColor = selected ? TEXT_ON_DARK : TEXT_SECONDARY;
  const borderColor = selected ? PRIMARY : BORDER;

  return (
    <TouchableOpacity
      style={[
        card.container,
        {backgroundColor: cardBg, borderColor},
        selected && card.selected,
      ]}
      onPress={onSelect}
      activeOpacity={0.85}>
      <View style={card.topRow}>
        <View style={card.iconBox}>
          <Text style={card.emoji}>{item.emoji}</Text>
        </View>
        <View style={card.infoBlock}>
          <View style={card.titleRow}>
            <Text style={[card.title, {color: titleColor}]}>{item.title}</Text>
            {item.badge && (
              <View style={[card.badge, {backgroundColor: item.badgeBg}]}>
                <Text style={[card.badgeText, {color: item.badgeColor}]}>
                  {item.badge}
                </Text>
              </View>
            )}
          </View>
          <Text style={[card.desc, {color: descColor}]}>{item.desc}</Text>
        </View>
      </View>

      {selected && item.setup && (
        <>
          <View style={card.divider} />
          <View style={card.extraRow}>
            <View style={card.extraLine}>
              <Settings
                size={scale(13)}
                color={TEXT_ON_DARK}
                strokeWidth={1.8}
              />
              <Text style={card.extraLabel}>Setup:</Text>
              <Text style={card.extraValue}>{item.setup}</Text>
            </View>

            <View style={card.extraLine}>
              <BadgeIndianRupee
                size={scale(13)}
                color={TEXT_ON_DARK}
                strokeWidth={1.8}
              />
              <Text style={card.extraLabel}>Pricing:</Text>
              <Text style={card.extraValue}>{item.pricing}</Text>
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const card = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: scale(16),
    borderWidth: 1,
    padding: scale(16),
    gap: scale(12),
  },
  selected: {
    shadowColor: PRIMARY,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(12),
  },
  iconBox: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(6),
    backgroundColor: 'rgba(120,120,128,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {fontSize: scale(24)},
  infoBlock: {flex: 1, gap: scale(4)},
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    flexWrap: 'wrap',
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',
    fontWeight: '700',
    fontSize: scale(16),
    lineHeight: scale(24),
  },
  badge: {
    paddingHorizontal: scale(6),
    paddingVertical: scale(3),
    borderRadius: scale(19),
  },
  badgeText: {
    fontWeight: '700',
    fontFamily: 'Inter',
    fontSize: scale(7),
    lineHeight: scale(8),
  },
  desc: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',
    fontWeight: '400',
    fontSize: scale(12),
    lineHeight: scale(18),
  },
  divider: {
    height: 0,
    borderTopWidth: 0.75,
    borderTopColor: BORDER,
    marginVertical: scale(4),
  },
  extraRow: {gap: scale(4)},
  extraLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  extraIcon: {fontSize: scale(12), color: TEXT_ON_DARK},
  extraLabel: {
    fontWeight: '700',
    fontSize: scale(12),
    fontFamily: 'Lato',
    lineHeight: scale(18),
    color: TEXT_ON_DARK,
  },
  extraValue: {
    fontWeight: '400',
    fontFamily: 'Lato',
    fontSize: scale(12),
    lineHeight: scale(18),
    color: TEXT_ON_DARK,
  },
});

export const ServiceModeScreen: React.FC<any> = ({navigation, route}) => {
  const [selectedMode, setSelectedMode] = useState<PujaMode | null>(
    'home_visit',
  );
  const insets = useSafeAreaInsets();

  const {pujaId, puja} = route.params || {};
  const selectedPuja = puja;
  return (
    <View style={s.container}>
      <Header onBack={() => navigation?.goBack()} title={selectedPuja?.title} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}>
        <Text style={s.heading}>How would you like your puja?</Text>
        <Text style={s.subheading}>
          Choose a service mode that works best for you. Each mode is fully
          sacred and verified.
        </Text>

        {MODES.map(m => (
          <ModeCard
            key={m.id}
            item={m}
            selected={selectedMode === m.id}
            onSelect={() => setSelectedMode(m.id)}
          />
        ))}
      </ScrollView>

      {/* btn */}
      <View style={[s.footer, {paddingBottom: insets.bottom + scale(8)}]}>
        <TouchableOpacity
          style={[s.cta, !selectedMode && s.ctaDisabled]}
          activeOpacity={0.88}
          onPress={() =>
            navigation?.navigate('DateMuhurat', {
              pujaId,
              puja,
              selectedMode,
            })
          }
          disabled={!selectedMode}>
          <Text style={s.ctaText}>Continue- Select Date &amp; Muhurat</Text>
          <ArrowRight size={scale(25)} color={WHITE} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
  scroll: {
    paddingHorizontal: scale(20),
    paddingTop: scale(16),
    paddingBottom: scale(24),
    gap: scale(12),
  },
  heading: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',
    fontWeight: '700',
    fontSize: scale(20),
    lineHeight: scale(28),
    color: TEXT_PRIMARY,
    marginBottom: scale(4),
  },
  subheading: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',
    fontWeight: '400',
    fontSize: scale(14),
    lineHeight: scale(22),
    color: TEXT_SECONDARY,
    marginBottom: scale(8),
  },
  footer: {
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingHorizontal: scale(20),
    paddingTop: scale(50),
  },
  cta: {
    backgroundColor: PRIMARY,
    borderRadius: scale(12),
    height: scale(52),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
    top: -22,
  },
  ctaDisabled: {opacity: 0.5},
  ctaText: {
    color: '#FFFAF0',
    fontFamily: Platform.OS === 'ios' ? 'Roboto' : 'Roboto',
    fontWeight: '500',
    fontSize: scale(16),
    lineHeight: scale(24),
    letterSpacing: 0.15,
  },
  ctaArrow: {
    color: WHITE,
    fontSize: scale(18),
    fontWeight: '500',
  },
});

export default ServiceModeScreen;
