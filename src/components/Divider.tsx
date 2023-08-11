import React from 'react';
import {StyleSheet, View} from 'react-native';
import {globalColors} from '../theme/AppStyles';

type DividerProps = {
  heig?: number;
};
export const Divider = ({heig = 5}: DividerProps) => {
  return <View style={{...styles.container, height: heig}} />;
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: globalColors.golden,
    height: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
