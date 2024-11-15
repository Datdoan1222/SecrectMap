import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import {Marker} from 'react-native-maps';

export const MarkerUser = ({region}) => {
  return (
    <Marker
      coordinate={{latitude: region.latitude, longitude: region.longitude}}>
      <Animatable.Image
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        duration={1500}
        source={require('../../constants/img/location_user.png')}
        style={styles.heartbeat}
      />
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartbeat: {
    width: 50,
    height: 50,
  },
});
