import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {styles as S, globalColors} from '../theme/AppStyles';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const backgroundImage = require('../assets/main.png');

interface Props extends StackScreenProps<any, any> {}

export const WelcomeScreen = ({navigation}: Props) => {
  return (
    
    <View style={{...S.globalContainer, ...S.center}}>
      <TouchableOpacity style={pageStyle.container}>
        <Text style={pageStyle.title}>¡Bienvenido!</Text>
      </TouchableOpacity>
     <TouchableOpacity
        style={pageStyle.backgroundImage}
        onPress={() => navigation.navigate('AdminLogin')}>
        <Image source={backgroundImage} style={pageStyle.backgroundImage} />
      </TouchableOpacity>
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

const pageStyle = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    height: 300,
    width: '70%',
  },
  backgroundImage: {
    borderRadius: 50,
    borderWidth: 4,
    width: 350,
    height: 250,
    shadowColor: globalColors.mainBlack,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4.65,
    marginVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
