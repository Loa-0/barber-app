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
// import axios from 'axios';

export const CalendarComponent = () => {
  const {signIn, authState, signOut} = useContext(AuthContext);

  const signInWithGoogle = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '685556051749-94tc9vnciflm619semreu9msgv160cvv.apps.googleusercontent.com',
        offlineAccess: true,
        forceCodeForRefreshToken: true,
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Usuario autenticado:', userInfo);

      // Aquí puedes hacer una llamada a la API de Google Calendar para obtener los eventos del calendario
      // Puedes usar axios o fetch para realizar la solicitud HTTP
      // Por ejemplo:
      // const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events');
      // console.log('Eventos del calendario:', response.data);
    } catch (error) {
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   console.log('El inicio de sesión fue cancelado');
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   console.log('El inicio de sesión está en progreso');
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   console.log('Servicios de Google Play no disponibles');
      // } else {
      //   console.log('Error al iniciar sesión:', error);
      // }
      console.log(error);
    }
  };
  // const getCalendarEvents = async () => {
  //   const calendarId =
  //     'ce1694d501efee6e2c457727b6d6f39b057d8dc56dee16dbe2c398a7741b194d@group.calendar.google.com';
  //   const apiKey = 'AIzaSyADFjo11Uw6v1rFyGGHrF78CjbkZcPlr_Y';
  //   try {
  //     const response = await axios.get(
  //       `https://www.googleapis.com/calendar/v3/calendars/`,
  //     );
  //     console.log('Eventos del calendario:', response.data);
  //   } catch (error) {
  //     console.error('Error al obtener eventos del calendario:', error);
  //   }
  // };
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
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
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
    backgroundColor: 'white',
  },
});
