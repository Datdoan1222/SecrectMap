import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import {Colors} from '../../constants/ColorStyles';
import ShadowCustom from '../items/ShadowCustom';
import IconStyles from '../../constants/IconStyles';
const {width, height} = Dimensions.get('window');

const RequestInput = ({
  control,
  name,
  rules,
  errors,
  placeholder,
  secureTextEntry = false,
  title,
  heights = 45,
  isSelect,
  children,
  onPress,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const widthInput = !isSelect ? width - 42 : (width - 42) * 0.8;



  return (
    <>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.container}>
        <ShadowCustom height={heights} width={widthInput} radius={10}>
          <Controller
            control={control}
            rules={rules}
            render={({field: {onChange, onBlur, value}}) => (
              <View
                style={[
                  styles.inputContainer,
                  styles.styleInput,
                  {height: heights, width: widthInput},
                ]}>
                <TextInput
                  style={[
                    {height: heights, width: widthInput},
                    styles.input,
                    errors && styles.inputError,
                  ]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder={placeholder}
                  secureTextEntry={secureTextEntry}
                  autoCapitalize="none"
                />
              </View>
            )}
            name={name}
            defaultValue=""
          />
        </ShadowCustom>
        {isSelect && (
          <View style={[styles.selectContai, {marginRight: 3}]}>
            <ShadowCustom height={heights} width={heights} radius={10}>
              <View
                style={[
                  styles.btnContainer,
                  styles.styleInput,
                  {height: heights, width: heights},
                ]}>
                <TouchableOpacity
                  style={[
                    {width: '100%', height: '100%'},
                    styles.button,
                    isPressed && styles.buttonPressed, // Thay đổi style khi nhấn
                  ]}
                  onPressIn={() => setIsPressed(true)} 
                  onPressOut={() => setIsPressed(false)} 
                  onPress={onPress}>
                  {children}
                </TouchableOpacity>
              </View>
            </ShadowCustom>
          </View>
        )}
      </View>
    </>
  );
};

export default RequestInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectContai: {},
  btnContainer: {},
  label: {
    color: Colors.text,
    fontWeight: '400',
  },
  input: {
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
    fontSize: 15,
    fontStyle: 'italic',
    justifyContent: 'center',
  },
  inputError: {
    borderWidth: 1,
    borderColor: Colors.error,
  },
  //
  styleInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
  },
  //

  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: Colors.shadowPrimary,
  },
  buttonText: {},
});
