/* eslint-disable react-native/no-inline-styles */
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useContext} from 'react';
import {ListEvent} from './ListEvent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../context/AuthContext';
import {View, Text} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';

export const CalendarComponent = () => {
  const {signIn, authState, signOut} = useContext(AuthContext);
  const {
    themeState: {colors},
    
  } = useContext(ThemeContext);

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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        <Text style={{color: colors.text, marginBottom: 10}}>
          Disponibilidad
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginHorizontal: 20,
          }}>
          <>
            <View
              style={{
                borderRadius: 100,
                backgroundColor: the,
                marginHorizontal: 10,
                height: 30,
                width: 30,
              }}
            />
            <Text style={{color: colors.text}}>Baja</Text>
          </>
          <>
            <View
              style={{
                borderRadius: 100,
                marginHorizontal: 10,
                backgroundColor: 'red',
                height: 30,
                width: 30,
              }}
            />
            <Text style={{color: colors.text}}>Media</Text>
          </>
          <>
            <View
              style={{
                borderRadius: 100,
                backgroundColor: 'red',
                marginHorizontal: 10,
                height: 30,
                width: 30,
              }}
            />
            <Text style={{color: colors.text}}>Alta</Text>
          </>
        </View>
      </View>
      <View style={{marginVertical: 20}}>
        <Text style={{color: colors.text}}>Hoola</Text>
        {authState.isLoggedIn ? (
          <TouchableOpacity
            onPress={() => {
              signIn;
            }}>
            <Text style={{color: colors.text}}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{marginBottom: 60}}
            onPress={() => {
              signOut;
            }}>
            <Text style={{color: colors.text}}>SignOut</Text>
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
// const pageStyles = StyleSheet.create({
//   googleBtn: {
//     width: 192,
//     height: 48,
//     alignSelf: 'center',
//     bottom: 40,
//     backgroundColor: 'white',
//   },
// });
