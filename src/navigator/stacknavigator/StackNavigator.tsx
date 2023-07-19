import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen} from '../../screens/WelcomeScreen';
import {BottomNavigator} from './BottonNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LoginAdminPage} from '../../screens/loginAdminPage';
import {ThemeContext} from '../../context/ThemeContext';

export type RootStackParams = {
  WelcomeScreen: undefined;
  Page1: undefined;
  AdminLogin: undefined;
};
const Stack = createStackNavigator<RootStackParams>();
export const StackNavigator = () => {
  const {top} = useSafeAreaInsets();
  const {
    themeState: {colors},
  } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: colors.background},
        headerStyle: {elevation: 0, marginTop: top},
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AdminLogin"
        component={LoginAdminPage}
      />
      <Stack.Screen
        name="Page1"
        options={{headerShown: false}}
        component={BottomNavigator}
      />
    </Stack.Navigator>
  );
};
