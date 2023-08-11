import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {styles as S} from '../theme/AppStyles';
import {HeaderComponent} from '../components/HeaderComponent';
import {ThemeContext} from '../context/ThemeContext';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/stacknavigator/StackNavigatorAdmin';
import {NewService} from '../components/services/admin/newService';

interface Props extends StackScreenProps<RootStackParams, 'newService'> {}

export const NewServicePage = ({navigation, route}: Props) => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);
  return (
    <ScrollView
      style={{
        ...S.globalContainer,
        backgroundColor: colors.background,
      }}>
      <HeaderComponent title="Nuevo servicio" />
      <NewService navigation={navigation} route={route} />
    </ScrollView>
  );
};
