import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image,TextInput,Dimensions } from 'react-native'
const {width,height} = Dimensions.get('window');

class SongNav extends Component {
    render() {

        return (
            <View style={styles.container}>
            <TextInput style={{width:'60%',fontSize:12}}></TextInput>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'white',
        height:height * 0.05
    }
})

export default SongNav