import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {styles} from '../../theme/AppStyles';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/stacknavigator/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'Pagina1'> {}

export const Page1 = ({route, navigation}: Props) => {
  const {id, nombre} = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: nombre,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.globalMargin}>
      <Text>Page1 {id}</Text>
    </View>
  );
};
