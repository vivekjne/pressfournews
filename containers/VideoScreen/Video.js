import React,{Component} from 'react'
import { TouchableOpacity,
    TouchableWithoutFeedback,
    WebView,Dimensions,ImageBackground } from 'react-native'
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
        try{
        let videos = await getVideos('')
         videos = await videos.json()
         console.log(videos)
        this.setState({videos,isLoading:false})
        }catch(err){
            this.setState({isLoading:false})
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
          
          </Right>
        </Header>
                {!this.state.isLoading?<Content>
                    {this.state.videos&&
                    this.state.videos.map(video=>(
                    <TouchableWithoutFeedback onPress={()=>{
                        let id = video.video_url
                        id = id.replace(`https://www.youtube.com/watch?v=`,'')
                        console.log(id)
                        this.props.navigation.navigate('Play',{id})
                        }}>
                   <ImageBackground  style={{height:height*0.3,justifyContent:'flex-end',alignItems:'center'}} source={{uri:`http://press4news.live/admin/uploads/video_image/${video.video_image}`}} >
                        <Text>
                            {video.video_title}
                        </Text>
                   </ImageBackground>
                    </TouchableWithoutFeedback>
                    ))
                    }
                </Content>:<Content contentContainerStyle={{alignItems:'center',justifyContent:'center',height:height*0.8}}></Content>}
            </Container>
        )
    }
}