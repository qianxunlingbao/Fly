import React, { Component,useState } from 'react'
import {
    View, 
    Text, 
    AsyncStorage,
    Dimensions,
    ScrollView,
    ToastAndroid,
    StatusBar,
    Image,
    TouchableHighlight,
} from 'react-native';

import Button from 'react-native-button';

import Icon from 'react-native-vector-icons/FontAwesome';

const {width,scale,height} = Dimensions.get('window');

export default class Like extends Component {
    constructor(){
        super();
        this.state = {
            tits: [],
            num: 1,
            page: 0,
            isloading:false
        }
    }
    
    getTitle = ()=>{
        this.setState.num++;
        fetch('http://49.235.231.110:8800/music')
            .then(res=>res.json())
            .then(res=>{
                this.setState({
                    tits: res.data
                });
            })
    }
    judge=()=>{
        if(this.state.num > 1){
            this.state.num--;
        }
        if(this.state.num == 1){
            ToastAndroid.show("已经是第一页！！ !", ToastAndroid.SHORT);
        }  
    }
    couter=()=>{  
        this.state.num++;

    }
    
    render() {
        let number = this.state.num;
        let ma = Math.random();
        return (
            <View>
                {/* 状态栏 //fetch('http://49.235.231.110:8800/music') */}
                <StatusBar backgroundColor='transparent' translucent={true}/>
                <ScrollView>
                    <View style={{width:width,height:width*0.07,backgroundColor:'red'}}>
                        <Icon size={30} name="home" />
                        <Text style={{textAlign:'center',fontSize:25,marginTop:-width*0.07}}>我的发布</Text>
                        <Icon size={30} name="home" style={{marginTop:-width*0.07,marginLeft:width*0.9}} />
                    </View>
                    <View>
                    {
                        this.state.tits.map((item)=>(
                            
                            <View style={{flex:1,marginTop:width*0.05}}>
                                <View style={{
                                    width:width*0.9,
                                    height:width*0.2,
                                    backgroundColor:'red',
                                    marginLeft:width*0.05
                                }}>
                                    <View style={{width:width*0.2,height:width*0.2,backgroundColor:'blue'}}>
                                        <Image style={{width:width*0.2,height:width*0.2,}} source={require('../images/huachenyu.png')} />
                                    </View>
                                    <View style={{width:width*0.4,height:width*0.2,backgroundColor:'yellow',marginTop:-width*0.2,marginLeft:width*0.2}}>
                                        <Text style={{fontSize:17}}>{item.music_author}</Text>
                                    </View>
                                    
                                </View>
                            
                            </View>         
                        ))
                    }
                    </View>
                    <View style={{width:width*0.3,height:width*0.07,backgroundColor:'red',marginLeft:width*0.08,borderRadius:25}}>
                        <Button onPress={this.getTitle,this.judge} ><Text style={{color:'black',fontSize:20,textAlign:'center'}}>上一页</Text></Button>
                    </View>
                    <Text style={{marginTop:-width*0.07,height:width*0.07,marginLeft:width*0.38,paddingTop:5,paddingLeft:30}}>第{number}页</Text>
                    <View style={{width:width*0.3,height:width*0.07,backgroundColor:'red',marginTop:-width*0.07,marginLeft:width*0.6,borderRadius:25}}>
                        <Button onPress={this.getTitle(number),this.couter} ><Text style={{color:'black',fontSize:20,textAlign:'center'}}>下一页</Text></Button>
                    </View>
                    
                </ScrollView>
            </View>
        )
    }
}
