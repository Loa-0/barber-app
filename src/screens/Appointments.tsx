import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {styles as S} from '../theme/AppStyles';
import {CalendarComponent} from '../components/calendar/CalendarComponet';
import {HeaderComponent} from '../components/HeaderComponent';
import {ThemeContext} from '../context/ThemeContext';
// import {AgendaScreen} from '../components/calendar/AgendaScreen';

export const Appointments = () => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);
  return (
    <ScrollView
      style={{
        ...S.globalContainer,
        backgroundColor: colors.background,
      }}>
      <HeaderComponent title="Citas" />
      <CalendarComponent />
      {/* <AgendaScreen /> */}
    </ScrollView>
  );
};
