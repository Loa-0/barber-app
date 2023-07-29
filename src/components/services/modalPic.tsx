import React, {Modal, Text, TouchableOpacity, View,Image} from 'react-native';
import {styles} from './editStyles';
import {ThemeContext} from '../../context/ThemeContext';
import {useContext} from 'react';

type modalProps = {
  imagen: any,
  visible: boolean;
  onClose: () => any;
};

export const ModalPic = ({
  imagen,
  visible,
  onClose,
}: modalProps) => {
  const {
    themeState: {colors,cButtonPic},
  } = useContext(ThemeContext);
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={{...styles.modalViewPic}}>
        <View>
      <Image
        source={imagen} 
        style={{ width: 300, height: 300, borderRadius: 20 }} 
      />
    </View>
    <View style={{height: 20}}></View>

          <TouchableOpacity
            style={{ width: 50,
              height: 50,
              borderRadius: 50,
              borderColor: cButtonPic,
              borderWidth: 1,
              backgroundColor: 'transparent',
              justifyContent: 'center', 
              alignItems: 'center',}}
            onPress={onClose}>
            <Text style={{color: cButtonPic,fontWeight: 'bold', textAlign: 'center'}}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

