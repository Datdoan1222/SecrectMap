import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/items/Header';
import MyImageComponent from './MyImageComponent ';

const EditMarScreen = () => {
  return (
    <MyImageComponent />
  );
};

export default EditMarScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    height: 500,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
