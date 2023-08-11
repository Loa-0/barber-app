import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {styles as S} from '../theme/AppStyles';
import {HeaderComponent} from '../components/HeaderComponent';
import {EditService} from '../components/services/admin/editService';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/stacknavigator/StackNavigatorAdmin';
import {ThemeContext} from '../context/ThemeContext';

interface Props extends StackScreenProps<RootStackParams, 'editService'> {}

export const EditServicePage = ({navigation, route}: Props) => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);
  return (
    <ScrollView
      style={{
        ...S.globalContainer,
        backgroundColor: colors.background,
      }}>
      <HeaderComponent title="Editar servicio" />
      <EditService navigation={navigation} route={route} />
    </ScrollView>
  );
};
