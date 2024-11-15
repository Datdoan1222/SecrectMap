import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../components/items/Header';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../constants/ColorStyles';
import {useForm} from 'react-hook-form';
import {FontFamily} from '../../constants/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMarkers, fetchMarkersId} from '../../redux/slices/MarkerSlice';
const DetailMarScreen = ({route}) => {
  const {markerId, markerOption} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const markersData = useSelector(state => state.marker.markers);
  const loading = useSelector(state => state.location.loading);
  useEffect(() => {
    dispatch(fetchMarkersId(markerOption, markerId));
  }, [markerId]);
  const data = markersData[markerId];
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="big" color={Colors.primary800} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header onPress={() => navigation.goBack()} noSearch lablel="Detai" />
      </View>
      <View style={styles.map}>
        <View style={{elevation: 4, borderRadius: 15}}>
          <Image
            source={require('../../constants/img/map.png')}
            style={styles.img}
          />
          {data.image && (
            <Image
              source={{uri: data.image}}
              style={{
                width: 42,
                height: 51,
                position: 'absolute',
                top: '30%',
                left: '30%',
              }}
            />
          )}
        </View>
      </View>
      <View style={styles.status}>
        <View style={[styles.box, {flex: 1.7}]}>
          <Text style={[styles.textLablel]}>{data.name}</Text>
        </View>
        <View style={[styles.box, {flex: 1.2}]}>
          <Text style={styles.textOption}>{markerOption}</Text>
        </View>
      </View>
      <View style={[styles.description]}>
        <Text style={styles.textDescription}>
          Description: <Text style={styles.textDes}>{data.describe}</Text>
        </Text>
      </View>
    </View>
  );
};

export default DetailMarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flex: 0.5,
    marginTop: 10,
  },
  map: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    borderRadius: 15,
    width: 250,
    height: 250,
    elevation: 4,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  box: {
    alignSelf: 'stretch',
    minHeight: 40,
    paddingVertical: 10,
    borderColor: Colors.primary800,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    elevation: 4,
  },
  textLablel: {
    fontFamily: FontFamily.boldItalic,
    color: Colors.ColorText,
    fontSize: 16,
  },
  textOption: {
    fontFamily: FontFamily.italic,
    color: Colors.ColorText,
    fontSize: 14,
  },
  description: {
    marginTop: 20,
    flex: 2,
    paddingHorizontal: 30,
  },
  textDescription: {
    fontFamily: FontFamily.boldItalic,
    fontSize: 15,
    color: Colors.ColorText,
  },
  textDes: {
    fontFamily: FontFamily.italic,
    fontSize: 14,
    letterSpacing: 0.5,
    color: Colors.textPrimary,
  },
});
