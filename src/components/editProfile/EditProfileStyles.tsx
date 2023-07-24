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
  formLogout: {
    marginVertical: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderBottomWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputB: {
    borderWidth: 2,
    marginBottom: 5,
    padding: 10,
    borderRadius: 20,
  },
  formInputContainer: {
    flexDirection: 'column',
    marginBottom: 6,
  },
  formTextBox: {
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 6,
    justifyContent: 'center',
    paddingLeft: 8,
    height: 44,
    width: '100%',
  },
  formSubmitBtn: {
    marginVertical: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderBottomWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
