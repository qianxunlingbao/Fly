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
    AsyncStorage
} from 'react-native'
const {width,height} = Dimensions.get('window');
import Devider from './Devide'
import { Actions} from 'react-native-router-flux';
import Prompt from './Prompt'
class My extends Component {
    constructor(){
        super();
        this.state={
            recommend:'学而思VIP待领取',
            like:0,
            recent:0,
            download:0,
            buy:0,
            create:'',
            collect:'',
            menu:[1,0],
            createdata:[],
            addposition:'absolute',
            addflex:'flex',
            modalVisible : false,
            listTitle : '新建歌单',

                }
    }
    _onPressEmpty = () => {
        this.setState({
            modalVisible : false,
        })
        this.setState({
            create : this.state.create - '0' + 1,
        },()=>{
            this.setState(
                {
                    createdata :[...this.state.createdata,{key:this.state.create,title : this.state.listTitle,num : 0}]
                },
                ()=>AsyncStorage.setItem('songmenu',JSON.stringify(this.state.createdata))

            )
        })
    }
    _changeListtitle = (data) => {
        this.setState({
            listTitle : data
        })
    }
    componentDidMount = () => {
        AsyncStorage.getItem('login').then(
             (val) => {
                this.setState({login : JSON.parse(val) == null ?true :JSON.parse(val)});
                }
        )
        AsyncStorage.getItem('name').then(
            (val) => {
                this.setState({name :JSON.parse(val) == null?'': JSON.parse(val)})
            }
        )
        AsyncStorage.getItem('songmenu').then(
            (val) => {
                this.setState({
                    createdata : JSON.parse(val) ==null ?'':JSON.parse(val),
                    create : JSON.parse(val) ==null ?'':JSON.parse(val).length
                })
            }
        )
    }
    componentWillMount = () => {
        
    }
    render() {
        return (
            <View 
            style={styles.container}
            >
                <Prompt 
                modalVisible = {this.state.modalVisible}
                listTitle = {this.state.listTitle}
                callback = {this._onPressEmpty}
                changecallback = {this._changeListtitle}
                />
                <ScrollView 
                showsVerticalScrollIndicator={false} 
                >
                <View  style={{width:width,alignItems:'center'}}>
                <View style={styles.basicinfo}>
                {
                        this.state.login 
                        ?<View style={styles.uphalf1}>
                            <TouchableOpacity onPress={()=>Actions.login()} style = {{width:'60%',height:'40%',backgroundColor:'green',borderRadius:50,justifyContent:"center",alignItems:"center"}}>
                                <Text style={{fontSize:18,color:'white'}}>立即登录</Text>
                            </TouchableOpacity>
                        </View> 
                        :<View style={styles.uphalf}>
                            <TouchableOpacity style={styles.uphalf} onPress = {()=>{Actions.userinfo()}}>
                            <TouchableOpacity style={styles.headImg}>
                            <Image source = {require('../images/16.png')} style={{width:height * 0.2 * 0.3,
        height:height * 0.2 * 0.3,
        borderRadius:height * 0.2 * 0.3 * 0.5,}}/>
                        </TouchableOpacity>
                        <Text style={{marginLeft:20,fontSize:20}}>{this.state.name}</Text>
                        <Image style={{width:25,height:25,marginLeft:10}} source={require('../images/diamond.png')}/>
                        <Image style={{width:25,height:25}} source={require('../images/ear.png')}/>
                        <Image style={{width:25,height:25,marginLeft:width*0.8*0.3}} source={require('../images/email.png')}/>
                            </TouchableOpacity>
                        </View> 
                    }
                
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
                        {key:"download",title:'本地',value:require('../images/download1.png')},
                        {key:"buy",title:'已购',value:require('../images/buy.png')}
                    ]}
                        numColumns={4}
                        renderItem={({item})=>
                        <TouchableOpacity onPress={()=>{
                            if(item.key == 'like'){Actions.like()}
                            if(item.key == 'recent'){Actions.recent()}
                            if(item.key == 'download'){Actions.download()}
                            if(item.key == 'buy'){Actions.buy()}
                        }}>
                            <View style={{alignItems:"center",marginLeft:(width * 0.8 - 180) / 5}}>
                            <Image style={{width:45,height:45,color:'green'}} source={item.value}/> 
                            <Text>{item.title}</Text>
                            <Text>{this.state[item.key]}</Text>
                        </View>
                        </TouchableOpacity>
                        
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
                    {
                        this.state.login? 
                        <View style={styles.songlist}>
                            <View style={{flexDirection:'row'}}>
                        <TouchableOpacity  onPress={()=>this.setState({menu:[1,0],addposition:'absolute',addflex:'flex'})}>
                        <Text style={{fontSize:20,textAlign:'center',color:this.state.menu[0]?'black':'grey'}}>自建歌单</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({menu:[0,1],addposition:'relative',addflex:'none'})} >
                        <Text style={{fontSize:20,textAlign:'center',color:this.state.menu[1]?'black':'grey',marginLeft:20}}>收藏歌单</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress = {()=>this.setState({modalVisible : true})}
                        style={{width:'7%',position:this.state.addposition,left:'80%',display:this.state.addflex}} >
                        <Image 
                        source={require('../images/createSong.png')} 
                        />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'7%',position:'absolute',left:'90%'}}   onPress={()=>Actions.manage()}>
                        <Image 
                        source={require('../images/manage.png')}                       
                        />
                        </TouchableOpacity>
                        </View>
                            {
                                this.state.addflex == 'flex' 
                                ?
                                <View style = {{height:height * 0.3,justifyContent:"center",alignItems:"center"}}>
                                    <Text style = {{textAlign:"center",fontSize:20}}>尚未创建歌单，请登录后创建</Text>
                                </View>
                                :
                                <View style = {{height:height * 0.3,justifyContent:"center",alignItems:"center"}}>
                                    <Text style = {{textAlign:"center",fontSize:20}}>没有收藏歌单</Text>
                                </View>
                            }
                        </View>
                        : <View style={styles.songlist}>
                        <View style={{flexDirection:'row'}}>
                        <TouchableOpacity  onPress={()=>this.setState({menu:[1,0],addposition:'absolute',addflex:'flex'})}>
                        <Text style={{fontSize:20,textAlign:'center',color:this.state.menu[0]?'black':'grey'}}>自建歌单{this.state.create}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({menu:[0,1],addposition:'relative',addflex:'none'})} >
                        <Text style={{fontSize:20,textAlign:'center',color:this.state.menu[1]?'black':'grey',marginLeft:20}}>收藏歌单{this.state.collect}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress = {()=>this.setState({modalVisible : true})}
                        style={{width:'7%',position:this.state.addposition,left:'80%',display:this.state.addflex}} >
                        <Image 
                        source={require('../images/createSong.png')} 
                        />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'7%',position:'absolute',left:'90%'}}   onPress={()=>Actions.manage({data:this.state.createdata})}>
                        <Image 
                        source={require('../images/manage.png')}                       
                        />
                        </TouchableOpacity>
                        </View>
                        <View style={{margintop:10}}>
                            <FlatList
                            data={this.state.createdata}
                            renderItem={({item,index})=>
                                <View style={styles.createlist}>
                                    <TouchableOpacity style={styles.createlist} onPress = {() => Actions.addsong({num:item.num})}>
                                    <View style={{width:'20%',height:'90%',borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                                        <Image style={{width:'100%',height:'100%',borderRadius:10}} source = {{uri:`http://49.235.231.110:8802/musicimage/${index + 1}.JPG`}}/>
                                    </View>
                                    <View style={{marginLeft:10}}>
                                        <Text style={{fontSize:16,marginBottom:10}}>{item.title}</Text>
                                        <Text style={{color:'grey',marginBottom:10}}>{item.num}首</Text>
                                    </View>
                                    <Image style={{width:1,height:25,marginLeft:'80%',position:'absolute'}} source={require('../images/right.png')}/>
                                    </TouchableOpacity>
                                </View>
                            }
                            />
                        </View>
                    </View>
                    }
                   
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
    uphalf1:{
        width:width * 0.8,
        height:height * 0.099,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'center'
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
        marginLeft:width*0.8*0.05,
        justifyContent:"center",
        alignItems:"center"
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