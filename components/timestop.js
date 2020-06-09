import React, { Component } from 'react'
import { StyleSheet, View, Dimensions,Text ,Image,Modal,ScrollView,TouchableOpacity, } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { black } from 'ansi-colors';
let {width, height} = Dimensions.get('window');
class timestop extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            xuanzhong:[''],
            checksong:[],
            stoptime:[false,'']
        }
    }
    //默认模态视图不可见

    renderChildView(p){
        // 数组
        if(p==undefined)
        p=0
        var allChild = [];
		var songword = ['15分钟后','30分钟后','45分钟后','60分钟后'];
			this.state.songword=songword;
        // 遍历
        var c=width*0.1

	   for(var i=0; i<songword.length; i++){
          
                        allChild.push(
                            //  循环排列的view中必须有唯一表示 
                            <TouchableOpacity key={i} onPress={this.renderChildView1.bind(this, i)}>
                              <View  style={{backgroundColor:'#fff', 
                              width:width,
                               height:c,
                               marginTop:0,
                                 justifyContent:'center',
                                 flexDirection:'row',
                                 marginTop:0.03*width
                                 }} >
                                 
                                    <Text style={{flex:1,color:'#000',fontSize:18,marginLeft:0.1*width}}>{songword[i]}</Text>
                                    <Image style={{width:0.05*width,height:0.05*width,opacity:this.state.xuanzhong[i]=='#527d50'&&this.state.stoptime[0]?1:0,marginRight:0.05*width}} source={require('../images/buy.png')} />                                    
                              </View>
                              </TouchableOpacity>
                          );
       
       }
        
	   // 返回数组，不然怎么显示出来
	   return allChild;
     }
     renderChildView1(i){
         if(i==undefined){
             this.state.stoptime[0]=false
             this.state.stoptime[1]=0
         }
         else{
             this.state.stoptime[0]=true
         }
         if(i==0)this.state.stoptime[1]=15
         if(i==1)this.state.stoptime[1]=30
         if(i==2)this.state.stoptime[1]=45
         if(i==3)this.state.stoptime[1]=60
        for(var j=0;j<this.state.songword.length;j++){
            if(this.state.xuanzhong[j]!='#527d50'){
                this.state.xuanzhong[j]=''
                this.state.checksong[j]=''
            }

           
        }
            for(var j=0;j<this.state.xuanzhong.length;j++){
                if(j!=i)
                this.state.xuanzhong[j]=''
            }
            this.state.xuanzhong[i]='#527d50'
            this.state.checksong[i]=this.state.songword[i]
        this.setState({
            op:!this.state.op
        })
     }
      //修改模态视图可见性
      setModalVisible4(visible) {
          this.state.xuanzhong=['']
          this.setState({modalVisible4: visible,
        });
      }
     backgroundcolor(a){
        if(a!=undefined){
            this.state.backc=this.state.bc[a]
            this.setState({
                backc:this.state.backc
            })
        }
     }
     fontcolor(fc){
        if(fc!=undefined){
            this.state.fontcolor=fc
            this.setState({
                fc:this.state.fontcolor
            })
        }
     }
      render() {
          return (
              <View>

                               <View>
                               <Modal
                        animationType = {"slide"}
                        transparent = {true}
                        visible = {this.state.modalVisible4}
                        >  
                        <View style = {{
                                width:'100%',
                                    height:'100%',
                                    position:'absolute',
                                    top:'0%',
                                    
                                    backgroundColor:'#fff',
                                    opacity:1,
                                    justifyContent:'center', alignItems: 'center'
                                }}>
                                    <View
                                    style = {{
                                        width:'100%',
                                            height:'7%',
                                            position:'absolute',
                                            top:'0%',
                                            paddingLeft:0.1*width,
                                            backgroundColor:'#eee',
                                            opacity:1,
                                            justifyContent:'center', alignItems: 'center'
                                            ,flexDirection:'row'
                                        }}>                                            
                                                <TouchableOpacity style={{marginLeft:-0.5*width}} onPress={()=>Actions.pop({ refresh: {   data: '从 three 回到 two'}})}>
                                                <Image style={{width:0.05*width,height:0.05*width}} source={require('../images/fanhui.png')} />
                                            </TouchableOpacity>
                                            <Text style={{fontSize:18,color:'#000',marginLeft:0.3*width}}>定时关闭</Text>

                                        </View>
                                       
                                    <View
                                    style = {{
                                        width:'100%',
                                            height:'60%',
                                            position:'absolute',
                                            top:'10%',
                                            
                                            backgroundColor:'#fff',
                                            opacity:1,
                                            justifyContent:'center', alignItems: 'center'
                                        }}>
                                            <ScrollView
                                ref=''
                                    //  默认为垂直排列 此属性为true改为水平排列
                                horizontal={false}
                                //  禁用水平滚动条
                                showsHorizontalScrollIndicator={false}
                                //  自动分页限ios
                                pagingEnabled={false}
                                showsVerticalScrollIndicator={false}
                                //  禁用滚动限ios
                                // scrollEnabled={false}
                                >
                                     <TouchableOpacity  onPress={()=>{this.renderChildView1()}}>
                              <View  style={{backgroundColor:'#fff', 
                              width:width,
                               height:width*0.1,
                               marginTop:0,
                                 justifyContent:'center',
                                 flexDirection:'row',
                                 marginTop:0.03*width
                                 }} >
                                 
                                    <Text style={{flex:1,color:'#000',fontSize:18,marginLeft:0.1*width}}>不开启</Text>
                                    <Image style={{width:0.05*width,height:0.05*width,opacity:!this.state.stoptime[0]?1:0,marginRight:0.05*width}} source={require('../images/buy.png')} />                                    
                              </View>
                              </TouchableOpacity>
                                {this.renderChildView()} 
                                </ScrollView>
                                    </View>
                                    <View
                                    style = {{
                                        width:'100%',
                                            height:'15%',
                                            position:'absolute',
                                            top:'85%',
                                            paddingLeft:0.1*width,
                                            backgroundColor:'#fff',
                                            opacity:1,
                                            justifyContent:'center', alignItems: 'center'
                                            ,flexDirection:'row',
                                            
                                        }}>


                                        </View>
                            </View>
                        </Modal>
                               </View>
              </View>
          );
      }
  }
  
  const styles = StyleSheet.create({
      flex: {
          flex: 0.5
      },
      show_bgColor: {
        backgroundColor: 'green'
      },
      hide_bgColor: {
          backgroundColor: 'red'
      },
      center: {
          alignItems: 'center',
          justifyContent: 'center',
      }
  });

export default timestop