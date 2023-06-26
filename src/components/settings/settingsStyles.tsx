import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    resizeMode: 'cover',
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    marginVertical: 8,
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
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 5,
  },
  themeText: {
    fontSize: 18,
    marginBottom: 8,
  },
  themeIcon: {
    width: 24,
    height: 24,
  },
});
