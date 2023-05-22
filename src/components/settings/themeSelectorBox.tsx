import {Text, View, Button, Image, ImageSourcePropType} from 'react-native';
import {styles as S} from './settingsStyles';
import React from 'react';

const Separator = () => <View style={S.separator} />;

type ThemeBoxProps = {
  title: string;
  img: ImageSourcePropType;
  onPress: () => any;
};

export const ThemeBox = ({title, img, onPress}: ThemeBoxProps) => {
  return (
    <View style={S.box}>
      <Text style={S.boxTitle}>{title}</Text>
      <Separator />
      <Image source={img} style={S.boxImg} />
      <Button title="Botón" onPress={onPress} />
    </View>
  );
};
