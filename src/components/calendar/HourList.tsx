import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {globalColors} from '../../theme/AppStyles';
import {SelectedHour} from '../../interfaces/Appointments';
import {CustomOverlay} from './CustomOverlay';

type Props = {
  timeEventDuration: number;
  selectedGEvents: SelectedHour[];
  setGSelectedEvents: any;
  datesD: {
    startDate: string;
    endDate: string;
  };
};
export const HourList = ({
  timeEventDuration,
  setGSelectedEvents,
  datesD,
  selectedGEvents,
}: Props) => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number[]>([]);
  // 10 - 20
  const hours: SelectedHour[] = Array.from({length: 21}, (_, index) => {
    const hour = Math.floor(index / 2) + 10;
    const minutes = index % 2 === 0 ? '00' : '30';
    const timeDisp = `${hour}:${minutes}`;
    const foundItem = selectedGEvents.find(
      item => item.timeDisplay === timeDisp,
    );
    return {
      timeDisplay: timeDisp,
      isHourChange: index % 2 === 0,
      index: index,
      toDisplay: foundItem ? true : undefined,
    };
  });
  const toggleSelection = (elem: SelectedHour) => {
    const newIndex = elem.index + timeEventDuration * 2;
    const newIndexes = [];
    if (elem.toDisplay) {
      return;
    }
    for (let i = elem.index; i < newIndex; i++) {
      const existingItem = hours[i];
      if (existingItem && existingItem.toDisplay) {
        ToastAndroid.showWithGravityAndOffset(
          'La reserva interfiere con otro servicio',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          210,
        );
        return; // Si
      }
      newIndexes.push(i);
    }

    setSelectedEventIndex(newIndexes);
    setGSelectedEvents([elem, hours[newIndex]]);
  };

  const renderHour = ({item}: {item: SelectedHour}) => {
    const handlePress = () => {
      if (timeEventDuration <= 0) {
        ToastAndroid.showWithGravityAndOffset(
          'Seleccona los Servicios antes de Reservar',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          210,
        );
        return;
      }
      toggleSelection(item);
    };
    const isSelected = selectedEventIndex.includes(item.index);
    const hourItemStyle = [
      styles.hourItem,
      !item.isHourChange ? styles.hourChange : null,
      isSelected
        ? styles.selectedEvent
        : item.toDisplay
        ? styles.initSelectedEv
        : null,
    ];
    let showCustomOverlay = false;

    if (isSelected && selectedEventIndex.length > 0) {
      if (selectedEventIndex.length <= 2) {
        showCustomOverlay = selectedEventIndex[0] === item.index; // Mostrar para el primer evento seleccionado
      } else {
        const middleIndex = Math.floor(selectedEventIndex.length / 2);
        showCustomOverlay = selectedEventIndex[middleIndex] === item.index; // Mostrar para el evento de enmedio (redondear hacia abajo)
      }
    }
    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.row}>
          <View style={styles.hourItem} key={item.index}>
            <Text style={{color: colors.text}}>{item.timeDisplay}</Text>
          </View>
          <View style={[styles.generalEvent, ...hourItemStyle]}>
            <Text style={{color: colors.text}}>
              {isSelected ? '' : item.toDisplay ? 'Ocupado' : 'Disponible'}
            </Text>
            {isSelected && (
              <CustomOverlay
                datesD={datesD}
                time={timeEventDuration}
                show={showCustomOverlay}
              />
            )}
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
        keyExtractor={item => item.timeDisplay}
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
    backgroundColor: globalColors.bulletFree,
  },
  initSelectedEv: {
    borderBottomWidth: 0,
    height: 40,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderLeftColor: globalColors.golden,
    borderRightColor: globalColors.golden,
    backgroundColor: globalColors.ligthBlue,
  },
  generalEvent: {justifyContent: 'center', alignItems: 'center', flex: 1},
  divider: {borderTopWidth: 1, borderTopColor: globalColors.ligthBlue},
});
