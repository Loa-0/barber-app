import React, {createContext, useReducer, useEffect} from 'react';
import {authReducer} from './authReducer';
import {LocaleConfig} from 'react-native-calendars';
import {AppState} from 'react-native';

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

const AuthInitialState: AuthState = {
  isLoggedIn: false,
  userName: '',
  token: '',
};
export interface AuthContextProps {
  authState: AuthState;
  signIn: (userName: string, token: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [authState, dispatch] = useReducer(authReducer, AuthInitialState);

  useEffect(() => {
    AppState.addEventListener('change', status => {
      console.log(status);
      if (status === 'background') {
        if (authState.isLoggedIn) {
          signOut();
        }
      }
    });
  }, [authState]);

  const signIn = (userName: string, token: string) => {
    dispatch({type: 'signIn', payload: {userName, token}});
  };
  const signOut = () => {
    dispatch({type: 'signOut'});
  };

  return (
    <AuthContext.Provider value={{authState, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
