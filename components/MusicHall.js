import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Swiper from 'react-native-swiper'
import { Actions } from 'react-native-router-flux';

console.disableYellowBox = true;

export default class MusicHall extends Component {
    constructor() {
        super();
        this.state = {
            albumname: [],
            swiperImgUrl:[]
        }
    }
    componentWillMount() {
        fetch('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923&song_num=10')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    albumname: res.songlist
                })
            })
        fetch('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg')
            .then(res=>res.json())
            .then(res=>{
                this.setState({
                    swiperImgUrl:res.data.slider
                })
            })
    }
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView>
                        <View style={{ width: '100%', height: 500, alignItems: 'center', backgroundColor: 'rgb(245,245,245)' }}>
                            <View style={{ width: '90%', height: 50, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 27 }}>音乐馆</Text>
                                <View style={{ width: '67%', height: '70%', backgroundColor: 'white', marginLeft: '3%', borderRadius: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <Swiper showsPagination={false} autoplay={true} horizontal={false} autoplayTimeout={3} loop={true}>
                                        {
                                            this.state.albumname.map((item) => {
                                                return (
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                                                        <Icon color='gray' size={22} name="search" />
                                                        <Text style={{ color: 'gray', marginLeft: 7, fontSize: 15 }}>正在热搜:{item.data.albumname.slice(0, 11)}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </Swiper>
                                    <TouchableOpacity onPress={() => Actions.search()} style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'white', opacity: 0 }}></TouchableOpacity>
                                </View>
                                <Icon name="music" size={30} style={{ marginLeft: 15 }} />
                            </View>
                            <View style={{ width: '90%', height: 155, marginTop: 15, borderRadius: 10, overflow: 'hidden' }}>
                                <Swiper paginationStyle={{ bottom: 5 }} autoplay={true} autoplayTimeout={3} loop={true}>
                                    {
                                        this.state.swiperImgUrl.map((item)=>{
                                            return (
                                                <Image style={{ width: '100%', height: '100%' }} source={{uri:item.picUrl}} />
                                            )
                                        })
                                    }
                                </Swiper>
                            </View>
                            <View style={{ width: '90%', height: 70, marginTop: 30, flexDirection: 'row' }}>
                                <TouchableOpacity style={{ width: '20%', height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name="user" size={30} color='green' />
                                    <Text>歌手</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '20%', height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name="bar-chart-2" size={30} color='green' />
                                    <Text>排行榜</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '20%', height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name="grid" size={30} color='green' />
                                    <Text>分类歌单</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '20%', height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name="activity" size={30} color='green' />
                                    <Text>电台</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '20%', height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name="headphones" size={30} color='green' />
                                    <Text>一起听</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '90%', height: 90, marginTop: 15, flexDirection: 'row' }}>
                                <TouchableOpacity style={{ width: '48%', height: 90, backgroundColor: '#43CD80', borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ width: 60, height: 60, borderRadius: 7 }} source={require('../images/album1.png')} />
                                    <View style={{ width: '55%', height: 60, justifyContent: 'center', marginLeft: 10 }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>
                                            新歌新碟
                            </Text>
                                        <Text style={{ fontSize: 14, color: 'white', marginTop: 8 }}>
                                            一口一口吃掉忧愁
                            </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '48%', height: 90, backgroundColor: 'orange', marginLeft: '4%', borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ width: 60, height: 60, borderRadius: 7 }} source={require('../images/album2.png')} />
                                    <View style={{ width: '55%', height: 60, justifyContent: 'center', marginLeft: 10 }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>
                                            数字专辑•票务
                            </Text>
                                        <Text style={{ fontSize: 14, color: 'white', marginTop: 8 }}>
                                            你的少年百分九
                            </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '90%', height: 50, marginTop: 30, alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 21 }}>官方歌单</Text>
                                <TouchableOpacity style={{ marginLeft: '70%' }}>
                                    <Text style={{ fontSize: 15, color: 'gray' }}>更多></Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 160, width: '90%', marginLeft: '5%', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <View style={{ width: '32%', height: 160, overflow: 'hidden' }} >
                                <Image style={{ width: '100%', height: 120, borderRadius: 10 }} source={require('../images/musiclist1.png')} />
                                <View style={{ width: '90%', marginLeft: '5%', height: 30, position: 'absolute', top: 90, flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name='headphones' size={15} color='white' />
                                    <Text style={{ color: 'white', marginLeft: 2 }}>1.2亿</Text>
                                    <Icon name='play-circle' size={20} color='white' style={{ position: 'absolute', left: '84%' }} />
                                </View>
                                <Text style={{ marginTop: 5 }}>
                                    90后的独家记忆，那些熟悉的旋律
                    </Text>
                            </View>
                            <View style={{ width: '32%', height: 160, overflow: 'hidden' }} >
                                <Image style={{ width: '100%', height: 120, borderRadius: 10 }} source={require('../images/musiclist2.png')} />
                                <View style={{ width: '90%', marginLeft: '5%', height: 30, position: 'absolute', top: 90, flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name='headphones' size={15} color='white' />
                                    <Text style={{ color: 'white', marginLeft: 2 }}>6518.9万</Text>
                                    <Icon name='play-circle' size={20} color='white' style={{ position: 'absolute', left: '84%' }} />
                                </View>
                                <Text style={{ marginTop: 5 }}>
                                    伤感华语：连歌词都能写到一个人的心里
                    </Text>
                            </View>
                            <View style={{ width: '32%', height: 160, overflow: 'hidden' }} >
                                <Image style={{ width: '100%', height: 120, borderRadius: 10 }} source={require('../images/musiclist3.png')} />
                                <View style={{ width: '90%', marginLeft: '5%', height: 30, position: 'absolute', top: 90, flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name='headphones' size={15} color='white' />
                                    <Text style={{ color: 'white', marginLeft: 2 }}>9058.2万</Text>
                                    <Icon name='play-circle' size={20} color='white' style={{ position: 'absolute', left: '84%' }} />
                                </View>
                                <Text style={{ marginTop: 5 }}>
                                    回忆风 | 那年火爆的校园情歌
                    </Text>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}
