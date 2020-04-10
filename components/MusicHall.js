import React, { Component } from 'react'
import { View, Text,Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Swiper from 'react-native-swiper'

export default class MusicHall extends Component {
    render() {
        return (
            <>
            <View style={{width:'100%',height:500,alignItems:'center',backgroundColor:'rgb(245,245,245)'}}>
                <View style={{ width: '90%', height: 50,flexDirection:'row',alignItems:'center' }}>
                    <Text style={{ fontSize: 27 }}>音乐馆</Text>
                    <View style={{width:'65%',height:'70%',backgroundColor:'white',marginLeft:'3%',borderRadius:50,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                        <Swiper showsPagination={false} autoplay={true} horizontal={false} autoplayTimeout={3} loop={true}>
                            <View style={{flexDirection:'row',justifyContent:'center',height:'100%',alignItems:'center'}}>
                                <Icon color='gray' size={22} name="search" />
                                <Text style={{color:'gray',marginLeft:7,fontSize:15}}>正在热搜:相思成灾</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center',height:'100%',alignItems:'center'}}>
                                <Icon color='gray' size={22} name="search" />
                                <Text style={{color:'gray',marginLeft:7,fontSize:15}}>正在热搜:TIMI</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center',height:'100%',alignItems:'center'}}>
                                <Icon color='gray' size={22} name="search" /> 
                                <Text style={{color:'gray',marginLeft:7,fontSize:15}}>正在热搜:Take It Off</Text>
                            </View>
                        </Swiper>
                        <View style={{width:'100%',height:'100%',position:'absolute',backgroundColor:'white',opacity:0}}></View>
                    </View>
                    <Icon name="music" size={30} style={{marginLeft:15}} />
                </View>
                <View style={{width:'90%',height:150,marginTop:15,borderRadius:15,overflow:'hidden'}}>
                    <Swiper paginationStyle={{bottom:5}} autoplay={true} autoplayTimeout={3}>
                        <Image style={{width:'100%',height:'100%'}} source={require('../images/swiper.png')} />
                        <Image style={{width:'100%',height:'100%'}} source={require('../images/swiper.png')} />
                        <Image style={{width:'100%',height:'100%'}} source={require('../images/swiper.png')} />
                    </Swiper>
                </View>
                <View style={{width:'90%',height:70,marginTop:30,flexDirection:'row'}}>
                    <TouchableOpacity style={{width:'20%',height:70,justifyContent:'center',alignItems:'center'}}>
                        <Icon name="user" size={30} color='green' />
                        <Text>歌手</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'20%',height:70,justifyContent:'center',alignItems:'center'}}>
                        <Icon name="bar-chart-2" size={30} color='green' />
                        <Text>排行榜</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'20%',height:70,justifyContent:'center',alignItems:'center'}}>
                        <Icon name="grid" size={30} color='green' />
                        <Text>分类歌单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'20%',height:70,justifyContent:'center',alignItems:'center'}}>
                        <Icon name="activity" size={30} color='green' />
                        <Text>电台</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'20%',height:70,justifyContent:'center',alignItems:'center'}}>
                        <Icon name="headphones" size={30} color='green' />
                        <Text>一起听</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:'90%',height:90,marginTop:15,flexDirection:'row'}}>
                    <TouchableOpacity style={{width:'48%',height:90,backgroundColor:'#43CD80',borderRadius:15,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Image style={{width:60,height:60,borderRadius:7}} source={require('../images/album1.png')} />
                        <View style={{width:'55%',height:60,justifyContent:'center',marginLeft:10}}>
                            <Text style={{fontSize:16,color:'white'}}>
                                新歌新碟
                            </Text>
                            <Text style={{fontSize:14,color:'white',marginTop:8}}>
                                一口一口吃掉忧愁
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'48%',height:90,backgroundColor:'orange',marginLeft:'4%',borderRadius:15,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Image style={{width:60,height:60,borderRadius:7}} source={require('../images/album2.png')} />
                        <View style={{width:'55%',height:60,justifyContent:'center',marginLeft:10}}>
                            <Text style={{fontSize:16,color:'white'}}>
                                数字专辑•票务
                            </Text>
                            <Text style={{fontSize:14,color:'white',marginTop:8}}>
                                你的少年百分九
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{width:'90%',height:50,marginTop:30,alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:21}}>官方歌单</Text>
                    <TouchableOpacity style={{marginLeft:'70%'}}>
                        <Text style={{fontSize:15,color:'gray'}}>更多></Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{height:160,width:'90%',marginLeft:'5%',flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
                <View style={{width:'32%',height:160,overflow:'hidden'}} >
                    <Image style={{width:'100%',height:120,borderRadius:10}} source={require('../images/musiclist1.png')} />
                    <View style={{width:'90%',marginLeft:'5%',height:30,position:'absolute',top:80,flexDirection:'row',alignItems:'center'}}>
                        <Icon name='headphones' size={15} color='white' />
                        <Text style={{color:'white',marginLeft:2}}>1.2亿</Text>
                        <Icon name='play-circle' size={20} color='white' style={{position:'absolute',left:'84%'}} />
                    </View>
                    <Text style={{marginTop:5}}>
                        90后的独家记忆，那些熟悉的旋律
                    </Text>
                </View>
                <View style={{width:'32%',height:160,overflow:'hidden'}} >
                    <Image style={{width:'100%',height:120,borderRadius:10}} source={require('../images/musiclist2.png')} />
                    <View style={{width:'90%',marginLeft:'5%',height:30,position:'absolute',top:80,flexDirection:'row',alignItems:'center'}}>
                        <Icon name='headphones' size={15} color='white' />
                        <Text style={{color:'white',marginLeft:2}}>6518.9万</Text>
                        <Icon name='play-circle' size={20} color='white' style={{position:'absolute',left:'84%'}} />
                    </View>
                    <Text style={{marginTop:5}}>
                        伤感华语：连歌词都能写到一个人的心里
                    </Text>
                </View>
                <View style={{width:'32%',height:160,overflow:'hidden'}} >
                    <Image style={{width:'100%',height:120,borderRadius:10}} source={require('../images/musiclist3.png')} />
                    <View style={{width:'90%',marginLeft:'5%',height:30,position:'absolute',top:80,flexDirection:'row',alignItems:'center'}}>
                        <Icon name='headphones' size={15} color='white' />
                        <Text style={{color:'white',marginLeft:2}}>9058.2万</Text>
                        <Icon name='play-circle' size={20} color='white' style={{position:'absolute',left:'84%'}} />
                    </View>
                    <Text style={{marginTop:5}}>
                        回忆风 | 那年火爆的校园情歌
                    </Text>
                </View>
            </View>
            </>
        )
    }
}
