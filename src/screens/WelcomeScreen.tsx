import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {styles as S} from '../theme/AppStyles';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const backgroundImage = require('../assets/main.png');

interface Props extends StackScreenProps<any, any> {}

export const WelcomeScreen = ({navigation}: Props) => {
  return (
    <View style={{...S.globalContainer, ...S.center}}>
      <Image source={backgroundImage} style={styles.backgroundImage} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Page1', {id: 1, nombre: 'Uriel'});
        }}
        style={S.mainBtn}
        activeOpacity={0.9}>
        <Text style={S.textBtn}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
