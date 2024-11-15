import React, {useRef, useState} from 'react';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import storage from '@react-native-firebase/storage';
import {captureRef} from 'react-native-view-shot';

const MyImageComponent = () => {
  const svgRef = useRef(); // Sử dụng ref để lưu trữ SVG

  const circleImage = require('../../constants/img/marker.png'); // Đường dẫn tới ảnh hình tròn
  const iconImage = require('../../constants/img/football_sharp.png'); // Đường dẫn tới ảnh icon

  const [urlImg, setUrlImg] = useState('');

  const saveImage = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Thêm một thời gian trì hoãn 500ms
      const uri = await captureRef(svgRef.current, {
        format: 'png',
        quality: 0.8,
        result: 'data-uri', // Nếu bạn muốn nhận lại URI dạng Data URL
      });
      await uploadImage(uri, 'combinedImage.png');
    } catch (error) {
      console.log('Error capturing image:', error);
      Alert.alert('Lỗi', 'Không thể lưu ảnh. Vui lòng thử lại.');
    }
  };

  const uploadImage = async (uri, imageName) => {
    // try {
    //   const reference = storage().ref(`iconEdit/${imageName}`);
    //   await reference.putFile(uri);
    //   const url = await reference.getDownloadURL();
    //   setUrlImg(url);
    //   console.log('Image uploaded to Firebase storage at:', url);
    //   Alert.alert('Thành công', 'Ảnh đã được lưu thành công.');
    // } catch (error) {
    //   console.log('Error uploading image:', error);
    //   Alert.alert('Lỗi', 'Không thể tải ảnh lên Firebase. Vui lòng thử lại.');
    // }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        ref={svgRef}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 200,
          height: 200,
        }}>
        <Image source={circleImage} style={{width: 41, height: 50}} />
        <Image
          source={iconImage}
          style={{
            width: 20,
            height: 20,
            position: 'absolute',
            top: '43%',
            left: '45%',
          }}
        />
      </View>
      <TouchableOpacity onPress={saveImage}>
        <Text style={{marginTop: 20}}>Lưu ảnh</Text>
      </TouchableOpacity>
      {/* {urlImg && (
        <Image source={{uri: urlImg}} style={{width: 41, height: 50}} />
      )} */}
    </View>
  );
};

export default MyImageComponent;
