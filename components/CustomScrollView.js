import React, {Component} from 'react';
import {
    View, 
    Text, 
    Image, 
    TextInput, 
    TouchableOpacity,
    StyleSheet,
    Button, 
    AsyncStorage, 
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

export default class CustomScrollView extends Component{
    constructor(){
        super();
        this.state={
            musicId: '',//评论音乐的id
            userId: '',//评论者id
            wordValue: '',//评论内容
            wordgoodcounts: '',
            isloading: false
        } 
    }
    componentDidMount(){
        fetch('http://49.235.231.110:8800/musicword')
        .then(res => res.json())
        .then(res => {
            this.setState({
                worddata :res.data//将评论数据赋值给worddata
            })
        })
    }
    add = () =>{
        let worddata = this.state.worddata;
        let i = worddata.length;
        if(i == worddata.length){
            fetch(`http://49.235.231.110:8800/addWord/${worddata[i-1].word_id+1}/${this.state.musicId}/${this.state.userId}/${this.state.wordValue}`)
            .then(res => 
                ToastAndroid.show('添加评论成功！！！',1000)
            );
            setTimeout(
                ()=>
                    Actions.pop(),1000);
        }else{
            ToastAndroid.show('对不起，评论添加失败，请再次尝试！！！',100)
        }
    }

    render(){
        return (
            <View style={
                {
                    flex: 1,
                    justifyContent: 'center'
                }
            }>
                <View  style={
                    { 
                        alignItems: 'center'
                    }
                }>
                    <TextInput 
                        placeholder="请输入评论音乐的id" 
                        keyboardType='default'
                        placeholderTextColor="grey" 
                        onChangeText={
                            (value)=>{
                                this.setState(
                                    {musicId:value + ''}
                                )
                            }
                        } 
                    />
                    <TextInput 
                        placeholder="请输入评论者id" 
                        keyboardType='default'
                        placeholderTextColor="grey" 
                        onChangeText={
                            (value)=>{
                                this.setState(
                                    {userId:value + ''}
                                )
                            }
                        } 
                    />
                    <TextInput 
                        placeholder="请输入评论内容" 
                        keyboardType='default'
                        placeholderTextColor="grey" 
                        onChangeText={
                            (value)=>{
                                this.setState(
                                    {wordValue:value + ''}
                                )
                            }
                        } 
                    />
                    <TouchableOpacity>
                        <Button 
                            title="添加评论" 
                            color='red'  
                            onPress={this.add}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}