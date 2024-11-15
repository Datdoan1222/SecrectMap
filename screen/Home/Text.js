import React from 'react';
import MapView, {PROVIDER_DEFAULT} from 'react-native-maps';

const Text = () => {
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{flex: 1}}
      initialRegion={{
        latitude: 10.7769, // Tọa độ latitude
        longitude: 106.6951, // Tọa độ longitude
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      customMapStyle={[]} // Chỉnh sửa kiểu bản đồ nếu cần
    />
  );
};

export default Text;
