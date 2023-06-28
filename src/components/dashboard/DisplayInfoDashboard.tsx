import React, {useContext} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {Text} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
const manBar = require('../../assets/manBar.png');

export const DisplayInfoDashboard = ({navigation}: any) => {
  const {
    themeState: {colors, primaryButton, highlightColor},
  } = useContext(ThemeContext);
  return (
    <View
      style={{
        ...styles.mainContainer,
      }}>
      <View
        style={{
          ...styles.imageContainer,
        }}>
        <Image
          source={manBar}
          style={{aspectRatio: 2 / 1.9, height: 350, borderRadius: 20}}
        />
      </View>
      <TouchableOpacity
        style={{
          ...styles.newButton,
          backgroundColor: primaryButton,
          borderColor: highlightColor,
        }}
        onPress={() => {
          navigation.navigate('Services');
        }}>
        <Text style={{...styles.newButtonText, color: colors.text}}>
          Reservar
        </Text>
      </TouchableOpacity>
      <View
        style={{
          ...styles.mainContainer,
          marginVertical: 20,
        }}>
        <Text
          style={{
            ...styles.headligth,
            color: highlightColor,
            shadowColor: colors.text,
          }}>
          Acerca de Nosotros
        </Text>
        <View
          style={{
            ...styles.mainTextContainer,
          }}>
          <View style={styles.textContainer}>
            <Text
              style={{
                color: colors.text,
                ...styles.textDisplay,
              }}>
              Ulises Barber es el lugar ideal para relajarte y lucir bien.
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                color: colors.text,
                ...styles.textDisplay,
              }}>
              Nuestra atención personalizada y servicios de calidad garantizan
              una experiencia única.
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                color: colors.text,
                ...styles.textDisplay,
              }}>
              Permítenos transformar tu estilo y dejarte con una apariencia
              impecable.
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                color: colors.text,
                ...styles.textDisplay,
              }}>
              Compruébalo por ti mismo reservando tu cita.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 350,
    borderRadius: 20,
  },
  newButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderBottomWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    marginVertical: 5,
    marginLeft: 16,
  },
  newButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  headligth: {
    fontSize: 30,
    fontWeight: 'bold',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  mainTextContainer: {
    marginHorizontal: 50,
  },
  textContainer: {marginTop: 20},
  textDisplay: {
    textAlign: 'center',
    fontSize: 14,
  },
  grad: {
    backgroundColor:
      'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%)',
  },
});
