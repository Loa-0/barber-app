/* eslint-disable react-native/no-inline-styles */
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useContext} from 'react';
import {ListEvent} from './ListEvent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../context/AuthContext';
import {globalColors} from '../../theme/AppStyles';
import {View, Text, StyleSheet} from 'react-native';

export const CalendarComponent = () => {
  const {signIn, authState, signOut} = useContext(AuthContext);

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/calendar'],
    webClientId:
      '685556051749-94tc9vnciflm619semreu9msgv160cvv.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
  return (
    <>
      <ListEvent />
      <View style={{marginVertical: 20}}>
        <Text style={{color: globalColors.mainText}}>Hoola</Text>
        {authState.isLoggedIn ? (
          <TouchableOpacity
            onPress={() => {
              signIn;
            }}>
            <Text style={{color: globalColors.mainText}}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{marginBottom: 60}}
            onPress={() => {
              signOut;
            }}>
            <Text style={{color: globalColors.mainText}}>SignOut</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <GoogleSigninButton
          style={pageStyles.googleBtn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={GoogleSignin.signIn}
        />
      </View>
    </>
  );
};
const pageStyles = StyleSheet.create({
  googleBtn: {
    width: 192,
    height: 48,
    alignSelf: 'center',
    bottom: 40,
  },
});
