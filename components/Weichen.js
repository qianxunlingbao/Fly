import React, { Component,useState } from 'react'
import {
    View, 
    Text, 
    AsyncStorage,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    ToastAndroid,
    Modal,
    StatusBar,
    Image,
    StyleSheet,
    FlatList,
    TouchableHighlight,
} from 'react-native';

import ConfirmModal from './ConfirmModal';

import { Actions } from 'react-native-router-flux';

const {width,scale,height} = Dimensions.get('window');

export default class Huachenyu extends Component {
    constructor(){
        super();
        this.state = {
            data: [
                {music_name:'星辰大海是你 (《那片星空那片海第二季》',music_value:'为你挡下人间锋利/再多伤也要重遇'},
                {music_name:'流星雨又来临 (《一起又看流星雨》电视剧',music_value:'流星雨又来临 用一辈子感动你'},
                {music_name:'烈火神盾 (《麻辣变形计第一季》电视剧',music_value:'让战斗捍卫你那最后的正义/冲破黑暗才迎接明天'},
                {music_name:'红尘 (《将夜》影视剧夫子人物主题曲)',music_value:'只道 红尘多纷扰/红尘多美好'},
                {music_name:'红尘多美好',music_value:'向快乐出发 世界那么大/任风吹雨打 梦总会到达'},
                {music_name:'重返十七岁 (新版) ',music_value:'还记得当时头发那么黑/忽然被时间沾染了灰'},
                {music_name:'天下有情人',music_value:'郁可唯 / 魏晨'},
                {music_name:'旅程 (Journey) ',music_value:'魏晨 (Vision Wei)'},
                {music_name:'默默回味',music_value:'美好的时光/就此悄然搁浅'},
                {music_name:'做个神仙',music_value:'移山倒海的境界/只为与你风花雪月'},
                {music_name:'来生愿做一朵莲',music_value:'来生愿做一朵莲/静静盛开在佛前'},
                {music_name:'红尘雨',music_value:'盘尼西林乐队/欧阳娜娜▪乐队的夏天 第7期'},
                {music_name:'愿(Live)',music_value:'欧阳娜娜▪北灵少年志之大主宰 电视剧影视…'},
                {music_name:'红尘来去一场梦',music_value:'欧阳娜娜▪To Me'},
            ],
            num: 1,
            page: 0,
            isloading:false,
            guanzhu: '+关注',
            isAdd:false,
            key: 0,
            menu:[1,0,0,0,0],
            createdata:[],
            addposition:'absolute',
            addflex:'flex',
            modalVisible: false ,
            content:'I come from Parent component',
            title:'是否举报？'
        }
    }
    componentDidMount = ()=>{
        
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    guanzhu(){
        this.setState({
            isAdd:!this.state.isAdd,
            guanzhu: this.state.isAdd ? '+关注' : '已关注'
        })
    }
    jubao(){
        alert(
            11
        )
    }
    render() {
        return (
            <View>
                {/* 状态栏 //fetch('http://49.235.231.110:8800/music') */}
                <StatusBar backgroundColor='#AAAAAA' translucent={true}/>
                <View style={{
                    
                    width:width,
                    backgroundColor:'#AAAAAA',
                    opacity:0.5,
                    height:height*0.05
                }}>
                    <View style={{width:width*0.1}}>
                        <TouchableOpacity 
                            onPress={()=>Actions.Condition()}
                        >
                            <Text style={{
                                textAlign:"center",
                                fontSize:25
                            }}>〈</Text>
                        </TouchableOpacity>
                    
                    </View>
                    <View style={{width:width*0.5}}>
                        <ConfirmModal
                            modalVisible={this.state.modalVisible}
                            content={this.state.content}
                            callback={this.setModalVisible.bind(this)}
                            >
                        </ConfirmModal>
                        <TouchableOpacity style={{
                            marginLeft:width*0.36,
                            borderRadius:25,
                            borderColor:'black',
                            backgroundColor:'#AAAAAA',
                            width:width*0.3,
                            marginTop:-height*0.03
                            }} 
                        >
                            <Text style={{
                                textAlign:'center',
                                fontSize:20
                            }}>
                                魏晨
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop:-height*0.04,
                            marginLeft:width*0.8
                        }}
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                    >
                        <Image style={{
                            width:width*0.052,
                            height:width*0.052,
                            marginTop:width*0.01
                        }} source={require('../images/share.png')} />
                    </TouchableOpacity>     
                    <TouchableOpacity
                        style={{
                            marginTop:-height*0.04,
                            marginLeft:width*0.9
                        }}
                        onPress={
                            () => {
                                alert(
                                    this.state.title
                                );
                            }
                        }
                    >
                        <Image style={{
                            width:width*0.052,
                            height:width*0.052,
                            marginTop:width*0.02
                        }} source={require('../images/ellipsis.png')} />
                    </TouchableOpacity>  
                </View>  
                <ScrollView>
                    <View style=
                        {
                            {
                                width:width,
                                hieght:height*0.25,
                            }
                        }>
                        <Image 
                            style={
                                {
                                    width:width,
                                    height:height*0.25,
                                    position:'absolute',
                                    zIndex:-1,
                                    borderBottomRightRadius:50,
                                    borderBottomLeftRadius:50

                                }
                            }
                            source={require('../images/weichen1.png')} 
                        />
                        <Text style={
                            {
                                   fontSize:22,
                                   marginTop:width*0.25,
                                   marginLeft:width*0.05
                            }
                        }>魏晨</Text>
                        <Text style={
                            {
                                   fontSize:18,
                                   color:'green',
                                   marginLeft:width*0.05
                            }
                        }>0关注   36.5万  粉丝</Text>
                        <Text style={
                            {
                                   fontSize:18,
                                   color:'red',
                                   marginLeft:width*0.05
                            }
                        }>入驻艺人</Text>
                        <TouchableOpacity style={
                            {
                                width:width*0.15,
                                height:width*0.05,
                                backgroundColor:'white',
                                marginLeft:width*0.6,
                                marginTop:-width*0.05,
                                borderRadius:50
                            }
                        }
                            onPress={()=>this.guanzhu()}
                        >
                            <Text style={
                                {
                                    textAlign:'center',
                                    fontSize:15
                                }
                            }>{this.state.guanzhu}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={
                            {
                                width:width*0.15,
                                height:width*0.05,
                                backgroundColor:'#aaaaaa',
                                marginLeft:width*0.8,
                                marginTop:-width*0.05,
                                borderRadius:50
                            }
                        }
                        >
                            <Image style={
                                {
                                   width:width*0.05,
                                   height:width*0.05,
                                   marginLeft:width*0.01
                                }
                            }
                                source={require('../images/remark.png')} />
                            <Text style={
                                {
                                    marginLeft:width*0.07,
                                    fontSize:15,
                                    color:'white',
                                    marginTop:-width*0.05
                                }
                            }>私信</Text>
                        </TouchableOpacity>
                    </View> 
                    <View>
                        <View style={
                            {
                                flexDirection:'row',
                                marginTop:width*0.05
                            }
                        }>
                            <TouchableOpacity  
                                onPress={()=>this.setState(
                                    {
                                        menu:[1,0,0,0,0],
                                        addposition:'absolute',
                                        addflex:'flex'
                                    })}
                            >
                                <Text style={
                                    {
                                        fontSize:20,
                                        textAlign:'center',
                                        marginLeft:width*0.07,
                                        color:this.state.menu[0]?'black':'grey'
                                    }
                                }>歌曲43</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>this.setState(
                                    {
                                        menu:[0,1,0,0,0],
                                        addposition:'relative',
                                        addflex:'none'
                                        })} 
                            >
                                <Text style={
                                    {
                                        fontSize:20,
                                        textAlign:'center',
                                        color:this.state.menu[1]?'black':'grey',
                                        marginLeft:width*0.05
                                    }
                                }>专辑31</Text>
                            </TouchableOpacity>   
                            <TouchableOpacity 
                                onPress={()=>this.setState(
                                    {
                                        menu:[0,0,1,0,0],
                                        addposition:'relative',
                                        addflex:'none'
                                        })} 
                            >
                                <Text style={
                                    {
                                        fontSize:20,
                                        textAlign:'center',
                                        color:this.state.menu[2]?'black':'grey',
                                        marginLeft:width*0.05
                                    }
                                }>视频51</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity 
                                onPress={()=>this.setState(
                                    {
                                        menu:[0,0,0,1,0],
                                        addposition:'relative',
                                        addflex:'none'
                                        })} 
                            >
                                <Text style={
                                    {
                                        fontSize:20,
                                        textAlign:'center',
                                        color:this.state.menu[3]?'black':'grey',
                                        marginLeft:width*0.05
                                    }
                                }>动态15</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity 
                                onPress={()=>this.setState(
                                    {
                                        menu:[0,0,0,0,1],
                                        addposition:'relative',
                                        addflex:'none'
                                        })} 
                            >
                                <Text style={
                                    {
                                        fontSize:20,
                                        textAlign:'center',
                                        color:this.state.menu[4]?'black':'grey',
                                        marginLeft:width*0.05
                                    }
                                }>关于TA</Text>
                            </TouchableOpacity>  
                        </View> 
                        {
                                this.state.addflex == 'flex' 
                                ?
                                <View>
                                    <FlatList 
                                        data={this.state.data}
                                        renderItem={({item})=>
                                            
                                            <View style={
                                                {
                                                    flex:1,
                                                    opacity:0.8,
                                                    marginTop:width*0.05,
                                                    backgroundColor:'AAAAAA'
                                                    }
                                                }>
                                                <View style={
                                                    {
                                                        width:width*0.7,
                                                        height:width*0.1
                                                    }
                                                } >
                                                    <Text style={
                                                        {
                                                            marginLeft:width*0.05,
                                                            fontSize:18
                                                        }
                                                    }>{item.music_name}</Text>
                                                    <Text style={
                                                        {
                                                            marginLeft:width*0.05
                                                        }
                                                    }>{item.music_value}</Text>
                                                </View>
                                                <View style={
                                                    {
                                                        width:width*0.15,
                                                        height:width*0.1,
                                                        marginLeft:width*0.7,
                                                        marginTop:-width*0.1
                                                    }
                                                }>
                                                    <Image style={
                                                        {
                                                            width:width*0.06,
                                                            height:width*0.06,
                                                            justifyContent:'center',
                                                            alignItems:'center',
                                                            marginLeft:width*0.045,
                                                            marginTop:width*0.02
                                                        }
                                                    }
                                                    source={require('../images/broadcast.png')} />
                                                </View>
                                                <View style={
                                                    {
                                                        width:width*0.15,
                                                        height:width*0.1,
                                                        marginLeft:width*0.8,
                                                        marginTop:-width*0.1
                                                    }
                                                }>
                                                    <Image style={
                                                        {
                                                            width:width*0.06,
                                                            height:width*0.06,
                                                            justifyContent:'center',
                                                            alignItems:'center',
                                                            marginLeft:width*0.045,
                                                            marginTop:width*0.02
                                                        }
                                                    }
                                                    source={require('../images/ellipsis.png')} />
                                                </View>
                                            </View>
                                        }
                                    />
                                </View>
                                :
                                <View style = {
                                    {
                                        height:height*0.3,
                                        justifyContent:"center",
                                        alignItems:"center"
                                    }
                                }>
                                    <Text style = {
                                        {
                                            textAlign:"center",
                                            fontSize:20
                                        }
                                    }>暂无！！！静请稍候</Text>
                                </View>
                            }  
                    </View>              
                    
                    
                    
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    
})
