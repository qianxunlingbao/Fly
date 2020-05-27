import React, { Component } from 'react'
import { SafeAreaView, ScrollView, View, StatusBar, TouchableOpacity, Text, AsyncStorage, Alert, ToastAndroid, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux'

export default class Singer extends Component {
    constructor() {
        super();
        this.state = {
            singer: [],
            follow: [],
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
                AsyncStorage.getItem('follow').then(req => JSON.parse(req)).then(json => {
                    if (json == null) {
                        var arr = [];
                        for (var i = 0; i < this.state.singer.length; i++) {
                            arr.push('+关注');
                        }
                        AsyncStorage.setItem('follow', JSON.stringify(arr));
                        this.setState({
                            follow: arr
                        })
                    } else {
                        this.setState({
                            follow: json
                        })
                    }
                })
            })
    }
    followHandle(index){
        AsyncStorage.getItem('follow').then(req=>JSON.parse(req)).then(json=>{
            var newArray=json;
            if(newArray[index]=='+关注'){
                newArray[index]='已关注';
                AsyncStorage.setItem('follow',JSON.stringify(newArray));
                ToastAndroid.showWithGravity('关注成功',1000,ToastAndroid.CENTER);
                this.setState({
                    follow:newArray
                })
            }else{
                Alert.alert('','确定不再关注TA?',[
                    {
                        text:"确定",onPress:()=>{
                            newArray[index]='+关注';
                            AsyncStorage.setItem('follow',JSON.stringify(newArray));
                            ToastAndroid.showWithGravity('取消关注成功',1000,ToastAndroid.CENTER);
                            this.setState({
                                follow:newArray
                            })
                        },
                    },
                    {text:"取消",onPress:()=>{}}    
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
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView>
                        <View style={{ width: '96%', height: 50, marginLeft: '2%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="arrowleft" size={30} onPress={() => Actions.Music()} />
                            <View style={{ flexDirection: 'row', marginLeft: '31%', marginRight: '31%' }}>
                                <TouchableOpacity onPress={()=>{this.clickSinger()}}>
                                    <Text style={{ fontSize: 20,color:this.state.singerColor }}>歌手</Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 20 }}>  |  </Text>
                                <TouchableOpacity onPress={()=>{this.clickMy()}}>
                                    <Text style={{ fontSize: 20,color:this.state.myColor }}>我的</Text>
                                </TouchableOpacity>
                            </View>
                            <Icon name="search1" size={25} onPress={() => Actions.search()} />
                        </View>
                        <View style={{ width: '92%', marginLeft: '4%',display:this.state.singerDisplay }}>
                            {
                                this.state.singer.map((item, index) => {
                                    return (
                                        <View style={{ flexDirection: 'row', height: 30, alignItems: 'center'}}>
                                            <Text style={{ marginLeft: '1%', fontSize: 17,width:'80%',height:'100%' }} onPress={()=>{Actions.singerdetail({item})}}>{item}</Text>
                                            <TouchableOpacity style={{ width: '17%', height: 25, borderWidth: 0.8, left: '83%', position: 'absolute', borderColor: 'gray', borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }} onPress={() => { this.followHandle(index) }}>
                                                <Text>{this.state.follow[index]}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View style={{display:this.state.myDisplay,width:'92%',marginLeft:'4%'}}>
                            <Text style={{fontSize:18,color:'green'}}>关注歌手</Text>
                            {
                                this.state.singer.map((item,index)=>{
                                    if(this.state.follow[index]=='已关注'){
                                        return (
                                            <TouchableOpacity style={{height:40,flexDirection:'row',alignItems:'center'}} onPress={()=>Actions.singerdetail({item})}>
                                                <Text style={{fontSize:18}}>{item}</Text>
                                                <Icon name="right" size={20} color="gray" style={{marginLeft:'87%'}} />
                                            </TouchableOpacity>
                                        )
                                    }
                                })
                            }
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}
