import React,{Component} from 'react'
import { Container,Content,View,Text,
Icon,Form,Label,Item,Input,Textarea,Header,
Left,Button,Body,Right,Title
} from 'native-base'
import { TouchableOpacity } from 'react-native'
export default class ContactUs extends Component{
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
                <Content>
               
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
                </Content>
            </Container>
        )
    }
}