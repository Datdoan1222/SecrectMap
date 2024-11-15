// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import markerReducer from './slices/MarkerSlice';
import locationReducer from './slices/LocationsSlide';

// Tạo store
const store = configureStore({
  reducer: {
    auth: authReducer,
    marker: markerReducer,
    location: locationReducer,
  },
});

// Định nghĩa RootState để sử dụng trong các hook
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
