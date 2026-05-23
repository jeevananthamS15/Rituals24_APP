import React from 'react';
import { AppProviders } from './src/app/providers/AppProviders';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import SplashScreen from './temp';

const App = () => {
  return (
    <AppProviders>
      <RootNavigator/>
    </AppProviders>
  );
};

export default App;