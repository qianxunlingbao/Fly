import React, { Component } from 'react'
import { Animated, Easing, 
    View, ActivityIndicator, Text, Image,
    FlatList, Dimensions ,ScrollView, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import ImagePicker from 'react-native-image-picker';
const {width} = Dimensions.get('window')
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};

export default class Home extends Component {
    constructor(){
        super();
        let data = [];
        for(var i=0; i<10; i++){
            data.push({tit:i,key:i});
        }
        this.state = {
            data,
            width: new Animated.Value(20),
            imageUrl:''
        }
    }
    takephoto = ()=>{
         ImagePicker.showImagePicker(options, (response) => {
             if (response.didCancel) {
               return;
             } else if (response.error) {
               console.log('Error:', response.error);
             } else if (response.customButton) {
               console.log('custom:', response.customButton);
             } else {
                
               const source = { uri: response.uri };
               this.setState({
                 imageUrl: source,
               });
             }
           });
    }
    
    render() {
        console.log('home')
        return (
            <View style={{flex:1}}>
                
                
                <Button 
                    onPress={()=>{this.takephoto()}}
                    style={styles.btn}
                ><Image 
                style={{width:300,height:300}} 
                source={this.state.imageUrl}
            /></Button>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    btn:{
        width: 200,
        height: 40,
        color: '#fff',
        textAlignVertical: 'center',
        borderRadius: 20,
        backgroundColor: 'red'
    },
    slide:{
        width: width*0.4,
        height: 300,
        marginLeft: width*0.07,
        marginTop:10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
})