import React, {Modal, Text, TouchableOpacity, View, Image} from 'react-native';
import {styles} from '../admin/editStyles';
import {ThemeContext} from '../../../context/ThemeContext';
import {useContext} from 'react';
import {StyleSheet} from 'react-native';

type modalProps = {
  imagen: any;
  visible: boolean;
  onClose: () => any;
};

export const ImagenModal = ({imagen, visible, onClose}: modalProps) => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalViewPic}>
          <View>
            <TouchableOpacity
              style={{
                borderColor: colors.background,
                ...S.buttonContainer,
              }}
              onPress={onClose}>
              <Text style={{...S.buttonX, color: colors.background}}>X</Text>
            </TouchableOpacity>
            <Image source={imagen} style={S.imgeS} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
const S = StyleSheet.create({
  imgeS: {width: 300, height: 300, borderRadius: 20},
  buttonX: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
    position: 'relative',
    top: 40,
    zIndex: 1,
  },
});
