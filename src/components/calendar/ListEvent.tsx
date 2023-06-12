/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {Text} from 'react-native-paper';
import {globalColors} from '../../theme/AppStyles';
import {AgendaContext} from '../../hooks/useCalendar';
import {ThemeContext} from '../../context/ThemeContext';

export const ListEvent = () => {
  const {markedDates} = useContext(AgendaContext);
  const {
    themeState: {colors, themeCalendar, highlightColor},
  } = useContext(ThemeContext);
  // const {prevMonth, nextMonth} = useDates();
  const [selected, setSelected] = useState<string>();
  const handleSelectDate = (day: DateData) => {
    const todayMidnight = new Date().setHours(1, 0, 0, 0);
    const currentDate = new Date();
    const maxAllowedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    );
    if (day.timestamp < todayMidnight) {
      ToastAndroid.showWithGravityAndOffset(
        'No puedes seleccionar días pasados',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      return;
    }
    if (day.timestamp > maxAllowedDate.getTime()) {
      ToastAndroid.showWithGravityAndOffset(
        'Solo puedes hacer citas dentro de 30 dias',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      return;
    }
    setSelected(day.dateString);
  };

  return (
    <>
      <View
        style={{
          marginHorizontal: 20,
          borderRadius: 10,
          borderBottomWidth: 3,
          borderBottomColor: highlightColor,
          shadowColor: colors.text,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}>
        <Calendar
          // minDate={prevMonth.dateString}
          // startDate={nextMonth.dateString}
          style={{borderRadius: 10}}
          onDayPress={handleSelectDate}
          markedDates={markedDates}
          theme={themeCalendar}
        />
      </View>
      <View style={{marginVertical: 20}}>
        <Text style={{color: globalColors.mainText}}>Date: {selected}</Text>
      </View>
    </>
  );
};
