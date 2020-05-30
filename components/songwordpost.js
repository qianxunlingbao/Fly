import React, { Component } from 'react'
import { StyleSheet, View, Dimensions,Text ,Image,Modal,ScrollView,TouchableOpacity,AsyncStorage, ToastAndroid} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { black } from 'ansi-colors';
import ImagePicker from 'react-native-image-picker';

let {width, height} = Dimensions.get('window');
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};
let data = require('./data');

class songwordpost extends Component {
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
            imageUrl:'',
            t:'0',
            textlist:[['你若成风','许嵩'],['当你老了','赵照']
            ,['你一生的故事','以冬'],['谢你过我平庸一生','池年'],['老    街    ','李荣浩']
            ,['如果当时','许嵩'],['未见青山老','以冬'],['如约而至','许嵩']
            ,['风雨彩虹铿锵玫瑰','田震'],['像风一样','薛之谦'],['好几年   ','刘心'],['入    海    ','毛不易']],
        }
    }
    //默认模态视图不可见
    componentDidMount(){
        AsyncStorage.getItem('photo').then((res)=>{
            if(res){
                this.setState({imageUrl:{uri:res}})
            }
            else{
                this.setState({imageUrl:''})
            }
        });
        AsyncStorage.getItem('t').then((res)=>{
            if(res === '1'){
                this.setState({t:res})
            }else{
                this.setState({t:'0'})
            }
        })
    }
    
    takephoto = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
                //const source = { uri: response.uri };
                
                this.setState({
                    imageUrl: { uri: response.uri },
                    t:'1'
                });
                
                AsyncStorage.setItem('photo',this.state.imageUrl.uri);
                AsyncStorage.setItem('t','1');
                
            }
          });
    }
    renderChildView(p){
        // 数组
        if(p==undefined)
        p=0
        var allChild = [];
        console.log(this.props.music)

                    this.state.songword=data.musiclist[this.props.music];
                    this.state.time=data.musictime[this.props.music];
                    this.state.music_name=this.state.textlist[this.props.music][1]

 
        var c=width*0.1
	   for(var i=0; i<this.state.songword.length; i++){
           if(this.state.modalVisible5==false)
                        allChild.push(
                            //  循环排列的view中必须有唯一表示 
                            <TouchableOpacity key={i} onPress={this.renderChildView1.bind(this, i)}>
                              <View  style={{backgroundColor:this.state.xuanzhong[i], 
                              width:width,
                               height:c,
                               marginTop:0,
                                 justifyContent:'center',
                                 flexDirection:'row'
                                 }} >
                                 
                                    <Text style={{flex:1,color:'#fff',fontSize:18,marginLeft:0.1*width,marginTop:0.025*width}}>{this.state.songword[i]}</Text>
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
      setModalVisible4(visible) {
          this.state.xuanzhong=['']
          this.setState({modalVisible4: visible,
        });
      }
      setModalVisible5(visible) {

       
        for(var i=0; i<this.state.songword.length; i++){
            if (this.state.checksong[i]==''&&visible==true||this.state.checksong[i]==undefined){
               }
               else{
                this.state.modalVisible5=visible
               }
        }
     
         
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
            this.state.imageUrl=''
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
          console.log(this.props.music)
          if(this.state.imageUrl!='')
        this.state.backc=this.state.imageUrl
          return (

              <View>

                                <View>
                                <Modal
                                animationType = {"slide"}
                                transparent = {true}
                                visible = {this.state.modalVisible5}
                                >  
                                    <View
                                        style = {{
                                            width:'100%',
                                                height:'10%',
                                                position:'absolute',
                                                top:'0%',
                                                
                                                backgroundColor:'#232929',
                                                opacity:1,
                                                paddingLeft:0.1*width, alignItems: 'center'
                                                ,flexDirection:'row'
                                            }}>
                                                <TouchableOpacity   style={{}}  onPress={()=>{this.setModalVisible5(false)}}>
                                                    <Image style={{width:0.05*width,height:0.05*width}} source={require('../images/down.png')} />
                                                </TouchableOpacity>
                                    </View>
                                    <View
                                            style = {{
                                                width:'100%',
                                                    height:'70%',
                                                    position:'absolute',
                                                    top:'9.9%',
                                                  
                                                    backgroundColor:'#232929',
                                                    opacity:1,
                                                    paddingLeft:'5%',
                                                    justifyContent:'center', alignItems: 'center'
                                                    ,flexDirection:'row'
                                                }}>
                                                    <View style={{backgroundColor:"#fff", marginLeft:-0.05*width,
                                                        width:0.85*width,  
                                                        height:0.7*height,justifyContent:'center', alignItems: 'center',
                                                        paddingLeft:0.1*width}}>
                                            <ScrollView
                                            
                                                ref=''
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
                                                    <View style={{width:0.65*width,height:0.65*width,marginTop:0.1*width}} >
                                                    <TouchableOpacity   >
                               <Image  style={{width:0.65*width,height:0.65*width,borderRadius:width*0.02}} source={this.state.backc}  />
                                </TouchableOpacity>
                                                      
                                                    </View>
                                                {this.renderChildView()} 
                                                <View style={{width:0.65*width,height:0.15*width,marginTop:0.1*width}} >
                                                        <Text>{this.state.textlist[this.props.music][0]} {this.state.music_name}</Text>
                                                        <Text>微音</Text>
                                                    </View>
                                                </ScrollView>
                                                    </View>
                                                </View>
                                        <View
                                        style = {{
                                            width:'100%',
                                                height:'20.1%',
                                                position:'absolute',
                                                top:'79.9%',
                                                
                                                backgroundColor:'#232929',
                                                opacity:1,
                                                justifyContent:'center', alignItems: 'center'
                                                ,flexDirection:'row'
                                            }}>
                                        <TouchableOpacity style={{width:0.4*width,justifyContent:'center', alignItems: 'center',}} onPress={() => { this.setModalVisible7(true) }}>
                                            
                                                <Image style={{width:0.09*width,height:0.09*width,}} source={require('../images/PHTO.png')} />
                                            
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.setModalVisible8(true) }}>
                                                    <View style={{width:0.4*width,
                                                    flexDirection:'row',height:0.05*height, 
                                                    justifyContent:'center', alignItems: 'center',
                                                                    borderTopLeftRadius: 0.15*width,
                                                                    borderTopRightRadius:  0.15*width,
                                                                    borderBottomRightRadius:  0.15*width,
                                                                    borderBottomLeftRadius:  0.15*width,
                                                                    backgroundColor:'#22d59d',
                                                                    marginLeft:-0.1*width
                                                        }}>
                                                    <Text style={{marginLeft:0.01*width, fontSize:18,color:"#fff"}}>保存/分享</Text>
                                                    </View>
                                                </TouchableOpacity>
                                        <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',width:0.3*width}} onPress={() => { this.setModalVisible9(true) }}>
                                          <Text style={{color:'#fff',fontSize:20}}>Aa</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                                </View>
                               <View>
                               <Modal
                                animationType = {"slide"}
                                transparent = {true}
                                visible = {this.state.modalVisible7}
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

                                                    <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={() => { this.setModalVisible7(false) }}>
					                                  
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
                                                    <Text style={{color:"#fff",fontSize:20,width:0.3*width,marginLeft:-0.3*width}}>选择图片</Text>
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginLeft:0.4*width}} onPress={() => { this.setModalVisible7(false) }}>
					                                    <Image style={{width:0.05*width,height:0.05*width}} source={require('../images/down.png')} />
                                                    </TouchableOpacity>
                                                    </View>
                                                    <View style={{flexDirection:'row',marginLeft:-0.08*width,marginTop:-0.05*height}}>
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}} onPress={() => { this.backgroundcolor(0) }}>
                                                        <View style={{backgroundColor:this.state.bc[0],width:0.2*width,height:0.2*width}}>
                                                        <Image style={{width:0.2*width,height:0.2*width}} source={require('../images/1.png')} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}} onPress={() => {this.backgroundcolor(1)}}>
                                                        <View style={{backgroundColor:this.state.bc[1],width:0.2*width,height:0.2*width}}>
                                                        <Image style={{width:0.2*width,height:0.2*width}} source={require('../images/2.png')} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}} onPress={() => { this.backgroundcolor(2)}}>
                                                        <View style={{backgroundColor:this.state.bc[2],width:0.2*width,height:0.2*width}}>
                                                        <Image style={{width:0.2*width,height:0.2*width}} source={require('../images/3.png')} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05}} onPress={()=>{this.takephoto()}}>
                                                        <View style={{justifyContent:'center', alignItems: 'center',backgroundColor:this.state.bc[0],width:0.2*width,height:0.2*width}}>
                                                       <Text style={{fontSize:15,color:'#fff'}}>添加图片</Text>
                                                        </View>
                                                    </TouchableOpacity>
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

                                                    <TouchableOpacity style={{width:'100%',height:'100%'}}  onPress={() => { this.setModalVisible9(false) }}>
					                                  
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
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginLeft:0.4*width}}  onPress={() => { this.setModalVisible9(false) }}>
					                                    <Image style={{width:0.05*width,height:0.05*width}} source={require('../images/down.png')} />
                                                    </TouchableOpacity>
                                                    </View>
                                                    <View style={{flexDirection:'row',marginLeft:-0.08*width,marginTop:-0.05*height}}>
                                                    <TouchableOpacity style={{justifyContent:'center', alignItems: 'center',marginTop:height*0.05,}} onPress={() => { this.fontcolor('black') }}>
                                                        <View style={{justifyContent:'center', alignItems: 'center',backgroundColor:'#313131',width:0.2*width,height:0.2*width}}>
                                                        <Text style={{color:'black'}}>黑色</Text>
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
                                    
                                    backgroundColor:'#487346',
                                    opacity:1,
                                    justifyContent:'center', alignItems: 'center'
                                }}>
                                    <View
                                    style = {{
                                        width:'100%',
                                            height:'10%',
                                            position:'absolute',
                                            top:'0%',
                                            paddingLeft:0.1*width,
                                            backgroundColor:'#487346',
                                            opacity:1,
                                            justifyContent:'center', alignItems: 'center'
                                            ,flexDirection:'row'
                                        }}>
                                            <Text style={{fontSize:18,color:'#fff',marginLeft:0.3*width}}>歌词海报</Text>
                                            <TouchableOpacity style={{marginLeft:0.3*width}} onPress={()=>Actions.pop()}>
                                                <Image style={{width:0.05*width,height:0.05*width}} source={require('../images/x.png')} />
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                        style = {{
                                        width:'100%',
                                            height:'10%',
                                            position:'absolute',
                                            top:'10%',
                                            paddingLeft:0.1*width,
                                            backgroundColor:'#487346',
                                            opacity:1,
                                            
                                            
                                        }}>
                                            <Text style={{fontSize:25,color:'#fff'}}>{this.state.textlist[this.props.music][0]}</Text>
                                            <Text style={{fontSize:15,color:'#fff',marginTop:0.01*height}}>{this.state.music_name}</Text>
                                        </View>
                                    <View
                                    style = {{
                                        width:'100%',
                                            height:'60%',
                                            position:'absolute',
                                            top:'23%',
                                            
                                            backgroundColor:'#487346',
                                            opacity:1,
                                            justifyContent:'center', alignItems: 'center'
                                        }}>
                                            <ScrollView
                                ref=''
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
                                    <View
                                    style = {{
                                        width:'100%',
                                            height:'15%',
                                            position:'absolute',
                                            top:'85%',
                                            paddingLeft:0.1*width,
                                            backgroundColor:'#487346',
                                            opacity:1,
                                            justifyContent:'center', alignItems: 'center'
                                            ,flexDirection:'row',
                                            
                                        }}>
                                                <TouchableOpacity onPress={() => { this.setModalVisible5(true) }}>
                                                    <View style={{width:0.3*width,marginLeft:0.2*width,
                                                    flexDirection:'row',borderWidth: 1,height:0.05*height, 
                                                    justifyContent:'center', alignItems: 'center',
                                                                    borderTopLeftRadius: 0.15*width,
                                                                    borderTopRightRadius:  0.15*width,
                                                                    borderBottomRightRadius:  0.15*width,
                                                                    borderBottomLeftRadius:  0.15*width,
                                                                    borderColor: "#b3ffb4",
                                                                    marginLeft:-0.1*width
                                                        }}>
                                                    <Image style={{width:0.051*width,height:0.05*width,}} source={require('../images/PHTO.png')} />
                                                    <Text style={{marginLeft:0.01*width, fontSize:18,color:"#b3ffb4"}}>歌词海报</Text>
                                                    </View>
                                                </TouchableOpacity>

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

export default songwordpost