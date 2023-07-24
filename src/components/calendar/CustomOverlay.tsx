import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
interface Props {
  time: number;
  show: boolean;
  datesD: {
    startDate: string;
    endDate: string;
  };
}
export const CustomOverlay = ({time, show, datesD}: Props) => {
  const {
    themeState: {colors, bulletFree},
  } = useContext(ThemeContext);
  return (
    <View
      style={{
        ...styles.overlay,
        height:
          time === 2 ? 10 * time : time === 1 ? 23 : time === 1.5 ? 40 : 20,
        top: time === 2 ? -time : time === 1.5 ? -5 : time === 0.5 ? 4 : 20,
        backgroundColor: bulletFree,
      }}>
      {time <= 1 ? (
        <Text style={{...styles.overlayText, color: colors.text}}>
          {show ? `Reservar de: ${datesD.startDate} a ${datesD.endDate} ` : ''}
        </Text>
      ) : (
        <>
          <Text style={{...styles.overlayText, color: colors.text}}>
            {show ? 'Reservar de:' : ''}
          </Text>
          <Text style={{...styles.overlayText, color: colors.text}}>
            {show ? `${datesD.startDate} a ${datesD.endDate}` : ''}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  overlayText: {
    zIndex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
