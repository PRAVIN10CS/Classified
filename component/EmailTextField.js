import React, {useState} from 'react';
import {TextInput, Text, StyleSheet, Dimensions, View} from 'react-native';

const {width, height} = Dimensions.get('window');

const EmailTextField = ({term, placeholder, onTermChange, onTermSubmit}) => {
  const [error, setError] = useState('');

  isEmailValid = () => {
    let email = term;
    let Pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    Pattern.test(String(email).toLowerCase())
      ? setError('')
      : setError('Invalid Email Address');
  };

  return (
    <View>
      <Text style={styles.ErrorText}> {error} </Text>
      <View style={styles.TextFieldView}>
        <TextInput
          style={styles.TextField}
          autoCorrect={false}
          placeholder={placeholder}
          value={term}
          onChangeText={onTermChange}
          onEndEditing={isEmailValid}></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextField: {
    fontSize: 14,
    flex: 1,
    marginHorizontal: 20,
  },
  TextFieldView: {
    height: height * 0.075,
    width: width * 0.8,
    borderRadius: (height * 0.075) / 2,
    marginTop: 5,
    marginBottom: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
  },
  ErrorText: {
    fontSize: 12,
    color: 'red',
    marginHorizontal: 20,
  },
});

export default EmailTextField;
