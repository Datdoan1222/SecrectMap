import {
  StyleSheet,
  Text,
  Button,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Colors} from '../../constants/ColorStyles';
// import Buttons from './Buttons';
import RequestInput from './RequestInput';
import IconStyles from '../../constants/IconStyles';
import RequestButton from './RequestButton';
import CustomNotification from '../items/CustomNotification';
const RequestForm = ({title, login, onPress, onsubmit}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    // onsubmit(data);
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
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20} // Thêm khoảng cách thêm khi cuộn
        enableOnAndroid={true} // Kích hoạt trên Android
      >
        <View style={styles.textInputs}>
          <Text style={styles.title}>{title}</Text>
          <RequestInput
            errors={errors.name}
            control={control}
            name="name"
            rules={{required: ''}}
            placeholder="vd: Giao hàng, Yêu cầu xếp hàng"
            title="Tên yêu cầu"
          />
          <RequestInput
            errors={errors.name}
            control={control}
            name="description"
            rules={{required: ''}}
            placeholder="vd: Hãy đến vị trí của tôi lấy hàng và giao đến bệnh viện"
            title="Yêu cầu"
            heights={100}
          />
          <RequestInput
            errors={errors.name}
            control={control}
            name="location"
            rules={{required: ''}}
            placeholder="Hãy nhập địa điểm"
            title="Vị trí cần đến"
            isSelect={true}>
            <IconStyles iconSet="Ionicons" name="map-outline" size={20} />
          </RequestInput>
          <RequestInput
            errors={errors.name}
            control={control}
            name="money"
            rules={{required: ''}}
            placeholder="50.000VND"
            title="Thành tiền"
            isSelect={true}>
            <IconStyles iconSet="Ionicons" name="create-outline" size={20} />
          </RequestInput>
        </View>

        <View style={styles.btnCreate}>
          <RequestButton onPress={handleSubmit(onSubmit)} name="Tạo" />
        </View>
      </KeyboardAwareScrollView>
      <CustomNotification
        visible={isNotificationVisible}
        message="Tạo yêu cầu thành công"
        description=""
        onClose={closeNotification}
      />
    </>
  );
};

export default RequestForm;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    height: '100%',
  },
  textInputs: {},
  btnContai: {
    marginVertical: 30,
    justifyContent: 'space-between',
  },
  btnLogin: {
    marginVertical: 10,
  },
  btnCreate: {
    alignItems: 'center',
    fontSize: 15,
    fontStyle: 'italic',
  },
  registerText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Colors.primary700,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  input: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});
