import React, {useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Path, Rect, Circle} from 'react-native-svg';

const {width: SCREEN_WIDTH} = Dimensions.get('window');


const C = {
 
  pill: 'rgba(255,255,255,0.78)',

  
  activeCircle: 'rgba(74,16,32,0.08)',

  activeColor: '#4A1020',


  inactiveColor: '#8A8A8A',

  
  shadow: '#000000',
};


const HIDE_ON_SCREENS = [
  'PujaDetail',
  'ProductDetail',
  'ServiceMode',
  'DateMuhurat',
  'PanditSelect',
  'AddOns',
  'Payment',
];

const getFocusedRouteName = (route: any): string => {
  if (!route?.state) return route.name;
  const nested = route.state.routes[route.state.index ?? 0];
  return getFocusedRouteName(nested);
};


const HomeIcon = ({color, size}: {color: string; size: number}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SearchIcon = ({color, size}: {color: string; size: number}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={1.6} />
    <Path
      d="M16.5 16.5L21 21"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

const StoreIcon = ({color, size}: {color: string; size: number}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 3H18C18.5523 3 19 3.44772 19 4V21L12 17L5 21V4C5 3.44772 5.44772 3 6 3Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BookingIcon = ({color, size}: {color: string; size: number}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="4"
      width="18"
      height="17"
      rx="2.5"
      stroke={color}
      strokeWidth={1.6}
    />
    <Path
      d="M8 2V5M16 2V5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Path
      d="M3 9H21"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Path
      d="M7.5 13H8.5M11.5 13H12.5M15.5 13H16.5M7.5 16.5H8.5M11.5 16.5H12.5M15.5 16.5H16.5"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const ProfileIcon = ({color, size}: {color: string; size: number}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.6} />
    <Circle cx="12" cy="9.5" r="2.8" stroke={color} strokeWidth={1.5} />
    <Path
      d="M5.5 19.5C6.5 16.5 9 14.5 12 14.5C15 14.5 17.5 16.5 18.5 19.5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
);

const ICONS: Record<string, React.FC<{color: string; size: number}>> = {
  Home: HomeIcon,
  Explore: SearchIcon,
  Store: StoreIcon,
  Booking: BookingIcon,
  Profile: ProfileIcon,
};

const LABELS: Record<string, string> = {
  Home: 'Home',
  Explore: 'Explore',
  Store: 'Store',
  Booking: 'Booking',
  Profile: 'Profile',
};


const TabItem = ({
  routeName,
  isFocused,
  label,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
}: {
  routeName: string;
  isFocused: boolean;
  label: string;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
}) => {
  const bgAnim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(isFocused ? 1 : 0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(bgAnim, {
        toValue: isFocused ? 1 : 0,
        useNativeDriver: true,
        tension: 68,
        friction: 11,
      }),
      Animated.spring(scaleAnim, {
        toValue: isFocused ? 1 : 0.96,
        useNativeDriver: true,
        tension: 68,
        friction: 11,
      }),
    ]).start();
  }, [isFocused]);

  const IconComponent = ICONS[routeName] ?? HomeIcon;
  const iconColor = isFocused ? C.activeColor : C.inactiveColor;

  return (
    <TouchableOpacity
      style={styles.tabTouch}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}>
      <Animated.View
        style={[styles.tabInner, {transform: [{scale: scaleAnim}]}]}>


        <Animated.View style={[styles.activeCircleBg, {opacity: bgAnim}]} />


        <View style={styles.iconWrapper}>
          <IconComponent color={iconColor} size={22} />
        </View>


        <Text
          style={[
            styles.label,
            {
              color: iconColor,
              fontWeight: isFocused ? '600' : '400',
            },
          ]}
          numberOfLines={1}>
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};


export const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();


  const focusedRouteName = getFocusedRouteName(state.routes[state.index]);
  if (HIDE_ON_SCREENS.includes(focusedRouteName)) return null;


  const visibleRoutes = state.routes.filter(r => r.name !== 'MuhuratCalendar');

  const pillBottom = (insets.bottom > 0 ? insets.bottom : 8) + 8;
  const sideInset = Math.min(SCREEN_WIDTH * 0.045, 18);

  return (
    <View
      style={[
        styles.outerWrapper,
        {
          bottom: pillBottom,
          left: sideInset,
          right: sideInset,
        },
      ]}
      pointerEvents="box-none">

 
      <View style={styles.pill}>
        {visibleRoutes.map(route => {
          const actualIndex = state.routes.findIndex(r => r.key === route.key);
          const {options} = descriptors[route.key];
          const isFocused = state.index === actualIndex;
          const label = LABELS[route.name] ?? route.name;

          return (
            <TabItem
              key={route.key}
              routeName={route.name}
              isFocused={isFocused}
              label={label}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              onLongPress={() =>
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                })
              }
            />
          );
        })}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({

  outerWrapper: {
    position: 'absolute',
    zIndex: 999,
  },


  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.pill,       
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 5,


    ...Platform.select({
      ios: {
        shadowColor: C.shadow,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.22,
        shadowRadius: 16,
      },
      android: {
       
        elevation: 12,

        shadowColor: C.shadow,
      },
    }),
  },

  tabTouch: {
    flex: 1,
  },

  tabInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 4,
    borderRadius: 999,
    minHeight: 60,
    overflow: 'hidden',
    position: 'relative',
  },


  activeCircleBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: C.activeCircle,
    borderRadius: 999,
  },

  iconWrapper: {
    marginBottom: 4,
  },

  label: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.1,
    textAlign: 'center',
  },
});