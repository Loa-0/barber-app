import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {styles as S} from '../theme/AppStyles';
import {Divider} from './Divider';
interface Props {
  title: string;
  imageUri?: string;
}
export const HeaderComponent = ({title}: Props) => {
  const uri = require('../assets/backimage1.png');
  return (
    <View style={ScreenStyle.container}>
      <ImageBackground style={ScreenStyle.backImage} source={uri}>
        <View style={S.center}>
          <Text style={S.headerTitle}>{title}</Text>
        </View>
        <Divider />
      </ImageBackground>
    </View>
  );
};

const ScreenStyle = StyleSheet.create({
  backImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  container: {
    height: 100,
  },
});
