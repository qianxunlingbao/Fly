import React, { Component } from 'react'
import { Text, View, StatusBar, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux'

export default class SingerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.item,
            song:[]
        }
    }
    componentWillMount(){
        fetch('http://49.235.231.110:8800/music')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    song:res.data
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
                            <View style={{ flexDirection: 'row',marginLeft:'40%' }}>
                                <Text style={{ fontSize: 20}}>{this.state.data}</Text>
                            </View>
                        </View>
                        <View style={{width:'94%',marginLeft:'3%'}}>
                            <Text style={{fontSize:20,fontWeight:'bold',paddingBottom:15}}>歌曲</Text>
                            {
                                this.state.song.map((item)=>{
                                    if(item.music_author==this.state.data){
                                        return (
                                            <TouchableOpacity style={{height:30,justifyContent:'center'}}>
                                                <Text style={{fontSize:17}}>{item.music_name}</Text>
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
