import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const {width,scale,height} = Dimensions.get('window');

const s = width / 640;

const number = Math.random();

const goods = [
    {
        title: '喜羊羊一号',
        wenzi:'我好想你 好想你',
        guanzhu: '+关注',
        jingxuan: '精选',
        pinglun: '评论',
        pinglunshu: 20,
        dianzan: '点赞',
        dianzanshu: 18,
        images: require('../images/meitu9.png'),
        img: require('../images/xiyangyang1.png'),
        url: {uri: 'https://qianxunlingbao.github.io/Movie-test/%E5%8F%B6%E7%82%AB%E6%B8%85-%E9%9D%99%E6%9C%88%E6%80%9D%20(%E3%80%8A%E6%98%8E%E6%9C%88%E7%85%A7%E6%88%91%E5%BF%83%E3%80%8B%E7%BD%91%E5%89%A7%E6%8F%92%E6%9B%B2)(%E8%B6%85%E6%B8%85).mp4'}
    },
    {
        title: '喜羊羊二号',
        guanzhu: '+关注',
        wenzi:'没有命中注定的结局，只有不够努力的过程',
        jingxuan: '精选',
        dianzan: '点赞',
        dianzanshu: 23,
        pinglun: '评论',
        pinglunshu: 14,
        images: require('../images/meitu10.png'),
        img: require('../images/xiyangyang.png'),
        url: {uri: 'https://qianxunlingbao.github.io/Movie-test/%E7%B4%AB%E9%99%8C%E5%AD%90%E5%A2%A8%E6%99%B4-%E3%80%90%E5%B0%81%E8%8C%97%E5%9B%A7%E8%8F%8C%E3%80%91%E6%89%AC%E5%B7%9E%E6%9B%B2(%E8%B6%85%E6%B8%85).mp4'}
    
    },
    {
        title: '喜羊羊三号',
        guanzhu: '+关注',
        jingxuan: '精选',
        wenzi:'凉凉夜色为你思念成河，化作春泥呵护着我，浅浅岁月拂满爱人袖，便便芳菲如水流',
        dianzan: '点赞',
        dianzanshu: 34,
        pinglun: '评论',
        images: require('../images/meitu5.png'),
        pinglunshu: 20,
        img: require('../images/xiyangyang2.png'),
        url: {uri: 'https://qianxunlingbao.github.io/Movie-test/%E8%B5%B5%E4%B8%BD%E9%A2%96-%E8%AE%B8%E5%BF%97%E5%AE%89-%E4%B9%B1%E4%B8%96%E4%BF%B1%E7%81%AD%20(%E3%80%8A%E8%9C%80%E5%B1%B1%E6%88%98%E7%BA%AA%E3%80%8B%E7%94%B5%E8%A7%86%E5%89%A7%E4%B8%BB%E9%A2%98%E6%9B%B2)(%E8%B6%85%E6%B8%85).mp4'}
    },
    {
        title: '灰太狼一号',
        wenzi:'你要搞清你的人生剧本，不是你父母的续集，不是你孩子的前传，更不是你朋友的番外篇。',
        guanzhu: '+关注',
        jingxuan: '精选',
        pinglun: '评论',
        pinglunshu: 20,
        dianzan: '点赞',
        dianzanshu: 18,
        images: require('../images/meitu4.png'),
        img: require('../images/huitailang1.png'),
        url: {uri: 'https://qianxunlingbao.github.io/Movie-test/%E5%8F%B6%E7%82%AB%E6%B8%85-%E9%9D%99%E6%9C%88%E6%80%9D%20(%E3%80%8A%E6%98%8E%E6%9C%88%E7%85%A7%E6%88%91%E5%BF%83%E3%80%8B%E7%BD%91%E5%89%A7%E6%8F%92%E6%9B%B2)(%E8%B6%85%E6%B8%85).mp4'}
    },
    {
        title: '灰太狼二号',
        guanzhu: '+关注',
        wenzi:'向来缘浅，奈何情深',
        jingxuan: '精选',
        dianzan: '点赞',
        dianzanshu: 23,
        pinglun: '评论',
        pinglunshu: 14,
        images: require('../images/meitu2.png'),
        img: require('../images/huitailang.png'),
        url: {uri: 'https://qianxunlingbao.github.io/Movie-test/%E7%B4%AB%E9%99%8C%E5%AD%90%E5%A2%A8%E6%99%B4-%E3%80%90%E5%B0%81%E8%8C%97%E5%9B%A7%E8%8F%8C%E3%80%91%E6%89%AC%E5%B7%9E%E6%9B%B2(%E8%B6%85%E6%B8%85).mp4'}
    
    },
    {
        title: '企鹅三号',
        guanzhu: '+关注',
        jingxuan: '精选',
        wenzi:'凉凉夜色为你思念成河，化作春泥呵护着我，浅浅岁月拂满爱人袖，便便芳菲如水流',
        dianzan: '点赞',
        dianzanshu: 34,
        pinglun: '评论',
        images: require('../images/12.png'),
        pinglunshu: 20,
        img: require('../images/punch.png'),
        url: {uri: 'https://qianxunlingbao.github.io/Movie-test/%E8%B5%B5%E4%B8%BD%E9%A2%96-%E8%AE%B8%E5%BF%97%E5%AE%89-%E4%B9%B1%E4%B8%96%E4%BF%B1%E7%81%AD%20(%E3%80%8A%E8%9C%80%E5%B1%B1%E6%88%98%E7%BA%AA%E3%80%8B%E7%94%B5%E8%A7%86%E5%89%A7%E4%B8%BB%E9%A2%98%E6%9B%B2)(%E8%B6%85%E6%B8%85).mp4'}
    }
]

export default class RedAlert extends Component {
    constructor(props){
        super(props)
        this.state={
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
            dianzanshu:20,
            pinglunshu:18
        }
    }
    dianzan(){
        this.setState({    
            dianzanshu: this.state.dianzanshu+1
        })
    }
    pinglun(){
        this.setState({    
            pinglunshu: this.state.pinglunshu+1
        })
    }
    play(){
        this.setState({
            paused:!this.state.paused,
            playIcon: this.state.paused ? 'pause' : 'play',
            muted:!this.state.muted
        })
    }
    videoError(error) {
        console.log('videoError',error)   
    }
    
    onBuffer(data) {
        console.log('onBuffer', data)
    }

    tianjiaguanzhu(){
        this.setState({
            isAdd:!this.state.isAdd,
            tianjiaguanzhu: this.state.isAdd ? '+关注' : '已关注'
        })
    }
    render() {
        return (
            <>            
            <View style={{flex: 1,backgroundColor: '#ccc'}}>
                <View style={{
                    width:width,
                    backgroundColor:'#eeeeee',
                    height:height*0.05
                }}>
                    <View style={{width:width*0.2}}>
                    <Text style={{
                        textAlign:"center",
                        fontSize:25
                    }}>动态</Text>
                    </View>
                    <View style={{width:width*0.5}}>
                        <TouchableOpacity style={{
                            marginLeft:width*0.36,
                            borderRadius:25,
                            borderColor:'black',
                            backgroundColor:'#AAAAAA',
                            width:width*0.3,
                            marginTop:-height*0.03
                            }} 
                            onPress={()=>Actions.Condition()
                        }>
                            <Text style={{
                                position:'absolute',
                                marginLeft:width*0.04,
                                marginTop:width*0.004
                            }}>精选</Text>
                            <TouchableOpacity style={{
                                position:'relative',
                                width:width*0.18,
                                borderColor:'black',
                                borderRadius:25,
                                height:width*0.05,
                                marginLeft:width*0.12,
                                backgroundColor:'white'
                            }}>
                                <Text style={{
                                    textAlign:'center',
                                    marginTop:width*0.004
                                }}>关注</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop:-height*0.04,
                            marginLeft:width*0.9
                        }}
                        onPress={()=>Actions.like()
                    }>
                        <Image style={{
                            width:width*0.052,
                            height:width*0.052,
                            marginTop:width*0.01
                        }} source={require('../images/tianjiayonghu.png')} />
                    </TouchableOpacity>
                        
                   
                </View>    
                <View style={{
                        height:height*0.25
                    }}
                >
                    <View style={
                        {
                            width:width*0.8,
                            height:height*0.12,
                            marginLeft:width*0.1,
                            marginTop:width*0.05,
                            backgroundColor:'white',
                            borderRadius:15
                        }
                    }>
                        <View style={
                            {
                                width:width*0.7
                            }
                        }>
                            <Text style={
                                {
                                    fontSize:27,
                                    marginTop:width*0.03,
                                    marginLeft:width*0.03
                                }
                            }>最新音乐</Text>
                            <Text style={
                                {
                                    fontSize:15,
                                    marginTop:width*0.02,
                                    marginLeft:width*0.03
                                }
                            }>关注可能喜欢的歌手，新歌消息不再错过！</Text>
                        </View>
                        <TouchableOpacity>
                            <Image style={
                                {
                                    width:width*0.08,
                                    height:height*0.05,
                                    marginLeft:width*0.7,
                                    marginTop:-height*0.06
                                }
                            } source={require('../images/youcejiantou.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={
                        {
                            width:width*0.76,
                            marginTop:height*0.05,
                            marginLeft:width*0.12
                        }
                    }>
                        <Text style={
                            {
                                fontSize:20
                            }
                        }>暂无动态，看看为你推荐的优质账号吧！</Text>
                    </View>
                </View>
                
                <View>
                <FlatList 
                    style={{backgroundColor: '#F4F4F4'}}
                    data={goods}
                    numColumns={1}
                    renderItem={({item})=>(
                        <View style={styles.good}>
                            <View style={{width:'100%',height:height*0.07}}>
                                <Image 
                                    resizeMode="contain"
                                    source={item.img}
                                    style={styles.touxiang1}
                                />
                                <Text
                                    style={styles.mingzi}
                                >{item.title}</Text>  
                                <TouchableOpacity style={styles.jiaguanzhu} onPress={() => this.tianjiaguanzhu()}>
                                    <Text>{this.state.tianjiaguanzhu}</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text>{item.wenzi}</Text>
                            </View>
                            <View style={{
                                width:'100%',
                                height:height*0.3
                                }}>
                                    <Image style={{
                                        width:'100%',
                                        height:height*0.3
                                        }} 
                                        source={item.images} />
                            </View>
                            <View>
                                
                                
                                <TouchableOpacity style={styles.dianzan} onPress={()=>this.dianzan()}>
                                    <Text>{item.dianzan}{this.state.dianzanshu}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dianzan1} onPress={()=>Actions.CustomScrollView()}>
                                    <Text>{item.pinglun}{this.state.pinglunshu} </Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        
                    )}
                />
                </View>
            </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    good:{
        width: 600*s,
        height: height*0.45,
        backgroundColor: '#fff',
        marginLeft: 20*s,
        marginTop: 20*s,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        //alignItems: 'center'
    },
    mingzi: {
        marginTop:-width*0.07,
        marginLeft:width*0.12
    },
    jiaguanzhu: {
        marginTop:-width*0.04,
        marginLeft:width*0.8
    },
    backgroundVideo1: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    dianzan: {
        marginLeft:width*0.7,
        //marginTop:-width*0.043
    },
    dianzan1: {
        marginLeft:width*0.8,
        marginTop:-width*0.04
    },
    img: {
        width: '100%',
        height: '100%'
    },
    touxiangfanwei: {
        height:height*0.115
    },
    touxiang: {
        width:width*0.15,
        height:width*0.15
    },
    touxiang1: {
        width:width*0.1,
        height:width*0.1
    },
    slide: {
        flex: 1,
        height: '100%',
        width: width*0.8,
        alignItems: 'center'
    },
    slide1: {
        flex: 1,
        height: '100%',
        alignItems: 'center'
    },
    slide2:{
        width: width/6.2,
        height: height*0.11,
        marginTop:width*0.01,
        justifyContent:'center',
        alignItems:'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    pause: {
        position: 'absolute',
        marginTop:width*0.44,
        marginLeft:width*0.05
    }
})