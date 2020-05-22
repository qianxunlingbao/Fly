import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image ,Dimensions,TextInput, TouchableOpacity, Button} from 'react-native'
const {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux'

class SongList extends Component {
    constructor(){
        super();
        this.state = {
            data : [],
            click: 0
        }
    }
    componentDidMount(){
        var that = this;
        async function getMusic(){
            try{
                const music = await fetch('http://49.235.231.110:8800/music');
                const res = await music.json();
                await that.setState({data : res.data});
            }catch(error){
                console.log(error)
            }
            }
        getMusic();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.nav}>
                <Icon name="arrowleft" size={30} onPress={()=>Actions.Music()} />
                <View style={{width:'80%',height:height * 0.04,marginLeft:40,backgroundColor:'white',borderRadius:20,flexDirection:'row',alignItems:'center',paddingLeft:10}}>
                <Icon name="search1" size={22} color="rgb(215,215,215)" />
                <TextInput style={{width:'85%',height:height * 0.04,fontSize:17}} >{this.props.search}</TextInput>  
                <Icon name="close" size={20}  color="gray" onPress={()=>Actions.pop()} />
                </View> 
                </View>
                <View >
                    {
                        this.state.data.map((item) => {
                            if(item.music_name == this.props.search){
                                return (
                                    <TouchableOpacity style = {{paddingLeft:15,justifyContent:'center',width:'100%',height:height * 0.05}} onPress = {()=>{this.setState({click : 1});Actions.publish({data:item})}}>
                                        <Text style = {{fontSize:18,color:'green'}}>{item.music_name}</Text>
                                        <Text style = {{color:this.state.click?'green':'black'}}>{item.music_author}</Text>
                                    </TouchableOpacity>
                                )
                            }
                               
                    }
                    )}
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1   
    },
    nav:{
        width : '100%',
        height:height * 0.05,
        flexDirection:'row',
        alignItems:"center"
    }
})

export default SongList