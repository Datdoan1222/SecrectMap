import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  Button,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';

import {Colors} from '../../constants/ColorStyles';
import Inputs from './Inputs';
import Buttons from './Buttons';
import {FontFamily} from '../../constants/Fonts';
import IconStyles from '../../constants/IconStyles';
import ButtonIcons from '../items/ButtonIcons';
const {width, height} = Dimensions.get('window');

const TextInputs = ({title, login, onPress, onsubmit, isKeyboardVisible}) => {
  const [gender, setGender] = useState(null);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleNavigationButtons = isVisible => {
    Animated.timing(animatedValue, {
      toValue: isVisible ? 1 : 0,
      duration: 300, // Thay đổi thời gian nếu cần
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    toggleNavigationButtons(!login && !isKeyboardVisible);
  }, [isKeyboardVisible, login]);

  const navigationButtonsOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const fields = login
    ? [
        {
          key: 'loginFields',
          fields: [
            {
              key: 'email',
              placeholder: 'Gmail',
              rules: {required: 'Email is required'},
            },
            {
              key: 'password',
              placeholder: 'Mật khẩu',
              rules: {required: 'Password is required'},
              secureTextEntry: true,
            },
          ],
        },
      ]
    : [
        {
          key: 'gmail',
          fields: [
            {
              key: 'gmail',
              placeholder: 'Gmail',
              rules: {required: 'Gmail is required'},
              description: 'Hãy nhập tài khoản email của bạn',
              page: '0',
            },
          ],
        },
        {
          key: 'displayName',
          fields: [
            {
              key: 'displayName',
              placeholder: 'Tên người dùng',
              rules: {required: 'Tên người dùng is required'},
              description: 'Hãy nhập những cái tên mà bạn thích',
              page: '1',
            },
          ],
        },
        {
          key: 'birthday',
          fields: [
            {
              key: 'birthday',
              placeholder: 'Ngày sinh (dd/mm/yyyy)',
              rules: {required: 'Ngày sinh is required'},
              description: 'Ngày sinh cảu bạn là bao nhiêu',
              page: '2',
            },
          ],
        },
        {
          key: 'gender',
          fields: [
            {
              key: 'gender',
              description: 'Bạn là gì nào',
              page: '3',
            },
          ],
        },
        {
          key: 'password',
          fields: [
            {
              key: 'password',
              placeholder: 'Mật khẩu',
              rules: {required: 'Password is required'},
              secureTextEntry: true,
              page: '4', // description: 'Nhập mật khẩu của bạn.',
            },
            {
              key: 'confirmPass',
              placeholder: 'Nhập lại mật khẩu',
              rules: {required: 'Confirm Password is required'},
              secureTextEntry: true,
              description: 'Hãy bảo mật tài khoản của bạn',
              page: '4',
            },
          ],
        },
      ];

  const {
    control,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    onsubmit(data);
  };

  const currentFieldKey = fields[currentIndex].key;
  const currentFieldValue = getValues(currentFieldKey);
  const handleNext = () => {

    if (!currentFieldValue) {
      setError(currentFieldKey, {
        type: 'manual',
        message: 'This field is required',
      });
      return;
    } else {
      clearErrors(currentFieldKey);
    }

    if (currentIndex < fields.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current.scrollToIndex({index: nextIndex});
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current.scrollToIndex({index: prevIndex});
      setCurrentIndex(prevIndex);
      handleSubmit(onSubmit);
    }
  };

  const handleScroll = event => {
    const newOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(newOffset / (width - 60));
    if (newIndex > currentIndex) {
      if (!currentFieldValue) {
        setError(currentFieldKey, {
          type: 'manual',
          message: 'This field is required',
        });
        flatListRef.current.scrollToIndex({index: currentIndex});
        return;
      } else {
        clearErrors(currentFieldKey);
      }
    }
    setCurrentIndex(newIndex);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.inputContainer}>
        {item.fields.map(field => (
          <View key={field.key} style={styles.inputWrapper}>
            {field.key === 'gender' ? (
              <View style={[styles.genderContainer, {width: width - 60}]}>
                <ButtonIcons
                  nameIcon="female-sharp"
                  onPress={() => setGender('Nữ')}
                />
                <ButtonIcons
                  nameIcon="male-sharp"
                  onPress={() => setGender('Nam')}
                />
                <ButtonIcons
                  nameIcon="male-female-sharp"
                  onPress={() => setGender('Nữ')}
                />
              </View>
            ) : (
              <>
                <Inputs
                  errors={errors[field.key]}
                  control={control}
                  name={field.key}
                  rules={field.rules}
                  placeholder={field.placeholder}
                  secureTextEntry={field.secureTextEntry || false}
                  description={field.description}
                  login={login}
                />
              </>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>

        <FlatList
          ref={flatListRef}
          data={fields}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          keyExtractor={item => item.key}
          renderItem={renderItem}
          style={styles.flatList}
        />
        <Animated.View
          style={[
            styles.navigationButtons,
            {opacity: navigationButtonsOpacity},
          ]}>
          <ButtonIcons
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            nameIcon="arrow-back"
            style={[
              styles.arrowButton,
              currentIndex === 0 && styles.arrowButtonDisabled,
            ]}
            colorIcon={currentIndex === 0 ? 'grey' : Colors.primary800}
            background={currentIndex === 0 ? Colors.background : '#ffffff'}
          />
          <ButtonIcons
            onPress={handleNext}
            disabled={currentIndex === fields.length - 1}
            nameIcon="arrow-forward"
            style={[
              styles.arrowButton,
              currentIndex === fields.length - 1 && styles.arrowButtonDisabled,
            ]}
            colorIcon={
              currentIndex === fields.length - 1 ? 'grey' : Colors.primary800
            }
            background={
              currentIndex === fields.length - 1 ? Colors.background : '#ffffff'
            }
          />
        </Animated.View>
      </View>

      <View style={styles.btnContai}>
        {currentIndex === fields.length - 1 && (
          <View style={styles.btnLogin}>
            <Buttons
              title={!login ? 'Đăng ký' : 'Đăng nhập'}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        )}

        <View style={styles.btnRegister}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.registerLink}>
              {login ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}
              <Text style={styles.registerText}>
                {login ? ' Đăng ký' : ' Đăng nhập'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TextInputs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 30,
  },
  btnContai: {
    flex: 1,
    margin: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnLogin: {
    marginVertical: 10,
  },
  btnRegister: {
    flex: 1,
    alignItems: 'center',
    fontSize: 15,
    fontStyle: 'italic',
    justifyContent: 'flex-end',
  },
  registerText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Colors.primary800,
  },
  title: {
    paddingHorizontal: 30,
    fontSize: 20,
    fontFamily: 'Inter-Medium',
    color: Colors.textPrimary,
    height: 45,
  },

  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
});
