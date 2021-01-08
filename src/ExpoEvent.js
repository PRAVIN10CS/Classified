import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Orientation from 'react-native-orientation';
import {WebView} from 'react-native-webview';
const ExpoEvent = ({navigation,route}) => {
 const url1 = route.params.url;
 const token=route.params.token

  useEffect(() => {
     Orientation.lockToLandscape()
  });
  return (
    <WebView
      style={styles.loading}
       mediaPlaybackRequiresUserAction={true}
      source={{uri: url1+"/apiLogin"+"/"+token}}
      javaScriptEnabled
      allowsInlineMediaPlayback={true}
      domStorageEnabled={true}
      scalesPageToFit={true}
      sharedCookiesEnabled
      javaScriptEnabled
      startInLoadingState={true}
      renderLoading={() => (
        <ActivityIndicator color="blue" size="large" style={styles.loading} />
      )}>
        
      </WebView>
  );
};
export default ExpoEvent;

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
