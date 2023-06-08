import {ThemeState, DarkTheme, LightTheme} from '../theme/themes';

type ThemeAction = {type: 'setDark' | 'setLight'};
export const themeReducer = (
  state: ThemeState,
  action: ThemeAction,
): ThemeState => {
  switch (action.type) {
    case 'setDark':
      return DarkTheme;
    case 'setLight':
      return LightTheme;

    default:
      return state;
  }
};
