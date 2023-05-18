import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Page1} from '../../screens/stack/Page1';
import {WelcomeScreen} from '../../screens/WelcomeScreen';

export type RootStackParams = {
  WelcomeScreen: undefined;
  Pagina1: {id: number; nombre: string};
};
const Stack = createStackNavigator<RootStackParams>();
export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {elevation: 0},
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={WelcomeScreen}
      />
      <Stack.Screen name="Page1" component={Page1} />
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
};
