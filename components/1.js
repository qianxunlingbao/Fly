import React, { Component } from 'react'

import {
  View,
  Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
    ToastAndroid,
    StyleSheet, Dimensions, Toast, ActivityIndicator, Slider,Image
} from "react-native";
import Video from "react-native-video";
let {width, height} = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';

class reportss extends Component {

    constructor(props) {
        super(props);
          
        this.state = {
          rate: 1,
          paused: true,
          muted: true,
          seconds: 0, //秒数
          totalMin: '00', //总分钟
          totalSec: '00', //总分钟秒数
          nowMin: '00', //当前分钟
          nowSec: '00', //当前秒钟
          maximumValue: 0, //滑块最大值,
          songs: [],   //歌曲id数据源
          playModel: 1,  // 播放模式  1:列表循环    2:随机    4:单曲循环
          btnModel: "", //播放模式按钮背景图
          song_id: '',     //歌曲id
          title: '',       //歌曲名字
          author: '',      //歌曲作者
          file_link: '',   //歌曲播放链接
          songLyr: [],     //当前歌词
          sliderValue: 0,    //Slide的value
          pause: false,       //歌曲播放/暂停
          currentTime: 0.0,   //当前时间
          duration: 0.0,     //歌曲时间
    currentIndex: 0,    //当前第几首
    music_name:'',
          music_author:'',
          playlistvisible:false,
          move:0,
          index:0,
          moveclick:false,
          nowsong:0,
          modalVisible:false,
          songword:[],
          volume:1,
          sliderValuevolume: 0,    //Slide的value
          tingliutime:0,
          TouchableWithoutFeedback,
          opacityvideo:1,
          iscreen:0,
          videowidth:width,
         yangshi:[0.05,0.07],
        };
      }
      setDuration(duration) {
        this.setState({ duration: duration.duration });
    }
    moveclick(){
      this.state.moveclick=true;

      for(var i =0;i<3;i++){
      }
      if(this.state.index==0){
          this.refs.swiper_ScrollVie.scrollTo({ x: 0, y:0 , animated: true })
      }
      if(this.state.index==1){
          this.refs.swiper_ScrollVie.scrollTo({ x:  width, y:0 , animated: true })
      }
      if(this.state.index==2){
          this.refs.swiper_ScrollVie.scrollTo({ x:  width*2, y:0 , animated: true })
      }
      this.time2 = setTimeout(() => {
          this.state.moveclick=false;
          this.time2 && clearTimeout(this.time2);
      }, 700)
      this.setState({
        moveclick:this.state.moveclick
      })
  }
      play(){
        this.state.paused=!this.state.paused
    
        this.setState({
            paused:this.state.paused,
            rate:this.state.rate
        })
    
    }
    xianshi(){
      if(this.state.opacityvideo==1)
      {
        this.state.opacityvideo=0
      }
      else{
        this.state.opacityvideo=1
      }
      this.state.tingliutime=0
    
      this.setState({
          opacity:this.state.opacityvideo
      })
    
    }
      setTime(data) {
        let duration=parseInt(this.state.duration)
        let sliderValue = parseInt(this.state.currentTime);
        
            
               this.state.tingliutime=sliderValue
                 if(this.state.tingliutime%10==9)
                 {
             
                this.state.opacityvideo=0
    
                 }
                 let min1 = Math.floor(duration / 60);
                 let second1 = duration - min1 * 60;
                 min1 = min1 >= 10 ? min1 : "0" + min1;
                 second1 = second1 >= 10 ? second1 : "0" + second1;  
                 this.state.totalMin=min1;
                 this.state.totalSec=second1;  
          
          
        
        let min = Math.floor(sliderValue / 60);
        let second = sliderValue - min * 60;
        min = min >= 10 ? min : "0" + min;
        second = second >= 10 ? second : "0" + second;
            this.state.nowMin=min
            this.state.nowSec=second
           
           
        this.setState({
        slideValue: sliderValue,
        currentTime: data.currentTime,
        nowMin:this.state.nowMin,
        nowsec:this.state.nowSec
        });
    }
    allscrren(){
      this.state.videowidth=height
      this.setState({
        opacity:this.state.opacityvideo
      })
      
    }
    _onLayout(event) {
      {
        //获取根View的宽高，以及左上角的坐标值
        let {x, y, width, height} = event.nativeEvent.layout;

      }
    
      //通过Dimensions API获取屏幕宽高
      let {width, height} = Dimensions.get('window');

    
      //通过Dimensions API获取屏幕宽高
      this.state.videowidth=width
    
     
    }
      render() {


        return (
         <View style={{}}  onLayout={(event)=>{this._onLayout(event)}}>
           <TouchableWithoutFeedback  onPress={() => this.xianshi()}>
             <View>
             <Video source={{uri:'https://1533543264.github.io/web/dang.mp4'}}   // Can be a URL or a local file.
                                    ref='video'
                                    rate={this.state.rate}   
                                    muted={this.state.muted}  
                                    paused={this.state.paused}
                                    onBuffer={this.onBuffer}
                                    repeat={true}
                                    resizeMode="contain"
                                    style={{  width:this.state.videowidth,
                                      height:0.56*this.state.videowidth,
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      bottom: 0,
                                      right: 0}}
                                    onLoad={(data) => {this.setDuration(data);ToastAndroid.show('加载完成',200);this.play()}}
                                    onLoadStart = {()=>ToastAndroid.show('加载中',200)}
                                    volume={this.state.volume}
                                    playInBackground={true}
                                    playWhenInactive ={true}
                                    onError={this.videoError}
                                    onBuffer={this.onBuffer}       
                                    onProgress={e => this.setTime(e)}
                                    />
                                    {
                                        <View style={{width:this.state.videowidth,height:0.56*this.state.videowidth,justifyContent:'center',alignItems:'center',}}>
                                          <View style={{width:this.state.videowidth,justifyContent:'center',alignItems:'center',height:this.state.videowidth*0.2,marginBottom:this.state.videowidth*0.1}}>
                                            
                                          < TouchableWithoutFeedback style={{}} onPress={() => this.play()} style={{color:'#fff'}}>
                                                                          <Image style={{width:0.15*this.state.videowidth,height:0.15*this.state.videowidth,opacity:this.state.opacityvideo}} source={this.state.paused?require('../images/broadcast.png' ):require('../images/suspend.png')} />
                                                                          </ TouchableWithoutFeedback>
                                        
                                            </View>
                                              <View style={{flexDirection:'row',width:this.state.videowidth,marginLeft:0.05*this.state.videowidth}}>
                                              <Text style={{color:'#fff',opacity:this.state.opacityvideo}}>{this.state.nowMin}:{this.state.nowSec}/{this.state.totalMin}:{this.state.totalSec}</Text>
    
                                                </View>
                                                <Slider
                                              width={'95%'}
                                                  ref='slider'
                                                  // disabled //禁止滑动
                                                  style={{opacity:this.state.opacityvideo}}
                                                  thumbTintColor={'#fff'}
                                                  maximumTrackTintColor={'#ccc'} //右侧轨道的颜色
                                                  minimumTrackTintColor={'#fff'} //左侧轨道的颜色
                                                  value={this.state.slideValue}
                                                  maximumValue={this.state.duration}
                                                  step={1}
                                                  onValueChange={(value) => {
                                                      this.setState({
                                                          currentTime:value
                                                      })
                                                              }
                                                          }
                                                  onSlidingComplete={(value) => {
                                                                  this.refs.video.seek(value)
                                                          }}
                                              />
                                        </View>
                                     
                                    }
                                    
                                              
           
             </View>
             </ TouchableWithoutFeedback>
             <View style={{width:width,height:0.05*height,flexDirection:'row'}}>
             
                                <View style={{justifyContent:'center',width:0.5*width,alignItems:'center',height:0.05*height}}>
                                <TouchableOpacity onPress={(event)=>{{
                        this.state.index=0;
                        this.moveclick();
                    }}}>
                                <Text>详情</Text>

                    </TouchableOpacity>
                              
                                
                              </View>
                              
                                <View style={{justifyContent:'center',width:0.5*width,alignItems:'center',height:0.05*height}}>
                                <TouchableOpacity onPress={(event)=>{{
                        this.state.index=1;
                        this.moveclick();
                    }}}>
                                <Text>评论</Text>

                    </TouchableOpacity>

                                </View>
                              
             </View>
           
<View>
<ScrollView
                        ref='swiper_ScrollVie'
                        //  默认为垂直排列 此属性为true改为水平排列
                        horizontal={true}

                        showsHorizontalScrollIndicator={false}
                        //  自动分页限ios
                        pagingEnabled={false}
                        //  禁用滚动限ios
                        // scrollEnabled={false}
                    onScroll = {(event)=>{{
                        this.state.move=event.nativeEvent.contentOffset.x
                    }}}
                
                >
                            <View style={{width:width}}>
                              <Text>1111</Text>
                            </View>
                            <View style={{width:width}}>
                            <Text>11112222</Text>
                              
                              </View>
               </ScrollView>            
</View>
            
           
         </View>
        );
      }
    }
export default reportss