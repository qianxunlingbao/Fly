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
    Modal,
    AsyncStorage,
    TouchableWithoutFeedback,
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
            seconds: 0, //秒数
            totalMin: '', //总分钟
            totalSec: '', //总分钟秒数
            nowMin: '00', //当前分钟
            nowSec: '00', //当前秒钟
            maximumValue: 0, //滑块最大值,
            songs: [],   //歌曲id数据源
            playModel: 1,  // 播放模式  1:列表循环    2:随机    3:单曲循环
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
			photo:require('../images/loop.png'),
			clicknum3:0,
			collect:false,
			clicknum2:0,
			music_name:'',
            music_author:'',
            playlistvisible:false,
            song:'',
            move:0,
            index:0,
            color:['#fff','#000','#000'],
            moveclick:false,
            nowsong:0,
            modalVisible:false,
            songword:[],
            volume:1,
            sliderValuevolume: 0,    //Slide的value
            modalVisible1:false,
            
        }
    }
    //设置进度条和播放时间的变化
    setTime(data) {

        let sliderValue = parseInt(this.state.currentTime);
        let min = Math.floor(sliderValue / 60);
        let second = sliderValue - min * 60;
        min = min >= 10 ? min : "0" + min;
        second = second >= 10 ? second : "0" + second;
        
            this.state.nowMin=min
            this.state.nowSec=second
            for(var i =0 ;i<this.state.time.length;i++){
                if(this.state.time[i]==min+':'+second)
                {
                    this.refs.swiper_ScrollView.scrollTo({ x:0, y:width*0.08*i , animated: true })
                }
            }
            
        this.setState({
        slideValue: sliderValue,
        currentTime: data.currentTime,
        nowMin:this.state.nowMin,
        nowsec:this.state.nowSec
        });
    }
    setTimeA(data) {

        let sliderValue = parseInt(this.state.currentTime);
        let min = Math.floor(sliderValue / 60);
        let second = sliderValue - min * 60;
        min = min >= 10 ? min : "0" + min;
        second = second >= 10 ? second : "0" + second;
        
            this.state.nowMin=min
            this.state.nowSec=second
            for(var i =0 ;i<this.state.time.length;i++){
                if(this.state.time[i]==min+':'+second)
                {
                    this.refs.swiper_ScrollView.scrollTo({ x:0, y:width*0.08*i , animated: true })
                }
            }
            
        this.setState({
        slideValue: sliderValue,
        currentTime: data.currentTime,
        nowMin:this.state.nowMin,
        nowsec:this.state.nowSec
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

        this.setState({
            paused:!this.state.paused,
            playIcon: this.state.paused ? 'pause' : 'play',
            rate:this.state.rate
        })
    }
    componentWillUpdate() {
        
    }
    moveclick(){
        this.state.moveclick=true;

        for(var i =0;i<3;i++){
            this.state.color[i]='#000'
        }
        this.state.color[this.state.index]='#fff'
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
    move(){
        if(!this.state.moveclick){
            if(this.state.move>width/2&&this.state.index==0){
                this.refs.swiper_ScrollVie.scrollTo({ x: width, y:0 , animated: true })
                this.state.index=1
            }
           else if(this.state.move<width/2&&this.state.index==1){
                this.refs.swiper_ScrollVie.scrollTo({ x: 0, y:0 , animated: true })
                this.state.index=0
            }
            else if(this.state.move>width+width/2&&this.state.index==1){
                this.refs.swiper_ScrollVie.scrollTo({ x: width*2, y:0 , animated: true })
                this.state.index=2
            }
            else if(this.state.move<width+width/2&&this.state.index==2){
                this.refs.swiper_ScrollVie.scrollTo({ x: width, y:0 , animated: true })
                this.state.index=1
            }
            else{
                this.time1 = setTimeout(() => {
                    if(this.state.move<width/2&&this.state.index==0){
                        this.refs.swiper_ScrollVie.scrollTo({ x: 0, y:0 , animated: true })
                        this.state.index=0
                    }
                    if(this.state.move>width/2&&this.state.index==1){
                        this.refs.swiper_ScrollVie.scrollTo({ x: width, y:0 , animated: true })
                        this.state.index=1
                    }
                    if(this.state.move<width/2+width&&this.state.index==1){
                        this.refs.swiper_ScrollVie.scrollTo({ x: width, y:0 , animated: true })
                        this.state.index=1
                    }
                    if(this.state.move>width/2+width&&this.state.index==2){
                        this.refs.swiper_ScrollVie.scrollTo({ x: width*2, y:0 , animated: true })
                        this.state.index=2
                    }
                    this.time1 && clearTimeout(this.time1);
                }, 1000)
            }  
            for(var i=0;i<this.state.color.length;i++){
                if(i==this.state.index)
                this.state.color[this.state.index]='#fff'
                else
                this.state.color[i]='#000'
            }
            this.setState({
                color:this.state.color
            })     
        }
        
    }
    clickred(){
        this.state.collect=!this.state.collect
        this.setState({
            collect:this.state.collect
        })

        
    }
    renderChildView(){
        // 数组

        var allChild = [];
		var songword = ['你若化成风', '我幻化成雨', '守护你身边', '一笑为红颜', '你若化成风'
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
		var time=['00:06','00:09','00:11','00:14','00:17','00:19','00:22','00:24','00:27','00:29','00:31','00:33','00:35',
		'00:37','00:40','00:41','00:42','00:43','00:45','00:48','00:50','00:53','00:55','00:58','01:00','01:03','01:06','01:08',
		'01:11','01:13','01:16','01:19','01:21','01:24','01:26','01:29','01:32','01:35','01:38','01:39','01:42','01:44',
		'01:47','01:49','01:52','01:55','01:57','02:00','02:02','02:05','02:07','02:10','02:12','02:13','02:14','02:16','02:16',
		'02:18','02:20','02:22','02:23','02:25','02:27','02:28','02:31','02:32','02:33','02:34','02:36','02:37','02:39','02:41','02:42','02:44','02:45','02:46',
		'02:47','02:49','02:54','02:57','02:59','03:02','03:04','03:07','03:09','03:12','03:15','03:17','03:20','03:22','03:25','03:27','03:30','03:33'];
		this.state.songword=songword;
		this.state.time=time;
		var index=0;
        // 遍历
        for(var j=0;j<time.length;j++){
            if(this.state.time[j]==this.state.nowMin+':'+this.state.nowSec)
            {
                this.state.nowsong=j
            }
        }
	   for(var i=0; i<songword.length; i++){
		   if(this.state.nowsong==i){
			allChild.push(
				//  循环排列的view中必须有唯一表示
				  <View key={i} style={{backgroundColor:songword[i], width:width, height:width*0.08,marginTop:-width*0.08*[index]}}>
					 <Text style={{flex:1,color:'#fff'}}>{songword[i]}</Text>
				  </View>
			  );
		   }
		   else{
			allChild.push(
				//  循环排列的view中必须有唯一表示
				  <View key={i} style={{backgroundColor:songword[i], width:width, height:width*0.08,marginTop:-width*0.08*[index]}}>
					 <Text style={{flex:1,color:'#000'}}>{songword[i]}</Text>
				  </View>
			  );
		   }
		
	   }
	   // 返回数组，不然怎么显示出来
	   return allChild;
     }
      //默认模态视图不可见
      //修改模态视图可见性
      setModalVisible() {
          this.state.modalVisible=!this.state.modalVisible
          this.setState({modalVisible:this.state.modalVisible});
      }
      setModalVisible1(visible) {
        this.setState({modalVisible1: visible});
    }
    rateA(ratea){
        this.state.rate=ratea;
        
        this.setState({
            rate:this.state.rate
            });
      }
		render() {
        let time = this.state;
        
		return (
			<View style={styles.container}>
			
				<View style={{width:width,height:0.05*height,flexDirection:'row'}}>
					<TouchableOpacity   style={{flex:1,marginLeft:'7%',justifyContent:'center'}}  onPress={()=>Actions.userinfor()}>
					<Image style={{width:'35%',height:'20%'}} source={require('../images/down.png')} />
					</TouchableOpacity>
					<View  style={{flex:5,justifyContent:'center', alignItems: 'center',flexDirection:'row'}}>
						<TouchableOpacity onPress={(event)=>{{
                        this.state.index=0;
                        this.moveclick();
                    }}}>
                        <Text style={{color:this.state.color[0]}}>推荐</Text>
                        </TouchableOpacity>
						<Text>  |  </Text>
                        <TouchableOpacity onPress={(event)=>{{
                        this.state.index=1;
                        this.moveclick();
                    }}}>
						<Text style={{color:this.state.color[1]}}>歌曲</Text>
                        </TouchableOpacity>
						<Text>  |  </Text>
                        <TouchableOpacity onPress={(event)=>{{
                        this.state.index=2;
                        this.moveclick();
                    }}}>
						<Text style={{color:this.state.color[2]}}>歌词</Text>
                        </TouchableOpacity>
					</View>
					<TouchableOpacity   style={{flex:1,marginLeft:'7%',justifyContent:'center'}} >
					<Image style={{width:'35%',height:'35%'}} source={require('../images/share.png')} />
					</TouchableOpacity>
				</View>
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
                        this.move();
                    }}}
                
                >
                    <View style={{width:width,height:0.95*height}}>
                        <ScrollView  style={{height:height*0.95,marginLeft:width*0.05}}
                        showsVerticalScrollIndicator={false}>
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
                    <View style={{width:width}}>
                    <View style={{width:width,height:0.95*height,marginTop:-0.015*height}}>
                        <View style={{flex:30,justifyContent:'center',}}>
                            <View style={{width:width*0.90,height:0.45*height,marginLeft:'7.5%'}}>
                                <Image style={{width:'95%',height:'100%',
                                borderRadius:width*0.05}} source={require('../images/2.png')} />
                            </View>
                        </View>
                        <View style={{width:width,height:0.2*height,flexDirection:'row',}} >
                            <View style={{flex:5,flexDirection:'column',marginLeft:'7%'}} >
                            <Text  style={{color:'#fff',fontSize:30,paddingBottom:'2%'}}>{this.state.music_name}</Text>
                            <Text  style={{color:'#ccc',paddingBottom:'2%'}}>{this.state.music_author}</Text>
                            <Text  style={{color:'#ccc'}}>{this.state.songword[this.state.nowsong]}</Text>
                            </View>
                            <TouchableOpacity   style={{width:0.15*width,height:0.15*height}} onPress={()=>{this.clickred()}}>
                            <Image style={{width:'46%',height:'20%'}} source={this.state.collect?require('../images/heart.png' ):require('../images/redheart.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{width:width,height:0.07*height,flexDirection:'row',justifyContent:'center', alignItems: 'center'}}>
                            <TouchableOpacity  style={{flex:1,marginLeft:'7%',marginTop:-0.05*height}} >
                                <Image style={{width:0.1*width,height:0.1*width}}  source={require('../images/mike.png' )} />
                            </TouchableOpacity>
                            <TouchableOpacity  style={{flex:1,marginLeft:'7%',marginTop:-0.05*height}} >
                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/download.png' )} />
                            </TouchableOpacity>
                            <TouchableOpacity  style={{flex:1,marginLeft:'7%',marginTop:-0.05*height}} >
                                <Image  style={{width:0.1*width,height:0.1*width}}  source={require('../images/remark.png' )} />
                            </TouchableOpacity>
                            <TouchableOpacity   style={{flex:1,marginLeft:'7%',marginTop:-0.05*height}}  onPress={() => { this.setModalVisible(true) }}>
                                <Image  style={{width:0.1*width,height:0.1*width}}  source={require('../images/ellipsis.png' )} />
                            </TouchableOpacity>
                            <View>
                            <Modal
                                animationType = {"slide"}
                                transparent = {true}
                                visible = {this.state.modalVisible}
                                >
                                    <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={() => { this.setModalVisible(false) }}>
                                    <View style = {{
                                            width:'100%',
                                                height:'50%',
                                                position:'absolute',
                                                top:'0%',
                                                justifyContent:"center",
                                                alignItems:"center",
                                                backgroundColor:'#000',
                                                opacity:0.5
                                            }}>
                                            </View>
                                            </TouchableOpacity>
                                        <View style = {{
                                            width:'100%',
                                                height:'50%',
                                                position:'absolute',
                                                top:'50%',
                                                justifyContent:"center",
                                                alignItems:"center",
                                                backgroundColor:'#181a19',
                                                opacity:1
                                            }}>
                                                <View style={{width:'100%',height:0.05*height,paddingLeft:width*0.04,marginBottom:0.01*height}}>
                                                    <Text  style={{color:'#fff',fontSize:15,marginTop:0.01*height}}>{this.state.music_name}</Text>
                                                </View>
                                                <ScrollView style={{width:'100%',height:0.35*height}}
                                                 horizontal={true}
                                                 showsHorizontalScrollIndicator={false}
                                                >
                                                    <View style={{width:0.2*width,}}>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} >
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.08*width}} source={require('../images/share.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>分享</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}} >
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.08*width}} source={require('../images/musicor.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>查看歌手</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{width:0.2*width,}}>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} >
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.08*width}} source={require('../images/addlist.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>加到歌单</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}} >
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.08*width}} source={require('../images/Album.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>查看专辑</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{width:0.2*width,}}>
                                                    <Modal
                                                        animationType = {"slide"}
                                                        transparent = {true}
                                                        visible = {this.state.modalVisible1}
                                                        >
                                                            <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={() => { this.setModalVisible1(false) }}>
                                                            <View style = {{
                                                                    width:'100%',
                                                                        height:'50%',
                                                                        position:'absolute',
                                                                        top:'0%',
                                                                        justifyContent:"center",
                                                                        alignItems:"center",
                                                                        backgroundColor:'#000',
                                                                        opacity:0.5
                                                                    }}>
                                                                    </View>
                                                                    </TouchableOpacity>
                                                                <View style = {{
                                                                    width:'100%',
                                                                        height:'50%',
                                                                        position:'absolute',
                                                                        top:'50%',
                                                                        paddingLeft:width*0.04,
                                                                        backgroundColor:'#181a19',
                                                                        opacity:1
                                                                    }}>
                                                                                <View style={{height:0.07*height,justifyContent:'center'}}>
                                                                                <Text style={{color:'#444',}}>选择播放速度</Text>
                                                                                </View>
                                                                                <TouchableOpacity style={{height:0.07*height}} onPress={() => { this.rateA(0.75) }}>
                                                                                    <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>0.75X</Text>
                                                                                    <Image style={{width:0.07*width,height:0.07*width,marginLeft:0.865*width,marginTop:-0.02*height}} source={this.state.rate==0.75?require('../images/True.png'):require('../images/none.png')} />
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity style={{height:0.07*height,flexDirection:'row'}}onPress={() => { this.rateA(1.0) }}>
                                                                                    <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>1.0X</Text>
                                                                                    <Image style={{width:0.07*width,height:0.07*width,marginLeft:0.8*width,marginTop:0.015*height}} source={this.state.rate==1.0?require('../images/True.png'):require('../images/none.png')} />
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity style={{height:0.07*height}} onPress={() => { this.rateA(1.25) }}>
                                                                                    <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>1.25X</Text>
                                                                                    <Image style={{width:0.07*width,height:0.07*width,marginLeft:0.865*width,marginTop:-0.034*height}} source={this.state.rate==1.25?require('../images/True.png'):require('../images/none.png')} />
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity style={{height:0.07*height}} onPress={() => { this.rateA(1.5) }}>
                                                                                    <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>1.5X</Text>
                                                                                    <Image style={{width:0.07*width,height:0.07*width,marginLeft:0.865*width,marginTop:-0.04*height}} source={this.state.rate==1.5?require('../images/True.png'):require('../images/none.png')} />
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity style={{height:0.07*height}} onPress={() => { this.rateA(2.0) }}>
                                                                                    <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>2.0X</Text>
                                                                                    <Image style={{width:0.07*width,height:0.07*width,marginLeft:0.865*width,marginTop:-0.04*height}} source={this.state.rate==2.0?require('../images/True.png'):require('../images/none.png')} />
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity style={{width:width,height:0.03*height,justifyContent:'center', alignItems: 'center'}} onPress={() => { this.setModalVisible1(false) }}>
                                                                                    <Text style={{color:'#fff',fontSize:15}}>取消</Text>
                                                                                </TouchableOpacity>
                                                                    </View>

                                                        </Modal>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}}onPress={() => { this.setModalVisible1(true) }} >
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.09*width,height:0.09*width}} source={require('../images/speed.jpg')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>倍速播放</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}} >
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.09*width,height:0.09*width}} source={require('../images/bill.jpg')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>歌词海报</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{width:0.2*width,}}>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} >
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.09*width,height:0.09*width}} source={require('../images/HQ.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>音质</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}} >
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.08*width}} source={require('../images/DM.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>驾驶模式</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{width:0.2*width,}}>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} >
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.07*width}} source={require('../images/PT.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>个性主题</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}} >
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.08*width}} source={require('../images/BM.jpg')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>背景音乐</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{width:0.2*width,}}>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} >
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.08*width}} source={require('../images/player.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>播放器样式</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}} >
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.07*width}} source={require('../images/Report.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>举报</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{width:0.2*width,}}>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} >
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.08*width}} source={require('../images/timing.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>定时关闭</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </ScrollView>
                                                <View style={{width:width,height:0.08*height,flexDirection:'row'}}>
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',width:0.15*width}} >
                                                            <View >
                                                                <Image style={{width:0.04*width,height:0.025*width}} source={require('../images/Mute.png')} />
                                                            </View>
                                                    </TouchableOpacity>
                                                    <Slider
                                                        width={'70%'}
                                                            ref='slider'
                                                            // disabled //禁止滑动
                                                            thumbTintColor={'#fff'}
                                                            maximumTrackTintColor={'#ccc'} //右侧轨道的颜色
                                                            minimumTrackTintColor={'#fff'} //左侧轨道的颜色
                                                            value={1}
                                                            maximumValue={2}
                                                            step={0.2}
                                                            onValueChange={(value) => {
                                                                this.setState({
                                                                    currentTime:value
                                                                })
                                                                        }
                                                                    }
                                                            onSlidingComplete={(value) => {
                                                                            this.state.volume=value
                                                                    }}
                                                        />
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',width:0.15*width}}  >
                                                            <View>
                                                                <Image style={{width:0.04*width,height:0.025*width}} source={require('../images/Lmax.png')} />
                                                            </View>
                                                        </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity style={{width:width,height:0.05*height,justifyContent:'center', alignItems: 'center',marginTop:-0.01*height}} onPress={() => { this.setModalVisible(false) }}>
                                                    <Text style={{color:'#fff',fontSize:15}}>取消</Text>
                                                </TouchableOpacity>
                                            </View>

                                </Modal>
                            </View>
                           
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
                                <Text style={{color:'#fff'}}>{this.state.nowMin}:{this.state.nowSec}</Text>
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
                                volume={this.state.volume}
                                playInBackground={true}
                                onProgress={e => this.setTime(e)}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.play()} style={{width:0.17*width,height:0.17*width,marginTop:-0*width,color:'#fff'}}>
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
                    </View>
                    <View style={{width:width,height:height*0.95}}>
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
                            showsVerticalScrollIndicator={false}
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
                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,marginTop:-0.05*width,color:'#fff'}}>
                                <Image style={{width:0.1*width,height:0.1*width}} source={this.state.paused?require('../images/broadcast.png' ):require('../images/suspend.png')} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
               </ScrollView>
                	
                <PlayList playlistvisible = {this.state.playlistvisible} backcallback = {this._backplay} list = {this.state.songs}/>
      

        </View>
	

		);
		}
		}
		const styles = StyleSheet.create({
            box:{
                backgroundColor:'#272928',
                justifyContent:'center', alignItems: 'center',
                borderRadius:width*0.04,
                width:width*0.13,
                height:width*0.13
            },
			container: {
			flex: 10,
			backgroundColor: '#888',
            }
           
            });
