import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image, TouchableOpacity,Dimensions,DeviceEventEmitter } from 'react-native'
let {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

class PlayGroup extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{width:'100%',height:'100%',  flexDirection:'row',
        alignItems:"center"}}>
                    <View style={{width:width * 0.1,height:width * 0.1,
                    borderRadius:width*0.1,
                    position:"absolute",
                    backgroundColor:'red',
                    left:width*0.02,
                    overflow:"hidden"
                    }}>
                    <Image style={{width:width * 0.1,height:width * 0.1}} source={{uri:'http://49.235.231.110:8802/musicimage/1.JPG'}}/>
                    </View>
                    <Text style={{position:"absolute",left:width*0.14}}>你若成风-许嵩</Text>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:"center",position:"absolute",left:width*0.8}}>
                        <Icon name='play-circle' size={width*0.07} color="green" style={{position:"absolute",display:'flex'}}/>
                        <Icon name='pause-circle' size={width*0.07} color="green" style={{position:"relative",display:'none'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:"center",position:"absolute",left:width*0.9}}>
                        <Icon name='align-justify' size={width*0.07} color="green" onPress={()=>DeviceEventEmitter.emit('myplaylist')}/>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        backgroundColor:'white'
      
    }
})

export default PlayGroup