import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image ,Dimensions,TextInput} from 'react-native'
const {width,height} = Dimensions.get('window');
class NavBar extends Component {
    render() {
        return (
            <View style={styles.container}>
            <View style={{width:width,backgroundColor:'#ffffff',height:height*0.05,justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
              <Text style={{flex:2,textAlign:"center",fontSize:24}}>我的</Text>
              <View style={{backgroundColor:'#eeeeee',flex:8,height:height * 0.03,borderRadius:height * 0.03 * 0.5,alignItems:"center",justifyContent:'center',flexDirection:'row'}}>
              <TextInput style={{width:'60%',fontSize:12}} placeholder={this.props.value} ></TextInput>
              </View>
              <Text style={{flex:2,textAlign:"center"}}>我的</Text>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default NavBar