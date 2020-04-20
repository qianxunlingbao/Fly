import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage, TouchableOpacity, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils'
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            pwd1:'',
            isloading:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    pwdhandle1 = (text)=>{
        this.setState({pwd1:text})
    }
    zhuce = ()=>{
        // myFetch.get('/topics',{limit:4,user:'sss'})
        //     .then(res=>console.log(res))
        this.setState({isloading:true})
        myFetch.post('/zhuce',{
            username:this.state.username,
            pwd:this.state.pwd,
            pwd1:this.state.pwd1,
        }).then(res=>{
            // 根据返回状态进行判断，正确时跳转首页
            AsyncStorage.setItem('user',JSON.stringify(res.data))
                .then(()=>{
                  if(res.data.token == '1'){
                    this.setState({isloading:false})
                    ToastAndroid.show('该用户名已被注册',10)
                  }else if(res.data.token == '2'){
                    this.setState({isloading:false})
                    ToastAndroid.show('注册失败',10)
                  }else if(res.data.token == '3'){
                    this.setState({isloading:false})
                    ToastAndroid.show('用户名或者密码必须填写',10)
                  }else if(res.data.token == '4'){
                    this.setState({isloading:false})
                    ToastAndroid.show('注册失败,请保证两次输入的密码相同',10)
                  }else if(res.data.token == '123456'){
                    ToastAndroid.show('注册成功，请登录',10)
                    this.setState({isloading:false})
                    Actions.login();
                    console.log(res.data)
                  }
                })
        })
    } 
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="请输入用户名" 
                onChangeText={this.userhandle}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput 
                onChangeText={this.pwdhandle}
                placeholder="请输入密码" 
                secureTextEntry={true}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput 
                onChangeText={this.pwdhandle1}
                placeholder="请再次输入密码" 
                secureTextEntry={true}
            />
          </View>
            <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={this.zhuce}>
                <Text>注册</Text>
            </TouchableOpacity>
            
            {
                this.state.isloading
                ?ToastAndroid.show('请稍后... ...',10)
                :null
            }
        </View> 
        
      </View>
    );
  }
}