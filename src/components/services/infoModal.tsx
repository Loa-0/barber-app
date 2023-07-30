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
        <View style={{...styles.modalView, backgroundColor: colors.background}}>
          <Text style={{...styles.modalText, color: colors.text}}>
            El tiempo de este servicio es de {duration} hora
          </Text>
          <Text style={{...styles.modalText, color: colors.text}}>
            el precio es de ${price}
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}>
            <Text style={styles.textStyle}>Cerrar</Text>
          </TouchableOpacity>
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
