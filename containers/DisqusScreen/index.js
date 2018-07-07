import React,{ Component } from 'react';

import { View,Text,WebView } from 'react-native';

export default class Disquss extends Component{
    render(){

        return(
            <WebView style={{flex:1}}  source={{uri:'http://www.press4news.live/disqus.php?url=https://www.press4news.live/atlas-ramachandran-released-from-dubai-jail&shortname=https-www-press4news-live-1&title=atlas-ramachandran-released-from-dubai-jail'}} 
            javaScriptEnabled={true}
            domStorageEnabled={true}
            thirdPartyCookiesEnabled={true}
            mixedContentMode={'always'}
            />
        )
    }
}
