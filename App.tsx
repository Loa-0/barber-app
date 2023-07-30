import React, {useContext, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/stacknavigator/StackNavigator';
import {PaperProvider} from 'react-native-paper';
import {AuthProvider} from './src/context/AuthContext';
import {ThemeContext, ThemeProvider} from './src/context/ThemeContext';
import {AgendaProvider} from './src/hooks/useCalendar';
import {ServiceProvider} from './src/context/Service.Context';
import {ServiceListProvider} from './src/context/ServicesListContext';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const {themeState} = useContext(ThemeContext);

  return (
    <PaperProvider>
      <AppState>
        <NavigationContainer theme={themeState}>
          <StackNavigator />
        </NavigationContainer>
      </AppState>
    </PaperProvider>
  );
};

export default App;

const AppState = ({
  children,
}: {children: JSX.Element[]} | {children: JSX.Element}) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AgendaProvider>
          <ServiceProvider>
            <ServiceListProvider>{children}</ServiceListProvider>
          </ServiceProvider>
        </AgendaProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
