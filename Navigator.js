
import React from 'react';
import { TabNavigator,StackNavigator,DrawerNavigator,SwitchNavigator } from 'react-navigation';
import { Dimensions } from 'react-native'
import HomeScreen from './containers/HomeScreen'
import SettingsScreen from './containers/SettingsScreen'
import AudioScreen from './containers/AudioScreen'
import VideoScreen from './containers/VideoScreen/Video'
import NewsDetailScreen from './containers/NewsDetails'
import DisqusScreen from './containers/DisqusScreen'
import Sidebar from './components/Sidebar'
import Bookmarks from './containers/Bookmarks'
import ContactUs from './containers/ContactUs'
import AboutUs from './containers/AboutUs'
import SplashScreen from './containers/SplashScreen'
import Settings from './containers/Settings'
import Home from './containers/HomeScreen/HomeScreen'
import PlayVideo from './containers/VideoScreen/Play'
import { Icon } from 'native-base'

export const HomeStack = StackNavigator({
    News: {screen:Home,navigationOptions:{header:null}},
    NewsDetail:{screen:NewsDetailScreen,navigationOptions:{header:null}},
    Disqus:{screen:DisqusScreen}

})

const VideoStack = StackNavigator({
    VideoScreen:{screen:VideoScreen,navigationOptions:{header:null}},
    Play:{screen:PlayVideo,navigationOptions:{header:null}},
    
    
})
    export const Tabs =  TabNavigator({
    Home: {screen:HomeStack,navigationOptions:{
        
        header:null,
        
    
    }},
 
    'Audio News':{screen:AudioScreen,navigationOptions:{header:null}},
    'Video News':{screen:VideoStack,navigationOptions:{header:null}},
    
  },{
     

      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = `paper`;
          } else if (routeName === 'Audio News') {
            iconName = `mic`;
          }else if(routeName==='Video News'){
            iconName = `logo-youtube`;
            
          }
  
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Icon name={iconName} style={{color:tintColor,fontSize:25}} />;
        },
      }),

      tabBarPosition:'bottom',
      swipeEnabled:false,
      
      tabBarOptions:{
        activeBackgroundColor:'#fff',
        inactiveBackgroundColor:'#fff',
        inactiveTintColor:'#000',
        activeTintColor:'red',
        showIcon:true,
        indicatorStyle:{backgroundColor:'red'},
       labelStyle:{fontSize:10},
       
        style:{
            backgroundColor:'#fff',
            height:Dimensions.get('window').height*0.1,
          
        }
      },
  })

  const BookMarkStack=StackNavigator({
    BookmarkScreen:{screen:Bookmarks,navigationOptions:{header:null}},
    NewsDetail:{screen:NewsDetailScreen,navigationOptions:{header:null}},
    
  })

const Drawer =  DrawerNavigator({
      Tab:{screen:Tabs},
      Bookmarks:{screen:BookMarkStack},
      'About Us':{screen:AboutUs},
      'Contact Us':{screen:ContactUs},
      Settings:{screen:Settings}

  },
  {
     contentComponent:props=><Sidebar {...props}/>
  }
)

export default SwitchNavigator({
  SplashScreen:{screen:SplashScreen,navigationOptions:{header:null}},
  Home:{screen:Drawer,navigationOptions:{header:null}}
  
})
