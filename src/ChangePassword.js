import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Keyboard,
} from 'react-native';
import backgrobd from '../image/bg.jpg';

const ChangePassword = (props) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmNewPassword] = useState('');
  useEffect(() => {}, []);
  return (
    <ImageBackground style={styles.container} source={backgrobd}>
      <Text
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 17,
          fontWeight: 'bold',
          color: 'white',
          margin: 5,
        }}>
        Reset your Password
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={'New Password'}
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={'Confirm Password'}
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
export default ChangePassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    marginTop: 5,
    justifyContent: 'center',
    padding: 20,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1.3,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});
