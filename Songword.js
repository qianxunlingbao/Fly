import React, {Component} from 'react';
import {Platform, StyleSheet,ScrollView , TouchableOpacity,Text,TouchableWithoutFeedback, View,ProgressBarAndroid,Button,Slider, Image,Dimensions,ToastAndroid } from 'react-native';

import {Actions} from 'react-native-router-flux';

var {width, height} = Dimensions.get('window');
export default class songword extends Component {
	renderChildView(){
		// 数组
		var allChild = [];
		var colors = ['red', 'green', 'blue', 'yellow', 'purple'];
		// 遍历
	   for(var i=0; i<5; i++){
		 allChild.push(
		   //  循环排列的view中必须有唯一表示
			 <View key={i} style={{backgroundColor:colors[i], width:width, height:200}}>
				<Text style={{flex:1,fontSize:20,marginTop:50,marginLeft:100}}>{colors[i]}</Text>
			 </View>
		 );
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
				<Text style={{color:'#ddd',fontSize:30}}>歌名</Text>
				<TouchableWithoutFeedback    >
					<Text style={{color:'#ddd',marginTop:width*0.01,marginBottom:width*0.02}}>歌手链接</Text>
				</TouchableWithoutFeedback>
			</View>
			<View style={{flex:33}}>
			<ScrollView
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
