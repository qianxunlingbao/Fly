import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image, ScrollView ,Dimensions, FlatList, TouchableOpacity, AsyncStorage} from 'react-native'
import ChooseSex from './ChooseSex'
import { Actions } from 'react-native-router-flux';
const {width,height} = Dimensions.get('window');
import ImagePicker from 'react-native-image-picker';
import  {DeviceEventEmitter} from 'react-native';
const options = {
    title: '请选择',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '从相册选择图片',
    customButtons: [{ name: 'fb', title: '从 Facebook 选择图片' }],
    cancelButtonTitle: '取消',
    storageOptions: {
      skipBackup: true,
      path: 'assets',
    },
};
class UserInfo extends Component {
    constructor(){
        super();
        this.state = {
            headimage:require('../images/16.png'),
            netname:'幻梦',
            sex:'保密',
            modalVisible:false
        }
    }
    componentWillUnmount(){
        AsyncStorage.setItem('sex',this.state.sex);
        AsyncStorage.setItem('headimage',this.state.headimage.uri);
        DeviceEventEmitter.emit('changeHeadImg');
        this.changeNetName && this.changeNetName.remove();
    }
    componentDidMount(){
        AsyncStorage.getItem('netname').then(
            (value) => {
                if(value){
                    this.setState({
                        netname: value
                    })
                }
                
            }
        )
        AsyncStorage.getItem('headimage').then(
            (value) => {
                if(value){
                    this.setState({
                        headimage: {uri : value}
                    })
                }
                
            }
        )
        AsyncStorage.getItem('sex').then(
            (value)=>{
            if(value){
                this.setState({
                    sex:value
                })
            }
            
        })
        this.changeNetName = DeviceEventEmitter.addListener('changeNetName',()=>{
            AsyncStorage.getItem('netname').then(
                (value) => {
                    if(value){
                        this.setState({
                            netname: value
                        })
                    }
                    
                }
            )
        })
    }
    takephoto = () =>{
        ImagePicker.showImagePicker(options,(response) => {
            if(response.didCancel){
                return;
            }else if(response.error){
                console.log(error);
            }else if(response.customButton){
                console.log(res.customButton);
            }else {
                this.setState({
                    headimage:{uri:response.uri}
                });
               
            }
        })
    }
    basicInfoClick = (value)=>{
        if(value == 1){
            this.takephoto();
        }
        if(value == 2){
            Actions.modifynetname();
        }
        if(value == 3){
            this.setState({
                modalVisible:true
            })
        }
    }
    backorigin = () => {
        this.setState({
            modalVisible:false
        })
    }
    choosesex = (value) => {
        this.setState({
            sex:value
        })
        this.setState({
            modalVisible:false
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ChooseSex 
                 modalVisible = {this.state.modalVisible}
                 callbackorigin = {this.backorigin}
                 choosesex = {this.choosesex}
                />
                        <FlatList
                        data={[{key:1,title:'头像',value:this.state.headimage},{key:2,title:'昵称',value:this.state.netname},{key:3,title:'性别',value:this.state.sex}]}
                        renderItem = {({item}) =>
                                <View style={{width:width ,height:height*0.08,backgroundColor:'white',alignItems:'center',justifyContent:"center"}}>
                                    <TouchableOpacity onPress={()=>this.basicInfoClick(item.key)} style={{width:width*0.8,height:height * 0.05,borderBottomColor:'grey',borderBottomWidth:0.5,justifyContent:"space-between",flexDirection:'row',alignItems:'center'}}>
                                        <Text>{item.title}</Text>
                                        {item.title == '头像' ? <View style={{width:height * 0.05,height:height * 0.05, borderRadius:height * 0.05,overflow:"hidden"}}>
                                            <Image source = {item.value} style={{width:height * 0.05,height:height * 0.05}}/>
                                        </View>:<Text>{item.value}</Text>}
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
        flex: 1
    }
})

export default UserInfo