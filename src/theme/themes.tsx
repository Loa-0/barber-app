import {Theme} from '@react-navigation/native';

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark';
  dividerColor: string;
  highlightColor: string;
  textShadowColor: string;
  transparentBackground: string;
  secondaryButton: string;
}

export const LightTheme: ThemeState = {
  currentTheme: 'light',
  dark: false,
  colors: {
    primary: '#5856D6',
    background: 'white',
    card: 'black',
    text: 'black',
    border: 'rgba(0, 0, 0, 1)',
    notification: 'teal',
  },
  dividerColor: 'rgba(0,0,0,0.7)',
  highlightColor: '#DAA520',
  textShadowColor: 'black',
  transparentBackground: 'rgba(0, 0, 0, 0.1)',
  secondaryButton: 'white',
};
//
export const DarkTheme: ThemeState = {
  currentTheme: 'dark',
  dark: true,
  colors: {
    primary: 'red',
    background: 'rgba(0, 0, 0, 0.9)',
    card: 'black',
    text: 'white',
    border: 'rgba(255, 255, 255, 1)',
    notification: 'teal',
  },
  dividerColor: 'rgba(255,0,0,0.7)',
  highlightColor: '#DAA520',
  textShadowColor: 'white',
  transparentBackground: 'rgba(255,255, 255, 0.2)',
  secondaryButton: 'white',
};
