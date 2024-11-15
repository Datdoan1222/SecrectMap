import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/ColorStyles';

const RequestButton = ({name, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default RequestButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.successful,
    paddingHorizontal: 15,
    minWidth: 150,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
