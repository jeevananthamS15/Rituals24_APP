import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Booking } from '../../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40; 

interface Props {
  booking: Booking & { message?: string; otp?: string };
}

const HomeIcon = () => (
  <View style={iconStyles.wrap}>
    <View style={iconStyles.homeRoof} />
    <View style={iconStyles.homeDoor} />
  </View>
);

const CalendarIcon = () => (
  <View style={iconStyles.wrap}>
    <View style={iconStyles.calBody} />
  </View>
);

const ClockIcon = () => (
  <View style={iconStyles.wrap}>
    <View style={iconStyles.clockCircle} />
  </View>
);

const UserIcon = () => (
  <View style={iconStyles.wrap}>
    <View style={iconStyles.userHead} />
    <View style={iconStyles.userBody} />
  </View>
);

const RescheduleIcon = () => (
  <View style={iconStyles.wrap}>
    <View style={iconStyles.rescheduleBox} />
  </View>
);

const HeadsetIcon = () => (
  <View style={iconStyles.wrap}>
    <View style={iconStyles.headsetArc} />
  </View>
);

const CheckIcon = ({ filled }: { filled?: boolean }) => (
  <View style={[iconStyles.checkCircle, filled && iconStyles.checkCircleFilled]}>
    {filled && <View style={iconStyles.checkMark} />}
  </View>
);

export const BookingCard: React.FC<Props> = ({ booking }) => {
  const isActive = booking.status === 'active';

  return (
    <View style={styles.card}>
      
      <Image
        source={{ uri: booking.imageUrl }}
        style={styles.heroImage}
        resizeMode="cover"
      />

      
      <View style={styles.titleRow}>
        <Text style={styles.pujaTitle}>{booking.pujaTitle}</Text>
        <Text style={styles.price}>₹{booking.price.toLocaleString('en-IN')}</Text>
      </View>

      {!isActive && booking.message ? (
        <View style={styles.messagePill}>
          <Text style={styles.messageText}>{booking.message}</Text>
        </View>
      ) : null}

      {isActive && booking.otp ? (
        <View style={styles.otpBar}>
          <Text style={styles.otpLabel}>OTP :</Text>
          {booking.otp.split('').map((digit, i) => (
            <View key={i} style={styles.otpBox}>
              <Text style={styles.otpDigit}>{digit}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {isActive && (
        <View style={styles.progressStrip}>
          {(['Confirmed', 'Assigned', 'En Route', 'In Progress'] as const).map(
            (label, i) => (
              <View key={label} style={styles.progStep}>
                <CheckIcon filled={i === 0} />
                <Text style={styles.progLabel}>{label}</Text>
              </View>
            ),
          )}
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.chipsWrap}>
        <View style={styles.chipsRow}>
          <Chip icon={<HomeIcon />} label="Home Visit" />
          <Chip icon={<CalendarIcon />} label={booking.date} />
          <Chip icon={<ClockIcon />} label={booking.time} />
        </View>
        <View style={styles.chipsRow}>
          <Chip icon={<UserIcon />} label={booking.panditName} />
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionHalf} activeOpacity={0.7}>
          <View style={styles.actionInner}>
            <RescheduleIcon />
            <Text style={styles.actionText}>Reschedule</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.actionDividerV} />
        <TouchableOpacity style={styles.actionHalf} activeOpacity={0.7}>
          <View style={styles.actionInner}>
            <HeadsetIcon />
            <Text style={styles.actionText}>Support</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Chip: React.FC<{ icon: React.ReactNode; label: string }> = ({
  icon,
  label,
}) => (
  <View style={chipStyles.chip}>
    {icon}
    <Text style={chipStyles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },

  heroImage: {
    width: '100%',
    height: 161,
    backgroundColor: '#EEE',
  },

  
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 4,
  },
  pujaTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#281518',
    fontWeight: '700',
  },
  price: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#281518',
    fontWeight: '700',
  },

  
  messagePill: {
    marginHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    paddingHorizontal: 7,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 12,
    color: '#2B000A',
  },

 
  otpBar: {
    marginHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#2B000A',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 4,
  },
  otpLabel: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 22,
    color: '#FFFFFF',
    fontWeight: '700',
    marginRight: 4,
  },
  otpBox: {
    width: 24,
    height: 24,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpDigit: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    lineHeight: 18,
    color: '#2B000A',
    fontWeight: '700',
  },


  progressStrip: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF7F9',
    paddingVertical: 11,
    paddingHorizontal: 12,
  },
  progStep: {
    alignItems: 'center',
    gap: 4,
  },
  progLabel: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    lineHeight: 18,
    color: '#000000',
    fontWeight: '700',
    textAlign: 'center',
  },

 
  divider: {
    height: 0.75,
    backgroundColor: '#D9D9D9',
    marginTop: 8,
  },


  chipsWrap: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },


  actionsRow: {
    flexDirection: 'row',
    borderTopWidth: 0.75,
    borderTopColor: '#D9D9D9',
    height: 44,
  },
  actionHalf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionDividerV: {
    width: 0.75,
    backgroundColor: '#D9D9D9',
    marginVertical: 4,
  },
  actionText: {
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 17,
    color: '#2B000A',
    fontWeight: '500',
  },
});

const chipStyles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 17,
    gap: 4,
  },
  label: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    lineHeight: 18,
    color: '#505050',
    fontWeight: '700',
  },
});


const iconStyles = StyleSheet.create({
  wrap: { width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },

  // Home
  homeRoof: {
    position: 'absolute',
    width: 11,
    height: 11,
    borderWidth: 1.5,
    borderColor: '#505050',
    borderRadius: 1,
    top: 1,
  },
  homeDoor: {
    position: 'absolute',
    width: 4,
    height: 5,
    borderWidth: 1.5,
    borderColor: '#505050',
    bottom: 1,
  },

  // Calendar
  calBody: {
    width: 12,
    height: 13,
    borderWidth: 1.5,
    borderColor: '#757575',
    borderRadius: 1,
  },

  // Clock
  clockCircle: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    borderWidth: 1.5,
    borderColor: '#757575',
  },

  // User
  userHead: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#757575',
    top: 1,
  },
  userBody: {
    position: 'absolute',
    width: 10,
    height: 6,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1.5,
    borderColor: '#757575',
    bottom: 0,
  },

  // Reschedule (calendar-sync placeholder)
  rescheduleBox: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: '#2B000A',
    borderRadius: 2,
  },

  // Headset
  headsetArc: {
    width: 12,
    height: 8,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderWidth: 1.5,
    borderColor: '#2B000A',
    borderBottomWidth: 0,
  },

  // Check circle
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#757575',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleFilled: {
    backgroundColor: '#2B000A',
    borderColor: '#2B000A',
  },
  checkMark: {
    width: 10,
    height: 7,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '-45deg' }, { translateY: -1 }],
  },
});