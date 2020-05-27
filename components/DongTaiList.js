import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  Animated
} from 'react-native';
import Button from 'react-native-button';

import { Actions } from 'react-native-router-flux';

const { width, scale, height } = Dimensions.get('window');

const s = width / 640;


export default class DongTaiList extends Component {
  //构造函数
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      value2: '精选',
      value1: '点赞 0',
      value3: '评论 0',
      value: '',
      tianjiaguanzhu: '+关注',
      isAdd: false
    };
  }
  tianjiaguanzhu() {
    this.setState({
      isAdd: !this.state.isAdd,
      tianjiaguanzhu: this.state.isAdd ? '+关注' : '已关注'
    })
  }
  clickGetData = async () => {
    const value = await AsyncStorage.getItem('mykey');
  }
  //页面的组件渲染完毕（render）之后执行
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
            <TouchableOpacity onPress={() => Actions.dongTaiLike()}>
              <Text style={{ fontSize: 30, color: '#AAAAAA' }}>动态 </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={this.state.createdata}
          renderItem={({ item, index }) =>
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
                <Text>{item.title}</Text>
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
                    onPress={() => { this.clickGetData() }}
                  >
                    <Text style={{
                      position: 'absolute'
                    }}>+添加图片</Text>
                    <Image style={{
                      width: '100%',
                      height: height * 0.25,
                      position: 'relative'
                    }}
                    source = {{uri:`http://49.235.231.110:8802/musicimage/${index + 1}.JPG`}}
                    />
                  </Button>
                </View>
              </View>
              <View>
                <Text>{this.state.value2}</Text>
                <Text style={styles.dianzan}>{this.state.value1} {this.state.value3}</Text>
              </View>
            </View>
          }
        />
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