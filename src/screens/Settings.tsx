import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {styles as S} from '../theme/AppStyles';
import {SettingsDisplay} from '../components/settings/settings';
import {HeaderComponent} from '../components/HeaderComponent';
import {ThemeContext} from '../context/ThemeContext';
import {AccountDisplay} from '../components/sesion/AccountDisplay';

type Props = {
  mainNav: any;
};
export const Settings = ({mainNav}: Props) => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);
  return (
    <ScrollView
      style={{
        ...S.globalContainer,
        backgroundColor: colors.background,
      }}>
      <HeaderComponent title="Configuración" />
      <AccountDisplay />
      <SettingsDisplay mainNav={mainNav} />
    </ScrollView>
  );
};
