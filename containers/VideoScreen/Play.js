import React,{Component} from 'react'
import { TouchableOpacity,WebView,Dimensions } from 'react-native'
import { Container,Content,Header,Left,Button,Body,Right,Title,Icon,View,Text} from 'native-base'
import { getVideos } from '../../lib/api'
import YouTube from 'react-native-youtube'

const {width,height }  = Dimensions.get('window')

export default class Video extends Component{

    state={
        videos:null,
        isLoading:true
    }
    componentDidMount=async()=>{
      
    }
    render(){
        return(
            <Container>
                      
                      <Header style={{backgroundColor:'#ed1d25'}} hasTabs androidStatusBarColor="darkred">
          <Left>
            <Button transparent light onPress={()=>this.props.navigation.goBack()}>
            <Icon name='ios-arrow-back' />
              
            </Button>
          </Left>
          <Body>
          <Title style={{color:'#fff'}}>Home</Title>

          </Body>
          <Right>
          
          </Right>
        </Header>
               
                    
                        <YouTube
                            apiKey={'AIzaSyBxPIC5inBukmSp4h3hqdyHNTISM7ddr2g'}
                            videoId={this.props.navigation.state.params.id}  // The YouTube video ID
                            play={true}             // control playback of video with true/false
                            fullscreen={false}       // control whether the video should play in fullscreen or inline
                            loop={true}             // control whether the video should loop when ended
                            showFullscreenButton={false}
                            onReady={e => this.setState({ isReady: true })}
                            onChangeState={e => this.setState({ status: e.state })}
                            onChangeQuality={e => this.setState({ quality: e.quality })}
                            onError={e => this.setState({ error: e.error })}

                            style={{ alignSelf:'stretch',width, height: height*0.3 }}
                            />
                    
               
            </Container>
        )
    }
}