import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    TouchableOpacity, 
    Text, 
    AsyncStorage ,
    TextInput,
    FlatList,
    Image,
    Dimensions,
    Animated
} from 'react-native';
import Button from 'react-native-button';

import ImagePicker from 'react-native-image-picker';

import { Actions } from 'react-native-router-flux';

const {width,scale,height} = Dimensions.get('window');

const s = width / 640;

const options = {
    title: '选择图片来源',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};

export default class UserInfo extends Component {
  //构造函数
  constructor(props) {
    super(props);
    this.state = {
        name: '', 
        phone: '',
        data :"",
        createdata:[],
        create:'',
        collect:'',
        listTitle : '新建歌单',
        value2:'精选',
        value1:'点赞 0',
        value3:'评论 0',
        value:'',
        tits: [],
        width: new Animated.Value(20),
        imageUrl:'',
        isloading:false,
        tianjiaguanzhu: '+关注',
        isAdd: false
    };
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
// 获取输入框内值的方法
getValue = (text) => {
    　this.setState({
    　　　value: text
    　});
}
getValue1 = (text) => {
    　this.setState({
    　　　value1: text
    　});
}
  tianjiaguanzhu(){
    this.setState({
        isAdd:!this.state.isAdd,
        tianjiaguanzhu: this.state.isAdd ? '+关注' : '已关注'
    })
}
  clickGetData= async ()=>{
    const value = await AsyncStorage.getItem('mykey');
    console.warn(value);
} 
_changeListtitle = (data) => {
    this.setState({
        listTitle : data
    })
}
  //页面的组件渲染完毕（render）之后执行
  componentDidMount(){
    AsyncStorage.getItem('mykey').then(
        (val) => {
            this.setState({
                data : JSON.parse(val)
            })
        }
    )  
    var _that = this;
    
    //需要查询的键值
    var keys = ["name","phone"];
    //根据键数组查询保存的键值对
    AsyncStorage.multiGet(keys, function(errs, result){
      //如果发生错误，这里直接返回（return）防止进入下面的逻辑
      if(errs){
        return;
      }
 
      //得到的结果是二维数组（result[i][0]表示我们存储的键，result[i][1]表示我们存储的值）
      _that.setState({
        name: (result[0][1]!=null)?result[0][1]:'',
        phone: (result[1][1]!=null)?result[1][1]:''
      });
    });
    
    AsyncStorage.getItem('mykey').then(
        (val) => {
            this.setState({
                data: val
            })
        }
    )
  }
  //组件渲染
  render() {
    return (
        <View style={[styles.flex, styles.topStatus]}>
            <View style={{width:width,height:width*0.1,backgroundColor:'white',marginTop:-width*0.05}}>
                        <View style={{width:width*0.1,height:width*0.1}}>
                            <TouchableOpacity onPress={()=>Actions.Condition()}>
                                <Text style={{
                                    textAlign:"center",
                                    fontSize:25,marginTop:width*0.01
                                }}>〈</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:width*0.4,height:width*0.1,marginLeft:width*0.45,marginTop:-width*0.09}}>
                            <TouchableOpacity onPress={()=>Actions.dongTaiLike()}>
                                <Text style={{fontSize:30,color:'#AAAAAA'}}>动态 </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
      <View style={styles.flex}>
          
          {/*<View style={styles.row}>
            <View style={styles.head}>
              <Text style={styles.label}>姓名</Text>
            </View>
            <View style={styles.flex}>
              <TextInput style={styles.input}
                value={this.state.name}
                onChangeText={(name) => this.setState({name})}/>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.head}>
              <Text style={styles.label}>电话</Text>
            </View>
            <View style={styles.flex}>
              <TextInput style={styles.input}
                value={this.state.phone}
                onChangeText={(phone) => this.setState({phone})}/>
            </View>
          </View>
          <View style={styles.row}>
              <Text style={styles.btn} onPress={this.save.bind(this)}>保存</Text>
              <Text style={styles.btn} onPress={this.clear.bind(this)}>清除</Text>
          </View>
          <View>
              <Text>{this.state.name}</Text>
              <Text>{this.state.phone}</Text>
          </View>*/}
          <View style={styles.good}>
                    <View style={{
                        width:'100%',
                        height:height*0.07
                    }}>
                        <Image 
                            resizeMode="contain"
                            source={require('../images/huachenyu.png')}
                            style={styles.touxiang1}
                        />
                        <Text style={styles.mingzi}>企鹅1号</Text>
                        <TouchableOpacity style={styles.jiaguanzhu} 
                            onPress={()=>this.tianjiaguanzhu()
                        }>
                            <Text>{this.state.tianjiaguanzhu}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text>{this.state.data}</Text>
                    </View>
                    <View style={{
                        width:'100%',
                        height:height*0.3
                    }}>
                        <View style={{
                            height:height*0.25,
                            borderColor:'black',
                            borderWidth:1
                        }}>
                            <Button 
                                onPress={()=>{this.takephoto()}}                     
                            >
                                <Text style={{
                                    position:'absolute'
                                }}>+添加图片</Text>
                                <Image style={{
                                    width:'100%',
                                    height:height*0.25,
                                    position:'relative'
                                }}
                                    source={require('../images/meitu2.png')}
                                />
                            </Button>    
                        </View>
                    </View>
                    <View>
                        <Text>{this.state.value2}</Text>
                        <Text style={styles.dianzan}>{this.state.value1} {this.state.value3}</Text>
                    </View>
                </View>
      </View>
      </View>
    );
  }
 
  //保存数据
  save() {
    //设置多项
    var keyValuePairs = [['name', this.state.name], ['phone', this.state.phone]]
    AsyncStorage.multiSet(keyValuePairs, function(errs){
      if(errs){
        //TODO：存储出错
        return;
      }
      alert('数据保存成功!');
    });
  }
 
  //清除数据
  clear() {
    var _that = this;
    AsyncStorage.clear(function(err){
      if(!err){
        _that.setState({
          name: "",
          phone: ""
        });
        alert('存储的数据已清除完毕!');
      }
    });
  }
}

const styles = StyleSheet.create({
    flex:{
      flex: 1,
    },
    topStatus:{
      marginTop:25,
    },
    row:{
      flexDirection:'row',
      height:45,
      marginBottom:10
    },
    head:{
      width:70,
      marginLeft:5,
      backgroundColor:'#23BEFF',
      height:45,
      justifyContent:'center',
      alignItems: 'center'
    },
    label:{
      color:'#fff',
      fontSize:15,
      fontWeight:'bold'
    },
    input:{
      height:45,
      borderWidth:1,
      marginRight: 5,
      paddingLeft: 10,
      borderColor: '#ccc'
    },
    btn:{
      flex:1,
      backgroundColor:'#FF7200',
      height:45,
      textAlign:'center',
      color:'#fff',
      marginLeft:5,
      marginRight:5,
      lineHeight:45,
      fontSize:15,
    },
    good:{
        width: 600*s,
        height: height*0.42,
        backgroundColor: '#fff',
        marginLeft: 20*s,
        marginTop: 20*s,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        //alignItems: 'center'
    },
    mingzi: {
        marginTop:-width*0.07,
        marginLeft:width*0.12
    },
    jiaguanzhu: {
        marginTop:-width*0.04,
        marginLeft:width*0.8
    },
    backgroundVideo1: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    dianzan: {
        marginLeft:width*0.7,
        marginTop:-width*0.043
    },
    img: {
        width: '100%',
        height: '100%'
    },
    touxiangfanwei: {
        height:height*0.115
    },
    touxiang: {
        width:width*0.15,
        height:width*0.15
    },
    touxiang1: {
        width:width*0.1,
        height:width*0.1
    },
    slide: {
        flex: 1,
        height: '100%',
        width: width*0.8,
        alignItems: 'center'
    },
    slide1: {
        flex: 1,
        height: '100%',
        alignItems: 'center'
    },
    slide2:{
        width: width/6.2,
        height: height*0.11,
        marginTop:width*0.01,
        justifyContent:'center',
        alignItems:'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    pause: {
        position: 'absolute',
        marginTop:width*0.44,
        marginLeft:width*0.05
    },
    btn:{
        width: width*0.25,
        height: width*0.25,
        color: '#fff',
        marginTop: width*0.05,
        marginLeft: width*0.38,
        textAlignVertical: 'center',
        borderRadius: 100,
        backgroundColor: 'black'
    },
    touxiang:{
        width:width*0.2,
        height:width*0.2
    },
    one:{
        width:width*0.4,
        height:width*0.2,
        marginTop:-width*0.2,
        marginLeft:width*0.2
    },
    two:{
        width:width*0.12,
        height:width*0.2,
        marginTop:-width*0.2,
        marginLeft:width*0.6
    },
    three:{
        width:width*0.12,
        height:height*0.027,
        borderColor:'#888888',
        borderWidth:1,
        borderRadius:25,
        marginTop:width*0.071
    },
    four:{
        width:width*0.18,
        height:width*0.2,
        marginTop:-width*0.2,
        marginLeft:width*0.72
    },
    author:{
        fontSize:17,
        marginTop:width*0.03
    },
    name:{
        fontSize:15,
        color:'#888888',
        marginTop:width*0.05
    },
    delete:{
        textAlign:'center',
        marginTop:width*0.058,
        fontSize:24
    },
    guanzhu:{
        textAlign:'center'
    }
  });