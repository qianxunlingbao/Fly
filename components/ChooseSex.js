import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image ,Modal, TouchableOpacity} from 'react-native'
class ChooseSex extends Component {

    render() {
        return (
           <Modal
            animationType = {'none'}
            transparent = {true}
            visible = {this.props.modalVisible}
           >
               <TouchableOpacity onPress = {()=>this.props.callbackorigin()} style={{width:'100%',height:'100%',justifyContent:"center",alignItems:'center'}}>
                    <View style={{width :'70%',height:'10%',backgroundColor:'white'}}>
                        <TouchableOpacity style={styles.options} onPress = {()=>this.props.choosesex('男')}>
                            <Text>男</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.options} onPress = {()=>this.props.choosesex('女')}>
                            <Text>女</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.options} onPress = {()=>this.props.choosesex('保密')}>
                            <Text>保密</Text>
                        </TouchableOpacity>
                    </View>
               </TouchableOpacity>
           </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    options:{
        width:'100%',
        height:'33%',
        justifyContent:"center",
        alignItems:"center"
    }
})

export default ChooseSex