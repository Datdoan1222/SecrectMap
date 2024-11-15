import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {FontFamily} from '../../constants/Fonts';
import {Colors} from '../../constants/ColorStyles';

const TextInputMar = ({control, errors}) => {
  return (
    <View style={{padding: 20}}>
      <Text style={styles.label}>Name Marker</Text>
      <Controller
        control={control}
        name="name"
        rules={{required: 'Name is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter name"
          />
        )}
      />
      {errors.name && <Text style={{color: 'red'}}>{errors.name.message}</Text>}

      <Text style={styles.label}>Description Marker</Text>
      <Controller
        control={control}
        name="describe"
        rules={{required: 'Description is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter description"
          />
        )}
      />
      {errors.describe && (
        <Text style={{color: 'red'}}>{errors.describe.message}</Text>
      )}
    </View>
  );
};

export default TextInputMar;
const styles = StyleSheet.create({
  label: {
    fontFamily: FontFamily.boldItalic,
    fontSize: 15,
    color: Colors.primary800,
  },
  input: {
    borderColor: Colors.primary600,
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    borderRadius: 15,
    color: Colors.Secondary100,
    fontFamily: FontFamily.italic,
  },
});
