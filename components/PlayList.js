import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image ,Modal, TouchableOpacity, ScrollView,AsyncStorage} from 'react-native'

/**
*
* @ author: 
* @ email: 
* @ data: 2020-04-27 16:02
*/
class PlayList
 extends Component {
    componentDidMount(){
        AsyncStorage.getItem('playlist').then(
            (value) => console.log('list',JSON.parse(value))
        )
    }
    render() {
        return (
            <Modal
            animationType = {'none'}
            transparent = {true}
            visible = {this.props.playlistvisible}
            >
                 <View style={styles.container}>
                     <TouchableOpacity style={{width:'100%',height:'100%'}} onPress = {()=>this.props.backcallback()}>
                        <View style = {{
                            width:'100%',
                            height:'40%',
                            position:'absolute',
                            top:'60%',
                            justifyContent:"center",
                            alignItems:"center",
                            backgroundColor:'white',
                            opacity:0.8
                            }}>
                                <ScrollView style={{width:'100%',height:'100%'}}>

                                </ScrollView>
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
    }
})

export default PlayList
