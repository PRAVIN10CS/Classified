import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Keyboard,
  Button,
  ImageBackground,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import CodeInput from 'react-native-confirmation-code-input';
import backgrobd from '../image/bg.jpg';

export const OtpVerifyScreen = (props) => {
  const inputRef = useRef('codeInputRef2');
  const [counter, SetCounter] = useState(150);
  const [random, SetRandom] = useState(Math.random());
  const [disabled, setDisabled] = useState(true);
  const handleResend = () => {
    SetRandom(Math.random());
  };

  const handleVerify = (otp) => {};

  return (
    <ImageBackground style={styles.fullheight2} source={backgrobd}>
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
          disabled={disabled}
          title="RESEND"
          onPress={handleResend}></Button>
      </View>
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
});

export default OtpVerifyScreen;
