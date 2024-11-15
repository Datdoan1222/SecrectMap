import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import Logo from '../../components/items/Logo';
import {Colors} from '../../constants/ColorStyles';
const {width, height} = Dimensions.get('window');

const StartScreen = () => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    // Dọn dẹp timeout khi component unmount
    return () => clearTimeout(timeoutId);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.logoContai}>
        <View style={{width: width, height: width}}>
          <Logo />
        </View>
      </View>
      <View style={styles.sloganContai}>
        <Text style={styles.textSlogan}>
          Tạo những địa điểm nào mà bạn thích
        </Text>
      </View>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.background,
  },
  logoContai: {
    flex: 4,
    justifyContent: 'center',
  },
  sloganContai: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
  },
  textSlogan: {
    color: Colors.ColorText,
    fontSize: 15,
    fontFamily: 'Inter-Italic',
  },
});
