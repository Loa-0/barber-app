import {Text, View, Button, Image} from 'react-native';
import {styles as S} from './settingsStyles';
import React from 'react';

const Separator = () => <View style={S.separator} />;

export const ThemeBox = ({title, img, onPress}) => {
  return (
    <View style={S.box}>
      <Text style={S.boxTitle}>{title}</Text>
      <Separator />
      <Image source={img} style={S.boxImg} />
      <Button title="Botón" onPress={onPress} />
    </View>
  );
};
