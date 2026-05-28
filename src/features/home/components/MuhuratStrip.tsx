import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const MUHURATS = [
  {
    id: '1',
    time: '5:40 AM - 7:30 AM',
    name: 'Braham Muhurat',
    icon: require('../../../../assets/HomeScreen/Mhuraticons/sun.png'),
    iconSize: 48,
  },
  {
    id: '2',
    time: '9:00 AM - 10:30 AM',
    name: 'Abhijit Muhurat',
    icon: require('../../../../assets/HomeScreen/Mhuraticons/negles.png'),
    iconSize: 44,
  },
  {
    id: '3',
    time: '12:00 AM - 1:00 AM',
    name: 'Rahu Kalam',
    icon: require('../../../../assets/HomeScreen/Mhuraticons/time.png'),
    iconSize: 40,
  },
];

interface Props {
  onViewAll?: () => void;
}

export const MuhuratStrip: React.FC<Props> = ({onViewAll}) => (
  <View style={styles.card}>
   <View style={styles.header}>
  <Image
    source={require('../../../../assets/HomeScreen/Mhuraticons/calender.png')}
    style={styles.calIcon}
  />
  <Text style={styles.headerTitle}>Today's Muhurat</Text>
</View>

    {MUHURATS.map(m => (
      <View key={m.id} style={styles.muhuratRow}>
        <View style={styles.rowTextBlock}>
          <Text style={styles.rowTime}>{m.time}</Text>
          <Text style={styles.rowName}>{m.name}</Text>
        </View>

        <Image source={m.icon} style={styles.rowIcon} />
      </View>
    ))}

    <TouchableOpacity
      style={styles.calendarBtn}
      onPress={onViewAll}
      activeOpacity={0.8}>
      <Text style={styles.calendarBtnText}>View Full Calendar</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    backgroundColor: '#2B000A',
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    gap: 8,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#F3B416',
  },

  muhuratRow: {
    backgroundColor: '#540B1C',
    borderRadius: 12,
    height: 75,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTextBlock: {
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
  width: 80,
  height: 70,
  resizeMode: 'contain',
},

  calendarBtn: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  calendarBtnText: {
    fontFamily: 'Lato-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: '#FFFFFF',
  },
  calIcon: {
  width: 18,
  height: 18,
  resizeMode: 'contain',
},

});
