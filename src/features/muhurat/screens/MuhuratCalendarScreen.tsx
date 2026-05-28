import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import {MapPin} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Bell, Heart, ShoppingCart} from 'lucide-react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CONTENT_PADDING = 20;
const CARD_WIDTH = SCREEN_WIDTH - CONTENT_PADDING * 2;

const CALENDAR_ROWS: (string | null)[][] = [
  [null, null, null, '1', '2', '3', '4'],
  ['5', '6', '7', '8', '9', '10', '11'],
  ['12', '13', '14', '15', '16', '17', '18'],
  ['19', '20', '21', '22', '23', '24', '25'],
  ['26', '27', '28', '29', '30', '1', '2'],
];

const AUSPICIOUS_DAYS = ['12', '16', '26'];
const FESTIVAL_DAYS = ['15', '22'];
const PITRA_DAYS = ['7', '30'];
const NEXT_MONTH_DAYS = ['1', '2'];

const TIMINGS = [
  {
    id: '1',
    time: '5:40 AM -7:30 AM',
    name: 'Braham Muhurat',
    icon: require('../../../../assets/HomeScreen/Mhuraticons/sun.png'),
  },
  {
    id: '2',
    time: '9:00 AM -10:30 AM',
    name: 'Abhijit Muhurat',
    icon: require('../../../../assets/HomeScreen/Mhuraticons/negles.png'),
  },
  {
    id: '3',
    time: '12:00 AM -1:00 AM',
    name: 'Rahu Kalam',
    icon: require('../../../../assets/HomeScreen/Mhuraticons/time.png'),
  },
];

const UPCOMING = [
  {
    id: '1',
    day: '11',
    weekday: 'Mon',
    color: '#C0E1D2',
    desc: 'Auspicious for new\nbeginnings',
    nakshatra: 'Rohini',
  },
  {
    id: '2',
    day: '16',
    weekday: 'Thu',
    color: '#FFD6A6',
    desc: 'Guru Pushya Nakshatra',
    nakshatra: 'Pushya',
  },
];

const SMART_RECS = [
  {
    id: '1',
    title: 'Griha Pravesh',
    desc: 'Best Upcoming muhurat for housewarning',
    date: 'May12, 6-8 Am',
    rating: 4.9,
    image: require('../../../../assets/HomeScreen/Puja/pooja5.png'),
  },
  {
    id: '2',
    title: 'Business Launch',
    desc: 'Highly auspicious for prosperity & growth',
    date: 'May12, 6-8 Am',
    rating: 4.9,
    image: require('../../../../assets/HomeScreen/Puja/pooja6.png'),
  },
  {
    id: '3',
    title: 'Marriage Rituals',
    desc: 'Shukra Pushya Yoga ideal for unions',
    date: 'May12, 6-8 Am',
    rating: 4.9,
    image: require('../../../../assets/HomeScreen/Puja/pooja8.png'),
  },
];

const REC_PUJAS = [
  {
    id: '1',
    title: 'Satyanarayan Katha',
    duration: '2-3 hours',
    pandits: '12 pandits',
    price: '₹2,100',
    orig: '₹2,100',
    rating: 4.9,
    count: 234,
    image: require('../../../../assets/HomeScreen/Puja/pooja6.png'),
  },
  {
    id: '2',
    title: 'Griha Pravesh Puja',
    duration: '2-3 hours',
    pandits: '12 pandits',
    price: '₹2,100',
    orig: '₹2,100',
    rating: 4.9,
    count: 234,
    image: require('../../../../assets/HomeScreen/Puja/pooja5.png'),
  },
  {
    id: '3',
    title: 'Navratri Puja',
    duration: '2-3 hours',
    pandits: '12 pandits',
    price: '₹2,100',
    orig: '₹2,100',
    rating: 4.9,
    count: 234,
    image: require('../../../../assets/HomeScreen/Puja/pooja8.png'),
  },
];

const TEMPLES = [
  {
    id: '1',
    name: 'Tirupati Balaji',
    sub: 'Abhishekam &\nVIP Darshan',
    loc: 'Andhra Pradesh',
    rating: 4.9,
    count: 234,
    image: require('../../../../assets/HomeScreen/temples/tm3.jpg'),
  },
  {
    id: '2',
    name: 'Kashi Vishwanath',
    sub: 'Rudrabhishek &\nGanga Aarti',
    loc: 'Varanasi, UP',
    rating: 4.9,
    count: 234,
    image: require('../../../../assets/HomeScreen/temples/tm2.jpg'),
  },
  {
    id: '3',
    name: 'Meenakshi Temple',
    sub: 'Archana &\nSpecial Darshan',
    loc: 'Madurai, TN',
    rating: 4.9,
    count: 234,
    image: require('../../../../assets/HomeScreen/temples/tm1.jpg'),
  },
];

const SectionRow: React.FC<{title: string; onViewAll?: () => void}> = ({
  title,
  onViewAll,
}) => (
  <View style={styles.sectionRow}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {onViewAll && (
      <TouchableOpacity
        style={styles.viewAllRow}
        onPress={onViewAll}
        activeOpacity={0.7}>
        <Text style={styles.viewAllText}>View All</Text>
        <Text style={styles.viewAllChevron}>›</Text>
      </TouchableOpacity>
    )}
  </View>
);

const getDotColor = (day: string): string | null => {
  if (AUSPICIOUS_DAYS.includes(day)) return '#34C759';
  if (FESTIVAL_DAYS.includes(day)) return '#FF8D28';
  if (PITRA_DAYS.includes(day)) return '#6155F5';
  return null;
};

const CalDay: React.FC<{
  day: string | null;
  isSelected: boolean;
  isNextMonth: boolean;
  onPress: (day: string) => void;
}> = ({day, isSelected, isNextMonth, onPress}) => {
  if (!day) return <View style={styles.calCell} />;
  const dotColor = getDotColor(day);

  return (
    <TouchableOpacity
      style={[styles.calCell, isSelected && styles.calCellSelected]}
      onPress={() => onPress(day)}
      activeOpacity={0.7}>
      <Text
        style={[
          styles.calDayText,
          isSelected && styles.calDayTextSelected,
          isNextMonth && styles.calDayTextNextMonth,
        ]}>
        {day}
      </Text>
      {dotColor && !isSelected && (
        <View style={[styles.calDot, {backgroundColor: dotColor}]} />
      )}
    </TouchableOpacity>
  );
};

export const MuhuratCalendarScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState<string>('11');
  const [month, setMonth] = useState('May');
  const [year, setYear] = useState(2026);

  return (
    <ScrollView
      style={[styles.screen, {paddingTop: insets.top}]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Text style={styles.screenTitle}>Muhurat Calendar</Text>
          <View style={styles.locationRow}>
            <MapPin size={12} color={FIGMA_GRAY} />
            <Text style={styles.locationText}>Andhra Pradesh</Text>
            <Text style={styles.locationSep}>·</Text>
            <Text style={styles.tithiText}>Tithi: Panchami</Text>
          </View>
        </View>
        <View style={styles.topBarRight}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Bell size={20} color={FIGMA_PRIMARY} strokeWidth={1.64} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Heart size={20} color={FIGMA_PRIMARY} strokeWidth={1.64} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <ShoppingCart size={20} color={FIGMA_PRIMARY} strokeWidth={1.64} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.whiteCalCard}>
        <View style={styles.calNavRow}>
          <TouchableOpacity style={styles.calNavBtn} activeOpacity={0.7}>
            <Text style={styles.calNavArrow}>‹</Text>
          </TouchableOpacity>

          <View style={styles.calSelectors}>
            <View style={styles.calSelect}>
              <Text style={styles.calSelectText}>{month}</Text>
              <Text style={styles.calSelectChev}>⌄</Text>
            </View>
            <View style={styles.calSelect}>
              <Text style={styles.calSelectText}>{year}</Text>
              <Text style={styles.calSelectChev}>⌄</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.calNavBtn} activeOpacity={0.7}>
            <Text style={styles.calNavArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calDayHeaderRow}>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <Text key={d} style={styles.calDayHeader}>
              {d}
            </Text>
          ))}
        </View>

        {CALENDAR_ROWS.map((row, ri) => (
          <View key={ri} style={styles.calWeekRow}>
            {row.map((day, di) => (
              <CalDay
                key={`${ri}-${di}`}
                day={day}
                isSelected={day === selectedDay}
                isNextMonth={
                  ri === 4 &&
                  day !== null &&
                  NEXT_MONTH_DAYS.includes(day ?? '')
                }
                onPress={setSelectedDay}
              />
            ))}
          </View>
        ))}

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: '#34C759'}]} />
            <Text style={styles.legendLabel}>Auspicious</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: '#FF8D28'}]} />
            <Text style={styles.legendLabel}>Festival</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: '#6155F5'}]} />
            <Text style={styles.legendLabel}>Pitra</Text>
          </View>
        </View>
      </View>

      <View style={styles.darkCard}>
        <View style={styles.darkCardHeader}>
          <View style={styles.darkCardDateRow}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeNum}>{selectedDay}</Text>
              <Text style={styles.dateBadgeMon}>Mon</Text>
            </View>
            <View style={styles.darkCardTitleCol}>
              <Text style={styles.darkCardMonth}>May 2026</Text>
              <View style={styles.nakshatraPill}>
                <Text style={styles.nakshatraStar}>★</Text>
                <Text style={styles.nakshatraLabel}>Rohini Nakshatra</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.bookmarkBtn} activeOpacity={0.7}>
            <Image
              source={require('../../../../assets/HomeScreen/Mhuraticons/bookmark.png')}
              style={styles.bookmarkIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.darkDivider} />

        <Text style={styles.timingLabel}>Auspicious Timing Today</Text>

        {TIMINGS.map(t => (
          <View key={t.id} style={styles.timingSubCard}>
            <View style={styles.timingSubCardLeft}>
              <Text style={styles.timingSubTime}>{t.time}</Text>
              <Text style={styles.timingSubName}>{t.name}</Text>
            </View>
            <Image source={t.icon} style={styles.timingIcon} />
          </View>
        ))}

        <View style={styles.darkDivider} />

        <View style={styles.panchaGrid}>
          <View style={styles.panchaVertDivider} />

          <View style={styles.panchaLeft}>
            <View style={styles.panchaItem}>
              <Text style={styles.panchaLabel}>Tithi</Text>
              <Text style={styles.panchaValue}>Panchami</Text>
            </View>
            <View style={styles.panchaItem}>
              <Text style={styles.panchaLabel}>Rahu Kalam</Text>
              <Text style={styles.panchaValue}>7:30 - 9 AM</Text>
            </View>
          </View>

          <View style={styles.panchaRight}>
            <View style={styles.panchaItem}>
              <Text style={styles.panchaLabel}>Nakshatra</Text>
              <Text style={styles.panchaValue}>Rohini</Text>
            </View>
            <View style={styles.panchaItem}>
              <Text style={styles.panchaLabel}>Yoga</Text>
              <Text style={styles.panchaValue}>Shubha</Text>
            </View>
          </View>
        </View>

        <View style={styles.darkCardButtons}>
          <TouchableOpacity style={styles.bookPujaBtn} activeOpacity={0.85}>
            <Text style={styles.bookPujaText}>Book Puja</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panchaBtn} activeOpacity={0.85}>
            <Text style={styles.panchaBtnText}>Full Panchang</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {marginBottom: 12}]}>
          Upcoming Muhurats
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.upcomingRow}>
          {UPCOMING.map(u => (
            <TouchableOpacity
              key={u.id}
              style={styles.upcomingCard}
              activeOpacity={0.85}>
              <View style={styles.upcomingInner}>
                <View
                  style={[styles.upcomingBadge, {backgroundColor: u.color}]}>
                  <Text style={styles.upcomingBadgeNum}>{u.day}</Text>
                  <Text style={styles.upcomingBadgeDay}>{u.weekday}</Text>
                </View>

                <View style={styles.upcomingInfo}>
                  <Text style={styles.upcomingDesc}>{u.desc}</Text>
                  <Text style={styles.upcomingNakshatra}>{u.nakshatra}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <SectionRow title="Smart recommendation" onViewAll={() => {}} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hScroll}>
          {SMART_RECS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.smartCard}
              activeOpacity={0.85}>
              <Image
                source={item.image}
                style={styles.smartCardImage}
                resizeMode="cover"
              />
              <Text style={styles.smartCardTitle}>{item.title}</Text>
              <Text style={styles.smartCardDesc}>{item.desc}</Text>
              <View style={styles.smartDateRow}>
                <MapPin size={12} color={FIGMA_GRAY} />
                <Text style={styles.smartDateText}>{item.date}</Text>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingStar}>★</Text>
                <Text style={styles.ratingValue}>{item.rating}</Text>
                <Text style={styles.ratingCount}>(234)</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <SectionRow title="Recommended pujas" onViewAll={() => {}} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hScroll}>
          {REC_PUJAS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.pujaCard}
              activeOpacity={0.85}>
              <Image
                source={item.image}
                style={styles.pujaCardImage}
                resizeMode="cover"
              />
              <Text style={styles.pujaCardTitle}>{item.title}</Text>
              <View style={styles.pujaMeta}>
                <Text style={styles.pujaMetaText}>⏱ {item.duration}</Text>
                <Text style={styles.pujaMetaDot}>·</Text>
                <Text style={styles.pujaMetaText}>👤 {item.pandits}</Text>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingStar}>★</Text>
                <Text style={styles.ratingValue}>{item.rating}</Text>
                <Text style={styles.ratingCount}>({item.count})</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceMain}>{item.price}</Text>
                <Text style={styles.priceOrig}>{item.orig}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.section, {marginBottom: 32}]}>
        <SectionRow title="Temples Events" onViewAll={() => {}} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hScroll}>
          {TEMPLES.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.templeCard}
              activeOpacity={0.85}>
              <Image
                source={item.image}
                style={styles.templeCardImage}
                resizeMode="cover"
              />
              <Text style={styles.templeCardTitle}>{item.name}</Text>
              <Text style={styles.templeCardSub}>{item.sub}</Text>
              <View style={styles.templeLoc}>
                <MapPin size={12} color={FIGMA_GRAY} />
                <Text style={styles.templeLocText}>{item.loc}</Text>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingStar}>★</Text>
                <Text style={styles.ratingValue}>{item.rating}</Text>
                <Text style={styles.ratingCount}>({item.count})</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const FIGMA_PRIMARY = '#2B000A';
const FIGMA_GOLD = '#F3B416';
const FIGMA_GOLD_DARK = '#DDAB2C';
const FIGMA_CARD_BG = '#2B000A';
const FIGMA_TIMING_BG = '#540B1C';
const FIGMA_GONDOLA = '#281518';
const FIGMA_GRAY = '#757575';
const FIGMA_BORDER = '#D9D9D9';

const CAL_CELL_SIZE = Math.floor(
  (SCREEN_WIDTH - CONTENT_PADDING * 2 - 32 - 6 * 6.5) / 7,
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: CONTENT_PADDING,
    paddingTop: 16,
    paddingBottom: 12,
  },
  topBarLeft: {
    flex: 1,
    gap: 4,
  },
  screenTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: FIGMA_PRIMARY,
    letterSpacing: -0.2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  locationPin: {
    fontSize: 10,
    lineHeight: 12,
  },
  locationText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '400',
    color: FIGMA_PRIMARY,
  },
  locationSep: {
    fontSize: 10,
    color: FIGMA_GRAY,
    marginHorizontal: 2,
  },
  tithiText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '400',
    color: FIGMA_GRAY,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 4,
  },

  iconBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  whiteCalCard: {
    marginHorizontal: CONTENT_PADDING,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: FIGMA_BORDER,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.06,
        shadowRadius: 20,
      },
    }),
  },

  calNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  calNavBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calNavArrow: {
    fontSize: 22,
    fontWeight: '400',
    color: '#1E1E1E',
    lineHeight: 28,
  },
  calSelectors: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  calSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: FIGMA_BORDER,
    borderRadius: 8,
    gap: 8,
    minWidth: 90,
  },
  calSelectText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 14,
    fontWeight: '400',
    color: '#1E1E1E',
    flex: 1,
  },
  calSelectChev: {
    fontSize: 12,
    color: '#1E1E1E',
    fontWeight: '600',
  },

  calDayHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
  calDayHeader: {
    width: CAL_CELL_SIZE,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Geist' : 'monospace',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '400',
    color: FIGMA_GRAY,
  },

  calWeekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 2,
  },

  calCell: {
    width: CAL_CELL_SIZE,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calCellSelected: {
    backgroundColor: FIGMA_PRIMARY,
  },
  calDayText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    color: '#1E1E1E',
    textAlign: 'center',
  },
  calDayTextSelected: {
    color: '#F5F5F5',
  },
  calDayTextNextMonth: {
    color: '#B3B3B3',
  },
  calDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 1,
  },

  legend: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 10,
    paddingRight: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '700',
    color: '#000000',
  },

  darkCard: {
    marginHorizontal: CONTENT_PADDING,
    backgroundColor: FIGMA_CARD_BG,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  darkCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  darkCardDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  dateBadge: {
    width: 46,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBadgeNum: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    color: '#000000',
    textAlign: 'center',
  },
  dateBadgeMon: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },

  darkCardTitleCol: {
    gap: 4,
  },
  darkCardMonth: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    color: '#FFFFFF',
  },

  nakshatraPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(221, 171, 44, 0.2)',
    borderRadius: 30,
    gap: 4,
    alignSelf: 'flex-start',
  },
  nakshatraStar: {
    fontSize: 10,
    color: FIGMA_GOLD_DARK,
    lineHeight: 12,
  },
  nakshatraLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
    color: FIGMA_GOLD_DARK,
  },

  bookmarkBtn: {
    width: 36,
    height: 36,
    backgroundColor: FIGMA_TIMING_BG,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  darkDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 12,
  },

  timingLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: '#FFFFFF',
    marginBottom: 8,
  },

  timingSubCard: {
    backgroundColor: FIGMA_TIMING_BG,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timingSubCardLeft: {
    gap: 4,
  },
  timingSubTime: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 17,
    color: '#FFFFFF',
  },
  timingSubName: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato_400Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  bookmarkIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#FFFFFF', // optional if white icon needed
  },

  timingIcon: {
    width: 68,
    height: 68,
    resizeMode: 'contain',
  },

  panchaGrid: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 12,
  },
  panchaVertDivider: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  panchaLeft: {
    flex: 1,
    gap: 16,
  },
  panchaRight: {
    flex: 1,
    paddingLeft: 120,
    gap: 16,
  },
  panchaItem: {
    gap: 4,
  },
  panchaLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  panchaValue: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato_500Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#FFFFFF',
  },

  darkCardButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  bookPujaBtn: {
    flex: 1,
    height: 40,
    backgroundColor: FIGMA_GOLD,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookPujaText: {
    fontFamily: Platform.OS === 'ios' ? 'Roboto-Medium' : 'Roboto_500Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#FFFAF0',
    letterSpacing: 0.15,
  },
  panchaBtn: {
    flex: 1,
    height: 41,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panchaBtnText: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato_500Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    color: '#FFFFFF',
  },

  section: {
    paddingHorizontal: CONTENT_PADDING,
    marginBottom: 20,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    color: '#000000',
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato_500Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    color: FIGMA_PRIMARY,
  },
  viewAllChevron: {
    fontSize: 18,
    color: FIGMA_PRIMARY,
    lineHeight: 20,
  },

  upcomingRow: {
    flexDirection: 'row',
    gap: 12,
  },
  upcomingCard: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: FIGMA_BORDER,
    padding: 12,
    minHeight: 76,
    justifyContent: 'center',
  },
  upcomingInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  upcomingBadge: {
    width: 46,
    height: 46,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.06,
        shadowRadius: 20,
      },
      android: {elevation: 2},
    }),
  },
  upcomingBadgeNum: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    color: '#000000',
    textAlign: 'center',
  },
  upcomingBadgeDay: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    color: '#000000',
    textAlign: 'center',
  },
  upcomingInfo: {
    flex: 1,
    gap: 4,
  },
  upcomingDesc: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: FIGMA_GONDOLA,
  },
  upcomingNakshatra: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    color: FIGMA_GRAY,
  },

  hScroll: {
    marginHorizontal: -CONTENT_PADDING,
    paddingHorizontal: CONTENT_PADDING,
  },

  smartCard: {
    width: 130,
    marginRight: 12,
    gap: 4,
  },
  smartCardImage: {
    width: 130,
    height: 160,
    backgroundColor: '#727272',
    borderRadius: 16,
    marginBottom: 4,
  },
  smartCardTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    color: FIGMA_GONDOLA,
  },
  smartCardDesc: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: '#000000',
  },
  smartDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#EBFFD8',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  smartDatePin: {
    fontSize: 9,
    color: '#005501',
  },
  smartDateText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
    color: '#005501',
  },

  pujaCard: {
    width: 130,
    marginRight: 12,
    gap: 4,
  },
  pujaCardImage: {
    width: 130,
    height: 160,
    backgroundColor: '#727272',
    borderRadius: 16,
    marginBottom: 4,
  },
  pujaCardTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    color: FIGMA_GONDOLA,
  },
  pujaMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  pujaMetaText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    color: FIGMA_GRAY,
  },
  pujaMetaDot: {
    fontSize: 10,
    color: FIGMA_GRAY,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  priceMain: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: FIGMA_GONDOLA,
  },
  priceOrig: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    color: FIGMA_GRAY,
    textDecorationLine: 'line-through',
  },

  templeCard: {
    width: 130,
    marginRight: 12,
    gap: 4,
  },
  templeCardImage: {
    width: 130,
    height: 160,
    backgroundColor: '#727272',
    borderRadius: 16,
    marginBottom: 4,
  },
  templeCardTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    color: FIGMA_GONDOLA,
  },
  templeCardSub: {
    fontFamily: Platform.OS === 'ios' ? 'Lato' : 'Lato_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: '#000000',
  },
  templeLoc: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  templeLocPin: {
    fontSize: 9,
    color: FIGMA_GRAY,
  },
  templeLocText: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    color: FIGMA_GRAY,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingStar: {
    fontSize: 12,
    color: '#F3B416',
    lineHeight: 16,
  },
  ratingValue: {
    fontFamily: Platform.OS === 'ios' ? 'Lato-Bold' : 'Lato_700Bold',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: FIGMA_GONDOLA,
  },
  ratingCount: {
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter_400Regular',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    color: '#666666',
  },
});
