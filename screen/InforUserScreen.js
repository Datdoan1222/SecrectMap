import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import IconStyles from '../constants/IconStyles';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../constants/ColorStyles';
import ShadowCustom from '../components/items/ShadowCustom';
import CustomNotification from '../components/items/CustomNotification';
const {width, height} = Dimensions.get('window');

const InforUserScreen = () => {
  const navigation = useNavigation();
  const [star, setStar] = useState(0);
  const [evalute, setEvalute] = useState(0);
  const Evaluate = value => {
    setStar(value);
  };
  const evaluteHanld = () => {
    setEvalute(star);
    showNotification();
  };
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  const showNotification = () => {
    setNotificationVisible(true);
  };

  const closeNotification = () => {
    setNotificationVisible(false);
  };
  return (
    <View>
      <TouchableOpacity
        style={{marginTop: 20, marginLeft: 20}}
        onPress={() => navigation.goBack()}>
        <IconStyles name="arrow-back-outline" />
      </TouchableOpacity>
      <View style={styles.body}>
        <View style={styles.imageContai}>
          <View style={styles.image}>
            <Image
              resizeMode="center"
              style={styles.img}
              source={require('../constants/img/person.png')}
            />
          </View>
        </View>
        <View style={styles.inforContai}>
          <ShadowCustom width={width - 68} height={height * 0.675} radius={25}>
            <View
              style={[styles.infor, {width: width - 70, height: height * 0.7}]}>
              <View style={styles.evaluate}>
                <Text style={styles.name}>Nguyễn Thành Chung</Text>
                <View style={styles.star}>
                  {[1, 2, 3, 4, 5].map(value => (
                    <TouchableOpacity
                      key={value}
                      onPress={() => Evaluate(value)}>
                      <IconStyles
                        size={35}
                        name={star >= value ? 'star' : 'star-outline'} // Sử dụng 'star-o' nếu chưa được chọn
                        color={star >= value ? Colors.star : '#fff'} // Thay đổi màu sắc dựa trên đánh giá
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.information}>
                <View style={styles.title}>
                  <Text style={[styles.bold, {fontSize: 20}]}>Hồ sơ</Text>
                  <View>
                    <Text
                      style={[
                        styles.bold,
                        {color: Colors.primary700, fontSize: 20},
                      ]}>
                      90%
                    </Text>
                    <Text
                      style={[
                        styles.medium,
                        {fontSize: 14, fontStyle: 'italic'},
                      ]}>
                      mức uy tín
                    </Text>
                  </View>
                </View>
                <View style={styles.content}>
                  <View style={styles.itemContent}>
                    <Text style={[styles.bold]}>Hoạt động</Text>
                    <Text style={[styles.medium]}>350 ngày</Text>
                  </View>
                  <View style={styles.itemContent}>
                    <Text style={[styles.bold]}>Ngày sinh</Text>
                    <Text style={[styles.medium]}>03/09/2003</Text>
                  </View>
                  <View style={styles.itemContent}>
                    <Text style={[styles.bold]}>Nơi sống</Text>
                    <Text style={[styles.medium]}>phường Bửu Long</Text>
                  </View>
                </View>
              </View>
              <View style={styles.btnevaluate}>
                <TouchableOpacity onPress={evaluteHanld} style={styles.btn}>
                  <Text style={styles.textbtn}>Đánh giá</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ShadowCustom>
        </View>
      </View>
      <CustomNotification
        visible={isNotificationVisible}
        message={!star ? 'Đánh giá thất bại' : 'Đánh giá thành công'}
        description={!star ? 'Bạn chưa lựa chọn sao' : ''}
        onClose={closeNotification}
        status={star}
      />
    </View>
  );
};

export default InforUserScreen;

const styles = StyleSheet.create({
  body: {
    marginTop: '10%',
    marginHorizontal: 40,
  },
  imageContai: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    width: 120,
    height: 120,
    borderWidth: 1,
    borderRadius: 100,
  },

  img: {
    width: 120,
    height: 120,
  },
  inforContai: {
    position: 'absolute',
    top: 70,
  },
  infor: {
    borderRadius: 25,
  },
  evaluate: {
    backgroundColor: Colors.primary700,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 50,
  },
  name: {
    marginVertical: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  star: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //
  information: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemContent: {
    borderBottomWidth: 1,
    borderColor: Colors.shadowPrimary,
    paddingVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
    color: Colors.text,
    fontSize: 16,
  },
  medium: {
    padding: 5,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  btnevaluate: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  btn: {
    backgroundColor: Colors.primary700,
    minWidth: 120,
    minHeight: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbtn: {
    color: '#fff',
    fontSize: 15,
  },
});
