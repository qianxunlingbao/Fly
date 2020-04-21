import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image ,Modal, TouchableOpacity,Dimensions, TextInput} from 'react-native'
let {width,height} = Dimensions.get('window');
export default class Prompt extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <Modal
            animationType = {'none'}
            transparent = {true}
            visible = {this.props.modalVisible}
            >
                 <View style={styles.container}>
                  <TouchableOpacity 
                  onPress={()=>{this.props.callback()}}
                  style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                      <View
                      style = {styles.box}
                      >
                          <Text style={{textAlign:"center",backgroundColor:"red"}}>新建歌单</Text>
                          <TextInput 
                          placeholder = '新建歌单' 
                          placeholderTextColor = 'grey'
                          ></TextInput>
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
        alignItems:'center',
        justifyContent:"center",
        backgroundColor:'rgba(0,0,0,0.01)'
    },
    box : {
        backgroundColor:'white',
        width : '60%',
        height : '15%',
        borderRadius : height * 0.02,
        justifyContent:"center",
        alignItems:'center'
    }
})

