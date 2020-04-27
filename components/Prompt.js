import React, { Component } from 'react'
import { StyleSheet, 
    View, 
    Text ,
    Image ,
    Modal, 
    TouchableOpacity,
    Dimensions, 
    TextInput,
    Button,
    AsyncStorage} from 'react-native'
import Devide from './Devide'
let {width,height} = Dimensions.get('window');
export default class Prompt extends Component {
    constructor(){
        super();
        this.state = {
        }
    }
    componentWillMount(){
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
                          <Text style={{textAlign:"center",fontSize:20,marginTop:20}}>新建歌单</Text>
                          <TextInput 
                          style = {{height:'25%',width:'80%',backgroundColor:'#eee',borderRadius:20,marginTop:5}}
                          onChangeText = {(val) => this.props.changecallback(val)}
        >{this.props.listTitle}</TextInput>
                          <Devide style={{width:'100%',height:1,backgroundColor:'#eeeeee',marginTop:10}}/>
                          <View style={{flexDirection:'row',justifyContent:"space-around",width:'90%',height:42,alignItems:'center'}}>
                          <TouchableOpacity onPress={()=>{this.props.callback('0000')}}>
                              <Text>取消</Text>
                          </TouchableOpacity>
                          <Devide style={{width:1,height:42,backgroundColor:'#eee'}}/>
                          <TouchableOpacity onPress={()=>{this.props.callback()}}>
                              <Text>确定</Text>
                          </TouchableOpacity>
                          </View>
                          
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
        alignItems:'center',
    }
})

