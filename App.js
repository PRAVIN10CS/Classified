/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreeen from './src/SplashScreen';
import Login from './src/Login';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import ExpoEvent from './src/ExpoEvent';
import Forgot from './src/Forgot';
import ChangePassword from './src/ChangePassword';
import OtpVerifyScreen from './src/OtpVerifyScreen';
import RegisterWeb from './src/RegisterWeb';
import ForgetWeb from './src/RegisterWeb'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer initialRouteName="SplashScreen">
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreeen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterWeb"
          component={RegisterWeb}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="ForgetWeb"
          component={ForgetWeb}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpVerifyScreen"
          component={OtpVerifyScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ExpoEvent"
          component={ExpoEvent}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
