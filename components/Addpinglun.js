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

export default class CustomScrollView extends Component {
    constructor() {
        super();
        this.state = {
            wordId: '',//评论的id
            musicId: '',//评论音乐的id
            userId: '',//评论者id
            wordValue: ''//评论内容
        }
    }
    componentDidMount() {
        fetch('http://49.235.231.110:8800/musicword')
            .then(res => res.json())
            .then(res => {
                this.state.worddata = res.data
                this.setState({
                    worddata: res.data//将评论数据赋值给worddata
                })
            })
    }
    add = () => {
        fetch(`http://49.235.231.110:8800/addWord/${this.state.wordId}/${this.state.musicId}/${this.state.userId}/${this.state.wordValue}`)
            .then(() => {
                fetch('http://49.235.231.110:8800/musicword')
                    .then((res) => res.json())
                    .then((res) => {
                        this.setState({
                            worddata: res.data
                        })
                    })
            });
        setTimeout(
            () =>
                Actions.pop(), 1000);
    }

    render() {
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
                            <Text style={{ fontSize: 30, color: '#AAAAAA' }}>评论</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <ImageBackground style={
                        {
                            width: width
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
                                placeholder="请输入评论的id"
                                keyboardType='default'
                                placeholderTextColor="grey"
                                onChangeText={
                                    (value) => {
                                        this.setState(
                                            { wordId: value + '' }
                                        )
                                    }
                                }
                            />
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
                                placeholder="请输入评论音乐的id"
                                keyboardType='default'
                                placeholderTextColor="grey"
                                onChangeText={
                                    (value) => {
                                        this.setState(
                                            { musicId: value + '' }
                                        )
                                    }
                                }
                            />
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
                                placeholder="请输入评论者id"
                                keyboardType='default'
                                placeholderTextColor="grey"
                                onChangeText={
                                    (value) => {
                                        this.setState(
                                            { userId: value + '' }
                                        )
                                    }
                                }
                            />
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
                                placeholder="请输入评论内容"
                                keyboardType='default'
                                placeholderTextColor="grey"
                                onChangeText={
                                    (value) => {
                                        this.setState(
                                            { wordValue: value + '' }
                                        )
                                    }
                                }
                            />
                            <TouchableOpacity
                                onPress={this.add}
                                style={
                                    {
                                        width: width * 0.1,
                                        height: width * 0.1,
                                        borderRadius: 100,
                                        borderWidth: 2,
                                        backgroundColor: 'gray',
                                        borderColor: 'AAAAAA'
                                    }
                                }
                            >
                                <Text style={
                                    {
                                        textAlign: 'center',
                                        fontSize: 30
                                    }
                                }>+</Text>
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