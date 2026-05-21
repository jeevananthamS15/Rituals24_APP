import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Order {
  id: string;
  name: string;
  orderNumber: string;
  price: number;
  status: string;
  expectedDelivery: string;
  imageUrl?: string;
}

interface Props {
  order: Order;
}

export const OrderCard = ({ order }:Props) => (
  <View style={styles.card}>
   
    <Image
      source={{
        uri:
          order.imageUrl ||
          'https://picsum.photos/seed/order1/400/200',
      }}
      style={styles.heroImage}
      resizeMode="cover"
    />

    <View style={styles.infoRow}>
      <View style={styles.leftCol}>
        <Text style={styles.name}>{order.name}</Text>
        <Text style={styles.orderNum}>Order #{order.orderNumber}</Text>
      </View>
      <View style={styles.rightCol}>
        <Text style={styles.price}>
          ₹{order.price.toLocaleString('en-IN')}
        </Text>
        <View style={styles.shippedBadge}>
          <View style={styles.shippedDot} />
          <Text style={styles.shippedText}>Shipped</Text>
        </View>
      </View>
    </View>


    <View style={styles.deliveryChip}>
      <View style={styles.truckIconWrap}>
        <View style={styles.truckBox} />
        <View style={styles.truckCabin} />
        <View style={styles.wheelL} />
        <View style={styles.wheelR} />
      </View>
      <Text style={styles.deliveryText}>
        Expected Delivery • <Text style={styles.deliveryBold}>{order.expectedDelivery}</Text>
      </Text>
    </View>
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

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },
  leftCol: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#281518',
    fontWeight: '700',
  },
  orderNum: {
    fontFamily: 'Lato',
    fontSize: 12,
    lineHeight: 18,
    color: '#281518',
    fontWeight: '400',
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  price: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#281518',
    fontWeight: '700',
  },


  shippedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(221,171,44,0.2)',
    borderRadius: 14,
    paddingHorizontal: 7,
    paddingVertical: 3,
    gap: 4,
  },
  shippedDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#876100',
  },
  shippedText: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 12,
    color: '#876100',
  },


  deliveryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 17,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
    alignSelf: 'flex-start',
  },
  deliveryText: {
    fontFamily: 'Lato',
    fontSize: 12,
    lineHeight: 18,
    color: '#505050',
    fontWeight: '400',
  },
  deliveryBold: {
    fontWeight: '700',
  },

  
  truckIconWrap: {
    width: 16,
    height: 16,
    position: 'relative',
  },
  truckBox: {
    position: 'absolute',
    left: 1,
    top: 3,
    width: 9,
    height: 7,
    borderWidth: 1.5,
    borderColor: '#505050',
    borderRadius: 1,
  },
  truckCabin: {
    position: 'absolute',
    right: 0,
    top: 5,
    width: 5,
    height: 5,
    borderWidth: 1.5,
    borderColor: '#505050',
    borderRadius: 1,
  },
  wheelL: {
    position: 'absolute',
    left: 2,
    bottom: 1,
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: '#505050',
    backgroundColor: '#FFF',
  },
  wheelR: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: '#505050',
    backgroundColor: '#FFF',
  },
});