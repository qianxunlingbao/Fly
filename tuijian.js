import React, {Component} from 'react';
import {Platform, StyleSheet,ScrollView , TouchableOpacity,Text,TouchableWithoutFeedback,Animated, View,ProgressBarAndroid,Button,Slider, Image,Dimensions,ToastAndroid } from 'react-native';

import {Actions} from 'react-native-router-flux';
import { hasCommonDiff } from 'jest-diff/build/printDiffs';

var {width, height} = Dimensions.get('window');
export default class tuijian extends Component {

    render() {
        return (
<View style={styles.container}>
	<View style={{flex:50}}>
		<View style={{flexDirection:'row',height:height*0.1}}>
            <View  style={{flex:1,marginLeft:'7%',justifyContent:'center'}}  >
                <TouchableWithoutFeedback  onPress={()=>Actions.pop()}>
		    	<Image style={{width:'35%',height:'20%'}} source={require('./down.png')} />
			    </TouchableWithoutFeedback>
            </View>
			
			<View  style={{flex:5,justifyContent:'center', alignItems: 'center',flexDirection:'row'}}>
				<TouchableWithoutFeedback  onPress={()=>Actions.userinfor()}>
                    <Text style={{color:'#fff'}}>推荐</Text>
                </TouchableWithoutFeedback>
					<Text>  |  </Text>
                <TouchableWithoutFeedback onPress={()=>Actions.publish()}>
				    <Text >歌曲</Text>
                </TouchableWithoutFeedback>
					<Text>  |  </Text>
                <TouchableWithoutFeedback  >
					<Text >歌词</Text>
                </TouchableWithoutFeedback>
			</View>
            <View  style={{flex:1,marginLeft:'7%',justifyContent:'center'}}  >
				<TouchableWithoutFeedback    >
				    <Image style={{width:'35%',height:'20%'}} source={require('./share.png')} />
				</TouchableWithoutFeedback>
            </View>
		</View>
        <ScrollView  style={{height:height*0.9,marginLeft:width*0.05}}>
        <View >
        
            <View style={{height:height*0.12,backgroundColor:'#999',width:width*0.9,borderRadius:width*0.02
            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02}}>
			<Text style={{fontSize:25,color:'#fff'}}>当你老了</Text>
            <Text style={{fontSize:10,color:'#ccc'}}>2015年03月27日发行  歌曲详情</Text>
            <View style={{borderTopColor:'#fff',borderTopWidth:1,marginTop:height*0.01,marginBottom:height*0.01}}>
            </View>
            <Text style={{fontSize:13,color:'#fff'}}>歌手：赵照                                                                   专辑：当你老了</Text>
			</View>
            <View style={{height:height*0.2,backgroundColor:'#999',width:width*0.9,borderRadius:width*0.02
            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02}}>
			<Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>相关歌曲</Text>
            <Text style={{fontSize:18,color:'#ccc',marginBottom:height*0.01}}>2015年03月27日发行  歌曲详情</Text>
            <Text style={{fontSize:18,color:'#ccc',marginBottom:height*0.01}}>别哭，我最爱的人-水木年华</Text>
            <Text style={{fontSize:18,color:'#ccc',marginBottom:height*0.01}}>天空之城(Live)-蒋国豪</Text>
            <Text style={{fontSize:18,color:'#ccc',marginBottom:height*0.01}}>未给姐姐递出的信-赵雷</Text>
			</View>
            <View style={{height:height*0.12,backgroundColor:'#999',width:width*0.9,borderRadius:width*0.02
            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02}}>
			<Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>其他版本</Text>
            <Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>当你老了（原唱：赵照）</Text>
            <Text style={{fontSize:13,color:'#ccc',marginBottom:height*0.01}}>秋叶牧阳：青春之歌</Text>                          
			</View>
            <View style={{height:height*0.35,width:width*0.9,borderRadius:width*0.02
            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02}}>
            <Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>相关歌单</Text>    
			</View>
            <View style={{height:height*0.3,width:width*0.9,borderRadius:width*0.02
            ,paddingLeft:width*0.03,paddingTop:height*0.01,marginBottom:height*0.02}}>
            <Text style={{fontSize:18,color:'#fff',marginBottom:height*0.01}}>相关视频</Text> 
			</View>
        </View>
        </ScrollView>

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
