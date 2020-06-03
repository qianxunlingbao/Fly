import React, { Component,useState } from 'react'
import {
    View, 
    Text, 
    AsyncStorage,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    ToastAndroid,
    StatusBar,
    Image,
    StyleSheet,
    FlatList,
    TouchableHighlight,
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign'
const {width,scale,height} = Dimensions.get('window');

export default class Like extends Component {
    constructor() {
        super();
        this.state = {
            singer: [],
            yonghu: [],
            singerColor:'green',
            myColor:'black',
            singerDisplay:'flex',
            myDisplay:'none'
        }
    }
    componentWillMount() {
        fetch('http://49.235.231.110:8800/music')
            .then(res => res.json())
            .then(res => {
                var arr = [];
                for (var i = 0; i < res.data.length; i++) {
                    if (arr.indexOf(res.data[i].music_author) == -1) {
                        arr.push(res.data[i].music_author);
                    }
                }
                this.setState({
                    singer: arr
                })
                AsyncStorage.getItem('yonghu').then(req => JSON.parse(req)).then(json => {
                    if (json == null) {
                        var arr = [];
                        for (var i = 0; i < this.state.singer.length; i++) {
                            arr.push('+关注');
                        }
                        AsyncStorage.setItem('yonghu', JSON.stringify(arr));
                        this.setState({
                            yonghu: arr
                        })
                    } else {
                        this.setState({
                            yonghu: json
                        })
                    }
                })
            })
    }
    yonghuHandle(index){
        AsyncStorage.getItem('yonghu').then(req=>JSON.parse(req)).then(json=>{
            var newArray=json;
            if(newArray[index]=='+关注'){
                newArray[index]='已关注';
                AsyncStorage.setItem('yonghu',JSON.stringify(newArray));
                ToastAndroid.showWithGravity('关注成功',1000,ToastAndroid.CENTER);
                this.setState({
                    yonghu:newArray
                })
            }else{
                Alert.alert('温馨提示','确定不再关注TA?',[
                    {
                        text:"确定",onPress:()=>{
                            newArray[index]='+关注';
                            AsyncStorage.setItem('yonghu',JSON.stringify(newArray));
                            ToastAndroid.showWithGravity('取消关注成功',1000,ToastAndroid.CENTER);
                            this.setState({
                                yonghu:newArray
                            })
                        },
                    },
                    {text:"取消",onPress:()=>{
                        ToastAndroid.showWithGravity('谢谢大佬手下留情',1000,ToastAndroid.CENTER);
                    }}    
                ])
            }
        })
    }
    clickMy(){
        this.setState({
            singerColor:'black',
            myColor:'green',
            singerDisplay:'none',
            myDisplay:'flex'
        })
    }
    clickSinger(){
        this.setState({
            singerColor:'green',
            myColor:'black',
            myDisplay:'none',
            singerDisplay:'flex'
        })
    }
    render() {
        let number = this.state.num;
        let ma = Math.random();
        return (
            <View>
                {/* 状态栏 //fetch('http://49.235.231.110:8800/music') */}
                <StatusBar backgroundColor='#AAAAAA' translucent={true}/>
                <ScrollView>
                    <View style={{width:width,height:width*0.1,backgroundColor:'white'}}>
                        <View style={{width:width*0.1,height:width*0.1}}>
                            <TouchableOpacity onPress={()=>Actions.pop()}>
                                <Text style={{
                                    textAlign:"center",
                                    fontSize:25,marginTop:width*0.01
                                }}>〈</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:width*0.4,height:width*0.1,marginLeft:width*0.30,marginTop:-width*0.09}}>
                            <TouchableOpacity
                                onPress={()=>{this.clickSinger()}}
                            >
                                <Text style={{fontSize:30,color:this.state.singerColor}}>推荐  |  </Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={
                                {
                                    width:width*0.2,
                                    marginLeft:width*0.21,
                                    marginTop:-width*0.102,
                                    height:width*0.1
                                }
                            } onPress={()=>{this.clickMy()}}>
                                <Text style={{textAlign:'center',marginTop:width*0.017,color:this.state.myColor ,fontSize:30}}>已关注</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View style={{ width: '92%', marginLeft: '4%',display:this.state.singerDisplay }}>
                            {
                                this.state.singer.map((item, index) => {
                                    return (
                                        <View style={{ 
                                            flexDirection: 'row',
                                            height: width*0.2, 
                                            alignItems: 'center'
                                        }}>
                                            <View style={{
                                                
                                            }}>
                                                <Image style={{
                                                    width:width*0.15,
                                                    height:width*0.15
                                                }} source={require('../images/huachenyu.png')} />
                                            </View>
                                            <View>
                                                <Text style={{ 
                                                    marginLeft: '1%', 
                                                    fontSize: 17,
                                                    
                                                    marginTop:width*0.01
                                                }} >{item}</Text>
                                                <Text style={
                                                    {
                                                        marginTop:width*0.03,
                                                        color:'#33FF66'
                                                    }
                                                }>Q音音乐人、视频达人</Text>
                                            </View>
                                            <TouchableOpacity style={{ 
                                                width: '17%', 
                                                height: 25, 
                                                borderWidth: 0.8, 
                                                left: '83%', 
                                                position: 'absolute', 
                                                borderColor: 'gray', 
                                                borderRadius: 12, 
                                                alignItems: 'center', 
                                                flexDirection: 'row', 
                                                justifyContent: 'center' 
                                            }} onPress={() => { this.yonghuHandle(index) }}>
                                                <Text>{this.state.yonghu[index]}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View style={{
                            display:this.state.myDisplay,
                            width:'92%',
                            marginLeft:'4%'
                            
                            
                        }}>
                           
                            {
                                this.state.singer.map((item,index)=>{
                                    if(this.state.yonghu[index]=='已关注'){
                                        return (
                                            <TouchableOpacity style={{
                                                //marginTop:width*0.08,
                                                height:width*0.2,
                                                flexDirection:'row',
                                                alignItems:'center'
                                            }}
                                                onPress={()=>Actions.huachenyu()}
                                            >
                                                <View style={{
                                                
                                            }}>
                                                <Image style={{
                                                    width:width*0.15,
                                                    height:width*0.15
                                                }} source={require('../images/huachenyu.png')} />
                                            </View>
                                                <Text style={{fontSize:18}}>{item}</Text>
                                                <Icon name="right" size={20} color="gray" style={{marginLeft:'70%'}} />
                                            </TouchableOpacity>
                                        )
                                    }
                                })
                            }
                        </View>               
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    touxiang:{
        width:width*0.2,
        height:width*0.2
    },
    one:{
        width:width*0.4,
        height:width*0.2,
        marginTop:-width*0.2,
        marginLeft:width*0.2
    },
    two:{
        width:width*0.12,
        height:width*0.2,
        marginTop:-width*0.2,
        marginLeft:width*0.6
    },
    three:{
        width:width*0.12,
        height:height*0.027,
        borderColor:'#888888',
        borderWidth:1,
        borderRadius:25,
        marginTop:width*0.071
    },
    four:{
        width:width*0.18,
        height:width*0.2,
        marginTop:-width*0.2,
        marginLeft:width*0.72
    },
    author:{
        fontSize:17,
        marginTop:width*0.03
    },
    name:{
        fontSize:15,
        color:'#888888',
        marginTop:width*0.05
    },
    delete:{
        textAlign:'center',
        marginTop:width*0.058,
        fontSize:24
    },
    guanzhu:{
        textAlign:'center'
    }
})