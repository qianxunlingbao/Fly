import React, { Component } from 'react'
import { View, Text,TouchableOpacity,Image,StatusBar,SafeAreaView,ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux'

export default class ListenTogether extends Component {
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
                <View style={{ width: '98%', height: 50, marginLeft: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="arrowleft" size={30} onPress={() => Actions.pop()} />
                    <View style={{ flexDirection: 'row', marginLeft: '39%', marginRight: '40%' }}>
                        <Text style={{ fontSize: 20 }}>一起听</Text>
                    </View>
                </View>
                <View style={{ width: '94%', marginLeft: '3%',flexDirection:'row',flexWrap:'wrap',justifyContent: 'space-between'}}>
                    {
                        this.state.albumname.map((item, index) => {
                            if (index < 10) {
                                return (
                                    <TouchableOpacity style={{ width: '49%', marginTop: 10 }}>
                                        <Image style={{ width: '100%', height:200, borderRadius: 7 }} source={{ uri: 'http://49.235.231.110:8802/musicimage/' + (index + 1) + '.JPG' }} />
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
