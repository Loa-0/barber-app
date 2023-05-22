/* eslint-disable react-native/no-inline-styles */
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useContext} from 'react';
import {ListEvent} from './ListEvent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../context/AuthContext';

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
      {authState.isLoggedIn ? (
        <TouchableOpacity
          onPress={() => {
            signIn;
          }}>
          Login
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            signOut;
          }}>
          SignOut
        </TouchableOpacity>
      )}
      <GoogleSigninButton
        style={{
          width: 192,
          height: 48,
          position: 'absolute',
          alignSelf: 'center',
          bottom: 40,
        }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={GoogleSignin.signIn}
      />
    </>
  );
};
