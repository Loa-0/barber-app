import React, {useContext, useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {styles as S} from '../theme/AppStyles';
import {CalendarComponent} from '../components/calendar/CalendarComponet';
import {HeaderComponent} from '../components/HeaderComponent';
import {ThemeContext} from '../context/ThemeContext';
import {AgendaContext} from '../hooks/useCalendar';
import {AuthContext} from '../context/AuthContext';
import {GoogleAuth} from '../components/sesion/GoogleAuth';

export const Appointments = () => {
  const {
    themeState: {colors, dividerColor},
  } = useContext(ThemeContext);
  const {clientUserState} = useContext(AuthContext);
  const {loadAgenda} = useContext(AgendaContext);
  const [refreshing, setrefreshing] = useState<boolean>(false);
  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(async () => {
      await loadAgenda(
        {dateString: '', day: 0, month: 0, timestamp: 0, year: 0},
        true,
      );
      setrefreshing(false);
    }, 1000);
  };
  return (
    <ScrollView
      style={{
        ...S.globalContainer,
        backgroundColor: colors.background,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={10}
          progressBackgroundColor={dividerColor}
          colors={[colors.background]}
        />
      }>
      <HeaderComponent title="Citas" />
      {clientUserState.isClientLogged ? <CalendarComponent /> : <GoogleAuth />}
    </ScrollView>
  );
};
