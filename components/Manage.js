import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image, Dimensions,TouchableOpacity,Alert,FlatList, AsyncStorage } from 'react-native'
const {width,height} = Dimensions.get('window');
class Manage extends Component {
    constructor(){
        super();
        this.state = {
            data :[]
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('songmenu').then(
            (val) => {
                this.setState({
                    data : JSON.parse(val)
                })
            }
        )
    }
    showAlert(){
        Alert.alert('删除歌单','确定删除选中的歌单',
  [
    {text:"取消", onPress:this.opntion1Selected},
    {text:"确定", onPress:this.opntion2Selected},
  ],
  {cancelable:true}
);
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                            data={this.state.data}
                            renderItem={({item})=>
                                <View style={styles.createlist}>
                                    <View style={{backgroundColor:'blue',width:'20%',height:'90%',borderRadius:10}}></View>
                                    <View style={{marginLeft:10}}>
                                        <Text style={{fontSize:16,marginBottom:10}}>{item.title}</Text>
                                        <Text style={{color:'grey',marginBottom:10}}>{item.num}首</Text>
                                    </View>
                                </View>
                            }
                            />
                <TouchableOpacity onPress={this.showAlert.bind(this)} style={styles.delete}>
                    <Image source = {require('../images/rubbish.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center"
    },
    delete:{
        width:'105%',
        backgroundColor:'white',
        height:'5%',
        position:'absolute',
        top:'95%',
        alignItems:'center',
        justifyContent:'center'
    },
    createlist:{
        width:width * 0.8,
        height:height * 0.1,
        marginTop:10,
        borderRadius:height * 0.2 * 0.1,
        flexDirection:'row',
        alignItems:'center'
    },
})

export default Manage