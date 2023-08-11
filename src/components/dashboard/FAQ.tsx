import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {globalColors} from '../../theme/AppStyles';

export const FAQ = () => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);

  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleToggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={handleToggleContent}>
        <Text style={{...styles.toggleButtonText, color: colors.text}}>
          {isContentVisible ? (
            <FontAwesome5
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
          Preguntas frecuentes
        </Text>
      </TouchableOpacity>

      {isContentVisible && (
        <View
          style={{
            ...styles.additionalContent,
          }}>
          {/* Aquí colocas el contenido adicional que se mostrará al hacer clic en el botón */}
          <Text style={{...styles.Preguntas, color: colors.text}}>
            ¿Cómo puedo reservar?
          </Text>
          <Text style={{...styles.Respuestas, color: colors.text}}>
            Para reservar entra al apartado de servicios, selecciona los
            servicios que deseas tomar(recuerda que no puedes reservar mas de
            dos horas), oprime el boton de servicios y en el calendario
            selecciona fecha y hora. Recuerda que debes iniciar sesion en Google
          </Text>

          <Text style={{...styles.Preguntas, color: colors.text}}>
            ¿Cómo puedo cambiar o cancelar una reservación?
          </Text>
          <Text style={{...styles.Respuestas, color: colors.text}}>
            Para cancelar o cambiar una cita ponte en contacto con la barberia
            en el telefono 449-209-14-14
          </Text>

          <Text style={{...styles.Preguntas, color: colors.text}}>
            ¿Cuales son las formas de pago?
          </Text>
          <Text style={{...styles.Respuestas, color: colors.text}}>
            El pago de tu servicio será en efectivo en el establecimiento
          </Text>

          <Text style={{...styles.Preguntas, color: colors.text}}>
            ¿Por que no puedo agendar en un fecha especifica?
          </Text>
          <Text style={{...styles.Respuestas, color: colors.text}}>
            Cada día tiene un limite de citas por favor intente con una fecha
            diferente
          </Text>
          <Text style={{...styles.Preguntas, color: colors.text}}>
            ¿Como puedo saber el costo total de mi futura cita?
          </Text>
          <Text style={{...styles.Respuestas, color: colors.text}}>
            Cuando terminas de seleccionar tus servcios, presiona el botón de
            servicios y en la sección de citas veras el costo y tiempo total de
            los servicios que desa agendar
          </Text>
        </View>
      )}
      <View style={styles.end} />
    </>
  );
};

const styles = StyleSheet.create({
  end: {
    marginBottom: 50,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  additionalContent: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  Respuestas: {
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
