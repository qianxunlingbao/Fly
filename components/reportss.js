import React, { Component } from 'react'

import {
  View,
  Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  FlatList,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
    ToastAndroid,
    StyleSheet, Dimensions, Toast, ActivityIndicator, Slider,
    TextInput,
    Image,
    Button

} from "react-native";
import Video from "react-native-video";
let {width, height} = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
let data = require('./data');

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
          color:['green','#000'],
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
			collect:false,
      intnetphoto:['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1963985074,3493528764&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3427169086,3097665420&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3793406337,1193064806&fm=26&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1436323633,2102011592&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2927530700,1933714491&fm=26&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1960823218,2620208391&fm=15&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3587615503,3856830858&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=318153788,647856491&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2363665936,3469093747&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3466220452,2116854941&fm=26&gp=0.jpg'],
          video:'https://1533543264.github.io/web/dang.mp4',
          videoname:[['当你老了',"许嵩"],['风雨彩虹铿锵玫瑰',"田震"],['如约而至',"许嵩"],
          ['像风一样',"薛之谦"],['好几年',"刘心"],['全世界你最好',"许嵩"],['老街','李荣浩'],['你若成风',"许嵩"]],
          videodizhi:['https://1533543264.github.io/web/dang.mp4','https://levi9420.github.io/Web2-javaScript-/myVideo/fengyucaihong.mp4',
          'https://levi9420.github.io/Web2-javaScript-/myVideo/ruyueerzhi.mp4',
          'https://levi9420.github.io/Web2-javaScript-/myVideo/xiangfengyiyang.mp4',
          'https://levi9420.github.io/Web2-javaScript-/myVideo/haojinian.mp4',
          'https://1533543264.github.io/web/quan.mp4',
          'https://levi9420.github.io/Web2-javaScript-/myVideo/laojie.mp4',
          'https://levi9420.github.io/Web2-javaScript-/myVideo/niruochengfeng.mp4',],
          isAdd: false,
          isloading: false,
          num: 0,
          wordId: '',//评论的id
          musicId: 5,//评论音乐的id
          userId: 6,//评论者id
          wordValue: '',//评论内容
            num1:0,
            indexdata:0,
        };
      }
      
    componentDidMount() {
    this.state.indexdata=data.musictimes[this.props.id[2]]

        if(!this.state.isloading){
            return ;
        }else{
        fetch('http://49.235.231.110:8800/musicword')
            .then(res => res.json())
            .then(res => {
                this.state.num=res.data.length
                this.setState({
                    data: res.data,
                    num: res.data.length
                })
            })
        }

  }
  add = () => {
     
    console.log('添加成功', this.state.num)
    fetch(`http://49.235.231.110:8800/addWord/${this.state.num+1}/${this.props.id[2]}/${this.state.userId}/${this.state.wordValue}`)
        .then(() => {
            
        });
        this.state.num++
       
}
  componentWillMount() {
    this.setState({
        isloading:true
    })
    this.state.music_name=this.props.id[0]
    this.state.music_author=this.props.id[1]
    this.setState({
      music_author:this.state.music_author
    })
    if(this.props.id[0]=='当你老了'){
    this.state.video=this.state.videodizhi[0]
    this.state.indexdata=data.musictimes[0]
    }
    if(this.props.id[0]=='风雨彩虹铿锵玫瑰'){
      this.state.video=this.state.videodizhi[1]
      this.state.indexdata=data.musictimes[1]

    }
    if(this.props.id[0]=='如约而至'){
      this.state.video=this.state.videodizhi[2]
    this.state.indexdata=data.musictimes[2]

  }
    if(this.props.id[0]=='像风一样'){
      this.state.video=this.state.videodizhi[3]
    this.state.indexdata=data.musictimes[3]

    }
    if(this.props.id[0]=='好几年'){
      this.state.video=this.state.videodizhi[4]
    this.state.indexdata=data.musictimes[4]

    }
    if(this.props.id[0]=='全世界你最好'){
      this.state.video=this.state.videodizhi[5]
    this.state.indexdata=data.musictimes[5]

    }
    
    if(this.props.id[0]=='老街'){
      this.state.video=this.state.videodizhi[6]
    this.state.indexdata=data.musictimes[6]


    }
    if(this.props.id[0]=='你若成风'){
      this.state.video=this.state.videodizhi[7]
    this.state.indexdata=data.musictimes[7]

    }
    fetch('http://49.235.231.110:8800/musicword')
        .then(res => res.json())
        .then(res => {
            this.setState({
                data: res.data//将评论数据赋值给worddata
            })
        })
}
checkvideo(a){
this.state.music_name=this.state.videoname[a][0]
this.state.music_author=this.state.videoname[a][1]
this.state.video=this.state.videodizhi[a]
this.state.indexdata=data.musictimes[a]
this.setState({
  video:this.state.video
})
}
changeSelected() {
  this.setState(previousState => ({
      isAdd: !previousState.isAdd
  }))
}
      setDuration(duration) {
        this.setState({ duration: duration.duration });
    }
    moveclick(){
      this.state.moveclick=true;

      for(var i =0;i<3;i++){
          this.state.color[i]='#000'
      }
      this.state.color[this.state.index]='green'
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
          color:this.state.color
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
    clickred(){
      this.state.collect=!this.state.collect
      this.setState({
          collect:this.state.collect
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
             <Video source={{uri:this.state.video}}   // Can be a URL or a local file.
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
                                        <View style={{width:this.state.videowidth,height:0.7*this.state.videowidth,justifyContent:'center',alignItems:'center',}}>
                                          <View style={{width:this.state.videowidth,
                                            justifyContent:'center',alignItems:'center',
                                            height:this.state.videowidth*0.2,
                                            marginBottom:this.state.videowidth*0.1,
                                            opacity:this.state.opacityvideo
                                            }}>
                                              <View  style={{marginLeft:0.8*this.state.videowidth,marginTop:-0.2*this.state.videowidth,height:0.15*this.state.videowidth}}>
                                              <TouchableOpacity onPress={()=>Actions.pop()}>
                                                <Image style={{width:0.05*this.state.videowidth,height:0.05*this.state.videowidth}} source={require('../images/x.png')} />
                                            </TouchableOpacity>
                                                </View>

                                          
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
             <View style={{width:width,height:0.05*height,flexDirection:'row',marginTop:-0.08*height}}>
             
                                <View style={{justifyContent:'center',width:0.5*width,alignItems:'center',height:0.05*height}}>
                                <TouchableOpacity onPress={(event)=>{{
                        this.state.index=0;
                        this.moveclick();
                    }}}>
                                <Text style={{color:this.state.color[0]}}>详情</Text>

                    </TouchableOpacity>
                              
                                
                              </View>
                              
                                <View style={{justifyContent:'center',width:0.5*width,alignItems:'center',height:0.05*height}}>
                                <TouchableOpacity onPress={(event)=>{{
                        this.state.index=1;
                        this.moveclick();
                    }}}>
                                <Text style={{color:this.state.color[1]}}>评论</Text>

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
                         scrollEnabled={false}
                    onScroll = {(event)=>{{
                        this.state.move=event.nativeEvent.contentOffset.x
                    }}}
                
                >
                            <View style={{width:this.state.videowidth,height:this.state.videowidth,paddingLeft:0.05*this.state.videowidth}}>
                              <View style={{flexDirection:'row'}}>
                                <Text style={{color:'green',fontSize:20}}>MV</Text>
                              <Text style={{fontSize:20}}>{this.state.music_name}</Text>
                              </View>
                              <Text style={{color:'#888'}}>{this.state.music_author}</Text>
                              <Text style={{color:'#888'}}>56.8万次播放    {this.state.indexdata}</Text>
                              <Text style={{color:'#888'}}>总得分：214.697</Text>
                              <View style={{flexDirection:'row',width:this.state.videowidth}}>
                              <TouchableOpacity style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}} onPress={()=>Actions.report({music_name:this.props.id[2]})}>
                              <Image style={{width:0.03*this.state.videowidth,height:0.03*this.state.videowidth}} source={require('../images/Report.png')} />
                              <Text style={{color:'#888'}}>举报该视频</Text>
                              </TouchableOpacity>
                              <TouchableOpacity   style={{width:0.05*this.state.videowidth,height:0.05*this.state.videowidth,marginLeft:0.5*this.state.videowidth}} onPress={()=>{this.clickred()}}>
                            <Image style={{width:0.05*this.state.videowidth,height:0.05*this.state.videowidth}} source={this.state.collect?require('../images/redheart.png'):require('../images/heart.png' )} />
                            </TouchableOpacity>

                              </View>
                              <ScrollView>
                              <TouchableOpacity   style={{width:width*0.8,flexDirection:'row',height:0.15*width,alignItems: 'center',marginBottom:0.03*width}}  onPress={()=>{this.checkvideo(0)}}>
                                <Image  style={{width:0.3*width,height:0.15*width,borderRadius:0.01*width}}  source={{uri:this.state.intnetphoto[0]}} />
                                <View>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[0][0]}</Text>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[0][1]}</Text>
                                </View>
                                
                            </TouchableOpacity>
                            <TouchableOpacity   style={{width:width*0.8,flexDirection:'row',height:0.15*width,alignItems: 'center',marginBottom:0.03*width}}   onPress={()=>{this.checkvideo(1)}}>
                                <Image  style={{width:0.3*width,height:0.15*width,borderRadius:0.01*width}}  source={{uri:this.state.intnetphoto[1]}} />
                                <View>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[1][0]}（KTV版）</Text>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[1][1]}</Text>
                                </View>
                               
                            </TouchableOpacity>
                            <TouchableOpacity   style={{width:width*0.8,flexDirection:'row',height:0.15*width,alignItems: 'center',marginBottom:0.03*width}}   onPress={()=>{this.checkvideo(2)}}>
                                <Image  style={{width:0.3*width,height:0.15*width,borderRadius:0.01*width}}  source={{uri:this.state.intnetphoto[2]}} />
                                <View>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[2][0]}</Text>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[2][1]}</Text>
                                </View>
                                
                            </TouchableOpacity>
                            <TouchableOpacity   style={{width:width*0.8,flexDirection:'row',height:0.15*width,alignItems: 'center',marginBottom:0.03*width}}   onPress={()=>{this.checkvideo(3)}}>
                                <Image  style={{width:0.3*width,height:0.15*width,borderRadius:0.01*width}}  source={{uri:this.state.intnetphoto[3]}} />
                                <View>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[3][0]}（KTV版）</Text>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[3][1]}</Text>
                                </View>
                               
                            </TouchableOpacity>
                            <TouchableOpacity   style={{width:width*0.8,flexDirection:'row',height:0.15*width,alignItems: 'center',marginBottom:0.03*width}}   onPress={()=>{this.checkvideo(4)}}>
                                <Image  style={{width:0.3*width,height:0.15*width,borderRadius:0.01*width}}  source={{uri:this.state.intnetphoto[4]}} />
                                <View>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[4][0]}</Text>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[4][1]}</Text>
                                </View>
                                
                            </TouchableOpacity>
                            <TouchableOpacity   style={{width:width*0.8,flexDirection:'row',height:0.15*width,alignItems: 'center',marginBottom:0.03*width}}   onPress={()=>{this.checkvideo(5)}}>
                                <Image  style={{width:0.3*width,height:0.15*width,borderRadius:0.01*width}}  source={{uri:this.state.intnetphoto[5]}} />
                                <View>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[5][0]}（KTV版）</Text>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[5][1]}</Text>
                                </View>
                               
                            </TouchableOpacity>
                            <TouchableOpacity   style={{width:width*0.8,flexDirection:'row',height:0.15*width,alignItems: 'center',marginBottom:0.03*width}}   onPress={()=>{this.checkvideo(6)}}>
                                <Image  style={{width:0.3*width,height:0.15*width,borderRadius:0.01*width}}  source={{uri:this.state.intnetphoto[6]}} />
                                <View>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[6][0]}</Text>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[6][1]}</Text>
                                </View>
                                
                            </TouchableOpacity>
                            <TouchableOpacity   style={{width:width*0.8,flexDirection:'row',height:0.15*width,alignItems: 'center',marginBottom:0.03*width}}   onPress={()=>{this.checkvideo(7)}}>
                                <Image  style={{width:0.3*width,height:0.15*width,borderRadius:0.01*width}}  source={{uri:this.state.intnetphoto[7]}} />
                                <View>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[7][0]}（KTV版）</Text>
                                <Text style={{reportssmarginLeft:0.03*width}}>{this.state.videoname[7][1]}</Text>
                                </View>
                               
                            </TouchableOpacity>

                              </ScrollView>
                              
                            </View>
                            <View style={{width:this.state.videowidth,height:this.state.videowidth}}>
                            <View style={{flex:1}}>

               
                    <FlatList
                        data={this.state.data}
                        refreshing={this.state.isAdd}
                        extraData={this.state.data}
                        onRefresh={() => {
                            fetch('http://49.235.231.110:8800/musicword')
                                .then(res => res.json())
                                .then(res => {
                                    console.log(res.data)
                                    this.setState({
                                        data: res.data//将评论数据赋值给worddata
                                    })
                                })
                           
                                this.setState({
                                    isAdd:false
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
                                   disabled={item.user_id==this.state.userId?false:true}
                                    onPress={() => {
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
                                            height: width * 0.06,
                                            opacity:item.user_id==this.state.userId?1:0
                                        }

                                    }
                                        source={require('../images/rubbish.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            
                        }
                    />
                                            <View style={
                            {
                                justifyContent:'center',
                                alignItems:'center',
                                flexDirection:'row'
                            }
                        }>
                            <TextInput
                                style={{
                                    width: width * 0.6,
                                    height: height * 0.05,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 25,
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
                                        width: height * 0.05,
                                        height:height * 0.05,
                                        borderRadius: 100,
                                        borderWidth: 1,
                                        backgroundColor: '#A4A4A4',
                                        borderColor: 'AAAAAA',
                                        marginTop:0.015*height
                                       
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
            </View>
                              
                              </View>
               </ScrollView>            
</View>
            
           
         </View>
        );
      }
    }
export default reportss