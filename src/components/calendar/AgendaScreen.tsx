import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, ToastAndroid} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {HourList} from './HourList';
import Icon from 'react-native-vector-icons/Ionicons';
import {displayDate} from '../../helpers/Date';
import {globalColors} from '../../theme/AppStyles';
import {SelectedHour} from '../../interfaces/Appointments';

interface Props {
  dateCurr: string;
  time: string;
  closeModal: () => void;
}
export const AgendaScreen = ({dateCurr, closeModal, time}: Props) => {
  const {
    themeState: {colors, highlightColor, titleText, bulletFree},
  } = useContext(ThemeContext);
  const [globalSelection, setGlobalSelection] = useState<SelectedHour[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [datesD, setDatesD] = useState({
    startDate: '00:00',
    endDate: '00:00',
  });

  useEffect(() => {
    if (globalSelection.length > 0) {
      setIsDisabled(false);
      setDatesD({
        startDate: globalSelection[0].time,
        endDate: globalSelection[1].time,
      });
    }
  }, [globalSelection]);

  useEffect(() => {
    console.log(datesD);
  }, [datesD]);

  const onConfirm = () => {
    if (isDisabled) {
      ToastAndroid.showWithGravityAndOffset(
        'Selecciona una hora para tu cita',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      return;
    }
  };

  return (
    <View
      style={{
        ...styles.modalContainer,
        backgroundColor: colors.background,
        borderColor: highlightColor,
      }}>
      <>
        <View style={styles.titleContainer}>
          <Text style={{...styles.titleText, color: colors.text}}>
            <>{displayDate(dateCurr)}</>
          </Text>
          <Icon
            name="close-circle"
            size={25}
            onPress={closeModal}
            color={colors.text}
            style={styles.icon}
          />
        </View>
        <View
          style={{
            ...styles.dataContainer,
            backgroundColor: colors.background,
            shadowColor: colors.text,
          }}>
          <View style={styles.dataFirstText}>
            <Text
              style={{
                color: titleText,
              }}>
              Tiempo Aproximado:
            </Text>
            <Text style={{color: colors.text, ...styles.bold}}>{time}</Text>
          </View>
          <Text style={{color: colors.text}}>
            De {datesD.startDate} a {datesD.endDate}
          </Text>
          <Pressable
            style={{...styles.btnConfirm, backgroundColor: bulletFree}}
            onPress={onConfirm}>
            <Text style={{color: globalColors.white}}>Confirmar</Text>
          </Pressable>
        </View>
        <HourList time={1.5} setGSelectedEvents={setGlobalSelection} />
      </>
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '80%',
    marginVertical: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    alignContent: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  titleText: {
    fontSize: 22,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  icon: {right: 10, marginTop: 10, position: 'absolute'},
  dataContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 10,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.34,
    shadowRadius: 1.27,
    elevation: 3,
  },
  dataFirstText: {flexDirection: 'row', marginBottom: 10},
  bold: {
    fontWeight: 'bold',
  },
  btnConfirm: {
    marginTop: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    padding: 10,
  },
});
