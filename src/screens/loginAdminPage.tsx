import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {styles as S} from '../theme/AppStyles';
import {HeaderComponent} from '../components/HeaderComponent';
import {ThemeContext} from '../context/ThemeContext';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/stacknavigator/StackNavigator';
import {LoginAdmin} from '../components/login/login';

interface Props extends StackScreenProps<RootStackParams, 'AdminLogin'> {}

export const LoginAdminPage = ({navigation, route}: Props) => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);
  return (
    <ScrollView
      style={{
        ...S.globalContainer,
        backgroundColor: colors.background,
      }}>
      <HeaderComponent title="Inicio de sesión" />
      <LoginAdmin navigation={navigation} route={route} />
    </ScrollView>
  );
};
