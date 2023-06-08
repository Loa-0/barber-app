import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/stacknavigator/StackNavigator';
import {PaperProvider} from 'react-native-paper';
import {AuthProvider} from './src/context/AuthContext';
import {ThemeContext, ThemeProvider} from './src/context/ThemeContext';

const App = () => {
  const {themeState} = useContext(ThemeContext);
  return (
    <PaperProvider>
      <NavigationContainer theme={themeState}>
        <AppState>
          <ThemeState>
            <StackNavigator />
          </ThemeState>
        </AppState>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

const AppState = ({children}: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const ThemeState = ({children}: any) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
