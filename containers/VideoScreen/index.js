import React,{Component} from 'react'
import { View,Text,TouchableOpacity,WebView ,Dimensions} from 'react-native'
const {width,height} = Dimensions.get('window')

export default class Home extends Component{
    render(){
        list = [1,2,3,4,5,6]
        return(
            <View style={{flex:1}}>
            
                   
                <WebView 
                style={{height,width}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scalesPageToFit={true}
                source={{html:
                `'<html><meta content="width=device-width, 
                initial-scale=1.0, maximum-scale=1.0, 
                user-scalable=0" name="viewport" />
                <iframe src="https://www.youtube.com/embed/lJMVW6wCyyA?modestbranding=1&playsinline=1&showinfo=0&rel=0&autoplay=1" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>`}} />
            
               
            </View>
        )
    }
}