import React from 'react';
import {Text, View} from 'react-native';
import {CalendarComponent} from '../components/calendar/CalendarComponet';
import {styles as S} from '../theme/AppStyles';
import {HeaderComponent} from '../components/HeaderComponent';

export const Appointments = () => {
  return (
    <View style={S.globalContainer}>
      <HeaderComponent title="Citas" />
      <Text>Appoinments</Text>
      <CalendarComponent />
    </View>
  );
};
