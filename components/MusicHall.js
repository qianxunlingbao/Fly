import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Swiper from 'react-native-swiper'
import { Actions } from 'react-native-router-flux';

console.disableYellowBox = true;

export default class MusicHall extends Component {
    constructor() {
        super();
        this.state = {
            albumname: [],
            swiperImgUrl: [],
            refreshing: false
        }
    }
    componentWillMount() {
        fetch('http://49.235.231.110:8800/music')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    albumname: res.data
                })
            })
        fetch('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    swiperImgUrl: res.data.slider
                })
            })
    }
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView refreshControl={
                        <RefreshControl onRefresh={() => {
                            this.setState({
                                refreshing: true
                            })
                            fetch('http://49.235.231.110:8800/music')
                                .then(res => res.json())
                                .then(res => {
                                    this.setState({
                                        albumname: res.data
                                    })
                                })
                            fetch('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg')
                                .then(res => res.json())
                                .then(res => {
                                    this.setState({
                                        swiperImgUrl: res.data.slider,
                                        refreshing: false
                                    })
                                })
                        }}
                            refreshing={this.state.refreshing}
                            colors={['green']}
                        />
                    }>
                        <View style={{ width: '100%', height: 500, alignItems: 'center', backgroundColor: 'rgb(245,245,245)' }}>
                            <View style={{ width: '90%', height: 50, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ width: '19%', fontSize: 27, textAlign: 'center' }}>音乐馆</Text>
                                <View style={{ width: '67%', height: '70%', backgroundColor: 'white', borderRadius: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: '3%' }}>
                                    <Swiper showsPagination={false} autoplay={true} horizontal={false} autoplayTimeout={3} loop={true}>
                                        {
                                            this.state.albumname.map((item) => {
                                                return (
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                                                        <Icon color='gray' size={22} name="search" />
                                                        <Text style={{ color: 'gray', marginLeft: 7, fontSize: 15 }}>正在热搜:{item.music_name.slice(0, 11)}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </Swiper>
                                    <TouchableOpacity onPress={() => Actions.search()} style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'white', opacity: 0 }}></TouchableOpacity>
                                </View>
                                <Icon name="music" size={30} style={{ marginLeft: '3%', width: '8%' }} />
                            </View>
                            <View style={{ width: '90%', height: 175, marginTop: 15, borderRadius: 10, overflow: 'hidden' }}>
                                <Swiper paginationStyle={{ bottom: 5 }} autoplay={true} autoplayTimeout={3} loop={true}>
                                    {
                                        this.state.swiperImgUrl.map((item) => {
                                            return (
                                                <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.picUrl }} />
                                            )
                                        })
                                    }
                                </Swiper>
                            </View>
                            <View style={{ width: '90%', height: 70, marginTop: 20, flexDirection: 'row' }}>
                                <TouchableOpacity style={{ width: '20%', height: 70, justifyContent: 'center', alignItems: 'center' }} onPress={() => Actions.singer()}>
                                    <Icon name="user" size={30} color='green' />
                                    <Text>歌手</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '20%', height: 70, justifyContent: 'center', alignItems: 'center' }} onPress={()=>Actions.ranking()}>
                                    <Icon name="bar-chart-2" size={30} color='green' />
                                    <Text>排行</Text>
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
                                    <Image style={{ width: 60, height: 60, borderRadius: 7 }} source={{ uri: 'http://49.235.231.110:8802/musicimage/1.JPG' }} />
                                    <View style={{ width: '55%', height: 60, justifyContent: 'center', marginLeft: 10 }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>
                                            {
                                                this.state.albumname.map((item, index) => {
                                                    if (index == 0) {
                                                        return this.state.albumname[0].music_author
                                                    }
                                                })
                                            }
                                        </Text>
                                        <Text style={{ fontSize: 14, color: 'white', marginTop: 8 }}>
                                            {
                                                this.state.albumname.map((item, index) => {
                                                    if (index == 0) {
                                                        return this.state.albumname[0].music_name
                                                    }
                                                })
                                            }
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '48%', height: 90, backgroundColor: 'orange', marginLeft: '4%', borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ width: 60, height: 60, borderRadius: 7 }} source={{ uri: 'http://49.235.231.110:8802/musicimage/2.JPG' }} />
                                    <View style={{ width: '55%', height: 60, justifyContent: 'center', marginLeft: 10 }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>
                                            {
                                                this.state.albumname.map((item, index) => {
                                                    if (index == 0) {
                                                        return this.state.albumname[1].music_author
                                                    }
                                                })
                                            }
                                        </Text>
                                        <Text style={{ fontSize: 14, color: 'white', marginTop: 8 }}>
                                            {
                                                this.state.albumname.map((item, index) => {
                                                    if (index == 0) {
                                                        return this.state.albumname[1].music_name
                                                    }
                                                })
                                            }
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '90%', height: 50, marginTop: 15, alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 21, width: '20%' }}>热门歌曲</Text>
                                <TouchableOpacity style={{ width: '9%', marginLeft: '71%' }}>
                                    <Text style={{ fontSize: 15, color: 'gray' }}>更多></Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: '90%', marginLeft: '5%', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            {
                                this.state.albumname.map((item, index) => {
                                    if (index>1 && index<8) {
                                        return (
                                            <TouchableOpacity style={{ width: '32%', height: 160, overflow: 'hidden', alignItems: 'center' }} >
                                                <Image style={{ width: '100%', height: 120, borderRadius: 10 }} source={{ uri: 'http://49.235.231.110:8802/musicimage/'+(index+1)+'.JPG' }} />
                                                <Text style={{ marginTop: 5 }}>
                                                    {item.music_name}
                                                </Text>
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
