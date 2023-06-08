import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  // ImageBackground,
  Text,
  View,
} from 'react-native';

// const backgroundImage = require('../assets/main.jpg');

interface Props extends StackScreenProps<any, any> {}

export const Dashboard = ({}: Props) => {
  return (
    <View style={styles.backgroundColor}>
      {/* <ImageBackground source={backgroundImage} style={styles.backgroundImage}> */}
      <Text>Ulises Barber</Text>
      <Text>Encuentranos en nuestras redes sociales</Text>
      <Text>Fb:Ulises Barber Peluqueria & Barberia</Text>
      <Text>Ig: Barbervelru</Text>
      <Text>Citas al: 4492091414</Text>
      <Text>Pagina web: ulisesbarber.negocio.site</Text>
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
    backgroundColor: '#000000',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
