import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image, AsyncStorage,FlatList,Dimensions,TouchableOpacity,DeviceEventEmitter, ToastAndroid} from 'react-native'
const {width,height} = Dimensions.get('window');
import {addmenusong} from './DS'
import { Actions } from 'react-native-router-flux';
class gedanlist extends Component {
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('songmenu').then((val)=>{
            this.setState({
                data : JSON.parse(val) ==null ?'':JSON.parse(val),
            }
            )
        }
        )
    }
    componentWillUnmount(){
        DeviceEventEmitter.emit('getsongmenu');
    }
    render() {
        return (
            <View style={styles.container}>
                    <FlatList
                    data={this.state.data}
                    renderItem={({item,index})=>
                    <View style={styles.createlist}>
                        <TouchableOpacity style={styles.createlist} onPress={
                             ()=>{addmenusong.items = item.value;
                            addmenusong.push(this.props.song);
                            let arr = [...this.state.data];
                            arr[index].value = addmenusong.items;
                            arr[index].num = addmenusong.items.length;
                            AsyncStorage.setItem('songmenu',JSON.stringify(arr));
                            ToastAndroid.show('添加成功',100);
                            Actions.pop();
                        }
                        }>
                        <View style={{width:'20%',height:'90%',borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                                        <Image style={{width:'100%',height:'100%',borderRadius:10}} source = {{uri:`http://49.235.231.110:8802/musicimage/${index + 1}.JPG`}}/>
                                    </View>
                                    <View style={{marginLeft:10}}>
                                        <Text style={{fontSize:16,marginBottom:10}}>{item.title}</Text>
                                        <Text style={{color:'grey',marginBottom:10}}>{item.num}首</Text>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1    },
        createlist:{
            width:width * 0.8,
            height:height * 0.1,
            marginTop:10,
            borderRadius:height * 0.2 * 0.1,
            flexDirection:'row',
            alignItems:'center'
        },
})

export default gedanlist