import React, { Component } from 'react'
import {
    StyleSheet,
    Dimensions,
    Text,
    Image,
    View,
    TouchableOpacity,
    Modal,
} from 'react-native';
let {width, height} = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';

class report extends Component {
    constructor(props) {
        super(props);

        this.state = {

            checkphoto:[false,false,false,false,false,false,false,false],
        }
    }

    check(a){
        console.log(this.state.checkphoto[a])
for(var i=0;i<8;i++){
    if(a!=undefined&&a==i){
   

        if(this.state.checkphoto[a]==false){
            this.state.checkphoto[a]=true
    
        }
        else{
            this.state.checkphoto[a]=false
    
        }
        
    }
    else
    this.state.checkphoto[i]=false
}

this.setState({checkphoto:this.state.checkphoto,
});
    }
    render() {
        return (
           
            <Modal
            animationType = {"slide"}
            transparent = {true}
            visible = {true}
            >  
                 <View style = {{
                                width:'100%',
                                    height:'100%',
                                    position:'absolute',
                                    top:'0%',
                                    
                                    backgroundColor:'#fff',
                                    opacity:1,justifyContent:'center'
                                    
                                }}>
                                            <View style = {{
                                                width:'100%',
                                                    height:'5%',
                                                    position:'absolute',
                                                    top:'0%',
                                                    
                                                    backgroundColor:'#fff',
                                                    opacity:1,alignItems: 'center',justifyContent:'center',flexDirection:'row'
                                                    
                                                }}>
                                                <TouchableOpacity style={{marginLeft:-0.3*width}} onPress={()=>Actions.pop()}>
                                                <Image style={{width:0.05*width,height:0.05*width}} source={require('../images/fanhui.png')} />
                                            </TouchableOpacity>
                                            <Text style={{fontSize:18,color:'#000',marginLeft:0.3*width}}>举报-{this.props.music_name}</Text>
                                            </View>
                                                                                

                                            <View style = {{
                                                width:'100%',
                                                    height:'100%',
                                                    position:'absolute',
                                                    top:'5%',
                                                    
                                                    backgroundColor:'#fff',
                                                    opacity:1,
                                                    paddingLeft:0.05*width
                                                }}>
                                                <TouchableOpacity style={{flexDirection:'row',alignItems: 'center',height:0.08*height}} onPress={()=>this.check(0)}>
                                                    <Image style={{width:0.05*width,height:0.05*width}} source={this.state.checkphoto[0]?require('../images/checktrue.png'):require('../images/checkno.png')} />
                                                    <Text style={{fontSize:18,color:'#000',marginLeft:0.01*width}}>谩骂造谣</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{flexDirection:'row',alignItems: 'center',height:0.08*height}} onPress={()=>this.check(1)}>
                                                    <Image style={{width:0.05*width,height:0.05*width}} source={this.state.checkphoto[1]?require('../images/checktrue.png'):require('../images/checkno.png')} />
                                                    <Text style={{fontSize:18,color:'#000',marginLeft:0.01*width}}>广告传销</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{flexDirection:'row',alignItems: 'center',height:0.08*height}} onPress={()=>this.check(2)}>
                                                    <Image style={{width:0.05*width,height:0.05*width}} source={this.state.checkphoto[2]?require('../images/checktrue.png'):require('../images/checkno.png')} />
                                                    <Text style={{fontSize:18,color:'#000',marginLeft:0.01*width}}>抄袭</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{flexDirection:'row',alignItems: 'center',height:0.08*height}} onPress={()=>this.check(3)}>
                                                    <Image style={{width:0.05*width,height:0.05*width}} source={this.state.checkphoto[3]?require('../images/checktrue.png'):require('../images/checkno.png')} />
                                                    <Text style={{fontSize:18,color:'#000',marginLeft:0.01*width}}>诈骗</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{flexDirection:'row',alignItems: 'center',height:0.08*height}} onPress={()=>this.check(4)}>
                                                    <Image style={{width:0.05*width,height:0.05*width}} source={this.state.checkphoto[4]?require('../images/checktrue.png'):require('../images/checkno.png')} />
                                                    <Text style={{fontSize:18,color:'#000',marginLeft:0.01*width}}>色情</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{flexDirection:'row',alignItems: 'center',height:0.08*height}} onPress={()=>this.check(5)}>
                                                    <Image style={{width:0.05*width,height:0.05*width}} source={this.state.checkphoto[5]?require('../images/checktrue.png'):require('../images/checkno.png')} />
                                                    <Text style={{fontSize:18,color:'#000',marginLeft:0.01*width}}>暴力</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{flexDirection:'row',alignItems: 'center',height:0.08*height}} onPress={()=>this.check(6)}>
                                                    <Image style={{width:0.05*width,height:0.05*width}} source={this.state.checkphoto[6]?require('../images/checktrue.png'):require('../images/checkno.png')} />
                                                    <Text style={{fontSize:18,color:'#000',marginLeft:0.01*width}}>反动</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{flexDirection:'row',alignItems: 'center',height:0.08*height}} onPress={()=>this.check(7)}>
                                                    <Image style={{width:0.05*width,height:0.05*width}} source={this.state.checkphoto[7]?require('../images/checktrue.png'):require('../images/checkno.png')} />
                                                    <Text style={{fontSize:18,color:'#000',marginLeft:0.01*width}}>其他</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{flexDirection:'row',alignItems: 'center',justifyContent:'center',height:0.08*height,marginLeft:-0.05*width}}>
                                                    <Text style={{fontSize:18,color:'#000',marginLeft:0.01*width}}>提交</Text>
                                                </TouchableOpacity>
                                            </View>
                                           
                                       
                                   
                            </View>
                            </Modal>
                                                        
           
        )
    }
}
export default report