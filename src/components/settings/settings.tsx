import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {styles as S} from './settingsStyles';
import {ThemeBox} from './themeSelectorBox';
import {ScrollView} from 'react-native-gesture-handler';
// import {styles} from '../../theme/AppStyles';

const Separator = () => <View style={S.separator} />;

export const SettingsDisplay = () => {
  return (
    <SafeAreaView style={S.mainViewBlock}>
      <ScrollView>
        <Text style={S.subtitleText}>Preferencias de tema</Text>
        <Separator />
        <View style={S.container}>
          <ThemeBox
            title="Modo día"
            img={require('../../assets/main.jpg')}
            onPress={() => console.log('Botón del cuadro 1 presionado')}
          />
          <ThemeBox
            title="Modo noche"
            img={require('../../assets/main.jpg')}
            onPress={() => console.log('Botón del cuadro 2 presionado')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
