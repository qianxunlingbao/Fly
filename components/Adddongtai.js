import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    AsyncStorage,
    Dimensions,
    ToastAndroid,
    ImageBackground,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
const { width, scale, height } = Dimensions.get('window');

const s = width / 640;

export default class Adddongtai extends Component {
    constructor() {
        super();
        this.state = {
            dynamicId:'',//动态id
            dynamicImg:'https://i02piccdn.sogoucdn.com/c1c384323d15b5ff',//动态图片
            userId: '',//动态发布者id
            dynamicValue: '',//动态内容
            userid:[],
            num: 0,
        }
    }
    componentDidMount() {
        fetch('http://49.235.231.110:8800/dynamic')
            .then(res => res.json())
            .then(res => {
                this.state.dynamicdata = res.data
                this.setState({
                    dynamicdata: res.data,//将动态数据赋值给dynamicdata
                    num:res.data.length
                })
            })
            fetch('http://49.235.231.110:8800/user')
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        userid: res.data
                    });
                })
    }
    add = () => {
        console.log(this.state.num)
        /*
        
        'https://i04piccdn.sogoucdn.com/cad378c9c8c31ad8'
        'https://i04piccdn.sogoucdn.com/832fa6b4bb48e2ac'
        'https://i02piccdn.sogoucdn.com/a68e9d7ef522ca02'
        'https://i02piccdn.sogoucdn.com/42e25ed82f6d6187'
        'https://i01piccdn.sogoucdn.com/ff8d49c7f1c33128' */    
        fetch(`http://49.235.231.110:8800/addDynamic/${this.state.num+1}/${this.state.userid[0].user_id}/${this.state.dynamicValue}/${encodeURIComponent(this.state.dynamicImg)}`)
            .then(() => {
                fetch('http://49.235.231.110:8800/dynamic')
                    .then((res) => res.json())
                    .then((res) => {
                        this.setState({
                            dynamicdata: res.data
                        })
                    })
            });
        setTimeout(
            () =>
                Actions.pop(), 1000);
    }

    render() {
        let base64Logo = require('../images/heart.png');
        return (
            <View style={
                {
                    flex: 1,
                    justifyContent: 'center'
                }
            }>
                {/*头部*/}
                <View style={{ width: width, height: width * 0.1, backgroundColor: 'white' }}>
                    <View style={{ width: width * 0.1, height: width * 0.1 }}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <Text style={{
                                textAlign: "center",
                                fontSize: 25, marginTop: width * 0.01
                            }}>〈</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: width * 0.4, height: width * 0.1, marginLeft: width * 0.45, marginTop: -width * 0.09 }}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 30, color: '#AAAAAA' }}>动态</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <ImageBackground style={
                        {
                            width: width,
                            height:height
                        }
                    }
                        source={require('../images/1.png')}
                    >
                        {/*轮播*/}
                        <View style={{ height: height * 0.3 }}>
                            <Swiper style={styles.wrapper} showsButtons={true} autoplay={true} autoplayTimeout={4}>
                                <View style={styles.slide1}>
                                    <Image
                                        style={styles.img}
                                        source={require('../images/meitu4.png')}
                                    />
                                </View>
                                <View style={styles.slide1}>
                                    <Image
                                        style={styles.img}
                                        source={require('../images/meitu2.png')}
                                    />
                                </View>
                                <View style={styles.slide1} >
                                    <Image
                                        style={styles.img}
                                        source={require('../images/meitu3.png')}
                                    />
                                </View>
                            </Swiper>
                        </View>
                        {/*添加评论 */}
                        
                        <View style={
                            {
                                alignItems: 'center'
                            }
                        }>
                            <TextInput
                                style={{
                                    width: width * 0.8,
                                    height: height * 0.1,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 3,
                                    opacity: 0.8,
                                    backgroundColor: '#eeeaaa',
                                    marginTop: 20
                                }}
                                placeholder="请输入动态内容"
                                keyboardType='default'
                                placeholderTextColor="grey"
                                onChangeText={
                                    (value) => {
                                        this.setState(
                                            { dynamicValue: value + '' }
                                        )
                                    }
                                }
                            />
                            <TouchableOpacity
                                onPress={this.add}
                                style={
                                    {
                                        width: width * 0.8,
                                        height: width * 0.1,
                                        borderRadius: 25,
                                        borderWidth: 1,
                                        backgroundColor: '#eeeaaa',
                                        borderColor: 'AAAAAA',
                                        marginTop:width*0.4,
                                        opacity:0.8
                                    }
                                }
                            >
                                <Text style={
                                    {
                                        textAlign: 'center',
                                        fontSize: 30,
                                        color: 'white'
                                    }
                                }>发布</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: height*0.28,
    },
    slide1: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
    }
})