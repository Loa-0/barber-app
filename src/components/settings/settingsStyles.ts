import {StatusBar, StyleSheet} from 'react-native';
import {globalColors} from '../../theme/AppStyles';
export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    resizeMode: 'cover',
    backgroundColor: globalColors.mainBack,
    height: '100%',
  },
  safeArea: {
    marginVertical: 20,
    marginHorizontal: 20,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  subtitleText: {
    color: globalColors.mainText,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: globalColors.mainText,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  themeContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 5,
  },
  selectedThemeOption: {
    borderColor: globalColors.golden,
  },
  themeText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  themeIcon: {
    width: 24,
    height: 24,
  },
});
