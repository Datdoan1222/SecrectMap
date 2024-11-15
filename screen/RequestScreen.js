import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/items/Header';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Colors} from '../constants/ColorStyles';
import RequestButton from '../components/request/RequestButton';
import RequestForm from '../components/request/RequestForm';
import IconStyles from '../constants/IconStyles';
import ShadowCustom from '../components/items/ShadowCustom';
import ItemRequest from '../components/request/ItemRequest ';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const {width, height} = Dimensions.get('window');

function RequestScreen() {
  // chua co data
  const [data, setData] = useState(false);
  const [dataUser, setDataUser] = useState(false);
  const [createRequest, setCreateRequest] = useState(false);
  //
  const addUser = async (userId, name, age) => {
    await database()
      .ref(`/users/${userId}`)
      .set({
        name: name,
        age: age,
      })
      .then(() => console.log('User added!'))
      .catch(error => console.log(error));
  };
  // addUser('1', 'dat', '12');
  const user = useSelector(state => state.auth.user);

  const NoRequest = () => {
    return (
      <>
        {!createRequest ? (
          <View style={styles.contaiNoRequest}>
            <LocationMap />
            {data ? (
              <View>
                <Image
                  style={{
                    width: width * 0.34,
                    height: height * 0.13,
                    margin: 20,
                  }}
                  source={require('../constants/img/no_request.png')}
                />
                <Text
                  style={{
                    color: Colors.text,
                    fontStyle: 'italic',
                    fontSize: 13,
                  }}>
                  Bạn chưa có yêu cầu nào
                </Text>
                <RequestButton
                  onPress={() => setCreateRequest(true)}
                  name="Tạo"
                />
              </View>
            ) : (
              <Request />
            )}
          </View>
        ) : (
          <CreateRequest />
        )}
      </>
    );
  };

  const CreateRequest = () => {
    return (
      <View style={styles.contaiNoRequest}>
        <RequestForm />
      </View>
    );
  };
  const Request = () => {
    
    const navigation = useNavigation();
    const [datRequests, setDataRequests] = useState([]);
    const [loadingRequest, setLoadingRequest] = useState(true);
    useEffect(() => {
      const onDataChange = snapshot => {
        if (snapshot.exists()) {
          const fetchedData = snapshot.val();
          const formattedData = Object.keys(fetchedData).map(key => ({
            id: key,
            ...fetchedData[key],
          }));
          setDataRequests(formattedData); 
        } else {
          console.log('No data available');
          setDataRequests([]); 
        }
        setLoadingRequest(false); 
      };

      const reference = database().ref('/listRequest');
      const onValueChange = reference.on('value', onDataChange, error => {
        console.log('Error fetching data: ', error);
        setLoadingRequest(false); 
      });

      return () => reference.off('value', onDataChange);
    }, []);
    const renderItem = ({item}) => (
      <ShadowCustom width={width - 40} height={height * 0.19} radius={10}>
        <View
          style={[
            styles.contaiRequest,
            {
              backgroundColor: '#fff',
              height: height * 0.19,
            },
          ]}>
          <ItemRequest
            onPressInfor={() => navigation.navigate('InforUser')}
            onPressDetail={() => navigation.navigate('DetailRequest')}
            item={item}
          />
        </View>
      </ShadowCustom>
    );
    if (loadingRequest) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (data.length === 0) {
      return <Text>No data available</Text>;
    }
    return (
      <FlatList
        data={datRequests}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    );
  };
  const LocationMap = () => {
    return (
      <View style={styles.locationMap}>
        <View style={styles.map}></View>
        <View style={styles.content}>
          <Text
            style={[{fontSize: 12, fontStyle: 'italic', color: Colors.text}]}>
            Trường Đại Học Lạc Hồng
          </Text>
          <Text
            style={[
              {
                fontSize: 21,
                fontWeight: 'bold',
                marginVertical: 10,
                color: Colors.text,
              },
            ]}>
            Vị trí của tôi
          </Text>
          <Text
            style={[
              {
                fontSize: 10,
                color: Colors.textSecondary,
                fontStyle: 'italic',
              },
            ]}>
            Chi tiết địa chỉ
          </Text>
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}>
      <View style={styles.container}>
        <Header />
        <View style={[styles.body]}>
          <View
            style={[
              styles.request,
              {
                paddingBottom: height * 0.19,
              },
            ]}>
            <Text style={styles.title}>Yêu cầu của bạn</Text>
            {!data ? <Request /> : <NoRequest />}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default RequestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary700,
  },
  body: {
    position: 'absolute',
    top: height * 0.2,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 43,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  },
  map: {
    width: 166,
    height: 115,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  locationMap: {
    marginTop: 10,
    backgroundColor: Colors.primary100,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    height: height * 0.16,
  },
  content: {
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  request: {
    marginTop: 20,
    flex: 1,
  },
  // No Request
  contaiNoRequest: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Request
  contaiRequest: {
    paddingVertical: 10,
    borderRadius: 10,
  },
});
