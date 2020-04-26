import React, { Component } from 'react'
import { StatusBar, SafeAreaView, ScrollView,View, TextInput, Text,TouchableOpacity,AsyncStorage,Alert } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux'

export default class Search extends Component {
    constructor(){
        super();
        this.state={
            isshow:'none',
            value:'',
            history:[],
            isshow_delete:0,
            musicArray:[]
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('historyArray').then(req=>JSON.parse(req)).then(json=>{
            if(json==null){
                this.setState({
                    history:[]
                })
            }else{
                this.setState({
                    history:json,
                    isshow_delete:1
                })
            }
        })
        fetch('http://49.235.231.110:8800/music')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    musicArray:res.data
                })
            })
    }
    change(text){
        this.setState({
            value:text
        })
        if(text!==""){
            this.setState({
                isshow:'flex'
            })
        }else{
            this.setState({
                isshow:'none'
            })
        }
    }
    clear(){
        this.setState({
            value:'',
            isshow:'none'
        })
    }
    storage(item){
        AsyncStorage.getItem('historyArray').then(req=>JSON.parse(req)).then(json=>{
            if(json==null){
                var array=[];
                array[0]=item;
                AsyncStorage.setItem('historyArray',JSON.stringify(array));
                this.setState({
                    history:array,
                    isshow_delete:1
                })
            }else{
                var newArray=json;
                var flag=1;
                for(var i=0;i<newArray.length;i++){
                    if(newArray[i]==item){
                        flag=0;
                    }
                }
                if(flag){
                    newArray.push(item);
                }
                AsyncStorage.setItem('historyArray',JSON.stringify(newArray));
                this.setState({
                    history:newArray
                })
            }
        });
    }
    clearHistory(){
        Alert.alert('','是否清空所有搜索历史',[
            {text:"取消",onPress:()=>{}},
            {text:"确认",onPress:()=>{
                AsyncStorage.removeItem('historyArray');
                this.setState({
                    history:[],
                    isshow_delete:0
                })
            }}
        ])
    }
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView keyboardShouldPersistTaps={'handled'}>
                        <View style={{width:'96%',height:50,marginLeft:'2%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Icon name="arrowleft" size={30} onPress={()=>Actions.pop()} />
                            <View style={{width:'90%',height:40,marginLeft:10,backgroundColor:'white',borderRadius:20,flexDirection:'row',alignItems:'center',paddingLeft:10}}>
                                <Icon name="search1" size={22} color="rgb(215,215,215)" />
                                <TextInput style={{width:'85%',height:40,fontSize:17}} placeholder="请输入要搜索的内容" placeholderTextColor="rgb(165,165,165)" onChangeText={(text)=>{this.change(text)}} value={this.state.value} selectionColor={'green'} />  
                                <Icon name="close" size={20} style={{display:this.state.isshow}} color="gray" onPress={()=>{this.clear()}} />
                            </View>
                        </View>
                        <View style={{width:'96%',backgroundColor:'white',marginLeft:'2%',display:this.state.isshow}}>
                            {
                                this.state.musicArray.map((item,index)=>{
                                    if(item.music_name.indexOf(this.state.value)!==-1){
                                        return (
                                            <TouchableOpacity style={{width:'100%',height:35,flexDirection:'row',alignItems:'center',paddingLeft:15}} onPress={()=>{this.storage(item.music_name)}}>
                                                <Icon name="search1" size={15} color="gray" />
                                                <Text style={{marginLeft:10}}>{item.music_name}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                    if(index==this.state.musicArray.length-1){
                                        var flag=1;
                                        for(var i=0;i<this.state.musicArray.length;i++){
                                            if(this.state.musicArray[i].music_name.indexOf(this.state.value)!==-1){
                                                flag=0;
                                            }
                                        }
                                        if(flag){
                                            return (
                                                <View style={{width:'100%',height:35,justifyContent:'center',alignItems:'center'}}>
                                                    <Text style={{color:'red'}}>没有匹配项</Text>
                                                </View>
                                            )
                                        }
                                    }  
                                })
                            }
                        </View>
                        <View style={{width:'92%',marginLeft:'4%'}}>
                            <View style={{width:'100%',height:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:20,fontWeight:'bold',width:'20%'}}>搜索历史</Text>
                                <Icon name="delete" size={20} style={{marginLeft:'75%',opacity:this.state.isshow_delete}} color="gray" onPress={()=>{this.clearHistory()}} />
                            </View>
                            <View style={{width:'100%',flexDirection:'row',flexWrap:'wrap'}}>
                                {
                                    this.state.history.map((item)=>{
                                        return (
                                            <TouchableOpacity style={{backgroundColor:'white',height:26,justifyContent:'center',alignItems:'center',borderRadius:13,margin:5,padding:10}} onPress = {() => Actions.songList({search:item})}>
                                                <Text>{item}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}
