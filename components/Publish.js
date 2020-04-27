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
    Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux';
// import { Slider } from 'react-native-elements'
import Sound from 'react-native-sound'


let lyrObj = []   // 存放歌词
let {width, height} = Dimensions.get('window');
let mp3 = "";
//如果是网络音频，使用 new Sound(mp3,null,error => {})
let whoosh = null;
export default class Doc extends Component{
	constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
        this.state = {
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
            isplayBtn: "http://qiniu.guang.lerzen.com/zhanting.png"  //播放/暂停按钮背景图
        }
    }
    // 旋转动画
    spin = () => {
        this.spinValue.setValue(0)
        myAnimate = Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }
    loadSongInfo = (index) => {
		var that = this;
        //加载歌曲
				let bitrate;
					bitrate=this.state.songs[index].music_value;
				let music_name=this.state.songs[index].music_name;
				let music_author=this.state.songs[index].music_author;
                this.setState({
                    music_name: music_name,     //歌曲名
                    music_author: music_author,   //歌手
                    file_link: bitrate,   //播放链接
                })
                whoosh = new Sound(bitrate, null, (error) => {
                    if (error) {
                        return console.log('资源加载失败', error);
					}
					let totalTime=Math.ceil(whoosh.getDuration());
					let totalMin = parseInt(totalTime / 60); //总分钟数
					let totalSec = totalTime - totalMin * 60; //秒钟数并判断前缀是否 + '0'
					totalSec = totalSec > 9 ? totalSec : '0' + totalSec;
					that.setState({
						totalMin,
						totalSec,
						maximumValue: totalTime,
					})
	
				})
                this.onGetLyric(this.state.songs[index].music_id);
    }
    onGetMusicLists = () => {
		var that = this;
		if(whoosh){
			whoosh.stop();
			whoosh.release();
		}
	  let songArry = [...this.state.songs];
	  function chongfu(additem){
		return additem.music_id != that.props.data.music_id;
	  }
	  if(songArry.every(chongfu)){
		  that.setState({
			  songs : [...that.state.songs,that.props.data]
		  },()=>that.loadSongInfo(that.state.songs.length - 1))
	  }else{
		  for(var i = 0; i < songArry.length;i++){
			  if(songArry[i].music_id == that.props.data.music_id){
				  that.loadSongInfo(i);
				  break;
			  }
		  }
	  }
    }
    onGetLyric = (songId) => {
     /*   //加载歌词
        let url = config.serverUrl + "/Music/GetMusicLyric/getMusicLyric?songId=" + songId;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                    let lry = responseJson.data.lrcContent
                    let lryAry = lry.split('\n')   //按照换行符切数组
                    lryAry.forEach(
                        function (val, index) {
                            let obj = {}   //用于存放时间
                            val = val.replace(/(^\s*)|(\s*$)/g, '')    //正则,去除前后空格
                            let indeofLastTime = val.indexOf(']')  // ]的下标
                            let timeStr = val.substring(1, indeofLastTime) //把时间切出来 0:04.19
                            let minSec = ''
                            let timeMsIndex = timeStr.indexOf('.')  // .的下标
                            if (timeMsIndex !== -1) {
                                //存在毫秒 0:04.19
                                minSec = timeStr.substring(1, val.indexOf('.'))  // 0:04.
                                obj.ms = parseInt(timeStr.substring(timeMsIndex + 1, indeofLastTime))  //毫秒值 19
                            } else {
                                //不存在毫秒 0:04
                                minSec = timeStr
                                obj.ms = 0
                            }
                            let curTime = minSec.split(':')  // [0,04]
                            obj.min = parseInt(curTime[0])   //分钟 0
                            obj.sec = parseInt(curTime[1])   //秒钟 04
                            obj.txt = val.substring(indeofLastTime + 1, val.length) //歌词文本: 留下唇印的嘴
                            obj.txt = obj.txt.replace(/(^\s*)|(\s*$)/g, '')
                            obj.dis = false
                            obj.total = obj.min * 60 + obj.sec + obj.ms / 100   //总时间
                            if (obj.txt.length > 0) {
                                lyrObj.push(obj)
                            }
                        }
                    )
                }
            )*/
    }

    componentDidMount() {
        //先从总列表中获取到song_id保存
		this.onGetMusicLists();
        /*this.spin()   //   启动旋转*/
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
    // 播放/暂停
    playAction = () => {
        console.log(this.state.music_name,'bo')
        let pauseStatus = !this.state.pause;
        this.setState({
            pause: !this.state.pause
		})
        //判断按钮显示什么（播放）
        if (pauseStatus == true) {
            this.start();
        } else {
            // 暂停
            this.pause();
        }
    }

    componentWillUnmount() {
        this.time && clearTimeout(this.time);
    }

// 歌词
    renderItem() {
        // 数组
        let itemAry = [];
        for (let i = 0; i < lyrObj.length; i++) {
            let item = lyrObj[i].txt

            if (this.state.currentTime.toFixed(2) > lyrObj[i].total) {
                //正在唱的歌词
                itemAry.push(
                    <View key={i} style={styles.itemStyle}>
                        <Text style={{color: 'blue'}}> {item} </Text>
                    </View>
                );
                _scrollView.scrollTo({x: 0, y: (25 * i), animated: false});
            }
            else {
                //所有歌词
                itemAry.push(
                    <View key={i} style={styles.itemStyle}>
                        <Text style={{color: 'red'}}> {item} </Text>
                    </View>
                )
            }
        }

        return itemAry;
    }

//把秒数转换为时间类型
    formatTime = (time) => {
        // 71s -> 01:11
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }
    // 开始播放
    start = () => {
        whoosh.play();
        this.time = setInterval(() => {
            whoosh.getCurrentTime(seconds => {
                seconds = Math.ceil(seconds);
                this.onGetNowTime(seconds)
            })
        }, 1000)
    }
    // 暂停
    pause = () => {
        clearInterval(this.time);
        whoosh.pause();
    }
    // 停止
    stop = () => {
        clearInterval(this.time);
        this.setState({
            nowMin: 0,
            nowSec: 0,
            seconds: 0,
        })
        whoosh.stop();
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
    recover = () => {
        if (whoosh) {
            this.pause();
            this.stop();
            whoosh = null;
        }
        this.setState({
            pause: true,
            seconds: 0,
            currentTime: 0.0
        })
    }
    // 时间处理
    onGetNowTime = (seconds) => {
        let nowMin = this.state.nowMin,
            nowSec = this.state.nowSec;
        if (seconds >= 60) {
            nowMin = parseInt(seconds / 60); //当前分钟数
            nowSec = seconds - nowMin * 60;
            nowSec = nowSec < 10 ? '0' + nowSec : nowSec;
        } else {
            nowSec = seconds < 10 ? '0' + seconds : seconds;
        }
        this.setState({
            nowMin,
            nowSec,
            seconds
        })
        this.setState({
            currentTime: seconds
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
						maximumValue={this.state.maximumValue} //滑块最大值
						minimumValue={0} //滑块最小值
						step={1}
						value={this.state.seconds}
						onSlidingComplete={(value) => { //用户完成更改值时调用的回调（例如，当滑块被释放时）
						value = parseInt(value);
						this.onGetNowTime(value)
										// 设置播放时间
						whoosh.setCurrentTime(value);
						}}
						onValueChange={(value) => {
						this.onGetNowTime(value)
						}}
					/>
					</View>
					<View style={{flex:3,flexDirection:'row'}}>
						<View style={{marginTop: 0*height, marginLeft: 0.07*width}}>
						<Text style={{color:'#fff'}}>{time.nowMin}:{time.nowSec}</Text>
            			</View>
						<View style={{marginTop: 0*height, marginLeft: 0.8*width}}>
						<Text style={{color:'#fff'}}>{time.totalMin}:{time.totalSec}</Text>
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
		<TouchableOpacity  onPress={() => this.playAction()} >
		<Image style={{width:0.15*width,height:0.15*width}} source={this.state.pause?require('../images/suspend.png' ):require('../images/broadcast.png')} />
		</TouchableOpacity>
		</View>
		<View style={{flex:1,justifyContent:'center',marginLeft:0.05*width}}>
		<TouchableOpacity   onPress={() => this.nextAction(this.state.currentIndex + 1)} >
		<Image style={{width:0.1*width,height:0.1*width}} source={require('../images/next.png' )} />
		</TouchableOpacity>
		</View>
		<View style={{flex:1,justifyContent:'center'}}>
		<TouchableOpacity  >
		<Image style={{width:0.1*width,height:0.1*width}} source={require('../images/list.png' )} />
		</TouchableOpacity>
		</View>
		</View>
		</View>
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