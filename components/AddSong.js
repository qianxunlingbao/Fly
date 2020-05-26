import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image, TouchableOpacity,DeviceEventEmitter ,FlatList,Dimensions,AsyncStorage} from 'react-native'
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
                renderItem = {({item})=>
                <View style={{width:width,height:height * 0.05,borderBottomWidth:1,borderBottomColor:'grey'}}>
                    <Text >{item.music_name}</Text>
                    <Text >{item.music_author}</Text>
                </View>}
                />
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