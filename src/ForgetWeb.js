import React, { useEffect, useState,useRef } from 'react';
import {
View,
Text,
ImageBackground,
Modal,
SafeAreaView,
Dimensions,
StyleSheet,
} from 'react-native';
import {
BallIndicator,
BarIndicator,
DotIndicator,
MaterialIndicator,
PacmanIndicator,
PulseIndicator,
SkypeIndicator,
UIActivityIndicator,
WaveIndicator,
} from 'react-native-indicators';
import Orientation from 'react-native-orientation';

import { WebView } from 'react-native-webview';
const ForgetWeb = ({ route, navigation }) => {
const [showModel, setShowModel] = useState(false);
const [canGoBack, setCanGoBack] = useState(false)
const [canGoForward, setCanGoForward] = useState(false)
const [currentUrl, setCurrentUrl] = useState('')
const webviewRef = useRef(null)
let url = '';
url = route.params.url;
setCurrentUrl(url)
console.log(url);
useEffect(() => {
// Orientation.lockToLandscape();
});

const handleWebViewNavigationStateChange = (newNavState) => {
// newNavState looks something like this:
// {
// url?: string;
// title?: string;
// loading?: boolean;
// canGoBack?: boolean;
// canGoForward?: boolean;
// }
console.log('vav' + newNavState);
const { url, canGoBack } = newNavState;
console.log('url' + url);
setCanGoBack(newNavState.canGoBack)
setCurrentUrl(navState.url)
if (!url) return;
if (url.includes('success.php')) {
navigation.replace('LoginScreen');
}
if (url.includes('google.com')) {
const newURL = 'https://logrocket.com/';
const redirectTo = 'window.location = "' + newURL + '"';
webview.injectJavaScript(redirectTo);
} 
if (WebView.canGoBack) {
navigation.replace('LoginScreen');
}
};
return (
<WebView
style={styles.loading}
mediaPlaybackRequiresUserAction={true}
source={{
uri: currentUrl,
}}
onNavigationStateChange={handleWebViewNavigationStateChange}
cacheEnabled={false}
allowsInlineMediaPlayback={true}
domStorageEnabled={true}
scalesPageToFit={true}
javaScriptEnabled
ref={webviewRef}
onMessage={(event) => console.log('message' + event.nativeEvent.data)}
startInLoadingState={true}
renderLoading={() => (
<BarIndicator color="blue" style={styles.loading} />
)}></WebView>
);
};
export default ForgetWeb;

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