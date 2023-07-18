import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/stacknavigator/StackNavigator';
import {PaperProvider} from 'react-native-paper';
import {AuthProvider} from './src/context/AuthContext';
import {ThemeContext, ThemeProvider} from './src/context/ThemeContext';
import {AgendaProvider} from './src/hooks/useCalendar';
import {ServiceProvider} from './src/context/Service.Context';
import { ServiceListProvider } from './src/context/ServicesListContext';

const App = () => {
  const {themeState} = useContext(ThemeContext);
  return (
    <PaperProvider>
      <NavigationContainer theme={themeState}>
        <AppState>
          <StackNavigator />
        </AppState>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ServiceProvider>
          <ServiceListProvider>
            <AgendaProvider>{children}</AgendaProvider>
          </ServiceListProvider>
        </ServiceProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
