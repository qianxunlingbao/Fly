import React, { Component, useState } from 'react'
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
    Linking,
    Share
} from 'react-native';

import ConfirmModal from './ConfirmModal';

import Action1 from '../components/Action1'
import { Actions } from 'react-native-router-flux';

const { width, scale, height } = Dimensions.get('window');

export default class Huachenyu extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                { music_name: '树洞', music_value: '欧阳娜娜▪树洞▪《小欢喜》电视剧插曲' },
                { music_name: '蜕变(Live)', music_value: '欧阳娜娜/R1SE周震南/高嘉朗/张远/Rise…' },
                { music_name: '小幸运(Live)', music_value: '薛之谦/欧阳娜娜▪《我们的挑战》新春歌会…' },
                { music_name: '秘语', music_value: '欧阳娜娜/陈飞宇▪秘语▪《秘果》电影悸…' },
                { music_name: '再谈记忆(Say It Anain)(Live)', music_value: '盘尼西林乐队/欧阳娜娜▪乐队的夏天 第7期' },
                { music_name: '一心一念', music_value: '欧阳娜娜▪北灵少年志之大主宰 电视剧影视…' },
                { music_name: 'To Me', music_value: '欧阳娜娜▪To Me' },
                { music_name: '树洞', music_value: '欧阳娜娜▪树洞▪《小欢喜》电视剧插曲' },
                { music_name: '蜕变(Live)', music_value: '欧阳娜娜/R1SE周震南/高嘉朗/张远/Rise…' },
                { music_name: '小幸运(Live)', music_value: '薛之谦/欧阳娜娜▪《我们的挑战》新春歌会…' },
                { music_name: '秘语', music_value: '欧阳娜娜/陈飞宇▪秘语▪《秘果》电影悸…' },
                { music_name: '再谈记忆(Say It Anain)(Live)', music_value: '盘尼西林乐队/欧阳娜娜▪乐队的夏天 第7期' },
                { music_name: '一心一念', music_value: '欧阳娜娜▪北灵少年志之大主宰 电视剧影视…' },
                { music_name: 'To Me', music_value: '欧阳娜娜▪To Me' },
            ],
            num: 1,
            page: 0,
            isloading: false,
            guanzhu: '+关注',
            isAdd: false,
            key: 0,
            menu: [1, 0, 0, 0, 0],
            createdata: [],
            addposition: 'absolute',
            addflex: 'flex',
            modalVisible: false,
            visible: false
        }
    }
    open(){
        let url = 'https://mr.baidu.com/r/ns12jyu?f=cp&u=2d1bf10f7c052540';
        Linking.openURL(url)
    }
    _showModal() {
        this.setState({
            visible: true
        })
    }
    componentDidMount = () => {
        this.setState({
            visible: false
        })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    guanzhu() {
        this.setState({
            isAdd: !this.state.isAdd,
            guanzhu: this.state.isAdd ? '+关注' : '已关注'
        })
    }
    render() {
        return (
            <View>
                {/* 状态栏 //fetch('http://49.235.231.110:8800/music') */}
                <StatusBar backgroundColor='#AAAAAA' translucent={true} />
                <View style={{

                    width: width,
                    backgroundColor: '#AAAAAA',
                    opacity: 0.5,
                    height: height * 0.05
                }}>
                    <View style={{ width: width * 0.1 }}>
                        <TouchableOpacity
                            onPress={() => Actions.pop()}
                        >
                            <Text style={{
                                textAlign: "center",
                                fontSize: 25
                            }}>〈</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ width: width * 0.5 }}>
                        <ConfirmModal
                            modalVisible={this.state.modalVisible}
                            content={this.state.content}
                            callback={this.setModalVisible.bind(this)}
                        >
                        </ConfirmModal>
                        <TouchableOpacity style={{
                            marginLeft: width * 0.36,
                            borderRadius: 25,
                            borderColor: 'black',
                            backgroundColor: '#AAAAAA',
                            width: width * 0.3,
                            marginTop: -height * 0.03
                        }}  onPress={this.open}
                        >
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20
                            }} selectable={true}>
                                欧阳娜娜
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop: -height * 0.04,
                            marginLeft: width * 0.8
                        }}
                        onPress={() => {
                            this.setModalVisible(true)
                            this.setState({
                                visible: false
                            })
                        }}
                    >
                        <Image style={{
                            width: width * 0.052,
                            height: width * 0.052,
                            marginTop: width * 0.01
                        }} source={require('../images/share.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginTop: -height * 0.04,
                            marginLeft: width * 0.9
                        }}
                        onPress={() => this._showModal()}
                    >
                        <Image style={{
                            width: width * 0.052,
                            height: width * 0.052,
                            marginTop: width * 0.02
                        }} source={require('../images/ellipsis.png')} />
                    </TouchableOpacity>
                    <Action1 visible={this.state.visible} />
                </View>
                <ScrollView>
                    <View style=
                        {
                            {
                                width: width,
                                hieght: height * 0.25,
                            }
                        }>
                        <Image
                            style={
                                {
                                    width: width,
                                    height: height * 0.25,
                                    position: 'absolute',
                                    zIndex: -1,
                                    borderBottomRightRadius: 50,
                                    borderBottomLeftRadius: 50

                                }
                            }
                            source={require('../images/ouyangnana.png')}
                        />
                        <Text style={
                            {
                                fontSize: 22,
                                marginTop: width * 0.25,
                                marginLeft: width * 0.05
                            }
                        } selectable={true}>欧阳娜娜</Text>
                        <Text style={
                            {
                                fontSize: 18,
                                color: 'green',
                                marginLeft: width * 0.05
                            }
                        } selectable={true}>0关注   36.5万  粉丝</Text>
                        <Text style={
                            {
                                fontSize: 18,
                                color: 'red',
                                marginLeft: width * 0.05
                            }
                        } selectable={true}>入驻艺人</Text>
                        <TouchableOpacity style={
                            {
                                width: width * 0.15,
                                height: width * 0.05,
                                backgroundColor: 'white',
                                marginLeft: width * 0.6,
                                marginTop: -width * 0.05,
                                borderRadius: 50
                            }
                        }
                            onPress={() => this.guanzhu()}
                        >
                            <Text style={
                                {
                                    textAlign: 'center',
                                    fontSize: 15
                                }
                            }>{this.state.guanzhu}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={
                            {
                                width: width * 0.15,
                                height: width * 0.05,
                                backgroundColor: '#aaaaaa',
                                marginLeft: width * 0.8,
                                marginTop: -width * 0.05,
                                borderRadius: 50
                            }
                        }    onPress={() => Actions.jianpan()}
                        >
                            <Image style={
                                {
                                    width: width * 0.05,
                                    height: width * 0.05,
                                    marginLeft: width * 0.01
                                }
                            }
                                source={require('../images/remark.png')} />
                            <Text style={
                                {
                                    marginLeft: width * 0.07,
                                    fontSize: 15,
                                    color: 'white',
                                    marginTop: -width * 0.05
                                }
                            } selectable={true}>私信</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={
                            {
                                flexDirection: 'row',
                                marginTop: width * 0.05
                            }
                        }>
                            <TouchableOpacity
                                onPress={() => this.setState(
                                    {
                                        menu: [1, 0, 0, 0, 0],
                                        addposition: 'absolute',
                                        addflex: 'flex',
                                        visible: false
                                    })}
                            >
                                <Text style={
                                    {
                                        fontSize: 20,
                                        textAlign: 'center',
                                        marginLeft: width * 0.07,
                                        color: this.state.menu[0] ? 'black' : 'grey'
                                    }
                                } selectable={true}>歌曲92</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState(
                                    {
                                        menu: [0, 1, 0, 0, 0],
                                        addposition: 'relative',
                                        addflex: 'none',
                                        visible: false
                                    })}
                            >
                                <Text style={
                                    {
                                        fontSize: 20,
                                        textAlign: 'center',
                                        color: this.state.menu[1] ? 'black' : 'grey',
                                        marginLeft: width * 0.05
                                    }
                                } selectable={true}>专辑12</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState(
                                    {
                                        menu: [0, 0, 1, 0, 0],
                                        addposition: 'relative',
                                        addflex: 'none',
                                        visible: false
                                    })}
                            >
                                <Text style={
                                    {
                                        fontSize: 20,
                                        textAlign: 'center',
                                        color: this.state.menu[2] ? 'black' : 'grey',
                                        marginLeft: width * 0.05
                                    }
                                } selectable={true}>视频157</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState(
                                    {
                                        menu: [0, 0, 0, 1, 0],
                                        addposition: 'relative',
                                        addflex: 'none',
                                        visible: false
                                    })}
                            >
                                <Text style={
                                    {
                                        fontSize: 20,
                                        textAlign: 'center',
                                        color: this.state.menu[3] ? 'black' : 'grey',
                                        marginLeft: width * 0.05
                                    }
                                } selectable={true}>动态7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState(
                                    {
                                        menu: [0, 0, 0, 0, 1],
                                        addposition: 'relative',
                                        addflex: 'none',
                                        visible: false
                                    })}
                            >
                                <Text style={
                                    {
                                        fontSize: 20,
                                        textAlign: 'center',
                                        color: this.state.menu[4] ? 'black' : 'grey',
                                        marginLeft: width * 0.05
                                    }
                                } selectable={true}>关于TA</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.addflex == 'flex'
                                ?
                                <View>
                                    <FlatList
                                        data={this.state.data}
                                        renderItem={({ item }) =>

                                            <View style={
                                                {
                                                    flex: 1,
                                                    opacity: 0.8,
                                                    marginTop: width * 0.05,
                                                    backgroundColor: 'AAAAAA'
                                                }
                                            }>
                                                <View style={
                                                    {
                                                        width: width * 0.7,
                                                        height: width * 0.1
                                                    }
                                                } >
                                                    <Text style={
                                                        {
                                                            marginLeft: width * 0.05,
                                                            fontSize: 18
                                                        }
                                                    } selectable={true}>{item.music_name}</Text>
                                                    <Text style={
                                                        {
                                                            marginLeft: width * 0.05
                                                        }
                                                    } selectable={true}>{item.music_value}</Text>
                                                </View>
                                                <View style={
                                                    {
                                                        width: width * 0.15,
                                                        height: width * 0.1,
                                                        marginLeft: width * 0.7,
                                                        marginTop: -width * 0.1
                                                    }
                                                }>
                                                    <Image style={
                                                        {
                                                            width: width * 0.06,
                                                            height: width * 0.06,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            marginLeft: width * 0.045,
                                                            marginTop: width * 0.02
                                                        }
                                                    }
                                                        source={require('../images/broadcast.png')} />
                                                </View>
                                                <View style={
                                                    {
                                                        width: width * 0.15,
                                                        height: width * 0.1,
                                                        marginLeft: width * 0.8,
                                                        marginTop: -width * 0.1
                                                    }
                                                }>
                                                    <Image style={
                                                        {
                                                            width: width * 0.06,
                                                            height: width * 0.06,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            marginLeft: width * 0.045,
                                                            marginTop: width * 0.02
                                                        }
                                                    }
                                                        source={require('../images/ellipsis.png')} />
                                                </View>
                                            </View>
                                        }
                                    />
                                </View>
                                :
                                <View style={
                                    {
                                        justifyContent: "center",

                                        marginTop: 20
                                    }
                                }>
                                    <Text style={
                                        {
                                            fontSize: 25,
                                            marginLeft: width * 0.07
                                        }
                                    } selectable={true}>认证信息</Text>
                                    <View style={
                                        {
                                            flexDirection: 'row'
                                        }
                                    }>
                                        <Image style={
                                            {
                                                width: width * 0.05,
                                                height: width * 0.05,
                                                marginLeft: width * 0.07,
                                                marginTop: width * 0.05
                                            }
                                        } source={require('../images/checktrue.png')} />
                                        <Text style={
                                            {
                                                marginTop: width * 0.05,
                                                fontSize: 15,
                                                color: 'yellowgreen'
                                            }
                                        }   selectable={true}
                                        > Q音音乐人、视频达人</Text>
                                    </View>
                                    <View style={
                                        {
                                            flexDirection: 'row'
                                        }
                                    }>
                                        <Text style={
                                            {
                                                marginTop: width * 0.04,
                                                fontSize: 22,
                                                marginLeft: width * 0.07
                                            }
                                        } selectable={true}> 歌手资料 </Text>
                                        <TouchableOpacity 
                                            onPress={()=>Actions.geshou()}
                                        > 
                                            <Text style={
                                                {
                                                    marginTop: width * 0.055,
                                                    fontSize: 15,
                                                    marginLeft: width * 0.53
                                                }
                                            } selectable={true}> 更多> </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={
                                        {
                                            marginLeft: width * 0.07,
                                            height: height * 0.15,
                                            width: width * 0.8,
                                            marginTop: 20
                                        }
                                    }>
                                        <Text style={
                                            {
                                                fontSize: 18,
                                                lineHeight: 18
                                            }
                                        } selectable={true}>欧阳娜娜，2000年6月15日出生于台湾省台北市，大提琴演奏者、华语影视女演员。2011年，欧阳娜娜硬的台湾大提琴比赛冠军并以特优第一名保送台湾师大附中音乐班。2012年，她在台湾成功举办四场“Only&Nana——2012欧阳娜娜大提琴独奏会”...</Text>
                                    </View>
                                    <View style={
                                        {
                                            marginLeft: width * 0.07
                                        }
                                    }>
                                        <Text style={
                                            {
                                                marginTop: width * 0.055,
                                                fontSize: 22,
                                            }
                                        } selectable={true}>专辑</Text>
                                    </View>
                                    <View style={
                                        {
                                            flexDirection: 'row',
                                            marginLeft: width * 0.07,
                                            marginTop: 20
                                        }
                                    }>
                                        <Image style={
                                            {
                                                width: width * 0.12,
                                                height: width * 0.12,
                                                borderRadius: 20
                                            }
                                        } source={require('../images/background4.png')} />
                                        <View>
                                            <View style={
                                                {
                                                    width: width * 0.6
                                                }
                                            }>
                                                <Text style={
                                                    {
                                                        fontSize: 18,
                                                        marginTop: width * 0.01,
                                                        marginLeft: width * 0.02
                                                    }
                                                } selectable={true}>别碰我心底的小柔软 主题曲</Text>
                                                <Text style={
                                                    {
                                                        fontSize: 15,
                                                        marginTop: width * 0.01,
                                                        marginLeft: width * 0.02
                                                    }
                                                } selectable={true}>2019-10-16   3首</Text>
                                            </View>
                                            <TouchableOpacity style={
                                                {

                                                    marginLeft: width * 0.7,
                                                    marginTop: -width * 0.1
                                                }
                                            }>
                                                <Text style={
                                                    {
                                                        fontSize: 22
                                                    }
                                                }> > </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={
                                        {
                                            flexDirection: 'row',
                                            marginLeft: width * 0.07,
                                            marginTop: 20
                                        }
                                    }>
                                        <Image style={
                                            {
                                                width: width * 0.12,
                                                height: width * 0.12,
                                                borderRadius: 20
                                            }
                                        } source={require('../images/background3.png')} />
                                        <View>
                                            <View style={
                                                {
                                                    width: width * 0.6
                                                }
                                            }>
                                                <Text style={
                                                    {
                                                        fontSize: 18,
                                                        marginTop: width * 0.01,
                                                        marginLeft: width * 0.02
                                                    }
                                                } selectable={true}>聪明女人</Text>
                                                <Text style={
                                                    {
                                                        fontSize: 15,
                                                        marginTop: width * 0.01,
                                                        marginLeft: width * 0.02
                                                    }
                                                } selectable={true}>2018-10-19   1首</Text>
                                            </View>
                                            <TouchableOpacity style={
                                                {

                                                    marginLeft: width * 0.7,
                                                    marginTop: -width * 0.1
                                                }
                                            }>
                                                <Text style={
                                                    {
                                                        fontSize: 22
                                                    }
                                                }> > </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={
                                        {
                                            flexDirection: 'row',
                                            marginLeft: width * 0.07,
                                            marginTop: 20
                                        }
                                    }>
                                        <Image style={
                                            {
                                                width: width * 0.12,
                                                height: width * 0.12,
                                                borderRadius: 20
                                            }
                                        } source={require('../images/background1.png')} />
                                        <View>
                                            <View style={
                                                {
                                                    width: width * 0.6
                                                }
                                            }>
                                                <Text style={
                                                    {
                                                        fontSize: 18,
                                                        marginTop: width * 0.01,
                                                        marginLeft: width * 0.02
                                                    }
                                                } selectable={true}>伊卡洛斯的翅膀</Text>
                                                <Text style={
                                                    {
                                                        fontSize: 15,
                                                        marginTop: width * 0.01,
                                                        marginLeft: width * 0.02
                                                    }
                                                } selectable={true}>2018-04-23   1首</Text>
                                            </View>
                                            <TouchableOpacity style={
                                                {

                                                    marginLeft: width * 0.7,
                                                    marginTop: -width * 0.1
                                                }
                                            }>
                                                <Text style={
                                                    {
                                                        fontSize: 22
                                                    }
                                                }> > </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={
                                        {
                                            flexDirection: 'row',
                                            marginLeft: width * 0.07,
                                            marginTop: 20
                                        }
                                    }>
                                        <Image style={
                                            {
                                                width: width * 0.12,
                                                height: width * 0.12,
                                                borderRadius: 20
                                            }
                                        } source={require('../images/background5.png')} />
                                        <View>
                                            <View style={
                                                {
                                                    width: width * 0.6
                                                }
                                            }>
                                                <Text style={
                                                    {
                                                        fontSize: 18,
                                                        marginTop: width * 0.01,
                                                        marginLeft: width * 0.02
                                                    }
                                                } selectable={true}>暗恋</Text>
                                                <Text style={
                                                    {
                                                        fontSize: 15,
                                                        marginTop: width * 0.01,
                                                        marginLeft: width * 0.02
                                                    }
                                                } selectable={true}>2017-10-31   1首</Text>
                                            </View>
                                            <TouchableOpacity style={
                                                {

                                                    marginLeft: width * 0.7,
                                                    marginTop: -width * 0.1
                                                }
                                            }>
                                                <Text style={
                                                    {
                                                        fontSize: 22
                                                    }
                                                }> > </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={
                                        {
                                            flexDirection: 'row',
                                            marginLeft: width * 0.07,
                                            marginTop: 20
                                        }
                                    }>
                                        <Image style={
                                            {
                                                width: width * 0.12,
                                                height: width * 0.12,
                                                borderRadius: 20
                                            }
                                        } source={require('../images/1.png')} />
                                        <View>
                                            <View style={
                                                {
                                                    width: width * 0.6
                                                }
                                            }>
                                                <Text style={
                                                    {
                                                        fontSize: 18,
                                                        marginTop: width * 0.01,
                                                        marginLeft: width * 0.02
                                                    }
                                                } selectable={true}>思雨谣</Text>
                                                <Text style={
                                                    {
                                                        fontSize: 15,
                                                        marginTop: width * 0.01,
                                                        marginLeft: width * 0.02
                                                    }
                                                } selectable={true}>2020-04-22  4首</Text>
                                            </View>
                                            <TouchableOpacity style={
                                                {

                                                    marginLeft: width * 0.7,
                                                    marginTop: -width * 0.1
                                                }
                                            }>
                                                <Text style={
                                                    {
                                                        fontSize: 22
                                                    }
                                                }> > </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={
                                        {
                                            flexDirection: 'row',
                                            marginLeft: width * 0.07,
                                            marginTop: 20
                                        }
                                    }>
                                        <Image style={
                                            {
                                                width: width * 0.12,
                                                height: width * 0.12,
                                                borderRadius: 20
                                            }
                                        } source={require('../images/2.png')} />
                                        <View>
                                            <View style={
                                                {
                                                    width: width * 0.6
                                                }
                                            }>
                                                <Text style={
                                                    {
                                                        fontSize: 18,
                                                        marginTop: width * 0.01,
                                                        marginLeft: width * 0.02
                                                    }
                                                } selectable={true}>如梦你</Text>
                                                <Text style={
                                                    {
                                                        fontSize: 15,
                                                        marginTop: width * 0.01,
                                                        marginLeft: width * 0.02
                                                    }
                                                } selectable={true}>2020-01-23   2首</Text>
                                            </View>
                                            <TouchableOpacity style={
                                                {

                                                    marginLeft: width * 0.7,
                                                    marginTop: -width * 0.1
                                                }
                                            }>
                                                <Text style={
                                                    {
                                                        fontSize: 22
                                                    }
                                                }> > </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={
                                            {
                                                height:width*0.3
                                            }
                                        }>
                                        </View>
                                    </View>
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
