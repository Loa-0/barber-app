import {User} from '@react-native-google-signin/google-signin';
export interface UserLoginInterface {
  user: string;
  token: string;
}
export interface UserInterface {
  userName: string;
  password: string;
}

export interface UserUpdateInterface {
  newUserName: string;
  oldpassword: string;
  newPassword: string;
}

export interface GoogleUserReponse extends User {}
