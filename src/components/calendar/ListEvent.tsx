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
          backgroundColor: globalColors.mainBack,
          calendarBackground: globalColors.mainBack,
          textSectionTitleColor: globalColors.golden,
          selectedDayBackgroundColor: globalColors.blueSelected,
          textSectionTitleDisabledColor: globalColors.golden,
          monthTextColor: globalColors.mainText,
          selectedDayTextColor: globalColors.mainText,
          todayTextColor: globalColors.blueSelected,
          dayTextColor: globalColors.mainText,
          textDisabledColor: globalColors.ligthBlue,
        }}
      />
      <View>
        <Text style={{color: globalColors.mainText}}>
          Date: {selected.toString()}
        </Text>
      </View>
    </>
  );
};
