import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    Platform,
    StatusBar,
    TouchableOpacity,
    FlatList,
    TextInput,
    DeviceEventEmitter,
    ScrollView,
    AsyncStorage,
    Dimensions,
    ToastAndroid
} from 'react-native'
import { Actions } from 'react-native-router-flux';
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
const date = new Date();
class JianPan extends Component {
    constructor() {
        super()
        this.state = ({
            create: '',
            createdata: [],
            value: '',
            timehour: '',
            timeminutes: '',
            timeday: '',
            timemonth: '',
            timeyear: '',
            refreshing: false
        })
    }
    getValue = (text) => {
        this.setState({
            value: text
        });
    }
    componentDidMount() {
        AsyncStorage.getItem('mykey').then(
            (val) => {
                this.setState({
                    data: JSON.parse(val)
                })
            }
        )
        AsyncStorage.getItem('dongtailiebiao').then(
            (val) => {
                this.setState({
                    createdata: JSON.parse(val) == null ? '' : JSON.parse(val),
                    create: JSON.parse(val) == null ? '' : JSON.parse(val).length
                })
            }
        )
    }
    GetList() {
        this.setState({
            timehour: date.getHours(),
            timeminutes: date.getMinutes(),
            timeday: date.getDate(),
            timemonth: (date.getMonth() + 1),
            timeyear: date.getFullYear(),
        })
    }
    clickSetData = async () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = (date.getMonth() + 1);
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();

        await AsyncStorage.setItem('mykey', this.state.value);
        this.setState({
            create: this.state.create - '0' + 1,
        }, () => {
            this.setState(
                {
                    createdata: [...this.state.createdata, {
                        key: this.state.create,
                        title: this.state.value,
                        num: 0,
                        hour: hour,
                        minute: minute,
                        year: year,
                        month: month,
                        day: day
                    }]
                },
                () => AsyncStorage.setItem('dongtailiebiao', JSON.stringify(this.state.createdata))

            )
        })
    }
    componentWillMount() {
        AsyncStorage.removeItem('mykey', (error) => {
            if (!error) {
                ToastAndroid.show('亲，欢迎私信我哦！！！',1000)
            };
        })
        AsyncStorage.removeItem('dongtailiebiao', (error) => {
            if (!error) {
                return;
            };
        })
    }
    render() {
        return (
            <View style={styles.container}>
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
                    <View style={{ width: width * 0.4, height: width * 0.1, marginLeft: width * 0.37, marginTop: -width * 0.09 }}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 30, color: '#AAAAAA' }}>欧阳娜娜</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    callback={this.clickSetData}
                    keyboardShouldPersistTaps={true}
                >
                    <FlatList style={
                        {
                            width: width,
                            height: height * 0.8
                        }
                    }
                        data={this.state.createdata}
                        onRefresh={() => { this.GetList() }}
                        refreshing={this.state.refreshing}
                        renderItem={({ item, index }) =>

                            <View style={
                                {
                                    flexDirection: 'row',
                                    marginTop: width * 0.07
                                }
                            }>

                                <Image style={
                                    {
                                        width: width * 0.1,
                                        height: width * 0.1
                                    }
                                } source={require('../images/pikaqiu3.png')} />
                                <View style={
                                    {
                                        flexDirection: 'row',
                                        position: 'absolute',
                                        marginTop: -width * 0.03,
                                        marginLeft: width * 0.38
                                    }
                                }>
                                    <Text style={{color: '#AAAAAA' }}>{item.year}/</Text>
                                    <Text style={{color: '#AAAAAA' }}>{item.month}/</Text>
                                    <Text style={{color: '#AAAAAA' }}>{item.day} </Text>
                                    <Text style={{color: '#AAAAAA' }}>{item.hour}:</Text>
                                    <Text style={{color: '#AAAAAA' }}>{item.minute}</Text>
                                </View>
                                <View style={
                                    {
                                        width: width,
                                        height: width * 0.12
                                    }
                                }>
                                    <Text style={
                                        {
                                            fontSize: 15,
                                            marginLeft: width * 0.04
                                        }
                                    }>
                                        皮卡皮卡
                                    </Text>
                                    <Text style={
                                        {
                                            fontSize: 18,
                                            marginLeft: width * 0.04,
                                            marginTop: width * 0.02
                                        }
                                    }>{item.title}</Text>
                                </View>

                            </View>
                        }
                    />
                    <View style={
                        {
                            flexDirection: 'row'
                        }
                    }>
                        <TextInput
                            style={{
                                width: width * 0.8,
                                height: height * 0.05,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 25,
                                marginLeft: width * 0.05,
                                backgroundColor: 'white'
                            }}
                            returnKeyType="next"
                            placeholder="输入您想发布的文字"
                            onChangeText={this.getValue}
                        />
                        <TouchableOpacity style={
                            {
                                width: width * 0.1,
                                height: height * 0.04,
                                borderRadius: 5,
                                backgroundColor: '#33FF66',
                                marginLeft: width * 0.01,
                                marginTop: width * 0.01
                            }
                        } onPress={this.clickSetData}>
                            <Text style={
                                {
                                    textAlign: 'center',
                                    fontSize: 17,
                                    color: 'white'
                                }
                            }>Send</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default JianPan