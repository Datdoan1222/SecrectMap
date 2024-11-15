import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import IconStyles from '../../constants/IconStyles';
import {Colors} from '../../constants/ColorStyles';
import ButtonIcons from './ButtonIcons';
import Search from './Search';
import {FontFamily} from '../../constants/Fonts';
const {width, height} = Dimensions.get('window');

const Header = ({
  onPress,
  onSuggestionSelect,
  rowReverse,
  noSearch,
  lablel,
}) => {
  const user = useSelector(state => state.auth.user);

  return (
    <View
      style={[styles.container, rowReverse && {flexDirection: 'row-reverse'}]}>
      {!noSearch && (
        <View style={styles.search}>
          <Search onSuggestionSelect={onSuggestionSelect} />
        </View>
      )}
      <View style={styles.btn}>
        <ButtonIcons
          nameIcon={rowReverse || noSearch ? 'arrow-back' : 'person'}
          sizeIcon={27}
          colorIcon={Colors.primary800}
          onPress={onPress}
        />
      </View>
      {lablel && (
        <Text
          style={{
            fontFamily: FontFamily.bold,
            fontSize: 17,
            color: Colors.ColorText,
          }}>
          {lablel}
        </Text>
      )}
      {lablel && (
        <View>
          <ButtonIcons
            nameIcon="ellipsis-horizontal-sharp"
            sizeIcon={27}
            colorIcon={Colors.primary800}
            onPress={onPress}
          />
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  search: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  infor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
  },
  notifi: {
    width: 45,
    height: 45,
    backgroundColor: Colors.primary400,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tetx: {
    color: '#fff',
  },
});
