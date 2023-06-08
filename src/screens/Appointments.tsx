import React from 'react';
import {ScrollView} from 'react-native';
import {styles as S} from '../theme/AppStyles';

import {CalendarComponent} from '../components/calendar/CalendarComponet';
import {HeaderComponent} from '../components/HeaderComponent';
// import {AgendaScreen} from '../components/calendar/AgendaScreen';

export const Appointments = () => {
  return (
    <ScrollView style={S.globalContainer}>
      <HeaderComponent title="Citas" />
      <CalendarComponent />
      {/* <AgendaScreen /> */}
    </ScrollView>
  );
};
