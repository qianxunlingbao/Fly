/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  BackHandler,
  ToastAndroid,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
let {width, height} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome';
import {Router, Scene, Tabs, Lightbox, Modal, Actions} from "react-native-router-flux";
import Songwordpost from './components/songwordpost'
import Condition from './components/Condition'
import My from './components/My'
import NavBar from './components/NavBar'
import MoreInfo from './components/MoreInfo'
import Manage from './components/Manage'
import Buied from './components/Buied'
import MyLike from './components/MyLike'
import Local from './components/Local'
import Recent from './components/Recent'
import Dongtai from './components/Dongtai'
import DongTaiLike from './components/Like'
import Music from './components/MusicHall'
import Search from './components/Search'
import CustomScrollView from './components/CustomScrollView'
import Addpinglun from './components/Addpinglun'
import SongList from './components/SongList'
import Publish from './components/Publish'
import Login from './components/Login'
import Register from './components/Register'
import AddSong from './components/AddSong'
import RedAlert from './components/RedAlert'
import UserInfo  from './components/UserInfo'
import ModifyNetName  from './components/ModifyNetName'
import timestop  from './components/timestop'
import CleverKind from './components/CleverKind'
import AddSearchSong from './components/AddSearchSong'
import Singer from './components/Singer';
import SingerDetail from './components/SingerDetail';
import Ranking from './components/Ranking';
import RankingDetail from './components/RankingDetail';
import HallSongList from './components/HallSongList';
import ListenTogether from './components/ListenTogether';
import Huachenyu  from './components/Huachenyu'
import Weixinyu  from './components/Weixinyu'
import Weichen  from './components/Weichen'
import report from './components/report';
import PingLun from './components/PingLun';
import reportss from './components/reportss';
import Pinglun  from './components/PingLun'
import Shipin  from './components/ShiPin'
import Adddongtai  from './components/Adddongtai'
import JuBao  from './components/JuBao'
import Star  from './components/StarScord'
import JianPan  from './components/JianPan'
import Geshou  from './components/Geshou'
import gedanlist from './components/gedanlist'
const App = () => {  
  let now = new Date().getTime();
  return (
    <>
              <Router
      backAndroidHandler={()=>{
          if(Actions.currentScene == 'home'){
            if(new Date().getTime() - now < 2000){
              BackHandler.exitApp();
            }else{
              ToastAndroid.show('确定要退出吗',50);
              now = new Date().getTime();
              return true;
            }
          }
        }
      }
      >
        <Scene key = 'root' >
        <Tabs key='tabbar'
            lazy = {true}
            tabBarStyle={{height:height * 0.06}}
            hideNavBar
            >
            <Scene key="music" 
            title="音乐馆" 
            icon={()=><Icon name = 'home' size = {30}/>}
           >
              <Scene key = "Music" component={Music} hideNavBar/>
              <Scene key = "search" component={Search} hideNavBar hideTabBar/>
              <Scene key="singer" component={Singer} hideNavBar/>
              <Scene key="singerdetail" component={SingerDetail} hideNavBar/>
              <Scene key="ranking" component={Ranking} hideNavBar />
              <Scene key="rankingdetail" component={RankingDetail} hideNavBar/>
              <Scene key="hallsonglist" component={HallSongList} hideNavBar/>
              <Scene key="listentogether" component={ListenTogether} hideNavBar/>
              <Scene key = "songList" component={SongList} hideTabBar  hideNavBar/>
              <Scene key = "publish" component={Publish} hideTabBar  hideNavBar/>
              <Scene key = "songwordpost" component={Songwordpost} hideTabBar  hideNavBar/>
              <Scene key = "timestop" component={timestop}  hideNavBar hideTabBar/>
              <Scene key = "report" component={report}  hideNavBar hideTabBar/>
              <Scene key = "reportss" component={reportss} hideNavBar hideTabBar/>
              
              <Scene key = "PingLun" component={PingLun}  hideNavBar hideTabBar/>
              <Scene key = "Addpinglun" component={Addpinglun}  hideNavBar hideTabBar/>
              <Scene key = "gedanlist" component={gedanlist}   hideTabBar title='已选定一首添加到'
              renderLeftButton = {()=><Text></Text>}
              rightTitle = '取消'
              onRight = {()=>Actions.pop()}
              titleStyle={{flex:1,textAlign:'center'}}
              />

            </Scene>
            <Scene key="condition" title="动态" 
            icon={()=><Icon name = 'eye' size = {30}/>}
            hideNavBar
            >
              <Scene key = "Condition" component={Condition}/>
              <Scene key = "dongTai" component={Dongtai}/>
              <Scene key = "dongTaiLike" component={DongTaiLike}/>
              <Scene key="Addpinglun" component={Addpinglun} />
              <Scene key="RedAlert" component={RedAlert} />
              <Scene key="huachenyu" component={Huachenyu} />
              <Scene key="weixinyu" component={Weixinyu} />
              <Scene key="weichen" component={Weichen} />
              <Scene key="pinglun" component={Pinglun} />
              <Scene key="shipin" component={Shipin} />
              <Scene key="adddongtai" component={Adddongtai} />
              <Scene key="jubao" component={JuBao} />
              <Scene key="star" component={Star} />
              <Scene key="jianpan" component={JianPan} />
              <Scene key="geshou" component={Geshou} />
            </Scene>
            <Scene key="my" title="我的"  
            icon={()=><Icon name = 'user' size = {30}/>}
            >
              <Scene key = "My" component={My}  navBar={()=><NavBar />}/>
              <Scene key = "moreInfo" component={MoreInfo}  title='更多' hideTabBar  />
              <Scene key = "manage" component={Manage}  title='歌单管理' hideTabBar  />
              <Scene key = "like" component={MyLike}  title='我喜欢' hideTabBar  />
              <Scene key = "recent" component={Recent}  title='最近播放' hideTabBar  />
              <Scene key = "download" component={Local}  title='本地歌曲' hideTabBar />
              <Scene key = "buy" component={Buied}  title='已购' hideTabBar/>
              <Scene key = "addsong" component={AddSong}  title='歌曲管理' hideTabBar/>
              <Scene key = 'login' component = {Login} hideNavBar hideTabBar/>      
              <Scene key = 'register' component = {Register} hideNavBar hideTabBar/>      
              <Scene key = 'userinfo' component = {UserInfo}  hideTabBar  title = '我的资料'/>      
              <Scene key = 'modifynetname' component = {ModifyNetName}  hideTabBar title = '修改昵称'/>
              <Scene key = 'cleverkind' component = {CleverKind}  hideTabBar title = '智能分类' />
              <Scene key = 'addsearchsong' component = {AddSearchSong}  hideTabBar title = '将歌曲添加到歌单' 
              renderLeftButton = {()=><Text></Text>}
              rightTitle = '完成'
              onRight = {()=>Actions.pop()}
              titleStyle={{flex:1,textAlign:'center'}}
              />
            </Scene>
          </Tabs>    
          </Scene>
      </Router>
      
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;