/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {Dashboard} from '../../screens/Dashboard';
import {Services} from '../../screens/Services';
import {Appointments} from '../../screens/Appointments';
import {Settings} from '../../screens/Settings';
import {RootStackParams} from './StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {globalColors} from '../../theme/AppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {StackNavigatorAdmin} from './StackNavigatorAdmin';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends StackScreenProps<RootStackParams, 'Page1'> {}

const Tab = createMaterialBottomTabNavigator();
export const BottomNavigator = ({}: Props) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = async () => {
    const loggedUser = await AsyncStorage.getItem('user');
    if (!loggedUser) {
      setIsAdmin(false);
      return false;
    }
    setIsAdmin(true);
    return true;
  };

  return (
    <Tab.Navigator
      sceneAnimationEnabled={true}
      activeColor={globalColors.golden}
      inactiveColor={globalColors.mainText}
      barStyle={{
        backgroundColor: globalColors.mainBack,
      }}>
      {isAdmin && (
        <Tab.Screen
          name="AdminServices"
          component={StackNavigatorAdmin}
          options={{
            tabBarLabel: 'Editar',
            tabBarIcon: ({color}) => (
              <FontAwesome5
                name="edit"
                color={color}
                size={globalColors.iconSize}
              />
            ),
          }}
        />
      )}
      {isAdmin === false && (
        <>
          <Tab.Screen
            name="Dashboard"
            options={{
              tabBarLabel: 'Inicio',
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
        </>
      )}
      <Tab.Screen
        name="Configuración"
        component={Settings}
        options={{
          tabBarLabel: 'Configuración',
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
