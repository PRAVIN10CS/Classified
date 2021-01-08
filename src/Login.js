import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, SafeAreaView} from 'react-native';
import EmailTextField from '../component/EmailTextField';
import PasswordTextField from '../component/PasswordTextField';
import RoundedTextField from '../component/RoundedTextField';
import RoundedButton from '../component/RoundedButton';

const Login = ({Navigation}) => {
  const [email, setEmail] = useState('');
  const [otpMethod, setOtpMethod] = useState(true);
  const [password, setPassword] = useState('');
  const Login = () => {
    console.log('Login');
  };
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.titleText}>Sign In</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <EmailTextField
            term={email}
            placeholder="Email Address"
            onTermChange={(newEmail) => {
              var regex = /^[a-zA-Z]+$/;
              if (value.match(regex)) {
                setOtpMethod(false);
              } else {
                setOtpMethod(true);
              }
            }}
            // onTermChange={(newEmail) => setEmail(newEmail)}
          />

          {otpMethod && (
            <PasswordTextField
              term={password}
              placeHolder="Password"
              onTermChange={(newPassword) => setPassword(newPassword)}
            />
          )}
          {otpMethod && (
            <RoundedButton
              buttonStyle={styles.loginButtonStyle}
              textStyle={styles.signInTextColorStyle}
              title="Login"
              onPress={login}
            />
          )}
          {!otpMethod && (
            <RoundedButton
              buttonStyle={styles.loginButtonStyle}
              textStyle={styles.signInTextColorStyle}
              title="Login"
              onPress={login}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Login;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 30,
    marginBottom: 30,
    marginTop: 40,
    color: 'blue',
    textAlign: 'center',
  },
  loginButtonStyle: {
    backgroundColor: 'blue',
  },
  signInTextColorStyle: {
    color: 'white',
  },
});
