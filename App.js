import React from 'react';
// import { View, Text } from 'react-native';
import { StackNavigator,DrawerNavigator } from 'react-navigation';
import Navigator,{Drawer} from './Navigator'
import { View,Text,Root} from 'native-base'
import NavigatorService from './lib/NavigatorService'
import SettingsScreen from './containers/SettingsScreen'
import AudioScreen from './containers/AudioScreen'
import VideoScreen from './containers/VideoScreen/Video'
// import firebase from 'react-native-firebase'
import firebase,{ Notification, NotificationOpen } from 'react-native-firebase';
const NavigatorStack = StackNavigator({
  HomeStack :{screen:Navigator,navigationOptions:{header:null}},
 
 

});



export default class App extends React.Component{

  componentDidMount=async()=>{
    const enabled = await firebase.messaging().hasPermission();
if (enabled) {
    // user has permissions
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
        // user has a device token
        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken=> {
          // Process your token as required
      });

      await firebase.messaging().subscribeToTopic('test')

      this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
        console.log("notification1=",notification);
      NavigatorService.navigate('NewsDetail',{news_id:notification.data.news_id})
      
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    // this.notificationListener = firebase.notifications().onNotification((notification) => {
    //   console.log(notification.data);

    //   NavigatorService.navigate('NewsDetail',{news_id:notification.data.news_id})
      


    //   // Process your notification as required
    // });

    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        console.log(notification.data)
        NavigatorService.navigate('NewsDetail',{news_id:notification.data.news_id})
    }
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      console.log(action)
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
      console.log(notification.data)
      NavigatorService.navigate('NewsDetail',{news_id:notification.data.news_id})
  });
  //   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  //     // Get the action triggered by the notification being opened
  //     const action = notificationOpen.action;
  //     console.log(action)
  //     // Get information about the notification that was opened
  //     const notification = notificationOpen.notification;
  //     console.log(notification.data)
  //     NavigatorService.navigate('NewsDetail',{news_id:notification.data.news_id})
      
  // });
      this.messageListener = firebase.messaging().onMessage((message) => {
        // Process your message as required
        console.log("message=",message);
    });
    } else {
      console.log('no token');
        // user doesn't have a device token yet
    }
} else {
    // user doesn't have permission
    console.log('no permission');
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
  } catch (error) {
      // User has rejected permissions
  }
}

  }
  render(){
    return(
      <Root>
        <NavigatorStack 
        ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}
        />
      </Root>
    )
  }
}