import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TouchableOpacity, View,ProgressBarAndroid,Button,Slider, Image,Dimensions,ToastAndroid } from 'react-native';
import Sound from 'react-native-sound';
import {Actions} from 'react-native-router-flux';
const {width} = Dimensions.get('window');

const whoosh = new Sound('https://music.163.com/song/media/outer/url?id=5255987.mp3',null, (e) => {
                if (e) {
                     console.log('播放失败');
                    return;
                }
               
            });
let data = require('./data');
export default class LocalPage extends Component {
    getTitle = ()=>{

        if(this.state.page==-1)this.state.page+=2;
        
        this.state.page++
        this.state.page1=this.state.page;
        fetch('http://49.235.231.110:8800/music')
        .then((res)=>res.json())
        .then(res=>{
            this.isLoading = false;  //数据加载成功后，加载动画取消
           
            this.posts = res.data.data;
            console.log(res.data[0].music_value)
            this.setState({
                data:res.data,
                posts:res.data.data,
                x:Math.random()*res.data
            })  //拿到数据以后，把数据复制给posts
        })
        .catch(err=>{
            console.log(err);
        })
        
    }
	constructor(props){
		super(props);
		this.state = {
		volume:data.volume,
		seconds: data.seconds, //秒数
		totalMin: data.totalMin, //总分钟
		totalSec: data.totalSec, //总分钟秒数
		nowMin: data.nowMin, //当前分钟
		nowSec: data.nowSec, //当前秒钟
		maximumValue: data.maximumValue, //滑块最大值
		clicknum1:data.clicknum1,
		clicknum2:data.clicknum2,
		photo:data.photo,
		word:data.word,
		clicknum3:data.clicknum3,
		iscollect:data.iscollect,
		}
		}
		clickheart=()=>{
			this.state.clicknum3++
            data.clicknum3=this.state.clicknum3
			let clicknum3 = this.state.clicknum3
            let iscollect = this.state.iscollect
            
			if(clicknum3%2==1){
                iscollect=false
                data.iscollect=iscollect
			}
			else{
                iscollect=true
                data.iscollect=iscollect
			}
			this.setState({
				iscollect
			})
		
			
		}
		clickph=()=>{
			this.state.clicknum2++
            let click= this.state.clicknum2
            data.clicknum2=this.state.clicknum2
			if(click%3==0){
				this.state.word='已切换到顺序播放'
				this.state.photo=require('./loop.png')
				let photo = this.state.photo;
				let word = this.state.word;
				this.setState({
					photo ,
					word
				})	
			}
			else if(click%3==1){
				this.state.word='已切换到单曲播放'
				this.state.photo=require('./single.png')
				let photo = this.state.photo;
				let word = this.state.word;
				this.setState({
					photo ,
					word
				})	
			}
			else if(click%3==2){
				this.state.word='已切换到随机播放'
				this.state.photo=require('./random.png')
				let photo = this.state.photo;
				let word = this.state.word;
				this.setState({
					photo ,
					word
				})	
			}
		}
		componentDidMount(){
		let totalTime = whoosh.getDuration();
		totalTime = Math.ceil(totalTime);
		let totalMin = parseInt(totalTime/60); //总分钟数
		let totalSec = totalTime - totalMin * 60; //秒钟数并判断前缀是否 + '0'
		totalSec = totalSec > 9 ? totalSec : '0' + totalSec;
		this.setState({
		totalMin,
		totalSec,
		maximumValue: totalTime,
		})
		}
		componentWillUnmount(){
        this.time && clearTimeout(this.time);
 
		}
		// 声音+
		_addVolume = () => {
		let volume = this.state.volume;
		volume += 0.1;
		volume = parseFloat(volume).toFixed(1) * 1;
		if(volume > 1){
		return alert('目前已经是最大音量');
		}
		this.setState({volume: volume});
		whoosh.setVolume(volume);
		}
		// 声音-
		_reduceVolume = () => {
		let volume = this.state.volume;
		volume -= 0.1;
		volume = parseFloat(volume).toFixed(1) * 1;
		if(volume < 0){
		return alert('当前为静音');
		}
		this.setState({volume: volume});
		whoosh.setVolume(volume);
		}
		
		onPressclick=()=>{
			this.state.clicknum1++
			let clicknum1 = this.state.clicknum1
	
			if(clicknum1%2==1){
				this._play();
			}
			else{
				this._pause();
			}
			this.setState({
				clicknum1
			})
		
		}
		// 播放
		_play = () => {
			
			whoosh.play();
			this.time = setInterval(() => {
			whoosh.getCurrentTime(seconds => {
			seconds = Math.ceil(seconds);
			this._getNowTime(seconds)
			})
			},1000)
			
		}
		// 暂停
		_pause = () => {
			
		clearInterval(this.time);
		whoosh.pause();
	
		}
		// 停止
		_stop = () => {
		clearInterval(this.time);
		this.setState({
		nowMin: 0,
		nowSec: 0,
		seconds: 0,
		})
		whoosh.stop();
		}
		_getNowTime = (seconds) => {
			
        let nowMin = this.state.nowMin,
        
		nowSec = this.state.nowSec,
        totalMin=this.state.totalMin,
        totalSec=this.state.totalSec,
        clicknum1=this.state.clicknum1;
        data.nowMin=nowMin
        data.nowSec=nowSec
        data.clicknum1=clicknum1
		if(seconds >= 60){
		nowMin = parseInt(seconds/60); //当前分钟数
		nowSec = seconds - nowMin * 60;
		nowSec = nowSec < 10 ? '0' + nowSec : nowSec;
		}else{
            nowMin = 0;
		nowSec = seconds < 10 ? '0' + seconds : seconds;
		}
        if(nowMin==totalMin&&nowSec==totalSec){
            clicknum1++;
			this._stop();
        }
        
		this.setState({
		nowMin,
		nowSec,
        seconds,
        clicknum1,
		})
		}
		render() {
		let time = this.state;
		return (
		<View style={styles.container}>
			<View style={{flex:50}}>
				<View style={{flex:6,flexDirection:'row'}}>
					<TouchableOpacity   style={{flex:1,marginLeft:'7%',justifyContent:'center'}}  onPress={()=>Actions.userinfor()}>
					<Image style={{width:'35%',height:'20%'}} source={require('./down.png')} />
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
					<Image style={{width:'35%',height:'20%'}} source={require('./share.png')} />
					</TouchableOpacity>
				
				</View>
				<View style={{flex:30,justifyContent:'center',}}>
					<View style={{flex:1,marginLeft:'5%'}}>
						<Image style={{width:'95%',height:'100%',
						 borderRadius:width*0.05}} source={require('./2.png')} />
					</View>
				</View>
				<View style={{flex:8,flexDirection:'row',marginTop:'3%'}} >
					<View style={{flex:5,flexDirection:'column',marginLeft:'7%'}} >
					<Text  style={{color:'#fff',fontSize:30,paddingBottom:'2%'}}>歌曲名</Text>
					<Text  style={{color:'#ccc',paddingBottom:'2%'}}>作者名</Text>
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
								// disabled //禁止滑动
								thumbTintColor={'#fff'}
								maximumTrackTintColor={'#ccc'} //右侧轨道的颜色
								minimumTrackTintColor={'#fff'} //左侧轨道的颜色
								maximumValue={this.state.maximumValue} //滑块最大值
								minimumValue={0} //滑块最小值
								value={this.state.seconds}
								onSlidingComplete={(value)=>{ //用户完成更改值时调用的回调（例如，当滑块被释放时）
								value = parseInt(value);
								this._getNowTime(value)
								// 设置播放时间
								whoosh.setCurrentTime(value);
								}}
								/>
						</View>
					<View style={{flex:3,flexDirection:'row'}}>
						<View style={{flex:1.2,flexDirection:'row'}}>
						</View>
						<View style={{flex:2,flexDirection:'row'}}>
							<Text style={{color:'#fff'}}>{time.nowMin}:{time.nowSec}</Text>
						</View>
						<View style={{flex:17.4,flexDirection:'row'}}>
						</View>
						<View style={{flex:2,flexDirection:'row'}}>
							<Text style={{color:'#fff'}}>{time.totalMin}:{time.totalSec}</Text>
						</View>
						<View style={{flex:1,flexDirection:'row'}}>
						</View>
						</View>
					</View>
		</View>
	<View style={{flex:5,flexDirection:'row',paddingBottom:'1%',justifyContent:'center',marginLeft:'9%',alignItems: 'center'}}>
		<View style={{flex:1,justifyContent:'center'}}  onPress={this.clickph} >
		<TouchableOpacity onPress={this.clickph}>
		<Image style={{width:'44%',height:'50%',marginTop:'25%'}} source={this.state.photo} />
		</TouchableOpacity>
		</View>
		<View style={{flex:1,justifyContent:'center'}}>
		<TouchableOpacity   >
		<Image style={{width:'35%',height:'70%',marginTop:'15%'}} source={require('./back.png' )} />
		</TouchableOpacity>
		</View>
		<View style={{flex:2,justifyContent:'center'}}>
		<TouchableOpacity  onPress={this.onPressclick} >
		<Image style={{width:'49%',height:'100%',marginLeft:'10%'}} source={this.state.clicknum1%2?require('./suspend.png' ):require('./broadcast.png')} />
		</TouchableOpacity>
		</View>
		<View style={{flex:1,justifyContent:'center'}}>
		<TouchableOpacity    >
		<Image style={{width:'35%',height:'70%',marginTop:'15%',marginLeft:'-10%'}} source={require('./next.png' )} />
		</TouchableOpacity>
		</View>
		<View style={{flex:1,justifyContent:'center'}}>
		<TouchableOpacity  >
		<Image style={{width:'35%',height:'70%',marginTop:'15%'}} source={require('./list.png' )} />
		</TouchableOpacity>
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