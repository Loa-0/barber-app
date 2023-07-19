import React, {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './loginStyles';
import {useContext, useState} from 'react';
import {ThemeContext} from '../../context/ThemeContext';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/stacknavigator/StackNavigator';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {globalColors} from '../../theme/AppStyles';
import {AdminLogin} from '../../api/http';
import {AuthContext} from '../../context/AuthContext';

interface Props extends StackScreenProps<RootStackParams, 'AdminLogin'> {}
export const LoginAdmin = ({navigation}: Props) => {
  const {
    themeState: {colors, primaryButton, highlightColor},
  } = useContext(ThemeContext);
  const {authState, signIn} = useContext(AuthContext);
  const [userName, setUserName] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const handleSubmit = async () => {
    if (userName === '' || pass === '') {
      return;
    }
    const loginData = {
      userName,
      password: pass,
    };
    try {
      const loggedUser = await AdminLogin(loginData);
      signIn(loggedUser.user, loggedUser.token);
      navigation.navigate('Page1');
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'Credenciales incorrectas',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      console.log(error);
    }
  };

  return (
    <>
      {authState.isLoggedIn ? (
        navigation.replace('Page1')
      ) : (
        <SafeAreaView
          style={{
            ...styles.formContainer,
            backgroundColor: colors.background,
          }}>
          <View style={styles.formTitle}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.goBackArrowPos}>
              <FontAwesome5
                name="chevron-left"
                size={globalColors.iconSize}
                color={colors.text}
              />
            </TouchableOpacity>

            <Text style={{...styles.formTitleText, color: colors.text}}>
              Inicio de sesión
            </Text>
          </View>

          <ScrollView>
            <View>
              <View style={styles.formInputContainer}>
                <Text style={{color: colors.text}}>Nombre de usuario</Text>
                <View
                  style={{
                    ...styles.formTextBox,
                    borderColor: colors.border,
                  }}>
                  <TextInput
                    value={userName}
                    onChangeText={value => setUserName(value)}
                    editable={true}
                    cursorColor={colors.text}
                    style={{color: colors.text}}
                  />
                </View>
              </View>
              <View style={styles.formInputContainer}>
                <Text style={{color: colors.text}}>Contraseña</Text>
                <View
                  style={{
                    ...styles.formTextBox,
                    borderColor: colors.border,
                  }}>
                  <TextInput
                    value={pass}
                    onChangeText={value => setPass(value)}
                    editable={true}
                    cursorColor={colors.text}
                    style={{color: colors.text}}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: highlightColor,
                borderColor: primaryButton,
                ...styles.formSubmitBtn,
              }}
              onPress={handleSubmit}>
              <Text style={{color: colors.text}}>
                Iniciar sesión de administrador
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: primaryButton,
                borderColor: highlightColor,
                ...styles.notAdminBtn,
              }}
              onPress={() => navigation.goBack()}>
              <Text style={{color: colors.text}}>
                ¿No eres administrador? Vuelve a la pantalla principal
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};
