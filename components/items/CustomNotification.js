import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  Modal,
} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/ColorStyles';

const CustomNotification = ({
  visible,
  message,
  onClose,
  status,
  description,
}) => {
  const success = require('../../constants/img/success.png');
  const failure = require('../../constants/img/failure.png');
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modalContai}>
            <Image
              style={styles.imgModal}
              source={status ? success : failure}
            />
            <Text style={styles.message}>{message}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomNotification;

const styles = StyleSheet.create({
  // notifi
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền của overlay
  },
  modalContai: {
    width: 300,
    height: 300,
    padding: 20,
    backgroundColor: Colors.primary100, // Màu nền của thông báo
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text, // Màu chữ thông báo
  },
  description: {
    marginBottom: 15,
  },
  button: {
    padding: 10,
    backgroundColor: Colors.secondary500, // Màu nền của nút
    borderRadius: 5,
  },
  imgModal: {
    width: 150,
    height: 150,
  },
});
