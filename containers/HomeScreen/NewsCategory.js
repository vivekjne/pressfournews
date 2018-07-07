import React,{PureComponent} from 'react'

import {List,ListItem,Body,Text,Content,Spinner,View} from 'native-base'
import { Image,Dimensions } from 'react-native'
import TimeAgo from 'react-native-timeago'
import { getNewsByCategory} from '../../lib/api'
const {width,height}  = Dimensions.get('window')

export default class NewsCategory extends PureComponent{
    state={
        isLoading:true,
        news:null
    }
    componentDidMount=async()=>{
        let newsResponse = await getNewsByCategory(this.props.news_id)
        let newsResponseJSON = await newsResponse.json()
        console.log(newsResponseJSON)
        this.setState({isLoading:false,news:newsResponseJSON})
    }
    render(){
        return(
              <List>
            {(!this.state.isLoading)?
            
                Array.isArray(this.state.news)? this.state.news.map((item,index)=>(
                    <View key={index}>
                    <ListItem onPress={()=>this.props.navigation.navigate('NewsDetail',{news_id:item.press_news_id})}>
            <Image style={{width:80,height:80,resizeMode:'cover'}} source={{ uri: `http://press4news.live/admin/uploads/banner_image/${item.banner_image}`}} />
            <Body>
              <Text>{item.news_title}</Text>
              <Text note>{'press4news.' }    <TimeAgo time={item.created_at_date} /></Text>
            </Body>
          </ListItem>
          {index%4==0 && this.props.advertisements[index/4]? <ListItem>
            {<Image source={{uri:`http://press4news.live/admin/uploads/mobile_adv/${this.props.advertisements[index/4].adv_image}`}}  style={{width,height:height*0.1,resizeMode:'cover'}}/>}
           </ListItem>:null}
          </View>
          )):
          <Content contentContainerStyle={{alignItems:'center',justifyContent:'center',height:height*0.8}}>
                <Text>No News to load</Text>
              </Content>
          :<Content contentContainerStyle={{alignItems:'center',justifyContent:'center',height:height*0.8}}>
                <Spinner color="red" />
              </Content>}
          </List>
        )
    }
}