import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image ,Dimensions,TextInput, TouchableOpacity} from 'react-native'
import { Actions } from 'react-native-router-flux';
const {width,height} = Dimensions.get('window');
class NavBar extends Component {
    render() {
        return (
            <View style={{width:width,backgroundColor:'#eeeeee',height:height*0.05,justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
              <Text style={{flex:2,textAlign:"center",fontSize:24}}>我的</Text>
              <View style={{backgroundColor:'white',flex:8,height:height * 0.03,borderRadius:height * 0.03 * 0.5,alignItems:"center",justifyContent:'center',flexDirection:'row'}}>
              <TextInput style={{width:'60%',fontSize:12}} placeholder={this.props.value} ></TextInput>
              </View>
              <TouchableOpacity 
              onPress={()=>Actions.moreInfo()}
              style={{flex:2,justifyContent:'center',alignItems:'center'}}>
              <Image style={{height:'90%'}} source={require('../images/menu.png')}/>
              </TouchableOpacity>
              </View>    
        )
    }
}
export default NavBar