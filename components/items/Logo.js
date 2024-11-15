import {Image} from 'react-native';
import React from 'react';

const Logo = () => {
  return (
    <Image
      source={require('../../constants/img/logo.png')}
      resizeMode="contain"
      style={{width: 'null', height: 'null', flex: 1}}
    />
  );
};
export default Logo;
