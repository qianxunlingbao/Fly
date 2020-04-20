import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    Animated,
    TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import Button from 'react-native-button';

import ImagePicker from 'react-native-image-picker';

const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const goods = [
    {
        title: '账户管理',
        img: require('../assets/10.png')
    },
    {
        title: '收货地址',
        img: require('../assets/11.png')
    },
    {
        title: '我的信息',
        img: require('../assets/12.png')
    },
    {
        title: '我的订单',
        img: require('../assets/13.png')
    },
    {
        title: '我的二维码',
        img: require('../assets/14.png')
    },
    {
        title: '我的积分',
        img: require('../assets/15.png')
    },
    {
        title: '我的收藏',
        img: require('../assets/16.png')
    }
]
const goodsluck = [
    {
        title: '居家维修保养',
        img: require('../assets/10.png')
    },
    {
        title: '出行接送',
        img: require('../assets/14.png')
    },
    {
        title: '我的受赠人',
        img: require('../assets/16.png')
    },
    {
        title: '我的住宿优惠',
        img: require('../assets/16.png')
    },
    {
        title: '我的活动',
        img: require('../assets/14.png')
    },
    {
        title: '我的发布',
        img: require('../assets/10.png')
    }
]
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};

export default class Person extends Component {
    constructor(){
        super();
        let data = [];
        for(var i=0; i<10; i++){
            data.push({tit:i,key:i});
        }
        this.state = {
            data,
            width: new Animated.Value(20),
            imageUrl:'',
            isloading:false
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
    render() {
        return (
            <View>
                <View style={{height:height*0.25,backgroundColor:'red'}}>
                    <View style={styles.btn}>
                    <Button 
                        onPress={()=>{this.takephoto()}}                     
                    ><Image style={{width:width*0.2,height:height*0.1,marginTop:width*0.12,marginLeft:width*0.4}} source={this.state.imageUrl} />
                    </Button>
                    </View>
                    <Text style={{marginTop:10,fontSize:20,color:'#fff',marginLeft:width*0.35}}>BINNU DHILLON</Text>
                </View>
                <View style={{height:height*0.06,borderBottomWidth:3,borderBottomColor:'#ccc'}}>
                    <Image style={{width:width*0.07,height:height*0.04,marginLeft:10,marginTop:6}} source={require('../assets/2.png')} />
                    <Text style={{fontSize:20,marginTop:-30,marginLeft:50}}>我的个人中心</Text>
                </View>
                <FlatList 
                    style={{backgroundColor: '#fff',width:width,height:height*0.29,borderBottomWidth:5,borderBottomColor:'#ccc'}}
                    data={goods}
                    numColumns={3}
                    renderItem={({item})=>(
                        <View style={styles.good}>
                            <Image 
                                resizeMode="contain"
                                source={item.img}
                                style={{height:height*0.03,marginTop: height*0.02}}
                            />
                            <Text
                                style={{marginTop: height*0.01}}   
                            >{item.title}</Text>
                            
                        </View>
                    )}
                />
                <View style={{height:height*0.06,borderBottomWidth:3,borderBottomColor:'#ccc'}}>
                    <Image style={{width:width*0.07,height:height*0.04,marginLeft:10,marginTop:6}} source={require('../assets/2.png')} />
                    <Text style={{fontSize:20,marginTop:-30,marginLeft:50}}>E族活动</Text>
                </View>
                <FlatList 
                    style={{backgroundColor: '#fff',width:width,height:height*0.2}}
                    data={goodsluck}
                    numColumns={3}
                    renderItem={({item})=>(
                        <View style={styles.good}>
                            <Image 
                                resizeMode="contain"
                                source={item.img}
                                style={{height:height*0.03,marginTop: height*0.02}}
                            />
                            <Button
                                onPress={()=>Actions.fabu()}
                                style={{marginTop: height*0.01}}   
                            >{item.title}</Button>
                            
                            
                        </View>
                    )}
                />
                <View style={styles.seventh}>
                    <TouchableOpacity onPress={()=>Actions.login()}>
                        <Text style={{fontSize:15,color:'#black'}}>退出登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    good:{
        width: width*0.33,
        alignItems: 'center'
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
    },
    seventh:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    }
})
