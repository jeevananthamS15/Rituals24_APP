import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { theme } from '../../theme';

const TAB_ICONS: Record<
  string,
  {
    active: string;
    inactive: string;
  }> = {
  Home: {
    active: 'home',
    inactive: 'home-outline',
  },

  Explore: {
    active: 'search',
    inactive: 'search-outline',
  },

  Store: {
    active: 'bag',
    inactive: 'bag-outline',
  },

  Booking: {
    active: 'calendar',
    inactive: 'calendar-outline',
  },

  Profile: {
    active: 'person',
    inactive: 'person-outline',
  },
};

export const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const iconName = isFocused
            ? TAB_ICONS[route.name].active
            : TAB_ICONS[route.name].inactive;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
              activeOpacity={0.8}
            >
              {/* Active Top Indicator */}
              {isFocused && <View style={styles.indicator} />}

              {/* Icon */}
              <Ionicons
                name={iconName}
                size={22}
                color={
                  isFocused
                    ? theme.colors.tabActive
                    : theme.colors.tabInactive
                }
                style={styles.icon}
              />

              {/* Label */}
              <Text
                style={[
                  styles.label,
                  {
                    color: isFocused
                      ? theme.colors.tabActive
                      : theme.colors.tabInactive,
                    fontWeight: isFocused ? '700' : '500',
                  },
                ]}
              >
                {String(label)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.surface,
  },

  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,

    paddingTop: 8,

    paddingBottom: Platform.OS === 'ios' ? 24 : 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 12,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',

    minHeight: 58,
  },

  icon: {
    marginBottom: 3,
  },

  label: {
    ...theme.typography.labelSm,
    fontSize: 11,
    lineHeight: 14,
  },

  indicator: {
    position: 'absolute',
    top: 0,

    width: 24,
    height: 3,

    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

    backgroundColor: theme.colors.primary,
  },
});