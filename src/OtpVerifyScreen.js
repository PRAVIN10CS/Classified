import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
  Button,
  ImageBackground,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import CodeInput from 'react-native-confirmation-code-input';
import backgrobd from '../image/bg.jpg';
import Service from '../service';

export const OtpVerifyScreen = ({navigation,route}) => {
  const inputRef = useRef('codeInputRef2');
  const [counter, SetCounter] = useState(150);
  const [email, setEmail]=useState('');
  const [otpMethod, setOtpMethod] = useState(true);

  const [random, SetRandom] = useState(Math.random());
  const [disabled, setDisabled] = useState(true);
  const handleResend = () => {
  
    RNOtpVerify.getHash()
    .then(console.log)
    .catch(console.log);
  };
  useEffect(()=>{


  })


const changeStatus= async()=>{
  Keyboard.dismiss();
  var IndNum = /^[0]?[789]\d{9}$/;
  if (IndNum.test(email)) {

 const {data}= await  Service.get('/index.php',{method:'sendOTP',company_id:70,phone:email })

 if(data.status==='success'){
    setOtpMethod(!otpMethod)
  }
  else{
    alert(data.message)
  }


} 
else {
  alert('not a valid mobile number');
  }
}


  const handleVerify = async(otp) => {
   const res=  await Service.get('/index.php',{method:'verifyOtp',company_id:70,phone:email,otp:otp})
   if(res.data.status==='success'){
     console.log(res.data.data.url)
    navigation.replace('ExpoEvent',({ url: res.data.data.url,token:res.data.data.token_id }))
   }
   else{
     alert(res.data.message)
   }
  };

  return (
    <ImageBackground style={styles.fullheight2} source={backgrobd}>
    {otpMethod &&
     <View style={styles.inputView}>
    
    <TextInput
  style={styles.inputText}
  autoCapitalize="none"
  placeholder={'Phone Number'}
  autoCorrect={false}
  keyboardType={'phone-pad'}
  onChangeText={(value) => setEmail((value)  
)}
  />
  
  </View>
    }
  { otpMethod && (
  <TouchableOpacity style={styles.loginBtn} disabled={false} onPress={changeStatus} >
  <Text style={styles.loginText}>Get Otp</Text>
  </TouchableOpacity>
  )}
  {!otpMethod &&
      <CodeInput
        ref={inputRef}
        containerStyle={styles.fullheight2}
        className={'border-box'}
        activeColor="rgba(255, 255, 255, 1)"
        inactiveColor="rgba(255, 255, 255, 1)"
        space={15}
        keyboardType="numeric"
        autoFocus={true}
        codeLength={4}
        size={40}
        inputPosition="left"
        onFulfill={(code) => handleVerify(code)}
      />
  }{!otpMethod &&
      <View style={styles.time}>
        <CountDown
          key={random}
          until={counter}
          size={14}
          onFinish={() => setDisabled(() => false)}
          separatorStyle={{color: 'black'}}
          digitStyle={{backgroundColor: '#FFF'}}
          digitTxtStyle={{color: 'black'}}
          digitStyle={{
            backgroundColor: '#FFF',
            borderWidth: 2,
            borderColor: '#FFF',
          }}
          timeToShow={['M', 'S']}
           showSeparator
          timeLabels={{m: '', s: ''}}
        />
        <Button
          // disabled={disabled}
          title="RESEND"
          onPress={handleResend}></Button>
  
      </View>
  }
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    position: 'absolute',
    right: '27%',
    top: '61%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  fullheight2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText:{
    height: 50,
    flex:1,
    color: 'black',
  },
  inputView:{
    flexDirection:'row', 
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    alignItems:'center',
    justifyContent:'center',
    padding: 20,
  },loginBtn:{
    width: '80%',
    backgroundColor: '#008000',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  loginText:{
    color: 'white',
    fontWeight:'700',
    fontSize: 15,
    marginLeft:5,
    letterSpacing: 1.0,
  }
});

export default OtpVerifyScreen;
