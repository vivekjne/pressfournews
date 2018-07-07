import React,{Component} from 'react'
import Share, {ShareSheet, Button} from 'react-native-share';

export default class ShareSocial extends Component{
    render(){
        let shareOptions = {
            title: this.props.title,
            message: this.props.message,
            url: this.props.url,
            subject: this.props.title //  for email
          };
      
        //   let shareImageBase64 = {
        //     title: "React Native",
        //     message: "Hola mundo",
        //     url: REACT_ICON,
        //     subject: "Share Link" //  for email
        //   };
        return(
            <ShareSheet visible={this.props.visible} onCancel={this.props.onCancel}>
            <Button iconSrc={{ uri: 'http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c53e.png' }}
                    onPress={()=>{
                this.props.onCancel();
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "twitter"
                  }));
                },300);
              }}>Twitter</Button>
            <Button iconSrc={{ uri: 'http://www.stickpng.com/assets/images/584ac2d03ac3a570f94a666d.png'}}
                    onPress={()=>{
                this.props.onCancel();
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "facebook"
                  }));
                },300);
              }}>Facebook</Button>
            <Button iconSrc={{ uri: 'http://www.clker.com/cliparts/5/3/6/e/1480520219570138315whatsapp_icon.png' }}
                    onPress={()=>{
                this.props.onCancel();
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "whatsapp"
                  }));
                },300);
              }}>Whatsapp</Button>
            <Button iconSrc={{ uri: 'https://vignette.wikia.nocookie.net/logopedia/images/a/aa/GooglePlus-icon.png/revision/latest?cb=20150902140258' }}
                    onPress={()=>{
                this.props.onCancel();
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "googleplus"
                  }));
                },300);
              }}>Google +</Button>
            <Button iconSrc={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png' }}
                    onPress={()=>{
                this.props.onCancel();
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "email"
                  }));
                },300);
              }}>Email</Button>
            <Button
              iconSrc={{ uri: 'https://assets.materialup.com/uploads/01f79977-8698-420f-9743-60d28e4dff90/Qt4-kSaouyu7940hJqYNAlpUNhFwIwKGXXQSozorK5axygTBTqKMw1cw8xlQLNfNgWg=w300' }}
              onPress={()=>{
                this.props.onCancel();
                setTimeout(() => {
                  if(typeof shareOptions["url"] !== undefined) {
                    Clipboard.setString(shareOptions["url"]);
                    if (Platform.OS === "android") {
                      ToastAndroid.show('Link copiado al portapapeles', ToastAndroid.SHORT);
                    } else if (Platform.OS === "ios") {
                      AlertIOS.alert('Link copiado al portapapeles');
                    }
                  }
                },300);
              }}>Copy Link</Button>
            <Button iconSrc={{ uri: 'https://cdn1.iconfinder.com/data/icons/android-user-interface-vol-1/16/39_-_continue_ellipsis_menu_more_options_-_Copy-512.png' }}
              onPress={()=>{
                this.props.onCancel();
                setTimeout(() => {
                  Share.open(shareOptions)
                },300);
              }}>More</Button>
          </ShareSheet>
        )
    }
}