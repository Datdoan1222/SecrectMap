import {
  StyleSheet,
  Keyboard,
  View,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

import Logo from '../../components/items/Logo';
import TextInputs from '../../components/login/TextInputs';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../redux/slices/AuthSlice';
import {Colors} from '../../constants/ColorStyles';
const {width, height} = Dimensions.get('window');
const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const error = useSelector(state => state.auth.error);

  function LoginWithEmail(data) {
    const email = data.email;
    const password = data.password;
    // dispatch(login("zxc@gmail.com", "zxczxc"));
    dispatch(login(email, password));
  }
  useEffect(() => {
    if (user) {
      console.log('Đăng nhập thành công', user);
    }

    if (error) {
      console.log('Đăng nhập thất bại', error);
      Alert.alert('Đăng Nhập', 'Tài khoản không tồn tại', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }, [user, error]);
  // keyboard
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
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
          login
          title="Đăng nhập tài khoản của bạn"
          onPress={() => navigation.navigate('Register')}
          onsubmit={LoginWithEmail}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logoContai: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    bottom: 0,
  },
  body: {
    paddingTop: 20,
    flex: 1.5,
  },
});
