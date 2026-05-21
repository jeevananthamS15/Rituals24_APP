export const colors = {

  primary: '#7B1C1C',
  primaryDark: '#5A1010',
  primaryLight: '#A83232',


  gold: '#C8921A',
  goldLight: '#E8B84B',
  goldDark: '#9A6E0F',


  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceElevated: '#FFF3E8',
  surfaceDark: '#1A0A00',


  textPrimary: '#1A0A00',
  textSecondary: '#6B4C3B',
  textMuted: '#9E7B6B',
  textInverse: '#FFFFFF',
  textGold: '#C8921A',


  border: '#E8D5C4',
  borderStrong: '#C4A08C',


  success: '#2E7D32',
  successLight: '#E8F5E9',
  warning: '#F57C00',
  warningLight: '#FFF3E0',
  error: '#C62828',
  errorLight: '#FFEBEE',
  info: '#1565C0',


  star: '#FFB300',


  tierGold: '#C8921A',
  tierSilver: '#9E9E9E',
  tierBronze: '#8D6E63',


  overlay: 'rgba(26, 10, 0, 0.6)',
  overlayLight: 'rgba(26, 10, 0, 0.3)',
  transparent: 'transparent',


  tabActive: '#7B1C1C',
  tabInactive: '#9E7B6B',
} as const;

export type ColorKey = keyof typeof colors;