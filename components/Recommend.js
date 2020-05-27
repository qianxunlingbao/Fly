import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image } from 'react-native'
import PlayGroup from './PlayGroup'

class Recommend extends Component {

    render() {
        return (
            <View style={styles.container}>
                    <View style={{position:'absolute',width:'100%',height:'10%',top:'90%'}}>
                        <PlayGroup/>
                    </View>                   

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1    }
})

export default Recommend