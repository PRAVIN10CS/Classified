import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const RoundedButton = ({title, onPress, buttonStyle, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, styles.button]}>
      <Text style={[textStyle, styles.Text]}> {title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: width / 2,
    margin: 20,
    borderColor: 'black',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
  },
  Text: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default RoundedButton;
