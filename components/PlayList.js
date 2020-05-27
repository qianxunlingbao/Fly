import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image ,Modal, TouchableOpacity, ScrollView,AsyncStorage, FlatList,DeviceEventEmitter} from 'react-native'
import {nplaylist} from './DS'
class PlayList
 extends Component {
     componentDidMount(){
         console.log(this.props.currentIndex);
     }
    render() {
        return (
            <Modal
            animationType = {'none'}
            transparent = {true}
            visible = {this.props.playlistvisible}
            >
                 <View style={styles.container}>
                     <TouchableOpacity style={{width:'100%',height:'100%'}} onPress = {()=>DeviceEventEmitter.emit('myplaylist')}>
                        <View style = {{
                            width:'100%',
                            height:'40%',
                            position:'absolute',
                            top:'60%',
                            justifyContent:"center",
                            alignItems:"center",
                            backgroundColor:'white',
                            opacity:0.8
                            }}>
                                <View>
                                    <Text style={{fontSize:20}}>
                                        播放列表
                                    </Text>
                                </View>
                                <FlatList
                                data = {nplaylist.items}
                                style = {{width:'100%',height:'100%'}}
                                renderItem = {
                                    ({item,index}) => 
                                    <View   style = {{paddingLeft:10,marginBottom:10}}>
                                        <Text style = {{fontSize:18,color:index == this.props.currentIndex ? 'green':'black'}}>{item.music_name}</Text>
                                        <Text style = {{color:index == this.props.currentIndex ? 'green':'black'}}>{item.music_author}</Text>
                                    </View>
                                }
                                />
                        </View>
                     </TouchableOpacity>
                </View>
            </Modal>
           
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default PlayList
