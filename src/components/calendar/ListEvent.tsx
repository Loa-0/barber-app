import React, {useState} from 'react';
import {View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Text} from 'react-native-paper';
import {globalColors} from '../../theme/AppStyles';

LocaleConfig.locales.es = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';

export const ListEvent = () => {
  const [selected, setSelected] = useState('');

  return (
    <>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: false,
          },
        }}
        theme={{
          backgroundColor: '#000000',
          calendarBackground: '#000000',
          textSectionTitleColor: globalColors.golden,
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e000',
        }}
      />
      <View>
        <Text>Date: {selected.toString()}</Text>
      </View>
    </>
  );
};
