import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import IconStyles from '../../constants/IconStyles';
import Header from '../../components/items/Header';
import {FontFamily} from '../../constants/Fonts';
import {Colors} from '../../constants/ColorStyles';
import NavbarMarker from '../../components/items/NavbarMarker';
import {useNavigation} from '@react-navigation/native';
import ButtonIcons from '../../components/items/ButtonIcons';

const {width, height} = Dimensions.get('window');

const MarkerScreen = () => {
  const navigation = useNavigation();
  const handleNavigate = (id, option) => {
    navigation.navigate('DetailMarScreen', {
      markerId: id,
      markerOption: option,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header noSearch onPress={() => navigation.goBack()} />
      </View>

      <NavbarMarker width={340} screen onPress={handleNavigate} />
      {/* <View style={styles.btnAddEdit}>
        <ButtonIcons
          sizeButton={70}
          radiusButton={35}
          nameIcon="add"
          sizeIcon={40}
          colorIcon={Colors.primary800}
          onPress={() => {
            navigation.navigate('EditMarScreen');
          }}
        />
      </View> */}
    </View>
  );
};

export default MarkerScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    paddingBottom: 10,
  },
  btnAddEdit: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
});
