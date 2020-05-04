import * as React from 'react';
import { Platform, StatusBar, StyleSheet, InteractionManager } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/LoginScreen';
import useLinking from './navigation/useLinking';
import RegisterScreen from './screens/RegisterScreen';
import PostScreen from './screens/PostScreen';
import FacebookScreen from './screens/Companies/facebookScreen'
import * as firebase from 'firebase'
import config from './config'
import GoogleScreen from './screens/Companies/googleScreen';
import AmazonScreen from './screens/Companies/amazonScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { decode, encode } from 'base-64'
import DetailsScreen from "./screens/DetailsScreen";
import MicrosoftScreen from './screens/Companies/microsoftScreen';
import AppleScreen from './screens/Companies/appleScreen';
import IntelScreen from './screens/Companies/intelScreen';
import ChannelPost from './screens/ChannelPost'


if (Platform.OS !== 'web') {
  global.crypto = require("@firebase/firestore");
  global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }
  if (!global.btoa) { global.btoa = encode; }
  if (!global.atob) { global.atob = decode; }
}

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'ios' || Platform.OS === 'android') {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = id => {
    if (typeof id === 'string' && id.startsWith('_lt_')) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}

const Stack = createStackNavigator();


export default function App(navigation, props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  if (!firebase.app.length) {
    firebase.initializeApp(config.firebaseConfig);
  }
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {

    return (
      // <SafeAreaView style={styles.container}>
      <SafeAreaProvider>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState} style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: 'Login' }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerLeft: null }} />
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerLeft: null, gestureEnabled: false }} />
            <Stack.Screen name="PostScreen" component={PostScreen} options={{ headerTitle: 'Request' }} />
            <Stack.Screen name="Facebook" component={FacebookScreen} options={{ headerTitle: 'Facebook' }} />
            <Stack.Screen name="Google" component={GoogleScreen} options={{ headerTitle: 'Google' }} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ headerTitle: 'Details' }} />
            <Stack.Screen name="Amazon" component={AmazonScreen} options={{headerTitle: 'Amazon' }} />
            <Stack.Screen name="Microsoft" component={MicrosoftScreen} options={{headerTitle: 'Microsoft' }} />
            <Stack.Screen name="Apple" component={AppleScreen} options={{headerTitle: 'Apple' }} />
            <Stack.Screen name="Intel" component={IntelScreen} options={{headerTitle: 'Intel' }} />
            <Stack.Screen name="ChannelPost" component={ChannelPost} options={{ headerTitle: 'Post' }} />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
      //  </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#',
  },
});
