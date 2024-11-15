import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../constants/ColorStyles';
import IconSyles from '../../constants/IconStyles';
import {FontFamily} from '../../constants/Fonts';

const Buttons = ({onPress, background, label}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        background
          ? {backgroundColor: background}
          : {
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: Colors.primary800,
            },
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.text,
          background ? {color: Colors.background} : {color: Colors.textPrimary},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '49%',
    height: 50,
    elevation: 4,
  },
  text: {
    fontFamily: FontFamily.boldItalic,
    fontSize: 15,
  },
});
