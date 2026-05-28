import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  Home,
  Calendar,
  Clock,
  User,
  CalendarDays,
  Headphones,
  Check,
  Circle,
  Truck,
} from 'lucide-react-native';
import { Booking } from '../../../types';

const PRIMARY = '#2B000A';
const CHIP_ICON_COLOR = '#505050';
const MUTED = '#757575';

interface Props {
  booking: Booking & { message?: string; otp?: string };
}

const Chip = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <View style={chipStyles.chip}>
    {icon}
    <Text style={chipStyles.label}>{label}</Text>
  </View>
);

const ProgressStep = ({
  label,
  done,
  isFirst,
}: {
  label: string;
  done: boolean;
  isFirst?: boolean;
}) => (
  <View style={progStyles.step}>
    <View style={progStyles.iconWrap}>
      {done ? (
        <View style={progStyles.filledCircle}>
          <Check size={12} color="#FFF" strokeWidth={2.5} />
        </View>
      ) : (
        <Circle size={24} color={MUTED} strokeWidth={2} />
      )}
    </View>
    <Text style={progStyles.label}>{label}</Text>
  </View>
);

export const BookingCard: React.FC<Props> = ({ booking }) => {
  const isActive = booking.status === 'active';

  return (
    <View style={styles.card}>
      <Image
        source={booking.imageUrl}
        style={styles.heroImage}
        resizeMode="cover"
      />

      <View style={styles.titleRow}>
        <Text style={styles.pujaTitle}>{booking.pujaTitle}</Text>
        <Text style={styles.price}>
          ₹{booking.price.toLocaleString('en-IN')}
        </Text>
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
          {(
            [
              { label: 'Confirmed', done: true },
              { label: 'Assigned', done: false },
              { label: 'En Route', done: false },
              { label: 'In Progress', done: false },
            ] as { label: string; done: boolean }[]
          ).map((step, i, arr) => (
            <React.Fragment key={step.label}>
              <View style={progStyles.step}>
                <View style={progStyles.iconWrap}>
                  {step.done ? (
                    <View style={progStyles.filledCircle}>
                      <Check size={12} color="#FFF" strokeWidth={2.5} />
                    </View>
                  ) : (
                    <View style={progStyles.emptyCircle}>
                      <Check size={12} color={MUTED} strokeWidth={2} />
                    </View>
                  )}
                </View>
                <Text style={progStyles.label}>{step.label}</Text>
              </View>
              {i < arr.length - 1 && (
                <View style={progStyles.connector} />
              )}
            </React.Fragment>
          ))}
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.chipsWrap}>
        <View style={styles.chipsRow}>
          <Chip
            icon={<Home size={16} color={CHIP_ICON_COLOR} strokeWidth={1.5} />}
            label="Home Visit"
          />
          <Chip
            icon={
              <Calendar size={16} color={CHIP_ICON_COLOR} strokeWidth={1.5} />
            }
            label={booking.date}
          />
          <Chip
            icon={
              <Clock size={16} color={MUTED} strokeWidth={1.5} />
            }
            label={booking.time}
          />
        </View>
        <View style={styles.chipsRow}>
          <Chip
            icon={<User size={16} color={MUTED} strokeWidth={1.5} />}
            label={booking.panditName}
          />
        </View>
      </View>

  
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionHalf} activeOpacity={0.7}>
          <View style={styles.actionInner}>
            <CalendarDays size={20} color={PRIMARY} strokeWidth={1.5} />
            <Text style={styles.actionText}>Reschedule</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.actionDividerV} />
        <TouchableOpacity style={styles.actionHalf} activeOpacity={0.7}>
          <View style={styles.actionInner}>
            <Headphones size={20} color={PRIMARY} strokeWidth={1.5} />
            <Text style={styles.actionText}>Support</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    paddingBottom: 6,
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
    color: PRIMARY,
  },
  
  otpBar: {
    marginHorizontal: 12,
    marginBottom: 0,
    backgroundColor: PRIMARY,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 68,
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
    color: PRIMARY,
    fontWeight: '700',
  },
  progressStrip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#FFF7F9',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  divider: {
    height: 0.75,
    backgroundColor: '#D9D9D9',
  },
  chipsWrap: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
    color: PRIMARY,
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

const progStyles = StyleSheet.create({
  step: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  iconWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: MUTED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connector: {
    height: 2,
    backgroundColor: '#D9D9D9',
    alignSelf: 'flex-start',
    marginTop: 11, // vertically center with the circle (24/2 - 1)
    width: 12,
    flexShrink: 0,
  },
  label: {
    fontFamily: 'Lato-Bold',
    fontSize: 11,
    lineHeight: 16,
    color: '#000000',
    fontWeight: '700',
    textAlign: 'center',
  },
});