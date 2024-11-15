import {createSlice} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

const markerSlice = createSlice({
  name: 'markers',
  initialState: {
    markers: [],
    error: null,
    loading: false, // Trạng thái loading
  },
  reducers: {
    fetchMarkersStart(state) {
      state.loading = true; // Bắt đầu loading
      state.error = null;
    },
    fetchMarkersSuccess(state, action) {
      state.markers = action.payload;
      state.loading = false; // Kết thúc loading
      state.error = null;
    },
    fetchMarkersFail(state, action) {
      state.loading = false; // Kết thúc loading
      state.error = action.payload;
    },
    createMarkerStart(state) {
      state.loading = true; // Bắt đầu loading khi tạo marker
      state.error = null;
    },
    createMarkerSuccess(state, action) {
      state.markers.push(action.payload);
      state.loading = false; // Kết thúc loading
      state.error = null;
    },
    createMarkerFail(state, action) {
      state.loading = false; // Kết thúc loading
      state.error = action.payload;
    },
    updateMarkerStart(state) {
      state.loading = true; // Bắt đầu loading khi cập nhật marker
      state.error = null;
    },
    updateMarkerSuccess(state, action) {
      const index = state.markers.findIndex(
        marker => marker.id === action.payload.id,
      );
      if (index !== -1) {
        state.markers[index] = action.payload;
      }
      state.loading = false; // Kết thúc loading
      state.error = null;
    },
    updateMarkerFail(state, action) {
      state.loading = false; // Kết thúc loading
      state.error = action.payload;
    },
    deleteMarkerStart(state) {
      state.loading = true; // Bắt đầu loading khi xóa marker
      state.error = null;
    },
    deleteMarkerSuccess(state, action) {
      state.markers = state.markers.filter(
        marker => marker.id !== action.payload,
      );
      state.loading = false; // Kết thúc loading
      state.error = null;
    },
    deleteMarkerFail(state, action) {
      state.loading = false; // Kết thúc loading
      state.error = action.payload;
    },
  },
});

// Xuất actions
export const {
  fetchMarkersStart,
  fetchMarkersSuccess,
  fetchMarkersFail,
  createMarkerStart,
  createMarkerSuccess,
  createMarkerFail,
  updateMarkerStart,
  updateMarkerSuccess,
  updateMarkerFail,
  deleteMarkerStart,
  deleteMarkerSuccess,
  deleteMarkerFail,
} = markerSlice.actions;

export default markerSlice.reducer;

// Thunk actions
export const fetchMarkers = options => async dispatch => {
  dispatch(fetchMarkersStart());

  try {
    const snapshot = await database().ref(`/markers/${options}/`).once('value');
    const data = snapshot.val();
    const locations = data
      ? Object.keys(data).map(key => ({id: key, ...data[key]}))
      : [];

    dispatch(fetchMarkersSuccess(locations));

    database()
      .ref(`/markers/${options}/`)
      .on('value', snapshot => {
        const data = snapshot.val();
        const updatedLocations = data
          ? Object.keys(data).map(key => ({id: key, ...data[key]}))
          : [];
        dispatch(fetchMarkersSuccess(updatedLocations));
      });
  } catch (error) {
    dispatch(fetchMarkersFail(error.message));
    console.log('Fetch Error:', error.message);
  }
};
export const fetchMarkersId = (options, id) => async dispatch => {
  dispatch(fetchMarkersStart());

  try {
    const snapshot = await database().ref(`/markers/${options}/${id}`).once('value');
    const data = snapshot.val();
    const locations = data
      ? Object.keys(data).map(key => ({id: key, ...data[key]}))
      : [];

    dispatch(fetchMarkersSuccess(locations));

    database()
      .ref(`/markers/${options}/`)
      .on('value', snapshot => {
        const data = snapshot.val();
        const updatedLocations = data
          ? Object.keys(data).map(key => ({id: key, ...data[key]}))
          : [];
        dispatch(fetchMarkersSuccess(updatedLocations));
      });
  } catch (error) {
    dispatch(fetchMarkersFail(error.message));
    console.log('Fetch Error:', error.message);
  }
};

export const createMarker = (options, id, newMarker) => async dispatch => {
  dispatch(createMarkerStart()); // Bắt đầu loading khi tạo marker
  try {
    await database().ref(`/markers/${options}/${id}`).set(newMarker);
    dispatch(createMarkerSuccess({id, ...newMarker}));
  } catch (error) {
    dispatch(createMarkerFail(error.message));
    console.log('Create Error:', error.message);
  }
};

export const updateMarker = (options, id, updatedData) => async dispatch => {
  // dispatch(updateMarkerStart()); // Bắt đầu loading khi cập nhật marker
  try {
    await database().ref(`/markers/${options}/${id}`).update(updatedData);
    dispatch(updateMarkerSuccess({id, ...updatedData}));
  } catch (error) {
    dispatch(updateMarkerFail(error.message));
    console.log('Update Error:', error.message);
  }
};

export const deleteMarker = (options, id) => async dispatch => {
  dispatch(deleteMarkerStart()); // Bắt đầu loading khi xóa marker
  try {
    await database().ref(`/markers/${options}/${id}`).remove();
    dispatch(deleteMarkerSuccess(id));
  } catch (error) {
    dispatch(deleteMarkerFail(error.message));
    console.log('Delete Error:', error.message);
  }
};
