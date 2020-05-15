import React, { Component } from 'react'
import { StyleSheet, View, Dimensions,Text ,Image,Modal,ScrollView,TouchableOpacity, } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { black } from 'ansi-colors';
let {width, height} = Dimensions.get('window');
class timestop extends Component {
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
            modalVisible4:true,
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
      render() {
          return (
              <View>

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

export default timestop