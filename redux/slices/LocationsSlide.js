import {createSlice} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

const locationSlice = createSlice({
  name: 'locations',
  initialState: {
    locations: [],
    error: null,
    loading: false,
  },
  reducers: {
    fetchLocationsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLocationsSuccess(state, action) {
      state.locations = action.payload;
      state.loading = false; // Đặt loading thành false khi thành công
      state.error = null;
    },
    fetchLocationsFail(state, action) {
      state.loading = false; // Đặt loading thành false khi thất bại
      state.error = action.payload;
    },
    createLocationStart(state) {
      state.loading = true; // Bắt đầu tạo vị trí
      state.error = null;
    },
    createLocationSuccess(state, action) {
      state.locations.push(action.payload);
      state.loading = false; // Đặt loading thành false khi thành công
      state.error = null;
    },
    createLocationFail(state, action) {
      state.loading = false; // Đặt loading thành false khi thất bại
      state.error = action.payload;
    },
    updateLocationStart(state) {
      state.loading = true; // Bắt đầu cập nhật vị trí
      state.error = null;
    },
    updateLocationSuccess(state, action) {
      const index = state.locations.findIndex(
        location => location.id === action.payload.id,
      );
      if (index !== -1) {
        state.locations[index] = action.payload;
      }
      state.loading = false; // Đặt loading thành false khi thành công
      state.error = null;
    },
    updateLocationFail(state, action) {
      state.loading = false; // Đặt loading thành false khi thất bại
      state.error = action.payload;
    },
    deleteLocationStart(state) {
      state.loading = true; // Bắt đầu xóa vị trí
      state.error = null;
    },
    deleteLocationSuccess(state, action) {
      state.locations = state.locations.filter(
        location => location.id !== action.payload,
      );
      state.loading = false; // Đặt loading thành false khi thành công
      state.error = null;
    },
    deleteLocationFail(state, action) {
      state.loading = false; // Đặt loading thành false khi thất bại
      state.error = action.payload;
    },
  },
});

export const {
  fetchLocationsStart,
  fetchLocationsSuccess,
  fetchLocationsFail,
  createLocationStart,
  createLocationSuccess,
  createLocationFail,
  updateLocationStart,
  updateLocationSuccess,
  updateLocationFail,
  deleteLocationStart,
  deleteLocationSuccess,
  deleteLocationFail,
} = locationSlice.actions;

export default locationSlice.reducer;

// Thunk actions
export const fetchLocations = () => async dispatch => {
  dispatch(fetchLocationsStart());

  try {
    const snapshot = await database().ref(`/locations/`).once('value');
    const data = snapshot.val();
    const locations = data
      ? Object.keys(data).map(key => ({id: key, ...data[key]}))
      : [];

    dispatch(fetchLocationsSuccess(locations));

    database()
      .ref('/locations/')
      .on('value', snapshot => {
        const data = snapshot.val();
        const updatedLocations = data
          ? Object.keys(data).map(key => ({id: key, ...data[key]}))
          : [];
        dispatch(fetchLocationsSuccess(updatedLocations));
      });
  } catch (error) {
    dispatch(fetchLocationsFail(error.message));
    console.log('Fetch Error:', error.message);
  }
};

export const createLocation = newLocation => async dispatch => {
  dispatch(createLocationStart()); // Gọi hàm bắt đầu tạo vị trí
  const newUniqueId = database().ref().push().key;
  try {
    await database().ref(`/locations/${newUniqueId}`).set(newLocation);
    dispatch(createLocationSuccess({id, ...newLocation}));
    console.log('Create: thành công');
  } catch (error) {
    dispatch(createLocationFail(error.message));
    console.log('Create Error:', error.message);
  }
};

export const updateLocation = (id, updatedData) => async dispatch => {
  dispatch(updateLocationStart()); // Gọi hàm bắt đầu cập nhật vị trí
  try {
    await database().ref(`/locations/${id}`).update(updatedData);
    dispatch(updateLocationSuccess({id, ...updatedData}));
  } catch (error) {
    dispatch(updateLocationFail(error.message));
    console.log('Update Error:', error.message);
  }
};

export const deleteLocation = id => async dispatch => {
  dispatch(deleteLocationStart()); // Gọi hàm bắt đầu xóa vị trí
  try {
    await database().ref(`/locations/${id}`).remove();
    dispatch(deleteLocationSuccess(id));
  } catch (error) {
    dispatch(deleteLocationFail(error.message));
    console.log('Delete Error:', error.message);
  }
};
