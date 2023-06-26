/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {ToastAndroid, View, Modal} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {AgendaContext} from '../../hooks/useCalendar';
import {ThemeContext} from '../../context/ThemeContext';
import {AgendaScreen} from './AgendaScreen';

export const ListEvent = () => {
  const {markedDates} = useContext(AgendaContext);
  const {
    themeState: {colors, themeCalendar, highlightColor, currentTheme},
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
  const {markedDates, today} = useContext(AgendaContext);
  const {
    themeState: {colors, themeCalendar, highlightColor, currentTheme},
  } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>();
  const closeModal = () => {
    setIsVisible(false);
  };
  const handleSelectDate = (day: DateData) => {
    const currentDate = new Date();
    const maxAllowedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    );
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
    setIsVisible(true);
  };

  return (
    <>
      <View
        key={currentTheme}
        style={{
          marginTop: 15,
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
          minDate={today.dateString}
          // startDate={nextMonth.dateString}
          style={{borderRadius: 10}}
          onDayPress={handleSelectDate}
          markedDates={markedDates}
          theme={{
            ...themeCalendar,
            textInactiveColor: 'red',
            disabledArrowColor: 'red',
          }}
        />
      </View>
      {selected && (
        <Modal
          animationType="fade"
          visible={isVisible}
          transparent={true}
          style={{justifyContent: 'center', alignContent: 'center'}}>
          <AgendaScreen
            dateCurr={selected}
            closeModal={closeModal}
            time="1h-30m"
          />
        </Modal>
      )}
    </>
  );
};
