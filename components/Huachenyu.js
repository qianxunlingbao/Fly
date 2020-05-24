import React, { Component,useState } from 'react'
import {
    View, 
    Text, 
    AsyncStorage,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    ToastAndroid,
    Modal,
    StatusBar,
    Image,
    StyleSheet,
    FlatList,
    TouchableHighlight,
} from 'react-native';

import ConfirmModal from './ConfirmModal';

import { Actions } from 'react-native-router-flux';

const {width,scale,height} = Dimensions.get('window');

export default class Huachenyu extends Component {
    constructor(){
        super();
        this.state = {
            data: [
                {music_name:'树洞',music_value:'欧阳娜娜▪树洞▪《小欢喜》电视剧插曲'},
                {music_name:'蜕变(Live)',music_value:'欧阳娜娜/R1SE周震南/高嘉朗/张远/Rise…'},
                {music_name:'小幸运(Live)',music_value:'薛之谦/欧阳娜娜▪《我们的挑战》新春歌会…'},
                {music_name:'秘语',music_value:'欧阳娜娜/陈飞宇▪秘语▪《秘果》电影悸…'},
                {music_name:'再谈记忆(Say It Anain)(Live)',music_value:'盘尼西林乐队/欧阳娜娜▪乐队的夏天 第7期'},
                {music_name:'一心一念',music_value:'欧阳娜娜▪北灵少年志之大主宰 电视剧影视…'},
                {music_name:'To Me',music_value:'欧阳娜娜▪To Me'},
                {music_name:'树洞',music_value:'欧阳娜娜▪树洞▪《小欢喜》电视剧插曲'},
                {music_name:'蜕变(Live)',music_value:'欧阳娜娜/R1SE周震南/高嘉朗/张远/Rise…'},
                {music_name:'小幸运(Live)',music_value:'薛之谦/欧阳娜娜▪《我们的挑战》新春歌会…'},
                {music_name:'秘语',music_value:'欧阳娜娜/陈飞宇▪秘语▪《秘果》电影悸…'},
                {music_name:'再谈记忆(Say It Anain)(Live)',music_value:'盘尼西林乐队/欧阳娜娜▪乐队的夏天 第7期'},
                {music_name:'一心一念',music_value:'欧阳娜娜▪北灵少年志之大主宰 电视剧影视…'},
                {music_name:'To Me',music_value:'欧阳娜娜▪To Me'},
            ],
            num: 1,
            page: 0,
            isloading:false,
            guanzhu: '+关注',
            isAdd:false,
            key: 0,
            menu:[1,0,0,0,0],
            createdata:[],
            addposition:'absolute',
            addflex:'flex',
            modalVisible: false ,
            content:'I come from Parent component',
            title:'是否举报？'
        }
    }
    componentDidMount = ()=>{
        
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    guanzhu(){
        this.setState({
            isAdd:!this.state.isAdd,
            guanzhu: this.state.isAdd ? '+关注' : '已关注'
        })
    }
    jubao(){
        alert(
            11
        )
    }
    render() {
        return (
            <View>
                {/* 状态栏 //fetch('http://49.235.231.110:8800/music') */}
                <StatusBar backgroundColor='#AAAAAA' translucent={true}/>
                <View style={{
                    
                    width:width,
                    backgroundColor:'#AAAAAA',
                    opacity:0.5,
                    height:height*0.05
                }}>
                    <View style={{width:width*0.1}}>
                        <TouchableOpacity 
                            onPress={()=>Actions.Condition()}
                        >
                            <Text style={{
                                textAlign:"center",
                                fontSize:25
                            }}>〈</Text>
                        </TouchableOpacity>
                    
                    </View>
                    <View style={{width:width*0.5}}>
                        <ConfirmModal
                            modalVisible={this.state.modalVisible}
                            content={this.state.content}
                            callback={this.setModalVisible.bind(this)}
                            >
                        </ConfirmModal>
                        <TouchableOpacity style={{
                            marginLeft:width*0.36,
                            borderRadius:25,
                            borderColor:'black',
                            backgroundColor:'#AAAAAA',
                            width:width*0.3,
                            marginTop:-height*0.03
                            }} 
                        >
                            <Text style={{
                                textAlign:'center',
                                fontSize:20
                            }}>
                                欧阳娜娜
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop:-height*0.04,
                            marginLeft:width*0.8
                        }}
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                    >
                        <Image style={{
                            width:width*0.052,
                            height:width*0.052,
                            marginTop:width*0.01
                        }} source={require('../images/share.png')} />
                    </TouchableOpacity>     
                    <TouchableOpacity
                        style={{
                            marginTop:-height*0.04,
                            marginLeft:width*0.9
                        }}
                        onPress={
                            () => {
                                alert(
                                    this.state.title
                                );
                            }
                        }
                    >
                        <Image style={{
                            width:width*0.052,
                            height:width*0.052,
                            marginTop:width*0.02
                        }} source={require('../images/ellipsis.png')} />
                    </TouchableOpacity>  
                </View>  
                <ScrollView>
                    <View style=
                        {
                            {
                                width:width,
                                hieght:height*0.25,
                            }
                        }>
                        <Image 
                            style={
                                {
                                    width:width,
                                    height:height*0.25,
                                    position:'absolute',
                                    zIndex:-1,
                                    borderBottomRightRadius:50,
                                    borderBottomLeftRadius:50

                                }
                            }
                            source={require('../images/ouyangnana.png')} 
                        />
                        <Text style={
                            {
                                   fontSize:22,
                                   marginTop:width*0.25,
                                   marginLeft:width*0.05
                            }
                        }>欧阳娜娜</Text>
                        <Text style={
                            {
                                   fontSize:18,
                                   color:'green',
                                   marginLeft:width*0.05
                            }
                        }>0关注   36.5万  粉丝</Text>
                        <Text style={
                            {
                                   fontSize:18,
                                   color:'red',
                                   marginLeft:width*0.05
                            }
                        }>入驻艺人</Text>
                        <TouchableOpacity style={
                            {
                                width:width*0.15,
                                height:width*0.05,
                                backgroundColor:'white',
                                marginLeft:width*0.6,
                                marginTop:-width*0.05,
                                borderRadius:50
                            }
                        }
                            onPress={()=>this.guanzhu()}
                        >
                            <Text style={
                                {
                                    textAlign:'center',
                                    fontSize:15
                                }
                            }>{this.state.guanzhu}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={
                            {
                                width:width*0.15,
                                height:width*0.05,
                                backgroundColor:'#aaaaaa',
                                marginLeft:width*0.8,
                                marginTop:-width*0.05,
                                borderRadius:50
                            }
                        }
                        >
                            <Image style={
                                {
                                   width:width*0.05,
                                   height:width*0.05,
                                   marginLeft:width*0.01
                                }
                            }
                                source={require('../images/remark.png')} />
                            <Text style={
                                {
                                    marginLeft:width*0.07,
                                    fontSize:15,
                                    color:'white',
                                    marginTop:-width*0.05
                                }
                            }>私信</Text>
                        </TouchableOpacity>
                    </View> 
                    <View>
                        <View style={
                            {
                                flexDirection:'row',
                                marginTop:width*0.05
                            }
                        }>
                            <TouchableOpacity  
                                onPress={()=>this.setState(
                                    {
                                        menu:[1,0,0,0,0],
                                        addposition:'absolute',
                                        addflex:'flex'
                                    })}
                            >
                                <Text style={
                                    {
                                        fontSize:20,
                                        textAlign:'center',
                                        marginLeft:width*0.07,
                                        color:this.state.menu[0]?'black':'grey'
                                    }
                                }>歌曲92</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>this.setState(
                                    {
                                        menu:[0,1,0,0,0],
                                        addposition:'relative',
                                        addflex:'none'
                                        })} 
                            >
                                <Text style={
                                    {
                                        fontSize:20,
                                        textAlign:'center',
                                        color:this.state.menu[1]?'black':'grey',
                                        marginLeft:width*0.05
                                    }
                                }>专辑12</Text>
                            </TouchableOpacity>   
                            <TouchableOpacity 
                                onPress={()=>this.setState(
                                    {
                                        menu:[0,0,1,0,0],
                                        addposition:'relative',
                                        addflex:'none'
                                        })} 
                            >
                                <Text style={
                                    {
                                        fontSize:20,
                                        textAlign:'center',
                                        color:this.state.menu[2]?'black':'grey',
                                        marginLeft:width*0.05
                                    }
                                }>视频157</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity 
                                onPress={()=>this.setState(
                                    {
                                        menu:[0,0,0,1,0],
                                        addposition:'relative',
                                        addflex:'none'
                                        })} 
                            >
                                <Text style={
                                    {
                                        fontSize:20,
                                        textAlign:'center',
                                        color:this.state.menu[3]?'black':'grey',
                                        marginLeft:width*0.05
                                    }
                                }>动态7</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity 
                                onPress={()=>this.setState(
                                    {
                                        menu:[0,0,0,0,1],
                                        addposition:'relative',
                                        addflex:'none'
                                        })} 
                            >
                                <Text style={
                                    {
                                        fontSize:20,
                                        textAlign:'center',
                                        color:this.state.menu[4]?'black':'grey',
                                        marginLeft:width*0.05
                                    }
                                }>关于TA</Text>
                            </TouchableOpacity>  
                        </View> 
                        {
                                this.state.addflex == 'flex' 
                                ?
                                <View>
                                    <FlatList 
                                        data={this.state.data}
                                        renderItem={({item})=>
                                            
                                            <View style={
                                                {
                                                    flex:1,
                                                    opacity:0.8,
                                                    marginTop:width*0.05,
                                                    backgroundColor:'AAAAAA'
                                                    }
                                                }>
                                                <View style={
                                                    {
                                                        width:width*0.7,
                                                        height:width*0.1
                                                    }
                                                } >
                                                    <Text style={
                                                        {
                                                            marginLeft:width*0.05,
                                                            fontSize:18
                                                        }
                                                    }>{item.music_name}</Text>
                                                    <Text style={
                                                        {
                                                            marginLeft:width*0.05
                                                        }
                                                    }>{item.music_value}</Text>
                                                </View>
                                                <View style={
                                                    {
                                                        width:width*0.15,
                                                        height:width*0.1,
                                                        marginLeft:width*0.7,
                                                        marginTop:-width*0.1
                                                    }
                                                }>
                                                    <Image style={
                                                        {
                                                            width:width*0.06,
                                                            height:width*0.06,
                                                            justifyContent:'center',
                                                            alignItems:'center',
                                                            marginLeft:width*0.045,
                                                            marginTop:width*0.02
                                                        }
                                                    }
                                                    source={require('../images/broadcast.png')} />
                                                </View>
                                                <View style={
                                                    {
                                                        width:width*0.15,
                                                        height:width*0.1,
                                                        marginLeft:width*0.8,
                                                        marginTop:-width*0.1
                                                    }
                                                }>
                                                    <Image style={
                                                        {
                                                            width:width*0.06,
                                                            height:width*0.06,
                                                            justifyContent:'center',
                                                            alignItems:'center',
                                                            marginLeft:width*0.045,
                                                            marginTop:width*0.02
                                                        }
                                                    }
                                                    source={require('../images/ellipsis.png')} />
                                                </View>
                                            </View>
                                        }
                                    />
                                </View>
                                :
                                <View style = {
                                    {
                                        height:height*0.3,
                                        justifyContent:"center",
                                        alignItems:"center"
                                    }
                                }>
                                    <Text style = {
                                        {
                                            textAlign:"center",
                                            fontSize:20
                                        }
                                    }>暂无！！！静请稍候</Text>
                                </View>
                            }  
                    </View>              
                    
                    
                    
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    
})
