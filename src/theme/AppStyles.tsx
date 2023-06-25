import {StyleSheet} from 'react-native';
export const globalColors = {
  mainBack: '#121212',
  mainBlack: '#121212',
  mainText: '#ffffff',
  white: '#ffffff',
  golden: '#DAA520',
  iconSize: 20,
  blueSelected: '#00adf5',
  darkblue: '#2d4150',
  ligthgray: 'lightgrey',
  ligthBlue: '#74bece',
  pink: '#dd99ee',
  bulletOcupied: '#800000',
  bulletFree: '#72a276',
  disabledRed: 'rgba(255, 0, 0, 0.4);',
};
export const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  globalBGColor: {
    backgroundColor: globalColors.mainBack,
  },
  globalContainer: {
    flex: 1,
  },
  mainBtn: {
    borderRadius: 50,
    backgroundColor: globalColors.mainBack,
    borderWidth: 4,
    borderColor: globalColors.golden,
    color: globalColors.golden,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 60,
    marginVertical: 5,
  },
  textBtn: {
    color: globalColors.golden,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold',
    fontSize: 25,
  },
  headerTitle: {
    color: globalColors.mainText,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'sans-serif',
  },
});
