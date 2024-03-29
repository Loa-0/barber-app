import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {ThemeContext} from '../../context/ThemeContext';

import {styles as S} from './settingsStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {globalColors} from '../../theme/AppStyles';

type Props = {mainNav: any};

export const SettingsDisplay = ({mainNav}: Props) => {
  const {
    setDark,
    setLight,
    themeState: {colors, highlightColor, currentTheme, primaryButton},
  } = useContext(ThemeContext);
  const {authState, signOut} = useContext(AuthContext);
  const [theme, setTheme] = useState(currentTheme);

  const handleThemeChange = (selectedTheme: 'light' | 'dark') => {
    setTheme(selectedTheme);
    if (selectedTheme === 'light') {
      setLight();
    } else {
      setDark();
    }
  };

  const handleLogout = async () => {
    signOut();
    mainNav.navigate('Home');
  };

  useEffect(() => {
    handleThemeChange(currentTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTheme]);
  return (
    <SafeAreaView style={S.safeArea}>
      <ScrollView contentContainerStyle={S.contentContainer}>
        <Text style={{...S.subtitleText, color: colors.text}}>
          Preferencias de tema
        </Text>
        <View style={S.themeContainer}>
          <TouchableOpacity
            style={[
              S.themeOption,
              {
                borderColor: theme === 'light' ? highlightColor : colors.border,
              },
            ]}
            onPress={() => {
              handleThemeChange('light');
            }}>
            <Text
              style={{
                ...S.themeText,
                color: theme === 'light' ? highlightColor : colors.text,
              }}>
              <FontAwesome5
                name="cloud-sun"
                size={globalColors.iconSize}
                color={theme === 'light' ? highlightColor : colors.text}
              />{' '}
              Modo claro
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              S.themeOption,
              {
                borderColor: theme === 'dark' ? highlightColor : colors.border,
              },
            ]}
            onPress={() => {
              handleThemeChange('dark');
            }}>
            <Text
              style={{
                ...S.themeText,
                color: theme === 'dark' ? highlightColor : colors.text,
              }}>
              <FontAwesome5
                name="cloud-moon"
                size={globalColors.iconSize}
                color={theme === 'dark' ? highlightColor : colors.text}
              />{' '}
              Modo oscuro
            </Text>
          </TouchableOpacity>
          {authState.isLoggedIn && (
            <TouchableOpacity
              style={{
                backgroundColor: highlightColor,
                borderColor: primaryButton,
                ...S.formLogout,
              }}
              onPress={handleLogout}>
              <Text style={{color: colors.text}}>
                Terminar sesión de administrador
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
