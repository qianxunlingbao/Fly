import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image, TouchableOpacity,DeviceEventEmitter ,FlatList,Dimensions,AsyncStorage, ToastAndroid} from 'react-native'
import { Actions } from 'react-native-router-flux';
import {addmenusong} from './DS'
const {width,height} = Dimensions.get('window');

class AddSong extends Component {
    constructor(){
        super();
        this.state = {
            songs:[]
        }

    }
    componentDidMount(){
        addmenusong.items = this.props.data.value;
        this.setState({
            songs : addmenusong.items
        })
        this.addlistsong = DeviceEventEmitter.addListener('addlistsong',()=>{
            this.setState({
                songs : addmenusong.items
            })
        })
        AsyncStorage.getItem('songmenu').then(
            (val) => {
                this.setState({
                    data : JSON.parse(val)
                })
            }
        )
    }
    componentWillUnmount(){
        this.addlistsong && this.addlistsong.remove();
        let arr = [...this.state.data];
        for(var i = 0; i < arr.length;i++){
            if(arr[i].key == this.props.data.key){
                arr[i].value = addmenusong.items;
                arr[i].num = addmenusong.items.length;
            }
        }
        AsyncStorage.setItem('songmenu',JSON.stringify(arr));
        DeviceEventEmitter.emit('getsongmenu');
    }
    render() {
        return (
            <View style={styles.container}>
               {
                   addmenusong.items.length == 0?
                   <TouchableOpacity 
                   onPress = {()=>Actions.addsearchsong()}
                   style={{width:'30%',height:'5%',backgroundColor:'green',justifyContent:"center",
                   alignItems:"center",borderRadius:50}}>
                       <Text style={{fontSize:20}}>添加歌曲</Text>
                   </TouchableOpacity>
                   :<View>
                       <FlatList
                data = {this.state.songs}
                renderItem = {({item,index})=>
                <View style={{marginTop:10,paddingLeft:15,width:width,height:height * 0.05,borderBottomWidth:1,borderBottomColor:'grey'}}>
                    <Text >{item.music_name}</Text>
                    <Text >{item.music_author}</Text>
                    <TouchableOpacity onPress={()=>{addmenusong.items.splice(index,1);
                    this.setState({
                        songs : addmenusong.items
                    });
                    ToastAndroid.show('删除成功',100);

                    }} style={{width:width * 0.1,position:"absolute",top:height * 0.05 * 0.25,left:'90%',backgroundColor:'red',borderRadius:height * 0.05 * 0.3,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{height:height * 0.05 * 0.5,fontSize:14}}>删除</Text>
                    </TouchableOpacity>
                </View>}
                />
                <TouchableOpacity 
                   onPress = {()=>Actions.addsearchsong()}
                   style={{width:width,height:'5%',justifyContent:"center",backgroundColor:'white',
                   alignItems:"center"}}>
                       <Text style={{fontSize:20}}>添加歌曲</Text>
                   </TouchableOpacity>
            </View>
               }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default AddSong