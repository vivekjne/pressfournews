import React,{PureComponent} from 'react'
import {TouchableOpacity,Dimensions,Image,FlatList } from 'react-native'
import { getNews } from '../../lib/api'
import { Container,Content,View,Text,Thumbnail,Spinner,List,
ListItem,Body,Header,Left,Right,Button,Icon,Item,Title
} from 'native-base'
import TimeAgo from 'react-native-timeago'

const {width,height} = Dimensions.get('window');
 export default class Home extends PureComponent{
     state={
         news:null,
         isLoading:true,
         pageCount:0
     }
     componentDidMount=async()=>{
         response = await getNews()
         responseJSON = await response.json()
         console.log(responseJSON)
         this.setState({news:responseJSON,isLoading:false})
         console.log(this.refs.scrollview)
     }
    render(){
        return(
        <Container>
           <Header style={{backgroundColor:'#ed1d25'}}>
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
        {/* {!this.state.isLoading?<Content
        ref="scrollview"
         style={{backgroundColor:'#fff'}}> */}
         {!this.state.isLoading? <List>
         {this.state.news && <FlatList 
         
         removeClippedSubviews={true}
         style={{backgroundColor:'#fff'}}
         data={this.state.news}
          renderItem={({item}) => (
            
            <ListItem onPress={()=>this.props.navigation.navigate('NewsDetail',{news_id:item.press_news_id})}>
              <Image style={{width:80,height:80,resizeMode:'cover'}} source={{ uri: `http://press4news.live/admin/uploads/banner_image/${item.banner_image}`}} />
              <Body>
                <Text>{item.news_title}</Text>
                <Text note>{'press4news.' }    <TimeAgo time={item.created_at_date} /></Text>
              </Body>
            </ListItem>
        
          )}

         onEndReached={async()=>{
         response = await getNews(this.state.pageCount+1)
         responseJSON = await response.json()
         console.log(responseJSON)
         if(!responseJSON.status){
         this.setState(
           prevNews=>{

             let news = prevNews.news
            
             news = [...news,...responseJSON]
             console.log(news)
            return{
              news,
              pageCount:prevNews.pageCount+1
            }
           }
           )
          }}
         }
          />}

          </List>:<Content
        contentContainerStyle={{alignItems:'center',justifyContent:'center',height}}
        >
        <Spinner color="red"/>
        </Content>}
      </Container>
        )
    }
}

