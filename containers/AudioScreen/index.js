import React,{Component} from 'react'
import { TouchableOpacity,WebView,Dimensions,Share,ActivityIndicator } from 'react-native'
import { Container,Content,Header,Left,Button,Body,Right,Title,Icon,View,Text} from 'native-base'
import { getAudios } from '../../lib/api'
import VideoPlayer from 'react-native-video-controls';



const {width,height }  = Dimensions.get('window')
export default class Home extends Component{

    state={
        audios:null,
        isLoading:true
    }
    componentDidMount=async()=>{
        
        try{
        let audios = await getAudios('')
         audios = await audios.json()
         console.log(audios)
        this.setState({audios,isLoading:false})
        }catch(err){
            this.setState({isLoading:false})
        }
    }


    componentWillReceiveProps = (nextProps)=>{
        console.log(nextProps)
        if(this.props.navigation.state.key!=='Audio News'){
            this.videoPlayer.setState({paused:true})
        }
    }
    render(){
  
        return(
            <Container>
                      
                      <Header style={{backgroundColor:'#ed1d25'}} hasTabs androidStatusBarColor="darkred">
          <Left>
            <Button transparent light onPress={()=>this.props.navigation.navigate('DrawerToggle')}>
            <Icon name='menu' />
              
            </Button>
          </Left>
          <Body>
          <Title style={{color:'#fff'}}>Home</Title>

          </Body>
          <Right>
        
          <Button transparent light onPress={()=>{
              Share.share({
                  title:'Listen to the latest audio news from press4live',
                  message:'Listen to the latest audio news from press4live http://www.press4news.live/audio'
              })}}>
            <Icon name='share' />
              
            </Button>
          </Right>
        </Header>
        {!this.state.isLoading?<Content scrollEnabled={false} style={{height:height*0.9,position:'relative'}}>
            <View  style={{height,width}}>
                <WebView javaScriptEnabled={true} 
                domStorageEnabled={true}  source={{html:`
                <audio controls="" style="width:100%"> 
<source src="https://www.press4news.live/admin/uploads/audio_file/${this.state.audios.audio_url}" type="audio/mp4"> 
</audio>
                `}}
                
                />
            </View>

         
              
            {/* <View style={{width,height:height/3}}>
            <VideoPlayer
            
            ref={video=>this.videoPlayer=video}
            showOnStart={true}
    source={{ uri: 'http://www.press4news.live/admin/uploads/audio_file/'+this.state.audios.audio_url }}
    navigator={ this.props.navigator }
/>
            </View> */}

          
        </Content>:<Content contentContainerStyle={{height:height*0.9,alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator size="large" color="red"/>
            </Content>}
                {/* {!this.state.isLoading?<Content>
                    {this.state.audios&&<Text>{JSON.stringify(this.state.audios)}</Text>}
                </Content>:<Content contentContainerStyle={{alignItems:'center',justifyContent:'center',height:height*0.8}}></Content>} */}
            </Container>
        )
    }
}