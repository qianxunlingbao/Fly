import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image ,Modal, TouchableOpacity, ScrollView,AsyncStorage} from 'react-native'
import Video from 'react-native-video';
/**
*
* @ author: 
* @ email: 
* @ data: 2020-04-27 16:02
*/
class videos
 extends Component {
    componentDidMount(){
        AsyncStorage.getItem('videos').then(
            (value) => console.log('list',JSON.parse(value))
        )
    }
    render() {
        return (
            <Modal
            animationType = {'none'}
            transparent = {true}
            visible = {this.props.videosvisible}
            >
                            <View style={{flex:1,justifyContent:'center'}}>
                            <View style={{}}>
                                <Video source={{uri:this.state.music}}   // Can be a URL or a local file.
                                ref='video'
                                rate={this.state.rate}   
                                muted={this.state.muted}  
                                paused={this.state.paused}
                                onBuffer={this.onBuffer}
                                style={styles.backgroundVideo}
                                onLoad={data => this.setDuration(data)}
                                volume={1.0}
                                playInBackground={true}
                                onProgress={e => this.setTime(e)}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.play()} style={{width:0.15*width,height:0.15*width,marginTop:-0*width,color:'#fff'}}>
                            <Image style={{width:0.15*width,height:0.15*width}} source={this.state.paused?require('../images/broadcast.png' ):require('../images/suspend.png')} />
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

export default videos
