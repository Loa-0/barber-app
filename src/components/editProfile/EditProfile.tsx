import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {styles as S} from './EditProfileStyles';
import {ThemeContext} from '../../context/ThemeContext';
import {globalColors} from '../../theme/AppStyles';
import {EditAdmin} from '../../api/http';
import {UserUpdateInterface} from '../../interfaces/user';
import {Loader} from '../common/Loader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

export const EditProfile = () => {
  const {authState, signIn} = useContext(AuthContext);
  const {
    themeState: {colors, highlightColor, primaryButton},
  } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(authState.userName ?? '');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [showChangePass, setShowChangePass] = useState<boolean>(false);
  const [showDiffPassError, setShowDiffPassError] = useState<boolean>(false);
  const [showGoodPass, setShowGoodPass] = useState<boolean>(false);

  const reset = () => {
    setUserName(authState.userName ?? '');
    setNewPassword('');
    setConfirmPass('');
    setOldPassword('');
    setShowDiffPassError(false);
    setShowChangePass(false);
    setShowGoodPass(false);
  };

  useEffect(() => {
    if (newPassword !== '') {
      setShowChangePass(true);
    } else {
      setShowChangePass(false);
      setConfirmPass('');
      setShowGoodPass(false);
    }
  }, [newPassword]);

  useEffect(() => {
    if (confirmPass !== newPassword && newPassword !== '') {
      setShowDiffPassError(true);
      setShowGoodPass(false);
    } else {
      setShowDiffPassError(false);
      setShowGoodPass(true);
    }
  }, [confirmPass, newPassword]);

  const handleNameChange = (input: string) => {
    setUserName(input);
  };
  const handleNewPassChange = (input: string) => {
    setNewPassword(input);
  };
  const handleOldPassChange = (input: string) => {
    setOldPassword(input);
  };
  const handleConfirmPassChange = (input: string) => {
    setConfirmPass(input);
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      'Advertencia',
      '¿Esta seguro que desea actualizar su perfil?',
      [
        {
          text: 'Actualizar',
          onPress: () => {
            handleSubmit();
          },
        },
        {
          text: 'Cancelar',
        },
      ],
    );
  };
  const validateSubmit = () => {
    if (showDiffPassError) {
      ToastAndroid.showWithGravityAndOffset(
        'Error: Las contraseñas no coinciden',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      return false;
    }
    if (userName === '') {
      ToastAndroid.showWithGravityAndOffset(
        'Error: nombre de usuario no valido',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      return false;
    }
    if (oldPassword === '') {
      ToastAndroid.showWithGravityAndOffset(
        'Error: se requiere confirmar con la contraseña original',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      return false;
    }
    if (newPassword === oldPassword && newPassword) {
      ToastAndroid.showWithGravityAndOffset(
        'Error: La contraseña nueva no puede ser la misma que la anterior',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validateSubmit()) {
      return;
    }
    const userUpdate: UserUpdateInterface = {
      newUserName: userName,
      oldpassword: oldPassword,
      newPassword: newPassword,
    };
    try {
      const editedUser = await EditAdmin(userUpdate, authState.userName ?? '');
      signIn(editedUser.user, editedUser.token);
      ToastAndroid.showWithGravityAndOffset(
        'Usuario actualizado',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      setIsLoading(false);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToastAndroid.showWithGravityAndOffset(
          error.response ? error.response.data : 'error',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          210,
        );
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Error al actualizar usuario',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          210,
        );
      }

      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={S.safeArea}>
      <ScrollView contentContainerStyle={S.contentContainer}>
        <View style={S.themeContainer}>
          <View style={S.formInputContainer}>
            <Text style={{...S.subtitleText, color: colors.text}}>
              Editar usuario administrador
            </Text>
            <Text style={{color: colors.text}}>Nombre de usuario</Text>
            <View
              style={{
                ...S.formTextBox,
                borderColor: colors.border,
              }}>
              <TextInput
                placeholder="Usuario"
                value={userName}
                onChangeText={handleNameChange}
                placeholderTextColor={colors.text}
                cursorColor={colors.text}
                style={{
                  color: colors.text,
                }}
              />
            </View>
          </View>

          <View style={S.formInputContainer}>
            <Text style={{color: colors.text}}>Cambiar contraseña</Text>
            <View
              style={{
                ...S.formTextBox,
                borderColor: colors.border,
              }}>
              <TextInput
                value={newPassword}
                onChangeText={handleNewPassChange}
                placeholderTextColor={colors.text}
                cursorColor={colors.text}
                secureTextEntry
                style={{
                  color: colors.text,
                }}
              />
            </View>
          </View>

          {showChangePass && (
            <View style={S.formInputContainer}>
              <Text style={{color: colors.text}}>
                Vuelva a escribir su contraseña nueva{'  '}
                {showGoodPass && (
                  <FontAwesome5
                    name="check-circle"
                    color={highlightColor}
                    size={globalColors.iconSize}
                  />
                )}
              </Text>
              <View
                style={{
                  ...S.formTextBox,
                  borderColor: showDiffPassError
                    ? globalColors.disabledRed
                    : colors.border,
                }}>
                <TextInput
                  value={confirmPass}
                  onChangeText={handleConfirmPassChange}
                  placeholderTextColor={colors.text}
                  cursorColor={colors.text}
                  secureTextEntry
                  style={{
                    color: colors.text,
                  }}
                />
              </View>
              {showDiffPassError && (
                <Text style={S.diffPassError}>
                  Las contraseñas no coinciden
                </Text>
              )}
            </View>
          )}

          <View style={S.formInputContainer}>
            <Text style={{color: colors.text}}>
              Confirmar cambios con la contraseña orignal
            </Text>
            <View
              style={{
                ...S.formTextBox,
                borderColor: colors.border,
              }}>
              <TextInput
                value={oldPassword}
                onChangeText={handleOldPassChange}
                placeholderTextColor={colors.text}
                cursorColor={colors.text}
                secureTextEntry
                style={{
                  color: colors.text,
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{
              ...S.newButton,
              backgroundColor: highlightColor,
              borderColor: primaryButton,
            }}
            onPress={showConfirmDialog}>
            {!isLoading ? (
              <Text style={{color: colors.text}}>Guardar cambios</Text>
            ) : (
              <Loader />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...S.newButton,
              backgroundColor: primaryButton,
              borderColor: highlightColor,
            }}
            onPress={reset}>
            <Text style={{color: colors.text}}>Descartar cambios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
