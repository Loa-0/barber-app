import React, {useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ThemeContext} from '../../context/ThemeContext';

export const MapsImage = () => {
  const backgroundImage = require('../../assets/mapsImage.png');
  const {
    themeState: {colors, highlightColor},
  } = useContext(ThemeContext);
  return (
    <View style={styles.mainC}>
      <View style={styles.textContainer}>
        <FontAwesome5 name="map-marker-alt" color={colors.text} size={25} />
        <Text style={{...styles.textDisplay, color: colors.text}}>
          Ubicacion:
        </Text>
      </View>
      <TouchableOpacity
        style={{}}
        onPress={() => {
          Linking.openURL('https://goo.gl/maps/hY5ZzgRUv9Nf7X9P8');
        }}>
        <Image
          source={backgroundImage}
          style={{...styles.imageS, borderColor: highlightColor}}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  mainC: {flex: 1, marginVertical: 20},
  textContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDisplay: {
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 20,
  },
  imageS: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    borderWidth: 1,
  },
});
