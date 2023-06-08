import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/stacknavigator/StackNavigator';
import {PaperProvider} from 'react-native-paper';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppState>
          <StackNavigator />
        </AppState>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

const AppState = ({children}: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};
