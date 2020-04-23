import React, { Component } from 'react'
import { 
    Animated, 
    Easing, 
    TextInput,
    View, 
    ActivityIndicator, 
    Text, 
    Image,
    FlatList, 
    Dimensions ,
    ScrollView, 
    TouchableOpacity,
    StyleSheet ,
    AsyncStorage
} from 'react-native';

import Button from 'react-native-button';

import ImagePicker from 'react-native-image-picker';

import Video from 'react-native-video';

import { Actions } from 'react-native-router-flux';

const {width,scale,height} = Dimensions.get('window');

const s = width / 640;

const options = {
    title: '选择图片来源',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};


export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            value2:'精选',
            value1:'点赞 0',
            value3:'评论 0',
            value:'',
            
            width: new Animated.Value(20),
            imageUrl:'',
            isloading:false,
            tianjiaguanzhu: '+关注',
            isAdd: false
        }
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
               
              const source = { uri: response.uri };
              this.setState({
                imageUrl: source,
              });
            }
          });
   }
    // 获取输入框内值的方法
    getValue = (text) => {
        　this.setState({
        　　　value: text
        　});
    }
    getValue1 = (text) => {
        　this.setState({
        　　　value1: text
        　});
    }
    clickSetData = async () => {
        await AsyncStorage.setItem('mykey', this.state.value);
    }
    clickGetData= async ()=>{
        const value = await AsyncStorage.getItem('mykey');
        console.warn(value);
    } 
    
    tianjiaguanzhu(){
        this.setState({
            isAdd:!this.state.isAdd,
            tianjiaguanzhu: this.state.isAdd ? '+关注' : '已关注'
        })
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{
                    height:height*0.05,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'white'
                }}>
                    <Text style={{fontSize:25}}>发布动态</Text>
                </View>
                <View style={{
                    width:width*0.9,
                    height:height*0.25,
                    marginLeft:width*0.05}}>
                    <TouchableOpacity onPress={()=>Actions.CustomScrollView()}>
                        <Text style={{
                            color:'blue',
                            fontSize:15,
                            fontStyle:'italic',
                            textDecorationLine:'underline'
                        }}>李信：千乘万骑，走北邙。>>> </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{
                            color:'white',
                            fontSize:15,
                            fontStyle:'italic',
                            textDecorationLine:'underline'
                        }}>吕布：从此刻开始，战场由我一人主宰可有人敢与我一战。 >>> </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{
                            color:'white',
                            fontSize:15,
                            fontStyle:'italic',
                            textDecorationLine:'underline'
                        }}>典韦：身体里沉睡的野兽，觉醒啦！！！ >>> </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{
                            color:'white',
                            fontSize:15,
                            fontStyle:'italic',
                            textDecorationLine:'underline'
                        }}>狄仁杰：打击罪恶，为无辜者代言。元芳，你怎么看？？？ >>> </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{
                            color:'red',
                            fontSize:15,
                            fontStyle:'italic',
                            textDecorationLine:'underline'
                        }}>花木兰：离家太远，会忘记故乡，杀人太多会忘记自己。谁说女子不如男，永不放弃，不会认输。>>> </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{
                            color:'white',
                            fontSize:15,
                            fontStyle:'italic',
                            textDecorationLine:'underline'
                        }}>孙悟空：取经之路就在脚下，超脱三界之外，不在五行之中。>>> </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{
                            color:'white',
                            fontSize:15,
                            fontStyle:'italic',
                            textDecorationLine:'underline'
                        }}>李白：一片诗意的酒，一曲长歌。一剑天涯，但愿长醉不复醒。>>> </Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                　　style = {{
                        width:width*0.8,
                        height: height*0.1, 
                        borderColor: 'gray', 
                        borderWidth: 1, 
                        borderRadius: 3,
                        marginLeft:width*0.1,
                        backgroundColor:'#eeeaaa'
                    }}
                　　returnKeyType = "next"
                　　placeholder = "输入您想发布的文字"
                　　onChangeText = {this.getValue}
                />
                <View style={styles.good}>
                            <View style={{
                                width:'100%',
                                height:height*0.07
                            }}>
                                <Image 
                                    resizeMode="contain"
                                    source={require('../images/huachenyu.png')}
                                    style={styles.touxiang1}
                                />
                                <Text
                                    style={styles.mingzi}
                                >企鹅1号</Text>
                                <TouchableOpacity style={styles.jiaguanzhu} onPress={()=>this.tianjiaguanzhu()}>
                                    <Text>{this.state.tianjiaguanzhu}</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text>
                                    {this.state.value}   
                                </Text>
                                
                            </View>
                            <View style={{
                                width:'100%',
                                height:height*0.3
                            }}>
                               <View style={{
                                   height:height*0.25,
                                   borderColor:'black',
                                   borderWidth:1
                                }}>
                                    <Button 
                                        onPress={()=>{this.takephoto()}}                     
                                    >
                                        <Text style={{
                                            position:'absolute'
                                        }}>+添加图片</Text>
                                        <Image style={{
                                            width:'100%',
                                            height:height*0.25,
                                            position:'relative'
                                            }}
                                            source={this.state.imageUrl}
                                        />
                                    </Button>
                                    
                                    
                                </View>
                            </View>
                            <View>
                                <Text>
                                    {this.state.value2}   
                                </Text>
                                <Text style={styles.dianzan}>
                                    {this.state.value1} {this.state.value3}
                                </Text>
                            </View>
                            
                        </View>
                        <TouchableOpacity       
                                style={{marginLeft:width*0.3,
                                    borderRadius:25,
                                    borderColor:'black',
                                    borderWidth:1,
                                    backgroundColor:'#eeeaaa',
                                    width:width*0.4,
                                    marginTop:width*0.1
                                }}            
                                onPress={() => this.clickSetData()}
                            >
                                <Text style={{
                                    fontSize:24,
                                    textAlign:'center'
                                }}>点击发布</Text>
                            </TouchableOpacity>
                            <TouchableOpacity   
                                style={{
                                    marginLeft:width*0.8,
                                    borderRadius:25,
                                    borderColor:'white',
                                    borderWidth:1,
                                    backgroundColor:'white',
                                    width:width*0.13
                                }}                              
                                onPress={() => this.clickGetData()}
                            >
                                <Text>终端数据</Text>
                            </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    good:{
        width: 600*s,
        height: height*0.42,
        backgroundColor: '#fff',
        marginLeft: 20*s,
        marginTop: 20*s,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        //alignItems: 'center'
    },
    mingzi: {
        marginTop:-width*0.07,
        marginLeft:width*0.12
    },
    jiaguanzhu: {
        marginTop:-width*0.04,
        marginLeft:width*0.8
    },
    backgroundVideo1: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    dianzan: {
        marginLeft:width*0.7,
        marginTop:-width*0.043
    },
    img: {
        width: '100%',
        height: '100%'
    },
    touxiangfanwei: {
        height:height*0.115
    },
    touxiang: {
        width:width*0.15,
        height:width*0.15
    },
    touxiang1: {
        width:width*0.1,
        height:width*0.1
    },
    slide: {
        flex: 1,
        height: '100%',
        width: width*0.8,
        alignItems: 'center'
    },
    slide1: {
        flex: 1,
        height: '100%',
        alignItems: 'center'
    },
    slide2:{
        width: width/6.2,
        height: height*0.11,
        marginTop:width*0.01,
        justifyContent:'center',
        alignItems:'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    pause: {
        position: 'absolute',
        marginTop:width*0.44,
        marginLeft:width*0.05
    },
    btn:{
        width: width*0.25,
        height: width*0.25,
        color: '#fff',
        marginTop: width*0.05,
        marginLeft: width*0.38,
        textAlignVertical: 'center',
        borderRadius: 100,
        backgroundColor: 'black'
    }
})