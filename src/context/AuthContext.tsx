import React, {createContext, useReducer, useEffect} from 'react';
import {authReducer} from './authReducer';
import {LocaleConfig} from 'react-native-calendars';
import {AppState} from 'react-native';
import {clientReducer} from './clientUserReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

LocaleConfig.locales.es = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';

export interface AuthState {
  isLoggedIn: boolean;
  userName?: string;
  token: string;
}

export interface ClientUserState {
  isClientLogged: boolean;
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  name: string;
  photo: string;
}
const ClientInitalState: ClientUserState = {
  isClientLogged: false,
  email: '',
  familyName: '',
  givenName: '',
  id: '',
  name: '',
  photo: '',
};
const AuthInitialState: AuthState = {
  isLoggedIn: false,
  userName: '',
  token: '',
};
export interface AuthContextProps {
  authState: AuthState;
  clientUserState: ClientUserState;
  signIn: (userName: string, token: string) => void;
  signOut: () => void;
  signInClient: (payload: ClientUserState) => void;
  signOutClient: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [authState, dispatch] = useReducer(authReducer, AuthInitialState);
  const [clientUserState, dispatchClient] = useReducer(
    clientReducer,
    ClientInitalState,
  );

  useEffect(() => {
    AppState.addEventListener('change', status => {
      if (status === 'background') {
        if (authState.isLoggedIn) {
          setTimeout(() => {
            if (status === 'background') {
              signOut();
            }
          }, 1000 * 60 * 5);
        }
      }
    });
  }, [authState]);

  useEffect(() => {
    checkifLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (userName: string, token: string) => {
    dispatch({type: 'signIn', payload: {userName, token}});
  };
  const signOut = () => {
    dispatch({type: 'signOut'});
  };

  const signInClient = async (payload: ClientUserState) => {
    dispatchClient({type: 'signIn', payload});
  };
  const signOutClient = () => {
    dispatchClient({type: 'signOut'});
  };

  async function checkifLogged() {
    try {
      const userOnLocal = await AsyncStorage.getItem('@user');
      if (userOnLocal) {
        signInClient(JSON.parse(userOnLocal) as ClientUserState);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        authState,
        clientUserState,
        signIn,
        signOut,
        signInClient,
        signOutClient,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
