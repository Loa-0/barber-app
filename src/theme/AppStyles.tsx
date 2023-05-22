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
  globalMargin: {
    marginHorizontal: 20,
  },
  globalBGColor: {
    backgroundColor: '#000000',
  },
  globalContainer: {
    // flex: 1,
    resizeMode: 'cover',
    backgroundColor: globalColors.mainBack,
    height: '100%',
    color: globalColors.mainText,
  },
});
