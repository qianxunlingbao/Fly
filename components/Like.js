import React, { Component,useState } from 'react'
import {
    View, 
    Text, 
    AsyncStorage,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    ToastAndroid,
    StatusBar,
    Image,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';


import { Actions } from 'react-native-router-flux';

const {width,scale,height} = Dimensions.get('window');

export default class Like extends Component {
    constructor(){
        super();
        this.state = {
            tits: [],
            num: 1,
            page: 0,
            isloading:false,
            guanzhu: '+关注',
            isAdd:false
        }
    }
    componentDidMount = ()=>{
        //this.setState.num++;
        fetch('http://49.235.231.110:8800/music')
            .then(res=>res.json())
            .then(res=>{
                this.setState({
                    tits: res.data
                });
            })
    }

    guanzhu(){
        this.setState({
            isAdd:!this.state.isAdd,
            guanzhu: this.state.isAdd ? '+关注' : '已关注'
        })
    }

    render() {
        let number = this.state.num;
        let ma = Math.random();
        return (
            <View>
                {/* 状态栏 //fetch('http://49.235.231.110:8800/music') */}
                <StatusBar backgroundColor='white' translucent={true}/>
                <ScrollView>
                    <View style={{width:width,height:width*0.1,backgroundColor:'#AAAAAA'}}>
                        <View style={{width:width*0.1,height:width*0.1}}>
                            <TouchableOpacity onPress={()=>Actions.recommend()}><Text style={{fontSize:24}}> —> </Text></TouchableOpacity>
                        </View>
                        <View style={{width:width*0.3,height:width*0.1,marginLeft:width*0.33,marginTop:-width*0.1}}>
                            <Text style={{textAlign:'center',fontSize:25}}>我的关注</Text>
                        </View>
                        
                    </View>
                    <View style={{
                            width:width*0.9,
                            height:width*0.2,
                            marginLeft:width*0.05,
                            marginTop:width*0.05
                        }}>
                        <View style={styles.touxiang}>
                            <Image style={styles.touxiang} 
                                source={require('../images/huachenyu.png')} />
                        </View>
                        <View style={styles.one}>
                            <Text style={styles.author}>王子清</Text>
                            <Text style={styles.name}>如果岁月可回头</Text>
                        </View>
                        <View style={styles.two}>
                            <TouchableOpacity style={styles.three} onPress={() => this.guanzhu()}>
                                <Text style={styles.guanzhu}>{this.state.guanzhu}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.four}>
                            <TouchableOpacity>
                                <Text style={styles.delete}>×</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                                
                    <View>
                    {
                        this.state.tits.map((item)=>(
                            
                            <View style={{flex:1,marginTop:width*0.05}}>
                                <View style={{
                                    width:width*0.9,
                                    height:width*0.2,
                                    marginLeft:width*0.05
                                }}>
                                    <View style={styles.touxiang}>
                                        <Image style={styles.touxiang} source={require('../images/huachenyu.png')} />
                                    </View>
                                    <View style={styles.one}>
                                        <Text style={styles.author}>{item.music_author}</Text>
                                        <Text style={styles.name}>{item.music_name}</Text>
                                    </View>
                                    <View style={styles.two}>
                                        <TouchableOpacity style={styles.three} >
                                            <Text style={styles.guanzhu}>+关注</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.four}>
                                        <TouchableOpacity>
                                            <Text style={styles.delete}>×</Text>
                                        </TouchableOpacity>    
                                    </View>
                                </View>
                            
                            </View>         
                        ))
                    }
                    </View>
                    
                    
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    touxiang:{
        width:width*0.2,
        height:width*0.2
    },
    one:{
        width:width*0.4,
        height:width*0.2,
        marginTop:-width*0.2,
        marginLeft:width*0.2
    },
    two:{
        width:width*0.12,
        height:width*0.2,
        marginTop:-width*0.2,
        marginLeft:width*0.6
    },
    three:{
        width:width*0.12,
        height:height*0.027,
        borderColor:'#888888',
        borderWidth:1,
        borderRadius:25,
        marginTop:width*0.071
    },
    four:{
        width:width*0.18,
        height:width*0.2,
        marginTop:-width*0.2,
        marginLeft:width*0.72
    },
    author:{
        fontSize:17,
        marginTop:width*0.03
    },
    name:{
        fontSize:15,
        color:'#888888',
        marginTop:width*0.05
    },
    delete:{
        textAlign:'center',
        marginTop:width*0.058,
        fontSize:24
    },
    guanzhu:{
        textAlign:'center'
    }
})
