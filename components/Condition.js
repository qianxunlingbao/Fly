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
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import { Actions } from 'react-native-router-flux';

const {width,scale,height} = Dimensions.get('window');

const s = width / 640;

const number = Math.random();

const goods = [
    {
        title: '灰太狼一号',
        wenzi:'你要搞清你的人生剧本，不是你父母的续集，不是你孩子的前传，更不是你朋友的番外篇。',
        guanzhu: '+关注',
        jingxuan: '精选',
        pinglun: '评论',
        dianzan: '点赞',
        images: require('../images/meitu1.png'),
        img: require('../images/huitailang1.png'),
        url: {uri: 'https://qianxunlingbao.github.io/Movie-test/%E5%8F%B6%E7%82%AB%E6%B8%85-%E9%9D%99%E6%9C%88%E6%80%9D%20(%E3%80%8A%E6%98%8E%E6%9C%88%E7%85%A7%E6%88%91%E5%BF%83%E3%80%8B%E7%BD%91%E5%89%A7%E6%8F%92%E6%9B%B2)(%E8%B6%85%E6%B8%85).mp4'}
    },
    {
        title: '灰太狼二号',
        guanzhu: '+关注',
        wenzi:'向来缘浅，奈何情深',
        jingxuan: '精选',
        dianzan: '点赞',
        pinglun: '评论',
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
        pinglun: '评论',
        images: require('../images/meitu5.png'),
        img: require('../images/punch.png'),
        url: {uri: 'https://qianxunlingbao.github.io/Movie-test/%E8%B5%B5%E4%B8%BD%E9%A2%96-%E8%AE%B8%E5%BF%97%E5%AE%89-%E4%B9%B1%E4%B8%96%E4%BF%B1%E7%81%AD%20(%E3%80%8A%E8%9C%80%E5%B1%B1%E6%88%98%E7%BA%AA%E3%80%8B%E7%94%B5%E8%A7%86%E5%89%A7%E4%B8%BB%E9%A2%98%E6%9B%B2)(%E8%B6%85%E6%B8%85).mp4'}
    },
    {
        title: '灰太狼一号',
        wenzi:'你要搞清你的人生剧本，不是你父母的续集，不是你孩子的前传，更不是你朋友的番外篇。',
        guanzhu: '+关注',
        jingxuan: '精选',
        pinglun: '评论',
        dianzan: '点赞',
        images: require('../images/meitu6.png'),
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
        images: require('../images/meitu7.png'),
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
        images: require('../images/meitu8.png'),
        pinglunshu: 20,
        img: require('../images/punch.png'),
        url: {uri: 'https://qianxunlingbao.github.io/Movie-test/%E8%B5%B5%E4%B8%BD%E9%A2%96-%E8%AE%B8%E5%BF%97%E5%AE%89-%E4%B9%B1%E4%B8%96%E4%BF%B1%E7%81%AD%20(%E3%80%8A%E8%9C%80%E5%B1%B1%E6%88%98%E7%BA%AA%E3%80%8B%E7%94%B5%E8%A7%86%E5%89%A7%E4%B8%BB%E9%A2%98%E6%9B%B2)(%E8%B6%85%E6%B8%85).mp4'}
    }
]

export default class FirstOne extends Component {
    constructor(props){
        super(props)
        this.state={
            activePanel: 0,                   //当前active的面板
            brr: [],
            currentTime: 0.0,                 //当前播放的时间
            sliderValue: 0,                   //进度条的进度
            duration: 0.0,                    //总时长
            tits: [],
            arr: [],
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
            pinglunshu:4,
            dianzan: '点赞',
            jingxuan: '精选',
            pinglun: '评论',
            img: require('../images/huitailang.png'),
            title: '灰太狼一号',
        }
    }
    //格式化音乐播放的时间为0：00
    formatMediaTime(duration) {
        let min = Math.floor(duration / 60);
        let second = duration - min * 60;
        min = min >= 10 ? min : "0" + min;
        second = second >= 10 ? second : "0" + second;
        return min + ":" + second;
    }
    
    //设置进度条和播放时间的变化
    setTime(data) {
        let sliderValue = parseInt(this.state.currentTime);
        this.setState({
        sliderValue: sliderValue,
        currentTime: data.currentTime
        });
    }

    //设置总时长
    setDuration(duration) {
        this.setState({ duration: duration.duration });
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
    componentDidMount = ()=>{
        //this.setState.num++;
        //http://49.235.231.110:8800/musicword 评论
        //word_id music_id user_id word_value word_goodcounts
        //dynamic_id user_id dynamic_value dynamic_img dynamic_goodcounts
        //http://49.235.231.110:8800/dynamic 动态
        fetch('http://49.235.231.110:8800/dynamic')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    tits: res.data
                });
            })
    }
    componentWillUnmount(){
        this.setState({
            paused:true,
            playIcon: this.state.paused ? 'pause' : 'play',
            muted:!this.state.muted
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
                            onPress={()=>Actions.RedAlert()
                        }>
                            <TouchableOpacity style={{
                                position:'relative',
                                backgroundColor:'white',
                                width:width*0.15,
                                borderColor:'black',
                                borderRadius:25,
                                height:width*0.05
                            }}>
                                <Text style={{
                                    marginLeft:width*0.044,
                                    marginTop:width*0.004
                                }}>精选</Text>
                            </TouchableOpacity>
                            <Text style={{
                                marginLeft:width*0.02,
                                marginTop:-width*0.045,
                                marginLeft:width*0.19
                            }}>关注</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop:-height*0.04,
                            marginLeft:width*0.9
                        }}
                        onPress={()=>Actions.dongTaiLike()
                    }>
                        <Image style={{
                            width:width*0.052,
                            height:width*0.052,
                            marginTop:width*0.01
                        }} source={require('../images/tianjiayonghu.png')} />
                    </TouchableOpacity>     
                </View>          
                <View style={{height:height*0.3}}>
                    <ScrollView    
                        pagingEnabled={true} 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{width:width*0.8,marginLeft:width*0.1,marginRight:width*0.1,height:height*0.3,justifyContent:'center',alignItems:'center'}}>
                            
                            <Video source={{uri: 'https://qianxunlingbao.github.io/Movie-test/%E6%9C%80%E5%90%8E%E4%B8%80%E6%AC%A1%E7%9A%84%E5%88%86%E7%A6%BB.mp4'}}   // Can be a URL or a local file.
                                ref={(ref) => {
                                    this.player = ref
                                }}  
                                rate={this.state.rate}   
                                muted={this.state.muted}  
                                repeat={true}    
                                resizeMode="contain"
                                paused={this.state.paused} 
                                playInBackground={false}   
                                //onLoadStart={this.loadStart} 
                                onLoad={data=>this.setDuration(data)}   
                                onProgress={e=>this.setTime(e)}              
                                onError={this.videoError}
                                onBuffer={this.onBuffer}             
                                style={styles.backgroundVideo}        
                            />
                            {   
                                                       
                                <TouchableOpacity onPress={() => this.play()} style={styles.pause}>
                                    <Icon name={this.state.playIcon} size={18} />
                                </TouchableOpacity>
                            }
                            
                        </View>
                        <View style={{
                            width:width*0.8,
                            marginLeft:width*0.1,
                            marginRight:width*0.1,
                            height:height*0.3,
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                            <Image style={{
                                width:width*0.8,
                                height:width*0.4
                                }} 
                                source={require('../images/meitu3.png')} 
                            />
                        </View>
                        <View style={{
                            width:width*0.8,
                            marginLeft:width*0.1,
                            marginRight:width*0.1,
                            height:height*0.3,
                            justifyContent:'center',
                            alignItems:'center'
                            }}>
                            <Image style={{
                                width:width*0.8,
                                height:width*0.4
                                }} 
                                source={require('../images/meitu4.png')} 
                            />
                        </View>
                    </ScrollView>
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
                                <Image style={styles.touxiang} source={require('../images/zhangliangyin.png')} />
                                <Text>张靓颖</Text>
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
                    style={{backgroundColor: '#F4F4F4'}}
                    data={this.state.tits}
                    numColumns={1}
                    //dynamic_id user_id dynamic_value dynamic_img dynamic_goodcounts
                    renderItem={({item})=>(
                        <View style={styles.good}>
                            <View style={{width:'100%',height:height*0.07}}>
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
                                width:'100%',
                                height:height*0.3
                                }}>
                                    <Image style={{
                                        width:'100%',
                                        height:height*0.3
                                        }} 
                                        source={{uri:item.dynamic_img}} />
                            </View>
                            <View>
                                <Text>
                                    {this.state.jingxuan}
                                </Text>
                                
                                <TouchableOpacity style={styles.dianzan} onPress={()=>item.dynamic_goodcounts++}>
                                    <Text>{this.state.dianzan}{item.dynamic_goodcounts}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dianzan1} onPress={()=>Actions.CustomScrollView()}>
                                    <Text>{this.state.pinglun}{this.state.pinglunshu} </Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        
                    )}
                />
                <View style={{
                        width:width*0.2,
                        height:width*0.2,
                        position: 'absolute',
                        marginLeft:width*0.74,
                        marginTop:height*0.3
                    }}>
                    <TouchableOpacity
                        onPress={()=>Actions.dongTai()}
                    >
                        <Image style={
                            {
                                zIndex:2,
                                width:width*0.2,
                                height:width*0.2
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
        marginTop:-width*0.043
    },
    dianzan1: {
        marginLeft:width*0.8,
        marginTop:-width*0.042
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