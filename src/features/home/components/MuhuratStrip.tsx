import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

const MUHURATS = [
  {
    id: '1',
    name: 'Braham Muhurat',
    time: '5:40 AM - 7:30 AM',
    icon: '☀️',
  },
  {
    id: '2',
    name: 'Abhijit Muhurat',
    time: '9:00 AM - 10:30 AM',
    icon: '📿',
  },
  {
    id: '3',
    name: 'Rahu Kalam',
    time: '12:00 PM - 1:00 PM',
    icon: '⌛',
  },
];

interface Props {
  onViewAll?: () => void;
}

export const MuhuratStrip = ({ onViewAll }:Props) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerIcon}>📅</Text>
      <Text style={styles.headerTitle}>Today's Muhurat</Text>
    </View>

    {MUHURATS.map(m => (
      <View key={m.id} style={styles.row}>
        <View style={styles.rowLeft}>
          <Text style={styles.rowTime}>{m.time}</Text>
          <Text style={styles.rowName}>{m.name}</Text>
        </View>
        <Text style={styles.rowIcon}>{m.icon}</Text>
      </View>
    ))}

    <TouchableOpacity
      style={styles.calendarBtn}
      onPress={onViewAll}
      activeOpacity={0.8}
    >
      <Text style={styles.calendarBtnText}>View Full Calendar</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.screenPadding,
    backgroundColor: '#2B000A',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  headerIcon: {
    fontSize: 18,
  },
  headerTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#F3B416',
  },
  row: {
    backgroundColor: '#540B1C',
    borderRadius: 12,
    height: 75,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    gap: 4,
  },
  rowTime: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 17,
    color: '#FFFFFF',
  },
  rowName: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  rowIcon: {
    fontSize: 36,
  },
  calendarBtn: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    height: 42,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarBtnText: {
    fontFamily: 'Lato-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: '#FFFFFF',
  },
});