import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 22,
  },
  formTitle: {
    marginHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  formTitleText: {
    fontSize: 22,
    textShadowOffset: {width: 1, height: 1}, // Desplazamiento del borde
    textShadowRadius: 1, // Radio del borde
  },
  goBackArrowPos: {
    position: 'absolute',
    left: 0,
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
  notAdminBtn: {
    marginBottom: 30,
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
