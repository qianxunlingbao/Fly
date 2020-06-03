import React, { Component } from 'react'

import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
  ToastAndroid,
  StyleSheet, 
  Dimensions, 
  Toast,
  FlatList,
  ScrollView,
  ActivityIndicator, 
  Slider, 
  Image,
  ImageBackground,
  Share
} from "react-native";
import { Actions } from 'react-native-router-flux';
import MaterialsIcon from "react-native-vector-icons/MaterialIcons";
import Video from "react-native-video";
import * as _ from "lodash";
import { thisTypeAnnotation } from '@babel/types';
let { width, height } = Dimensions.get('window');

class VideoPlayer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isloading: false,
      addflex:'flex',
      menu:[1,0],
      isAdd: false,
      rate: 1,
      paused: true,
      muted: true,
      seconds: 0,
      nowMin: '00', 
      nowSec: '00',
      maximumValue: 0,
      sliderValue: 0, 
      pause: false, 
      currentTime: 0.0, 
      duration: 0.0,
      move: 0,
      index: 0,
      moveclick: false,
      modalVisible: false,
      volume: 1,
      tingliutime: 0,
      TouchableWithoutFeedback,
      opacityvideo: 1,
      iscreen: 0,
      videowidth: width,
      islike:true,
      shoucang:require('../images/redheart.png'),
      result:''
    };
  }
  //分享
  _shareMessage(){
    Share.share({
      message:'这个是百度的网址',
      url:'http://www.baidu.com',
      title:'百度'
    })
    .then(this._showResult)
    .catch((error)=>
      this.setState({
        result:'错误提示'+error.message
      })
    )
  }
  _shareText(){
    Share.share({
      message:'这个是百度的网址',
      url:'http://www.baidu.com',
      title:'百度'
    },{
      dialogTitle:'分享到百度链接'
    })
    .then(this._showResult)
    .catch((error)=>
      this.setState({
        result:'错误提示'+error.message
      })
    )
  }
  _showResult(result){
    if(result.action === Share.sharedAction){
      if(result.activityType){
        this.setState({
          result:'分享成功'
        })
      }else if(result.action === Share.dismissedAction){
        this.setState({
          result:'分享拒绝'
        })
      }
    }
  }


  //收藏
  like(){
    if(this.state.islike){
      this.setState({
        islike:false,
      })
      setTimeout(()=>
        ToastAndroid.showWithGravity('收藏成功',2000,ToastAndroid.CENTER),0
      )
    }else{
      this.setState({
        islike:true,
      })
      setTimeout(()=>
        ToastAndroid.showWithGravity('取消收藏',2000,ToastAndroid.CENTER),0
      )
    }
  }
  setDuration(duration) {
    this.setState({ duration: duration.duration });
  }

  play() {
    this.state.paused = !this.state.paused
    this.setState({
      paused: this.state.paused,
      rate: this.state.rate
    })
  }
  xianshi() {
    this.state.opacityvideo = 1
    this.state.tingliutime = 0
    this.setState({
      opacity: this.state.opacityvideo
    })
  }
  setTime(data) {
    let sliderValue = parseInt(this.state.currentTime);
    this.state.tingliutime = sliderValue
    if (this.state.tingliutime % 10 == 9) {
      this.state.opacityvideo = 0
    }
    let min = Math.floor(sliderValue / 60);
    let second = sliderValue - min * 60;
    min = min >= 10 ? min : "0" + min;
    second = second >= 10 ? second : "0" + second;
    this.state.nowMin = min
    this.state.nowSec = second
    this.setState({
      slideValue: sliderValue,
      currentTime: data.currentTime,
      nowMin: this.state.nowMin,
      nowsec: this.state.nowSec
    });
  }
  allscrren() {
    this.state.videowidth = height
    this.setState({
      opacity: this.state.opacityvideo
    })
  }
  _onLayout(event) {
    {
      //获取根View的宽高，以及左上角的坐标值
      let { x, y, width, height } = event.nativeEvent.layout;
      console.log('通过onLayout得到的宽度：' + width);
      console.log('通过onLayout得到的高度：' + height);
    }
    //通过Dimensions API获取屏幕宽高
    let { width, height } = Dimensions.get('window');
    console.log('通过Dimensions得到的宽度：' + width);
    console.log('通过Dimensions得到的高度：' + height);
    //通过Dimensions API获取屏幕宽高
    this.state.videowidth = width
    console.log(this.state.videowidth)
  }
  componentDidMount() {
    if(this.state.isloading){
      return;
    }else{
    fetch('http://49.235.231.110:8800/musicword')
        .then(res => res.json())
        .then(res => {
            this.setState({
                data: res.data//将评论数据赋值给worddata
            })
        })
      }

}
componentWillMount() {
    this.setState({
      isloading:false
    })
}
  render() {
    if(this.state.isloading){
      return;
    }else{
    return (
      <View>
        {/*<ImageBackground style={
          {
            width:width
          }
        } source={require('../images/background5.png')}>*/}
        <ScrollView>
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
                    <View style={{ width: width * 0.4, height: width * 0.1, marginLeft: width * 0.4, marginTop: -width * 0.09 }}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 30, color: '#AAAAAA' }}>当你老了</Text>
                        </TouchableOpacity>
                    </View>
                </View>
      
      
        
      <View style={{}} onLayout={(event) => { this._onLayout(event) }}>
        <TouchableWithoutFeedback onPress={() => this.xianshi()}>
          <View>
            <Video source={{ uri: 'https://1533543264.github.io/web/dang.mp4' }}   // Can be a URL or a local file.
              ref='video'
              rate={this.state.rate}
              muted={this.state.muted}
              paused={this.state.paused}
              onBuffer={this.onBuffer}
              repeat={true}
              resizeMode="contain"
              style={{
                width: this.state.videowidth,
                height: 0.56 * this.state.videowidth,
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
              }}
              onLoad={(data) => { this.setDuration(data); ToastAndroid.show('加载完成', 200); this.play() }}
              onLoadStart={() => ToastAndroid.show('加载中', 200)}
              volume={this.state.volume}
              playInBackground={true}
              playWhenInactive={true}
              onError={this.videoError}
              onBuffer={this.onBuffer}
              onProgress={e => this.setTime(e)}
            />
            {
              <View style={{ marginTop: 0.17 * height }}>
                < TouchableWithoutFeedback style={{}} onPress={() => this.play()} style={{ color: '#fff' }}>
                  <Image style={{ width: 0.15 * width, height: 0.15 * width, marginLeft: 0.4 * width, marginBottom: 0.1 * width, marginTop: -0.1 * width, opacity: this.state.opacityvideo }} source={this.state.paused ? require('../images/broadcast.png') : require('../images/suspend.png')} />
                </ TouchableWithoutFeedback>
                <Slider
                  width={'95%'}
                  ref='slider'
                  style={{ opacity: this.state.opacityvideo }}
                  thumbTintColor={'#fff'}
                  maximumTrackTintColor={'#ccc'} //右侧轨道的颜色
                  minimumTrackTintColor={'#fff'} //左侧轨道的颜色
                  value={this.state.slideValue}
                  maximumValue={this.state.duration}
                  step={1}
                  onValueChange={(value) => {
                    this.setState({
                      currentTime: value
                    })
                  }
                  }
                  onSlidingComplete={(value) => {
                    this.refs.video.seek(value)
                  }}
                />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#fff', opacity: this.state.opacityvideo }}>{this.state.nowMin}:{this.state.nowSec}</Text>

                </View>
              </View>
            }
          </View>
        </ TouchableWithoutFeedback>
        <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.setState({ menu: [1, 0], addposition: 'absolute', addflex: 'flex' })}>
            <Text style={{ fontSize: 20, textAlign: 'center', color: this.state.menu[1] ? 'black' : 'green' ,marginLeft:width*0.35,textDecorationLine:this.state.menu[0] ? 'underline' : 'none'}}>评论</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ menu: [0, 1], addposition: 'relative', addflex: 'none' })} >
            <Text style={{ fontSize: 20, textAlign: 'center', color: this.state.menu[0] ? 'black' : 'green', marginLeft: 20,textDecorationLine:this.state.menu[1] ? 'underline' : 'none'}}>视频详情</Text>
          </TouchableOpacity>
        </View>
        {
          this.state.addflex == 'flex'
            ?
            
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
                                          console.log(key)
                                          let num = key.index
                                          if (num + 1 == item.word_id) {
                                              this.setState({
                                                  isAdd: true
                                              })
                                              item.word_goodcounts++
                                          }

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
              
            :
            <View>
              <View style={{ height: height * 0.1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ textAlign: "center", fontSize:25 }}>当你老了（《嘿，老头！》）电视剧片尾</Text>
              </View>
              <View style={{ height: height * 0.02,flexDirection: 'row'}}> 
                <Image style={
                  {
                    width:width*0.05,
                    height:width*0.05,
                    marginLeft:15
                  }
                } source={require('../images/musicor.png')} />
                <Text style={
                  {
                    color:'gray'
                  }
                }>赵照</Text>
              </View>
              <View style={{ height: height * 0.02,flexDirection: 'row',marginTop:30}}> 
                <Text style={
                  {
                    color:'gray',
                    marginLeft:15
                  }
                }>1100.1万次播放    2013-10-24</Text>
              </View>
              <View style={{ height: height * 0.02,flexDirection: 'row',marginTop:10}}> 
                <Text style={
                  {
                    color:'gray',
                    marginLeft:15
                  }
                }>总得分：  630,022</Text>
              </View>
              <View style={{ height: height * 0.02,flexDirection: 'row',marginTop:10}}> 
                <Text style={
                  {
                    color:'green',
                    marginLeft:15
                  }
                }>观看MV助力等级认证</Text>
              </View>
              <View style={{ height: height * 0.02,flexDirection: 'row',marginTop:10}}> 
                <Text style={
                  {
                    color:'gray',
                    marginLeft:15
                  }
                }>赵照 - 当你老了</Text>
              </View>
              <View style={
                {
                  flexDirection:'row',
                  width:width,
                  height:height*0.15,
                  marginTop:20
                }
              }>
                <TouchableOpacity 
                  onPress={()=>
                      
                      this.like()
                    
                  }
                    >
                      <Image style={
                        {
                          width:width*0.1,
                          height:width*0.1,
                          marginTop:20,
                          marginLeft:width*0.11
                        }
                      } source={this.state.islike?require('../images/heart.png'):require('../images/redheart.png')}/>
                      <Text style={
                        {
                          marginTop:10,
                          marginLeft:width*0.125,
                          fontSize:20
                        }
                      } >收藏</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => Share.share({
                        message: this.state.result,
                        url: 'http://www.baidu.com',
                        title: '百度'
                      }, {
                        dialogTitle:'分享和发送'
                      })}
                    >
                      <Image style={
                        {
                          width:width*0.1,
                          height:width*0.1,
                          marginTop:20,
                          marginLeft:width*0.11
                        }
                      } source={require('../images/share.png')} />
                      <Text style={
                        {
                          marginTop:10,
                          marginLeft:width*0.125,
                          fontSize:20
                        }
                      } >分享</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                     
                    >
                      <Image style={
                        {
                          width:width*0.1,
                          height:width*0.1,
                          marginTop:20,
                          marginLeft:width*0.11
                        }
                      } source={require('../images/download.png')} />
                      <Text style={
                        {
                          marginTop:10,
                          marginLeft:width*0.125,
                          fontSize:20
                        }
                      } >下载</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                   
                    >
                      <Image style={
                        {
                          width:width*0.1,
                          height:width*0.1,
                          marginTop:20,
                          marginLeft:width*0.11
                        }
                      } source={require('../images/remark.png')} />
                      <Text style={
                        {
                          marginTop:10,
                          marginLeft:width*0.125,
                          fontSize:20
                        }
                      } >49</Text>
                    </TouchableOpacity>
              </View>
              <View style={
                {
                  flexDirection:'row'
                }
              }>
                <Image style={
                  {
                    width:width*0.5,
                    height:height*0.2,
                    marginTop:20,
                    marginLeft:20
                  }
                } source={require('../images/meitu6.png')} />
                <View style={
                  {
                    width:width*0.35,
                    height:0.15

                  }
                }>
                <Text style={
                  {
                    marginLeft:20,
                    fontSize:18,
                    marginTop:50

                  }
                }>当你老了(大事发声第六期▪郝云赵照专场)</Text>
                <Text style={
                  {
                    marginTop:10,
                    marginLeft:20,
                    fontSize:15
                  }
                }>MV 赵照</Text>
                </View>
              </View>
              <View style={
                {
                  flexDirection:'row'
                }
              }>
                <Image style={
                  {
                    width:width*0.5,
                    height:height*0.2,
                    marginTop:20,
                    marginLeft:20
                  }
                } source={require('../images/meitu9.png')} />
                <View style={
                  {
                    width:width*0.35,
                    height:0.15

                  }
                }>
                <Text style={
                  {
                    marginLeft:20,
                    fontSize:18,
                    marginTop:50

                  }
                }>活着(大事发声第六期▪郝云赵照专场)</Text>
                <Text style={
                  {
                    marginTop:10,
                    marginLeft:20,
                    fontSize:15
                  }
                }>MV 郝云</Text>
                </View>
              </View>
              <View style={
                {
                  flexDirection:'row'
                }
              }>
                <Image style={
                  {
                    width:width*0.5,
                    height:height*0.2,
                    marginTop:20,
                    marginLeft:20
                  }
                } source={require('../images/meitu10.png')} />
                <View style={
                  {
                    width:width*0.35,
                    height:0.15

                  }
                }>
                <Text style={
                  {
                    marginLeft:20,
                    fontSize:18,
                    marginTop:50

                  }
                }>明星多次翻唱，这首情谊满满的歌曲原唱竟然是他</Text>
                <Text style={
                  {
                    marginTop:10,
                    marginLeft:20,
                    fontSize:15
                  }
                }>来自  鹅猴综艺狸</Text>
                </View>
              </View>
            </View>
        }
        
      </View>
      </ScrollView>
      {/*</ImageBackground>*/}
      </View>
    );
      }
  }
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: '#272928',
    justifyContent: 'center', alignItems: 'center',
    borderRadius: width * 0.04,
    width: width * 0.13,
    height: width * 0.13
  },
  backgroundVideo: {

  },
  container: {
    flex: 10,
    backgroundColor: '#888',
  }

});
export default VideoPlayer