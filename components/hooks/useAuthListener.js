// src/hooks/useAuthListener.tsx
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess, logoutUser } from '../redux/slices/authSlice';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const useAuthListener = () => {
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        emailVerified: user.emailVerified,
      };
      dispatch(loginSuccess(userData));
    } else {
      dispatch(logoutUser());
    }

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  return initializing;
};

export default useAuthListener;
