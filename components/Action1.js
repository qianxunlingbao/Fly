import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
const { width } = Dimensions.get('window');

class ActionSheetComp extends Component {
    // 入参类型
    static propTypes = {
        items: PropTypes.array,
        modalTitle: PropTypes.string,
        visible: PropTypes.bool
    }

    // 默认值
    static defaultProps = {
        modalTitle: '请选择？',
        visible: true
    }

    state = {
        modalVisible: this.props.visible,
    };

    // 该钩子函数表示当父组件的props入参改变时调用，常用于父组件入参变化影响子组件渲染
    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({ modalVisible: newProps.visible });
    }

    cancelModal() {
        this.setState({ modalVisible: false });
    }
    render() {
        return (
            <Modal
                animationType="slide"
                visible={this.state.modalVisible}
                transparent={true}
                onRequestClose={() => this.setState({ modalVisible: true })
            }
            >
                <View style={styles.modalStyle}>
                    <View style={styles.subView}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.actionTitle}>
                                {this.props.modalTitle}
                            </Text>
                        </View>
                        <View style={
                            {
                                width: width,
                                backgroundColor: 'gray',
                                opacity: 0.9
                            }
                        }>
                            <TouchableOpacity style={
                                {
                                    width: width,
                                    flexDirection: 'row'
                                }

                            } onPress={() => Actions.jubao()}
                            >
                                <Image style={
                                    {
                                        width: width * 0.07,
                                        height: width * 0.07,
                                        marginLeft: width * 0.39
                                    }
                                } source={require('../images/Report.png')} />
                                <Text style={
                                    {
                                        fontSize: 25,
                                        marginLeft: width * 0.05
                                        
                                    }
                                }>举报</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={
                                {
                                    width: width,
                                    flexDirection: 'row'
                                }

                            } onPress={() => Actions.star()}
                            >
                                <Image style={
                                    {
                                        width: width * 0.08,
                                        height: width * 0.08,
                                        marginLeft: width * 0.38,
                                        marginTop:width*0.01
                                    }
                                } source={require('../images/heart.png')} />
                                <Text style={
                                    {
                                        fontSize: 25,
                                        marginLeft: width * 0.05,
                                        marginTop: width * 0.01
                                    }
                                }>评价</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.itemContainer]}>
                            <TouchableOpacity
                                style={[styles.actionItem, { borderTopWidth: 0 }]}
                                onPress={() => this.cancelModal()}>
                                <Text style={styles.actionItemTitle}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    modalStyle: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    subView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch',
        width: width,
        backgroundColor: 'gray',
    },
    itemContainer: {
        width: width,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 6,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionItem: {
        width: width - 30,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: '#cccccc',
        borderTopWidth: 0.5,
    },
    actionTitle: {
        fontSize: 13,
        color: 'white',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    actionItemTitle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});
export default ActionSheetComp;