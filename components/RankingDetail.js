import React, { Component } from 'react'
import { View, Image, StatusBar, SafeAreaView, ScrollView,Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import {Actions} from 'react-native-router-flux'

export default class RankingDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            num:this.props.data,
            type:''
        }
    }
    componentWillMount(){
        fetch('http://49.235.231.110:8800/music')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
        if(this.state.num==1){
            this.setState({
                type:'飙升'
            })
        }else if(this.state.num==4){
            this.setState({
                type:'热歌'
            })
        }else{
            this.setState({
                type:'新歌'
            })
        }
    }
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView>
                    <ScrollView>
                        <View style={{ width: '100%', height: 300 }}>
                            <Image style={{ width: '100%', height: '100%' }} source={{ uri: 'http://49.235.231.110:8802/musicimage/'+this.state.num+'.JPG' }} />
                        </View>
                        <View style={{width:'100%',height:300,backgroundColor:'black',position:'absolute',opacity:0.5}}></View>
                        <View style={{ width: '96%', height: 300, marginLeft: '2%',position:'absolute' }}>
                            <Icon name="arrowleft" size={30} onPress={() => Actions.pop()} color="white" />
                            <View style={{width:'100%',height:200,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>
                                    巅峰榜
                                </Text>
                                <Text style={{color:'white',fontSize:40,fontWeight:'bold'}}>
                                    {this.state.type}
                                </Text>
                            </View>
                        </View>
                        <View style={{width:'94%',marginLeft:'3%',marginTop:15}}>
                            {
                                this.state.data.map((item,index)=>{
                                    if(index>=this.state.num-1 && index<=this.state.num+1){
                                        return (
                                            <TouchableOpacity style={{width:'100%',height:30}}>
                                                <Text style={{fontSize:15}}>{index%3+1}    {item.music_name}</Text>
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
