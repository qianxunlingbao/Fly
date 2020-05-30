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
    DeviceEventEmitter,
    ToastAndroid,
    ImageBackground
} from 'react-native';
import Video from 'react-native-video';
import {Actions} from 'react-native-router-flux';
// import { Slider } from 'react-native-elements'
import Sound from 'react-native-sound'
import Swiper from 'react-native-swiper';
import PlayList from './PlayList';
import {nplaylist,likelist,recentplay} from './DS'
let data = require('./data');
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
            songword:[''],
            volume:1,
            sliderValuevolume: 0,    //Slide的value
            modalVisible1:false,
            modalVisible2:false,
            modalVisible3:false,
            HQ:['标准品质（2.7M）','HQ高品质（6.6M）','标准品质（4.7M）','HQ高品质（11.9M）'],
            HQT:true,
            modalVisible4:false,
            xuanzhong:[''],
            op:true,
            modalVisible5:false,
            modalVisible6:false,
            modalVisible7:false,
            modalVisible8:false,
            modalVisible9:false,
            modalVisible10:false,
            modalVisible11:false,
            modalVisible12:false,
            checksong:[],
            bc:require('../images/normal.png'),
            backc:[require('../images/1.png'),require('../images/2.png'),require('../images/3.png')],
            fontcolor:'black',
            nowfengmian:['方形封面',require('../images/ye1.png'),width*0.05],
            checkyemian:[['方形封面',require('../images/ye1.png'),width*0.05],['旋转封面',require('../images/ye2.png'),width*0.49],['静态封面',require('../images/ye3.png'),width*0.49]],
            firstfengmian:['方形封面',require('../images/2.jpg'),width*0.05,0.4*width,width*0.05],
            Rotate:'0deg',
            movepicture:0,
            Rotategif:'0deg',
            clickgif:true,
            indexpicture:0,
            xuangif:require('../images/normal.png'),
            gifname:['摩天轮','光炫','打击','射线'],
            nowbc:require('../images/31.gif'),
            nowbccheck:'',
            nowgifname:'',
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
            intnetphotos:['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1963985074,3493528764&fm=26&gp=0.jpg',
            'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3427169086,3097665420&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3793406337,1193064806&fm=26&gp=0.jpg',
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1436323633,2102011592&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2927530700,1933714491&fm=26&gp=0.jpg',
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1960823218,2620208391&fm=15&gp=0.jpg',
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3587615503,3856830858&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=318153788,647856491&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2363665936,3469093747&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3466220452,2116854941&fm=26&gp=0.jpg'],
            datalistname:['藏在扬声器里的华语经典',
            '父爱 | 那个陪你长大的背影',
            '[华语]最难以割舍的单曲...',
            '作为戏精你必须要听的歌',
            '时光故事汇：回放95后',
            '[华语情歌]我的一颗心...]',
            '最火的ACG你值得一听',
            'key社新出BGM必须要听',
            '东方project神曲'],
            listname:['藏在扬声器里的华语经典',
            '父爱 | 那个陪你长大的背影',
            '[华语]最难以割舍的单曲...',
            '作为戏精你必须要听的歌',
            '时光故事汇：回放95后',
            '[华语情歌]我的一颗心...]',
            '最火的ACG你值得一听',
            'key社新出BGM必须要听',
            '东方project神曲'],
            listmusic:[
        'http://music.163.com/song/media/outer/url?id=874229.mp3'
        ,'http://music.163.com/song/media/outer/url?id=4946902.mp3',
        'http://music.163.com/song/media/outer/url?id=28699446.mp3',
        'http://music.163.com/song/media/outer/url?id=849691.mp3',
        'http://music.163.com/song/media/outer/url?id=731250.mp3',
        'http://music.163.com/song/media/outer/url?id=785902.mp3',
        'http://music.163.com/song/media/outer/url?id=22707008.mp3',
        'http://music.163.com/song/media/outer/url?id=36019301.mp3',
        'http://music.163.com/song/media/outer/url?id=1319265452.mp3'
        ,'http://music.163.com/song/media/outer/url?id=1313898281.mp3'
        ,'http://music.163.com/song/media/outer/url?id=1308556737.mp3'
        ,'http://music.163.com/song/media/outer/url?id=549680151.mp3'],
        nowintentphto:'',
        nowtext:'',
        nowcheckmuisc:'',
        textlist:[['你若成风','许嵩'],['当你老了','赵照']
        ,['你的故事','以冬'],['谢庸一生','池年'],['老    街    ','李荣浩']
        ,['如果当时','许嵩'],['未见青老','以冬'],['如约而至','许嵩']
        ,['铿锵玫瑰','田震'],['像风一样','薛之谦'],['好几年   ','刘心'],['入    海    ','毛不易']],
        textlist1:[['さくらの','38BEETS']
        ,['さくらの','松田彬人'],['未见青山','以冬'],['思い出を','坂本昌一郎']
        ,['幽雅に咲','TAMUSIC'],['雲流れ  ','Foxtail-Grass'],['潮鳴り    ','折戸伸治'],['First          ','どんまる'],['魔禁某科','Kyle Xian'],['七月新番','Kyle Xian']
        ,['七月新上','Kyle Xian'],['女王蜂    ','Kyle Xian']],
        nowlisttext:[''],
        nowlisttext1:[''],
        geshou:require('../images/xu.png'),
    opacitybca:1,
    musicauthorp:[require('../images/xu.png'),require('../images/zhao.png'),
    require('../images/tian.png'),require('../images/yi.png'),require('../images/xue.png')
    ,require('../images/mao.png'),require('../images/liu.png'),require('../images/chi.png'),require('../images/li.png')],
    faxing:'',
    music_authorph:'',
    music_authorph1:'',
    fontcolor:'#fff',
    
        }
    }
    //设置进度条和播放时间的变化
   

    setTime(dat) {
        let sliderValue = parseInt(this.state.currentTime);
        if(this.state.firstfengmian[0]=='旋转封面')
        {
            
            
            if(this.state.paused){
                
                var rotate
                 rotate=sliderValue%10
                 this.state.firstfengmian[1]=data.photo[this.state.songs[this.state.currentIndex].music_id-1];
                 this.state.firstfengmian[3]=0.4*width
                 this.state.Rotate=rotate*36+'deg'
            }
          
          
        }
        else{
            if(this.state.songs[this.state.currentIndex].music_id==0){
                this.state.firstfengmian[1]=data.photo[this.state.songs[this.state.currentIndex].music_id-1];
                this.state.firstfengmian[3]=0.4*width
                
                this.state.Rotate=0+'deg'
            }
            else{
                this.state.firstfengmian[1]=data.photo[this.state.songs[this.state.currentIndex].music_id-1];
                this.state.firstfengmian[3]=0.72*width
                this.state.Rotate=0+'deg'
            }
       
        }
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
        currentTime: dat.currentTime,
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
        nplaylist.push(that.state.songs[index]);
        recentplay.push(that.state.songs[index]);
        //加载歌曲
        this.state.songword=data.musiclist[that.state.songs[index].music_id-1];
        this.state.time=data.musictime[that.state.songs[index].music_id-1];
        this.state.faxing=data.musictimes[that.state.songs[index].music_id-1];
        this.state.music_authorph1=data.photo[that.state.songs[index].music_id-1];
        this.state.firstfengmian[1]=data.photo[that.state.songs[index].music_id-1];
        this.state.music_authorph=data.musicphto[that.state.songs[index].music_id-1];

        if(that.state.songs[index].music_id-1==0){
            this.state.firstfengmian[1]=this.state.music_authorph1
            this.state.firstfengmian[3]=0.4*width
        }
        else{
            this.state.firstfengmian[1]=data.photo[that.state.songs[index].music_id-1];
            this.state.firstfengmian[3]=0.72*width
        }
				let bitrate = that.state.songs[index].music_value;
				let music_name=that.state.songs[index].music_name;
                let music_author=that.state.songs[index].music_author;
                let music=that.state.songs[index].music_value;
                that.setState({
                    music_name: music_name,     //歌曲名
                    music_author: music_author,   //歌手
                    file_link: bitrate,   //播放链接,
                    currentIndex:index,
                    music:music,
                   
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
		  },()=>{that.loadSongInfo(that.state.songs.length - 1)})
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
        var that = this;
        AsyncStorage.getItem('playlist').then(
            (value) => {
                that.setState({
                    songs : JSON.parse(value) == null ? [] : JSON.parse(value)
                },()=>that.onGetMusicLists())
            }
        )
        
        this.myplaylist = DeviceEventEmitter.addListener('myplaylist',()=>{
            this.setState({
                playlistvisible:false
            })
        })
    }
    // 上下一曲
    nextAction = (index) => {
        lyrObj = [];
        if (index == this.state.songs.length) {
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
        this.state.paused=!this.state.paused
        if(this.state.currentTime>0&&this.state.firstfengmian[0]=='旋转封面'){
            this.state.firstfengmian[1]=require('../images/2.gif')
            let sliderValue = parseInt(this.state.currentTime);
            var rotate=sliderValue%10
            this.state.Rotategif=36*rotate+'deg'
            this.state.firstfengmian[3]=0.27*width
        }
       
        this.setState({
            paused:this.state.paused,
            rate:this.state.rate
        })

        DeviceEventEmitter.emit('changegroup',{uri:`http://49.235.231.110:8802/musicimage/${this.state.songs[this.state.currentIndex].music_id + 1}.JPG`},`${this.state.songs[this.state.currentIndex].music_name}-${this.state.songs[this.state.currentIndex].music_author}`)
    }
    componentWillUnmount() {
        this.myplaylist&&this.myplaylist.remove();
        AsyncStorage.setItem('playlist',JSON.stringify(this.state.songs))
        DeviceEventEmitter.emit('likeandrecent');
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
        },()=>{
            if(this.state.collect){
                likelist.push(this.props.data);
            }
        })
    }
    renderChildView(p){
        // 数组
        if(p==undefined)
        p=0
        var allChild = [];
if(this.state.songword==''){
	this.state.songword=data.musiclist[0];
		this.state.time=data.musictime[0];
}
	
		var index=0;
        // 遍历
      
        for(var j=0;j<this.state.time.length;j++){
            if(this.state.time[j]==this.state.nowMin+':'+this.state.nowSec)
            {
                this.state.nowsong=j
            }
        }
	   for(var i=0; i<this.state.time.length; i++){
         
            var c=width*0.1

            if(this.state.nowsong==i){

                allChild.push(
                    //  循环排列的view中必须有唯一表示
                      <View key={i} style={{ width:width, height:width*0.08,marginTop:-width*0.08*[index]}}>
                         <Text style={{flex:1,color:this.state.fontcolor,fontSize:20}}>{this.state.songword[i]}</Text>
                      </View>
                  );
               }
               else{
                allChild.push(
                    //  循环排列的view中必须有唯一表示
                      <View key={i} style={{ width:width, height:width*0.08,marginTop:-width*0.08*[index]}}>
                         <Text style={{flex:1,color:'#000',fontSize:12}}>{this.state.songword[i]}</Text>
                      </View>
                  );
               }
           
		   
		
	   }
	   // 返回数组，不然怎么显示出来
	   return allChild;
     }
      setModalVisible() {
          this.state.modalVisible=!this.state.modalVisible
          this.setState({modalVisible:this.state.modalVisible});
      }
      setModalVisible1(visible) {
        this.setState({modalVisible1: visible});
    }
    setModalVisible2(visible) {

        this.state.modalVisible=!this.state.modalVisible
            this.state.modalVisible2=visible
            this.setState({
                modalVisible:this.state.modalVisible,
                modalVisible2: this.state.modalVisible2
            });
    }
    rateA(ratea){
        this.state.rate=ratea;
        this.setState({
            rate:this.state.rate
            });
      }
      HQ(i){
        if(i==0)
        { 
            this.state.HQT=false
        }
        else{
            this.state.HQT=true
        }
        this.setState({
            HQT:this.state.HQT
        })
      }
      setModalVisible3(visible) {
        this.setState({modalVisible3: visible,
      });
    }
    renderChildView1(i){
        for(var j=0;j<this.state.songword.length;j++){
            if(this.state.xuanzhong[j]!='#527d50'){
                this.state.xuanzhong[j]=''
                this.state.checksong[j]=''
            }

           
        }
         if(this.state.xuanzhong[i]=='#527d50')
         {
            
             this.state.xuanzhong[i]='#487346'
             this.state.checksong[i]=''
         }
         else{
            this.state.xuanzhong[i]='#527d50'
            this.state.checksong[i]=this.state.songword[i]

         }

        this.setState({
            op:!this.state.op
        })
     }
      //修改模态视图可见性
      setModalVisible4(visible,b) {
       if(b==1){
        this.state.firstfengmian[0]=this.state.nowfengmian[0]
        this.state.firstfengmian[2]=this.state.nowfengmian[2]
        this.state.firstfengmian[4]= this.state.firstfengmian[2]
       }
        this.setState({modalVisible4: visible,
      });
    }
    setModalVisible5(visible) {
        this.setState({modalVisible5: visible,
      });
    }
    fengmian(f){
        if(f!=undefined){
            if(f==0)
            {
                this.state.nowfengmian[0]=this.state.checkyemian[0][0]
                this.state.nowfengmian[1]=this.state.checkyemian[0][1]
                this.state.nowfengmian[2]=this.state.checkyemian[0][2]

            }
            if(f==1)
            {
                this.state.nowfengmian[0]=this.state.checkyemian[1][0]
                this.state.nowfengmian[1]=this.state.checkyemian[1][1]
                this.state.nowfengmian[2]=this.state.checkyemian[1][2]

            }
            if(f==2)
            {
                this.state.nowfengmian[0]=this.state.checkyemian[2][0]
                this.state.nowfengmian[1]=this.state.checkyemian[2][1]
                this.state.nowfengmian[2]=this.state.checkyemian[2][2]

            }
        }
        this.setState({nowfengmian: this.state.nowfengmian,
        });
    }
    setModalVisible6(visible) {
        if(this.state.backc==this.state.xuangif)
        this.state.nowbccheck='正在使用'
        else{
            this.state.nowbccheck='立即使用'

        }
      if(this.state.nowbccheck=='正在使用')
      {
      this.state.bc=this.state.xuangif
          this.state.opacitybca=0.5
      }

        this.setState({modalVisible6: visible,
      });
    }
    setModalVisible7(visible,a) {
     if(a==31){this.state.xuangif=require('../images/31.gif')
    this.state.nowgifname=this.state.gifname[0]}
     if(a==32){this.state.xuangif=require('../images/32.gif')
     this.state.nowgifname=this.state.gifname[1]}
     if(a==33){this.state.xuangif=require('../images/33.gif')
     this.state.nowgifname=this.state.gifname[2]}
     if(a==34){this.state.xuangif=require('../images/34.gif')
     this.state.nowgifname=this.state.gifname[3]}
     if(a==1){this.state.xuangif=require('../images/d1.jpg')
    this.state.nowgifname=this.state.gifname[0]}
     if(a==2){this.state.xuangif=require('../images/d2.jpg')
     this.state.nowgifname=this.state.gifname[1]}
     if(a==3){this.state.xuangif=require('../images/d3.jpg')
     this.state.nowgifname=this.state.gifname[2]}
     if(a==4){this.state.xuangif=require('../images/d4.jpg')
     this.state.nowgifname=this.state.gifname[3]}
     if(a==5){this.state.xuangif=require('../images/d5.jpg')
    this.state.nowgifname=this.state.gifname[0]}
     if(a==6){this.state.xuangif=require('../images/d6.jpg')
     this.state.nowgifname=this.state.gifname[1]}
     if(a==7){this.state.xuangif=require('../images/d7.jpg')
     this.state.nowgifname=this.state.gifname[2]}
     if(a==8){this.state.xuangif=require('../images/d8.jpg')
     this.state.nowgifname=this.state.gifname[3]}
     this.setState({modalVisible7: visible,
     });
    }
    setModalVisible8(visible,a) {
       this.state.nowintentphto=this.state.intnetphotos[a]
       this.state.nowtext=this.state.listname[a]

      if(this.state.listname[0]==this.state.datalistname[6]){
          for(var i=0;i<this.state.textlist1.length;i++){
            this.state.nowlisttext[i]=this.state.textlist1[i][0]
            this.state.nowlisttext1[i]=this.state.textlist1[i][1]
            
          }
       }
       else{
        for(var i=0;i<this.state.textlist1.length;i++){
            this.state.nowlisttext[i]=this.state.textlist[i][0]
            this.state.nowlisttext1[i]=this.state.textlist[i][1]

          }
    }
        this.setState({modalVisible8: visible,
        });
       }
       setModalVisible9(visible,a) {
        
        this.setState({modalVisible9: visible,
        });
       }
       setModalVisible10(visible,a) {
        musicauthorp:[require('../images/xu.png'),require('../images/zhao.png'),
        require('../images/tian.png'),require('../images/yi.png'),require('../images/xue.png')
        ,require('../images/mao.png'),require('../images/liu.png')]
        if(this.state.music_author=='许嵩')
        this.state.geshou=this.state.musicauthorp[0]
        if(this.state.music_author=='赵照')
        this.state.geshou=this.state.musicauthorp[1]
        if(this.state.music_author=='田震')
        this.state.geshou=this.state.musicauthorp[2]
        if(this.state.music_author=='以冬')
        this.state.geshou=this.state.musicauthorp[3]
        if(this.state.music_author=='薛之谦')
        this.state.geshou=this.state.musicauthorp[4]
        if(this.state.music_author=='毛不易')
        this.state.geshou=this.state.musicauthorp[5]
        if(this.state.music_author=='刘心')
        this.state.geshou=this.state.musicauthorp[6]
        if(this.state.music_author=='池年')
        this.state.geshou=this.state.musicauthorp[7]
        if(this.state.music_author=='李荣浩')
        this.state.geshou=this.state.musicauthorp[8]
        this.setState({modalVisible10: visible,
        });
       }
       setModalVisible11(visible,a) {
        this.state.nowintentphto=this.state.intnetphotos[a]
       this.state.nowtext=this.state.listname[a]

      if(this.state.listname[0]==this.state.datalistname[6]){
          for(var i=0;i<this.state.textlist1.length;i++){
            this.state.nowlisttext[i]=this.state.textlist1[i][0]
            this.state.nowlisttext1[i]=this.state.textlist1[i][1]
            
          }
       }
       else{
        for(var i=0;i<this.state.textlist1.length;i++){
            this.state.nowlisttext[i]=this.state.textlist[i][0]
            this.state.nowlisttext1[i]=this.state.textlist[i][1]

          }
    }
        this.setState({modalVisible11: visible,
        });
       }
    checkphto(){
        if(this.state.backc==this.state.xuangif)
        this.state.nowbccheck='正在使用'
        else{
            this.state.nowbccheck='立即使用'
            this.state.backc=this.state.xuangif
        }
        this.setState({nowbccheck:this.state.nowbccheck,
        });

    }
    setModalVisible12(visible,a) {
        
        this.setState({modalVisible12: visible,
        });
       }
    fontcolor(fc){
        if(fc!=undefined){
            this.state.fontcolor=fc
            this.setState({
                fc:this.state.fontcolor
            })
        }
     }
checkmusic(a){
    var a=a
    if(a!=undefined){
        
       if(this.state.listname[0]==this.state.datalistname[6]){
 
            for(var i=0;i<12;i++){
                if(a==i){
                    this.state.music=this.state.listmusic[i];
                    this.state.music_author=this.state.nowlisttext1[a]
                    this.state.music_name=this.state.nowlisttext[a]
                    this.state.songword=['纯音乐请欣赏']
            this.state.time=['00:00']
                }
            }
           
        }
        else{
            if(a==1){
                this.state.music='https://music.163.com/song/media/outer/url?id=5255987.mp3'

            }
            if(a==2){
                this.state.music='https://music.163.com/song/media/outer/url?id=26090100.mp3'

    
            }
            if(a==3){
                this.state.music='https://music.163.com/song/media/outer/url?id=418990013.mp3'

            }
            if(a==4){
            this.state.music='https://music.163.com/song/media/outer/url?id=537578259.mp3'

            }
            if(a==5){
                this.state.music='https://music.163.com/song/media/outer/url?id=133998.mp3'

            }
            
            if(a==6){
                this.state.music='https://music.163.com/song/media/outer/url?id=167870.mp3'
    
            }
            if(a==7){
                this.state.music='https://music.163.com/song/media/outer/url?id=453175619.mp3'
            }       
            if(a==8){
                this.state.music='https://music.163.com/song/media/outer/url?id=573384240.mp3'
    
            }
            if(a==9){
                this.state.music='https://music.163.com/song/media/outer/url?id=293769.mp3'
    
            }
            if(a==10){
                this.state.music='https://music.163.com/song/media/outer/url?id=516657051.mp3'
    
            }
            if(a==11){
                this.state.music='https://music.163.com/song/media/outer/url?id=516657051.mp3'
    
            }
            if(a==12){
                this.state.music='https://music.163.com/song/media/outer/url?id=1449782341.mp3'
    
            }
            this.state.songword=data.musiclist[a-1];
            this.state.time=data.musictime[a-1];
            this.state.music_author=this.state.songs[a-1].music_author
            this.state.music_name=this.state.songs[a-1].music_name
        }
        this.setState({muisc:this.state.music,
        });
    }
    
}
qiehuan(){
    if(this.state.listname[0]==this.state.datalistname[0]){
        this.state.intnetphotos[0]=this.state.intnetphoto[3]
        this.state.intnetphotos[1]=this.state.intnetphoto[4]

        this.state.intnetphotos[2]=this.state.intnetphoto[5]


        this.state.listname[0]=this.state.datalistname[3]
        this.state.listname[1]=this.state.datalistname[4]
    
        this.state.listname[2]=this.state.datalistname[5]
    }
    else if(this.state.listname[0]==this.state.datalistname[3]){
        this.state.listname[0]=this.state.datalistname[6]
        this.state.listname[1]=this.state.datalistname[7]
    
        this.state.listname[2]=this.state.datalistname[8]
        this.state.intnetphotos[0]=this.state.intnetphoto[6]
        this.state.intnetphotos[1]=this.state.intnetphoto[7]

        this.state.intnetphotos[2]=this.state.intnetphoto[8]
    }
    else{
        this.state.listname[0]=this.state.datalistname[0]
        this.state.listname[1]=this.state.datalistname[1]
    
        this.state.listname[2]=this.state.datalistname[2]
        this.state.intnetphotos[0]=this.state.intnetphoto[0]
        this.state.intnetphotos[1]=this.state.intnetphoto[1]

        this.state.intnetphotos[2]=this.state.intnetphoto[2]

    }
    this.setState({intnetphotos:this.state.intnetphotos,
    });

}
		render() {
		return (
			<View style={styles.container}>
			<ImageBackground style={{flex:1}}
                                                    source={this.state.bc}>
				<View style={{width:width,height:0.05*height,flexDirection:'row'}}>
					<TouchableOpacity   style={{flex:1,marginLeft:'7%',justifyContent:'center'}}  onPress={()=>Actions.pop()}>
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
					<TouchableOpacity   style={{flex:1,marginLeft:'7%',justifyContent:'center'}}  onPress={() => { this.setModalVisible3(true) }}>
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
                            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02,opacity:this.state.opacitybca}}>
                            <Text style={{fontSize:25,color:'#fff'}}>{this.state.music_name}</Text>
                            <Text style={{fontSize:10,color:'#ccc'}}>{this.state.faxing} 歌曲详情</Text>
                            <View style={{borderTopColor:'#fff',borderTopWidth:1,marginTop:height*0.01,marginBottom:height*0.01}}>
                            </View>
                            <View style={{flexDirection:'row'}}>
                               <TouchableWithoutFeedback   onPress={() => { this.setModalVisible10(true) }}>
                                   <View style={{flexDirection:'row',alignItems:'center'}}>
                                   <Image style={{width:0.05*width,height:0.05*width}} source={this.state.music_authorph} />

                                    <Text style={{fontSize:13,color:'#fff',marginLeft:0.01*width}}>歌手：{this.state.music_author}</Text>
                                   </View>


                               </TouchableWithoutFeedback >
                               <TouchableWithoutFeedback   onPress={() => { this.setModalVisible11(true) }}>
                               <View style={{flexDirection:'row',alignItems:'center',marginLeft:0.3*width}}>
                               <Image style={{width:0.05*width,height:0.05*width}} source={this.state.music_authorph1} />

                                    <Text style={{fontSize:13,color:'#fff',marginLeft:0.01*width}}>  专辑：{this.state.music_name}</Text>

                               </View>
                               
                               </TouchableWithoutFeedback>

                            </View>
                            </View>
                            <View style={{height:height*0.2,backgroundColor:'#999',width:width*0.9,borderRadius:width*0.02
                            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02,opacity:this.state.opacitybca}}>
                            <Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>相关歌曲</Text>
                            <Text style={{fontSize:18,color:'#ccc',marginBottom:height*0.01}}>2015年03月27日发行  歌曲详情</Text>
                            <Text style={{fontSize:18,color:'#ccc',marginBottom:height*0.01}}>别哭，我最爱的人-水木年华</Text>
                            <Text style={{fontSize:18,color:'#ccc',marginBottom:height*0.01}}>天空之城(Live)-蒋国豪</Text>
                            <Text style={{fontSize:18,color:'#ccc',marginBottom:height*0.01}}>未给姐姐递出的信-赵雷</Text>
                            </View>
                            <View style={{height:height*0.12,backgroundColor:'#999',width:width*0.9,borderRadius:width*0.02
                            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02,opacity:this.state.opacitybca}}>
                            <Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>其他版本</Text>
                            <Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>{this.state.music_name}（原唱：{this.state.music_author}）</Text>
                            <Text style={{fontSize:13,color:'#ccc',marginBottom:height*0.01}}>秋叶牧阳：青春之歌</Text>                          
                            </View>
                            <View style={{height:height*0.35,width:width*0.9,borderRadius:width*0.02
                            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02}}>
                                <View style={{flexDirection:'row',marginBottom:height*0.01}}>
                                <Text style={{fontSize:18,color:'#fff'}}>相关歌单</Text>
                            <TouchableOpacity   style={{flexDirection:'row',alignItems: 'center',marginLeft:0.55*width}}  onPress={() => { this.qiehuan() }}>
                            <Image style={{width:0.05*width,height:0.05*width}} source={require('../images/qiehuan.png' )} />
                          
                                <Text style={{fontSize:18,color:'#fff'}}>换一批</Text>
                            </TouchableOpacity>                                
                               
                                </View>
                            <TouchableOpacity   style={{width:width*0.8,flexDirection:'row',height:0.15*width,alignItems: 'center',marginBottom:0.03*width}}  onPress={() => { this.setModalVisible8(true,0) }}>
                                <Image  style={{width:0.15*width,height:0.15*width,borderRadius:0.01*width}} source={{uri:this.state.intnetphotos[0]}} />
                                <Text style={{color:'#fff',marginLeft:0.03*width}}>{this.state.listname[0]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity   style={{width:width*0.8,flexDirection:'row',height:0.15*width,alignItems: 'center',marginBottom:0.03*width}}  onPress={() => { this.setModalVisible8(true,1) }}>
                                <Image  style={{width:0.15*width,height:0.15*width,borderRadius:0.01*width}}  source={{uri:this.state.intnetphotos[1]}} />
                                <Text style={{color:'#fff',marginLeft:0.03*width}}>{this.state.listname[1]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity   style={{width:width*0.8,flexDirection:'row',height:0.15*width,alignItems: 'center',marginBottom:0.03*width}}  onPress={() => { this.setModalVisible8(true,2) }}>
                                <Image  style={{width:0.15*width,height:0.15*width,borderRadius:0.01*width}}  source={{uri:this.state.intnetphotos[2]}}/>
                                
                                <Text style={{color:'#fff',marginLeft:0.03*width}}>{this.state.listname[2]}</Text>
                            </TouchableOpacity>
                          
                            </View>
                            <View style={{height:height*0.3,width:width*0.9,borderRadius:width*0.02
                            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02}}>
                            <Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>相关视频</Text> 
                            <TouchableOpacity   style={{width:width*0.8,flexDirection:'row',height:0.15*width,alignItems: 'center',marginBottom:0.03*width}}  onPress={()=>{Actions.reportss({id:[this.state.music_name,this.state.music_author,this.state.songs[this.state.currentIndex].music_id-1]})}}>
                                <Image  style={{width:0.3*width,height:0.15*width,borderRadius:0.01*width}}  source={{uri:this.state.intnetphoto[0]}} />
                                <View>
                                <Text style={{color:'#fff',marginLeft:0.03*width}}>{this.state.music_name}</Text>
                                <Text style={{color:'#fff',marginLeft:0.03*width}}>{this.state.music_author}</Text>
                                </View>
                                
                            </TouchableOpacity>
                            <TouchableOpacity   style={{width:width*0.8,flexDirection:'row',height:0.15*width,alignItems: 'center',marginBottom:0.03*width}} onPress={()=>{Actions.reportss({id:[this.state.music_name,this.state.music_author,this.state.songs[this.state.currentIndex].music_id-1]})}}>
                                <Image  style={{width:0.3*width,height:0.15*width,borderRadius:0.01*width}}  source={{uri:this.state.intnetphoto[1]}} />
                                <View>
                                <Text style={{color:'#fff',marginLeft:0.03*width}}>{this.state.music_name}（KTV版）</Text>
                                <Text style={{color:'#fff',marginLeft:0.03*width}}>{this.state.music_author}</Text>
                                </View>
                               
                            </TouchableOpacity>

                            </View>
                        </View>
                        </ScrollView>
                    </View>
                    <View style={{width:width}}>
                    <View style={{width:width,height:0.95*height,marginTop:-0.015*height,}}>
                        <View style={{flex:30,justifyContent:'center',alignItems: 'center'}}>
                            <View style={{width:width*0.72,height:width*0.72,justifyContent:'center',alignItems: 'center',backgroundColor:'#000',borderRadius:this.state.firstfengmian[2]}}>
                               
                                <Image style={{width:this.state.firstfengmian[3],height:this.state.firstfengmian[3],borderRadius:this.state.firstfengmian[4],transform:[{rotate:this.state.paused?this.state.Rotate:this.state.Rotategif }]}} source={this.state.firstfengmian[1]} />

                            </View>
                        </View>
                        <View style={{width:width,height:0.2*height,flexDirection:'row',}} >
                            <View style={{flex:5,flexDirection:'column',marginLeft:'7%'}} >
                            <Text  style={{color:'#fff',fontSize:30,paddingBottom:'2%'}}>{this.state.music_name}</Text>
                            <Text  style={{color:'#ccc',paddingBottom:'2%'}}>{this.state.music_author}</Text>
                            <Text  style={{color:'#ccc'}}>{this.state.songword[this.state.nowsong]}</Text>
                            </View>
                            <TouchableOpacity   style={{width:0.15*width,height:0.15*height}} onPress={()=>{this.clickred()}}>
                            <Image style={{width:'46%',height:'20%'}} source={this.state.collect?require('../images/redheart.png'):require('../images/heart.png' )} />
                            </TouchableOpacity>
                        </View>
                        <View style={{width:width,height:0.07*height,flexDirection:'row',justifyContent:'center', alignItems: 'center'}}>

                            <TouchableOpacity  style={{width:0.1*width,height:0.1*width}} onPress={()=>{Actions.PingLun()}}>
                                <Image  style={{width:0.1*width,height:0.1*width}}  source={require('../images/remark.png' )} />
                            </TouchableOpacity>
                            <TouchableOpacity   style={{width:0.1*width,height:0.1*width,marginLeft:0.5*width}}  onPress={() => { this.setModalVisible(true) }}>
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
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}}  onPress={() => { this.setModalVisible3(true) }}>
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.08*width}} source={require('../images/share.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>分享</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}}   onPress={() => { this.setModalVisible10(true) }}>
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
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}}   onPress={() => { this.setModalVisible11(true) }}>
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
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}} onPress={()=>Actions.songwordpost({music:this.state.songs[this.state.currentIndex].music_id-1})}>
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.09*width,height:0.09*width}} source={require('../images/bill.jpg')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>歌词海报</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{width:0.2*width,}}>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} onPress={() => { this.setModalVisible2(true) }}>
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.09*width,height:0.09*width}} source={require('../images/HQ.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>音质</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}}   onPress={() => { this.setModalVisible5(true) }}>
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.08*width}} source={require('../images/DM.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>驾驶模式</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{width:0.2*width,}}>
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}}    onPress={() => { this.setModalVisible6(true) }}>
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.07*width}} source={require('../images/PT.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>个性主题</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}}  onPress={()=>Actions.timestop()}>
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.08*width}} source={require('../images/timing.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>定时关闭</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{width:0.2*width,}}>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}}  onPress={() => { this.setModalVisible4(true) }}>
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.08*width}} source={require('../images/player.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>播放器样式</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}} onPress={()=>Actions.report({music_name:this.state.songs[this.state.currentIndex].music_id-1})}>
                                                            <View style={styles.box}>
                                                                <Image style={{width:0.08*width,height:0.07*width}} source={require('../images/Report.png')} />
                                                            </View>
                                                            <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>举报</Text>
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
                                onLoad={(data) => {this.setDuration(data);ToastAndroid.show('加载完成',200);this.play()}}
                                onLoadStart = {()=>ToastAndroid.show('加载中',200)}
                                volume={this.state.volume}
                                playInBackground={true}
                                playWhenInactive ={true}
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

                            <View style={{width:width, alignItems: 'center',flexDirection:'row'}}>
                                <TouchableOpacity onPress={() => this.setModalVisible12(true)} style={{width:0.1*width,marginLeft:width*0.2,height:0.1*width,marginTop:-0.05*width,color:'#fff'}}>
                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/wordshe.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,marginLeft:width*0.4,height:0.1*width,marginTop:-0.05*width,color:'#fff'}}>
                                <Image style={{width:0.1*width,height:0.1*width}} source={this.state.paused?require('../images/broadcast.png' ):require('../images/suspend.png')} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
               </ScrollView>
               <View>
               <Modal
                    animationType = {"slide"}
                    transparent = {true}
                    visible = {this.state.modalVisible2}
                    >
                        <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={() => { this.setModalVisible2(false) }}>
                        <View style = {{
                                width:'100%',
                                    height:'80%',
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
                                    height:'20%',
                                    position:'absolute',
                                    top:'80%',
                                    paddingLeft:width*0.04,
                                    backgroundColor:'#181a19',
                                    opacity:1
                                }}>
                                            <TouchableOpacity style={{height:0.07*height,flexDirection:'row'}}onPress={() => { this.HQ(0) }}>
                                                <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>{this.state.HQ[0]}</Text>
                                                <Image style={{width:0.07*width,height:0.07*width,marginLeft:0.6*width,marginTop:height*0.015}} source={this.state.HQT?require('../images/none.png'):require('../images/True.png')} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{height:0.07*height}} onPress={() => { this.HQ(1) }}>
                                                <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>{this.state.HQ[1]}</Text>
                                                <Image style={{width:0.07*width,height:0.07*width,marginLeft:0.865*width,marginTop:-0.034*height}} source={this.state.HQT?require('../images/True.png'):require('../images/none.png')} />
                                            </TouchableOpacity>
                                </View>
                    </Modal>
               </View>
               <View>
                    <Modal
                    animationType = {"slide"}
                    transparent = {true}
                    visible = {this.state.modalVisible3}
                    >  
                    <View style = {{
                            width:'100%',
                                height:'100%',
                                position:'absolute',
                                top:'0%',
                                
                                backgroundColor:'#184737',
                                opacity:1,
                                justifyContent:'center', alignItems: 'center'
                            }}>
                        <View style = {{
                            width:'100%',
                                height:'10%',
                                position:'absolute',                                
                                backgroundColor:'#184737',
                                opacity:1,
                                alignItems: 'center'
                            }}>
                            <Text style={{color:'#fff',fontSize:20,marginTop:-0.4*height}}>分享音乐卡片</Text>
                        </View>
                        <View style = {{
                            width:'77%',
                                height:'70%',
                                position:'absolute',
                                top:'10%',
                                paddingLeft:width*0.04,
                                backgroundColor:'#236752',
                                opacity:1
                            }}>
                            <TouchableOpacity style={{height:0.07*height}} >
                                <Image style={{width:0.68*width,height:0.68*width,marginTop:0.04*width}} source={require('../images/2.png')} />
                                <Text style={{color:'#9dab7a',fontSize:30,marginTop:height*0.015}}>{this.state.music_name}</Text>
                                <Text style={{color:'#9dab7a',fontSize:15,marginTop:height*0.015}}>{this.state.music_author}</Text>
                                <Text style={{color:'#9dab7a',fontSize:15,marginTop:height*0.015,marginTop:0.1*height}}>微音APP</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{height:0.07*height}} >
                                <Text style={{color:'#fff',fontSize:12,marginTop:height*0.015}}>保存到本地</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {{
                            width:'100%',
                                height:'10%',
                                position:'absolute',                                
                                backgroundColor:'#184737',
                                top:0.82*height,
                                opacity:1,
                                alignItems: 'center'
                            }}>
                            <Text style={{color:'#fff',fontSize:15}}>保 存 到 本 地</Text>
                            <TouchableOpacity style={{width:width,height:0.03*height,alignItems: 'center',marginTop:0.05*height}} onPress={() => { this.setModalVisible3(false) }}>
                                        <Image style={{width:0.07*width,height:0.07*width}} source={require('../images/x.png')} />
                                    </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
               </View>
               <View>
                    <Modal
                    animationType = {"slide"}
                    transparent = {true}
                    visible = {this.state.modalVisible4}
                    >  
                    <View style = {{
                            width:'100%',
                                height:'100%',
                                position:'absolute',
                                top:'0%',
                                paddingLeft:'5%',
                                backgroundColor:'#fff',
                                opacity:1,
                                justifyContent:'center', alignItems: 'center'
                            }}>
                        <View style = {{
                            width:'100%',
                                height:'10%',
                                position:'absolute',                                
                                backgroundColor:'#fff',
                                opacity:1,
                                flexDirection:'row',
                                top:'0%',
                                paddingTop:'3%'
                            }}>
                            <TouchableOpacity style={{}} onPress={() => { this.setModalVisible4(false,0) }}>
                            <Text style={{color:'#000',fontSize:15}}>取消</Text>
                            </TouchableOpacity>
                            <Text style={{color:'#000',fontSize:20,marginLeft:0.3*width}}>播放器样式</Text>
                            <TouchableOpacity style={{alignItems: 'center',marginLeft:0.3*width}}  onPress={() => {this.setModalVisible4(false,1) }}>
                            <Text style={{color:'#000',fontSize:15}}>完成</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {{
                            width:'77%',
                                height:'60%',
                                position:'absolute',
                                top:'10%',
                                
                                alignItems: 'center',
                                opacity:1
                            }}>
                            <Image style={{width:0.6*width,height:1.77*width*0.6}} source={this.state.nowfengmian[1]} />
                            <Text style={{color:'#666'}}>{this.state.nowfengmian[0]}</Text>
                        </View>
                        <View style = {{
                            width:'100%',
                                height:'20%',
                                position:'absolute',                                
                                backgroundColor:'#fff',
                                top:0.73*height,
                                opacity:1,
                                flexDirection:'row',
                                alignItems: 'center'
                            }}>
                            <TouchableOpacity style={{alignItems: 'center',marginLeft:0.072*width}}  onPress={() => { this.fengmian(0) }}>
                                <Image style={{width:0.2*width,height:1.77*width*0.2}} source={this.state.checkyemian[0][1]} />
                                <Text style={{color:'#666'}}>{this.state.checkyemian[0][0]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{alignItems: 'center',marginLeft:0.1*width}} onPress={() => { this.fengmian(1) }}>
                                <Image style={{width:0.2*width,height:1.77*width*0.2}} source={this.state.checkyemian[1][1]} />
                                <Text style={{color:'#666'}}>{this.state.checkyemian[1][0]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{alignItems: 'center',marginLeft:0.1*width}} onPress={() => { this.fengmian(2) }}>
                                <Image style={{width:0.2*width,height:1.77*width*0.2}} source={this.state.checkyemian[2][1]} />
                                <Text style={{color:'#666'}}>{this.state.checkyemian[2][0]}</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
            </View>
            <View>
            <Modal
                    animationType = {"slide"}
                    transparent = {true}
                    visible = {this.state.modalVisible5}
                    >  
                    <View style = {{
                            width:'100%',
                                height:'100%',
                                position:'absolute',
                                top:'0%',
                                paddingLeft:'5%',
                                backgroundColor:'#888',
                                opacity:1,
                                justifyContent:'center',                                
                              
                                alignItems: 'center'

                            }}>
                        <View style = {{
                            width:'100%',
                                height:'10%',
                                position:'absolute',                                
                               
                                opacity:1,
                                flexDirection:'row',
                                top:'0%',
                                paddingTop:'3%'
                            }}>

                            <Text style={{color:'#000',fontSize:20,marginLeft:0.4*width}}>驾驶模式</Text>
                            <TouchableOpacity style={{alignItems: 'center',marginLeft:0.3*width}}  onPress={() => {this.setModalVisible5(false) }}>
                            <Image style={{width:0.05*width,height:width*0.05}} source={require('../images/x.png')} />
                            <Image/>
                            </TouchableOpacity>
                        </View>
                        <View style = {{
                            width:'77%',
                                height:'20%',
                                position:'absolute',
                                top:'10%',
                                
                                alignItems: 'center',
                                opacity:1
                            }}>
                        <View style={{width:width*0.90,height:0.45*height,justifyContent:'center',alignItems: 'center'}}>
                           <Text style={{fontSize:30,color:'#fff',marginTop:-0.5*width}}>{this.state.music_name}</Text>
                            </View>
                        </View>
                        <View style = {{
                            width:'100%',
                                height:'50%',
                                position:'absolute',                                
                                top:'50%',
                                opacity:1,
                                flexDirection:'row',
                                alignItems: 'center',
                                justifyContent:'center',
                                marginTop:'-40%'
                            }}>

                            <TouchableOpacity  onPress={() => this.nextAction(this.state.currentIndex - 1)} >
                            <Image style={{width:0.2*width,height:0.2*width}} source={require('../images/back.png' )} />
                            </TouchableOpacity>
                          
                            <TouchableOpacity onPress={() => this.play()} >
                            <Image style={{width:0.3*width,height:0.3*width,marginLeft:0.1*width}} source={this.state.paused?require('../images/broadcast.png' ):require('../images/suspend.png')} />
                            </TouchableOpacity>
                            
                            <TouchableOpacity   onPress={() => this.nextAction(this.state.currentIndex + 1) }  >
                            <Image style={{width:0.2*width,height:0.2*width,marginLeft:0.1*width}} source={require('../images/next.png' )} />
                            </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
            </View>  
            <View>
        <Modal
                                   animationType = {"slide"}
                                   transparent = {true}
                                   visible = {this.state.modalVisible6}
                                   >  

                                   <View style = {{
                                           width:'100%',
                                               height:'100%',
                                               position:'absolute',
                                               top:'0%',

                                               backgroundColor:'#888',
                                               opacity:1,
                                               justifyContent:'center',                                

                                               alignItems: 'center'

                                           }}>

                                       <View style = {{
                                           width:'100%',
                                               height:'25%',
                                               position:'absolute',                                

                                               opacity:1,

                                               top:'0%',
                                               paddingTop:'3%'
                                           }}>
                                               <View style={{ flexDirection:'row',}}> 
                                               <TouchableOpacity style={{alignItems: 'center'}}  onPress={() => {this.setModalVisible6(false) }}>
                                                <Image style={{width:0.05*width,height:width*0.05,marginLeft:0.05*width}} source={require('../images/return.png')} />
                                           </TouchableOpacity>
                                           <Text style={{color:'#FFF',fontSize:20,marginLeft:0.3*width}}>主题中心</Text>
                                               </View>

                                           <View>
                                           <ScrollView

                                            horizontal={true}
                                            //  禁用水平滚动条
                                            showsHorizontalScrollIndicator={false}>
                                               <View style={{flexDirection:'row',width:width,height:0.8*width,paddingLeft:0.05*width,marginLeft:-0.1*width}}>

                                                    <Image style={{marginLeft:0.1*width,width:0.9*width,height:0.36*width,borderRadius:width*0.02}} source={require('../images/head2.jpg')} />
                                               </View>
                                               <View style={{flexDirection:'row',width:width,height:0.8*width,paddingLeft:0.05*width,marginLeft:0.1*width}}>

                                                    <Image style={{width:0.9*width,height:0.36*width,borderRadius:width*0.02}} source={require('../images/head1.jpg')} />
                                               </View>
                                           </ScrollView>
                                           </View>


                                       </View>
                                       <View style = {{
                                           width:'100%',
                                               height:'80%',
                                               position:'absolute',
                                               top:'24.5%',
                                               backgroundColor:'#fff',
                                               alignItems: 'center',
                                               opacity:1
                                           }}>
                                               <ScrollView
                                                showsHorizontalScrollIndicator={false}
                                               >
                                               <View style={{width:width,height:0.3*height}} >
                                                    <View style={{width:width, flexDirection:'row',paddingLeft:0.05*width,alignItems: 'center', 
                                                    paddingTop:0.02*width,marginBottom:0.01*width  }}> 
                                                    <Text style={{fontSize:20}}>新品速递</Text>
                                                    </View>
                                                    <ScrollView

                                                        horizontal={true}
                                                        //  禁用水平滚动条
                                                        showsHorizontalScrollIndicator={false}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,marginLeft:-0.1*width}}>

                                                                <Image style={{marginLeft:0.1*width,width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/11.jpg')} />
                                                                <Text style={{width:0.3*width,height:0.15*width,fontSize:20,marginLeft:0.2*width,color:'green'}}>vip</Text>
                                                        </View>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,marginLeft:0.07*width}}>

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/12.jpg')} />
                                                                <Text style={{width:0.3*width,height:0.15*width,fontSize:20,marginLeft:0.1*width,color:'green'}}>vip</Text>

                                                        </View>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,marginLeft:-0.02*width}}>

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/13.jpg')} />
                                                                <Text style={{width:0.3*width,height:0.15*width,fontSize:20,marginLeft:0.1*width,color:'green'}}>vip</Text>

                                                        </View>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,marginLeft:-0.02*width}}>

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/14.jpg')} />
                                                                <Text style={{width:0.3*width,height:0.15*width,fontSize:20,marginLeft:0.1*width,color:'green'}}>vip</Text>

                                                        </View>
                                                    </ScrollView>
                                               </View>
                                               <View style={{width:width,height:0.3*height}} >
                                                    <View style={{width:width, flexDirection:'row',paddingLeft:0.05*width,alignItems: 'center', 
                                                    paddingTop:0.02*width,marginBottom:0.01*width  }}> 
                                                    <Text style={{fontSize:20}}>明星广场</Text>
                                                    </View>
                                                    <ScrollView

                                                        horizontal={true}
                                                        //  禁用水平滚动条
                                                        showsHorizontalScrollIndicator={false}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,marginLeft:-0.1*width}}>

                                                                <Image style={{marginLeft:0.1*width,width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/21.jpg')} />
                                                                <Text style={{width:0.3*width,height:0.15*width,fontSize:20,marginLeft:0.2*width,color:'green'}}>vip</Text>
                                                        </View>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,marginLeft:0.07*width}}>

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/22.jpg')} />
                                                                <Text style={{width:0.3*width,height:0.15*width,fontSize:20,marginLeft:0.1*width,color:'green'}}>vip</Text>

                                                        </View>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,marginLeft:-0.02*width}}>

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/23.jpg')} />
                                                                <Text style={{width:0.3*width,height:0.15*width,fontSize:20,marginLeft:0.1*width,color:'green'}}>vip</Text>

                                                        </View>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,marginLeft:-0.02*width}}>

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/14.jpg')} />
                                                                <Text style={{width:0.3*width,height:0.15*width,fontSize:20,marginLeft:0.1*width,color:'green'}}>vip</Text>

                                                        </View>
                                                    </ScrollView>
                                               </View>
                                               <View style={{width:width,height:0.3*height}} >
                                                    <View style={{width:width, flexDirection:'row',paddingLeft:0.05*width,alignItems: 'center', 
                                                    paddingTop:0.02*width,marginBottom:0.01*width  }}> 
                                                    <Text style={{fontSize:20}}>免费专区</Text>

                                                    </View>
                                                    <ScrollView

                                                        horizontal={true}
                                                        //  禁用水平滚动条
                                                        showsHorizontalScrollIndicator={false}>
                                                              <TouchableOpacity onPress={() => { this.setModalVisible7(true,31) }}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,}}  >

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/31.gif')} />

                                                        </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.setModalVisible7(true,32) }}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,}}  >

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/32.gif')} />

                                                        </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.setModalVisible7(true,33) }}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,}}  >

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/33.gif')} />

                                                        </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.setModalVisible7(true,34) }}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,}}  >

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/34.gif')} />

                                                        </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.setModalVisible7(true,1) }}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,}}  >

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/d1.jpg')} />

                                                        </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.setModalVisible7(true,1) }}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,}}  >

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/d1.jpg')} />

                                                        </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.setModalVisible7(true,2) }}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,}}  >

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/d2.jpg')} />

                                                        </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.setModalVisible7(true,3) }}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,}}  >

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/d3.jpg')} />

                                                        </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.setModalVisible7(true,4) }}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,}}  >

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/d4.jpg')} />

                                                        </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.setModalVisible7(true,5) }}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,}}  >

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/d5.jpg')} />

                                                        </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.setModalVisible7(true,6) }}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,}}  >

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/d6.jpg')} />

                                                        </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.setModalVisible7(true,7) }}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,}}  >

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/d7.jpg')} />

                                                        </View>
                                                        </TouchableOpacity>                                                     
                                                        <TouchableOpacity onPress={() => { this.setModalVisible7(true,8) }}>
                                                        <View style={{width:0.3*width,height:0.8*width,paddingLeft:0.05*width,}}  >

                                                                <Image style={{width:0.25*width,height:0.35*width,borderRadius:width*0.02}} source={require('../images/d8.jpg')} />

                                                        </View>
                                                        </TouchableOpacity>
                                                    </ScrollView>
                                               </View>
                                               </ScrollView>
                                       </View>

                                       </View>
                                   </Modal>
        </View>

                                   <View>
                                   <Modal
                                   animationType = {"slide"}
                                   transparent = {true}
                                   visible = {this.state.modalVisible7}
                                   >  

                                   <View style = {{
                                           width:'100%',
                                               height:'100%',
                                               position:'absolute',
                                               top:'0%',

                                               backgroundColor:'#888',
                                               opacity:1,
                                               justifyContent:'center',                                

                                               alignItems: 'center'

                                           }}>
                                        <View style = {{
                                           width:'100%',
                                               height:'8%',
                                               position:'absolute',                                

                                               opacity:1,

                                               top:'0%',
                                               paddingTop:'3%'
                                           }}>
                                               <View style={{ flexDirection:'row',}}> 
                                               <TouchableOpacity style={{alignItems: 'center'}}  onPress={() => {this.setModalVisible7(false) }}>
                                                <Image style={{width:0.05*width,height:width*0.05,marginLeft:0.05*width}} source={require('../images/return.png')} />
                                           </TouchableOpacity>
                                           <Text style={{color:'#FFF',fontSize:20,marginLeft:0.35*width}}>{this.state.nowgifname}</Text>
                                               </View>

                                           <View>

                                           </View>


                                       </View>
                                       <View style = {{
                                           width:'100%',
                                               height:'50%',
                                               position:'absolute',                                

                                               opacity:1,

                                               top:'40%',
                                               justifyContent:'center',                                

                                               alignItems: 'center'
                                           }}>
                                               <View style={{width:width,height:0.58*height,alignItems: 'center'}}>
                                               <ImageBackground style={{width:0.7*width,height:0.58*height}}
                                                    source={this.state.xuangif}>
                                                    <View  style={{justifyContent:'center', alignItems: 'center',flexDirection:'row',marginTop:0.05*width}}>

                                                        <Text style={{color:'#fff'}}>推荐</Text>

                                                        <Text style={{color:'#fff'}}>  |  </Text>

                                                        <Text style={{color:'#fff'}}>歌曲</Text>

                                                        <Text style={{color:'#fff'}}>  |  </Text>

                                                        <Text style={{color:'#fff'}}>歌词</Text>

                                                    </View>
                                                    <View style={{width:width,height:0.95*height,alignItems: 'center',marginTop:0.05*width}}>


                                                        <Image style={{width:width*0.45,height:width*0.45,borderRadius:0.25*width,marginLeft:-0.3*width}} source={require('../images/2.png')} />


                                                <View style={{width:0.7*width,height:0.2*height,flexDirection:'row',marginLeft:-0.2*width}} >
                                                    <View style={{flex:5,flexDirection:'column',marginLeft:'7%'}} >
                                                    <Text  style={{color:'#fff',fontSize:20,paddingBottom:'2%'}}>Perfect</Text>
                                                    <Text  style={{color:'#ccc',paddingBottom:'2%'}}>Ed Sheeran</Text>
                                                    <Text  style={{color:'#ccc'}}>I see my future in your eyes</Text>
                                                    </View>
                                                    <View  style={{width:0.2*width,height:0.2*height,flexDirection:'row'}} >
                                                    <Image style={{width:0.05*width,height:0.05*width}} source={require('../images/heart.png' )} />

                                                    </View>
                                              </View>
                                                <View style={{marginLeft:-0.15*width,marginTop:-0.09*height}}>
                                                    <View style={{flexDirection:'row',marginBottom:0.03*width}}>
                                                        <Image style={{width:0.05*width,height:0.05*width}}  source={require('../images/mike.png' )} />
                                                        <Image style={{width:0.05*width,height:0.05*width,marginLeft:0.12*width}} source={require('../images/download.png' )} />
                                                        <Image  style={{width:0.05*width,height:0.05*width,marginLeft:0.12*width}}  source={require('../images/remark.png' )} />
                                                        <Image  style={{width:0.05*width,height:0.05*width,marginLeft:0.12*width}}  source={require('../images/ellipsis.png' )} />
                                                    </View>

                                                    <View style={{width:0.7*width,height:0.1*height,marginLeft:-0.02*width}}> 
                                                    <Slider
                                                                        width={0.6*width}
                                                                            ref='slider'
                                                                            // disabled //禁止滑动
                                                                            thumbTintColor={'#fff'}
                                                                            maximumTrackTintColor={'#ccc'} //右侧轨道的颜色
                                                                            minimumTrackTintColor={'#fff'} //左侧轨道的颜色
                                                                            value={5}
                                                                            maximumValue={20}
                                                                            step={1}

                                                                        />
                                                                            <Text style={{color:'#fff',marginLeft:0.02*width}}>1:10</Text> 
                                                                            <View style={{flexDirection:'row',marginLeft:0.02*width,alignItems: 'center'}}>
                                                                            <Image style={{width:0.05*width,height:0.04*width}} source={require('../images/loop.png')} />
                                                                            <Image style={{width:0.05*width,height:0.05*width,marginLeft:0.07*width}} source={require('../images/back.png' )} />
                                                                            <Image style={{width:0.07*width,height:0.07*width,marginLeft:0.07*width}} source={require('../images/broadcast.png' )} />
                                                                            <Image style={{width:0.05*width,height:0.05*width,marginLeft:0.07*width}} source={require('../images/next.png' )} />
                                                                            <Image style={{width:0.05*width,height:0.05*width,marginLeft:0.07*width}} source={require('../images/list.png' )} />
                                                                            </View>
                                                                            </View>
                                                                        </View>
                                                            </View>
                                                </ImageBackground>
                                                <View style={{width:width,height:0.1*height,backgroundColor:'#FFF'}}>

                                                </View>
                                               </View>


                                                <View style={{width:width,height:0.5*height,backgroundColor:'#fff',alignItems: 'center'}}>
                                                <TouchableOpacity onPress={() => { this.checkphto() }}>
                                                    <View style={{width:0.7*width,marginLeft:0.2*width,
                                                    flexDirection:'row',borderWidth: 1,height:0.05*height, 
                                                    justifyContent:'center', alignItems: 'center',
                                                                    borderTopLeftRadius: 0.15*width,
                                                                    borderTopRightRadius:  0.15*width,
                                                                    borderBottomRightRadius:  0.15*width,
                                                                    borderBottomLeftRadius:  0.15*width,
                                                                    borderColor: "#000",
                                                                    marginTop:0.1*width,
                                                                    marginLeft:-0.02*width

                                                        }}>
                                                    <Text style={{marginLeft:0.01*width, fontSize:18,color:"#000"}}>{this.state.nowbccheck}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                </View>

                                       </View>



                                       </View>



                                   </Modal>
                                   </View>
                                   <View>
                                   <Modal
                                   animationType = {"slide"}
                                   transparent = {true}
                                   visible = {this.state.modalVisible8}
                                   >  

                                   <View style = {{
                                           width:'100%',
                                               height:'100%',
                                               position:'absolute',
                                               top:'0%',

                                               backgroundColor:'#888',
                                               opacity:1,
                                               justifyContent:'center',                                

                                               alignItems: 'center'

                                           }}>
                                        <View style = {{
                                           width:'100%',
                                               height:'8%',
                                               position:'absolute',                                

                                               opacity:1,

                                               top:'0%',
                                               paddingTop:'3%'
                                           }}>
                                               <View style={{ flexDirection:'row',}}> 
                                               <TouchableOpacity style={{alignItems: 'center'}}  onPress={() => {this.setModalVisible8(false) }}>
                                                <Image style={{width:0.05*width,height:width*0.05,marginLeft:0.05*width,marginTop:0.05*width}} source={require('../images/return.png')} />
                                           </TouchableOpacity>
                                           <View style={{marginLeft:0.2*width,flexDirection:'row',alignItems:'center'}}>
                                           <Image  style={{width:0.15*width,height:0.15*width,borderRadius:0.01*width}} source={{uri:this.state.nowintentphto}} />
                                            <Text style={{color:'#fff',marginLeft:0.03*width}}>{this.state.nowtext}</Text>
                                           </View>
                                
                                               </View>

                                           <View>

                                           </View>


                                       </View>
                                       <View style = {{
                                           width:'100%',
                                               height:'100%',
                                               position:'absolute',                                
                                        backgroundColor:'#fff',
                                               opacity:1,
                                               backgroundColor:'#888',
                                               top:'12%',
                                              
                                           }}>
                                            <View style={{backgroundColor:'#fff',height:height,paddingTop:0.02*height}}>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(1)}}>
                                                <Text  style={{fontSize:20,color:'#000'}}>1</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[0]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[0]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(2)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>2</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[1]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[1]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(3)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>3</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[2]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[2]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(4)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>4</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[3]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[3]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(5)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>5</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>   {this.state.nowlisttext[4]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[4]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(6)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>6</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[5]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[5]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(7)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>7</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[6]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[6]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(8)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>8</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[7]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[7]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(9)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>9</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>   {this.state.nowlisttext[8]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[8]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(10)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>10</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}> {this.state.nowlisttext[9]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[9]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(11)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>11</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[10]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[10]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(12)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>12</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[11]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[11]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>

                                            </TouchableOpacity>
                                            </View>

                                          

                                       </View>



                                       </View>



                                   </Modal>
                                   </View>         
                                   <View>
                                   <Modal
                                   animationType = {"slide"}
                                   transparent = {true}
                                   visible = {this.state.modalVisible9}
                                   >  

                                   <View style = {{
                                           width:'100%',
                                               height:'100%',
                                               position:'absolute',
                                               top:'0%',

                                               backgroundColor:'#888',
                                               opacity:1,
                                               justifyContent:'center',                                

                                               alignItems: 'center'

                                           }}>
                                        <View style = {{
                                           width:'100%',
                                               height:'8%',
                                               position:'absolute',                                

                                               opacity:1,

                                               top:'0%',
                                               paddingTop:'3%'
                                           }}>
                                               <View style={{ flexDirection:'row',}}> 
                                               <TouchableOpacity style={{alignItems: 'center'}}  onPress={() => {this.setModalVisible9(false) }}>
                                                <Image style={{width:0.05*width,height:width*0.05,marginLeft:0.05*width}} source={require('../images/return.png')} />
                                           </TouchableOpacity>
                                           <Text style={{color:'#FFF',fontSize:20,marginLeft:0.35*width}}>{this.state.nowgifname}</Text>
                                               </View>

                                           <View>

                                           </View>


                                       </View>
                                       <View style = {{
                                           width:'100%',
                                               height:'50%',
                                               position:'absolute',                                

                                               opacity:1,

                                               top:'40%',
                                               justifyContent:'center',                                

                                               alignItems: 'center'
                                           }}>
                                               <View style={{width:width,height:0.58*height,alignItems: 'center'}}>
                                               <ImageBackground style={{width:0.7*width,height:0.58*height}}
                                                    source={this.state.xuangif}>
                                                    <View  style={{justifyContent:'center', alignItems: 'center',flexDirection:'row',marginTop:0.05*width}}>

                                                        <Text style={{color:'#fff'}}>推荐</Text>

                                                        <Text style={{color:'#fff'}}>  |  </Text>

                                                        <Text style={{color:'#fff'}}>歌曲</Text>

                                                        <Text style={{color:'#fff'}}>  |  </Text>

                                                        <Text style={{color:'#fff'}}>歌词</Text>

                                                    </View>
                                                    <View style={{width:width,height:0.95*height,alignItems: 'center',marginTop:0.05*width}}>


                                                        <Image style={{width:width*0.45,height:width*0.45,borderRadius:0.25*width,marginLeft:-0.3*width}} source={require('../images/2.png')} />


                                                <View style={{width:0.7*width,height:0.2*height,flexDirection:'row',marginLeft:-0.2*width}} >
                                                    <View style={{flex:5,flexDirection:'column',marginLeft:'7%'}} >
                                                    <Text  style={{color:'#fff',fontSize:20,paddingBottom:'2%'}}>Perfect</Text>
                                                    <Text  style={{color:'#ccc',paddingBottom:'2%'}}>Ed Sheeran</Text>
                                                    <Text  style={{color:'#ccc'}}>I see my future in your eyes</Text>
                                                    </View>
                                                    <View  style={{width:0.2*width,height:0.2*height,flexDirection:'row'}} >
                                                    <Image style={{width:0.05*width,height:0.05*width}} source={require('../images/heart.png' )} />

                                                    </View>
                                              </View>
                                                <View style={{marginLeft:-0.15*width,marginTop:-0.09*height}}>
                                                    <View style={{flexDirection:'row',marginBottom:0.03*width}}>
                                                        <Image style={{width:0.05*width,height:0.05*width}}  source={require('../images/mike.png' )} />
                                                        <Image style={{width:0.05*width,height:0.05*width,marginLeft:0.12*width}} source={require('../images/download.png' )} />
                                                        <Image  style={{width:0.05*width,height:0.05*width,marginLeft:0.12*width}}  source={require('../images/remark.png' )} />
                                                        <Image  style={{width:0.05*width,height:0.05*width,marginLeft:0.12*width}}  source={require('../images/ellipsis.png' )} />
                                                    </View>

                                                    <View style={{width:0.7*width,height:0.1*height,marginLeft:-0.02*width}}> 
                                                    <Slider
                                                                        width={0.6*width}
                                                                            ref='slider'
                                                                            // disabled //禁止滑动
                                                                            thumbTintColor={'#fff'}
                                                                            maximumTrackTintColor={'#ccc'} //右侧轨道的颜色
                                                                            minimumTrackTintColor={'#fff'} //左侧轨道的颜色
                                                                            value={5}
                                                                            maximumValue={20}
                                                                            step={1}

                                                                        />
                                                                            <Text style={{color:'#fff',marginLeft:0.02*width}}>1:10</Text> 
                                                                            <View style={{flexDirection:'row',marginLeft:0.02*width,alignItems: 'center'}}>
                                                                            <Image style={{width:0.05*width,height:0.04*width}} source={require('../images/loop.png')} />
                                                                            <Image style={{width:0.05*width,height:0.05*width,marginLeft:0.07*width}} source={require('../images/back.png' )} />
                                                                            <Image style={{width:0.07*width,height:0.07*width,marginLeft:0.07*width}} source={require('../images/broadcast.png' )} />
                                                                            <Image style={{width:0.05*width,height:0.05*width,marginLeft:0.07*width}} source={require('../images/next.png' )} />
                                                                            <Image style={{width:0.05*width,height:0.05*width,marginLeft:0.07*width}} source={require('../images/list.png' )} />
                                                                            </View>
                                                                            </View>
                                                                        </View>
                                                            </View>
                                                </ImageBackground>
                                                <View style={{width:width,height:0.1*height,backgroundColor:'#FFF'}}>

                                                </View>
                                               </View>


                                                <View style={{width:width,height:0.5*height,backgroundColor:'#fff',alignItems: 'center'}}>
                                                <TouchableOpacity onPress={() => { this.checkphto() }}>
                                                    <View style={{width:0.7*width,marginLeft:0.2*width,
                                                    flexDirection:'row',borderWidth: 1,height:0.05*height, 
                                                    justifyContent:'center', alignItems: 'center',
                                                                    borderTopLeftRadius: 0.15*width,
                                                                    borderTopRightRadius:  0.15*width,
                                                                    borderBottomRightRadius:  0.15*width,
                                                                    borderBottomLeftRadius:  0.15*width,
                                                                    borderColor: "#000",
                                                                    marginTop:0.1*width,
                                                                    marginLeft:-0.02*width

                                                        }}>
                                                    <Text style={{marginLeft:0.01*width, fontSize:18,color:"#000"}}>{this.state.nowbccheck}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                </View>

                                       </View>



                                       </View>



                                   </Modal>
                                   </View>
                                   <View>
                                   <Modal
                                   animationType = {"slide"}
                                   transparent = {true}
                                   visible = {this.state.modalVisible10}
                                   >  

<TouchableOpacity style={{width:'100%',height:'100%'}} onPress={() => { this.setModalVisible10(false) }}>
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
                                                                        backgroundColor:'#fff',
                                                                        opacity:1
                                                                    }}>
                                                                                <View style={{height:0.07*height,justifyContent:'center'}}>
                                                                                <Text style={{color:'#444',}}>{this.state.music_author}</Text>
                                                                                </View>
                                                                               <View style={{width:width,height:0.6*width}}>
                                                                               <Image style={{width:0.7*width,height:0.7*width}} source={this.state.geshou} />
                                                                               </View>
                                                                               
                                                                    </View>


                                   </Modal>
                                   </View> 
                                   <View>
                                   <Modal
                                   animationType = {"slide"}
                                   transparent = {true}
                                   visible = {this.state.modalVisible11}
                                   >  

                                   <View style = {{
                                           width:'100%',
                                               height:'100%',
                                               position:'absolute',
                                               top:'0%',

                                               backgroundColor:'#888',
                                               opacity:1,
                                               justifyContent:'center',                                

                                               alignItems: 'center'

                                           }}>
                                        <View style = {{
                                           width:'100%',
                                               height:'8%',
                                               position:'absolute',                                

                                               opacity:1,

                                               top:'0%',
                                               paddingTop:'3%'
                                           }}>
                                               <View style={{ flexDirection:'row',}}> 
                                               <TouchableOpacity style={{alignItems: 'center'}}  onPress={() => {this.setModalVisible11(false) }}>
                                                <Image style={{width:0.05*width,height:width*0.05,marginLeft:0.05*width,marginTop:0.05*width}} source={require('../images/return.png')} />
                                           </TouchableOpacity>
                                           <View style={{marginLeft:0.2*width,flexDirection:'row',alignItems:'center'}}>
                                           <Image  style={{width:0.15*width,height:0.15*width,borderRadius:0.01*width}} source={this.state.music_authorph1} />
                                            <Text style={{color:'#fff',marginLeft:0.03*width,fontSize:20}}>{this.state.music_author}</Text>
                                           </View>
                                
                                               </View>

                                           <View>

                                           </View>


                                       </View>
                                       <View style = {{
                                           width:'100%',
                                               height:'100%',
                                               position:'absolute',                                
                                        backgroundColor:'#fff',
                                               opacity:1,
                                               backgroundColor:'#888',
                                               top:'12%',
                                              
                                           }}>
                                            <View style={{backgroundColor:'#fff',height:height,paddingTop:0.02*height}}>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(1)}}>
                                                <Text  style={{fontSize:20,color:'#000'}}>1</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[0]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[0]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(2)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>2</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[1]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[1]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(3)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>3</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[2]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[2]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(4)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>4</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[3]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[3]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(5)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>5</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>   {this.state.nowlisttext[4]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[4]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(6)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>6</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[5]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[5]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(7)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>7</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[6]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[6]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(8)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>8</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[7]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[7]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(9)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>9</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>   {this.state.nowlisttext[8]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[8]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(10)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>10</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}> {this.state.nowlisttext[9]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[9]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(11)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>11</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[10]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[10]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:0.1*width,flexDirection:'row',height:0.07*height}} onPress={() => {this.checkmusic(12)}}>
                                            <Text  style={{fontSize:20,color:'#000'}}>12</Text>
                                                <View style={{marginTop:-0.015*width,marginLeft:0.05*width}}>
                                                <Text style={{fontSize:20,color:'#000'}}>  {this.state.nowlisttext[11]}</Text>
                                                <Text style={{fontSize:12,color:'#000',marginLeft:0.03*width}}>{this.state.nowlisttext1[11]}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.play()} style={{width:0.1*width,height:0.1*width,color:'#000',marginLeft:0.5*width}}>
                                                <Image style={{width:0.1*width,height:0.1*width}} source={require('../images/broadcast1.png' )} />
                                                </TouchableOpacity>

                                            </TouchableOpacity>
                                            </View>

                                          

                                       </View>



                                       </View>



                                   </Modal>
                                   </View>  
                                   <View>
                               <Modal
                                animationType = {"slide"}
                                transparent = {true}
                                visible = {this.state.modalVisible12}
                                >  
                                <View
                                            style = {{
                                                width:'100%',
                                                    height:'80%',
                                                    position:'absolute',
                                                    top:'0%',
                                                    paddingLeft:0.1*width,
                                                    backgroundColor:'#000',
                                                    opacity:0,
                                                    justifyContent:'center', alignItems: 'center'
                                                    
                                                }}>

                                                    <TouchableOpacity style={{width:'100%',height:'100%'}}  onPress={() => { this.setModalVisible12(false) }}>
					                                  
                                                    </TouchableOpacity>
                                                </View>
                                <View
                                            style = {{
                                                width:'100%',
                                                    height:'20%',
                                                    position:'absolute',
                                                    top:'80%',
                                                    paddingLeft:0.1*width,
                                                    backgroundColor:'#000',
                                                    opacity:1,
                                                    justifyContent:'center', alignItems: 'center'
                                                    
                                                }}>
                                                    <View style={{width:0.3*width,height:0.1*width,flexDirection:'row',paddingTop:0.01*width}}>
                                                    <Text style={{color:"#fff",fontSize:20,width:0.3*width,marginLeft:-0.3*width}}>选择字体颜色</Text>
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginLeft:0.4*width}}  onPress={() => { this.setModalVisible12(false) }}>
					                                    <Image style={{width:0.05*width,height:0.05*width}} source={require('../images/down.png')} />
                                                    </TouchableOpacity>
                                                    </View>
                                                    <View style={{flexDirection:'row',marginLeft:-0.08*width,marginTop:-0.05*height}}>
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05,}} onPress={() => { this.fontcolor('#fff') }}>
                                                        <View style={{justifyContent:'center', alignItems: 'center',backgroundColor:'#313131',width:0.2*width,height:0.2*width}}>
                                                        <Text style={{color:'#fff'}}>白色</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05,marginLeft:0.01*width}} onPress={() => {this.fontcolor('blue')}}>
                                                        <View style={{justifyContent:'center', alignItems: 'center',backgroundColor:'#313131',width:0.2*width,height:0.2*width}}>
                                                        <Text style={{color:'blue'}}>蓝色</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05,marginLeft:0.01*width}} onPress={() => {this.fontcolor('red')}}>
                                                        <View style={{justifyContent:'center', alignItems: 'center',backgroundColor:'#313131',width:0.2*width,height:0.2*width}}>
                                                        <Text style={{color:'red'}}>红色</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05,marginLeft:0.01*width}} onPress={() => {this.fontcolor('#22d59d') }}>
                                                        <View style={{justifyContent:'center', alignItems: 'center',backgroundColor:'#313131',width:0.2*width,height:0.2*width}}>
                                                        <Text style={{color:'#22d59d'}}>浅绿色</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    </View>
                                                </View>
                                </Modal>
                               </View>                     
                <PlayList playlistvisible = {this.state.playlistvisible} currentIndex = {this.state.currentIndex} />
                </ImageBackground>
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
