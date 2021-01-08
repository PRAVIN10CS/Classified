import React, {useEffect,useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Logoimage from '../image/indiaafrica.png';
import logo from '../image/event.png'
import bg from '../image/bg.jpg'
import AnimatedSplash from "react-native-animated-splash-screen"


let dimensions = Dimensions.get('window');
let imageHeight = Math.round((dimensions.width * 9) / 16);
let imageWidth = dimensions.width;
const SplashScreeen = ({navigation}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Orientation.lockToLandscape();
    setTimeout(() => {
      console.log('Splash');
      
       navigation.replace('LoginScreen');
    }, 2000);
  });

  return (
    <ImageBackground style={SplashStyle.container} source={bg}>
     <AnimatedSplash
        logoWidht={1000}
        logoHeight={1000}
        
        isLoaded={isLoaded}
        // backgroundColor={"#262626"}
        logoImage={logo}
      ></AnimatedSplash>
      {/* <ImageBackground source={Logoimage} style={SplashStyle.Image} /> */}
    </ImageBackground>
  );
};
export default SplashScreeen;
const SplashStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
