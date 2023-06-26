import React from 'react';
import {ScrollView} from 'react-native';
import {styles as S} from '../theme/AppStyles';
import {HeaderComponent} from '../components/HeaderComponent';
import {EditService} from '../components/services/editService';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/stacknavigator/StackNavigatorAdmin';

interface Props extends StackScreenProps<RootStackParams, 'editService'> {}

export const EditServicePage = ({navigation, route}: Props) => {
  return (
    <ScrollView
      style={{
        ...S.globalContainer,
      }}>
      <HeaderComponent title="Editar servicio" />
      <EditService navigation={navigation} route={route} />
    </ScrollView>
  );
};
