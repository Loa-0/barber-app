import {AuthState} from './AuthContext';

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
      return {
        ...state,
        isLoggedIn: true,
        userName: action.payload.userName,
        token: action.payload.token,
      };
    case 'signOut':
      return {
        isLoggedIn: false,
        userName: '',
        token: '',
      };
    default:
      return state;
  }
};
