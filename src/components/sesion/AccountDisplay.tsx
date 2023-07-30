import React, {useContext} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {GoogleAuth} from './GoogleAuth';
import {AuthContext} from '../../context/AuthContext';
import {StyleSheet} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';

export const AccountDisplay = () => {
  const {clientUserState} = useContext(AuthContext);
  const {
    themeState: {colors},
  } = useContext(ThemeContext);

  const imageUri =
    clientUserState.photo.length > 0 ? clientUserState.photo : null;
  return (
    <View style={styles.container}>
      {clientUserState.isClientLogged && (
        <View
          style={{
            ...styles.formContainer,
          }}>
          {imageUri && (
            <View style={styles.formImageContainer}>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: imageUri,
                  }}
                  style={{
                    ...styles.formImage,
                    borderColor: colors.text,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={{...styles.formTitle, borderColor: colors.text}}>
            <Text style={{...styles.formTitleText, color: colors.text}}>
              {clientUserState.email}
            </Text>
          </View>
        </View>
      )}

      <GoogleAuth />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 25, // Opcional: para imágenes redondeadas
    borderWidth: 1, // Ancho del borde
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 22,
    resizeMode: 'cover',
  },
  formTitle: {
    marginHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  formTitleText: {
    fontSize: 22,
    textShadowOffset: {width: 1, height: 1}, // Desplazamiento del borde
    textShadowRadius: 1,
  },
  formImageContainer: {
    alignItems: 'center',
    marginVertical: 22,
  },
  formImage: {
    height: 100,
    width: 100,
    borderRadius: 85,
    borderWidth: 2,
  },
});
