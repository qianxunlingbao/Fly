import React, { Component } from "react";
import { 
    Modal, 
    Text, 
    TouchableHighlight, 
    View, 
    Dimensions,
    Image,
    FlatList
} from "react-native";

const {width,scale,height} = Dimensions.get('window');

const s = width / 640;

export default class confirmModal extends Component {
    constructor(){
        super();
        this.state = {
            data: [
                {
                    title: '微信好友',
                    img: require('../images/weixinhaoyou.png')
                },
                {
                    title: '朋友圈',
                    img: require('../images/pengyouquan.png')
                },{
                    title: 'QQ好友',
                    img: require('../images/QQhaoyou.png')
                },{
                    title: 'QQ空间',
                    img: require('../images/QQkongjian.png')
                },{
                    title: '新浪微博',
                    img: require('../images/xinlangweibo.png')
                },{
                    title: '私信',
                    img: require('../images/sixin.png')
                },{
                    title: '复制链接',
                    img: require('../images/23.png')
                },{
                    title: '音乐卡片',
                    img: require('../images/yinyuekapian.png')
                }

            ]
        }
    }
  _setModalVisible(visible) {
    this.props.callback(visible)
  }

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={
                {
                    height:height*0.1,
                    marginTop:'150%', 
                    justifyContent:'center', 
                    alignItems:'center', 
                    backgroundColor:'rgba(0,0,0,0.5)',
                    width:width
                }
            }>
                <View style={
                    {
                        height:width*0.5,  
                        width:width, 
                        margin:20, 
                        backgroundColor:'white',
                        top:'0%'
                    }
                }>
                    <View style={
                        {
                            flex:1, 
                            justifyContent:'center',
                            alignItems:'center', 
                            borderWidth:1, 
                            borderBottomColor:'#eee'
                        }
                    }>
                        <FlatList
                            style={{backgroundColor: 'white'}}
                            data={this.state.data}
                            numColumns={4}
                            renderItem={({item})=>(
                                <View style={
                                    {
                                        
                                    }
                                }>
                                    <Image 
                                        resizeMode="contain"
                                        source={item.img}
                                        style={
                                            {
                                                width:width*0.25,
                                                height:80*s,
                                                marginTop: 15*s
                                            }}
                                    />
                                    <Text
                                        style={
                                            {
                                                textAlign:'center',
                                                color:'black',
                                                fontSize:15
                                            }
                                        }
                                    
                                    >{item.title}</Text>
                                    
                                </View>
                            )}      
                        />                        
                    </View>
                    <TouchableHighlight
                        onPress={() => {
                        this._setModalVisible(!this.props.modalVisible);
                        }}
                        style={
                            {
                                height:50, 
                                justifyContent:'center', 
                                alignItems:'center'
                            }
                        }
                    >
                        <Text style={
                            {
                                color:'red',
                                fontSize:18,
                                marginTop:-40*s
                            }
                        }>取消分享</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
  }
}