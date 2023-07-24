import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {styles as S} from './EditProfileStyles';
import {ThemeContext} from '../../context/ThemeContext';

export const EditProfile = () => {
  const {authState} = useContext(AuthContext);
  const {
    themeState: {colors, highlightColor},
  } = useContext(ThemeContext);
  const [userName, setUserName] = useState<string>(authState.userName ?? '');
  const [newPassword, setNewPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');

  const handleNameChange = (input: string) => {
    setUserName(input);
  };
  const handleNewPassChange = (input: string) => {
    setNewPassword(input);
  };
  const handleOldPassChange = (input: string) => {
    setOldPassword(input);
  };

  return (
    <SafeAreaView style={S.safeArea}>
      <ScrollView contentContainerStyle={S.contentContainer}>
        <View style={S.themeContainer}>
          <View style={{width: '90%', marginVertical: 10}}>
            <TextInput
              placeholder="Nombre"
              value={userName}
              onChangeText={handleNameChange}
              placeholderTextColor={colors.text}
              cursorColor={colors.text}
              style={{
                ...S.inputB,
                color: colors.text,
                borderColor: highlightColor,
              }}
            />
            <TextInput
              placeholder="Cambiar contraseña"
              value={userName}
              onChangeText={handleNewPassChange}
              placeholderTextColor={colors.text}
              cursorColor={colors.text}
              secureTextEntry
              style={{
                ...S.inputB,
                color: colors.text,
                borderColor: highlightColor,
              }}
            />
            <View style={S.formInputContainer}>
              <Text style={{color: colors.text}}>Contraseña</Text>
              <View
                style={{
                  ...S.formTextBox,
                  borderColor: colors.border,
                }}>
                <TextInput
                  placeholder="Contraseña original "
                  value={userName}
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
