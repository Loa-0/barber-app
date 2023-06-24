import {Theme} from '@react-navigation/native';
import {globalColors} from './AppStyles';

export type calendarThemeType = {
  backgroundColor: string;
  calendarBackground: string;
  textSectionTitleColor: string;
  selectedDayBackgroundColor: string;
  textSectionTitleDisabledColor: string;
  monthTextColor: string;
  selectedDayTextColor: string;
  todayTextColor: string;
  dayTextColor: string;
  textDisabledColor: string;
};

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark';
  dividerColor: string;
  servWhite: string;
  highlightColor: string;
  textShadowColor: string;
  transparentBackground: string;
  secondaryButton: string;
  themeCalendar: calendarThemeType;
}

export const LightTheme: ThemeState = {
  currentTheme: 'light',
  dark: false,
  colors: {
    primary: '#5856D6',
    background: globalColors.white,
    card: 'black',
    text: 'black',
    border: 'rgba(0, 0, 0, 1)',
    notification: 'teal',
  },
  dividerColor: 'rgba(0,0,0,0.7)',
  servWhite: 'rgba(0,0,0,0.2)',
  highlightColor: globalColors.golden,
  textShadowColor: 'black',
  transparentBackground: 'rgba(0, 0, 0, 0.1)',
  secondaryButton: globalColors.white,
  themeCalendar: {
    backgroundColor: globalColors.white,
    calendarBackground: globalColors.white,
    textSectionTitleColor: globalColors.golden,
    selectedDayBackgroundColor: globalColors.blueSelected,
    textSectionTitleDisabledColor: globalColors.golden,
    monthTextColor: globalColors.mainBlack,
    selectedDayTextColor: globalColors.mainBlack,
    todayTextColor: globalColors.blueSelected,
    dayTextColor: globalColors.mainBlack,
    textDisabledColor: globalColors.ligthBlue,
  },
};
//
export const DarkTheme: ThemeState = {
  currentTheme: 'dark',
  dark: true,
  colors: {
    primary: 'red',
    background: 'rgba(0, 0, 0, 0.9)',
    card: 'black',
    text: globalColors.white,
    border: 'rgba(255, 255, 255, 1)',
    notification: 'teal',
  },
  dividerColor: 'rgba(255,0,0,0.7)',
  servWhite: 'rgba(255,255,255,0.2)',
  highlightColor: globalColors.golden,
  textShadowColor: globalColors.white,
  transparentBackground: 'rgba(255,255, 255, 0.2)',
  secondaryButton: globalColors.white,
  themeCalendar: {
    backgroundColor: globalColors.mainBlack,
    calendarBackground: globalColors.mainBlack,
    textSectionTitleColor: globalColors.golden,
    selectedDayBackgroundColor: globalColors.blueSelected,
    textSectionTitleDisabledColor: globalColors.golden,
    monthTextColor: globalColors.white,
    selectedDayTextColor: globalColors.white,
    todayTextColor: globalColors.blueSelected,
    dayTextColor: globalColors.white,
    textDisabledColor: globalColors.ligthBlue,
  },
};