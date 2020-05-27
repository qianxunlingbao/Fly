import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image, TextInput, AsyncStorage, TouchableOpacity } from 'react-native'
import  {DeviceEventEmitter} from 'react-native';
class ModifyNetName extends Component {
    componentWillUnmount(){
        DeviceEventEmitter.emit('changeNetName');
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{borderBottomWidth:0.5,width:'80%',alignItems:"center",flexDirection:'row'}}>
                <TextInput placeholder = '请输入昵称' style={{paddingLeft:20,width:'100%'}} onChangeText={(value)=>this.setState({name:value})
                }></TextInput>
                </View>
                <TouchableOpacity onPress={()=>AsyncStorage.setItem('netname',this.state.name)} style={{backgroundColor:'green',marginTop:20,width:'30%',height:'4%',justifyContent:"center",alignItems:"center",borderRadius:100}}>
                    <Text>确认修改</Text>
                </TouchableOpacity>
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

export default ModifyNetName