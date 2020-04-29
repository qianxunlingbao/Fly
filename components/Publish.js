import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    View,
    Slider,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Animated,
    Easing,
    Alert,
    AsyncStorage,
} from 'react-native';
import Video from 'react-native-video';
import {Actions} from 'react-native-router-flux';
// import { Slider } from 'react-native-elements'
import Sound from 'react-native-sound'
import PlayList from './PlayList';


let lyrObj = []   // 存放歌词
let {width, height} = Dimensions.get('window');
let mp3 = "";
//如果是网络音频，使用 new Sound(mp3,null,error => {})

export default class Doc extends Component{
	constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
        this.state = {
            rate: 1,
            paused: true,
            muted: true,
            volume: 0.5,
            seconds: 0, //秒数
            totalMin: '', //总分钟
            totalSec: '', //总分钟秒数
            nowMin: 0, //当前分钟
            nowSec: 0, //当前秒钟
            maximumValue: 0, //滑块最大值,
            songs: [],   //歌曲id数据源
            playModel: 1,  // 播放模式  1:列表循环    2:随机    3:单曲循环
            btnModel: "http://qiniu.guang.lerzen.com/liebiaoxunhuan.png", //播放模式按钮背景图
            pic_small: '',    //小图
            pic_big: '',      //大图
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
			photo:require('../images/loop.png'),
			clicknum3:0,
			iscollect:true,
			clicknum2:0,
			music_name:'',
            music_author:'',
            playlistvisible:false,
            song:'',
        }
    }
      //格式化音乐播放的时间为0：00
    formatMediaTime(duration) {
        let min = Math.floor(duration / 60);
        let second = duration - min * 60;
        min = min >= 10 ? min : "0" + min;
        second = second >= 10 ? second : "0" + second;
        return min + ":" + second;
    }
    
    //设置进度条和播放时间的变化
    setTime(data) {
        let sliderValue = parseInt(this.state.currentTime);
        this.setState({
        slideValue: sliderValue,
        currentTime: data.currentTime
        });
    }
    
        //设置总时长
    setDuration(duration) {
        this.setState({ duration: duration.duration });
    }
    loadSongInfo = (index) => {
		var that = this;
        //加载歌曲
				let bitrate;
					bitrate=this.state.songs[index].music_value;
				let music_name=this.state.songs[index].music_name;
                let music_author=this.state.songs[index].music_author;
                this.state.music=this.state.songs[index].music_value;
                console.log(this.state.music,'asdsad')
                this.setState({
                    music_name: music_name,     //歌曲名
                    music_author: music_author,   //歌手
                    file_link: bitrate,   //播放链接
                }) 
    }
    onGetMusicLists = () => {
		var that = this;
	
	  let songArry = [...this.state.songs];
	  function chongfu(additem){
		return additem.music_id != that.props.data.music_id;
	  }
	  if(songArry.every(chongfu)){
		  that.setState({
			  songs : [...that.state.songs,that.props.data]
		  },()=>{console.log('songs',that.state.songs);AsyncStorage.setItem('playlist',JSON.stringify(that.state.songs));that.loadSongInfo(that.state.songs.length - 1)})
	  }else{
		  for(var i = 0; i < songArry.length;i++){
			  if(songArry[i].music_id == that.props.data.music_id){
				  that.loadSongInfo(i);
				  break;
			  }
		  }
	  }
    }
    componentDidMount() {
        AsyncStorage.getItem('playlist').then(
            (value) => {
                this.setState({
                    songs : JSON.stringify(value) == null ? [] : JSON.stringify(value)
                })
            }
        )
		this.onGetMusicLists();
    }

    // 上下一曲
    nextAction = (index) => {
        this.recover()
        lyrObj = [];
        if (index == 10) {
            index = 0 //如果是最后一首就回到第一首
		}
		if (index == -1) {
            index = this.state.songs.length - 1 // 如果是第一首就回到最后一首歌
        }
        this.setState({
            currentIndex: index,  //更新数据
        })
        this.loadSongInfo(index)  //加载数据
       
    }
    formatTime = (time) => {
        // 71s -> 01:11
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }
	clickph=()=>{
		this.state.clicknum2++
		let click= this.state.clicknum2
		if(click%3==0){
			
			this.state.photo=require('../images/loop.png')
			let photo = this.state.photo;
			let word = this.state.word;
			this.setState({
				photo ,
				word
			})	
		}
		else if(click%3==1){
		
			this.state.photo=require('../images/single.png')
			let photo = this.state.photo;
			let word = this.state.word;
			this.setState({
				photo ,
				word
			})	
		}
		else if(click%3==2){
			
			this.state.photo=require('../images/random.png')
			let photo = this.state.photo;
			let word = this.state.word;
			this.setState({
				photo ,
				word
			})	
		}
    }
    play(){
        console.log(this.state.paused)
        this.setState({
            paused:!this.state.paused,
            playIcon: this.state.paused ? 'pause' : 'play',
            muted:!this.state.muted
        })
    }
		render() {
		let time = this.state;
		return (
			<View style={styles.container}>
			<View style={{flex:50}}>
				<View style={{flex:6,flexDirection:'row'}}>
					<TouchableOpacity   style={{flex:1,marginLeft:'7%',justifyContent:'center'}}  onPress={()=>Actions.userinfor()}>
					<Image style={{width:'35%',height:'20%'}} source={require('../images/down.png')} />
					</TouchableOpacity>
					<View  style={{flex:5,justifyContent:'center', alignItems: 'center',flexDirection:'row'}}>
						<TouchableOpacity  onPress={()=>Actions.userinfor()}>
                        <Text>推荐</Text>
                        </TouchableOpacity>
						<Text>  |  </Text>
                        <TouchableOpacity>
						<Text style={{color:'#fff'}}>歌曲</Text>
                        </TouchableOpacity>
						<Text>  |  </Text>
                        <TouchableOpacity  onPress={()=>Actions.songword()}>
						<Text>歌词</Text>
                        </TouchableOpacity>
					</View>
					<TouchableOpacity   style={{flex:1,marginLeft:'7%',justifyContent:'center'}} >
					<Image style={{width:'35%',height:'20%'}} source={require('../images/share.png')} />
					</TouchableOpacity>
				</View>
				<View style={{flex:30,justifyContent:'center',}}>
					<View style={{flex:1,marginLeft:'5%'}}>
						<Image style={{width:'95%',height:'100%',
						 borderRadius:width*0.05}} source={require('../images/2.png')} />
					</View>
				</View>
				<View style={{flex:8,flexDirection:'row',marginTop:'3%'}} >
					<View style={{flex:5,flexDirection:'column',marginLeft:'7%'}} >
					<Text  style={{color:'#fff',fontSize:30,paddingBottom:'2%'}}>{this.state.music_name}</Text>
					<Text  style={{color:'#ccc',paddingBottom:'2%'}}>{this.state.music_author}</Text>
					<Text  style={{color:'#ccc'}}>歌曲类型</Text>
					</View>
					<TouchableOpacity   style={{flex:1,marginLeft:'7%',marginTop:'2%'}} onPress={this.clickheart}>
					<Image style={{width:'46%',height:'20%'}} source={this.state.iscollect?require('../images/heart.png' ):require('../images/redheart.png')} />
					</TouchableOpacity>
				</View>
				<View style={{flex:4,flexDirection:'row',justifyContent:'center', alignItems: 'center'}}>
					<TouchableOpacity  style={{flex:1,marginLeft:'7%'}} >
						<Image style={{width:'40%',height:'60%'}}  source={require('../images/mike.png' )} />
					</TouchableOpacity>
					<TouchableOpacity  style={{flex:1,marginLeft:'7%'}} >
						<Image style={{width:'40%',height:'60%'}} source={require('../images/download.png' )} />
					</TouchableOpacity>
					<TouchableOpacity  style={{flex:1,marginLeft:'7%'}} >
						<Image  style={{width:'40%',height:'60%'}}  source={require('../images/remark.png' )} />
					</TouchableOpacity>
					<TouchableOpacity   style={{flex:1,marginLeft:'7%'}}>
						<Image  style={{width:'40%',height:'60%'}}  source={require('../images/ellipsis.png' )} />
					</TouchableOpacity>
				</View>
				<View style={{flex:2}}>
					<View style={{flex:2,justifyContent:'center', alignItems: 'center'}}>			
					<Slider
					
					width={'95%'}
						ref='slider'
						// disabled //禁止滑动
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
					<View style={{flex:3,flexDirection:'row'}}>
						<View style={{marginTop: 0*height, marginLeft: 0.07*width}}>
						<Text style={{color:'#fff'}}>{this.state.currentTime}</Text>
            			</View>						
					</View>
		</View>
		<View style={{flex:5,flexDirection:'row',paddingBottom:'1%', justifyContent: 'space-around',marginLeft:'9%',alignItems: 'center'}}>
		<View style={{flex:1,justifyContent:'center'}}  >
		<TouchableOpacity onPress={this.clickph}>
		<Image style={{width:0.1*width,height:0.08*width}} source={this.state.photo} />
		</TouchableOpacity>
		</View>
		<View style={{flex:1,justifyContent:'center'}}>
		<TouchableOpacity  onPress={() => this.nextAction(this.state.currentIndex - 1)} >
		<Image style={{width:0.1*width,height:0.1*width}} source={require('../images/back.png' )} />
		</TouchableOpacity>
		</View>
		<View style={{flex:1,justifyContent:'center'}}>
        <View style={{}}>
            <Video source={{uri:this.state.music}}   // Can be a URL or a local file.
             ref='video'
            rate={this.state.rate}   
            muted={this.state.muted}  
            paused={this.state.paused}
            onBuffer={this.onBuffer}
            style={styles.backgroundVideo}
            onLoad={data => this.setDuration(data)}
            volume={1.0}
            playInBackground={true}
            onProgress={e => this.setTime(e)}
            />
        </View>
        <TouchableOpacity onPress={() => this.play()} style={{width:50,height:50,color:'#fff'}}>
        <Image style={{width:0.15*width,height:0.15*width}} source={this.state.paused?require('../images/broadcast.png' ):require('../images/suspend.png')} />
         </TouchableOpacity>
		</View>

		<View style={{flex:1,justifyContent:'center',marginLeft:0.05*width}}>
		<TouchableOpacity   onPress={() => this.nextAction(this.state.currentIndex + 1)} >
		<Image style={{width:0.1*width,height:0.1*width}} source={require('../images/next.png' )} />
		</TouchableOpacity>
		</View>
		<View style={{flex:1,justifyContent:'center'}}>
		<TouchableOpacity  onPress = {()=>this.setState({
            playlistvisible : true
        })}>
		<Image style={{width:0.1*width,height:0.1*width}} source={require('../images/list.png' )} />
		</TouchableOpacity>
		</View>
		</View>
		</View>
        <PlayList playlistvisible = {this.state.playlistvisible} backcallback = {this._backplay} list = {this.state.songs}/>

        </View>
	

		);
		}
		}
		const styles = StyleSheet.create({
			container: {
			flex: 10,
			backgroundColor: '#888',
			},
			});
