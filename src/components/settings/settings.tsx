import React, {useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {styles as S} from './settingsStyles';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {globalColors} from '../../theme/AppStyles';

const Separator = () => <View style={S.separator} />;

export const SettingsDisplay = () => {
  const [theme, setTheme] = useState('dark');

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };
  return (
    <View style={S.container}>
      <SafeAreaView style={S.safeArea}>
        <ScrollView contentContainerStyle={S.contentContainer}>
          <Text style={S.subtitleText}>Preferencias de tema</Text>
          <Separator />
          <View style={S.themeContainer}>
            <TouchableOpacity
              style={[
                S.themeOption,
                theme === 'light' && S.selectedThemeOption,
              ]}
              onPress={() => handleThemeChange('light')}>
              <Text style={S.themeText}>
                <FontAwesome5
                  name="cloud-sun"
                  size={globalColors.iconSize}
                  color={
                    theme === 'light'
                      ? globalColors.golden
                      : globalColors.mainText
                  }
                />{' '}
                Modo claro
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[S.themeOption, theme === 'dark' && S.selectedThemeOption]}
              onPress={() => handleThemeChange('dark')}>
              <Text style={S.themeText}>
                <FontAwesome5
                  name="cloud-moon"
                  size={globalColors.iconSize}
                  color={
                    theme === 'dark'
                      ? globalColors.golden
                      : globalColors.mainText
                  }
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
