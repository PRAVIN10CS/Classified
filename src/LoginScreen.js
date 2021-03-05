import React, { useEffect, useRef, useState } from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import {View,Text,StyleSheet,ImageBackground,TextInput,TouchableOpacity,  SafeAreaView, Linking,StatusBar,Keyboard} from 'react-native'; 
import AnimatedEllipsis from 'react-native-animated-ellipsis';

  import Icon from 'react-native-vector-icons/FontAwesome'
  import backgrobd from '../image/bg.jpg';
  import Service from '../service';
  
  const LoginScreen = ({ navigation, route }) => { 
  const [email, setEmail] = useState('');
  const [otpMethod, setOtpMethod] = useState(true);
  const [password, setPassword] = useState('');
  
  const [icon,setIcon] =useState('eye-slash')
  const [toggle,setToggle]=useState(true)
  const [visible,setVisible]=useState(false)
  
  useEffect(() => {
 
  }, []);
  
  const getOtp =    async () => {
    console.log('otp')
    navigation.navigate('OtpVerifyScreen')
//     setActive(true)
//   Keyboard.dismiss();
//   console.log(checkValidation());
//   var IndNum = /^[0]?[789]\d{9}$/;
//   if (IndNum.test(email)) {
//   if (checkValidation()) {
//  const {data}= await  Service.get('/index.php',{method:'sendOTP',company_id:70,phone:email })

//  if(data.status==='success'){
//    await AsyncStorage.setItem('data',data)
//   navigation.navigate('OtpVerifyScreen', {
//   Email: email,
//   ScreenName: 'LoginScreen',
//   });
//   }
// }else
// {
//   setActive(false)
//  alert(data.message) 
// }
//   } else {
//   alert('not a valid mobile number');
//   setActive(false)
//   }
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
  changeIcon=()=>{
   setToggle(!toggle)
   setIcon(
    icon==='eye'?'eye-slash':'eye'
   )

  }
  const forgetApi = async() => {
    setVisible(true)
    try{
   

    const {data}= await Service.get('/index.php', { method: 'ForgotUrl' });
      console.log(data)
      setVisible(false)
      navigation.navigate('ForgetWeb', { url: data.url });

    }
    catch(err){
      
      setVisible(false)
     console.log(err) ; 
    }
 
  }; 
  const onSignInPress = () => {
    setVisible(true)
   Keyboard.dismiss();
  const re =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (re.test(email)===true) 
  {
  if (checkValidation()) {
  Service.get('/index.php',{
  email:email,
  password:password,
  method:'LoginUserApi'
  }).then(async ({data})=>{
 if(data.status==='success'){
  setVisible(false)
  navigation.navigate('ExpoEvent',({ url: data.data.url,token:data.data.token_id,user_id:data.data.dd_id}))
 }
 else{
  setVisible(false)
  alert(data.message)
 }
  }
     
  ).catch((error)=>{
    if (error.response) {
      setVisible(false)
      alert(JSON.stringify(error.response.status))
  } 
  else if (error.request) {
    setVisible(false)
      console.log(error.request);
      alert(error.request)
  } else {
      alert(error.message)
      setVisible(false)
      console.log('Error', error.message);
  }
  alert(error.config)
  setVisible(false)
  console.log(error.config);
  })
 
  }
  } 
  else {
  alert('email is not proper');
  
  setVisible(false)
  }
  };
  RegisterFunction = () => {
    setVisible(true)
  Service.get('/index.php', { method: 'RegisterUrl' }).then(
  async ({ data }) => {
  console.log(data);
  navigation.navigate('RegisterWeb', { url: data.url });
  setVisible(false)
  },
  )
  .catch((error) => {
    console.log(error)
    setVisible(false)
})
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
  { visible  &&
  <View>
  <Text style={{color:'#000',fontSize:20,margin:20}}> Loading 
  <AnimatedEllipsis numberOfDots={3}
                  minOpacity={0.4}
                  animationDelay={200}
                  style={{
                    color: '#94939b',
                    fontSize: 20,
                   
                   
                  }}
  />
  </Text>
  </View>
  }
  
  <View style={styles.inputView}>
<TextInput
  style={styles.inputText}
  autoCapitalize="none"
  placeholder={'Email or Phone Number'}
  autoCorrect={false}
  onBlur={e => validate()}
  onChangeText={(value) => setEmail((value)  
)}
  />
  </View>
  {/* {otpMethod && ( */}
  <View style={styles.inputView}>
   
  <TextInput
  style={styles.inputText}
  autoCapitalize="none"
  secureTextEntry={toggle}
  textContentType="password"
  placeholder={'password'}
  autoCorrect={false}
  onChangeText={(value) => setPassword(value)}
  />
  
  <Icon  name={icon}
    color='#696969'
    onPress={changeIcon}
    style={{alignSelf:'flex-end'}}
    size={18}></Icon>  
  
  </View>
  
  {/* )} */}
 
  {/* { otpMethod && ( */}
  <TouchableOpacity style={styles.loginBtn}  onPress={()=>onSignInPress()}>
  <Text style={styles.loginText}>LOGIN</Text>
  </TouchableOpacity>
  {/* )} */}
  {/* {!otpMethod && ( */}
  <TouchableOpacity style={styles.loginviaBtn}  onPress={getOtp}>
 <View style={{ flexDirection: 'row'}}>
 <Icon 
  raised
  name='phone'
  type='font-awesome'
  color='#fff'  
  style={{alignSelf:'flex-start',marginRight:15}}
    size={18}></Icon>  
  <Text style={styles.loginText}>LOGIN VIA OTP</Text>
  </View>
  </TouchableOpacity>
  {/* )} */}
  <TouchableOpacity
  onPress={() => {
  forgetApi();
  }}>
  <Text  style={styles.forgotText}>FORGOT PASSWORD ?</Text>
  </TouchableOpacity>
  <View style={styles.ViewRegister}>
  <Text style={styles.loginText}>Not Registered ?</Text>
  <TouchableOpacity onPress={ RegisterFunction}>
  
 
  <Text style={styles.forgot}>Register Now</Text>
  </TouchableOpacity>
  </View>
 
  </View>
  </ImageBackground> 
  );
  };
  
  const styles = StyleSheet.create({
  inputView: {
  flexDirection:'row', 
  width: '85%',
  backgroundColor: '#fff',
  borderRadius: 25,
  height: 50,
  marginBottom: 20,
  alignItems:'center',
  justifyContent:'center',
  padding: 20,
  },
 
  inputText: {
  height: 50,
  flex:1,
  color: 'black',
  },
  loginText: {
  color: 'white',
  fontWeight:'700',
  fontSize: 15,
  marginLeft:5,
  letterSpacing: 1.0,
  },
  forgot: {
  color: 'white',
  fontSize: 15,
  marginTop:0,
  marginLeft:5,
  fontWeight:'700',
  letterSpacing:1.0,
  textDecorationLine: 'underline',
  },
  forgotText:{
    color: 'white',
  fontSize: 15,
  marginTop:50,
  marginTop:10,
  marginLeft:5,
  fontWeight:'700',
  },
  container: {
  flex: 1,
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
  loginviaBtn: {
    width: '80%',
    backgroundColor: '#008000',
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
  marginTop: 20,
  marginBottom: 10,
  },
  ViewRegister:{
   flexDirection:'row',
   marginTop:20  
  }
  });
  
  export default LoginScreen;