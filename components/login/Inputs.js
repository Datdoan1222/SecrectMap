import {StyleSheet, TextInput, Text, Dimensions, View} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import {Colors} from '../../constants/ColorStyles';
import ShadowCustom from '../items/ShadowCustom';
import {FontFamily} from '../../constants/Fonts';
const {width, height} = Dimensions.get('window');

const Inputs = ({
  control,
  name,
  rules,
  errors,
  placeholder,
  secureTextEntry = false,
  login,
  description,
}) => {
  return (
    <ShadowCustom height={60} width={width - 60} radius={10}>
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}}) => (
          <View
            style={[styles.inputContainer, {width: width - 60, height: 50}]}>
            <TextInput
              style={[styles.input, errors && styles.inputError]}
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
      {!login && description && (
        <Text style={[styles.description, errors && {color: Colors.error}]}>
          {description}
        </Text>
      )}
    </ShadowCustom>
  );
};

export default Inputs;

const styles = StyleSheet.create({
  input: {
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 20,
    position: 'relative',
    backgroundColor: '#fff',
    overflow: 'hidden',
    fontSize: 15,
    fontFamily: FontFamily.italic,
  },
  inputError: {
    borderWidth: 1,
    borderColor: Colors.error,
  },
  description: {
    marginTop: 15,
    marginHorizontal: 5,
    fontSize: 15,
    color: Colors.Secondary100,
    fontFamily: FontFamily.italic,
  },
});
