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
  highlightColor: string;
  textShadowColor: string;
  transparentBackground: string;
  secondaryButton: string;
  themeCalendar: calendarThemeType;
  bulletOcupied: string;
  bulletFree: string;
  titleText: string;
}

export const LightTheme: ThemeState = {
  currentTheme: 'light',
  dark: false,
  colors: {
    primary: '#5856D6',
    background: globalColors.white,
    card: globalColors.mainBlack,
    text: globalColors.mainBlack,
    border: 'rgba(0, 0, 0, 1)',
    notification: 'teal',
  },
  bulletOcupied: globalColors.bulletOcupied,
  bulletFree: globalColors.bulletFree,
  dividerColor: 'rgba(0,0,0,0.7)',
  highlightColor: globalColors.golden,
  titleText: globalColors.blueSelected,
  textShadowColor: 'black',
  transparentBackground: 'rgba(0, 0, 0, 0.1)',
  secondaryButton: globalColors.white,
  themeCalendar: {
    backgroundColor: globalColors.white,
    calendarBackground: globalColors.white,
    textSectionTitleColor: globalColors.golden,
    selectedDayBackgroundColor: globalColors.blueSelected,
    monthTextColor: globalColors.mainBlack,
    selectedDayTextColor: globalColors.mainBlack,
    todayTextColor: globalColors.blueSelected,
    dayTextColor: globalColors.mainBlack,
    textSectionTitleDisabledColor: globalColors.golden,
    textDisabledColor: globalColors.ligthgray,
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
  highlightColor: globalColors.golden,
  textShadowColor: globalColors.white,
  bulletOcupied: globalColors.bulletOcupied,
  bulletFree: globalColors.bulletFree,
  transparentBackground: 'rgba(255,255, 255, 0.2)',
  secondaryButton: globalColors.white,
  titleText: globalColors.golden,
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
    textDisabledColor: globalColors.disabledRed,
  },
};
