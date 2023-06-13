import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {globalColors, styles as S} from '../../theme/AppStyles';
import {AgendaEntry} from '../../interfaces/Appointments';
import {AgendaContext} from '../../hooks/useCalendar';
import {ThemeContext} from '../../context/ThemeContext';

const testIDs = {
  agenda: {
    CONTAINER: 'agenda',
    ITEM: 'item',
  },
};

export const AgendaScreen = () => {
  const {agenda, loadAgenda, today} = useContext(AgendaContext);
  const {
    themeState: {colors, themeCalendar, highlightColor},
  } = useContext(ThemeContext);
  const [selectedDate, setSelectedDate] = useState<string>(today.dateString);
  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    console.log('Reservation day: ', reservation.day);
    const fontSize = isFirst ? 16 : 14;
    const fontWeight = isFirst ? 'bold' : 'normal';
    const color = isFirst ? 'black' : '#43515c';
    console.log('Selected Date', selectedDate);
    return (
      <>
        {isFirst && (
          <TouchableOpacity style={styles.btnAgendar}>
            <Text style={{textAlign: 'center'}}>Agendar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          testID={testIDs.agenda.ITEM}
          style={[styles.item, {height: reservation.height}]}
          onPress={() => Alert.alert(reservation.name)}>
          <Text style={{fontSize, color, fontWeight}}>{reservation.name}</Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyItem}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <Text
        style={{
          fontSize: 30,
          color: colors.text,
          textAlign: 'center',
        }}>
        {JSON.stringify(selectedDate)}
      </Text>
      <Agenda
        testID="agenda"
        items={agenda}
        loadItemsForMonth={loadAgenda}
        selected={selectedDate}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={false}
        markingType={'period'}
        monthFormat={'MMMM, yyyy'}
        theme={{
          ...themeCalendar,
          agendaKnobColor: highlightColor,
          agendaTodayColor: themeCalendar.todayTextColor,
          agendaDayNumColor: highlightColor,
          contentStyle: {backgroundColor: colors.background},
        }}
        // reservationsKeyExtractor={reservationsKeyExtractor}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  btnAgendar: {
    marginTop: 30,
    marginBottom: 3,
    backgroundColor: globalColors.ligthBlue,
    borderRadius: 60,
    height: 20,
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 20,
    borderRadius: 30,
    backgroundColor: globalColors.golden,
    borderBottomWidth: 1,
    borderBottomColor: globalColors.white,
    flexDirection: 'row',
  },
  itemHourText: {
    color: globalColors.mainText,
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: globalColors.mainText,
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
});
