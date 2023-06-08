import React, {useEffect} from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {globalColors} from '../../theme/AppStyles';
import Icon from 'react-native-vector-icons/Ionicons';
type Props = {
  visible: boolean;
  changeValue: (para: boolean) => void;
  message: string;
};
export const NotificationModal = ({
  visible = false,
  changeValue,
  message,
}: Props) => {
  // const [visible, setModalVisible] = useState(visible);
  useEffect(() => {
    changeValue(visible);
  }, [visible, changeValue]);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          changeValue(!visible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => changeValue(!visible)}>
              <Icon style={styles.textStyle} name="cros" size={20} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: globalColors.mainBack,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: globalColors.darkblue,
    padding: 35,
    alignItems: 'center',
    shadowColor: globalColors.mainText,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: 60,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: globalColors.mainText,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
