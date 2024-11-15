
import React, {  useEffect, useState } from 'react';
import { Provider  } from 'react-redux';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';


import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import screen
import HomeScreen from './screen/Home/HomeScreen';
import UserScreen from './screen/User/UserScreen';
import EditMarScreen from './screen/Marker/EditMarScreen';
import DetailMarScreen from './screen/Marker/DetailMarScreen';

// impport Auth
import StartScreen from './screen/Login/StartScreen';
import LoginScreen from './screen/Login/LoginScreen';
import RegisterScreen from './screen/Login/RegisterScreen';

import store from './redux/store';
import MarkerScreen from './screen/Marker/MarkerScreen';


const AuthStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator  
    screenOptions={{
      headerShown: false
    }}>
      <AuthStack.Screen name="StartScreen" component={StartScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

const MarkerStack = createStackNavigator();
function MarkerStackScreen() {

  return (
    <MarkerStack.Navigator  
      screenOptions={{
      headerShown: false
    }}>
      <MarkerStack.Screen name="MarkerScreen" component={MarkerScreen} />
      <MarkerStack.Screen name="DetailMarScreen" component={DetailMarScreen} />
      <MarkerStack.Screen name="EditMarScreen" component={EditMarScreen} />
    </MarkerStack.Navigator>
  );
}

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();
function MainStackScreen() {
  return(
    <MainStack.Navigator  
      screenOptions={{
      headerShown: false
    }}>
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
      {/* <MainStack.Screen name="UserScreen" component={UserScreen} /> */}
      <MainStack.Screen name="MarkerStackScreen" component={MarkerStackScreen} />
      <MainStack.Screen name="EditMarScreen" component={EditMarScreen} />
      <MainStack.Screen name="DetailMarScreen" component={DetailMarScreen} />
    </MainStack.Navigator>
)
}

function Navigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  // const user = useSelector((state: RootState) => state.auth.user);

  function onAuthStateChanged(user : FirebaseAuthTypes.User | null) {
    setUser(user);    
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);
  if (initializing) return null; 
  
  return !user ?  <AuthStackScreen/> : <MainStackScreen/>; 
}
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
    </Provider>

  );
}
export default App;
