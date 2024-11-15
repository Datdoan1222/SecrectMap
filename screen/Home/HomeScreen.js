import {
  PermissionsAndroid,
  StyleSheet,
  Platform,
  View,
  Dimensions,
  Alert,
  Image,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchMarkers,
  createMarker,
  updateMarker,
  deleteMarker,
} from '../../redux/slices/MarkerSlice';
import database from '@react-native-firebase/database';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import ButtonIcons from '../../components/items/ButtonIcons';
import {Colors} from '../../constants/ColorStyles';
import Header from '../../components/items/Header';
import {
  createLocation,
  fetchLocations,
} from '../../redux/slices/LocationsSlide';
import {FontFamily} from '../../constants/Fonts';
import IconStyles from '../../constants/IconStyles';
import Buttons from '../../components/home/Buttons';
import NavbarMarker from '../../components/items/NavbarMarker';
import {imgDefault} from '../../constants/img/location_default.png';
import TextInputMar from '../../components/home/TextInputMar';
import {useForm} from 'react-hook-form';
import {logout} from '../../redux/slices/AuthSlice';
const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const mapRef = useRef(null);
  const [items, setItems] = useState([]);
  const [img, setImg] = useState('');
  const markersData = useSelector(state => state.marker.markers);
  const LocationsData = useSelector(state => state.location.locations);
  const {width, height} = Dimensions.get('window');
  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState({
    latitude: 10.953,
    longitude: 106.8023,
    latitudeDelta: 0.1922,
    longitudeDelta: 0.1922 * (width / height),
  });
  const [searchLocation, setSearchLocation] = useState(null);
  const [selectLocation, setSelectLocation] = useState();
  const [showMarker, setShowMarker] = useState(false);
  const loading = useSelector(state => state.location.loading);

  const handleMapPress = event => {
    const coordinate = event.nativeEvent.coordinate;
    // const newMarkerId = database().ref().push().key;
    if (showMarker) {
      setShowMarker(false);
      setSelectLocation(null);
      setMarkers([]);
    } else {
      // const newMarker = {id: newMarkerId, coordinate};
      setSelectLocation(coordinate);
      setShowMarker(true);
      setMarkers([coordinate]);
    }
  };

  // lấy vị trí người dùng
  const getUsersCureentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const newRegion = {
          ...region,
          latitude,
          longitude,
        };
        const newCamera = {
          center: {
            latitude: latitude,
            longitude: longitude,
          },
          pitch: 0,
          heading: 0,
          altitude: 10,
          zoom: 10,
        };

        setRegion(newRegion);

        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000);
          mapRef.current.animateToRegion(newCamera, 1000);
        }
      },
      error => {
        console.log('Error getting location:', error);
        Alert.alert('Error', 'Unable to fetch location');
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
    );
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getUsersCureentLocation();
        } else {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to show your current location on the map.',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
    }
  };

  useEffect(() => {
    requestLocationPermission();
    dispatch(fetchLocations());
    dispatch(fetchMarkers('markerBasic'));
  }, [dispatch]);
  // search

  const handleLocationSubmit = location => {
    setSearchLocation(location);
    if (mapRef.current) {
      const newRegion = {
        latitude: parseFloat(location.latitude),
        longitude: parseFloat(location.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922 * (width / height),
      };
      mapRef.current.animateToRegion(newRegion, 2000);
    }
  };

  // add marker and name
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [showNameMarker, setShowNameMarker] = useState(false);
  const [nameMarker, setNameMarker] = useState(false);
  const [descriptionMarker, setDescriptionMarker] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleMarkerPress = () => {
    if (selectLocation) {
      setSelectedLocation(true);
    } else {
      Alert.alert('Hãy chọn vị trí trên bản đồ');
    }
  };

  const closeModal = () => {
    setSelectedLocation(false);
    setShowNameMarker(false);
  };
  const backModal = () => {
    // setSelectedLocation(true);
    setShowNameMarker(false);
  };
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const handleMarkerSelect = item => {
    setSelectedMarkerId(item);
  };

  const addMarker = () => {
    handleSubmit(data => {
      setNameMarker(data.name);
      setDescriptionMarker(data.describe);
    })();
    if (selectedMarkerId && selectLocation) {
      const newUniqueId = database().ref().push().key;
      const newLocation = {
        describe: descriptionMarker, // Bạn có thể tùy chỉnh mô tả
        imageMarker: selectedMarkerId,
        imageStatus: '', // Link ảnh trạng thái nếu có
        latitude: selectLocation.latitude,
        longitude: selectLocation.longitude,
        name: nameMarker, // Tên của location
      };
      dispatch(createLocation(newLocation));
      setMarkers([]);
      if (!loading) {
        setSelectedLocation(false);
        Alert.alert('Thêm vị trí thành công');
      }
    }
  };
  const selectAddMarker = () => {
    if (selectedMarkerId) {
      setShowNameMarker(true);
      // setSelectedLocation(false);
    } else {
      Alert.alert('', 'Bạn hãy chọn icon marker yêu thích');
    }
  };
  //

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Header
          onPress={() => {
            dispatch(logout());
          }}
          onSuggestionSelect={handleLocationSubmit}
        />
      </View>
      <MapView
        ref={mapRef}
        // provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.map}
        region={region}
        zoomEnabled={true}
        scrollEnabled={true}
        onPress={handleMapPress}>
        {/* Marker cho vị trí tìm kiếm */}
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker} />
        ))}
        {/* Hiển thị location */}
        {LocationsData &&
          LocationsData.map(location => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              onCalloutPress={() => console.log(1)}
              image={
                location.imageMarker ? {uri: location.imageMarker} : imgDefault
              }>
              <Callout>
                <View style={[styles.markercontai]}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle} numberOfLines={1}>
                      {location.name}
                    </Text>
                    {location.imageStatus ? (
                      <Text
                        style={{
                          flex: 5,
                          textAlign: 'center',
                          borderRadius: 15,
                        }}>
                        <Image
                          source={{uri: location.imageStatus}}
                          style={{
                            width: 200,
                            height: 100,
                            // alignSelf: 'center',
                          }}
                          resizeMode="cover" // Giữ nguyên tỉ lệ ảnh
                        />
                      </Text>
                    ) : (
                      <View
                        style={{
                          flex: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 15,
                        }}>
                        <IconStyles
                          name="add-sharp"
                          size={30}
                          color={Colors.primary800}
                        />
                        <Text style={styles.textimg}>Thêm ảnh</Text>
                      </View>
                    )}
                    <View style={styles.calloutDescription}>
                      <IconStyles
                        name="heart-outline"
                        size={20}
                        color={Colors.primary800}
                      />
                      <Text style={styles.textDescription} numberOfLines={1}>
                        {location.describe}
                      </Text>
                    </View>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        {searchLocation && (
          <Marker
            coordinate={{
              latitude: parseFloat(searchLocation.latitude),
              longitude: parseFloat(searchLocation.longitude),
            }}
          />
        )}
      </MapView>
      {/* thêm icon marker */}
      {selectedLocation && (
        <View style={styles.addMarkerContai}>
          <View style={styles.modalHeader}>
            <ButtonIcons
              // iconSet="Feather"
              nameIcon="arrow-back"
              colorIcon={Colors.error}
              sizeButton={30}
              sizeIcon={20}
              radiusButton={10}
              onPress={showNameMarker ? backModal : closeModal}
              disabled={showNameMarker ? false : true}
              background={showNameMarker ? '#FFFFFF' : Colors.primary100}
            />
            <Text
              style={{
                fontFamily: FontFamily.boldItalic,
                color: Colors.primary800,
                fontSize: 20,
              }}>
              {!showNameMarker ? 'Select Marker' : 'Name Marker'}
            </Text>
            <ButtonIcons
              iconSet="Feather"
              nameIcon="x"
              colorIcon={Colors.error}
              sizeButton={30}
              sizeIcon={20}
              radiusButton={10}
              onPress={closeModal}
            />
          </View>
          <View style={styles.modalContai}>
            {showNameMarker ? (
              <TextInputMar control={control} errors={errors} />
            ) : (
              <NavbarMarker width={300} selectMarker={handleMarkerSelect} />
            )}
          </View>
          <View style={styles.modalBtn}>
            <Buttons label="Cancel" onPress={closeModal} />
            <Buttons
              label={showNameMarker ? 'Add Marker' : 'Select'}
              onPress={showNameMarker ? addMarker : selectAddMarker}
              background={Colors.primary800}
            />
          </View>
        </View>
      )}
      {!selectedLocation && (
        <View style={styles.menuContai}>
          <ButtonIcons
            onPress={() => {
              getUsersCureentLocation();
            }}
            radiusButton={25}
            iconSet="FontAwesome6"
            nameIcon="location-crosshairs"
            sizeIcon={22}
            colorIcon={Colors.primary800}
          />
          <ButtonIcons
            onPress={() => {
              handleMarkerPress();
            }}
            sizeButton={80}
            radiusButton={40}
            nameIcon="add-outline"
            sizeIcon={45}
            colorIcon={Colors.primary800}
          />
          <ButtonIcons
            onPress={() => {
              navigation.navigate('MarkerStackScreen');
            }}
            radiusButton={25}
            nameIcon="location-sharp"
            sizeIcon={22}
            colorIcon={Colors.primary800}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  search: {
    zIndex: 1,
    width: '100%',
    alignItems: 'center',
  },
  menuContai: {
    position: 'absolute',
    bottom: 20,
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  btnLocation: {
    position: 'absolute',
    top: 100,
    right: 20,
  },

  marker: {
    alignItems: 'center',
  },
  markerImage: {
    width: 40,
    height: 40,
  },
  markerText: {
    color: '#1E88E5',
    fontWeight: 'bold',
  },

  //
  markercontai: {
    borderRadius: 25,
    padding: 5,
  },
  calloutContainer: {
    borderRadius: 15,
    backgroundColor: Colors.background,
    height: 200,
    width: 200,
    padding: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  calloutTitle: {
    flex: 1,
    fontFamily: FontFamily.boldItalic,
    color: Colors.primary800,
    fontSize: 20,
  },

  textimg: {
    fontFamily: FontFamily.italic,
    color: Colors.Secondary100,
    fontSize: 10,
  },
  calloutDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textDescription: {
    fontFamily: FontFamily.boldItalic,
    color: Colors.primary800,
    paddingHorizontal: 10,
  },

  //

  addMarkerContai: {
    position: 'absolute',
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    top: '20%',
    left: '5%',
    width: width * 0.9,
    height: width,
    borderRadius: 15,
    elevation: 4,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  modalContai: {
    flex: 4,
    // width: '100%',
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  modalBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
