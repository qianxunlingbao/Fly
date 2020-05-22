import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux';

/**
*
* @ author: 
* @ email: 
* @ data: 2020-04-27 15:04
*/
class AddSong extends Component {
    constructor(){
        super();
        this.state = {
            songs:[]
        }

    }
    componentDidMount(){
        var that = this;
        async function getMusic(){
            try{
                const music = await fetch('http://49.235.231.110:8800/music');
                const res = await music.json();
                await that.setState({songs : res.data});
            }catch(error){
                console.log(error)
            }
            }
        getMusic();
    }
    render() {
        return (
            <View style={styles.container}>
               {
                   this.props.num == 0?
                   <TouchableOpacity 
                   onPress = {()=>Actions.addsearchsong()}
                   style={{width:'30%',height:'5%',backgroundColor:'green',justifyContent:"center",
                   alignItems:"center",borderRadius:50}}>
                       <Text style={{fontSize:20}}>添加歌曲</Text>
                   </TouchableOpacity>
                   :<View></View>
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