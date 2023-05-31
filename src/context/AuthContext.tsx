import React, {createContext, useReducer} from 'react';
import {authReducer} from './authReducer';

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
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: {children: JSX.Element[]}) => {
  const [authState, dispatch] = useReducer(authReducer, AuthInitialState);

  const signIn = () => {
    dispatch({type: 'signIn', payload: {userName: 'Loa'}});
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
