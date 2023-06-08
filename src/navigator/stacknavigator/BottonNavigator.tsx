import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dashboard} from '../../screens/Dashboard';
import {Services} from '../../screens/Services';
import {Appoinments} from '../../screens/Appoinments';
import {Settings} from '../../screens/Settings';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Services" component={Services} />
      <Tab.Screen name="Appoinments" component={Appoinments} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
