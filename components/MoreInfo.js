import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'
class MoreInfo extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.out} onPress = {()=>{Actions.My({unlogin : true});}}>
                    <Text style={{textAlign:'center',color:'red',fontSize:16}}>退出登录</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },
    out :{
        backgroundColor:'white',
        justifyContent:"center",
        alignItems:'center',
        width:'80%',
        height:40,
        marginTop:10,
        borderRadius:20
    }
})

export default MoreInfo