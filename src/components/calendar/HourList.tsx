import React, {useContext, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {globalColors} from '../../theme/AppStyles';
import {SelectedHour} from '../../interfaces/Appointments';

type Props = {
  time: number;
  selectedGEvents?: SelectedHour[];
  setGSelectedEvents: any;
};
export const HourList = ({time, setGSelectedEvents}: Props) => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number[]>([]);
  // 10 - 20
  const hours: SelectedHour[] = Array.from({length: 21}, (_, index) => {
    const hour = Math.floor(index / 2) + 10;
    const minutes = index % 2 === 0 ? '00' : '30';
    return {
      time: `${hour}:${minutes}`,
      isHourChange: index % 2 === 0,
      index: index,
    };
  });

  const toggleSelection = (elem: SelectedHour) => {
    const newIndex = elem.index + time * 2;
    const newIndexes = [];
    for (let index = elem.index; index < newIndex; index++) {
      newIndexes.push(index);
    }
    setSelectedEventIndex(newIndexes);
    setGSelectedEvents([elem, hours[newIndex]]);
  };

  const renderHour = ({item}: {item: SelectedHour}) => {
    const handlePress = () => {
      toggleSelection(item);
    };
    const isSelected = selectedEventIndex.includes(item.index);
    const hourItemStyle = [
      styles.hourItem,
      !item.isHourChange ? styles.hourChange : null,
      isSelected ? styles.selectedEvent : null,
    ];

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.row}>
          <View style={styles.hourItem} key={item.index}>
            <Text style={{color: colors.text}}>{item.time}</Text>
          </View>
          <View style={[styles.generalEvent, ...hourItemStyle]}>
            <Text style={{color: colors.text}}>{item.index}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{...styles.container}}>
      <FlatList
        data={hours}
        ListHeaderComponent={<View style={styles.divider} />}
        keyExtractor={item => item.time}
        renderItem={renderHour}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 2,
  },
  hourItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  hourChange: {
    borderBottomWidth: 2,
  },
  row: {flexDirection: 'row'},
  selectedEvent: {
    borderBottomWidth: 0,
    height: 40,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderLeftColor: globalColors.blueSelected,
    borderRightColor: globalColors.blueSelected,
  },
  generalEvent: {justifyContent: 'center', alignItems: 'center', flex: 1},
  divider: {borderTopWidth: 1, borderTopColor: globalColors.ligthBlue},
});
