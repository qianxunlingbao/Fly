import React, { Component } from 'react';
import {View, Text, FlatList, Dimensions,TouchableOpacity  ,ScrollView, Image,TextInput,StyleSheet,StatusBar,AsyncStorage, } from 'react-native';
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
import { Grid, Icon } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Actions} from 'react-native-router-flux';

const {width} = Dimensions.get('window');

const options = {
    title: '请选择',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '从相册选择图片',
    customButtons: [{ name: 'fb', title: '从 Facebook 选择图片' }],
    cancelButtonTitle: '取消',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};

const own = [
    {
        title: '账户管理',
        img: require('../../assets/icon/gl.jpg')
    },
    {
        title: '收货地址',
        img: require('../../assets/icon/dz.jpg')
    },
    {
        title: '我的信息',
        img: require('../../assets/icon/xx.jpg')
    },
    {
        title: '我的订单',
        img: require('../../assets/icon/dd.jpg')
    },
    {
        title: '我的二维码',
        img: require('../../assets/icon/ewm.jpg')
    },
    {
        title: '我的积分',
        img: require('../../assets/icon/jf.jpg')
    },
    {
        title: '我的收藏',
        img: require('../../assets/icon/sc.jpg')
    },
    
]


const ats = [
    {
        title: '居家维修保养',
        img: require('../../assets/icon/wx.jpg')
    },
    {
        title: '出行接送',
        img: require('../../assets/icon/cx.jpg')
    },
    {
        title: '我的受赠人',
        img: require('../../assets/icon/ren.jpg')
    },
    {
        title: '我的住宿优惠',
        img: require('../../assets/icon/bed.jpg')
    },
    {
        title: '我的活动',
        img: require('../../assets/icon/qz.jpg')
    },
    {
        title: '我的发布',
        img: require('../../assets/icon/fb.jpg')
        
    },
    
]



export default class Userinfor extends Component {
    constructor(){
        super();
        this.state = {
            imageUrl:'',
            t:'0'
        }
    }
    
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
    out=()=>{
        AsyncStorage.removeItem('user')
            .then(() => {
                Actions.login();
            });
    }
    render() {
        return (
            <ScrollView style={{backgroundColor:'#f5f5f5'}}>
                <View style={{flex: 1,}}>
                    <StatusBar backgroundColor="red" />
                   
                    <View  style={{width:width,height:250,backgroundColor:'#f23030',position:'relative'}}>
                        
                        
                        <View style={{width:100,height:100,position:'absolute',top:'20%',left:'40%'}}>
                            <TouchableOpacity   onPress={()=>{this.takephoto()}}>
                                {this.state.t==='1'?<Image  style={{width:100,height:100,borderRadius:50}} source={this.state.imageUrl}  />:<Image  style={{width:100,height:100,borderRadius:50}} source={require('../../assets/tx.jpg')}  />}
                            </TouchableOpacity>
                        </View>
                        
                        <Text  style={{color:"white",fontSize:22,position:'absolute',top:'65%',left:'35%'}}>BINNU DHILLON</Text>
                    </View>


                    <View style={{backgroundColor:"white",width:width,height:300,}}>
                        <View style={{width:width,height:43,position:'relative'}}>
                            <Image style={{width:20,height:25,position:'absolute',top:'25%',left:'5%'}} source={require('../../assets/gr.jpg')} />
                            <Text style={{color:"#4f4e4e",fontSize:17,position:'absolute',top:'25%',left:'13%'}}>我的个人中心</Text>
                        </View>
                        <View style={{width:'100%',height:2,backgroundColor:'#eee',marginTop:'1%'}}></View>
                        <FlatList 
                            
                            data={own}
                            numColumns={3}
                            renderItem={({item})=>(
                                <View style={{width:width*0.33,marginTop:'2%',marginBottom:'2%',alignItems:'center'}}>
                                    <Image 
                                        resizeMode="contain"
                                        source={item.img}
                                        style={{width:30,height:30,marginTop:'3%',marginBottom:'5%'}}
                                    />
                                    <Text style={{fontSize:16,color:'#333',textAlignVertical:'center'}} >{item.title}</Text>
                                    
                                </View>
                            )}
                            
                        />
                    </View>


                    <View style={{backgroundColor:"white",width:width,height:230,marginTop:5,marginBottom:10}}>
                        <View style={{width:width,height:43,position:'relative'}}>
                            <Image style={{width:25,height:25,position:'absolute',top:'30%',left:'5%'}} source={require('../../assets/hd.jpg')} />
                            <Text style={{color:"#4f4e4e",fontSize:17,position:'absolute',top:'25%',left:'15%'}}>E族活动</Text>
                        </View>
                        <View style={{width:'100%',height:2,backgroundColor:'#eee',marginTop:'1%'}}></View>
                        <FlatList 
                            
                            data={ats}
                            numColumns={3}
                            renderItem={({item})=>(
                                <View style={{width:width*0.33,marginTop:'2%',marginBottom:'2%',alignItems:'center'}}>
                                    <Image 
                                        resizeMode="contain"
                                        source={item.img}
                                        style={{width:30,height:30,marginTop:'3%',marginBottom:'5%'}}
                                    />
                                    {item.title==='我的发布'?<Button onPress={()=>Actions.publish()} style={{fontSize:16,color:'#333',textAlignVertical:'center'}} >{item.title}</Button>:<Button style={{fontSize:16,color:'#333',textAlignVertical:'center'}} >{item.title}</Button>}
                                    
                                </View>
                            )}
                            
                        />
                    </View>
                    <TouchableOpacity 
                        style={{
                            width: '40%',
                            height: 40,
                            borderRadius:20,
                            backgroundColor: 'red',
                            marginTop: 10,
                            marginLeft:'30%',
                            marginBottom:10,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this.out}>
                        <Text style={{color:'white'}}>退出登录</Text>
                    </TouchableOpacity>

                    <Text style={{marginLeft:'40%',marginBottom:5,color:'#767676',alignItems:'center',justifyContent:'center'}}>BINNU DHILLON | 退出</Text>
                </View>
            </ScrollView>
        )
    }
}
