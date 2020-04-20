import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    ScrollView,

    TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-swiper';

const {width,scale,height} = Dimensions.get('window');

const s = width / 640;


export default class FirstOne extends Component {
    constructor(){
        super()
        this.state = {
            data: [1,2,3,4,5,6],
            isLoad: false
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                isLoad: true
            })
        },1000)
    }
    render() {
        return (
            <>
            <View style={{flex: 1,backgroundColor: '#ccc'}}>
                <View style={styles.header}>
                    <View style={styles.search}>
                        <Image style={{marginLeft:20,width:20,height:20}} source={require('../assets/16.png')} />
                        <TextInput 
                            placeholder="请输入您要搜索的关键字"
                            style={{
                                width: 490*s,height: 50*s,
                                padding: 0,
                                paddingLeft: 10
                            }}
                        />
                        <Image style={{marginLeft:-10,width:30,height:30}} source={require('../assets/5.png')} />
                    </View>
                </View>
                <View style={{height:height*0.27}}>
                <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} autoplayTimeout={4}>
                        <View style={styles.slide1}>
                            <Image
                                style={styles.img}
                                source={require('../assets/10.png')}
                            />
                        </View>
                        <View style={styles.slide1}>
                            <Image
                                style={styles.img}
                                source={require('../assets/11.png')}
                            />
                        </View>
                        <View style={styles.slide1} >
                            <Image
                                style={styles.img}
                                source={require('../assets/12.png')}
                            />
                        </View>
                    </Swiper>
                </View>
                <View style={styles.first}>
                    <Image style={styles.second} source={require('../assets/13.png')} />
                    <Text style={styles.third}>居家维修保养</Text>
                    <Image style={styles.fourth} source={require('../assets/8.png')} />
                </View>
                <View style={styles.first}>
                    <Image style={styles.second} source={require('../assets/14.png')} />
                    <Text style={styles.third}>住宿优惠</Text>
                    <Image style={styles.fourth} source={require('../assets/8.png')} />
                </View>
                <View style={styles.first}>
                    <Image style={styles.second} source={require('../assets/15.png')} />
                    <Text style={styles.third}>出行接送</Text>
                    <Image style={styles.fourth} source={require('../assets/8.png')} />
                </View>
                <View style={styles.first}>
                    <Image style={styles.second} source={require('../assets/16.png')} />
                    <Text style={styles.third}>E族活动</Text>
                    <Image style={styles.fourth} source={require('../assets/8.png')} />
                </View>
                <View style={styles.fifth}>
                    <TouchableOpacity style={styles.sixth}>
                        <Text style={{fontSize:25,color:'#fff'}}>发布需求</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.seventh}>
                    <TouchableOpacity>
                        <Text style={{fontSize:15,color:'#black'}}>@E族之家 版权所有</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
    },
    slide1: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
    },
    header:{
        height: 70*s,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1/3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    search:{
        width: 500*s,
        height: 50*s,
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -30,
        borderRadius: 25
    },
    nav:{
        height: 73*s,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    slide:{
        width: width,
        height: 220,
        marginTop:10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    first:{
        marginTop: 10,
        height:height*0.1,
        backgroundColor:'#fff'
    },
    second:{
        width:width*0.15,
        height:height*0.08,
        marginTop:width*0.015
    },
    third:{
        marginTop:-width*0.1,
        marginLeft:width*0.2,
        fontSize:25
    },
    fourth:{
        marginTop:-39,
        marginLeft:width*0.9,
        height:40
    },
    fifth:{
        marginTop: 10,
        height:height*0.1,
        backgroundColor:'#ccc'
    },
    sixth:{
        width:width*0.8,
        height:height*0.08,
        backgroundColor:'red',
        marginLeft:width*0.1,
        justifyContent:'center',
        alignItems:'center',
    },
    seventh:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:-10
    }
})
