import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image, TouchableOpacity } from 'react-native'
import {Router, Scene} from "react-native-router-flux";

class MyLike extends Component {
    constructor(){
        super();
        this.state = {
            threeColor:[1,0,0]
        }
    }
    render() {
        return (
                <View style={styles.container}>
                <View style = {styles.threeHead}>
                    <TouchableOpacity onPress={()=>this.setState({threeColor:[1,0,0]})}>
                        <Text style={{color:this.state.threeColor[0]?'green':'black'}}>歌曲</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({threeColor:[0,1,0]})}>
                        <Text style={{color:this.state.threeColor[1]?'green':'black'}}>专辑</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({threeColor:[0,0,1]})}>
                        <Text style={{color:this.state.threeColor[2]?'green':'black'}}>歌单</Text>
                    </TouchableOpacity>
                </View>
                <Scene/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    threeHead : {
        backgroundColor:'white',
        width: '100%',
        height: '5%',
        flexDirection : 'row',
        justifyContent:"space-around",
        alignItems:'center',
    }
})

export default MyLike