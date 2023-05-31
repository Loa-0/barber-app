import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen} from '../../screens/WelcomeScreen';
import {BottomNavigator} from './BottonNavigator';
import {globalColors} from '../../theme/AppStyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type RootStackParams = {
  WelcomeScreen: undefined;
  Page1: {id: number; nombre: string};
};
const Stack = createStackNavigator<RootStackParams>();
export const StackNavigator = () => {
  const {top} = useSafeAreaInsets();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: globalColors.mainBack},
        headerStyle: {elevation: 0, marginTop: top},
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="Page1"
        options={{headerShown: false}}
        component={BottomNavigator}
      />
    </Stack.Navigator>
  );
};
