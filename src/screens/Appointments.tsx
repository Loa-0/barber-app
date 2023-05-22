import React from 'react';
import {Text, View} from 'react-native';
import {CalendarComponent} from '../components/calendar/CalendarComponet';
import {styles as S} from '../theme/AppStyles';

export const Appointments = () => {
  return (
    <View style={S.globalContainer}>
      <Text>Appoinments</Text>
      <CalendarComponent />
    </View>
  );
};
