import React, {Component} from 'react';
import {Platform, StyleSheet,ScrollView , TouchableOpacity,Text,TouchableWithoutFeedback,Animated, View,ProgressBarAndroid,Button,Slider, Image,Dimensions,ToastAndroid } from 'react-native';

import {Actions} from 'react-native-router-flux';

var {width, height} = Dimensions.get('window');
export default class songword extends Component {
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
			index:0
        }
    }
	componentDidMount() {
        //先从总列表中获取到song_id保存
        this.clickToScroll();
        /*this.spin()   //   启动旋转*/
    }
    clickToScroll = () => {
		//先用measure测量出位置
		
		if(this.props.data[0]){
			let nowMin=this.props.data[2] ,

				nowSec ;
			this.time = setInterval(() => {
				var i=0,d=0;
				this.state.shuzhi++
				i =width*0.08*this.state.shuzhi
				d=this.state.shuzhi
			if (d+parseInt(this.props.data[3]) >= 60) {
				nowMin =parseInt((d+parseInt(this.props.data[3])) / 60)	; //当前分钟数
				nowSec = (d+parseInt(this.props.data[3])) - nowMin * 60;
				nowSec = nowSec < 10 ? '0' + nowSec : nowSec;
				
				
			} else {
				nowSec = d+this.props.data[2] < 10 ? '0' + d : d;

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
						d:d,
						i:i,
						index:this.state.index
					})
					if(j==this.state.songword.length)
					{
						console.log()
						this.time && clearTimeout(this.time);
					}
				}

			}
				
				
				
			}, 1000)
		}
        
		
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
		var colors = ['你若化成风', '我幻化成雨', '守护你身边', '一笑为红颜', '你若化成风'
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
        return (
<View style={styles.container}>
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
				<Text style={{color:'#ddd',fontSize:30}}>{this.props.data[1]}</Text>
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
