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
        //加载歌曲
		let songid = this.state.songs[index]
		
        let url = 'http://49.235.231.110:8800/music'
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
				let songinfo = responseJson.data
				let bitrate;
				
					bitrate=responseJson.data[index].music_value
				
                this.setState({
                    pic_small: songinfo.pic_small, //小图
                    pic_big: songinfo.pic_big,  //大图
                    title: songinfo.title,     //歌曲名
                    author: songinfo.author,   //歌手
                    file_link: bitrate,   //播放链接
                })
                whoosh = new Sound(bitrate, null, (error) => {
                    if (error) {
                        return console.log('资源加载失败', error);
                    }
				})
				let songlength=[222,311,231,242,319,316,281,256];
				let totalTime =songlength[index];
                let totalMin = parseInt(totalTime / 60); //总分钟数
                let totalSec = totalTime - totalMin * 60; //秒钟数并判断前缀是否 + '0'
				totalSec = totalSec > 9 ? totalSec : '0' + totalSec;
                this.setState({
                    totalMin,
                    totalSec,
                    maximumValue: totalTime,
                })
                this.onGetLyric(songid);
            })
    }
    onGetMusicLists = () => {
        let url ='http://49.235.231.110:8800/music';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let listAry = responseJson.data
                let song_idAry = []; //保存song_id的数组
                for (let i = 0; i < responseJson.data.length; i++) {
                    let song_id = responseJson.data[i].music_id
                    song_idAry.push(song_id)
				}
				console.log(song_idAry)
                this.setState({
                    songs: song_idAry
                }, () => {
                    this.loadSongInfo(0)
                })
            })
            .catch((error) => { // 错误处理
                // Alert.alert(JSON.stringify(error))
            })
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

    // 上一曲
    prevAction = (index) => {
        this.recover()
        lyrObj = [];
        if (index == -1) {
            index = this.state.songs.length - 1 // 如果是第一首就回到最后一首歌
        }
        this.setState({
            currentIndex: index  //更新数据
        })
        this.loadSongInfo(index)  //加载数据
    }
    // 下一曲
    nextAction = (index) => {
        this.recover()
        lyrObj = [];
        if (index == 10) {
            index = 0 //如果是最后一首就回到第一首
        }
        this.setState({
            currentIndex: index,  //更新数据
        })
        this.loadSongInfo(index)   //加载数据
    }
    // 播放/暂停
    playAction = () => {
        let pauseStatus = !this.state.pause;
        this.setState({
            pause: !this.state.pause
		})
		console.log('111')
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

    recover = () => {
        if (whoosh) {
            this.pause();
            this.stop();
            whoosh = null;
        }
        this.setState({
            pause: false,
            isplayBtn: "http://qiniu.guang.lerzen.com/zhanting.png",  //播放/暂停按钮背景图
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
                        <View style={{flexDirection: 'row', justifyContent: 'space-around',marginTop:20}}>
                            <TouchableOpacity onPress={() => this.nextAction(this.state.currentIndex - 1)}>
                                <Image source={require('./back.png' )}
                                       style={{width: 30, height: 30}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.playAction()}>
                                <Image source={this.state.pause?require('./suspend.png' ):require('./broadcast.png')} style={{width: 30, height: 30}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.nextAction(this.state.currentIndex + 1)}>
                                <Image source={require('./next.png' )}
                                       style={{width: 30, height: 30}}/>
                            </TouchableOpacity>
                        </View>
		</View>

		);
		}
		}
		const styles = StyleSheet.create({
			container: {
				flex: 1,
			},
			image: {
				flex: 1
			},
			playingControl: {
				flexDirection: 'row',
				alignItems: 'center',
				paddingTop: 10,
				paddingLeft: 20,
				paddingRight: 20,
				paddingBottom: 20
			},
			playingInfo: {
				flexDirection: 'row',
				alignItems: 'stretch',
				justifyContent: 'space-between',
				paddingTop: 40,
				paddingLeft: 20,
				paddingRight: 20,
				backgroundColor: 'rgba(255,255,255,0.0)'
			},
			text: {
				color: "black",
				fontSize: 22
			},
			modal: {
				height: 300,
				borderTopLeftRadius: 5,
				borderTopRightRadius: 5,
				paddingTop: 5,
				paddingBottom: 50
			},
			itemStyle: {
				paddingTop: 20,
				height: 25,
				backgroundColor: 'rgba(255,255,255,0.0)'
			}
		});
		