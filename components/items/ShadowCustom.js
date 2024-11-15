import {BoxShadow} from 'react-native-shadow';
import React from 'react';
import {Colors} from '../../constants/ColorStyles';

const ShadowCustom = ({
  children,
  height,
  width,
  radius,
  marginVertical = 5,
}) => {
  const shadowOpt = {
    width: width,
    height: height,
    color: Colors.shadowPrimary,
    border: 2,
    radius: radius,
    x: 2,
    y: 2,
    style: {marginVertical: marginVertical},
  };
  return <BoxShadow setting={shadowOpt}>{children}</BoxShadow>;
};

export default ShadowCustom;
