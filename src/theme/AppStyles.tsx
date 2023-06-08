import {StyleSheet} from 'react-native';
export const globalColors = {
  mainBack: '#000000',
  mainText: '#ffffff',
  golden: '#DAA520',
  iconSize: 20,
  blueSelected: '#00adf5',
  darkblue: '#2d4150',
  ligthBlue: '#74bece',
  pink: '#dd99ee',
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
    backgroundColor: globalColors.mainBack,
    color: globalColors.mainText,
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
