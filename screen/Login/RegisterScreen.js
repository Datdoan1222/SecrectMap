import {StyleSheet, Dimensions, View, Keyboard, Animated} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

import Logo from '../../components/items/Logo';
import TextInputs from '../../components/login/TextInputs';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../redux/slices/AuthSlice';
import {Colors} from '../../constants/ColorStyles';


const {width, height} = Dimensions.get('window');

const RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error);
  const user = useSelector(state => state.auth.user);

  function RegisterWithEmail(data) {
    const email = data.email;
    const password = data.password;
    dispatch(register(email, password));
  }
  useEffect(() => {
    if (user) {
      console.log('Đăng ký thành công', user);
    }

    if (error) {
      console.error('Đăng ký thất bại', error);
    }
  }, [user, error]);

  // keyboard
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // Khi bàn phím xuất hiện, ẩn phần tử
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // Khi bàn phím ẩn, hiển thị lại phần tử
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleNavigationButtons = isVisible => {
    Animated.timing(animatedValue, {
      toValue: isVisible ? 1 : 0.5,
      duration: 300, // Thay đổi thời gian nếu cần
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    toggleNavigationButtons(!isKeyboardVisible);
  }, [isKeyboardVisible]);

  const scaleValue = animatedValue.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0.5, 1],
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.logoContai, {transform: [{scale: scaleValue}]}]}>
        <View
          style={{
            width: width - 120,
            height: width - 120,
          }}>
          <Logo />
        </View>
      </Animated.View>
      <View style={styles.body}>
        <TextInputs
          isKeyboardVisible={isKeyboardVisible}
          title="Hãy tạo tài khoản của bạn"
          onPress={() => navigation.navigate('Login')}
          onsubmit={RegisterWithEmail}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 30,
    backgroundColor: Colors.background,
  },
  logoContai: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'flex-end',
  },
  logo: {
    position: 'absolute',
    bottom: 20,
  },
  body: {
    paddingTop: 30,
    flex: 1.5,
  },
});
