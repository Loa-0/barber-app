import React, {useContext, useState} from 'react';
import {StyleSheet, ScrollView, Linking, View, Text, TouchableOpacity} from 'react-native';
import {styles as S, globalColors} from '../theme/AppStyles';
import {ThemeContext} from '../context/ThemeContext';
import {DisplayInfoDashboard} from '../components/dashboard/DisplayInfoDashboard';
import {SocialMedia } from '../components/dashboard/SocialMedia';
import {MapsImage} from '../components/dashboard/MapsImage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const Dashboard = ({navigation}: any) => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);

  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleToggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };
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

  return (
    <ScrollView
      style={{
        ...S.globalContainer,
        backgroundColor: colors.background,
      }}>
      <DisplayInfoDashboard navigation={navigation} />
      <SocialMedia />
      <MapsImage />
      {/* Botón desplegable */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={handleToggleContent}>
        <Text style={{...styles.toggleButtonText, color: colors.text}}>
          {isContentVisible ? (<FontAwesome5
              name="caret-down"
              color={colors.text}
              size={globalColors.iconSize}
            />
          ) : (
            <FontAwesome5
              name="caret-right"
              color={colors.text}
              size={globalColors.iconSize}
            />
          )}
          {'  '}Preguntas frecuentes
        </Text>
      </TouchableOpacity>

      {/* Contenido adicional */}
      {isContentVisible && (
        <View
          style={{
            ...styles.additionalContent,
          }}>
          {/* Aquí colocas el contenido adicional que se mostrará al hacer clic en el botón */}
          <Text style={{...styles.Preguntas, color: colors.text}}>
            ¿Cómo puedo reservar?
          </Text>
          <Text style={{...styles.Resouestas, color: colors.text}}>
            Para reservar entra al apartado de servicios, selecciona los
            servicios que deseas tomar(recuerda que no puedes reservar mas de
            dos horas), oprime el boton de servicios y en el calendario
            selecciona fecha y hora. Recuerda que debes iniciar sesion en Google
          </Text>

          <Text style={{...styles.Preguntas, color: colors.text}}>
            ¿Cómo puedo cambiar o cancelar una reservación?
          </Text>
          <Text style={{...styles.Resouestas, color: colors.text}}>
            Para cancelar o cambiar una cita ponte en contacto con la barberia
            en el telefono 449-209-14-14
          </Text>

          <Text style={{...styles.Preguntas, color: colors.text}}>
            ¿Cuales son las formas de pago?
          </Text>
          <Text style={{...styles.Resouestas, color: colors.text}}>
            El pago de tu servicio será en efectivo en el establecimiento
          </Text>

          <Text style={{...styles.Preguntas, color: colors.text}}>
            ¿Por que no puedo agendar en un fecha especifica?
          </Text>
          <Text style={{...styles.Resouestas, color: colors.text}}>
            Cada día tiene un limite de citas por favor intente con una fecha
            diferente
          </Text>
          <Text style={{...styles.Preguntas, color: colors.text}}>
            ¿Como puedo saber el costo total de mi futura cita?
          </Text>
          <Text style={{...styles.Resouestas, color: colors.text}}>
            Cuando terminas de seleccionar tus servcios, presiona el botón de
            servicios y en la sección de citas veras el costo y tiempo total de
            los servicios que desa agendar
          </Text>
        </View>
      )}
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
  toggleButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalContent: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  Resouestas: {
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 30,
    textAlign: 'justify',
  },
  Preguntas: {
    textAlign: 'justify',
    fontWeight: 'bold',
  },
});
