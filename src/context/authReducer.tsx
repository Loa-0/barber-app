import {AuthState} from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthAction =
  | {
      type: 'signOut';
    }
  | {type: 'signIn'; payload: {userName: string; token: string}};
export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'signIn':
      AsyncStorage.setItem('token', action.payload.token).then(() => {});
      return {
        ...state,
        isLoggedIn: true,
        userName: action.payload.userName,
        token: action.payload.token,
      };
    case 'signOut':
      AsyncStorage.removeItem('token').then(() => {});
      return {
        isLoggedIn: false,
        userName: '',
        token: '',
      };
    default:
      return state;
  }
};
