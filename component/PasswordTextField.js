import React from 'react';
import {TextInput, Text, StyleSheet, Dimensions, View} from 'react-native';

const {width, height} = Dimensions.get('window');

const PasswordTextField = ({
  term,
  placeHolder,
  onTermChange,
  onTermSubmit,
  errorText,
}) => {
  return (
    <View>
      <Text style={styles.ErrorText}>{errorText}</Text>
      <View style={styles.TextFieldView}>
        <TextInput
          autoCorrect={false}
          secureTextEntry
          style={styles.TextField}
          placeholder={placeHolder}
          value={term}
          onChangeText={onTermChange}
          onEndEditing={onTermSubmit}></TextInput>
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
    height: height * 0.07,
    width: width * 0.8,
    borderRadius: (height * 0.07) / 2,
    marginTop: 5,
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
  },
  ErrorText: {
    fontSize: 12,
    color: 'red',
    marginHorizontal: 20,
  },
});

export default PasswordTextField;
