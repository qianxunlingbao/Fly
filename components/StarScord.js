/**
 * Created by QQ756312633 on 2017/5/12.
 * http://blog.csdn.net/yeputi1015/article/
 */
'use strict'
import React, { Component } from 'react'
import {
    StyleSheet,
    Dimensions,
    Text,
    Image,
    View,
    TouchableOpacity,
    Modal,
    ToastAndroid,
    TextInput,

} from 'react-native';
let { width, height } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';

export default class StarScore extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            totalScore: 5, // 总分值
            currentScore: 0, // 分值
        };
    }
    pingjia(){
        ToastAndroid.show('评价成功，谢谢！！！',1500)
    }
    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={true}
            >
                <View style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: '0%',

                    backgroundColor: 'gray',
                    opacity: 1, justifyContent: 'center'

                }}>
                    <View style={{
                        width: '100%',
                        height: '5%',
                        position: 'absolute',
                        top: '0%',
                        backgroundColor: '#fff',
                        opacity: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'

                    }}>
                        <TouchableOpacity style={
                            {
                                marginLeft:-width*0.4
                            }
                        } onPress={() => Actions.pop()}>
                            <Text style={{
                                textAlign:"center",
                                fontSize:25
                            }}>〈</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 25, color: '#000', marginLeft: 0.35 * width }}>评价服务</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: width, height: 20, marginBottom: 6 }}>
                        {this._renderBody()}
                    </View>
                    <View>
                        <TextInput 
                            placeholder='请表述您评价的原因，感谢您的评价！！！' 
                            style={
                                {
                                    width:width*0.8,
                                    height:width*0.3,
                                    backgroundColor:'#fff',
                                    marginLeft:width*0.1,
                                    borderRadius:25
                                }
                            }
                            
                        />
                        <TouchableOpacity style={
                            {
                                width:width*0.8,
                                    height:width*0.1,
                                    backgroundColor:'#AAAAAA',
                                    marginLeft:width*0.1,
                                    borderRadius:25,
                                    marginTop:width*0.1
                            }
                        }
                            onPress={this.pingjia}
                        >
                            <Text style={
                                {
                                    textAlign:'center',
                                    fontSize:25
                                }
                            }>提交评价</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    _renderBody() {
        let images = [];
        for (var i = 1; i <= this.state.totalScore; i++) {
            let currentCount = i;
            images.push(
                <View key={"i" + i}>
                    <TouchableOpacity style={
                        {
                            marginLeft:width*0.08,
                            marginTop:-width*0.3
                        }
                    } onPress={(i) => { this._score(currentCount) }}>
                        <Image source={require('../images/heart.png')} style={{ width: width*0.1, height: width*0.1 }} />
                        {this._renderYellowStart(i)}
                    </TouchableOpacity>
                </View>
            );
        }
        return images;
    }

    _renderYellowStart(count) {
        if (count <= this.state.currentScore) {
            return (
                <Image source={require('../images/redheart.png')} style={{ width: width*0.1, height: width*0.1, position: 'absolute' }} />
            );
        }
    }

    _score(i) {
        this.setState({
            currentScore: i
        });
        //this.props.selectIndex(i);
    }

}