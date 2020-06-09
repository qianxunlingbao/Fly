import React, { Component } from "react";
import {
    Modal,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    Dimensions,
    Image,
    TextInput,
    FlatList
} from "react-native";

const { width, scale, height } = Dimensions.get('window');

const s = width / 640;

export default class Addpinglun1 extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    _setModalVisible(visible) {
        this.props.callback(visible)
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    alert("分享还未取消.");
                }}
            >
                <View style={
                    {
                        alignItems: 'center',
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
                        onPress={this._setModalVisible(!this.props.modalVisible)}
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

            </Modal >
        );
    }
}