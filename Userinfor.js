import React, {Component} from 'react';
import {Platform, StyleSheet,ScrollView , TouchableOpacity,Text,TouchableWithoutFeedback,Animated, View,ProgressBarAndroid,Button,Slider, Image,Dimensions,ToastAndroid } from 'react-native';
import Sound from 'react-native-sound'
import {Actions} from 'react-native-router-flux';
let whoosh = null;
var {width, height} = Dimensions.get('window');
export default class Userinfor extends Component {
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
			photo:require('./loop.png'),
			clicknum3:0,
			iscollect:true,
			clicknum2:0,
			music_name:'',
			music_author:'',
			shuzhi:0,
			isplayBtn: "http://qiniu.guang.lerzen.com/zhanting.png" , //播放/暂停按钮背景图,
			songword:[]	,
			time:[],
            index:0,
            move:0,
            num:0
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
    loadSongInfo = (index) => {
        //加载歌曲
		let songid = this.state.songs[index]
		
        let url = 'http://49.235.231.110:8800/music'
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
				let songinfo = responseJson.data
				let bitrate;
					bitrate=responseJson.data[index].music_value;
				let music_name=responseJson.data[index].music_name;
				this.state.music_name=music_name;
				let music_author=responseJson.data[index].music_author;
				this.state.music_author=music_author;
                this.setState({

                    music_name: music_name,     //歌曲名
                    music_author: music_author,   //歌手
                    file_link: bitrate,   //播放链接
                })
                whoosh = new Sound(bitrate, null, (error) => {
                    if (error) {
                        return console.log('资源加载失败', error);
                    }
				})
				let songlength=[222,311,231,242,319,316,281,256,232,255];
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
			
			this.state.photo=require('./loop.png')
			let photo = this.state.photo;
			let word = this.state.word;
			this.setState({
				photo ,
				word
			})	
		}
		else if(click%3==1){
		
			this.state.photo=require('./single.png')
			let photo = this.state.photo;
			let word = this.state.word;
			this.setState({
				photo ,
				word
			})	
		}
		else if(click%3==2){
			
			this.state.photo=require('./random.png')
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
            nowSec = this.state.nowMin;
        if (seconds >= 60) {
            nowMin = parseInt(seconds / 60); //当前分钟数
            nowSec = seconds - nowMin * 60;
            nowSec = nowSec < 10 ? '0' + nowSec : nowSec;
        } else {
            nowMin=0
            nowSec = seconds < 10 ? '0' + seconds : seconds;
        }
        if(nowMin<10)
			
			{var nowtime='0'+nowMin+':'+nowSec
			}
			if(nowMin>=10)
			{var nowtime=nowMin+':'+nowSec
			}
        for(var j=0;j<this.state.time.length;j++){
			
            if(nowtime==this.state.time[j]){
                
                this.state.index=j;
                console.log(j,this.state.time[j])
                this.refs.swiper_ScrollView.scrollTo({ x: 50, y:width*0.08*j , animated: true })
                this.setState({
                    index:this.state.index
                })
                if(j==this.state.songword.length)
                {
                    console.log()
                    this.time && clearTimeout(this.time);
                }
            }
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


	renderChildView(){
		// 数组
		
		let url = 'http://music.163.com/api/song/media?id=5255987'
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
				
				let songinfo = responseJson.data
                this.setState({
                  
                })

            })
		var allChild = [];
		var colors = ['','你若化成风', '我幻化成雨', '守护你身边', '一笑为红颜', '你若化成风'
		, '我幻化成雨', '爱锁在眉间', '似水往昔浮流年', '乖乖 我的小乖乖',
		 '你的样子太可爱', '追你的男生每个都超级厉害', '我却在考虑怎么Say hi', '害羞的我这样下去要怎么办'
		, '怎么办 爱情甜又酸', '我不是Boss', '没有超大的House', '如果送你Rose', 
		'可不可以给我Chance', '不想看时间这么一点一滴飞逝', '老夫子带着假发', '我不要三寸金莲胡话',
		'想和你跳超短裙的恰恰', '想带你回家见妈妈', '你若化成风', '我幻化成雨',
		'守护你身边','一笑为红颜','你若化成风','我幻化成雨','爱锁在眉间','似水往昔浮流年','周末找个借口和你泛舟',
		'一壶清酒 江水悠悠 我心悠悠','这感情Just for you','表面平静其实内心早已风起云涌',
		'缘字诀 几番轮回 你锁眉','哎哟你的心情左右我的情绪','虽然有些问题真的很难搞定','我还是充满信心',
		'老夫子带着假发','我不要三寸金莲胡话','想和你跳超短裙的恰恰','想带你回家见妈妈','你若化成风','我幻化成雨','守护你身边','一笑为红颜',
		'你若化成风','我幻化成雨','爱锁在眉间','似水往昔浮流年','你千万不要装酷','呆的像大脑短路','我不收你的礼物','只想收一点点幸福','请领悟',
		'请拿出速度奉我为公主','别磨蹭的像胖叔叔','有压力也要顶住','坚持自己的道路','真心去付出随时准备自我颠覆','这一首有点复古',
		'不预示下首的套路','踩着Hip-Hop的鼓点陪你跳恰恰舞','嘟嘟嘟 ','嘟嘟嘟嘟嘟 ','嘟嘟嘟 ','嘟嘟嘟嘟嘟 ','嘟嘟嘟 ','嘟嘟嘟嘟嘟 ','嘟嘟嘟嘟嘟嘟嘟',
		'嘟嘟嘟','嘟嘟嘟嘟嘟','嘟嘟嘟','嘟嘟嘟嘟嘟','嘟嘟嘟','嘟嘟嘟嘟嘟','嘟嘟嘟嘟嘟嘟嘟','你若化成风','我幻化成雨','守护你身边','一笑为红颜','你若化成风','我幻化成雨',
		'爱锁在眉间','似水往昔浮流年','你若化成风','我幻化成雨','守护你身边','一笑为红颜','你若化成风','我幻化成雨','爱锁在眉间','似水往昔浮流年'];
		var time=['00:00','00:06','00:09','00:11','00:14','00:17','00:19','00:22','00:24','00:27','00:29','00:31','00:33','00:35',
		'00:37','00:40','00:41','00:42','00:43','00:45','00:48','00:50','00:53','00:55','00:58','01:00','01:03','01:06','01:08',
		'01:11','01:13','01:16','01:19','01:21','01:24','01:26','01:29','01:32','01:35','01:38','01:39','01:42','01:44',
		'01:47','01:49','01:52','01:55','01:57','02:00','02:02','02:05','02:07','02:10','02:12','02:13','02:14','02:16','02:16',
		'02:18','02:20','02:22','02:23','02:25','02:27','02:28','02:31','02:32','02:33','02:34','02:36','02:37','02:39','02:41','02:42','02:44','02:45','02:46',
		'02:47','02:49','02:54','02:57','02:59','03:02','03:04','03:07','03:09','03:12','03:15','03:17','03:20','03:22','03:25','03:27','03:30','03:33'];
		this.state.songword=colors;
		this.state.time=time;
		var index=0;
		// 遍历
		
	   for(var i=0; i<colors.length; i++){
		   
		   if(this.state.index==i){
			allChild.push(
				//  循环排列的view中必须有唯一表示
				  <View key={i} style={{backgroundColor:colors[i], width:width, height:width*0.08,marginTop:-width*0.08*[index]}}>
					 <Text style={{flex:1,color:'#fff'}}>{colors[i]}</Text>
				  </View>
			  );
		   }
		   else{
			allChild.push(
				//  循环排列的view中必须有唯一表示
				  <View key={i} style={{backgroundColor:colors[i], width:width, height:width*0.08,marginTop:-width*0.08*[index]}}>
					 <Text style={{flex:1,color:'#000'}}>{colors[i]}</Text>
				  </View>
			  );
		   }
		
	   }
	   // 返回数组，不然怎么显示出来
	
	  
	   return allChild;
	 }
    render() {
        let time = this.state;
        return (
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
            console.log(event.nativeEvent.contentOffset.x);//水平滚动距离
            console.log(event.nativeEvent.contentOffset.y);//垂直滚动距离 
          }}}
       
       >
          <View style={{width:width}}><View style={styles.container}>
	<View style={{flex:50}}>
		<View style={{flexDirection:'row',height:height*0.1}}>
            <View  style={{flex:1,marginLeft:'7%',justifyContent:'center'}}  >
                <TouchableWithoutFeedback  onPress={()=>Actions.pop()}>
		    	<Image style={{width:'35%',height:'20%'}} source={require('./down.png')} />
			    </TouchableWithoutFeedback>
            </View>
			
			<View  style={{flex:5,justifyContent:'center', alignItems: 'center',flexDirection:'row'}}>
				<TouchableWithoutFeedback  onPress={()=>Actions.userinfor()}>
                    <Text style={{color:'#fff'}}>推荐</Text>
                </TouchableWithoutFeedback>
					<Text>  |  </Text>
                <TouchableWithoutFeedback onPress={()=>Actions.publish()}>
				    <Text >歌曲</Text>
                </TouchableWithoutFeedback>
					<Text>  |  </Text>
                <TouchableWithoutFeedback  >
					<Text >歌词</Text>
                </TouchableWithoutFeedback>
			</View>
            <View  style={{flex:1,marginLeft:'7%',justifyContent:'center'}}  >
				<TouchableWithoutFeedback    >
				    <Image style={{width:'35%',height:'20%'}} source={require('./share.png')} />
				</TouchableWithoutFeedback>
            </View>
		</View>
        <ScrollView  style={{height:height*0.9,marginLeft:width*0.05}}>
        <View >
        
            <View style={{height:height*0.12,backgroundColor:'#999',width:width*0.9,borderRadius:width*0.02
            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02}}>
			<Text style={{fontSize:25,color:'#fff'}}>当你老了</Text>
            <Text style={{fontSize:10,color:'#ccc'}}>2015年03月27日发行  歌曲详情</Text>
            <View style={{borderTopColor:'#fff',borderTopWidth:1,marginTop:height*0.01,marginBottom:height*0.01}}>
            </View>
            <Text style={{fontSize:13,color:'#fff'}}>歌手：赵照                                                                   专辑：当你老了</Text>
			</View>
            <View style={{height:height*0.2,backgroundColor:'#999',width:width*0.9,borderRadius:width*0.02
            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02}}>
			<Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>相关歌曲</Text>
            <Text style={{fontSize:18,color:'#ccc',marginBottom:height*0.01}}>2015年03月27日发行  歌曲详情</Text>
            <Text style={{fontSize:18,color:'#ccc',marginBottom:height*0.01}}>别哭，我最爱的人-水木年华</Text>
            <Text style={{fontSize:18,color:'#ccc',marginBottom:height*0.01}}>天空之城(Live)-蒋国豪</Text>
            <Text style={{fontSize:18,color:'#ccc',marginBottom:height*0.01}}>未给姐姐递出的信-赵雷</Text>
			</View>
            <View style={{height:height*0.12,backgroundColor:'#999',width:width*0.9,borderRadius:width*0.02
            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02}}>
			<Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>其他版本</Text>
            <Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>当你老了（原唱：赵照）</Text>
            <Text style={{fontSize:13,color:'#ccc',marginBottom:height*0.01}}>秋叶牧阳：青春之歌</Text>                          
			</View>
            <View style={{height:height*0.35,width:width*0.9,borderRadius:width*0.02
            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02}}>
            <Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>相关歌单</Text>    
			</View>
            <View style={{height:height*0.3,width:width*0.9,borderRadius:width*0.02
            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02}}>
            <Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>相关视频</Text> 
			</View>
        </View>
        </ScrollView>

	</View>
</View></View>
          <View style={{width:width}}><View style={styles.container}>
			<View style={{flex:50}}>
				<View style={{flex:6,flexDirection:'row'}}>
					<TouchableOpacity   style={{flex:1,marginLeft:'7%',justifyContent:'center'}}  onPress={()=>Actions.userinfor()}>
					<Image style={{width:'35%',height:'20%'}} source={require('./down.png')} />
					</TouchableOpacity>
					<View  style={{flex:5,justifyContent:'center', alignItems: 'center',flexDirection:'row'}}>
						<TouchableOpacity  onPress={()=>Actions.tuijian()}>
                        <Text>推荐</Text>
                        </TouchableOpacity>
						<Text>  |  </Text>
                        <TouchableOpacity>
						<Text style={{color:'#fff'}}>歌曲</Text>
                        </TouchableOpacity>
						<Text>  |  </Text>
                        <TouchableOpacity  onPress={()=>Actions.songword({data:[
                            this.state.pause,this.state.music_name,this.state.nowMin,this.state.nowSec
                            ]})}>
						<Text>歌词</Text>
                        </TouchableOpacity>
					</View>
					<TouchableOpacity   style={{flex:1,marginLeft:'7%',justifyContent:'center'}} >
					<Image style={{width:'35%',height:'20%'}} source={require('./share.png')} />
					</TouchableOpacity>
				</View>
				<View style={{flex:30,justifyContent:'center',}}>
					<View style={{flex:1,marginLeft:'5%'}}>
						<Image style={{width:'95%',height:'100%',
						 borderRadius:width*0.05}} source={require('./2.jpg')} />
					</View>
				</View>
				<View style={{flex:8,flexDirection:'row',marginTop:'3%'}} >
					<View style={{flex:5,flexDirection:'column',marginLeft:'7%'}} >
					<Text  style={{color:'#fff',fontSize:30,paddingBottom:'2%'}}>{this.state.music_name}</Text>
					<Text  style={{color:'#ccc',paddingBottom:'2%'}}>{this.state.music_author}</Text>
					<Text  style={{color:'#ccc'}}>歌曲类型</Text>
					</View>
					<TouchableOpacity   style={{flex:1,marginLeft:'7%',marginTop:'2%'}} onPress={this.clickheart}>
					<Image style={{width:'46%',height:'20%'}} source={this.state.iscollect?require('./heart.png' ):require('./redheart.png')} />
					</TouchableOpacity>
				</View>
				<View style={{flex:4,flexDirection:'row',justifyContent:'center', alignItems: 'center'}}>
					<TouchableOpacity  style={{flex:1,marginLeft:'7%'}} >
						<Image style={{width:'40%',height:'60%'}}  source={require('./mike.png' )} />
					</TouchableOpacity>
					<TouchableOpacity  style={{flex:1,marginLeft:'7%'}} >
						<Image style={{width:'40%',height:'60%'}} source={require('./download.png' )} />
					</TouchableOpacity>
					<TouchableOpacity  style={{flex:1,marginLeft:'7%'}} >
						<Image  style={{width:'40%',height:'60%'}}  source={require('./remark.png' )} />
					</TouchableOpacity>
					<TouchableOpacity   style={{flex:1,marginLeft:'7%'}}>
						<Image  style={{width:'40%',height:'60%'}}  source={require('./ellipsis.png' )} />
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
		<Image style={{width:0.1*width,height:0.1*width}} source={require('./back.png' )} />
		</TouchableOpacity>
		</View>
		<View style={{flex:1,justifyContent:'center'}}>
		<TouchableOpacity  onPress={() => this.playAction()} >
		<Image style={{width:0.15*width,height:0.15*width}} source={this.state.pause?require('./suspend.png' ):require('./broadcast.png')} />
		</TouchableOpacity>
		</View>
		<View style={{flex:1,justifyContent:'center',marginLeft:0.05*width}}>
		<TouchableOpacity   onPress={() => this.nextAction(this.state.currentIndex + 1)} >
		<Image style={{width:0.1*width,height:0.1*width}} source={require('./next.png' )} />
		</TouchableOpacity>
		</View>
		<View style={{flex:1,justifyContent:'center'}}>
		<TouchableOpacity  >
		<Image style={{width:0.1*width,height:0.1*width}} source={require('./list.png' )} />
		</TouchableOpacity>
		</View>
		</View>
		</View>
		</View></View>
          <View style={{width:width}}><View style={styles.container}>
	<View style={{flex:50}}>
		<View style={{flex:6,flexDirection:'row'}}>
            <View  style={{flex:1,marginLeft:'7%',justifyContent:'center'}}  >
                <TouchableWithoutFeedback  onPress={()=>Actions.pop()}>
		    	<Image style={{width:'35%',height:'20%'}} source={require('./down.png')} />
			    </TouchableWithoutFeedback>
            </View>
			
			<View  style={{flex:5,justifyContent:'center', alignItems: 'center',flexDirection:'row'}}>
				<TouchableWithoutFeedback  onPress={()=>Actions.userinfor()}>
                    <Text>推荐</Text>
                </TouchableWithoutFeedback>
					<Text>  |  </Text>
                <TouchableWithoutFeedback onPress={()=>Actions.publish()}>
				    <Text >歌曲</Text>
                </TouchableWithoutFeedback>
					<Text>  |  </Text>
                <TouchableWithoutFeedback  >
					<Text style={{color:'#fff'}}>歌词</Text>
                </TouchableWithoutFeedback>
			</View>
            <View  style={{flex:1,marginLeft:'7%',justifyContent:'center'}}  >
				<TouchableWithoutFeedback    >
				    <Image style={{width:'35%',height:'20%'}} source={require('./share.png')} />
				</TouchableWithoutFeedback>
            </View>
		</View>
        <View style={{flex:38,marginLeft:width*0.05}}>
			<View style={{flex:5}}>
				<Text style={{color:'#ddd',fontSize:30}}>{this.state.music_name}</Text>
				<TouchableWithoutFeedback    >
					<Text style={{color:'#ddd',marginTop:width*0.01,marginBottom:width*0.02}}>歌手链接</Text>
				</TouchableWithoutFeedback>
			</View>
			<View style={{flex:33}}>
			<ScrollView
			 ref='swiper_ScrollView'
      		//  默认为垂直排列 此属性为true改为水平排列
           horizontal={false}
          //  禁用水平滚动条
           showsHorizontalScrollIndicator={false}
          //  自动分页限ios
           pagingEnabled={false}
          //  禁用滚动限ios
		   // scrollEnabled={false}
	
		
        >
 			{this.renderChildView()} 
       </ScrollView>
			</View>
        </View>
        <View style={{flex:4,flexDirection:'row'}}>
			<View style={{flex:2}}>
			</View>
			<View style={{flex:2,marginLeft:width*0.6,justifyContent:'center', alignItems: 'center'}}>
				<TouchableWithoutFeedback  >
						<Image style={{width:'50%',height:'70%'}} source={require('./suspend.png' )} />
				</TouchableWithoutFeedback >
			</View>

        </View>
	</View>
</View></View>
      </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
    flex: 10,
    backgroundColor: '#888',
    },
    });

