/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState, useContext} from 'react';

import {RootStackParams} from './StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../../context/AuthContext';

import {Dashboard} from '../../screens/Dashboard';
import {ServicesScreen} from '../../screens/Services';
import {Appointments} from '../../screens/Appointments';
import {Settings} from '../../screens/Settings';

import {globalColors} from '../../theme/AppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {StackNavigatorAdmin} from './StackNavigatorAdmin';
import {Loader} from '../../components/common/Loader';

interface Props extends StackScreenProps<RootStackParams, 'Page1'> {}

const Tab = createMaterialBottomTabNavigator();
export const BottomNavigator = ({navigation}: Props) => {
  const [loading, setIsLoading] = useState<boolean>(true);
  const {authState} = useContext(AuthContext);

  useEffect(() => {
    getAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  const getAdmin = async () => {
    setIsLoading(true);
    if (!authState.isLoggedIn) {
      setIsLoading(false);
      return false;
    }
    setIsLoading(false);
    return true;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Tab.Navigator
          sceneAnimationEnabled={true}
          activeColor={globalColors.golden}
          inactiveColor={globalColors.mainText}
          barStyle={{
            backgroundColor: globalColors.mainBack,
          }}>
          {authState.isLoggedIn ? (
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
          ) : (
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
                component={ServicesScreen}
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
            options={{
              tabBarLabel: 'Configuración',
              tabBarIcon: ({color}) => (
                <FontAwesome5
                  name="cog"
                  color={color}
                  size={globalColors.iconSize}
                />
              ),
            }}>
            {() => <Settings mainNav={navigation} />}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </>
  );
};
