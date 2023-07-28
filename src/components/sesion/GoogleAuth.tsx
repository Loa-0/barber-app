import React, {useContext, useState} from 'react';
import vars from 'react-native-config';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AuthContext} from '../../context/AuthContext';
import {ThemeContext} from '../../context/ThemeContext';

GoogleSignin.configure({
  scopes: ['email'],
  webClientId: vars.GOOGLE_API_WEBID,
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export const GoogleAuth = () => {
  const {
    themeState: {bulletOcupied},
  } = useContext(ThemeContext);
  const {clientUserState, signInClient, signOutClient} =
    useContext(AuthContext);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  const handleGoogleSignIn = async () => {
    try {
      const hasPlayServices = await GoogleSignin.hasPlayServices();
      if (!hasPlayServices || isSigningIn) {
        console.log(
          'Google Play Services no está disponible o está desactualizado.',
        );
        return;
      }
      if (!clientUserState.isClientLogged && !isSigningIn) {
        setIsSigningIn(true);
        const userRaw = await GoogleSignin.signIn();
        signInClient({
          email: userRaw.user.email,
          familyName: userRaw.user.familyName ?? '',
          givenName: userRaw.user.givenName ?? '',
          id: userRaw.user.id,
          name: userRaw.user.name ?? '',
          photo: userRaw.user.photo ?? '',
          isClientLogged: true,
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      if (clientUserState.isClientLogged && !isSigningIn) {
        setIsSigningIn(true);
        await GoogleSignin.signOut();
        signOutClient();
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <View style={styles.container}>
      {clientUserState.isClientLogged ? (
        <>
          <TouchableOpacity
            style={{...styles.signOutButton, backgroundColor: bulletOcupied}}
            onPress={handleSignOut}>
            <Text style={styles.signOutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Iniciar sesión con Google</Text>
          <Pressable
            style={{
              ...styles.signInButton,
            }}
            onPress={handleGoogleSignIn}>
            <View style={styles.rowA}>
              <Icon name="google" style={styles.size} color={'white'} />
              <Text style={[styles.text, styles.size]}>Acceder con Google</Text>
            </View>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    marginTop: 40,
    fontSize: 20,
  },
  size: {
    fontSize: 16,
  },
  rowA: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  signInButton: {
    width: 230,
    backgroundColor: '#3f81ec',
    height: 48,
    marginTop: 20,
    padding: 15,
    alignContent: 'center',
    textAlign: 'center',
    color: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  signOutButton: {
    marginTop: 20,
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 8,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
  },
});
