import React, {useContext, useEffect, useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {styles as S} from './settingsStyles';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {globalColors} from '../../theme/AppStyles';
import {ThemeContext} from '../../context/ThemeContext';

export const SettingsDisplay = () => {
  const {
    setDark,
    setLight,
    themeState: {colors, highlightColor, currentTheme},
  } = useContext(ThemeContext);
  const [theme, setTheme] = useState(currentTheme);

  const handleThemeChange = (selectedTheme: 'light' | 'dark') => {
    setTheme(selectedTheme);
    if (selectedTheme === 'light') {
      setLight();
    } else {
      setDark();
    }
  };

  useEffect(() => {
    handleThemeChange(currentTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTheme]);
  return (
    <View style={{...S.container, backgroundColor: colors.background}}>
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
                  borderColor:
                    theme === 'light' ? highlightColor : colors.border,
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
                  borderColor:
                    theme === 'dark' ? highlightColor : colors.border,
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
