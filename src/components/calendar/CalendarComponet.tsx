/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {ListEvent} from './ListEvent';
import {View, Text} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {SelectedServices} from './SelectedServices';

export const CalendarComponent = () => {
  const {
    themeState: {colors, bulletFree, highlightColor, bulletOcupied},
  } = useContext(ThemeContext);

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        <Text style={{color: colors.text, marginBottom: 10}}>
          Disponibilidad
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginHorizontal: 20,
          }}>
          <>
            <View
              style={{
                borderRadius: 100,
                backgroundColor: bulletOcupied,
                marginHorizontal: 10,
                height: 30,
                width: 30,
              }}
            />
            <Text style={{color: colors.text}}>Baja</Text>
          </>
          <>
            <View
              style={{
                borderRadius: 100,
                marginHorizontal: 10,
                backgroundColor: highlightColor,
                height: 30,
                width: 30,
              }}
            />
            <Text style={{color: colors.text}}>Media</Text>
          </>
          <>
            <View
              style={{
                borderRadius: 100,
                backgroundColor: bulletFree,
                marginHorizontal: 10,
                height: 30,
                width: 30,
              }}
            />
            <Text style={{color: colors.text}}>Alta</Text>
          </>
        </View>
      </View>
      <ListEvent />
      <SelectedServices />
      <View style={{marginBottom: 50}} />
    </>
  );
};
