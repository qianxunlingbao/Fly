import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button,
    TouchableOpacity,
    Text,
    AsyncStorage,
    TextInput,
    FlatList,
    Image,
    Dimensions,
    Animated,
    Modal,
    ImageBackground,
    ToastAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Action1 from '../components/Action1'
const { width, scale, height } = Dimensions.get('window');

const s = width / 640;

export default class DongTaiList extends Component {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            isAdd: false,
            isloading: false,
            modalVisible:false,
            num: 0,
            wordId: '',//评论的id
            musicId: 5,//评论音乐的id
            userId: 6,//评论者id
            wordValue: ''//评论内容
        };
    }
    _openModalWin = () => {
        this.setState({modalVisible: true});
    }
    _closeModalWin = () => {
        this.setState({modalVisible: false});
    }
    componentDidMount() {
        if(!this.state.isloading){
            return ;
        }else{
        fetch('http://49.235.231.110:8800/musicword')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.data,
                    num: res.data.length
                })
            })
        }
    }
    add = () => {
        console.log('添加成功', this.state.num)
        fetch(`http://49.235.231.110:8800/addWord/${this.state.num+1}/${this.state.musicId}/${this.state.userId}/${this.state.wordValue}`)
            .then(() => {
                
            });
            this.state.num++
    }
    componentWillMount() {
        this.setState({
            isloading:true
        })
    }
    //组件渲染
    render() {
        return (
            <View style={[styles.flex, styles.topStatus]}>
                <View style={{ width: width, height: width * 0.1, backgroundColor: 'white', marginTop: -width * 0.05 }}>
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
                            <Text style={{ fontSize: 30, color: '#AAAAAA' }}>评论 </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={
                        {
                            width: width * 0.1,
                            height: width * 0.1,
                            marginTop: -width * 0.1,
                            marginLeft: width * 0.85
                        }
                    }>
                        <TouchableOpacity
                            //onPress={()=>Actions.Addpinglun()}
                            onPress={() => this._openModalWin()}
                        >
                            <Text style={
                                {
                                    fontSize: 25
                                }
                            }>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ImageBackground style={
                    {
                        flex: 1,
                        width: width
                    }
                }
                    source={require('../images/background2.png')}
                >
                    <FlatList
                        data={this.state.data}
                        refreshing={this.state.isAdd}
                        onRefresh={() => {
                            fetch('http://49.235.231.110:8800/musicword')
                                .then(res => res.json())
                                .then(res => {
                                    this.setState({
                                        data: res.data//将评论数据赋值给worddata
                                    })
                                })
                        }}
                        renderItem={({ item, index }, key = { index }) =>
                            <View
                                style={
                                    {
                                        flex: 1,
                                        flexDirection: 'row',
                                        width: width * 0.8,
                                        height: height * 0.1,
                                        alignItems: 'center',
                                        marginTop: 20,
                                        marginLeft: width * 0.1,
                                        borderBottomColor: 'green',
                                        borderBottomWidth: 2
                                    }
                                }>
                                <TouchableOpacity style={
                                    {
                                        marginTop: -width * 0.05
                                    }
                                }

                                >
                                    <Image style={
                                        {
                                            width: width * 0.1,
                                            height: width * 0.1
                                        }
                                    } source={require('../images/punch.png')} />
                                </TouchableOpacity>

                                <Text style={
                                    {
                                        marginTop: -width * 0.05,
                                        marginLeft: width * 0.03
                                    }
                                }>{item.user_id}</Text>

                                <Text style={
                                    {
                                        width: width * 0.4,
                                        marginTop: width * 0.07,
                                        marginLeft: -width * 0.02
                                    }
                                }>{item.word_value}</Text>
                                {
                                    this.state.isAdd == false ?
                                        <TouchableOpacity style={
                                            {
                                                marginLeft: width * 0.15
                                            }

                                        }
                                            onPress={() => {
                                                this.setState({
                                                    isAdd: true
                                                })
                                                item.word_goodcounts++
                                            }}      
                                        >
                                            <Text>{item.word_goodcounts}</Text>

                                        </TouchableOpacity> :
                                        <TouchableOpacity style={
                                            {
                                                marginLeft: width * 0.15
                                            }

                                        }
                                            onPress={() => {
                                                this.setState({
                                                    isAdd: false
                                                })
                                                item.word_goodcounts--
                                            }}
                                        >
                                            <Text>{item.word_goodcounts}</Text>

                                        </TouchableOpacity>
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log(index)
                                        fetch(`http://49.235.231.110:8800/deleteWord/${this.state.data[index].word_id}`)
                                            .then(() => {
                                                fetch('http://49.235.231.110:8800/musicword')
                                                    .then(res => res.json())
                                                    .then(res => {
                                                        this.setState({
                                                            data: res.data//将评论数据赋值给worddata
                                                        })
                                                    })
                                            })

                                    }}
                                >
                                    <Image style={
                                        {
                                            width: width * 0.06,
                                            height: width * 0.06
                                        }

                                    }
                                        source={require('../images/rubbish.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        }
                    />
                     <Modal
                    animationType='fade' // 指定了 modal 的动画类型。类型：slide 从底部滑入滑出|fade 淡入淡出|none 没有动画
                    transparent={true} // 背景是否透明，默认为白色，当为true时表示背景为透明。
                    visible={this.state.modalVisible} // 是否显示 modal 窗口
                    onRequestClose={() => { this._closeModalWin(); }} // 回调会在用户按下 Android 设备上的后退按键或是 Apple TV 上的菜单键时触发。请务必注意本属性在 Android 平台上为必填，且会在 modal 处于开启状态时阻止BackHandler事件
                    onShow={()=>{console.log('modal窗口显示了');}} // 回调函数会在 modal 显示时调用
                >
                    <View style={
                        {
                            width:width*0.8,
                            height:height*0.4,
                            top:'25%',
                            backgroundColor:'gray',
                            opacity:0.9,
                            marginLeft:width*0.1
                        }
                    } >
                        <ImageBackground style={
                            {
                                width:width*0.8,
                                height:height*0.4,
                                flex:1
                            }
                        } source={require('../images/background1.png')}
                        >
                        <View style={
                            {
                                justifyContent:'center',
                                alignItems:'center'
                            }
                        }>
                            <TextInput
                                style={{
                                    width: width * 0.6,
                                    height: height * 0.04,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 25,
                                    opacity: 0.8,
                                    backgroundColor: '#eeeaaa',
                                    marginTop: width*0.15
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
                                        //borderWidth: 1,
                                        backgroundColor: '#A4A4A4',
                                        borderColor: 'AAAAAA',
                                        marginLeft:-width*0.5,
                                        marginTop:width*0.1
                                    }
                                }
                            >
                                <Text style={
                                    {
                                        textAlign: 'center',
                                        fontSize: 30,
                                        color:'white',
                                        marginTop:width*0.005
                                    }
                                }>+</Text>
                            </TouchableOpacity>
                            <View style={
                                {
                                    width:width*0.1,
                                    height:width*0.1,
                                    marginLeft:width*0.4,
                                    marginTop:-width*0.08
                                }
                            } >
                                <Button
                                    title='取消' 
                                    color="#A4A4A4"
                                    onPress={this._closeModalWin}
                                ></Button>
                            </View>
                        </View>
                        </ImageBackground>
                    </View>
                </Modal>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    topStatus: {
        marginTop: 25,
    },
    row: {
        flexDirection: 'row',
        height: 45,
        marginBottom: 10
    },
    head: {
        width: 70,
        marginLeft: 5,
        backgroundColor: '#23BEFF',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    },
    input: {
        height: 45,
        borderWidth: 1,
        marginRight: 5,
        paddingLeft: 10,
        borderColor: '#ccc'
    },
    btn: {
        flex: 1,
        backgroundColor: '#FF7200',
        height: 45,
        textAlign: 'center',
        color: '#fff',
        marginLeft: 5,
        marginRight: 5,
        lineHeight: 45,
        fontSize: 15,
    },
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
});