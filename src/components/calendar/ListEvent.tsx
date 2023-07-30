/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {ToastAndroid, View, Modal} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {AgendaContext} from '../../hooks/useCalendar';
import {ThemeContext} from '../../context/ThemeContext';
import {AgendaScreen} from './AgendaScreen';
import {Alert} from 'react-native';

export const ListEvent = () => {
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
  const handleMonthChange = (month: DateData) => {
    const currentDate = new Date().getMonth() + 1;
    const cuerentY = new Date().getFullYear() + 1;
    if (
      month.month - currentDate > 2 ||
      Number(month.year) > Number(cuerentY)
    ) {
      Alert.alert('Solo puedes hacer citas dentro de 30 dias');
    }
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
          onMonthChange={handleMonthChange}
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
          <AgendaScreen dateCurr={selected} closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};
