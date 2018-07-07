import React,{Component} from "react";
import { AppRegistry, StatusBar ,ImageBackground,Image,Dimensions} from "react-native";
import { Container, Content, Text, List, ListItem,Icon } from "native-base";
const routes = ["Home", "Bookmarks", "About Us","Contact Us"];
const { width,height } = Dimensions.get('window')
export default class SideBar extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Image 
          style={{alignSelf:'center',resizeMode:'contain',width:width*0.6,
          marginTop:height*0.05}}
          source={require('../../assets/images/logo.png')}
          />
          <List
            dataArray={routes}
            renderRow={data => {
              let iconName;

              if(data=="Home"){
                iconName="home"
              }else if(data=="Bookmarks"){
                iconName="ios-bookmark-outline"
              }else if(data=="About Us"){
                iconName="ios-information-circle-outline"
              }else if(data=="Contact Us"){
                iconName = "md-contacts"
              }else if(data=="Settings"){
                iconName="md-settings"
              }

              return (
                <ListItem
                style={{borderWidth:0,borderBottomWidth:0,alignItems:'center',marginVertical:5}}
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Icon name={iconName} style={{color:'red',fontSize:20}}/>
                  <Text style={{marginHorizontal:10,fontSize:14}}>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

