import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  ViewStyle,
} from 'react-native';
import { theme } from '../../theme';

interface Props {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  statusBarStyle?: 'dark-content' | 'light-content';
  backgroundColor?: string;
}

export const ScreenWrapper = ({
  children,
  scrollable = false,
  style,
  statusBarStyle = 'dark-content',
  backgroundColor = theme.colors.background,
}:Props) => {
  const content = scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, style]}>{children}</View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor}
      />
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});