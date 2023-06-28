import React, {useContext} from 'react';
import {View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ThemeContext} from '../../context/ThemeContext';

export const SocialMedia = () => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);
  return (
    <View style={s.container}>
      <View style={s.socialContainer}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://es-la.facebook.com/UBPeluqueriaYBarberia/',
            );
          }}>
          <FontAwesome5 name="facebook" color={colors.text} size={60} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://www.instagram.com/ulisesvelru/?igshid=MzRlODBiNWFlZA%3D%3D',
            );
          }}>
          <FontAwesome5 name="instagram" color={colors.text} size={60} />
        </TouchableOpacity>
      </View>
      <View style={s.phoneIcon}>
        <TouchableOpacity
          style={s.containerPhoneIcon}
          onPress={() => {
            Linking.openURL('tel:4492091414');
          }}>
          <Text style={{...s.phoneText, color: colors.text}}>
            449-209-14-14
          </Text>
          <FontAwesome5 name="phone" color={colors.text} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  socialContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  phoneIcon: {
    marginTop: 30,
  },
  containerPhoneIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneText: {marginRight: 10, fontSize: 20},
});
