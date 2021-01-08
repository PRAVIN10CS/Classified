import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Button,
  Dimensions,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {WebView} from 'react-native-webview';


const RegisterWeb = ({navigation,route}) => {
  var renderTime = Date.now();
  let url1 = '';
  url1 = route.params.url;
  WEBVIEW_REF = React.createRef();

  onNavigationStateChange = (navState) => {
    if(navState.canGoBack){
      navigation.replace('LoginScreen');
    }
 
};
  return (
    <WebView
      style={styles.loading}
      ref={WEBVIEW_REF}
      source={{
        uri:
        url1,
      }}
      javaScriptEnabled
      allowsInlineMediaPlayback={true}
      domStorageEnabled={true}
      scalesPageToFit={true}
      javaScriptEnabled
      onNavigationStateChange={onNavigationStateChange}
      startInLoadingState={true}
      renderLoading={() => (
        <ActivityIndicator color="blue" size="large" style={styles.loading} />
      )}></WebView>
  );
};
export default RegisterWeb;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
