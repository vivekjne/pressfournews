import React,{Component} from 'react'
import { Container,Content,View,Text,Thumbnail,Spinner,List,
    ListItem,Body,Header,Left,Right,Button,Icon,Item,Title,
    Toast
    } from 'native-base'
import { Dimensions,AsyncStorage,Image,ImageBackground,WebView,Share,Platform } from 'react-native'
import { getNewsById } from '../../lib/api'
import HTMLView from 'react-native-htmlview'

const {width,height} = Dimensions.get('window')

export default class NewsDetails extends Component{
    state={
        news_detail:null,
        isLoading:true,
        isBookmarked:false,
        initUrl:1,
        isShare:false,

    }

    onCancel=()=>{
        this.setState({isShare:false})
    }

    componentDidMount=async()=>{

        try{
            response = await getNewsById(this.props.navigation.state.params.news_id)
            responseJSON = await response.json()
            // console.log(responseJSON)
            await this.setState({news_detail:responseJSON.news_detail,isLoading:false})
            await this.checkBookMarks(responseJSON.news_detail)
        }catch(err){
            console.log(err)
        }
    }

    checkBookMarks = async(news)=>{
        try{
            let bookmarks = await AsyncStorage.getItem('press4news:bookmarks')
            if(bookmarks){
                bookmarks = JSON.parse(bookmarks)
                let already_bookmarked = false
                for(i in bookmarks){
                    console.log(i)
                    if(bookmarks[i].press_news_id==news.press_news_id){
                        already_bookmarked = true
                        break
                    }
                }
                console.log("already=",already_bookmarked)
                if(already_bookmarked == true){
            // Toast.show({text:'Already Bookmarked',position:'bottom',duration:3000})
                    this.setState({isBookmarked:true})
                }
            }
        }catch(err){
            console.log(err)
        }
    }

    addToBookMark=async(news)=>{
        try{
            let bookmarks = await AsyncStorage.getItem('press4news:bookmarks')
        console.log(news)
        
            if(bookmarks){
        console.log(news)
        
                bookmarks = JSON.parse(bookmarks)
                let already_bookmarked = false
                for(i in bookmarks){
                    console.log(i)
                    if(bookmarks[i].press_news_id==news.press_news_id){
                        already_bookmarked = true
                        break
                    }
                }
                console.log("already=",already_bookmarked)
                if(already_bookmarked == true){
            Toast.show({text:'Already Bookmarked',position:'bottom',duration:3000})
                    this.setState({isBookmarked:true})
                }else{
                    bookmarks.push(news)
                }
               
                await AsyncStorage.setItem('press4news:bookmarks',JSON.stringify(bookmarks))
            }else{
        console.log(news)
        
                bookmarks = []
                bookmarks.push(news)
               await AsyncStorage.setItem('press4news:bookmarks',JSON.stringify(bookmarks))
                
            }
            this.setState({isBookmarked:true})
        }catch(err){
            Toast.show({text:'Some error could not bookmark',position:'bottom',duration:3000})
            console.log(err)
        }
        
    }
    render(){
        return(
            <Container>
                <Header style={{backgroundColor:'#ed1d25'}}>
          <Left>
            <Button transparent light onPress={()=>this.props.navigation.goBack()}>
            <Icon name='arrow-back' />
              
            </Button>
          </Left>
          <Body>
            <Title style={{color:'#fff'}}>News Details</Title>
          </Body>
          <Right>
            
          </Right>
        </Header>
                {(!this.state.isLoading && this.state.news_detail)?<Content style={{backgroundColor:'#fff'}}>
                    
                    <ImageBackground  style={{width,height:height/3}} source={{uri: `http://press4news.live/admin/uploads/banner_image/${this.state.news_detail.banner_image}`}}>
                        <View style={{flexDirection:'row',justifyContent:'flex-end'}} padder>
                        <Button  onPress={()=>{
                            this.addToBookMark(this.state.news_detail)
                            }} style={{backgroundColor:this.state.isBookmarked?'red':'#444',marginHorizontal:width*0.02}}>
                            <Icon name='bookmark' />
                            
                        </Button>

                        {/* <Button style={{backgroundColor:'#ccc'}}  onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                            
                        </Button> */}


                        <Button  style={{backgroundColor:'#444'}} transparent light
                        onPress={()=>{
                            Share.share({
                                title:this.state.news_detail.news_title,
                                url:"https://www.press4news.live/"+this.state.news_detail.url,
                                message:Platform.OS=='ios'?this.state.news_detail.short_desc:`${this.state.news_detail.news_title}\n ${this.state.news_detail.short_desc} https://www.press4news.live/${this.state.news_detail.url}`
                            },{
                                dialogTitle:'prss4news',
                                excludedActivityTypes: [
      'com.apple.UIKit.activity.PostToTwitter'
    ]
                            }
                            )
                        }}
                        >
                            <Icon name='share' />
                            
                        </Button>
                        </View>
                    </ImageBackground>
                    <View style={{padding:width*0.02}}>
                        <Text>{this.state.news_detail.news_title}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:width*0.02}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name="ios-person" style={{color:'red',marginRight:width*0.02}}/>
                            <Text style={{color:'red'}}>Press4News</Text>
                        </View>
                        <View style={{alignItems:'center',flexDirection:'row'}}>
                            <Text>{this.state.news_detail.created_at_date}</Text>
                        </View>
                    </View>
                    <View style={{width,backgroundColor:'red',height:2}}></View>
                    <View style={{padding:width*0.02}}>
                        
                    <HTMLView
                        value={this.state.news_detail.description}
                        
                    />

                    <WebView 
                    key={this.state.initUrl}
                    ref={webview=>this.webview=webview}
                    style={{height,width,marginTop:20,marginLeft:-(width*0.02)}}  source={{uri:`http://www.press4news.live/disqus.php?url=https://www.press4news.live/${this.state.news_detail.url}&shortname=https-www-press4news-live-1&title=${this.state.news_detail.url}`}} 
            javaScriptEnabled={true}
            domStorageEnabled={true}
            thirdPartyCookiesEnabled={true}
            mixedContentMode={'always'}
            
            onNavigationStateChange={(e)=>{
                console.log("navigation_change=",e.url)
                if(e.url=='https://disqus.com/next/login-success/#!auth%3Asuccess'){
                console.log("hello")
                   this.setState({initUrl:this.state.initUrl+1})
                   {/* this.webview.redirect() */}
                }else if(e.url=='https://help.disqus.com/terms-and-policies/disqus-privacy-policy'){
                this.webview.goBack()
                }else if(e.url=='https://disqus.com/'){
                this.webview.goBack()

                }else if(e.url.includes('https://disqus.com/home/forums/https-www-press4news-live-1/')){
                this.webview.goBack()

                }
            }}
            />
                        
                    </View>
                    
            
                    
                </Content>:
                <Content style={{backgroundColor:'#fff'}} contentContainerStyle={{alignItems:'center',justifyContent:'center',height:height*0.8}}>
                    <Spinner color="red" />
                </Content>
                }
            </Container>
        )
    }
}