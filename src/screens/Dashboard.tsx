import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  Linking,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {globalColors} from '../theme/AppStyles';

const backgroundImage = require('../assets/fondo.jpg');

interface Props extends StackScreenProps<any, any> {}

export const Dashboard = ({}: Props) => {
  const handleWebsitePress = () => {
    Linking.openURL('https://ulisesbarber.negocio.site');
  };

  const handleFacebookPress = () => {
    Linking.openURL('https://es-la.facebook.com/UBPeluqueriaYBarberia/');
  };

  const handleInstagramPress = () => {
    Linking.openURL(
      'https://www.instagram.com/ulisesvelru/?igshid=MzRlODBiNWFlZA%3D%3D',
    );
  };
import {styles as S} from '../theme/AppStyles';
import {HeaderComponent} from '../components/HeaderComponent';
import {ThemeContext} from '../context/ThemeContext';
import {Text} from 'react-native-paper';

  return (
    <ScrollView
      style={{
        ...S.globalContainer,
        backgroundColor: colors.background,
      }}>
      <HeaderComponent title="Inicio" />
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            <FontAwesome5
              name="cut"
              color={'#333333'}
              size={globalColors.iconSize}
            />
            Ulises Barber
            <FontAwesome5
              name="cut"
              color={'#333333'}
              size={globalColors.iconSize}
            />
          </Text>
          <Text style={styles.text}>
            Encuéntranos en nuestras redes sociales
          </Text>
          <Text style={styles.text}>
            <FontAwesome5
              onPress={handleFacebookPress}
              accessibilityRole="link"
              href="https://es-la.facebook.com/UBPeluqueriaYBarberia/"
              name="facebook"
              color={'#0000FF'}
              size={globalColors.iconSize}
            />
            Ulises Barber Peluqueria & Barberia
          </Text>
          <Text style={styles.text}>
            <FontAwesome5
              onPress={handleInstagramPress}
              accessibilityRole="link"
              href="https://www.instagram.com/ulisesvelru/?igshid=MzRlODBiNWFlZA%3D%3D"
              name="instagram"
              color={'#333333'}
              size={globalColors.iconSize}
            />
            ulisesvelru
          </Text>
          <Text style={styles.text}>
            <FontAwesome5
              name="phone-volume"
              color={'#1C754C'}
              size={globalColors.iconSize}
            />
            Citas al: 4492091414
          </Text>
          <Text
            style={styles.text}
            onPress={handleWebsitePress}
            accessibilityRole="link"
            href="https://ulisesbarber.negocio.site">
            <FontAwesome5
              name="internet-explorer"
              color={'#ADD8E6'}
              size={globalColors.iconSize}
            />
            ulisesbarber.negocio.site
          </Text>
        </View>
      </ImageBackground>
    </ScrollView>
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
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)', // Rectángulo transparente (30% de opacidad)
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: {
    color: '#333333',
    marginTop: 19,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
