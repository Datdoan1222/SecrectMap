import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/ColorStyles';
import IconStyles from '../../constants/IconStyles';
import ShadowCustom from './ShadowCustom';

const ButtonIcons = ({
  onPress,
  background = '#ffffff',
  nameIcon,
  colorIcon,
  sizeIcon,
  sizeButton = 50,
  radiusButton = 15,
  iconSet = 'Ionicons',
  disabled = false,
}) => {
  return (
    <ShadowCustom height={sizeButton} width={sizeButton} radius={radiusButton}>
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.button,
          {
            backgroundColor: background,
            width: sizeButton,
            height: sizeButton,
            borderRadius: radiusButton,
          },
        ]}
        onPress={onPress}>
        <IconStyles
          iconSet={iconSet}
          name={nameIcon}
          color={colorIcon}
          size={sizeIcon}
        />
      </TouchableOpacity>
    </ShadowCustom>
  );
};

export default ButtonIcons;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
