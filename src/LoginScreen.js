import React, { useEffect, useRef, useState } from 'react';
import {View,Text,StyleSheet,ImageBackground,TextInput,TouchableOpacity,  SafeAreaView, Linking,StatusBar,Keyboard} from 'react-native';
  import backgrobd from '../image/bg.jpg';
  import Service from '../service';
  
  const LoginScreen = ({ navigation, route }) => {
  console.log(navigation);
  console.log(route);
  
  const [email, setEmail] = useState('');
  const [otpMethod, setOtpMethod] = useState(true);
  const [password, setPassword] = useState('');
  
  useEffect(() => {
  console.log(otpMethod);
  }, [otpMethod]);
  
  const getOtp = () => {
  Keyboard.dismiss();
  console.log(checkValidation());
  var IndNum = /^[0]?[789]\d{9}$/;
  if (IndNum.test(email)) {
  if (checkValidation()) {
  navigation.navigate('OtpVerifyScreen', {
  Email: email,
  ScreenName: 'LoginScreen',
  });
  }
  } else {
  alert('not a valid mobile number');
  }
  };
  const checkValidation = () => {
  if (email === '') {
  alert('Please enter Email or Phone number');
  console.log(false);
  return false;
  } else if (password === '' && otpMethod) {
  console.log(false);
  alert('Please enter password');
  return false;
  }
  console.log(true);
  return true;
  };
  const forgetApi = () => {
  Service.get('/index.php', { method: 'ForgotUrl' }).then(
  async ({ data }) => {
  console.log(data.url);
  navigation.navigate('ForgetWeb', { url: data.url });
  },
  );
  }; 
  const onSignInPress = () => {
  Keyboard.dismiss();
  console.log(checkValidation);
  const re =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (re.test(email)===true) 
  {
  if (checkValidation()) {
  Service.get('/index.php',{
  email:email,
  password:password,
  method:'LoginUserApi'
  }).then(async ({data})=>{
  console.log(data.data)
  navigation.navigate('ExpoEvent',({ url: data.data.url,token:data.data.token_id }))
  }
     
  )
 
  }
  } 
  else {
  alert('email is not proper');
  }
  };
  RegisterFunction = () => {
  Service.get('/index.php', { method: 'RegisterUrl' }).then(
  async ({ data }) => {
  console.log(data);
  navigation.navigate('RegisterWeb', { url: data.url });
 
  },
  );
  };
  const validate=()=>{
   
    const reg = /^[0]?[789]\d{9}$/;
    console.log(reg.test(email))
    console.log(isNaN(email))
     if (reg.test(email) === false || isNaN(email)) {
    setOtpMethod(true);
    console.log(otpMethod)
    } else {
    setOtpMethod(false);
    console.log(otpMethod)
    }
  }
  
  return (
  <ImageBackground style={{ flex: 1 }} source={backgrobd}>
  <View style={styles.container}>
  <View style={styles.inputView}>
<TextInput
  style={styles.inputText}
  autoCapitalize="none"
  placeholder={'Email or Phone Number'}
  autoCorrect={false}
  onBlur={e => validate()}
  // onEndEditing={(value) => {
  // var regex = /^[a-zA-Z]+$/;
  // if (value.nativeEvent.text.match(regex)) {
  // setOtpMethod(true);
  // } else {
  // setOtpMethod(false);
  // }
  // }}
  onChangeText={(value) => setEmail((value)  
)}
  />
  </View>
  {otpMethod && (
  <View style={styles.inputView}>
  <TextInput
  style={styles.inputText}
  autoCapitalize="none"
  secureTextEntry={true}
  textContentType="password"
  placeholder={'password'}
  autoCorrect={false}
  onChangeText={(value) => setPassword(value)}
  />
  </View>
  )}
  <TouchableOpacity
  onPress={() => {
  forgetApi();
  // navigation.navigate('ForgetWeb');
  }}>
  <Text style={styles.forgot}>Forgot Password?</Text>
  </TouchableOpacity>
  {otpMethod && (
  <TouchableOpacity style={styles.loginBtn} onPress={onSignInPress}>
  <Text style={styles.loginText}>LOGIN</Text>
  </TouchableOpacity>
  )}
  {!otpMethod && (
  <TouchableOpacity style={styles.loginBtn} onPress={getOtp}>
  <Text style={styles.loginText}>LOGIN VIA OTP</Text>
  </TouchableOpacity>
  )}
  <TouchableOpacity
  style={styles.registerBtn}
  onPress={() => {
  RegisterFunction();
  }}>
  <Text style={styles.loginText}>REGISTER</Text>
  </TouchableOpacity>
  </View>
  </ImageBackground>
  );
  };
  
  const styles = StyleSheet.create({
  inputView: {
  width: '80%',
  backgroundColor: '#fff',
  borderRadius: 25,
  height: 50,
  marginBottom: 20,
  justifyContent: 'center',
  padding: 20,
  },
  inputText: {
  height: 50,
  color: 'black',
  },
  loginText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 13,
  letterSpacing: 1.3,
  },
  forgot: {
  color: 'white',
  fontSize: 12,
  textDecorationLine: 'underline',
  },
  container: {
  flex: 1,
  // backgroundColor: '#003f5c',
  alignItems: 'center',
  justifyContent: 'center',
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
  registerBtn: {
  width: '80%',
  backgroundColor: '#0080ff',
  borderRadius: 25,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
  marginBottom: 10,
  },
  });
  
  export default LoginScreen;