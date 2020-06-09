import React, { Component } from 'react'
import {
    Animated,
    Easing,
    TextInput,
    View,
    ActivityIndicator,
    Text,
    Image,
    FlatList,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage
} from 'react-native';

import Button from 'react-native-button';

import ImagePicker from 'react-native-image-picker';

import { Actions } from 'react-native-router-flux';

const { width, scale, height } = Dimensions.get('window');

const s = width / 640;

const options = {
    title: '选择图片来源',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '从相册选择图片',
    customButtons: [{ name: 'fb', title: '从 Facebook 选择图片' }],
    cancelButtonTitle: '取消',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            value2: '精选',
            value1: '点赞 0',
            value3: '评论 0',
            value: '',
            width: new Animated.Value(20),
            imageUrl: '',
            isloading: false,
            tianjiaguanzhu: '+关注',
            isAdd: false,
            arr: [],
            key: 0,
            data: '',
            create:'',
            createdata:[]
        }
    }
    componentDidMount = () => {

    }
    takephoto = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else {

                const source = { uri: response.uri };
                this.setState({
                    imageUrl: source,
                });
            }
        });
    }
    // 获取输入框内值的方法
    getValue = (text) => {
        this.setState({
            value: text
        });
    }
    clickSetData = async () => {
        await AsyncStorage.setItem('mykey', this.state.value);
        this.setState({
            create : this.state.create - '0' + 1,
        },()=>{
            this.setState(
                {
                    createdata :[...this.state.createdata,{key:this.state.create,title:this.state.value,num : 0}]
                },
                ()=>AsyncStorage.setItem('dongtailiebiao',JSON.stringify(this.state.createdata))

            )
        })
    }
    tianjiaguanzhu() {
        this.setState({
            isAdd: !this.state.isAdd,
            tianjiaguanzhu: this.state.isAdd ? '+关注' : '已关注'
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                
                callback = {this.clickSetData}>
                    <View style={{ width: width, height: width * 0.1, backgroundColor: 'white' }}>
                        <View style={{ width: width * 0.1, height: width * 0.1 }}>
                            <TouchableOpacity onPress={() => Actions.Condition()}>
                                <Text style={{
                                    textAlign: "center",
                                    fontSize: 25, marginTop: width * 0.01
                                }}>〈</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: width * 0.4, height: width * 0.1, marginLeft: width * 0.37, marginTop: -width * 0.09 }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 30, color: '#AAAAAA' }}>发布动态 </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: width * 0.13, height: width * 0.1, marginLeft: width * 0.87, marginTop: -width * 0.09 }}>
                            <TouchableOpacity style={{ marginTop: -width * 0.02 }} onPress={() => this.clickSetData()}>
                                <Text style={{ fontSize: 30, color: '#AAAAAA' }}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: -width * 0.085, marginLeft: width * 0.05 }} onPress={() => Actions.Dongtailiebiao()}>
                                <Image
                                    style={{ marginTop: width * 0.015 }}
                                    source={require('../images/manage.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={
                        {
                            width: width * 0.9,
                            height: height * 0.25,
                            marginLeft: width * 0.05
                        }
                    }>
                        <View style={{ height: height * 0.24 }}>
                            <ScrollView
                                pagingEnabled={true}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={{
                                    width: width * 0.8,
                                    marginLeft: width * 0.05,
                                    marginRight: width * 0.1,
                                    height: height * 0.3,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Image style={{
                                        width: width * 0.8,
                                        height: height * 0.24
                                    }}
                                        source={require('../images/meitu12.png')}
                                    />
                                </View>
                                <View style={{
                                    width: width * 0.8,
                                    //marginLeft:width*0.05,
                                    marginRight: width * 0.1,
                                    height: height * 0.3,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Image style={{
                                        width: width * 0.8,
                                        height: width * 0.4
                                    }}
                                        source={require('../images/meitu12.png')}
                                    />
                                </View>
                                <View style={{
                                    width: width * 0.8,
                                    //marginLeft:width*0.1,
                                    marginRight: width * 0.1,
                                    height: height * 0.3,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Image style={{
                                        width: width * 0.8,
                                        height: width * 0.4
                                    }}
                                        source={require('../images/meitu11.png')}
                                    />
                                </View>
                            </ScrollView>
                        </View>

                    </View>
                    <TextInput
                        style={{
                            width: width * 0.8,
                            height: height * 0.1,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 3,
                            marginLeft: width * 0.1,
                            backgroundColor: '#eeeaaa'
                        }}
                        returnKeyType="next"
                        placeholder="输入您想发布的文字"
                        onChangeText={this.getValue}
                    />
                    <View style={styles.good}>
                        <View style={{
                            width: '100%',
                            height: height * 0.07
                        }}>
                            <Image
                                resizeMode="contain"
                                source={require('../images/huachenyu.png')}
                                style={styles.touxiang1}
                            />
                            <Text style={styles.mingzi}>企鹅1号</Text>
                            <TouchableOpacity style={styles.jiaguanzhu}
                                onPress={() => this.tianjiaguanzhu()
                                }>
                                <Text>{this.state.tianjiaguanzhu}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text>{this.state.value}</Text>
                        </View>
                        <View style={{
                            width: '100%',
                            height: height * 0.3
                        }}>
                            <View style={{
                                height: height * 0.25,
                                borderColor: 'black',
                                borderWidth: 1
                            }}>
                                <Button
                                    onPress={() => { this.takephoto() }}
                                >
                                    <Text style={{
                                        position: 'absolute'
                                    }}>+添加图片</Text>
                                    <Image style={{
                                        width: '100%',
                                        height: height * 0.25,
                                        position: 'relative'
                                    }}
                                        source={require('../images/meitu2.png')}
                                    />
                                </Button>
                            </View>
                        </View>
                        <View>
                            <Text>{this.state.value2}</Text>
                            <Text style={styles.dianzan}>{this.state.value1} {this.state.value3}</Text>
                        </View>
                    </View>

                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    good: {
        width: 600 * s,
        height: height * 0.42,
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
    backgroundVideo1: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    dianzan: {
        marginLeft: width * 0.7,
        marginTop: -width * 0.043
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
    slide: {
        flex: 1,
        height: '100%',
        width: width * 0.8,
        alignItems: 'center'
    },
    slide1: {
        flex: 1,
        height: '100%',
        alignItems: 'center'
    },
    slide2: {
        width: width / 6.2,
        height: height * 0.11,
        marginTop: width * 0.01,
        justifyContent: 'center',
        alignItems: 'center'
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
        marginTop: width * 0.44,
        marginLeft: width * 0.05
    },
    btn: {
        width: width * 0.25,
        height: width * 0.25,
        color: '#fff',
        marginTop: width * 0.05,
        marginLeft: width * 0.38,
        textAlignVertical: 'center',
        borderRadius: 100,
        backgroundColor: 'black'
    },
    touxiang: {
        width: width * 0.2,
        height: width * 0.2
    },
    one: {
        width: width * 0.4,
        height: width * 0.2,
        marginTop: -width * 0.2,
        marginLeft: width * 0.2
    },
    two: {
        width: width * 0.12,
        height: width * 0.2,
        marginTop: -width * 0.2,
        marginLeft: width * 0.6
    },
    three: {
        width: width * 0.12,
        height: height * 0.027,
        borderColor: '#888888',
        borderWidth: 1,
        borderRadius: 25,
        marginTop: width * 0.071
    },
    four: {
        width: width * 0.18,
        height: width * 0.2,
        marginTop: -width * 0.2,
        marginLeft: width * 0.72
    },
    author: {
        fontSize: 17,
        marginTop: width * 0.03
    },
    name: {
        fontSize: 15,
        color: '#888888',
        marginTop: width * 0.05
    },
    delete: {
        textAlign: 'center',
        marginTop: width * 0.058,
        fontSize: 24
    },
    guanzhu: {
        textAlign: 'center'
    }
})