import React, {useContext} from 'react';
import {styles as S} from '../theme/AppStyles';
import {HeaderComponent} from '../components/HeaderComponent';
import {ThemeContext} from '../context/ThemeContext';
import {EditServicesView} from '../components/services/editServices';
import {SafeAreaView} from 'react-native-safe-area-context';

export const EditServices = () => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);
  return (
    <SafeAreaView
      style={{
        ...S.globalContainer,
        backgroundColor: colors.background,
      }}>
      <HeaderComponent title="Editar servicios" />
      <EditServicesView />
    </SafeAreaView>
  );
};
