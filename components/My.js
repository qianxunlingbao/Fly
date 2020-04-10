import React, { Component } from 'react'
import { 
    StyleSheet, 
    View, 
    Text ,
    Image, 
    ScrollView 
    ,Dimensions, 
    TouchableOpacity, 
    FlatList,
} from 'react-native'
const {width,height} = Dimensions.get('window');
import Devider from './Devide'
class My extends Component {
    constructor(){
        super();
        this.state={
            name:'网名不好起',
            recommend:'学而思VIP待领取',
            like:388,
            recent:200,
            download:112,
            buy:0,
            create:4,
            collect:2,
            menu:[1,0],
            createdata:[{key:'1',title:'国漫古风',num:3},{key:'2',title:'石川绫子',num:2},{key:'3',title:'永远的七日之都',num:2},{key:'4',title:'左翼',num:2}]
                }
    }
   
    render() {
        return (
            <View 
            style={styles.container}
            >
                <ScrollView 
                showsVerticalScrollIndicator={false} 
                >
                <View  style={{width:width,alignItems:'center'}}>
                <View style={styles.basicinfo}>
                        <View style={styles.uphalf}>
                            <TouchableOpacity style={styles.headImg}>
                            </TouchableOpacity>
                            <Text style={{marginLeft:20,fontSize:20}}>{this.state.name}</Text>
                            <Image style={{width:25,height:25,marginLeft:10}} source={require('../images/diamond.png')}/>
                            <Image style={{width:25,height:25}} source={require('../images/ear.png')}/>
                            <Image style={{width:25,height:25,marginLeft:width*0.8*0.3}} source={require('../images/email.png')}/>
                        </View>
                        <Devider style={styles.deviderstyle}/>
                        <View style={styles.downhalf}>
                            <View style={styles.half}>
                            <Image style={{width:25,height:25,marginLeft:10}} source={require('../images/label.png')}/>
                            <View style={styles.doubles}>
                                <Text style={{fontSize:18}}>活动中心</Text>
                                <Text style={{color:'grey'}}>每日签到有绿钻</Text>
                            </View>
                            </View>
                            <View style={styles.half}>
                            <Image style={{width:25,height:25,marginLeft:10}} source={require('../images/diamond.png')}/>
                            <View style={styles.doubles}>
                                <Text style={{fontSize:18}}>会员中心</Text>
                                <Text style={{color:'grey'}}>{this.state.recommend}</Text>
                            </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.fkind}>
                        <FlatList
                        data={[{key:"like",title:'喜欢',value:require('../images/like.png')},
                        {key:"recent",title:'最近',value:require('../images/clock.png')},
                        {key:"download",title:'本地',value:require('../images/download.png')},
                        {key:"buy",title:'已购',value:require('../images/buy.png')}
                    ]}
                        numColumns={4}
                        renderItem={({item})=>
                        <View style={{alignItems:"center",marginLeft:(width * 0.8 - 180) / 5}}>
                            <Image style={{width:45,height:45,color:'green'}} source={item.value}/> 
                            <Text>{item.title}</Text>
                            <Text>{this.state[item.key]}</Text>
                        </View>
                        }
                        />
                    </View>
                    <View style={styles.alonekind}>
                        <Text style={{fontSize:20,marginTop:10,marginLeft:20}}>智能分类</Text>
                        <View style={{marginTop:10,marginLeft:20,width:width * 0.8 * 0.8 ,height:height * 0.1 * 0.4,flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity 
                            style={{
                                paddingLeft:10,
                                paddingRight:10,
                                borderRadius:height * 0.1 *0.2,
                                borderWidth:1,
                                borderColor:'grey',
                                marginRight:10,
                                justifyContent:"center",
                                alignItems:"center"
                            }}>
                                <Text style={{fontSize:16,textAlign:'center'}}>全部音乐</Text>
                            </TouchableOpacity >
                            <TouchableOpacity style={
                                {
                                    paddingLeft:10,
                                    paddingRight:10,
                                    borderRadius:height * 0.1 *0.2,
                                    borderWidth:1,
                                    borderColor:'grey',
                                    marginRight:10,
                                    justifyContent:"center",
                                    alignItems:"center"
                                }
                            }>
                                <Text  style={{fontSize:16,textAlign:'center'}}>古风</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={
                                {
                                    paddingLeft:10,
                                    paddingRight:10,
                                    borderRadius:height * 0.1 *0.2,
                                    borderWidth:1,
                                    borderColor:'grey',
                                    marginRight:10,
                                    justifyContent:"center",
                                    alignItems:"center"
                                }
                            }>
                                <Text  style={{fontSize:16,textAlign:'center'}}>ACG歌曲</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.songlist}>
                        <View style={{flexDirection:'row'}}>
                        <TouchableOpacity  onPress={()=>this.setState({menu:[1,0]})}>
                        <Text style={{fontSize:20,textAlign:'center',color:this.state.menu[0]?'black':'grey'}}>自建歌单{this.state.create}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({menu:[0,1]})} >
                        <Text style={{fontSize:20,textAlign:'center',color:this.state.menu[1]?'black':'grey',marginLeft:20}}>收藏歌单{this.state.collect}</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{margintop:10}}>
                            <FlatList
                            data={this.state.createdata}
                            renderItem={({item})=>
                                <View style={styles.createlist}>
                                    <View style={{backgroundColor:'blue',width:'20%',height:'90%',borderRadius:10}}></View>
                                    <View style={{marginLeft:10}}>
                                        <Text style={{fontSize:16,marginBottom:10}}>{item.title}</Text>
                                        <Text style={{color:'grey',marginBottom:10}}>{item.num}首</Text>
                                    </View>
                                    <Image style={{width:1,height:25,marginLeft:'80%',position:'absolute'}} source={require('../images/right.png')}/>
                                </View>
                            }
                            />
                        </View>
                    </View>
                </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
    },
    basicinfo:{
        backgroundColor:'white',
        width:width * 0.8,
        height:height * 0.2,
        marginTop:10,
        borderRadius:height * 0.2 * 0.1

    },
    fkind:{
        width:width * 0.8,
        height:height * 0.1,
        marginTop:10,
        borderRadius:height * 0.2 * 0.1,
        flexDirection:'row',
        alignItems:'center'

    },
    createlist:{
        width:width * 0.8,
        height:height * 0.1,
        marginTop:10,
        borderRadius:height * 0.2 * 0.1,
        flexDirection:'row',
        alignItems:'center'
    },
    alonekind:{
        width:width * 0.8,
        height:height * 0.1,
        marginTop:10,
        borderRadius:height * 0.2 * 0.1,
        backgroundColor:'white'
    },
    deviderstyle:{
        width:width*0.8,
        height:1,
        backgroundColor:'#eeeeee',
        position:"absolute",
        marginTop:height * 0.2 * 0.5,
        marginBottom:height * 0.2 * 0.5
    },
    uphalf:{
        width:width * 0.8,
        height:height * 0.099,
        flexDirection:'row',
        alignItems:"center"
    },
    downhalf:{
        width:width * 0.8,
        height:height * 0.097,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-around'
    },
    headImg:{
        width:height * 0.2 * 0.3,
        height:height * 0.2 * 0.3,
        borderRadius:height * 0.2 * 0.3 * 0.5,
        backgroundColor:'blue',
        marginLeft:width*0.8*0.05
    },
    half:{
        width:width * 0.8 * 0.4,
        height:height * 0.09,
        flexDirection:'row',
        alignItems:"center"
    },
 
    doubles:{
        width:width * 0.8 * 0.3,
        height:height * 0.07,
        justifyContent:'center',
        marginLeft:5
    },
    songlist:{
        width:width * 0.8,
        justifyContent:"center"
    }
})

export default My