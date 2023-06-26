import React, {createContext, useEffect, useReducer} from 'react';
import {AppState, Appearance} from 'react-native';
import {themeReducer} from './ThemeReducer';
import {ThemeState, DarkTheme} from '../theme/themes';

export const themes = ['light', 'dark'];

const ThemeInitialState: ThemeState = DarkTheme;

export interface ThemeContextProps {
  themeState: ThemeState;
  setDark: () => void;
  setLight: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const colorScheme = Appearance.getColorScheme(); //obtener preferencia de tema del usuario
  const [themeState, dispatch] = useReducer(themeReducer, ThemeInitialState);

  useEffect(() => {
    AppState.addEventListener('change', status => {
      if (status === 'active') {
        Appearance.getColorScheme() === 'light' ? setLight() : setDark();
      }
    });
  }, []);

  useEffect(() => {
    colorScheme === 'light' ? setLight() : setDark();
  }, [colorScheme]);

  const setDark = () => {
    dispatch({type: 'setDark'});
  };
  const setLight = () => {
    dispatch({type: 'setLight'});
  };

  return (
    <ThemeContext.Provider value={{themeState, setDark, setLight}}>
      {children}
    </ThemeContext.Provider>
  );
};
