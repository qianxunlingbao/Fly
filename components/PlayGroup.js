import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image, TouchableOpacity,Dimensions,DeviceEventEmitter } from 'react-native'
let {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

class PlayGroup extends Component {
    constructor(){
        super();
        this.state = {
            describle:'尚未选择合适的音乐',
            icon:require('../images/16.png'),
            position:["absolute","relative"],
            display:['flex','none']

        }
    }
    componentDidMount(){
        this.changegroup = DeviceEventEmitter.addListener('changegroup',(picture,words)=>{
            this.setState({
                describle:words,
                icon:picture
            })
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{width:'100%',height:'100%',  flexDirection:'row',
        alignItems:"center"}}>
                    <View style={{width:width * 0.1,height:width * 0.1,
                    borderRadius:width*0.1,
                    position:"absolute",
                    left:width*0.02,
                    overflow:"hidden"
                    }}>
                    <Image style={{width:width * 0.1,height:width * 0.1}} source={this.state.icon}/>
                    </View>
                    <Text style={{position:"absolute",left:width*0.14}}>{this.state.describle}</Text>
                    <TouchableOpacity onPress = {()=>{let arr = [...this.state.position];[arr[0],arr[1]] = [arr[1],arr[0]];let brr = [...this.state.display];[brr[0],brr[1]] = [brr[1],brr[0]];this.setState({
                        position:arr,
                        display:brr
                    })}} style={{justifyContent:"center",alignItems:"center",position:"absolute",left:width*0.8}}>
                        <Icon name='play-circle' size={width*0.07} color="green" style={{position:this.state.position[0],display:this.state.display[0]}}/>
                        <Icon name='pause-circle' size={width*0.07} color="green" style={{position:this.state.position[1],display:this.state.display[1]}}/>
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