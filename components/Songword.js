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
			photo:require('../images/loop.png'),
			clicknum3:0,
			iscollect:true,
			clicknum2:0,
			music_name:'',
			music_author:'',
			shuzhi:0,
			isplayBtn: "http://qiniu.guang.lerzen.com/zhanting.png" , //播放/暂停按钮背景图,
			songword:[]	,
			songWlength:0,
			color:'#fff'
        }
    }
	componentDidMount() {
        //先从总列表中获取到song_id保存
        this.clickToScroll();
        /*this.spin()   //   启动旋转*/
    }
    clickToScroll = () => {
		//先用measure测量出位置
		var T=[1,2,3,4,5,6,7]
		var i=0


			this.time = setInterval(() => {this.state.shuzhi++}, 1000)
			
				var d=0;
				
				i =width*0.08
				d=this.state.shuzhi
			
				
				
				
				this.refs.swiper_ScrollView.scrollTo({ x: 50, y:T[2]*width*0.08 , animated: true })
				this.setState({
	
					d:d,
					i:i
				})
				this.time && clearTimeout(this.time);

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
		var colors = ['','','你若化成风', '我幻化成雨', '守护你身边', '一笑为红颜', '你若化成风'
		, '我幻化成雨', '爱锁在眉间', '似水往昔浮流年', '乖乖 我的小乖乖',
		 '你的样子太可爱', '追你的男生每个都超级厉害', '我却在考虑怎么Say hi', '害羞的我这样下去要怎么办'
		, '怎么办 爱情甜又酸', '我不是Boss', '没有超大的House', '如果送你Rose', 
		'可不可以给我Chance', '不想看时间这么一点一滴飞逝', '老夫子带着假发', '我不要三寸金莲胡话'];
		var time=[];
		var index=0;
		// 遍历
		
	   for(var i=0; i<colors.length; i++){
		  
		   if(this.state.currentTime%100==1)
		   {
			   
			allChild.push(
				//  循环排列的view中必须有唯一表示
				  <View key={i} style={{width:width, height:width*0.08,marginTop:-width*0.08*[index]}}>
					 <Text style={{flex:1,color:"#fff"}} >{colors[i]}</Text>
				  </View>
				  
			  );
			  
		   }
		   else{
			allChild.push(
				//  循环排列的view中必须有唯一表示
				  <View key={i} style={{width:width, height:width*0.08,marginTop:-width*0.08*[index]}}>
					 <Text style={{flex:1,color:"#000"}} >{colors[i]}</Text>
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
		    	<Image style={{width:'35%',height:'20%'}} source={require('../images/down.png')} />
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
				    <Image style={{width:'35%',height:'20%'}} source={require('../images/share.png')} />
				</TouchableWithoutFeedback>
            </View>
		</View>
        <View style={{flex:38,marginLeft:width*0.05}}>
			<View style={{flex:5}}>
				<Text style={{color:'#ddd',fontSize:30}}>歌名</Text>
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
	   <Button onPress={this.clickToScroll} title='SDSA'></Button>
			</View>
        </View>
        <View style={{flex:4,flexDirection:'row'}}>
			<View style={{flex:2}}>

			</View>
			<View style={{flex:2,marginLeft:width*0.6,justifyContent:'center', alignItems: 'center'}}>
				<TouchableWithoutFeedback  >
						<Image style={{width:'50%',height:'70%'}} source={require('../images/suspend.png' )} />
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
