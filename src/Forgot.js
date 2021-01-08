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

const Forgot = ({navigation}) => {
  const [openTheKeyboard, setopenTheKeyboard] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [visible, setVisible] = useState(true);
  const checkEmail = (value) => {
    navigation.navigate('OtpVerifyScreen', {
      Email: value,
      ScreenName: 'Forgot',
    });
  };

  return (
    <ImageBackground style={styles.container} source={backgrobd}>
      <Text style={styles.headertext}>Forgot your Password ?</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={'email'}
          keyboardType="email-address"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={checkEmail}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
export default Forgot;

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
  headertext: {
    fontSize: 18,
    margin: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  normal: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 5,
    textAlign: 'center',
    color: 'white',
  },
});
