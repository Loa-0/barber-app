import React, {Modal, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './editStyles';

type modalProps = {
  title: string;
  image: any;
  price: number;
  duration: number;
  visible: boolean;
  onClose: () => any;
};

export const EditModal = ({
  title,
  image,
  price,
  duration,
  visible,
  onClose,
}: modalProps) => {
  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            El tiempo de este servicio es de {duration} hora
          </Text>
          <Text style={styles.modalText}>el precio es de ${price}</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}>
            <Text style={styles.textStyle}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
