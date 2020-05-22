import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image, Dimensions,TouchableOpacity,Alert,FlatList, AsyncStorage, DeviceEventEmitter } from 'react-native'
const {width,height} = Dimensions.get('window');
import Icon from "react-native-vector-icons/FontAwesome"
class Manage extends Component {
    constructor(){
        super();
        this.state = {
            data :[],
            source:[]
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('songmenu').then(
            (val) => {
                this.setState({
                    data : JSON.parse(val)
                },()=>{
                    let length = this.state.data.length;
                    let arr = new Array(length);
                    arr.fill(0);
                    this.setState({
                        source:arr
                    })
                })
            }
        )
    }
    componentWillUnmount(){
        DeviceEventEmitter.emit('getsongmenu')
    }
    showAlert(){
        Alert.alert('删除歌单','确定删除选中的歌单',
  [
    {text:"取消", onPress:this.opntion1Selected},
    {text:"确定", onPress:() => {
        let arr = this.state.source;
        let brr = this.state.data.filter((item,index)=>{
          if(!arr[index]){
              return item;
          }
        })
        this.setState({
            data:brr
        },()=>{
            let length = this.state.data.length;
            let arr = new Array(length);
            arr.fill(0);
            this.setState({
                source:arr
            })
        })
        AsyncStorage.setItem('songmenu',JSON.stringify(brr));

    }},
  ],
  {cancelable:true}
)
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                            data={this.state.data}
                            renderItem={({item,index})=>
                                <TouchableOpacity onPress={()=>{let arr = this.state.source;arr[index] = !arr[index];this.setState({source:arr})}}>
                                    <View style={styles.createlist}>
                                    <View style={{backgroundColor:'blue',width:'20%',height:'90%',borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                                    <Image style={{width:'100%',height:'100%',borderRadius:10}} source = {{uri:`http://49.235.231.110:8802/musicimage/${index + 1}.JPG`}}/>
                                    </View>
                                    <View style={{marginLeft:10}}>
                                        <Text style={{fontSize:16,marginBottom:10}}>{item.title}</Text>
                                        <Text style={{color:'grey',marginBottom:10}}>{item.num}首</Text>
                                    </View>
                                    <Icon name={this.state.source[index]?"check-square-o":"square-o"} size={30}  color="#00B4F7" style={styles.checkbox}></Icon>
                                </View>
                                </TouchableOpacity>
                                
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
    checkbox:{
        position:"absolute",
        left:width * 0.8 - 30

    }
})

export default Manage