import React, {useContext} from 'react';
import {styles as S} from '../theme/AppStyles';
import {HeaderComponent} from '../components/HeaderComponent';
import {ThemeContext} from '../context/ThemeContext';
import {AdminServicesView} from '../components/services/adminServices';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}
export const AdminServicesPage = ({navigation, route}: Props) => {
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
      <AdminServicesView navigation={navigation} route={route} />
    </SafeAreaView>
  );
};
