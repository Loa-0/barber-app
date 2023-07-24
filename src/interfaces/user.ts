import {User} from '@react-native-google-signin/google-signin';
export interface UserLoginInterface {
  user: string;
  token: string;
}
export interface UserInterface {
  userName: string;
  password: string;
}

export interface GoogleUserReponse extends User {}
