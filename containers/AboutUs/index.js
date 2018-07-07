import React,{Component} from 'react'
import { Container,Content,View,Text,Header,
Left,Body,Right,Title,Icon,Button
} from 'native-base'

export default class AboutUs extends Component{
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
                <Content padder contentContainerStyle={{backgroundColor:'#fff'}}>
                    <Text style={{textAlign:'center'}}>
                    Press 4 news is one of the leading online news portals published from Qatar covering news from every part of GCC as it  happens and also news from around the World. It is one of the best News App in Malayalam with a comprehensive coverage of news equally focusing on Life Style, Entertainments, Sports, Business etc. Get regular updates with the happenings in Qatar  and other GCC through Press 4 news’s all-new Mobile Application
                    </Text>
                </Content>
            </Container>
        )
    }
}