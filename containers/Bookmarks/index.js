import React,{Component} from 'react'
import { ImageBackground,AsyncStorage,Dimensions,TouchableOpacity,Share,Platform,TouchableWithoutFeedback,TouchableHighlight } from 'react-native'
import { Container,Content,View,Text,Header,Left,Button,Body,Right,Title,Icon } from 'native-base'
const {width,height} = Dimensions.get('window')
export default class Bookmarks extends Component{
    state={
        bookmarks:null
    }
    componentDidMount=async()=>{
        try{
        let bookmarks = await AsyncStorage.getItem('press4news:bookmarks')
        bookmarks = JSON.parse(bookmarks)
        console.log(bookmarks)
        this.setState({bookmarks})
        
        }catch(err){
            console.log(err)
        }
    }

    deleteBookmarks=(index)=>{
        let bookmarks = this.state.bookmarks.slice()
        bookmarks.splice(index,1)
        AsyncStorage.setItem('press4news:bookmarks',JSON.stringify(bookmarks))
        this.setState({bookmarks})
    }
    render(){
        return(
            <Container style={{backgroundColor:'#fff'}}>
                 <Header style={{backgroundColor:'#ed1d25'}}>
          <Left>
            <Button transparent light onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
            <Icon name='menu' />
              
            </Button>
          </Left>
          <Body>
            <Title style={{color:'#fff'}}>Bookmarks</Title>
          </Body>
          <Right>
            
          </Right>
        </Header>
                {(this.state.bookmarks && this.state.bookmarks.length>0)?<Content>
                    {this.state.bookmarks.map((bookmark,index)=>(
                        <TouchableHighlight onPress={()=>this.props.navigation.navigate('NewsDetail',{news_id:bookmark.press_news_id})}>
                        <ImageBackground  key={index} style={{width,height:height*0.3}} source={{uri:`http://press4news.live/admin/uploads/banner_image/${bookmark.banner_image}`}} >
                            <View padder style={{flexDirection:'row',justifyContent:'flex-end'}}>
                                <TouchableOpacity onPress={()=>{
                                    this.deleteBookmarks(index)
                                        
                                    }}  style={{width:30,height:30,borderRadius:15,backgroundColor:'#444',alignItems:'center',justifyContent:'center',marginHorizontal:10}}>
                                <Icon  name="md-trash"  style={{color:'#fff',fontSize:20}}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                onPress={()=>{
                            Share.share({
                                title:bookmark.news_title,
                                url:"https://www.press4news.live/"+bookmark.url,
                                message:Platform.OS=='ios'?bookmark.short_desc:`${bookmark.news_title}\n ${bookmark.short_desc} https://www.press4news.live/${bookmark.url}`
                            },{
                                dialogTitle:'prss4news',
                                excludedActivityTypes: [
      'com.apple.UIKit.activity.PostToTwitter'
    ]
                            }
                            )
                        }}
                                 style={{width:30,height:30,borderRadius:15,backgroundColor:'#444',alignItems:'center',justifyContent:'center'}}>
                                
                                <Icon  name="share" style={{color:'#fff',fontSize:20}}/>
                                </TouchableOpacity>
                                
                            </View>
                            <View  style={{alignSelf:'center',justifyContent:'flex-end',flex:1}}>
                                <View padder style={{backgroundColor:'rgba(52,52,52,0.8)',width}}>
                                <Text style={{color:'#fff',textAlign:'center'}}>{bookmark.news_title}</Text>
                                </View>
                                </View>
                    </ImageBackground>
                    </TouchableHighlight>
                    ))}
                </Content>:<Content contentContainerStyle={{alignItems:'center',justifyContent:'center'}}>
                    <Text>No Bookmarks yet!</Text>
                    </Content>}
            </Container>
        )
    }
}