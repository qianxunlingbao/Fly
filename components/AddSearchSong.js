import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image,TextInput,Dimensions,DeviceEventEmitter, FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
const {width,height} = Dimensions.get('window');
import {addmenusong} from './DS'
class AddSearchSong extends Component {

    constructor(){
        super();
        this.state = {
            value:[]
        }
    }
    componentDidMount(){
        var that = this;
        async function getMusic(){
            try{
                const music = await fetch('http://49.235.231.110:8800/music');
                const res = await music.json();
                await that.setState({data : res.data});
            }catch(error){
                console.log(error)
            }
            }
        getMusic();
    }
    componentWillUnmount(){
        DeviceEventEmitter.emit('addlistsong');
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{marginTop:10,borderRadius:height * 0.05,height:height * 0.05, width:width * 0.8,flexDirection:'row',justifyContent:"center",alignItems:"center",backgroundColor:'white'}}>
                <Icon name="search1" size={22} color="rgb(215,215,215)" />
                <TextInput placeholder="请输入歌曲、歌手或专辑" placeholderTextColor="rgb(165,165,165)"  onChangeText = {(val)=>{
                    let arr = this.state.data.filter((item)=>{
                        if(val&&item.music_name.indexOf(val)!= -1){
                            return item;
                        }
                    })
                    this.setState({
                        value:arr
                    })
                    console.log(arr);
                }}/>  
                </View>
                <FlatList
                data = {this.state.value}
                renderItem = {({item})=>
                <View style={{paddingLeft:15,width:width,height:height * 0.05,borderBottomWidth:1,borderBottomColor:'grey'}}>
                    <Text >{item.music_name}</Text>
                    <Text >{item.music_author}</Text>
                    <TouchableOpacity style={{position:"absolute",left:width * 0.9,top:10}} onPress = {()=>{addmenusong.push(item)}}>
                        <Text style={{fontSize:20}}>+</Text>
                    </TouchableOpacity>
                </View>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center"
    }
})

export default AddSearchSong