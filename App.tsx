import React from 'react';
import { AppProviders } from './src/app/providers/AppProviders';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import VerifiedPanditsScreen from './Testing';

const App = () => {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
};

export default App;