import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
}

export const AppProviders = ({ children }:Props) => (
  <SafeAreaProvider>
    {children}
  </SafeAreaProvider>
);