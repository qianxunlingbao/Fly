import React, { Component } from 'react'
import { StatusBar, SafeAreaView, ScrollView, View, Text,Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux'

export default class SongList extends Component {
    constructor(){
        super();
        this.state={
            albumname:[]
        }
    }
    componentWillMount(){
        fetch('http://49.235.231.110:8800/music')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    albumname: res.data
                })
            })
    }
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView>
                        <View style={{ width: '96%', height: 50, marginLeft: '2%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="arrowleft" size={30} onPress={() => Actions.pop()} />
                            <View style={{ flexDirection: 'row', marginLeft: '35%', marginRight: '35%' }}>
                                <Text style={{ fontSize: 20 }}>分类歌单</Text>
                            </View>
                            <Icon name="search1" size={25} onPress={() => Actions.search()} />
                        </View>
                        <View style={{width:'96%',marginLeft:'2%',flexDirection:'row',flexWrap:'wrap'}}>
                            {
                                this.state.albumname.map((item,index)=>{
                                    if(index<9){
                                    return (
                                        <TouchableOpacity style={{width:'33%',marginTop:10,left:'3.5%'}}>
                                            <Image style={{ width: '80%', height: 120, borderRadius: 7 }} source={{uri:'http://49.235.231.110:8802/musicimage/'+(index+1)+'.JPG'}} />
                                            <Text>{item.music_name}</Text>
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
