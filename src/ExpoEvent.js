import React, {useEffect,useRef,useState} from 'react';
import {
  View,
  Text,
  BackHandler,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Orientation from 'react-native-orientation';
import {WebView} from 'react-native-webview';
import Service from '../service';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
const ExpoEvent = ({navigation,route}) => {
 const url1 = route.params.url;
 const token=route.params.token;
 const user_id=route.params.user_id;
 const webviewref=useRef(null)
 const [canGoBack,setCanGOBack]=useState(false);
 const [currenturl,setCurrenturl]=useState(url1+"/apiLogin"+"/"+token)



const hardwareBackPress=()=>{
   webviewref.current.goBack()
}


 const handleWebViewNavigationStateChange = async (newNavState) => {
   
  if (currenturl.includes('?c')) {
     webviewref && webviewref.current.stopLoading();
     const {data}= await  Service.get('/index.php',{method:'logoutAPI',company_id:70,dd_id:user_id,token_id:token})   
      if(data.status==='success'){
      navigation.replace('LoginScreen');

      }
      return false 
  }
  else{
    setCanGOBack(newNavState.canGoBack);
    return true;
  }
  
 
  };
  useEffect(() => {
     Orientation.lockToLandscape() 
     BackHandler.addEventListener('hardwareBackPress',hardwareBackPress) 
     return()=>{
       BackHandler.removeEventListener('hardwareBackPress',hardwareBackPress)
       Orientation.lockToPortrait()
     } 
  
  },[]);


  return (
    <WebView
      style={styles.loading}
       ref={webviewref}
       mediaPlaybackRequiresUserAction={true}
      source={{uri: currenturl}}
      javaScriptEnabled
      allowsInlineMediaPlayback={true}
      domStorageEnabled={true}
      scalesPageToFit={true}
      onNavigationStateChange={handleWebViewNavigationStateChange}
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
