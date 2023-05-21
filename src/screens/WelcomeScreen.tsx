import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  // ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

// const backgroundImage = require('../assets/main.jpg');

interface Props extends StackScreenProps<any, any> {}

export const WelcomeScreen = ({navigation}: Props) => {
  return (
    <View style={styles.backgroundColor}>
      {/* <ImageBackground source={backgroundImage} style={styles.backgroundImage}> */}
      <Text>Hola Chiooooo</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Page1', {id: 1, nombre: 'Uriel'});
        }}
        // title="Learn More"
        // color="#841584"
        style={{backgroundColor: '#841584'}}
        accessibilityLabel="Learn more about this purple button">
        <Text>Inicio</Text>
      </TouchableOpacity>
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    marginVertical: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundColor: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
