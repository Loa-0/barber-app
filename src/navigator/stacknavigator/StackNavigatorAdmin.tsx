import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {EditServicePage} from '../../screens/editServicesPage';
import {AdminServicesPage} from '../../screens/AdminServicesPage';
import {serviceInfoType} from '../../components/services/types';
import {NewServicePage} from '../../screens/newServicePage';

export type RootStackParams = {
  editService: serviceInfoType;
  newService: undefined;
};
const Stack = createStackNavigator<RootStackParams>();
export const StackNavigatorAdmin = () => {
  const {top} = useSafeAreaInsets();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {elevation: 0, marginTop: top},
      }}>
      <Stack.Screen
        name="adminServices"
        options={{headerShown: false}}
        component={AdminServicesPage}
      />
      <Stack.Screen
        name="editService"
        options={{headerShown: false}}
        component={EditServicePage}
      />
      <Stack.Screen
        name="newService"
        options={{headerShown: false}}
        component={NewServicePage}
      />
    </Stack.Navigator>
  );
};
