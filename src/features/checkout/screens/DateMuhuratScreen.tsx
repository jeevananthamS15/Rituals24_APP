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

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BASE_WIDTH = 393;
const s = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

const PRIMARY = '#2B000A';
const PRIMARY_DARK = '#540B1C';
const GOLD = '#F3B416';
const GOLD2 = '#DDAB2C';
const WHITE = '#FFFFFF';
const SURFACE = '#F9F9F9';
const BORDER = '#D9D9D9';
const TEXT_PRIMARY = '#000000';
const TEXT_SECONDARY = '#757575';
const TEXT_ON_DARK = 'rgba(255,255,255,0.75)';
const TEXT_ON_DARK_STRONG = '#FFFFFF';
const DOT_GREEN = '#34C759';
const DOT_ORANGE = '#FF8D28';
const DOT_PURPLE = '#6155F5';

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const MAY_2026_ROWS: (number | null)[][] = [
  [null, null, null, null, null, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
  [31, null, null, null, null, null, null],
];

const DAY_DOTS: Record<number, string> = {
  6: DOT_PURPLE,
  12: DOT_GREEN,
  15: DOT_ORANGE,
  16: DOT_GREEN,
  24: DOT_ORANGE,
  25: DOT_GREEN,
  26: DOT_GREEN,
  30: DOT_PURPLE,
};

const TIME_SLOTS = [
  {id: '1', time: '6:00 AM', label: 'Early Morning'},
  {id: '2', time: '8:00 AM', label: 'Early Morning'},
  {id: '3', time: '10:00 AM', label: 'Early Morning'},
  {id: '4', time: '11:45 AM', label: 'Noon Muhurat'},
  {id: '5', time: '4:00 PM', label: 'Early Morning'},
  {id: '6', time: '6:00 PM', label: 'Early Morning'},
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
      const isDone = index + 1 < currentStep;
      const isActive = index + 1 === currentStep;

      return (
        <View
          key={`step-${index}`}
          style={[
            pb.line,
            isDone ? pb.done : isActive ? pb.active : pb.inactive,
          ]}
        />
      );
    })}
  </View>
);

const pb = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(14),
    gap: s(10),
    width: '100%',
  },

  line: {
    flex: 1,
    height: s(4),
    borderRadius: 100,
  },

  active: {
    backgroundColor: GOLD,
  },

  done: {
    backgroundColor: GOLD2,
  },

  inactive: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
});

const Header = ({onBack, title}: {onBack: () => void; title: string}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        hdr.container,
        {
          paddingTop: insets.top + s(8),
        },
      ]}>
      <TouchableOpacity
        style={hdr.backBtn}
        onPress={onBack}
        activeOpacity={0.8}>
        <View style={hdr.circle}>
          <View style={hdr.chevron} />
        </View>
      </TouchableOpacity>

      <View style={hdr.titleBlock}>
        <Text style={hdr.title}>{title}</Text>

        <Text style={hdr.step}>
          Step <Text style={hdr.stepBold}>2 / 5</Text> :{' '}
          <Text style={hdr.stepBold}>Service mode</Text>
        </Text>

        <ProgressBar currentStep={2} />
      </View>
    </View>
  );
};

const hdr = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY,
    borderBottomLeftRadius: s(16),
    borderBottomRightRadius: s(16),
    paddingHorizontal: s(20),
    paddingBottom: s(20),
  },

  backBtn: {
    position: 'absolute',
    left: s(20),
    bottom: s(46),
  },

  circle: {
    width: s(32),
    height: s(32),
    borderRadius: s(16),
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chevron: {
    width: s(8),
    height: s(8),
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: PRIMARY,
    transform: [{rotate: '45deg'}, {translateX: s(2)}],
  },

  titleBlock: {
    marginLeft: s(48),
    marginTop: s(6),
    paddingRight: s(8),
  },

  title: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato',
    fontWeight: '700',
    fontSize: s(28),
    lineHeight: s(36),
    color: WHITE,
  },

  step: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    fontSize: s(10),
    lineHeight: s(12),
    color: WHITE,
    marginTop: s(2),
  },

  stepBold: {
    fontWeight: '700',
  },
});

const BookingSummaryBar: React.FC = () => (
  <View style={bsb.container}>
    <View style={bsb.cell}>
      <Text style={bsb.label}>Mode:</Text>
      <Text style={bsb.value}>Home Visit</Text>
    </View>
    <View style={bsb.divider} />
    <View style={bsb.cellCenter}>
      <Text style={bsb.label}>Date &amp; Time:</Text>
    </View>
    <View style={bsb.divider} />
    <View style={bsb.cell}>
      <Text style={bsb.label}>Pandits</Text>
    </View>
  </View>
);

const bsb = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: s(12),
    paddingVertical: s(8),
    paddingHorizontal: s(16),
    marginHorizontal: s(20),
    marginTop: s(12),
    marginBottom: s(4),
  },
  cell: {flex: 1, alignItems: 'center', gap: s(4)},
  cellCenter: {flex: 1, alignItems: 'center'},
  label: {
    fontSize: s(10),
    color: TEXT_PRIMARY,
    lineHeight: s(12),
    fontFamily: 'Inter',
  },
  value: {
    fontSize: s(10),
    fontWeight: '700',
    color: TEXT_PRIMARY,
    lineHeight: s(12),
    fontFamily: 'Inter',
  },
  divider: {
    width: 1,
    height: s(28),
    backgroundColor: BORDER,
    marginHorizontal: s(4),
  },
});

const CalendarWidget: React.FC<{
  selectedDay: number | null;
  onSelectDay: (day: number) => void;
}> = ({selectedDay, onSelectDay}) => (
  <View style={cal.card}>
    <View style={cal.navRow}>
      <TouchableOpacity style={cal.navBtn} activeOpacity={0.7}>
        <View style={cal.chevronLeft} />
      </TouchableOpacity>
      <View style={cal.selects}>
        <View style={cal.selectBox}>
          <Text style={cal.selectText}>May</Text>
          <View style={cal.chevronDownSmall} />
        </View>
        <View style={cal.selectBox}>
          <Text style={cal.selectText}>2026</Text>
          <View style={cal.chevronDownSmall} />
        </View>
      </View>
      <TouchableOpacity style={cal.navBtn} activeOpacity={0.7}>
        <View style={cal.chevronRight} />
      </TouchableOpacity>
    </View>

    {/* Weekday headers */}
    <View style={cal.weekRow}>
      {WEEK_DAYS.map(d => (
        <Text key={d} style={cal.weekDay}>
          {d}
        </Text>
      ))}
    </View>

    {/* Day grid */}
    {MAY_2026_ROWS.map((row, ri) => (
      <View key={ri} style={cal.dayRow}>
        {row.map((day, di) => {
          const isSelected = day === selectedDay;
          const dotColor = day ? DAY_DOTS[day] : undefined;
          const isEmpty = day === null;
          return (
            <TouchableOpacity
              key={di}
              style={[cal.dayCell, isSelected && cal.dayCellSelected]}
              onPress={() => day && onSelectDay(day)}
              disabled={isEmpty}
              activeOpacity={0.7}>
              <Text
                style={[
                  cal.dayText,
                  isEmpty && cal.dayTextEmpty,
                  isSelected && cal.dayTextSelected,
                ]}>
                {day ?? ''}
              </Text>
              {dotColor && !isSelected && (
                <View style={[cal.dot, {backgroundColor: dotColor}]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    ))}
  </View>
);

const cal = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: s(16),
    borderWidth: 1,
    borderColor: BORDER,
    padding: s(16),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s(16),
    gap: s(8),
  },
  navBtn: {
    width: s(36),
    height: s(36),
    borderRadius: s(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronLeft: {
    width: s(9),
    height: s(9),
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#1E1E1E',
    transform: [{rotate: '45deg'}],
  },
  chevronRight: {
    width: s(9),
    height: s(9),
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: '#1E1E1E',
    transform: [{rotate: '45deg'}],
  },
  selects: {
    flex: 1,
    flexDirection: 'row',
    gap: s(8),
  },
  selectBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: s(8),
    paddingHorizontal: s(6),
    paddingVertical: s(6),
    gap: s(4),
  },
  selectText: {
    flex: 1,
    fontSize: s(14),
    color: '#1E1E1E',
    lineHeight: s(16),
  },
  chevronDownSmall: {
    width: s(7),
    height: s(7),
    borderRightWidth: 1.6,
    borderBottomWidth: 1.6,
    borderColor: '#1E1E1E',
    transform: [{rotate: '45deg'}, {translateY: -s(2)}],
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: s(4),
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: s(12),
    color: TEXT_SECONDARY,
    lineHeight: s(20),
  },
  dayRow: {
    flexDirection: 'row',
    marginBottom: s(2),
  },
  dayCell: {
    flex: 1,
    height: s(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: s(8),
    gap: s(2),
  },
  dayCellSelected: {
    backgroundColor: PRIMARY,
    borderRadius: s(8),
  },
  dayText: {
    fontSize: s(15),
    color: '#1E1E1E',
    lineHeight: s(22),
    textAlign: 'center',
  },
  dayTextEmpty: {color: '#B3B3B3'},
  dayTextSelected: {color: '#F5F5F5'},
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});

const LegendRow: React.FC = () => (
  <View style={leg.row}>
    {[
      {color: DOT_GREEN, label: 'Auspicious'},
      {color: DOT_ORANGE, label: 'Festival'},
      {color: DOT_PURPLE, label: 'Pitra'},
    ].map(l => (
      <View key={l.label} style={leg.item}>
        <View style={[leg.dot, {backgroundColor: l.color}]} />
        <Text style={leg.text}>{l.label}</Text>
      </View>
    ))}
  </View>
);

const leg = StyleSheet.create({
  row: {flexDirection: 'row', gap: s(12), alignItems: 'center'},
  item: {flexDirection: 'row', alignItems: 'center', gap: s(4)},
  dot: {width: s(8), height: s(8), borderRadius: s(4)},
  text: {
    fontSize: s(10),
    fontWeight: '700',
    color: TEXT_PRIMARY,
    lineHeight: s(12),
  },
});

const AuspiciousBanner: React.FC = () => (
  <View style={ab.container}>
    <View style={ab.iconBox}>
      {/* Star-circle icon placeholder */}
      <Text style={ab.iconText}>✦</Text>
    </View>
    <View style={ab.textBlock}>
      <Text style={ab.title}>Auspicious for new beginnings</Text>
      <Text style={ab.sub}>Rohini · Panchami · Excellent</Text>
    </View>
  </View>
);

const ab = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(221,171,44,0.14)',
    borderRadius: s(16),
    padding: s(16),
    gap: s(10),
  },
  iconBox: {
    width: s(34),
    height: s(34),
    backgroundColor: GOLD2,
    borderRadius: s(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {fontSize: s(18), color: WHITE},
  textBlock: {gap: s(4)},
  title: {
    fontSize: s(12),
    fontWeight: '700',
    color: TEXT_PRIMARY,
    lineHeight: s(18),
  },
  sub: {
    fontSize: s(10),
    color: TEXT_SECONDARY,
    lineHeight: s(12),
  },
});

const MuhuratCard: React.FC<{day: number}> = ({day}) => (
  <View style={mc.container}>
    {/* Header row */}
    <View style={mc.headerRow}>
      <View style={mc.dateBox}>
        <Text style={mc.dateNum}>{day}</Text>
        <Text style={mc.dateMon}>Mon</Text>
      </View>
      <View style={mc.headerInfo}>
        <Text style={mc.monthYear}>May 2026</Text>
        <View style={mc.nakshatraBadge}>
          <Text style={mc.starIcon}>☆ </Text>
          <Text style={mc.nakshatraText}>Rohini Nakshatra</Text>
        </View>
      </View>
      <View style={mc.bookmarkBtn}>
        <Text style={mc.bookmarkIcon}>🔖</Text>
      </View>
    </View>

    <View style={mc.divider} />

    <Text style={mc.sectionLabel}>Auspicious Timing Today</Text>

    {[
      {time: '5:40 AM -7:30 AM', name: 'Braham Muhurat', icon: '☀️'},
      {time: '9:00 AM -10:30 AM', name: 'Abhijit Muhurat', icon: '📿'},
      {time: '12:00 AM -1:00 AM', name: 'Rahu Kalam', icon: '⏳'},
    ].map(row => (
      <View key={row.name} style={mc.timingRow}>
        <View style={mc.timingText}>
          <Text style={mc.timingTime}>{row.time}</Text>
          <Text style={mc.timingName}>{row.name}</Text>
        </View>
        <Text style={mc.timingIcon}>{row.icon}</Text>
      </View>
    ))}

    <View style={mc.divider} />

    <View style={mc.infoGrid}>
      <View style={mc.infoCell}>
        <Text style={mc.infoLabel}>Tithi</Text>
        <Text style={mc.infoValue}>Panchami</Text>
      </View>
      <View style={mc.infoCellDivider} />
      <View style={mc.infoCell}>
        <Text style={mc.infoLabel}>Nakshatra</Text>
        <Text style={mc.infoValue}>Rohini</Text>
      </View>
    </View>
    <View style={mc.infoGrid}>
      <View style={mc.infoCell}>
        <Text style={mc.infoLabel}>Rahu Kalam</Text>
        <Text style={mc.infoValue}>7:30 - 9 AM</Text>
      </View>
      <View style={mc.infoCellDivider} />
      <View style={mc.infoCell}>
        <Text style={mc.infoLabel}>Yoga</Text>
        <Text style={mc.infoValue}>Shubha</Text>
      </View>
    </View>
  </View>
);

const mc = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY,
    borderRadius: s(16),
    padding: s(16),
    gap: s(12),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  dateBox: {
    width: s(46),
    height: s(46),
    backgroundColor: WHITE,
    borderRadius: s(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateNum: {
    fontSize: s(14),
    fontWeight: '700',
    color: TEXT_PRIMARY,
    lineHeight: s(22),
    textAlign: 'center',
  },
  dateMon: {
    fontSize: s(10),
    color: TEXT_PRIMARY,
    lineHeight: s(12),
    textAlign: 'center',
  },
  headerInfo: {flex: 1, gap: s(4)},
  monthYear: {
    fontSize: s(14),
    fontWeight: '700',
    color: WHITE,
    lineHeight: s(22),
  },
  nakshatraBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(221,171,44,0.2)',
    borderRadius: s(30),
    paddingHorizontal: s(8),
    paddingVertical: s(4),
    alignSelf: 'flex-start',
  },
  starIcon: {fontSize: s(10), color: GOLD2},
  nakshatraText: {
    fontSize: s(10),
    fontWeight: '700',
    color: GOLD2,
    lineHeight: s(12),
  },
  bookmarkBtn: {
    width: s(36),
    height: s(36),
    backgroundColor: PRIMARY_DARK,
    borderRadius: s(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkIcon: {fontSize: s(16)},
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: s(2),
  },
  sectionLabel: {
    fontSize: s(12),
    fontWeight: '700',
    color: WHITE,
    lineHeight: s(18),
  },
  timingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY_DARK,
    borderRadius: s(12),
    padding: s(12),
    paddingRight: s(16),
  },
  timingText: {flex: 1, gap: s(4)},
  timingTime: {
    fontSize: s(14),
    fontWeight: '700',
    color: WHITE,
    lineHeight: s(17),
  },
  timingName: {
    fontSize: s(14),
    color: TEXT_ON_DARK,
    lineHeight: s(22),
  },
  timingIcon: {fontSize: s(36)},
  infoGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCell: {flex: 1, gap: s(4), paddingVertical: s(4)},
  infoCellDivider: {
    width: 1,
    height: s(40),
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: s(16),
  },
  infoLabel: {
    fontSize: s(10),
    color: 'rgba(255,255,255,0.8)',
    lineHeight: s(12),
  },
  infoValue: {
    fontSize: s(16),
    fontWeight: '500',
    color: WHITE,
    lineHeight: s(24),
  },
});

export const DateMuhuratScreen: React.FC<{
  navigation?: any;
  route?: any;
}> = ({navigation, route}) => {
  const {puja, pujaId, selectedMode} = route?.params || {};
  const [selectedDay, setSelectedDay] = useState<number | null>(11);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const insets = useSafeAreaInsets();
  console.log(puja);
  console.log(pujaId);
  console.log(selectedMode);
  const selectedSlotObj = TIME_SLOTS.find(t => t.id === selectedSlot);
  const selectedPuja = puja;
  return (
    <View style={styles.container}>
      <Header onBack={() => navigation?.goBack()} title={selectedPuja?.title} />
      <BookingSummaryBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <LegendRow />
        </View>

        <CalendarWidget
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />

        {selectedDay && <AuspiciousBanner />}

        <View>
          <Text style={styles.sectionTitle}>Available Time Slots</Text>
          <Text style={styles.slotSubtitle}>May 12, 26</Text>
        </View>

        <View style={styles.slotsGrid}>
          {TIME_SLOTS.map(slot => {
            const isActive = selectedSlot === slot.id;
            return (
              <TouchableOpacity
                key={slot.id}
                style={[styles.slotCard, isActive && styles.slotCardActive]}
                onPress={() => setSelectedSlot(slot.id)}
                activeOpacity={0.75}>
                <Text
                  style={[styles.slotTime, isActive && styles.slotTimeActive]}>
                  {slot.time}
                </Text>
                <Text
                  style={[
                    styles.slotLabel,
                    isActive && styles.slotLabelActive,
                  ]}>
                  {slot.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedDay && <MuhuratCard day={selectedDay} />}
      </ScrollView>

      <View style={[styles.footer, {paddingBottom: insets.bottom + s(8)}]}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerDate}>May {selectedDay ?? '--'}</Text>
          <Text style={styles.footerSub}>
            {selectedSlotObj ? selectedSlotObj.time : 'No time selected'}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.ctaBtn,
            (!selectedDay || !selectedSlot) && styles.ctaBtnDisabled,
          ]}
          onPress={() =>
            navigation?.navigate('PanditSelect', {
              puja: selectedPuja,
              pujaId,
              selectedMode,
              selectedDate: selectedDay,
              selectedTime: selectedSlotObj,
            })
          }
          disabled={!selectedDay || !selectedSlot}
          activeOpacity={0.88}>
          <Text style={styles.ctaText}>Continue Booking</Text>
          <Text style={styles.ctaArrow}> →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
  scroll: {
    paddingHorizontal: s(20),
    paddingTop: s(16),
    paddingBottom: s(32),
    gap: s(16),
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: s(20),
    fontWeight: '700',
    color: TEXT_PRIMARY,
    lineHeight: s(28),
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  slotSubtitle: {
    fontSize: s(10),
    fontWeight: '700',
    color: TEXT_SECONDARY,
    lineHeight: s(12),
    marginTop: s(4),
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: s(12),
  },
  slotCard: {
    flexBasis: `${(100 - 2 * (s(12) / s(1))) / 3}%`,
    flexGrow: 1,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: s(16),
    paddingVertical: s(8),
    paddingHorizontal: s(16),
    alignItems: 'center',
    minWidth: s(100),
  },
  slotCardActive: {
    borderColor: PRIMARY,
    backgroundColor: 'rgba(43,0,10,0.06)',
  },
  slotTime: {
    fontSize: s(14),
    fontWeight: '700',
    color: TEXT_PRIMARY,
    lineHeight: s(22),
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  slotTimeActive: {color: PRIMARY},
  slotLabel: {
    fontSize: s(10),
    color: TEXT_PRIMARY,
    lineHeight: s(12),
    textAlign: 'center',
  },
  slotLabelActive: {color: PRIMARY},
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingHorizontal: s(20),
    paddingTop: s(16),
    gap: s(12),
  },
  footerLeft: {flex: 1},
  footerDate: {
    fontSize: s(24),
    fontWeight: '700',
    color: '#281518',
    lineHeight: s(32),
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  footerSub: {
    fontSize: s(12),
    fontWeight: '700',
    color: TEXT_SECONDARY,
    lineHeight: s(18),
  },
  ctaBtn: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: PRIMARY,
    borderRadius: s(12),
    height: s(44),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaBtnDisabled: {opacity: 0.5},
  ctaText: {
    color: '#FFFAF0',
    fontWeight: '500',
    fontSize: s(16),
    lineHeight: s(24),
    letterSpacing: 0.15,
  },
  ctaArrow: {
    color: WHITE,
    fontSize: s(18),
    fontWeight: '500',
  },
});

export default DateMuhuratScreen;
