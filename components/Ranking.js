import React, { Component } from 'react'
import { StatusBar, ScrollView, View, Text, SafeAreaView,Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux'

export default class Ranking extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }
    componentWillMount() {
        fetch('http://49.235.231.110:8800/music')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
    }
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView>
                        <View style={{ width: '96%', height: 50, marginLeft: '2%', flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="arrowleft" size={30} onPress={() => Actions.pop()} />
                            <View style={{ flexDirection: 'row',width:'93%',justifyContent:'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>微音排行榜</Text>
                            </View>
                        </View>
                        <View style={{ width: '94%', marginLeft: '3%' }}>
                            <Text style={{ fontSize: 18 }}>巅峰榜</Text>
                            <TouchableOpacity style={{ width: '100%', height: 100, backgroundColor: 'white', borderRadius: 8, marginTop: 10,flexDirection:'row',overflow:'hidden' }} onPress={()=>Actions.rankingdetail(1)}>
                                <View style={{ width: '75%', height: 100, paddingLeft: 15, paddingTop: 5 }}>
                                    <Text style={{ fontSize: 17, marginBottom: 5 }}>飙升榜</Text>
                                    {
                                        this.state.data.map((item, index) => {
                                            if (index >= 0 && index <= 2) {
                                                return (
                                                    <>
                                                        <Text style={{ fontSize: 13 }}>{index + 1}. {item.music_name} - <Text style={{ color: 'gray' }}>{item.music_author}</Text></Text>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </View>
                                <View style={{width:'25%',height:100}}>
                                    <Image style={{ width: '100%', height: '100%' }} source={{ uri:'http://49.235.231.110:8802/musicimage/1.JPG' }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '100%', height: 100, backgroundColor: 'white', borderRadius: 8, marginTop: 10,flexDirection:'row',overflow:'hidden' }} onPress={()=>Actions.rankingdetail(4)}>
                                <View style={{ width: '75%', height: 100, paddingLeft: 15, paddingTop: 5 }}>
                                    <Text style={{ fontSize: 17, marginBottom: 5 }}>热歌榜</Text>
                                    {
                                        this.state.data.map((item, index) => {
                                            if (index >= 3 && index <= 5) {
                                                return (
                                                    <>
                                                        <Text style={{ fontSize: 13 }}>{index - 2}. {item.music_name} - <Text style={{ color: 'gray' }}>{item.music_author}</Text></Text>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </View>
                                <View style={{width:'25%',height:100}}>
                                    <Image style={{ width: '100%', height: '100%' }} source={{ uri:'http://49.235.231.110:8802/musicimage/4.JPG' }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '100%', height: 100, backgroundColor: 'white', borderRadius: 8, marginTop: 10,flexDirection:'row',overflow:'hidden' }} onPress={()=>Actions.rankingdetail(7)}>
                                <View style={{ width: '75%', height: 100, paddingLeft: 15, paddingTop: 5 }}>
                                    <Text style={{ fontSize: 17, marginBottom: 5 }}>新歌榜</Text>
                                    {
                                        this.state.data.map((item, index) => {
                                            if (index >= 6 && index <= 8) {
                                                return (
                                                    <>
                                                        <Text style={{ fontSize: 13 }}>{index - 5}. {item.music_name} - <Text style={{ color: 'gray' }}>{item.music_author}</Text></Text>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </View>
                                <View style={{width:'25%',height:100}}>
                                    <Image style={{ width: '100%', height: '100%' }} source={{ uri:'http://49.235.231.110:8802/musicimage/7.JPG' }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}