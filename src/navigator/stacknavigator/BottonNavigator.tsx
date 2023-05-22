/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Dashboard} from '../../screens/Dashboard';
import {Services} from '../../screens/Services';
import {Appointments} from '../../screens/Appoinments';
import {Settings} from '../../screens/Settings';
import {RootStackParams} from './StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {globalColors} from '../../theme/AppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

interface Props extends StackScreenProps<RootStackParams, 'Page1'> {}

const Tab = createMaterialBottomTabNavigator();
export const BottomNavigator = ({}: Props) => {
  return (
    <Tab.Navigator
      sceneAnimationEnabled={true}
      activeColor={globalColors.golden}
      inactiveColor={globalColors.mainText}
      barStyle={{
        backgroundColor: globalColors.mainBack,
      }}>
      <Tab.Screen
        name="Dashboard"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <FontAwesome5
              name="home"
              color={color}
              size={globalColors.iconSize}
            />
          ),
        }}
        component={Dashboard}
      />
      <Tab.Screen
        name="Services"
        options={{
          tabBarLabel: 'Servicios',
          tabBarIcon: ({color}) => (
            <FontAwesome5
              name="ruler"
              color={color}
              size={globalColors.iconSize}
            />
          ),
        }}
        component={Services}
      />
      <Tab.Screen
        name="Appoinments"
        component={Appointments}
        options={{
          tabBarLabel: 'Citas',
          tabBarIcon: ({color}) => (
            <FontAwesome5
              name="calendar"
              color={color}
              size={globalColors.iconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Configuración"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <FontAwesome5
              name="cog"
              color={color}
              size={globalColors.iconSize}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
