import React,{PureComponent} from 'react'

import { Container,Content,Header,Tab,Text,
    List,Item,Input,Textarea,
    Tabs,Spinner,Left,Body,Right,Icon,Button,Title,ScrollableTab,ListItem,Form,Label,View } from 'native-base'
import { getCategories,getNews,getAdvertisements } from '../../lib/api'
import TimeAgo from 'react-native-timeago'
import NewsCategory from './NewsCategory'
import {  TouchableOpacity,SafeAreaView,Dimensions,Image,FlatList,StatusBar,Modal} from 'react-native'
const {width,height}  = Dimensions.get('window')
export default class HomeScreen extends PureComponent{
    state={
        categories:null,
        isLoading:true,
        news:null,
        pageCount:0,
        showModal:false,
        advertisements:null
        
    }
    componentDidMount=async()=>{
        try{
            let response = await getCategories();
            let responseJSON = await response.json();
            let newsResponse = await getNews();
            let newsResponseJSON = await newsResponse.json()
            let advertisements = await getAdvertisements()
            advertisements = await advertisements.json()
            console.log(advertisements)
            this.setState({categories:responseJSON,isLoading:false,news:newsResponseJSON,advertisements})
            console.log(responseJSON,newsResponseJSON)
        }catch(err){
            console.log(err)
        }
    }
    render(){
       let content = null
        if(!this.state.isLoading){
            content = (
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
          {/* <Button transparent light onPress={()=>this.setState({showModal:true})}>
            <Icon name='ios-search' />
              
            </Button> */}
          </Right>
        </Header>
               <Tabs   edgeHitWidth={0}  springFriction={50} springTension={50} tabBarUnderlineStyle={{backgroundColor:'#ed1d25'}}  renderTabBar={()=> <ScrollableTab tabsContainerStyle={{backgroundColor:'#fff'}}  />}>
               <Tab   activeTabStyle={{backgroundColor:'white',borderWidth:0}} tabStyle={{backgroundColor:'white',borderWidth:0}}   activeTextStyle={{color:'#ed1d25'}}  textStyle={{color:'#ed1d25'}} heading="All">
               <List>
         {this.state.news && <FlatList
        
         removeClippedSubviews={true}
         style={{backgroundColor:'#fff'}}
         data={this.state.news}
          renderItem={({item,index}) => (
            <View key={index}>
            <ListItem onPress={()=>this.props.navigation.navigate('NewsDetail',{news_id:item.press_news_id})}>
              <Image style={{width:80,height:80,resizeMode:'cover'}} source={{ uri: `http://press4news.live/admin/uploads/banner_image/${item.banner_image}`}} />
              <Body>
                <Text>{item.news_title}</Text>
                <Text note>{`press4news. ${item.time_diff}`}</Text>
              </Body>
              
            </ListItem>
            {index%4==0 && this.state.advertisements[index/4]? <ListItem>
            {<Image source={{uri:`http://press4news.live/admin/uploads/mobile_adv/${this.state.advertisements[index/4].adv_image}`}}  style={{width,height:height*0.15,resizeMode:'cover'}}/>}
           </ListItem>:null}
           </View>
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
        
          </List>
               </Tab>
                    {this.state.categories.map(res=>(<Tab  activeTabStyle={{backgroundColor:'#fff',borderWidth:0}} tabStyle={{backgroundColor:'#fff',borderWidth:0}} activeTextStyle={{color:'#ed1d25'}}  textStyle={{color:'#ed1d25'}} key={res.news_category_id}  heading={res.news_category_name}>
                        <Content >
                        <NewsCategory advertisements={this.state.advertisements} navigation={this.props.navigation} news_id={res.news_category_id} />
                        </Content>
                        </Tab>))}
                                       
                </Tabs>
                <Modal
                visible={this.state.showModal}
                padder
                onRequestClose={()=>console.log()}
                >
                <SafeAreaView>
                <TouchableOpacity onPress={()=>this.setState({showModal:false})} style={{alignItems:'flex-end'}}>
                    <Icon name="close"/>
                </TouchableOpacity>
                <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Your Mail</Label>
              <Input />
            </Item>

            <Item last>
              <Label>Your Message</Label>
              <Textarea  rowSpan={5}/>
            </Item>
          </Form>
          </SafeAreaView>
                </Modal>
            </Container>
            )
        }else{
            content = <Container>
            <Header style={{backgroundColor:'#ed1d25'}} androidStatusBarColor="darkred" hasTabs>
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

     <Content>
         <Spinner color="red"/>
     </Content>
        </Container>
        }
        
        return(
            content
        )
    }
}