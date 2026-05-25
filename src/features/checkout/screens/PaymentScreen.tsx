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
const GOLD2 = '#DDAB2C';
const WHITE = '#FFFFFF';
const SURFACE = '#F9F9F9';
const BORDER = '#D9D9D9';
const BORDER2 = '#CDD5DF';
const TEXT_PRI = '#000000';
const TEXT_DEEP = '#281518';
const TEXT_SEC = '#757575';
const TEXT_GREY = '#666666';
const TEXT_ON_DK = 'rgba(255,255,255,0.75)';
const TEXT_ON_DK2 = 'rgba(255,255,255,0.8)';
const MAROON = '#800000';
const SPICY_PINK = '#7E676B';

const upiIcon = require('../../../../assets/HomeScreen/Payment/upi.png');
const cardIcon = require('../../../../assets/HomeScreen/Payment/card.png');

// Payment Method Icons
const paypalIcon = require('../../../../assets/HomeScreen/Payment/paypal.png');
const applePayIcon = require('../../../../assets/HomeScreen/Payment/apple.png');
const googlePayIcon = require('../../../../assets/HomeScreen/Payment/gpay.png');

const ProgressBar = ({
  currentStep,
  totalSteps = 5,
}: {
  currentStep: number;
  totalSteps?: number;
}) => (
  <View style={pb.row}>
    {Array.from({length: totalSteps}).map((_, index) => {
      const isActive = index + 1 <= currentStep;

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
    marginTop: sc(20),
    gap: sc(18),
    width: '100%',
  },

  line: {
    flex: 1,
    height: sc(5),
    borderRadius: 100,
  },

  active: {
    backgroundColor: GOLD2,
  },

  inactive: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
});

const Header: React.FC<{onBack: () => void}> = ({onBack}) => {
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
        <Text style={hdr.title}>Satyanarayan puja</Text>

        <Text style={hdr.step}>
          Step <Text style={hdr.bold}>5 / 5</Text> :{' '}
          <Text style={hdr.bold}>Service mode</Text>
        </Text>

        <ProgressBar currentStep={5} />
      </View>
    </View>
  );
};

const hdr = StyleSheet.create({
  wrap: {
    backgroundColor: PRIMARY,
    borderBottomLeftRadius: sc(20),
    borderBottomRightRadius: sc(20),

    paddingHorizontal: sc(20),
    paddingBottom: sc(24),
  },

  backBtn: {
    position: 'absolute',
    left: sc(20),
    bottom: sc(52),
  },

  circle: {
    width: sc(44),
    height: sc(44),
    borderRadius: sc(22),

    backgroundColor: WHITE,

    alignItems: 'center',
    justifyContent: 'center',
  },

  chevron: {
    width: sc(10),
    height: sc(10),

    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: PRIMARY,

    transform: [{rotate: '45deg'}, {translateX: sc(2)}],
  },

  titleBlock: {
    marginLeft: sc(58),
    marginTop: sc(8),
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
});

const BookingSummaryCard: React.FC = () => (
  <View style={bsc.card}>
    <View style={bsc.topRow}>
      <View style={bsc.iconBox}>
        <Text style={bsc.iconEmoji}>🏠</Text>
      </View>
      <View style={bsc.topInfo}>
        <Text style={bsc.modeName}>Home Visit</Text>
        <Text style={bsc.modeDesc} numberOfLines={2}>
          One of the most beloved Vaishnava rituals, performed to seek Lord
          Vishnu's blessings fo...
        </Text>
      </View>
    </View>

    <View style={bsc.divider} />

    <View style={bsc.detailGrid}>
      <View style={bsc.detailCell}>
        <View style={bsc.detailLblRow}>
          <Text style={bsc.detailIcon}>⚙</Text>
          <Text style={bsc.detailLbl}>Mode</Text>
        </View>
        <Text style={bsc.detailVal}>Home Visit</Text>
      </View>

      <View style={bsc.vertDivider} />

      <View style={bsc.detailCell}>
        <View style={bsc.detailLblRow}>
          <Text style={bsc.detailIcon}>📅</Text>
          <Text style={bsc.detailLbl}>Date</Text>
        </View>
        <Text style={bsc.detailVal}>12-05-2026</Text>
      </View>
    </View>

    <View style={bsc.detailGrid}>
      <View style={bsc.detailCell}>
        <View style={bsc.detailLblRow}>
          <Text style={bsc.detailIcon}>⏰</Text>
          <Text style={bsc.detailLbl}>Time</Text>
        </View>
        <Text style={bsc.detailVal}>7:30 - 9 AM</Text>
      </View>

      <View style={bsc.vertDivider} />

      <View style={bsc.detailCell}>
        <View style={bsc.detailLblRow}>
          <Text style={bsc.detailIcon}>👤</Text>
          <Text style={bsc.detailLbl}>Pandits</Text>
        </View>
        <Text style={bsc.detailVal}>Pt. Acharya Vivek</Text>
      </View>
    </View>

    <View style={bsc.addrRow}>
      <Text style={bsc.addrIcon}>📍</Text>
      <View style={bsc.addrBlock}>
        <Text style={bsc.addrTitle}>Address</Text>
        <Text style={bsc.addrTxt}>
          Flat 4B, Sunrise Apartments, Bandra West, Mumbai
        </Text>
      </View>
      <Text style={bsc.editIcon}>✏</Text>
    </View>
  </View>
);

const bsc = StyleSheet.create({
  card: {
    backgroundColor: PRIMARY,
    borderRadius: sc(16),
    padding: sc(16),
    gap: sc(12),
  },
  topRow: {flexDirection: 'row', alignItems: 'flex-start', gap: sc(12)},
  iconBox: {
    width: sc(52),
    height: sc(52),
    backgroundColor: PRIMARY_DK,
    borderRadius: sc(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {fontSize: sc(24)},
  topInfo: {flex: 1, gap: sc(4)},
  modeName: {
    fontWeight: '700',
    fontSize: sc(16),
    lineHeight: sc(24),
    color: WHITE,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  modeDesc: {fontSize: sc(12), lineHeight: sc(18), color: TEXT_ON_DK},
  divider: {height: 1, backgroundColor: 'rgba(255,255,255,0.3)'},
  detailGrid: {flexDirection: 'row', alignItems: 'center'},
  detailCell: {flex: 1, gap: sc(4), paddingVertical: sc(2)},
  detailLblRow: {flexDirection: 'row', alignItems: 'center', gap: sc(4)},
  detailIcon: {fontSize: sc(12), color: TEXT_ON_DK2},
  detailLbl: {fontSize: sc(10), color: TEXT_ON_DK2, lineHeight: sc(12)},
  detailVal: {
    fontWeight: '500',
    fontSize: sc(16),
    lineHeight: sc(24),
    color: WHITE,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  vertDivider: {
    width: 1,
    height: sc(50),
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: sc(12),
  },
  addrRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: sc(8),
    backgroundColor: 'rgba(249,249,249,0.14)',
    borderRadius: sc(16),
    padding: sc(12),
  },
  addrIcon: {fontSize: sc(18), color: WHITE, marginTop: sc(2)},
  addrBlock: {flex: 1, gap: sc(4)},
  addrTitle: {
    fontWeight: '700',
    fontSize: sc(12),
    color: WHITE,
    lineHeight: sc(18),
  },
  addrTxt: {fontSize: sc(10), color: TEXT_ON_DK, lineHeight: sc(12)},
  editIcon: {
    fontSize: sc(12),
    color: 'rgba(255,255,255,0.5)',
    marginTop: sc(2),
  },
});

interface PayMethod {
  id: string;
  image: any;
  title: string;
  subtitle: string;
}

const PaymentRow: React.FC<{
  method: PayMethod;
  selected: boolean;
  onSelect: () => void;
}> = ({method, selected, onSelect}) => (
  <TouchableOpacity
    style={[prow.row, selected && prow.rowActive]}
    onPress={onSelect}
    activeOpacity={0.8}>
    <View style={[prow.iconCircle, selected && prow.iconCircleActive]}>
      <Image source={method.image} style={prow.payIcon} resizeMode="contain" />
    </View>

    <View style={prow.textBlock}>
      <Text style={prow.title}>{method.title}</Text>
      <Text style={prow.subtitle}>{method.subtitle}</Text>
    </View>

    <View style={[prow.radio, selected && prow.radioActive]}>
      {selected && (
        <View style={prow.radioCheck}>
          <Text style={prow.radioCheckTxt}>✓</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const prow = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sc(16),
    backgroundColor: WHITE,
    borderRadius: sc(12),
    padding: sc(16),
    borderWidth: 1,
    borderColor: BORDER2,
  },

  rowActive: {
    backgroundColor: '#F5F8FF',
    borderColor: PRIMARY,
  },

  iconCircle: {
    width: sc(48),
    height: sc(48),
    borderRadius: sc(24),
    backgroundColor: '#F6F8FA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconCircleActive: {
    backgroundColor: WHITE,
  },

  payIcon: {
    width: sc(28),
    height: sc(28),
  },

  textBlock: {
    flex: 1,
    gap: sc(4),
  },

  title: {
    fontWeight: '700',
    fontSize: sc(16),
    lineHeight: sc(24),
    color: '#0D121C',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },

  subtitle: {
    fontSize: sc(14),
    lineHeight: sc(22),
    color: '#818898',
  },

  radio: {
    width: sc(20),
    height: sc(20),
    borderRadius: sc(10),
    borderWidth: 1,
    borderColor: '#9AA4B2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },

  radioCheck: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioCheckTxt: {
    color: WHITE,
    fontSize: sc(12),
    fontWeight: '700',
  },
});

const AddCardRow: React.FC = () => (
  <View style={acr.row}>
    <View style={acr.iconCircle}>
      <Image
        source={cardIcon}
        style={acr.cardImg}
        resizeMode="contain"
      />
    </View>

    <Text style={acr.title}>Add Card</Text>

    <Text style={acr.chevron}>›</Text>
  </View>
);

const acr = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sc(16),
    backgroundColor: WHITE,
    borderRadius: sc(12),
    padding: sc(16),
    borderWidth: 1,
    borderColor: BORDER2,
  },

  iconCircle: {
    width: sc(48),
    height: sc(48),
    borderRadius: sc(24),
    backgroundColor: '#F6F8FA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardImg: {
    width: sc(24),
    height: sc(24),
  },

  title: {
    flex: 1,
    fontWeight: '600',
    fontSize: sc(16),
    lineHeight: sc(25),
    color: '#0D121C',
    letterSpacing: -0.02 * sc(16),
  },

  chevron: {
    fontSize: sc(22),
    color: '#818898',
  },
});

const SectionLabel: React.FC<{
  label: string;
  image: any;
}> = ({label, image}) => (
  <View style={sl.wrap}>
    <Image source={image} style={sl.iconImg} resizeMode="contain" />
    <Text style={sl.lbl}>{label}</Text>
  </View>
);

const sl = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sc(8),
  },

  iconImg: {
    width: sc(20),
    height: sc(20),
  },

  lbl: {
    fontWeight: '500',
    fontSize: sc(16),
    lineHeight: sc(24),
    color: TEXT_PRI,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
});

const PricingCard: React.FC = () => {
  const rows = [
    {label: 'Satyanarayan Katha Puja', value: '₹899', isDate: false},
    {label: 'Puja kit', value: '₹599', isDate: false},
    {label: 'Pandit Fee', value: '₹400', isDate: false},
    {label: 'Platform Fee', value: '₹500', isDate: false},
    {label: 'Date', value: 'Mar 15, 2026', isDate: true},
    {label: 'Time', value: '09:00 AM', isDate: true},
  ];

  return (
    <View style={prc.card}>
      <View style={prc.header}>
        <Text style={prc.headerTitle}>Pricing Breakdown</Text>
      </View>

      <View style={prc.body}>
        {rows.map((row, i) => (
          <View key={i} style={[prc.row, i < rows.length - 1 && prc.rowBorder]}>
            <Text style={[prc.lbl, row.isDate && prc.lblDate]}>
              {row.label}
            </Text>
            <Text style={[prc.val, row.isDate && prc.valDate]}>
              {row.value}
            </Text>
          </View>
        ))}

        <View style={prc.hr} />

        <View style={prc.totalRow}>
          <Text style={prc.totalLbl}>Total</Text>
          <Text style={prc.totalVal}>₹1,599</Text>
        </View>

        <View style={prc.discountBox}>
          <Text style={prc.discountTitle}>Bundle Discount Applied: -₹300</Text>
          <Text style={prc.youPay}>You Pay: ₹1,200</Text>
        </View>

        <View style={prc.trustRow}>
          <View style={prc.trustItem}>
            <Text style={prc.trustIcon}>✓</Text>
            <Text style={prc.trustTxt}>100% Verified Pandit</Text>
          </View>
          <View style={prc.trustItem}>
            <Text style={prc.trustIcon}>📹</Text>
            <Text style={prc.trustTxt}>Sankalp Video Proof</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const prc = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: BORDER,
    borderRadius: sc(16),
    overflow: 'hidden',
  },
  header: {
    backgroundColor: PRIMARY,
    paddingHorizontal: sc(20),
    paddingVertical: sc(20),
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: sc(20),
    lineHeight: sc(28),
    color: WHITE,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  body: {padding: sc(20), gap: sc(16)},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: sc(10),
  },
  rowBorder: {borderBottomWidth: 0.5, borderBottomColor: BORDER},
  lbl: {fontSize: sc(14), lineHeight: sc(22), color: TEXT_GREY},
  lblDate: {color: SPICY_PINK},
  val: {
    fontWeight: '700',
    fontSize: sc(14),
    lineHeight: sc(22),
    color: '#1A1A1A',
  },
  valDate: {color: TEXT_DEEP},
  hr: {height: 1, backgroundColor: '#E8E3E3'},
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  totalLbl: {
    fontWeight: '700',
    fontSize: sc(18),
    lineHeight: sc(28),
    color: '#1A1A1A',
  },
  totalVal: {
    fontWeight: '700',
    fontSize: sc(18),
    lineHeight: sc(28),
    color: MAROON,
  },
  discountBox: {
    backgroundColor: 'rgba(221,171,44,0.1)',
    borderRadius: sc(8),
    padding: sc(12),
    gap: sc(4),
    alignItems: 'center',
  },
  discountTitle: {
    fontWeight: '600',
    fontSize: sc(14),
    lineHeight: sc(20),
    color: GOLD2,
    textAlign: 'center',
  },
  youPay: {
    fontWeight: '700',
    fontSize: sc(18),
    lineHeight: sc(28),
    color: MAROON,
    textAlign: 'center',
  },
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: sc(6),
  },
  trustItem: {flexDirection: 'row', alignItems: 'center', gap: sc(4)},
  trustIcon: {fontSize: sc(12), color: GOLD2},
  trustTxt: {fontSize: sc(12), lineHeight: sc(16), color: TEXT_GREY},
});

const UPI_METHODS: PayMethod[] = [
  {
    id: 'paypal',
    image: paypalIcon,
    title: 'PayPal',
    subtitle: '91 23456****',
  },

  {
    id: 'apple',
    image: applePayIcon,
    title: 'Apple Pay',
    subtitle: '91 23456****',
  },

  {
    id: 'gpay',
    image: googlePayIcon,
    title: 'Google Pay',
    subtitle: '91 23456****',
  },
];

export const PaymentScreen: React.FC<{navigation?: any}> = ({navigation}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('paypal');
  const insets = useSafeAreaInsets();

  return (
    <View style={s.container}>
      <Header onBack={() => navigation?.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}>
        <BookingSummaryCard />

        <Text style={s.sectionTitle}>Payment Method</Text>

        <SectionLabel label="UPI" image={upiIcon} />
        <View style={s.methodDivider} />

        <View style={s.methodsGroup}>
          {UPI_METHODS.map(m => (
            <PaymentRow
              key={m.id}
              method={m}
              selected={selectedMethod === m.id}
              onSelect={() => setSelectedMethod(m.id)}
            />
          ))}
        </View>

        <View style={s.methodDivider} />

        <SectionLabel label="Card" image={upiIcon} />
        <View style={s.methodDivider} />
        <AddCardRow />
        <View style={s.methodDivider} />

        <PricingCard />
      </ScrollView>

      <View style={[s.footer, {paddingBottom: insets.bottom + sc(8)}]}>
        <TouchableOpacity
          style={s.cta}
          onPress={() => navigation?.popToTop?.()}
          activeOpacity={0.88}>
          <Text style={s.ctaTxt}>Pay Now ₹2100</Text>
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
    gap: sc(16),
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: sc(20),
    lineHeight: sc(28),
    color: TEXT_PRI,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  methodDivider: {height: 1, backgroundColor: BORDER},
  methodsGroup: {gap: sc(12)},
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
  ctaTxt: {
    color: '#FFFAF0',
    fontWeight: '500',
    fontSize: sc(16),
    letterSpacing: 0.15,
  },
});

export default PaymentScreen;
