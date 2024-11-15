import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconStyles from '../../constants/IconStyles';
import {Colors} from '../../constants/ColorStyles';
import {FontFamily} from '../../constants/Fonts';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMarkers, updateMarker} from '../../redux/slices/MarkerSlice';
import ButtonIcons from './ButtonIcons';
import {useNavigation} from '@react-navigation/native';
const NavbarMarker = ({width, selectMarker, screen, onPress}) => {
  const navigation = useNavigation();
  const fontSize = width * 0.05;
  const dispatch = useDispatch();
  const [options, setOptions] = useState('markerBasic');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loadingItem, setLoadingItem] = useState(null);
  const loading = useSelector(state => state.marker.loading);
  const markersData = useSelector(state => state.marker.markers);

  useEffect(() => {
    dispatch(fetchMarkers(options));
    if (loadingItem === null) {
      dispatch(fetchMarkers(options));
    }
  }, [loadingItem, options, dispatch]);

  const fetchData = option => {
    setOptions(option);
  };
  const selectItem = id => {
    setSelectedItem(id);
    selectMarker(id);
  };
  const handleFavouritePress = item => {
    const updatedData = {favourite: !item.favourite};
    setLoadingItem(item.id);

    // Cập nhật trực tiếp trong Redux store trước khi gửi yêu cầu API
    dispatch(updateMarker(options, item.id, updatedData));

    // Cập nhật lại marker trong local state
    const updatedMarkersData = markersData.map(marker => {
      if (marker.id === item.id) {
        return {...marker, favourite: updatedData.favourite};
      }
      return marker;
    });
    dispatch({type: 'marker/setMarkers', payload: updatedMarkersData}); // Giả sử bạn đã tạo một action setMarkers

    // Gọi API để cập nhật trên server
    dispatch(updateMarker(options, item.id, updatedData))
      .then(() => {
        !item.favourite
          ? Alert.alert(
              '',
              `Bạn đã thêm icon marker ${item.name} vào yêu thích`,
            )
          : Alert.alert(
              '',
              `Bạn đã bỏ icon marker ${item.name} ra khỏi yêu thích`,
            );
      })
      .catch(error => {
        Alert.alert('Thông báo', 'Cập nhật sở thích thất bại!');
        console.log(error);
      })
      .finally(() => {
        setLoadingItem(null);
      });
  };


  const renderItemSmall = ({item}) => {
    let backgroundItem = options !== 'markerEdit';
    const isSelected = selectedItem === item.image;

    return (
      <TouchableOpacity
        onPress={() => {
          selectItem(item.image);
        }}
        style={[
          styles.itemContainer,
          backgroundItem && {backgroundColor: Colors.background},
          isSelected && {backgroundColor: '#FFFFFF', elevation: 4}, // Apply selected styles
        ]}>
        {item.image && (
          <Image
            source={{uri: item.image}}
            style={[
              !backgroundItem
                ? {width: 30, height: 30}
                : {width: 40, height: 50},
            ]}
          />
        )}
      </TouchableOpacity>
    );
  };
  const renderItemBig = ({item}) => {
    return (
      <TouchableOpacity style={styles.body} onPress={() => onPress(item.id, options)}>
        <View style={styles.item}>
          <View style={styles.iconMarker}>
            {item.image && (
              <Image
                source={{uri: item.image}}
                style={{width: 63, height: 77}}
              />
            )}
          </View>
          <View style={styles.tileMake}>
            <View style={styles.favourite}>
              <ButtonIcons
                background={Colors.background}
                sizeButton={40}
                nameIcon={item.favourite ? 'heart' : 'heart-outline'}
                colorIcon={Colors.favourite}
                sizeIcon={20}
                onPress={() => handleFavouritePress(item)}
              />
            </View>
            <View style={styles.nameContai}>
              <Text style={styles.nameText} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[
            styles.btnNavBar,
            {width: width * 0.24},
            options == 'markerBasic' && {backgroundColor: Colors.primary800},
          ]}
          onPress={() => {
            fetchData('markerBasic');
          }}>
          <IconStyles
            name="location-sharp"
            size={fontSize}
            color={options == 'markerBasic' ? '#FFFFFF' : Colors.ColorText}
          />
          <Text
            style={[
              styles.buttonText,
              {fontSize: fontSize},
              options == 'markerBasic'
                ? {color: '#FFFFFF'}
                : {color: Colors.ColorText},
            ]}>
            Basic
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnNavBar,
            {width: width * 0.37},
            options == 'markerPro' && {backgroundColor: Colors.primary800},
          ]}
          onPress={() => {
            fetchData('markerPro');
          }}>
          <IconStyles
            name="sparkles"
            size={fontSize}
            color={options == 'markerPro' ? '#FFFFFF' : Colors.ColorText}
          />
          <Text
            style={[
              styles.buttonText,
              {fontSize: fontSize},
              options == 'markerPro'
                ? {color: '#FFFFFF'}
                : {color: Colors.ColorText},
            ]}>
            Advanced
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnNavBar,
            {width: width * 0.24},
            options == 'markerEdit' && {backgroundColor: Colors.primary800},
          ]}
          onPress={() => {
            fetchData('markerEdit');
          }}>
          <IconStyles
            name="color-wand"
            size={fontSize}
            color={options == 'markerEdit' ? '#FFFFFF' : Colors.ColorText}
          />
          <Text
            style={[
              styles.buttonText,
              {fontSize: fontSize},
              options == 'markerEdit' && {color: '#FFFFFF'},
            ]}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          {
            marginTop: 10,
            marginBottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
          },
          screen ? {height: '83.5%', marginBottom: 16} : {height: 150},
        ]}>
        {loading && loadingItem === null ? (
          <ActivityIndicator size="big" color="#0000ff" />
        ) : (
          <FlatList
            data={markersData}
            renderItem={screen ? renderItemBig : renderItemSmall}
            keyExtractor={item => item.id}
            numColumns={screen ? 2 : 5}
          />
        )}
      </View>
    </View>
  );
};

export default NavbarMarker;

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnNavBar: {
    // flex: 1,
    flexDirection: 'row',
    paddingVertical: '3%',
    backgroundColor: '#FFFFFF',
    marginHorizontal: '1%',
    paddingHorizontal: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: Colors.ColorText,
  },
  //
  itemContainer: {
    margin: 3,
    padding: 4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  describe: {
    fontSize: 14,
    color: '#666',
  },
  //
  body: {
    padding: 5,
  },
  item: {
    height: 160,
    width: 160,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  iconMarker: {
    flex: 2,
    justifyContent: 'center',
  },
  tileMake: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  nameContai: {
    flex: 1,
    marginRight: 20,
    marginLeft: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nameText: {
    fontFamily: FontFamily.boldItalic,
    fontSize: 15,
    color: Colors.primary800,
  },
});
