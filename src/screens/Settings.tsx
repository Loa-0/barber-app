import React, {useContext} from 'react';
import {View} from 'react-native';
import {SettingsDisplay} from '../components/settings/settings';
import {AuthContext} from '../context/AuthContext';
import {Text} from 'react-native-paper';

export const Settings = () => {
  const {authState} = useContext(AuthContext);
  return (
    <View>
      <SettingsDisplay />
      <Text>{JSON.stringify(authState)}</Text>
    </View>
  );
};
