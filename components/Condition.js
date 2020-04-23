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
import {Icon} from '@ant-design/react-native';
import Video from 'react-native-video';
import { Actions } from 'react-native-router-flux';

const {width,scale,height} = Dimensions.get('window');

const s = width / 640;

const number = Math.random();

const goods = [
    {
        title: '企鹅一号',
        wenzi:'凉凉夜色为你思念成河，化作春泥呵护着我，浅浅岁月拂满爱人袖，便便芳菲如水流',
        guanzhu: '+关注',
        jingxuan: '精选',
        pinglun: '评论',
        pinglunshu: 20,
        dianzan: '点赞',
        dianzanshu: 18,
        img: require('../images/punch.png'),
        url: {uri: 'https://qianxunlingbao.github.io/Movie-test/%E5%8F%B6%E7%82%AB%E6%B8%85-%E9%9D%99%E6%9C%88%E6%80%9D%20(%E3%80%8A%E6%98%8E%E6%9C%88%E7%85%A7%E6%88%91%E5%BF%83%E3%80%8B%E7%BD%91%E5%89%A7%E6%8F%92%E6%9B%B2)(%E8%B6%85%E6%B8%85).mp4'}
    },
    {
        title: '企鹅二号',
        guanzhu: '+关注',
        wenzi:'凉凉夜色为你思念成河，化作春泥呵护着我，浅浅岁月拂满爱人袖，便便芳菲如水流',
        jingxuan: '精选',
        dianzan: '点赞',
        dianzanshu: 23,
        pinglun: '评论',
        pinglunshu: 14,
        img: require('../images/punch.png'),
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
        pinglunshu: 20,
        img: require('../images/punch.png'),
        url: {uri: 'https://qianxunlingbao.github.io/Movie-test/%E8%B5%B5%E4%B8%BD%E9%A2%96-%E8%AE%B8%E5%BF%97%E5%AE%89-%E4%B9%B1%E4%B8%96%E4%BF%B1%E7%81%AD%20(%E3%80%8A%E8%9C%80%E5%B1%B1%E6%88%98%E7%BA%AA%E3%80%8B%E7%94%B5%E8%A7%86%E5%89%A7%E4%B8%BB%E9%A2%98%E6%9B%B2)(%E8%B6%85%E6%B8%85).mp4'}
    }
]

export default class FirstOne extends Component {
    constructor(props){
        super(props)
        this.state={
            rete: 1,
            paused: false,
            playIcon: 'pause',
            muted: false,
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
    play1(){
        this.setState({
            paused1:!this.state.paused1,
            playIcon1: this.state.paused1 ? 'pause' : 'play',
            muted1:!this.state.muted1
        })
    }
    play2(){
        this.setState({
            paused2:!this.state.paused2,
            playIcon2: this.state.paused2 ? 'pause' : 'play',
            muted2:!this.state.muted2
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
                            marginLeft:width*0.43,
                            borderRadius:25,
                            borderColor:'black',
                            borderWidth:1,
                            backgroundColor:'white',
                            width:width*0.16,
                            marginTop:-height*0.03
                            }} 
                            onPress={()=>Actions.dongtai()
                        }>
                            <Text style={{
                                marginLeft:width*0.02
                            }}>发布动态</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop:-height*0.04,
                            marginLeft:width*0.9
                        }}
                        onPress={()=>Actions.like()
                    }>
                        <Text style={{
                            fontSize:25
                        }}>+</Text>
                    </TouchableOpacity>
                        
                   
                </View>    
                <View style={{height:height*0.3}}>
                    <ScrollView    
                        pagingEnabled={true} 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{width:width*0.8,marginLeft:width*0.1,marginRight:width*0.1,height:height*0.3,justifyContent:'center',alignItems:'center'}}>
                            <Video source={{uri: 'https://qianxunlingbao.github.io/Movie-test/%E7%B4%AB%E9%99%8C%E5%AD%90%E5%A2%A8%E6%99%B4-%E3%80%90%E5%B0%81%E8%8C%97%E5%9B%A7%E8%8F%8C%E3%80%91%E6%89%AC%E5%B7%9E%E6%9B%B2(%E8%B6%85%E6%B8%85).mp4'}}   // Can be a URL or a local file.
                                ref={(ref) => {
                                    this.player = ref
                                }}  
                                rate={this.state.rate}   
                                muted={this.state.muted}  
                                repeat={true}    
                                paused={this.state.paused} 
                                playInBackground={false}                          
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
                        <View style={{width:width*0.8,marginLeft:width*0.1,marginRight:width*0.1,height:height*0.3,justifyContent:'center',alignItems:'center'}}>
                            <Video source={{uri: 'https://qianxunlingbao.github.io/Movie-test/%E5%8F%B6%E7%82%AB%E6%B8%85-%E9%9D%99%E6%9C%88%E6%80%9D%20(%E3%80%8A%E6%98%8E%E6%9C%88%E7%85%A7%E6%88%91%E5%BF%83%E3%80%8B%E7%BD%91%E5%89%A7%E6%8F%92%E6%9B%B2)(%E8%B6%85%E6%B8%85).mp4'}}   // Can be a URL or a local file.
                                ref={(ref) => {
                                    this.player = ref
                                }}      
                                muted={true}   
                                paused={true}                             
                                onBuffer={this.onBuffer}                
                                onError={this.videoError}               
                                style={styles.backgroundVideo} 
                            />
                            {
                                <TouchableOpacity onPress={() => this.play2()} style={styles.pause}>
                                    <Icon name={this.state.playIcon} size={18} />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={{width:width*0.8,marginLeft:width*0.1,marginRight:width*0.1,height:height*0.3,justifyContent:'center',alignItems:'center'}}>
                            <Video source={{uri: 'https://qianxunlingbao.github.io/Movie-test/%E7%B4%AB%E9%99%8C%E5%AD%90%E5%A2%A8%E6%99%B4-%E3%80%90%E5%B0%81%E8%8C%97%E5%9B%A7%E8%8F%8C%E3%80%91%E6%89%AC%E5%B7%9E%E6%9B%B2(%E8%B6%85%E6%B8%85).mp4'}}   // Can be a URL or a local file.
                                ref={(ref) => {
                                    this.player = ref
                                }}                                      
                                onBuffer={this.onBuffer}              
                                onError={this.videoError}             
                                style={styles.backgroundVideo} 
                                muted={true}   //静音 true   不静音 false
                                paused={true}  //暂停 true   不暂停 false                             
                                playInBackground={false} //后台播放 不继续 false默认  继续播放 true
                                //rate 速率 0.0暂停 1.0正产播放
                                //repeat 是否重复 false不重复 true重复
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
                            <Image style={styles.touxiang} source={require('../images/huachenyu.png')} />
                            <TouchableOpacity>
                                <Text>华晨宇</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.slide2}>
                            <Image style={styles.touxiang} source={require('../images/weixinyu.png')} />
                            <Text>魏新雨</Text>
                        </View> 
                        <View style={styles.slide2}>
                            <Image style={styles.touxiang} source={require('../images/weichen.png')} />
                            <Text>魏晨</Text>
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
                            <View style={{width:'100%',height:height*0.3}}>
                                <Video source={item.url} 
                                    ref={(ref) => {
                                        this.player = ref
                                    }}                                      
                                    onBuffer={this.onBuffer}              
                                    onError={this.videoError}              
                                    style={styles.backgroundVideo1} 
                                    muted={this.state.muted1}   //静音 true   不静音 false
                                    paused={this.state.paused1}  //暂停 true   不暂停 false                             
                                    playInBackground={false} //后台播放 不继续 false默认  继续播放 true
                                    //rate 速率 0.0暂停 1.0正产播放
                                    //repeat 是否重复 false不重复 true重复
                                />
                                {
                                    <TouchableOpacity onPress={() => this.play1()} style={styles.pause}>
                                        <Icon name={this.state.playIcon} size={18} />
                                    </TouchableOpacity>

                                }
                            </View>
                            <View>
                                <Text>
                                    {item.jingxuan}
                                </Text>
                                
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