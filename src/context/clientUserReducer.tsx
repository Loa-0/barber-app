import AsyncStorage from '@react-native-async-storage/async-storage';
import {ClientUserState} from './AuthContext';

type AuthAction =
  | {
      type: 'signOut';
    }
  | {type: 'signIn'; payload: ClientUserState};
export const clientReducer = (
  state: ClientUserState,
  action: AuthAction,
): ClientUserState => {
  switch (action.type) {
    case 'signIn':
      AsyncStorage.setItem('@user', JSON.stringify(action.payload)).then(
        () => {},
      );
      return {
        ...state,
        email: action.payload.email,
        familyName: action.payload.familyName,
        givenName: action.payload.givenName,
        id: action.payload.id,
        name: action.payload.name,
        photo: action.payload.photo,
        isClientLogged: true,
      };
    case 'signOut':
      AsyncStorage.removeItem('@user').then(() => {});
      return {
        email: '',
        familyName: '',
        givenName: '',
        id: '',
        name: '',
        photo: '',
        isClientLogged: false,
      };
    default:
      return state;
  }
};
