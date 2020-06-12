import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image,TouchableOpacity,FlatList } from 'react-native'
import {recentplay} from './DS'
import { Actions } from 'react-native-router-flux';

class Recent extends Component {
    constructor(){
        super();
        this.state = {
            threeColor:[1,0,0]
        }
    }
    render() {
        return (
            <View style={styles.container}>
            <FlatList
                            data = {recentplay.items}
                            style = {{width:'100%',height:'100%'}}
                            renderItem = {
                                ({item,index}) => <TouchableOpacity onPress={()=>Actions.publish({data:item})}>
                                    <View   style = {{paddingLeft:15,marginTop:10,borderBottomWidth:0.5}}>
                                    <Text>{item.music_name}</Text>
                                    <Text>{item.music_author}</Text>
                                </View>
                                </TouchableOpacity>
                                
                            }
                            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    threeHead : {
        backgroundColor:'white',
        width: '100%',
        height: '5%',
        flexDirection : 'row',
        justifyContent:"space-around",
        alignItems:'center',
    }
})

export default Recent