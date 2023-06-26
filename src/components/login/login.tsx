import React, {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
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

interface Props extends StackScreenProps<RootStackParams, 'AdminLogin'> {}
export const LoginAdmin = ({navigation}: Props) => {
  const {
    themeState: {colors, primaryButton, highlightColor},
  } = useContext(ThemeContext);
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  return (
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
            <Text style={{color: colors.text}}>Email</Text>
            <View
              style={{
                ...styles.formTextBox,
                borderColor: colors.border,
              }}>
              <TextInput
                value={email}
                onChangeText={value => setEmail(value)}
                editable={true}
                cursorColor={colors.text}
                style={{color: colors.text}}
              />
            </View>
          </View>
          <View style={styles.formInputContainer}>
            <Text style={{color: colors.text}}>Nombre</Text>
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
          }}>
          <Text style={{color: colors.text}}>
            Iniciar sesión de administrador
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: primaryButton,
            borderColor: highlightColor,
            ...styles.notAdminBtn,
          }}>
          <Text style={{color: colors.text}}>
            ¿No eres administrador? Vuelve a la pantalla principal
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
