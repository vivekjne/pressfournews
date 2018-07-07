import React,{Component} from 'react'

import { View,Image,Dimensions } from 'react-native'

export default class SplashScreen extends Component{
    componentDidMount=()=>{
        setTimeout(()=>{
            this.props.navigation.navigate('Home')
        },2000)
    }
    render(){
        return(
            <View>
                <Image source={require('../../assets/images/splash.png')} style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height}}/>
            </View>
        )
    }
}