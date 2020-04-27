import React, {Component} from 'react';
import {View, Text, Image,Button, TextInput, TouchableOpacity, StyleSheet,AsyncStorage, ToastAndroid, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
export default class Login extends Component {
  constructor(){
    super();
    this.state={
      username:'',
      pwd:'',
      lusername: '',
      lpwd: '',
      isloading:false
    }
  }
  componentDidMount() {
    let now = 0;
    BackHandler.addEventListener('back', () => {
      if (new Date().getTime() - now < 2000) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show('确定要退出吗', 100);
        now = new Date().getTime();
        return true;
      }
    });
  }
  login = ()=>{
    fetch('http://49.235.231.110:8800/user')
    .then(res => res.json())
    .then(res => {
      let i;
      for(i = 0; i< res.data.length; i++){
        if(res.data[i].user_name == this.state.username && res.data[i].user_password == this.state.pwd){
          setTimeout(()=>Actions.My({unlogin : false, name : this.state.username}),500) ;
          break;
        }
      }
      if(i == res.data.length){
        ToastAndroid.show('用户名或密码错误',1000);
      }
    })
  }
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
         <TextInput placeholder="请输入账号" 
                keyboardType='default'
                style={styles.input} placeholderTextColor="grey" 
                onChangeText={(value)=>{this.setState({username:value + ''})}} />
          <TextInput placeholder="请输入密码" 
                style={styles.input} placeholderTextColor="grey" 
                onChangeText={(value)=>{this.setState({pwd:value + ''})}}
                secureTextEntry={true} />

              <TouchableOpacity style={styles.ao} >
                    <Button title="注册" color='red' onPress={()=>Actions.register()}/>
                </TouchableOpacity >
                <TouchableOpacity style={styles.ao}>
                    <Button title="登录" color='red' onPress={this.login}/>
                </TouchableOpacity >
          </View>
        {this.state.isloading?<View><Text>正在登陆</Text></View>:null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:'white',
      alignItems:'center',
      justifyContent:'center'
      
  },
  input:{
      width:400,
      height:35,
      marginTop:10,
      borderBottomColor:'grey',
      borderBottomWidth:1
  },
  ao:{
      width:200,
      height:30,
      marginTop:20,
      overflow:"hidden",
      borderRadius:15,
      justifyContent:"center",
  },
})