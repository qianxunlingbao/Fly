import React, { Component } from 'react'
import { StyleSheet, View, Dimensions,Text ,Image,Modal,ScrollView,TouchableOpacity } from 'react-native'
import { black } from 'ansi-colors';
let {width, height} = Dimensions.get('window');
class Recommend extends Component {
    constructor(props) {
        super(props);
        
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
			photo:require('../images/loop.png'),
			clicknum3:0,
			collect:0,
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
            modalVisible4:false,
            xuanzhong:[''],
            indexsong:0,
            xuezhongT:[],
            tong:[],
            op:true,
            modalVisible5:false,
            modalVisible6:false,
            modalVisible7:false,
            modalVisible8:false,
            modalVisible9:false,
            checksong:[],
            bc:[require('../images/1.png'),require('../images/2.png'),require('../images/3.png'),require('../images/4.png')],
            backc:require('../images/1.png'),
            fontcolor:'black',
            stoptime:[false,'']
        }
    }
    //默认模态视图不可见

    renderChildView(p){
        // 数组
        if(p==undefined)
        p=0
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
        var c=width*0.1

	   for(var i=0; i<songword.length; i++){
           if(this.state.modalVisible5==false)
                        allChild.push(
                            //  循环排列的view中必须有唯一表示 
                            <TouchableOpacity key={i} onPress={this.renderChildView1.bind(this, i)}>
                              <View  style={{backgroundColor:this.state.xuanzhong[i], 
                              width:width,
                               height:c,
                               marginTop:-c*[index],
                                 justifyContent:'center',
                                 flexDirection:'row'
                                 }} >
                                 
                                    <Text style={{flex:1,color:'#fff',fontSize:18,marginLeft:0.1*width,marginTop:0.025*width}}>{songword[i]}</Text>
                                    <Image style={{width:0.05*width,height:0.05*width,marginTop:0.025*width,opacity:this.state.xuanzhong[i]=='#527d50'?1:0,marginRight:0.05*width}} source={require('../images/wt.png')} />                                    
                              </View>
                              </TouchableOpacity>
                          );
                          if(this.state.checksong[i]!=''&&this.state.modalVisible5==true){
                            allChild.push(
                                //  循环排列的view中必须有唯一表示 
                
                                  <View  style={{
                                    width:width,
                                   height:c,
                                   marginTop:-c*0.2,
                                   justifyContent:'center',
                                   flexDirection:'row'
                                     }} >
                                     
                                        <Text style={{flex:1,color:this.state.fontcolor,fontSize:18,marginTop:0.015*width,}}>{this.state.checksong[i]}</Text>
                                  </View>
                
                              );
                           }              
       }
        
	   // 返回数组，不然怎么显示出来
	   return allChild;
     }
    
     renderChildView1(i){
        if(i==undefined){
            this.state.stoptime[0]=false
            this.state.stoptime[1]=0
        }
        else{
            this.state.stoptime[0]=true
        }
        
        if(i==15)this.state.stoptime[1]=15
        if(i==30)this.state.stoptime[1]=30
        if(i==45)this.state.stoptime[1]=45
        if(i==60)this.state.stoptime[1]=60

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
           for(var j=0;j<this.state.xuanzhong.length;j++){
               if(j!=i)
               this.state.xuanzhong[j]=''
           }
           this.state.xuanzhong[i]='#527d50'
           this.state.checksong[i]=this.state.songword[i]

        }
        console.log(this.state.stoptime)
       this.setState({
           op:!this.state.op
       })
    }
      //修改模态视图可见性
      setModalVisible4(visible) {
          this.state.xuanzhong=['']
          this.setState({modalVisible4: visible,
        });
      }
      setModalVisible5(visible) {
          this.state.modalVisible5=visible
        this.setState({modalVisible5: this.state.modalVisible5,
      });
    }
    setModalVisible6(visible) {
        this.state.modalVisible6=visible
        this.setState({modalVisible6: this.state.modalVisible6,
      });
    }
    setModalVisible7(visible) {
        this.state.modalVisible7=visible
        this.setState({modalVisible7: this.state.modalVisible7,
      });
    }
    setModalVisible8(visible) {
        this.state.modalVisible8=visible
        this.setState({modalVisible8: visible,
      });
    }
    setModalVisible9(visible) {
        this.state.modalVisible9=visible
        this.setState({modalVisible9: this.state.modalVisible9,
      });
    }
     backgroundcolor(a){
        if(a!=undefined){
            this.state.backc=this.state.bc[a]
            this.setState({
                backc:this.state.backc
            })
        }
     }
     fontcolor(fc){
        if(fc!=undefined){
            this.state.fontcolor=fc
            this.setState({
                fc:this.state.fontcolor
            })
        }
     }
     getTitle = ()=>{
        var ajax = new XMLHttpRequest();
        ajax.open('get', 'http://t.weather.sojson.com/api/weather/city/101090101', true);
        ajax.send(null);
        ajax.onreadystatechange = function () {
          if (ajax.readyState == 4 && ajax.status == 200) {
            //接受数据成功条件
            var txt = ajax.responseText; //字符串
            var jsonData = JSON.parse(txt); //json数据解析为js对象
          console.log(JSON.stringify(jsonData))
          }
        };
      
    }
      render() {
          return (
              <View>

                                <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}} onPress={() => { this.setModalVisible5(true) }}>
                                    <View style={styles.box}>
                                        <Image style={{width:0.09*width,height:0.09*width}} source={require('../images/timing.png')} />
                                    </View>
                                    <Text style={{color:'#fff',fontSize:15,marginTop:height*0.015}}>定时关闭</Text>
                                </TouchableOpacity>
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
                                    
                                    backgroundColor:'#fff',
                                    opacity:1,
                                    justifyContent:'center', alignItems: 'center'
                                }}>
                                    <View
                                    style = {{
                                        width:'100%',
                                            height:'7%',
                                            position:'absolute',
                                            top:'0%',
                                            paddingLeft:0.1*width,
                                            backgroundColor:'#eee',
                                            opacity:1,
                                            justifyContent:'center', alignItems: 'center'
                                            ,flexDirection:'row'
                                        }}>                                            
                                                <TouchableOpacity style={{marginLeft:-0.5*width}} onPress={() => { this.setModalVisible5(false) }}>
                                                <Image style={{width:0.05*width,height:0.05*width}} source={require('../images/fanhui.png')} />
                                            </TouchableOpacity>
                                            <Text style={{fontSize:18,color:'#000',marginLeft:0.3*width}}>定时关闭</Text>

                                        </View>
                                       
                                    <View
                                    style = {{
                                        width:'100%',
                                            height:'60%',
                                            position:'absolute',
                                            top:'10%',
                                            
                                            backgroundColor:'#fff',
                                            opacity:1,
                                            justifyContent:'center', alignItems: 'center'
                                        }}>
                                           
                                     <TouchableOpacity  onPress={()=>{this.renderChildView1()}}>
                              <View  style={{backgroundColor:'#fff', 
                              width:width,
                               height:width*0.1,
                               marginTop:0,
                                 justifyContent:'center',
                                 flexDirection:'row',
                                 marginTop:0.03*width
                                 }} >
                                 
                                    <Text style={{flex:1,color:'#000',fontSize:18,marginLeft:0.1*width}}>不开启</Text>
                                    <Image style={{width:0.05*width,height:0.05*width,opacity:!this.state.stoptime[0]?1:0,marginRight:0.05*width}} source={require('../images/buy.png')} />                                    
                              </View>
                              </TouchableOpacity>
                              <TouchableOpacity  onPress={()=>{this.renderChildView1(15)}}>
                              <View  style={{backgroundColor:'#fff', 
                              width:width,
                               height:width*0.1,
                               marginTop:0,
                                 justifyContent:'center',
                                 flexDirection:'row',
                                 marginTop:0.03*width
                                 }} >
                                 
                                    <Text style={{flex:1,color:'#000',fontSize:18,marginLeft:0.1*width}}>15分钟</Text>
                                    <Image style={{width:0.05*width,height:0.05*width,opacity:this.state.stoptime[1]==15?1:0,marginRight:0.05*width}} source={require('../images/buy.png')} />                                    
                              </View>
                              </TouchableOpacity>
                              <TouchableOpacity  onPress={()=>{this.renderChildView1(30)}}>
                              <View  style={{backgroundColor:'#fff', 
                              width:width,
                               height:width*0.1,
                               marginTop:0,
                                 justifyContent:'center',
                                 flexDirection:'row',
                                 marginTop:0.03*width
                                 }} >
                                 
                                    <Text style={{flex:1,color:'#000',fontSize:18,marginLeft:0.1*width}}>30分钟</Text>
                                    <Image style={{width:0.05*width,height:0.05*width,opacity:this.state.stoptime[1]==30?1:0,marginRight:0.05*width}} source={require('../images/buy.png')} />                                    
                              </View>
                              </TouchableOpacity>
                              <TouchableOpacity  onPress={()=>{this.renderChildView1(45)}}>
                              <View  style={{backgroundColor:'#fff', 
                              width:width,
                               height:width*0.1,
                               marginTop:0,
                                 justifyContent:'center',
                                 flexDirection:'row',
                                 marginTop:0.03*width
                                 }} >
                                 
                                    <Text style={{flex:1,color:'#000',fontSize:18,marginLeft:0.1*width}}>45分钟</Text>
                                    <Image style={{width:0.05*width,height:0.05*width,opacity:this.state.stoptime[1]==45?1:0,marginRight:0.05*width}} source={require('../images/buy.png')} />                                    
                              </View>
                              </TouchableOpacity>
                              <TouchableOpacity  onPress={()=>{this.renderChildView1(60)}}>
                              <View  style={{backgroundColor:'#fff', 
                              width:width,
                               height:width*0.1,
                               marginTop:0,
                                 justifyContent:'center',
                                 flexDirection:'row',
                                 marginTop:0.03*width
                                 }} >
                                 
                                    <Text style={{flex:1,color:'#000',fontSize:18,marginLeft:0.1*width}}>60分钟</Text>
                                    <Image style={{width:0.05*width,height:0.05*width,opacity:this.state.stoptime[1]==60?1:0,marginRight:0.05*width}} source={require('../images/buy.png')} />                                    
                              </View>
                              </TouchableOpacity>
                              <TouchableOpacity  onPress={()=>{this.getTitle()}}>
                              <View  style={{backgroundColor:'#fff', 
                              width:width,
                               height:width*0.1,
                               marginTop:0,
                                 justifyContent:'center',
                                 flexDirection:'row',
                                 marginTop:0.03*width
                                 }} >
                                 
                                    <Text style={{flex:1,color:'#000',fontSize:18,marginLeft:0.1*width}}>60分钟</Text>
                                    <Image style={{width:0.05*width,height:0.05*width,opacity:this.state.stoptime[1]==60?1:0,marginRight:0.05*width}} source={require('../images/buy.png')} />                                    
                              </View>
                              </TouchableOpacity>
                                    </View>
                                    <View
                                    style = {{
                                        width:'100%',
                                            height:'15%',
                                            position:'absolute',
                                            top:'85%',
                                            paddingLeft:0.1*width,
                                            backgroundColor:'#fff',
                                            opacity:1,
                                            justifyContent:'center', alignItems: 'center'
                                            ,flexDirection:'row',
                                            
                                        }}>


                                        </View>
                            </View>
                        </Modal>
                                </View>
                               
              </View>
          );
      }
  }
  
  const styles = StyleSheet.create({
      flex: {
          flex: 0.5
      },
      show_bgColor: {
        backgroundColor: 'green'
      },
      hide_bgColor: {
          backgroundColor: 'red'
      },
      center: {
          alignItems: 'center',
          justifyContent: 'center',
      }
  });

export default Recommend