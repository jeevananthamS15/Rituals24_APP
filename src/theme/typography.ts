import { Platform } from 'react-native';


const fontFamily = {
  regular: Platform.select({ android: 'Roboto', ios: 'System' })!,
  medium: Platform.select({ android: 'Roboto-Medium', ios: 'System' })!,
  bold: Platform.select({ android: 'Roboto-Bold', ios: 'System' })!,
 
};

export const typography = {

  displayLg: { fontFamily: fontFamily.bold, fontSize: 28, lineHeight: 36, letterSpacing: -0.5 },
  displayMd: { fontFamily: fontFamily.bold, fontSize: 24, lineHeight: 32, letterSpacing: -0.3 },


  h1: { fontFamily: fontFamily.bold, fontSize: 22, lineHeight: 30 },
  h2: { fontFamily: fontFamily.bold, fontSize: 18, lineHeight: 26 },
  h3: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 24 },
  h4: { fontFamily: fontFamily.medium, fontSize: 14, lineHeight: 20 },


  bodyLg: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 24 },
  bodyMd: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 22 },
  bodySm: { fontFamily: fontFamily.regular, fontSize: 12, lineHeight: 18 },

  
  labelLg: { fontFamily: fontFamily.medium, fontSize: 14, lineHeight: 20 },
  labelMd: { fontFamily: fontFamily.medium, fontSize: 12, lineHeight: 16 },
  labelSm: { fontFamily: fontFamily.medium, fontSize: 10, lineHeight: 14 },

  
  caption: { fontFamily: fontFamily.regular, fontSize: 11, lineHeight: 16 },


  priceLg: { fontFamily: fontFamily.bold, fontSize: 18, lineHeight: 24 },
  priceMd: { fontFamily: fontFamily.bold, fontSize: 14, lineHeight: 20 },
} as const;