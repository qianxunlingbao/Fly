import React, {Component} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity,StyleSheet,Button, AsyncStorage, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
export default class Register extends Component {
  constructor(){
    super();
    this.state={
      username:'',
      pwd:'',
      apwd:'',
      isloading:false
    }
  }
  componentDidMount(){
    fetch('http://49.235.231.110:8800/user')
    .then(res => res.json())
    .then(res => {
      this.setState({
        userdata : res.data
      })
    })

  }
  register = () =>{
    if(this.state.pwd == this.state.apwd){
      let userdata = this.state.userdata;
      let i;
      for( i = 0; i < userdata.length; i++){
        if(userdata[i].user_name == this.state.username){
          ToastAndroid.show('该账户已被注册',100);
          break;
        }
      }
      if(i == userdata.length){
        fetch(`http://49.235.231.110:8800/addUser/${userdata[i - 1].user_id + 1}/${this.state.username}/${this.state.pwd}`)
        .then(res => ToastAndroid.show('注册成功，将返回登录',1000));
        setTimeout(() => Actions.pop(),1000);
      }
    }else{
      ToastAndroid.show('两次密码输入不一致',100)

    }
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
         
          <TextInput 
          onChangeText={(value)=>{this.setState({apwd:value + ''})}}
          placeholderTextColor="grey" 
          secureTextEntry={true} 
          placeholder="确认密码" style={styles.input}/>
                <TouchableOpacity style={styles.ao} >
                    <Button title="注册" color='red' onPress={this.register}/>
                </TouchableOpacity >
                <TouchableOpacity style={styles.ao}>
                    <Button title="返回登录" color='red' onPress={()=>{Actions.login()}}/>
                </TouchableOpacity >
        </View>
        {this.state.isloading?<View><Text>正在注册</Text></View>:null}
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