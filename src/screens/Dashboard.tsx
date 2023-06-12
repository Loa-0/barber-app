import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {styles as S} from '../theme/AppStyles';
import {HeaderComponent} from '../components/HeaderComponent';
import {ThemeContext} from '../context/ThemeContext';
import {Text} from 'react-native-paper';

export const Dashboard = () => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);
  return (
    <ScrollView
      style={{
        ...S.globalContainer,
        backgroundColor: colors.background,
      }}>
      <HeaderComponent title="Inicio" />
      <Text>Inicio</Text>
    </ScrollView>
  );
};
