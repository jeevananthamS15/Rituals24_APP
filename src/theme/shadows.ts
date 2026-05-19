import { Platform } from 'react-native';

export const shadows = {
  none: {},
  sm: Platform.select({
    android: { elevation: 2 },
    ios: { shadowColor: '#1A0A00', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4 },
  })!,
  md: Platform.select({
    android: { elevation: 4 },
    ios: { shadowColor: '#1A0A00', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 8 },
  })!,
  lg: Platform.select({
    android: { elevation: 8 },
    ios: { shadowColor: '#1A0A00', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.16, shadowRadius: 16 },
  })!,
  card: Platform.select({
    android: { elevation: 3 },
    ios: { shadowColor: '#1A0A00', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6 },
  })!,
} as const;