import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Slider,
    TextInput,
    ScrollView,
    FlatList,
    ToastAndroid,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';

const { width, scale, height } = Dimensions.get('window');

const s = width / 640;

export default class FirstOne extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdd: false,
            rate: 1,
            paused: true,
            playIcon: 'play',
            muted: true,
            muted1: true,
            paused1: true,
            playIcon1: 'pause',
            muted2: true,
            paused2: true,
            playIcon2: 'pause',
            dianzanIcon: 'like2',
            tianjiaguanzhu: '+关注',
            isAdd: false,
            dianzanshu: 20,
            pinglunshu: 4,
            dianzan: '点赞',
            jingxuan: '精选',
            pinglun: '评论',
            img: require('../images/huitailang.png'),
            title: '灰太狼一号'
        }
    }
    videoError(error) {
        console.log('videoError', error)
    }
    onBuffer(data) {
        console.log('onBuffer', data)
    }

    tianjiaguanzhu() {
        this.setState({
            isAdd: !this.state.isAdd,
            tianjiaguanzhu: this.state.isAdd ? '+关注' : '已关注'
        })
    }
    componentDidMount = () => {
        fetch('http://49.235.231.110:8800/dynamic')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    tits: res.data
                });
            })
    }
    componentWillMount = () => {
        fetch('http://49.235.231.110:8800/dynamic')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    tits: res.data
                });
            })
    }
    render() {
        return (
            <>
                <View style={{ flex: 1, backgroundColor: '#ccc' }}>
                    <View style={{
                        width: width,
                        backgroundColor: '#eeeeee',
                        height: height * 0.05
                    }}>
                        <View style={{ width: width * 0.2 }}>
                            <Text style={{
                                textAlign: "center",
                                fontSize: 25
                            }}>动态</Text>
                        </View>
                        <View style={{ width: width * 0.5 }}>
                            <TouchableOpacity style={{
                                marginLeft: width * 0.36,
                                borderRadius: 25,
                                borderColor: 'black',
                                backgroundColor: '#AAAAAA',
                                width: width * 0.3,
                                marginTop: -height * 0.03
                            }}
                                onPress={() => Actions.RedAlert()
                                }>
                                <TouchableOpacity style={{
                                    position: 'relative',
                                    backgroundColor: 'white',
                                    width: width * 0.15,
                                    borderColor: 'black',
                                    borderRadius: 25,
                                    height: width * 0.05
                                }}>
                                    <Text style={{
                                        marginLeft: width * 0.044,
                                        marginTop: width * 0.004
                                    }}>精选</Text>
                                </TouchableOpacity>
                                <Text style={{
                                    marginLeft: width * 0.02,
                                    marginTop: -width * 0.045,
                                    marginLeft: width * 0.19
                                }}>关注</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={{
                                marginTop: -height * 0.04,
                                marginLeft: width * 0.9
                            }}
                            onPress={() => Actions.dongTaiLike()
                            }>
                            <Image style={{
                                width: width * 0.052,
                                height: width * 0.052,
                                marginTop: width * 0.01
                            }} source={require('../images/tianjiayonghu.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: height * 0.3 }}>
                        <Swiper style={
                            {
                                alignItems: 'center',
                            }
                        }
                            autoplay={true}
                            autoplayTimeout={3}
                            showsButtons={true}
                        >

                            <View style={
                                {
                                    width: width * 0.8,
                                    height: height * 0.3,
                                    marginLeft: width * 0.1
                                }
                            }>
                                <Video source={{ uri: 'https://1533543264.github.io/web/dang.mp4' }}   // Can be a URL or a local file.
                                    ref={(ref) => {
                                        this.player = ref
                                    }}
                                    rate={this.state.rate}
                                    muted={this.state.muted}
                                    repeat={true}
                                    resizeMode="contain"
                                    paused={this.state.paused}
                                    playInBackground={false}
                                    onError={this.videoError}
                                    onBuffer={this.onBuffer}
                                    style={styles.backgroundVideo}
                                />
                                {
                                    <TouchableOpacity onPress={() => Actions.shipin()}>
                                        <Image style={
                                            {
                                                width: width * 0.2,
                                                height: width * 0.2,
                                                marginTop: width * 0.15,
                                                marginLeft: width * 0.3
                                            }
                                        } source={require('../images/broadcast.png')} />
                                    </TouchableOpacity>
                                }

                            </View>
                            <View style={{
                                width: width * 0.8,
                                marginLeft: width * 0.1,
                                marginRight: width * 0.1,
                                height: height * 0.3,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Video source={{ uri: 'https://1533543264.github.io/web/dang.mp4' }}   // Can be a URL or a local file.
                                    ref={(ref) => {
                                        this.player = ref
                                    }}
                                    rate={this.state.rate}
                                    muted={this.state.muted}
                                    repeat={true}
                                    resizeMode="contain"
                                    paused={this.state.paused}
                                    playInBackground={false}
                                    onError={this.videoError}
                                    onBuffer={this.onBuffer}
                                    style={styles.backgroundVideo}
                                />
                                {
                                    <TouchableOpacity onPress={() => Actions.shipin()}>
                                        <Image style={
                                            {
                                                width: width * 0.2,
                                                height: width * 0.2,
                                                marginTop: -width * 0.1
                                            }
                                        } source={require('../images/broadcast.png')} />
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={{
                                width: width * 0.8,
                                marginLeft: width * 0.1,
                                marginRight: width * 0.1,
                                height: height * 0.3,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Video source={{ uri: 'https://1533543264.github.io/web/dang.mp4' }}   // Can be a URL or a local file.
                                    ref={(ref) => {
                                        this.player = ref
                                    }}
                                    rate={this.state.rate}
                                    muted={this.state.muted}
                                    repeat={true}
                                    resizeMode="contain"
                                    paused={this.state.paused}
                                    playInBackground={false}
                                    onError={this.videoError}
                                    onBuffer={this.onBuffer}
                                    style={styles.backgroundVideo}
                                />
                                {
                                    <TouchableOpacity onPress={() => Actions.shipin()}>
                                        <Image style={
                                            {
                                                width: width * 0.2,
                                                height: width * 0.2,
                                                marginTop: -width * 0.1
                                            }
                                        } source={require('../images/broadcast.png')} />
                                    </TouchableOpacity>
                                }
                            </View>
                        </Swiper>
                    </View>
                    <View style={styles.touxiangfanwei}>
                        <ScrollView
                            pagingEnabled={true}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={styles.slide2}>
                                <TouchableOpacity onPress={() => Actions.huachenyu()}>
                                    <Image style={styles.touxiang} source={require('../images/huachenyu.png')} />
                                    <Text style={{ textAlign: 'center' }}>欧阳娜娜</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.slide2}>
                                <TouchableOpacity onPress={() => Actions.weixinyu()}>
                                    <Image style={styles.touxiang} source={require('../images/weixinyu.png')} />
                                    <Text style={{ textAlign: 'center' }}>魏新雨</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.slide2}>
                                <TouchableOpacity onPress={() => Actions.weichen()}>
                                    <Image style={styles.touxiang} source={require('../images/weichen.png')} />
                                    <Text style={{ textAlign: 'center' }}>魏晨</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.slide2}>
                                <TouchableOpacity onPress={() => Actions.shipin()}>
                                    <Image style={styles.touxiang} source={require('../images/zhangliangyin.png')} />
                                    <Text style={{ textAlign: 'center' }}>张靓颖</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.slide2}>
                                <Image style={styles.touxiang} source={require('../images/punch.png')} />
                                <Text>punch</Text>
                            </View>
                            <View style={styles.slide2}>
                                <Image style={styles.touxiang} source={require('../images/pikaqiu2.png')} />
                                <Text>皮卡丘</Text>
                            </View>
                            <View style={styles.slide2}>
                                <Image style={styles.touxiang} source={require('../images/pikaqiu1.png')} />
                                <Text>皮卡丘</Text>
                            </View>
                            <View style={styles.slide2}>
                                <Image style={styles.touxiang} source={require('../images/pikaqiu3.png')} />
                                <Text>皮卡丘</Text>
                            </View>
                        </ScrollView>
                    </View>

                    <View>
                        <FlatList
                            refreshing={this.state.isAdd}
                            onRefresh={() => {
                                fetch('http://49.235.231.110:8800/dynamic')
                                    .then(res => res.json())
                                    .then(res => {
                                        this.setState({
                                            tits: res.data
                                        })
                                    })
                            }}
                            style={{ backgroundColor: '#F4F4F4' }}
                            data={this.state.tits}
                            numColumns={1}
                            //dynamic_id user_id dynamic_value dynamic_img dynamic_goodcounts
                            renderItem={({ item, index }) => (
                                <View style={styles.good}>
                                    <View style={{ width: '100%', height: height * 0.07 }}>
                                        <Image
                                            resizeMode="contain"
                                            source={this.state.img}
                                            style={styles.touxiang1}
                                        />
                                        <Text
                                            style={styles.mingzi}
                                        >{this.state.title}</Text>
                                        <TouchableOpacity style={styles.jiaguanzhu} onPress={() => this.tianjiaguanzhu()}>
                                            <Text>{this.state.tianjiaguanzhu}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text>{item.dynamic_value}</Text>
                                    </View>
                                    <View style={{
                                        width: '100%',
                                        height: height * 0.3
                                    }}>
                                        <Image style={{
                                            width: '100%',
                                            height: height * 0.3
                                        }}
                                            source={{ uri: item.dynamic_img }} />
                                    </View>
                                    <View>
                                        <Text>
                                            {this.state.jingxuan}
                                        </Text>

                                        <TouchableOpacity style={styles.dianzan}
                                            onPress={() => {
                                                console.log(index)
                                                fetch(`http://49.235.231.110:8800/goodDynamic/${this.state.tits[index].dynamic_id}/${Number(this.state.tits[index].dynamic_goodcounts) + 1}`)
                                                    .then(() => {
                                                        fetch('http://49.235.231.110:8800/dynamic')
                                                            .then(res => res.json())
                                                            .then(res => {
                                                                this.setState({
                                                                    tits: res.data//将评论数据赋值给worddata
                                                                })
                                                            })
                                                    })
                                            }}>
                                            <Text>{this.state.dianzan}{item.dynamic_goodcounts}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.dianzan1} onPress={() => Actions.pinglun()}>
                                            <Text>{this.state.pinglun}{this.state.pinglunshu} </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            )}
                        />
                        <View style={{
                            width: width * 0.2,
                            height: width * 0.2,
                            position: 'absolute',
                            marginLeft: width * 0.74,
                            marginTop: height * 0.3
                        }}>
                            <TouchableOpacity
                                onPress={() => Actions.dongTai()}
                            >
                                <Image style={
                                    {
                                        zIndex: 2,
                                        width: width * 0.2,
                                        height: width * 0.2
                                    }
                                } source={require('../images/tianjia.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    good: {
        width: 600 * s,
        height: height * 0.45,
        backgroundColor: '#fff',
        marginLeft: 20 * s,
        marginTop: 20 * s,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        //alignItems: 'center'
    },
    mingzi: {
        marginTop: -width * 0.07,
        marginLeft: width * 0.12
    },
    jiaguanzhu: {
        marginTop: -width * 0.04,
        marginLeft: width * 0.8
    },
    dianzan: {
        marginLeft: width * 0.7,
        marginTop: -width * 0.043
    },
    dianzan1: {
        marginLeft: width * 0.8,
        marginTop: -width * 0.042
    },
    img: {
        width: '100%',
        height: '100%'
    },
    touxiangfanwei: {
        height: height * 0.115
    },
    touxiang: {
        width: width * 0.15,
        height: width * 0.15
    },
    touxiang1: {
        width: width * 0.1,
        height: width * 0.1
    },
    backgroundVideo: {
        width: width * 0.8,
        height: height * 0.25,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
})