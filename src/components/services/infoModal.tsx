import React, {Modal, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './editStyles';
import {ThemeContext} from '../../context/ThemeContext';
import {useContext} from 'react';

type modalProps = {
  price: number;
  duration: number;
  visible: boolean;
  onClose: () => any;
  onAdd?: () => any;
  fromAdmin: boolean;
  wordReserved?: string;
};

export const InfoModal = ({
  price,
  duration,
  visible,
  onClose,
  onAdd,
  wordReserved,
  fromAdmin,
}: modalProps) => {
  const {
    themeState: {colors, cButtonPic},
  } = useContext(ThemeContext);
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={{...styles.modalView, backgroundColor: colors.background}}>
        <TouchableOpacity
            style={{ 
              position: 'absolute', 
              top: 10, 
              left: 10, 
              width: 33,
              height: 33,
              borderRadius: 50,
              borderColor: cButtonPic,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onClose}>
            <Text style={{color: cButtonPic,fontWeight: 'bold', textAlign: 'center'}}>X</Text>
        </TouchableOpacity>
        <View style={{height: 10}}></View>
          <Text style={{...styles.modalText, color: colors.text}}>
            El tiempo de este servicio es de {duration} hora
          </Text>
          <Text style={{...styles.modalText, color: colors.text}}>
            el precio es de ${price}
          </Text>
          {!fromAdmin && (
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={onAdd}>
              <Text style={styles.textStyle}>{wordReserved}</Text>
            </TouchableOpacity>
          )}
          
        </View>
      </View>
    </Modal>
  );
};
